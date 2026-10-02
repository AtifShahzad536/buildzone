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
        title="Client Reviews & Ratings | BuildZone"
        description="Read 150+ verified 5-star client reviews from founders and executives who partner with BuildZone, Sialkot's leading digital engineering firm."
        keywords="BuildZone Reviews, Software House in Sialkot Ratings, Best IT Company Sialkot, Top Software House in Sialkot, Best Software House in Sialkot"
        canonical="https://buildzonetechnology.com/testimonials"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                VERIFIED PARTNER FEEDBACK
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">TESTIMONIALS</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              We judge our engineering success by the longevity and market performance of the products we ship.
            </p>
          </div>

          {isLoading && (!testimonialsData || testimonialsData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Testimonials...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl space-y-6">
                    <div className="w-1/3 h-4 bg-slate-800/60 rounded" />
                    <div className="w-full h-16 bg-slate-800/40 rounded" />
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                      <div className="w-11 h-11 bg-slate-800/60 rounded-full" />
                      <div className="space-y-2">
                        <div className="w-24 h-4 bg-slate-800/60 rounded" />
                        <div className="w-16 h-3 bg-slate-800/60 rounded" />
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
                className="p-8 bg-[#0B1528] border border-slate-800/90 hover:border-[#00F0FF]/50 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#00F0FF] font-bold uppercase">{t.project}</span>
                  </div>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.author || "Client testimonial"}
                    width="44"
                    height="44"
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 object-cover rounded-full border-2 border-[#0066FF]"
                  />
                  <div>
                    <h2 className="font-display font-bold text-sm uppercase text-white">
                      {t.author}
                    </h2>
                    <p className="font-mono text-xs text-slate-400">
                      {t.role}, <span className="text-[#00F0FF] font-semibold">{t.company}</span>
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
