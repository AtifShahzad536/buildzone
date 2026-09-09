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
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Copy,
  Sparkles,
  FileText,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetLeadByIdQuery, 
  useUpdateLeadStatusMutation,
  useSendClientEmailMutation 
} from '../../../services/api';
import { formatDate } from '../../../utils/helpers';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import Loader from '../../../components/common/Loader';
import ErrorState from '../../../components/common/ErrorState';
import { ADMIN_BASE_PATH } from '../../../config/adminConfig';

export const LeadDetails = () => {
  const { id } = useParams();
  const { data: lead, isLoading, isError, refetch } = useGetLeadByIdQuery(id);
  const [updateLeadStatus, { isLoading: isUpdating }] = useUpdateLeadStatusMutation();
  const [sendClientEmail, { isLoading: isSendingEmail }] = useSendClientEmailMutation();
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Meeting Scheduled');

  // Email Composer Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  if (isLoading) return <Loader text="Loading lead CRM file..." />;
  if (isError || !lead) return <ErrorState message="Lead record not found." onRetry={refetch} />;

  const leadId = lead.id || lead._id || id;
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

  const handleStatusChange = async (newStatus) => {
    try {
      await updateLeadStatus({ id: leadId, status: newStatus }).unwrap();
      toast.success(`Pipeline status updated to ${newStatus}`);
      refetch();
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) {
      toast.error("Please enter a note before logging.");
      return;
    }

    try {
      await updateLeadStatus({
        id: leadId,
        newActivity: {
          type: noteType,
          note: noteText.trim()
        }
      }).unwrap();
      toast.success(`Activity "${noteType}" logged to timeline!`);
      setNoteText('');
      refetch();
    } catch (e) {
      toast.error("Failed to log activity note.");
    }
  };

  // Open Email Composer with template
  const handleOpenEmailModal = (templateType = 'proposal') => {
    if (templateType === 'proposal') {
      setEmailSubject(`[BuildZone Technology] Technical Architecture & Proposal for ${lead.name}`);
      setEmailBody(
`Hi ${lead.name},

Thank you for contacting BuildZone Technology regarding your inquiry for "${lead.service}".

We have conducted an initial architecture review for your project (Estimated Budget: ${lead.budget || 'Custom Scope'}, Target Timeline: ${lead.timeline || 'Flexible'}).

Key Next Steps:
1. 20-minute Discovery & Tech Stack Alignment Call
2. Formal Scope Blueprint & Milestone Breakdown
3. Fixed-Price & Deliverable Schedule

Are you available for a brief discussion this week?

Best regards,
Lead Solutions Architect
BuildZone Technology — #1 Software House in Sialkot
Website: https://buildzonetechnology.com
WhatsApp: +92 105464116 | Email: info@buildzonetechnology.com`
      );
    } else if (templateType === 'meeting') {
      setEmailSubject(`[BuildZone Technology] Scheduling Architecture Discovery Call — ${lead.name}`);
      setEmailBody(
`Hi ${lead.name},

Following up on your inquiry for "${lead.service}". We'd love to schedule a quick 15-minute technical discovery call to review your specifications in detail.

Please let us know your preferred date and time, or reach out to us directly on WhatsApp at +92 105464116.

Best regards,
BuildZone Technology Team`
      );
    }
    setIsEmailModalOpen(true);
  };

  // Handle Direct Server Email Dispatch
  const handleSendEmail = async () => {
    if (!lead.email) {
      toast.error("Lead has no valid email address.");
      return;
    }
    if (!emailSubject.trim()) {
      toast.error("Subject line is required.");
      return;
    }
    if (!emailBody.trim()) {
      toast.error("Email message body is required.");
      return;
    }

    try {
      await sendClientEmail({
        to: lead.email,
        subject: emailSubject.trim(),
        message: emailBody.trim(),
        leadId
      }).unwrap();

      toast.success(`Email dispatched directly to ${lead.email}!`);
      setIsEmailModalOpen(false);
      refetch();
    } catch (e) {
      console.error("Direct email dispatch failed:", e);
      toast.error(e?.data?.error || "Failed to dispatch email. Please check server mail configuration.");
    }
  };

  // Launch default system mail client as fallback option
  const handleOpenSystemMailClient = () => {
    if (!lead.email) return;
    const mailtoUrl = `mailto:${encodeURIComponent(lead.email)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoUrl, '_blank');
  };

  // Handle WhatsApp Direct Launcher
  const handleWhatsAppChat = async () => {
    const rawPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
    const phoneNum = rawPhone.startsWith('92') ? rawPhone : (rawPhone ? `92${rawPhone.replace(/^0+/, '')}` : '92105464116');
    const greeting = encodeURIComponent(`Hi ${lead.name}, this is BuildZone Technology regarding your inquiry for "${lead.service}". We reviewed your specifications and would like to share the architecture roadmap with you.`);
    
    window.open(`https://wa.me/${phoneNum}?text=${greeting}`, '_blank');

    // Log WhatsApp activity
    try {
      await updateLeadStatus({
        id: leadId,
        newActivity: {
          type: 'WhatsApp Chat',
          note: `Initiated direct WhatsApp conversation with ${lead.name} (${phoneNum})`
        }
      }).unwrap();
      toast.success("WhatsApp chat opened & logged to timeline!");
      refetch();
    } catch (e) {
      // ignore
    }
  };

  // Handle Phone Call Action
  const handlePhoneCall = async () => {
    if (!lead.phone) {
      toast.error("No phone number recorded for this lead.");
      return;
    }
    window.location.href = `tel:${lead.phone}`;

    try {
      await updateLeadStatus({
        id: leadId,
        newActivity: {
          type: 'Phone Call',
          note: `Direct phone call initiated to ${lead.phone}`
        }
      }).unwrap();
      toast.success("Call initiated & logged to timeline!");
      refetch();
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <Link
          to={`${ADMIN_BASE_PATH}/leads`}
          className="font-mono text-xs text-slate-600 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lead CRM</span>
        </Link>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 uppercase font-bold">Pipeline Stage:</span>
          <select
            value={lead.status || 'New'}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="bg-slate-50 border border-slate-300 px-3 py-1.5 text-xs font-mono font-bold text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Lead Card + Scope + Real Communication Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Lead Profile Card */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938]">{lead.name}</h1>
                <p className="font-mono text-xs text-[#0066FF] font-semibold mt-0.5">{lead.company || 'Individual / Startup Client'}</p>
              </div>
              <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : lead.status === 'Proposal Sent' ? 'blue' : 'cyan'}>
                {lead.status}
              </Badge>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <Mail className="w-4 h-4 text-[#0066FF] shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] text-slate-400 block uppercase">Email</span>
                  <a href={`mailto:${lead.email}`} className="hover:text-[#0066FF] font-bold text-[#0B1938] truncate block">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[10px] text-slate-400 block uppercase">Phone / WhatsApp</span>
                  <span className="font-bold text-[#0B1938] truncate block">{lead.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Location</span>
                  <span className="font-bold text-[#0B1938]">{lead.country || 'Global Client'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Inquiry Date</span>
                  <span className="font-bold text-[#0B1938]">{formatDate(lead.createdDate)}</span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Communication Actions */}
            <div className="pt-2 border-t border-slate-100">
              <span className="font-mono text-[11px] text-slate-500 uppercase font-bold block mb-2.5">
                ⚡ Direct Client Communication Actions:
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenEmailModal('proposal')}
                  className="px-3.5 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Proposal Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Chat</span>
                </button>

                {lead.phone && (
                  <button
                    type="button"
                    onClick={handlePhoneCall}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Client</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Project Parameters & Scope */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-4">
            <h2 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0066FF]" />
              Project Parameters & Requirements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Required Service</span>
                <span className="text-[#0066FF] font-extrabold text-sm block mt-0.5">{lead.service}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Target Budget</span>
                <span className="text-[#0B1938] font-extrabold text-sm block mt-0.5">{lead.budget || 'Custom Sizing'}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Target Timeline</span>
                <span className="text-[#0B1938] font-extrabold text-sm block mt-0.5">{lead.timeline || 'Flexible'}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-xs text-slate-500 uppercase font-bold block mb-2">Detailed Scope & Requirements:</span>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {lead.projectDetails || lead.message || "No additional text provided in original inquiry."}
              </div>
            </div>
          </div>

          {/* Log Communication / Activity Form */}
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#0066FF]" />
                Log Communication / Activity
              </h2>
              <span className="font-mono text-[10px] text-slate-400 uppercase">Updates CRM Timeline</span>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="bg-slate-50 border border-slate-300 px-3 py-2 text-xs font-mono text-[#0B1938] focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs cursor-pointer font-semibold"
                >
                  <option value="Meeting Scheduled">📅 Meeting Scheduled</option>
                  <option value="Email Sent">✉️ Email Sent</option>
                  <option value="Proposal Sent">📄 Proposal Sent</option>
                  <option value="Phone Call">📞 Phone Call</option>
                  <option value="WhatsApp Chat">💬 WhatsApp Chat</option>
                  <option value="Follow-up">🔄 Follow-up</option>
                  <option value="Client Feedback">⭐ Client Feedback</option>
                  <option value="Internal Note">📝 Internal Note</option>
                </select>

                <input
                  type="text"
                  placeholder="Type notes from phone call, proposal version, or next action..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                  className="cursor-pointer"
                >
                  Log
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column (1 Col): Activity Timeline */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0066FF]" />
              Activity Timeline
            </h2>
            <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Live
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {lead.activities && lead.activities.length > 0 ? (
              lead.activities.map((act, i) => (
                <div key={act.id || i} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-0 last:pb-0">
                  <div className="absolute -left-[7px] top-0 w-3.5 h-3.5 bg-[#0066FF] rounded-full border-2 border-white shadow-xs"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0066FF]">{act.type}</span>
                    <span className="font-mono text-[9px] text-slate-400">
                      {formatDate(act.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-sans mt-1 leading-snug whitespace-pre-wrap">{act.note}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400 font-mono text-xs">
                No activity logged yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Direct Email Composer Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in-up">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#0B1938]">
                    Compose Client Email
                  </h3>
                  <p className="font-mono text-xs text-slate-500">To: {lead.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEmailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Chooser */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-500 font-bold">Template:</span>
              <button
                type="button"
                onClick={() => handleOpenEmailModal('proposal')}
                className="font-mono text-xs px-3 py-1 bg-blue-50 text-[#0066FF] border border-blue-200 rounded-lg hover:bg-blue-100 font-medium"
              >
                📋 Architecture Proposal
              </button>
              <button
                type="button"
                onClick={() => handleOpenEmailModal('meeting')}
                className="font-mono text-xs px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-200 font-medium"
              >
                📅 Discovery Call
              </button>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full bg-white border border-slate-300 px-3 py-2 text-xs text-[#0B1938] font-mono font-medium focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                Email Message Body
              </label>
              <textarea
                rows={9}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-[#0066FF] rounded-xl leading-relaxed"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEmailModalOpen(false)}
                disabled={isSendingEmail}
              >
                Cancel
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenSystemMailClient}
                  title="Open this drafted message in your device email client (Outlook/Thunderbird/Mail)"
                  className="text-slate-600 hover:text-[#0066FF] text-xs font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  Mail App
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleSendEmail}
                  isLoading={isSendingEmail}
                  disabled={isSendingEmail}
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                >
                  {isSendingEmail ? 'Dispatching...' : 'Dispatch Email to Client'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetails;
