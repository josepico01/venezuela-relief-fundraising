import React from 'react';
import { Heart, Tv, ArrowRight, Lock, Sun, Moon } from 'lucide-react';
import { LogoOne, LogoTwo, AustraliaFlagSVG, VenezuelaFlagSVG } from './Logos';

/**
 * AccessPortal component for the Papelón Relief Fundraising App.
 * Initial entry screen for selecting between TV view and Volunteer/Admin access via PIN.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {Function} props.setTheme - Function to toggle between light and dark themes.
 * @param {Function} props.setAuthRole - Function to set the user's authentication role.
 * @param {Function} props.setView - Function to set the current view.
 * @param {string} props.pinInput - The current value of the PIN input field.
 * @param {Function} props.setPinInput - Function to update the PIN input value.
 * @param {boolean} props.pinError - Boolean indicating if a PIN error occurred.
 * @param {Function} props.handleVerifyPin - Function to verify the entered PIN.
 */
export const AccessPortal = ({
  isDark,
  setTheme,
  setAuthRole,
  setView,
  pinInput,
  setPinInput,
  pinError,
  handleVerifyPin
}) => {
  return (
    <div className={`min-h-screen ${isDark ? "bg-neutral-955 text-white" : "bg-slate-50 text-slate-900"} font-sans flex flex-col justify-between p-4 relative overflow-hidden transition-colors duration-200`}>

      {/* Colorful Venezuelan Border Accent */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-600"></div>

      {/* Ambient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full mx-auto my-auto space-y-6 z-10">

        {/* Logo Brand Header & Partnership Graphics */}
        <div className="text-center space-y-3">

          {/* Embedded partner logos side by side with unity link */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <LogoOne />
              <span className="text-[9px] text-yellow-600 font-bold uppercase tracking-wider">Papelón</span>
            </div>

            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow ${isDark ? "border-neutral-800 bg-neutral-900" : "border-slate-200 bg-white"}`}>
              <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <LogoTwo />
              <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider">Asociación</span>
            </div>
          </div>

          <div>
            <div className="flex justify-center items-center gap-4">
              <AustraliaFlagSVG />
              <span className="text-slate-400 font-black text-sm">❤️</span>
              <VenezuelaFlagSVG />
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-500 via-blue-500 to-red-550 bg-clip-text text-transparent tracking-tight mt-3">
              Papelón Melbourne
            </h1>
            <p className={`text-xs ${isDark ? "text-neutral-400" : "text-slate-600"} font-semibold tracking-wide uppercase mt-1`}>
              Venezuela Earthquake Relief Fundraiser
            </p>
          </div>
        </div>

        {/* Access Mode Selector */}
        <div className={`border rounded-3xl p-6 shadow-xl space-y-6 ${isDark ? "bg-neutral-900 border-neutral-800 shadow-2xl" : "bg-white border-slate-200"}`}>

          <div className="space-y-3">
            <h2 className="text-xs uppercase font-black tracking-widest text-slate-400 text-center">Select Access Portal Mode</h2>

            {/* Button A: TV Screen Mode (Instant Public Access) */}
            <button
              onClick={() => {
                setAuthRole('tv_public');
                setView('tv');
              }}
              className={`w-full p-4 border rounded-2xl flex items-center justify-between text-left transition duration-200 group ${isDark ? "bg-neutral-950 hover:bg-neutral-850 border-neutral-800 hover:border-yellow-500/40" : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-yellow-500/40"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/5 rounded-xl flex items-center justify-center text-yellow-600 border border-yellow-500/20">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block font-bold text-sm group-hover:text-yellow-600 transition ${isDark ? "text-white" : "text-slate-800"}`}>TV Display Screen</span>
                  <span className="block text-xs text-slate-500">Public scoreboard view for TV projection.</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-yellow-600 transition transform group-hover:translate-x-1" />
            </button>

            {/* Separator */}
            <div className="flex items-center justify-center gap-3 py-1">
              <div className={`h-px flex-grow ${isDark ? "bg-neutral-800" : "bg-slate-200"}`}></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">or</span>
              <div className={`h-px flex-grow ${isDark ? "bg-neutral-800" : "bg-slate-200"}`}></div>
            </div>

            {/* Pin Code verification for Staff / Admin (Fully Masked) */}
            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div className="text-center">
                <span className={`block font-bold text-xs ${isDark ? "text-neutral-300" : "text-slate-600"}`}>Volunteer & Coordinator Entry</span>
                <p className="text-[10px] text-slate-500">Enter access passcode to manage registers and settings.</p>
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  maxLength="6"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter Secure Passcode"
                  className={`w-full border rounded-xl pl-10 pr-4 py-3 text-center text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none tracking-widest font-extrabold ${isDark ? "bg-neutral-950 border-neutral-800 text-white" : "bg-slate-50 border-slate-200 text-slate-800"}`}
                />
              </div>

              {pinError && (
                <p className="text-[11px] text-red-500 text-center font-bold animate-pulse">
                  ⚠️ Invalid Passcode. Please try again!
                </p>
              )}

              <button
                type="submit"
                disabled={pinInput.length < 4}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 disabled:from-slate-100 disabled:to-slate-100 text-neutral-950 disabled:text-slate-400 font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 hover:shadow shadow-md active:scale-95"
              >
                Authorize Terminal
              </button>
            </form>

          </div>

        </div>

        {/* Core Theme Toggle outside before authorization */}
        <div className="flex justify-center">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm ${isDark ? "bg-neutral-900 border-neutral-800 text-yellow-400 hover:bg-neutral-800" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"}`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>Switch to {isDark ? 'Light' : 'Dark'} Theme</span>
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-slate-400 mt-4">
        Papelón Melbourne x Venezuelan Association of Melbourne &copy; 2026. Made with solidarity.
      </div>

    </div>
  );
};
