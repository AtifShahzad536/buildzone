import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Cpu, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  Terminal,
  Zap,
  DollarSign,
  Activity,
  Check,
  ChevronDown,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Clock,
  Award
} from 'lucide-react';
import { useGetServiceBySlugQuery, useGetSettingsQuery } from '../../services/api';
import { initialServices } from '../../data/services';
import { siteConfig } from '../../config/siteConfig';
import { WhatsAppIcon } from '../../components/common/BrandIcons';
import { ServiceHeroVisual } from '../../components/services/ServiceHeroVisual';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import ScrollReveal from '../../components/common/ScrollReveal';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

// Service-specific metrics benchmarks
const serviceMetricsMap = {
  'web-development': [
    { label: 'Global Edge TTFB', val: '< 28ms', desc: 'Sub-second page rendering worldwide' },
    { label: 'Core Web Vitals', val: '100/100', desc: 'Google PageSpeed performance index' },
    { label: 'Platform Uptime', val: '99.99%', desc: 'High-concurrency cloud autoscaling' },
    { label: 'Code & IP Rights', val: '100%', desc: 'Direct GitHub repository transfer' },
  ],
  'mobile-app-development': [
    { label: 'UI Frame Rate', val: '60 FPS', desc: 'Smooth gestures & native fluidity' },
    { label: 'Offline Sync', val: '100%', desc: 'Local SQLite & background sync' },
    { label: 'Store Approval', val: 'Guaranteed', desc: 'iOS App Store & Google Play compliance' },
    { label: 'Shared Codebase', val: 'Up to 90%', desc: 'Flutter & React Native velocity' },
  ],
  'ai-development': [
    { label: 'Inference Velocity', val: '140+ tok/s', desc: 'Optimized streaming LLM outputs' },
    { label: 'RAG Retrieval', val: '98.6%', desc: 'High-precision vector similarity' },
    { label: 'Data Privacy', val: 'Zero Leakage', desc: 'Private enterprise VPC isolation' },
    { label: 'Agent Autonomy', val: 'Multi-Step', desc: 'Autonomous reasoning & tool calling' },
  ],
  'custom-software': [
    { label: 'Enterprise SLA', val: '99.999%', desc: 'Fault-tolerant cluster architecture' },
    { label: 'SaaS License Cost', val: '$0 / Month', desc: 'Zero per-user recurring subscriptions' },
    { label: 'Security Model', val: 'RBAC + 2FA', desc: 'Granular enterprise role control' },
    { label: 'Custom Fit', val: '100% Bespoke', desc: 'Engineered for your proprietary workflows' },
  ],
  'saas-development': [
    { label: 'Data Isolation', val: 'Multi-Tenant', desc: 'Row-level security & schema partitioning' },
    { label: 'Recurring Billing', val: 'Stripe Native', desc: 'Automated subscriptions & tier upgrades' },
    { label: 'Tenant Churn', val: '< 0.8%', desc: 'High-retention onboarding UX' },
    { label: 'Time to Market', val: '4 - 8 Weeks', desc: 'Rapid production-ready MVP delivery' },
  ],
  'e-commerce': [
    { label: 'Catalog Search', val: '< 20ms', desc: 'Instant Algolia search & filters' },
    { label: 'Frictionless Pay', val: '1-Click', desc: 'Apple Pay, Google Pay & Stripe' },
    { label: 'Conversion Lift', val: '+38%', desc: 'High-converting headless checkout' },
    { label: 'Global CDN', val: '300+ Edge', desc: 'Cached product assets worldwide' },
  ],
  'ui-ux-design': [
    { label: 'Accessibility', val: 'WCAG AAA', desc: 'Universal design & screen reader ready' },
    { label: 'Design Tokens', val: '400+ Units', desc: 'Atomic design system & components' },
    { label: 'Interactive Flow', val: '100% Figma', desc: 'Clickable high-fidelity prototypes' },
    { label: 'Developer Handoff', val: 'Zero Friction', desc: 'Auto-layout specs & export assets' },
  ],
  'cloud-devops': [
    { label: 'Deployment Strategy', val: 'Zero Downtime', desc: 'Blue-green & rolling Kubernetes releases' },
    { label: 'Infrastructure', val: '100% IaC', desc: 'Terraform & Docker reproducibility' },
    { label: 'Disaster Recovery', val: '< 5 Min RPO', desc: 'Automated multi-region cloud backups' },
    { label: 'CI/CD Pipeline', val: '< 60s Builds', desc: 'Parallel test & build runners' },
  ]
};

