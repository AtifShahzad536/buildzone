import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Cloud, 
  Layers, 
  PenTool, 
  ArrowRight,
  Sparkles,
  Play
} from 'lucide-react';
import { useGetSettingsQuery } from '../../services/api';
import Container from '../common/Container';
import ScrollReveal from '../common/ScrollReveal';

// =========================================================================
// High-Performance Seamless Floating Video Player for Services Section
// =========================================================================
const SeamlessServicesVideo = ({ src, onError }) => {
  const videoRef = React.useRef(null);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
    <div className="relative w-full flex items-center justify-center overflow-visible py-4 sm:py-6">
      {/* Ambient Cyber Backlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/30 via-[#00F0FF]/20 to-transparent rounded-full blur-3xl pointer-events-none scale-125 animate-pulse-glow" />

      {/* Borderless Floating Video Player */}
      <div className="relative w-full max-w-[850px] flex items-center justify-center overflow-visible">
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
          style={{ backgroundColor: 'transparent' }}
          className={`w-full max-w-[850px] h-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[680px] object-contain bg-transparent transform transition-all duration-700 ease-out will-change-transform animate-float scale-100 sm:scale-110 lg:scale-120 ${
            isReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export const ServicesPreview = () => {
  const reduxSettings = useSelector((state) => state.settings);
  const { data: dbSettings } = useGetSettingsQuery();
  const settings = (dbSettings && typeof dbSettings === 'object' && Object.keys(dbSettings).length > 0)
    ? { ...reduxSettings, ...dbSettings }
    : reduxSettings;

  const [videoLoadError, setVideoLoadError] = useState(false);
  const [isEmbedPlaying, setIsEmbedPlaying] = useState(false);

  const servicesVideoUrl = settings?.servicesVideoUrl || '';

  const isEmbedVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtube-nocookie.com') || url.includes('youtu.be') || url.includes('player.vimeo.com') || url.includes('vimeo.com');
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

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
    <section className="py-16 sm:py-24 bg-[#0A1128] relative border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#0066FF]/10 via-[#00F0FF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={0.65}>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
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

        {/* Showcase Floating Video (Rendered if configured by Admin in Settings) */}
        {servicesVideoUrl && !videoLoadError && (
          <ScrollReveal animation="zoom-in" delay={0.1} duration={0.7} className="mb-14 sm:mb-16 w-full flex items-center justify-center">
            {isEmbedVideo(servicesVideoUrl) ? (
              <div className="w-full max-w-4xl aspect-video border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-950 relative">
                {isEmbedPlaying ? (
                  <iframe
                    src={`${servicesVideoUrl}${servicesVideoUrl.includes('?') ? '&' : '?'}autoplay=1`}
                    title="BuildZone Services Video"
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
                    {getYouTubeId(servicesVideoUrl) ? (
                      <img
                        src={`https://i.ytimg.com/vi/${getYouTubeId(servicesVideoUrl)}/hqdefault.jpg`}
                        alt="Services Video Preview"
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
                        Click to Watch Services Showcase
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <SeamlessServicesVideo
                src={servicesVideoUrl}
                onError={() => setVideoLoadError(true)}
              />
            )}
          </ScrollReveal>
        )}

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
