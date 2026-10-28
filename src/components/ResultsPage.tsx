import React, { useState, useMemo } from 'react';
import { ArrowLeft, Filter, SlidersHorizontal, Ticket, Info, Calendar, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OperatorGroupCard } from './OperatorGroupCard';

export const ResultsPage: React.FC = () => {
  const {
    source,
    destination,
    travelDate,
    operatorGroups,
    setActiveTab,
    activePass,
    getPerRidePrice,
    isMobileView,
  } = useApp();

  // Filters & Sorting state
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [redPassOnly, setRedPassOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'leavingSoon' | 'priceAsc' | 'ratingDesc'>('leavingSoon');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter and sort the operator groups
  const filteredGroups = useMemo(() => {
    let result = [...operatorGroups];

    if (selectedClass !== 'all') {
      result = result.filter((g) => g.busClass === selectedClass);
    }

    if (redPassOnly) {
      result = result.filter((g) => g.isRedPassEligible);
    }

    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.baseFare - b.baseFare);
    } else if (sortBy === 'ratingDesc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [operatorGroups, selectedClass, redPassOnly, sortBy]);

  const totalDeparturesCount = filteredGroups.reduce((acc, g) => acc + g.departures.length, 0);

  return (
    <div className={`max-w-7xl mx-auto ${isMobileView ? 'px-3 py-3' : 'px-4 sm:px-6 lg:px-8 py-5'}`}>
      {/* Route Header & Edit Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-3.5 sm:p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setActiveTab('home')}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition flex-shrink-0"
              title="Back to search"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                  {source} <span className="text-redbus-500">→</span> {destination}
                </h2>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded">
                  {totalDeparturesCount} Buses
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{travelDate}</span>
                <span>•</span>
                <span>Short-Route Pilot Corridor</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className="px-3 py-1.5 border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-lg transition"
            >
              Modify
            </button>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center space-x-1"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Date Selector Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center space-x-1.5 overflow-x-auto text-[11px] pb-1 scrollbar-none">
          <span className="text-slate-400 font-medium mr-1 flex-shrink-0 text-[10px]">Dates:</span>
          {['15 Nov', '16 Nov, Tomorrow', '17 Nov', '18 Nov', '19 Nov'].map((d, idx) => (
            <button
              key={d}
              className={`px-2.5 py-1 rounded-md border font-medium flex-shrink-0 transition ${
                idx === 1
                  ? 'bg-redbus-500 text-white border-redbus-500 font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Red Pass Contextual Banner */}
      <div className="mb-4 bg-gradient-to-r from-redbus-500 to-redbus-600 text-white rounded-xl p-3 sm:p-3.5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Ticket className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xs tracking-wide">RED PASS CORRIDOR</span>
              <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                Save 12%
              </span>
            </div>
            <p className="text-[11px] text-red-100 mt-0.5 leading-snug">
              {activePass
                ? `Active Red Pass: ${activePass.remainingRides} rides left. Tap 'Use Pass' on any eligible departure.`
                : `Travel this route often? 10 prepaid rides at ₹${getPerRidePrice()}/ride with guaranteed seat selection.`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto flex-shrink-0">
          {activePass ? (
            <button
              onClick={() => setActiveTab('wallet')}
              className="w-full sm:w-auto px-3 py-1.5 bg-white text-redbus-600 font-bold text-[11px] rounded-lg shadow-xs hover:bg-red-50 transition"
            >
              Pass Wallet ({activePass.remainingRides})
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('red-pass-explore')}
              className="w-full sm:w-auto px-3 py-1.5 bg-white text-redbus-600 font-bold text-[11px] rounded-lg shadow-xs hover:bg-red-50 transition"
            >
              Get 10-Ride Pass
            </button>
          )}
        </div>
      </div>

      {/* Typical Fare Benchmarking Indicator */}
      <div className="mb-4 bg-blue-50/70 border border-blue-200 rounded-xl px-3 py-2 flex items-center justify-between text-[11px] text-blue-900">
        <div className="flex items-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          <span>
            <strong>Route benchmark fare: ₹350 – ₹450</strong> (Verified pricing).
          </span>
        </div>
        <span className="hidden sm:inline text-blue-600 font-semibold text-[10px]">
          Guaranteed named seat
        </span>
      </div>

      {/* Main Grid: Filters Sidebar + Results List */}
      <div className={isMobileView ? "space-y-4" : "grid grid-cols-1 md:grid-cols-12 gap-6 items-start"}>
        {/* Left Filter Sidebar */}
        <aside
          className={`${isMobileView ? (mobileFilterOpen ? 'block' : 'hidden') : 'md:col-span-3'} bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-6 ${
            !isMobileView && (mobileFilterOpen ? 'block' : 'hidden md:block')
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-sm text-slate-800 flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-500" />
              Filters
            </span>
            <button
              onClick={() => {
                setSelectedClass('all');
                setRedPassOnly(false);
                setSortBy('leavingSoon');
              }}
              className="text-xs text-redbus-500 hover:underline font-semibold"
            >
              Reset
            </button>
          </div>

          {/* Red Pass Eligible Filter Toggle */}
          <div>
            <label className="flex items-center justify-between p-3 rounded-xl bg-red-50/60 border border-red-200 cursor-pointer hover:bg-red-50 transition">
              <div className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-slate-800">Red Pass Eligible</span>
              </div>
              <input
                type="checkbox"
                checked={redPassOnly}
                onChange={(e) => setRedPassOnly(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Bus Class Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Bus Class
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Bus Types' },
                { id: 'AC Seater', label: 'AC Seater (2+1, 2+2)' },
                { id: 'Volvo Multi-Axle', label: 'Volvo Multi-Axle' },
                { id: 'Non-AC Seater', label: 'Non-AC Seater' },
                { id: 'AC Sleeper', label: 'AC Sleeper' },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                    selectedClass === item.id ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <input
                    type="radio"
                    name="busClass"
                    value={item.id}
                    checked={selectedClass === item.id}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="accent-redbus-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Sort By
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'leavingSoon', label: 'Leaving Soon' },
                { id: 'priceAsc', label: 'Price: Low to High' },
                { id: 'ratingDesc', label: 'Top Customer Rating' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                    sortBy === opt.id ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt.label}</span>
                  <input
                    type="radio"
                    name="sortOption"
                    value={opt.id}
                    checked={sortBy === opt.id as any}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="accent-redbus-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Grouped Operator Cards */}
        <main className={isMobileView ? "w-full space-y-4" : "md:col-span-9 space-y-4"}>
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-800">{filteredGroups.length} Operator Groups</strong> ({totalDeparturesCount} Individual Departures)
            </span>
            <span className="hidden sm:inline text-slate-400">
              Repeated departures grouped for easier comparison
            </span>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600 text-sm">No buses found matching the selected filters.</p>
              <button
                onClick={() => {
                  setSelectedClass('all');
                  setRedPassOnly(false);
                }}
                className="mt-3 text-xs text-redbus-500 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <OperatorGroupCard key={group.operatorId} group={group} defaultExpanded={true} />
            ))
          )}
        </main>
      </div>
    </div>
  );
};
