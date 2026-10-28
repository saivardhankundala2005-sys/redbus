import React, { useState } from 'react';
import { ShieldCheck, Ticket, QrCode, Clock, MapPin, Calendar, XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BoardingQRModal } from './BoardingQRModal';
import { Booking } from '../types';

export const ManageBookings: React.FC = () => {
  const {
    bookings,
    cancelPassRide,
    cancelRegularTicket,
    setActiveTab,
    setSwapTargetBooking,
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [qrModalBooking, setQrModalBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTabFilter === 'upcoming') return b.status === 'confirmed' || b.status === 'swapped';
    if (activeTabFilter === 'completed') return b.status === 'boarded';
    if (activeTabFilter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  const handleCancel = (b: Booking) => {
    if (b.journeyType === 'red_pass') {
      if (confirm('Cancel Red Pass ride? 1 ride will be re-credited to your pack balance.')) {
        cancelPassRide(b.id);
      }
    } else {
      if (confirm('Cancel regular ticket? Cancellation follows the standard 6-hour demo refund rule.')) {
        cancelRegularTicket(b.id);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Manage Bookings</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your regular tickets and active Red Pass reservations.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTabFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize transition ${
                activeTabFilter === tab ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-600 font-medium">No bookings found in this category.</p>
          <button
            onClick={() => setActiveTab('search')}
            className="mt-4 px-5 py-2.5 bg-redbus-500 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Search & Book Buses
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const isUpcoming = b.status === 'confirmed' || b.status === 'swapped';

            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-4 transition hover:shadow-md"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-redbus-600 flex items-center justify-center font-black">
                      {b.departure.operatorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-bold text-slate-900">{b.departure.operatorName}</h4>
                        <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                          {b.departure.busClass}
                        </span>
                        {b.journeyType === 'red_pass' ? (
                          <span className="text-[10px] font-bold bg-red-100 text-redbus-700 px-2 py-0.2 rounded-full border border-red-200">
                            Red Pass Ride
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.2 rounded-full">
                            Regular Ticket
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        PNR: <strong className="font-mono text-slate-700">{b.bookingRef}</strong> • Booked on {b.bookingDate}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block ${
                        b.status === 'boarded'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : b.status === 'cancelled'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : b.status === 'swapped'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {b.status === 'swapped' ? 'Bus Changed' : b.status}
                    </span>
                  </div>
                </div>

                {/* Journey & Seat info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Route</span>
                    <span className="font-bold text-slate-800">
                      {b.departure.source} → {b.departure.destination}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Travel Date & Time</span>
                    <span className="font-bold text-slate-800">
                      {b.travelDate} at {b.departure.departureTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Seat Number</span>
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {b.selectedSeats.map((s) => s.seatNumber).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Passenger</span>
                    <span className="font-semibold text-slate-800">{b.passenger.name}</span>
                  </div>
                </div>

                {/* Actions row */}
                {isUpcoming && (
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setQrModalBooking(b)}
                      className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View Boarding QR</span>
                    </button>

                    {b.journeyType === 'red_pass' && (
                      <button
                        onClick={() => {
                          setSwapTargetBooking(b);
                          setActiveTab('wallet');
                        }}
                        className="px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs rounded-xl transition flex items-center space-x-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Change Bus (Swap {b.swapsCount}/3)</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleCancel(b)}
                      className="px-3.5 py-2 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* QR Modal */}
      {qrModalBooking && (
        <BoardingQRModal
          booking={qrModalBooking}
          onClose={() => setQrModalBooking(null)}
        />
      )}
    </div>
  );
};
