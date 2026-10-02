import React, { useState } from 'react';
import { Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGetTechnologiesQuery } from '../../services/api';
import { initialTechnologies } from '../../data/technologies';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'AI', 'Cloud'];

export const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: technologiesData, isLoading } = useGetTechnologiesQuery();
  const technologies = (technologiesData && Array.isArray(technologiesData) && technologiesData.length > 0)
    ? technologiesData
    : initialTechnologies;

  const filtered = activeCategory === 'All'
    ? technologies
    : technologies?.filter(t => t.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Modern Engineering Tech Stack | BuildZone"
        description="Discover the battle-tested frontend, backend, mobile, cloud, and AI technologies used by BuildZone, the best software agency in Sialkot."
        keywords="Tech Stack Sialkot, React Nextjs Developers Sialkot, Python AI Sialkot, Flutter Developers Sialkot, Best Software House in Sialkot, Best Software Agency Sialkot, Top IT Company Sialkot"
        canonical="https://buildzonetechnology.com/technologies"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/15 border border-[#0066FF]/40 rounded-full mb-4 shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                ENGINEERED STACK
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              TECHNOLOGY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">CATALOG</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              We select modern, battle-tested technologies that balance developer velocity, extreme scalability, and long-term maintainability.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-xl border ${
                  activeCategory === cat
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                    : 'bg-[#0B1528] text-slate-300 border-slate-800 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          {isLoading && (!technologiesData || technologiesData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Technology Catalog...
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="w-10 h-10 bg-slate-800/60 rounded-xl" />
                    <div className="w-2/3 h-5 bg-slate-800/60 rounded" />
                    <div className="w-full h-8 bg-slate-800/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered?.map((tech) => (
              <div
                key={tech.id || tech.name}
                className="p-6 bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/50 rounded-2xl transition-all flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#122038] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-all">
                      {renderIcon(tech.iconName, { className: "w-6 h-6" })}
                    </div>
                    <Badge variant="cyan" size="sm">
                      {tech.category}
                    </Badge>
                  </div>

                  <h2 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {tech.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span>Production Ready</span>
                  <span className="text-[#00F0FF] font-bold">100% Tested</span>
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

export default Technologies;
