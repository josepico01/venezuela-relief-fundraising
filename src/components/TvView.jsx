import React from 'react';
import { Sparkles, AlertTriangle, Heart, Users, DollarSign, ArrowRight } from 'lucide-react';
import { AustraliaFlagSVG, VenezuelaFlagSVG } from './Logos';

/**
 * TvView component for the Papelón Relief Fundraising App.
 * Main scoreboard/telethon view designed for TV projection.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {Object} props.lastSaleAlert - Object containing details of the last recorded sale.
 * @param {string} props.classTextHeading - CSS class for heading text.
 * @param {string} props.classBgCard - CSS class for card background.
 * @param {string} props.classTextMute - CSS class for muted text.
 * @param {number} props.goal - The fundraising target for number of arepas.
 * @param {number} props.progressPercentage - The current progress towards the goal as a percentage.
 * @param {number} props.totalArepasSold - Total number of arepas sold.
 * @param {number} props.remainingArepas - Number of arepas remaining to reach the goal.
 * @param {number} props.totalRevenue - Total funds raised (arepas + extra donations).
 * @param {number} props.totalExtraDonations - Total amount of extra donations received.
 * @param {number} props.arepaPrice - Price per arepa.
 * @param {Array} props.sales - Array of sale objects.
 * @param {string} props.donationQrUrl - URL for the donation portal QR code.
 * @param {Array} props.volunteers - Array of volunteer names on duty.
 */
