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
        title={`${study.title} — Case Study`}
        description={study.challenge}
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="mb-8">
            <Link
              to="/case-studies"
              className="font-mono text-xs text-slate-500 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Case Studies</span>
            </Link>
          </div>

          {/* Hero */}
          <div className="max-w-4xl space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                {study.industry}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
              {study.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500 border-b border-slate-200 pb-6">
              <span>Client: <strong className="text-[#0B1938]">{study.client}</strong></span>
              <span>•</span>
              <span>Location: <strong className="text-[#0B1938]">{study.location}</strong></span>
              <span>•</span>
              <span>Project Duration: <strong className="text-[#0B1938]">{study.projectDuration}</strong></span>
            </div>
          </div>

          {/* Full-width Hero Visual */}
          <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 rounded-lg border border-slate-200 mb-16">
            <img
              src={study.heroImage}
              alt={study.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quantified Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {study.results?.map((res, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm text-center">
                <div className="font-display font-black text-2xl sm:text-4xl text-[#0066FF] mb-1">
                  {res.metric}
                </div>
                <div className="font-mono text-xs text-slate-500 uppercase font-semibold">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                The Architectural Challenge
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {study.challenge}
              </p>
            </div>

            <div className="p-8 bg-white border border-blue-200 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                The Engineered Solution
              </h2>
              <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {study.solution}
              </p>
            </div>
          </div>

          {/* System Architecture */}
          {study.architecture && (
            <div className="p-8 sm:p-10 bg-white border border-slate-200 rounded-lg shadow-sm mb-20 space-y-4">
              <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                System Architecture & Data Flow
              </h3>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                {study.architecture}
              </p>
            </div>
          )}

          {/* Client Testimonial Endorsement */}
          {study.testimonial && (
            <div className="max-w-4xl mx-auto p-8 bg-blue-50/60 border border-blue-200 rounded-lg shadow-sm mb-20 space-y-4">
              <Quote className="w-8 h-8 text-[#0066FF] opacity-60" />
              <p className="text-base sm:text-lg text-slate-700 italic font-sans leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <div className="pt-2 font-mono text-xs text-slate-600">
                <strong className="text-[#0B1938]">{study.testimonial.author}</strong> — {study.testimonial.role}, {study.client}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default CaseStudyDetails;
