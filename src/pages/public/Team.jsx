import React, { useState, useMemo } from 'react';
import { Terminal, Users, Code, ShieldCheck, Cpu, Layout, Cloud, Sparkles } from 'lucide-react';
import { useGetTeamQuery } from '../../services/api';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';
import { LinkedInIcon, GitHubIcon } from '../../components/common/BrandIcons';

// Helper function to map positions to departments if not explicitly set
export const getDepartment = (member) => {
  if (member?.department) return member.department;
  
  const pos = (member?.position || '').toLowerCase();
  if (pos.includes('qa') || pos.includes('test') || pos.includes('quality') || pos.includes('automation')) {
    return 'Quality Assurance';
  }
  if (pos.includes('ai') || pos.includes('ml') || pos.includes('machine learning') || pos.includes('data')) {
    return 'AI & Data';
  }
  if (pos.includes('design') || pos.includes('ui') || pos.includes('ux') || pos.includes('product')) {
    return 'Product & Design';
  }
  if (pos.includes('devops') || pos.includes('cloud') || pos.includes('security') || pos.includes('sysadmin')) {
    return 'DevOps & Cloud';
  }
  if (pos.includes('dev') || pos.includes('engineer') || pos.includes('frontend') || pos.includes('backend') || pos.includes('fullstack') || pos.includes('software')) {
    return 'Engineering';
  }
  return 'Leadership';
};

const DEPARTMENTS = [
  { id: 'all', label: 'All Specialists', icon: Users },
  { id: 'Leadership', label: 'Leadership & Partners', icon: Sparkles },
  { id: 'Engineering', label: 'Software Developers', icon: Code },
  { id: 'Quality Assurance', label: 'QA & Testing', icon: ShieldCheck },
  { id: 'AI & Data', label: 'AI & Machine Learning', icon: Cpu },
  { id: 'Product & Design', label: 'UI/UX & Product', icon: Layout },
  { id: 'DevOps & Cloud', label: 'Cloud & DevOps', icon: Cloud },
];

export const Team = () => {
  const { data: teamData, isLoading } = useGetTeamQuery();
  const [activeTab, setActiveTab] = useState('all');

  const team = useMemo(() => (Array.isArray(teamData) ? teamData : []), [teamData]);

  // Filtered list based on active department tab
  const filteredTeam = useMemo(() => {
    if (activeTab === 'all') return team;
    return team.filter((m) => getDepartment(m) === activeTab);
  }, [team, activeTab]);

  // Counts for each tab
  const departmentCounts = useMemo(() => {
    const counts = { all: team.length };
    team.forEach((m) => {
      const dept = getDepartment(m);
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return counts;
  }, [team]);

  return (
    <>
      <SEOHead
        title="Our Team — Software Engineers, QA Testers & Leadership | BuildZone"
        description="Meet BuildZone's elite digital engineering talent: Senior Software Developers, QA Engineers, AI Researchers, and Executive Architects."
      />

      <div className="py-14 sm:py-24 bg-white min-h-[70vh]">
        <Container>
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENGINEERING TALENT & LEADERSHIP
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4 leading-tight">
              MEET OUR TEAM
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Explore our multidisciplinary teams across Executive Leadership, Software Development, Quality Assurance, and AI Engineering.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-16">
            {DEPARTMENTS.map((dept) => {
              const count = departmentCounts[dept.id] || 0;
              const isActive = activeTab === dept.id;
              const Icon = dept.icon;

              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0066FF] text-white shadow-sm ring-2 ring-[#0066FF]/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0B1938]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{dept.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Team Members Grid - Clean, Simple, Borderless */}
          {filteredTeam.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="w-12 h-12 bg-blue-50 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#0B1938] uppercase mb-1">
                No Team Members Found
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                {activeTab === 'all'
                  ? 'Add your first partner or specialist from the Admin Portal.'
                  : `No members assigned to ${DEPARTMENTS.find(d => d.id === activeTab)?.label || 'this department'} yet.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
              {filteredTeam.map((member, idx) => {
                const memberId = member.id || member._id || `team-${idx}`;
                const dept = getDepartment(member);
                const skillsList = Array.isArray(member.skills)
                  ? member.skills
                  : typeof member.skills === 'string'
                  ? member.skills.split(',').map((s) => s.trim()).filter(Boolean)
                  : [];

                return (
                  <div
                    key={memberId}
                    className="flex flex-col items-start group transition-all duration-300"
                  >
                    {/* Portrait Image Container - Proper sizing & clean rounded styling */}
                    <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative mb-5 shadow-xs">
                      <img
                        src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                        alt={member.name || 'BuildZone team member'}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      
                      {/* Department Badge Top Left */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider text-[#0066FF] shadow-2xs">
                          {dept}
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xl font-bold font-display uppercase tracking-tight text-[#0B1938] group-hover:text-[#0066FF] transition-colors">
                          {member.name}
                        </h2>

                        {/* Social Links */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors"
                              aria-label={`${member.name} LinkedIn Profile`}
                            >
                              <LinkedInIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-slate-400 hover:text-[#0B1938] hover:bg-slate-100 rounded-lg transition-colors"
                              aria-label={`${member.name} GitHub Profile`}
                            >
                              <GitHubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                        {member.position || 'Specialist'}
                      </p>

                      {member.bio && (
                        <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-1 line-clamp-3">
                          {member.bio}
                        </p>
                      )}

                      {/* Skills Chips */}
                      {skillsList.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {skillsList.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-mono text-[10px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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

export default Team;
