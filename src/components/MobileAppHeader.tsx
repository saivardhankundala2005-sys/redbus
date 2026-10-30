import React from 'react';
import { ArrowLeft, Bell, Bus, Menu, Shield, Ticket, User, Wifi, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const MobileAppHeader: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    source,
    destination,
    travelDate,
    selectedDeparture,
    activePass,
    setIsDemoControlsOpen,
  } = useApp();

  const handleBack = () => {
    switch (activeTab) {
      case 'search':
        setActiveTab('home');
        break;
      case 'seat-select':
        setActiveTab('search');
        break;
      case 'passenger':
        setActiveTab('seat-select');
        break;
      case 'payment':
        setActiveTab('passenger');
        break;
      case 'confirmation':
        setActiveTab('home');
        break;
      case 'red-pass-explore':
        setActiveTab('home');
        break;
      case 'wallet':
        setActiveTab('home');
        break;
      case 'manage-bookings':
        setActiveTab('home');
        break;
      case 'account':
        setActiveTab('home');
        break;
      default:
        setActiveTab('home');
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'search':
        return `${source} → ${destination}`;
      case 'seat-select':
        return selectedDeparture ? `Select Seat: ${selectedDeparture.operatorName.split(' ')[0]}` : 'Select Seat';
      case 'passenger':
        return 'Passenger Details';
      case 'payment':
        return 'Select Payment Option';
      case 'confirmation':
        return 'Booking Confirmed';
      case 'red-pass-explore':
        return 'Red Pass — 3 Ride Pack';
      case 'wallet':
        return 'Red Pass Wallet';
      case 'manage-bookings':
        return 'My Bookings';
      case 'account':
        return 'My Profile & Plans';
      default:
        return 'redBus';
    }
  };

  const isHome = activeTab === 'home';

  return (
    <div className="w-full bg-redbus-500 text-white sticky top-0 z-30 shadow-md flex-shrink-0">
      {/* iOS Status Bar Simulation */}
      <div className="flex justify-between items-center px-6 pt-2 pb-1 text-[11px] font-semibold tracking-tight text-white/90 select-none">
        <span>9:41</span>
        <div className="flex items-center space-x-1.5">
          <span className="text-[10px]">5G</span>
          <Wifi className="w-3.5 h-3.5 inline" />
          <div className="w-4 h-2 rounded-xs border border-white/80 p-0.5 flex items-center">
            <div className="w-full h-full bg-white rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main Mobile App Bar */}
      <div className="h-14 px-4 flex items-center justify-between">
        {isHome ? (
          <>
            {/* Left Hamburger & Brand */}
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setIsDemoControlsOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition active:scale-95"
                title="Menu & Controls"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand mark */}
              <div className="flex items-center space-x-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30">
                <div className="w-5 h-5 rounded-md bg-white text-redbus-600 flex items-center justify-center font-black text-xs">
                  <Bus className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-baseline leading-none">
                  <span className="font-black text-white text-base tracking-tight">red</span>
                  <span className="font-bold text-white text-base tracking-tight">Bus</span>
                </div>
              </div>
            </div>

            {/* Right: Active Red Pass Capsule & Bell */}
            <div className="flex items-center space-x-2">
              {activePass ? (
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="flex items-center space-x-1.5 bg-white text-redbus-600 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs hover:bg-red-50 transition active:scale-95"
                >
                  <Ticket className="w-3.5 h-3.5 text-red-500" />
                  <span>{activePass.remainingRides} Rides</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('red-pass-explore')}
                  className="flex items-center space-x-1 bg-amber-400 text-slate-900 px-2.5 py-1 rounded-full text-xs font-black shadow-xs hover:bg-amber-300 transition"
                >
                  <Sparkles className="w-3 h-3 text-slate-900" />
                  <span>Get Pass</span>
                </button>
              )}

              <button
                onClick={() => setIsDemoControlsOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition relative"
                title="Notifications & Controls"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Left: Back Arrow */}
            <button
              onClick={handleBack}
              className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition active:scale-95 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Center: Page Title */}
            <div className="text-center truncate px-2 flex-1">
              <h2 className="text-sm font-bold truncate text-white leading-tight">
                {getTitle()}
              </h2>
              {activeTab === 'search' && (
                <span className="text-[10px] text-red-100 block truncate">{travelDate}</span>
              )}
            </div>

            {/* Right: Wallet / Demo Shortcut */}
            {activePass && activeTab !== 'wallet' ? (
              <button
                onClick={() => setActiveTab('wallet')}
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-[11px] font-bold text-white transition flex-shrink-0"
              >
                <Ticket className="w-3 h-3" />
                <span>{activePass.remainingRides}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsDemoControlsOpen(true)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white text-xs font-bold transition flex-shrink-0"
                title="Demo Controls"
              >
                <Shield className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Quick Category Navigation Pill Bar on Home (Recreates Exhibit 2 tabs) */}
      {isHome && (
        <div className="px-3 pb-2.5 pt-0.5 flex items-center space-x-1.5 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className="px-3 py-1 rounded-full bg-white text-redbus-600 font-bold shadow-xs flex-shrink-0 flex items-center space-x-1"
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Bus Tickets</span>
          </button>

          <button
            onClick={() => setActiveTab(activePass ? 'wallet' : 'red-pass-explore')}
            className="px-3 py-1 rounded-full bg-red-700/70 hover:bg-red-700 text-white font-semibold flex-shrink-0 flex items-center space-x-1 transition"
          >
            <Ticket className="w-3.5 h-3.5 text-amber-300" />
            <span>Red Pass</span>
            <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded-sm font-black ml-0.5">
              3 Rides
            </span>
          </button>

          <button
            onClick={() => setActiveTab('manage-bookings')}
            className="px-3 py-1 rounded-full bg-red-700/70 hover:bg-red-700 text-white font-semibold flex-shrink-0 transition"
          >
            <span>My Bookings</span>
          </button>
        </div>
      )}
    </div>
  );
};
