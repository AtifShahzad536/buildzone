import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Quote,
  ShieldCheck 
} from 'lucide-react';
import { useGetCaseStudyBySlugQuery } from '../../services/api';
import { initialCaseStudies } from '../../data/caseStudies';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const CaseStudyDetails = () => {
  const { slug } = useParams();
  const { data: apiStudy, isLoading, isError, refetch } = useGetCaseStudyBySlugQuery(slug);

  const study = apiStudy || initialCaseStudies.find(c => c.slug === slug || c.id === slug);

  if (isLoading && !study) return <Loader text="Loading case study data..." fullScreen />;
  if (!study) return <ErrorState message="Case study not found." onRetry={refetch} />;

  return (
    <>
      <SEOHead
        title={`${study.title} | BuildZone`}
        description={study.challenge}
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="mb-8">
            <Link
              to="/case-studies"
              className="font-mono text-xs text-slate-400 hover:text-[#00F0FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Case Studies</span>
            </Link>
          </div>

          {/* Hero */}
          <div className="max-w-4xl space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                {study.industry}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-tight">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 border-b border-slate-800 pb-6">
              <span>Client: <strong className="text-white">{study.client}</strong></span>
              <span>•</span>
              <span>Location: <strong className="text-white">{study.location}</strong></span>
              <span>•</span>
              <span>Project Duration: <strong className="text-[#00F0FF]">{study.projectDuration}</strong></span>
            </div>
          </div>

          {/* Full-width Hero Visual */}
          <div className="aspect-[21/9] w-full overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 mb-16 shadow-2xl">
            <img
              src={study.heroImage}
              alt={study.title || "Client case study visual"}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quantified Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {study.results?.map((res, i) => (
              <div key={i} className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl text-center hover:border-[#00F0FF]/40 transition-all duration-300">
                <div className="font-display font-black text-2xl sm:text-4xl text-[#00F0FF] mb-1">
                  {res.metric}
                </div>
                <div className="font-mono text-xs text-slate-400 uppercase font-semibold">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
              <h2 className="text-xl font-bold font-display uppercase text-white">
                The Architectural Challenge
              </h2>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {study.challenge}
              </p>
            </div>

            <div className="p-8 bg-[#0B1528] border border-[#0066FF]/40 rounded-2xl shadow-xl space-y-4">
              <h2 className="text-xl font-bold font-display uppercase text-white">
                The Engineered Solution
              </h2>
              <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {study.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          {study.architecture && (
            <div className="p-8 sm:p-10 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl mb-20 space-y-4">
              <h2 className="font-display text-xl font-bold uppercase text-white">
                System Architecture & Data Flow
              </h2>
              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {study.architecture}
              </p>
            </div>
          )}

          {/* Client Testimonial Endorsement */}
          {study.testimonial && (
            <div className="max-w-4xl mx-auto p-8 sm:p-10 bg-[#0B1528] border border-[#0066FF]/30 rounded-2xl shadow-2xl mb-20 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
              <Quote className="w-8 h-8 text-[#00F0FF] opacity-80" />
              <p className="text-base sm:text-lg text-slate-200 italic font-sans leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <div className="pt-2 font-mono text-xs text-slate-400">
                <strong className="text-white font-bold">{study.testimonial.author}</strong> — {study.testimonial.role}, {study.client}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default CaseStudyDetails;
