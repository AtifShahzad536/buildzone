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
  const { data: industriesData } = useGetIndustriesQuery();
  const industries = (industriesData && Array.isArray(industriesData) && industriesData.length > 0)
    ? industriesData
    : initialIndustries;

  return (
    <>
      <SEOHead
        title="Industry Solutions — Enterprise Sector Expertise"
        description="Software architecture and compliance for Healthcare, FinTech, E-Commerce, Logistics, EdTech and more."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                DOMAIN SPECIALIZATION
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              INDUSTRY VERTICALS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We engineer mission-critical systems designed around real-world regulatory constraints, security compliance, and workflow patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries?.map((ind) => (
              <div
                key={ind.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg p-6 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-5">
                    {renderIcon(ind.iconName, { className: "w-6 h-6" })}
                  </div>

                  <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors">
                    {ind.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                    {ind.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold block">
                      Engineered Capabilities:
                    </span>
                    <ul className="space-y-1 font-mono text-xs text-slate-700">
                      {ind.solutions?.slice(0, 3).map((sol) => (
                        <li key={sol} className="flex items-center gap-1.5">
                          <span className="text-[#0066FF] font-bold">✓</span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/industries/${ind.slug}`}
                  className="pt-4 border-t border-slate-100 font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1.5 group/btn transition-colors"
                >
                  <span>Explore Sector Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Industries;
