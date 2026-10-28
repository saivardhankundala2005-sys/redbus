import React from 'react';
import { Check, CheckCircle2, QrCode, Ticket, ArrowRight, Home, Calendar, Clock, MapPin, ShieldCheck, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookingConfirmation: React.FC = () => {
  const {
    currentBooking,
    activePass,
    setActiveTab,
    setSelectedBookingForQR,
    showToast,
  } = useApp();

  if (!currentBooking) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border text-center shadow-soft">
        <p className="text-slate-600 mb-4">No recent booking found.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="px-6 py-2.5 bg-redbus-500 text-white font-bold rounded-xl text-sm"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleOpenQR = () => {
    setSelectedBookingForQR(currentBooking);
    setActiveTab('wallet');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {/* Top Success Banner */}
        <div className="bg-gradient-to-b from-emerald-600 to-emerald-700 text-white p-8 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40 shadow-inner">
            <div className="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Booking Confirmed!</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Your seat reservation is confirmed with the operator.
          </p>

          <div className="mt-4 inline-flex items-center space-x-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-mono">
            <span>PNR:</span>
            <strong className="text-white text-sm font-bold tracking-wider">{currentBooking.bookingRef}</strong>
          </div>
        </div>

        {/* Booking Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Red Pass Redemption Pill if journey is Red Pass */}
          {currentBooking.journeyType === 'red_pass' ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-redbus-500 text-white flex items-center justify-center font-bold">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-red-900 block">Red Pass Ride Redeemed</span>
                  <span className="text-xs text-slate-600">
                    {activePass ? `${activePass.remainingRides} rides remaining in your pack` : 'Ride debited from pack'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold bg-white text-emerald-700 border border-red-200 px-2.5 py-1 rounded-full">
                ₹0 Base Fare
              </span>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Payment Status:</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                Paid in Demo Mode (₹{currentBooking.totalFare})
              </span>
            </div>
          )}

          {/* Ticket Details Box */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
              <div>
                <h3 className="text-base font-bold text-slate-900">{currentBooking.departure.operatorName}</h3>
                <span className="text-xs text-slate-500">{currentBooking.departure.busClass}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Confirmed Seat</span>
                <span className="text-lg font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  {currentBooking.selectedSeats.map((s) => s.seatNumber).join(', ')}
                </span>
              </div>
            </div>

            {/* Travel Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Route</span>
                <span className="font-bold text-slate-800 text-sm">
                  {currentBooking.departure.source} → {currentBooking.departure.destination}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Date & Timing</span>
                <span className="font-bold text-slate-800 text-sm">
                  {currentBooking.travelDate} • {currentBooking.departure.departureTime}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 font-medium block">Boarding Point</span>
                <span className="font-bold text-slate-800">
                  {currentBooking.departure.boardingPoint}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 font-medium block">Primary Passenger</span>
                <span className="font-semibold text-slate-800">
                  {currentBooking.passenger.name} ({currentBooking.passenger.age} yrs, {currentBooking.passenger.gender})
                </span>
              </div>
            </div>
          </div>

          {/* Digital QR Code Preview Section */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-red-400 flex-shrink-0">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <span className="text-sm font-bold block text-white">Rotating Boarding QR Ready</span>
                <span className="text-xs text-slate-300">
                  Present this digital QR to conductor at bus entrance for instant check-in.
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenQR}
              className="w-full sm:w-auto px-5 py-2.5 bg-redbus-500 hover:bg-redbus-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 flex-shrink-0"
            >
              <span>View Boarding QR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Flex Rules Summary */}
          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {currentBooking.journeyType === 'red_pass'
                  ? 'Red Pass Flexibility: Free bus swap or cancellation up to 1 hr before departure.'
                  : 'Regular Ticket: Cancellation allowed up to 6 hours before departure.'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setActiveTab('manage-bookings')}
              className="py-3 px-4 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs rounded-xl transition text-center"
            >
              Manage Bookings
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center space-x-1.5"
            >
              <Home className="w-4 h-4" />
              <span>Book Another Journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
