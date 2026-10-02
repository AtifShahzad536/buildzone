import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Cpu, 
  Layers, 
  ShoppingBag, 
  Palette, 
  Cloud,
  CheckCircle2,
  Terminal,
  Sparkles,
  Zap,
  Activity,
  Server,
  ShieldCheck,
  Code2,
  Database,
  ArrowRight,
  Play,
  Copy,
  Check
} from 'lucide-react';

/**
 * ServiceHeroVisual - High-tech, interactive custom visuals tailored for each service type.
 */
export const ServiceHeroVisual = ({ slug = '', title = '', category = '' }) => {
  const normalizedSlug = (slug || '').toLowerCase();

  // 1. Web Development Visual (Interactive IDE & Live Browser Preview)
  if (normalizedSlug.includes('web')) {
    return <WebDevVisual />;
  }

  // 2. Mobile App Development Visual (3D Dual Device Smartphone Mockup)
  if (normalizedSlug.includes('mobile')) {
    return <MobileDevVisual />;
  }

  // 3. AI & Intelligent Automation Visual (RAG & Multi-Agent Neural Graph)
  if (normalizedSlug.includes('ai')) {
    return <AIDevVisual />;
  }

  // 4. Custom Software & Enterprise ERP Visual (Cluster & ERP Matrix)
  if (normalizedSlug.includes('custom') || normalizedSlug.includes('software')) {
    return <CustomSoftwareVisual />;
  }

  // 5. SaaS Product Architecture Visual (Multi-Tenant & Stripe Billing)
  if (normalizedSlug.includes('saas')) {
    return <SaaSVisual />;
  }

  // 6. E-Commerce Systems Visual (Headless Store & Sub-50ms Checkout)
  if (normalizedSlug.includes('commerce') || normalizedSlug.includes('shop')) {
    return <ECommerceVisual />;
  }

  // 7. UI/UX & Product Design Visual (Figma Canvas & Design Tokens)
  if (normalizedSlug.includes('design') || normalizedSlug.includes('ui') || normalizedSlug.includes('ux')) {
    return <UIUXVisual />;
  }

  // 8. Cloud & DevOps Visual (Kubernetes Cluster & CI/CD Pipeline)
  if (normalizedSlug.includes('cloud') || normalizedSlug.includes('devops')) {
    return <CloudDevOpsVisual />;
  }

  // Fallback Enterprise Visual
  return <GenericServiceVisual title={title} category={category} />;
};

/* =========================================================================
   1. WEB DEVELOPMENT VISUAL (Code Editor + Live Web Preview Terminal)
   ========================================================================= */
