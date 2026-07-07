import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Setup environment and fallback values
const rawAppId = import.meta.env.VITE_APP_ID || 'papelon-melbourne-earthquake-fundraiser';
// Critical Fix: Sanitize any slashes inside the environment-provided app ID to prevent split-segment path errors in Firestore
export const appId = rawAppId.replace(/\//g, '_');

export let db = null;
export let auth = null;
export let firebaseEnabled = false;

// Public client-safe sandbox credentials to ensure this works immediately out of the box
// for multi-device live syncing at the venue!
const fallbackFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "papelon-relief-fundraiser.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "papelon-relief-fundraiser",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "papelon-relief-fundraiser.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

const firebaseConfigString = typeof __firebase_config !== 'undefined' && __firebase_config
    ? __firebase_config
    : JSON.stringify(fallbackFirebaseConfig);

try {
  const parsedConfig = JSON.parse(firebaseConfigString);
  const app = getApps().length === 0 ? initializeApp(parsedConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  firebaseEnabled = true;
} catch (e) {
  console.error("Firebase connection setup error:", e);
}
