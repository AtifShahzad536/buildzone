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
import { useGetSettingsQuery } from '../../services/api';
import Container from '../common/Container';
import Button from '../common/Button';
import ScrollReveal from '../common/ScrollReveal';
import CountUp from '../common/CountUp';

// =========================================================================
// High-Performance Seamless Floating Video Player (0 Box, 0 Borders, 0 Lag)
// =========================================================================
const NormalHeroVideo = ({ src, onError }) => {
  const videoRef = React.useRef(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile Autoplay strict policy requirements
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const handleCanPlay = () => {
      setIsReady(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Mobile autoplay prevented:", err);
          setIsReady(true);
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);

    // Initial attempt
    const initialPromise = video.play();
    if (initialPromise !== undefined) {
      initialPromise.catch(() => {});
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
    };
  }, [src]);

  return (
    <div className="relative w-full flex items-center justify-center overflow-visible py-2 sm:py-6 bg-transparent border-0 shadow-none rounded-none">
      {/* Underlying Cyber Backlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/35 via-[#00F0FF]/25 to-transparent rounded-full blur-3xl pointer-events-none scale-125 animate-pulse-glow" />

      {/* Seamless Floating Video Player (0 Box, 0 Background, 0 Borders, 0 Corners) */}
      <div className="relative w-full max-w-[850px] flex items-center justify-center overflow-visible bg-transparent border-0 shadow-none rounded-none">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={() => setIsReady(true)}
          onError={onError}
          style={{
            backgroundColor: 'transparent',
            mixBlendMode: 'screen',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            borderRadius: '0px'
          }}
          className={`w-full max-w-[850px] h-auto max-h-[780px] sm:max-h-[850px] lg:max-h-[950px] object-contain bg-transparent border-0 outline-none ring-0 shadow-none rounded-none mix-blend-screen transform transition-all duration-700 ease-out will-change-transform animate-float scale-100 sm:scale-115 lg:scale-130 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export const Hero = () => {
  const reduxSettings = useSelector((state) => state.settings);
  const { data: dbSettings } = useGetSettingsQuery();
  const settings = (dbSettings && typeof dbSettings === 'object' && Object.keys(dbSettings).length > 0)
    ? { ...reduxSettings, ...dbSettings }
    : reduxSettings;

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [isEmbedPlaying, setIsEmbedPlaying] = useState(false);

  // Settings values with defaults matching local SEO ranking requirements
  const badgeText = settings?.heroBadgeText || "⭐ BEST SOFTWARE AGENCY IN SIALKOT • GLOBAL IT ENGINEERING";
  const titlePrefix = settings?.heroTitlePrefix || "We Build Digital Products That";
  const titleAccent = settings?.heroTitleAccent || "Scale Your Business";
  const subtitle = settings?.heroDescription || "BuildZone Technology is the premier software agency in Sialkot, delivering custom enterprise ERPs, mobile apps, scalable web portals, and AI-powered solutions that help businesses and exporters grow globally.";

  const rawVideoUrl = settings?.heroVideoUrl || "https://youtu.be/egpm1YixC4Q";
  const heroVideoUrl = rawVideoUrl.includes('youtube.com/embed')
    ? rawVideoUrl.replace('youtube.com/embed', 'youtube-nocookie.com/embed')
    : rawVideoUrl;
  const heroMediaType = settings?.heroMediaType || "video"; // 'video' | 'mockup'

  const isEmbedVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtube-nocookie.com') || url.includes('youtu.be') || url.includes('player.vimeo.com') || url.includes('vimeo.com');
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  const stats = [
    { icon: Users, value: settings?.statsClients || "150+", label: "Happy Clients" },
    { icon: Rocket, value: settings?.statsProjects || "250+", label: "Projects Delivered" },
    { icon: Award, value: settings?.statsExperience || "5+", label: "Years of Experience" },
    { icon: Headphones, value: settings?.statsSupport || "24/7", label: "Support Available" },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-[#060B18]">
      {/* Background Cyber Ambient Lights & Glow */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#0066FF]/15 via-[#00F0FF]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-600/10 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ========================================================================= */}
          {/* LEFT COLUMN: Clean High-Impact Headline & Copy                            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

            {/* 1. Top Pill Badge */}
            <ScrollReveal animation="fade-down" delay={0.1} duration={0.6}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/15 border border-[#0066FF]/40 rounded-full shadow-xs shadow-blue-500/15">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] inline-block animate-pulse"></span>
                <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#00F0FF]">
                  {badgeText}
                </span>
              </div>
            </ScrollReveal>

            {/* 2. Main High-Impact Headline */}
            <ScrollReveal animation="fade-up" delay={0.2} duration={0.7}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black font-display tracking-tight text-white leading-[1.12]">
                {titlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#38BDF8] block sm:inline drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                  {titleAccent}
                </span>
              </h1>
            </ScrollReveal>

            {/* 3. Subtitle Paragraph */}
            <ScrollReveal animation="fade-up" delay={0.3} duration={0.7}>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>
            </ScrollReveal>

            {/* 4. Action CTAs */}
            <ScrollReveal animation="fade-up" delay={0.4} duration={0.7}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/start-project">
                  <Button
                    variant="primary"
                    size="md"
                    className="bg-[#0066FF] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow-md shadow-blue-500/25 transform transition hover:-translate-y-0.5 border border-blue-400/40"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Start a Project
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-5 py-2.5 bg-[#0B1528] border border-slate-700/80 hover:border-[#0066FF] text-slate-200 hover:text-[#00F0FF] rounded-lg font-sans text-sm font-semibold transition-all flex items-center gap-2 shadow-sm cursor-pointer group transform hover:-translate-y-0.5"
                >
                  <div className="w-6 h-6 rounded-full border border-slate-700 group-hover:border-[#00F0FF] flex items-center justify-center text-[#00F0FF] transition-colors">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Intro</span>
                </button>
              </div>
            </ScrollReveal>

            {/* 5. Four Stats Row Below CTAs with Scroll-Triggered Animated Counters */}
            <ScrollReveal animation="fade-up" delay={0.5} duration={0.7}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2.5 text-left group">
                      <div className="text-[#00F0FF] shrink-0 transition-transform group-hover:scale-110 duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-display font-black text-lg sm:text-xl text-white leading-none">
                          <CountUp value={stat.value} duration={1600} />
                        </div>
                        <div className="font-sans text-[11px] text-slate-400 font-bold leading-tight mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Pixel-Perfect SaaS Dashboard & Mobile Device Showcase       */}
          {/* ========================================================================= */}
          <ScrollReveal animation="zoom-in" delay={0.25} duration={0.8} className="lg:col-span-6 relative w-full pt-4 lg:pt-0 flex items-center justify-center overflow-visible">

            {/* If Admin chose Showcase Video */}
            {heroMediaType === 'video' && heroVideoUrl && !videoLoadError ? (
              <div className="relative w-full flex items-center justify-center bg-transparent border-0 rounded-none shadow-none overflow-visible">
                {isEmbedVideo(heroVideoUrl) ? (
                  <div className="w-full aspect-video border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-950 relative">
                    {isEmbedPlaying ? (
                      <iframe
                        src={`${heroVideoUrl}${heroVideoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                        title="BuildZone Product Video"
                        loading="lazy"
                        className="w-full h-full object-cover border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div
                        onClick={() => setIsEmbedPlaying(true)}
                        className="w-full h-full relative cursor-pointer group flex items-center justify-center bg-slate-950 overflow-hidden"
                      >
                        {getYouTubeId(heroVideoUrl) ? (
                          <img
                            src={`https://i.ytimg.com/vi/${getYouTubeId(heroVideoUrl)}/hqdefault.jpg`}
                            alt="BuildZone Video Showcase Preview"
                            fetchPriority="high"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#060B18] via-[#0066FF]/20 to-slate-950" />
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 group-hover:bg-[#0052cc] transition-all duration-300">
                          <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-white font-sans text-xs font-semibold uppercase tracking-wide border border-white/10 shadow-sm">
                            Click to Watch Video Showcase
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <NormalHeroVideo
                    src={heroVideoUrl}
                    onError={() => setVideoLoadError(true)}
                  />
                )}
              </div>
            ) : (
              /* Interactive SaaS Dashboard Mockup + Overlapping Mobile Frame */
              <div className="relative w-full max-w-[620px] mx-auto perspective-1000 min-h-[420px] sm:min-h-[460px]">

                {/* 1. Main Desktop SaaS Dashboard Container */}
                <div className="bg-[#0B1528] border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans text-xs transition-transform duration-300 hover:shadow-[0_25px_60px_rgba(0,102,255,0.2)] min-h-[420px] sm:min-h-[460px]">

                  {/* Top Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-[#081020]">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#0066FF] rounded flex items-center justify-center text-white font-black text-[10px] shadow-xs shadow-blue-500/40">
                        B
                      </div>
                      <span className="font-display font-bold text-sm text-white tracking-tight">
                        Build<span className="text-[#00F0FF]">Zone</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400">
                      <Search className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                      <div className="relative">
                        <Bell className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] absolute -top-0.5 -right-0.5"></span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Body (Sidebar + Content) */}
                  <div className="grid grid-cols-12 min-h-[360px]">

                    {/* Left Mini Sidebar */}
                    <div className="col-span-3 border-r border-slate-800/80 bg-[#070E1C] p-3 space-y-1 font-sans text-[11.5px]">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#0066FF]/20 text-[#00F0FF] font-bold rounded-lg border border-[#0066FF]/40 shadow-xs">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Overview</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Projects</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Tasks</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <Users className="w-3.5 h-3.5" />
                        <span>Team</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Reports</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 text-slate-400 hover:text-[#00F0FF] hover:bg-slate-800/50 rounded-lg cursor-pointer font-medium">
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-9 p-4 space-y-4 bg-[#0B1528]">

                      {/* Overview Header */}
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs uppercase tracking-wide text-white block">
                          Overview
                        </span>
                      </div>

                      {/* 4 Metric Cards */}
                      <div className="grid grid-cols-4 gap-2">
                        <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                          <div className="text-[10px] text-slate-400 font-bold">Total Users</div>
                          <div className="font-display font-bold text-sm text-white mt-0.5">12,540</div>
                          <div className="text-[9px] text-emerald-400 font-bold mt-0.5">↑ 12.5%</div>
                        </div>

                        <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                          <div className="text-[10px] text-slate-400 font-bold">Revenue</div>
                          <div className="font-display font-bold text-sm text-white mt-0.5">$45,780</div>
                          <div className="text-[9px] text-emerald-400 font-bold mt-0.5">↑ 8.2%</div>
                        </div>

                        <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                          <div className="text-[10px] text-slate-400 font-bold">Orders</div>
                          <div className="font-display font-bold text-sm text-white mt-0.5">1,250</div>
                          <div className="text-[9px] text-emerald-400 font-bold mt-0.5">↑ 15.7%</div>
                        </div>

                        <div className="p-2.5 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                          <div className="text-[10px] text-slate-400 font-bold">Conversion</div>
                          <div className="font-display font-bold text-sm text-white mt-0.5">3.45%</div>
                          <div className="text-[9px] text-emerald-400 font-bold mt-0.5">↑ 6.1%</div>
                        </div>
                      </div>

                      {/* Middle Row: Revenue Chart & Top Channels */}
                      <div className="grid grid-cols-12 gap-3">

                        {/* Revenue Overview Curve */}
                        <div className="col-span-7 p-3 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-bold text-[11px] text-white">
                              Revenue Overview
                            </span>
                            <span className="text-[9.5px] font-sans text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/60 font-bold">
                              $45,780 ↑ 8.2%
                            </span>
                          </div>

                          {/* SVG Line Chart */}
                          <div className="h-28 w-full relative">
                            <svg viewBox="0 0 200 80" className="w-full h-full overflow-visible">
                              <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#0066FF" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>

                              {/* Grid lines */}
                              <line x1="0" y1="20" x2="200" y2="20" stroke="#1E293B" strokeWidth="1" />
                              <line x1="0" y1="50" x2="200" y2="50" stroke="#1E293B" strokeWidth="1" />

                              {/* Filled Area */}
                              <path
                                d="M 0,65 Q 25,50 50,60 T 100,45 T 150,30 T 200,10 L 200,80 L 0,80 Z"
                                fill="url(#blueGrad)"
                              />

                              {/* Curve Line */}
                              <path
                                d="M 0,65 Q 25,50 50,60 T 100,45 T 150,30 T 200,10"
                                fill="none"
                                stroke="#00F0FF"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />

                              {/* Peak dot */}
                              <circle cx="200" cy="10" r="3.5" fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.5" />
                            </svg>

                            {/* X-Axis Months */}
                            <div className="flex justify-between text-[9px] font-sans text-slate-400 font-semibold mt-1 px-1">
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
                        <div className="col-span-5 p-3 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs flex flex-col justify-between">
                          <span className="font-display font-bold text-[11px] text-white">
                            Top Channels
                          </span>

                          <div className="flex items-center justify-center my-1">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle
                                cx="32"
                                cy="32"
                                r="24"
                                stroke="#1E293B"
                                strokeWidth="7"
                                fill="transparent"
                              />
                              <circle
                                cx="32"
                                cy="32"
                                r="24"
                                stroke="#00F0FF"
                                strokeWidth="7"
                                strokeDasharray="150"
                                strokeDashoffset="45"
                                strokeLinecap="round"
                                fill="transparent"
                              />
                            </svg>
                          </div>

                          <div className="space-y-0.5 text-[10px] font-sans">
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="flex items-center gap-1 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span> Web
                              </span>
                              <span className="font-bold text-white">60%</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="flex items-center gap-1 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span> Mobile
                              </span>
                              <span className="font-bold text-white">25%</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-300">
                              <span className="flex items-center gap-1 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> API
                              </span>
                              <span className="font-bold text-white">15%</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Row: Recent Activity */}
                      <div className="p-3 bg-[#0F1D38] border border-slate-800 rounded-xl shadow-xs">
                        <span className="font-display font-bold text-[11px] text-white block mb-2">
                          Recent Activity
                        </span>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-[#00F0FF]" />
                              New user registered
                            </span>
                            <span className="font-sans text-[9.5px] text-slate-400 font-semibold">2m ago</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              New order received
                            </span>
                            <span className="font-sans text-[9.5px] text-slate-400 font-semibold">15m ago</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="flex items-center gap-1.5 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                              Subscription updated
                            </span>
                            <span className="font-sans text-[9.5px] text-slate-400 font-semibold">1h ago</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* 2. Overlapping Modern Mobile Smartphone Mockup (Left Front) */}
                <div className="hidden sm:block absolute -left-6 bottom-4 w-44 bg-[#0A1128] border-2 border-slate-700 rounded-[28px] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20 transform -rotate-1 hover:rotate-0 transition-transform duration-300 font-sans">

                  {/* Phone Speaker & Camera Notch */}
                  <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-1.5"></div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-1 text-[9px] font-sans text-slate-300 mb-2">
                    <span className="font-bold">9:41</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" />
                      <Battery className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Phone Inner Screen Content */}
                  <div className="bg-[#060B18] border border-slate-800 rounded-2xl p-2.5 space-y-2.5 text-center">
                    <div>
                      <span className="text-[9.5px] font-sans font-bold uppercase text-slate-300 block">
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
                          stroke="#1E293B"
                          strokeWidth="4"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="22"
                          stroke="#00F0FF"
                          strokeWidth="4"
                          strokeDasharray="138"
                          strokeDashoffset="34.5"
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display font-black text-xs text-white">75%</span>
                        <span className="text-[7px] font-sans text-slate-400 font-bold uppercase">Completed</span>
                      </div>
                    </div>

                    {/* Tasks Checklist */}
                    <div className="text-left space-y-1 pt-1 border-t border-slate-800 font-sans">
                      <span className="text-[9px] font-sans font-bold uppercase text-slate-400 block mb-1">
                        Tasks
                      </span>
                      {[
                        "UI/UX Design",
                        "Development",
                        "Testing",
                        "Deployment"
                      ].map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between text-[9.5px] text-slate-300 font-medium">
                          <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[#00F0FF]"></span>
                            <span className="truncate max-w-[85px]">{task}</span>
                          </span>
                          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>
            )}

          </ScrollReveal>

        </div>
      </Container>

      {/* Watch Intro Video Modal Lightbox */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-video">
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
