import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-radial-gradient">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <img
              src="/logo.png"
              alt="BuildZone Logo"
              className="h-9 w-auto object-contain shrink-0 mix-blend-multiply"
            />
            <img
              src="/LOGO%20TEXT.png"
              alt="BuildZone"
              className="h-6 max-w-[140px] w-auto object-contain shrink-0 mix-blend-multiply"
            />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs text-[#0066FF] font-bold uppercase tracking-widest">
                Staff Authentication Portal
              </span>
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xl">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="font-mono text-xs text-slate-500 hover:text-[#0066FF] transition-colors font-medium">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
