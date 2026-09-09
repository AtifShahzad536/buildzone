import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Layers, Globe, Cpu, Smartphone, Cloud, Shield, Database, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} from '../../../services/api';
import { slugify, renderIcon } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

export const ServicesManager = () => {
  const { data: services, isLoading, refetch } = useGetServicesQuery();
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });

  const initialFormState = {
    title: '',
    category: 'Engineering',
    iconName: 'Globe',
    shortDescription: '',
    heroDescription: '',
    technologies: 'React, TypeScript, Node.js, AWS',
    deliverables: 'Architecture Diagram, Source Code, CI/CD Pipeline, Automated Tests'
  };

  const [formData, setFormData] = useState(initialFormState);

  if (isLoading) return <Loader text="Loading services manager..." />;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingId(s.id || s._id || s.slug);
    const techStr = Array.isArray(s.technologies) ? s.technologies.join(', ') : (s.technologies || '');
    const delivStr = Array.isArray(s.deliverables) ? s.deliverables.join(', ') : (Array.isArray(s.benefits) ? s.benefits.join(', ') : '');

    setFormData({
      title: s.title || '',
      category: s.category || 'Engineering',
      iconName: s.iconName || 'Globe',
      shortDescription: s.shortDescription || '',
      heroDescription: s.heroDescription || '',
      technologies: techStr,
      deliverables: delivStr
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techArr = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const delivArr = formData.deliverables.split(',').map(b => b.trim()).filter(Boolean);

      const payload = {
        title: formData.title,
        category: formData.category,
        iconName: formData.iconName,
        shortDescription: formData.shortDescription,
        heroDescription: formData.heroDescription || formData.shortDescription,
        technologies: techArr,
        deliverables: delivArr,
        benefits: delivArr,
        slug: slugify(formData.title)
      };

      if (editingId) {
        await updateService({ ...payload, id: editingId }).unwrap();
        toast.success("Service updated successfully!");
      } else {
        await createService(payload).unwrap();
        toast.success("Service created successfully!");
      }

      setIsModalOpen(false);
      setEditingId(null);
      refetch?.();
    } catch (e) {
      toast.error(editingId ? "Failed to update service" : "Failed to create service");
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteService(deleteConfirm.id).unwrap();
      toast.success("Service deleted successfully");
      setDeleteConfirm({ isOpen: false, id: null, title: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete service");
    }
  };

  const iconOptions = ['Globe', 'Cpu', 'Smartphone', 'Cloud', 'Shield', 'Database', 'Layers', 'Sparkles'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              SERVICES & CAPABILITIES
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
              {services?.length || 0} CAPABILITIES
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Configure public engineering service offerings, deliverables, and technology stacks.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Service
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((s) => {
          const id = s.id || s._id || s.slug;

          return (
            <div
              key={id}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 border border-blue-200 text-[#0066FF] rounded-xl shadow-2xs">
                    {renderIcon(s.iconName || 'Globe', { className: "w-5 h-5" })}
                  </div>
                  <Badge variant="cyan" size="sm">{s.category}</Badge>
                </div>

                <h3 className="font-display text-base font-bold uppercase text-[#0B1938] mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed font-sans">{s.shortDescription}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.technologies?.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#0066FF] font-semibold">/{s.slug}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(id, s.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
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
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">
                {editingId ? 'Edit Engineering Service' : 'Add New Service Capability'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Agents & Machine Learning Systems"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Design Systems">Design Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Icon Name
                  </label>
                  <select
                    value={formData.iconName}
                    onChange={e => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-mono font-bold"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Overview of this service capability displayed in cards and menus..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Hero Detailed Description
                </label>
                <textarea
                  rows={2}
                  value={formData.heroDescription}
                  onChange={e => setFormData({ ...formData, heroDescription: e.target.value })}
                  placeholder="In-depth hero section explanation for the dedicated service landing page..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Python, PyTorch, LangChain, OpenAI, FastAPI, Docker"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Key Deliverables / Benefits (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.deliverables}
                  onChange={e => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="Autonomous Agents, Fine-tuned LLMs, Custom RAG Pipeline, 99.9% Uptime"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
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
                  isLoading={isCreating || isUpdating}
                >
                  {editingId ? 'Save Changes' : 'Create Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Service Confirmation"
        message="Are you sure you want to delete this engineering service capability? It will be removed from navigation and showcase."
        itemTitle={deleteConfirm.title}
        confirmText="Yes, Delete Service"
        cancelText="Keep Service"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
      />
    </div>
  );
};

export default ServicesManager;
