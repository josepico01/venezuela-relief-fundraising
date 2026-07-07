import React from 'react';
import { Lock, Eye, Sun, Moon, UserCheck, Sparkles, Sparkle, Tv, Download, Trash2 } from 'lucide-react';

/**
 * AdminView component for the Papelón Relief Fundraising App.
 * Event coordinator dashboard for configuring campaign parameters and managing volunteers.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {string} props.classBgCard - CSS class for card background.
 * @param {string} props.classTextHeading - CSS class for heading text.
 * @param {string} props.classTextMute - CSS class for muted text.
 * @param {string} props.classBgInput - CSS class for input background.
 * @param {string} props.classBgNested - CSS class for nested background elements.
 * @param {number} props.goal - Fundraising target for arepas.
 * @param {number} props.arepaPrice - Price per arepa.
 * @param {string} props.donationQrUrl - URL for the donation portal.
 * @param {string} props.adminPin - Security PIN for register access.
 * @param {string} props.creatorName - Name of the app developer for credits.
 * @param {Function} props.handleUpdateCloudConfig - Function to update global configurations.
 * @param {boolean} props.simulatedNetwork - Boolean indicating if demo mode is active.
 * @param {Function} props.setSimulatedNetwork - Function to toggle demo mode.
 * @param {boolean} props.showConfigPin - Boolean to toggle PIN visibility in settings.
 * @param {Function} props.setShowConfigPin - Function to toggle PIN visibility.
 * @param {Function} props.setTheme - Function to toggle between light and dark themes.
 * @param {Array} props.volunteers - Array of volunteer names on duty.
 * @param {string} props.newVolunteerName - Current value of the new volunteer input.
 * @param {Function} props.setNewVolunteerName - Function to update the new volunteer name.
 * @param {Function} props.handleAddVolunteer - Function to add a new volunteer.
 * @param {Function} props.handleRemoveVolunteer - Function to remove a volunteer.
 * @param {Function} props.handleManualConfetti - Function to manually trigger confetti.
 * @param {Function} props.setActiveMilestoneAlert - Function to manually trigger a milestone alert.
 * @param {Function} props.setShowGoalOverlay - Function to show the goal celebration overlay.
 * @param {Function} props.handleExportCSV - Function to export sales logs as CSV.
 * @param {Function} props.setShowResetModal - Function to show the database reset confirmation modal.
 * @param {Array} props.sales - Array of all recorded sales.
 */
