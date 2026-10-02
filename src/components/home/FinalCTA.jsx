import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';

export const FinalCTA = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0A1128] relative overflow-hidden border-t border-slate-800/80">
      <Container>
        <ScrollReveal animation="zoom-in" duration={0.7}>
          <div className="relative p-8 sm:p-12 md:p-16 bg-gradient-to-br from-[#0B1528] via-[#0E1A33] to-[#0B1528] border border-blue-500/30 rounded-3xl overflow-hidden text-center max-w-5xl mx-auto shadow-2xl shadow-blue-500/10">
            {/* Cyber Glow Accents */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0066FF]/20 border border-[#0066FF]/40 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                  Ready to Build with Sialkot's Best Software Agency?
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight">
                LET'S ENGINEER YOUR NEXT DIGITAL BREAKTHROUGH
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl mx-auto">
                Schedule a discovery session with our senior architects at BuildZone Sialkot. We’ll review your requirements, recommend the optimal stack, and deliver a detailed scope within 24 hours.
              </p>

              {/* Mobile & Desktop Single Row Button Bar */}
              <div className="pt-3 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
                <Link to="/start-project" className="flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-[#0066FF] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Start Project
                  </Button>
                </Link>

                <Link to="/portfolio" className="flex-1">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-[#070E1C] hover:bg-[#111E38] text-white border-slate-700 hover:border-[#0066FF] hover:text-[#00F0FF] shadow-md"
                  >
                    View Work
                  </Button>
                </Link>
              </div>

              {/* Trust Assurances */}
              <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-[11px] sm:text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                  <span>Strict Non-Disclosure Agreement (NDA)</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#00F0FF]" />
                  <span>48-Hour Feasibility & Quote</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                  <span>100% IP & Code Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default FinalCTA;