export const TvView = ({
  isDark,
  lastSaleAlert,
  classTextHeading,
  classBgCard,
  classTextMute,
  goal,
  progressPercentage,
  totalArepasSold,
  remainingArepas,
  totalRevenue,
  totalExtraDonations,
  arepaPrice,
  sales,
  donationQrUrl,
  volunteers
}) => {
  return (
    <div className="space-y-4 animate-fade-in pb-10">

      {/* Top Celebratory Toast / Popup Alert on Sale - Only renders when alert is active and not timed out */}
      {lastSaleAlert && (
        <div className="bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600 p-0.5 rounded-xl shadow-md animate-bounce max-w-xl mx-auto">
          <div className={`p-3 rounded-lg flex items-center justify-between gap-3 ${isDark ? "bg-neutral-950" : "bg-white"}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className={`font-extrabold text-sm leading-tight ${classTextHeading}`}>Just Ordered!</h4>
                <p className="text-xs text-slate-550 leading-tight">
                  <span className="text-yellow-600 font-bold">{lastSaleAlert.registerName}</span> ordered <span className="text-yellow-600 font-extrabold text-base">{lastSaleAlert.quantity}</span> arepas for earthquake relief!
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 block mb-0.5">Live Feed</span>
              <span className="text-[10px] text-slate-400">{new Date(lastSaleAlert.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Visual Telethon Dashboard Grid - Compacted layout to avoid scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Left Column: Huge Metric Display Cards */}
        <div className="lg:col-span-8 space-y-4">

          {/* Visual Banner Header - Shrunk vertically to guarantee fit */}
          <div className={`relative overflow-hidden rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-4 ${classBgCard}`}>
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-500/5 via-red-500/5 to-transparent blur-3xl pointer-events-none"></div>

            <div className="space-y-2 text-center md:text-left z-10">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <div className={`inline-flex items-center gap-2 border px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isDark ? "bg-red-500/10 border-red-900/30 text-red-400" : "bg-red-50 border-red-200 text-red-550"}`}>
                  <AlertTriangle className="w-3 h-3 animate-pulse" /> Venezuela Earthquake Disaster Relief
                </div>

                <div className={`inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-[10px] font-medium ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-300" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                  <AustraliaFlagSVG />
                  <span className="font-bold text-[10px]">Melbourne Solidarity</span>
                  <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500 animate-pulse" />
                  <VenezuelaFlagSVG />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Venezuela Earthquake Relief <br />
                <span className="bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600/40 bg-clip-text text-transparent">Cook & Donate: Goal {goal} Arepas</span>
              </h2>
              <p className={`text-xs max-w-lg leading-relaxed ${classTextMute}`}>
                Every single arepa contribution today aids displaced communities struggling with housing, nutrition, and medical resources following the devastating earthquakes in Venezuela. Jointly organized by **Papelón Melbourne** and the **Venezuelan Association of Melbourne**.
              </p>
            </div>

            {/* Big Circular Counter Wheel - Clean SVG progression line only, outer border removed */}
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 144 144" className="absolute w-full h-full -rotate-90">
                <circle
                  cx="72" cy="72" r="62"
                  className={`stroke-[6] fill-transparent ${isDark ? "stroke-neutral-855" : "stroke-slate-202"}`}
                />
                <circle
                  cx="72" cy="72" r="62"
                  className="stroke-yellow-400 stroke-[6] fill-transparent transition-all duration-1000 ease-out"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 * (1 - progressPercentage / 100)}
                />
              </svg>
              <div className="text-center p-1 z-10">
                <span className={`block text-3xl font-black leading-none ${isDark ? "text-neutral-100" : "text-slate-855"}`}>{totalArepasSold}</span>
                <span className={`block text-[9px] uppercase tracking-wider mt-0.5 ${classTextMute}`}>Arepas Cooked</span>
                <span className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isDark ? "bg-neutral-850 text-yellow-405" : "bg-slate-202 text-yellow-600"}`}>
                  Goal: {goal}
                </span>
              </div>
            </div>
          </div>

          {/* Main Progress Indicator and Metronome Bar - Compact Spacing */}
          <div className={`rounded-2xl p-4 shadow-sm space-y-3 relative overflow-hidden ${classBgCard}`}>
            <div className="flex justify-between items-end">
              <div>
                <h3 className={`text-[10px] uppercase tracking-wider font-extrabold ${classTextMute}`}>Melbourne Solidarity target progress</h3>
                <p className="text-2xl font-black text-yellow-600">{progressPercentage}% Towards Goal</p>
              </div>
              <div className="text-right">
                {totalArepasSold >= goal ? (
                  <p className="text-sm font-extrabold text-emerald-600 animate-pulse">🎯 Target Reached! Thank you Melbourne!</p>
                ) : (
                  <>
                    <p className={`text-[10px] font-semibold leading-none ${classTextMute}`}>Remaining to target:</p>
                    <p className="text-lg font-bold text-red-500 animate-pulse mt-0.5">{remainingArepas} Arepas</p>
                  </>
                )}
              </div>
            </div>

            {/* Multi-layered custom Progress Bar representing colors of the flag */}
            <div className={`w-full h-8 rounded-xl overflow-hidden p-0.5 flex items-center relative ${isDark ? "bg-neutral-900 border border-neutral-800" : "bg-slate-100 border border-slate-200"}`}>
              <div
                className="h-full rounded-lg transition-all duration-1000 ease-out relative overflow-hidden flex"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="w-full h-full absolute bg-gradient-to-r from-blue-950 via-yellow-400 to-red-600 animate-gradient-bg"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1.5rem_1.5rem] animate-pulse"></div>
              </div>

              {/* Animated target milestone indicator lines */}
              <div className={`absolute left-1/4 top-0 bottom-0 w-px border-l border-dashed border-neutral-950 ${isDark ? "bg-white/10" : "bg-white/25"}`} title="25% Milestone"></div>
              <div className={`absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-neutral-950 ${isDark ? "bg-white/20" : "bg-white/35"}`} title="50% Milestone"></div>
              <div className={`absolute left-3/4 top-0 bottom-0 w-px border-l border-dashed border-neutral-950 ${isDark ? "bg-white/10" : "bg-white/25"}`} title="75% Milestone"></div>
            </div>

            <div className={`flex justify-between text-[10px] font-semibold px-0.5 leading-none ${classTextMute}`}>
              <span className={`${totalArepasSold >= goal * 0.25 ? 'text-yellow-600 font-bold' : ''}`}>0 (25% @ {Math.round(goal * 0.25)})</span>
              <span className={`${totalArepasSold >= goal * 0.50 ? 'text-yellow-600 font-bold' : ''}`}>500 (50% @ {Math.round(goal * 0.50)})</span>
              <span className={`${totalArepasSold >= goal * 0.75 ? 'text-yellow-600 font-bold' : ''}`}>1,000 (75% @ {Math.round(goal * 0.75)})</span>
              <span className={`${totalArepasSold >= goal ? 'text-emerald-500 font-bold' : ''}`}>2,000 (Goal)</span>
            </div>
          </div>

          {/* Sub-Metric Card - Adjusted to fit horizontally with wider layout */}
          <div className={`rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between h-32 ${classBgCard}`}>
            <div className={`absolute top-4 right-4 p-2.5 rounded-2xl border ${isDark ? "bg-emerald-500/10 border-emerald-900/30 text-emerald-400" : "bg-emerald-50 border-emerald-100 text-emerald-600"}`}>
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-wider font-extrabold block ${classTextMute}`}>Total Live Earthquake Fund</span>
              <h3 className={`text-3xl font-black mt-1 animate-pulse leading-none ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                ${totalRevenue.toLocaleString()} <span className="text-xs font-normal">AUD</span>
              </h3>
            </div>
            <div className={`border-t pt-2 text-[10px] flex justify-between items-center leading-none ${isDark ? "border-neutral-900 text-neutral-500" : "border-slate-100 text-slate-400"}`}>
              <span>Arepas cooked: ${(totalArepasSold * arepaPrice).toLocaleString()}</span>
              <span>Donations: ${totalExtraDonations.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Right Column: QR Code + Active Register Feeds */}
        <div className="lg:col-span-4 space-y-4">

          {/* High contrast donation card with QR Code - Slightly Compacted */}
          <div className={`border-2 rounded-2xl p-4 text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center ${isDark ? "bg-neutral-950 border-red-500/10" : "bg-white border-red-500/20"}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-red-600"></div>

            <h3 className={`font-extrabold text-sm mb-0.5 leading-none ${isDark ? "text-neutral-100" : "text-slate-800"}`}>Earthquake Relief Donation</h3>
            <p className="text-[10px] text-slate-500 mb-2 max-w-xs leading-tight">
              Scan to support earthquake relief survivors in Venezuela directly with your mobile.
            </p>

            <div className={`p-2 rounded-xl shadow-md inline-block mb-2 border hover:scale-105 transition duration-200 ${isDark ? "bg-white border-yellow-500" : "bg-white border-yellow-400"}`}>
              <div className="relative flex flex-col items-center justify-center w-28 h-28">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(donationQrUrl)}`}
                  alt="Scannable Event QR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <a
              href={donationQrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-yellow-600 hover:text-yellow-750 font-bold bg-yellow-500/5 px-3 py-1 rounded-lg border border-yellow-500/20 transition-all duration-200 leading-none"
            >
              <span>Visit Donation Portal</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Recent Event Log Stream (TV ticker) with customizable scrollbar style */}
          <div id="live-contributions-card" className={`rounded-2xl p-4 shadow-sm flex-1 flex flex-col justify-between overflow-hidden ${classBgCard}`}>
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-red-555 leading-none block">Live Arepa Contributions</span>
              <span className={`text-[9px] border px-1.5 py-0.5 rounded font-bold leading-none ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-404" : "bg-slate-50 border-slate-202 text-slate-505"}`}>Live Feed</span>
            </div>

            {/* Flexible internal scrolling area with fixed height limits on mobile, but full flex height on TV monitor */}
            <div className="space-y-1.5 overflow-y-auto pr-1 dark-scrollbar flex-grow h-0 min-h-[205px]">
              {sales.length === 0 ? (
                <div className="text-center py-8 text-slate-404 text-[10px] my-auto">
                  No transactions logged yet. Let's make a difference together!
                </div>
              ) : (
                sales.map((sale, idx) => (
                  <div
                    key={sale.id || idx}
                    className={`border rounded-xl p-1.5 flex justify-between items-center transition ${isDark ? "bg-neutral-900 border-neutral-855 hover:border-neutral-755" : "bg-slate-50 border-slate-101"}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-550 to-red-600 flex items-center justify-center text-[9px] font-black text-white shadow-sm flex-shrink-0">
                        {sale.quantity}
                      </div>
                      <div>
                        <p className={`text-[10px] font-bold leading-tight ${classTextHeading}`}>
                          {sale.quantity} {sale.quantity === 1 ? 'Arepa' : 'Arepas'}
                        </p>
                        <p className={`text-[8px] leading-none ${classTextMute}`}>
                          Via <span className={isDark ? "text-neutral-300" : "text-slate-500"}>{sale.registerName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {sale.extraDonation > 0 ? (
                        <span className={`inline-block text-[7px] px-1 py-0.5 rounded-full font-bold leading-none ${isDark ? "bg-emerald-500/15 text-emerald-455" : "bg-emerald-100 text-emerald-700"}`}>
                          +${sale.extraDonation} Support
                        </span>
                      ) : (
                        <span className={`text-[7px] block leading-none ${classTextMute}`}>Standard</span>
                      )}
                      <span className={`text-[7px] block leading-none ${classTextMute} mt-0.5`}>
                        {new Date(sale.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* --- VOLUNTEER NEWS REPORT TICKER --- */}
      <div className={`fixed bottom-0 left-0 right-0 h-10 border-t z-30 flex items-center overflow-hidden transition-colors ${isDark ? "bg-neutral-955 border-neutral-808" : "bg-white border-slate-202"}`}>
        <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 px-4 flex items-center gap-2 shadow-sm z-10 flex-shrink-0">
          <span className="animate-pulse w-2 h-2 rounded-full bg-white"></span>
          <span className="text-[10px] font-black tracking-widest uppercase text-white whitespace-nowrap">SOLIDARITY HEROES:</span>
        </div>

        <div className="relative flex-grow h-full flex items-center overflow-hidden">
          <div
            className="animate-marquee flex items-center gap-12 text-xs font-bold font-sans"
            style={{ animationDuration: `${Math.max(30, volunteers.length * 12)}s` }}
          >
            {[1, 2].map((loop) => (
              <div key={loop} className="flex items-center gap-8 pl-4">
                {volunteers.map((vol, index) => (
                  <span key={`${index}-${loop}`} className="flex items-center gap-3.5 whitespace-nowrap">
                    {/* Reverted back to high-fidelity flags as requested by the demo feedback */}
                    <AustraliaFlagSVG />
                    <span className={`border px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm ${isDark ? "bg-neutral-900 border-neutral-800 text-neutral-202" : "bg-slate-50 border-slate-202 text-slate-707"}`}>
                      {vol}
                    </span>
                    <VenezuelaFlagSVG />
                    <span className="text-[10px] text-slate-405">🤝</span>
                  </span>
                ))}
                <span className="text-yellow-400 uppercase tracking-widest text-[10px] font-black">
                  • AUSTRALIA ❤️ VENEZUELA UNITED FOR EARTHQUAKE SURVIVORS •
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full bg-yellow-500 px-3 flex items-center gap-1 z-10 flex-shrink-0">
          <Users className="w-3.5 h-3.5 text-neutral-955 animate-bounce" />
          <span className="text-[9px] font-black text-neutral-950 uppercase tracking-wider">{volunteers.length} ON DUTY</span>
        </div>
      </div>

    </div>
  );
};
