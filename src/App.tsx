import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { MobileAppHeader } from './components/MobileAppHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './components/HomePage';
import { ResultsPage } from './components/ResultsPage';
import { SeatLayout } from './components/SeatLayout';
import { PassengerForm } from './components/PassengerForm';
import { MockPayment } from './components/MockPayment';
import { BookingConfirmation } from './components/BookingConfirmation';
import { RedPassLandingPage } from './components/RedPassLandingPage';
import { RedPassWallet } from './components/RedPassWallet';
import { ManageBookings } from './components/ManageBookings';
import { StudentVerificationModal } from './components/StudentVerificationModal';
import { DemoControlsDrawer } from './components/DemoControlsDrawer';
import { AccountProfilePage } from './components/AccountProfilePage';
import { Smartphone, CheckCircle2, Sliders, Monitor, RotateCcw, Maximize2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    viewMode,
    toggleViewMode,
    toastMessage,
    setIsDemoControlsOpen,
    pricingArm,
    resetDemo,
  } = useApp();

  // Longer phone size state (defaulting to 'tall' 920px as requested by user!)
  const [phoneSize, setPhoneSize] = useState<'standard' | 'tall' | 'max'>('tall');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <ResultsPage />;
      case 'seat-select':
        return <SeatLayout />;
      case 'passenger':
        return <PassengerForm />;
      case 'payment':
        return <MockPayment />;
      case 'confirmation':
        return <BookingConfirmation />;
      case 'red-pass-explore':
        return <RedPassLandingPage />;
      case 'wallet':
        return <RedPassWallet />;
      case 'manage-bookings':
        return <ManageBookings />;
      case 'account':
        return <AccountProfilePage />;
      default:
        return <HomePage />;
    }
  };

  const getPhoneHeightClass = () => {
    switch (phoneSize) {
      case 'standard':
        return 'h-[820px]';
      case 'max':
        return 'h-[980px]';
      case 'tall':
      default:
        return 'h-[920px]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col justify-between selection:bg-red-500 selection:text-white overflow-x-hidden">
      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-elevated border border-slate-700 flex items-center space-x-2.5 max-w-md animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick Demo Trigger (Bottom Left on Desktop) */}
      <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center space-x-2">
        <button
          onClick={() => setIsDemoControlsOpen(true)}
          className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border border-slate-700 flex items-center space-x-1.5 transition transform hover:scale-105"
        >
          <Sliders className="w-3.5 h-3.5 text-red-400" />
          <span>Case Demo Panel</span>
        </button>

        <button
          onClick={toggleViewMode}
          className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-2 rounded-full shadow-md border border-slate-200 flex items-center space-x-1.5 transition"
        >
          {viewMode === 'desktop' ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Mobile Phone View</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-blue-500" />
              <span>Desktop Web View</span>
            </>
          )}
        </button>
      </div>

      {viewMode === 'mobile_frame' ? (
        /* Mobile Phone Simulator Presentation Canvas */
        <div className="py-8 px-4 flex flex-col items-center justify-start min-h-screen bg-slate-950 overflow-y-auto">
          {/* External Presenter Toolbar (OUTSIDE the phone screen) */}
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5 text-xs z-20">
            <button
              onClick={toggleViewMode}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center space-x-1.5 shadow-sm transition"
            >
              <Monitor className="w-3.5 h-3.5 text-blue-400" />
              <span>Switch to Desktop View</span>
            </button>

            {/* Chassis Height Toggle for Presenter */}
            <div className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-xl flex items-center space-x-1 text-slate-300">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Height:</span>
              {(['standard', 'tall', 'max'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setPhoneSize(s)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold capitalize transition ${
                    phoneSize === s ? 'bg-redbus-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s === 'tall' ? 'Tall (920px)' : s === 'max' ? 'Max (980px)' : 'Standard'}
                </button>
              ))}
            </div>

            <div className="bg-slate-800 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5">
              <span className="text-slate-400 font-normal">Arm:</span>
              <span>
                {pricingArm === 'standard_1200' && '₹1,200 Standard'}
                {pricingArm === 'parity_1230' && '₹1,230 Parity'}
                {pricingArm === 'student_1140' && '₹1,140 Student'}
              </span>
            </div>

            <button
              onClick={() => setIsDemoControlsOpen(true)}
              className="bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white font-bold px-3 py-1.5 rounded-xl border border-red-700/60 flex items-center space-x-1.5 shadow-sm transition"
            >
              <Sliders className="w-3.5 h-3.5 text-red-400" />
              <span>Demo Controls</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset demo state to clean?')) resetDemo();
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl border border-slate-700 flex items-center space-x-1 transition"
              title="Reset Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Longer iPhone Pro Max Chassis Frame (425px × 920px default) */}
          <div className={`w-[425px] ${getPhoneHeightClass()} max-w-full bg-black rounded-[54px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col flex-shrink-0 transition-all duration-300`}>
            {/* Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end pr-2 space-x-1.5 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-blue-950"></div>
            </div>

            {/* Inner Phone Display Container */}
            <div className="w-full h-full bg-[#F5F6F8] rounded-[44px] overflow-hidden flex flex-col justify-between relative">
              {/* Native Mobile App Header with quick category tabs and pass pill */}
              <MobileAppHeader />

              {/* Native Scrollable Screen Content */}
              <main className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none pb-2">
                {renderActiveScreen()}
              </main>

              {/* Native Mobile Bottom Navigation */}
              <MobileBottomNav />

              {/* iOS Home Indicator Bar */}
              <div className="w-full bg-white flex justify-center pb-1">
                <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Responsive View (Desktop Header on md+, Native Mobile Header on mobile) */
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Desktop Navbar for md+ screens */}
            <AppHeader />

            {/* Mobile Header for small screens (< md) */}
            <div className="md:hidden">
              <MobileAppHeader />
            </div>

            {/* Main Content Area */}
            <main className="pb-16 md:pb-0">
              {renderActiveScreen()}
            </main>
          </div>

          {/* Mobile Bottom Navigation for small screens */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-30">
            <MobileBottomNav />
          </div>

          {/* Desktop Footer for md+ screens */}
          <AppFooter />
        </div>
      )}

      {/* Global Modals */}
      <StudentVerificationModal />
      <DemoControlsDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
