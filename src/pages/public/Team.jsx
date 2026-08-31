import React from 'react';
import { Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { initialTeam } from '../../data/team';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';
import { LinkedInIcon, GitHubIcon } from '../../components/common/BrandIcons';

export const Team = () => {
  return (
    <>
      <SEOHead
        title="Leadership Team & Engineering Partners"
        description="Meet the engineering partners and founders leading software architecture, AI research, and product engineering at BuildZone."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                EXECUTIVE LEADERSHIP
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              MEET THE PARTNERS
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Our partners remain hands-on in technical strategy, system architecture, and client engineering delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {initialTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all flex flex-col justify-between group shadow-sm hover:shadow-md overflow-hidden"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold font-display uppercase text-[#0B1938] mb-1">
                      {member.name}
                    </h2>
                    <p className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-4">
                      {member.position}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Key Technical Skills */}
                    <div className="mb-6">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">
                        Specialized Core Competencies:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <Badge key={skill} size="sm" variant="default">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Handles */}
                <div className="p-6 pt-0 flex items-center gap-3 border-t border-slate-100 mt-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-100 border border-slate-200 rounded text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] transition-all"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-100 border border-slate-200 rounded text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] transition-all"
                      aria-label="GitHub"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}
                  <span className="font-mono text-[10px] text-slate-400 uppercase ml-auto font-semibold">
                    Verified Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Team;
