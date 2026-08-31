import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  BrainCircuit, 
  Sparkles, 
  Workflow, 
  Database, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import Badge from '../common/Badge';

const aiCapabilities = [
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    desc: "Custom multi-agent workflows with tool-calling capabilities that handle customer support, data extraction, and business ops autonomously.",
  },
  {
    icon: Database,
    title: "Enterprise RAG & Vector Pipelines",
    desc: "Domain-specific semantic search systems connected to internal company documents using pgvector, Pinecone, and hybrid BM25.",
  },
  {
    icon: BrainCircuit,
    title: "Custom Fine-Tuned Models",
    desc: "Specialized open-weight LLMs (Llama 3, Mistral) fine-tuned for high accuracy on company proprietary datasets.",
  },
  {
    icon: Workflow,
    title: "Intelligent Workflow Automation",
    desc: "Connecting CRM, ERP, email, and databases with automated n8n, LangChain, and LangGraph workflow orchestration.",
  },
];

export const AISection = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="cyan" size="md" icon={<Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />}>
              Next-Generation Intelligence
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
              APPLIED AI & AUTOMATION ENGINEERING
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We go beyond simple API wrappers. We architect custom LLM pipelines, autonomous reasoning agents, and private vector infrastructure that transform complex manual workflows into automated operational efficiency.
            </p>

            <ul className="space-y-3 font-mono text-xs sm:text-sm text-slate-700">
              {[
                'Private on-premise & cloud vector databases',
                'Multi-model LLM routing (Claude, OpenAI, Gemini, Llama)',
                'Automated safety guardrails & evaluation benchmarks',
                'Full data privacy & zero third-party training',
              ].map((point, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link to="/ai-development">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore AI Capabilities
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Capability Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-md"
                >
                  <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-base uppercase text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AISection;
