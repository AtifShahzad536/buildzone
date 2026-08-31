import React, { useState } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { toast } from 'sonner';
import { useGetTechnologiesQuery, useCreateTechnologyMutation } from '../../../services/api';
import { renderIcon } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const TechnologiesManager = () => {
  const { data: technologies, isLoading } = useGetTechnologiesQuery();
  const [createTechnology, { isLoading: isCreating }] = useCreateTechnologyMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    iconName: 'Code',
    description: ''
  });

  if (isLoading) return <Loader text="Loading technologies..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTechnology(formData).unwrap();
      toast.success("Technology added to stack!");
      setIsModalOpen(false);
      setFormData({ name: '', category: 'Frontend', iconName: 'Code', description: '' });
    } catch (e) {
      toast.error("Failed to add technology");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            TECHNOLOGY STACK CATALOG
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Maintain supported engineering frameworks, databases, and AI tooling.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Tech
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {technologies?.map((tech) => (
          <div key={tech.id} className="p-4 bg-[#080B14] border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-[#0E1424] border border-slate-800 flex items-center justify-center text-cyan-400">
                  {renderIcon(tech.iconName, { className: "w-4 h-4" })}
                </div>
                <Badge variant="cyan" size="sm">{tech.category}</Badge>
              </div>
              <h3 className="font-display text-sm font-bold uppercase text-white mb-1">{tech.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Add Technology</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Supabase / GraphQL"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Database">Database</option>
                  <option value="AI">AI</option>
                  <option value="Cloud">Cloud</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short explanation of how this is utilized in production..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Add Technology</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnologiesManager;
