import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudentVerificationModal: React.FC = () => {
  const {
    isStudentModalOpen,
    setIsStudentModalOpen,
    verifyStudent,
    isStudentVerified,
  } = useApp();

  const [college, setCollege] = useState<string>('National Institute of Technology (NIT) Warangal');
  const [roll, setRoll] = useState<string>('NITW/2022/CS/1042');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!isStudentModalOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      verifyStudent(college, roll);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-elevated border border-slate-200 relative">
        <button
          onClick={() => setIsStudentModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Student ID Verification</h3>
            <span className="text-xs text-slate-500">Proposed Pilot Campus Red Pass Offer</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Unlock the discounted <strong>Campus Red Pass (3 rides for ₹1,140)</strong>. Verification is limited to active enrolled college students (max 2 packs per semester).
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Select College / University
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 text-sm font-medium focus:bg-white focus:outline-none focus:border-redbus-500 cursor-pointer"
            >
              <option value="National Institute of Technology (NIT) Warangal">NIT Warangal</option>
              <option value="Osmania University, Hyderabad">Osmania University, Hyderabad</option>
              <option value="IIT Hyderabad, Kandi">IIT Hyderabad</option>
              <option value="BITS Pilani Hyderabad Campus">BITS Pilani Hyderabad Campus</option>
              <option value="Kakatiya University, Warangal">Kakatiya University, Warangal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Student ID / Roll Number
            </label>
            <input
              type="text"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="e.g. 2022CS1042"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 bg-slate-50 text-sm font-medium focus:bg-white focus:outline-none focus:border-redbus-500"
              required
            />
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start space-x-2">
            <Shield className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Simulated Demo Verification:</strong> For this case prototype, clicking &quot;Verify Student ID&quot; instantly grants eligibility.
            </span>
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
          >
            {isVerifying ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Student Record...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Unlock Campus Offer</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
