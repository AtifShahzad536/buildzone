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

export const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { data: leads, isLoading, isError, refetch } = useGetLeadsQuery();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const [deleteLead] = useDeleteLeadMutation();

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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      try {
        await deleteLead(id).unwrap();
        toast.success("Lead removed from CRM");
      } catch (e) {
        toast.error("Failed to delete lead");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            LEAD PIPELINE CRM
          </h1>
          <p className="font-mono text-xs text-slate-400">
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
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                statusFilter === st
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                  : 'bg-[#080B14] text-slate-400 border-slate-800 hover:text-white'
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
            className="w-full bg-[#080B14] border border-slate-800 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Leads Table */}
      {filtered?.length === 0 ? (
        <EmptyState
          title="No Leads Found"
          description="There are currently no inquiries matching your active search or status filter."
        />
      ) : (
        <div className="border border-slate-800 bg-[#080B14] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] bg-[#0E1424]">
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Budget / Timeline</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered?.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#0E1424]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{lead.name}</div>
                    <div className="text-[11px] text-slate-400">{lead.email}</div>
                    {lead.company && <div className="text-[10px] text-cyan-400 font-semibold">{lead.company} • {lead.country}</div>}
                  </td>

                  <td className="py-3 px-4 text-slate-200">
                    <span className="font-bold text-cyan-300">{lead.service}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    <div>{lead.budget || 'Not specified'}</div>
                    <div className="text-[10px] text-slate-500">{lead.timeline || 'Flexible'}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {lead.source || 'Website'}
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="bg-[#0E1424] border border-slate-700 px-2 py-1 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      {statuses.filter(s => s !== 'All').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      to={`/admin/leads/${lead.id}`}
                      className="px-2.5 py-1 bg-[#141C33] border border-cyan-500/40 text-cyan-400 hover:border-cyan-400 uppercase font-bold text-[11px]"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(lead.id, lead.name)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
