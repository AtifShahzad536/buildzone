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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            SERVICES MANAGER
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Configure public engineering service offerings and technical scopes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((s) => (
          <div key={s.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-blue-50 border border-blue-200 text-[#0066FF] rounded-lg">
                  {renderIcon(s.iconName, { className: "w-5 h-5" })}
                </div>
                <Badge variant="cyan" size="sm">{s.category}</Badge>
              </div>

              <h3 className="font-display text-base font-bold uppercase text-[#0B1938] mb-2">{s.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{s.shortDescription}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.technologies?.slice(0, 3).map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#0066FF] font-semibold">/{s.slug}</span>
              <button
                onClick={() => handleDelete(s.id, s.title)}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Add New Service</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Blockchain & Smart Contracts"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-2 sentence overview of the capability..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Next.js, Node.js"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
