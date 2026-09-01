import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Code2, 
  CheckSquare, 
  Rocket, 
  Wrench, 
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Cpu,
  Server,
  Play,
  Pause,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

const pipelineSteps = [
  {
    step: '01',
    phase: 'STAGE 01',
    title: 'Discovery & System Architecture',
    tagline: 'Technical feasibility audit, data modeling & sprint blueprinting',
    desc: 'We unpack your product requirements, define modular microservice boundaries, establish database schemas, and align on precise technical SLAs.',
    duration: 'Sprint 0 • 3–5 Days',
    leadRole: 'Lead Solution Architect',
    deliverables: [
      'Detailed Technical Architecture Blueprint & Sequence Diagrams',
      'Entity Relationship (ERD) & Database Schema Design',
      'API Contract Specifications & Third-Party Integration Matrix',
      'Fixed-Scope Milestones & Transparent Cost Timeline'
    ],
    icon: Search,
    accentColor: '#0066FF',
    simulation: {
      type: 'architecture',
      title: 'blueprint_schema.ts',
      status: 'ARCH_VALIDATED',
      metrics: [
        { label: 'Microservices', value: '8 Modular Services' },
        { label: 'DB Architecture', value: 'PostgreSQL + Redis' },
        { label: 'Security Model', value: 'OAuth2 / RBAC' },
        { label: 'Target Latency', value: '< 85ms P95' }
      ],
      codeSnippet: `// Step 01: System Contract Architecture\nexport interface SystemArchitecture {\n  cluster: "aws-eks-us-east-1";\n  services: ["auth-pod", "engine-pod", "vector-rag"];\n  scaling: { min: 2, max: 32, auto: true };\n  securityAudit: "SOC2_COMPLIANT";\n}`
    }
  },
  {
    step: '02',
    phase: 'STAGE 02',
    title: 'UI/UX Design & Clickable Prototyping',
    tagline: 'Human-centered user journeys & Figma design system tokens',
    desc: 'We transform complex workflows into fluid, intuitive user interfaces. Complete with high-fidelity prototypes, ergonomic dark/light modes, and WCAG accessibility.',
    duration: 'Sprint 1 • 1–2 Weeks',
    leadRole: 'Senior Product Designer',
    deliverables: [
      'Clickable Interactive Figma Prototypes for User Testing',
      'Atomic Design System (Tokens, Typography, Component Library)',
      'Responsive Mobile & Desktop Wireframe Breakpoints',
      'WCAG 2.1 AA Accessibility & Micro-interaction Specs'
    ],
    icon: Layers,
    accentColor: '#0284C7',
    simulation: {
      type: 'design',
      title: 'design_tokens.json',
      status: 'TOKENS_EXPORTED',
      metrics: [
        { label: 'Figma Components', value: '140+ Reusable UI' },
        { label: 'WCAG Compliance', value: 'Level AA (100%)' },
        { label: 'Design Tokens', value: 'Synchronized Code' },
        { label: 'User Journeys', value: 'Validated Flows' }
      ],
      codeSnippet: `/* Step 02: Design System Tokenization */\n:root {\n  --brand-navy: #0B1938;\n  --brand-blue: #0066FF;\n  --accent-cyan: #0284C7;\n  --font-display: "Outfit", sans-serif;\n  --radius-card: 12px;\n  --shadow-elevation: 0 20px 40px rgba(0,0,0,0.08);\n}`
    }
  },
  {
    step: '03',
    phase: 'STAGE 03',
    title: 'Agile Full-Stack Engineering',
    tagline: 'Type-safe codebase, clean architecture & bi-weekly demo drops',
    desc: 'Dedicated engineering pods write modular, maintainable code with strict TypeScript typing, test-driven development, and automated CI/CD staging environments.',
    duration: 'Sprint 2–6 • Bi-Weekly Deployments',
    leadRole: 'Principal Full-Stack Engineers',
    deliverables: [
      'Modular Frontend (React / Next.js / TypeScript / Tailwind)',
      'High-Performance Backend (Node.js / Python / FastAPI / Go)',
      'Automated GitHub Actions CI/CD Pipeline to Staging',
      'Bi-Weekly Interactive Demo Drops for Stakeholder Feedback'
    ],
    icon: Code2,
    accentColor: '#0066FF',
    simulation: {
      type: 'code',
      title: 'engine_worker.go',
      status: 'STAGING_COMPILED',
      metrics: [
        { label: 'Code Quality', value: '100% Strict TypeScript' },
        { label: 'Build Status', value: 'Passing (Zero Errors)' },
        { label: 'CI/CD Pipeline', value: 'Automated GitHub Action' },
        { label: 'Code Coverage', value: '94.2% Unit Tests' }
      ],
      codeSnippet: `// Step 03: High-Concurrency Service Pod\nfunc ExecuteTaskWorker(ctx context.Context, job Job) error {\n  span := tracer.StartSpan("task.execute")\n  defer span.End()\n  return workerPool.Dispatch(ctx, job.Payload)\n}`
    }
  },
  {
    step: '04',
    phase: 'STAGE 04',
    title: 'QA, Penetration Testing & Audits',
    tagline: 'Automated unit/E2E suites, security pen-testing & load stress',
    desc: 'We stress-test every API endpoint, validate cross-browser responsiveness, run OWASP penetration scans, and simulate high-traffic flash surges.',
    duration: 'Continuous • Automated Suite',
    leadRole: 'Lead QA & Security Specialist',
    deliverables: [
      'End-to-End Cypress / Playwright Regression Test Suites',
      'OWASP Top-10 Vulnerability & Penetration Testing Report',
      'Simulated Multi-Region Concurrency Load Testing (10k+ req/sec)',
      'Zero Critical Security Flaws Before Production Sign-Off'
    ],
    icon: CheckSquare,
    accentColor: '#059669',
    simulation: {
      type: 'qa',
      title: 'security_audit_report.log',
      status: 'ALL_TESTS_PASSED',
      metrics: [
        { label: 'E2E Test Suites', value: '384 Passed (100%)' },
        { label: 'OWASP Security', value: 'Grade A+ Certified' },
        { label: 'Stress Load', value: '15,000 Req / Sec' },
        { label: 'Error Rate', value: '0.000% Defect SLA' }
      ],
      codeSnippet: `[PASS] TestSuite.Authentication.PenetrationScan\n[PASS] TestSuite.PaymentGateways.IdempotencyCheck\n[PASS] TestSuite.ConcurrentLoad.15000ReqPerSec\n[PASS] TestSuite.CrossBrowser.Safari_Chrome_Edge\n-> RESULT: 384/384 SUITES VERIFIED [0 FAILS]`
    }
  },
  {
    step: '05',
    phase: 'STAGE 05',
    title: 'Zero-Downtime Cloud Deployment',
    tagline: 'Multi-region AWS/GCP Kubernetes clusters & DNS cutover',
    desc: 'We execute blue-green zero-downtime production rollouts on resilient cloud infrastructure with automated database migrations, SSL/TLS, and CDN edge caching.',
    duration: 'Launch Day • Zero-Downtime',
    leadRole: 'Senior DevOps / SRE Lead',
    deliverables: [
      'Production Kubernetes Cluster Deployment on AWS / GCP',
      'Global Cloudflare CDN Edge Caching & WAF Protection',
      'Automated Database Sharding & Encrypted Backup Routines',
      'Seamless Live Production DNS Cutover with Zero Interruption'
    ],
    icon: Rocket,
    accentColor: '#0066FF',
    simulation: {
      type: 'devops',
      title: 'k8s_production_cluster.yaml',
      status: 'CLUSTER_LIVE',
      metrics: [
        { label: 'Cluster Health', value: '100% Operational' },
        { label: 'Global CDN', value: 'Sub-25ms Edge Edge' },
        { label: 'Auto-Scaling', value: 'HPA Nodes Ready' },
        { label: 'Downtime', value: '0.00 Seconds' }
      ],
      codeSnippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: buildzone-core-production\nspec:\n  replicas: 16\n  strategy:\n    type: RollingUpdate\n    rollingUpdate: { maxSurge: 2, maxUnavailable: 0 }`
    }
  },
  {
    step: '06',
    phase: 'STAGE 06',
    title: '24/7 SLA Telemetry & Maintenance',
    tagline: 'Real-time observability, instant incident response & patches',
    desc: 'Your application is guarded 24/7 with Prometheus/Grafana telemetry, instant bug resolutions, monthly dependency updates, and guaranteed SLA uptime.',
    duration: 'Ongoing • 24/7 Active Monitoring',
    leadRole: 'Dedicated Support Pod',
    deliverables: [
      '24/7 Real-Time Error Telemetry & Alerting (Datadog/Sentry)',
      'Sub-15 Minute Incident Response SLA Guarantee',
      'Monthly Security Patches, Kernel Updates & Optimization',
      'Dedicated Slack / WhatsApp Channel with Core Engineers'
    ],
    icon: Wrench,
    accentColor: '#D97706',
    simulation: {
      type: 'sla',
      title: 'telemetry_monitor.live',
      status: '99.99%_UPTIME',
      metrics: [
        { label: 'Uptime SLA', value: '99.99% Guaranteed' },
        { label: 'Avg Incident Response', value: '< 8 Minutes' },
        { label: 'Live Pods', value: 'Healthy & Balanced' },
        { label: 'Security Status', value: 'Patched & Monitored' }
      ],
      codeSnippet: `[TELEMETRY MONITOR: LIVE]\n• Prometheus Metrics: 100% HEALTHY\n• Error Budget Consumed: 0.01% / Month\n• Sentry Error Rate: 0.00 / 100k requests\n• Database IOPS Utilization: 18% (Nominal)`
    }
  },
  {
    step: '07',
    phase: 'STAGE 07',
    title: 'Continuous Scaling & AI Roadmap',
    tagline: 'Autonomous AI integrations, feature expansions & growth',
    desc: 'As your business scales, we evolve your product. We integrate custom AI models, optimize database throughput, build mobile companion apps, and expand market capabilities.',
    duration: 'Quarterly Growth Sprints',
    leadRole: 'Growth & AI Solutions Lead',
    deliverables: [
      'Fine-Tuned Domain AI & Autonomous Multi-Agent Systems',
      'Database Sharding & Query Optimization for Millions of Records',
      'Quarterly Feature Roadmap Planning & Rapid Sprints',
      'Enterprise API Monetization & Partner Ecosystem Extensions'
    ],
    icon: TrendingUp,
    accentColor: '#0066FF',
    simulation: {
      type: 'growth',
      title: 'growth_roadmap.ai',
      status: 'SCALING_PHASE',
      metrics: [
        { label: 'User Capacity', value: '1,000,000+ Scalable' },
        { label: 'AI Throughput', value: 'Sub-50ms Vector Search' },
        { label: 'Architecture Tier', value: 'Enterprise Ready' },
        { label: 'Feature Cadence', value: 'Agile 2-Wk Releases' }
      ],
      codeSnippet: `// Step 07: Enterprise Scale & Vector AI Matrix\nconst VectorPipeline = new SemanticRouter({\n  embeddingModel: "text-embedding-3-large",\n  vectorIndex: "pinecone-serverless",\n  throughput: "10,000 QPS",\n  autoScale: true\n});`
    }
  }
];

