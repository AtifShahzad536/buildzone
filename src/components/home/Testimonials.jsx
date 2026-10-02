import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { useGetTestimonialsQuery } from '../../services/api';
import { initialTestimonials } from '../../data/testimonials';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';

export const Testimonials = () => {
  const { data: dbTestimonials } = useGetTestimonialsQuery();
  const testimonials = (dbTestimonials && Array.isArray(dbTestimonials) && dbTestimonials.length > 0)
    ? dbTestimonials
    : initialTestimonials;

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Track active slide based on scroll position
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveIndex(Math.min(index, testimonials.length - 1));
    }
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1;
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex < testimonials.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(nextIndex);
  };

  // Auto-slide every 5 seconds (paused when user hovers or touches)
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, testimonials.length]);

  return (
    <section className="py-14 sm:py-20 bg-[#060B18] relative border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#0066FF]/10 via-[#00F0FF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header with Title & Slider Nav Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <SectionTitle
            badge="Verified Client Reviews"
            title="What Technology Leaders Say"
            subtitle="Direct feedback from founders, CTOs, and product leaders who trusted BuildZone with their engineering."
            className="mb-0 text-left max-w-2xl"
          />

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl bg-[#0B1528] border border-slate-800 hover:border-[#0066FF] hover:bg-[#111E38] text-slate-300 hover:text-[#00F0FF] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl bg-[#0B1528] border border-slate-800 hover:border-[#0066FF] hover:bg-[#111E38] text-slate-300 hover:text-[#00F0FF] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Touch-Friendly Horizontal Snap Slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 select-none scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="w-[86vw] sm:w-[380px] md:w-[420px] lg:w-[440px] shrink-0 snap-center p-6 sm:p-7 bg-[#0B1528] border border-slate-800 hover:border-[#0066FF]/60 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
            >
              <div>
                {/* 5-Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#0066FF]/40 group-hover:text-[#00F0FF]/60 transition-colors" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed italic mb-6 line-clamp-4">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author || 'Client'}
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                  className="w-11 h-11 object-cover rounded-full border-2 border-[#0066FF]/60 group-hover:border-[#00F0FF] transition-colors shadow-xs"
                />
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xs sm:text-sm uppercase text-white truncate group-hover:text-[#00F0FF] transition-colors">
                    {t.author}
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-slate-400 truncate">
                    {t.role}, <span className="text-[#00F0FF] font-semibold">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-7 bg-gradient-to-r from-[#0066FF] to-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
