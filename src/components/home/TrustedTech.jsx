import React from 'react';

// =========================================================================
// Official Brand SVG Icons (High Quality, Scalable, Exact Brand Colors)
// =========================================================================

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
  </svg>
);

const NextjsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
    <circle cx="12" cy="12" r="12" fill="#000000" />
    <path fill="#FFFFFF" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.592l-5.834-8.08V17.5h-1.5V6.408h1.5l5.834 8.08V6.408h1.5v11.184h-1.5z" />
  </svg>
);

const TypeScriptLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path fill="#FFFFFF" d="M12.5 13.5h-2v6H8v-6H6V11h6.5v2.5zm8.2 2.2c-.3 1.8-1.7 3.3-4.2 3.3-2.6 0-4.3-1.6-4.3-4.2 0-2.8 1.9-4.2 4.6-4.2 1.5 0 2.8.5 3.5 1.2l-1.4 1.8c-.5-.4-1.2-.8-2.1-.8-1.2 0-2 .7-2 1.9 0 1.2.7 1.9 2 1.9.9 0 1.5-.3 1.9-.7v-1h-2v-2h4.3v2.8z" />
  </svg>
);

const NodejsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#539E43" d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" />
    <path fill="#FFFFFF" d="M12 5.5l6.5 3.8v7.4L12 20.5 5.5 16.7V9.3L12 5.5z" opacity="0.3" />
    <path fill="#FFFFFF" d="M12 7.5c-2.5 0-4.5 1.5-4.5 4s2 4 4.5 4 4.5-1.5 4.5-4-2-4-4.5-4zm0 6c-1.4 0-2.5-.9-2.5-2s1.1-2 2.5-2 2.5.9 2.5 2-1.1 2-2.5 2z" />
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#3776AB" d="M11.8 2c-4.4 0-4.1 1.9-4.1 1.9l.01 2h4.2v.6H5.6S2 6.1 2 10.5c0 4.4 3.1 4.3 3.1 4.3h1.9v-2.6c0-3 2.5-2.8 2.5-2.8h4.3s2.4.1 2.4-2.4V4.4S16.4 2 11.8 2zm-1.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
    <path fill="#FFD438" d="M12.2 22c4.4 0 4.1-1.9 4.1-1.9l-.01-2h-4.2v-.6h6.3s3.6.4 3.6-4c0-4.4-3.1-4.3-3.1-4.3h-1.9v2.6c0 3-2.5 2.8-2.5 2.8H10s-2.4-.1-2.4 2.4v2.6s-.2 2.4 4.6 2.4zm1.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
  </svg>
);

const AwsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#FF9900" d="M18.8 16.5c-3.1 2.2-7.5 3.3-11.4 3.3-5.4 0-10.3-2-14-5.3-.3-.3-.1-.7.3-.5 4.1 2.4 9.1 3.8 14.2 3.8 3.5 0 7.4-.8 10.4-2.5.5-.3.9.2.5.7z" />
    <path fill="#FF9900" d="M20.2 15.2c-.4-.5-2.6-.2-3.6-.1-.3 0-.4-.3-.1-.5 1.7-1.3 4.5-.9 4.8-.4.3.4-.2 3.2-1.8 4.7-.2.2-.5.1-.4-.2.4-.9 1.5-3 1.1-3.5z" />
    <path fill="#FFFFFF" d="M7.4 6.7c0-.9.6-1.5 1.7-1.5 1.2 0 1.8.6 1.8 1.5v6.5H8.7V7.5c0-.4-.2-.6-.6-.6-.4 0-.7.2-.7.6v5.7H5.2V6.7z" />
  </svg>
);

const PostgreSqlLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.7-.1-1.6.2-2.3.3-.8.8-1.5 1.4-2-.4-.9-.6-1.9-.6-3 0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5c0 1.1-.3 2.1-.7 3 .6.5 1.1 1.2 1.4 2 .3.7.3 1.6.2 2.3C19.5 19.6 22 16.1 22 12c0-5.5-4.5-10-10-10z" />
    <circle cx="9.5" cy="11.5" r="1.2" fill="#FFFFFF" />
    <circle cx="14.5" cy="11.5" r="1.2" fill="#FFFFFF" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#2496ED">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185zm-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zM23.79 11.53c-.3-.205-.882-.363-1.643-.284-.143-.888-.69-1.62-1.284-2.193l-.337-.323-.332.327c-.742.73-1.077 1.838-.973 2.85-.453.25-.97.408-1.52.46-.37-.777-1.078-1.34-1.92-1.57l-.37-.1-.132.36c-.332.905-.18 1.93.385 2.7-.428.188-.895.313-1.393.365H.99c-.198 0-.374.126-.44.312-.47 1.343-.58 3.25.32 5.08 1.396 2.84 4.3 4.28 8.636 4.28 6.944 0 12.012-4.14 13.99-10.73.538-.204.88-.65.88-.65l-.586-.595z" />
  </svg>
);

const OpenAiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#10A37F">
    <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0010.72 0a6.074 6.074 0 00-5.746 4.103 5.99 5.99 0 00-3.997 2.9 6.05 6.05 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.771-4.205 5.989 5.989 0 003.997-2.9 6.056 6.056 0 00-.746-7.074zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.677l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071 0l4.83 2.791a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.83-2.787a4.5 4.5 0 016.68 4.66zM8.307 10.992l2.45-1.414 2.45 1.414v2.829l-2.45 1.415-2.45-1.415v-2.83z" />
  </svg>
);

const TailwindLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#38BDF8">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const FlutterLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.714 0h-7.4z" />
    <path fill="#0175C2" d="M14.286 11.571L8.571 17.286l5.715 5.714h7.428l-5.714-5.714 5.714-5.715h-7.428z" />
    <path fill="#54C5F8" d="M8.571 17.286l4.286 4.285 2.857-2.857-4.286-4.285-2.857 2.857z" />
  </svg>
);

const KubernetesLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#326CE5" d="M12 1.5l8.5 4.9v9.8L12 21.1 3.5 16.2V6.4L12 1.5z" />
    <path fill="#FFFFFF" d="M12 4.2l6.2 3.6v7.2L12 18.6 5.8 15V7.8L12 4.2z" opacity="0.4" />
    <circle cx="12" cy="11.4" r="2.2" fill="#FFFFFF" />
    <path stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" d="M12 6.5v2.7m4.2 1.2l-2.3 1.4m0 2.4l2.3 1.4m-6.4 0l2.3-1.4m0-2.4L7.8 10.4" />
  </svg>
);

const FastApiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path fill="#FFFFFF" d="M13.2 4.5L6.5 13.5h5l-1.2 6 7.2-9.5h-5.3l1-5.5z" />
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#DC382D" d="M2.5 7.5L12 2.5l9.5 5v9l-9.5 5-9.5-5v-9z" />
    <path fill="#A3241A" d="M12 2.5v19l9.5-5v-9L12 2.5z" />
    <path fill="#FFFFFF" d="M12 8l4 2.2-4 2.2-4-2.2L12 8z" opacity="0.8" />
  </svg>
);

const GraphqlLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#E10098" d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.3L5.3 8.2v7.6L12 19.7l6.7-3.9V8.2L12 4.3z" />
    <circle cx="12" cy="2" r="2" fill="#E10098" />
    <circle cx="20.7" cy="7" r="2" fill="#E10098" />
    <circle cx="20.7" cy="17" r="2" fill="#E10098" />
    <circle cx="12" cy="22" r="2" fill="#E10098" />
    <circle cx="3.3" cy="17" r="2" fill="#E10098" />
    <circle cx="3.3" cy="7" r="2" fill="#E10098" />
  </svg>
);

const LaravelLogo = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <path fill="#FF2D20" d="M3 6.5l8-4.5 8 4.5v11l-8 4.5-8-4.5v-11z" />
    <path fill="#FFFFFF" d="M11 5.5l5 2.8v5.6L11 16.7 6 13.9V8.3l5-2.8z" opacity="0.3" />
    <path fill="#FFFFFF" d="M9 8l4 2.3v4.6L9 17.2 5 14.9V10.3L9 8z" />
  </svg>
);

// =========================================================================
// Technology Stack Configuration with Official Logos
// =========================================================================

