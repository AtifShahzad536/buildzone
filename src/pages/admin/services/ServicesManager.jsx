import React, { useState } from 'react';
import { Plus, Trash2, Layers } from 'lucide-react';
import { toast } from 'sonner';
import { useGetServicesQuery, useCreateServiceMutation, useDeleteServiceMutation } from '../../../services/api';
import { slugify, renderIcon } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const ServicesManager = () => {
  const { data: services, isLoading } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Engineering',
    iconName: 'Globe',
    shortDescription: '',
    heroDescription: '',
    technologies: 'React, TypeScript, AWS',
    benefits: 'High concurrency, 99.9% uptime, Secure architecture'
  });

  if (isLoading) return <Loader text="Loading services manager..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const techArr = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const benArr = formData.benefits.split(',').map(b => b.trim()).filter(Boolean);
      await createService({
        ...formData,
        slug: slugify(formData.title),
        technologies: techArr,
        benefits: benArr
      }).unwrap();

      toast.success("Service created successfully!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to create service");
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete service "${title}"?`)) {
      try {
        await deleteService(id).unwrap();
        toast.success("Service deleted");
      } catch (e) {
        toast.error("Failed to delete service");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            SERVICES MANAGER
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Configure public engineering service offerings and technical scopes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services?.map((s) => (
          <div key={s.id} className="p-5 bg-[#080B14] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-[#0E1424] border border-slate-800 text-cyan-400">
                  {renderIcon(s.iconName, { className: "w-5 h-5" })}
                </div>
                <Badge variant="cyan" size="sm">{s.category}</Badge>
              </div>

              <h3 className="font-display text-base font-bold uppercase text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-3 mb-4">{s.shortDescription}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {s.technologies?.slice(0, 3).map(t => (
                  <Badge key={t} size="sm" variant="default">{t}</Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-500">/{s.slug}</span>
              <button
                onClick={() => handleDelete(s.id, s.title)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Add New Service</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Blockchain & Smart Contracts"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-2 sentence overview of the capability..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Next.js, Node.js"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Create Service</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
