import React, { useState } from 'react';

// Reusable SVG fallbacks for missing PNG assets
export const LogoOneSVG = ({ className = "w-full h-full filter drop-shadow-md" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="42" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
    <circle cx="50" cy="50" r="34" fill="#FCD34D" />
  </svg>
);

export const LogoTwoSVG = ({ className = "w-full h-full filter drop-shadow-md" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="44" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2.5" />
  </svg>
);

export const LogoOne = () => {
  const [error, setError] = useState(false);

  return (
    <span className="inline-block w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 p-1 flex items-center justify-center">
      {!error ? (
        <img
          src="/assets/logo1.png"
          alt="Papelón Logo"
          className="w-full h-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <LogoOneSVG />
      )}
    </span>
  );
};

export const LogoTwo = () => {
  const [error, setError] = useState(false);

  return (
    <span className="inline-block w-10 h-10 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center border border-slate-200">
      {!error ? (
        <img
          src="/assets/logo2.png"
          alt="VAA Logo"
          className="w-full h-full object-contain"
          onError={() => setError(true)}
        />
      ) : (
        <LogoTwoSVG />
      )}
    </span>
  );
};

export const AustraliaFlagSVG = () => (
    <span className="inline-block w-10 h-6.5">
    <svg viewBox="0 0 60 30" className="w-full h-full rounded border border-slate-300 shadow-sm flex-shrink-0">
      <rect width="60" height="30" fill="#00008d" />
      <path d="M0,0 L30,15 M0,15 L30,0" stroke="#ffffff" strokeWidth="3" />
      <path d="M0,0 L15,7.5 M30,15 L15,7.5 M0,15 L15,7.5 M30,0 L15,7.5" stroke="#de2910" strokeWidth="1" />
      <path d="M15,0 L15,15 M0,7.5 L30,7.5" stroke="#ffffff" strokeWidth="5" />
      <path d="M15,0 L15,15 M0,7.5 L30,7.5" stroke="#de2910" strokeWidth="3" />
      <polygon points="15,18.5 15.8,21 18.5,21 16.2,22.5 17.1,25 15,23.5 12.9,25 13.8,22.5 11.5,21 14.2,21" fill="#ffffff" />
      <polygon points="45,3.3 45.4,4.5 46.7,4.5 45.6,5.3 46,6.5 45,5.7 44,6.5 44.4,5.3 43.3,4.5 44.6,4.5" fill="#ffffff" />
      <polygon points="37.5,10.8 37.9,12 39.2,12 38.1,12.8 38.5,14 37.5,13.2 36.5,14 36.9,12.8 35.8,12 37.1,12" fill="#ffffff" />
      <polygon points="52.5,10.8 52.9,12 54.2,12 53.1,12.8 53.5,14 52.5,13.2 51.5,14 51.9,12.8 50.8,12 52.1,12" fill="#ffffff" />
      <polygon points="45,20.8 45.4,22 46.7,22 45.6,22.8 46,24 45,23.2 44,24 44.4,22.8 43.3,22 44.6,22" fill="#ffffff" />
      <polygon points="48,15.2 48.4,16.2 49.5,16.2 48.6,16.8 49,17.8 48,17.2 47,17.8 47.4,16.8 46.5,16.2 47.6,16.2" fill="#ffffff" />
    </svg>
  </span>
);

export const VenezuelaFlagSVG = () => (
    <span className="inline-block w-10 h-6.5">
    <svg viewBox="0 0 60 30" className="w-full h-full rounded border border-slate-300 shadow-sm flex-shrink-0">
      <rect width="60" height="10" fill="#ffcc00" />
      <rect y="10" width="60" height="10" fill="#00247d" />
      <rect y="20" width="60" height="10" fill="#cf142b" />
      <g fill="#ffffff" transform="translate(30, 15)">
        <circle cx="-12" cy="1" r="0.8" />
        <circle cx="-8.5" cy="-1.5" r="0.8" />
        <circle cx="-4.5" cy="-3.5" r="0.8" />
        <circle cx="0" cy="-4" r="0.8" />
        <circle cx="4.5" cy="-3.5" r="0.8" />
        <circle cx="8.5" cy="-1.5" r="0.8" />
        <circle cx="12" cy="1" r="0.8" />
        <circle cx="0" cy="-1" r="0.8" />
      </g>
    </svg>
  </span>
);
