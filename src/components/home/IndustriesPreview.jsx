import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import Button from '../common/Button';

// Selected premier industries for the interactive deck showcase
const DECK_INDUSTRIES = initialIndustries.slice(0, 6);

// Card suits / corner badges for authentic Teen Patti playing-card aesthetic
const CARD_RANKS = ['A', 'K', 'Q', 'J', '10', '9'];
const CARD_SUITS = ['♠', '♥', '♦', '♣', '★', '◆'];
const CARD_COLORS = [
  { bg: 'from-[#0B1938] via-[#0E224D] to-[#081226]', border: 'border-blue-500/40', accent: '#00F0FF', lightAccent: '#38BDF8' },
  { bg: 'from-[#0A1E3F] via-[#0D2854] to-[#071630]', border: 'border-cyan-500/40', accent: '#00F2FE', lightAccent: '#22D3EE' },
  { bg: 'from-[#111827] via-[#1E293B] to-[#0F172A]', border: 'border-indigo-500/40', accent: '#818CF8', lightAccent: '#A5B4FC' },
  { bg: 'from-[#0B1938] via-[#162B55] to-[#09152E]', border: 'border-emerald-500/40', accent: '#10B981', lightAccent: '#34D399' },
  { bg: 'from-[#131E3A] via-[#1E2E56] to-[#0A1329]', border: 'border-amber-500/40', accent: '#F59E0B', lightAccent: '#FBBF24' },
  { bg: 'from-[#0C1B3A] via-[#15274E] to-[#08132B]', border: 'border-rose-500/40', accent: '#F43F5E', lightAccent: '#FB7185' },
];

