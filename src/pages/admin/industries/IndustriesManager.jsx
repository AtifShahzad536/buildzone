import React, { useState } from 'react';
import { Plus, Trash2, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetIndustriesQuery, useCreateIndustryMutation, useDeleteIndustryMutation } from '../../../services/api';
import { slugify, renderIcon } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const IndustriesManager = () => {
  const { data: industries, isLoading } = useGetIndustriesQuery();
  const [createIndustry, { isLoading: isCreating }] = useCreateIndustryMutation();
  const [deleteIndustry] = useDeleteIndustryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    iconName: 'Activity',
    shortDescription: '',
    heroDescription: ''
  });

  if (isLoading) return <Loader text="Loading industries manager..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createIndustry({
        ...formData,
        slug: slugify(formData.name),
        commonProblems: ["Regulatory hurdles", "Legacy data silos"],
        solutions: ["End-to-end cloud platform", "Automated compliance"]
      }).unwrap();

      toast.success("Industry vertical added!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to add industry");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete industry "${name}"?`)) {
      try {
        await deleteIndustry(id).unwrap();
        toast.success("Industry removed");
      } catch (e) {
        toast.error("Failed to delete industry");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            INDUSTRIES MANAGER
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans pt-1">
            Configure sector-specific solutions and case studies.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm cursor-pointer"
        >
          Add Industry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries?.map((ind) => (
          <div key={ind.id} className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl flex flex-col justify-between hover:border-[#00F0FF]/40 hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-[#0066FF]/20 border border-[#00F0FF]/30 text-[#00F0FF] rounded-xl">
                  {renderIcon(ind.iconName, { className: "w-5 h-5" })}
                </div>
                <Badge variant="cyan" size="sm">Active</Badge>
              </div>

              <h2 className="font-display text-base font-bold uppercase text-white mb-2">{ind.name}</h2>
              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed font-sans">{ind.shortDescription}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#00F0FF] font-semibold">/{ind.slug}</span>
              <button
                onClick={() => handleDelete(ind.id, ind.name)}
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0B1528] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h2 className="font-display text-lg font-bold uppercase text-white">Add Industry Vertical</h2>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">Industry Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aerospace & Defense"
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-300 font-bold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="High-level summary of solutions provided in this sector..."
                  className="w-full bg-[#070E1C] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] rounded-lg shadow-inner"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Add Industry</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustriesManager;
