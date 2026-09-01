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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            TECHNOLOGY STACK CATALOG
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Maintain supported engineering frameworks, databases, and AI tooling.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Tech
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies?.map((tech) => (
          <div key={tech.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-[#0066FF]">
                  {renderIcon(tech.iconName, { className: "w-4 h-4" })}
                </div>
                <Badge variant="cyan" size="sm">{tech.category}</Badge>
              </div>
              <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] mb-1">{tech.name}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{tech.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Add Technology</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Supabase / GraphQL"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
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
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short explanation of how this is utilized in production..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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
