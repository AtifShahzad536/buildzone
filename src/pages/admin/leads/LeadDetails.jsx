import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Send,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { useGetLeadByIdQuery, useUpdateLeadStatusMutation } from '../../../services/api';
import { formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ErrorState from '../../../components/common/ErrorState';

export const LeadDetails = () => {
  const { id } = useParams();
  const { data: lead, isLoading, isError, refetch } = useGetLeadByIdQuery(id);
  const [updateLeadStatus, { isLoading: isUpdating }] = useUpdateLeadStatusMutation();
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Meeting Scheduled');

  if (isLoading) return <Loader text="Loading lead CRM file..." />;
  if (isError || !lead) return <ErrorState message="Lead record not found." onRetry={refetch} />;

  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

  const handleStatusChange = async (newStatus) => {
    try {
      await updateLeadStatus({ id: lead.id, status: newStatus }).unwrap();
      toast.success(`Pipeline status updated to ${newStatus}`);
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      await updateLeadStatus({
        id: lead.id,
        newActivity: {
          type: noteType,
          note: noteText
        }
      }).unwrap();
      toast.success("Activity note added to lead timeline");
      setNoteText('');
    } catch (e) {
      toast.error("Failed to add note");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/leads"
          className="font-mono text-xs text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1.5 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lead CRM</span>
        </Link>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400 uppercase">Stage:</span>
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-[#0E1424] border border-cyan-500/50 px-3 py-1.5 text-xs font-mono font-bold text-cyan-300 focus:outline-none cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Lead File */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <h1 className="text-xl font-bold font-display uppercase text-white">{lead.name}</h1>
                <p className="font-mono text-xs text-cyan-400">{lead.company || 'Individual / Startup'}</p>
              </div>
              <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : 'cyan'}>
                {lead.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <a href={`mailto:${lead.email}`} className="hover:text-cyan-400">{lead.email}</a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{lead.country || 'Global'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Created: {formatDate(lead.createdDate)}</span>
              </div>
            </div>
          </div>

          {/* Project Details Scope */}
          <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Project Parameters & Requirements
            </h3>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#0E1424] border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Required Service</span>
                <span className="text-cyan-300 font-bold">{lead.service}</span>
              </div>
              <div className="p-3 bg-[#0E1424] border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Budget</span>
                <span className="text-white font-bold">{lead.budget || 'Not set'}</span>
              </div>
              <div className="p-3 bg-[#0E1424] border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Target Timeline</span>
                <span className="text-white font-bold">{lead.timeline || 'Flexible'}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-xs text-slate-400 uppercase font-bold block mb-2">Scope Details:</span>
              <div className="p-4 bg-[#0E1424] border border-slate-800/80 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {lead.projectDetails || "No additional text provided in original inquiry."}
              </div>
            </div>
          </div>

          {/* Add Activity Note Form */}
          <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Log Communication / Activity
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="bg-[#0E1424] border border-slate-700 px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                >
                  <option value="Meeting Scheduled">Meeting Scheduled</option>
                  <option value="Email Sent">Email Sent</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Note Added">Internal Note</option>
                </select>
                <input
                  type="text"
                  placeholder="Type notes from phone call, proposal version, or next action..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 bg-[#0E1424] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Log
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4">
          <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
            Activity Timeline
          </h3>

          <div className="space-y-4 pt-2">
            {lead.activities?.map((act, i) => (
              <div key={act.id || i} className="relative pl-6 pb-4 border-l-2 border-slate-800 last:border-0 last:pb-0">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-cyan-400 border-2 border-[#080B14]"></div>
                <div className="font-mono text-xs font-bold text-cyan-300">{act.type}</div>
                <p className="text-xs text-slate-300 font-sans mt-0.5">{act.note}</p>
                <span className="font-mono text-[10px] text-slate-500 block mt-1">
                  {formatDate(act.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
