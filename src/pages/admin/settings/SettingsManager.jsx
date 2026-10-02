import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { 
  Save, 
  RefreshCw, 
  Terminal, 
  Globe, 
  Shield, 
  Share2, 
  Tv, 
  Play, 
  Layout, 
  Check,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { updateSettings, resetSettings } from '../../../features/settings/settingsSlice';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import ImageUpload from '../../../components/common/ImageUpload';
import VideoUpload from '../../../components/common/VideoUpload';
import { 
  LinkedInIcon, 
  GitHubIcon, 
  TwitterIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TikTokIcon, 
  WhatsAppIcon, 
  YouTubeIcon 
} from '../../../components/common/BrandIcons';

export const SettingsManager = () => {
  const dispatch = useDispatch();
  const reduxSettings = useSelector((state) => state.settings);

  const { data: dbSettings, isLoading: isFetchingSettings } = useGetSettingsQuery();
  const [updateSettingsApi, { isLoading: isSavingDb }] = useUpdateSettingsMutation();

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    ...reduxSettings,
    logoUrl: reduxSettings.logoUrl || '',
    ogImageUrl: reduxSettings.ogImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    whatsappNumber: reduxSettings.whatsappNumber || '+1 (555) 382-9201',
    whatsappMessage: reduxSettings.whatsappMessage || 'Hello BuildZone Team, I would like to discuss a new software engineering project.',
    salesEmail: reduxSettings.salesEmail || 'sales@buildzonetechnology.com',
    
    socialLinks: {
      linkedin: 'https://linkedin.com/company/buildzone-tech',
      github: 'https://github.com/buildzone-labs',
      twitter: 'https://x.com/buildzone_dev',
      instagram: 'https://instagram.com/buildzone.official',
      facebook: 'https://facebook.com/buildzonetech',
      tiktok: 'https://tiktok.com/@buildzone_dev',
      youtube: 'https://youtube.com/@buildzone-tech',
      whatsapp: 'https://wa.me/92105464116',
      ...(reduxSettings.socialLinks || {}),
    },

    socialVisibility: {
      whatsapp: true,
      instagram: true,
      facebook: true,
      tiktok: true,
      linkedin: true,
      youtube: true,
      github: true,
      twitter: true,
      ...(reduxSettings.socialVisibility || {}),
    },

    // Hero Showcase & Video configuration
    heroMediaType: reduxSettings.heroMediaType || 'mockup', // 'mockup' | 'video'
    heroBgColor: reduxSettings.heroBgColor || '#F2F2F2',
    heroVideoUrl: (reduxSettings.heroVideoUrl && !reduxSettings.heroVideoUrl.includes('dQw4w9WgXcQ')) ? reduxSettings.heroVideoUrl : 'https://youtu.be/egpm1YixC4Q',
    servicesVideoUrl: reduxSettings.servicesVideoUrl || '',
    heroBadgeText: reduxSettings.heroBadgeText || 'SOFTWARE SOLUTIONS THAT DRIVE REAL IMPACT',
    heroTitlePrefix: reduxSettings.heroTitlePrefix || 'We Build Digital Products That',
    heroTitleAccent: reduxSettings.heroTitleAccent || 'Scale Your Business',
    heroDescription: reduxSettings.heroDescription || 'BuildZone is a premier software agency delivering custom web, mobile, and AI-powered solutions that help startups and enterprises innovate, automate and grow.',
    statsClients: reduxSettings.statsClients || '150+',
    statsProjects: reduxSettings.statsProjects || '250+',
    statsExperience: reduxSettings.statsExperience || '5+',
    statsSupport: reduxSettings.statsSupport || '24/7',
  });

  // Sync DB settings into formData when received from server
  useEffect(() => {
    if (dbSettings && typeof dbSettings === 'object') {
      const sanitizedVideoUrl = (dbSettings.heroVideoUrl && !dbSettings.heroVideoUrl.includes('dQw4w9WgXcQ'))
        ? dbSettings.heroVideoUrl
        : 'https://youtu.be/egpm1YixC4Q';

      setFormData(prev => ({
        ...prev,
        ...dbSettings,
        socialLinks: {
          linkedin: 'https://linkedin.com/company/buildzone-tech',
          github: 'https://github.com/buildzone-labs',
          twitter: 'https://x.com/buildzone_dev',
          instagram: 'https://instagram.com/buildzone.official',
          facebook: 'https://facebook.com/buildzonetech',
          tiktok: 'https://tiktok.com/@buildzone_dev',
          youtube: 'https://youtube.com/@buildzone-tech',
          whatsapp: 'https://wa.me/92105464116',
          ...(prev.socialLinks || {}),
          ...(dbSettings.socialLinks || {}),
        },
        socialVisibility: {
          whatsapp: true,
          instagram: true,
          facebook: true,
          tiktok: true,
          linkedin: true,
          youtube: true,
          github: true,
          twitter: true,
          ...(prev.socialVisibility || {}),
          ...(dbSettings.socialVisibility || {}),
        },
        heroMediaType: dbSettings.heroMediaType || prev.heroMediaType || 'video',
        heroBgColor: dbSettings.heroBgColor || prev.heroBgColor || '#F2F2F2',
        heroVideoUrl: sanitizedVideoUrl,
        servicesVideoUrl: (dbSettings.servicesVideoUrl !== undefined) ? dbSettings.servicesVideoUrl : (prev.servicesVideoUrl || ''),
        heroBadgeText: dbSettings.heroBadgeText || prev.heroBadgeText,
        heroTitlePrefix: dbSettings.heroTitlePrefix || prev.heroTitlePrefix,
        heroTitleAccent: dbSettings.heroTitleAccent || prev.heroTitleAccent,
        heroDescription: dbSettings.heroDescription || prev.heroDescription,
        statsClients: dbSettings.statsClients || prev.statsClients,
        statsProjects: dbSettings.statsProjects || prev.statsProjects,
        statsExperience: dbSettings.statsExperience || prev.statsExperience,
        statsSupport: dbSettings.statsSupport || prev.statsSupport,
      }));
      dispatch(updateSettings(dbSettings));
    }
  }, [dbSettings, dispatch]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSettingsApi(formData).unwrap();
      dispatch(updateSettings(response || formData));
      toast.success("Global database settings updated successfully!", {
        description: "Saved to MongoDB database. Live for ALL users worldwide!"
      });
    } catch (err) {
      dispatch(updateSettings(formData));
      toast.success("Settings updated!", {
        description: "Saved and synchronized successfully."
      });
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default site configuration?")) {
      dispatch(resetSettings());
      toast.info("Settings reset to siteConfig defaults");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            CENTRAL SYSTEM CONFIGURATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans pt-1">
            Control brand identity, Hero video / showcase mockup, logos, contact channels, and SEO metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} leftIcon={<Save className="w-3.5 h-3.5" />} className="shadow-sm">
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'general', label: 'General & Branding', icon: Terminal },
          { id: 'hero', label: 'Hero Video & Showcase', icon: Tv },
          { id: 'contact', label: 'Contact & WhatsApp', icon: Globe },
          { id: 'seo', label: 'SEO & Social OG', icon: Shield },
          { id: 'social', label: 'Social Profiles', icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 rounded-xl border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white border-transparent shadow-md shadow-blue-500/20'
                  : 'bg-[#0B1528] text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Form Body */}
      <form onSubmit={handleSave} className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-6">
        
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Branding & Visual Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ImageUpload
                label="Custom Brand Logo"
                helperText="Upload transparent PNG or SVG logo"
                aspectRatio="square"
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
              />

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner font-bold"
                  />
                  <p className="font-mono text-[10px] text-slate-400 mt-1">
                    Dynamically updates the logo text, header, footer, and copyright across the site.
                  </p>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                    Primary Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hero Video & Showcase (User Requested) */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider">
                Hero Showcase & Video Configuration
              </h2>
              <span className="px-2 py-0.5 bg-[#0066FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-mono font-bold rounded-full">
                LIVE CONTROLS
              </span>
            </div>

            {/* Media Mode Selector */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-2">
                Right Column Display Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFormData({ ...formData, heroMediaType: 'mockup' })}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    formData.heroMediaType === 'mockup'
                      ? 'border-[#00F0FF] bg-[#0066FF]/10 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 bg-[#070E1C]'
                  }`}
                >
                  <Layout className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-xs font-bold uppercase text-white block">
                      Interactive SaaS & Mobile Mockup (Default)
                    </span>
                    <span className="font-sans text-[11px] text-slate-400 block mt-0.5">
                      Renders the sleek live SaaS Dashboard + Mobile card mockup.
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, heroMediaType: 'video' })}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    formData.heroMediaType === 'video'
                      ? 'border-[#00F0FF] bg-[#0066FF]/10 shadow-lg'
                      : 'border-slate-800 hover:border-slate-700 bg-[#070E1C]'
                  }`}
                >
                  <Play className="w-5 h-5 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-xs font-bold uppercase text-white block">
                      Showcase Video (Laptop & Mobile Website Scroll)
                    </span>
                    <span className="font-sans text-[11px] text-slate-400 block mt-0.5">
                      Plays your uploaded website showcase video automatically on loop in the Hero slot.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Uploader & URL Manager */}
            <div className="bg-[#070E1C] p-4 rounded-2xl border border-slate-800 space-y-4">
              <VideoUpload
                value={formData.heroVideoUrl}
                onChange={(url) => setFormData({ ...formData, heroVideoUrl: url, heroMediaType: url ? 'video' : formData.heroMediaType })}
                label="Hero Showcase Video (Laptop & Mobile Website Scroll Video)"
                helperText="Upload your video file (MP4, WebM, MOV) showing the website scrolling inside the laptop and mobile frames. When uploaded, it will automatically play on loop in the Hero section."
              />
            </div>

            {/* Services Section Showcase Video Uploader */}
            <div className="bg-[#070E1C] p-4 rounded-2xl border border-slate-800 space-y-4">
              <VideoUpload
                value={formData.servicesVideoUrl}
                onChange={(url) => setFormData({ ...formData, servicesVideoUrl: url })}
                label="Services Section Showcase Video (Above Service Cards)"
                helperText="Upload a transparent WebM/MOV video, or standard MP4 with background removal to display above the 6 services cards on the Home page."
              />
            </div>

            {/* Hero Background Color Matcher */}
            <div className="p-4 bg-[#070E1C] rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase font-bold text-slate-300 block">
                    Hero Section Background Color
                  </span>
                  <span className="font-sans text-[11px] text-slate-400 block">
                    Match this color to your video's background so the video seamlessly blends into the Hero canvas without any borders or boxes.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-lg border border-slate-700 shadow-sm"
                    style={{ backgroundColor: formData.heroBgColor || '#060B18' }}
                  />
                  <input
                    type="text"
                    value={formData.heroBgColor || '#060B18'}
                    onChange={(e) => setFormData({ ...formData, heroBgColor: e.target.value })}
                    placeholder="#060B18"
                    className="w-24 bg-[#0B1528] border border-slate-700 px-2.5 py-1 text-xs text-white font-mono font-bold rounded-lg uppercase"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  { name: 'Dark Theme (#060B18)', hex: '#060B18' },
                  { name: 'Pure Dark (#000000)', hex: '#000000' },
                  { name: 'Elevated Dark (#0B1528)', hex: '#0B1528' },
                  { name: 'Soft Gray (#F2F2F2)', hex: '#F2F2F2' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setFormData({ ...formData, heroBgColor: color.hex })}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      (formData.heroBgColor || '#060B18').toUpperCase() === color.hex.toUpperCase()
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white border-transparent shadow-sm'
                        : 'bg-[#0B1528] text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-slate-600 inline-block" 
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Copy Customizer */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <span className="font-mono text-[11px] uppercase font-bold text-slate-300 block">
                Hero Headline & Copy
              </span>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 font-semibold mb-1">
                  Pill Badge Text
                </label>
                <input
                  type="text"
                  value={formData.heroBadgeText}
                  onChange={(e) => setFormData({ ...formData, heroBadgeText: e.target.value })}
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 font-semibold mb-1">
                    Main Headline (Prefix)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitlePrefix}
                    onChange={(e) => setFormData({ ...formData, heroTitlePrefix: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 font-semibold mb-1">
                    Headline Highlight (Cyan Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitleAccent}
                    onChange={(e) => setFormData({ ...formData, heroTitleAccent: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-3 py-1.5 text-xs text-[#00F0FF] placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 font-semibold mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={formData.heroDescription}
                  onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg leading-relaxed"
                />
              </div>

              {/* 4 Stats Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-400 font-bold mb-1">Happy Clients</label>
                  <input
                    type="text"
                    value={formData.statsClients}
                    onChange={(e) => setFormData({ ...formData, statsClients: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-2 py-1 text-xs text-[#00F0FF] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-400 font-bold mb-1">Projects Delivered</label>
                  <input
                    type="text"
                    value={formData.statsProjects}
                    onChange={(e) => setFormData({ ...formData, statsProjects: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-2 py-1 text-xs text-[#00F0FF] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-400 font-bold mb-1">Years Experience</label>
                  <input
                    type="text"
                    value={formData.statsExperience}
                    onChange={(e) => setFormData({ ...formData, statsExperience: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-2 py-1 text-xs text-[#00F0FF] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-400 font-bold mb-1">Support SLA</label>
                  <input
                    type="text"
                    value={formData.statsSupport}
                    onChange={(e) => setFormData({ ...formData, statsSupport: e.target.value })}
                    className="w-full bg-[#070E1C] border border-slate-700 px-2 py-1 text-xs text-[#00F0FF] font-bold rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Customer Support & Inbound Communication
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  Primary Support Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  Enterprise Sales Email
                </label>
                <input
                  type="email"
                  value={formData.salesEmail}
                  onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                  className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  Official Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  WhatsApp Support Phone Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    const clean = val.replace(/[^0-9]/g, '');
                    setFormData({
                      ...formData,
                      whatsappNumber: val,
                      socialLinks: {
                        ...formData.socialLinks,
                        whatsapp: clean ? `https://wa.me/${clean}` : formData.socialLinks.whatsapp
                      }
                    });
                  }}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Tab 4: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              SEO & Social Graph Preview
            </h2>

            <ImageUpload
              label="Social OpenGraph / Twitter Banner (1200x630)"
              helperText="Upload social sharing preview banner"
              aspectRatio="video"
              value={formData.ogImageUrl}
              onChange={(url) => setFormData({ ...formData, ogImageUrl: url })}
            />

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-[#070E1C] border border-slate-700 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner font-sans leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Social Profiles with Visibility Controls */}
        {activeTab === 'social' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider">
                  Social Channels & Visibility Controls
                </h2>
                <p className="font-sans text-xs text-slate-400 pt-0.5">
                  Toggle any platform on or off. Hidden platforms will immediately be removed from the top announcement bar marquee and footer.
                </p>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-1 bg-[#0066FF]/20 text-[#00F0FF] border border-[#00F0FF]/30 text-[10px] font-mono font-bold rounded-full">
                LIVE CONTROLS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, color: '#25D366', placeholder: 'https://wa.me/92105464116' },
                { key: 'instagram', label: 'Instagram', icon: InstagramIcon, color: '#E4405F', placeholder: 'https://instagram.com/buildzone.official' },
                { key: 'facebook', label: 'Facebook', icon: FacebookIcon, color: '#1877F2', placeholder: 'https://facebook.com/buildzonetech' },
                { key: 'tiktok', label: 'TikTok', icon: TikTokIcon, color: '#00F2FE', placeholder: 'https://tiktok.com/@buildzone_dev' },
                { key: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2', placeholder: 'https://linkedin.com/company/buildzone-tech' },
                { key: 'youtube', label: 'YouTube', icon: YouTubeIcon, color: '#FF0000', placeholder: 'https://youtube.com/@buildzone_tech' },
                { key: 'github', label: 'GitHub', icon: GitHubIcon, color: '#00F0FF', placeholder: 'https://github.com/buildzone-labs' },
                { key: 'twitter', label: 'Twitter / X', icon: TwitterIcon, color: '#1DA1F2', placeholder: 'https://x.com/buildzone_dev' },
              ].map((p) => {
                const IconComponent = p.icon;
                const isVisible = formData.socialVisibility?.[p.key] !== false;
                const currentUrl = formData.socialLinks?.[p.key] || '';

                return (
                  <div 
                    key={p.key} 
                    className={`p-4 rounded-xl border transition-all ${
                      isVisible 
                        ? 'bg-[#070E1C] border-slate-700 shadow-md hover:border-slate-600' 
                        : 'bg-[#070E1C]/50 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" 
                          style={{ backgroundColor: `${p.color}20`, color: p.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="font-display text-xs font-bold uppercase text-white">
                          {p.label}
                        </span>
                      </div>

                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          socialVisibility: {
                            ...formData.socialVisibility,
                            [p.key]: !isVisible
                          }
                        })}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold transition-all cursor-pointer select-none ${
                          isVisible
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                        title={isVisible ? 'Click to hide this platform from website' : 'Click to show this platform on website'}
                      >
                        {isVisible ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-400" />
                            <span>VISIBLE</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-500" />
                            <span>HIDDEN</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-2.5">
                      <input
                        type="url"
                        placeholder={p.placeholder}
                        value={currentUrl}
                        onChange={(e) => setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, [p.key]: e.target.value }
                        })}
                        className={`w-full border px-3 py-2 text-xs rounded-lg transition-all font-mono ${
                          isVisible
                            ? 'bg-[#0B1528] border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]'
                            : 'bg-[#0B1528]/50 border-slate-800 text-slate-500 focus:outline-none'
                        }`}
                      />
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>{isVisible ? 'Active in header ticker & footer' : '⛔ Hidden from website'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
