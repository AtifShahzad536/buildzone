import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers
} from 'lucide-react';
import Container from '../common/Container';

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
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Trigger Calculation for Pinned Section
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollDistance = rect.height - windowHeight;
      if (totalScrollDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(clampedProgress);
        const newActive = Math.min(
          processSteps.length - 1,
          Math.floor(clampedProgress * processSteps.length)
        );
        setActiveStepIdx(newActive);
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

  // Jump smoothly by clicking stepper tab or navigation buttons
  const handleSelectStep = (index) => {
    setActiveStepIdx(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollDistance = rect.height - windowHeight;
    const targetScrollTop = window.scrollY + rect.top + (index / (processSteps.length - 1)) * totalScrollDistance;
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (activeStepIdx < processSteps.length - 1) {
      handleSelectStep(activeStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIdx > 0) {
      handleSelectStep(activeStepIdx - 1);
    }
  };

  // Continuous active float [0 ... processSteps.length - 1]
  const activeFloat = scrollProgress * (processSteps.length - 1);

  return (
    <div 
      ref={containerRef}
      className="relative bg-[#F8FAFC] border-t border-slate-200/80"
      style={{ height: `${(processSteps.length + 1) * 75}vh` }}
    >
      {/* Sticky Fullscreen Arena */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-4 sm:py-8 lg:py-10">
        
        {/* Subtle Ambient Background Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-20 shrink-0">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-200/90 rounded-full shadow-2xs mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0047BA]">
                HOW WE WORK • PROVEN DELIVERY FRAMEWORK
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-[#0B1938] leading-tight">
              From First Concept to{' '}
              <span className="text-[#0066FF]">Production Success.</span>
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 font-sans max-w-xl mx-auto line-clamp-1 sm:line-clamp-2">
              Scroll down to watch each agile phase slide into production reality.
            </p>
          </div>

          {/* Stepper Navigation: 5 Connected Milestone Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 mb-2 sm:mb-4">
            {processSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelectStep(idx)}
                  className={`group relative p-2.5 sm:p-3 rounded-xl text-left transition-all duration-300 cursor-pointer border select-none ${
                    isActive
                      ? 'bg-white border-[#0066FF] shadow-md shadow-blue-500/10 ring-2 ring-[#0066FF]/20 -translate-y-0.5'
                      : 'bg-white/75 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-[11px] font-black px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                    }`}>
                      {step.id}
                    </span>
                    <span className="font-sans text-[10px] font-bold text-slate-400 group-hover:text-slate-600">
                      {step.timeline}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'text-[#0066FF]' : 'text-slate-400 group-hover:text-[#0066FF]'
                    }`}>
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className={`font-display text-xs font-bold truncate ${
                      isActive ? 'text-[#0B1938]' : 'text-slate-700'
                    }`}>
                      {step.title.split('&')[0]}
                    </span>
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-[#0066FF] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

        </Container>

        {/* Center: Scroll-Triggered Right-to-Left Sliding Cards Stage */}
        <div 
          className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-w-6xl mx-auto px-4 sm:px-6 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-[380px] sm:h-[420px] md:h-[450px]">
            {processSteps.map((step, idx) => {
              const diff = idx - activeFloat;
              const isCurrent = Math.abs(diff) <= 0.5;

              // Smooth Right-to-Left Slide Calculation
              // When diff > 0, card is waiting to the right (e.g. translateX: +105%)
              // When diff === 0, card is perfectly centered (translateX: 0%)
              // When diff < 0, card has exited to the left (translateX: -105%)
              const translateXPercent = diff * 105;
              const scale = Math.max(0.88, 1 - Math.abs(diff) * 0.08);
              const opacity = Math.max(0, 1 - Math.abs(diff) * 0.9);
              const rotateY = diff * 8; // subtle 3D swivel

              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  style={{
                    transform: `translate3d(${translateXPercent}%, 0px, 0px) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex: 20 - Math.abs(Math.round(diff)),
                    transition: isHovered 
                      ? 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease' 
                      : 'transform 0.1s linear, opacity 0.1s linear',
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                  className="absolute inset-0 bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-300/60 overflow-hidden flex flex-col justify-between select-none"
                >
                  
                  {/* Desktop Right-Aligned Panorama Background Image */}
                  <div className="hidden lg:block absolute inset-y-0 right-0 w-[56%] h-full z-0 pointer-events-none overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-[center_35%] filter brightness-[0.98]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-35% to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/95 to-transparent" />
                    <div className="absolute inset-y-0 left-0 w-24 bg-white" />
                  </div>

                  {/* Top-Right Floating Requirement Badge */}
                  <div className="hidden sm:flex absolute top-5 right-5 z-20 px-3 py-1 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-full items-center gap-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#0B1938]">
                      {step.badge}
                    </span>
                  </div>

                  {/* Bottom-Right Milestone Signoff Card */}
                  <div className="hidden lg:flex absolute bottom-5 right-5 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg shadow-blue-500/5 items-center gap-2.5 max-w-xs">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-display font-bold text-[11px] text-[#0B1938] leading-tight">
                        {step.milestoneNotice}
                      </div>
                      <div className="font-sans text-[9.5px] text-slate-500 mt-0.5">
                        Verified Delivery Milestone
                      </div>
                    </div>
                  </div>

                  {/* Foreground Content (Left Column) */}
                  <div className="relative z-10 p-5 sm:p-7 lg:p-8 max-w-xl lg:max-w-2xl space-y-4 my-auto">
                    
                    <div>
                      {/* Step Header Badge & Timeline */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-[#0066FF] font-mono text-xs font-black rounded-lg border border-blue-200">
                          {step.stepNumber}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 font-sans text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                          Duration: <strong className="text-slate-800">{step.timeline}</strong>
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-[#0B1938] tracking-tight leading-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1 font-sans text-xs sm:text-sm font-bold text-[#0066FF]">
                        {step.tagline}
                      </p>

                      {/* Detailed Narrative */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {step.description}
                      </p>

                      {/* Key Deliverables Checklist */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <span className="font-display text-[11px] font-extrabold uppercase tracking-wider text-[#0B1938] block mb-2">
                          Key Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.deliverables.map((item, dIdx) => (
                            <div 
                              key={dIdx} 
                              className="flex items-start gap-1.5 bg-white/80 p-2 rounded-lg border border-slate-200/80 shadow-2xs"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                              <span className="font-sans text-[11px] sm:text-xs font-medium text-slate-700 leading-tight">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tools & Tech Badges */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10.5px] font-bold text-slate-400 mr-1">Tools & Specs:</span>
                      {step.tools.map((tool, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded font-mono text-[10px] font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Bar & Step Navigation */}
        <Container className="relative z-20 shrink-0">
          <div className="flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg max-w-3xl mx-auto">
            
            {/* Left: Active Step Number Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0B1938]">
              <span className="px-2 py-0.5 bg-[#0066FF] text-white rounded">
                0{activeStepIdx + 1}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">05 STEPS</span>
            </div>

            {/* Middle: Continuous Live Progress Bar */}
            <div className="flex-1 mx-4 hidden sm:block">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#0066FF] to-[#00F0FF] transition-all duration-150 rounded-full"
                  style={{ width: `${((activeStepIdx + 1) / processSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Right: Step Prev / Next Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeStepIdx === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer bg-white"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeStepIdx === processSteps.length - 1}
                className="px-4 py-1.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all shadow-xs cursor-pointer"
              >
                <span>{activeStepIdx === processSteps.length - 1 ? 'Final Stage' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </Container>

      </div>
    </div>
  );
};

export default Process;
