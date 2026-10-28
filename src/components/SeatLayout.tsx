import React from 'react';
import { ArrowLeft, Check, Compass, Info, Shield, Ticket, User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Seat } from '../types';

export const SeatLayout: React.FC = () => {
  const {
    selectedDeparture,
    selectedSeats,
    toggleSeatSelection,
    bookingJourneyType,
    activePass,
    setActiveTab,
    showToast,
    isMobileView,
  } = useApp();

  if (!selectedDeparture) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border text-center shadow-soft">
        <p className="text-slate-600 mb-4">No departure selected. Please choose a bus first.</p>
        <button
          onClick={() => setActiveTab('search')}
          className="px-6 py-2.5 bg-redbus-500 text-white font-bold rounded-xl text-sm"
        >
          Return to Bus Results
        </button>
      </div>
    );
  }

  // Calculate fees
  const baseFareTotal = bookingJourneyType === 'red_pass' ? 0 : selectedSeats.length * selectedDeparture.fare;
  const preferredFees = selectedSeats.reduce((acc, s) => acc + (s.preferredFee || 0), 0);
  const totalAmount = baseFareTotal + preferredFees;

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least one seat to continue.');
      return;
    }
    setActiveTab('passenger');
  };

  // Group seats by rows for realistic bus visualization
  // 10 rows, columns 0, 1 (left) and 3, 4 (right)
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('search')}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
            title="Back to search results"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {selectedDeparture.operatorName}
              </h2>
              <span className="text-xs bg-red-50 text-redbus-600 font-bold px-2 py-0.5 rounded-md border border-red-200">
                {selectedDeparture.busClass}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {selectedDeparture.departureTime} • {selectedDeparture.duration} • {selectedDeparture.source} to {selectedDeparture.destination}
            </div>
          </div>
        </div>

        {/* Journey Mode Tag */}
        <div className="flex items-center space-x-2">
          {bookingJourneyType === 'red_pass' ? (
            <div className="bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-xl flex items-center space-x-2 text-xs">
              <Ticket className="w-4 h-4 text-red-500" />
              <div>
                <span className="font-bold text-red-900 block leading-tight">Red Pass Redemption</span>
                <span className="text-[10px] text-slate-500">1 prepaid ride debit on booking</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 px-3.5 py-1.5 rounded-xl text-xs">
              <span className="font-bold text-slate-800 block leading-tight">Regular Ticket Booking</span>
              <span className="text-[10px] text-slate-500">Operator Fare: ₹{selectedDeparture.fare} / seat</span>
            </div>
          )}
        </div>
      </div>

      <div className={isMobileView ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"}>
        {/* Left: Realistic Bus Top-View Graphic & Seat Grid */}
        <div className={isMobileView ? "w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-soft" : "lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-soft"}>
          {/* Seat Map Legend */}
          <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-around gap-2 text-xs text-slate-600">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md border border-slate-300 bg-white"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                <Check className="w-3 h-3" />
              </div>
              <span className="font-bold text-emerald-800">Selected</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-slate-200 text-slate-400"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-pink-100 border border-pink-300 text-pink-600 flex items-center justify-center text-[10px]">
                ♀
              </div>
              <span className="text-pink-700 font-medium">Women Reserved</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center text-[9px] font-bold">
                +20
              </div>
              <span className="text-amber-800 font-medium">Extra Legroom</span>
            </div>
          </div>

          {/* Bus Interior Shell */}
          <div className="max-w-md mx-auto bg-slate-100/90 rounded-3xl p-5 border-4 border-slate-300 shadow-inner relative">
            {/* Front of Bus indicator (Windshield & Steering Wheel) */}
            <div className="border-b-2 border-dashed border-slate-300 pb-4 mb-5 flex justify-between items-center text-slate-400 px-3">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Compass className="w-4 h-4 text-redbus-500" />
                <span>Front / Entrance</span>
              </div>

              {/* Realistic Steering Wheel at front right */}
              <div className="w-10 h-10 rounded-full border-2 border-slate-400 bg-white flex items-center justify-center shadow-xs" title="Driver Cabin">
                <div className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                </div>
              </div>
            </div>

            {/* Seat Rows Grid */}
            <div className="space-y-3">
              {rows.map((rowNum) => {
                const rowSeats = selectedDeparture.seats.filter((s) => s.row === rowNum);
                const leftSeats = rowSeats.filter((s) => s.col === 0 || s.col === 1);
                const rightSeats = rowSeats.filter((s) => s.col === 3 || s.col === 4);

                return (
                  <div key={`row-${rowNum}`} className="flex items-center justify-between">
                    {/* Left 2 seats */}
                    <div className="flex space-x-2">
                      {leftSeats.map((seat) => {
                        const isSelected = selectedSeats.some((s) => s.id === seat.id);

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => toggleSeatSelection(seat)}
                            disabled={!seat.isAvailable}
                            className={`w-11 h-12 rounded-lg border-2 flex flex-col items-center justify-center transition-all relative ${
                              !seat.isAvailable
                                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-600 border-emerald-700 text-white shadow-md scale-105 z-10'
                                : seat.isWomenOnly
                                ? 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-500'
                                : seat.isPreferred
                                ? 'bg-amber-50/70 border-amber-300 text-amber-900 hover:border-amber-400'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-redbus-400 hover:shadow-xs'
                            }`}
                            title={`${seat.seatNumber} ${
                              !seat.isAvailable
                                ? '(Occupied)'
                                : seat.isWomenOnly
                                ? '(Women Reserved - Standard Fare)'
                                : seat.isPreferred
                                ? '(Preferred Legroom +₹20)'
                                : '(Available)'
                            }`}
                          >
                            {/* Seat Headrest visual */}
                            <span className="text-[10px] font-bold leading-none mb-0.5">
                              {seat.seatNumber}
                            </span>

                            {isSelected ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : seat.isWomenOnly ? (
                              <span className="text-[10px]">♀</span>
                            ) : seat.isPreferred ? (
                              <span className="text-[8px] font-bold text-amber-700">+₹20</span>
                            ) : (
                              <span className="w-2 h-0.5 bg-slate-300 rounded-full"></span>
                            )}

                            {seat.isJustFreed && seat.isAvailable && !isSelected && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 just-freed-badge" title="Just freed from cancellation"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Aisle */}
                    <div className="w-10 text-center text-[10px] text-slate-400 font-mono select-none">
                      Aisle
                    </div>

                    {/* Right 2 seats */}
                    <div className="flex space-x-2">
                      {rightSeats.map((seat) => {
                        const isSelected = selectedSeats.some((s) => s.id === seat.id);

                        return (
                          <button
                            key={seat.id}
                            type="button"
                            onClick={() => toggleSeatSelection(seat)}
                            disabled={!seat.isAvailable}
                            className={`w-11 h-12 rounded-lg border-2 flex flex-col items-center justify-center transition-all relative ${
                              !seat.isAvailable
                                ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
                                : isSelected
                                ? 'bg-emerald-600 border-emerald-700 text-white shadow-md scale-105 z-10'
                                : seat.isWomenOnly
                                ? 'bg-pink-50 border-pink-300 text-pink-700 hover:border-pink-500'
                                : seat.isPreferred
                                ? 'bg-amber-50/70 border-amber-300 text-amber-900 hover:border-amber-400'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-redbus-400 hover:shadow-xs'
                            }`}
                            title={`${seat.seatNumber} ${
                              !seat.isAvailable
                                ? '(Occupied)'
                                : seat.isWomenOnly
                                ? '(Women Reserved - Standard Fare)'
                                : seat.isPreferred
                                ? '(Preferred Legroom +₹20)'
                                : '(Available)'
                            }`}
                          >
                            <span className="text-[10px] font-bold leading-none mb-0.5">
                              {seat.seatNumber}
                            </span>

                            {isSelected ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : seat.isWomenOnly ? (
                              <span className="text-[10px]">♀</span>
                            ) : seat.isPreferred ? (
                              <span className="text-[8px] font-bold text-amber-700">+₹20</span>
                            ) : (
                              <span className="w-2 h-0.5 bg-slate-300 rounded-full"></span>
                            )}

                            {seat.isJustFreed && seat.isAvailable && !isSelected && (
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 just-freed-badge" title="Just freed from cancellation"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back of Bus */}
            <div className="border-t-2 border-dashed border-slate-300 pt-3 mt-5 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Rear of Bus
            </div>
          </div>
        </div>

        {/* Right: Booking Summary & Continue Card */}
        <div className={isMobileView ? "w-full space-y-4" : "lg:col-span-5 space-y-4"}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
            <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Booking Summary</span>
              <span className="text-xs text-slate-500 font-normal">
                {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} Selected
              </span>
            </h3>

            {/* Selected Seats Pills */}
            <div className="my-4">
              <div className="text-xs font-semibold text-slate-500 mb-2">Assigned Seat(s):</div>
              {selectedSeats.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-dashed border-slate-300">
                  Click on any available seat in the bus map to select.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((s) => (
                    <div
                      key={s.id}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center space-x-2"
                    >
                      <span>Seat {s.seatNumber}</span>
                      {s.isPreferred && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded">
                          Extra Legroom (+₹20)
                        </span>
                      )}
                      {s.isWomenOnly && (
                        <span className="text-[10px] bg-pink-100 text-pink-800 px-1 rounded">
                          Women Only
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Boarding and Dropping Points */}
            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 font-medium">Boarding Point:</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedDeparture.boardingPoint}</p>
              </div>
              <div className="border-t border-slate-200/60 pt-2">
                <span className="text-slate-400 font-medium">Dropping Point:</span>
                <p className="font-bold text-slate-800 mt-0.5">{selectedDeparture.dropPoint}</p>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              {bookingJourneyType === 'red_pass' ? (
                <>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="flex items-center">
                      <Ticket className="w-3.5 h-3.5 text-red-500 mr-1" />
                      Red Pass Ride Deduction:
                    </span>
                    <span className="font-bold text-emerald-600">1 Ride Debited (₹0 base fare)</span>
                  </div>
                  {preferredFees > 0 && (
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Optional Preferred Seat Fee:</span>
                      <span className="font-bold text-slate-900">₹{preferredFees}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-black pt-2 border-t border-slate-100 text-slate-900">
                    <span>Payable Now:</span>
                    <span>₹{preferredFees}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Base Ticket Fare ({selectedSeats.length} × ₹{selectedDeparture.fare}):</span>
                    <span className="font-bold text-slate-900">₹{baseFareTotal}</span>
                  </div>
                  {preferredFees > 0 && (
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Preferred Seat Add-on:</span>
                      <span className="font-bold text-slate-900">₹{preferredFees}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-black pt-2 border-t border-slate-100 text-slate-900">
                    <span>Total Fare:</span>
                    <span className="text-redbus-600 text-lg">₹{totalAmount}</span>
                  </div>
                </>
              )}
            </div>

            {/* Safety & Policy Notice */}
            <div className="mt-4 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-start space-x-2">
              <Shield className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Protected Seat Policy:</strong> Women-reserved seats are protected for passenger comfort and are never monetized behind preferred tiers.
              </span>
            </div>

            {/* Continue to Passenger Form Button */}
            <button
              type="button"
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
              className={`w-full mt-4 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                selectedSeats.length === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white hover:shadow-lg'
              }`}
            >
              <span>CONTINUE TO PASSENGER DETAILS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
