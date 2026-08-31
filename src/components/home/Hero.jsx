import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  Globe, 
  Smartphone, 
  Layers, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Button from '../common/Button';
import Container from '../common/Container';
import HeroScene from './HeroScene';

const slides = [
  {
    id: 'web-cloud',
    icon: Globe,
    badge: 'ENTERPRISE WEB & CLOUD',
    title: 'High-Performance Web Platforms & Cloud Pods',
    description: 'We architect resilient, type-safe web applications, multi-region cloud infrastructures, and high-concurrency microservices.',
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
    badge: 'APPLIED AI & AGENTS',
    title: 'Autonomous AI Agents & Enterprise LLM Systems',
    description: 'Custom AI workflows, Retrieval-Augmented Generation (RAG), and intelligent reasoning engines that automate complex operations.',
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
    badge: 'MOBILE ENGINEERING',
    title: 'Native & Cross-Platform Mobile Applications',
    description: 'Snappy iOS and Android applications built with Flutter and React Native, featuring fluid 60fps animations and offline synchronization.',
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
    badge: 'CUSTOM SAAS ARCHITECTURE',
    title: 'Mission-Critical SaaS & Scalable Architecture',
    description: 'Bespoke software platforms engineered to turn complex business models into scalable, multi-tenant subscription products.',
    deliverables: [
      'Multi-tenant database isolation & role-based access control',
      'Automated recurring billing, stripe & metered invoicing',
      'High-throughput asynchronous job workers & event queues'
    ],
    link: '/services/saas-development'
  }
];

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance capability slides smoothly every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const current = slides[activeSlide];
  const IconComponent = current.icon;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-radial-gradient">
      
      {/* 1. Dynamic 3D AI Neural Matrix Canvas (Subtle ambient on mobile, full interactive on desktop) */}
      <HeroScene />

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

            {/* 4. Desktop Only: Capability Switcher Tabs (HIDDEN ON MOBILE to keep mobile ultra-clean) */}
            <div className="hidden lg:flex flex-wrap gap-2 pt-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
                    activeSlide === idx
                      ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/80'
                  }`}
                >
                  <span className="text-blue-200">{`0${idx + 1}.`}</span>
                  <span>{s.badge.split(' ')[0]} {s.badge.split(' ')[1] || ''}</span>
                </button>
              ))}
            </div>

            {/* 5. Desktop Feature Card (Hidden on mobile) */}
            <div className="hidden lg:block bg-white/95 border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-md backdrop-blur-lg relative overflow-hidden transition-all text-left">
              {/* Progress bar line indicating slide timer */}
              <div 
                key={activeSlide} 
                className="absolute top-0 left-0 h-0.5 bg-[#0066FF] transition-all duration-[5500ms] ease-linear w-full origin-left"
              ></div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                  {current.badge}
                </span>
              </div>

              <h2 className="text-lg font-bold font-display uppercase text-[#0B1938] mb-2">
                {current.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                {current.description}
              </p>

              {/* 3 Key Deliverables */}
              <div className="space-y-1.5 mb-4">
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to={current.link}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:underline"
              >
                <span>Explore Architecture Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
