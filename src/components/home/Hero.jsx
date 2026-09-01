import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Globe, 
  Smartphone, 
  Layers, 
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Zap,
  ShieldCheck,
  Activity
} from 'lucide-react';
import Button from '../common/Button';
import Container from '../common/Container';

const HeroScene = React.lazy(() => import('./HeroScene'));

const slides = [
  {
    id: 'web-cloud',
    icon: Globe,
    shortBadge: 'ENTERPRISE WEB',
    badge: '01. ENTERPRISE WEB & CLOUD',
    title: 'High-Performance Web Platforms & Cloud Pods',
    description: 'We architect resilient, type-safe web applications, multi-region cloud infrastructures, and high-concurrency microservices.',
    metrics: [
      { label: 'Uptime SLA', val: '99.99%', icon: Activity },
      { label: 'Edge Speed', val: '<120ms', icon: Zap },
      { label: 'Security', val: 'SOC2 / OWASP', icon: ShieldCheck }
    ],
    deliverables: [
      'Sub-second load times with modern SSR & Edge Caching',
      'Modular micro-frontend architecture & zero downtime releases',
      'Bank-grade OWASP security & Kubernetes autoscaling'
    ],
    link: '/services/web-development'
  },
  {
    id: 'ai-agents',
    icon: Cpu,
    shortBadge: 'APPLIED AI',
    badge: '02. APPLIED AI & AGENTS',
    title: 'Autonomous AI Agents & Enterprise LLM Systems',
    description: 'Custom AI workflows, Retrieval-Augmented Generation (RAG), and intelligent reasoning engines that automate complex operations.',
    metrics: [
      { label: 'Query Latency', val: '<45ms', icon: Zap },
      { label: 'RAG Precision', val: '99.4%', icon: Activity },
      { label: 'Privacy', val: 'Zero Data Leakage', icon: ShieldCheck }
    ],
    deliverables: [
      'Production-grade LLM fine-tuning & vector search pipelines',
      'Autonomous multi-agent workflow orchestration',
      'Zero-data-leakage private enterprise AI integrations'
    ],
    link: '/ai-development'
  },
  {
    id: 'mobile-apps',
    icon: Smartphone,
    shortBadge: 'MOBILE DEV',
    badge: '03. MOBILE ENGINEERING',
    title: 'Native & Cross-Platform Mobile Applications',
    description: 'Snappy iOS and Android applications built with Flutter and React Native, featuring fluid 60fps animations and offline synchronization.',
    metrics: [
      { label: 'Frame Rate', val: '60 FPS', icon: Zap },
      { label: 'Sync Protocol', val: 'WebSocket / Offline', icon: Activity },
      { label: 'Security', val: 'Biometric Auth', icon: ShieldCheck }
    ],
    deliverables: [
      'Native Swift, Kotlin, and React Native / Flutter apps',
      'Real-time WebSocket sync & offline-first local databases',
      'Biometric authentication & seamless payment gateway checkouts'
    ],
    link: '/services/mobile-app-development'
  },
  {
    id: 'saas-custom',
    icon: Layers,
    shortBadge: 'CUSTOM SAAS',
    badge: '04. CUSTOM SAAS',
    title: 'Mission-Critical SaaS & Scalable Architecture',
    description: 'Bespoke software platforms engineered to turn complex business models into scalable, multi-tenant subscription products.',
    metrics: [
      { label: 'Architecture', val: 'Multi-Tenant RLS', icon: ShieldCheck },
      { label: 'Billing Engine', val: 'Stripe & Metered', icon: Zap },
      { label: 'Concurrency', val: '100k+ RPS', icon: Activity }
    ],
    deliverables: [
      'Multi-tenant database isolation & role-based access control',
      'Automated recurring billing, stripe & metered invoicing',
      'High-throughput asynchronous job workers & event queues'
    ],
    link: '/services/saas-development'
  }
];

