import React from 'react';
import { Ticket, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RedPassDiscoverySection: React.FC = () => {
  const {
    source,
    destination,
    setActiveTab,
    getStandardPassPrice,
    getPerRidePrice,
    activePass,
    isMobileView,
  } = useApp();

  const standardPrice = getStandardPassPrice();
  const perRidePrice = getPerRidePrice();
  const isWarangalCorridor =
    (source === 'Warangal' && destination === 'Hyderabad') ||
    (source === 'Hyderabad' && destination === 'Warangal');

  return (
    <section className="mt-4 sm:mt-6 w-full">
      <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50/50 rounded-2xl border border-red-200 p-3.5 sm:p-5 shadow-soft transition-all hover:border-red-300">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-red-100/40 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-28 h-28 bg-amber-100/30 rounded-full blur-xl pointer-events-none"></div>

        <div className={`relative z-10 flex flex-col ${isMobileView ? 'gap-3.5' : 'lg:flex-row lg:items-center justify-between gap-5'}`}>
          {/* Left Column: Heading and Value Proposition */}
          <div className="flex-1 min-w-0">
            {/* Pill Header */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-redbus-500 text-white shadow-xs">
                <Ticket className="w-3 h-3 mr-1" />
                RED PASS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-emerald-600" />
                Your Bus • Your Seat • 3 Rides
              </span>
              {isWarangalCorridor && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-900 border border-amber-200">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-amber-600" />
                  Pilot Route Eligible
                </span>
              )}
            </div>

            <h3 className="text-sm sm:text-lg font-black text-slate-800 tracking-tight leading-snug">
              Your regular route? <span className="text-redbus-500">Make every ride count.</span>
            </h3>
            <p className="mt-1 text-slate-600 text-xs leading-relaxed">
              3 prepaid rides with total flexibility to select your favorite operator, departure time, and confirmed seat on every trip.
            </p>

            {/* Core Value Pillars */}
            <div className={`mt-2.5 grid ${isMobileView ? 'grid-cols-1 gap-1.5' : 'grid-cols-1 sm:grid-cols-2 gap-2'} text-[11px] text-slate-700`}>
              <div className="flex items-center space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                </div>
                <span><strong>No random boarding:</strong> Confirmed named seat</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                </div>
                <span><strong>Flexible Changes:</strong> Free swap up to 1 hr prior</span>
              </div>
            </div>

            {/* Student Offer Callout */}
            <div className="mt-2.5 inline-flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 w-full sm:w-auto">
              <GraduationCap className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
              <span>
                <strong>Campus Red Pass:</strong> Verified students get 3 rides for <strong>₹1,140</strong>.
              </span>
            </div>
          </div>

          {/* Right Column: Pricing & Call to Action */}
          <div className={`${isMobileView ? 'w-full' : 'w-full lg:w-auto'} flex-shrink-0 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-red-100 shadow-xs flex flex-row ${isMobileView ? 'items-center justify-between' : 'lg:flex-col lg:items-end justify-between'} gap-3`}>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                3-Ride Pack
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">₹{standardPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  ₹{perRidePrice}/ride
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Save vs ~₹450 fare
              </div>
              <div className="text-[9px] text-emerald-700 font-semibold">
                Auto-resets every 3 rides (MVP)
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('red-pass-explore')}
                className="px-4 py-2 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5 group flex-shrink-0"
              >
                <span>Explore Red Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </button>

              {activePass && (
                <button
                  type="button"
                  onClick={() => setActiveTab('wallet')}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[10px] rounded-lg transition text-center"
                >
                  Active Pass ({activePass.remainingRides} left)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Small Seat-Certainty Statement Footer */}
        <div className="mt-3 pt-2.5 border-t border-red-100 flex flex-wrap items-center justify-between text-[10px] text-slate-500 gap-1.5">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-redbus-500 flex-shrink-0" />
            <span>
              <strong>Guaranteed Seating:</strong> Every ride booked against specific bus & seat.
            </span>
          </div>
          <span className="text-slate-400">90-Day Proposed Validity</span>
        </div>
      </div>
    </section>
  );
};
