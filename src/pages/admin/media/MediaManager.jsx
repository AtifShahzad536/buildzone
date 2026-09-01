import React, { useState } from 'react';
import { Plus, Trash2, Copy, Image, Search, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useGetMediaQuery, useUploadMediaMutation, useDeleteMediaMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import Loader from '../../../components/common/Loader';

export const MediaManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard!");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadMedia(formData).unwrap();
      toast.success("Media asset saved!");
      setIsModalOpen(false);
      setFormData({ name: '', url: '', category: 'Projects', size: '1.0 MB' });
    } catch (e) {
      toast.error("Failed to add media");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete image "${name}"?`)) {
      try {
        await deleteMedia(id).unwrap();
        toast.success("Asset removed");
      } catch (e) {
        toast.error("Failed to delete asset");
      }
    }
  };

  const filtered = mediaList?.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            MEDIA ASSET LIBRARY
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Store and manage CDN assets, project screenshots, and brand graphics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Asset
        </Button>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter assets by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered?.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-xs font-mono text-[9px] text-[#0066FF] font-bold uppercase rounded-md shadow-2xs">
                {item.category}
              </div>
            </div>

            <div className="p-4">
              <div className="font-mono text-xs font-bold text-[#0B1938] truncate mb-1">{item.name}</div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>{item.size}</span>
                <span>{item.date}</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleCopy(item.url)}
                className="p-1 text-slate-600 hover:text-[#0066FF] font-mono text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Copy URL"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>

              <button
                onClick={() => handleDelete(item.id, item.name)}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Add Media URL</h3>
            <form onSubmit={handleUpload} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. medflow-architecture.png"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Direct Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={e => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                >
                  <option value="Projects">Projects</option>
                  <option value="Hero">Hero & Backgrounds</option>
                  <option value="Blog">Blog Covers</option>
                  <option value="Team">Team Photos</option>
                  <option value="Icons">Icons & Badges</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isUploading}>Save Asset</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
