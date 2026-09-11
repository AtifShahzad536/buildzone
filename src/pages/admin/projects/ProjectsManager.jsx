import React, { useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, Briefcase, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetProjectsQuery, 
  useCreateProjectMutation, 
  useUpdateProjectMutation, 
  useDeleteProjectMutation 
} from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import ConfirmModal from '../../../components/common/ConfirmModal';
import ImageUpload from '../../../components/common/ImageUpload';

export const ProjectsManager = () => {
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, name: '' });

  const initialForm = {
    name: '',
    client: '',
    category: 'Healthcare',
    serviceCategory: 'Web',
    industry: 'Healthcare',
    shortDescription: '',
    technologies: 'React, TypeScript, Node.js, AWS',
    results: '99.98% uptime, 40% reduction in patient wait times',
    image: '',
    liveUrl: '',
    featured: true,
  };

  const [formData, setFormData] = useState(initialForm);

  if (isLoading) return <Loader text="Loading projects manager..." />;

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    const projId = proj.id || proj._id;
    setEditingId(projId);
    setFormData({
      name: proj.name || '',
      client: proj.client || '',
      category: proj.category || 'Healthcare',
      serviceCategory: proj.serviceCategory || 'Web',
      industry: proj.industry || 'Healthcare',
      shortDescription: proj.shortDescription || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || ''),
      results: proj.results || '',
      image: proj.image || '',
      liveUrl: proj.liveUrl || '',
      featured: Boolean(proj.featured),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techArray = typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : formData.technologies;

      const payload = {
        ...formData,
        slug: slugify(formData.name),
        technologies: techArray,
      };

      if (editingId) {
        await updateProject({ id: editingId, ...payload }).unwrap();
        toast.success("Project updated successfully!");
      } else {
        await createProject(payload).unwrap();
        toast.success("New project published successfully!");
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData(initialForm);
      refetch?.();
    } catch (err) {
      toast.error(editingId ? "Failed to update project" : "Failed to create project");
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProject(deleteConfirm.id).unwrap();
      toast.success("Project removed from portfolio");
      setDeleteConfirm({ isOpen: false, id: null, name: '' });
      refetch?.();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            PROJECT & PORTFOLIO MANAGER
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish client products, upload showcase media to Cloudinary, and manage public portfolio links.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm shrink-0"
        >
          Add New Project
        </Button>
      </div>

      {/* Projects Table */}
      {projects?.length === 0 ? (
        <EmptyState
          title="No Projects Yet"
          description="Click 'Add New Project' to publish your first client engineering showcase."
        />
      ) : (
        <div className="border border-slate-200 bg-white rounded-xl overflow-x-auto shadow-2xs">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[860px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-4 font-semibold">Cover</th>
                <th className="py-3 px-4 font-semibold">Project & Client</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Tech Stack</th>
                <th className="py-3 px-4 font-semibold">Outcome Metrics</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects?.map((proj) => {
                const projId = proj.id || proj._id;
                return (
                  <tr key={projId} className="hover:bg-blue-50/40 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4 w-20">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.name || "Project thumbnail"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                            }}
                          />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B1938] text-sm flex items-center gap-2">
                        <span>{proj.name}</span>
                        {proj.featured && (
                          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#0066FF] font-medium">
                        {proj.client || 'Internal Product'} • {proj.industry || 'Tech'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="cyan" size="sm">{proj.serviceCategory || proj.category}</Badge>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.technologies?.slice(0, 3).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 text-[11px] max-w-xs truncate">
                      {proj.results || 'Production deployed'}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center cursor-pointer shrink-0"
                            title="Open Live URL"
                            aria-label={`Open live link for ${proj.name}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteClick(projId, proj.name)} 
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Delete Project"
                          aria-label={`Delete project ${proj.name}`}
                        >
                          <Trash2 className="w-4 h-4 inline-block" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
              <div>
                <h2 className="font-display text-base sm:text-lg font-bold uppercase text-[#0B1938]">
                  {editingId ? "Edit Project Showcase" : "Create New Project Showcase"}
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  {editingId ? "Updating ID: " + editingId : "Add a new client case showcase"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer font-bold"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <form onSubmit={handleSubmit} id="projectForm" className="p-6 space-y-4 font-sans text-xs overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300">
              {/* Project Image Upload / Cloudinary */}
              <ImageUpload
                label="Project Showcase Image / Mockup *"
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                helperText="Upload project mockup screenshot or paste Cloudinary/Unsplash image URL"
                aspectRatio="video"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. MedFlow Telehealth Suite"
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Client / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. MedFlow Global Health"
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={e => setFormData({ ...formData, serviceCategory: e.target.value, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="FinTech">FinTech & Banking</option>
                    <option value="AI">AI & Machine Learning</option>
                    <option value="Logistics">Logistics & Supply Chain</option>
                    <option value="SaaS">Enterprise SaaS</option>
                    <option value="Mobile">Mobile Solutions</option>
                    <option value="Cloud">Cloud Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Healthcare, Banking"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Live Production URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://client-product.com"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Technologies / Tech Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, WebRTC, Go, PostgreSQL, Redis, AWS"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Key Results & Metrics Highlight
                </label>
                <input
                  type="text"
                  value={formData.results}
                  onChange={e => setFormData({ ...formData, results: e.target.value })}
                  placeholder="e.g. 99.98% uptime, 40% reduction in patient wait times"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Summary Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Tell clients about the architectural challenges solved, scale handled, or unique value provided..."
                  className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#0066FF] border-slate-300 rounded focus:ring-[#0066FF]"
                />
                <label htmlFor="featured" className="font-mono text-xs text-slate-700 cursor-pointer select-none font-medium">
                  Feature this project on homepage and top portfolio highlights
                </label>
              </div>
            </form>

            {/* Sticky Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="projectForm"
                variant="primary" 
                size="sm" 
                isLoading={isCreating || isUpdating}
              >
                {editingId ? "Save Changes" : "Publish Project"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
