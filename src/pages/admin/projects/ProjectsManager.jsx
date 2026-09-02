import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProjectsQuery, useCreateProjectMutation, useDeleteProjectMutation } from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

export const ProjectsManager = () => {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, name: '' });
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    category: 'Healthcare',
    serviceCategory: 'Web',
    industry: 'Healthcare',
    shortDescription: '',
    technologies: 'React, TypeScript, Node.js',
    results: '99.9% uptime and sub-second load times',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: ''
  });

  if (isLoading) return <Loader text="Loading projects manager..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      await createProject({
        ...formData,
        slug: slugify(formData.name),
        technologies: techArray
      }).unwrap();

      toast.success("Project published successfully!");
      setIsModalOpen(false);
      setFormData({
        name: '',
        client: '',
        category: 'Healthcare',
        serviceCategory: 'Web',
        industry: 'Healthcare',
        shortDescription: '',
        technologies: 'React, TypeScript, Node.js',
        results: '99.9% uptime',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        liveUrl: ''
      });
    } catch (err) {
      toast.error("Failed to create project");
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProject(deleteConfirm.id).unwrap();
      toast.success("Project removed successfully");
      setDeleteConfirm({ isOpen: false, id: null, name: '' });
      refetch?.();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            PROJECT MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish client case studies, live demo links, and technology stacks.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add New Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="border border-slate-200 bg-white rounded-xl overflow-x-auto shadow-2xs">
        <table className="w-full text-left font-mono text-xs border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
              <th className="py-3 px-4 font-semibold">Project / Client</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold">Tech Stack</th>
              <th className="py-3 px-4 font-semibold">Measurable Outcome</th>
              <th className="py-3 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects?.map((proj) => (
              <tr key={proj.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#0B1938] text-sm">{proj.name}</div>
                  <div className="text-[11px] text-[#0066FF] font-medium">{proj.client} • {proj.industry}</div>
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant="cyan" size="sm">{proj.serviceCategory || proj.category}</Badge>
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {proj.technologies?.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-medium">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs truncate">
                  {proj.results}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center cursor-pointer shrink-0"
                        title="Open Live Site"
                        aria-label={`Open live site for ${proj.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button 
                      onClick={() => handleDeleteClick(proj.id, proj.name)} 
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                      title="Delete Project"
                      aria-label={`Delete project ${proj.name}`}
                    >
                      <Trash2 className="w-4 h-4 inline-block" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Create New Project</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Health Telemetry Platform"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Apex Health Inc."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={e => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="AI">AI</option>
                    <option value="SaaS">SaaS</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Node.js, AWS"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Summary Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief description of the product and problem solved..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Publish Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Theme-Matched Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Project Confirmation"
        message="Are you sure you want to permanently delete this project? It will be removed from your public portfolio showcase and records."
        itemTitle={deleteConfirm.name}
        confirmText="Yes, Delete Project"
        cancelText="Keep Project"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, name: '' })}
      />
    </div>
  );
};

export default ProjectsManager;
