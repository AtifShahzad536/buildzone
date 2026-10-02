import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { initialProjects } from '../../data/projects';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';

export const FeaturedProjects = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#060B18] relative border-t border-slate-800/80">
      <Container>
        <ScrollReveal animation="fade-up" duration={0.65}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionTitle
              badge="ENGINEERED CASE STUDIES • SHIPPED IN SIALKOT & GLOBALLY"
              title="Featured Client Deployments"
              subtitle="Explore high-concurrency platforms, AI applications, and custom enterprise software engineered by Sialkot's premier software agency."
              className="mb-0"
            />
            <Link to="/portfolio" className="hidden md:inline-block">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Work
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15} stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="bg-[#0B1528] border border-slate-800 hover:border-[#0066FF]/60 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div>
                {/* Project Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={project.image}
                    alt={project.name || "Featured Project"}
                    width="600"
                    height="375"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="cyan" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="font-sans text-xs text-[#00F0FF] uppercase tracking-wide mb-1.5 font-semibold">
                    {project.client} • {project.industry}
                  </div>

                  <h3 className="text-xl font-bold font-display tracking-tight text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Impact Metric */}
                  <div className="p-3 bg-[#070E1C] border border-slate-800 rounded-lg mb-5 flex items-center gap-2.5 shadow-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-sans text-xs text-emerald-400 font-bold truncate">
                      {project.results}
                    </span>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#070E1C] border border-slate-800 rounded-md font-sans text-[11px] font-medium text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800 mt-2">
                <Link
                  to={`/case-studies/${project.slug}`}
                  aria-label={`Read ${project.name} Case Study`}
                  className="font-sans text-xs font-bold uppercase tracking-wide text-[#00F0FF] hover:text-cyan-300 inline-flex items-center gap-1 group/link"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 bg-[#070E1C] border border-slate-800 rounded text-slate-400 hover:text-[#00F0FF] hover:border-[#0066FF] transition-all"
                    aria-label="View Live Project"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </ScrollReveal>

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
