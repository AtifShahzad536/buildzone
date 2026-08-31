import React from 'react';
import { 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  Globe
} from 'lucide-react';

// Social links with custom SVG icons
const socialLinks = [
  {
    name: 'WhatsApp',
    handle: '+1 (555) 019-2834',
    url: 'https://wa.me/15550192834',
    color: '#25D366',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.815 2.796.815 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.767-5.768-5.767zm9.969 5.766c0 5.519-4.481 10-10 10-1.745 0-3.385-.45-4.819-1.238l-7.181 1.884 1.916-6.997c-.85-1.488-1.339-3.21-1.339-5.049 0-5.519 4.481-10 10-10s10 4.481 10 10z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    handle: '@buildzone-tech',
    url: 'https://linkedin.com',
    color: '#0A66C2',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    handle: '@buildzone.official',
    url: 'https://instagram.com',
    color: '#E4405F',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    handle: 'buildzonetech',
    url: 'https://facebook.com',
    color: '#1877F2',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'TikTok',
    handle: '@buildzone_dev',
    url: 'https://tiktok.com',
    color: '#00F2FE',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    handle: 'buildzone-labs',
    url: 'https://github.com',
    color: '#FFFFFF',
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  }
];

export const TopAnnouncementBar = () => {
  // Duplicated cycle chain for seamless continuous scrolling
  const cycleItems = [...socialLinks, ...socialLinks, ...socialLinks];

  return (
    <div className="bg-[#0B1938] text-white border-b border-slate-800 text-[11px] font-mono select-none overflow-hidden relative z-50">
      
      {/* Edge Gradient Fade Masks */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-[#0B1938] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-[#0B1938] to-transparent z-10 pointer-events-none"></div>

      <div className="py-1.5 flex items-center">
        
        {/* Pinned Left Live Indicator on Desktop */}
        <div className="hidden md:flex items-center gap-2 pl-4 pr-3 shrink-0 z-20 bg-[#0B1938] border-r border-slate-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#0066FF]" />
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
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group/item shrink-0 px-2 py-0.5 rounded hover:bg-white/5"
              >
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center transition-transform group-hover/item:scale-110"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <span className="font-bold text-white tracking-wide">
                  {item.name}:
                </span>
                <span className="text-slate-400 group-hover/item:text-[#0066FF] transition-colors">
                  {item.handle}
                </span>
                <span className="text-slate-600 font-bold ml-2">/</span>
              </a>
            ))}
          </div>
        </div>

        {/* Pinned Right Fast Booking CTA on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pl-3 pr-4 shrink-0 z-20 bg-[#0B1938] border-l border-slate-800">
          <a
            href="https://wa.me/15550192834"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 text-[10px] uppercase tracking-wider"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Live WhatsApp Chat</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopAnnouncementBar;
