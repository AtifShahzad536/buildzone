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
          className="font-mono text-xs text-slate-600 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lead CRM</span>
        </Link>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 uppercase font-semibold">Stage:</span>
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-white border border-slate-300 px-3 py-1.5 text-xs font-mono font-bold text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer"
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
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-xl font-bold font-display uppercase text-[#0B1938]">{lead.name}</h1>
                <p className="font-mono text-xs text-[#0066FF] font-semibold">{lead.company || 'Individual / Startup'}</p>
              </div>
              <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : 'cyan'}>
                {lead.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0066FF]" />
                <a href={`mailto:${lead.email}`} className="hover:text-[#0066FF] font-medium">{lead.email}</a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#0066FF]" />
                  <span className="font-medium">{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF]" />
                <span>{lead.country || 'Global'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0066FF]" />
                <span>Created: {formatDate(lead.createdDate)}</span>
              </div>
            </div>
          </div>

          {/* Project Details Scope */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
              Project Parameters & Requirements
            </h3>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Required Service</span>
                <span className="text-[#0066FF] font-bold">{lead.service}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Budget</span>
                <span className="text-[#0B1938] font-bold">{lead.budget || 'Not set'}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[10px] text-slate-500 uppercase block font-medium">Target Timeline</span>
                <span className="text-[#0B1938] font-bold">{lead.timeline || 'Flexible'}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-xs text-slate-500 uppercase font-bold block mb-2">Scope Details:</span>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg font-sans text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {lead.projectDetails || "No additional text provided in original inquiry."}
              </div>
            </div>
          </div>

          {/* Add Activity Note Form */}
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider">
              Log Communication / Activity
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="bg-white border border-slate-300 px-3 py-2 text-xs font-mono text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs cursor-pointer font-medium"
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
                  className="flex-1 bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                />
                <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Log
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Activity Timeline */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
          <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2">
            Activity Timeline
          </h3>

          <div className="space-y-4 pt-2">
            {lead.activities?.map((act, i) => (
              <div key={act.id || i} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-0 last:pb-0">
                <div className="absolute -left-[7px] top-0 w-3 h-3 bg-[#0066FF] rounded-full border-2 border-white"></div>
                <div className="font-mono text-xs font-bold text-[#0066FF]">{act.type}</div>
                <p className="text-xs text-slate-700 font-sans mt-0.5">{act.note}</p>
                <span className="font-mono text-[10px] text-slate-400 block mt-1">
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
