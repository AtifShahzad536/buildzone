import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { initialFaqs } from '../../data/faqs';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

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
    <section className="py-16 sm:py-24 bg-[#F8FAFC] relative">
      <Container className="max-w-6xl">
        <SectionTitle
          badge="Clear Answers"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our pricing models, engagement terms, and delivery processes."
          center
        />

        {/* 2-Column Responsive FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-12 items-start">
          {initialFaqs.slice(0, 6).map((faq, index) => {
            const isOpen = !!openItems[index];
            return (
              <div
                key={faq.id}
                className="border border-slate-200 hover:border-[#0066FF]/40 bg-white rounded-xl overflow-hidden transition-all shadow-sm flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3.5 focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                    <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-[#0B1938] group-hover:text-[#0066FF] transition-colors leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#0066FF] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#0066FF] text-white' : ''}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-100 pt-3.5 bg-[#F8FAFC]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/faq">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Frequently Asked Questions
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FAQPreview;
