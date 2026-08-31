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
import Container from '../common/Container';
import { LinkedInIcon, GitHubIcon, TwitterIcon } from '../common/BrandIcons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const settings = useSelector((state) => state.settings);
  const companyName = settings?.companyName || siteConfig.name;

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
                className="h-6 sm:h-8 w-auto object-contain group-hover:scale-105 transition-all duration-200 shrink-0"
              />
              <img
                src="/LOGO%20TEXT.png"
                alt="BuildZone"
                className="h-5 sm:h-6 max-w-[120px] sm:max-w-[160px] w-auto object-contain group-hover:opacity-90 transition-all duration-200 shrink-0"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-1 space-y-2 font-mono text-[11px] sm:text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <a href={`mailto:${settings?.contactEmail || siteConfig.contact.email}`} className="hover:text-[#0066FF] transition-colors font-medium">
                  {settings?.contactEmail || siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <span className="font-medium">{settings?.phone || siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                <span className="truncate">{settings?.address || siteConfig.contact.address}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F8FAFC] border border-slate-200 rounded-md flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all shadow-2xs"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F8FAFC] border border-slate-200 rounded-md flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all shadow-2xs"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F8FAFC] border border-slate-200 rounded-md flex items-center justify-center text-slate-600 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] transition-all shadow-2xs"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* 2. 3-Column Navigation Links (Side-by-side 3 columns on Mobile & Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-6 pt-2 lg:pt-0">
            
            {/* Column 1: Company */}
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5">
                Company
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-xs font-mono">
                {siteConfig.footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-600 hover:text-[#0066FF] transition-colors inline-flex items-center gap-0.5 group">
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 text-[#0066FF] transition-opacity shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5">
                Services
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-xs font-mono">
                {siteConfig.footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-600 hover:text-[#0066FF] transition-colors inline-flex items-center gap-0.5 group">
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 text-[#0066FF] transition-opacity shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B1938] uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-200 pb-1.5">
                Resources
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 text-[11px] sm:text-xs font-mono">
                {siteConfig.footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-600 hover:text-[#0066FF] transition-colors inline-flex items-center gap-0.5 group">
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
        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-slate-500 text-center sm:text-left">
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
