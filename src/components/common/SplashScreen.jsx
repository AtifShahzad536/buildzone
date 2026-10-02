import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * High-End Cyber Venetian Blinds Splash Screen
 * Features 8 neon cyber blinds that peel away with GSAP stagger from edges
 * and center official BuildZone Technology Logo & Branding.
 */
export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);

  // 8 Vertical Cyber Blind Columns
  const columns = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".splash-blind", { scaleX: 1, transformOrigin: "center center" });
      gsap.set(".splash-logo-card", { scale: 0.85, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
        }
      });

      // 1. Logo Card smooth pop-in (0.6s)
      tl.to(".splash-logo-card", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.4)"
      });

      // 2. Full solid 1.8 seconds view & animation time (Total ~3.0s+)
      tl.to({}, { duration: 1.8 });

      // 3. Logo Card exit (0.35s)
      tl.to(".splash-logo-card", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.35,
        ease: "power2.in"
      });

      // 4. Staggered Blinds disappearance from edges to center (0.7s)
      tl.to(".splash-blind", {
        scaleX: 0,
        duration: 0.7,
        stagger: { amount: 0.45, from: "edges" },
        ease: "power2.inOut",
        transformOrigin: "center center"
      }, "-=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] pointer-events-none flex overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 8 Distinct Cyber Blind Columns */}
      {columns.map((colIndex) => (
        <div
          key={colIndex}
          className="splash-blind flex-1 h-full relative"
          style={{
            background: 'linear-gradient(180deg, #070E1C 0%, #0E1D38 50%, #070E1C 100%)',
            boxShadow: '0 0 30px rgba(0, 102, 255, 0.25)',
            borderLeft: '1px solid rgba(0, 240, 255, 0.3)',
            borderRight: '1px solid rgba(0, 102, 255, 0.3)'
          }}
        >
          {/* Neon Light Filament on edges */}
          <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent opacity-80 shadow-[0_0_12px_#00F0FF]"></div>
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#0066FF] to-transparent opacity-50"></div>
        </div>
      ))}

      {/* Center Website Logo & Text Logo Card */}
      <div className="splash-logo-card absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-[#060B18]/95 border border-slate-700/80 shadow-[0_0_60px_rgba(0,102,255,0.45)] backdrop-blur-2xl">
          {/* Glowing Ambient Halo */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0066FF] to-[#00F0FF] opacity-35 blur-xl animate-pulse pointer-events-none"></div>

          {/* Official BuildZone Icon */}
          <div className="relative flex items-center justify-center mb-3">
            <img
              src="/logo.png"
              alt="BuildZone Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_25px_rgba(0,240,255,0.9)]"
            />
          </div>

          {/* Official BuildZone Text / Text Logo */}
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-wider text-white flex items-center gap-1.5">
              <span>BuildZone</span>
              <span className="text-[#00F0FF]">Technology</span>
            </h2>
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.25em] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping"></span>
              <span>SYNCHRONIZING MODULE...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
