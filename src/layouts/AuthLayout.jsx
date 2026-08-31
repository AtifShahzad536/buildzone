import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-radial-gradient">
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <img
              src="/logo.png"
              alt="BuildZone Logo"
              className="h-9 w-auto object-contain"
            />
            <img
              src="/LOGO%20TEXT.png"
              alt="BuildZone"
              className="h-6 w-auto object-contain"
            />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0E1424] border border-cyan-500/40 rounded-md">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span className="font-mono text-[10px] text-cyan-300 font-bold uppercase tracking-widest">
                Secure Staff Portal
              </span>
            </div>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-[#0E1424] border border-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
