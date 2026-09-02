import React, { useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCaseStudiesQuery, useCreateCaseStudyMutation, useDeleteCaseStudyMutation } from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

export const CaseStudiesManager = () => {
  const { data: caseStudies, isLoading, refetch } = useGetCaseStudiesQuery();
  const [createCaseStudy, { isLoading: isCreating }] = useCreateCaseStudyMutation();
  const [deleteCaseStudy, { isLoading: isDeleting }] = useDeleteCaseStudyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    industry: 'Healthcare & MedTech',
    location: 'San Francisco, CA',
    projectDuration: '4 Months',
    challenge: '',
    solution: '',
    architecture: 'Containerized microservices running on AWS with PostgreSQL and Redis caching.',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  });

  if (isLoading) return <Loader text="Loading case studies..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCaseStudy({
        ...formData,
        slug: slugify(formData.title),
        results: [
          { metric: "99.99%", label: "System Uptime" },
          { metric: "45%", label: "Efficiency Increase" }
        ],
        technology: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"]
      }).unwrap();

      toast.success("Case study published!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to publish case study");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            CASE STUDIES CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Publish client architecture breakdowns and verified business metrics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Case Study
        </Button>
      </div>

      <div className="border border-slate-200 bg-white rounded-xl overflow-x-auto shadow-2xs">
        <table className="w-full text-left font-mono text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
              <th className="py-3 px-4 font-semibold">Case Study / Client</th>
              <th className="py-3 px-4 font-semibold">Industry</th>
              <th className="py-3 px-4 font-semibold">Location & Duration</th>
              <th className="py-3 px-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {caseStudies?.map((cs) => (
              <tr key={cs.id} className="hover:bg-blue-50/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#0B1938] text-sm">{cs.title}</div>
                  <div className="text-[11px] text-[#0066FF] font-semibold">{cs.client}</div>
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant="cyan" size="sm">{cs.industry}</Badge>
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  {cs.location} • {cs.projectDuration}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button 
                    onClick={() => handleDeleteClick(cs.id, cs.title)} 
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    aria-label={`Delete case study ${cs.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Create Case Study</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How FinVault Scaled Treasury Processing"
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
                    placeholder="FinVault Inc."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.projectDuration}
                    onChange={e => setFormData({ ...formData, projectDuration: e.target.value })}
                    placeholder="5 Months"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">The Challenge</label>
                <textarea
                  rows={2}
                  required
                  value={formData.challenge}
                  onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Describe the initial technical or operational problem..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">The Engineered Solution</label>
                <textarea
                  rows={2}
                  required
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Describe the architecture and system delivered..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Publish Case Study</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Theme-Matched Confirmation Modal */}
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
