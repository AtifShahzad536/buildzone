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
        title="Modern Engineering Stacks — Web, Mobile, Cloud & AI"
        description="Explore the battle-tested frameworks, databases, LLM engines, and cloud providers utilized in BuildZone deployments."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENGINEERED STACK
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              TECHNOLOGY CATALOG
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We select modern, battle-tested technologies that balance developer velocity, extreme scalability, and long-term maintainability.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-md border ${
                  activeCategory === cat
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF]'
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
                <div className="w-10 h-10 border-3 border-blue-100 border-t-[#0066FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase font-semibold">
                  Loading Technology Catalog...
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-md" />
                    <div className="w-2/3 h-5 bg-slate-100 rounded" />
                    <div className="w-full h-8 bg-slate-50 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered?.map((tech) => (
              <div
                key={tech.id || tech.name}
                className="p-6 bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                      {renderIcon(tech.iconName, { className: "w-6 h-6" })}
                    </div>
                    <Badge variant="cyan" size="sm">
                      {tech.category}
                    </Badge>
                  </div>

                  <h2 className="text-lg font-bold font-display uppercase tracking-tight text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors">
                    {tech.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>Production Ready</span>
                  <span className="text-[#0066FF] font-bold">100% Tested</span>
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
