import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  BrainCircuit, 
  Sparkles, 
  Workflow, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const AIDevelopment = () => {
  return (
    <>
      <SEOHead
        title="Custom AI Development & Autonomous Agent Engineering"
        description="Enterprise LLM applications, custom RAG vector search, fine-tuned open-source models, and automated AI workflows."
      />

      <div className="py-12 sm:py-20">
        <Container>
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENTERPRISE MACHINE LEARNING
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-6 leading-tight">
              APPLIED AI & AGENT SYSTEMS
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              We design, fine-tune, and deploy custom artificial intelligence architectures that solve complex business operations with precision, compliance, and zero data leakage.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              {
                icon: Bot,
                title: "Autonomous Multi-Agent Pods",
                desc: "Reasoning agents that connect to external APIs, databases, CRMs, and email to execute multi-step business workflows autonomously.",
                features: ["LangGraph & CrewAI architectures", "Tool-use & code execution sandboxes", "Human-in-the-loop oversight dashboards"]
              },
              {
                icon: Database,
                title: "Enterprise RAG & Knowledge Engines",
                desc: "Semantic vector search connected directly to your proprietary enterprise databases, PDFs, Notion, and Google Drive.",
                features: ["Hybrid dense & sparse BM25 retrieval", "pgvector, Pinecone & Qdrant clustering", "Sub-200ms document generation"]
              },
              {
                icon: BrainCircuit,
                title: "Custom Model Fine-Tuning",
                desc: "Fine-tuning open-weight foundation models (Llama 3, Mistral, Qwen) on your company domain for 10x lower latency and cost.",
                features: ["LoRA / QLoRA parameter-efficient tuning", "On-premise air-gapped GPU deployment", "Automated evaluation benchmarking"]
              },
              {
                icon: Workflow,
                title: "Intelligent Process Automations",
                desc: "Automating repetitive data entry, customer ticket routing, invoice processing, and financial reconciliations.",
                features: ["n8n & Zapier enterprise workflows", "OCR document extraction pipelines", "Continuous audit logs and alerting"]
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-8 bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg shadow-sm hover:shadow-md transition-all space-y-6"
                >
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938]">
                    {pillar.title}
                  </h2>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {pillar.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 font-mono text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Security & Data Privacy Assurances */}
          <div className="p-8 sm:p-12 bg-white border border-slate-200 rounded-lg shadow-sm mb-20 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                Enterprise AI Data Protection Guarantee
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-slate-700">
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded">
                <span className="font-bold text-[#0B1938] block mb-1">Zero 3rd-Party Training</span>
                Your corporate data is never sent to train public foundation models or shared with third parties.
              </div>
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded">
                <span className="font-bold text-[#0B1938] block mb-1">Private VPC & On-Premise</span>
                We deploy all vector databases and inference engines inside your own dedicated cloud VPC or hardware.
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border border-blue-200/80 rounded-2xl text-center space-y-6 max-w-4xl mx-auto shadow-md">
            <h2 className="text-2xl sm:text-4xl font-black font-display uppercase text-[#0B1938]">
              Ready to Deploy AI Into Your Product?
            </h2>
            <p className="text-slate-600 font-sans text-sm max-w-xl mx-auto">
              Schedule a 45-minute AI discovery call. We'll assess your data readiness and build a proof-of-concept roadmap.
            </p>
            <div className="flex flex-row items-center justify-center gap-3">
              <Link to="/start-project">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start AI Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="md">
                  Book AI Session
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AIDevelopment;
