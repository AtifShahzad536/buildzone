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
  const { data: projectsData, isLoading } = useGetProjectsQuery();
  const projects = (projectsData && Array.isArray(projectsData) && projectsData.length > 0)
    ? projectsData
    : initialProjects;

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects?.filter(p => p.serviceCategory === activeCategory || p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Portfolio & Case Studies | BuildZone"
        description="Explore 250+ enterprise web platforms, mobile apps, SaaS products, and custom AI systems built by BuildZone, the top-rated software agency in Sialkot."
        keywords="BuildZone Portfolio, Software House in Sialkot Projects, Software Agency in Sialkot, Web Development Sialkot Case Studies, Mobile Apps Sialkot, Top IT Company Sialkot, Best Software House in Sialkot"
        canonical="https://buildzonetechnology.com/portfolio"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                VERIFIED DELIVERIES
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              CLIENT WORK & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">CASE STUDIES</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Explore our portfolio of scalable platforms, high-throughput backend engines, and intelligent AI tools built for clients worldwide.
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
                    ? 'bg-[#0066FF] text-white border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,102,255,0.35)]'
                    : 'bg-[#0B1528] text-slate-300 border-slate-800 hover:border-[#00F0FF]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading && (!projectsData || projectsData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Portfolio Projects...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="aspect-[16/10] w-full bg-slate-800/60 rounded-xl" />
                    <div className="w-1/2 h-3 bg-slate-800/60 rounded" />
                    <div className="w-3/4 h-6 bg-slate-800/60 rounded" />
                    <div className="w-full h-12 bg-slate-800/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="bg-[#0B1528] border border-slate-800/90 hover:border-[#00F0FF]/50 rounded-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={project.image}
                      alt={project.name || "Portfolio project showcase"}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="cyan" size="sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest mb-2 font-semibold">
                      {project.client} • {project.industry}
                    </div>

                    <h2 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                      {project.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
                      {project.shortDescription}
                    </p>

                    <div className="p-3 bg-[#070E1C] border border-slate-800/80 rounded-xl mb-5 flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-mono text-xs text-emerald-400 font-bold truncate">
                        {project.results}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-[#122038] border border-slate-800 rounded-lg font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] hover:text-white inline-flex items-center gap-1.5 group/link transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-[#070E1C] border border-slate-800 rounded-xl text-slate-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all"
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
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

export default Portfolio;
