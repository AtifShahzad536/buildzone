import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Modern Parallax Animated Section Divider
 * Features:
 * - Parallax scroll responsiveness (beam expands & particles shift dynamically)
 * - Flowing animated laser beams with traveling light pulses (photons)
 * - Center holographic cyber node / badge
 * - Ambient radial glow & micro crosshairs (+)
 */
export const SectionDivider = ({
  label,
  variant = 'cyan', // 'cyan' | 'blue' | 'purple' | 'emerald' | 'minimal'
  className = '',
  parallaxSpeed = 0.35,
}) => {
  const containerRef = useRef(null);
  const beamLeftRef = useRef(null);
  const beamRightRef = useRef(null);
  const centerNodeRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const parallaxFloatingRef = useRef(null);

  // Color schemes
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

    const ctx = gsap.context(() => {
      // 1. Initial Reveal & Parallax Expand on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          end: 'bottom 15%',
          scrub: 1.2,
        },
      });

      // Scale beams from center with parallax feel
      if (beamLeftRef.current && beamRightRef.current) {
        gsap.fromTo(
          [beamLeftRef.current, beamRightRef.current],
          { scaleX: 0, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Parallax scroll vertical translation for floating background accents
      if (parallaxFloatingRef.current) {
        tl.fromTo(
          parallaxFloatingRef.current,
          { y: -25, opacity: 0.3 },
          { y: 25, opacity: 1, ease: 'none' }
        );
      }

      // Center Node Pulse / Rotation
      if (centerNodeRef.current) {
        gsap.fromTo(
          centerNodeRef.current,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Ambient radial glow expansion
      if (ambientGlowRef.current) {
        gsap.fromTo(
          ambientGlowRef.current,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1.2,
            opacity: 0.7,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [parallaxSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-10 sm:py-14 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Ambient Radial Glow (Center Light Aura) */}
      <div
        ref={ambientGlowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[70px] rounded-full blur-[40px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${currentTheme.glow} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Parallax Floating Tech Background Markers */}
      <div
        ref={parallaxFloatingRef}
        className="absolute inset-0 flex items-center justify-between px-6 sm:px-16 max-w-7xl mx-auto opacity-40 pointer-events-none"
      >
        <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
          + 0x{variant.slice(0, 2).toUpperCase()} // GRID.POS
        </span>
        <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
          SYS.SYNC // +
        </span>
      </div>

      {/* 3. Main Divider Structure */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center">
        {/* Left Beam with Traveling Photon Light Pulse */}
        <div className="relative flex-1 h-[1px] overflow-hidden flex items-center justify-end">
          {/* Base Track */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800 to-slate-700/60" />
          
          {/* Glowing Laser Beam */}
          <div
            ref={beamLeftRef}
            className={`w-full h-[1.5px] bg-gradient-to-r ${currentTheme.beam} origin-right`}
          />

          {/* Continuous Traveling Photon (Left to Center) */}
          <div className="absolute top-0 right-0 w-24 h-full animate-beam-slide-left pointer-events-none">
            <div
              className={`w-12 h-[2px] rounded-full ${currentTheme.dot} ${currentTheme.shadow}`}
              style={{ filter: 'blur(0.5px)' }}
            />
          </div>
        </div>

        {/* Center Node / Emblem / Badge */}
        <div ref={centerNodeRef} className="relative mx-4 sm:mx-6 shrink-0 z-10">
          {label ? (
            /* Labeled Cyber Capsule Badge */
            <div
              className={`relative px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border backdrop-blur-md font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg transition-transform duration-300 ${currentTheme.badgeBg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} animate-pulse`} />
              <span>{label}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} animate-pulse`} />
            </div>
          ) : (
            /* Cyber Geometric Diamond Core */
            <div className="relative flex items-center justify-center w-8 h-8">
              {/* Outer Rotating Diamond Ring */}
              <div
                className={`absolute w-5 h-5 rotate-45 border border-slate-700 bg-[#070E1C] rounded-[3px] shadow-sm`}
              />
              {/* Inner Glowing Core */}
              <div
                className={`relative w-2 h-2 rotate-45 ${currentTheme.dot} ${currentTheme.shadow} rounded-[1px]`}
              />
              {/* Micro Tech Crosshairs */}
              <div className="absolute -top-1.5 w-1 h-1 bg-slate-600 rounded-full" />
              <div className="absolute -bottom-1.5 w-1 h-1 bg-slate-600 rounded-full" />
            </div>
          )}
        </div>

        {/* Right Beam with Traveling Photon Light Pulse */}
        <div className="relative flex-1 h-[1px] overflow-hidden flex items-center justify-start">
          {/* Base Track */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-800 to-slate-700/60" />

          {/* Glowing Laser Beam */}
          <div
            ref={beamRightRef}
            className={`w-full h-[1.5px] bg-gradient-to-l ${currentTheme.beam} origin-left`}
          />

          {/* Continuous Traveling Photon (Center to Right) */}
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
