import React, { useState } from 'react';
import { 
  Code2, 
  Users, 
  Zap, 
  Globe, 
  Smartphone, 
  Server, 
  Settings, 
  Database, 
  HardDrive, 
  Layers, 
  CheckCircle2, 
  GitBranch, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Rocket, 
  Search, 
  FileText,
  Boxes
} from 'lucide-react';
import Container from '../common/Container';

const stepsData = [
  {
    id: "01",
    label: "DISCOVERY & RESEARCH",
    badge: "01 / DISCOVERY & SYSTEM ARCHITECTURE",
    headingLine1: "UNDERSTAND THE PROBLEM",
    headingLine2: "BEFORE WRITING A SINGLE LINE.",
    desc: "We dive deep into your domain, define system constraints, design data schemas, and establish clear technical milestones with zero guesswork.",
    features: [
      { icon: Search, title: "DOMAIN MODELING", subtitle: "User journeys, personas & functional requirements." },
      { icon: Database, title: "DATA ARCHITECTURE", subtitle: "Entity diagrams, indexing & caching strategy." },
      { icon: FileText, title: "SPRINT ROADMAP", subtitle: "Clear milestone estimation & fixed-scope deliverable." }
    ],
    stats: [
      { value: "100%", label: "REQUIREMENT CLARITY" },
      { value: "3-5 DAYS", label: "SPRINT 0 TIMELINE" },
      { value: "0", label: "SCOPE CREEP RISK" }
    ],
    ideFile: "architecture.spec.ts",
    ideCode: `export interface ArchitecturePlan {\n  cluster: "aws-production-eks";\n  services: ["auth-pod", "api-gateway", "worker-queue"];\n  database: "PostgreSQL 16 Multi-AZ";\n  targetLatencyP95: "< 45ms";\n  slaGuarantee: "99.99%";\n};`
  },
  {
    id: "02",
    label: "UI/UX DESIGN",
    badge: "02 / UI/UX & DESIGN SYSTEM",
    headingLine1: "CRAFTING EXPERIENCES",
    headingLine2: "THAT USERS LOVE.",
    desc: "We design high-fidelity, interactive prototypes backed by atomic design tokens, ergonomic dark/light themes, and strict WCAG accessibility.",
    features: [
      { icon: Layers, title: "DESIGN TOKENS", subtitle: "Unified color palette, typography & spacing system." },
      { icon: Users, title: "USER TESTING", subtitle: "Clickable Figma prototypes tested with real users." },
      { icon: Zap, title: "MICRO-INTERACTIONS", subtitle: "Smooth 60fps animations and fluid state transitions." }
    ],
    stats: [
      { value: "100%", label: "WCAG AA COMPLIANT" },
      { value: "150+", label: "REUSABLE COMPONENTS" },
      { value: "60 FPS", label: "FLUID ANIMATIONS" }
    ],
    ideFile: "theme.tokens.ts",
    ideCode: `export const brandTokens = {\n  colors: { brand: "#0066FF", navy: "#0B1938" },\n  typography: { fontSans: "Inter", fontDisplay: "Outfit" },\n  radius: { card: "16px", button: "10px" },\n  animation: { duration: "200ms", ease: "cubic-bezier(0.16, 1, 0.3, 1)" }\n};`
  },
  {
    id: "03",
    label: "AGILE FULL-STACK ENGINEERING",
    badge: "03 / AGILE FULL-STACK ENGINEERING",
    headingLine1: "FROM FIRST IDEA",
    headingLine2: "TO PRODUCTION SCALE.",
    desc: "Our full-stack teams turn your vision into scalable, high-performance applications — using modern frameworks, clean architecture and agile development practices.",
    features: [
      { icon: Code2, title: "MODERN TECH STACK", subtitle: "React, Next.js, Node.js, Python, FastAPI, Go" },
      { icon: Users, title: "PRODUCT-DRIVEN TEAMS", subtitle: "Cross-functional squads with product mindset." },
      { icon: Zap, title: "ITERATIVE DELIVERY", subtitle: "Sprint cycles, live demos, continuous feedback." }
    ],
    stats: [
      { value: "99.9%", label: "UPTIME GUARANTEE" },
      { value: "24/7", label: "SUPPORT & MONITORING" },
      { value: "< 8 MIN", label: "AVG INCIDENT RESPONSE" }
    ],
    ideFile: "deployment.ts",
    ideCode: `export const deployService = async () => {\n  try {\n    const build = await buildApplication();\n    const image = await docker.build(build);\n    await pushToRegistry(image);\n    await updateKubernetes();\n    return { success: true, message: 'Deployed' };\n  } catch (error) {\n    return { success: false, error: error.message };\n  }\n};`
  },
  {
    id: "04",
    label: "QA & TESTING",
    badge: "04 / AUTOMATED QA & PEN-TESTING",
    headingLine1: "ZERO REGRESSIONS.",
    headingLine2: "100% CONFIDENCE.",
    desc: "Automated end-to-end testing, static security analysis, performance benchmarks, and penetration testing embedded into every single PR.",
    features: [
      { icon: ShieldCheck, title: "AUTOMATED CI/CD TESTS", subtitle: "Unit, integration, and Playwright E2E suites." },
      { icon: Cpu, title: "LOAD & STRESS TESTING", subtitle: "Simulating 50k+ concurrent users under peak load." },
      { icon: CheckCircle2, title: "SECURITY AUDITS", subtitle: "OWASP Top 10 automated vulnerability scanning." }
    ],
    stats: [
      { value: "95%+", label: "TEST COVERAGE" },
      { value: "0", label: "CRITICAL VULNERABILITIES" },
      { value: "< 50ms", label: "API TEST SUITE RUN" }
    ],
    ideFile: "e2e.test.ts",
    ideCode: `describe('Payment & Checkout Pipeline', () => {\n  it('should process enterprise subscription in < 500ms', async () => {\n    const response = await api.post('/v1/checkout', payload);\n    expect(response.status).toBe(200);\n    expect(response.data.captured).toBe(true);\n  });\n});`
  },
  {
    id: "05",
    label: "ZERO-DOWNTIME CLOUD",
    badge: "05 / CLOUD INFRASTRUCTURE & DEVOPS",
    headingLine1: "INFRASTRUCTURE AS CODE.",
    headingLine2: "HIGH AVAILABILITY.",
    desc: "Terraform-provisioned multi-region Kubernetes clusters with automated auto-scaling, blue-green deployments, and sub-second failover.",
    features: [
      { icon: Server, title: "KUBERNETES & DOCKER", subtitle: "Containerized microservices with auto-healing pods." },
      { icon: GitBranch, title: "BLUE-GREEN RELEASES", subtitle: "Zero downtime deployments with instant rollback." },
      { icon: HardDrive, title: "MULTI-AZ STORAGE", subtitle: "Automated daily snapshots and cross-region backups." }
    ],
    stats: [
      { value: "0s", label: "DEPLOYMENT DOWNTIME" },
      { value: "Multi-AZ", label: "CLOUD REDUNDANCY" },
      { value: "Auto", label: "HORIZONTAL POD SCALING" }
    ],
    ideFile: "k8s-service.yaml",
    ideCode: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: buildzone-core-api\nspec:\n  replicas: 12\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 2\n      maxUnavailable: 0`
  },
  {
    id: "06",
    label: "24/7 SLA SUPPORT",
    badge: "06 / 24/7 SLA & OBSERVABILITY",
    headingLine1: "CONTINUOUS MONITORING.",
    headingLine2: "REAL-TIME ALERTS.",
    desc: "Around-the-clock telemetry, distributed tracing with OpenTelemetry, automated anomaly detection, and rapid incident response teams.",
    features: [
      { icon: ShieldCheck, title: "DEDICATED ON-CALL", subtitle: "Direct Slack/PagerDuty escalation channel." },
      { icon: Zap, title: "REAL-TIME APM", subtitle: "Datadog, Prometheus & Grafana live metrics." },
      { icon: Users, title: "EXECUTIVE REPORTING", subtitle: "Monthly performance, uptime and security audits." }
    ],
    stats: [
      { value: "24/7/365", label: "ACTIVE MONITORING" },
      { value: "< 5 Min", label: "P1 ALERT RESPONSE" },
      { value: "99.99%", label: "HISTORICAL UPTIME" }
    ],
    ideFile: "telemetry.config.ts",
    ideCode: `export const telemetry = new OpenTelemetry({\n  serviceName: "buildzone-edge",\n  sampleRate: 1.0,\n  alertThresholds: { p99LatencyMs: 120, errorRatePct: 0.01 },\n  onIncident: async (event) => notifyPagerDutySquad(event)\n});`
  },
  {
    id: "07",
    label: "CONTINUOUS SCALING",
    badge: "07 / CONTINUOUS OPTIMIZATION & GROWTH",
    headingLine1: "ENGINEERED TO GROW",
    headingLine2: "WITH YOUR BUSINESS.",
    desc: "Ongoing feature expansion, query optimization, cost minimization, and architectural upgrades as your user base expands into millions.",
    features: [
      { icon: Rocket, title: "QUERY OPTIMIZATION", subtitle: "Database index tuning & distributed caching." },
      { icon: Cpu, title: "CLOUD COST EFFICIENCY", subtitle: "Automated spot instances & serverless offloading." },
      { icon: Boxes, title: "FEATURE ACCELERATION", subtitle: "Continuous sprint execution for new market opportunities." }
    ],
    stats: [
      { value: "10M+", label: "SCALING CAPACITY" },
      { value: "-40%", label: "AVG CLOUD BILL SAVINGS" },
      { value: "Continuous", label: "INNOVATION ROADMAP" }
    ],
    ideFile: "scale.config.ts",
    ideCode: `export const scalingPolicy = {\n  targetCpuUtilization: 65,\n  scaleUpDelay: "15s",\n  scaleDownDelay: "300s",\n  redisClusterNodes: 6,\n  edgeCachingTtl: 3600\n};`
  }
];

export const Process = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Step 03 default
  const activeStep = stepsData[activeStepIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFDFF] relative overflow-hidden border-t border-slate-100">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.025] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Top 7-Step Navigation Bar */}
        <div className="relative mb-16 sm:mb-20">
          
          {/* Connecting Horizontal Line */}
          <div className="hidden lg:block absolute top-4 left-0 right-0 h-0.5 bg-slate-200/80 z-0">
            <div 
              className="h-full bg-[#0066FF] transition-all duration-500 ease-out"
              style={{ width: `${(activeStepIndex / (stepsData.length - 1)) * 100}%` }}
            />
          </div>

          {/* Step Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-2 relative z-10">
            {stepsData.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer transition-all"
                >
                  {/* Step Number Circle / Badge */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all mb-2.5 ${
                    isActive
                      ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100 scale-105'
                      : 'bg-white text-slate-500 border border-slate-200 group-hover:border-[#0066FF] group-hover:text-[#0066FF]'
                  }`}>
                    {step.id}
                  </div>

                  {/* Step Label */}
                  <span className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors max-w-[120px] leading-tight ${
                    isActive
                      ? 'text-[#0066FF] font-black'
                      : 'text-slate-500 group-hover:text-slate-800'
                  }`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Step Detail Grid: Left Copy & Right High-Tech Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Pill Badge, Title, Paragraph, Features & Stats */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Step Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-blue-200/80 bg-blue-50/50 shadow-2xs">
              <span className="font-mono text-[11px] font-bold text-[#0066FF] uppercase tracking-wider">
                {activeStep.badge}
              </span>
            </div>

            {/* Giant Title */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.08]">
                {activeStep.headingLine1} <br />
                <span className="text-[#0066FF] bg-gradient-to-r from-[#0066FF] to-[#0080FF] bg-clip-text text-transparent">
                  {activeStep.headingLine2}
                </span>
              </h2>
            </div>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-lg">
              {activeStep.desc}
            </p>

            {/* 3 Feature Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {activeStep.features.map((feat, fIdx) => {
                const Icon = feat.icon;
                return (
                  <div key={fIdx} className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center border border-blue-100/60 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-black text-xs uppercase text-[#0B1938] tracking-tight">
                      {feat.title}
                    </h4>
                    <p className="font-mono text-[10px] text-slate-500 leading-snug">
                      {feat.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom 3 Metrics with Vertical Dividers */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              {activeStep.stats.map((stat, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Layered Architecture Diagram + Dark IDE Code Window */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            <div className="w-full max-w-[540px] relative space-y-4">
              
              {/* Top Layer: Cloud Architecture Flow Chart */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-blue-100/90 shadow-lg shadow-blue-500/5 relative z-10 space-y-3.5">
                
                {/* 1. Client Apps Card */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-50 border border-slate-200/90 rounded-xl px-4 py-2 shadow-2xs text-center space-y-1">
                    <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Client Apps
                    </span>
                    <div className="flex items-center justify-center gap-3 text-slate-700">
                      <Globe className="w-3.5 h-3.5 hover:text-[#0066FF] transition-colors" title="Web" />
                      {/* Apple Logo SVG */}
                      <svg className="w-3.5 h-3.5 fill-current hover:text-[#0066FF] transition-colors" viewBox="0 0 24 24" title="iOS">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76 1 .08 1.96-.51 2.58-1.26z"/>
                      </svg>
                      <Smartphone className="w-3.5 h-3.5 hover:text-[#0066FF] transition-colors" title="Android" />
                      <span className="text-[11px] font-bold font-mono hover:text-[#0066FF] transition-colors" title="Browser">e</span>
                    </div>
                  </div>

                  {/* Arrow to Load Balancer */}
                  <div className="w-0.5 h-3 bg-[#0066FF]/40" />
                  <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-[#0066FF]" />
                </div>

                {/* 2. Load Balancer Box */}
                <div className="flex justify-center">
                  <div className="w-[180px] bg-gradient-to-r from-[#0066FF] to-[#0080FF] text-white rounded-xl py-1.5 px-3 flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span className="font-display text-xs font-bold uppercase tracking-wider">
                      Load Balancer
                    </span>
                  </div>
                </div>

                {/* Split Lines to 3 Services */}
                <div className="w-full h-4 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#0066FF]/40" />
                  <div className="absolute top-2 left-[18%] right-[18%] h-0.5 bg-[#0066FF]/40" />
                  {/* Drops */}
                  <div className="absolute top-2 left-[18%] w-0.5 h-2 bg-[#0066FF]/40" />
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#0066FF]/40" />
                  <div className="absolute top-2 right-[18%] w-0.5 h-2 bg-[#0066FF]/40" />
                </div>

                {/* 3. Three Services Cards */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-lg p-2 text-center space-y-0.5 hover:border-[#0066FF]/30 transition-colors">
                    <Server className="w-3.5 h-3.5 text-[#0066FF] mx-auto mb-1" />
                    <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">
                      Web Services
                    </span>
                    <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">
                      (Node.js / Python)
                    </span>
                  </div>

                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-lg p-2 text-center space-y-0.5 hover:border-[#0066FF]/30 transition-colors">
                    <Settings className="w-3.5 h-3.5 text-[#0066FF] mx-auto mb-1" />
                    <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">
                      API Services
                    </span>
                    <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">
                      (FastAPI)
                    </span>
                  </div>

                  <div className="bg-slate-50/90 border border-slate-200/80 rounded-lg p-2 text-center space-y-0.5 hover:border-[#0066FF]/30 transition-colors">
                    <Layers className="w-3.5 h-3.5 text-[#0066FF] mx-auto mb-1" />
                    <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">
                      Background Jobs
                    </span>
                    <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">
                      (Workers)
                    </span>
                  </div>
                </div>

                {/* Arrow down to storage */}
                <div className="flex flex-col items-center pt-0.5">
                  <div className="w-0.5 h-2 bg-[#0066FF]/40" />
                </div>

                {/* 4. Storage / Database Row */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50/90 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 justify-center">
                    <Database className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                    <div className="text-left overflow-hidden">
                      <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">PostgreSQL</span>
                      <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">(Primary DB)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center">
                    <Database className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <div className="text-left overflow-hidden">
                      <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">Redis</span>
                      <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">(Cache)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center">
                    <HardDrive className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <div className="text-left overflow-hidden">
                      <span className="font-display font-bold text-[10px] text-[#0B1938] block truncate">S3</span>
                      <span className="font-mono text-[8px] text-slate-600 font-medium block truncate">(Storage)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Layer: Overlapping Dark IDE Code Editor Window */}
              <div className="relative z-20 -mt-6 sm:-mt-10 sm:ml-6 shadow-2xl rounded-2xl overflow-hidden border border-slate-700/70 bg-[#0B132B] text-white">
                
                {/* Window Title Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#070D1E] border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-mono text-slate-300 ml-2 font-semibold">
                      buildzone-ide
                    </span>
                  </div>

                  {/* Active Tab */}
                  <div className="px-2.5 py-0.5 bg-[#0B132B] border border-slate-700 rounded text-[10px] font-mono text-blue-400 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-[#0066FF]" />
                    <span>{activeStep.ideFile}</span>
                  </div>
                </div>

                {/* Editor Body: Left File Tree + Right Code */}
                <div className="grid grid-cols-12 text-[10px] font-mono">
                  
                  {/* File Explorer Tree */}
                  <div className="col-span-4 bg-[#070D1E]/90 p-3 border-r border-slate-800/80 space-y-1.5 text-slate-300 hidden sm:block">
                    <div className="text-slate-200 font-bold flex items-center gap-1 text-[10px]">
                      <span>📁</span> buildzone-app
                    </div>
                    <div className="pl-2 space-y-1">
                      <div className="text-slate-200 flex items-center gap-1">
                        <span>📁</span> src
                      </div>
                      <div className="pl-2 space-y-0.5 text-slate-300">
                        <div>› components</div>
                        <div>› services</div>
                        <div>› api</div>
                        <div>› utils</div>
                      </div>
                      <div className="text-slate-300">📄 package.json</div>
                      <div className="text-slate-300">📄 next.config.js</div>
                      <div className="text-slate-300">📄 README.md</div>
                    </div>
                  </div>

                  {/* Code Area with Syntax Highlighting */}
                  <div className="col-span-12 sm:col-span-8 p-3.5 bg-[#0B132B] overflow-x-auto space-y-1">
                    <pre className="font-mono text-[10px] text-slate-200 leading-relaxed">
                      <code>
                        {activeStep.ideCode.split('\n').map((line, lIdx) => (
                          <div key={lIdx} className="table-row">
                            <span className="table-cell pr-3 text-slate-400 select-none text-right">
                              {lIdx + 1}
                            </span>
                            <span className="table-cell">
                              {line.includes('export') || line.includes('import') || line.includes('return') || line.includes('const') || line.includes('async') || line.includes('try') || line.includes('catch') ? (
                                <span className="text-blue-400 font-semibold">{line}</span>
                              ) : line.includes('await') || line.includes('true') || line.includes('false') ? (
                                <span className="text-amber-400">{line}</span>
                              ) : (
                                <span className="text-slate-100">{line}</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>

                </div>

                {/* Floating "Deployment Successful" Badge */}
                <div className="absolute top-8 right-4 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-3 border border-emerald-200 shadow-lg shadow-emerald-500/10 flex items-center gap-2 text-[#0B1938] z-30">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <div>
                    <span className="font-display font-bold text-[10px] block leading-tight">
                      Deployment Successful
                    </span>
                    <span className="font-mono text-[8px] text-slate-700 font-semibold block leading-tight">
                      Live in 2m 34s
                    </span>
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

export default Process;
