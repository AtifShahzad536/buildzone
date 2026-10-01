import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useGetSettingsQuery } from '../../services/api';
import Container from '../common/Container';
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

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reduxSettings = useSelector((state) => state.settings);
  const { data: dbSettings } = useGetSettingsQuery();
  const settings = dbSettings || reduxSettings;
  const companyName = settings?.companyName || siteConfig.name;

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

  const footerSocialList = [
    { key: 'whatsapp', name: 'WhatsApp', url: social.whatsapp || (settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}` : null), icon: WhatsAppIcon, hoverBg: 'hover:bg-[#25D366] hover:border-[#25D366]' },
    { key: 'linkedin', name: 'LinkedIn', url: social.linkedin, icon: LinkedInIcon, hoverBg: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]' },
    { key: 'instagram', name: 'Instagram', url: social.instagram, icon: InstagramIcon, hoverBg: 'hover:bg-[#E4405F] hover:border-[#E4405F]' },
    { key: 'facebook', name: 'Facebook', url: social.facebook, icon: FacebookIcon, hoverBg: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
    { key: 'tiktok', name: 'TikTok', url: social.tiktok, icon: TikTokIcon, hoverBg: 'hover:bg-[#000000] hover:border-[#000000]' },
    { key: 'youtube', name: 'YouTube', url: social.youtube, icon: YouTubeIcon, hoverBg: 'hover:bg-[#FF0000] hover:border-[#FF0000]' },
    { key: 'github', name: 'GitHub', url: social.github, icon: GitHubIcon, hoverBg: 'hover:bg-[#0B1938] hover:border-[#0B1938]' },
    { key: 'twitter', name: 'Twitter / X', url: social.twitter, icon: TwitterIcon, hoverBg: 'hover:bg-[#1DA1F2] hover:border-[#1DA1F2]' },
  ].filter(item => visibility[item.key] !== false && Boolean(item.url));

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-sans pt-10 sm:pt-16 pb-8 sm:pb-12">
      <Container>
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 sm:mb-14">
          
          {/* 1. Brand & Contact Details (12 cols on mobile, 5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            {/* Logo Mark + Text with Explicit Responsive Height Constraints */}
            <Link to="/" className="inline-flex items-center gap-2 group" aria-label="BuildZone Home">
              <img
                src="/logo.png"
                alt="BuildZone Logo"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="h-6 sm:h-8 w-auto object-contain group-hover:scale-105 transition-all duration-200 shrink-0 mix-blend-multiply"
              />
              <img
                src="/LOGO%20TEXT.png"
                alt="BuildZone"
                width="130"
                height="24"
                loading="lazy"
                decoding="async"
                className="h-5 sm:h-6 max-w-[120px] sm:max-w-[160px] w-auto object-contain group-hover:opacity-90 transition-all duration-200 shrink-0 mix-blend-multiply"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-1 space-y-2 font-sans text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <a href={`mailto:${settings?.contactEmail || siteConfig.contact.email}`} className="hover:text-[#0066FF] transition-colors font-medium">
                    {settings?.contactEmail || siteConfig.contact.email}
                  </a>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <a href={`mailto:${siteConfig.contact.alternateEmail}`} className="hover:text-[#0066FF] transition-colors font-medium text-slate-500">
                    {siteConfig.contact.alternateEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <div className="flex items-center gap-2">
                  <a href={`tel:${siteConfig.contact.phone}`} className="font-bold hover:text-[#0066FF] transition-colors">
                    {settings?.phone || siteConfig.contact.phone}
                  </a>
                  <span className="text-[10px] font-sans text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                    Call & WhatsApp
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <span className="truncate">{settings?.address || siteConfig.contact.address}, {siteConfig.contact.city}</span>
              </div>
            </div>

            {/* Dynamic Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {footerSocialList.map(item => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 sm:w-9 sm:h-9 bg-[#F8FAFC] border border-slate-200 rounded-md flex items-center justify-center text-slate-600 hover:text-white transition-all shadow-2xs ${item.hoverBg}`}
                    aria-label={item.name}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* 2. 3-Column Navigation Links with Vertical Dividers & Clean Responsive Typography */}
          <div className="lg:col-span-7 grid grid-cols-3 divide-x divide-slate-200 pt-3 lg:pt-0">
            
            {/* Column 1: Company */}
            <div className="pr-2 sm:pr-4 md:pr-6 overflow-hidden">
              <h3 className="font-display font-bold text-[11px] sm:text-xs md:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5 truncate">
                Company
              </h3>
              <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs font-sans">
                {siteConfig.footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-700 hover:text-[#0052CC] transition-colors inline-flex items-center gap-0.5 group w-full py-1.5">
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 text-[#0066FF] transition-opacity shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="px-2 sm:px-4 md:px-6 overflow-hidden">
              <h3 className="font-display font-bold text-[11px] sm:text-xs md:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5 truncate">
                Services
              </h3>
              <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs font-sans">
                {siteConfig.footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-700 hover:text-[#0052CC] transition-colors inline-flex items-center gap-0.5 group w-full py-1.5">
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 text-[#0066FF] transition-opacity shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="pl-2 sm:pl-4 md:pl-6 overflow-hidden">
              <h3 className="font-display font-bold text-[11px] sm:text-xs md:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5 truncate">
                Resources
              </h3>
              <ul className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs font-sans">
                {siteConfig.footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-700 hover:text-[#0052CC] transition-colors inline-flex items-center gap-0.5 group w-full py-1.5">
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 text-[#0066FF] transition-opacity shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-500 text-center sm:text-left">
          <p>© {currentYear} {companyName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <Link to="/privacy-policy" className="hover:text-[#0066FF] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[#0066FF] transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/cookie-policy" className="hover:text-[#0066FF] transition-colors">
              Cookie Policy
            </Link>
            <Link to="/security" className="hover:text-[#0066FF] transition-colors inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Security
            </Link>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
