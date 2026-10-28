import React from 'react';
import { Bus, Calendar, Ticket, User, HelpCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activePass,
    setIsDemoControlsOpen,
  } = useApp();

  const isHomeActive = activeTab === 'home' || activeTab === 'search' || activeTab === 'seat-select' || activeTab === 'passenger' || activeTab === 'payment' || activeTab === 'confirmation';
  const isBookingsActive = activeTab === 'manage-bookings';
  const isPassActive = activeTab === 'wallet' || activeTab === 'red-pass-explore';

  return (
    <div className="w-full bg-white border-t border-slate-200 py-1.5 px-3 flex items-center justify-around z-30 flex-shrink-0 shadow-lg">
      {/* Home Tab */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          isHomeActive ? 'text-redbus-500 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <Bus className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* My Bookings Tab */}
      <button
        onClick={() => setActiveTab('manage-bookings')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          isBookingsActive ? 'text-redbus-500 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <Calendar className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Bookings</span>
      </button>

      {/* Red Pass Tab */}
      <button
        onClick={() => setActiveTab(activePass ? 'wallet' : 'red-pass-explore')}
        className={`flex flex-col items-center justify-center flex-1 py-1 relative transition ${
          isPassActive ? 'text-redbus-500 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <div className="relative">
          <Ticket className="w-5 h-5 mb-0.5 text-red-500" />
          {activePass ? (
            <span className="absolute -top-1 -right-3 px-1 py-0.2 rounded-full text-[8px] font-black bg-redbus-500 text-white leading-none">
              {activePass.remainingRides}
            </span>
          ) : (
            <span className="absolute -top-1 -right-3 px-1 py-0.2 rounded-full text-[8px] font-black bg-amber-400 text-slate-900 leading-none">
              NEW
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-tight">Red Pass</span>
      </button>

      {/* Customer Account & Plan Tab */}
      <button
        onClick={() => setActiveTab('account')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition ${
          activeTab === 'account' ? 'text-redbus-500 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Account</span>
      </button>
    </div>
  );
};
