import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Terminal } from 'lucide-react';
import { useGetCaseStudiesQuery } from '../../services/api';
import { initialCaseStudies } from '../../data/caseStudies';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const CaseStudies = () => {
  const { data: caseStudiesData, isLoading } = useGetCaseStudiesQuery();
  const caseStudies = (caseStudiesData && Array.isArray(caseStudiesData) && caseStudiesData.length > 0)
    ? caseStudiesData
    : initialCaseStudies;

  return (
    <>
      <SEOHead
        title="Case Studies & Engineering Impact | BuildZone"
        description="Read architectural deep dives and business transformation results delivered by BuildZone, Sialkot's premier software engineering company."
        keywords="Software Engineering Case Studies, Best Software Agency in Sialkot, Best Software House in Sialkot, No 1 Software House in Sialkot, ERP Case Studies Sialkot, AI Projects Sialkot"
        canonical="https://buildzonetechnology.com/case-studies"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                VERIFIED ARCHITECTURES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">CASE STUDIES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Read comprehensive technical breakdowns of challenges, engineered solutions, infrastructure diagrams, and quantified production metrics.
            </p>
          </div>

          {isLoading && (!caseStudiesData || caseStudiesData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Case Studies...
                </p>
              </div>
              <div className="space-y-8 animate-pulse">
                {[1, 2].map((n) => (
                  <div key={n} className="bg-[#0B1528] border border-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center">
                    <div className="w-full lg:w-1/2 aspect-[16/10] bg-slate-800/60 rounded-xl" />
                    <div className="w-full lg:w-1/2 space-y-4">
                      <div className="w-1/3 h-4 bg-slate-800/60 rounded" />
                      <div className="w-3/4 h-8 bg-slate-800/60 rounded" />
                      <div className="w-full h-16 bg-slate-800/40 rounded" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-12 bg-slate-800/60 rounded" />
                        <div className="h-12 bg-slate-800/60 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
            {caseStudies?.map((study) => (
              <div
                key={study.id}
                className="bg-[#0B1528] border border-slate-800/90 hover:border-[#00F0FF]/50 rounded-2xl p-6 sm:p-10 transition-all duration-300 flex flex-col lg:flex-row gap-8 items-center shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]"
              >
                {/* Visual Banner */}
                <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden bg-slate-900 rounded-xl relative shrink-0">
                  <img
                    src={study.heroImage}
                    alt={study.title || "Case study showcase banner"}
                    loading="lazy"
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
                  <div className="font-mono text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    Client: {study.client} • {study.location}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
                    {study.title}
                  </h2>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {study.challenge}
                  </p>

                  {/* Measurable Results */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    {study.results?.map((res, i) => (
                      <div key={i} className="p-3.5 bg-[#070E1C] border border-slate-800 rounded-xl">
                        <div className="font-display font-black text-xl text-[#00F0FF]">{res.metric}</div>
                        <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">{res.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link to={`/case-studies/${study.slug}`}>
                      <button className="font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] hover:text-white inline-flex items-center gap-1.5 transition-colors">
                        <span>Read Full Architectural Breakdown</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#00F0FF]" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default CaseStudies;
