import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Ticket, Clock, Zap, MapPin } from 'lucide-react';
import { Departure, OperatorGroup } from '../types';
import { useApp } from '../context/AppContext';

interface OperatorGroupCardProps {
  group: OperatorGroup;
  defaultExpanded?: boolean;
}

export const OperatorGroupCard: React.FC<OperatorGroupCardProps> = ({ group, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const {
    setSelectedDeparture,
    setBookingJourneyType,
    setActiveTab,
    activePass,
    clearSeatSelection,
    isMobileView,
  } = useApp();

  const handleSelectDeparture = (dep: Departure, journeyType: 'regular' | 'red_pass') => {
    clearSeatSelection();
    setSelectedDeparture(dep);
    setBookingJourneyType(journeyType);
    setActiveTab('seat-select');
  };

  const nextDeparture = group.departures[0];
  const totalAvailableSeats = group.departures.reduce((acc, d) => acc + d.availableSeatsCount, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md mb-3.5">
      {/* Operator Main Card Header (Clickable Accordion) */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 sm:p-4 cursor-pointer bg-gradient-to-r from-white via-white to-slate-50/50 hover:bg-slate-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100"
      >
        <div className="flex items-start space-x-3 min-w-0">
          {/* Operator Initial Avatar */}
          <div className="w-10 h-10 rounded-xl bg-red-50 text-redbus-600 border border-red-100 flex items-center justify-center font-black text-base flex-shrink-0 shadow-xs">
            {group.operatorName.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                {group.operatorName}
              </h4>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                {group.busClass}
              </span>
              {group.isRedPassEligible && (
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-50 text-redbus-600 border border-red-200">
                  <Ticket className="w-2.5 h-2.5 mr-0.5" />
                  Red Pass
                </span>
              )}
            </div>

            {/* Ratings & Frequency */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <div className="flex items-center bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                <span>{group.rating}</span>
              </div>
              <span className="text-slate-400">({group.reviewsCount})</span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="font-medium text-slate-600 flex items-center">
                <Clock className="w-3 h-3 mr-0.5 text-slate-400" />
                {group.frequencyText}
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="text-emerald-700 font-medium">
                {group.departures.length} departures
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Next Departure & Price Summary + Toggle */}
        <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex-shrink-0">
          <div className="text-left sm:text-right">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              From
            </div>
            <div className="text-lg font-black text-slate-900">
              ₹{group.baseFare}
            </div>
            <div className="text-[10px] text-slate-400">
              {nextDeparture ? `Next: ${nextDeparture.departureTime}` : ''}
            </div>
          </div>

          <div className="flex items-center space-x-1 text-slate-500 hover:text-slate-800 font-semibold text-xs">
            <span className="hidden sm:inline">
              {isExpanded ? 'Hide' : `View ${group.departures.length}`}
            </span>
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Departures List: Individual Departure Rows */}
      {isExpanded && (
        <div className="p-2.5 sm:p-3 bg-slate-50/60 space-y-2">
          <div className="px-1 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex justify-between items-center">
            <span>Select Departure Timing</span>
            <span>{totalAvailableSeats} Seats Total</span>
          </div>

          {group.departures.map((dep) => {
            const hasJustFreed = dep.seats.some((s) => s.isJustFreed && s.isAvailable);

            return (
              <div
                key={dep.id}
                className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-red-200 transition space-y-2"
              >
                {/* Top Timing & Status Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-black text-slate-900">{dep.departureTime}</span>
                    <span className="text-slate-300 text-xs">→</span>
                    <span className="text-xs font-semibold text-slate-600">{dep.arrivalTime}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-medium">
                      {dep.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    {dep.isXpress && (
                      <span className="inline-flex items-center text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-full border border-amber-200">
                        <Zap className="w-2.5 h-2.5 mr-0.5 text-amber-600" />
                        X-Press
                      </span>
                    )}

                    {hasJustFreed && (
                      <span className="inline-flex items-center text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full border border-emerald-300 just-freed-badge">
                        ✨ Freed Seat
                      </span>
                    )}
                  </div>
                </div>

                {/* Mid Boarding Point & Seats Availability */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <div className="truncate max-w-[220px] flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{dep.boardingPoint} → {dep.dropPoint}</span>
                  </div>

                  <span className={`font-semibold flex-shrink-0 ${
                    dep.availableSeatsCount <= 5 ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {dep.availableSeatsCount} seats left
                  </span>
                </div>

                {/* Bottom Action Row: Fare + Buttons (Uniform block sizes, perfectly fitting) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-base font-black text-slate-900">₹{dep.fare}</span>
                    <span className="text-[9px] text-slate-400">fare</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* CTA 1: Use Red Pass (if eligible) */}
                    {dep.isRedPassEligible && (
                      <button
                        type="button"
                        onClick={() => handleSelectDeparture(dep, 'red_pass')}
                        className={`px-2.5 py-1.5 rounded-lg font-bold text-[11px] transition flex items-center justify-center space-x-1 border shadow-2xs ${
                          activePass && activePass.remainingRides > 0
                            ? 'bg-red-50 hover:bg-red-100 text-redbus-600 border-red-300'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                        title={activePass ? 'Book with Red Pass ride' : 'Get Red Pass to redeem'}
                      >
                        <Ticket className="w-3 h-3 text-red-500" />
                        <span>Use Pass</span>
                        {activePass && (
                          <span className="bg-redbus-500 text-white text-[8px] px-1 py-0.2 rounded-full font-black">
                            1
                          </span>
                        )}
                      </button>
                    )}

                    {/* CTA 2: Regular Booking "View Seats" */}
                    <button
                      type="button"
                      onClick={() => handleSelectDeparture(dep, 'regular')}
                      className="px-3.5 py-1.5 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white font-bold text-[11px] rounded-lg shadow-xs transition text-center"
                    >
                      View Seats
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
