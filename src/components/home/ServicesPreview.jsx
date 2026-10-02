import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Cloud, 
  Layers, 
  PenTool, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Container from '../common/Container';
import ScrollReveal from '../common/ScrollReveal';

export const ServicesPreview = () => {
  const services = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Custom websites and web applications built for performance, security and scale.',
      icon: Globe,
      slug: 'web-development'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps that deliver seamless experiences.',
      icon: Smartphone,
      slug: 'mobile-app-development'
    },
    {
      id: 'ai-dev',
      title: 'AI & Automation',
      description: 'Intelligent solutions to automate workflows, reduce manual work and boost productivity.',
      icon: Cpu,
      slug: 'ai-development'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and DevOps practices for reliable and fast delivery.',
      icon: Cloud,
      slug: 'cloud-devops'
    },
    {
      id: 'saas-dev',
      title: 'SaaS Development',
      description: 'Secure, scalable and feature-rich SaaS products built for growth.',
      icon: Layers,
      slug: 'saas-development'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'User-centered designs that create engaging and impactful digital experiences.',
      icon: PenTool,
      slug: 'ui-ux-design'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0A1128] relative border-t border-slate-800/80">
      <Container>
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#00F0FF] block">
              WHAT WE DO • SIALKOT'S TOP SOFTWARE AGENCY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              Enterprise Software & AI Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              End-to-end custom software development, mobile apps, ERPs, and custom AI engineered by the premier software agency in Sialkot.
            </p>
          </div>
        </ScrollReveal>

        {/* 6-Card Grid with Staggered Scroll Reveal */}
        <ScrollReveal animation="fade-up" delay={0.15} stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/services/${item.slug}`}
                className="group flex flex-col items-center text-center p-7 rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-[#0066FF]/60 hover:bg-[#111E38] transition-all duration-300 transform hover:-translate-y-1.5 shadow-sm hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Outlined Icon Circle */}
                <div className="w-16 h-16 rounded-full border border-[#0066FF]/30 group-hover:border-[#00F0FF] bg-[#0066FF]/10 group-hover:bg-[#0066FF] flex items-center justify-center text-[#00F0FF] group-hover:text-white transition-all duration-300 mb-5 shadow-xs shadow-blue-500/20 group-hover:shadow-md group-hover:scale-105">
                  <Icon className="w-7 h-7 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </ScrollReveal>
      </Container>
    </section>
  );
};

export default ServicesPreview;
