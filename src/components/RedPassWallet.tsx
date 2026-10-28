import React, { useState } from 'react';
import { Ticket, QrCode, RefreshCw, Calendar, Clock, MapPin, Award, ShieldCheck, ArrowRight, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BoardingQRModal } from './BoardingQRModal';
import { ChangeBusModal } from './ChangeBusModal';
import { Booking } from '../types';

export const RedPassWallet: React.FC = () => {
  const {
    activePass,
    bookings,
    cancelPassRide,
    setSelectedBookingForQR,
    setSwapTargetBooking,
    loyalty,
    setActiveTab,
    showToast,
  } = useApp();

  const [activeQRBooking, setActiveQRBooking] = useState<Booking | null>(null);

  if (!activePass) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-soft">
        <div className="w-16 h-16 rounded-3xl bg-red-50 text-redbus-500 flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">No Active Red Pass</h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Prepay 10 rides on your daily corridor, pick your confirmed seat on every bus, and enjoy 1-hour free cancellation and bus swaps.
        </p>
        <button
          onClick={() => setActiveTab('red-pass-explore')}
          className="px-6 py-3.5 bg-redbus-500 hover:bg-redbus-600 text-white font-bold rounded-xl text-sm shadow-md transition"
        >
          Explore & Purchase Red Pass
        </button>
      </div>
    );
  }

  // Filter pass bookings (upcoming and active)
  const passBookings = bookings.filter((b) => b.journeyType === 'red_pass');
  const upcomingPassBookings = passBookings.filter((b) => b.status === 'confirmed' || b.status === 'swapped');
  const pastPassBookings = passBookings.filter((b) => b.status === 'boarded' || b.status === 'cancelled');

  const handleCancelClick = (b: Booking) => {
    if (confirm(`Are you sure you want to cancel your ride for ${b.departure.operatorName}? 1 ride will be re-credited to your Red Pass balance immediately.`)) {
      cancelPassRide(b.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Wallet Pass Card (Recreates Exhibit 1 Screen 04!) */}
      <div className="bg-gradient-to-br from-red-600 via-redbus-500 to-rose-600 rounded-3xl text-white p-5 sm:p-7 shadow-elevated relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
              <Ticket className="w-3.5 h-3.5 text-white" />
              <span>RED PASS — {activePass.packType.toUpperCase()}</span>
            </span>

            <span className="text-[11px] text-red-100 font-mono bg-black/20 px-2 py-0.5 rounded-full">
              ID: {activePass.id}
            </span>
          </div>

          {/* Centered Large Ride Count (Matching Exhibit 1 Screen 04!) */}
          <div className="text-center py-2">
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {activePass.remainingRides} Rides Left
            </div>
            <div className="text-xs text-red-100 font-medium mt-1">
              Expires {activePass.expiryDate}
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-4 max-w-sm mx-auto">
              <div className="w-full bg-black/25 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/20">
                <div
                  className="bg-white rounded-full h-full transition-all duration-500 shadow-sm"
                  style={{ width: `${(activePass.remainingRides / activePass.totalRides) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Clean Pack Attributes Grid */}
          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-[11px] text-red-100">
            <div>
              <span className="text-red-200 block text-[10px]">Route Corridor</span>
              <strong className="text-white text-xs">{activePass.routeCorridor}</strong>
            </div>
            <div className="text-right">
              <span className="text-red-200 block text-[10px]">Pack Fare</span>
              <strong className="text-white text-xs">₹{activePass.packPrice.toLocaleString('en-IN')} (₹{activePass.effectivePerRide}/ride)</strong>
            </div>
            <div>
              <span className="text-red-200 block text-[10px]">Rides Consumed</span>
              <span className="font-semibold">{activePass.ridesUsed} of {activePass.totalRides}</span>
            </div>
            <div className="text-right">
              <span className="text-red-200 block text-[10px]">Free Cancellations</span>
              <span className="font-semibold">{activePass.cancellationsUsed} of {activePass.maxCancellations}</span>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Loyalty Milestone Bar (₹100 Voucher after 15 completed QR boardings) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-bold text-slate-800">Frequent Rider Loyalty Reward</h4>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.2 rounded-full border border-amber-200">
                ₹100 Milestone
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Get a ₹100 voucher after every 15 completed, QR-verified boardings.
            </p>
            <div className="mt-2 flex items-center space-x-2 text-xs font-semibold text-slate-700">
              <span>{loyalty.completedBoardings} of {loyalty.nextMilestone} completed</span>
              <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (loyalty.completedBoardings / loyalty.nextMilestone) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {loyalty.vouchers.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 font-mono">
            <span className="font-bold block">Unlocked Voucher:</span>
            <span>{loyalty.vouchers[0].code} (₹100 off)</span>
          </div>
        )}
      </div>

      {/* Upcoming Bookings on Red Pass */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Upcoming Red Pass Bookings
          </h3>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-redbus-500 hover:underline flex items-center space-x-1"
          >
            <span>Book Next Departure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {upcomingPassBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No active ride reservations. You have {activePass.remainingRides} rides ready to book!</p>
            <button
              onClick={() => setActiveTab('search')}
              className="mt-3 px-5 py-2 bg-redbus-500 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Book a Departure
            </button>
          </div>
        ) : (
          upcomingPassBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-4 transition hover:shadow-md"
            >
              <div className="pb-3 border-b border-slate-100 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-black text-slate-900 leading-snug">{b.departure.operatorName}</h4>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                        {b.departure.busClass}
                      </span>
                      {b.status === 'swapped' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.2 rounded-full border border-amber-300">
                          Bus Changed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-slate-400 font-medium block">Allocated Seat</span>
                    <span className="text-base font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 inline-block">
                      Seat {b.selectedSeats.map((s) => s.seatNumber).join(', ')}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  {b.travelDate} • {b.departure.source} → {b.departure.destination}
                </div>
              </div>

              {/* Boarding Point Details */}
              <div className="text-xs text-slate-600 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>
                  Boarding Point: <strong className="text-slate-800">{b.departure.boardingPoint}</strong> at <strong>{b.departure.departureTime}</strong>
                </span>
              </div>

              {/* Action Buttons: View Boarding QR, Change Bus, Cancel */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                {/* 1. View Boarding QR */}
                <button
                  type="button"
                  onClick={() => setActiveQRBooking(b)}
                  className="px-4 py-2.5 bg-redbus-500 hover:bg-redbus-600 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Boarding QR</span>
                </button>

                {/* 2. Change Bus (Atomic Swap) */}
                <button
                  type="button"
                  onClick={() => setSwapTargetBooking(b)}
                  className="px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Change Bus (Swap {b.swapsCount}/3)</span>
                </button>

                {/* 3. Cancel Ride */}
                <button
                  type="button"
                  onClick={() => handleCancelClick(b)}
                  className="px-3 py-2 text-slate-500 hover:text-red-600 text-xs font-semibold rounded-xl hover:bg-red-50 transition"
                >
                  Cancel Ride (Re-credit 1 ride)
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Past Completed Rides on Red Pass */}
      {pastPassBookings.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h4 className="text-sm font-bold text-slate-700">Past & Completed Rides</h4>
          <div className="space-y-2 text-xs">
            {pastPassBookings.map((b) => (
              <div
                key={b.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-slate-600"
              >
                <div>
                  <span className="font-bold text-slate-800">{b.departure.operatorName}</span> ({b.departure.departureTime}, Seat {b.selectedSeats[0]?.seatNumber})
                  <span className="text-slate-400 block text-[11px]">{b.travelDate}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  b.status === 'boarded' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {b.status === 'boarded' ? '✓ Boarded & Verified' : 'Cancelled & Re-credited'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rotating QR Modal */}
      {activeQRBooking && (
        <BoardingQRModal
          booking={activeQRBooking}
          onClose={() => setActiveQRBooking(null)}
        />
      )}

      {/* Change Bus Modal */}
      <ChangeBusModal />
    </div>
  );
};
