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
import ScrollReveal from '../common/ScrollReveal';

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
    <section className="py-20 lg:py-28 bg-[#060B18] relative overflow-hidden selection:bg-blue-500/20 border-t border-slate-800/80">
      
      {/* Background Ambient Gradients */}
      <div className="absolute top-10 right-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/10 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        
        {/* TOP HERO ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headings, Live Subtitle, Mode Switcher & Telemetry Card */}
          <ScrollReveal animation="fade-right" duration={0.7} className="lg:col-span-6 space-y-6">
            
            {/* Live Status Cyber Badge with Scanning Beam */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#0066FF]/40 bg-[#0066FF]/15 backdrop-blur-md shadow-xs shadow-blue-500/20 relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-badge-shine pointer-events-none" />
              
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]" />
              </span>
              
              <span className="font-sans text-[11px] font-extrabold text-[#00F0FF] uppercase tracking-wider">
                WHY BUILDZONE • SIALKOT'S BEST SOFTWARE AGENCY
              </span>
            </div>

            {/* Giant Kinetic Heading */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-black font-display uppercase tracking-tight text-white leading-[1.06]">
                THE ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#38BDF8] animate-text-shimmer inline-block drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                  ADVANTAGE
                </span>
              </h2>
            </div>

            {/* Dynamic Live Rotating Subtitle */}
            <div className="h-16 flex flex-col justify-center border-l-2 border-[#0066FF] pl-4 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-tight tracking-tight">
                {dynamicSubtitles[activeFeatureIdx].title}
              </h3>
              <p className="text-sm font-sans font-medium text-[#00F0FF]">
                {dynamicSubtitles[activeFeatureIdx].sub}
              </p>
            </div>

            {/* Body Description */}
            <p className="text-sm sm:text-[15px] text-slate-300 font-sans leading-relaxed max-w-lg">
              As the premier software agency in Sialkot, we don't just write code. We engineer mission-critical, enterprise-grade systems with fault-tolerant cloud architecture, bank-grade zero-trust security, and high-velocity agile delivery.
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
                      type="button"
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        isActive 
                          ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-lg shadow-blue-500/30 scale-[1.02]' 
                          : 'bg-[#0B1528] text-slate-300 border-slate-800 hover:border-[#0066FF]/60 hover:bg-[#111E38]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#00F0FF]'}`} />
                      <span className="font-sans text-[11px] tracking-tight truncate">{key}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Architecture Mode Live Telemetry Card */}
            <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 shadow-xl backdrop-blur-sm space-y-3 transition-all duration-300">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                    <h4 className="font-display font-black text-sm text-white tracking-tight">
                      {currentMode.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {currentMode.subtitle}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display font-black text-sm sm:text-base text-[#00F0FF] block">
                    {currentMode.metric}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans block">
                    {currentMode.metricSub}
                  </span>
                </div>
              </div>

              {/* Badges / Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800">
                {currentMode.chips.map((chip, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#070E1C] text-[10.5px] font-sans font-semibold text-slate-300 border border-slate-800"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00F0FF]" />
                    {chip}
                  </span>
                ))}
              </div>

              {/* Latency & Uptime Benchmarks */}
              <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400 bg-[#070E1C] px-2.5 py-1.5 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">P99 Latency:</span>
                  <span className="text-emerald-400 font-bold">
                    {currentMode.latency}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">SLO Uptime:</span>
                  <span className="text-[#00F0FF] font-bold">
                    {currentMode.uptime}
                  </span>
                </div>
              </div>

            </div>

          </ScrollReveal>

          {/* RIGHT COLUMN: 3D Animated Concentric Gyroscope Rings & Live Flowing Electric Lights */}
          <ScrollReveal animation="zoom-in" delay={0.2} duration={0.8} className="lg:col-span-6 relative flex items-center justify-center">
            
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
                
                {/* 3D ANIMATED CONCENTRIC HOLOGRAPHIC RINGS SYSTEM */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d">
                  
                  {/* Outer Orbit Ring 1 */}
                  <div className="w-[500px] h-[500px] rounded-full border-2 border-dashed border-blue-500/25 absolute animate-spin-slow flex items-center justify-center">
                    {/* Glowing Satellite 1 */}
                    <div className="absolute top-0 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0066FF] shadow-[0_0_14px_#0066FF] animate-pulse" />
                      <div className="w-6 h-6 rounded-full border border-cyan-400/50 absolute animate-ping" />
                    </div>
                    {/* Glowing Satellite 2 */}
                    <div className="absolute bottom-0 translate-y-1/2 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    </div>
                    {/* Glowing Satellite 3 */}
                    <div className="absolute right-0 translate-x-1/2 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366F1]" />
                    </div>
                  </div>

                  {/* Middle Tech Ring 2 */}
                  <div className="w-[410px] h-[410px] rounded-full border border-cyan-400/25 border-t-transparent border-b-transparent absolute animate-spin-reverse-slow shadow-[0_0_30px_rgba(0,102,255,0.15)]">
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  </div>

                  {/* Radar Sweep Scanner */}
                  <div 
                    className="w-[380px] h-[380px] rounded-full absolute animate-radar-sweep pointer-events-none opacity-40"
                    style={{
                      background: 'conic-gradient(from 0deg at 50% 50%, rgba(0, 240, 255, 0.25) 0deg, rgba(0, 102, 255, 0.1) 60deg, transparent 120deg)'
                    }}
                  />

                  {/* Floating Telemetry Pill Top Right */}
                  <div 
                    className="absolute top-0 right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1528]/95 backdrop-blur-md border border-slate-700 shadow-xl text-[10.5px] font-bold text-[#00F0FF] animate-float-3d"
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
                    className="absolute bottom-16 -left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1528]/95 backdrop-blur-md border border-slate-700 shadow-xl text-[10.5px] font-bold text-slate-300 animate-float-3d"
                    style={{ transform: 'translateZ(40px)', animationDelay: '1.8s' }}
                  >
                    <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                    <span>Auto-Mesh: Active</span>
                  </div>
                </div>

                {/* VERTICAL ARCHITECTURE FLOW NODES */}
                <div className="flex flex-col items-center space-y-3.5 relative z-10 preserve-3d">
                  
                  {/* 1. CLIENT APPS NODE */}
                  <div 
                    className="w-[240px] bg-[#0B1528]/95 backdrop-blur-xl rounded-2xl p-3.5 border border-slate-700/90 shadow-2xl hover:border-[#0066FF] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 group cursor-pointer relative"
                    style={{ transform: 'translateZ(36px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/60 to-blue-700/60 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 transition-all shadow-xs">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xs uppercase text-white block tracking-wide">
                          CLIENT APPS
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <span className="font-sans text-[11px] text-slate-400 font-medium block truncate">
                        Next.js • React • iOS • Android
                      </span>
                    </div>
                    {/* Top Glow Highlight */}
                    <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* ARROW 1: BEAM */}
                  <div className="flex flex-col items-center relative h-8 w-12 justify-center overflow-visible">
                    <div className="w-[3px] h-full bg-slate-800 rounded-full relative overflow-hidden">
                      <div className="absolute w-full h-4 bg-gradient-to-b from-transparent via-cyan-400 to-white shadow-[0_0_10px_#0066FF] animate-circuit-flow rounded-full" />
                    </div>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-circuit-flow-fast" />
                    <div className="absolute bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#00F0FF] filter drop-shadow-[0_2px_4px_rgba(0,240,255,0.5)]" />
                  </div>

                  {/* 2. API GATEWAY NODE */}
                  <div 
                    className={`w-[275px] bg-[#0B1528]/95 backdrop-blur-xl rounded-2xl p-3.5 border transition-all duration-300 flex items-center gap-3.5 group cursor-pointer relative shadow-2xl ${
                      activeTag === 'SECURE' 
                        ? 'border-emerald-400 shadow-emerald-500/30 ring-2 ring-emerald-400/40' 
                        : 'border-slate-700/90 shadow-blue-500/10 hover:shadow-2xl hover:border-[#0066FF] hover:-translate-y-1'
                    }`}
                    style={{ transform: 'translateZ(28px)' }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900/60 to-blue-700/60 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white group-hover:scale-110 transition-all shadow-xs">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-xs uppercase text-white block tracking-wide">
                          API GATEWAY & MESH
                        </span>
                        <span className="text-[9.5px] font-extrabold px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-[#00F0FF] border border-[#0066FF]/40">
                          v3.2
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-slate-400 font-medium block truncate">
                        GraphQL • REST • gRPC • WebSockets
                      </span>
                    </div>
                  </div>

                  {/* ARROW 2 */}
                  <div className="w-[320px] h-8 relative overflow-visible">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-2.5 bg-slate-800 overflow-hidden">
                      <div className="w-full h-full bg-[#0066FF] animate-circuit-flow-fast" />
                    </div>
                    <div className="absolute top-2.5 left-[20%] right-[20%] h-[3px] bg-slate-800 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-[#0066FF] to-cyan-400 animate-pulse" />
                    </div>
                    <div className="absolute top-2.5 left-[20%] w-[3px] h-5 bg-slate-800 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-white animate-circuit-flow" />
                    </div>
                    <div className="absolute top-[30px] left-[20%] -translate-x-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[6px] border-t-[#00F0FF] filter drop-shadow-[0_2px_4px_rgba(0,240,255,0.5)]" />
                    
                    <div className="absolute top-2.5 right-[20%] w-[3px] h-5 bg-slate-800 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-white animate-circuit-flow" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <div className="absolute top-[30px] right-[20%] -translate-x-[3px] w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[6px] border-t-[#00F0FF] filter drop-shadow-[0_2px_4px_rgba(0,240,255,0.5)]" />

                    <div className="absolute top-2.5 left-[20%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse-glow-dot" />
                    <div className="absolute top-2.5 right-[20%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-pulse-glow-dot" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* 3 & 4. SERVICES & QUEUES ROW */}
                  <div className="grid grid-cols-2 gap-3.5 w-full max-w-[410px]" style={{ transform: 'translateZ(22px)' }}>
                    
                    {/* Node 3 */}
                    <div 
                      className={`bg-[#0B1528]/95 backdrop-blur-xl rounded-2xl p-3 border transition-all duration-300 flex items-center gap-2.5 group cursor-pointer shadow-xl ${
                        activeTag === 'SCALABLE'
                          ? 'border-[#0066FF] shadow-blue-500/30 ring-2 ring-[#0066FF]/40'
                          : 'border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#0066FF]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Server className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-black text-[11.5px] uppercase text-white block tracking-wide">
                          SERVICES
                        </span>
                        <span className="font-sans text-[10px] text-slate-400 font-medium block truncate">
                          Kubernetes • Docker
                        </span>
                      </div>
                    </div>

                    {/* Node 4 */}
                    <div 
                      className={`bg-[#0B1528]/95 backdrop-blur-xl rounded-2xl p-3 border transition-all duration-300 flex items-center gap-2.5 group cursor-pointer shadow-xl ${
                        activeTag === 'SCALABLE'
                          ? 'border-cyan-400 shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                          : 'border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#0066FF]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-[#00F0FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="font-display font-black text-[11.5px] uppercase text-white block tracking-wide">
                          EVENT QUEUES
                        </span>
                        <span className="font-sans text-[10px] text-slate-400 font-medium block truncate">
                          Kafka • Redis • BullMQ
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* ARROW 3 */}
                  <div className="flex flex-col items-center relative h-8 w-12 justify-center overflow-visible">
                    <div className="w-[3px] h-full bg-slate-800 rounded-full relative overflow-hidden">
                      <div className="absolute w-full h-4 bg-gradient-to-b from-transparent via-cyan-400 to-white shadow-[0_0_10px_#0066FF] animate-circuit-flow-fast rounded-full" />
                    </div>
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38BDF8] animate-circuit-flow" />
                    <div className="absolute bottom-0 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-[#00F0FF] filter drop-shadow-[0_2px_4px_rgba(0,240,255,0.5)]" />
                  </div>

                  {/* 5. 3D DISTRIBUTED DATA & VECTOR CLUSTER */}
                  <div 
                    className="relative flex flex-col items-center w-full max-w-[310px] group cursor-pointer"
                    style={{ transform: 'translateZ(42px)' }}
                  >
                    
                    {/* Isometric Database Disks */}
                    <div className="flex items-center justify-center gap-3 mb-[-16px] relative z-20 transition-transform duration-300 group-hover:scale-105">
                      
                      {/* Left Cylinder */}
                      <div className="w-11 h-13 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,240,255,0.4)]">
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

                      {/* Center Cylinder */}
                      <div className="w-14 h-16 relative z-10">
                        <svg viewBox="0 0 44 52" className="w-full h-full filter drop-shadow-[0_10px_24px_rgba(0,102,255,0.6)]">
                          <defs>
                            <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#00F0FF" />
                              <stop offset="100%" stopColor="#0052CC" />
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
                        
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399] animate-pulse" />
                      </div>

                      {/* Right Cylinder */}
                      <div className="w-11 h-13 relative">
                        <svg viewBox="0 0 36 44" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,240,255,0.4)]">
                          <path d="M0,10 L0,34 A18,8 0 0,0 36,34 L36,10 A18,8 0 0,1 0,10" fill="url(#dbGrad1)" />
                          <path d="M0,18 A18,8 0 0,0 36,18" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <path d="M0,26 A18,8 0 0,0 36,26" fill="none" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.85" />
                          <ellipse cx="18" cy="10" rx="18" ry="8" fill="url(#dbTop1)" />
                        </svg>
                      </div>

                    </div>

                    {/* Platform Base Card */}
                    <div className="w-full bg-[#0B1528]/95 backdrop-blur-xl rounded-2xl pt-7 pb-4 px-4 border border-slate-700 shadow-2xl text-center relative z-10 group-hover:border-[#0066FF] transition-all">
                      <div className="flex items-center justify-center gap-2">
                        <Database className="w-4 h-4 text-[#00F0FF]" />
                        <span className="font-display font-black text-xs uppercase text-white tracking-wide">
                          DISTRIBUTED DATA & VECTOR CORE
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-slate-400 font-medium block mt-1">
                        PostgreSQL • MongoDB • pgvector • Redis Cluster
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>

        {/* ================= BOTTOM 4-COLUMN BENTO PILLARS GRID ================= */}
        <ScrollReveal animation="fade-up" delay={0.2} stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-slate-800/80">
          {pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-3xl bg-[#0B1528] hover:bg-[#111E38] border border-slate-800 hover:border-[#0066FF]/60 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden backdrop-blur-md"
            >
              {/* Luminous Top Glow Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4">
                {/* Header: Giant Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-4xl sm:text-5xl text-slate-700 group-hover:text-[#00F0FF] transition-colors tracking-tight">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#0066FF]/15 text-[#00F0FF] border border-[#0066FF]/40 shadow-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display font-black text-sm uppercase text-white tracking-tight leading-snug group-hover:text-[#00F0FF] transition-colors">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-400 font-sans leading-relaxed">
                  {item.desc}
                </p>

                {/* Feature Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Link */}
              <div className="pt-5 mt-4 border-t border-slate-800">
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-extrabold text-[#00F0FF] group-hover:text-cyan-300 transition-colors"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </Link>
              </div>

            </div>
          ))}
        </ScrollReveal>

      </Container>
    </section>
  );
};

export default WhyChooseUs;