const techStack = [
  { name: 'React', icon: ReactLogo, category: 'Frontend' },
  { name: 'Next.js', icon: NextjsLogo, category: 'SSR' },
  { name: 'TypeScript', icon: TypeScriptLogo, category: 'Language' },
  { name: 'Node.js', icon: NodejsLogo, category: 'Backend' },
  { name: 'Python', icon: PythonLogo, category: 'AI / Backend' },
  { name: 'Flutter', icon: FlutterLogo, category: 'Mobile' },
  { name: 'FastAPI', icon: FastApiLogo, category: 'Python API' },
  { name: 'Kubernetes', icon: KubernetesLogo, category: 'Orchestration' },
  { name: 'Docker', icon: DockerLogo, category: 'Containers' },
  { name: 'AWS Cloud', icon: AwsLogo, category: 'DevOps' },
  { name: 'PostgreSQL', icon: PostgreSqlLogo, category: 'Database' },
  { name: 'Redis', icon: RedisLogo, category: 'Caching' },
  { name: 'Tailwind CSS', icon: TailwindLogo, category: 'Design' },
  { name: 'OpenAI & LLMs', icon: OpenAiLogo, category: 'AI' },
  { name: 'GraphQL', icon: GraphqlLogo, category: 'API' },
  { name: 'Laravel', icon: LaravelLogo, category: 'Backend' },
];

export const TrustedTech = () => {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...techStack, ...techStack];

  return (
    <div className="relative py-5 sm:py-6 bg-[#060B18] border-y border-slate-800/80 overflow-hidden select-none">
      
      {/* Top/Bottom Micro Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent"></div>
      
      {/* Left & Right Gradient Blur Fade Masks */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#060B18] via-[#060B18]/90 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#060B18] via-[#060B18]/90 to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center">
        {/* Left Sticky / Fixed Label Badge on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pl-8 pr-6 shrink-0 z-20 bg-[#060B18] border-r border-slate-800 py-1">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse"></span>
          <span className="font-sans text-xs text-[#00F0FF] uppercase tracking-wider font-bold whitespace-nowrap">
            ENTERPRISE STACK:
          </span>
        </div>

        {/* Infinite Moving Marquee Ribbon (Right to Left) */}
        <div className="overflow-hidden w-full flex select-none">
          {/* Track 1 */}
          <div className="animate-marquee flex shrink-0 items-center gap-3 sm:gap-4 py-1 pr-4 will-change-transform">
            {techStack.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={`tech1-${tech.name}-${idx}`}
                  className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/50 hover:bg-[#0F1E38] transition-all duration-200 rounded-xl shrink-0 shadow-lg group cursor-default"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#122038] border border-slate-700/60 flex items-center justify-center p-1 group-hover:scale-110 group-hover:border-[#00F0FF]/40 transition-all">
                    <IconComponent />
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-slate-200 group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-wide text-[#00F0FF] font-semibold px-1.5 py-0.5 bg-[#070E1C] border border-[#00F0FF]/20 rounded-md group-hover:bg-[#00F0FF]/15 group-hover:text-white transition-colors hidden sm:inline-block">
                    {tech.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Track 2 (Duplicate for Seamless Infinite Loop) */}
          <div className="animate-marquee flex shrink-0 items-center gap-3 sm:gap-4 py-1 pr-4 will-change-transform" aria-hidden="true">
            {techStack.map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={`tech2-${tech.name}-${idx}`}
                  className="flex items-center gap-2.5 px-3.5 sm:px-4 py-2 bg-[#0B1528] border border-slate-800 hover:border-[#00F0FF]/50 hover:bg-[#0F1E38] transition-all duration-200 rounded-xl shrink-0 shadow-lg group cursor-default"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#122038] border border-slate-700/60 flex items-center justify-center p-1 group-hover:scale-110 group-hover:border-[#00F0FF]/40 transition-all">
                    <IconComponent />
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-slate-200 group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-wide text-[#00F0FF] font-semibold px-1.5 py-0.5 bg-[#070E1C] border border-[#00F0FF]/20 rounded-md group-hover:bg-[#00F0FF]/15 group-hover:text-white transition-colors hidden sm:inline-block">
                    {tech.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent"></div>
    </div>
  );
};

export default TrustedTech;
