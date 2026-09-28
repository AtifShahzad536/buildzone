import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  Play, 
  Pause,
  ChevronRight,
  Check,
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';
import Container from '../common/Container';
import ScrollReveal from '../common/ScrollReveal';

const processSteps = [
  {
    id: "01",
    stepNumber: "STEP 01",
    title: "Discovery & Technical Planning",
    timeline: "Week 1",
    tagline: "Aligning goals, defining requirements, and mapping out the technical blueprint.",
    description: "Before writing any code, we collaborate with your team to understand your business objectives, analyze user needs, and architect a future-proof data schema and milestone roadmap with zero ambiguity.",
    icon: Search,
    color: "from-blue-600 to-sky-500",
    deliverables: [
      "Product Requirements Document (PRD)",
      "System Architecture & Database ERD",
      "Sprint-by-Sprint Delivery Roadmap",
      "Fixed Scope & Budget Transparency"
    ],
    tools: ["Miro", "Jira", "PostgreSQL ERD", "System Specs"],
    image: "/process-discovery.jpg",
    badge: "100% Requirement Clarity",
    milestoneNotice: "Architecture Blueprint Approved • Week 1 Signoff"
  },
  {
    id: "02",
    stepNumber: "STEP 02",
    title: "UI/UX Design & Interactive Prototypes",
    timeline: "Week 2 - 3",
    tagline: "Crafting beautiful, intuitive, and conversion-focused user interfaces.",
    description: "We translate specifications into sleek, human-centered UI/UX designs. You get clickable interactive Figma prototypes with complete design tokens, responsive layouts, and WCAG-compliant accessibility.",
    icon: Palette,
    color: "from-sky-500 to-indigo-500",
    deliverables: [
      "Low-Fidelity Wireframes & User Flows",
      "High-Fidelity Component Design System",
      "Clickable Interactive Figma Prototype",
      "Mobile & Desktop Responsive Views"
    ],
    tools: ["Figma", "Design Tokens", "Tailwind CSS", "WCAG 2.1 AA"],
    image: "/process-discovery.jpg",
    badge: "Interactive Prototype Ready",
    milestoneNotice: "150+ Design Tokens & Figma Prototype • WCAG AA"
  },
  {
    id: "03",
    stepNumber: "STEP 03",
    title: "Agile Full-Stack Engineering",
    timeline: "Week 3 - 6",
    tagline: "Writing clean, maintainable, and high-performance production code.",
    description: "Our senior software engineers build your web and mobile applications using modern frameworks. With bi-weekly sprint demos, you see tangible progress and working features throughout development.",
    icon: Code2,
    color: "from-blue-600 to-indigo-600",
    deliverables: [
      "Modern Frontend & Backend Microservices",
      "RESTful & GraphQL API Integrations",
      "Clean, Documented & Tested Codebase",
      "Bi-Weekly Staged Demos for Client Review"
    ],
    tools: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
    image: "/about-office.jpg",
    badge: "Senior Engineers • Clean Code",
    milestoneNotice: "Senior Full-Stack Squad • 2-Week Sprint Demos"
  },
  {
    id: "04",
    stepNumber: "STEP 04",
    title: "Automated QA & Security Auditing",
    timeline: "Week 7",
    tagline: "Ensuring flawless performance, zero regressions, and enterprise security.",
    description: "Every build undergoes automated end-to-end testing, cross-browser compatibility checks, OWASP security vulnerability assessments, and performance optimization before hitting production.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
    deliverables: [
      "Automated Unit & E2E Test Suites",
      "OWASP Security & Penetration Testing",
      "Cross-Browser & Device Compatibility",
      "Lighthouse 95+ Performance Tuning"
    ],
    tools: ["Playwright", "Jest", "k6 Load Testing", "OWASP ZAP", "Lighthouse"],
    image: "/about-office.jpg",
    badge: "99.8% Test Coverage",
    milestoneNotice: "142/142 Unit & E2E Tests Passed • 0 Vulnerabilities"
  },
  {
    id: "05",
    stepNumber: "STEP 05",
    title: "Deployment, Training & 24/7 Support",
    timeline: "Launch & Beyond",
    tagline: "Seamless cloud go-live, team onboarding, and ongoing scaling.",
    description: "We handle zero-downtime production deployment on AWS/Cloud, provide thorough team training, and offer 24/7 monitoring, security patches, and continuous feature expansion as your business scales.",
    icon: Rocket,
    color: "from-blue-600 to-cyan-500",
    deliverables: [
      "Zero-Downtime Multi-Region Cloud Launch",
      "Admin Training & Documentation Handover",
      "Real-Time Telemetry & APM Monitoring",
      "Dedicated 24/7 SLA Support & Scaling"
    ],
    tools: ["AWS", "Kubernetes", "CI/CD Actions", "Datadog", "24/7 Support"],
    image: "/about-office.jpg",
    badge: "Zero-Downtime Guarantee",
    milestoneNotice: "99.99% Uptime Guarantee • 24/7 SLA Support"
  }
];

