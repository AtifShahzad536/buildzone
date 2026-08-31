import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Save, RefreshCw, Terminal, Globe, Shield, Share2 } from 'lucide-react';
import { updateSettings, resetSettings } from '../../../features/settings/settingsSlice';
import Button from '../../../components/common/Button';

export const SettingsManager = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({ ...settings });

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
    toast.success("Global settings & company configuration updated!", {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            CENTRAL SYSTEM CONFIGURATION
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Control brand name, company contact channels, and global SEO metadata from one place.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} leftIcon={<Save className="w-3.5 h-3.5" />}>
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'general', label: 'General & Branding', icon: Terminal },
          { id: 'contact', label: 'Contact & Channels', icon: Globe },
          { id: 'seo', label: 'SEO & Metadata', icon: Shield },
          { id: 'social', label: 'Social Profiles', icon: Share2 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                  : 'bg-[#080B14] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Form Body */}
      <form onSubmit={handleSave} className="p-6 bg-[#080B14] border border-slate-800 space-y-6">
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Branding & Global Identity
            </h3>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Company Name (Rebrandable)
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
              <p className="font-mono text-[10px] text-slate-500 mt-1">
                Updating this dynamically changes the logo, title tags, footer, and copyright across the site.
              </p>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Primary Brand Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Contact */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Customer Support & Inbound Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                  Official Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Tab 3: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Default SEO Metadata
            </h3>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Default Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Social */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Official Social Profile URLs
            </h3>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                GitHub Organization URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                })}
                className="w-full bg-[#0E1424] border border-slate-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
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
