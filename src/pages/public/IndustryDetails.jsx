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
  const { data: industry, isLoading, isError, refetch } = useGetIndustryBySlugQuery(slug);

  if (isLoading) return <Loader text="Loading industry solutions..." fullScreen />;
  if (isError || !industry) return <ErrorState message="Industry sector not found." onRetry={refetch} />;

  return (
    <>
      <SEOHead
        title={`${industry.name} — Industry Solutions`}
        description={industry.shortDescription}
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="mb-8">
            <Link
              to="/industries"
              className="font-mono text-xs text-slate-500 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Industries</span>
            </Link>
          </div>

          {/* Hero */}
          <div className="max-w-4xl space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                SECTOR ARCHITECTURE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
              {industry.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              {industry.heroDescription || industry.shortDescription}
            </p>

            <div className="pt-2 flex flex-row items-center gap-3">
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
            <div className="p-8 bg-white border border-rose-200 rounded-lg shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-rose-100 pb-4">
                <ShieldAlert className="w-6 h-6 text-rose-600" />
                <h3 className="font-display text-xl font-bold uppercase text-rose-900">
                  Common Sector Bottlenecks
                </h3>
              </div>

              <ul className="space-y-3">
                {industry.commonProblems?.map((prob, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-sans leading-relaxed">
                    <span className="text-rose-600 font-bold font-mono">✕</span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BuildZone Engineered Solutions */}
            <div className="p-8 bg-white border border-blue-200 rounded-lg shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                <CheckCircle2 className="w-6 h-6 text-[#0066FF]" />
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                  BuildZone Architectural Solutions
                </h3>
              </div>

              <ul className="space-y-3">
                {industry.solutions?.map((sol, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-sans leading-relaxed">
                    <span className="text-[#0066FF] font-bold font-mono">✓</span>
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
                  <div key={idx} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-2">
                    <span className="font-mono text-xs text-[#0066FF] font-bold uppercase block">
                      Feature #{idx + 1}
                    </span>
                    <h4 className="font-display font-bold text-base uppercase text-[#0B1938]">{feat}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sector Tech Stack */}
          {industry.techStack && (
            <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6 mb-20">
              <h3 className="font-display text-xl font-bold uppercase text-[#0B1938] border-b border-slate-100 pb-4">
                Compliant Technology Stack for {industry.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {industry.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-slate-100 border border-slate-200 rounded font-mono text-xs text-slate-800 font-bold uppercase"
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
