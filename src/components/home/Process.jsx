import React, { useState, useRef, useEffect } from 'react';
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
  Boxes,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Activity,
  CheckCircle,
  Radio,
  Play,
  Pause,
  Navigation,
  Palette,
  Shield
} from 'lucide-react';
import Container from '../common/Container';

const highwayStations = [
  {
    id: "01",
    label: "DISCOVERY & BLUEPRINT",
    stationName: "STATION 01: ARCHITECTURE BLUEPRINT",
    tagline: "Understand the problem before writing a single line.",
    desc: "We dive deep into your domain, define system constraints, design data schemas, and establish clear technical milestones with zero guesswork.",
    icon: Search,
    color: "from-blue-600 to-cyan-500",
    techStack: ["Domain Modeling", "PostgreSQL Schemas", "System Spec", "Sprint Roadmap"],
    metrics: [
      { value: "100%", label: "REQUIREMENT CLARITY" },
      { value: "3-5 DAYS", label: "SPRINT 0 TIMELINE" },
      { value: "0", label: "SCOPE CREEP RISK" }
    ],
    features: [
      { title: "User Journeys & Personas", desc: "Detailed functional requirements mapping." },
      { title: "Entity-Relationship Diagrams", desc: "Optimized indexing & data caching plans." },
      { title: "Fixed Milestone Roadmap", desc: "Predictable delivery with zero ambiguity." }
    ]
  },
  {
    id: "02",
    label: "UI/UX DESIGN SYSTEM",
    stationName: "STATION 02: ATOMIC DESIGN LAB",
    tagline: "Crafting fluid experiences that users love.",
    desc: "We design high-fidelity, interactive prototypes backed by atomic design tokens, ergonomic dark/light themes, and strict WCAG accessibility.",
    icon: Palette,
    color: "from-cyan-500 to-teal-400",
    techStack: ["Atomic Tokens", "Figma Prototyping", "WCAG AA", "Micro-Interactions"],
    metrics: [
      { value: "100%", label: "WCAG AA COMPLIANT" },
      { value: "150+", label: "DESIGN TOKENS" },
      { value: "60 FPS", label: "FLUID ANIMATIONS" }
    ],
    features: [
      { title: "Unified Design Tokens", desc: "Scalable typography, colors & spacing system." },
      { title: "Clickable User Testing", desc: "Real user feedback on interactive prototypes." },
      { title: "Micro-Interactions", desc: "Silky 60fps transitions and delight moments." }
    ]
  },
  {
    id: "03",
    label: "AGILE FULL-STACK",
    stationName: "STATION 03: CLOUD ENGINE REACTOR",
    tagline: "From first idea to scalable production reality.",
    desc: "Our senior full-stack squads engineer high-performance microservices, clean APIs, and modern frontends built for exponential scale.",
    icon: Cpu,
    color: "from-blue-600 to-indigo-600",
    techStack: ["Next.js", "React", "Node.js", "FastAPI", "Go", "Docker"],
    metrics: [
      { value: "1.5M+", label: "RPS THROUGHPUT" },
      { value: "Sub-10ms", label: "P99 LATENCY" },
      { value: "100%", label: "SENIOR TALENT" }
    ],
    features: [
      { title: "Modern Tech Frameworks", desc: "Next.js, Python, FastAPI & Go microservices." },
      { title: "Direct Architect Squads", desc: "Principal engineers without junior layers." },
      { title: "2-Week Agile Sprints", desc: "Live staged demos & continuous momentum." }
    ]
  },
  {
    id: "04",
    label: "AUTOMATED QA",
    stationName: "STATION 04: CYBER DEFENSE SHIELD",
    tagline: "Zero regressions. 100% release confidence.",
    desc: "Automated end-to-end testing, static security analysis, performance benchmarks, and penetration testing embedded into every single PR.",
    icon: ShieldCheck,
    color: "from-emerald-600 to-teal-500",
    techStack: ["Playwright E2E", "Jest / Vitest", "OWASP Top 10", "k6 Load Testing"],
    metrics: [
      { value: "95%+", label: "TEST COVERAGE" },
      { value: "0", label: "CRITICAL VULNERABILITIES" },
      { value: "50k+", label: "LOAD TEST RPS" }
    ],
    features: [
      { title: "Automated CI/CD Test Suite", desc: "Unit, integration & Playwright E2E suites." },
      { title: "Load & Stress Simulation", desc: "Simulating 50k+ concurrent users under peak load." },
      { title: "OWASP Top 10 Security Audit", desc: "Automated static & dynamic code vulnerability scans." }
    ]
  },
  {
    id: "05",
    label: "ZERO-DOWNTIME CLOUD",
    stationName: "STATION 05: MULTI-REGION ORBIT",
    tagline: "Infrastructure as code with automated failover.",
    desc: "Terraform-provisioned multi-region Kubernetes clusters with automated auto-scaling, blue-green deployments, and sub-second failover.",
    icon: Globe,
    color: "from-sky-600 to-blue-600",
    techStack: ["Kubernetes (EKS)", "Terraform IaC", "Blue/Green", "Multi-AZ Sync"],
    metrics: [
      { value: "0s", label: "DEPLOY DOWNTIME" },
      { value: "Multi-AZ", label: "GEO REDUNDANCY" },
      { value: "< 200ms", label: "AUTO FAILOVER" }
    ],
    features: [
      { title: "Kubernetes & Docker", desc: "Containerized microservices with auto-healing pods." },
      { title: "Blue-Green Releases", desc: "Zero downtime deployments with instant rollback." },
      { title: "Multi-AZ Cloud Storage", desc: "Automated cross-region backups and continuous sync." }
    ]
  },
  {
    id: "06",
    label: "24/7 SLA SUPPORT",
    stationName: "STATION 06: OBSERVABILITY RADAR",
    tagline: "Continuous APM telemetry and rapid on-call response.",
    desc: "Around-the-clock telemetry, distributed tracing with OpenTelemetry, automated anomaly detection, and rapid incident response teams.",
    icon: Activity,
    color: "from-indigo-600 to-purple-600",
    techStack: ["OpenTelemetry", "Datadog", "Prometheus", "PagerDuty"],
    metrics: [
      { value: "24/7/365", label: "ACTIVE OBSERVABILITY" },
      { value: "< 5 Min", label: "P1 ALERT RESPONSE" },
      { value: "99.99%", label: "HISTORICAL UPTIME" }
    ],
    features: [
      { title: "Dedicated On-Call Squad", desc: "Direct Slack & PagerDuty escalation channel." },
      { title: "Real-Time APM Dashboards", desc: "Datadog & Grafana live metrics & trace streams." },
      { title: "Executive Health Reports", desc: "Monthly performance, uptime and security audits." }
    ]
  },
  {
    id: "07",
    label: "CONTINUOUS SCALING",
    stationName: "STATION 07: QUANTUM GROWTH LAUNCHPAD",
    tagline: "Engineered to grow seamlessly with your business.",
    desc: "Ongoing feature expansion, query optimization, cost minimization, and architectural upgrades as your user base expands into millions.",
    icon: Rocket,
    color: "from-blue-600 to-cyan-400",
    techStack: ["pgvector AI", "Spot Instances", "Edge Caching", "Elastic Compute"],
    metrics: [
      { value: "10M+", label: "SCALING CAPACITY" },
      { value: "-40%", label: "AVG CLOUD BILL" },
      { value: "Continuous", label: "INNOVATION ROADMAP" }
    ],
    features: [
      { title: "Database Query Optimization", desc: "Index tuning & distributed cache layering." },
      { title: "Cloud Cost Efficiency", desc: "Automated spot instances & serverless offloading." },
      { title: "Continuous Product Sprints", desc: "Ongoing feature acceleration for new market targets." }
    ]
  }
];

