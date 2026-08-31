import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { initialIndustries } from '../../data/industries';
import { renderIcon } from '../../utils/helpers';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

export const IndustriesPreview = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] relative">
      <Container>
        <SectionTitle
          badge="Domain Expertise"
          title="Engineered for High-Stakes Industries"
          subtitle="We tailor regulatory compliance, architecture security, and workflows to your exact sector standards."
          center
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {initialIndustries.slice(0, 8).map((ind) => (
            <Link
              key={ind.id}
              to={`/industries/${ind.slug}`}
              className="p-5 sm:p-6 bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-4">
                  {renderIcon(ind.iconName, { className: "w-5 h-5" })}
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base uppercase text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors">
                  {ind.name}
                </h3>

                <p className="text-[11px] sm:text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
                  {ind.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-2 flex items-center gap-1 font-mono text-[11px] font-bold text-[#0066FF] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Solutions</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/industries">
            <Button variant="secondary" size="md">
              Explore All 11 Industry Sectors
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default IndustriesPreview;
