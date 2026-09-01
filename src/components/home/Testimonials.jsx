import React from 'react';
import { Star } from 'lucide-react';
import { initialTestimonials } from '../../data/testimonials';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

export const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
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
              className="p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* 5-Star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 object-cover rounded-full border border-blue-200"
                />
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm uppercase text-[#0B1938]">
                    {t.author}
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] text-slate-500">
                    {t.role}, <span className="text-[#0066FF] font-semibold">{t.company}</span>
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
