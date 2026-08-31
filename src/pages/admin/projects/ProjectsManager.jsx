import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useGetProjectsQuery, useCreateProjectMutation, useDeleteProjectMutation } from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const ProjectsManager = () => {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete project "${name}"?`)) {
      try {
        await deleteProject(id).unwrap();
        toast.success("Project removed");
      } catch (err) {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            PROJECT MANAGEMENT
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Publish client case studies, live demo links, and technology stacks.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add New Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
              <th className="py-3 px-4">Project / Client</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Tech Stack</th>
              <th className="py-3 px-4">Measurable Outcome</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects?.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#0E1424]/60">
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{proj.name}</div>
                  <div className="text-[11px] text-cyan-400">{proj.client} • {proj.industry}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="cyan" size="sm">{proj.serviceCategory || proj.category}</Badge>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {proj.technologies?.slice(0, 3).map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-[#0E1424] border border-slate-800 text-[10px]">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300 text-[11px] max-w-xs truncate">
                  {proj.results}
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="p-1 text-slate-400 hover:text-cyan-400 inline-block">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => handleDelete(proj.id, proj.name)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Create New Project</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Health Telemetry Platform"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Apex Health Inc."
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={e => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
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
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Node.js, AWS"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Summary Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief description of the product and problem solved..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Publish Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
