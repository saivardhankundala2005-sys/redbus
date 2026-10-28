import React, { useState, useEffect } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Clock, User, Bus, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

interface BoardingQRModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const BoardingQRModal: React.FC<BoardingQRModalProps> = ({ booking, onClose }) => {
  const { simulateConductorScan, loyalty } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Simulated rotating QR code token
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!booking) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      simulateConductorScan(booking.id);
      setIsScanning(false);
    }, 600);
  };

  const isBoarded = booking.status === 'boarded' || booking.qrVerified;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-elevated border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-redbus-600 mb-1">
            DIGITAL BOARDING PASS
          </span>
          <h3 className="text-lg font-black text-slate-900">{booking.departure.operatorName}</h3>
          <p className="text-xs text-slate-500">
            {booking.departure.source} → {booking.departure.destination}
          </p>
        </div>

        {/* Rotating Dynamic QR Code Box */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-center relative flex flex-col items-center justify-center">
          {/* Rotating animation pulse ring */}
          <div className="relative p-2 bg-white rounded-xl shadow-xs border border-slate-200 mb-3">
            <div className={`w-44 h-44 flex items-center justify-center relative ${!isBoarded ? 'animate-ring-pulse' : ''}`}>
              {/* Scalable Vector SVG QR representation */}
              <svg viewBox="0 0 100 100" className="w-40 h-40 text-slate-900">
                {/* Simulated high-density QR Code matrix pattern */}
                <rect width="100" height="100" fill="white" />
                {/* Corner markers */}
                <rect x="5" y="5" width="26" height="26" fill="black" rx="4" />
                <rect x="9" y="9" width="18" height="18" fill="white" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="black" rx="1" />

                <rect x="69" y="5" width="26" height="26" fill="black" rx="4" />
                <rect x="73" y="9" width="18" height="18" fill="white" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="black" rx="1" />

                <rect x="5" y="69" width="26" height="26" fill="black" rx="4" />
                <rect x="9" y="73" width="18" height="18" fill="white" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="black" rx="1" />

                {/* Randomly distributed QR payload blocks */}
                <rect x="36" y="8" width="6" height="6" fill="black" />
                <rect x="48" y="12" width="12" height="6" fill="black" />
                <rect x="36" y="24" width="8" height="6" fill="black" />
                <rect x="52" y="22" width="6" height="12" fill="black" />
                <rect x="12" y="38" width="16" height="6" fill="black" />
                <rect x="34" y="38" width="6" height="18" fill="black" />
                <rect x="46" y="44" width="12" height="8" fill="black" />
                <rect x="66" y="38" width="14" height="6" fill="black" />
                <rect x="86" y="44" width="8" height="8" fill="black" />
                <rect x="10" y="52" width="6" height="10" fill="black" />
                <rect x="22" y="56" width="8" height="6" fill="black" />
                <rect x="44" y="60" width="8" height="8" fill="black" />
                <rect x="58" y="58" width="16" height="6" fill="black" />
                <rect x="78" y="56" width="12" height="6" fill="black" />
                <rect x="38" y="76" width="6" height="14" fill="black" />
                <rect x="50" y="72" width="14" height="8" fill="black" />
                <rect x="70" y="76" width="8" height="8" fill="black" />
                <rect x="84" y="72" width="8" height="16" fill="black" />
              </svg>

              {/* Center redBus watermarked pill */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-redbus-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                  redBus
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {isBoarded ? (
            <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified & Boarded</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Dynamic token rotates in <strong>{secondsRemaining}s</strong></span>
            </div>
          )}
        </div>

        {/* Passenger & Seat Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Passenger Name:</span>
            <span className="font-bold text-slate-800">{booking.passenger.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Confirmed Seat:</span>
            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-sm">
              {booking.selectedSeats.map((s) => s.seatNumber).join(', ')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Departure Time:</span>
            <span className="font-bold text-slate-800">{booking.departure.departureTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">PNR / Ref:</span>
            <span className="font-mono text-slate-700 font-semibold">{booking.bookingRef}</span>
          </div>
        </div>

        {/* Conductor Scan Simulation Button */}
        <div className="mt-5">
          {!isBoarded ? (
            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              {isScanning ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying QR Scan...</span>
                </div>
              ) : (
                <>
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Simulate Conductor Scan</span>
                </>
              )}
            </button>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-900 font-semibold">
              ✓ Boarding scan completed. Loyalty boarding count updated ({loyalty.completedBoardings} of 15).
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
