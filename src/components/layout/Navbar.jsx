import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { toggleMobileMenu, setMobileMenuOpen } from '../../features/ui/uiSlice';
import Button from '../common/Button';
import Container from '../common/Container';
import TopAnnouncementBar from './TopAnnouncementBar';

export const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector((state) => state.ui.mobileMenuOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [location.pathname, dispatch]);

  const toggleMobileSubmenu = (title) => {
    setMobileExpanded(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      
      {/* Top Moving Social Media Cycle Chain Bar */}
      <TopAnnouncementBar />

      {/* Main Navigation Bar */}
      <div
        className={`w-full bg-white border-b border-slate-200 transition-all duration-200 ${
          isScrolled
            ? 'shadow-md py-2.5'
            : 'shadow-sm py-3.5 sm:py-4'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo Mark + Logo Text side by side */}
            <Link to="/" className="inline-flex items-center gap-2 sm:gap-2.5 group py-0.5" aria-label="BuildZone Home">
              <img
                src="/logo.png"
                alt="BuildZone Logo"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain group-hover:scale-105 transition-all duration-200 mix-blend-multiply"
              />
              <img
                src="/LOGO%20TEXT.png"
                alt="BuildZone Text"
                className="h-5 sm:h-6 md:h-7 w-auto object-contain group-hover:opacity-90 transition-all duration-200 mix-blend-multiply"
              />
            </Link>

            {/* Desktop Navigation Links — Pure CSS Group Hover Architecture */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {siteConfig.navLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.href) && item.href !== '/';
                // Items on right half of navbar open towards left (right-0) to stay 100% inside screen bounds
                const alignRight = item.title === 'About' || item.title === 'Insights' || item.title === 'Work';

                return (
                  <div key={item.title} className="relative group/nav py-2">
                    <Link
                      to={item.href}
                      className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 inline-flex items-center gap-1 cursor-pointer select-none ${
                        isActive
                          ? 'text-[#0066FF] bg-blue-50/80 font-black'
                          : 'text-[#0B1938] hover:text-[#0066FF] hover:bg-slate-100/70 group-hover/nav:text-[#0066FF] group-hover/nav:bg-slate-100/70'
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.dropdown && (
                        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover/nav:rotate-180" />
                      )}
                    </Link>

                    {/* Wide 3-Column 100% Solid Card Dropdown */}
                    {item.dropdown && (
                      <div 
                        className={`hidden group-hover/nav:block absolute top-full ${
                          alignRight ? 'right-0' : 'left-0'
                        } pt-1 z-[100] animate-fadeIn`}
                      >
                        {/* Continuous hitbox bridge preventing hover gap closure */}
                        <div className="absolute -top-3 left-0 right-0 h-4"></div>

                        <div className="w-[580px] xl:w-[680px] bg-white border border-slate-200 shadow-2xl rounded-xl p-5 relative overflow-hidden transition-all duration-150">
                          {/* Dropdown Header Accent */}
                          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#0066FF]">
                                Explore {item.title}
                              </span>
                            </div>
                            <Link 
                              to={item.href} 
                              className="font-mono text-[10px] font-bold uppercase text-slate-600 hover:text-[#0066FF] flex items-center gap-1"
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
                                className="group/item p-3 rounded-lg border border-slate-200 bg-white hover:border-[#0066FF] hover:bg-blue-50/60 transition-all duration-150 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="font-mono font-bold text-xs text-[#0B1938] group-hover/item:text-[#0066FF] transition-colors leading-snug">
                                    {subItem.title}
                                  </div>
                                  {subItem.desc && (
                                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed mt-1 line-clamp-2">
                                      {subItem.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Bottom Context Banner */}
                          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                            <span>Dedicated enterprise software pods & AI systems</span>
                            <Link to="/start-project" className="text-[#0066FF] font-bold hover:underline flex items-center gap-1">
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
                className="p-2 rounded-md text-[#0B1938] hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0B1938]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#0B1938]" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto animate-fadeIn">
          <div className="p-4 sm:p-6 space-y-3">
            {siteConfig.navLinks.map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <div
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => toggleMobileSubmenu(item.title)}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1938]">
                    {item.title}
                  </span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-4 h-4 text-[#0066FF] transition-transform ${
                        mobileExpanded[item.title] ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </div>

                {item.dropdown && mobileExpanded[item.title] && (
                  <div className="p-2 bg-white border-t border-slate-200 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.title}
                        to={sub.href}
                        className="block p-2 text-xs text-slate-700 hover:text-[#0066FF] hover:bg-blue-50 rounded-md"
                      >
                        <div className="font-bold text-[#0B1938]">{sub.title}</div>
                        {sub.desc && <div className="text-[10px] text-slate-500">{sub.desc}</div>}
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

            <div className="pt-4 border-t border-slate-200 text-center">
              <p className="text-[11px] text-slate-600 font-mono font-medium">
                {siteConfig.contact.email}
              </p>
              <p className="text-[11px] text-slate-600 font-mono font-medium">
                {siteConfig.contact.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
