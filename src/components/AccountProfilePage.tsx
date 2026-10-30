import React from 'react';
import { User, Ticket, Calendar, ShieldCheck, Award, ArrowRight, CheckCircle2, ChevronRight, Sliders, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountProfilePage: React.FC = () => {
  const {
    activePass,
    bookings,
    loyalty,
    isStudentVerified,
    setIsStudentModalOpen,
    setActiveTab,
    setIsDemoControlsOpen,
    passengerDetails,
    showToast,
  } = useApp();

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed' || b.status === 'swapped');
  const pastBookings = bookings.filter((b) => b.status === 'boarded' || b.status === 'cancelled');

  return (
    <div className="max-w-xl mx-auto px-3.5 py-3 space-y-3">
      {/* Customer Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-soft">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-full bg-red-50 text-redbus-600 border border-red-200 flex items-center justify-center font-bold text-base flex-shrink-0">
            {passengerDetails.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-900 truncate">{passengerDetails.name}</h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full border border-emerald-200 flex-shrink-0">
                Verified Rider
              </span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5 truncate">
              <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="truncate">{passengerDetails.email}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
              <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span>+91 {passengerDetails.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Red Pass Plan Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Ticket className="w-4 h-4 text-redbus-500" />
            <h4 className="text-sm font-bold text-slate-900">Active Ride Plan</h4>
          </div>
          {activePass ? (
            <span className="text-[10px] font-bold bg-red-50 text-redbus-600 border border-red-200 px-2 py-0.5 rounded-full">
              {activePass.packType.toUpperCase()} PASS
            </span>
          ) : (
            <span className="text-[10px] text-slate-400">No active pass</span>
          )}
        </div>

        {activePass ? (
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Remaining Balance</span>
                  <span className="text-2xl font-black text-redbus-600">{activePass.remainingRides} Rides Left</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">out of {activePass.totalRides} prepaid rides</span>
                </div>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="px-3 py-2 bg-redbus-500 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-redbus-600 transition flex items-center space-x-1"
                >
                  <span>Pass Wallet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-redbus-500 h-full rounded-full transition-all"
                  style={{ width: `${(activePass.remainingRides / activePass.totalRides) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Corridor</span>
                <strong className="text-slate-800">{activePass.routeCorridor}</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px]">Expiry</span>
                <strong className="text-slate-800">{activePass.expiryDate}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-slate-500 mb-3">You don&apos;t have an active 3-ride pass.</p>
            <button
              onClick={() => setActiveTab('red-pass-explore')}
              className="px-4 py-2 bg-redbus-500 text-white font-bold text-xs rounded-xl"
            >
              Explore Red Pass (3 Rides)
            </button>
          </div>
        )}
      </div>

      {/* Bookings Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-redbus-500" />
            <h4 className="text-sm font-bold text-slate-900">Bookings & Travel Details</h4>
          </div>
          <button
            onClick={() => setActiveTab('manage-bookings')}
            className="text-[11px] font-bold text-redbus-500 hover:underline flex items-center"
          >
            <span>View All ({bookings.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {upcomingBookings.length > 0 ? (
          <div className="space-y-2">
            {upcomingBookings.slice(0, 2).map((b) => (
              <div
                key={b.id}
                onClick={() => setActiveTab('manage-bookings')}
                className="p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 transition cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-800">{b.departure.operatorName}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">
                      Seat {b.selectedSeats[0]?.seatNumber}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {b.travelDate} • {b.departure.departureTime} ({b.departure.source} → {b.departure.destination})
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-2">No upcoming bookings.</p>
        )}
      </div>

      {/* Frequent Rider Rewards Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-bold text-slate-800">Frequent Rider Reward</h4>
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                ₹100 Voucher
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {loyalty.completedBoardings} of {loyalty.nextMilestone} QR boardings completed
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('wallet')}
          className="text-xs font-bold text-redbus-500 hover:underline flex-shrink-0"
        >
          View Status
        </button>
      </div>

      {/* Student Verification Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Student Campus Eligibility</h4>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              {isStudentVerified ? '✅ Verified for Campus Red Pass (₹3,800)' : '⚠️ Not yet verified'}
            </span>
          </div>
        </div>

        {!isStudentVerified ? (
          <button
            onClick={() => setIsStudentModalOpen(true)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-xl flex-shrink-0 transition"
          >
            Verify ID
          </button>
        ) : (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
            Active
          </span>
        )}
      </div>

      {/* Collapsible Presenter Controls (Kept separate and unobtrusive at bottom) */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setIsDemoControlsOpen(true)}
          className="text-[11px] font-medium text-slate-400 hover:text-slate-700 inline-flex items-center space-x-1 px-3 py-1.5 rounded-full hover:bg-slate-100 transition"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Case Presentation Settings</span>
        </button>
      </div>
    </div>
  );
};
