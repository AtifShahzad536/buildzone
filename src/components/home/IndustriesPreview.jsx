import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

// Selected premier industries for the interactive stacked showcase
const DECK_INDUSTRIES = initialIndustries.slice(0, 6);

// Card suits & ranks for authentic playing-card / teen patti aesthetic
const CARD_RANKS = ['A', 'K', 'Q', 'J', '10', '9'];
const CARD_SUITS = ['♠', '♥', '♦', '♣', '★', '◆'];
const CARD_THEMES = [
  { suitColor: 'text-blue-600', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', accentColor: '#0066FF', stat: 'HIPAA & HL7/FHIR Compliant', metric: '99.99% Uptime SLA' },
  { suitColor: 'text-rose-600', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200', accentColor: '#E11D48', stat: 'PCI-DSS & Bank-Grade Security', metric: '<50ms Settlement' },
  { suitColor: 'text-indigo-600', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200', accentColor: '#4F46E5', stat: 'Headless Next.js + Sub-Second Checkout', metric: '3.8x Conversion Lift' },
  { suitColor: 'text-emerald-600', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', accentColor: '#059669', stat: 'SCORM/xAPI & AI Automated Triage', metric: '100k+ Active Learners' },
  { suitColor: 'text-amber-600', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200', accentColor: '#D97706', stat: 'MLS IDX Sync & Geospatial Map Search', metric: 'Real-Time Telemetry' },
  { suitColor: 'text-cyan-600', badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200', accentColor: '#0891B2', stat: 'AI Dynamic Route & Multi-Warehouse WMS', metric: 'Zero Delivery Delay' },
];

export const IndustriesPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      
      {/* Background Subtle Ambient Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: 100% Matching BuildZone Clean Light Theme                 */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/90 rounded-full shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0047BA]">
              DOMAIN EXPERTISE • SIALKOT EXPORTERS & GLOBAL ENTERPRISES
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-[#0B1938] leading-[1.12]">
            Engineered for{' '}
            <span className="text-[#0066FF]">High-Stakes Industries.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            We tailor regulatory compliance, architecture security, export ERP systems, and workflows to your exact sector standards. Scroll down to uncover each sector deck card.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 60FPS BUTTERY STICKY STACKING CARDS (TEEN PATTI SUITE)                    */}
        {/* ========================================================================= */}
        <div className="relative max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-12">
          {DECK_INDUSTRIES.map((industry, index) => {
            const rank = CARD_RANKS[index % CARD_RANKS.length];
            const suit = CARD_SUITS[index % CARD_SUITS.length];
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            
            // Native sticky offset: each subsequent card pins slightly lower to create stacked deck layer effect
            const stickyTop = 100 + index * 12;

            return (
              <div 
                key={industry.id}
                className="sticky w-full transition-transform duration-200"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: index + 10,
                }}
              >
                <div className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-[#0066FF]/40 shadow-2xl shadow-slate-200/80 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-blue-500/10 overflow-hidden">
                  
                  {/* Playing Card Inner Inset Foil Line */}
                  <div className="absolute inset-2 rounded-[20px] border border-slate-100 pointer-events-none" />
                  
                  {/* Subtle Corner Color Glow */}
                  <div 
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none"
                    style={{ backgroundColor: theme.accentColor }}
                  />

                  {/* Card Header: Rank/Suit Corner Badge + Title + Security Stamp */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 relative z-10">
                    
                    <div className="flex items-center gap-3.5">
                      {/* Playing Card Corner Rank & Suit Box */}
                      <div className="flex flex-col items-center justify-center w-9 h-11 sm:w-11 sm:h-13 rounded-xl bg-slate-50 border border-slate-200/90 text-center font-mono font-black shadow-2xs shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                        <span className="text-xs sm:text-sm leading-none text-[#0B1938]">
                          {rank}
                        </span>
                        <span className={`text-xs sm:text-sm leading-none mt-0.5 ${theme.suitColor}`}>
                          {suit}
                        </span>
                      </div>

                      {/* Sector Icon & Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shadow-xs shrink-0 group-hover:scale-105 group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                          {renderIcon(industry.iconName, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                              SECTOR SUITE #{String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              CARD {rank}{suit}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] group-hover:text-[#0066FF] transition-colors">
                            {industry.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Verified High-Stakes Compliance Stamp */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-2xs ${theme.badgeBg}`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{theme.stat}</span>
                      </span>
                    </div>

                  </div>

                  {/* Card Main Body Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 relative z-10">
                    
                    {/* Left Column (8 cols): Description & Capabilities Checklist */}
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {industry.heroDescription || industry.shortDescription}
                      </p>

                      {/* Feature Checklist */}
                      <div>
                        <span className="font-display text-[11px] font-extrabold uppercase tracking-wider text-[#0B1938] block mb-2">
                          Standard Architecture Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {industry.features?.slice(0, 4).map((feat, fIdx) => (
                            <div 
                              key={fIdx} 
                              className="flex items-start gap-2 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70 hover:border-blue-200 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                              <span className="font-sans text-xs font-medium text-slate-700 leading-tight">
                                {feat}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <span className="text-[10.5px] font-bold text-slate-400 mr-1">Verified Stack:</span>
                        {industry.technologies?.slice(0, 5).map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md font-mono text-[10px] font-semibold shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column (4 cols): Live Metric & Action Link */}
                    <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/80 space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-[#0066FF] font-mono text-[11px] font-bold uppercase mb-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Performance SLA</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black font-display text-[#0B1938] tracking-tight">
                          {theme.metric}
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans mt-1">
                          Full export ERP integration, zero-downtime architecture, and dedicated engineering.
                        </p>
                      </div>

                      <Link
                        to={`/industries/${industry.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white font-display text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all group/btn"
                      >
                        <span>Explore Sector Solutions</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </div>

                  {/* Card Bottom Mirrored Corner Suit */}
                  <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-400 font-mono text-[10.5px]">
                    <span className="flex items-center gap-1 text-slate-500 font-semibold">
                      <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>HIGH-STAKES STACK DECK • CARD {index + 1} OF {DECK_INDUSTRIES.length}</span>
                    </span>
                    <span className="font-bold font-mono text-sm" style={{ color: theme.accentColor }}>
                      {rank}{suit}
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout & Directory Link */}
        <div className="text-center pt-8">
          <Link to="/industries">
            <Button variant="secondary" size="md" className="shadow-xs">
              <span>Explore All 11 Industry Sectors</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default IndustriesPreview;
