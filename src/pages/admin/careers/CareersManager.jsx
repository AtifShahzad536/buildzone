import React, { useState } from 'react';
import { Plus, Trash2, FolderGit2, User, Mail, Phone, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useGetCareersQuery, useCreateCareerMutation, useDeleteCareerMutation, useGetApplicationsQuery } from '../../../services/api';
import { slugify, formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';

export const CareersManager = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const { data: careers, isLoading } = useGetCareersQuery();
  const { data: applications } = useGetApplicationsQuery();
  const [createCareer, { isLoading: isCreating }] = useCreateCareerMutation();
  const [deleteCareer] = useDeleteCareerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete job opening "${title}"?`)) {
      try {
        await deleteCareer(id).unwrap();
        toast.success("Job posting removed");
      } catch (e) {
        toast.error("Failed to delete job");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            CAREERS & CANDIDATES
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Manage active job openings and candidate resumes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#080B14] border border-slate-800 p-1 flex">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                activeTab === 'jobs' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              Open Roles ({careers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase ${
                activeTab === 'apps' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400'
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
          >
            Post Job
          </Button>
        </div>
      </div>

      {activeTab === 'jobs' ? (
        <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Salary Range</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {careers?.map((job) => (
                <tr key={job.id} className="hover:bg-[#0E1424]/60">
                  <td className="py-3 px-4 font-bold text-white text-sm">{job.title}</td>
                  <td className="py-3 px-4"><Badge variant="cyan" size="sm">{job.department}</Badge></td>
                  <td className="py-3 px-4 text-slate-300">{job.location}</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{job.salaryRange}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDelete(job.id, job.title)} className="p-1 text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Portfolio Link</th>
                <th className="py-3 px-4">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications?.map((app) => (
                <tr key={app.id} className="hover:bg-[#0E1424]/60">
                  <td className="py-3 px-4 font-bold text-white">{app.name}</td>
                  <td className="py-3 px-4 text-cyan-400">{app.position}</td>
                  <td className="py-3 px-4 text-slate-300">{app.email}</td>
                  <td className="py-3 px-4">
                    {app.portfolio ? (
                      <a href={app.portfolio} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                        <span>Profile Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : 'None'}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{formatDate(app.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06080F]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0E1424] border border-cyan-500/40 p-6 space-y-4 tech-corner-accent shadow-2xl">
            <h3 className="font-display text-lg font-bold uppercase text-white">Post Open Role</h3>
            <form onSubmit={handleCreate} className="space-y-3 font-sans">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Lead AI Engineer"
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salaryRange}
                    onChange={e => setFormData({ ...formData, salaryRange: e.target.value })}
                    placeholder="$100k - $140k"
                    className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-300 mb-1">Brief Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary of duties and team context..."
                  className="w-full bg-[#080B12] border border-slate-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" isLoading={isCreating}>Post Job</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersManager;
