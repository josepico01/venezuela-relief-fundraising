import { useState, useEffect, useRef } from 'react';
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { db, auth, firebaseEnabled, appId } from '../firebase';
import { triggerConfetti } from '../utils/confetti';

export function useFundraiser() {
  // Navigation & Authentication Roles
  const [authRole, setAuthRole] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('tv')) return 'tv_public';
    if (urlParams.has('staff') || urlParams.has('admin')) return null;

    return localStorage.getItem('papelon_auth_role') || null;
  });

  const [view, setView] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('tv')) return 'tv';
    return localStorage.getItem('papelon_current_view') || 'tv';
  });

  const [user, setUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  // PIN Input State (Masked)
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Theme State Configuration (Dynamic Support for Light and Dark Modes)
  const [theme, setTheme] = useState(() => localStorage.getItem('papelon_theme') || 'light');

  // Cloud Synchronized Configurations with client-side fallback
  const [goal, setGoal] = useState(() => Number(localStorage.getItem('papelon_goal') || 2000));
  const [arepaPrice, setArepaPrice] = useState(() => Number(localStorage.getItem('papelon_arepa_price') || 15));
  const [donationQrUrl, setDonationQrUrl] = useState(() => localStorage.getItem('papelon_qr_url') || 'https://www.instagram.com/papelonmelbourne/');
  const [registerName, setRegisterName] = useState(() => localStorage.getItem('papelon_register_name') || 'Register A');
  const [newVolunteerName, setNewVolunteerName] = useState('');

  // Custom Confirmation Modal State
  const [showResetModal, setShowResetModal] = useState(false);

  // Central Sync States (Sales & Volunteers with robust Local storage backups)
  const [sales, setSales] = useState(() => {
    try {
      const local = localStorage.getItem('papelon_sales_logs');
      return local ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  });
  const [volunteers, setVolunteers] = useState(() => {
    try {
      const local = localStorage.getItem('papelon_volunteers_logs');
      return local ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  });

  // Local interface states
  const [simulatedNetwork, setSimulatedNetwork] = useState(false);
  const [lastSaleAlert, setLastSaleAlert] = useState(null);
  const [undoItem, setUndoItem] = useState(null);

  // Milestone tracking structures
  const [celebratedMilestones, setCelebratedMilestones] = useState(() => {
    const local = localStorage.getItem('papelon_celebrated_milestones');
    return local ? JSON.parse(local) : { m25: false, m50: false, m75: false, m100: false };
  });
  const [activeMilestoneAlert, setActiveMilestoneAlert] = useState(null);

  const [showGoalOverlay, setShowGoalOverlay] = useState(false);
  const [hasTriggeredGoalCelebration, setHasTriggeredGoalCelebration] = useState(false);
  const [creatorName, setCreatorName] = useState(() => localStorage.getItem('papelon_creator_name') || 'Your Name');
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('papelon_admin_pin') || '0000');

  // State for toggling PIN visibility inside the Coordinator Panel config screen
  const [showConfigPin, setShowConfigPin] = useState(false);

  const [statusMessage, setStatusMessage] = useState({
    type: 'info',
    text: 'Connecting to Papelón Live Sync Cloud...'
  });

  // Keep track of sales using a Ref to safely decouple firestore snapshots from rendering cycle hooks
  const salesRef = useRef(sales);
  useEffect(() => {
    salesRef.current = sales;
  }, [sales]);

  // Keep local backups of custom configs and theme selection
  useEffect(() => {
    localStorage.setItem('papelon_goal', goal.toString());
    localStorage.setItem('papelon_arepa_price', arepaPrice.toString());
    localStorage.setItem('papelon_qr_url', donationQrUrl);
    localStorage.setItem('papelon_register_name', registerName);
    localStorage.setItem('papelon_admin_pin', adminPin);
    localStorage.setItem('papelon_creator_name', creatorName);
    localStorage.setItem('papelon_current_view', view);
    localStorage.setItem('papelon_theme', theme);
    localStorage.setItem('papelon_celebrated_milestones', JSON.stringify(celebratedMilestones));
    if (authRole) {
      localStorage.setItem('papelon_auth_role', authRole);
    } else {
      localStorage.removeItem('papelon_auth_role');
    }
  }, [goal, arepaPrice, donationQrUrl, registerName, adminPin, creatorName, view, authRole, celebratedMilestones, theme]);

  // Clear live alert toast banner automatically after 8 seconds of inactivity
  useEffect(() => {
    if (lastSaleAlert) {
      const alertTimer = setTimeout(() => {
        setLastSaleAlert(null);
      }, 8000);
      return () => clearTimeout(alertTimer);
    }
  }, [lastSaleAlert]);

  // Safeguard: Set up an explicit connection timeout. If Firebase fails to connect within 5 seconds, switch to offline mode gracefully.
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (connectionStatus === 'connecting') {
        setConnectionStatus('offline');
        setStatusMessage({
          type: 'info',
          text: 'Connected in Local Offline Mode. Data will save in browser storage!'
        });
      }
    }, 5000);
    return () => clearTimeout(fallbackTimeout);
  }, [connectionStatus]);

  // One-time Initial Setup & Firebase Authentication Listener (Empty dependencies to avoid infinite auth looping)
  useEffect(() => {
    if (!firebaseEnabled || !db || !auth) {
      setConnectionStatus('offline');
      setStatusMessage({ type: 'error', text: 'Cloud disabled. Running in Local-Only Fallback Mode.' });
      return;
    }

    const initFirebaseSync = async () => {
      try {
        setConnectionStatus('connecting');
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.warn("Firebase Authentication failed, attempting anonymous registration", err);
        try {
          await signInAnonymously(auth);
        } catch (authErr) {
          console.error("Critical Authentication block:", authErr);
          setConnectionStatus('offline');
          setStatusMessage({ type: 'error', text: 'Local-only sandbox active (no cloud sync).' });
        }
      }
    };

    initFirebaseSync();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setConnectionStatus('online');
      } else {
        setConnectionStatus('offline');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Live Firestore Data Subscriptions with complete Offline/Permissions fallbacks
  useEffect(() => {
    if (!firebaseEnabled || !db || !user) {
      setConnectionStatus('offline');
      return;
    }

    // PUBLIC SALES COLLECTION (Mandatory Rule 1 Strict Path - 5 Segments)
    const salesCol = collection(db, 'artifacts', appId, 'public', 'data', 'sales');
    const unsubscribeSales = onSnapshot(salesCol, (snapshot) => {
      const fetchedSales = [];
      snapshot.forEach((doc) => {
        fetchedSales.push({ id: doc.id, ...doc.data() });
      });

      // Client-side sort to avoid index errors (Mandatory Rule 2)
      fetchedSales.sort((a, b) => b.timestamp - a.timestamp);

      // Detect live alerts safely using ref comparison
      const prevSales = salesRef.current;
      if (fetchedSales.length > 0 && prevSales.length > 0 && fetchedSales.length > prevSales.length) {
        const newest = fetchedSales[0];
        if (newest.registerName !== registerName) {
          setLastSaleAlert({
            quantity: newest.quantity,
            registerName: newest.registerName,
            timestamp: newest.timestamp
          });
          if (newest.quantity >= 5) {
            triggerConfetti();
          }
        }
      }

      setSales(fetchedSales);
      localStorage.setItem('papelon_sales_logs', JSON.stringify(fetchedSales));
      setConnectionStatus('online');
    }, (error) => {
      console.warn("Firestore Sales Access Denied or Offline. Activating local storage fallback.", error);
      setConnectionStatus('offline');
      setStatusMessage({ type: 'info', text: 'Local Offline Mode active. Database restrictions handled.' });

      // Pull immediately from fallback local storage on permission block
      const fallbackSales = localStorage.getItem('papelon_sales_logs');
      if (fallbackSales) {
        try { setSales(JSON.parse(fallbackSales)); } catch (e) {}
      }
    });

    // PUBLIC VOLUNTEERS COLLECTION (Mandatory Rule 1 Strict Path - 5 Segments)
    const volunteersCol = collection(db, 'artifacts', appId, 'public', 'data', 'volunteers');
    const unsubscribeVolunteers = onSnapshot(volunteersCol, (snapshot) => {
      const fetchedVols = [];
      snapshot.forEach((doc) => {
        fetchedVols.push({ id: doc.id, ...doc.data() });
      });
      fetchedVols.sort((a, b) => b.timestamp - a.timestamp);

      const namesList = fetchedVols.map(v => v.name);
      setVolunteers(namesList);
      localStorage.setItem('papelon_volunteers_logs', JSON.stringify(namesList));
    }, (error) => {
      console.warn("Firestore Volunteers Access Denied or Offline. Activating local storage fallback.", error);
      const fallbackVols = localStorage.getItem('papelon_volunteers_logs');
      if (fallbackVols) {
        try { setVolunteers(JSON.parse(fallbackVols)); } catch (e) {}
      }
    });

    // 3. CENTRAL CONFIGURATION REAL-TIME STREAM (Mandatory Rule 1 Path - 6 Segments for Document Reference)
    const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'global');
    const unsubscribeConfig = onSnapshot(configDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.goal !== undefined) setGoal(Number(data.goal));
        if (data.arepaPrice !== undefined) setArepaPrice(Number(data.arepaPrice));
        if (data.donationQrUrl !== undefined) setDonationQrUrl(data.donationQrUrl);
        if (data.adminPin !== undefined) setAdminPin(data.adminPin);
        if (data.creatorName !== undefined) setCreatorName(data.creatorName);
      }
    }, (error) => {
      console.warn("Firestore Config Access Denied or Offline. Gracefully falling back to local configurations.", error);
    });

    return () => {
      unsubscribeSales();
      unsubscribeVolunteers();
      unsubscribeConfig();
    };
  }, [user]);

  // Fallback lists on connection loss (Wont override active Firestore connected data)
  useEffect(() => {
    if (connectionStatus === 'offline') {
      if (sales.length === 0) {
        setSales([
          { id: 'm-1', quantity: 450, extraDonation: 100, registerName: 'Register A', timestamp: Date.now() - 3600000 },
          { id: 'm-2', quantity: 900, extraDonation: 350, registerName: 'Main Cashier', timestamp: Date.now() - 1800000 },
          { id: 'm-3', quantity: 350, extraDonation: 150, registerName: 'Register B', timestamp: Date.now() - 600000 }
        ]);
      }
      if (volunteers.length === 0) {
        setVolunteers(['Carlos S.', 'Maria V.', 'Alejandro G.', 'Sarah M.', 'Tomas D.', 'Gabriela K.']);
      }
    }
  }, [connectionStatus]);

  // Update cloud configurations when edited by coordinator
  const handleUpdateCloudConfig = async (newGoal, newPrice, newQr, newPin, newCreator) => {
    // Optimistically update locally
    setGoal(Number(newGoal));
    setArepaPrice(Number(newPrice));
    setDonationQrUrl(newQr);
    setAdminPin(newPin);
    setCreatorName(newCreator);

    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online') {
      try {
        const configDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'global');
        await setDoc(configDocRef, {
          goal: Number(newGoal),
          arepaPrice: Number(newPrice),
          donationQrUrl: newQr,
          adminPin: newPin,
          creatorName: newCreator,
          lastUpdated: Date.now()
        }, { merge: true });
      } catch (err) {
        console.warn("Failed writing configuration to cloud, continuing locally in local memory:", err);
      }
    }
  };

  // Calculate Aggregates
  const totalArepasSold = sales.reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);
  const totalExtraDonations = sales.reduce((acc, curr) => acc + (Number(curr.extraDonation) || 0), 0);
  const totalRevenue = (totalArepasSold * arepaPrice) + totalExtraDonations;
  const progressPercentage = Math.min(Math.round((totalArepasSold / goal) * 100), 100);
  const remainingArepas = Math.max(goal - totalArepasSold, 0);

  // Monitor target and milestone completions to pop active modal overlays!
  useEffect(() => {
    if (goal <= 0) return;

    const threshold25 = goal * 0.25;
    const threshold50 = goal * 0.50;
    const threshold75 = goal * 0.75;

    // Reset safety in case database or sales drop to zero
    if (totalArepasSold === 0) {
      if (celebratedMilestones.m25 || celebratedMilestones.m50 || celebratedMilestones.m75 || celebratedMilestones.m100) {
        setCelebratedMilestones({ m25: false, m50: false, m75: false, m100: false });
      }
      if (hasTriggeredGoalCelebration) {
        setHasTriggeredGoalCelebration(false);
      }
      if (showGoalOverlay) {
        setShowGoalOverlay(false);
      }
      if (activeMilestoneAlert) {
        setActiveMilestoneAlert(null);
      }
      return;
    }

    const updatedMilestones = { ...celebratedMilestones };
    let triggeredMilestone = null;

    if (totalArepasSold >= goal) {
      if (!hasTriggeredGoalCelebration) {
        setHasTriggeredGoalCelebration(true);
        setShowGoalOverlay(true);
        setTimeout(() => triggerConfetti(), 300);
      }
    } else {
      if (hasTriggeredGoalCelebration) {
        setHasTriggeredGoalCelebration(false);
        setShowGoalOverlay(false);
      }

      // To prevent multi-render update cascading, mark lower milestones as met immediately
      if (totalArepasSold >= threshold75 && !celebratedMilestones.m75) {
        updatedMilestones.m75 = true;
        updatedMilestones.m50 = true;
        updatedMilestones.m25 = true;
        triggeredMilestone = { percent: 75, count: Math.round(threshold75), label: "Kitchen is Sweating! 🌟" };
      } else if (totalArepasSold >= threshold50 && !celebratedMilestones.m50) {
        updatedMilestones.m50 = true;
        updatedMilestones.m25 = true;
        triggeredMilestone = { percent: 50, count: Math.round(threshold50), label: "Halfway There! 🚀" };
      } else if (totalArepasSold >= threshold25 && !celebratedMilestones.m25) {
        updatedMilestones.m25 = true;
        triggeredMilestone = { percent: 25, count: Math.round(threshold25), label: "Awesome Start! 🎉" };
      }
    }

    if (triggeredMilestone) {
      setCelebratedMilestones(updatedMilestones);
      setActiveMilestoneAlert(triggeredMilestone);
      setTimeout(() => triggerConfetti(), 150);
    }
  }, [totalArepasSold, goal, celebratedMilestones, hasTriggeredGoalCelebration]);

  // Milestone dismissal timer logic (closes after 12 seconds auto-countdown)
  useEffect(() => {
    if (activeMilestoneAlert) {
      const timer = setTimeout(() => {
        setActiveMilestoneAlert(null);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [activeMilestoneAlert]);

  // Simulation effect to mock dynamic additions in the venue
  useEffect(() => {
    if (!simulatedNetwork) return;

    const interval = setInterval(() => {
      const mockNames = ['Register A', 'Register B', 'Mobile Till 1', 'Main Cashier'];
      const randomQty = Math.floor(Math.random() * 8) + 3;
      const randomExtra = Math.random() > 0.6 ? Math.floor(Math.random() * 4) * 10 : 0;
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];

      handleRecordSale(randomQty, randomExtra, randomName);
    }, 12000);

    return () => clearInterval(interval);
  }, [simulatedNetwork]);

  // Handle adding an arepa sale
  const handleRecordSale = async (qty, extraAmount, terminalOverride = null) => {
    const finalQty = Number(qty);
    const finalExtra = Number(extraAmount) || 0;

    if (finalQty <= 0 && finalExtra <= 0) return;

    const finalTerminalName = terminalOverride || registerName || 'Till 1';

    const saleRecord = {
      quantity: finalQty,
      extraDonation: finalExtra,
      registerName: finalTerminalName,
      timestamp: Date.now()
    };

    const localId = 'sale-' + Date.now();
    const localRecord = { id: localId, ...saleRecord };

    // Save locally immediately to guarantee zero lost inputs
    setSales(prev => {
      const updated = [localRecord, ...prev];
      localStorage.setItem('papelon_sales_logs', JSON.stringify(updated));
      return updated;
    });

    setUndoItem(localRecord);

    setLastSaleAlert({
      quantity: finalQty,
      registerName: finalTerminalName,
      timestamp: Date.now()
    });

    if (finalQty >= 5 || finalExtra >= 50) {
      setTimeout(() => {
        triggerConfetti();
      }, 105);
    }

    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online') {
      try {
        const salesCol = collection(db, 'artifacts', appId, 'public', 'data', 'sales');
        await addDoc(salesCol, saleRecord);
      } catch (err) {
        console.error("Failed writing sale to Firestore:", err);
        setStatusMessage({ type: 'error', text: 'Sync error. Saved locally in device storage instead.' });
      }
    }
  };

  // Undo last action easily
  const handleUndo = async () => {
    if (!undoItem) return;
    setSales(prev => {
      const filtered = prev.filter(item => item.id !== undoItem.id);
      localStorage.setItem('papelon_sales_logs', JSON.stringify(filtered));
      return filtered;
    });
    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online' && !undoItem.id.startsWith('m-') && !undoItem.id.startsWith('sim-')) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'sales', undoItem.id);
        await deleteDoc(docRef);
      } catch (err) {
        console.warn("Could not delete from cloud:", err);
      }
    }
    setUndoItem(null);
  };

  // Clear All Sales Data
  const handleResetDataConfirmed = async () => {
    setShowResetModal(false);
    setSales([]);
    localStorage.removeItem('papelon_sales_logs');
    setUndoItem(null);
    setHasTriggeredGoalCelebration(false);
    setShowGoalOverlay(false);
    setActiveMilestoneAlert(null);
    setCelebratedMilestones({ m25: false, m50: false, m75: false, m100: false });

    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online') {
      try {
        const salesCol = collection(db, 'artifacts', appId, 'public', 'data', 'sales');
        const querySnapshot = await getDocs(salesCol);
        querySnapshot.forEach(async (document) => {
          const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'sales', document.id);
          await deleteDoc(docRef);
        });
      } catch (err) {
        console.error("Failed clearing Firestore database records", err);
      }
    }
    setStatusMessage({ type: 'success', text: 'All sales database records and milestone history reset.' });
  };

  // Handle adding a new volunteer
  const handleAddVolunteer = async (e) => {
    e.preventDefault();
    const cleanName = newVolunteerName.trim();
    if (!cleanName) return;

    setVolunteers(prev => {
      const updated = [...prev, cleanName];
      localStorage.setItem('papelon_volunteers_logs', JSON.stringify(updated));
      return updated;
    });
    setNewVolunteerName('');

    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online') {
      try {
        const volunteersCol = collection(db, 'artifacts', appId, 'public', 'data', 'volunteers');
        await addDoc(volunteersCol, { name: cleanName, timestamp: Date.now() });
      } catch (err) {
        console.error("Failed sync of volunteer:", err);
      }
    }
  };

  // Handle removing a volunteer
  const handleRemoveVolunteer = async (index, nameToRemove) => {
    setVolunteers(prev => {
      const filtered = prev.filter((_, idx) => idx !== index);
      localStorage.setItem('papelon_volunteers_logs', JSON.stringify(filtered));
      return filtered;
    });
    if (firebaseEnabled && auth.currentUser && connectionStatus === 'online') {
      try {
        const volunteersCol = collection(db, 'artifacts', appId, 'public', 'data', 'volunteers');
        const q = query(volunteersCol, where("name", "==", nameToRemove));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'volunteers', document.id);
          await deleteDoc(docRef);
        });
      } catch (err) {
        console.error("Failed to delete synced volunteer:", err);
      }
    }
  };

  const handleManualConfetti = () => {
    triggerConfetti();
  };

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Register', 'Arepas Sold', 'Extra Donation ($)', 'Equivalent Revenue ($)'];
    const rows = sales.map(s => [
      new Date(s.timestamp).toLocaleString(),
      s.registerName,
      s.quantity,
      s.extraDonation,
      (s.quantity * arepaPrice) + s.extraDonation
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
        + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `papelon_earthquake_fundraiser_arepas_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Sign In Authentication PIN Verification
  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pinInput === adminPin) {
      setAuthRole('staff_admin');
      setView('register');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogOut = () => {
    setAuthRole(null);
    localStorage.removeItem('papelon_auth_role');
  };

  // Define color scheme values dynamically based on current selected theme state
  const isDark = theme === 'dark';

  const classBgMain = isDark ? "bg-neutral-900 text-neutral-100" : "bg-slate-50 text-slate-800";
  const classBgCard = isDark ? "bg-neutral-950 border border-neutral-800" : "bg-white border border-slate-200 shadow-sm";
  const classBgHeader = isDark ? "bg-neutral-950 border-b border-neutral-800" : "bg-white border-b border-slate-200 shadow-sm";
  const classTextMute = isDark ? "text-neutral-400" : "text-slate-500";
  const classBgNested = isDark ? "bg-neutral-900 border border-neutral-800" : "bg-slate-100 border border-slate-200 shadow-inner";
  const classBgInput = isDark ? "bg-neutral-950 border border-neutral-800 text-white" : "bg-white border border-slate-200 text-slate-800";
  const classTextHeading = isDark ? "text-white" : "text-slate-900";

  return {
    authRole, setAuthRole,
    view, setView,
    user,
    connectionStatus,
    pinInput, setPinInput,
    pinError, setPinError,
    theme, setTheme, isDark,
    goal, setGoal,
    arepaPrice, setArepaPrice,
    donationQrUrl, setDonationQrUrl,
    registerName, setRegisterName,
    newVolunteerName, setNewVolunteerName,
    showResetModal, setShowResetModal,
    sales, setSales,
    volunteers, setVolunteers,
    simulatedNetwork, setSimulatedNetwork,
    lastSaleAlert, setLastSaleAlert,
    undoItem, setUndoItem,
    celebratedMilestones, setCelebratedMilestones,
    activeMilestoneAlert, setActiveMilestoneAlert,
    showGoalOverlay, setShowGoalOverlay,
    hasTriggeredGoalCelebration, setHasTriggeredGoalCelebration,
    creatorName, setCreatorName,
    adminPin, setAdminPin,
    showConfigPin, setShowConfigPin,
    statusMessage, setStatusMessage,
    handleUpdateCloudConfig,
    totalArepasSold,
    totalExtraDonations,
    totalRevenue,
    progressPercentage,
    remainingArepas,
    handleRecordSale,
    handleUndo,
    handleResetDataConfirmed,
    handleAddVolunteer,
    handleRemoveVolunteer,
    handleManualConfetti,
    handleExportCSV,
    handleVerifyPin,
    handleLogOut,
    classBgMain,
    classBgCard,
    classBgHeader,
    classTextMute,
    classBgNested,
    classBgInput,
    classTextHeading
  };
}
