import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { initialServices } from '../../data/services';
import { useGetServicesQuery } from '../../services/api';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const Services = () => {
  const { data: servicesData } = useGetServicesQuery();
  const services = (servicesData && Array.isArray(servicesData) && servicesData.length > 0)
    ? servicesData
    : initialServices;

  return (
    <>
      <SEOHead
        title="Software Engineering Services | BuildZone"
        description="Explore our specialized full-lifecycle software development and AI services."
      />

      <div className="py-12 sm:py-20 bg-[#F8FAFC]">
        <Container>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                FULL-LIFECYCLE ENGINEERING
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              SPECIALIZED SERVICES
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We provide dedicated, end-to-end software pods focused on scalable architectures, type-safe codebases, and pragmatic AI implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Visual Image Header */}
                  {service.image && (
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1938]/70 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg shadow-sm">
                        <div className="text-[#0066FF]">
                          {renderIcon(service.iconName, { className: "w-4 h-4" })}
                        </div>
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1938]">
                          {service.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-8">
                    {!service.image && (
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                          {renderIcon(service.iconName, { className: "w-6 h-6" })}
                        </div>
                        <Badge variant="cyan" size="sm">
                          {service.category}
                        </Badge>
                      </div>
                    )}

                    <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938] mb-3 group-hover:text-[#0066FF] transition-colors">
                      {service.title}
                    </h2>

                    <p className="text-sm text-slate-600 font-sans leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Deliverables / Features snippet */}
                    <div className="space-y-2 mb-6">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block font-bold">
                        Key Deliverables & Strengths:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-mono">
                        {(service.benefits || service.features || []).slice(0, 4).map((d, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                            <span className="truncate">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {service.technologies?.map((tech) => (
                        <Badge key={tech} size="sm" variant="default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                  <Link
                    to={`/services/${service.slug}`}
                    className="pt-4 border-t border-slate-100 font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1.5 w-full group/btn transition-colors"
                  >
                    <span>Explore Architecture & Process</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Services;
