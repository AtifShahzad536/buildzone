import React, { useState, useRef, useEffect } from 'react';
import { 
  Monitor, 
  Code2, 
  Server, 
  Layers, 
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  Cpu,
  Activity,
  Sparkles,
  Lock,
  Globe2,
  CheckCircle,
  Network,
  Terminal,
  TrendingUp,
  Boxes,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';

export const WhyChooseUs = () => {
  const [activeTag, setActiveTag] = useState('SCALABLE');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const cardRef = useRef(null);

  // Rotating dynamic benefit highlights
  const dynamicSubtitles = [
    { title: "Built by senior engineers.", sub: "Designed for global scale." },
    { title: "Zero junior handoffs.", sub: "Architect-level execution." },
    { title: "Bank-grade security.", sub: "Sub-10ms execution latency." },
    { title: "Cloud-native resilience.", sub: "Engineered for 10x business growth." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIdx((prev) => (prev + 1) % dynamicSubtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dynamicSubtitles.length]);

  // Smooth 3D tilt tracking with mouse
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const architectureModes = {
    SCALABLE: {
      key: 'SCALABLE',
      title: 'Hyper-Scale Microservices',
      subtitle: 'Elastic auto-scaling across distributed Kubernetes clusters',
      metric: '1.5M+ RPS',
      metricSub: 'Peak System Throughput',
      tagColor: 'from-blue-600 to-cyan-500',
      glow: 'shadow-blue-500/20',
      icon: Zap,
      chips: ['Kubernetes', 'Kafka Stream', 'Dynamic Mesh', 'Zero Cold Start'],
      latency: '4.2ms',
      uptime: '99.999%'
    },
    SECURE: {
      key: 'SECURE',
      title: 'Zero-Trust Architecture',
      subtitle: 'Bank-grade mTLS encryption, OAuth2/OIDC, and automated compliance',
      metric: 'AES-256 / mTLS',
      metricSub: 'SOC 2 & HIPAA Compliant',
      tagColor: 'from-emerald-600 to-teal-500',
      glow: 'shadow-emerald-500/20',
      icon: Lock,
      chips: ['mTLS Everywhere', 'RBAC & ABAC', 'Vault KMS', 'WAF Shield'],
      latency: '2.8ms',
      uptime: '100% Audit'
    },
    RELIABLE: {
      key: 'RELIABLE',
      title: 'Multi-Region High Availability',
      subtitle: 'Active-Active geo-replication with sub-second failover recovery',
      metric: '< 200ms RTO',
      metricSub: 'Automated Disaster Recovery',
      tagColor: 'from-indigo-600 to-blue-500',
      glow: 'shadow-indigo-500/20',
      icon: Activity,
      chips: ['Multi-AZ Replicas', 'Circuit Breakers', 'Live Health Probes', 'Chaos Tested'],
      latency: '6.1ms',
      uptime: '99.999%'
    },
    'FUTURE-READY': {
      key: 'FUTURE-READY',
      title: 'AI, Vector & Event Core',
      subtitle: 'Native RAG embeddings, vector databases, and real-time LLM pipelines',
      metric: 'pgvector + RAG',
      metricSub: 'Autonomous AI Orchestration',
      tagColor: 'from-sky-600 to-violet-500',
      glow: 'shadow-sky-500/20',
      icon: Sparkles,
      chips: ['Semantic Search', 'Event Driven', 'LangGraph Mesh', 'Real-time Telemetry'],
      latency: '8.4ms',
      uptime: 'Real-time'
    }
  };

  const currentMode = architectureModes[activeTag];

  const pillars = [
    {
      number: "01",
      title: "SENIOR ENGINEERS, NOT LAYERS",
      desc: "Principal architects work directly with your codebase and business logic. No junior handoffs or communication bottlenecks.",
      ctaText: "Explore our team",
      link: "/about",
      badge: "Top 3% Talent",
      highlights: ["Direct Slack/Teams Access", "Principal Oversight", "Clean Architecture"]
    },
    {
      number: "02",
      title: "BUILT FOR SCALE FROM DAY ONE",
      desc: "Distributed microservices, resilient APIs, and multi-tier database caching engineered to effortlessly support millions of users.",
      ctaText: "View scale capabilities",
      link: "/services",
      badge: "Million+ Users",
      highlights: ["Sub-10ms P99 Latency", "Event-Driven Queues", "Zero Downtime"]
    },
    {
      number: "03",
      title: "SECURITY BY ARCHITECTURE",
      desc: "Security isn't a post-launch checklist. It's built into every API gateway, database transaction, and network boundary.",
      ctaText: "Review security",
      link: "/security",
      badge: "Zero-Trust Ready",
      highlights: ["SOC 2 / HIPAA Ready", "Automated Pen-Testing", "End-to-End Encryption"]
    },
    {
      number: "04",
      title: "SHIP. MEASURE. IMPROVE.",
      desc: "Two-week agile sprints, continuous staging previews, automated regression testing, and measurable business KPI delivery.",
      ctaText: "Start your sprint",
      link: "/contact",
      badge: "2-Week Sprints",
      highlights: ["Automated CI/CD", "Real-Time Telemetry", "Measurable ROI"]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FBFDFF] relative overflow-hidden selection:bg-blue-500/20">
      
      {/* Background Ambient Gradients & Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#0066FF_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />
      <div className="absolute top-10 right-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-blue-400/15 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-400/10 via-sky-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* TOP HERO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headings, Live Subtitle, Mode Switcher & Telemetry Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Status Cyber Badge with Scanning Beam */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-200/90 bg-white/90 backdrop-blur-md shadow-xs shadow-blue-500/10 relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-badge-shine pointer-events-none" />
              
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]" />
              </span>
              
              <span className="font-sans text-[11px] font-extrabold text-[#0066FF] uppercase tracking-wider">
                WHY BUILDZONE • SIALKOT'S #1 SOFTWARE HOUSE
              </span>
            </div>

            {/* Giant Kinetic Heading */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.06]">
                THE ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0099FF] to-[#38BDF8] animate-text-shimmer inline-block drop-shadow-xs">
                  ADVANTAGE
                </span>
              </h2>
            </div>

            {/* Dynamic Live Rotating Subtitle */}
            <div className="h-16 flex flex-col justify-center border-l-2 border-[#0066FF] pl-4 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#1E293B] leading-tight tracking-tight">
                {dynamicSubtitles[activeFeatureIdx].title}
              </h3>
              <p className="text-sm font-sans font-medium text-[#0066FF]">
                {dynamicSubtitles[activeFeatureIdx].sub}
              </p>
            </div>

            {/* Body Description */}
            <p className="text-sm sm:text-[15px] text-slate-600 font-sans leading-relaxed max-w-lg">
              As the premier software house in Sialkot, we don't just write code. We engineer mission-critical, enterprise-grade systems with fault-tolerant cloud architecture, bank-grade zero-trust security, and high-velocity agile delivery.
            </p>

            {/* Interactive Architecture Mode Tabs */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-display">
                SELECT ARCHITECTURE MODE:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(architectureModes).map((key) => {
                  const mode = architectureModes[key];
                  const Icon = mode.icon;
                  const isActive = activeTag === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTag(key)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/25 scale-[1.02]'
                          : 'bg-white/80 hover:bg-white text-slate-600 hover:text-[#0066FF] border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{mode.key}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Live Telemetry HUD Card */}
            <div className="p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-md shadow-blue-500/5 backdrop-blur-md relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
              
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1938] block font-display">
                      {currentMode.title}
                    </span>
                    <span className="text-[11px] text-slate-500 font-sans block">
                      {currentMode.subtitle}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#0066FF] font-display block">
                    {currentMode.metric}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {currentMode.metricSub}
                  </span>
                </div>
              </div>

              {/* Mode Feature Chips & Live Micro Stats */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5">
                  {currentMode.chips.map((chip, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 shrink-0">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {currentMode.latency}
                  </span>
                  <span className="text-blue-600 font-bold">
                    {currentMode.uptime}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: 3D Animated Concentric Gyroscope Rings & Live Flowing Electric Lights */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[560px] flex items-center perspective-1200 select-none py-2"
            >
              
              {/* 3D Parallax Canvas */}
              <div 
                className="relative flex-1 py-10 px-3 transition-transform duration-200 ease-out preserve-3d"
                style={{
                  transform: isHovered
                    ? `rotateX(${mousePos.y * -16}deg) rotateY(${mousePos.x * 16}deg) scale3d(1.03, 1.03, 1.03)`
                    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                }}
              >
                
                {/* ================= 3D ANIMATED CONCENTRIC HOLOGRAPHIC RINGS SYSTEM ================= */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d">
                  
                  {/* Outer Orbit Ring 1 (Clockwise Rotation with Orbiting Glowing Satellite Nodes) */}
                  <div className="w-[500px] h-[500px] rounded-full border-2 border-dashed border-blue-300/40 absolute animate-spin-slow flex items-center justify-center">
                    {/* Glowing Satellite 1 (Top) */}
                    <div className="absolute top-0 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0066FF] shadow-[0_0_14px_#0066FF] animate-pulse" />
                      <div className="w-6 h-6 rounded-full border border-cyan-400/50 absolute animate-ping" />
                    </div>
                    {/* Glowing Satellite 2 (Bottom) */}
                    <div className="absolute bottom-0 translate-y-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    </div>
                    {/* Glowing Satellite 3 (Right) */}
                    <div className="absolute right-0 translate-x-1/2 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366F1]" />
                    </div>
                  </div>

                  {/* Middle Tech Ring 2 (Counter-Clockwise Rotation with High-Tech Segment Accents) */}
                  <div className="w-[410px] h-[410px] rounded-full border border-blue-400/30 border-t-transparent border-b-transparent absolute animate-spin-reverse-slow shadow-[0_0_30px_rgba(0,102,255,0.08)]">
                    {/* Left Accent Node */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
                  </div>

                  {/* Radar Sweep Scanner Cone Layer */}
                  <div 
                    className="w-[380px] h-[380px] rounded-full absolute animate-radar-sweep pointer-events-none opacity-40"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 102, 255, 0.16) 60deg, transparent 90deg)'
                    }}
                  />

                  {/* Inner Glowing Holographic Aura */}
                  <div className="w-[320px] h-[320px] rounded-full border border-blue-200/60 bg-gradient-to-br from-blue-500/[0.07] via-cyan-400/[0.04] to-transparent absolute shadow-[inset_0_0_30px_rgba(0,102,255,0.08)]" />

                  {/* Floating Holographic Telemetry Pill Top Right */}
                  <div 
                    className="absolute top-0 right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl text-[10.5px] font-bold text-[#0066FF] animate-float-3d"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Edge: Tokyo • Frankfurt • Sialkot</span>
                  </div>

                  {/* Floating Holographic Telemetry Pill Bottom Left */}
                  <div 
                    className="absolute bottom-16 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl text-[10.5px] font-bold text-slate-700 animate-float-3d"
                    style={{ transform: 'translateZ(40px)', animationDelay: '1.8s' }}
                  >
                    <Radio className="w-3.5 h-3.5 text-[#0066FF] animate-pulse" />
                    <span>Auto-Mesh: Active</span>
                  </div>
                </div>

                {/* ================= VERTICAL ARCHITECTURE FLOW NODES & FLOWING LIGHT ARROWS ================= */}
                <div className="flex flex-col items-center space-y-3.5 relative z-10 preserve-3d">
                  
                  {/* ---------------- 1. CLIENT APPS NODE ---------------- */}
                  <div 
                    className="w-[240px] bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 border border-blue-100/90 shadow-md shadow-blue-500/10 hover:shadow-2xl hover:border-[#0066FF]/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 group cursor-pointer relative"
                    style={{ transform: 'translateZ(36px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 transition-all shadow-xs">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xs uppercase text-[#0B1938] block tracking-wide">
                          CLIENT APPS
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <span className="font-sans text-[11px] text-slate-500 font-medium block truncate">
                        Next.js • React • iOS • Android
                      </span>
                    </div>
                    {/* Top Glow Highlight */}
                    <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* ---------------- ARROW 1: FLOWING ELECTRIC LASER BEAM (CLIENT -> API) ---------------- */}
                  <div className="flex flex-col items-center relative h-8 w-12 justify-center overflow-visible">
                    {/* Base Conduit Wire */}
                    <div className="w-[3px] h-full bg-blue-100 rounded-full relative overflow-hidden">
                      {/* Flowing Laser Light traveling continuously */}
                      <div className="absolute w-full h-4 bg-gradient-to-b from-transparent via-cyan-400 to-white shadow-[0_0_10px_#0066FF] animate-circuit-flow rounded-full" />
                    </div>
                    
                    {/* Pulsing Light Head Packet */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-circuit-flow-fast" />
                    
                    {/* Glowing Arrowhead at destination */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#0066FF] filter drop-shadow-[0_2px_4px_rgba(0,102,255,0.5)]" />
                  </div>

                  {/* ---------------- 2. API GATEWAY NODE ---------------- */}
                  <div 
                    className={`w-[275px] bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 border transition-all duration-300 flex items-center gap-3.5 group cursor-pointer relative shadow-lg ${
                      activeTag === 'SECURE' 
                        ? 'border-emerald-400 shadow-emerald-500/25 ring-2 ring-emerald-400/30' 
                        : 'border-blue-100/90 shadow-blue-500/10 hover:shadow-2xl hover:border-[#0066FF]/50 hover:-translate-y-1'
                    }`}
                    style={{ transform: 'translateZ(28px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 transition-all shadow-xs">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xs uppercase text-[#0B1938] block tracking-wide">
                          API GATEWAY & MESH
                        </span>
                        <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200">
                          v3.2
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-slate-500 font-medium block truncate">
                        GraphQL • REST • gRPC • WebSockets
                      </span>
                    </div>
                  </div>

                  {/* ---------------- ARROW 2: DUAL BRANCHING FLOWING CIRCUIT (API -> SERVICES & QUEUES) ---------------- */}
                  <div className="w-[320px] h-8 relative overflow-visible">
                    {/* Center Down Line from API Gateway */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-2.5 bg-blue-100 overflow-hidden">
                      <div className="w-full h-full bg-[#0066FF] animate-circuit-flow-fast" />
                    </div>

                    {/* Horizontal Circuit Bus Line */}
                    <div className="absolute top-2.5 left-[20%] right-[20%] h-[3px] bg-blue-100 rounded-full overflow-hidden">
                      {/* Left and right flowing energy pulses */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-[#0066FF] to-cyan-400 animate-pulse" />
                    </div>
                    
                    {/* Left Drop Line down to Services */}
                    <div className="absolute top-2.5 left-[20%] w-[3px] h-5 bg-blue-100 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-white animate-circuit-flow" />
                    </div>
                    <div className="absolute top-[30px] left-[20%] -translate-x-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[6px] border-t-[#0066FF] filter drop-shadow-[0_2px_4px_rgba(0,102,255,0.5)]" />
                    
                    {/* Right Drop Line down to Queues */}
                    <div className="absolute top-2.5 right-[20%] w-[3px] h-5 bg-blue-100 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-white animate-circuit-flow" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <div className="absolute top-[30px] right-[20%] -translate-x-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[6px] border-t-[#0066FF] filter drop-shadow-[0_2px_4px_rgba(0,102,255,0.5)]" />

                    {/* Moving Glowing Photon Beads Traveling Along Fork */}
                    <div className="absolute top-2.5 left-[20%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse-glow-dot" />
                    <div className="absolute top-2.5 right-[20%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse-glow-dot" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* ---------------- 3 & 4. SERVICES & EVENT QUEUES ROW ---------------- */}
                  <div className="grid grid-cols-2 gap-3.5 w-full max-w-[410px]" style={{ transform: 'translateZ(22px)' }}>
                    
                    {/* Node 3: SERVICES */}
                    <div 
                      className={`bg-white/95 backdrop-blur-xl rounded-2xl p-3 border transition-all duration-300 flex items-center gap-2.5 group cursor-pointer shadow-md ${
                        activeTag === 'SCALABLE'
                          ? 'border-blue-500 shadow-blue-500/25 ring-2 ring-blue-400/30'
                          : 'border-blue-100 shadow-blue-500/5 hover:shadow-xl hover:border-[#0066FF]/40'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Server className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-black text-[11.5px] uppercase text-[#0B1938] block tracking-wide">
                          SERVICES
                        </span>
                        <span className="font-sans text-[10px] text-slate-500 font-medium block truncate">
                          Kubernetes • Docker
                        </span>
                      </div>
                    </div>

                    {/* Node 4: QUEUES */}
                    <div 
                      className={`bg-white/95 backdrop-blur-xl rounded-2xl p-3 border transition-all duration-300 flex items-center gap-2.5 group cursor-pointer shadow-md ${
                        activeTag === 'SCALABLE'
                          ? 'border-cyan-500 shadow-cyan-500/25 ring-2 ring-cyan-400/30'
                          : 'border-blue-100 shadow-blue-500/5 hover:shadow-xl hover:border-[#0066FF]/40'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-black text-[11.5px] uppercase text-[#0B1938] block tracking-wide">
                          EVENT QUEUES
                        </span>
                        <span className="font-sans text-[10px] text-slate-500 font-medium block truncate">
                          Kafka • Redis • BullMQ
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* ---------------- ARROW 3: CONVERGING FLOWING LASER TO DATABASE ---------------- */}
                  <div className="flex flex-col items-center relative h-8 w-12 justify-center overflow-visible">
                    {/* Base Conduit Wire */}
                    <div className="w-[3px] h-full bg-blue-100 rounded-full relative overflow-hidden">
                      <div className="absolute w-full h-4 bg-gradient-to-b from-transparent via-cyan-400 to-white shadow-[0_0_10px_#0066FF] animate-circuit-flow-fast rounded-full" />
                    </div>
                    
                    {/* Moving Laser Light Head */}
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-circuit-flow" />
                    
                    {/* Glowing Destination Arrowhead */}
                    <div className="absolute bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#0066FF] filter drop-shadow-[0_2px_4px_rgba(0,102,255,0.5)]" />
                  </div>

                  {/* ---------------- 5. 3D DISTRIBUTED DATA & VECTOR CLUSTER ---------------- */}
                  <div 
                    className="relative flex flex-col items-center w-full max-w-[310px] group cursor-pointer"
                    style={{ transform: 'translateZ(42px)' }}
                  >
                    
                    {/* Isometric 3D Layered Database Disks & Glowing Aura */}
                    <div className="flex items-center justify-center gap-3 mb-[-16px] relative z-20 transition-transform duration-300 group-hover:scale-105">
                      
                      {/* Left Cylinder */}
                      <div className="w-11 h-13 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_8px_12px_rgba(0,102,255,0.3)]">
                          <defs>
                            <linearGradient id="dbGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#38BDF8" />
                              <stop offset="100%" stopColor="#0066FF" />
                            </linearGradient>
                            <linearGradient id="dbTop1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#E0F2FE" />
                              <stop offset="100%" stopColor="#38BDF8" />
                            </linearGradient>
                          </defs>
                          <path d="M0,10 L0,34 A18,8 0 0,0 36,34 L36,10 A18,8 0 0,1 0,10" fill="url(#dbGrad1)" />
                          <path d="M0,18 A18,8 0 0,0 36,18" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <path d="M0,26 A18,8 0 0,0 36,26" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <ellipse cx="18" cy="10" rx="18" ry="8" fill="url(#dbTop1)" />
                        </svg>
                      </div>

                      {/* Center Cylinder (Primary Active Replica with Pulsing Core Light) */}
                      <div className="w-14 h-16 relative z-10">
                        <svg viewBox="0 0 44 52" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,102,255,0.45)]">
                          <defs>
                            <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0080FF" />
                              <stop offset="100%" stopColor="#0047BA" />
                            </linearGradient>
                            <linearGradient id="dbTop2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#F0F9FF" />
                              <stop offset="100%" stopColor="#38BDF8" />
                            </linearGradient>
                          </defs>
                          <path d="M0,12 L0,40 A22,10 0 0,0 44,40 L44,12 A22,10 0 0,1 0,12" fill="url(#dbGrad2)" />
                          <path d="M0,21 A22,10 0 0,0 44,21" fill="none" stroke="#E0F2FE" strokeWidth="1.5" opacity="0.9" />
                          <path d="M0,30 A22,10 0 0,0 44,30" fill="none" stroke="#E0F2FE" strokeWidth="1.5" opacity="0.9" />
                          <ellipse cx="22" cy="12" rx="22" ry="10" fill="url(#dbTop2)" />
                        </svg>
                        
                        {/* Live Activity Glowing Core */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399] animate-pulse" />
                      </div>

                      {/* Right Cylinder */}
                      <div className="w-11 h-13 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_8px_12px_rgba(0,102,255,0.3)]">
                          <path d="M0,10 L0,34 A18,8 0 0,0 36,34 L36,10 A18,8 0 0,1 0,10" fill="url(#dbGrad1)" />
                          <path d="M0,18 A18,8 0 0,0 36,18" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <path d="M0,26 A18,8 0 0,0 36,26" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <ellipse cx="18" cy="10" rx="18" ry="8" fill="url(#dbTop1)" />
                        </svg>
                      </div>

                    </div>

                    {/* Platform Base Card */}
                    <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl pt-7 pb-4 px-4 border border-blue-100 shadow-xl shadow-blue-500/10 text-center relative z-10 group-hover:border-[#0066FF]/50 transition-all">
                      <div className="flex items-center justify-center gap-2">
                        <Database className="w-4 h-4 text-[#0066FF]" />
                        <span className="font-display font-black text-xs uppercase text-[#0B1938] tracking-wide">
                          DISTRIBUTED DATA & VECTOR CORE
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-slate-500 font-medium block mt-1">
                        PostgreSQL • MongoDB • pgvector • Redis Cluster
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM 4-COLUMN BENTO PILLARS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-slate-200/80">
          {pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-3xl bg-white/80 hover:bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
            >
              {/* Luminous Top Glow Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Header: Giant Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-4xl sm:text-5xl text-slate-300 group-hover:text-[#0066FF] transition-colors tracking-tight">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-100 shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display font-black text-sm uppercase text-[#0B1938] tracking-tight leading-snug group-hover:text-[#0066FF] transition-colors">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
                  {item.desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Link */}
              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-extrabold text-[#0066FF] group-hover:text-blue-700 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
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