export const AdminView = ({
  isDark,
  classBgCard,
  classTextHeading,
  classTextMute,
  classBgInput,
  classBgNested,
  goal,
  arepaPrice,
  donationQrUrl,
  adminPin,
  creatorName,
  handleUpdateCloudConfig,
  simulatedNetwork,
  setSimulatedNetwork,
  showConfigPin,
  setShowConfigPin,
  setTheme,
  volunteers,
  newVolunteerName,
  setNewVolunteerName,
  handleAddVolunteer,
  handleRemoveVolunteer,
  handleManualConfetti,
  setActiveMilestoneAlert,
  setShowGoalOverlay,
  handleExportCSV,
  setShowResetModal,
  sales
}) => {
  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">

      <div className={`rounded-3xl p-5 md:p-6 shadow-sm space-y-4 ${classBgCard}`}>

        <div className={`border-b pb-3 ${isDark ? "border-neutral-800" : "border-slate-200"}`}>
          <h2 className={`text-2xl font-black ${classTextHeading}`}>Event Coordinator Dashboard</h2>
          <p className={`text-xs ${classTextMute}`}>Configure parameters for Sunday's Papelón Arepa Earthquake fundraiser.</p>
        </div>

        {/* Form Config Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Fundraising Arepa Goal</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => handleUpdateCloudConfig(e.target.value, arepaPrice, donationQrUrl, adminPin, creatorName)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
            />
            <p className="text-[10px] text-slate-400 mt-1">Default target of 2,000 arepas requested for Melbourne's community event.</p>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Base Arepa Price ($ AUD)</label>
            <input
              type="number"
              value={arepaPrice}
              onChange={(e) => handleUpdateCloudConfig(goal, e.target.value, donationQrUrl, adminPin, creatorName)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
            />
            <p className="text-[10px] text-slate-400 mt-1">Multiplies counted arepas into live financial progress statistics automatically.</p>
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Donation Link/QR URL</label>
            <input
              type="text"
              value={donationQrUrl}
              onChange={(e) => handleUpdateCloudConfig(goal, arepaPrice, e.target.value, adminPin, creatorName)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
            />
            <p className="text-[10px] text-slate-400 mt-1">Direct destination address for QR code readers displayed on TV screens.</p>
          </div>

          {/* Simulated Network Toggler */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Simulation Test Mode</label>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
              <div>
                <span className={`text-xs font-semibold block ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Simulate Live Orders</span>
                <span className="text-[10px] text-slate-400">Injects mock receipts to demo visual TV actions.</span>
              </div>
              <button
                onClick={() => setSimulatedNetwork(!simulatedNetwork)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${simulatedNetwork ? 'bg-red-500 text-white' : (isDark ? "bg-neutral-800 text-neutral-400" : "bg-slate-200 text-slate-600")}`}
              >
                {simulatedNetwork ? 'Stop Demo' : 'Start Demo'}
              </button>
            </div>
          </div>

          {/* SECURITY PASSCODE CONFIGURATION (Fully Masked with Show/Hide Toggle) */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Volunteer Register PIN code</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showConfigPin ? "text" : "password"}
                maxLength="6"
                value={adminPin}
                onChange={(e) => handleUpdateCloudConfig(goal, arepaPrice, donationQrUrl, e.target.value.replace(/\D/g, ''), creatorName)}
                className={`w-full rounded-xl pl-10 pr-12 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none font-extrabold tracking-widest text-center ${classBgInput}`}
              />
              <button
                type="button"
                onClick={() => setShowConfigPin(!showConfigPin)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                title={showConfigPin ? "Mask PIN" : "Show PIN"}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Change the PIN security code to lock access to registers (Default: 0000).</p>
          </div>

          {/* CREATOR CREDIT CONFIGURATION */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>App Developer Name (Credits)</label>
            <div className="relative">
              <input
                type="text"
                value={creatorName}
                onChange={(e) => handleUpdateCloudConfig(goal, arepaPrice, donationQrUrl, adminPin, e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
                placeholder="Your Name / Organization"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">This will display proudly in the footer of the TV and register views.</p>
          </div>

          {/* THEME SELECTOR BUTTON INSIDE CONFIG SCREEN */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Active Dashboard Color Scheme</label>
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
              <div>
                <span className={`text-xs font-semibold block ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Local Visual Theme</span>
                <span className="text-[10px] text-slate-400">Toggle light or dark interface theme instantly.</span>
              </div>
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${isDark ? "bg-amber-500 text-neutral-950" : "bg-slate-800 text-white"}`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* VOLUNTEER LIST MANAGER */}
        <div className={`rounded-2xl p-4 border space-y-3 ${classBgNested}`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
              <UserCheck className="w-4 h-4" />
              <span>Manage Volunteers ({volunteers.length})</span>
            </h3>
            <span className="text-[10px] text-slate-400">Displayed in scrolling News Ticker on TV</span>
          </div>

          <form onSubmit={handleAddVolunteer} className="flex gap-2">
            <input
              type="text"
              value={newVolunteerName}
              onChange={(e) => setNewVolunteerName(e.target.value)}
              placeholder="Enter volunteer name..."
              className={`flex-grow border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-yellow-500 focus:outline-none ${isDark ? "bg-neutral-950 border-neutral-800 text-white" : "bg-white border-slate-200 text-slate-800"}`}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-neutral-950 font-black text-xs rounded-xl hover:shadow transition uppercase tracking-wider"
            >
              Add On-Duty
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-1">
            {volunteers.map((vol, idx) => (
              <div
                key={idx}
                className={`border rounded-lg px-2.5 py-1.5 text-xs flex items-center gap-2 group hover:border-red-500/50 transition ${isDark ? "bg-neutral-950 border-neutral-800 text-neutral-200" : "bg-white border-slate-200 text-slate-700"}`}
              >
                <span>{vol}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveVolunteer(idx, vol)}
                  className="text-slate-400 hover:text-red-550 transition font-black ml-1 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bulk operations and diagnostics */}
        <div className={`rounded-2xl p-4 border space-y-3 ${classBgNested}`}>
          <h3 className={`text-xs uppercase tracking-wider font-extrabold ${classTextMute}`}>Data Utilities & Diagnostic Audits</h3>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleManualConfetti}
              className="flex items-center gap-1.5 px-4 py-2 bg-yellow-500 text-neutral-950 text-xs font-bold rounded-xl hover:bg-yellow-400 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test TV Confetti Firework</span>
            </button>

            <button
              onClick={() => {
                const demoMilestones = [25, 50, 75];
                const rand = demoMilestones[Math.floor(Math.random() * demoMilestones.length)];
                setActiveMilestoneAlert({
                  percent: rand,
                  count: Math.round(goal * (rand / 100)),
                  label: `Manual Test Run: ${rand}% Completed! 🎉`
                });
                handleManualConfetti(); // triggerConfetti passed as handleManualConfetti
              }}
              className={`flex items-center gap-1.5 px-4 py-2 border text-xs font-bold rounded-xl transition ${isDark ? "bg-neutral-850 hover:bg-neutral-800 border-neutral-750 text-neutral-200" : "bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-700"}`}
            >
              <Sparkle className="w-4 h-4 text-yellow-600 animate-spin" />
              <span>Test Random Milestone Overlay</span>
            </button>

            <button
              onClick={() => setShowGoalOverlay(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
            >
              <Tv className="w-4 h-4" />
              <span>Test Goal Celebration Overlay</span>
            </button>

            <button
              onClick={handleExportCSV}
              className={`flex items-center gap-1.5 px-4 py-2 border text-xs font-bold rounded-xl transition ${isDark ? "bg-neutral-850 hover:bg-neutral-800 border-neutral-750 text-neutral-200" : "bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-700"}`}
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Logs</span>
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-650 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition ml-auto"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hard Reset Database</span>
            </button>
          </div>
        </div>

        {/* Raw Database Log Panel */}
        <div className={`rounded-2xl p-4 border ${isDark ? "bg-neutral-955 border-neutral-850" : "bg-slate-50 border-slate-200"}`}>
          <h3 className={`text-xs uppercase tracking-wider font-extrabold mb-3 ${isDark ? "text-neutral-300" : "text-slate-700"}`}>Audit Log Sheet ({sales.length} items)</h3>
          <div className="max-h-52 overflow-y-auto text-xs font-mono space-y-1.5 pr-2 dark-scrollbar">
            {sales.map((item, idx) => (
              <div key={item.id || idx} className={`p-2 rounded border flex justify-between items-center ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-300" : "bg-white border-slate-200 text-slate-700"}`}>
                <span>[{new Date(item.timestamp).toLocaleTimeString()}] Register: {item.registerName}</span>
                <span className="text-yellow-600 font-bold">{item.quantity} arepas | +${item.extraDonation}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
