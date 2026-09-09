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
    <section className="py-16 sm:py-24 bg-white relative border-t border-slate-100">
      <Container>
        {/* Section Header Matching Screenshot */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF] block">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#0B1938]">
            Our Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            End-to-end software solutions tailored to your business goals.
          </p>
        </div>

        {/* 6-Card Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/services/${item.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50/80 transition-all duration-200"
              >
                {/* Outlined Icon Circle */}
                <div className="w-16 h-16 rounded-full border border-blue-200 group-hover:border-[#0066FF] bg-blue-50/40 group-hover:bg-[#0066FF] flex items-center justify-center text-[#0066FF] group-hover:text-white transition-all duration-300 mb-5 shadow-2xs group-hover:shadow-md group-hover:scale-105">
                  <Icon className="w-7 h-7 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-[#0B1938] group-hover:text-[#0066FF] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ServicesPreview;
