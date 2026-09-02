import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetLeadsQuery, useUpdateLeadStatusMutation, useDeleteLeadMutation } from '../../../services/api';
import { formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import EmptyState from '../../../components/common/EmptyState';
import ConfirmModal from '../../../components/common/ConfirmModal';

import { ADMIN_BASE_PATH } from '../../../config/adminConfig';

export const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, name: '' });

  const { data: leads, isLoading, isError, refetch } = useGetLeadsQuery();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

  if (isLoading) return <Loader text="Loading CRM leads..." />;

  const filtered = leads?.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.company && l.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLeadStatus({ id, status: newStatus }).unwrap();
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteLead(deleteConfirm.id).unwrap();
      toast.success("Lead removed from CRM");
      setDeleteConfirm({ isOpen: false, id: null, name: '' });
      refetch?.();
    } catch (e) {
      toast.error("Failed to delete lead");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            LEAD PIPELINE CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Manage incoming inquiries, update negotiation status, and track conversion timelines.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-lg border cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-[#0066FF] hover:border-slate-300'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 pl-9 pr-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Leads Table */}
      {filtered?.length === 0 ? (
        <EmptyState
          title="No Leads Found"
          description="There are currently no inquiries matching your active search or status filter."
        />
      ) : (
        <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                <th className="py-3 px-4 font-semibold">Contact</th>
                <th className="py-3 px-4 font-semibold">Service Required</th>
                <th className="py-3 px-4 font-semibold">Budget / Timeline</th>
                <th className="py-3 px-4 font-semibold">Source</th>
                <th className="py-3 px-4 font-semibold">Status Stage</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered?.map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0B1938] text-sm">{lead.name}</div>
                    <div className="text-[11px] text-slate-500">{lead.email}</div>
                    {lead.company && <div className="text-[10px] text-[#0066FF] font-semibold">{lead.company} • {lead.country}</div>}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-bold text-[#0066FF]">{lead.service}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <div className="font-medium">{lead.budget || 'Not specified'}</div>
                    <div className="text-[10px] text-slate-500">{lead.timeline || 'Flexible'}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {lead.source || 'Website'}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-mono text-[#0B1938] font-bold focus:outline-none focus:border-[#0066FF] rounded-lg cursor-pointer"
                    >
                      {statuses.filter(s => s !== 'All').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      to={`${ADMIN_BASE_PATH}/leads/${lead.id}`}
                      className="px-3 py-1 bg-blue-50 border border-blue-200 text-[#0066FF] hover:bg-[#0066FF] hover:text-white rounded-lg uppercase font-bold text-[11px] transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(lead.id, lead.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      aria-label={`Delete lead for ${lead.name}`}
                    >
                      <Trash2 className="w-4 h-4 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Theme-Matched Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Lead Confirmation"
        message="Are you sure you want to delete this client inquiry? All correspondence and notes will be permanently purged."
        itemTitle={deleteConfirm.name}
        confirmText="Yes, Delete Lead"
        cancelText="Keep Lead"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, name: '' })}
      />
    </div>
  );
};

export default LeadsManager;
