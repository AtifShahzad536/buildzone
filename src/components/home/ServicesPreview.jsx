import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { initialServices } from '../../data/services';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

// Verified Rock-Solid Direct Unsplash Photo IDs
const serviceImages = {
  'web-dev': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'mobile-dev': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  'custom-software': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'ai-dev': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'saas-dev': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  'ecommerce-dev': 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
  'ui-ux': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  'cloud-devops': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
};

export const ServicesPreview = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] relative">
      <Container>
        <SectionTitle
          badge="Core Engineering Capabilities"
          title="Engineered for Performance, Built for Scale"
          subtitle="From mission-critical cloud backends and real-time AI to cross-platform mobile apps, we build scalable software architecture."
          center
        />

        {/* 4-Column High-Impact Visual Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {initialServices.map((service) => {
            const imageSrc = serviceImages[service.id] || service.image || serviceImages['web-dev'];
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF] rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* 1. High-Res Visual Image Header with Icon Badge Overlay */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={imageSrc}
                      alt={service.title}
                      width="400"
                      height="200"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1938]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    
                    {/* Floating Category & Icon Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-white/50">
                      <div className="text-[#0066FF]">
                        {renderIcon(service.iconName, { className: "w-3.5 h-3.5" })}
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B1938]">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  {/* 2. Content Body */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-5 line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[#F8FAFC] border border-slate-200 text-slate-700 font-mono text-[10px] font-semibold rounded group-hover:border-blue-200 group-hover:text-[#0066FF] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Action Footer */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <Link
                    to={`/services/${service.slug}`}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] hover:text-[#0052CC] inline-flex items-center gap-1.5 pt-3.5 border-t border-slate-100 w-full group/link transition-colors"
                  >
                    <span>Explore Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link to="/services">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 8 Specialized Services
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default ServicesPreview;
