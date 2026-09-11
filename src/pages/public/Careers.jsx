import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  CheckCircle2,
  Globe,
  Search,
  SlidersHorizontal,
  Laptop,
  GraduationCap,
  HeartHandshake,
  Clock,
  ShieldCheck,
  Code2,
  Cpu,
  Server,
  Layers,
  X
} from 'lucide-react';
import { useGetCareersQuery } from '../../services/api';
import { initialCareers } from '../../data/careers';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';

const DEPARTMENTS = [
  { id: 'all', label: 'All Openings', icon: Layers },
  { id: 'Engineering', label: 'Software Engineering', icon: Code2 },
  { id: 'AI & Data Science', label: 'AI & Data Science', icon: Cpu },
  { id: 'Infrastructure', label: 'Cloud & DevOps', icon: Server },
  { id: 'Quality Assurance', label: 'QA & Testing', icon: ShieldCheck },
];

const PERKS = [
  {
    icon: Globe,
    title: "100% Remote & Async First",
    desc: "Work from anywhere across the globe with flexible schedules focused entirely on shipped outcomes, not logged hours."
  },
  {
    icon: DollarSign,
    title: "Top-Tier USD Compensation",
    desc: "Competitive salary ranges benchmarked against top global tech standards, with performance bonuses and equity incentives."
  },
  {
    icon: Sparkles,
    title: "High-Caliber Engineering Peers",
    desc: "Collaborate directly with senior architects and principal engineers. Zero corporate bureaucracy or micromanagement."
  },
  {
    icon: Laptop,
    title: "$2,500 Hardware Stipend",
    desc: "Get your choice of top-spec workstation (MacBook Pro / ThinkPad) plus annual peripheral allowances for home office setups."
  },
  {
    icon: GraduationCap,
    title: "Learning & Conference Budget",
    desc: "Generous annual educational stipend for books, online certifications, and sponsored travel to global tech conferences."
  },
  {
    icon: HeartHandshake,
    title: "Flexible PTO & Wellness",
    desc: "Generous paid time off, paid local holidays, comprehensive international health insurance, and paid parental leave."
  }
];

const HIRING_STEPS = [
  {
    step: "01",
    title: "Application Review",
    time: "24 – 48 Hours",
    desc: "We review your portfolio, GitHub, and previous production shipping experience."
  },
  {
    step: "02",
    title: "Technical Conversation",
    time: "45 Minutes",
    desc: "A casual technical chat with a Principal Architect discussing your stack and past system designs."
  },
  {
    step: "03",
    title: "Practical System Deep Dive",
    time: "60 Minutes",
    desc: "Real-world pair problem solving. No gimmicky LeetCode puzzles—just pure pragmatic engineering."
  },
  {
    step: "04",
    title: "Offer & Fast Onboarding",
    time: "Within 48 Hours",
    desc: "Competitive compensation proposal, hardware dispatch, and seamless pod onboarding."
  }
];

