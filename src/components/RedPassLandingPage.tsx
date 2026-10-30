import React from 'react';
import { Ticket, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Sparkles, GraduationCap, Clock, QrCode, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RedPassLandingPage: React.FC = () => {
  const {
    getStandardPassPrice,
    getPerRidePrice,
    purchasePass,
    activePass,
    setActiveTab,
    isStudentVerified,
    setIsStudentModalOpen,
    source,
    destination,
  } = useApp();

  const standardPrice = getStandardPassPrice();
  const perRidePrice = getPerRidePrice();

  const handleBuyStandard = () => {
    purchasePass('standard');
    setActiveTab('wallet');
  };

  const handleBuyStudent = () => {
    if (!isStudentVerified) {
      setIsStudentModalOpen(true);
      return;
    }
    purchasePass('student', { college: 'Verified College', roll: '2024-STU' });
    setActiveTab('wallet');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-redbus-600 via-redbus-500 to-rose-600 rounded-3xl text-white p-8 sm:p-12 shadow-elevated mb-10">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold mb-4 border border-white/30">
            <Ticket className="w-4 h-4 text-white" />
            <span>PRODUCT INNOVATION PIVOT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            RED PASS
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-red-100 mt-2">
            3 prepaid rides. Your bus. Your seat. Total flexibility.
          </p>
          <p className="text-sm sm:text-base text-red-100/90 mt-3 leading-relaxed max-w-2xl">
            Never face bus stop anxiety again. Book your favorite operator, pick your exact seat, and enjoy free bus changes up to 1 hour before departure.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleBuyStandard}
              className="px-6 py-3.5 bg-white text-redbus-600 hover:bg-red-50 font-extrabold text-sm rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <span>Buy 3-Ride Pack (₹{standardPrice.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {activePass && (
              <button
                onClick={() => setActiveTab('wallet')}
                className="px-5 py-3.5 bg-red-800/60 hover:bg-red-800/80 border border-white/30 text-white font-bold text-sm rounded-xl transition"
              >
                Go to Active Wallet ({activePass.remainingRides} rides left)
              </button>
            )}
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Case Study Comparison: Open Ticket (Failed) vs Red Pass (Pivot) */}
      <div className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            The Product Pivot: Open Ticket vs Red Pass
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why redBus evolved beyond open passes to guaranteed-seat digital ride packs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Failed Open Ticket concept */}
          <div className="bg-white rounded-2xl border-2 border-red-100 p-6 shadow-soft relative overflow-hidden">
            <div className="flex items-center space-x-2 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
              <XCircle className="w-4 h-4" />
              <span>Previous Failed Model: Open Ticket</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              &quot;Hop on any bus, any time&quot;
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span><strong>No guaranteed seat:</strong> Passengers fought for standing space or were turned away on crowded weekends.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span><strong>Severe stop anxiety:</strong> Unpredictable operator wait times at bus stops.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">✕</span>
                <span><strong>Manual conductor disputes:</strong> Difficult paper audit and operator settlement delays.</span>
              </li>
            </ul>
          </div>

          {/* Red Pass Solution */}
          <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 shadow-soft relative overflow-hidden">
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Redesigned Solution: Red Pass</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">
              Prepaid Economy + Confirmed Seat Allocation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Confirmed named seat:</strong> Every ride reserves a specific seat on a specific bus before boarding.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Flexible 1-hr swap:</strong> Change to another departure free of charge up to 1 hour before departure.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Instant QR boarding:</strong> Single scan check-in with automated digital conductor settlement.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing Packs Grid */}
      <div className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Choose Your Red Pass Pack
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Available on the <strong>{source} ⇄ {destination}</strong> pilot corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Pack 1: Standard Red Pass */}
          <div className="bg-white rounded-3xl border-2 border-red-500 p-7 shadow-soft relative flex flex-col justify-between">
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Most Popular
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-redbus-500 uppercase tracking-wider">Regular Commuters</div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Standard Red Pass</h3>
              <p className="text-xs text-slate-500 mt-1">Ideal for frequent short-route travelers & professionals.</p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-slate-900">₹{standardPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-bold text-slate-400">/ 3 rides</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md border border-emerald-200">
                  ₹{perRidePrice} effective fare per ride (Save up to 12%)
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>3 Prepaid Rides:</strong> Valid for 30 days from purchase</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Full Seat Choice:</strong> Pick your exact seat on any eligible bus</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>1-Hour Free Bus Swap:</strong> Up to 3 swaps per booked ride</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Loyalty Rewards:</strong> ₹100 voucher every 15 completed boardings</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleBuyStandard}
              className="w-full py-3.5 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>Purchase Standard Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pack 2: Campus Student Pack */}
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-7 shadow-soft relative flex flex-col justify-between">
            <div className="absolute top-4 right-4">
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Student Special
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                Verified Students
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Campus Red Pass</h3>
              <p className="text-xs text-slate-500 mt-1">Subsidized student pilot for weekend home trips.</p>

              <div className="my-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-slate-900">₹1,140</span>
                  <span className="text-xs font-bold text-slate-400">/ 3 rides</span>
                </div>
                <div className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md border border-emerald-200">
                  ₹380 effective fare per ride (Save up to 16%)
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 mb-6">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>3 Prepaid Rides:</strong> Valid for current college semester</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Full Seat Choice:</strong> Pick your exact seat on any eligible bus</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Student ID Gated:</strong> Max 2 packs per student per semester</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Status:</strong> {isStudentVerified ? '✅ Student ID Verified' : '⚠️ Verification Required'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleBuyStudent}
              className={`w-full py-3.5 font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 ${
                isStudentVerified
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              <span>{isStudentVerified ? 'Purchase Campus Pass (₹1,140)' : 'Verify Student ID to Unlock'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Rules & Policies Accordion / Info Grid */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-redbus-500" />
          Red Pass Rules & Policy Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center">
              <Clock className="w-4 h-4 mr-1 text-slate-500" />
              1-Hour Free Bus Swap
            </div>
            <p>
              Plans changed? Swap to another scheduled departure of the same operator free of charge up to 60 minutes before departure. Maximum 3 swaps per ride.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center">
              <Ticket className="w-4 h-4 mr-1 text-slate-500" />
              Ride Re-Credit Policy
            </div>
            <p>
              Cancelling up to 1 hour before departure re-credits 1 ride directly back into your pack. (Max 2 free cancellations per pack. No cash refunds).
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center">
              <Award className="w-4 h-4 mr-1 text-slate-500" />
              Loyalty Milestone
            </div>
            <p>
              Earn a ₹100 discount voucher after every 15 completed, QR-verified boardings. Vouchers apply to your next pass purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
