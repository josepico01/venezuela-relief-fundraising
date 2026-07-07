import React from 'react';
import './index.css';

// Import Custom Hook
import { useFundraiser } from './hooks/useFundraiser';

// Import Visual Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AccessPortal } from './components/AccessPortal';
import { ViewManager } from './components/ViewManager';
import { ResetModal, StatusBanner } from './components/Common';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  const fundraiser = useFundraiser();

  const {
    authRole, setAuthRole,
    view, setView,
    connectionStatus,
    pinInput, setPinInput,
    pinError, setPinError,
    theme, setTheme, isDark,
    showResetModal, setShowResetModal,
    statusMessage, setStatusMessage,
    handleResetDataConfirmed,
    handleVerifyPin,
    handleLogOut,
    classBgMain,
    classBgHeader,
    classTextMute
  } = fundraiser;

  // --- ACCESS GATES PORTAL UI (IF NOT LOGGED IN) ---
  if (!authRole) {
    return (
      <div className={theme}>
        <AccessPortal
          isDark={isDark}
          setTheme={setTheme}
          setAuthRole={setAuthRole}
          setView={setView}
          pinInput={pinInput}
          setPinInput={setPinInput}
          pinError={pinError}
          handleVerifyPin={handleVerifyPin}
        />
      </div>
    );
  }

  return (
    <div className={`${theme} min-h-screen ${classBgMain} font-sans flex flex-col justify-between overflow-x-hidden transition-colors duration-200`}>
      <Header
        authRole={authRole}
        view={view}
        setView={setView}
        connectionStatus={connectionStatus}
        isDark={isDark}
        setTheme={setTheme}
        handleLogOut={handleLogOut}
        classBgHeader={classBgHeader}
        classTextMute={classTextMute}
      />

      <StatusBanner
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

      <ResetModal
        showResetModal={showResetModal}
        setShowResetModal={setShowResetModal}
        handleResetDataConfirmed={handleResetDataConfirmed}
      />

      <ViewManager
        {...fundraiser}
        triggerConfetti={triggerConfetti}
      />

      <Footer
        isDark={isDark}
        creatorName={fundraiser.creatorName}
        classBgNested={fundraiser.classBgNested}
      />
    </div>
  );
}