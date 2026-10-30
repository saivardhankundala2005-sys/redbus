import React from 'react';
import { X, Sliders, RefreshCw, Smartphone, Monitor, Shield, Award, CheckCircle2, DollarSign, GraduationCap, Sparkles, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PricingArm } from '../types';

export const DemoControlsDrawer: React.FC = () => {
  const {
    isDemoControlsOpen,
    setIsDemoControlsOpen,
    pricingArm,
    setPricingArm,
    stats,
    resetDemo,
    preloadDemoState,
    viewMode,
    toggleViewMode,
    setIsStudentModalOpen,
    setActiveTab,
    activePass,
    bookings,
    simulateConductorScan,
    showToast,
  } = useApp();

  if (!isDemoControlsOpen) return null;

  const handleArmChange = (arm: PricingArm) => {
    setPricingArm(arm);
    showToast(`Experiment pricing arm switched to: ${
      arm === 'standard_1200' ? '₹1,200 Standard Pack' : arm === 'parity_1230' ? '₹1,230 Parity Arm' : '₹1,140 Student Offer'
    }`);
  };

  const handleSimulateScanDirectly = () => {
    const upcoming = bookings.find((b) => b.status === 'confirmed' || b.status === 'swapped');
    if (upcoming) {
      simulateConductorScan(upcoming.id);
    } else {
      showToast('No active confirmed booking found to scan. Please book a ride or preload demo state.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white max-w-md w-full h-full shadow-2xl p-6 overflow-y-auto border-l border-slate-200 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-redbus-600 flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Demo Experiment Controls</h3>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Case Competition Panel
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsDemoControlsOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Device Frame View Toggle */}
          <div className="mb-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Presentation Viewport
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => viewMode !== 'desktop' && toggleViewMode()}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  viewMode === 'desktop'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>

              <button
                onClick={() => viewMode !== 'mobile_frame' && toggleViewMode()}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  viewMode === 'mobile_frame'
                    ? 'bg-redbus-500 text-white border-redbus-500 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame (390px)</span>
              </button>
            </div>
          </div>

          {/* Section 1: Pricing Arm Experiment Controls */}
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1 text-slate-500" />
                A/B Pricing Experiment Arm
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                Active Arm
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Compare customer conversion between standard discount and operator price-parity arms:
            </p>

            <div className="space-y-2">
              {[
                {
                  id: 'standard_1200',
                  name: 'Arm 1: Standard ₹1,200',
                  price: '₹1,200 / 3 rides',
                  sub: '₹400 / ride (~12% discount incentive)',
                },
                {
                  id: 'parity_1230',
                  name: 'Arm 2: Price-Parity ₹1,230',
                  price: '₹1,230 / 3 rides',
                  sub: '₹410 / ride (Exact match to single-ticket fare)',
                },
                {
                  id: 'student_1140',
                  name: 'Arm 3: Campus Student ₹1,140',
                  price: '₹1,140 / 3 rides',
                  sub: '₹380 / ride (Gated by student verification)',
                },
              ].map((arm) => (
                <label
                  key={arm.id}
                  onClick={() => handleArmChange(arm.id as PricingArm)}
                  className={`flex items-start justify-between p-2.5 rounded-xl border-2 cursor-pointer transition ${
                    pricingArm === arm.id
                      ? 'border-redbus-500 bg-red-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-100/50'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{arm.name}</span>
                    <span className="text-[10px] text-slate-500">{arm.sub}</span>
                  </div>
                  <input
                    type="radio"
                    name="pricingArmGroup"
                    checked={pricingArm === arm.id}
                    onChange={() => {}}
                    className="accent-redbus-500 mt-1 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Section 2: Quick Presentation Scenarios */}
          <div className="mb-6 space-y-2.5">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              One-Click Walkthrough Shortcuts
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  preloadDemoState();
                  setActiveTab('wallet');
                  setIsDemoControlsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:border-red-200 border border-slate-200 text-xs font-bold text-slate-800 transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">🎟️</span>
                  <div>
                    <span>Jump to Active Pass Wallet</span>
                    <span className="text-[10px] text-slate-500 font-normal block">Preloads 2 rides balance and upcoming ride</span>
                  </div>
                </div>
                <ArrowRightIcon />
              </button>

              <button
                onClick={() => {
                  setIsStudentModalOpen(true);
                  setIsDemoControlsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-slate-200 text-xs font-bold text-slate-800 transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">🎓</span>
                  <div>
                    <span>Trigger Student Verification</span>
                    <span className="text-[10px] text-slate-500 font-normal block">Simulate college ID roll verification</span>
                  </div>
                </div>
                <ArrowRightIcon />
              </button>

              <button
                onClick={handleSimulateScanDirectly}
                className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 text-xs font-bold text-slate-800 transition flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">📲</span>
                  <div>
                    <span>Simulate Conductor QR Scan</span>
                    <span className="text-[10px] text-slate-500 font-normal block">Increments loyalty boarding progress</span>
                  </div>
                </div>
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          {/* Section 3: Live Demo Metrics (KPIs) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Demo Session Metrics</span>
              <span className="text-[9px] text-slate-400 font-mono">Real-time local state</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Passes Purchased</span>
                <span className="text-lg font-black text-slate-800">{stats.passesPurchasedCount}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Rides Redeemed</span>
                <span className="text-lg font-black text-redbus-600">{stats.passRidesRedeemedCount}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Active Pass Balance</span>
                <span className="text-lg font-black text-emerald-600">
                  {activePass ? `${activePass.remainingRides} rides` : 'None'}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Scanned Boardings</span>
                <span className="text-lg font-black text-blue-600">{stats.scannedBoardingsCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Reset Action */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset entire demo to clean fresh state?')) {
                resetDemo();
                setIsDemoControlsOpen(false);
              }
            }}
            className="w-full py-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs rounded-xl border border-slate-300 hover:border-rose-300 transition flex items-center justify-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Clean State</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
