import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import TubesCursorBg from '../components/common/TubesCursorBg';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#060B18] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-radial-gradient">
      {/* 3D Interactive Tubes Cursor Canvas */}
      <TubesCursorBg />

      <div className="w-full max-w-md relative z-10 pointer-events-auto">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
            <img
              src="/logo.png"
              alt="BuildZone Logo"
              className="h-10 w-auto object-contain shrink-0 drop-shadow-[0_0_15px_rgba(0,240,255,0.7)]"
            />
            <span className="font-display font-black text-xl tracking-wider text-white">
              BUILDZONE <span className="text-[#00F0FF]">TECHNOLOGY</span>
            </span>
          </Link>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#0B1528] border border-slate-700/80 rounded-full shadow-lg">
              <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs text-[#00F0FF] font-bold uppercase tracking-widest">
                Staff Authentication Portal
              </span>
            </div>
          </div>
        </div>

        {/* Content Box with cyber glassmorphism */}
        <div className="bg-[#0B1528]/95 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <Outlet />
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block px-3 py-1 bg-[#0B1528]/80 backdrop-blur-md rounded-full border border-slate-800 font-mono text-xs text-slate-400 hover:text-[#00F0FF] transition-colors font-medium shadow-xs"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

