import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { useGetIndustriesQuery } from '../../services/api';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const Industries = () => {
  const { data: industriesData, isLoading } = useGetIndustriesQuery();
  const industries = (industriesData && Array.isArray(industriesData) && industriesData.length > 0)
    ? industriesData
    : initialIndustries;

  return (
    <>
      <SEOHead
        title="Industry Solutions & Sector Expertise | BuildZone"
        description="Tailored software systems, compliant medical apps, FinTech platforms, and manufacturing ERPs engineered by the best software agency in Sialkot."
        keywords="Industry Software Sialkot, Exporters ERP Sialkot, Healthcare Software Sialkot, FinTech Development Sialkot, Best Software House in Sialkot, Best Software Agency in Sialkot"
        canonical="https://buildzonetechnology.com/industries"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                DOMAIN SPECIALIZATION
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              INDUSTRY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">VERTICALS</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              We engineer mission-critical systems designed around real-world regulatory constraints, security compliance, and workflow patterns.
            </p>
          </div>

          {isLoading && (!industriesData || industriesData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Industries...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="w-12 h-12 bg-slate-800/60 rounded-xl" />
                    <div className="w-2/3 h-5 bg-slate-800/60 rounded" />
                    <div className="w-full h-12 bg-slate-800/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries?.map((ind) => (
              <div
                key={ind.id}
                className="bg-[#0B1528] border border-slate-800/90 hover:border-[#00F0FF]/50 rounded-2xl p-7 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-xl flex items-center justify-center text-[#00F0FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300 mb-5 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                    {renderIcon(ind.iconName, { className: "w-6 h-6" })}
                  </div>

                  <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                    {ind.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {ind.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6 p-4 rounded-xl bg-[#070E1C] border border-slate-800/80">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold block">
                      Engineered Capabilities:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-slate-300">
                      {ind.solutions?.slice(0, 3).map((sol) => (
                        <li key={sol} className="flex items-center gap-2">
                          <span className="text-[#00F0FF] font-bold">✓</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/industries/${ind.slug}`}
                  className="pt-4 border-t border-slate-800 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] hover:text-white inline-flex items-center gap-1.5 group/btn transition-colors"
                >
                  <span>Explore Sector Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#00F0FF]" />
                </Link>
              </div>
            ))}
          </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Industries;
