import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';

export const IndustriesPreview = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0A1128] relative border-t border-slate-800/80">
      <Container>
        <ScrollReveal animation="fade-up" duration={0.65}>
          <SectionTitle
            badge="DOMAIN EXPERTISE • SIALKOT EXPORTERS & GLOBAL ENTERPRISES"
            title="Engineered for High-Stakes Industries"
            subtitle="We tailor regulatory compliance, architecture security, export ERP systems, and workflows to your exact sector standards."
            center
          />
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.15} stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {initialIndustries.slice(0, 8).map((ind) => (
            <Link
              key={ind.id}
              to={`/industries/${ind.slug}`}
              className="p-5 sm:p-6 bg-[#0B1528] border border-slate-800 hover:border-[#0066FF]/60 rounded-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div>
                <div className="w-10 h-10 bg-[#0066FF]/15 border border-[#0066FF]/30 rounded-lg flex items-center justify-center text-[#00F0FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-4 shadow-xs">
                  {renderIcon(ind.iconName, { className: "w-5 h-5" })}
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base uppercase text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                  {ind.name}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                  {ind.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-2 flex items-center gap-1 font-sans text-xs font-bold text-[#00F0FF] uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                <span>Solutions</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={0.6} className="mt-12 text-center">
          <Link to="/industries">
            <Button variant="secondary" size="md">
              Explore All 11 Industry Sectors
            </Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default IndustriesPreview;
