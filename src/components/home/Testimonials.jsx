import React from 'react';
import { Star } from 'lucide-react';
import { initialTestimonials } from '../../data/testimonials';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#060B18] relative border-t border-slate-800/80">
      <Container>
        <SectionTitle
          badge="Verified Client Reviews"
          title="What Technology Leaders Say"
          subtitle="Direct feedback from founders, CTOs, and product leaders who trusted BuildZone with their engineering."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {initialTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 bg-[#0B1528] border border-slate-800 hover:border-[#0066FF]/60 rounded-xl transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <div>
                {/* 5-Star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-cover rounded-full border border-blue-500/40"
                />
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                    {t.author}
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-slate-400">
                    {t.role}, <span className="text-[#00F0FF] font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
