import React, { useState } from 'react';
import { ChevronDown, Search, Terminal, HelpCircle } from 'lucide-react';
import { useGetFaqsQuery } from '../../services/api';
import { initialFaqs } from '../../data/faqs';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';

const categories = ['All', 'General', 'Process', 'Technical', 'Pricing', 'Security'];

export const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState({ 0: true, 1: true });

  const { data: faqsData } = useGetFaqsQuery();
  const faqs = (faqsData && Array.isArray(faqsData) && faqsData.length > 0)
    ? faqsData
    : initialFaqs;

  const filtered = faqs?.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggle = (idx) => {
    setOpenItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions — Pricing, Process & Tech"
        description="Find answers to common questions about BuildZone's software engineering sprints, pricing models, IP rights, and SLAs."
      />

      <div className="py-12 sm:py-20 bg-[#F8FAFC]">
        <Container className="max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                KNOWLEDGE BASE
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Clear, transparent answers about how we collaborate, bill, write software, and maintain systems.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Type your question or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 pl-10 pr-4 py-3 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-lg border ${
                  activeCategory === cat
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-[#0066FF] hover:text-[#0066FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column FAQ Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {filtered?.map((faq, index) => {
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
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-[#F8FAFC]/60">
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
};

export default FAQ;
