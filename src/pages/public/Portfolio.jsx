import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, TrendingUp, Terminal } from 'lucide-react';
import { useGetProjectsQuery } from '../../services/api';
import { initialProjects } from '../../data/projects';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';

const categories = ['All', 'Web', 'Mobile', 'AI', 'SaaS', 'E-Commerce', 'UI/UX'];

export const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: projectsData } = useGetProjectsQuery();
  const projects = (projectsData && Array.isArray(projectsData) && projectsData.length > 0)
    ? projectsData
    : initialProjects;

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects?.filter(p => p.serviceCategory === activeCategory || p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Portfolio — Shipped Enterprise & Startup Products"
        description="Explore our track record of high-performance web applications, mobile apps, SaaS platforms, and AI systems."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                VERIFIED DELIVERIES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              CLIENT WORK & CASE STUDIES
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore our portfolio of scalable platforms, high-throughput backend engines, and intelligent AI tools built for clients worldwide.
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg transition-all flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="cyan" size="sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="font-mono text-[11px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">
                      {project.client} • {project.industry}
                    </div>

                    <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors">
                      {project.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-md mb-5 flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-mono text-xs text-emerald-700 font-bold truncate">
                        {project.results}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[10px] text-slate-700 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1 group/link"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] transition-all"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Portfolio;
