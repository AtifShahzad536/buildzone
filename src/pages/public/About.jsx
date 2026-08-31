import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  Cpu, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const About = () => {
  return (
    <>
      <SEOHead
        title="About Us — Engineering Philosophy & Mission"
        description="Learn about BuildZone, our engineering leadership, enterprise standards, and mission to engineer impactful digital products."
      />

      <div className="py-12 sm:py-20">
        <Container>
          {/* Top Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENGINEERING EXCELLENCE
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-6 leading-tight">
              WE ARE BUILDZONE
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              A premier software engineering and applied AI consultancy partnering with ambitious startups and global enterprises to build high-scale, mission-critical digital products.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-white border border-slate-200 rounded-lg shadow-sm mb-20">
            {[
              { num: "150+", label: "Products Shipped" },
              { num: "99.9%", label: "Average SLA Uptime" },
              { num: "40+", label: "Senior Engineers" },
              { num: "98%", label: "Client Retention" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black font-display text-[#0066FF] mb-1">
                  {stat.num}
                </div>
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold font-display uppercase text-[#0B1938]">Our Mission</h2>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                To eliminate technical debt before it happens by applying senior architectural rigor, modern cloud primitives, and pragmatic AI automation to build enduring digital products that drive exponential business value.
              </p>
            </div>

            <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold font-display uppercase text-[#0B1938]">Our Vision</h2>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                To be the global benchmark for high-velocity software engineering—recognized for uncompromising code quality, transparent partnerships, and pioneering applications of generative AI and autonomous systems.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <SectionTitle
              badge="Guiding Principles"
              title="How We Engineer & Operate"
              subtitle="Our core values guide every pull request, technical RFC, and client architectural review."
              center
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Architectural Integrity",
                  desc: "We write clean, modular, and type-safe code that scales effortlessly and is easy to maintain long after handoff.",
                  icon: Cpu
                },
                {
                  title: "Radical Transparency",
                  desc: "No hidden bottlenecks or black boxes. Direct communication with your engineering pod via Slack, Jira, and live Git repos.",
                  icon: Users
                },
                {
                  title: "Security by Default",
                  desc: "Automated vulnerability scanning, strict zero-trust access, encrypted secrets, and continuous compliance checks.",
                  icon: ShieldCheck
                }
              ].map((val, i) => {
                const Icon = val.icon;
                return (
                  <div key={i} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3">
                    <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-display uppercase text-[#0B1938]">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to action */}
          <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 border border-blue-200/80 rounded-2xl text-center space-y-6 max-w-4xl mx-auto shadow-md">
            <h2 className="text-2xl sm:text-4xl font-black font-display uppercase text-[#0B1938]">
              Meet the Engineers Behind the Architecture
            </h2>
            <p className="text-slate-600 font-sans text-sm max-w-xl mx-auto">
              Our partners and lead architects remain directly hands-on with every enterprise engagement.
            </p>
            <div className="flex flex-row items-center justify-center gap-3">
              <Link to="/team">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Meet Leadership
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="md">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
