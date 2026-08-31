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
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            INDUSTRIES MANAGER
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Configure sector-specific solutions and case studies.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Industry
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries?.map((ind) => (
          <div key={ind.id} className="p-5 bg-[#080B14] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-[#0E1424] border border-slate-800 text-cyan-400">
                  {renderIcon(ind.iconName, { className: "w-5 h-5" })}
                </div>
                <Badge variant="cyan" size="sm">Active</Badge>
              </div>

              <h3 className="font-display text-base font-bold uppercase text-white mb-2">{ind.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">{ind.shortDescription}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-500">/{ind.slug}</span>
              <button
                onClick={() => handleDelete(ind.id, ind.name)}
                className="p-1 text-slate-500 hover:text-rose-400"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Add Industry Vertical</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Industry Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aerospace & Defense"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="High-level summary of solutions provided in this sector..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
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
