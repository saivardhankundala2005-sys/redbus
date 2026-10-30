import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Shield, Smartphone, Ticket, Wallet, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MockPayment: React.FC = () => {
  const {
    selectedDeparture,
    selectedSeats,
    assuranceOpted,
    bookingJourneyType,
    confirmBooking,
    setActiveTab,
    activePass,
    showToast,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi_phonepe' | 'upi_gpay' | 'upi_paytm' | 'card' | 'wallet'>(
    'upi_gpay'
  );
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!selectedDeparture || selectedSeats.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border text-center shadow-soft">
        <p className="text-slate-600 mb-4">No booking selected.</p>
        <button
          onClick={() => setActiveTab('home')}
          className="px-6 py-2.5 bg-redbus-500 text-white font-bold rounded-xl text-sm"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const preferredFees = selectedSeats.reduce((acc, s) => acc + (s.preferredFee || 0), 0);
  const baseTicketTotal = bookingJourneyType === 'red_pass' ? 0 : selectedSeats.length * selectedDeparture.fare;
  const assuranceFee = assuranceOpted ? 16 * selectedSeats.length : 0;
  const discount = couponApplied ? 50 : 0;
  const grandTotal = Math.max(0, baseTicketTotal + preferredFees + assuranceFee - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'FIRST' || couponCode.trim().toUpperCase() === 'REDBUS') {
      setCouponApplied(true);
      showToast('Coupon applied! ₹50 discount deducted.');
    } else {
      showToast('Invalid coupon. Try using "FIRST" or "REDBUS".');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = confirmBooking();
      setIsProcessing(false);
      if (res.success) {
        setActiveTab('confirmation');
      } else {
        showToast(res.message);
      }
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 sm:p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('passenger')}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Select Payment Option</h2>
            <div className="text-xs text-slate-500">
              {selectedDeparture.source} → {selectedDeparture.destination} • {selectedDeparture.departureTime}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Amount</div>
          <div className="text-2xl font-black text-slate-900">₹{grandTotal}</div>
        </div>
      </div>

      {/* Demo Mode Notice Banner */}
      <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3 text-xs text-emerald-900">
        <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <div>
          <strong className="block text-emerald-950 font-bold">Demo Payment Gateway (No Live Charges)</strong>
          <span>This is an interactive case study prototype. All transactions execute locally with synthetic data.</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Red Pass Deduction Banner if in Red Pass Journey */}
        {bookingJourneyType === 'red_pass' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-redbus-500 text-white flex items-center justify-center font-bold">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-red-900 block">Red Pass Ride Deduction</span>
                <span className="text-xs text-slate-600">
                  {activePass && activePass.remainingRides <= 1
                    ? 'Final ride of cycle: 1 ride debited and pass will automatically reset to 3 rides (MVP Mode).'
                    : `1 ride will be debited from your active pack (${activePass?.remainingRides} remaining).`}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-emerald-700 px-3 py-1 rounded-full border border-red-200">
              ₹0 Base Fare
            </span>
          </div>
        )}

        {/* Coupon Code Section */}
        {bookingJourneyType !== 'red_pass' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Have a Coupon Code?</h3>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter code (e.g. FIRST)"
                disabled={couponApplied}
                className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm uppercase font-semibold focus:outline-none focus:border-redbus-500 bg-slate-50 disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={couponApplied || !couponCode.trim()}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition"
              >
                {couponApplied ? 'Applied' : 'APPLY'}
              </button>
            </form>
            {couponApplied && (
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                ₹50 promotional discount applied!
              </p>
            )}
          </div>
        )}

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100">
            Choose Payment Method
          </h3>

          {/* UPI Options */}
          <div className="space-y-2">
            <label
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'upi_gpay' ? 'border-redbus-500 bg-red-50/40 shadow-xs' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                  GPay
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Google Pay UPI</span>
                  <span className="text-[11px] text-slate-500">Instant verification & refunds</span>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={paymentMethod === 'upi_gpay'}
                onChange={() => setPaymentMethod('upi_gpay')}
                className="accent-redbus-500 w-4 h-4"
              />
            </label>

            <label
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'upi_phonepe' ? 'border-redbus-500 bg-red-50/40 shadow-xs' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                  Pe
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">PhonePe UPI</span>
                  <span className="text-[11px] text-slate-500">Fast checkout</span>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={paymentMethod === 'upi_phonepe'}
                onChange={() => setPaymentMethod('upi_phonepe')}
                className="accent-redbus-500 w-4 h-4"
              />
            </label>

            <label
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'upi_paytm' ? 'border-redbus-500 bg-red-50/40 shadow-xs' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs">
                  Paytm
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Paytm UPI / Wallet</span>
                  <span className="text-[11px] text-slate-500">Linked demo wallet</span>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={paymentMethod === 'upi_paytm'}
                onChange={() => setPaymentMethod('upi_paytm')}
                className="accent-redbus-500 w-4 h-4"
              />
            </label>

            <label
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                paymentMethod === 'card' ? 'border-redbus-500 bg-red-50/40 shadow-xs' : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Credit / Debit Card</span>
                  <span className="text-[11px] text-slate-500">Visa, Mastercard, RuPay</span>
                </div>
              </div>
              <input
                type="radio"
                name="payMethod"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="accent-redbus-500 w-4 h-4"
              />
            </label>
          </div>
        </div>

        {/* Pay Action Button */}
        <button
          type="button"
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-4 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 disabled:bg-slate-300 text-white font-bold text-base rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Securing Booking...</span>
            </div>
          ) : (
            <span>
              {bookingJourneyType === 'red_pass'
                ? `Confirm with Red Pass (Pay ₹${grandTotal})`
                : `Pay ₹${grandTotal} in Demo Mode`}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
