import React, { useEffect, useRef, useState } from 'react';

/**
 * Ultra-Lightweight Hardware-Accelerated Section Divider
 * Uses zero heavy scroll listeners / scrubs to keep scrolling 100% 60-120fps smooth.
 */
export const SectionDivider = ({
  label,
  variant = 'cyan', // 'cyan' | 'blue' | 'purple' | 'emerald' | 'minimal'
  className = '',
}) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  const colorMap = {
    cyan: {
      beam: 'from-transparent via-[#00F0FF] to-transparent',
      solid: '#00F0FF',
      glow: 'rgba(0, 240, 255, 0.25)',
      badgeBg: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30',
      dot: 'bg-[#00F0FF]',
      shadow: 'shadow-[0_0_15px_rgba(0,240,255,0.6)]',
    },
    blue: {
      beam: 'from-transparent via-[#0066FF] to-transparent',
      solid: '#0066FF',
      glow: 'rgba(0, 102, 255, 0.25)',
      badgeBg: 'bg-[#0066FF]/10 text-[#38BDF8] border-[#0066FF]/30',
      dot: 'bg-[#0066FF]',
      shadow: 'shadow-[0_0_15px_rgba(0,102,255,0.6)]',
    },
    purple: {
      beam: 'from-transparent via-[#A855F7] to-transparent',
      solid: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.25)',
      badgeBg: 'bg-[#A855F7]/10 text-[#C084FC] border-[#A855F7]/30',
      dot: 'bg-[#A855F7]',
      shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.6)]',
    },
    emerald: {
      beam: 'from-transparent via-[#10B981] to-transparent',
      solid: '#10B981',
      glow: 'rgba(16, 185, 129, 0.25)',
      badgeBg: 'bg-[#10B981]/10 text-[#34D399] border-[#10B981]/30',
      dot: 'bg-[#10B981]',
      shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]',
    },
    minimal: {
      beam: 'from-transparent via-slate-700 to-transparent',
      solid: '#64748B',
      glow: 'rgba(100, 116, 139, 0.15)',
      badgeBg: 'bg-slate-800/60 text-slate-300 border-slate-700/60',
      dot: 'bg-slate-500',
      shadow: 'shadow-[0_0_10px_rgba(100,116,139,0.3)]',
    }
  };

  const currentTheme = colorMap[variant] || colorMap.cyan;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-8 sm:py-12 select-none pointer-events-none will-change-transform ${className}`}
      aria-hidden="true"
    >
      {/* 1. Ambient Radial Glow */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[580px] h-[60px] rounded-full blur-[35px] pointer-events-none transition-opacity duration-1000 ${
          inView ? 'opacity-60 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          background: `radial-gradient(ellipse at center, ${currentTheme.glow} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Background Tech Coordinate Markers */}
      <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-16 max-w-7xl mx-auto opacity-30 pointer-events-none">
        <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
          + 0x{variant.slice(0, 2).toUpperCase()} // GRID.POS
        </span>
        <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
          SYS.SYNC // +
        </span>
      </div>

      {/* 3. Main Divider Structure */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center">
        {/* Left Beam */}
        <div className="relative flex-1 h-[1px] overflow-hidden flex items-center justify-end">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800 to-slate-700/60" />
          <div
            className={`w-full h-[1.5px] bg-gradient-to-r ${currentTheme.beam} origin-right transition-transform duration-1000 ease-out ${
              inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
          {/* Continuous Traveling Photon (Left) */}
          <div className="absolute top-0 right-0 w-24 h-full animate-beam-slide-left pointer-events-none">
            <div
              className={`w-12 h-[2px] rounded-full ${currentTheme.dot} ${currentTheme.shadow}`}
              style={{ filter: 'blur(0.5px)' }}
            />
          </div>
        </div>

        {/* Center Node / Badge */}
        <div
          className={`relative mx-4 sm:mx-6 shrink-0 z-10 transition-all duration-700 ease-out ${
            inView ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          {label ? (
            <div
              className={`relative px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border backdrop-blur-md font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg ${currentTheme.badgeBg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} animate-pulse`} />
              <span>{label}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} animate-pulse`} />
            </div>
          ) : (
            <div className="relative flex items-center justify-center w-8 h-8">
              <div
                className={`absolute w-5 h-5 rotate-45 border border-slate-700 bg-[#070E1C] rounded-[3px] shadow-sm`}
              />
              <div
                className={`relative w-2 h-2 rotate-45 ${currentTheme.dot} ${currentTheme.shadow} rounded-[1px]`}
              />
              <div className="absolute -top-1.5 w-1 h-1 bg-slate-600 rounded-full" />
              <div className="absolute -bottom-1.5 w-1 h-1 bg-slate-600 rounded-full" />
            </div>
          )}
        </div>

        {/* Right Beam */}
        <div className="relative flex-1 h-[1px] overflow-hidden flex items-center justify-start">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-800 to-slate-700/60" />
          <div
            className={`w-full h-[1.5px] bg-gradient-to-l ${currentTheme.beam} origin-left transition-transform duration-1000 ease-out ${
              inView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            }`}
          />
          {/* Continuous Traveling Photon (Right) */}
          <div className="absolute top-0 left-0 w-24 h-full animate-beam-slide-right pointer-events-none">
            <div
              className={`w-12 h-[2px] rounded-full ${currentTheme.dot} ${currentTheme.shadow}`}
              style={{ filter: 'blur(0.5px)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
