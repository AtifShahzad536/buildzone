import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { initialProjects } from '../../data/projects';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const FeaturedProjects = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            badge="Engineered Case Studies"
            title="Featured Client Deployments"
            subtitle="Explore high-concurrency platforms, AI applications, and enterprise systems built for industry leaders."
            className="mb-0"
          />
          <Link to="/portfolio" className="hidden md:inline-block">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Work
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-[#F8FAFC] border border-slate-200 hover:border-[#0066FF]/40 rounded-lg overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Project Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={project.image}
                    alt={`${project.name || 'Featured Project'} - ${project.category || 'Software System'} Deployment Showcase`}
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
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

                  <h3 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Impact Metric */}
                  <div className="p-3 bg-white border border-slate-200 rounded-md mb-5 flex items-center gap-2.5 shadow-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs text-emerald-700 font-bold truncate">
                      {project.results}
                    </span>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px] text-slate-600 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-200/80 mt-2">
                <Link
                  to={`/case-studies/${project.slug}`}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1 group/link"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-white border border-slate-200 rounded text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] transition-all"
                    aria-label="View Live Project"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link to="/portfolio" className="w-full inline-block">
            <Button variant="secondary" size="md" className="w-full">
              View All Work
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
