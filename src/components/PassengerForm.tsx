import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, User, Mail, Phone, MessageSquare, Ticket } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PassengerForm: React.FC = () => {
  const {
    selectedDeparture,
    selectedSeats,
    passengerDetails,
    setPassengerDetails,
    assuranceOpted,
    setAssuranceOpted,
    bookingJourneyType,
    setActiveTab,
    showToast,
    isMobileView,
  } = useApp();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!selectedDeparture || selectedSeats.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border text-center shadow-soft">
        <p className="text-slate-600 mb-4">No seats selected. Please go back to seat selection.</p>
        <button
          onClick={() => setActiveTab('search')}
          className="px-6 py-2.5 bg-redbus-500 text-white font-bold rounded-xl text-sm"
        >
          Return to Bus Selection
        </button>
      </div>
    );
  }

  const preferredFees = selectedSeats.reduce((acc, s) => acc + (s.preferredFee || 0), 0);
  const baseTicketTotal = bookingJourneyType === 'red_pass' ? 0 : selectedSeats.length * selectedDeparture.fare;
  const assuranceFee = assuranceOpted ? 16 * selectedSeats.length : 0;
  const grandTotal = baseTicketTotal + preferredFees + assuranceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!passengerDetails.name.trim()) {
      errors.name = 'Please enter passenger name';
    }
    if (!passengerDetails.age || passengerDetails.age < 5 || passengerDetails.age > 100) {
      errors.age = 'Please enter a valid age (5 - 100)';
    }
    if (!passengerDetails.phone.trim() || passengerDetails.phone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!passengerDetails.email.trim() || !passengerDetails.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Please correct the highlighted fields in the form.');
      return;
    }

    setFormErrors({});
    setActiveTab('payment');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-4 sm:p-5 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('seat-select')}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Passenger & Contact Info</h2>
            <div className="text-xs text-slate-500">
              {selectedDeparture.operatorName} • Seat(s): {selectedSeats.map((s) => s.seatNumber).join(', ')}
            </div>
          </div>
        </div>

        {bookingJourneyType === 'red_pass' && (
          <span className="bg-red-50 text-redbus-600 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
            <Ticket className="w-3.5 h-3.5" />
            <span>Red Pass Booking</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className={isMobileView ? "space-y-6" : "grid grid-cols-1 lg:grid-cols-12 gap-6"}>
        {/* Left Form: Contact & Passenger Details */}
        <div className={isMobileView ? "w-full space-y-6" : "lg:col-span-8 space-y-6"}>
          {/* Contact Information Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
            <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-redbus-500" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-redbus-500 transition">
                  <Mail className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    value={passengerDetails.email}
                    onChange={(e) =>
                      setPassengerDetails((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="name@example.com"
                    className="w-full bg-transparent text-sm text-slate-800 focus:outline-none font-medium"
                  />
                </div>
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-redbus-500 transition">
                  <span className="text-xs font-bold text-slate-500 mr-2 border-r border-slate-300 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={passengerDetails.phone}
                    onChange={(e) =>
                      setPassengerDetails((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="9876543210"
                    className="w-full bg-transparent text-sm text-slate-800 focus:outline-none font-medium"
                  />
                </div>
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>
            </div>

            {/* WhatsApp Updates Toggle */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-slate-700 font-medium">
                  Send booking details and ticket updates on WhatsApp
                </span>
              </div>
              <input
                type="checkbox"
                checked={passengerDetails.whatsappAlerts}
                onChange={(e) =>
                  setPassengerDetails((prev) => ({ ...prev, whatsappAlerts: e.target.checked }))
                }
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Passenger Details Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
            <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2 text-redbus-500" />
                Primary Passenger Details
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Seat {selectedSeats[0]?.seatNumber}
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={passengerDetails.name}
                  onChange={(e) =>
                    setPassengerDetails((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Passenger Name as on ID"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:border-redbus-500 transition text-sm font-medium focus:outline-none"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={passengerDetails.age}
                  onChange={(e) =>
                    setPassengerDetails((prev) => ({ ...prev, age: parseInt(e.target.value) || 0 }))
                  }
                  placeholder="24"
                  min="5"
                  max="100"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 focus:bg-white focus:border-redbus-500 transition text-sm font-medium focus:outline-none"
                />
                {formErrors.age && <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>}
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <div className="flex items-center space-x-2 pt-2">
                  <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={passengerDetails.gender === 'male'}
                      onChange={() =>
                        setPassengerDetails((prev) => ({ ...prev, gender: 'male' }))
                      }
                      className="accent-redbus-500 cursor-pointer"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={passengerDetails.gender === 'female'}
                      onChange={() =>
                        setPassengerDetails((prev) => ({ ...prev, gender: 'female' }))
                      }
                      className="accent-redbus-500 cursor-pointer"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* redBus Assurance Program Opt-in */}
          <div className="bg-gradient-to-r from-orange-50/70 to-red-50/70 rounded-2xl border border-orange-200/80 p-4 shadow-sm flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-slate-800">redBus Assurance Program</h4>
                  <span className="text-[10px] font-bold bg-orange-200 text-orange-900 px-1.5 rounded">
                    +₹16 / passenger
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Emergency medical cover up to ₹5,00,000, 100% refund on bus cancellation, and 24x7 priority support.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={assuranceOpted}
              onChange={(e) => setAssuranceOpted(e.target.checked)}
              className="w-5 h-5 accent-redbus-500 rounded cursor-pointer mt-1 flex-shrink-0"
            />
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className={isMobileView ? "w-full space-y-4" : "lg:col-span-4 space-y-4"}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft">
            <h3 className="text-base font-bold text-slate-800 pb-3 border-b border-slate-100">
              Trip & Fare Summary
            </h3>

            <div className="py-3 space-y-2 text-xs border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Route:</span>
                <span className="font-bold text-slate-800">
                  {selectedDeparture.source} → {selectedDeparture.destination}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operator:</span>
                <span className="font-bold text-slate-800">{selectedDeparture.operatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Departure:</span>
                <span className="font-bold text-slate-800">{selectedDeparture.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Seat:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedSeats.map((s) => s.seatNumber).join(', ')}
                </span>
              </div>
            </div>

            {/* Price lines */}
            <div className="py-3 space-y-2 text-xs border-b border-slate-100">
              {bookingJourneyType === 'red_pass' ? (
                <>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium flex items-center">
                      <Ticket className="w-3.5 h-3.5 text-red-500 mr-1" />
                      Red Pass Ride:
                    </span>
                    <span className="font-bold text-emerald-600">1 Ride Debited</span>
                  </div>
                  {preferredFees > 0 && (
                    <div className="flex justify-between text-slate-700">
                      <span>Preferred Seat Add-on:</span>
                      <span className="font-bold">₹{preferredFees}</span>
                    </div>
                  )}
                  {assuranceOpted && (
                    <div className="flex justify-between text-slate-700">
                      <span>Assurance Program:</span>
                      <span className="font-bold">₹{assuranceFee}</span>
                    </div>
                  )}
                  <div className="pt-2 flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-100">
                    <span>Payable Now:</span>
                    <span className="text-lg text-slate-900">₹{grandTotal}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-slate-700">
                    <span>Base Fare:</span>
                    <span className="font-bold">₹{baseTicketTotal}</span>
                  </div>
                  {preferredFees > 0 && (
                    <div className="flex justify-between text-slate-700">
                      <span>Preferred Seat Add-on:</span>
                      <span className="font-bold">₹{preferredFees}</span>
                    </div>
                  )}
                  {assuranceOpted && (
                    <div className="flex justify-between text-slate-700">
                      <span>Assurance Program:</span>
                      <span className="font-bold">₹{assuranceFee}</span>
                    </div>
                  )}
                  <div className="pt-2 flex justify-between items-center text-sm font-black text-slate-900 border-t border-slate-100">
                    <span>Total Amount:</span>
                    <span className="text-xl text-redbus-600">₹{grandTotal}</span>
                  </div>
                </>
              )}
            </div>

            {/* Submit to Payment */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-redbus-500 hover:bg-redbus-600 active:bg-redbus-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>PROCEED TO PAYMENT</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