export const Careers = () => {
  const { data: careersData, isLoading } = useGetCareersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const careers = useMemo(() => {
    return (careersData && Array.isArray(careersData) && careersData.length > 0)
      ? careersData
      : initialCareers;
  }, [careersData]);

  // Filtered jobs
  const filteredCareers = useMemo(() => {
    return careers.filter((job) => {
      const matchesSearch = 
        !searchTerm.trim() ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.requirements && job.requirements.some(r => r.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesDept = 
        selectedDept === 'all' || 
        (job.department && job.department.toLowerCase().includes(selectedDept.toLowerCase()));

      const matchesType = 
        selectedType === 'all' || 
        (job.employmentType && job.employmentType.toLowerCase().includes(selectedType.toLowerCase()));

      return matchesSearch && matchesDept && matchesType;
    });
  }, [careers, searchTerm, selectedDept, selectedType]);

  // Dept counts
  const deptCounts = useMemo(() => {
    const counts = { all: careers.length };
    careers.forEach((j) => {
      const dept = j.department || 'Other';
      const matched = DEPARTMENTS.find(d => d.id !== 'all' && dept.toLowerCase().includes(d.id.toLowerCase()));
      const key = matched ? matched.id : dept;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [careers]);

  const hasActiveFilters = searchTerm || selectedDept !== 'all' || selectedType !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedType('all');
  };

  return (
    <>
      <SEOHead
        title="Careers & Engineering Opportunities — BuildZone"
        description="Join BuildZone's globally distributed team of senior software engineers, AI researchers, and system architects. High autonomy, top-tier compensation, 100% remote."
      />

      <div className="bg-white">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/60 overflow-hidden">
          {/* Subtle Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#0066FF 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <Container className="relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
                <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                  WE ARE HIRING ELITE BUILDERS
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-[1.1]">
                ENGINEER AT THE <span className="text-[#0066FF]">FRONTIER</span> OF TECH
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto">
                We are a high-autonomy, senior-first digital engineering collective. Build mission-critical software systems, distributed backends, and applied AI with top-tier international compensation.
              </p>

              {/* Quick Metrics Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs text-center">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">100%</div>
                  <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Remote & Async</div>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs text-center">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">$90k–$160k+</div>
                  <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Top USD Bands</div>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs text-center">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">&lt; 14 Days</div>
                  <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Fast Hiring Cycle</div>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-xl shadow-xs text-center">
                  <div className="font-display font-black text-xl sm:text-2xl text-[#0066FF]">Zero</div>
                  <div className="font-mono text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Bureaucracy</div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ================= HEAVY SEARCH & FILTER PANEL + JOBS ================= */}
        <section id="openings" className="py-16 sm:py-24 bg-[#F8FAFC]">
          <Container>
            {/* Proper Heavy Control Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8 mb-12 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938]">
                    Explore Active Openings
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans mt-0.5">
                    Filter engineering opportunities by role, technology stack, or department.
                  </p>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>

              {/* Search & Select Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Main Search Input */}
                <div className="md:col-span-8 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by title, technology (React, Python, QA, AWS)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-2xs"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Employment Type Dropdown */}
                <div className="md:col-span-4">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-slate-700 rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-2xs cursor-pointer"
                  >
                    <option value="all">All Employment Types</option>
                    <option value="full-time">Full-Time</option>
                    <option value="contract">Contract / Consulting</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>
              </div>

              {/* Department Pills */}
              <div className="flex items-center gap-2 flex-wrap pt-2">
                {DEPARTMENTS.map((dept) => {
                  const count = deptCounts[dept.id] || 0;
                  const isActive = selectedDept === dept.id;
                  const Icon = dept.icon;

                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className={`px-3.5 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0066FF] text-white shadow-xs ring-2 ring-[#0066FF]/20'
                          : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-[#0B1938]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{dept.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200/90 text-slate-700'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6 px-1">
              <span className="font-mono text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Showing <strong className="text-[#0066FF]">{filteredCareers.length}</strong> Open Position{filteredCareers.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Job Listings */}
            {isLoading && (!careersData || careersData.length === 0) ? (
              <div className="py-12">
                <div className="flex flex-col items-center justify-center text-center space-y-3 mb-10">
                  <div className="w-10 h-10 border-3 border-blue-100 border-t-[#0066FF] rounded-full animate-spin"></div>
                  <p className="font-mono text-xs text-slate-500 tracking-widest uppercase font-semibold">
                    Loading Engineering Openings...
                  </p>
                </div>
                <div className="space-y-5 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-4">
                      <div className="w-28 h-5 bg-slate-100 rounded" />
                      <div className="w-1/2 h-7 bg-slate-100 rounded" />
                      <div className="w-3/4 h-4 bg-slate-50 rounded" />
                      <div className="w-full h-10 bg-slate-50 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredCareers.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-12 h-12 bg-blue-50 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1938] uppercase mb-1">
                  No Matching Roles Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-sans mb-6">
                  We couldn't find any openings matching your current search criteria. Try resetting your filters or submit a general application.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#0066FF] text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#0052CC] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredCareers.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 sm:p-8 bg-white border border-slate-200/90 hover:border-[#0066FF]/60 rounded-2xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group shadow-xs hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    {/* Left Blue Accent on Hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="space-y-3.5 flex-1">
                      {/* Department & Badges Row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 bg-blue-50 border border-blue-200/80 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider text-[#0066FF]">
                          {job.department || 'Engineering'}
                        </span>
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-mono text-[11px] font-medium">
                          {job.employmentType || 'Full-Time'}
                        </span>
                        {job.experience && (
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md font-mono text-[11px] font-medium">
                            {job.experience}
                          </span>
                        )}
                      </div>

                      {/* Job Title */}
                      <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#0B1938] group-hover:text-[#0066FF] transition-colors">
                        {job.title}
                      </h2>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
                        {job.shortDescription}
                      </p>

                      {/* Meta Tags Row */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs pt-1">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                          <span>{job.location || 'Remote (Global)'}</span>
                        </div>
                        {job.salaryRange && (
                          <div className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{job.salaryRange}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right CTA */}
                    <div className="shrink-0 lg:pl-6 lg:border-l lg:border-slate-100 flex flex-col sm:flex-row lg:flex-col gap-3">
                      <Link to={`/careers/${job.slug}`} className="w-full">
                        <Button 
                          variant="primary" 
                          size="md" 
                          className="w-full justify-center group/btn font-mono text-xs font-bold"
                          rightIcon={<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                        >
                          View Role & Apply
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* ================= PERKS & BENEFITS ================= */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                  PERKS & ENGINEERING CULTURE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-[#0B1938]">
                BUILT FOR SENIOR BUILDERS
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                We believe exceptional engineers should be compensated like elite athletes, given autonomy, and freed from administrative drag.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PERKS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={i}
                    className="p-7 bg-white border border-slate-200/90 hover:border-[#0066FF]/40 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 space-y-3 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-display uppercase text-[#0B1938] tracking-tight">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ================= 4-STEP HIRING PROCESS ================= */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-slate-200/80">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                  TRANSPARENT RECRUITING
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-[#0B1938]">
                OUR 4-STEP HIRING PROCESS
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-sans">
                We respect your time. Our interview process is lean, transparent, and completed in under two weeks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HIRING_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-2xl text-[#0066FF]/40">
                        {step.step}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-[10px] font-mono font-bold text-[#0066FF]">
                        {step.time}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base uppercase text-[#0B1938] tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ================= OPEN APPLICATION CTA ================= */}
        <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
          <Container>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B1938] via-[#0D1F4D] to-[#0066FF] text-white relative overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-200">
                    GENERAL APPLICATION
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight leading-tight">
                  Don't See Your Exact Role?
                </h2>

                <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-2xl">
                  We are always on the hunt for world-class builders, security researchers, and systems architects. Send us your GitHub, portfolio, or resume and tell us what you want to build.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link to="/contact">
                    <button className="px-6 py-3 bg-white text-[#0B1938] hover:bg-slate-100 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer inline-flex items-center gap-2">
                      <span>Send Open Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  <a 
                    href="mailto:careers@buildzonetechnology.com" 
                    className="font-mono text-xs text-slate-300 hover:text-white uppercase tracking-wider font-semibold underline underline-offset-4"
                  >
                    Email: careers@buildzonetechnology.com
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Careers;
