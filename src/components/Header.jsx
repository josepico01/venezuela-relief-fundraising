import React from 'react';
import { Tv, Smartphone, Settings, Wifi, WifiOff, Sun, Moon, LogOut, Eye } from 'lucide-react';
import { LogoOne, LogoTwo } from './Logos';

/**
 * Header component for the Papelón Relief Fundraising App.
 * Handles navigation between different views (TV, Register, Admin) and displays connection status.
 * 
 * @param {Object} props
 * @param {string} props.authRole - The current authenticated role of the user.
 * @param {string} props.view - The current active view.
 * @param {Function} props.setView - Function to switch between views.
 * @param {string} props.connectionStatus - Current Firebase connection status ('online', 'connecting', 'offline').
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {Function} props.setTheme - Function to toggle between light and dark themes.
 * @param {Function} props.handleLogOut - Function to handle user logout.
 * @param {string} props.classBgHeader - CSS class for the header background.
 * @param {string} props.classTextMute - CSS class for muted text.
 */
export const Header = ({
  authRole,
  view,
  setView,
  connectionStatus,
  isDark,
  setTheme,
  handleLogOut,
  classBgHeader,
  classTextMute
}) => {
  return (
    <header className={`${classBgHeader} sticky top-0 z-40`}>
      <div className="w-full max-w-[96%] mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-4">

        {/* Logo, Flags Unity, and Branding */}
        <div className="flex items-center gap-3">
          {/* Embedded partner logos in header */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${isDark ? "bg-neutral-900/60 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
            <LogoOne />
            <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-neutral-700" : "bg-slate-300"}`}></div>
            <LogoTwo />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-yellow-400 via-blue-550 to-red-500 bg-clip-text text-transparent">
                Papelón & VAA
              </h1>
              <span className="text-[9px] bg-red-100 border border-red-200 px-1.5 py-0.5 rounded text-red-500 font-black uppercase tracking-wider hidden sm:inline">Relief Drive</span>
            </div>
            <p className={`text-[10px] sm:text-xs ${classTextMute} font-medium flex items-center gap-1`}>
              <span>Joint Initiative</span>
              <span>&bull;</span>
              <span className={isDark ? "text-neutral-300 font-semibold" : "text-slate-600 font-semibold"}>Venezuelan Association of Australia</span>
            </p>
          </div>
        </div>

        {/* Quick Network Sync Indicator Status */}
        <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-xl text-xs ${isDark ? "bg-neutral-900 border-neutral-850" : "bg-slate-55 border-slate-200"}`}>
          {connectionStatus === 'online' ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span className="text-emerald-600 font-bold hidden md:inline">Sync Online</span>
            </>
          ) : connectionStatus === 'connecting' ? (
            <>
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></div>
              <span className="text-yellow-600 font-bold hidden md:inline">Connecting...</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-red-500" />
              <span className="text-red-500 font-bold hidden md:inline">Offline Mode</span>
            </>
          )}
        </div>

        {/* Device View Toggles - ONLY SHOWN IF AUTHENTICATED AS STAFF ADMIN */}
        {authRole === 'staff_admin' ? (
          <div className={`flex items-center p-1 rounded-xl border ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
            <button
              onClick={() => setView('tv')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${view === 'tv' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-neutral-950 font-bold shadow' : classTextMute}`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>TV Screen</span>
            </button>
            <button
              onClick={() => setView('register')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${view === 'register' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow' : classTextMute}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Volunteer Register</span>
            </button>
            <button
              onClick={() => setView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${view === 'admin' ? (isDark ? "bg-neutral-800 text-white border border-neutral-700 shadow-sm" : "bg-slate-200 text-slate-800 border border-slate-300 shadow-sm") : classTextMute}`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Config</span>
            </button>
          </div>
        ) : (
          /* Discrete Public TV notice label */
          <div className="hidden md:flex items-center gap-1.5 bg-yellow-500/5 border border-yellow-500/10 px-3 py-1.5 rounded-xl text-yellow-600 text-xs font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            <span>Public TV Screen</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Theme Toggle Button next to Logout */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition ${isDark ? "bg-neutral-900 border-neutral-800 text-yellow-400 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800"}`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Logout Key */}
          <button
            onClick={handleLogOut}
            className={`p-2 rounded-xl border transition ${isDark ? "bg-neutral-900 hover:bg-red-950/20 border-neutral-800 hover:border-red-800/40 text-neutral-400 hover:text-red-400" : "bg-slate-50 hover:bg-red-50 border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-550"}`}
            title="Lock Terminal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
