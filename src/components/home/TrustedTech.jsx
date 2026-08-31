import React from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Cloud, 
  Box, 
  Sparkles, 
  Layers,
  Smartphone
} from 'lucide-react';

const techStack = [
  { name: 'React', icon: Code2, category: 'Frontend' },
  { name: 'Next.js', icon: Layers, category: 'SSR' },
  { name: 'TypeScript', icon: Terminal, category: 'Language' },
  { name: 'Node.js', icon: ServerIcon, category: 'Backend' },
  { name: 'Python', icon: Terminal, category: 'AI / Backend' },
  { name: 'AWS Cloud', icon: Cloud, category: 'DevOps' },
  { name: 'PostgreSQL', icon: Database, category: 'Database' },
  { name: 'Docker', icon: Box, category: 'Containers' },
  { name: 'OpenAI & LLMs', icon: Cpu, category: 'AI' },
  { name: 'Tailwind CSS', icon: Sparkles, category: 'Design' },
  { name: 'Flutter', icon: Smartphone, category: 'Mobile' },
  { name: 'Kubernetes', icon: Box, category: 'Orchestration' },
  { name: 'FastAPI', icon: Terminal, category: 'Python API' },
  { name: 'Redis', icon: Database, category: 'Caching' },
  { name: 'GraphQL', icon: Code2, category: 'API' },
];

function ServerIcon(props) {
  return <Terminal {...props} />;
}

export const TrustedTech = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...techStack, ...techStack];

  return (
    <div className="relative py-5 sm:py-6 bg-white border-y border-slate-200 overflow-hidden select-none">
      
      {/* Top/Bottom Micro Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      {/* Left & Right Gradient Blur Fade Masks */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center">
        {/* Left Sticky / Fixed Label Badge on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pl-8 pr-6 shrink-0 z-20 bg-white border-r border-slate-100 py-1">
          <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>
          <span className="font-mono text-xs text-[#0B1938] uppercase tracking-widest font-black whitespace-nowrap">
            ENTERPRISE STACK:
          </span>
        </div>

        {/* Infinite Moving Marquee Ribbon (Right to Left) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex items-center gap-3 sm:gap-4 py-1">
            {marqueeItems.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`${tech.name}-${idx}`}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#F8FAFC] border border-slate-200 hover:border-[#0066FF] hover:bg-blue-50/80 transition-all rounded-lg shrink-0 shadow-2xs group cursor-default"
                >
                  <div className="w-5 h-5 rounded bg-white border border-slate-200/80 flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#0B1938] group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-semibold px-1.5 py-0.5 bg-slate-100 rounded group-hover:bg-blue-100 group-hover:text-[#0066FF] transition-colors hidden sm:inline-block">
                    {tech.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </div>
  );
};

export default TrustedTech;
