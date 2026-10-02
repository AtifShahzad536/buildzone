import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { toggleMobileMenu, setMobileMenuOpen } from '../../features/ui/uiSlice';
import Container from '../common/Container';
import Button from '../common/Button';
import TopAnnouncementBar from './TopAnnouncementBar';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const isMobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
    setMobileExpanded({});
  }, [location.pathname, dispatch]);

  const toggleMobileSubmenu = (title) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      
      {/* Top Moving Social Media Cycle Chain Bar */}
      <TopAnnouncementBar />

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-[#060B18]/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-200 ${
          isScrolled
            ? 'shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 bg-[#060B18]/95'
            : 'shadow-sm py-3.5 sm:py-4'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo Mark + Logo Text side by side */}
            <Link to="/" className="inline-flex items-center gap-2.5 group py-0.5" aria-label="BuildZone Home">
              <img
                src="/logo.png"
                alt="BuildZone Logo"
                width="36"
                height="36"
                fetchPriority="high"
                decoding="async"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-all duration-200 drop-shadow-[0_0_12px_rgba(0,102,255,0.5)]"
              />
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white flex items-center">
                Build<span className="text-[#0066FF] drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]">Zone</span>
              </span>
            </Link>

            {/* Desktop Navigation Links — Pure CSS Group Hover Architecture */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {siteConfig.navLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.href) && item.href !== '/';
                const alignRight = item.title === 'About' || item.title === 'Insights' || item.title === 'Work';

                return (
                  <div key={item.title} className="relative group/nav py-2">
                    <Link
                      to={item.href}
                      className={`relative px-3.5 py-1.5 font-sans text-[13px] font-semibold tracking-normal transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer select-none bg-transparent border-0 ${
                        isActive
                          ? 'text-[#00F0FF] font-bold'
                          : 'text-slate-200 hover:text-[#00F0FF] group-hover/nav:text-[#00F0FF]'
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.dropdown && (
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/nav:rotate-180 text-slate-400 group-hover/nav:text-[#00F0FF]" />
                      )}
                      {/* Sleek Animated Glowing Underline (0 Background, 0 Borders) */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#38BDF8] transition-all duration-300 ease-out transform origin-center ${
                          isActive
                            ? 'scale-x-100 opacity-100 shadow-[0_0_10px_rgba(0,240,255,0.9)]'
                            : 'scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100 shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                        }`}
                      />
                    </Link>

                    {/* Wide 3-Column Solid Dark Card Dropdown */}
                    {item.dropdown && (
                      <div 
                        className={`hidden group-hover/nav:block absolute top-full ${
                          alignRight ? 'right-0' : 'left-0'
                        } pt-1 z-[100] animate-fadeIn`}
                      >
                        {/* Continuous hitbox bridge preventing hover gap closure */}
                        <div className="absolute -top-3 left-0 right-0 h-4"></div>

                        <div className="w-[580px] xl:w-[680px] bg-[#0A1128] border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] rounded-xl p-5 relative overflow-hidden transition-all duration-150 font-sans">
                          {/* Dropdown Header Accent */}
                          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                                Explore {item.title}
                              </span>
                            </div>
                            <Link 
                              to={item.href} 
                              className="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#00F0FF] flex items-center gap-1"
                            >
                              <span>View All</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          {/* 3-Column Card Grid */}
                          <div className="grid grid-cols-3 gap-2.5">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                className="group/item p-3 rounded-lg border border-slate-800/80 bg-[#0F1A36]/60 hover:border-[#0066FF]/60 hover:bg-[#0066FF]/10 transition-all duration-150 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="font-sans font-bold text-xs text-slate-100 group-hover/item:text-[#00F0FF] transition-colors leading-snug">
                                    {subItem.title}
                                  </div>
                                  {subItem.desc && (
                                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-1 line-clamp-2">
                                      {subItem.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom Context Banner */}
                          <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-sans text-slate-400">
                            <span>Dedicated enterprise software pods & AI systems</span>
                            <Link to="/start-project" className="text-[#00F0FF] font-bold hover:underline flex items-center gap-1">
                              <span>Start a Project</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right Action Button: Start a Project */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/start-project">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Start a Project
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => dispatch(toggleMobileMenu())}
                className="p-2 rounded-md text-slate-200 hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1128] border-b border-slate-800 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn">
          <div className="p-4 sm:p-6 space-y-3">
            {siteConfig.navLinks.map((item) => (
              <div key={item.title} className="border border-slate-800 rounded-lg overflow-hidden bg-[#0F1A36]">
                <div
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/70 transition-colors"
                  onClick={() => toggleMobileSubmenu(item.title)}
                >
                  <span className="font-sans text-sm font-semibold text-white">
                    {item.title}
                  </span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-4 h-4 text-[#00F0FF] transition-transform ${
                        mobileExpanded[item.title] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>

                {item.dropdown && mobileExpanded[item.title] && (
                  <div className="p-2 bg-[#060B18] border-t border-slate-800 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.title}
                        to={sub.href}
                        className="block p-2 text-xs text-slate-300 hover:text-[#00F0FF] hover:bg-slate-800/60 rounded-md"
                      >
                        <div className="font-bold text-white">{sub.title}</div>
                        {sub.desc && <div className="text-[10.5px] text-slate-400">{sub.desc}</div>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Action Buttons in a Single Row */}
            <div className="pt-4 flex flex-row gap-2.5 w-full">
              <Link to="/portfolio" className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  View Work
                </Button>
              </Link>
              <Link to="/start-project" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  Start Project
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center space-y-1">
              <p className="text-[12px] text-slate-300 font-sans font-medium">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#00F0FF]">{siteConfig.contact.email}</a>
              </p>
              <p className="text-[11px] text-slate-400 font-sans font-medium">
                <a href={`mailto:${siteConfig.contact.alternateEmail}`} className="hover:text-[#00F0FF]">{siteConfig.contact.alternateEmail}</a>
              </p>
              <p className="text-[12px] text-white font-sans font-bold pt-0.5">
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#00F0FF]">{siteConfig.contact.phone}</a>
              </p>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
