import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, MapPin, Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { POPULAR_ROUTES } from '../data/mockData';

const AVAILABLE_CITIES = ['Warangal', 'Hyderabad', 'Bangalore', 'Mysore', 'Pune', 'Mumbai', 'Chennai', 'Pondicherry'];

export const SearchForm: React.FC = () => {
  const {
    source,
    setSource,
    destination,
    setDestination,
    travelDate,
    setTravelDate,
    setActiveTab,
    showToast,
    isMobileView,
  } = useApp();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
    setErrorMsg(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination) {
      setErrorMsg('Please select both source and destination cities.');
      return;
    }
    if (source.toLowerCase() === destination.toLowerCase()) {
      setErrorMsg('Source and Destination cannot be the same city.');
      return;
    }
    setErrorMsg(null);
    setActiveTab('search');
  };

  const handleSelectQuickRoute = (from: string, to: string) => {
    setSource(from);
    setDestination(to);
    setErrorMsg(null);
    showToast(`Route updated to ${from} → ${to}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-soft border border-surface-border p-4 sm:p-6 transition-all hover:shadow-md">
        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className={isMobileView ? "space-y-3" : "grid grid-cols-1 md:grid-cols-12 gap-3 items-center"}>
          {/* Source Input */}
          <div className={isMobileView ? "w-full relative" : "md:col-span-4 relative"}>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
              From
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-redbus-500 focus-within:ring-2 focus-within:ring-red-100 transition">
              <MapPin className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <select
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full bg-transparent text-slate-800 font-semibold focus:outline-none text-base cursor-pointer"
              >
                {AVAILABLE_CITIES.map((c) => (
                  <option key={`from-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className={isMobileView ? "flex justify-center -my-1 z-10" : "md:col-span-1 flex justify-center -my-2 md:my-0 z-10"}>
            <button
              type="button"
              onClick={handleSwap}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-redbus-500 hover:border-redbus-300 hover:rotate-180 transition-all duration-300"
              title="Swap From and To"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Input */}
          <div className={isMobileView ? "w-full relative" : "md:col-span-4 relative"}>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
              To
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-redbus-500 focus-within:ring-2 focus-within:ring-red-100 transition">
              <MapPin className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setErrorMsg(null);
                }}
                className="w-full bg-transparent text-slate-800 font-semibold focus:outline-none text-base cursor-pointer"
              >
                {AVAILABLE_CITIES.map((c) => (
                  <option key={`to-${c}`} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Selector */}
          <div className={isMobileView ? "w-full relative" : "md:col-span-3 relative"}>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
              Date of Journey
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-3 py-3 bg-slate-50/50 hover:bg-white focus-within:bg-white focus-within:border-redbus-500 focus-within:ring-2 focus-within:ring-red-100 transition">
              <Calendar className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold focus:outline-none text-sm cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quick Date Chips + Action Row */}
        <div className={`mt-4 pt-3 border-t border-slate-100 flex ${isMobileView ? "flex-col space-y-3" : "flex-col sm:flex-row justify-between items-center gap-3"}`}>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium">Quick date:</span>
            <button
              type="button"
              onClick={() => setTravelDate('Today, 15 Nov')}
              className={`px-3 py-1 rounded-full border transition font-medium ${
                travelDate.startsWith('Today')
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setTravelDate('Tomorrow, 16 Nov')}
              className={`px-3 py-1 rounded-full border transition font-medium ${
                travelDate.startsWith('Tomorrow')
                  ? 'bg-redbus-500 text-white border-redbus-500 font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Tomorrow
            </button>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className={`py-3.5 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 transform active:scale-95 ${isMobileView ? "w-full" : "w-full sm:w-auto px-8"}`}
          >
            <Search className="w-5 h-5" />
            <span>SEARCH BUSES</span>
          </button>
        </div>
      </form>

      {/* Popular Corridors Quick Selection */}
      <div className="mt-3 flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-500 font-semibold flex items-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
          Popular Short Routes:
        </span>
        {POPULAR_ROUTES.map((route) => {
          const isSelected = source === route.source && destination === route.destination;
          return (
            <button
              key={`${route.source}-${route.destination}`}
              onClick={() => handleSelectQuickRoute(route.source, route.destination)}
              className={`px-3 py-1 rounded-full transition flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-redbus-500 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-redbus-300 hover:bg-red-50/50'
              }`}
            >
              <span>{route.source} → {route.destination}</span>
              {route.isPilot && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  Pilot Pass
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
