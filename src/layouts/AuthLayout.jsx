import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import TubesCursorBg from '../components/common/TubesCursorBg';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-radial-gradient">
      {/* 3D Interactive Tubes Cursor Canvas */}
      <TubesCursorBg />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-[1]"></div>

      <div className="w-full max-w-md relative z-10 pointer-events-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <img
              src="/logo.png"
              alt="BuildZone Logo"
              className="h-9 w-auto object-contain shrink-0 drop-shadow-md"
            />
            <img
              src="/LOGO%20TEXT.png"
              alt="BuildZone"
              className="h-6 max-w-[140px] w-auto object-contain shrink-0 drop-shadow-md"
            />
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/85 backdrop-blur-md border border-blue-200/80 rounded-full shadow-xs">
              <Shield className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs text-[#0066FF] font-bold uppercase tracking-widest">
                Staff Authentication Portal
              </span>
            </div>
          </div>
        </div>

        {/* Content Box with glassmorphism */}
        <div className="bg-white/95 backdrop-blur-xl border border-white/80 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block px-3 py-1 bg-white/70 backdrop-blur-md rounded-full border border-slate-200/60 font-mono text-xs text-slate-600 hover:text-[#0066FF] transition-colors font-medium shadow-2xs"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

