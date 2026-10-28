import React, { useState } from 'react';
import { Bus, Car, Train, Tag, ShieldCheck, Clock, Ticket, Sparkles, ChevronRight, Award } from 'lucide-react';
import { SearchForm } from './SearchForm';
import { RedPassDiscoverySection } from './RedPassDiscoverySection';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const [activeServiceTab, setActiveServiceTab] = useState<'bus' | 'cab' | 'train'>('bus');
  const { setActiveTab, setIsStudentModalOpen, showToast, isMobileView } = useApp();

  return (
    <div className="w-full pb-12">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-b from-redbus-500 via-redbus-600 to-redbus-700 text-white pt-5 pb-16 px-4 sm:px-6 lg:px-8 relative shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Service Tabs (Matching Exhibit 2 Homepage: Bus Tickets / Ryde / redRail) */}
          <div className="flex items-center space-x-2 sm:space-x-3 mb-5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveServiceTab('bus')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex-shrink-0 ${
                activeServiceTab === 'bus'
                  ? 'bg-white text-redbus-600 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>Bus Tickets</span>
            </button>

            <button
              onClick={() => {
                setActiveServiceTab('cab');
                showToast('Cab & Bus Rental (Ryde) is simulated in this ticket booking prototype.');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex-shrink-0 ${
                activeServiceTab === 'cab'
                  ? 'bg-white text-redbus-600 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>rYde (Cab / Rental)</span>
            </button>

            <button
              onClick={() => {
                setActiveServiceTab('train');
                showToast('redRail Train Booking is simulated in this bus booking prototype.');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex-shrink-0 ${
                activeServiceTab === 'train'
                  ? 'bg-white text-redbus-600 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>redRail (Trains)</span>
            </button>
          </div>

          {/* Heading */}
          <div className="max-w-2xl mb-4">
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              India&apos;s No. 1 Bus Ticket Booking App
            </h1>
            <p className="text-red-100 text-xs sm:text-sm mt-1">
              Guaranteed seat allocation on 3,500+ private and state bus operators nationwide.
            </p>
          </div>
        </div>
      </div>

      {/* Main Booking Container overlapping the hero banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Primary Booking Panel */}
        <SearchForm />

        {/* Critical UX Change: Red Pass Discovery section directly below Search Form (NO POPUPS) */}
        <RedPassDiscoverySection />

        {/* Promo Offers Section - Horizontal Sliding Carousel (Recreating Exhibit 2 Offers Carousel) */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5">
              <Tag className="w-4 h-4 text-redbus-500" />
              <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">TRENDING OFFERS</h3>
            </div>
            <span className="text-[11px] font-bold text-redbus-500 hover:underline cursor-pointer">
              View All (4)
            </span>
          </div>

          {/* Sliding blocks: horizontal scroll container */}
          <div className="flex space-x-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Offer 1: FIRST */}
            <div className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-3.5 shadow-soft flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Bus Ticket
                </span>
                <h4 className="text-sm font-extrabold leading-tight">Save up to ₹250</h4>
                <p className="text-[10px] text-blue-100">Valid on first ticket booking</p>
                <div className="pt-0.5 font-mono text-[10px] font-bold bg-white/10 inline-block px-2 py-0.5 rounded border border-white/20">
                  CODE: FIRST
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-lg flex-shrink-0">
                %
              </div>
            </div>

            {/* Offer 2: Red Pass Campus Discount */}
            <div
              onClick={() => setIsStudentModalOpen(true)}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl p-3.5 shadow-soft flex items-center justify-between cursor-pointer hover:shadow-md transition"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Student Special
                </span>
                <h4 className="text-sm font-extrabold leading-tight">Campus Red Pass</h4>
                <p className="text-[10px] text-amber-100">10 rides for ₹3,800 (Save 16%)</p>
                <div className="pt-0.5 text-[10px] font-bold underline flex items-center">
                  <span>Verify Student ID</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Offer 3: Loyalty Voucher */}
            <div
              onClick={() => setActiveTab('red-pass-explore')}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-3.5 shadow-soft flex items-center justify-between cursor-pointer hover:shadow-md transition"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Frequent Riders
                </span>
                <h4 className="text-sm font-extrabold leading-tight">₹100 Loyalty Reward</h4>
                <p className="text-[10px] text-red-100">After every 15 completed boardings</p>
                <div className="pt-0.5 text-[10px] font-bold underline flex items-center">
                  <span>Learn how Red Pass works</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Offer 4: Corridor Pass */}
            <div
              onClick={() => setActiveTab('red-pass-explore')}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-3.5 shadow-soft flex items-center justify-between cursor-pointer hover:shadow-md transition"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Corridor Pass
                </span>
                <h4 className="text-sm font-extrabold leading-tight">Warangal ⇄ Hyderabad</h4>
                <p className="text-[10px] text-emerald-100">Guaranteed seat selection</p>
                <div className="pt-0.5 text-[10px] font-bold underline flex items-center">
                  <span>View 4 Operators</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Ticket className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Why Red Pass Feature Pillars - Sliding Blocks on Mobile */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-soft">
          <div className="text-center max-w-xl mx-auto mb-4">
            <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight">
              Designed for Short-Route Commuters
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
              Replacing the anxiety of open-bus passes with guaranteed seat certainty.
            </p>
          </div>

          <div className={isMobileView ? "flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-2 px-2" : "grid grid-cols-1 sm:grid-cols-3 gap-4"}>
            <div className={`${isMobileView ? 'w-[230px] flex-shrink-0 snap-start bg-slate-50/70 p-3 rounded-xl border border-slate-100' : 'flex items-start space-x-3'}`}>
              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-redbus-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Confirmed Seat Allocation</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Never scramble for a seat or get turned away. Every ride is booked with a specific operator, time, and seat.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isMobileView ? 'w-[230px] flex-shrink-0 snap-start bg-slate-50/70 p-3 rounded-xl border border-slate-100' : 'flex items-start space-x-3'}`}>
              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-redbus-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">1-Hour Free Bus Changes</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Meeting ran late? Free bus swap to another scheduled departure of the same operator up to 60 mins before.
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isMobileView ? 'w-[230px] flex-shrink-0 snap-start bg-slate-50/70 p-3 rounded-xl border border-slate-100' : 'flex items-start space-x-3'}`}>
              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-redbus-600 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Rotating QR Boarding</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Board hassle-free with a single conductor scan. Instant digital settlement and audit trail for operators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
