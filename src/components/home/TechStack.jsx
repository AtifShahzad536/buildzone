import React, { useState } from 'react';
import { initialTechnologies } from '../../data/technologies';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'AI', 'Cloud'];

export const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? initialTechnologies
    : initialTechnologies.filter(t => t.category === activeCategory);

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] relative">
      <Container>
        <SectionTitle
          badge="Verified Tech Stack"
          title="Enterprise Frameworks & Infrastructure"
          subtitle="We engineer on stable, audited, high-throughput modern technology stacks designed for maintainability."
          center
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((tech) => (
            <div
              key={tech.name}
              className="p-5 bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all duration-200 flex flex-col items-center text-center group hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-3">
                {renderIcon(tech.iconName, { className: "w-6 h-6" })}
              </div>

              <h4 className="font-display font-bold text-sm text-[#0B1938] uppercase group-hover:text-[#0066FF] transition-colors">
                {tech.name}
              </h4>

              <span className="font-mono text-[10px] text-slate-500 uppercase mt-1">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TechStack;
