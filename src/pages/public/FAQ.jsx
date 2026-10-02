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

  const { data: faqsData, isLoading } = useGetFaqsQuery();
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
        title="Frequently Asked Questions | BuildZone"
        description="Find answers on custom software development costs, project timelines, IP ownership, and SLAs from BuildZone, the best software agency in Sialkot."
        keywords="Software Agency Sialkot FAQ, Software House Sialkot FAQ, Software Development Cost Sialkot, Hire Developers Sialkot, Best Software Agency in Sialkot, Best Software House in Sialkot"
        canonical="https://buildzonetechnology.com/faq"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                KNOWLEDGE BASE
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">QUESTIONS</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
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
              className="w-full bg-[#0B1528] border border-slate-800 pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl shadow-inner transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-xl border ${
                  activeCategory === cat
                    ? 'bg-[#0066FF] text-white border-[#00F0FF]/60 shadow-[0_0_15px_rgba(0,102,255,0.35)]'
                    : 'bg-[#0B1528] text-slate-300 border-slate-800 hover:border-[#00F0FF]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column FAQ Accordion Grid */}
          {isLoading && (!faqsData || faqsData.length === 0) ? (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                <div className="w-10 h-10 border-3 border-slate-800 border-t-[#00F0FF] rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-slate-400 tracking-widest uppercase font-semibold">
                  Loading Knowledge Base...
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="border border-slate-800 bg-[#0B1528] rounded-2xl p-5 space-y-3">
                    <div className="w-3/4 h-5 bg-slate-800/60 rounded" />
                    <div className="w-full h-8 bg-slate-800/40 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {filtered?.map((faq, index) => {
              const isOpen = !!openItems[index];
              return (
                <div
                  key={faq.id}
                  className="border border-slate-800 hover:border-[#00F0FF]/50 bg-[#0B1528] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full p-5 text-left flex items-start justify-between gap-3.5 focus:outline-none cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div 
                      className={`p-1.5 rounded-xl border shrink-0 transition-all duration-200 ${
                        isOpen 
                          ? 'rotate-180 bg-[#0066FF] border-[#00F0FF]/60 text-white shadow-[0_0_10px_rgba(0,102,255,0.4)]' 
                          : 'bg-[#070E1C] border-slate-800 text-[#00F0FF] group-hover:bg-[#0066FF] group-hover:text-white group-hover:border-[#0066FF]'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-800/80 bg-[#070E1C]">
                      <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default FAQ;
