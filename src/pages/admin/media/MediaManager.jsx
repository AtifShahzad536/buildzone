import React, { useState } from 'react';
import { Plus, Trash2, Copy, Search, ExternalLink, Image as ImageIcon, Check, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { useGetMediaQuery, useUploadMediaMutation, useDeleteMediaMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';
import ImageUpload from '../../../components/common/ImageUpload';

export const MediaManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const { data: mediaList, isLoading } = useGetMediaQuery();
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'Projects',
    size: '1.2 MB'
  });

  if (isLoading) return <Loader text="Loading media library..." />;

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.url) {
      toast.error("Please upload or enter an image URL");
      return;
    }

    try {
      await uploadMedia({
        name: formData.name || `media-${Date.now()}.png`,
        url: formData.url,
        category: formData.category || 'Projects',
        size: formData.size || '1.0 MB',
        date: new Date().toISOString().split('T')[0]
      }).unwrap();

      toast.success("Media asset saved successfully!");
      setIsModalOpen(false);
      setFormData({ name: '', url: '', category: 'Projects', size: '1.0 MB' });
    } catch (e) {
      toast.error("Failed to save media asset");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete image "${name}"?`)) {
      try {
        await deleteMedia(id).unwrap();
        toast.success("Asset removed from library");
      } catch (e) {
        toast.error("Failed to delete asset");
      }
    }
  };

  const categories = ['ALL', 'Projects', 'Hero', 'Blog', 'Team', 'Icons', 'Branding'];

  const filtered = mediaList?.filter(m => {
    const matchesSearch = (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (m.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || (m.category || '').toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              MEDIA & CDN ASSETS
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
              {mediaList?.length || 0} ASSETS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Upload and copy production image URLs to use anywhere across Projects, Case Studies, Blogs, and Team profiles.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setFormData({ name: '', url: '', category: 'Projects', size: '1.2 MB' });
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Upload Asset
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search assets by file name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0066FF] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0B1938] hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered?.map((item) => {
          const id = item.id || item._id;
          const isCopied = copiedId === id;

          return (
            <div
              key={id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-md hover:border-blue-200 transition-all relative"
            >
              <div className="aspect-video w-full bg-slate-900/5 overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.name || "Media asset"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-xs font-mono text-[9px] text-[#0066FF] font-bold uppercase rounded-md shadow-2xs border border-slate-100">
                  {item.category || 'Asset'}
                </div>
              </div>

              <div className="p-4">
                <div className="font-mono text-xs font-bold text-[#0B1938] truncate mb-1" title={item.name}>
                  {item.name}
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>{item.size || '1.2 MB'}</span>
                  <span>{item.date || 'Active'}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(item.url, id)}
                  className={`p-1 font-mono text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isCopied ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-[#0066FF]'
                  }`}
                  title="Copy URL"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy URL'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-[#0066FF] transition-colors"
                    title="Open Full Image"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(id, item.name)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-display text-lg font-bold uppercase text-[#0B1938]">
                Upload CDN Media Asset
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-sans text-xs">
              <ImageUpload
                label="Select or Drag Image File"
                helperText="Upload PNG, JPG, WebP, SVG (Cloudinary CDN)"
                aspectRatio="video"
                value={formData.url}
                onChange={(url) => setFormData({ ...formData, url })}
              />

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Asset Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. medflow-telehealth-preview.png"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Asset Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                >
                  <option value="Projects">Projects</option>
                  <option value="Hero">Hero & Backgrounds</option>
                  <option value="Blog">Blog Covers</option>
                  <option value="Team">Team Headshots</option>
                  <option value="Branding">Branding & Logos</option>
                  <option value="Icons">Icons & Badges</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isUploading}
                >
                  Save Asset
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