export const Process = () => {
  const [activeStationIdx, setActiveStationIdx] = useState(2); // Station 03 default
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const activeStation = highwayStations[activeStationIdx];

  // Auto-cruise interval
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStationIdx((prev) => (prev + 1) % highwayStations.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Smooth 3D tilt tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const nextStation = () => {
    setActiveStationIdx((prev) => (prev + 1) % highwayStations.length);
  };

  const prevStation = () => {
    setActiveStationIdx((prev) => (prev - 1 + highwayStations.length) % highwayStations.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBFDFF] relative overflow-hidden border-t border-slate-100 selection:bg-blue-500/20">
      
      {/* Background Subtle Tech Matrix & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-400/10 via-sky-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-200/90 bg-white/90 backdrop-blur-md shadow-xs shadow-blue-500/10 relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-badge-shine pointer-events-none" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]" />
              </span>
              <span className="font-sans text-[11px] font-extrabold text-[#0066FF] uppercase tracking-wider">
                ENGINEERING VOYAGE • 3D CYBER PIPELINE
              </span>
            </div>

            {/* Kinetic Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.08]">
              FROM FIRST BLUEPRINT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0099FF] to-[#38BDF8] animate-text-shimmer inline-block">
                TO GLOBAL PRODUCTION HIGHWAY.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore our end-to-end 7-station software lifecycle. Each milestone is engineered with zero compromise on speed, bank-grade security, and enterprise reliability.
            </p>
          </div>

          {/* Autoplay & Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-sans border transition-all cursor-pointer shadow-xs ${
                isPlaying
                  ? 'bg-blue-50 text-[#0066FF] border-blue-300 ring-2 ring-blue-100'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#0066FF]" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Cruising (Auto)' : 'Auto-Cruise Tour'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevStation}
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-[#0066FF] transition-colors cursor-pointer shadow-xs"
                title="Previous Station"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextStation}
                className="w-9 h-9 rounded-xl bg-[#0066FF] hover:bg-blue-600 border border-[#0066FF] flex items-center justify-center text-white transition-colors cursor-pointer shadow-md shadow-blue-500/25"
                title="Next Station"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= 3D CYBER PIPELINE HIGHWAY CANVAS (LIGHT MATCHING THEME) ================= */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-10 border border-blue-100 shadow-xl shadow-blue-500/5 overflow-hidden isometric-perspective mb-10"
        >
          {/* Subtle Cyber Grid & Light Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />

          {/* 3D Parallax Container */}
          <div 
            className="relative py-6 transition-transform duration-300 ease-out preserve-3d"
            style={{
              transform: isHovered
                ? `rotateX(${mousePos.y * -8 + 4}deg) rotateY(${mousePos.x * 10}deg)`
                : 'rotateX(4deg) rotateY(0deg)'
            }}
          >
            
            {/* ================= THE NEON CYBER HIGHWAY ROAD RIBBON (LIGHT EDITION) ================= */}
            <div className="relative w-full mb-8">
              
              {/* Highway Base Conduit Beam */}
              <div className="h-3.5 bg-slate-100 border border-blue-100 rounded-full relative overflow-hidden shadow-inner">
                {/* Flowing Laser Current */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-highway-stream opacity-40" />
              </div>

              {/* Progress Level Glow Bar */}
              <div 
                className="absolute top-0 left-0 h-3.5 bg-gradient-to-r from-[#0066FF] via-[#0099FF] to-[#38BDF8] rounded-full transition-all duration-500 ease-out shadow-[0_0_14px_rgba(0,102,255,0.4)]"
                style={{ width: `${((activeStationIdx + 0.5) / highwayStations.length) * 100}%` }}
              >
                {/* Flowing Laser Bead on Head */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0066FF] shadow-[0_0_10px_#0066FF] animate-ping" />
              </div>

            </div>

            {/* ================= 7 ELEVATED 3D ISOMETRIC STATIONS ================= */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative z-10">
              {highwayStations.map((station, idx) => {
                const isActive = idx === activeStationIdx;
                const isPassed = idx < activeStationIdx;
                const Icon = station.icon;

                return (
                  <div
                    key={station.id}
                    onClick={() => setActiveStationIdx(idx)}
                    className={`relative p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col items-center text-center group ${
                      isActive
                        ? 'bg-white border-2 border-[#0066FF] ring-4 ring-blue-100 shadow-2xl shadow-blue-500/15 -translate-y-3'
                        : isPassed
                        ? 'bg-blue-50/50 border border-blue-100 hover:border-blue-300 hover:bg-white hover:-translate-y-1'
                        : 'bg-slate-50/70 border border-slate-200/80 hover:border-blue-200 hover:bg-white hover:-translate-y-1'
                    }`}
                  >
                    {/* Active Pulsing Antenna Beacon */}
                    {isActive && (
                      <div className="absolute -top-3 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] shadow-[0_0_10px_#0066FF] animate-ping" />
                      </div>
                    )}

                    {/* Elevated 3D Station Number Badge */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-black text-xs mb-2.5 transition-all ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30 scale-110'
                        : isPassed
                        ? 'bg-blue-100 text-[#0066FF] font-bold'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {station.id}
                    </div>

                    {/* Station Hologram Icon */}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0066FF] to-[#0099FF] text-white shadow-md shadow-blue-500/20'
                        : isPassed
                        ? 'bg-white text-[#0066FF] shadow-2xs border border-blue-100'
                        : 'bg-white text-slate-400 group-hover:text-[#0066FF] group-hover:bg-blue-50 border border-slate-200'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Station Name Label */}
                    <span className={`font-display text-[11px] sm:text-xs font-black uppercase tracking-wider leading-tight line-clamp-2 ${
                      isActive
                        ? 'text-[#0B1938]'
                        : isPassed
                        ? 'text-[#1E293B]'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}>
                      {station.label}
                    </span>

                    {/* Active Live Status Indicator */}
                    <div className="mt-3 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? 'bg-[#0066FF] animate-pulse'
                          : isPassed
                          ? 'bg-emerald-500'
                          : 'bg-slate-300'
                      }`} />
                      <span className={`text-[9.5px] font-sans font-bold uppercase ${
                        isActive
                          ? 'text-[#0066FF]'
                          : isPassed
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}>
                        {isActive ? 'Active' : isPassed ? 'Done' : 'Upcoming'}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Live Highway Telemetry Status Bar */}
          <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-slate-500">
            <div className="flex items-center gap-2 text-[#0066FF] font-bold">
              <Navigation className="w-4 h-4 animate-pulse" />
              <span>STATION LOCATOR: {activeStation.stationName}</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Milestone: <strong className="text-[#0B1938]">{activeStationIdx + 1} of 7</strong></span>
              <span>Velocity: <strong className="text-emerald-600">100% On-Schedule</strong></span>
              <span>Quality Gate: <strong className="text-[#0066FF]">Verified</strong></span>
            </div>
          </div>

        </div>

        {/* ================= ACTIVE STATION MISSION BRIEF CONSOLE (BENTO HUD) ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-500/5 relative overflow-hidden">
          {/* Corner Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100/40 via-cyan-50/20 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Station Brief & Deliverables */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200 text-xs font-extrabold font-sans uppercase tracking-wider">
                <activeStation.icon className="w-3.5 h-3.5" />
                <span>{activeStation.stationName}</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-[#0B1938] tracking-tight">
                  {activeStation.tagline}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 font-sans leading-relaxed pt-1">
                  {activeStation.desc}
                </p>
              </div>

              {/* 3 Core Station Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {activeStation.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-1 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B1938] font-display">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans leading-snug">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display mr-1">
                  Stack &amp; Tooling:
                </span>
                {activeStation.techStack.map((tech, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0066FF] border border-blue-100 text-xs font-bold font-sans"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>

            {/* Right: Telemetry KPI Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1938] via-[#0D1E42] to-[#071126] text-white border border-slate-700 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-sans text-xs text-slate-300 font-bold uppercase tracking-wider">
                    STATION KPI BENCHMARKS
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {activeStation.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="space-y-1 text-center">
                      <div className="font-display font-black text-xl sm:text-2xl text-cyan-400 tracking-tight">
                        {m.value}
                      </div>
                      <div className="font-sans text-[9px] uppercase font-bold text-slate-300 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Station Navigation Card */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#0066FF] uppercase tracking-wider block font-sans">
                    NEXT UP IN HIGHWAY
                  </span>
                  <span className="text-xs font-black text-[#0B1938] font-display block">
                    {highwayStations[(activeStationIdx + 1) % highwayStations.length].stationName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={nextStation}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold font-sans shadow-md shadow-blue-500/25 transition-all cursor-pointer group"
                >
                  <span>Advance</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </Container>
    </section>
  );
};

export default Process;
