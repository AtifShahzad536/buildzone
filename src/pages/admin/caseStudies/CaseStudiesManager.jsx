import React, { useState } from 'react';
import { Plus, Trash2, Edit3, BookOpen, ExternalLink, Sparkles, Building2, Layers, Cpu } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetCaseStudiesQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation
} from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ImageUpload from '../../../components/common/ImageUpload';
import ConfirmModal from '../../../components/common/ConfirmModal';

export const CaseStudiesManager = () => {
  const { data: caseStudies, isLoading, refetch } = useGetCaseStudiesQuery();
  const [createCaseStudy, { isLoading: isCreating }] = useCreateCaseStudyMutation();
  const [updateCaseStudy, { isLoading: isUpdating }] = useUpdateCaseStudyMutation();
  const [deleteCaseStudy, { isLoading: isDeleting }] = useDeleteCaseStudyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });

  const initialFormState = {
    title: '',
    client: '',
    industry: 'FinTech & Banking',
    location: 'San Francisco, CA',
    projectDuration: '4 Months',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    challenge: '',
    solution: '',
    architecture: 'High-throughput microservices deployed on AWS EKS with Redis and PostgreSQL.',
    techInput: 'React, TypeScript, Node.js, PostgreSQL, Docker, AWS',
    metric1Label: 'System Uptime',
    metric1Val: '99.99%',
    metric2Label: 'Latency Reduction',
    metric2Val: '65%'
  };

  const [formData, setFormData] = useState(initialFormState);

  if (isLoading) return <Loader text="Loading case studies..." />;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cs) => {
    setEditingId(cs.id || cs._id || cs.slug);
    const techs = Array.isArray(cs.technologies) ? cs.technologies.join(', ') : (Array.isArray(cs.technology) ? cs.technology.join(', ') : 'React, Node.js');
    const results = Array.isArray(cs.results) ? cs.results : [];
    const metrics = Array.isArray(cs.metrics) ? cs.metrics : [];

    setFormData({
      title: cs.title || '',
      client: cs.client || '',
      industry: cs.industry || 'FinTech & Banking',
      location: cs.location || 'San Francisco, CA',
      projectDuration: cs.projectDuration || cs.duration || '4 Months',
      heroImage: cs.heroImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      challenge: cs.challenge || '',
      solution: cs.solution || '',
      architecture: cs.architecture || '',
      techInput: techs,
      metric1Label: metrics[0]?.label || results[0]?.label || 'System Uptime',
      metric1Val: metrics[0]?.value || results[0]?.metric || results[0]?.value || '99.99%',
      metric2Label: metrics[1]?.label || results[1]?.label || 'Performance Boost',
      metric2Val: metrics[1]?.value || results[1]?.metric || results[1]?.value || '50%'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techList = formData.techInput
        ? formData.techInput.split(',').map(t => t.trim()).filter(Boolean)
        : ['React', 'Node.js', 'PostgreSQL'];

      const metricsPayload = [
        { label: formData.metric1Label || 'System Uptime', value: formData.metric1Val || '99.9%' },
        { label: formData.metric2Label || 'Performance', value: formData.metric2Val || '40%' }
      ];

      const payload = {
        title: formData.title,
        client: formData.client,
        industry: formData.industry,
        location: formData.location,
        projectDuration: formData.projectDuration,
        duration: formData.projectDuration,
        heroImage: formData.heroImage,
        challenge: formData.challenge,
        solution: formData.solution,
        architecture: formData.architecture,
        technology: techList,
        technologies: techList,
        metrics: metricsPayload,
        results: metricsPayload.map(m => ({ metric: m.value, label: m.label })),
        slug: slugify(formData.title)
      };

      if (editingId) {
        await updateCaseStudy({ ...payload, id: editingId }).unwrap();
        toast.success("Case study updated successfully!");
      } else {
        await createCaseStudy(payload).unwrap();
        toast.success("Case study published!");
      }

      setIsModalOpen(false);
      setEditingId(null);
      refetch?.();
    } catch (e) {
      toast.error(editingId ? "Failed to update case study" : "Failed to publish case study");
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCaseStudy(deleteConfirm.id).unwrap();
      toast.success("Case study deleted successfully");
      setDeleteConfirm({ isOpen: false, id: null, title: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete case study");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              CASE STUDIES CMS
            </h1>
            <span className="px-2 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 text-[10px] font-mono font-bold rounded-full">
              {caseStudies?.length || 0} TOTAL
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish client architecture breakdowns, engineering metrics, and system delivery deep-dives.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Case Study
        </Button>
      </div>

      {/* Case Studies Grid/List */}
      <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                <th className="py-3.5 px-4 font-semibold">Hero Preview / Title</th>
                <th className="py-3.5 px-4 font-semibold">Client & Industry</th>
                <th className="py-3.5 px-4 font-semibold">Duration & Location</th>
                <th className="py-3.5 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {caseStudies?.map((cs) => {
                const id = cs.id || cs._id || cs.slug;
                const hero = cs.heroImage || cs.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';

                return (
                  <tr key={id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={hero}
                          alt={cs.title || "Case study showcase"}
                          className="w-14 h-10 object-cover rounded-lg border border-slate-200 shadow-2xs shrink-0"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div>
                          <div className="font-bold text-[#0B1938] text-sm leading-snug">{cs.title}</div>
                          <div className="text-[11px] text-slate-400 font-sans line-clamp-1">{cs.challenge || cs.architecture}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0066FF] text-xs">{cs.client}</div>
                      <Badge variant="cyan" size="sm" className="mt-1">{cs.industry}</Badge>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <div className="font-semibold text-xs text-[#0B1938]">{cs.projectDuration || cs.duration || 'N/A'}</div>
                      <div className="text-[11px] text-slate-500">{cs.location || 'Global'}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(cs)}
                          className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Case Study"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(id, cs.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
              <div>
                <h2 className="font-display text-base sm:text-lg font-bold uppercase text-[#0B1938]">
                  {editingId ? 'Edit Architecture Case Study' : 'Publish New Case Study'}
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  {editingId ? 'Updating ID: ' + editingId : 'Creating new client showcase'}
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

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} id="caseStudyForm" className="p-6 space-y-4 font-sans text-xs overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-300">
              {/* Cover/Hero Image */}
              <ImageUpload
                label="Case Study Hero Image"
                helperText="Upload 16:9 banner or architecture screenshot (Max 10MB)"
                aspectRatio="video"
                value={formData.heroImage}
                onChange={(url) => setFormData({ ...formData, heroImage: url })}
              />

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Case Study Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Real-Time Telemetry & Supply Chain Logistics"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. OmniStock Logistics Corp"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Industry Domain *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  >
                    <option value="Healthcare & MedTech">Healthcare & MedTech</option>
                    <option value="FinTech & Banking">FinTech & Banking</option>
                    <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    <option value="Autonomous AI & Robotics">Autonomous AI & Robotics</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Project Duration
                  </label>
                  <input
                    type="text"
                    value={formData.projectDuration}
                    onChange={e => setFormData({ ...formData, projectDuration: e.target.value })}
                    placeholder="e.g. 5 Months"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Client Location / Headquarters
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA / London, UK"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    The Technical Challenge *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.challenge}
                    onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe legacy system bottlenecks, high latency, scaling hurdles..."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    Engineered Solution & Delivery *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.solution}
                    onChange={e => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Describe the target architecture, microservices, pipeline migration..."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs leading-relaxed"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={e => setFormData({ ...formData, techInput: e.target.value })}
                  placeholder="React, TypeScript, Go, PostgreSQL, Redis, Kubernetes, AWS"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-600 font-bold mb-1">Metric 1</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Value (e.g. 99.99%)"
                      value={formData.metric1Val}
                      onChange={e => setFormData({ ...formData, metric1Val: e.target.value })}
                      className="w-1/2 bg-white border border-slate-300 px-2 py-1 text-xs rounded-md text-[#0B1938] font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Uptime)"
                      value={formData.metric1Label}
                      onChange={e => setFormData({ ...formData, metric1Label: e.target.value })}
                      className="w-1/2 bg-white border border-slate-300 px-2 py-1 text-xs rounded-md text-[#0B1938]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-600 font-bold mb-1">Metric 2</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Value (e.g. 65%)"
                      value={formData.metric2Val}
                      onChange={e => setFormData({ ...formData, metric2Val: e.target.value })}
                      className="w-1/2 bg-white border border-slate-300 px-2 py-1 text-xs rounded-md text-[#0B1938] font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Latency)"
                      value={formData.metric2Label}
                      onChange={e => setFormData({ ...formData, metric2Label: e.target.value })}
                      className="w-1/2 bg-white border border-slate-300 px-2 py-1 text-xs rounded-md text-[#0B1938]"
                    />
                  </div>
                </div>
              </div>
            </form>

            {/* Modal Footer (Sticky) */}
            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/80 shrink-0">
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
                form="caseStudyForm"
                variant="primary"
                size="sm"
                isLoading={isCreating || isUpdating}
              >
                {editingId ? 'Save Changes' : 'Publish Case Study'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Case Study Confirmation"
        message="Are you sure you want to delete this case study? It will be removed from your portfolio and technical architecture showcase."
        itemTitle={deleteConfirm.title}
        confirmText="Yes, Delete Case Study"
        cancelText="Keep Case Study"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
      />
    </div>
  );
};

export default CaseStudiesManager;
