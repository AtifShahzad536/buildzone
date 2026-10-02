import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Terminal, Sparkles, Zap } from 'lucide-react';
import { initialServices } from '../../data/services';
import { useGetServicesQuery } from '../../services/api';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';
import ScrollReveal from '../../components/common/ScrollReveal';

export const Services = () => {
  const { data: servicesData, isLoading } = useGetServicesQuery();
  const services = (servicesData && Array.isArray(servicesData) && servicesData.length > 0)
    ? servicesData
    : initialServices;

  return (
    <>
      <SEOHead
        title="Custom Software, Web & AI Services | BuildZone"
        description="Explore custom software, mobile apps, ERP systems, web apps, and AI engineering services by BuildZone, the best software agency in Sialkot."
        keywords="Software Services Sialkot, Custom Software Development Sialkot, Web Development Sialkot, Mobile App Development Sialkot, AI Development Sialkot, ERP Systems Sialkot, Best Software House in Sialkot, Best Software Agency in Sialkot, Top IT Company in Sialkot"
        canonical="https://buildzonetechnology.com/services"
      />

      <div className="py-12 sm:py-20 bg-[#060B18] text-white min-h-screen">
        <Container>
          {/* Header Banner with ScrollReveal */}
          <ScrollReveal animation="fade-down" duration={0.7}>
            <div className="max-w-3xl mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/15 border border-[#0066FF]/40 rounded-full mb-4 shadow-xs">
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                  FULL-LIFECYCLE ENGINEERING PODS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white mb-4">
                SPECIALIZED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">SERVICES</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                We provide dedicated, end-to-end software pods focused on scalable architectures, type-safe codebases, and pragmatic AI implementations.
              </p>
            </div>
          </ScrollReveal>

          {isLoading && (!servicesData || servicesData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Services Catalog...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                {[1, 2].map((n) => (
                  <div key={n} className="bg-[#0B1528] border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="h-52 w-full bg-slate-800/60 rounded-xl" />
                    <div className="w-2/3 h-6 bg-slate-800/60 rounded" />
                    <div className="w-full h-12 bg-slate-800/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <ScrollReveal 
                  key={service.id || idx} 
                  animation={idx % 2 === 0 ? "fade-left" : "fade-right"} 
                  duration={0.7} 
                  delay={(idx % 2) * 0.1}
                >
                  <div className="h-full bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] hover:-translate-y-1.5">
                    <div>
                      {/* Visual Image Header */}
                      {service.image && (
                        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent"></div>
                          
                          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#060B18]/90 border border-slate-800 backdrop-blur-md rounded-lg shadow-sm">
                            <div className="text-[#00F0FF]">
                              {renderIcon(service.iconName, { className: "w-4 h-4" })}
                            </div>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                              {service.category}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-6 sm:p-8">
                        {!service.image && (
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-[#122038] border border-slate-700/80 rounded-xl flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-all">
                              {renderIcon(service.iconName, { className: "w-6 h-6" })}
                            </div>
                            <Badge variant="cyan" size="sm">
                              {service.category}
                            </Badge>
                          </div>
                        )}

                        <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                          {service.title}
                        </h2>

                        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                          {service.shortDescription}
                        </p>

                        {/* Deliverables / Features snippet */}
                        <div className="space-y-2 mb-6">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                            Key Deliverables & Strengths:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                            {(service.benefits || service.features || []).slice(0, 4).map((d, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                                <span className="truncate">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {service.technologies?.map((tech) => (
                            <Badge key={tech} size="sm" variant="cyan">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                      <Link
                        to={`/services/${service.slug}`}
                        className="pt-4 border-t border-slate-800/80 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF] hover:text-white inline-flex items-center gap-1.5 w-full group/btn transition-colors"
                      >
                        <span>Explore Architecture & Process</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Services;
