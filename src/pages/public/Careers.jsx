import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  CheckCircle2,
  Heart,
  Globe
} from 'lucide-react';
import { useGetCareersQuery } from '../../services/api';
import { initialCareers } from '../../data/careers';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';

export const Careers = () => {
  const { data: careersData } = useGetCareersQuery();
  const careers = (careersData && Array.isArray(careersData) && careersData.length > 0)
    ? careersData
    : initialCareers;

  return (
    <>
      <SEOHead
        title="Careers & Engineering Opportunities"
        description="Join BuildZone's globally distributed team of senior software engineers, AI researchers, and system architects."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                JOIN THE BUILDZONE POD
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              ENGINEER AT SCALE
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We are a high-autonomy, senior engineering organization. We build high-load software systems and applied AI with top-tier compensation and remote-first flexibility.
            </p>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "100% Remote & Async",
                desc: "Work from anywhere on Earth with flexible scheduling focused on shipped code, not hours logged.",
                icon: Globe
              },
              {
                title: "Top-Tier Compensation",
                desc: "Competitive salary ranges benchmarked to top international standards, plus equity and performance bonuses.",
                icon: DollarSign
              },
              {
                title: "High-Caliber Peers",
                desc: "Collaborate directly with senior architects. Zero corporate bureaucracy or micromanagement.",
                icon: Sparkles
              }
            ].map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display uppercase text-[#0B1938]">{perk.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">{perk.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Open Positions List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <SectionTitle
              badge="Active Openings"
              title="Current Engineering Positions"
              subtitle="All positions are open to global candidates with relevant production experience."
            />

            <div className="space-y-4">
              {careers?.map((job) => (
                <div
                  key={job.id}
                  className="p-6 sm:p-8 bg-white border border-slate-200 hover:border-[#0066FF]/50 rounded-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="cyan" size="sm">
                        {job.department}
                      </Badge>
                      <span className="font-mono text-xs text-slate-400 font-semibold">• {job.employmentType}</span>
                    </div>

                    <h2 className="text-xl font-bold font-display uppercase text-[#0B1938] group-hover:text-[#0066FF] transition-colors">
                      {job.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-xl">
                      {job.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-500 pt-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{job.salaryRange}</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/careers/${job.slug}`} className="shrink-0">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      View Role & Apply
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Careers;
