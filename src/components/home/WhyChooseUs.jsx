import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Users, 
  FileCode2, 
  TrendingUp,
} from 'lucide-react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';

const reasons = [
  {
    icon: Cpu,
    title: "Senior Engineering Pods",
    desc: "Direct access to principal architects and senior engineers with zero junior offshoring layers.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    desc: "Strict adherence to SOC 2, HIPAA, ISO 27001 standards, and OWASP Top 10 automated CI/CD audits.",
  },
  {
    icon: Zap,
    title: "Sprint-Driven Velocity",
    desc: "Iterative 2-week agile sprints with bi-weekly live staging demos and measurable milestone burn-downs.",
  },
  {
    icon: FileCode2,
    title: "Full Code & IP Ownership",
    desc: "100% intellectual property ownership transferred upon deployment with comprehensive documentation.",
  },
  {
    icon: TrendingUp,
    title: "Architected for Scale",
    desc: "Distributed microservices and database clustering ready for million+ concurrent users from day one.",
  },
  {
    icon: Users,
    title: "Transparent Communication",
    desc: "Shared Slack channels, Jira boards, and continuous executive alignment with 24/7 dedicated support.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <Container>
        <SectionTitle
          badge="Why BuildZone"
          title="The Engineering Advantage"
          subtitle="We bridge cutting-edge technology with pragmatic business ROI, ensuring software that lasts."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-[#F8FAFC] border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all duration-200 group hover:-translate-y-1 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-bold text-lg uppercase text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
