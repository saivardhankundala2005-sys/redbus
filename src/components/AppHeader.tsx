import React from 'react';
import { Bus, Ticket, ShieldCheck, HelpCircle, User, Smartphone, Monitor, Sliders, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const AppHeader: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    toggleViewMode,
    activePass,
    setIsDemoControlsOpen,
    pricingArm,
  } = useApp();

  return (
    <header className="hidden md:block bg-white border-b border-surface-border sticky top-0 z-40 shadow-sm transition-all">
      {/* Top micro-bar for case presentation badge */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-600 text-white tracking-wide uppercase">
            MVP Prototype
          </span>
          <span className="hidden sm:inline text-slate-300">
            redBus Product Management Case — <strong className="text-white">Red Pass Pivot</strong>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Active Pricing Arm Indicator */}
          <div className="hidden md:flex items-center space-x-1.5 text-[11px] bg-slate-800 px-2 py-0.5 rounded text-amber-300 border border-slate-700">
            <span>Price Arm:</span>
            <span className="font-bold">
              {pricingArm === 'standard_4000' && '₹4,000 Standard'}
              {pricingArm === 'parity_4100' && '₹4,100 Parity'}
              {pricingArm === 'student_3800' && '₹3,800 Campus'}
            </span>
          </div>

          {/* Device Frame View Toggle */}
          <button
            onClick={toggleViewMode}
            className="flex items-center space-x-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded transition text-xs border border-slate-700"
            title="Toggle between Desktop web view and Mobile phone frame view"
          >
            {viewMode === 'desktop' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-red-400" />
                <span className="font-medium">Mobile Frame View</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-medium">Desktop Web View</span>
              </>
            )}
          </button>

          {/* Demo Controls Drawer Trigger */}
          <button
            onClick={() => setIsDemoControlsOpen(true)}
            className="flex items-center space-x-1 text-red-300 hover:text-white bg-red-950/80 hover:bg-red-900 border border-red-700/60 px-2.5 py-0.5 rounded transition text-xs font-medium"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Demo Controls</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Primary Brand Identity */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2 group text-left focus:outline-none"
            >
              {/* redBus style red pillow bus mark */}
              <div className="w-10 h-10 rounded-xl bg-redbus-500 text-white flex items-center justify-center shadow-md group-hover:bg-redbus-600 transition">
                <Bus className="w-6 h-6 transform group-hover:scale-105 transition" />
              </div>
              <div className="leading-tight">
                <div className="flex items-baseline">
                  <span className="text-2xl font-black text-redbus-500 tracking-tight">red</span>
                  <span className="text-2xl font-bold text-slate-800 tracking-tight">Bus</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block -mt-1">
                  Travel & Rides
                </span>
              </div>
            </button>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-1.5 ${
                  activeTab === 'home' || activeTab === 'search' || activeTab === 'seat-select'
                    ? 'text-redbus-500 bg-red-50'
                    : 'text-slate-700 hover:text-redbus-500 hover:bg-slate-50'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>Bus Tickets</span>
              </button>

              <button
                onClick={() => setActiveTab('red-pass-explore')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-1.5 relative ${
                  activeTab === 'red-pass-explore' || activeTab === 'red-pass-checkout'
                    ? 'text-redbus-500 bg-red-50'
                    : 'text-slate-700 hover:text-redbus-500 hover:bg-slate-50'
                }`}
              >
                <Ticket className="w-4 h-4 text-red-500" />
                <span>Red Pass</span>
                <span className="ml-1 inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 text-amber-600" />
                  10 Rides
                </span>
              </button>

              <button
                onClick={() => setActiveTab('manage-bookings')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center space-x-1.5 ${
                  activeTab === 'manage-bookings'
                    ? 'text-redbus-500 bg-red-50'
                    : 'text-slate-700 hover:text-redbus-500 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Manage Booking</span>
              </button>
            </nav>
          </div>

          {/* Right section: Wallet / Account */}
          <div className="flex items-center space-x-3">
            {/* Active Red Pass Wallet Capsule */}
            {activePass ? (
              <button
                onClick={() => setActiveTab('wallet')}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 hover:border-red-400 px-3.5 py-1.5 rounded-full transition shadow-sm group text-left"
              >
                <div className="w-6 h-6 rounded-full bg-redbus-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {activePass.remainingRides}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-red-800 block group-hover:text-red-900 leading-none">
                    Red Pass Wallet
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {activePass.remainingRides} rides left
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('red-pass-explore')}
                className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold bg-red-50 hover:bg-red-100 text-redbus-600 border border-red-200 px-3 py-1.5 rounded-full transition"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Get Red Pass</span>
              </button>
            )}

            {/* Help & Support */}
            <button
              onClick={() => setActiveTab('manage-bookings')}
              className="text-slate-600 hover:text-redbus-500 p-2 rounded-lg hover:bg-slate-100 transition hidden sm:flex items-center space-x-1 text-xs font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>

            {/* Profile Avatar / Customer Account */}
            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center space-x-2 border-l border-slate-200 pl-3 transition hover:opacity-85 text-left rounded-lg p-1 ${
                activeTab === 'account' ? 'bg-red-50 text-redbus-600' : ''
              }`}
              title="View Customer Profile & Plans"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="font-semibold text-slate-800">Sai Varun</div>
                <div className="text-[10px] text-slate-500">Commuter Pass Holder</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