export const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance step pipeline every 5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % pipelineSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const current = pipelineSteps[activeStep];
  const StepIcon = current.icon;

  const nextStep = () => {
    setActiveStep(prev => (prev + 1) % pipelineSteps.length);
  };

  const prevStep = () => {
    setActiveStep(prev => (prev - 1 + pipelineSteps.length) % pipelineSteps.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none"></div>

      <Container className="relative z-10">
        
        {/* Section Header */}
        <SectionTitle
          badge="Delivery Methodology"
          title="7-Step Engineering Lifecycle"
          subtitle="A battle-tested agile framework designed for predictability, zero scope-creep, and rapid time-to-market."
          center
        />

        {/* 1. Interactive Horizontal Circuit Progress Bar */}
        <div className="mt-12 sm:mt-14 mb-8 sm:mb-12">
          <div className="relative">
            
            {/* Continuous Background Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block z-0"></div>
            
            {/* Active Progress Beam */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#0066FF] -translate-y-1/2 hidden md:block z-0 transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (pipelineSteps.length - 1)) * 100}%` }}
            ></div>

            {/* 7 Circuit Step Nodes */}
            <div className="grid grid-cols-7 gap-2 relative z-10">
              {pipelineSteps.map((s, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;
                const NodeIcon = s.icon;

                return (
                  <button
                    key={s.step}
                    aria-label={`Select Engineering Phase ${s.step}: ${s.title}`}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex flex-col items-center group cursor-pointer transition-all duration-300 focus:outline-none ${
                      isActive ? 'scale-105' : 'hover:scale-102 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Circle Node Badge */}
                    <div 
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-black transition-all duration-300 shadow-sm ${
                        isActive
                          ? 'bg-[#0066FF] text-white ring-4 ring-blue-200 shadow-lg'
                          : isPassed
                          ? 'bg-blue-50 text-[#0066FF] border border-blue-200'
                          : 'bg-white text-slate-500 border border-slate-200 group-hover:border-blue-300'
                      }`}
                    >
                      <span className="hidden sm:inline">{s.step}</span>
                      <NodeIcon className="w-4 h-4 sm:hidden" />
                    </div>

                    {/* Step Title Label under node */}
                    <div className="hidden lg:block text-center mt-2">
                      <span className={`font-mono text-[10px] uppercase tracking-wider font-bold block transition-colors ${
                        isActive ? 'text-[#0066FF]' : 'text-slate-500 group-hover:text-[#0B1938]'
                      }`}>
                        {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Interactive Stage Cockpit View (2-Column Architecture) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 relative">
          
          {/* Top Progress Bar Indicator for Active Timer */}
          <div 
            key={activeStep} 
            className={`absolute top-0 left-0 h-1 bg-[#0066FF] transition-all duration-[5000ms] ease-linear w-full origin-left ${
              !isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          ></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Stage Details & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Phase Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full font-mono text-[11px] font-bold text-[#0066FF] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{current.phase} OF 07</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full font-mono text-[11px] font-semibold text-slate-600">
                  <Terminal className="w-3 h-3 text-[#0066FF]" />
                  <span>{current.duration}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-semibold text-[#0066FF] mt-1.5 uppercase tracking-wide">
                  // {current.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {current.desc}
              </p>

              {/* 4 Concrete Engineering Deliverables */}
              <div className="space-y-2.5 pt-1">
                <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  STAGE DELIVERABLES & MILESTONES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.deliverables.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-2 p-2.5 bg-[#F8FAFC] border border-slate-200/80 rounded-lg text-xs font-mono text-slate-700 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Navigation & Autoplay Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevStep}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#0066FF] hover:bg-blue-50 text-[#0B1938] hover:text-[#0066FF] transition-all cursor-pointer shadow-2xs"
                    aria-label="Previous Step"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#0066FF] hover:bg-blue-50 text-[#0B1938] hover:text-[#0066FF] transition-all cursor-pointer shadow-2xs"
                    aria-label="Next Step"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause Auto-Advancing Process' : 'Play Auto-Advancing Process'}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-mono text-xs font-semibold transition-all cursor-pointer shadow-2xs ml-1"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#0066FF]" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{isPlaying ? 'Auto-Advancing' : 'Paused'}</span>
                  </button>
                </div>

                <div className="font-mono text-xs font-bold text-slate-400">
                  <span className="text-[#0066FF] text-base">{current.step}</span> / 07
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Live Code / Architecture Simulation Cockpit (5 cols) */}
            <div className="lg:col-span-5 bg-[#0B1938] rounded-xl p-5 sm:p-6 text-white font-mono shadow-2xl border border-slate-800 relative overflow-hidden">
              
              {/* Simulation Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-slate-300 font-bold ml-1.5">
                    {current.simulation.title}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase rounded">
                  {current.simulation.status}
                </span>
              </div>

              {/* Live Animated Code Window */}
              <div className="bg-[#071126] border border-slate-800/80 rounded-lg p-3.5 text-[11px] leading-relaxed text-blue-200/90 overflow-x-auto whitespace-pre font-mono mb-4 min-h-[120px]">
                {current.simulation.codeSnippet}
              </div>

              {/* 4 Live Verification Metrics */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {current.simulation.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {m.label}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5 truncate">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stage Role Stamp */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Phase Lead:</span>
                <span className="text-cyan-400 font-bold">{current.leadRole}</span>
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};

export default Process;
