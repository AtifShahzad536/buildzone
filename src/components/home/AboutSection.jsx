import React from 'react';
import { Rocket, Eye, Handshake } from 'lucide-react';
import Container from '../common/Container';
import ScrollReveal from '../common/ScrollReveal';

export const AboutSection = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-slate-200/80">
      
      {/* ========================================================================= */}
      {/* BACKGROUND IMAGE LAYER (Desktop Right Aligned Full-Bleed Panorama)        */}
      {/* ========================================================================= */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[62%] xl:w-[60%] h-full z-0 pointer-events-none">
        <img
          src="/about-office.jpg"
          alt="Buildzone Technology Engineering Team"
          className="w-full h-full object-cover object-[center_35%]"
          loading="lazy"
        />
        
        {/* Seamless White Gradient Fades from Left to Right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 via-30% to-transparent" />
        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-white" />
      </div>

      {/* Decorative Dot Matrix on top-left (hidden on mobile to prevent text clash) */}
      <div 
        className="hidden md:block absolute top-0 left-0 w-64 h-64 opacity-30 pointer-events-none z-10" 
        style={{
          backgroundImage: 'radial-gradient(#0066FF 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* ========================================================================= */}
      {/* FOREGROUND CONTAINER (Content on Left)                                    */}
      {/* ========================================================================= */}
      <Container className="relative z-20">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Small Blue Tag */}
          <ScrollReveal animation="fade-down" duration={0.5}>
            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0066FF] block mb-2.5">
              WHO WE ARE
            </span>
          </ScrollReveal>

          {/* Main Stacked Headline */}
          <ScrollReveal animation="fade-up" delay={0.1} duration={0.6}>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-black font-display tracking-tight leading-[1.08] text-[#0B1938]">
              About<br />
              <span className="text-[#0066FF]">Buildzone</span><br />
              <span className="text-[#0066FF]">Technology</span>
            </h2>
          </ScrollReveal>

          {/* Blue Accent Underline Bar */}
          <ScrollReveal animation="fade-up" delay={0.15} duration={0.5}>
            <div className="w-14 h-1.5 bg-[#0066FF] rounded-full mt-3.5 mb-5" />
          </ScrollReveal>

          {/* Description Text */}
          <ScrollReveal animation="fade-up" delay={0.2} duration={0.6}>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-lg mb-6 sm:mb-8">
              Buildzone Technology is a forward-thinking software development company dedicated to delivering innovative, scalable, and reliable digital solutions. We combine creativity with technology to help businesses grow and succeed in the digital world.
            </p>

            {/* Standalone Image Card on Mobile & Tablets (hidden on Desktop) */}
            <div className="lg:hidden mb-6 rounded-2xl overflow-hidden shadow-md border border-slate-200/90 relative group">
              <img
                src="/about-office.jpg"
                alt="Buildzone Technology Headquarters"
                className="w-full h-44 sm:h-56 object-cover object-[center_35%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1938]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10.5px] font-mono font-bold bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                <span>📍 Buildzone Tech Studio</span>
                <span className="text-emerald-400">● Sialkot HQ</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Columns: Mission • Vision • Value (Responsive Card Layout) */}
          <ScrollReveal animation="fade-up" delay={0.3} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 pt-1">
              
              {/* 1. Our Mission */}
              <div className="p-3.5 sm:p-0 bg-slate-50/80 sm:bg-transparent rounded-2xl border sm:border-0 border-slate-200/70 flex sm:flex-col items-start gap-3 sm:gap-2.5 group hover:border-blue-200 transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shrink-0 shadow-2xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-200">
                  <Rocket className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-600 font-sans leading-relaxed mt-0.5">
                    Deliver innovative solutions that drive business growth.
                  </p>
                </div>
              </div>

              {/* 2. Our Vision */}
              <div className="p-3.5 sm:p-0 bg-slate-50/80 sm:bg-transparent rounded-2xl border sm:border-0 border-slate-200/70 flex sm:flex-col items-start gap-3 sm:gap-2.5 group hover:border-blue-200 transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shrink-0 shadow-2xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-200">
                  <Eye className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-600 font-sans leading-relaxed mt-0.5">
                    To be a global technology partner of choice.
                  </p>
                </div>
              </div>

              {/* 3. Our Value */}
              <div className="p-3.5 sm:p-0 bg-slate-50/80 sm:bg-transparent rounded-2xl border sm:border-0 border-slate-200/70 flex sm:flex-col items-start gap-3 sm:gap-2.5 group hover:border-blue-200 transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shrink-0 shadow-2xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-200">
                  <Handshake className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-tight">
                    Our Value
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-600 font-sans leading-relaxed mt-0.5">
                    Innovation, quality, integrity, and client success.
                  </p>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
