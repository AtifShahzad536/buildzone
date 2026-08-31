import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  FileText, 
  FolderGit2, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ArrowUpRight,
  Clock,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  useGetLeadsQuery, 
  useGetProjectsQuery, 
  useGetBlogsQuery, 
  useGetCareersQuery 
} from '../../services/api';
import Loader from '../../components/common/Loader';
import Badge from '../../components/common/Badge';

export const Dashboard = () => {
  const { data: leads, isLoading: loadingLeads } = useGetLeadsQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: blogs } = useGetBlogsQuery();
  const { data: careers } = useGetCareersQuery();

  if (loadingLeads) return <Loader text="Loading administration metrics..." />;

  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter(l => l.status === 'New').length || 0;
  const qualifiedLeads = leads?.filter(l => l.status === 'Qualified').length || 0;
  const proposals = leads?.filter(l => l.status === 'Proposal Sent').length || 0;
  const wonLeads = leads?.filter(l => l.status === 'Won').length || 0;

  // Chart data
  const monthlyData = [
    { month: 'Mar', leads: 8, won: 2 },
    { month: 'Apr', leads: 12, won: 3 },
    { month: 'May', leads: 15, won: 4 },
    { month: 'Jun', leads: 22, won: 6 },
    { month: 'Jul', leads: 28, won: 8 },
    { month: 'Aug', leads: 34, won: 11 },
  ];

  const serviceBreakdown = [
    { name: 'AI & Agents', value: 38, color: '#00F0FF' },
    { name: 'Web Dev', value: 26, color: '#8B5CF6' },
    { name: 'SaaS Platform', value: 20, color: '#10B981' },
    { name: 'Mobile Apps', value: 16, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black font-display uppercase tracking-tight text-white">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="font-mono text-xs text-slate-400">
            Real-time pipeline metrics, lead acquisition channels, and project status.
          </p>
        </div>

        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0E1424] border border-cyan-500/50 font-mono text-xs text-cyan-400 hover:border-cyan-400 transition-all font-bold uppercase self-start sm:self-auto"
        >
          <span>Open Lead CRM</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#080B14] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Total Leads</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">{totalLeads}</div>
          <div className="font-mono text-[10px] text-cyan-400">+34% vs last month</div>
        </div>

        <div className="p-5 bg-[#080B14] border border-cyan-500/40 space-y-2 tech-corner-accent">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>New Inquiries</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-cyan-400">{newLeads}</div>
          <div className="font-mono text-[10px] text-slate-400">Pending initial response</div>
        </div>

        <div className="p-5 bg-[#080B14] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Proposals Active</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">{proposals}</div>
          <div className="font-mono text-[10px] text-purple-400">In review / negotiation</div>
        </div>

        <div className="p-5 bg-[#080B14] border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Closed Won</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400">{wonLeads}</div>
          <div className="font-mono text-[10px] text-emerald-400">Contracted & In Progress</div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#080B14] border border-slate-800 text-center">
          <div className="font-mono text-xs text-slate-400 uppercase">Live Projects</div>
          <div className="text-xl font-bold text-white mt-1">{projects?.length || 6}</div>
        </div>
        <div className="p-4 bg-[#080B14] border border-slate-800 text-center">
          <div className="font-mono text-xs text-slate-400 uppercase">Published Posts</div>
          <div className="text-xl font-bold text-white mt-1">{blogs?.length || 3}</div>
        </div>
        <div className="p-4 bg-[#080B14] border border-slate-800 text-center">
          <div className="font-mono text-xs text-slate-400 uppercase">Open Careers</div>
          <div className="text-xl font-bold text-white mt-1">{careers?.length || 3}</div>
        </div>
        <div className="p-4 bg-[#080B14] border border-slate-800 text-center">
          <div className="font-mono text-xs text-slate-400 uppercase">Qualified Rate</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">78.4%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-[#080B14] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Lead Acquisition & Conversions (Last 6 Months)
            </h3>
            <Badge variant="cyan" size="sm">2026 Telemetry</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0E1424', borderColor: '#1E293B', color: '#FFF' }}
                  cursor={{ fill: 'rgba(0, 240, 255, 0.05)' }}
                />
                <Bar dataKey="leads" name="Total Inquiries" fill="#1E293B" stroke="#00F0FF" />
                <Bar dataKey="won" name="Won Contracts" fill="#00F0FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Service Distribution */}
        <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider mb-2">
              Demand by Service
            </h3>
            <p className="font-mono text-[11px] text-slate-400">Share of incoming inquiries</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0E1424', borderColor: '#1E293B', color: '#FFF' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="p-6 bg-[#080B14] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider">
            Latest Pipeline Inquiries
          </h3>
          <Link to="/admin/leads" className="font-mono text-xs text-cyan-400 hover:underline">
            View All {totalLeads} Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 px-2">Client / Company</th>
                <th className="pb-3 px-2">Service</th>
                <th className="pb-3 px-2">Budget</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads?.slice(0, 4).map((lead) => (
                <tr key={lead.id} className="hover:bg-[#0E1424]">
                  <td className="py-3 px-2 text-white font-bold">{lead.name} <span className="text-slate-500 font-normal">({lead.company || lead.country})</span></td>
                  <td className="py-3 px-2 text-cyan-400">{lead.service}</td>
                  <td className="py-3 px-2 text-slate-300">{lead.budget || '$10k+'}</td>
                  <td className="py-3 px-2">
                    <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : 'cyan'} size="sm">
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Link to={`/admin/leads/${lead.id}`} className="text-cyan-400 hover:text-white uppercase font-bold">
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
