import React, { useState } from 'react';
import { Plus, Trash2, Edit2, UserCheck, Globe, Link2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetTeamQuery, 
  useCreateTeamMemberMutation, 
  useUpdateTeamMemberMutation, 
  useDeleteTeamMemberMutation 
} from '../../../services/api';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import ConfirmModal from '../../../components/common/ConfirmModal';
import ImageUpload from '../../../components/common/ImageUpload';

export const TeamManager = () => {
  const { data: team, isLoading, refetch } = useGetTeamQuery();
  const [createMember, { isLoading: isCreating }] = useCreateTeamMemberMutation();
  const [updateMember, { isLoading: isUpdating }] = useUpdateTeamMemberMutation();
  const [deleteMember, { isLoading: isDeleting }] = useDeleteTeamMemberMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, name: '' });

  const initialForm = {
    name: '',
    position: '',
    bio: '',
    skills: 'System Architecture, AI, Cloud Infrastructure',
    linkedin: '',
    github: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  };

  const [formData, setFormData] = useState(initialForm);

  if (isLoading) return <Loader text="Loading team manager..." />;

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    const memberId = member.id || member._id;
    setEditingId(memberId);
    setFormData({
      name: member.name || '',
      position: member.position || '',
      bio: member.bio || '',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : (member.skills || ''),
      linkedin: member.linkedin || '',
      github: member.github || '',
      image: member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = typeof formData.skills === 'string'
        ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : formData.skills;

      const payload = {
        ...formData,
        skills: skillsArray,
      };

      if (editingId) {
        await updateMember({ id: editingId, ...payload }).unwrap();
        toast.success("Team member updated successfully!");
      } else {
        await createMember(payload).unwrap();
        toast.success("Team member added!");
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData(initialForm);
      refetch?.();
    } catch (e) {
      toast.error(editingId ? "Failed to update team member" : "Failed to add team member");
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMember(deleteConfirm.id).unwrap();
      toast.success("Team member removed successfully");
      setDeleteConfirm({ isOpen: false, id: null, name: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete team member");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            TEAM & LEADERSHIP DIRECTORY
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Manage partner credentials, upload executive headshots to Cloudinary, and maintain skills.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-sm shrink-0"
        >
          Add Partner
        </Button>
      </div>

      {/* Grid */}
      {team?.length === 0 ? (
        <EmptyState
          title="No Team Members"
          description="Click 'Add Partner' to add leadership profiles to your public About & Team page."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team?.map((member) => {
            const memberId = member.id || member._id;
            return (
              <div key={memberId} className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-2xs shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                      }}
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
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0066FF] transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0B1938] transition-colors">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(member)}
                      className="p-1.5 text-slate-400 hover:text-[#0066FF] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(memberId, member.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Profile"
                      aria-label={`Delete team member ${member.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">
                {editingId ? "Edit Partner Profile" : "Add Team Partner"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {/* Partner Avatar Photo Upload */}
              <ImageUpload
                label="Partner Headshot / Avatar *"
                value={formData.image}
                onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                helperText="Upload professional square avatar (PNG, JPG, WebP)"
                aspectRatio="avatar"
              />

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Sofia Chen"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Position / Executive Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g. Partner & Head of Artificial Intelligence"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-medium"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Core Competencies & Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={e => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="LLM Systems, Distributed Scaling, PyTorch, Kubernetes"
                  className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={e => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">
                  Executive Bio *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Executive background, technical patents, prior leadership at tier-1 tech firms..."
                  className="w-full bg-white border border-slate-300 px-3.5 py-2.5 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
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
                  variant="primary" 
                  size="sm" 
                  isLoading={isCreating || isUpdating}
                >
                  {editingId ? "Save Profile" : "Add Member"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Team Member Confirmation"
        message="Are you sure you want to remove this profile? The member will no longer appear on the public About & Team page."
        itemTitle={deleteConfirm.name}
        confirmText="Yes, Delete Member"
        cancelText="Keep Member"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, name: '' })}
      />
    </div>
  );
};

export default TeamManager;
