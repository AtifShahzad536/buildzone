import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Terminal } from 'lucide-react';
import { useGetCaseStudiesQuery } from '../../services/api';
import { initialCaseStudies } from '../../data/caseStudies';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const CaseStudies = () => {
  const { data: caseStudiesData } = useGetCaseStudiesQuery();
  const caseStudies = (caseStudiesData && Array.isArray(caseStudiesData) && caseStudiesData.length > 0)
    ? caseStudiesData
    : initialCaseStudies;

  return (
    <>
      <SEOHead
        title="Engineering Case Studies — Measurable Business Impact"
        description="Deep-dive architectural breakdowns showing how BuildZone engineered high-concurrency systems, AI pipelines, and SaaS platforms."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                VERIFIED ARCHITECTURES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              CLIENT CASE STUDIES
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Read comprehensive technical breakdowns of challenges, engineered solutions, infrastructure diagrams, and quantified production metrics.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies?.map((study) => (
              <div
                key={study.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg p-6 sm:p-10 transition-all flex flex-col lg:flex-row gap-8 items-center shadow-sm hover:shadow-md"
              >
                {/* Visual Banner */}
                <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-slate-100 rounded-md relative shrink-0">
                  <img
                    src={study.heroImage}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="cyan" size="sm">
                      {study.industry}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold">
                    Client: {study.client} • {study.location}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-[#0B1938]">
                    {study.title}
                  </h2>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    {study.challenge}
                  </p>

                  {/* Measurable Results */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {study.results?.map((res, i) => (
                      <div key={i} className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-md">
                        <div className="font-display font-black text-xl text-[#0066FF]">{res.metric}</div>
                        <div className="font-mono text-[10px] text-slate-500 uppercase font-semibold">{res.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link to={`/case-studies/${study.slug}`}>
                      <button className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1.5 transition-colors">
                        <span>Read Full Architectural Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CaseStudies;
