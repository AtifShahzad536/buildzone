import React from 'react';
import { Rocket, Eye, Handshake } from 'lucide-react';
import Container from '../common/Container';
import ScrollReveal from '../common/ScrollReveal';

export const AboutSection = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-slate-200/80">
      
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

      {/* Decorative Dot Matrix on top-left (matches reference) */}
      <div 
        className="absolute top-0 left-0 w-80 h-80 opacity-40 pointer-events-none z-10" 
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
            <span className="font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0066FF] block mb-3">
              WHO WE ARE
            </span>
          </ScrollReveal>

          {/* Main Stacked Headline */}
          <ScrollReveal animation="fade-up" delay={0.1} duration={0.6}>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-display tracking-tight leading-[1.06] text-[#0B1938]">
              About<br />
              <span className="text-[#0066FF]">Buildzone</span><br />
              <span className="text-[#0066FF]">Technology</span>
            </h2>
          </ScrollReveal>

          {/* Blue Accent Underline Bar */}
          <ScrollReveal animation="fade-up" delay={0.15} duration={0.5}>
            <div className="w-14 h-1.5 bg-[#0066FF] rounded-full mt-4 mb-6" />
          </ScrollReveal>

          {/* Description Text */}
          <ScrollReveal animation="fade-up" delay={0.2} duration={0.6}>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-lg mb-6 sm:mb-8">
              Buildzone Technology is a forward-thinking software development company dedicated to delivering innovative, scalable, and reliable digital solutions. We combine creativity with technology to help businesses grow and succeed in the digital world.
            </p>

            {/* Standalone Image Card on Mobile & Tablets (hidden on Desktop) */}
            <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 relative group">
              <img
                src="/about-office.jpg"
                alt="Buildzone Technology Headquarters"
                className="w-full h-52 sm:h-64 object-cover object-[center_35%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1938]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                <span>📍 Buildzone Tech Studio</span>
                <span className="text-emerald-400">● Active Headquarters</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 3 Columns: Mission • Vision • Value */}
          <ScrollReveal animation="fade-up" delay={0.3} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 pt-2">
              
              {/* 1. Our Mission */}
              <div className="space-y-2.5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shadow-xs hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all duration-300">
                  <Rocket className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#0B1938] uppercase tracking-tight">
                  Our Mission
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Deliver innovative solutions that drive business growth.
                </p>
              </div>

              {/* 2. Our Vision */}
              <div className="space-y-2.5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shadow-xs hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all duration-300">
                  <Eye className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#0B1938] uppercase tracking-tight">
                  Our Vision
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  To be a global technology partner of choice.
                </p>
              </div>

              {/* 3. Our Value */}
              <div className="space-y-2.5">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-200/90 flex items-center justify-center text-[#0066FF] shadow-xs hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-all duration-300">
                  <Handshake className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#0B1938] uppercase tracking-tight">
                  Our Value
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Innovation, quality, integrity, and client success.
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