export const ServiceDetails = () => {
  const { slug } = useParams();
  const { data: apiService, isLoading, isError, refetch } = useGetServiceBySlugQuery(slug);
  const { data: settings } = useGetSettingsQuery();

  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const service = apiService || initialServices.find(s => s.slug === slug || s.id === slug);

  if (isLoading && !service) return <Loader text="Loading service architecture..." fullScreen />;
  if (!service) return <ErrorState message="Service not found." onRetry={refetch} />;

  // Calculate dynamic WhatsApp URL
  const whatsappPhone = settings?.whatsappNumber || siteConfig.contact.whatsapp || siteConfig.contact.phone || '92105464116';
  const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
  const waCustomMessage = encodeURIComponent(`Hello BuildZone! I am interested in discussing your ${service.title} engineering services.`);
  const dynamicWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${waCustomMessage}`;

  const metrics = serviceMetricsMap[service.slug] || [
    { label: 'Delivery Cadence', val: '2-Week Sprints', desc: 'Agile milestone deployments' },
    { label: 'IP Ownership', val: '100% Client IP', desc: 'Source code and copyright transfer' },
    { label: 'Architecture', val: 'Cloud Native', desc: 'Enterprise scalability baked in' },
    { label: 'Support SLA', val: '24/7 On-Call', desc: 'Dedicated engineering pod' },
  ];

  return (
    <>
      <SEOHead
        title={`${service.title} | BuildZone Engineering`}
        description={service.shortDescription || service.heroDescription}
      />

      <div className="bg-[#060B18] text-white min-h-screen overflow-hidden">
        
        {/* =========================================================================
            1. HERO SECTION (Directional Parallax Entrance & Custom Visual Mockup)
            ========================================================================= */}
        <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-slate-800/80">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#0066FF]/15 via-[#00F0FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/10 via-[#0066FF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <Container className="relative z-10">
            {/* Back Navigation Bar */}
            <ScrollReveal animation="fade-down" duration={0.5}>
              <div className="mb-8 sm:mb-12 flex items-center justify-between">
                <Link
                  to="/services"
                  className="font-mono text-xs text-slate-400 hover:text-[#00F0FF] inline-flex items-center gap-2 uppercase tracking-widest font-bold transition-all transform hover:-translate-x-1"
                >
                  <ArrowLeft className="w-4 h-4 text-[#00F0FF]" />
                  <span>Explore All Services</span>
                </Link>

                <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-[#0B1528] px-3 py-1 rounded-full border border-slate-800 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Dedicated Agile Pods Available</span>
                </span>
              </div>
            </ScrollReveal>

            {/* Hero Grid: Left Content (fade-left) & Right Visual Mockup (fade-right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              
              {/* Left Column: Heading, Subtitle & Call-to-Actions */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <ScrollReveal animation="fade-left" duration={0.7}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B1528] border border-slate-700 rounded-full shadow-sm">
                    <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                      {service.category} ARCHITECTURE
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fade-left" duration={0.8} delay={0.1}>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-[1.08]">
                    {service.title}
                  </h1>
                </ScrollReveal>

                <ScrollReveal animation="fade-left" duration={0.8} delay={0.2}>
                  <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl">
                    {service.heroDescription || service.shortDescription}
                  </p>
                </ScrollReveal>

                {/* Primary Action Buttons */}
                <ScrollReveal animation="fade-left" duration={0.8} delay={0.3}>
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <Link to="/start-project">
                      <Button 
                        variant="primary" 
                        size="md" 
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50"
                      >
                        Scope This Service
                      </Button>
                    </Link>

                    <a
                      href={dynamicWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#0B1528] hover:bg-[#111E38] border border-slate-700 hover:border-emerald-500/80 text-white hover:text-emerald-400 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm transform hover:-translate-y-0.5"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-current text-emerald-400" />
                      <span>Chat with Lead Architect</span>
                    </a>
                  </div>
                </ScrollReveal>

                {/* Assurance Guarantee Badges */}
                <ScrollReveal animation="fade-left" duration={0.8} delay={0.4}>
                  <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                      <span>Zero Vendor Lock-In</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>100% IP & Code Ownership</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Bi-Weekly Deployments</span>
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Custom High-Tech Interactive Visual Mockup */}
              <div className="lg:col-span-5">
                <ScrollReveal animation="fade-right" duration={0.85} delay={0.15}>
                  <ServiceHeroVisual 
                    slug={service.slug || service.id} 
                    title={service.title} 
                    category={service.category} 
                  />
                </ScrollReveal>
              </div>

            </div>
          </Container>
        </section>

        {/* =========================================================================
            2. QUANTITATIVE BENCHMARKS & METRICS STRIP (Staggered Zoom-In)
            ========================================================================= */}
        <section className="py-10 bg-[#070E1C] border-b border-slate-800/80 relative">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {metrics.map((m, idx) => (
                <ScrollReveal key={idx} animation="zoom-in" duration={0.6} delay={idx * 0.08}>
                  <div className="p-5 sm:p-6 bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/50 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 group">
                    <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0066FF] block mb-1">
                      {m.val}
                    </span>
                    <span className="font-display font-bold text-xs sm:text-sm text-white uppercase block mb-1">
                      {m.label}
                    </span>
                    <p className="font-sans text-[11px] sm:text-xs text-slate-400 leading-normal">
                      {m.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =========================================================================
            3. WHAT WE DELIVER / CORE ARCHITECTURE (Staggered Cyber Grid)
            ========================================================================= */}
        <section className="py-16 sm:py-24 relative">
          <Container>
            <ScrollReveal animation="fade-up" duration={0.7}>
              <SectionTitle
                badge="Included Engineering Scope"
                title="What We Deliver"
                subtitle="Every service engagement includes full-stack implementation, automated testing, DevOps deployment, and detailed documentation."
                className="mb-12"
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(service.features || service.deliverables || service.benefits || []).map((feat, idx) => (
                <ScrollReveal key={idx} animation="fade-up" duration={0.65} delay={idx * 0.08}>
                  <div className="p-6 sm:p-7 bg-[#0B1528] border border-slate-800 hover:border-[#0066FF] rounded-2xl shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,102,255,0.15)]">
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-[#060B18] border border-slate-700/80 flex items-center justify-center text-[#00F0FF] group-hover:scale-110 group-hover:border-[#00F0FF]/50 transition-all shadow-md">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg uppercase text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                        {feat}
                      </h3>
                      <p className="font-sans text-xs text-slate-300 leading-relaxed">
                        Engineered to strict enterprise coding standards with complete modularity, type-safety, and automated test coverage.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-[10.5px] text-slate-400">
                      <span className="text-[#00F0FF] font-semibold">Production Ready</span>
                      <span>Verified QA ✓</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>

        {/* =========================================================================
            4. PROBLEMS WE SOLVE: BEFORE VS AFTER TRANSFORMATION (Directional Split)
            ========================================================================= */}
        {service.problemsSolved && service.problemsSolved.length > 0 && (
          <section className="py-16 sm:py-24 bg-[#070E1C] border-y border-slate-800/80 relative">
            <Container>
              <ScrollReveal animation="fade-up" duration={0.7}>
                <SectionTitle
                  badge="Strategic ROI Transformation"
                  title="Bottlenecks We Eliminate"
                  subtitle="How BuildZone transforms common industry engineering challenges into scalable competitive advantages."
                  className="mb-12"
                />
              </ScrollReveal>

              <div className="space-y-6 max-w-4xl mx-auto">
                {service.problemsSolved.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* The Problem Card (fade-left) */}
                    <ScrollReveal animation="fade-left" duration={0.7} delay={idx * 0.1}>
                      <div className="h-full p-6 bg-[#0B1528] border border-red-950/80 hover:border-red-600/40 rounded-2xl space-y-2.5 shadow-lg">
                        <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase font-bold">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>Industry Pain Point</span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                          {item.problem}
                        </p>
                      </div>
                    </ScrollReveal>

                    {/* BuildZone Solution Card (fade-right) */}
                    <ScrollReveal animation="fade-right" duration={0.7} delay={idx * 0.1}>
                      <div className="h-full p-6 bg-gradient-to-br from-[#0B1528] to-[#0D1D3A] border border-emerald-900/60 hover:border-emerald-500/50 rounded-2xl space-y-2.5 shadow-lg">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                          <Check className="w-4 h-4 shrink-0" />
                          <span>BuildZone Engineered Solution</span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-white leading-relaxed font-medium">
                          {item.solution}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* =========================================================================
            5. TECHNOLOGY STACK & FRAMEWORKS (Interactive Badges)
            ========================================================================= */}
        {service.technologies && service.technologies.length > 0 && (
          <section className="py-16 sm:py-24 relative">
            <Container>
              <ScrollReveal animation="zoom-in" duration={0.75}>
                <div className="p-8 sm:p-12 bg-[#0B1528] border border-slate-800 rounded-3xl shadow-2xl space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-xs uppercase font-bold mb-1">
                        <Cpu className="w-4 h-4" />
                        <span>Production Tooling</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                        Technologies & Frameworks
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      Standardized for performance, security, and high test coverage.
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#060B18] border border-slate-700/80 hover:border-[#00F0FF] text-white hover:text-[#00F0FF] rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </Container>
          </section>
        )}

        {/* =========================================================================
            6. STEP-BY-STEP SPRINT DELIVERY PROCESS (Roadmap)
            ========================================================================= */}
        {service.process && service.process.length > 0 && (
          <section className="py-16 sm:py-24 bg-[#070E1C] border-t border-slate-800/80 relative">
            <Container>
              <ScrollReveal animation="fade-up" duration={0.7}>
                <SectionTitle
                  badge="Agile Delivery Methodology"
                  title="How We Execute & Deliver"
                  subtitle="Predictable 4-phase agile sprints from initial technical blueprinting to automated cloud deployment."
                  className="mb-14"
                />
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.process.map((p, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" duration={0.65} delay={idx * 0.1}>
                    <div className="h-full p-6 sm:p-7 bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/60 rounded-2xl shadow-xl transition-all flex flex-col justify-between group transform hover:-translate-y-1">
                      <div>
                        <span className="font-mono text-3xl font-black text-[#00F0FF] block mb-4 group-hover:scale-110 transition-transform origin-left">
                          {p.step || `0${idx + 1}`}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg uppercase text-white group-hover:text-[#00F0FF] transition-colors mb-2">
                          {p.title}
                        </h3>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-slate-800/80 font-mono text-[10.5px] text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>Sprint Phase {idx + 1}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* =========================================================================
            7. INTERACTIVE FAQ ACCORDION (Expandable Architecture Q&A)
            ========================================================================= */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-16 sm:py-24 relative">
            <Container>
              <div className="max-w-4xl mx-auto space-y-8">
                <ScrollReveal animation="fade-up" duration={0.7}>
                  <SectionTitle
                    badge="Frequently Asked Questions"
                    title={`${service.title} FAQ`}
                    subtitle="Direct answers to technical architecture, IP ownership, and project pricing questions."
                    className="mb-8"
                  />
                </ScrollReveal>

                <div className="space-y-3.5">
                  {service.faqs.map((faq, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <ScrollReveal key={i} animation="fade-up" duration={0.5} delay={i * 0.06}>
                        <div className="bg-[#0B1528] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all shadow-md">
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                            className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <h4 className="font-display font-bold text-sm sm:text-base uppercase text-white tracking-wide">
                              {faq.q}
                            </h4>
                            <ChevronDown
                              className={`w-5 h-5 text-[#00F0FF] shrink-0 transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-800/80 animate-fadeIn">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* =========================================================================
            8. HIGH-CONVERSION CTA BANNER (Direct WhatsApp & Start Project)
            ========================================================================= */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#070E1C] to-[#060B18] border-t border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#0066FF]/20 via-[#00F0FF]/15 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <Container className="relative z-10">
            <ScrollReveal animation="zoom-3d" duration={0.85}>
              <div className="p-8 sm:p-14 bg-gradient-to-r from-[#0B1528] via-[#0E1D3A] to-[#0B1528] border border-blue-500/30 rounded-3xl shadow-2xl text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/20 border border-[#0066FF]/40 rounded-full text-[#00F0FF] font-mono text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>30-Min Technical Discovery</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white">
                  Ready to Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-300">{service.title}</span>?
                </h2>

                <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Connect directly with our Principal Solutions Architects. Receive an actionable architecture blueprint and fixed milestone estimate within 48 hours.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
                  <Link to="/start-project">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="shadow-xl shadow-blue-500/30"
                    >
                      Start Your Project
                    </Button>
                  </Link>

                  <a
                    href={dynamicWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>

      </div>
    </>
  );
};

export default ServiceDetails;
