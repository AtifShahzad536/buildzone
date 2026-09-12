import React, { useState } from 'react';
import { 
  Monitor, 
  Code2, 
  Server, 
  Layers, 
  ArrowRight,
  Database,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

export const WhyChooseUs = () => {
  const [activeTag, setActiveTag] = useState('SCALABLE');

  const pillars = [
    {
      number: "01",
      title: "SENIOR ENGINEERS, NOT LAYERS.",
      desc: "Principal-level engineers work directly with your product and architecture.",
      ctaText: "Direct access",
      link: "/about"
    },
    {
      number: "02",
      title: "BUILT FOR SCALE FROM DAY ONE.",
      desc: "Distributed systems, resilient APIs, database architecture and cloud infrastructure.",
      ctaText: "Million+ users",
      link: "/services"
    },
    {
      number: "03",
      title: "SECURITY BY ARCHITECTURE.",
      desc: "Security isn’t a final checklist. It’s embedded into every engineering decision.",
      ctaText: "SOC 2 / HIPAA",
      link: "/security"
    },
    {
      number: "04",
      title: "SHIP. MEASURE. IMPROVE.",
      desc: "Two-week cycles. Live demos. Continuous feedback and measurable delivery.",
      ctaText: "Faster releases",
      link: "/contact"
    }
  ];

  const tags = ["SCALABLE", "SECURE", "RELIABLE", "FUTURE-READY"];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFDFF] relative overflow-hidden">
      {/* Background Ambient Glows & Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-40" />

      <Container className="relative z-10">
        {/* Top Hero Row: Left Copy & Right Architecture Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Statement & Copy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50/50 shadow-2xs">
              <span className="font-sans text-xs font-bold text-[#0066FF] uppercase tracking-wide">
                WHY BUILDZONE • SIALKOT'S #1 SOFTWARE HOUSE
              </span>
            </div>

            {/* Giant Title */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.08]">
                THE ENGINEERING <br />
                <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0080FF] bg-clip-text text-transparent">
                  ADVANTAGE
                </span>
              </h2>
            </div>

            {/* Prominent Subtitle */}
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1E293B] leading-snug tracking-tight">
              Built by senior engineers. <br />
              Designed for global scale.
            </h3>

            {/* Body Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-lg">
              As the best software house in Sialkot, we don’t just build features. We engineer high-performance systems with enterprise architecture, bank-grade security, and agile delivery designed to scale your business locally and globally.
            </p>
          </div>

          {/* Right Column: 3D Architecture Diagram with Flow Nodes & Right Sidebar */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-[540px] flex items-center">
              
              {/* Diagram Canvas with Concentric Glow Rings */}
              <div className="relative flex-1 py-6">
                
                {/* Concentric Background Circles / Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[360px] h-[360px] rounded-full border border-blue-100/60" />
                  <div className="w-[460px] h-[460px] rounded-full border border-dashed border-blue-100/40 absolute" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] absolute top-6 right-16 opacity-60" />
                  <div className="w-1 h-1 rounded-full bg-[#0066FF] absolute bottom-12 left-10 opacity-40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF] absolute bottom-24 right-10 opacity-70" />
                </div>

                {/* Architecture Nodes Flow */}
                <div className="flex flex-col items-center space-y-4 relative z-10">
                  
                  {/* Node 1: FRONTEND */}
                  <div className="w-[210px] bg-white/95 backdrop-blur-md rounded-xl p-3 border border-blue-100/90 shadow-sm shadow-blue-500/5 hover:shadow-md hover:border-[#0066FF]/30 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-display font-bold text-xs uppercase text-[#0B1938] block tracking-wide">
                        FRONTEND
                      </span>
                      <span className="font-sans text-[10.5px] text-slate-500 block truncate">
                        Web • Mobile • Desktop
                      </span>
                    </div>
                  </div>

                  {/* Connecting Arrow 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-[#0066FF]/40" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-[#0066FF]" />
                  </div>

                  {/* Node 2: API LAYER */}
                  <div className="w-[240px] bg-white/95 backdrop-blur-md rounded-xl p-3 border border-blue-100/90 shadow-sm shadow-blue-500/5 hover:shadow-md hover:border-[#0066FF]/30 transition-all flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-display font-bold text-xs uppercase text-[#0B1938] block tracking-wide">
                        API LAYER
                      </span>
                      <span className="font-sans text-[10.5px] text-slate-500 block truncate">
                        REST • GraphQL • WebSocket
                      </span>
                    </div>
                  </div>

                  {/* Split Connecting Lines to Services & Queues */}
                  <div className="w-[280px] h-6 relative">
                    {/* Center down line from API */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#0066FF]/40" />
                    {/* Horizontal fork line */}
                    <div className="absolute top-2 left-[20%] right-[20%] h-0.5 bg-[#0066FF]/40" />
                    {/* Left drop line */}
                    <div className="absolute top-2 left-[20%] w-0.5 h-4 bg-[#0066FF]/40" />
                    <div className="absolute top-6 left-[20%] -translate-x-[2.5px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-[#0066FF]" />
                    {/* Right drop line */}
                    <div className="absolute top-2 right-[20%] w-0.5 h-4 bg-[#0066FF]/40" />
                    <div className="absolute top-6 right-[20%] -translate-x-[2.5px] w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-[#0066FF]" />
                  </div>

                  {/* Row: SERVICES + QUEUES */}
                  <div className="grid grid-cols-2 gap-3 w-full max-w-[370px]">
                    {/* Node 3: SERVICES */}
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-blue-100/90 shadow-sm shadow-blue-500/5 hover:shadow-md hover:border-[#0066FF]/30 transition-all flex items-center gap-2.5 group">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Server className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-bold text-[11px] uppercase text-[#0B1938] block tracking-wide">
                          SERVICES
                        </span>
                        <span className="font-sans text-[9.5px] text-slate-500 block truncate">
                          Microservices • Containers
                        </span>
                      </div>
                    </div>

                    {/* Node 4: QUEUES */}
                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-blue-100/90 shadow-sm shadow-blue-500/5 hover:shadow-md hover:border-[#0066FF]/30 transition-all flex items-center gap-2.5 group">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-bold text-[11px] uppercase text-[#0B1938] block tracking-wide">
                          QUEUES
                        </span>
                        <span className="font-sans text-[9.5px] text-slate-500 block truncate">
                          Kafka • RabbitMQ • Redis
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Convergence Arrow Down to Database */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-[#0066FF]/40" />
                    <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-[#0066FF]" />
                  </div>

                  {/* Node 5: 3D DISTRIBUTED DATA PLATFORM */}
                  <div className="relative flex flex-col items-center w-full max-w-[270px]">
                    
                    {/* Isometric 3D Layered Database Disks */}
                    <div className="flex items-center justify-center gap-2 mb-[-14px] relative z-20">
                      {/* Left Cylinder */}
                      <div className="w-9 h-11 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,102,255,0.25)]">
                          <defs>
                            <linearGradient id="dbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#38BDF8" />
                              <stop offset="100%" stopColor="#0066FF" />
                            </linearGradient>
                            <linearGradient id="dbTop1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#BAE6FD" />
                              <stop offset="100%" stopColor="#38BDF8" />
                            </linearGradient>
                          </defs>
                          {/* Body */}
                          <path d="M0,10 L0,34 A18,8 0 0,0 36,34 L36,10 A18,8 0 0,1 0,10" fill="url(#dbGrad1)" />
                          {/* Segment lines */}
                          <path d="M0,18 A18,8 0 0,0 36,18" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
                          <path d="M0,26 A18,8 0 0,0 36,26" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
                          {/* Top Cap */}
                          <ellipse cx="18" cy="10" rx="18" ry="8" fill="url(#dbTop1)" />
                        </svg>
                      </div>

                      {/* Center Cylinder (Prominent) */}
                      <div className="w-11 h-13 relative z-10">
                        <svg viewBox="0 0 44 52" className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,102,255,0.35)]">
                          <defs>
                            <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0080FF" />
                              <stop offset="100%" stopColor="#0052CC" />
                            </linearGradient>
                            <linearGradient id="dbTop2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#E0F2FE" />
                              <stop offset="100%" stopColor="#38BDF8" />
                            </linearGradient>
                          </defs>
                          <path d="M0,12 L0,40 A22,10 0 0,0 44,40 L44,12 A22,10 0 0,1 0,12" fill="url(#dbGrad2)" />
                          <path d="M0,21 A22,10 0 0,0 44,21" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.7" />
                          <path d="M0,30 A22,10 0 0,0 44,30" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.7" />
                          <ellipse cx="22" cy="12" rx="22" ry="10" fill="url(#dbTop2)" />
                        </svg>
                      </div>

                      {/* Right Cylinder */}
                      <div className="w-9 h-11 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,102,255,0.25)]">
                          <path d="M0,10 L0,34 A18,8 0 0,0 36,34 L36,10 A18,8 0 0,1 0,10" fill="url(#dbGrad1)" />
                          <path d="M0,18 A18,8 0 0,0 36,18" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
                          <path d="M0,26 A18,8 0 0,0 36,26" fill="none" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
                          <ellipse cx="18" cy="10" rx="18" ry="8" fill="url(#dbTop1)" />
                        </svg>
                      </div>
                    </div>

                    {/* Platform Base Card */}
                    <div className="w-full bg-white/95 backdrop-blur-md rounded-xl pt-5 pb-3 px-3 border border-blue-100/90 shadow-md shadow-blue-500/10 text-center relative z-10 hover:border-[#0066FF]/40 transition-colors">
                      <span className="font-display font-bold text-xs uppercase text-[#0B1938] block tracking-wide">
                        DISTRIBUTED DATA
                      </span>
                      <span className="font-sans text-[10.5px] text-slate-500 block mt-0.5">
                        PostgreSQL • MongoDB • S3
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Vertical Feature Navigation Sidebar */}
              <div className="hidden sm:flex flex-col items-start gap-4 pl-4 border-l border-slate-200/80 text-[11px] font-sans tracking-wide font-semibold">
                {tags.map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`relative text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#0066FF] font-bold'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-1 h-3.5 bg-[#0066FF] rounded-r" />
                      )}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom 4-Column Advantage Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mt-20 pt-12 border-t border-slate-200/80">
          {pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="space-y-3 group"
            >
              {/* Giant Metric Number */}
              <div className="font-display font-black text-4xl sm:text-5xl text-[#38BDF8] tracking-tight group-hover:text-[#0066FF] transition-colors">
                {item.number}
              </div>

              {/* Pillar Title */}
              <h4 className="font-display font-black text-sm uppercase text-[#0B1938] tracking-tight leading-snug">
                {item.title}
              </h4>

              {/* Pillar Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
                {item.desc}
              </p>

              {/* CTA Link */}
              <div className="pt-1">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#0066FF] group-hover:text-blue-700 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default WhyChooseUs;

