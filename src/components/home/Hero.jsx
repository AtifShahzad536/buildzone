import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ArrowRight, 
  Play, 
  Users, 
  Rocket, 
  Award, 
  Headphones, 
  Search, 
  Bell, 
  User, 
  TrendingUp, 
  CheckCircle2, 
  Check, 
  Sparkles,
  X,
  Layers,
  LayoutGrid,
  CheckSquare,
  BarChart2,
  FileText,
  Settings,
  Wifi,
  Battery
} from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';

export const Hero = () => {
  const settings = useSelector((state) => state.settings);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Settings values with defaults matching screenshot
  const badgeText = settings?.heroBadgeText || "SOFTWARE SOLUTIONS THAT DRIVE REAL IMPACT";
  const titlePrefix = settings?.heroTitlePrefix || "We Build Digital Products That";
  const titleAccent = settings?.heroTitleAccent || "Scale Your Business";
  const subtitle = settings?.heroDescription || "BuildZone is a software house delivering custom web, mobile, and AI-powered solutions that help startups and enterprises innovate, automate and grow.";
  const heroVideoUrl = settings?.heroVideoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const heroMediaType = settings?.heroMediaType || "mockup"; // "mockup" | "video"

  const isEmbedVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('player.vimeo.com') || url.includes('vimeo.com');
  };

  const stats = [
    { icon: Users, value: settings?.statsClients || "150+", label: "Happy Clients" },
    { icon: Rocket, value: settings?.statsProjects || "250+", label: "Projects Delivered" },
    { icon: Award, value: settings?.statsExperience || "5+", label: "Years of Experience" },
    { icon: Headphones, value: settings?.statsSupport || "24/7", label: "Support Available" },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-[#FAFCFF]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/60 via-indigo-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-100/40 to-transparent rounded-full blur-2xl pointer-events-none -z-0"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Clean High-Impact Headline & Copy                            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* 1. Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] inline-block"></span>
              <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                {badgeText}
              </span>
            </div>

            {/* 2. Main High-Impact Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black font-display tracking-tight text-[#0B1938] leading-[1.12]">
              {titlePrefix}{' '}
              <span className="text-[#0066FF] block sm:inline">
                {titleAccent}
              </span>
            </h1>

            {/* 3. Subtitle Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* 4. Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link to="/start-project">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-sm"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:border-[#0066FF] text-[#0B1938] hover:text-[#0066FF] rounded-lg font-sans text-sm font-semibold transition-all flex items-center gap-2 shadow-2xs cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-[#0066FF] flex items-center justify-center text-[#0066FF] transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Intro</span>
              </button>
            </div>

            {/* 5. Four Stats Row Below CTAs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 text-left">
                    <div className="text-[#0066FF] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-black text-lg sm:text-xl text-[#0B1938] leading-none">
                        {stat.value}
                      </div>
                      <div className="font-sans text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Pixel-Perfect SaaS Dashboard & Mobile Device Showcase       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative w-full pt-4 lg:pt-0">
            
            {/* If Admin chose Showcase Video (Laptop & Mobile Website Scroll Animation) */}
            {heroMediaType === 'video' && heroVideoUrl ? (
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(11,25,56,0.12)] border border-slate-200 bg-white group">
                {isEmbedVideo(heroVideoUrl) ? (
                  <div className="w-full aspect-video">
                    <iframe
                      src={heroVideoUrl}
                      title="BuildZone Product Video"
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/10] sm:aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
                    <video
                      src={heroVideoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    {/* Subtle Live Demo Badge */}
                    <div className="absolute top-3.5 right-3.5 pointer-events-none">
                      <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold rounded-full flex items-center gap-1.5 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        LIVE SHOWCASE
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Interactive SaaS Dashboard Mockup + Overlapping Mobile Frame */
              <div className="relative w-full max-w-[620px] mx-auto perspective-1000">
                
                {/* 1. Main Desktop SaaS Dashboard Container */}
                <div className="bg-white border border-slate-200/90 rounded-2xl shadow-[0_20px_50px_rgba(11,25,56,0.08)] overflow-hidden font-sans text-xs transition-transform duration-300 hover:shadow-[0_25px_60px_rgba(0,102,255,0.12)]">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#0066FF] rounded flex items-center justify-center text-white font-black text-[10px]">
                        B
                      </div>
                      <span className="font-display font-bold text-sm text-[#0B1938] tracking-tight">
                        Build<span className="text-[#0066FF]">Zone</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                      <Search className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                      <div className="relative">
                        <Bell className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] absolute -top-0.5 -right-0.5"></span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Body (Sidebar + Content) */}
                  <div className="grid grid-cols-12 min-h-[360px]">
                    
                    {/* Left Mini Sidebar */}
                    <div className="col-span-3 border-r border-slate-100 bg-[#FAFBFD] p-3 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#EFF6FF] text-[#0066FF] font-bold rounded-lg border border-blue-100 shadow-2xs">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Overview</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Projects</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Tasks</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <Users className="w-3.5 h-3.5" />
                        <span>Team</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Reports</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-9 p-4 space-y-4">
                      
                      {/* Overview Header */}
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wide text-[#0B1938]">
                          Overview
                        </h4>
                      </div>

                      {/* 4 Metric Cards */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <div className="text-[10px] text-slate-400 font-medium">Total Users</div>
                          <div className="font-display font-bold text-sm text-[#0B1938] mt-0.5">12,540</div>
                          <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">↑ 12.5%</div>
                        </div>

                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <div className="text-[10px] text-slate-400 font-medium">Revenue</div>
                          <div className="font-display font-bold text-sm text-[#0B1938] mt-0.5">$45,780</div>
                          <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">↑ 8.2%</div>
                        </div>

                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <div className="text-[10px] text-slate-400 font-medium">Orders</div>
                          <div className="font-display font-bold text-sm text-[#0B1938] mt-0.5">1,250</div>
                          <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">↑ 15.7%</div>
                        </div>

                        <div className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <div className="text-[10px] text-slate-400 font-medium">Conversion</div>
                          <div className="font-display font-bold text-sm text-[#0B1938] mt-0.5">3.45%</div>
                          <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">↑ 6.1%</div>
                        </div>
                      </div>

                      {/* Middle Row: Revenue Chart & Top Channels */}
                      <div className="grid grid-cols-12 gap-3">
                        
                        {/* Revenue Overview Curve */}
                        <div className="col-span-7 p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-bold text-[11px] text-[#0B1938]">
                              Revenue Overview
                            </span>
                            <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                              $45,780 ↑ 8.2%
                            </span>
                          </div>

                          {/* SVG Line Chart */}
                          <div className="h-28 w-full relative">
                            <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
                              <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              
                              {/* Grid lines */}
                              <line x1="0" y1="20" x2="200" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="1" />

                              {/* Filled Area */}
                              <path
                                d="M 0,65 Q 25,50 50,60 T 100,45 T 150,30 T 200,10 L 200,80 L 0,80 Z"
                                fill="url(#blueGrad)"
                              />

                              {/* Curve Line */}
                              <path
                                d="M 0,65 Q 25,50 50,60 T 100,45 T 150,30 T 200,10"
                                fill="none"
                                stroke="#0066FF"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />

                              {/* Peak dot */}
                              <circle cx="200" cy="10" r="3.5" fill="#0066FF" stroke="#FFFFFF" strokeWidth="1.5" />
                            </svg>

                            {/* X-Axis Months */}
                            <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1 px-1">
                              <span>Jan</span>
                              <span>Feb</span>
                              <span>Mar</span>
                              <span>Apr</span>
                              <span>May</span>
                              <span>Jun</span>
                            </div>
                          </div>
                        </div>

                        {/* Top Channels Donut */}
                        <div className="col-span-5 p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between">
                          <span className="font-display font-bold text-[11px] text-[#0B1938]">
                            Top Channels
                          </span>

                          <div className="flex items-center justify-center my-1">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="24"
                                stroke="#EFF6FF"
                                strokeWidth="7"
                                fill="transparent"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="24"
                                stroke="#0066FF"
                                strokeWidth="7"
                                strokeDasharray="150"
                                strokeDashoffset="45"
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            </svg>
                          </div>

                          <div className="space-y-0.5 text-[9px] font-mono">
                            <div className="flex items-center justify-between text-slate-600">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span> Web
                              </span>
                              <span className="font-bold">60%</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-600">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> Mobile
                              </span>
                              <span className="font-bold">25%</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-600">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> API
                              </span>
                              <span className="font-bold">15%</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Row: Recent Activity */}
                      <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                        <span className="font-display font-bold text-[11px] text-[#0B1938] block mb-2">
                          Recent Activity
                        </span>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-[#0066FF]" />
                              New user registered
                            </span>
                            <span className="font-mono text-[9px] text-slate-400">2m ago</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              New order received
                            </span>
                            <span className="font-mono text-[9px] text-slate-400">15m ago</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                              Subscription updated
                            </span>
                            <span className="font-mono text-[9px] text-slate-400">1h ago</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* 2. Overlapping Modern Mobile Smartphone Mockup (Left Front) */}
                <div className="hidden sm:block absolute -left-6 bottom-4 w-44 bg-white border-2 border-slate-300 rounded-[28px] p-2.5 shadow-[0_20px_40px_rgba(11,25,56,0.18)] z-20 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  
                  {/* Phone Speaker & Camera Notch */}
                  <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-1.5"></div>
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-1 text-[8px] font-mono text-slate-400 mb-2">
                    <span className="font-bold">9:41</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" />
                      <Battery className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Phone Inner Screen Content */}
                  <div className="bg-[#FAFBFD] border border-slate-100 rounded-2xl p-2.5 space-y-2.5 text-center">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-slate-500 block">
                        Project Status
                      </span>
                    </div>

                    {/* Circular Progress Meter */}
                    <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="22"
                          stroke="#E2E8F0"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="22"
                          stroke="#0066FF"
                          strokeWidth="4"
                          strokeDasharray="138"
                          strokeDashoffset="34.5"
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display font-black text-xs text-[#0B1938]">75%</span>
                        <span className="text-[6.5px] font-mono text-slate-400 uppercase">Completed</span>
                      </div>
                    </div>

                    {/* Tasks Checklist */}
                    <div className="text-left space-y-1 pt-1 border-t border-slate-100">
                      <span className="text-[8.5px] font-mono font-bold uppercase text-slate-400 block mb-1">
                        Tasks
                      </span>
                      {[
                        "UI/UX Design",
                        "Development",
                        "Testing",
                        "Deployment"
                      ].map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between text-[9px] text-slate-700">
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#0066FF]"></span>
                            <span className="truncate max-w-[85px]">{task}</span>
                          </span>
                          <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </Container>

      {/* Watch Intro Video Modal Lightbox */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700 aspect-video">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {isEmbedVideo(heroVideoUrl) ? (
              <iframe
                src={heroVideoUrl}
                title="BuildZone Intro Video"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={heroVideoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
