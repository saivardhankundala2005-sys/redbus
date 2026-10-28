import React, { useState } from 'react';
import { X, RefreshCw, Clock, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Seat } from '../types';

export const ChangeBusModal: React.FC = () => {
  const {
    swapTargetBooking,
    setSwapTargetBooking,
    operatorGroups,
    swapPassRide,
  } = useApp();

  const [selectedNewDepartureId, setSelectedNewDepartureId] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  if (!swapTargetBooking) return null;

  // Find all departures under the same operator
  const matchingGroup = operatorGroups.find(
    (g) => g.operatorId === swapTargetBooking.departure.operatorId
  );

  // Alternative departures except the currently booked one
  const alternativeDepartures = (matchingGroup?.departures || []).filter(
    (d) => d.id !== swapTargetBooking.departure.id
  );

  const activeNewDeparture = alternativeDepartures.find((d) => d.id === selectedNewDepartureId);

  const handleConfirmSwap = () => {
    if (!selectedNewDepartureId || !selectedSeat) return;
    setIsSwapping(true);
    setTimeout(() => {
      swapPassRide(swapTargetBooking.id, selectedNewDepartureId, selectedSeat);
      setIsSwapping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setSwapTargetBooking(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-100 text-redbus-600 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Change Bus (Flexible Swap)</h3>
            <span className="text-xs text-slate-500">Free 1-Hour Swap Policy • Swap {swapTargetBooking.swapsCount + 1} of 3</span>
          </div>
        </div>

        {/* Current Booking Summary */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl mb-4 text-xs text-slate-700">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Current Booked Ride
          </span>
          <div className="flex justify-between items-center font-bold text-slate-800 text-sm">
            <span>{swapTargetBooking.departure.operatorName}</span>
            <span className="text-redbus-600 font-extrabold">{swapTargetBooking.departure.departureTime}</span>
          </div>
          <div className="text-slate-500 mt-0.5">
            Seat {swapTargetBooking.selectedSeats.map((s) => s.seatNumber).join(', ')} • {swapTargetBooking.departure.source} → {swapTargetBooking.departure.destination}
          </div>
        </div>

        {/* Alternative Departures List */}
        <div className="space-y-3 mb-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Eligible Alternative Departure
          </label>

          {alternativeDepartures.length === 0 ? (
            <p className="text-xs text-slate-500 p-3 bg-slate-50 rounded-xl">
              No other departures found for this operator today.
            </p>
          ) : (
            alternativeDepartures.map((alt) => {
              const isSelected = selectedNewDepartureId === alt.id;

              return (
                <div
                  key={alt.id}
                  onClick={() => {
                    setSelectedNewDepartureId(alt.id);
                    setSelectedSeat(null);
                  }}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition ${
                    isSelected ? 'border-redbus-500 bg-red-50/40' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="font-black text-slate-900 text-sm">{alt.departureTime}</span>
                      <span className="text-xs text-slate-400">({alt.duration})</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {alt.availableSeatsCount} seats available
                    </span>
                  </div>

                  <div className="mt-1.5 text-xs text-slate-500 flex items-center justify-between">
                    <span>Drop: {alt.dropPoint}</span>
                    <span className="text-redbus-600 font-semibold text-[11px]">Free with Red Pass</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Seat Picker for the newly selected departure */}
        {activeNewDeparture && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Pick Replacement Seat ({activeNewDeparture.departureTime}):
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto p-1">
              {activeNewDeparture.seats
                .filter((s) => s.isAvailable)
                .slice(0, 18)
                .map((seat) => {
                  const isSeatSelected = selectedSeat?.id === seat.id;
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      onClick={() => setSelectedSeat(seat)}
                      className={`py-2 rounded-lg border text-xs font-bold transition ${
                        isSeatSelected
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-redbus-400'
                      }`}
                    >
                      {seat.seatNumber}
                    </button>
                  );
                })}
            </div>
            {selectedSeat && (
              <p className="text-xs text-emerald-700 font-bold mt-2">
                ✓ Selected replacement seat: {selectedSeat.seatNumber}
              </p>
            )}
          </div>
        )}

        {/* Policy Notice */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 mb-5 flex items-start space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Atomic Swap Guarantee:</strong> Your original seat is released only upon successful confirmation of the new departure. Your 10-ride pass balance remains untouched.
          </span>
        </div>

        {/* Confirm Swap Button */}
        <button
          type="button"
          onClick={handleConfirmSwap}
          disabled={!selectedNewDepartureId || !selectedSeat || isSwapping}
          className="w-full py-3.5 bg-redbus-500 hover:bg-redbus-600 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
        >
          {isSwapping ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Updating Departure...</span>
            </div>
          ) : (
            <span>Confirm Bus Change (Free)</span>
          )}
        </button>
      </div>
    </div>
  );
};