export const IndustriesPreview = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Trigger calculation
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Total scrollable distance inside this pinned section
      const totalScrollDistance = rect.height - windowHeight;
      if (totalScrollDistance <= 0) return;

      // Current scrolled distance inside container
      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(clampedProgress);
        const newActive = Math.min(
          DECK_INDUSTRIES.length - 1,
          Math.floor(clampedProgress * DECK_INDUSTRIES.length)
        );
        setActiveIndex(newActive);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Manual Jump by clicking cards or controls
  const handleSelectCard = (index) => {
    setActiveIndex(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollDistance = rect.height - windowHeight;
    const targetScrollTop = window.scrollY + rect.top + (index / (DECK_INDUSTRIES.length - 1)) * totalScrollDistance;
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (activeIndex < DECK_INDUSTRIES.length - 1) {
      handleSelectCard(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      handleSelectCard(activeIndex - 1);
    }
  };

  // Continuous active progress float [0 ... totalCards - 1]
  const activeFloat = scrollProgress * (DECK_INDUSTRIES.length - 1);

  return (
    <div 
      ref={containerRef}
      className="relative bg-[#060D1F] text-white"
      style={{ height: `${(DECK_INDUSTRIES.length + 1) * 75}vh` }}
    >
      {/* Sticky Fullscreen Card Arena */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 sm:py-10">
        
        {/* Background Ambient Glows & Tech Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0066FF]/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
        </div>

        {/* Top Header Bar */}
        <Container className="relative z-20 shrink-0">
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#38BDF8] text-[10.5px] font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>TEEN PATTI DECK • HIGH-STAKES SECTOR SUITE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-white">
              ENGINEERED FOR HIGH-STAKES INDUSTRIES
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto line-clamp-2">
              Scroll down to peel through our domain suites. Each card represents tailored compliance, architecture security, and export ERPs.
            </p>
          </div>
        </Container>

        {/* Center: 3D Teen Patti Card Deck Stage */}
        <div 
          className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-w-5xl mx-auto px-4 sm:px-6"
          style={{ perspective: '1400px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-[620px] h-[400px] sm:h-[450px] md:h-[470px] flex items-center justify-center">
            {DECK_INDUSTRIES.map((industry, index) => {
              const diff = index - activeFloat;
              const isPassed = diff < -0.15;
              const isCurrent = Math.abs(diff) <= 0.5;
              const cardColor = CARD_COLORS[index % CARD_COLORS.length];
              const rank = CARD_RANKS[index % CARD_RANKS.length];
              const suit = CARD_SUITS[index % CARD_SUITS.length];

              // Realistic Teen Patti deck fan angles and positions
              let transformStyle = {};
              let zIndex = 30 - index;
              let opacity = 1;

              if (isPassed) {
                // Card is peeling away upwards and rotating off the deck
                const exitProgress = Math.min(1, Math.abs(diff));
                const translateY = -exitProgress * 140; // Fly up
                const rotateZ = -12 - exitProgress * 18; // Tilt left
                const rotateX = exitProgress * 25;
                const scale = 1 - exitProgress * 0.1;
                opacity = Math.max(0, 1 - exitProgress * 1.3);

                transformStyle = {
                  transform: `translate3d(0px, ${translateY}%, 0px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg) scale(${scale})`,
                  pointerEvents: 'none',
                };
              } else {
                // Card is in the active stack / fanned deck
                const stackDepth = Math.max(0, diff);
                
                // Teen patti fan rotation: alternating subtle fan angles
                const fanAngles = [0, 4.5, -4, 6.5, -5.5, 8];
                const baseAngle = fanAngles[index % fanAngles.length];
                const currentAngle = baseAngle * Math.min(1, stackDepth);

                const translateY = Math.min(stackDepth * 18, 55); // cascade down
                const translateX = (index % 2 === 0 ? 1 : -1) * Math.min(stackDepth * 14, 40); // slight horizontal spread
                const scale = Math.max(0.78, 1 - stackDepth * 0.05); // scale down cards behind
                opacity = Math.max(0.25, 1 - stackDepth * 0.18);

                transformStyle = {
                  transform: `translate3d(${translateX}px, ${translateY}px, ${-stackDepth * 40}px) rotateZ(${currentAngle}deg) scale(${scale})`,
                };
              }

              return (
                <div
                  key={industry.id}
                  onClick={() => handleSelectCard(index)}
                  style={{
                    ...transformStyle,
                    zIndex,
                    opacity,
                    transition: isHovered ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease' : 'transform 0.15s linear, opacity 0.15s linear',
                  }}
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 bg-gradient-to-br ${cardColor.bg} border-2 ${cardColor.border} shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none cursor-pointer backdrop-blur-xl group`}
                >
                  {/* Playing Card Texture Overlay & Metallic Inset Border */}
                  <div className="absolute inset-1.5 rounded-[18px] sm:rounded-[22px] border border-white/10 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Card Corner Index Badge (Top-Left: Teen Patti Rank & Suit) */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Playing Card Rank/Suit Corner Box */}
                      <div className="flex flex-col items-center justify-center w-8 sm:w-10 py-1 rounded-lg bg-black/40 border border-white/10 text-center font-mono font-black shadow-inner">
                        <span className="text-xs sm:text-sm leading-none" style={{ color: cardColor.accent }}>
                          {rank}
                        </span>
                        <span className="text-xs leading-none text-rose-400 mt-0.5">
                          {suit}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div 
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border shadow-lg"
                          style={{ backgroundColor: `${cardColor.accent}20`, borderColor: `${cardColor.accent}40`, color: cardColor.accent }}
                        >
                          {renderIcon(industry.iconName, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">
                            SECTOR CARD #{String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-base sm:text-xl md:text-2xl font-black font-display uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors">
                            {industry.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Verified High-Stakes Stamp */}
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10.5px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>ENTERPRISE GRADE</span>
                    </div>
                  </div>

                  {/* Card Body: Mission & Key Capabilities */}
                  <div className="my-auto py-2 relative z-10 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed line-clamp-3">
                      {industry.heroDescription || industry.shortDescription}
                    </p>

                    {/* Featured Capabilities Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {industry.features?.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {industry.technologies?.slice(0, 5).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Action CTA & Corner Suit Reflection */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
                    <Link
                      to={`/industries/${industry.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: cardColor.accent, color: '#060D1F' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore Sector Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {/* Card Bottom-Right Teen Patti Corner Mirror */}
                    <div className="flex items-center gap-2 text-right font-mono text-[11px] text-slate-400">
                      <span className="hidden sm:inline">DECK SUITE</span>
                      <span className="font-bold text-sm" style={{ color: cardColor.accent }}>
                        {rank}{suit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Progress Indicator Bar */}
        <Container className="relative z-20 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-xl max-w-4xl mx-auto">
            
            {/* Left: Deck Indicator Pills */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400 font-bold uppercase mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>HAND:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {DECK_INDUSTRIES.map((ind, idx) => (
                  <button
                    key={ind.id}
                    onClick={() => handleSelectCard(idx)}
                    className={`h-7 px-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      activeIndex === idx
                        ? 'bg-[#0066FF] text-white border border-blue-400 shadow-[0_0_12px_rgba(0,102,255,0.6)] scale-105'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <span>{CARD_RANKS[idx]}</span>
                    <span className="text-[10px] hidden sm:inline">{ind.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Step Controls & View All Link */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous Industry Card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === DECK_INDUSTRIES.length - 1}
                  className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next Industry Card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-slate-600 font-bold">|</span>

              <Link to="/industries">
                <Button variant="secondary" size="sm" className="text-xs shrink-0">
                  <span>View All 11 Sectors</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

          </div>
        </Container>

      </div>
    </div>
  );
};

export default IndustriesPreview;
