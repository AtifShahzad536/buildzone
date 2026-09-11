import React from 'react';
import { Star, Terminal } from 'lucide-react';
import { useGetTestimonialsQuery } from '../../services/api';
import { initialTestimonials } from '../../data/testimonials';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import SEOHead from '../../components/common/SEOHead';

export const Testimonials = () => {
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery();
  const testimonials = (testimonialsData && Array.isArray(testimonialsData) && testimonialsData.length > 0)
    ? testimonialsData
    : initialTestimonials;

  return (
    <>
      <SEOHead
        title="Verified Client Reviews & Testimonials"
        description="Read what CTOs, Founders, and Engineering Executives say about their partnerships with BuildZone."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                VERIFIED PARTNER FEEDBACK
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              CLIENT TESTIMONIALS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We judge our engineering success by the longevity and market performance of the products we ship.
            </p>
          </div>

          {isLoading && (!testimonialsData || testimonialsData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-blue-100 border-t-[#0066FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-500 tracking-widest uppercase font-semibold">
                  Loading Testimonials...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-8 bg-white border border-slate-200 rounded-lg space-y-6">
                    <div className="w-1/3 h-4 bg-slate-100 rounded" />
                    <div className="w-full h-16 bg-slate-50 rounded" />
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                      <div className="w-11 h-11 bg-slate-100 rounded-full" />
                      <div className="space-y-2">
                        <div className="w-24 h-4 bg-slate-100 rounded" />
                        <div className="w-16 h-3 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((t) => (
              <div
                key={t.id}
                className="p-8 bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#0066FF] font-bold uppercase">{t.project}</span>
                  </div>

                  <p className="text-sm text-slate-700 font-sans leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author ? `${t.author} - ${t.role || 'Client'}` : "Client testimonial avatar"}
                    loading="lazy"
                    className="w-11 h-11 object-cover rounded-full border border-blue-200"
                  />
                  <div>
                    <h2 className="font-display font-bold text-sm uppercase text-[#0B1938]">
                      {t.author}
                    </h2>
                    <p className="font-mono text-xs text-slate-500">
                      {t.role}, <span className="text-[#0066FF] font-semibold">{t.company}</span>
                    </p>
                  </div>
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

export default Testimonials;
