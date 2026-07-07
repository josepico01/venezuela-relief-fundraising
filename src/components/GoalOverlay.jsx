import React from 'react';
import { Award, HeartHandshake, Sparkles } from 'lucide-react';
import { AustraliaFlagSVG, VenezuelaFlagSVG } from './Logos';

/**
 * GoalOverlay component for the Papelón Relief Fundraising App.
 * Full-screen celebratory overlay displayed when the fundraising goal is met.
 * 
 * @param {Object} props
 * @param {boolean} props.showGoalOverlay - Boolean indicating if the overlay should be shown.
 * @param {string} props.view - The current active view.
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {number} props.totalArepasSold - Total number of arepas sold.
 * @param {number} props.totalRevenue - Total funds raised.
 * @param {number} props.goal - The fundraising target.
 * @param {Function} props.triggerConfetti - Function to trigger a confetti animation.
 * @param {Function} props.setShowGoalOverlay - Function to toggle the overlay visibility.
 */
export const GoalOverlay = ({
  showGoalOverlay,
  view,
  isDark,
  totalArepasSold,
  totalRevenue,
  goal,
  triggerConfetti,
  setShowGoalOverlay
}) => {
  if (!showGoalOverlay || view !== 'tv') return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in backdrop-blur-xl overflow-y-auto ${isDark ? "bg-neutral-950/98" : "bg-white/98"}`}>

      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-blue-900 via-yellow-400 to-red-600"></div>

      <div className="max-w-3xl space-y-8 my-auto py-12 relative">

        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-tr from-yellow-400/10 via-red-500/10 to-transparent blur-2xl rounded-full animate-spin-slow pointer-events-none"></div>

        {/* Victory Badge */}
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-400 via-yellow-500 to-amber-600 shadow-xl animate-bounce relative">
          <Award className="w-16 h-16 text-white stroke-[1.5]" />
          <div className="absolute -inset-1 rounded-full border-4 border-yellow-300/30 animate-pulse"></div>
        </div>

        {/* Congratulatory Hero Heading */}
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-4">
            <AustraliaFlagSVG />
            <span className="text-xs tracking-widest uppercase font-black text-yellow-600 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-red-505 animate-pulse" />
              Earthquake Solidarity Goal Met!
            </span>
            <VenezuelaFlagSVG />
          </div>

          <h1 className={`text-5xl md:text-7xl font-black tracking-tight leading-none ${isDark ? "text-neutral-100" : "text-slate-800"}`}>
            GOAL REACHED! <br />
            <span className="bg-gradient-to-r from-yellow-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
              {totalArepasSold.toLocaleString()} AREPAS SOLD
            </span>
          </h1>

          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto ${isDark ? "text-neutral-300" : "text-slate-600"}`}>
            A massive thank you to Melbourne’s community! Through your incredible support, we have reached our goal of selling 2,000 arepas to aid families affected by the devastating earthquakes in Venezuela.
          </p>
        </div>

        {/* Financial & Counter highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto font-sans">
          <div className={`border p-5 rounded-2xl shadow-sm ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Total Earthquake Relief Funds</span>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className={`border p-5 rounded-2xl shadow-sm ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Arepas Contributed</span>
            <p className="text-3xl font-extrabold text-blue-600 mt-1">{totalArepasSold} / {goal}</p>
          </div>
        </div>

        {/* Close / Controls */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={triggerConfetti}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Shower More Confetti!</span>
          </button>
          <button
            onClick={() => setShowGoalOverlay(false)}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider rounded-xl border transition ${isDark ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-200" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
          >
            <span>Close Overlay & Keep Tracking</span>
          </button>
        </div>

      </div>
    </div>
  );
};
