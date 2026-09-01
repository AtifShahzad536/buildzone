import React, { useState } from 'react';
import { Plus, Trash2, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useGetTeamQuery, useCreateTeamMemberMutation, useDeleteTeamMemberMutation } from '../../../services/api';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const TeamManager = () => {
  const { data: team, isLoading } = useGetTeamQuery();
  const [createMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [deleteMember] = useDeleteTeamMemberMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    skills: 'System Architecture, AI, React',
    linkedin: '',
    github: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  });

  if (isLoading) return <Loader text="Loading team manager..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
      await createMember({
        ...formData,
        skills: skillsArray
      }).unwrap();

      toast.success("Team member added!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to add team member");
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete team profile for ${name}?`)) {
      try {
        await deleteMember(id).unwrap();
        toast.success("Team member removed");
      } catch (e) {
        toast.error("Failed to delete team member");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            TEAM & PARTNERS MANAGEMENT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Manage partner credentials, public profiles, and core competency tags.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm"
        >
          Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team?.map((member) => (
          <div key={member.id} className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <h3 className="font-display text-base font-bold uppercase text-[#0B1938]">{member.name}</h3>
                  <p className="font-mono text-xs text-[#0066FF] font-semibold">{member.position}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 mb-4 font-sans leading-relaxed">{member.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {member.skills?.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-medium">{s}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-500 font-medium">Partner Profile</span>
              <button
                onClick={() => handleDelete(member.id, member.name)}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Add Team Partner</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Sterling"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Position / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g. VP of Cloud Engineering"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Bio *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Executive background, technical leadership experience..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Add Member</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;
