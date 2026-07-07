import React from 'react';
import { TvView } from './TvView';
import { RegisterView } from './RegisterView';
import { AdminView } from './AdminView';
import { MilestoneAlert } from './Common';
import { GoalOverlay } from './GoalOverlay';

export function ViewManager({
  view,
  authRole,
  isDark,
  classTextHeading,
  classBgCard,
  classTextMute,
  classBgInput,
  classBgNested,
  goal,
  progressPercentage,
  totalArepasSold,
  remainingArepas,
  totalRevenue,
  totalExtraDonations,
  arepaPrice,
  sales,
  donationQrUrl,
  volunteers,
  registerName,
  setRegisterName,
  handleRecordSale,
  undoItem,
  handleUndo,
  adminPin,
  creatorName,
  handleUpdateCloudConfig,
  simulatedNetwork,
  setSimulatedNetwork,
  showConfigPin,
  setShowConfigPin,
  setTheme,
  newVolunteerName,
  setNewVolunteerName,
  handleAddVolunteer,
  handleRemoveVolunteer,
  handleManualConfetti,
  setActiveMilestoneAlert,
  setShowGoalOverlay,
  handleExportCSV,
  setShowResetModal,
  activeMilestoneAlert,
  showGoalOverlay,
  triggerConfetti,
  lastSaleAlert
}) {
  return (
    <main className="flex-grow w-full max-w-[96%] mx-auto p-4 md:p-5 relative">
      
      {/* ----------------- SUB-MILESTONE AUTOMATED CELEBRATION TOAST (25%, 50%, 75%) ----------------- */}
      <MilestoneAlert
        activeMilestoneAlert={activeMilestoneAlert}
        view={view}
        isDark={isDark}
        classTextHeading={classTextHeading}
        classTextMute={classTextMute}
        totalArepasSold={totalArepasSold}
        totalRevenue={totalRevenue}
        goal={goal}
        setActiveMilestoneAlert={setActiveMilestoneAlert}
      />

      {/* ----------------- TELETHON CELEBRATION GOAL OVERLAY (100%) ----------------- */}
      <GoalOverlay
        showGoalOverlay={showGoalOverlay}
        view={view}
        isDark={isDark}
        totalArepasSold={totalArepasSold}
        totalRevenue={totalRevenue}
        goal={goal}
        triggerConfetti={triggerConfetti}
        setShowGoalOverlay={setShowGoalOverlay}
      />

      {/* ----------------- VIEW 1: TV SCREEN DISPLAY ----------------- */}
      {view === 'tv' && (
        <TvView
          isDark={isDark}
          lastSaleAlert={lastSaleAlert}
          classTextHeading={classTextHeading}
          classBgCard={classBgCard}
          classTextMute={classTextMute}
          goal={goal}
          progressPercentage={progressPercentage}
          totalArepasSold={totalArepasSold}
          remainingArepas={remainingArepas}
          totalRevenue={totalRevenue}
          totalExtraDonations={totalExtraDonations}
          arepaPrice={arepaPrice}
          sales={sales}
          donationQrUrl={donationQrUrl}
          volunteers={volunteers}
        />
      )}

      {/* ----------------- VIEW 2: VOLUNTEER REGISTER INPUT ----------------- */}
      {view === 'register' && authRole === 'staff_admin' && (
        <RegisterView
          isDark={isDark}
          classBgCard={classBgCard}
          classTextHeading={classTextHeading}
          classTextMute={classTextMute}
          classBgInput={classBgInput}
          classBgNested={classBgNested}
          registerName={registerName}
          setRegisterName={setRegisterName}
          arepaPrice={arepaPrice}
          handleRecordSale={handleRecordSale}
          undoItem={undoItem}
          handleUndo={handleUndo}
          sales={sales}
        />
      )}

      {/* ----------------- VIEW 3: SETTINGS & CONFIG PANEL ----------------- */}
      {view === 'admin' && authRole === 'staff_admin' && (
        <AdminView
          isDark={isDark}
          classBgCard={classBgCard}
          classTextHeading={classTextHeading}
          classTextMute={classTextMute}
          classBgInput={classBgInput}
          classBgNested={classBgNested}
          goal={goal}
          arepaPrice={arepaPrice}
          donationQrUrl={donationQrUrl}
          adminPin={adminPin}
          creatorName={creatorName}
          handleUpdateCloudConfig={handleUpdateCloudConfig}
          simulatedNetwork={simulatedNetwork}
          setSimulatedNetwork={setSimulatedNetwork}
          showConfigPin={showConfigPin}
          setShowConfigPin={setShowConfigPin}
          setTheme={setTheme}
          volunteers={volunteers}
          newVolunteerName={newVolunteerName}
          setNewVolunteerName={setNewVolunteerName}
          handleAddVolunteer={handleAddVolunteer}
          handleRemoveVolunteer={handleRemoveVolunteer}
          handleManualConfetti={handleManualConfetti}
          setActiveMilestoneAlert={setActiveMilestoneAlert}
          setShowGoalOverlay={setShowGoalOverlay}
          handleExportCSV={handleExportCSV}
          setShowResetModal={setShowResetModal}
          sales={sales}
        />
      )}
    </main>
  );
}
