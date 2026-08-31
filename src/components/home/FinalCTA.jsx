import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

export const FinalCTA = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <Container>
        <div className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border border-blue-200/80 rounded-2xl overflow-hidden text-center max-w-5xl mx-auto shadow-md">
          {/* Subtle Light Glow & Grid Accents */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-100/80 border border-blue-200 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                Ready to Build?
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
              LET'S ENGINEER YOUR NEXT DIGITAL BREAKTHROUGH
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
              Schedule a technical discovery session with our senior architects. We’ll review your requirements, recommend the optimal stack, and deliver a detailed scope within 48 hours.
            </p>

            {/* Mobile & Desktop Single Row Button Bar */}
            <div className="pt-3 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
              <Link to="/start-project" className="flex-1">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-md border-0"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Project
                </Button>
              </Link>

              <Link to="/portfolio" className="flex-1">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white hover:bg-slate-50 text-[#0B1938] border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF] shadow-sm"
                >
                  View Work
                </Button>
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-[11px] sm:text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <span>Strict Non-Disclosure Agreement (NDA)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#0066FF]" />
                <span>48-Hour Feasibility & Quote</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                <span>100% IP & Code Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTA;
