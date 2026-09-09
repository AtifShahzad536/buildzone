import React, { useState } from 'react';
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
  Check 
} from 'lucide-react';
import { updateSettings, resetSettings } from '../../../features/settings/settingsSlice';
import Button from '../../../components/common/Button';
import ImageUpload from '../../../components/common/ImageUpload';
import VideoUpload from '../../../components/common/VideoUpload';

export const SettingsManager = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    ...settings,
    logoUrl: settings.logoUrl || '',
    ogImageUrl: settings.ogImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    whatsappNumber: settings.whatsappNumber || '+1 (555) 382-9201',
    whatsappMessage: settings.whatsappMessage || 'Hello BuildZone Team, I would like to discuss a new software engineering project.',
    salesEmail: settings.salesEmail || 'sales@buildzonetechnology.com',
    
    // Hero Showcase & Video configuration
    heroMediaType: settings.heroMediaType || 'mockup', // 'mockup' | 'video'
    heroVideoUrl: settings.heroVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    heroBadgeText: settings.heroBadgeText || 'SOFTWARE SOLUTIONS THAT DRIVE REAL IMPACT',
    heroTitlePrefix: settings.heroTitlePrefix || 'We Build Digital Products That',
    heroTitleAccent: settings.heroTitleAccent || 'Scale Your Business',
    heroDescription: settings.heroDescription || 'BuildZone is a software house delivering custom web, mobile, and AI-powered solutions that help startups and enterprises innovate, automate and grow.',
    statsClients: settings.statsClients || '150+',
    statsProjects: settings.statsProjects || '250+',
    statsExperience: settings.statsExperience || '5+',
    statsSupport: settings.statsSupport || '24/7',
  });

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
    toast.success("Global settings & Hero video showcase updated!", {
      description: "Changes are applied immediately across the entire website and admin panel."
    });
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings to default site configuration?")) {
      dispatch(resetSettings());
      toast.info("Settings reset to siteConfig defaults");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            CENTRAL SYSTEM CONFIGURATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
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
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
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
              className={`px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 rounded-lg border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-[#0066FF] hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Form Body */}
      <form onSubmit={handleSave} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-6">
        
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="space-y-5">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
              Branding & Visual Identity
            </h3>

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
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-bold"
                  />
                  <p className="font-mono text-[10px] text-slate-500 mt-1">
                    Dynamically updates the logo text, header, footer, and copyright across the site.
                  </p>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Primary Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hero Video & Showcase (User Requested) */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider">
                Hero Showcase & Video Configuration
              </h3>
              <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
                LIVE CONTROLS
              </span>
            </div>

            {/* Media Mode Selector */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-2">
                Right Column Display Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFormData({ ...formData, heroMediaType: 'mockup' })}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    formData.heroMediaType === 'mockup'
                      ? 'border-[#0066FF] bg-blue-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Layout className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-xs font-bold uppercase text-[#0B1938] block">
                      Interactive SaaS & Mobile Mockup (Default)
                    </span>
                    <span className="font-sans text-[11px] text-slate-500 block mt-0.5">
                      Renders the sleek live SaaS Dashboard + Mobile card mockup.
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, heroMediaType: 'video' })}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    formData.heroMediaType === 'video'
                      ? 'border-[#0066FF] bg-blue-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Play className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-xs font-bold uppercase text-[#0B1938] block">
                      Showcase Video (Laptop & Mobile Website Scroll)
                    </span>
                    <span className="font-sans text-[11px] text-slate-500 block mt-0.5">
                      Plays your uploaded website showcase video automatically on loop in the Hero slot.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Uploader & URL Manager */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
              <VideoUpload
                value={formData.heroVideoUrl}
                onChange={(url) => setFormData({ ...formData, heroVideoUrl: url, heroMediaType: url ? 'video' : formData.heroMediaType })}
                label="Hero Showcase Video (Laptop & Mobile Website Scroll Video)"
                helperText="Upload your video file (MP4, WebM, MOV) showing the website scrolling inside the laptop and mobile frames. When uploaded, it will automatically play on loop in the Hero section."
              />
            </div>

            {/* Hero Background Color Matcher (To seamlessly blend video with hero section) */}
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase font-bold text-slate-800 block">
                    Hero Section Background Color
                  </span>
                  <span className="font-sans text-[11px] text-slate-500 block">
                    Match this color to your video's background so the video seamlessly blends into the Hero canvas without any borders or boxes.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-lg border border-slate-300 shadow-2xs"
                    style={{ backgroundColor: formData.heroBgColor || '#F2F2F2' }}
                  />
                  <input
                    type="text"
                    value={formData.heroBgColor || '#F2F2F2'}
                    onChange={(e) => setFormData({ ...formData, heroBgColor: e.target.value })}
                    placeholder="#F2F2F2"
                    className="w-24 bg-white border border-slate-300 px-2.5 py-1 text-xs text-[#0B1938] font-mono font-bold rounded-lg uppercase"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  { name: 'Video Exact Match (#F2F2F2)', hex: '#F2F2F2' },
                  { name: 'Pure White (#FFFFFF)', hex: '#FFFFFF' },
                  { name: 'Soft White (#FAFAFC)', hex: '#FAFAFC' },
                  { name: 'Light Slate (#F8FAFC)', hex: '#F8FAFC' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setFormData({ ...formData, heroBgColor: color.hex })}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      (formData.heroBgColor || '#F2F2F2').toUpperCase() === color.hex.toUpperCase()
                        ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block" 
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Copy Customizer */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <span className="font-mono text-[11px] uppercase font-bold text-slate-700 block">
                Hero Headline & Copy
              </span>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-500 font-semibold mb-1">
                  Pill Badge Text
                </label>
                <input
                  type="text"
                  value={formData.heroBadgeText}
                  onChange={(e) => setFormData({ ...formData, heroBadgeText: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3 py-1.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-500 font-semibold mb-1">
                    Main Headline (Prefix)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitlePrefix}
                    onChange={(e) => setFormData({ ...formData, heroTitlePrefix: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-1.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-500 font-semibold mb-1">
                    Headline Highlight (Blue Accent)
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitleAccent}
                    onChange={(e) => setFormData({ ...formData, heroTitleAccent: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-1.5 text-xs text-[#0066FF] focus:outline-none focus:border-[#0066FF] rounded-lg font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-500 font-semibold mb-1">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={formData.heroDescription}
                  onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3 py-1.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg"
                />
              </div>

              {/* 4 Stats Values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-500 font-bold mb-1">Happy Clients</label>
                  <input
                    type="text"
                    value={formData.statsClients}
                    onChange={(e) => setFormData({ ...formData, statsClients: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-2 py-1 text-xs text-[#0B1938] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-500 font-bold mb-1">Projects Delivered</label>
                  <input
                    type="text"
                    value={formData.statsProjects}
                    onChange={(e) => setFormData({ ...formData, statsProjects: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-2 py-1 text-xs text-[#0B1938] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-500 font-bold mb-1">Years Experience</label>
                  <input
                    type="text"
                    value={formData.statsExperience}
                    onChange={(e) => setFormData({ ...formData, statsExperience: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-2 py-1 text-xs text-[#0B1938] font-bold rounded"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase text-slate-500 font-bold mb-1">Support SLA</label>
                  <input
                    type="text"
                    value={formData.statsSupport}
                    onChange={(e) => setFormData({ ...formData, statsSupport: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-2 py-1 text-xs text-[#0B1938] font-bold rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
              Customer Support & Inbound Communication
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Primary Support Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Enterprise Sales Email
                </label>
                <input
                  type="email"
                  value={formData.salesEmail}
                  onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Official Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                  WhatsApp Support Phone Number
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
              />
            </div>
          </div>
        )}

        {/* Tab 4: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
              SEO & Social Graph Preview
            </h3>

            <ImageUpload
              label="Social OpenGraph / Twitter Banner (1200x630)"
              helperText="Upload social sharing preview banner"
              aspectRatio="video"
              value={formData.ogImageUrl}
              onChange={(url) => setFormData({ ...formData, ogImageUrl: url })}
            />

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-sans leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Social */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
              Official Social Profile URLs
            </h3>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                GitHub Organization URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
              />
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Configuration
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