export const Process = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto progression if user enables cruise
  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStepIdx((prev) => (prev + 1) % processSteps.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const activeStep = processSteps[activeStepIdx];

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-slate-200/80">
      
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: Clean, Professional & Human-Friendly                       */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/90 rounded-full shadow-2xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0047BA]">
                HOW WE WORK • PROVEN DELIVERY FRAMEWORK
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-[#0B1938] leading-[1.12]">
              From First Concept to{' '}
              <span className="text-[#0066FF]">Production Success.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We follow a transparent, agile methodology designed to turn your complex ideas into scalable digital products on time, within budget, and with zero guesswork.
            </p>
          </ScrollReveal>
        </div>

        {/* ========================================================================= */}
        {/* STEPPER NAVIGATION: 5 Connected Interactive Milestones                    */}
        {/* ========================================================================= */}
        <ScrollReveal animation="fade-up" delay={0.35}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveStepIdx(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`group relative p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white border-[#0066FF] shadow-lg shadow-blue-500/10 ring-2 ring-[#0066FF]/20 -translate-y-1'
                      : 'bg-white/70 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-black px-2 py-0.5 rounded-md ${
                      isActive ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                    }`}>
                      {step.id}
                    </span>
                    <span className="font-sans text-[10.5px] font-bold text-slate-400 group-hover:text-slate-600">
                      {step.timeline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'text-[#0066FF]' : 'text-slate-400 group-hover:text-[#0066FF]'
                    }`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className={`font-display text-xs sm:text-sm font-bold truncate ${
                      isActive ? 'text-[#0B1938]' : 'text-slate-700'
                    }`}>
                      {step.title.split('&')[0]}
                    </span>
                  </div>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-6 right-6 h-1 bg-[#0066FF] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* MAIN SHOWCASE CARD: Seamless Full-Bleed Panorama Background (Like About)  */}
        {/* ========================================================================= */}
        <ScrollReveal animation="zoom-in" delay={0.4}>
          <div className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden">
            
            {/* ========================================================================= */}
            {/* BACKGROUND IMAGE LAYER (Desktop Right-Aligned Seamless Panorama)          */}
            {/* ========================================================================= */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[55%] h-full z-0 pointer-events-none overflow-hidden">
              <img
                src={activeStep.image}
                alt={activeStep.title}
                className="w-full h-full object-cover object-[center_35%] transition-all duration-700 filter brightness-[0.98]"
              />
              {/* Seamless White Gradient Fades from Left to Right */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-35% to-transparent" />
              <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/95 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-28 bg-white" />
            </div>

            {/* Floating Top-Right Pill on Desktop */}
            <div className="hidden sm:flex absolute top-6 right-6 z-20 px-3.5 py-1.5 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-[#0B1938]">
                {activeStep.badge}
              </span>
            </div>

            {/* Floating Bottom-Right Milestone Signoff Card on Desktop */}
            <div className="hidden lg:flex absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-lg shadow-blue-500/5 items-center gap-2.5 max-w-xs animate-float-micro">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-[11.5px] text-[#0B1938] leading-tight">
                  {activeStep.milestoneNotice}
                </div>
                <div className="font-sans text-[10px] text-slate-500 mt-0.5">
                  Verified Client Milestone
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* FOREGROUND CONTENT (Left-Aligned Narrative & Deliverables)                */}
            {/* ========================================================================= */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-xl lg:max-w-2xl space-y-6">
              
              <div>
                {/* Step Badge & Timeline */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#0066FF] font-mono text-xs font-black rounded-lg border border-blue-200">
                    {activeStep.stepNumber}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-sans text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                    Estimated Duration: <strong className="text-slate-800">{activeStep.timeline}</strong>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black font-display text-[#0B1938] tracking-tight leading-tight">
                  {activeStep.title}
                </h3>
                <p className="mt-1.5 font-sans text-xs sm:text-sm font-bold text-[#0066FF]">
                  {activeStep.tagline}
                </p>

                {/* Detailed Description */}
                <p className="mt-4 text-sm text-slate-600 font-sans leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Key Deliverables Checklist */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-[#0B1938] block mb-3">
                    Key Deliverables & Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.deliverables.map((item, dIdx) => (
                      <div 
                        key={dIdx} 
                        className="flex items-start gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                        <span className="font-sans text-xs font-medium text-slate-700 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Tools & Next Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Tools & Tech:</span>
                  {activeStep.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 bg-white/90 border border-slate-200 text-slate-700 rounded-md font-mono text-[10.5px] font-semibold shadow-2xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-white/80"
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-[#0066FF]" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStepIdx((prev) => (prev + 1) % processSteps.length)}
                    className="px-4 py-1.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg font-sans text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </Container>
    </section>
  );
};

export default Process;