const SLIDE_DURATION = 6000; // 6 seconds per slide

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef(null);

  // Auto-advance timer with clean reset on manual action
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeSlide]);

  const handleSelectSlide = (idx) => {
    setActiveSlide(idx);
    setProgressKey((k) => k + 1);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgressKey((k) => k + 1);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgressKey((k) => k + 1);
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const current = slides[activeSlide];
  const IconComponent = current.icon;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-radial-gradient">
      
      {/* 1. Dynamic 3D AI Neural Matrix Canvas (Desktop Only for maximum performance) */}
      {isDesktop && (
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
          <React.Suspense fallback={<div className="absolute inset-0" />}>
            <HeroScene />
          </React.Suspense>
        </div>
      )}

      {/* 2. Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none z-0"></div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* MAIN HERO CONTENT (Responsive: Ultra-clean on Mobile, Rich on Desktop) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* 1. Top Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-ping"></span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0066FF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Software & AI Engineering</span>
              </span>
            </div>

            {/* 2. Main High-Impact Headline with Crisp High-Contrast Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[50px] font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.12]">
              WE BUILD DIGITAL PRODUCTS THAT{' '}
              <span className="text-[#0066FF] block sm:inline">MOVE BUSINESSES FORWARD</span>
            </h1>

            {/* 3. Concise Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
              We design, build, and scale custom web platforms, mobile applications, and autonomous AI systems engineered for high-velocity startups and enterprise leaders.
            </p>

            {/* 4. Desktop Only: Capability Switcher Tabs in 1 Professional Unified Row (HIDDEN ON MOBILE) */}
            <div className="hidden lg:grid grid-cols-4 gap-2 pt-1 w-full">
              {slides.map((s, idx) => {
                const isActive = activeSlide === idx;
                const TabIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    aria-label={`View ${s.shortBadge} Solution Architecture`}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative overflow-hidden px-2.5 py-2.5 rounded-xl text-[11px] xl:text-xs font-mono font-bold uppercase tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 border cursor-pointer w-full text-center ${
                      isActive
                        ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-[#0066FF]/25 scale-[1.01]'
                        : 'bg-white/90 text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/80'
                    }`}
                  >
                    <TabIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-100' : 'text-[#0066FF]'}`} />
                    <span className="truncate">{`0${idx + 1}.`} {s.shortBadge}</span>

                    {/* Active Timer Progress Line */}
                    {isActive && isPlaying && (
                      <span
                        key={progressKey}
                        className="absolute bottom-0 left-0 h-[2.5px] bg-white/90"
                        style={{
                          animation: `heroProgress ${SLIDE_DURATION}ms linear forwards`
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* 5. Desktop Feature Cockpit Card (Animated on slide change) */}
            <div 
              key={activeSlide} 
              className="hidden lg:block bg-white/95 border-2 border-[#0066FF]/30 hover:border-[#0066FF]/60 rounded-xl p-5 sm:p-6 shadow-xl backdrop-blur-xl relative overflow-hidden transition-all text-left animate-hero-slide group"
            >
              {/* Top Accent Gradient Header Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#0066FF]"></div>

              {/* Card Header Row: Badge + Step Indicator + Slider Controls */}
              <div className="flex items-center justify-between gap-4 mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-[#0066FF] flex items-center justify-center shadow-2xs">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] block">
                      {current.badge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>ACTIVE CAPABILITY MODULE</span>
                    </span>
                  </div>
                </div>

                {/* Interactive Controls (Prev / Play-Pause / Next) */}
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1">
                  <button
                    type="button"
                    aria-label="Previous Slide"
                    onClick={handlePrev}
                    className="p-1 hover:bg-white text-slate-600 hover:text-[#0066FF] rounded transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={isPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:bg-white text-slate-600 hover:text-[#0066FF] rounded transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    aria-label="Next Slide"
                    onClick={handleNext}
                    className="p-1 hover:bg-white text-slate-600 hover:text-[#0066FF] rounded transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-lg sm:text-xl font-bold font-display uppercase text-[#0B1938] mb-2 leading-snug">
                {current.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                {current.description}
              </p>

              {/* Live Telemetry / Capability Metric Badges */}
              <div className="grid grid-cols-3 gap-2 mb-4 bg-blue-50/60 border border-blue-100 rounded-lg p-2.5">
                {current.metrics.map((m, idx) => {
                  const MIcon = m.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <MIcon className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                      <div className="min-w-0">
                        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider truncate">{m.label}</div>
                        <div className="font-mono text-[11px] font-bold text-[#0B1938] truncate">{m.val}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3 Key Deliverables */}
              <div className="space-y-1.5 mb-4 border-t border-slate-100 pt-3">
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Link with Glowing Pulse Effect */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={current.link}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052cc] group/link"
                >
                  <span>Explore Architecture Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <span className="font-mono text-[10px] text-slate-400 font-bold">
                  {`[ 0${activeSlide + 1} / 0${slides.length} ]`}
                </span>
              </div>
            </div>

            {/* 6. Action CTAs in a Single Ergonomic Row */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full max-w-md mx-auto lg:mx-0 pt-2">
              <Link to="/start-project" className="flex-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </Link>
              <Link to="/portfolio" className="flex-1">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full bg-white shadow-2xs"
                >
                  View Work
                </Button>
              </Link>
            </div>

            {/* 7. Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">150+</div>
                <div className="font-mono text-[9.5px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Shipped Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display font-black text-xl sm:text-2xl text-[#0B1938]">99.9%</div>
                <div className="font-mono text-[9.5px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Uptime SLA</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">40+</div>
                <div className="font-mono text-[9.5px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Senior Engineers</div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* DESKTOP FLOATING STATUS BADGES (Overlooking 3D Neural Scene) */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between items-end min-h-[480px] py-4 pointer-events-none">
            
            {/* Top Floating Code Terminal Badge */}
            <div className="bg-white/95 border border-slate-200 shadow-xl rounded-lg p-3 backdrop-blur-md max-w-[230px] animate-fadeIn self-end">
              <div className="flex items-center gap-1.5 mb-1.5 border-b border-slate-100 pb-1">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-mono text-[9px] text-slate-400 uppercase ml-auto font-bold">engine.ts</span>
              </div>
              <div className="font-mono text-[10px] text-slate-700 space-y-0.5">
                <p className="text-[#0066FF] font-bold">// AI Synapse Core</p>
                <p><span className="text-[#0B1938] font-bold">scale</span>(nodes: <span className="text-[#0066FF]">75</span>);</p>
                <p className="text-emerald-600 font-bold">✓ status: operational</p>
              </div>
            </div>

            {/* Bottom Floating Architecture Badge */}
            <div className="bg-white/95 border border-slate-200 shadow-xl rounded-lg p-3 backdrop-blur-md animate-fadeIn self-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#0066FF] font-bold uppercase tracking-wider">
                    Full-Stack & AI Stack
                  </div>
                  <div className="font-mono text-[9px] text-slate-500 font-medium">
                    React • Next.js • Python • AWS
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
