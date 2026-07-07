import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

/**
 * ResetModal component for confirming database reset.
 * 
 * @param {Object} props
 * @param {boolean} props.showResetModal - Whether to show the modal.
 * @param {Function} props.setShowResetModal - Function to toggle modal.
 * @param {Function} props.handleResetDataConfirmed - Function to call on confirmation.
 */
export const ResetModal = ({ showResetModal, setShowResetModal, handleResetDataConfirmed }) => {
  if (!showResetModal) return null;
  return (
    <div className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 max-w-md w-full p-6 rounded-3xl space-y-4 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-white">Reset Campaign Database?</h3>
          <p className="text-xs text-neutral-400 mt-1">
            This will permanently delete all logged arepa sales and donation transactions across all synchronized terminals. This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowResetModal(false)}
            className="flex-1 py-2.5 bg-neutral-800 text-white font-bold text-xs rounded-xl hover:bg-neutral-700 transition uppercase"
          >
            Cancel
          </button>
          <button
            onClick={handleResetDataConfirmed}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs rounded-xl transition uppercase"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * MilestoneAlert component for celebrating progress milestones.
 * 
 * @param {Object} props
 * @param {Object} props.activeMilestoneAlert - Data about the triggered milestone.
 * @param {string} props.view - Current active view.
 * @param {boolean} props.isDark - Dark theme status.
 * @param {string} props.classTextHeading - Heading text class.
 * @param {string} props.classTextMute - Muted text class.
 * @param {number} props.totalArepasSold - Total arepas sold.
 * @param {number} props.totalRevenue - Total revenue raised.
 * @param {number} props.goal - Goal for arepas.
 * @param {Function} props.setActiveMilestoneAlert - Function to dismiss alert.
 */
export const MilestoneAlert = ({
  activeMilestoneAlert,
  view,
  isDark,
  classTextHeading,
  classTextMute,
  totalArepasSold,
  totalRevenue,
  goal,
  setActiveMilestoneAlert
}) => {
  if (!activeMilestoneAlert || view !== 'tv') return null;
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in ${isDark ? "bg-neutral-950/95" : "bg-white/95"} backdrop-blur-lg`}>
      <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-600"></div>

      <div className={`border rounded-3xl p-8 max-w-xl w-full text-center space-y-6 shadow-2xl relative overflow-hidden ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-yellow-500/10 blur-2xl rounded-full"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/10 blur-2xl rounded-full"></div>

        {/* Celebration Icon Header */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 animate-bounce">
          <Sparkles className="w-10 h-10" />
        </div>

        {/* Milestone Banner info */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-500 block">
            {activeMilestoneAlert.percent}% Milestone Achieved!
          </span>
          <h2 className={`text-3xl font-black leading-tight ${classTextHeading}`}>
            {activeMilestoneAlert.label}
          </h2>
          <p className={`text-sm ${classTextMute}`}>
            Melbourne Solidarity has cooked and contributed <strong className={`${classTextHeading} text-base`}>{activeMilestoneAlert.count} arepas</strong> so far to assist earthquake victims!
          </p>
        </div>

        {/* Visual Stats display inside modal */}
        <div className={`p-4 rounded-2xl border flex items-center justify-around gap-4 text-left font-sans shadow-sm ${isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-slate-200"}`}>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-black block">Arepas Sold</span>
            <span className="text-xl font-bold text-yellow-500">{totalArepasSold}</span>
          </div>
          <div className={`h-8 w-px ${isDark ? "bg-neutral-800" : "bg-slate-200"}`}></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-black block">Total Revenue</span>
            <span className="text-xl font-bold text-emerald-650">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className={`h-8 w-px ${isDark ? "bg-neutral-800" : "bg-slate-200"}`}></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-black block">National Target</span>
            <span className="text-xl font-bold text-blue-500">{goal}</span>
          </div>
        </div>

        {/* Autoclose countdown progress indicator */}
        <div className="space-y-4">
          <button
            onClick={() => setActiveMilestoneAlert(null)}
            className={`px-6 py-2.5 hover:bg-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl transition border ${isDark ? "bg-neutral-800 border-neutral-700 text-neutral-200" : "bg-slate-200 border-slate-300 text-slate-700"}`}
          >
            Dismiss & Return to Dashboard
          </button>
          <div className="text-[10px] text-slate-400">
            This notification will auto-dismiss in a few seconds...
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * StatusBanner component for displaying info/success/error messages.
 * 
 * @param {Object} props
 * @param {Object} props.statusMessage - Object with { type, text }.
 * @param {Function} props.setStatusMessage - Function to clear message.
 */
export const StatusBanner = ({ statusMessage, setStatusMessage }) => {
  if (!statusMessage) return null;
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-1 text-center text-xs flex justify-center items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${statusMessage.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
      <span className="text-slate-500 font-medium text-[11px]">{statusMessage.text}</span>
      <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-600 ml-2">×</button>
    </div>
  );
};
