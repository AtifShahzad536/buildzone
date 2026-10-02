import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { initialFaqs } from '../../data/faqs';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';

export const FAQPreview = () => {
  // Support independent open state for smooth 2-column expansion
  const [openItems, setOpenItems] = useState({ 0: true, 1: true });

  const toggle = (idx) => {
    setOpenItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="py-16 sm:py-24 bg-[#060B18] relative border-t border-slate-800/80">
      <Container>
        <ScrollReveal animation="fade-up" duration={0.65}>
          <SectionTitle
            badge="Clear Answers"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our pricing models, engagement terms, and delivery processes."
            center
          />
        </ScrollReveal>

        {/* 2-Column Responsive FAQ Grid */}
        <ScrollReveal animation="fade-up" delay={0.15} stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-12 items-start">
          {initialFaqs.slice(0, 6).map((faq, index) => {
            const isOpen = !!openItems[index];
            return (
              <div
                key={faq.id}
                className="border border-slate-800 hover:border-[#0066FF]/60 bg-[#0B1528] rounded-xl overflow-hidden transition-all shadow-md flex flex-col"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-label={`Toggle FAQ: ${faq.question}`}
                  onClick={() => toggle(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3.5 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div 
                    className={`p-1.5 rounded-lg border shrink-0 transition-all duration-200 ${
                      isOpen 
                        ? 'rotate-180 bg-[#0066FF] border-[#0066FF] text-white shadow-xs' 
                        : 'bg-[#070E1C] border-slate-800 text-[#00F0FF] group-hover:bg-[#0066FF] group-hover:text-white group-hover:border-[#0066FF]'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-800 pt-3.5 bg-[#070E1C]/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2} duration={0.6} className="mt-12 text-center">
          <Link to="/faq">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Frequently Asked Questions
            </Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default FAQPreview;
