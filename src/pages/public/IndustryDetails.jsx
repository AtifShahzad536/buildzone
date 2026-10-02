import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { useGetIndustryBySlugQuery } from '../../services/api';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const IndustryDetails = () => {
  const { slug } = useParams();
  const { data: apiIndustry, isLoading, isError, refetch } = useGetIndustryBySlugQuery(slug);

  const industry = apiIndustry || initialIndustries.find(i => i.slug === slug || i.id === slug);

  if (isLoading && !industry) return <Loader text="Loading industry solutions..." fullScreen />;
  if (!industry) return <ErrorState message="Industry sector not found." onRetry={refetch} />;

  return (
    <>
      <SEOHead
        title={`${industry.name} Solutions | BuildZone`}
        description={industry.shortDescription}
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="mb-8">
            <Link
              to="/industries"
              className="font-mono text-xs text-slate-400 hover:text-[#00F0FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Industries</span>
            </Link>
          </div>

          {/* Hero */}
          <div className="max-w-4xl space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                SECTOR ARCHITECTURE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-tight">
              {industry.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {industry.heroDescription || industry.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link to="/start-project">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Consult Sector Architect
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="secondary" size="md">
                  View Sector Case Studies
                </Button>
              </Link>
            </div>
          </div>

          {/* Pain Points vs Engineered Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Common Industry Problems */}
            <div className="p-8 bg-[#0B1528] border border-rose-900/50 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-rose-900/30 pb-4">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
                <h2 className="font-display text-xl font-bold uppercase text-rose-300">
                  Common Sector Bottlenecks
                </h2>
              </div>

              <ul className="space-y-3.5">
                {industry.commonProblems?.map((prob, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-sans leading-relaxed">
                    <span className="text-rose-400 font-bold font-mono">✕</span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BuildZone Engineered Solutions */}
            <div className="p-8 bg-[#0B1528] border border-[#0066FF]/40 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-[#0066FF]/20 pb-4">
                <CheckCircle2 className="w-6 h-6 text-[#00F0FF]" />
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  BuildZone Architectural Solutions
                </h2>
              </div>

              <ul className="space-y-3.5">
                {industry.solutions?.map((sol, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-sans leading-relaxed">
                    <span className="text-[#00F0FF] font-bold font-mono">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core System Features for this Sector */}
          {industry.features && (
            <div className="mb-20">
              <SectionTitle
                badge="Specialized Capabilities"
                title={`Engineered Features for ${industry.name}`}
                subtitle="High-impact technical features we regularly build into products in this sector."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {industry.features.map((feat, idx) => (
                  <div key={idx} className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-2 hover:border-[#00F0FF]/40 transition-all duration-300">
                    <span className="font-mono text-xs text-[#00F0FF] font-bold uppercase block">
                      Feature #{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-base uppercase text-white">{feat}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sector Tech Stack */}
          {industry.techStack && (
            <div className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-6 mb-20">
              <h2 className="font-display text-xl font-bold uppercase text-white border-b border-slate-800 pb-4">
                Compliant Technology Stack for {industry.name}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {industry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#070E1C] border border-slate-800 rounded-xl font-mono text-xs text-[#00F0FF] font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default IndustryDetails;
