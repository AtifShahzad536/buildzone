import React, { useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCaseStudiesQuery, useCreateCaseStudyMutation, useDeleteCaseStudyMutation } from '../../../services/api';
import { slugify } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const CaseStudiesManager = () => {
  const { data: caseStudies, isLoading } = useGetCaseStudiesQuery();
  const [createCaseStudy, { isLoading: isCreating }] = useCreateCaseStudyMutation();
  const [deleteCaseStudy] = useDeleteCaseStudyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete case study "${title}"?`)) {
      try {
        await deleteCaseStudy(id).unwrap();
        toast.success("Case study deleted");
      } catch (e) {
        toast.error("Failed to delete case study");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            CASE STUDIES CMS
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Publish client architecture breakdowns and verified business metrics.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Case Study
        </Button>
      </div>

      <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
              <th className="py-3 px-4">Case Study / Client</th>
              <th className="py-3 px-4">Industry</th>
              <th className="py-3 px-4">Location & Duration</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {caseStudies?.map((cs) => (
              <tr key={cs.id} className="hover:bg-[#0E1424]/60">
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{cs.title}</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">{cs.client}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="cyan" size="sm">{cs.industry}</Badge>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {cs.location} • {cs.projectDuration}
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleDelete(cs.id, cs.title)} className="p-1 text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Create Case Study</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How FinVault Scaled Treasury Processing"
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
                    placeholder="FinVault Inc."
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.projectDuration}
                    onChange={e => setFormData({ ...formData, projectDuration: e.target.value })}
                    placeholder="5 Months"
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">The Challenge</label>
                <textarea
                  rows={2}
                  required
                  value={formData.challenge}
                  onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Describe the initial technical or operational problem..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">The Engineered Solution</label>
                <textarea
                  rows={2}
                  required
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Describe the architecture and system delivered..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Publish Case Study</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesManager;
