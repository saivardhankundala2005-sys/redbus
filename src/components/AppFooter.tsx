import React from 'react';
import { Bus, Shield, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AppFooter: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="hidden md:block bg-slate-900 text-slate-400 text-xs mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-redbus-500 text-white flex items-center justify-center font-bold">
                <Bus className="w-5 h-5" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-black text-white">red</span>
                <span className="text-xl font-bold text-red-500">Bus</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India&apos;s largest online bus ticketing platform with over 36 million satisfied customers. Pioneering the new <strong>Red Pass</strong> high-flexibility commuter experience.
            </p>
            <div className="text-[11px] text-slate-500">
              Case MVP: <em>Art and Science of Product Management — Open Ticket Failure and Red Pass Pivot</em>.
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-tight mb-3">Navigation & Services</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition">
                  Bus Ticket Booking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('red-pass-explore')} className="hover:text-white transition text-red-400 font-semibold">
                  Red Pass 3-Ride Packs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wallet')} className="hover:text-white transition">
                  Red Pass Digital Wallet
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('manage-bookings')} className="hover:text-white transition">
                  Manage Active Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Pilot Corridors */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-tight mb-3">Active Pilot Corridors</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Warangal ⇄ Hyderabad (Featured Pilot)</li>
              <li>Bangalore ⇄ Mysore (Express Corridor)</li>
              <li>Pune ⇄ Mumbai (Intercity Corridor)</li>
              <li>Chennai ⇄ Pondicherry (Coastal Pilot)</li>
            </ul>
          </div>

          {/* Col 4: Policy & Safety */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-tight mb-3">Customer Commitments</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>✓ Confirmed Named Seat Allocation</li>
              <li>✓ 1-Hour Free Bus Change Window</li>
              <li>✓ Protected Women-Reserved Seating</li>
              <li>✓ Conductor Digital QR Verification</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2024 redBus Case Competition MVP. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Demonstration prototype running entirely in-browser. All fares, schedules, and passes use synthetic local test data.
          </p>
        </div>
      </div>
    </footer>
  );
};
