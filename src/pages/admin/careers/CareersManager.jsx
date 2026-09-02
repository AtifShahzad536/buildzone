import React, { useState } from 'react';
import { Plus, Trash2, FolderGit2, User, Mail, Phone, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCareersQuery, useCreateCareerMutation, useDeleteCareerMutation, useGetApplicationsQuery } from '../../../services/api';
import { slugify, formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ConfirmModal from '../../../components/common/ConfirmModal';

export const CareersManager = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const { data: careers, isLoading, refetch } = useGetCareersQuery();
  const { data: applications } = useGetApplicationsQuery();
  const [createCareer, { isLoading: isCreating }] = useCreateCareerMutation();
  const [deleteCareer, { isLoading: isDeleting }] = useDeleteCareerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote (Global)',
    employmentType: 'Full-Time',
    experience: '4+ Years',
    salaryRange: '$90,000 - $130,000 / Year',
    shortDescription: '',
  });

  if (isLoading) return <Loader text="Loading careers..." />;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCareer({
        ...formData,
        slug: slugify(formData.title),
        responsibilities: ["Develop modular features", "Code reviews", "Architecture design"],
        requirements: ["4+ years experience", "Strong system design skills"],
        benefits: ["Remote flexibility", "Equipment budget", "Health insurance"]
      }).unwrap();

      toast.success("Job posting created!");
      setIsModalOpen(false);
    } catch (e) {
      toast.error("Failed to create job");
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCareer(deleteConfirm.id).unwrap();
      toast.success("Job posting removed successfully");
      setDeleteConfirm({ isOpen: false, id: null, title: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            CAREERS & CANDIDATES
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Manage active job openings and candidate resumes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 border border-slate-200 p-1 rounded-lg flex">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                activeTab === 'jobs' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-600 hover:text-[#0066FF]'
              }`}
            >
              Open Roles ({careers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                activeTab === 'apps' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-600 hover:text-[#0066FF]'
              }`}
            >
              Applications ({applications?.length || 0})
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-sm"
          >
            Post Job
          </Button>
        </div>
      </div>

      {activeTab === 'jobs' ? (
        <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-4 font-semibold">Role Title</th>
                <th className="py-3 px-4 font-semibold">Department</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Salary Range</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {careers?.map((job) => (
                <tr key={job.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0B1938] text-sm">{job.title}</td>
                  <td className="py-3.5 px-4"><Badge variant="cyan" size="sm">{job.department}</Badge></td>
                  <td className="py-3.5 px-4 text-slate-700">{job.location}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">{job.salaryRange}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => handleDeleteClick(job.id, job.title)} 
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      aria-label={`Delete job ${job.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-4 font-semibold">Candidate</th>
                <th className="py-3 px-4 font-semibold">Position</th>
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold">Portfolio Link</th>
                <th className="py-3 px-4 font-semibold">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications?.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0B1938]">{app.name}</td>
                  <td className="py-3.5 px-4 text-[#0066FF] font-semibold">{app.position}</td>
                  <td className="py-3.5 px-4 text-slate-700">{app.email}</td>
                  <td className="py-3.5 px-4">
                    {app.portfolio ? (
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-[#0066FF] hover:underline flex items-center gap-1 font-semibold">
                        <span>Profile Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : 'None'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{formatDate(app.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-[#0B1938]">Post Open Role</h3>
            <form onSubmit={handleCreate} className="space-y-4 font-sans">
              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Lead AI Engineer"
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salaryRange}
                    onChange={e => setFormData({ ...formData, salaryRange: e.target.value })}
                    placeholder="$100k - $140k"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-700 font-bold mb-1">Brief Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary of duties and team context..."
                  className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Post Job</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Theme-Matched Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Job Opening Confirmation"
        message="Are you sure you want to delete this career opening? Candidates will no longer be able to submit applications for this role."
        itemTitle={deleteConfirm.title}
        confirmText="Yes, Delete Job"
        cancelText="Keep Job"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
      />
    </div>
  );
};

export default CareersManager;