const WebDevVisual = () => {
  const [activeTab, setActiveTab] = useState('app');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    app: `// Enterprise React 19 + Next.js 15
export default async function Page() {
  const platform = await getEnterpriseCore();
  return (
    <CloudEngine edgeCache="global">
      <Telemetry latency="24ms" status="healthy" />
      <Architecture type="MicroFrontend" />
    </CloudEngine>
  );
}`,
    api: `// Edge API Route (Sub-30ms Global TTFB)
export async function GET(req: Request) {
  const session = await auth.verifyRBAC(req);
  const data = await redis.cacheOrQuery('core:v2', {
    ttl: 300,
    tags: ['enterprise', 'high-concurrency']
  });
  return Response.json({ success: true, latency: '18ms' });
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Ambient Cyber Backlight */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#0066FF]/30 via-[#00F0FF]/20 to-blue-600/30 rounded-3xl blur-2xl opacity-60 animate-pulse pointer-events-none" />

      {/* Main Code Terminal Frame */}
      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Terminal Titlebar */}
        <div className="bg-[#0B1528] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-xs text-slate-400 font-semibold ml-2 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>buildzone-web-engine</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase transition-all ${
                activeTab === 'app' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              App.tsx
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase transition-all ${
                activeTab === 'api' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              edge-api.ts
            </button>
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 bg-[#060B18] overflow-x-auto leading-relaxed border-b border-slate-800/80">
          <pre className="text-[11.5px]">
            <code>
              {activeTab === 'app' ? (
                <>
                  <span className="text-slate-500">// Enterprise React 19 + Next.js 15</span>{'\n'}
                  <span className="text-purple-400">export default async function</span> <span className="text-[#00F0FF]">Page</span>() {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">const</span> platform = <span className="text-purple-400">await</span> <span className="text-amber-300">getEnterpriseCore</span>();{'\n'}
                  {'  '}<span className="text-purple-400">return</span> ({'\n'}
                  {'    '}&lt;<span className="text-[#00F0FF]">CloudEngine</span> <span className="text-sky-300">edgeCache</span>=<span className="text-emerald-300">"global"</span>&gt;{'\n'}
                  {'      '}&lt;<span className="text-[#00F0FF]">Telemetry</span> <span className="text-sky-300">latency</span>=<span className="text-emerald-300">"24ms"</span> <span className="text-sky-300">status</span>=<span className="text-emerald-300">"healthy"</span> /&gt;{'\n'}
                  {'      '}&lt;<span className="text-[#00F0FF]">Architecture</span> <span className="text-sky-300">type</span>=<span className="text-emerald-300">"MicroFrontend"</span> /&gt;{'\n'}
                  {'    '}&lt;/<span className="text-[#00F0FF]">CloudEngine</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </>
              ) : (
                <>
                  <span className="text-slate-500">// Edge API Route (Sub-30ms Global TTFB)</span>{'\n'}
                  <span className="text-purple-400">export async function</span> <span className="text-[#00F0FF]">GET</span>(req: <span className="text-amber-300">Request</span>) {'{'}{'\n'}
                  {'  '}<span className="text-purple-400">const</span> session = <span className="text-purple-400">await</span> auth.<span className="text-amber-300">verifyRBAC</span>(req);{'\n'}
                  {'  '}<span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> redis.<span className="text-amber-300">cacheOrQuery</span>(<span className="text-emerald-300">'core:v2'</span>, {'{'}{'\n'}
                  {'    '}ttl: <span className="text-emerald-300">300</span>,{'\n'}
                  {'    '}tags: [<span className="text-emerald-300">'enterprise'</span>, <span className="text-emerald-300">'high-concurrency'</span>]{'\n'}
                  {'  '}{'}'});{'\n'}
                  {'  '}<span className="text-purple-400">return</span> <span className="text-amber-300">Response</span>.json({'{'} success: <span className="text-purple-400">true</span>, latency: <span className="text-emerald-300">'18ms'</span> {'}'});{'\n'}
                  {'}'}
                </>
              )}
            </code>
          </pre>
        </div>

        {/* Live Runtime Telemetry Bar */}
        <div className="bg-[#0B1528] px-4 py-3 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100/100 Core Web Vitals</span>
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300">Next.js 15 SSR</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#00F0FF] font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>24ms Global TTFB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. MOBILE APP DEVELOPMENT VISUAL (3D Smartphone Mockup)
   ========================================================================= */
const MobileDevVisual = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#0066FF]/30 via-emerald-500/20 to-[#00F0FF]/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Smartphone Device Frame */}
      <div className="relative bg-[#070E1C] border-2 border-slate-700/80 rounded-[36px] shadow-2xl p-3 overflow-hidden backdrop-blur-xl">
        {/* Dynamic Island / Speaker Notch */}
        <div className="w-24 h-4 bg-slate-900 border border-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-slate-700/80 mr-1.5"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></span>
        </div>

        {/* Live Screen Content */}
        <div className="bg-gradient-to-b from-[#0B1528] to-[#060B18] rounded-[26px] p-4 border border-slate-800 space-y-3.5">
          {/* Mobile Top Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0066FF] flex items-center justify-center text-white">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xs text-white">BuildZone Mobile</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold">
              60 FPS
            </span>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 block">Offline Cache</span>
              <span className="text-xs font-bold text-emerald-400">100% Synced</span>
            </div>
            <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 block">Biometrics</span>
              <span className="text-xs font-bold text-[#00F0FF]">FaceID Ready</span>
            </div>
          </div>

          {/* Simulated Activity Stream */}
          <div className="p-3 bg-[#070E1C] border border-slate-800/80 rounded-xl space-y-2">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">Live Telemetry</span>
            <div className="flex items-center justify-between text-xs text-slate-200 font-sans">
              <span>Cross-Platform Sync</span>
              <span className="font-mono text-emerald-400 text-[11px] font-bold">Active</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-[#0066FF] to-[#00F0FF] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Bottom Action Pill */}
          <div className="pt-1">
            <div className="w-full py-2 bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white rounded-xl text-center font-display text-xs font-bold shadow-md flex items-center justify-center gap-1.5">
              <span>Flutter & React Native Core</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. AI & INTELLIGENT AUTOMATION VISUAL (RAG Pipeline & Neural Graph)
   ========================================================================= */
const AIDevVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-[#00F0FF]/25 to-blue-600/30 rounded-3xl blur-2xl opacity-60 animate-pulse pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-[#00F0FF] flex items-center justify-center text-white shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Multi-Agent RAG Orchestrator</span>
              <span className="font-mono text-[10px] text-slate-400">Autonomous Reasoning Engine</span>
            </div>
          </div>

          <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
            <span>142 tok/sec</span>
          </span>
        </div>

        {/* Multi-Step Pipeline Visualizer */}
        <div className="grid grid-cols-3 gap-2 font-mono text-center">
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <Database className="w-4 h-4 text-[#00F0FF] mx-auto" />
            <span className="text-[10px] text-slate-400 block">Vector Store</span>
            <span className="text-[11px] font-bold text-white">Pinecone RAG</span>
          </div>
          <div className="p-3 bg-[#0B1528] border border-purple-500/40 rounded-xl space-y-1 shadow-sm shadow-purple-500/20">
            <Sparkles className="w-4 h-4 text-purple-400 mx-auto" />
            <span className="text-[10px] text-purple-300 block">Reasoning LLM</span>
            <span className="text-[11px] font-bold text-purple-200">Claude / GPT</span>
          </div>
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <Activity className="w-4 h-4 text-emerald-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block">Guardrails</span>
            <span className="text-[11px] font-bold text-emerald-300">Zero Leakage</span>
          </div>
        </div>

        {/* Live Vector Search Prompt Simulation */}
        <div className="p-3.5 bg-[#060B18] border border-slate-800/80 rounded-xl space-y-2 font-sans text-xs">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
            <span>Semantic Similarity Match</span>
            <span className="text-[#00F0FF] font-bold">98.6% Precision</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-mono text-[11px] bg-[#0F1D38] p-2.5 rounded-lg border border-slate-800">
            &gt; Query: "Extract quarterly EBITA & financial projections from Q3 report"<br />
            <span className="text-emerald-400">&gt; Match: Verified from 4 internal PDF vector embeddings with citation timestamps.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. CUSTOM SOFTWARE & ENTERPRISE ERP VISUAL
   ========================================================================= */
const CustomSoftwareVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-sky-400/20 to-indigo-600/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center text-white shadow-md">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Enterprise ERP & Core Engine</span>
              <span className="font-mono text-[10px] text-slate-400">Domain-Driven Microservices</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600/40 text-emerald-400 font-mono text-[10px] font-bold">
            99.999% SLA
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 block">Security Model</span>
            <span className="text-xs font-bold text-white">Granular RBAC + 2FA</span>
          </div>
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 block">Code Ownership</span>
            <span className="text-xs font-bold text-[#00F0FF]">100% Client IP</span>
          </div>
        </div>

        <div className="p-3.5 bg-[#0B1528] border border-slate-800 rounded-xl font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>Database Node Cluster</span>
            <span className="text-emerald-400 font-bold">PostgreSQL Active-Active</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
            <div className="w-full bg-gradient-to-r from-blue-500 to-[#00F0FF] h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. SAAS PRODUCT ARCHITECTURE VISUAL
   ========================================================================= */
const SaaSVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/30 via-[#0066FF]/20 to-sky-400/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Multi-Tenant SaaS Stack</span>
              <span className="font-mono text-[10px] text-slate-400">Automated Stripe Billing & Workspaces</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold rounded-full">
            $48.5K MRR
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-center">
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Tenants</span>
            <span className="text-xs font-bold text-white">1,420 Active</span>
          </div>
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Churn Rate</span>
            <span className="text-xs font-bold text-emerald-400">&lt; 0.8%</span>
          </div>
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Provisioning</span>
            <span className="text-xs font-bold text-[#00F0FF]">Instant</span>
          </div>
        </div>

        <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Stripe Webhooks & Metering</span>
          <span className="text-emerald-400 font-bold">Live Synced</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. E-COMMERCE SYSTEMS VISUAL
   ========================================================================= */
const ECommerceVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-[#0066FF]/20 to-emerald-500/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Headless E-Commerce Core</span>
              <span className="font-mono text-[10px] text-slate-400">Sub-50ms Catalog & 1-Click Pay</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold rounded-full">
            99.98% Conversion
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 block">Catalog Search</span>
            <span className="text-xs font-bold text-[#00F0FF]">Algolia &lt; 20ms</span>
          </div>
          <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 block">Payment Funnel</span>
            <span className="text-xs font-bold text-emerald-400">Apple Pay / Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   7. UI/UX PRODUCT DESIGN VISUAL
   ========================================================================= */
const UIUXVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-[#00F0FF]/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white shadow-md">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Design System & Prototypes</span>
              <span className="font-mono text-[10px] text-slate-400">Atomic Figma Architecture</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-pink-950/80 border border-pink-500/40 text-pink-300 font-mono text-[10px] font-bold rounded-full">
            WCAG AAA Accessible
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-center">
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Design Tokens</span>
            <span className="text-xs font-bold text-white">400+ Ready</span>
          </div>
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Responsive</span>
            <span className="text-xs font-bold text-[#00F0FF]">Auto-Layout</span>
          </div>
          <div className="p-2.5 bg-[#0B1528] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Prototypes</span>
            <span className="text-xs font-bold text-emerald-400">Interactive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   8. CLOUD & DEVOPS VISUAL
   ========================================================================= */
const CloudDevOpsVisual = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-sky-400/20 to-teal-500/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div className="relative bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-md">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block leading-tight">Kubernetes & CI/CD Pipeline</span>
              <span className="font-mono text-[10px] text-slate-400">AWS / GCP Terraform Automation</span>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-sky-950/80 border border-sky-500/40 text-sky-300 font-mono text-[10px] font-bold rounded-full">
            Zero Downtime
          </span>
        </div>

        <div className="p-3 bg-[#0B1528] border border-slate-800 rounded-xl space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>Continuous Deployment Stages</span>
            <span className="text-emerald-400 font-bold">Passed (42s)</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
            <span className="py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded font-bold">Lint</span>
            <span className="py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded font-bold">Test</span>
            <span className="py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded font-bold">Docker</span>
            <span className="py-1 bg-[#0066FF] text-white rounded font-bold animate-pulse">K8s Deploy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   GENERIC FALLBACK VISUAL
   ========================================================================= */
const GenericServiceVisual = ({ title, category }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-2 bg-gradient-to-r from-[#0066FF]/30 to-[#00F0FF]/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
      <div className="relative p-6 bg-[#070E1C] border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#0066FF] flex items-center justify-center text-white mx-auto shadow-md">
          <Zap className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-display font-black text-lg text-white uppercase">{title}</h3>
          <p className="font-mono text-xs text-[#00F0FF]">{category} Architecture</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeroVisual;
