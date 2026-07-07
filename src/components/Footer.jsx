import React from 'react';
import { Heart } from 'lucide-react';

/**
 * Footer component for the Papelón Relief Fundraising App.
 * Displays credits and partnership information.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {string} props.creatorName - Name of the application developer to display.
 * @param {string} props.classBgNested - CSS class for nested background elements.
 */
export const Footer = ({ isDark, creatorName, classBgNested }) => {
  return (
    <footer className={`${isDark ? 'bg-neutral-955 border-neutral-800' : 'bg-white border-slate-202'} border-t py-4 mt-4 mb-10 transition-colors`}>
      <div className="w-full max-w-[96%] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-semibold">

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="text-yellow-600 font-bold">Papelón Melbourne</span>
            <span>&</span>
            <span className="text-blue-600 font-bold">Venezuelan Association of Melbourne</span>
          </div>
          <span className="hidden sm:inline">&bull;</span>
          <span>&copy; 2026</span>
        </div>

        <div className={`flex flex-wrap justify-center items-center gap-4 px-4 py-1.5 rounded-2xl border ${classBgNested}`}>
          <div className={`flex items-center gap-1.5 ${isDark ? "text-neutral-300" : "text-slate-505"}`}>
            <Heart className="w-3.5 h-3.5 text-red-555 fill-red-500 animate-pulse" />
            <span>Designed & Developed by</span>
            <span className="text-yellow-600 font-extrabold hover:underline cursor-pointer">{creatorName}</span>
          </div>
          <span className={`${isDark ? "text-neutral-700" : "text-slate-300"} font-medium`}>|</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-neutral-400" : "text-slate-400"}`}>Volunteer Initiative</span>
        </div>

      </div>
    </footer>
  );
};
