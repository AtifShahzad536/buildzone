import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Sparkles, 
  MessageCircle, 
} from 'lucide-react';
import { useGetSettingsQuery } from '../../services/api';
import { siteConfig } from '../../config/siteConfig';
import { 
  LinkedInIcon, 
  GitHubIcon, 
  TwitterIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TikTokIcon, 
  WhatsAppIcon, 
  YouTubeIcon 
} from '../common/BrandIcons';

// Helper to get a clean handle/display name from a URL
const extractHandle = (url, fallback) => {
  if (!url) return fallback;
  try {
    const cleanUrl = url.replace(/\/+$/, '');
    const parts = cleanUrl.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && !lastPart.includes('http') && !lastPart.includes('.com')) {
      return lastPart.startsWith('@') ? lastPart : `@${lastPart}`;
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
};

export const TopAnnouncementBar = () => {
  const reduxSettings = useSelector((state) => state.settings);
  const { data: dbSettings } = useGetSettingsQuery();
  const settings = dbSettings || reduxSettings;

  const social = {
    ...siteConfig.social,
    ...(settings?.socialLinks || {}),
  };

  const visibility = {
    whatsapp: true,
    instagram: true,
    facebook: true,
    tiktok: true,
    linkedin: true,
    youtube: true,
    github: true,
    twitter: true,
    ...(siteConfig.socialVisibility || {}),
    ...(settings?.socialVisibility || {}),
  };

  const whatsappPhone = settings?.whatsappNumber || siteConfig.contact.phone || '+92 10 5464116';
  const whatsappUrl = social.whatsapp || `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}`;

  // Build dynamic list of active social items from settings (filtered by visibility)
  const rawSocialList = [
    {
      key: 'whatsapp',
      name: 'WhatsApp',
      handle: whatsappPhone,
      url: whatsappUrl,
      color: '#25D366',
      icon: <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      handle: extractHandle(social.linkedin, '@buildzone-tech'),
      url: social.linkedin || siteConfig.social.linkedin,
      color: '#0A66C2',
      icon: <LinkedInIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'instagram',
      name: 'Instagram',
      handle: extractHandle(social.instagram, '@buildzone.official'),
      url: social.instagram || siteConfig.social.instagram,
      color: '#E4405F',
      icon: <InstagramIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'facebook',
      name: 'Facebook',
      handle: extractHandle(social.facebook, 'buildzonetech'),
      url: social.facebook || siteConfig.social.facebook,
      color: '#1877F2',
      icon: <FacebookIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      handle: extractHandle(social.tiktok, '@buildzone_dev'),
      url: social.tiktok || siteConfig.social.tiktok,
      color: '#00F2FE',
      icon: <TikTokIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'youtube',
      name: 'YouTube',
      handle: extractHandle(social.youtube, '@buildzone-tech'),
      url: social.youtube,
      color: '#FF0000',
      icon: <YouTubeIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'github',
      name: 'GitHub',
      handle: extractHandle(social.github, 'buildzone-labs'),
      url: social.github || siteConfig.social.github,
      color: '#FFFFFF',
      icon: <GitHubIcon className="w-3.5 h-3.5 fill-current" />
    },
    {
      key: 'twitter',
      name: 'Twitter',
      handle: extractHandle(social.twitter, '@buildzone_dev'),
      url: social.twitter || siteConfig.social.twitter,
      color: '#1DA1F2',
      icon: <TwitterIcon className="w-3.5 h-3.5 fill-current" />
    }
  ];

  const dynamicSocialList = rawSocialList.filter(
    item => visibility[item.key] !== false && Boolean(item.url)
  );

  // Fallback if all are hidden
  const displayItems = dynamicSocialList.length > 0 ? dynamicSocialList : rawSocialList.slice(0, 3);

  // Duplicated cycle chain for seamless continuous scrolling
  const cycleItems = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div className="bg-[#060B18] text-white border-b border-slate-800/80 text-[12px] font-sans select-none overflow-hidden relative z-50">
      
      {/* Edge Gradient Fade Masks */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-[#060B18] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-[#060B18] to-transparent z-10 pointer-events-none"></div>

      <div className="py-1.5 flex items-center">
        
        {/* Pinned Left Live Indicator on Desktop */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 shrink-0 z-20 bg-[#060B18] border-r border-slate-800/80">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse"></span>
          <span className="font-bold text-slate-200 tracking-wide text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>GLOBAL NETWORK</span>
          </span>
        </div>

        {/* Continuous Cycle Chain Marquee (Right to Left) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee flex items-center gap-5 sm:gap-7">
            {cycleItems.map((item, idx) => (
              <a
                key={`${item.name}-${idx}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name}: ${item.handle}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group/item shrink-0 px-3 py-1.5 min-h-[34px] rounded hover:bg-white/5 font-sans"
              >
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center transition-transform group-hover/item:scale-110"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <span className="font-semibold text-white tracking-normal text-[12px]">
                  {item.name}:
                </span>
                <span className="text-slate-300 group-hover/item:text-[#00F0FF] transition-colors font-medium text-[12px]">
                  {item.handle}
                </span>
                <span className="text-slate-600 font-bold ml-2">/</span>
              </a>
            ))}
          </div>
        </div>

        {/* Pinned Right Fast Booking CTA on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pl-3 pr-4 shrink-0 z-20 bg-[#060B18] border-l border-slate-800/80">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 text-[11.5px] px-3 py-1.5 min-h-[34px] rounded hover:bg-white/5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Live WhatsApp Chat</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopAnnouncementBar;
