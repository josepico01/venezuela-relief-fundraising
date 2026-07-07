import React from 'react';
import { Plus, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * RegisterView component for the Papelón Relief Fundraising App.
 * Interface for volunteers to record sales and extra donations.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Boolean indicating if the dark theme is active.
 * @param {string} props.classBgCard - CSS class for card background.
 * @param {string} props.classTextHeading - CSS class for heading text.
 * @param {string} props.classTextMute - CSS class for muted text.
 * @param {string} props.classBgInput - CSS class for input background.
 * @param {string} props.classBgNested - CSS class for nested background elements.
 * @param {string} props.registerName - The name assigned to this register terminal.
 * @param {Function} props.setRegisterName - Function to update the register name.
 * @param {number} props.arepaPrice - Price per arepa.
 * @param {Function} props.handleRecordSale - Function to log a new sale.
 * @param {Object} props.undoItem - The last recorded sale object, for undo functionality.
 * @param {Function} props.handleUndo - Function to undo the last sale.
 * @param {Array} props.sales - Array of all recorded sales.
 */
export const RegisterView = ({
  isDark,
  classBgCard,
  classTextHeading,
  classTextMute,
  classBgInput,
  classBgNested,
  registerName,
  setRegisterName,
  arepaPrice,
  handleRecordSale,
  undoItem,
  handleUndo,
  sales
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">

      {/* Quick configuration helper card */}
      <div className={`rounded-3xl p-5 shadow-sm relative overflow-hidden ${classBgCard}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className={`text-xs uppercase tracking-wider font-extrabold ${classTextMute}`}>Active Register Terminal Configuration</span>
            <h2 className={`text-2xl font-black mt-1 ${classTextHeading}`}>{registerName}</h2>
            <p className={`text-xs ${classTextMute}`}>Any quantities entered below instantly broadcast directly to the primary live TV tracking monitor.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              placeholder="E.g. Register A"
              className={`rounded-xl px-3 py-1.5 text-xs focus:ring-1 focus:ring-yellow-500 focus:outline-none w-36 ${classBgInput}`}
            />
          </div>
        </div>
      </div>

      {/* Tap-to-Add Interactive Pad */}
      <div className={`rounded-3xl p-5 md:p-6 shadow-sm space-y-4 relative ${classBgCard}`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDark ? "text-neutral-300" : "text-slate-700"}`}>Arepa Register Express Deck</h3>
          <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded font-black">Earthquake relief Campaign</span>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 5, 10].map((qty) => (
            <button
              key={qty}
              onClick={() => handleRecordSale(qty, 0)}
              className={`aspect-square border rounded-2xl flex flex-col justify-between p-4 text-left transition duration-200 group active:scale-95 ${isDark ? "bg-gradient-to-br from-neutral-900 to-neutral-950 border-neutral-800 hover:border-yellow-500" : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-yellow-500"}`}
            >
              <span className="text-slate-400 text-xs font-bold">Sell</span>
              <span className="text-4xl font-black text-yellow-500 group-hover:scale-110 transition duration-200 text-center w-full">+{qty}</span>
              <span className={`text-xs font-semibold ${classTextMute}`}>${qty * arepaPrice} Value</span>
            </button>
          ))}
        </div>

        {/* Custom & Combined Sales Input */}
        <div className={`rounded-2xl p-4 border space-y-4 ${classBgNested}`}>
          <h4 className={`text-xs font-extrabold uppercase tracking-wider ${classTextMute}`}>Custom / Mixed Sales Combination</h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const qty = e.target.customQty.value;
              const extra = e.target.customDonation.value;
              handleRecordSale(qty, extra);
              e.target.reset();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs mb-1 ${classTextMute}`}>Arepa Quantity</label>
                <input
                  name="customQty"
                  type="number"
                  min="0"
                  placeholder="0"
                  defaultValue=""
                  className={`w-full rounded-xl px-3 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${classTextMute}`}>Additional Earthquake Donation ($ AUD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    name="customDonation"
                    type="number"
                    min="0"
                    placeholder="0.00"
                    defaultValue=""
                    className={`w-full rounded-xl pl-7 pr-3 py-2.5 text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none ${classBgInput}`}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm rounded-xl hover:shadow-lg transition duration-200 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Log Sale & Help Victims</span>
            </button>
          </form>
        </div>

        {/* Undo action panel */}
        {undoItem && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-4 animate-slide-up">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-slate-600">
                Logged <strong className="text-slate-800">{undoItem.quantity}</strong> arepas + <strong className="text-slate-800">${undoItem.extraDonation}</strong>. Made an input mistake?
              </p>
            </div>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-400 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          </div>
        )}

      </div>

      {/* Local Registers Audit List */}
      <div className={`rounded-3xl p-5 shadow-sm ${classBgCard}`}>
        <h3 className="text-xs uppercase text-slate-400 tracking-wider font-extrabold mb-4">Your Recent Cashier Operations</h3>

        <div className="space-y-3">
          {sales.filter(s => s.registerName === registerName).length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              You haven't logged any sales from this terminal yet today.
            </div>
          ) : (
            sales.filter(s => s.registerName === registerName).slice(0, 4).map((sale, idx) => (
              <div key={sale.id || idx} className={`p-3 rounded-2xl flex items-center justify-between text-xs border ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-slate-50 border-slate-200"}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className={`font-bold ${isDark ? "text-neutral-200" : "text-slate-700"}`}>{sale.quantity} Arepas</span>
                  {sale.extraDonation > 0 && (
                    <span className="text-emerald-600 font-semibold">(+${sale.extraDonation} extra)</span>
                  )}
                </div>
                <span className="text-slate-400">
                  {new Date(sale.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
