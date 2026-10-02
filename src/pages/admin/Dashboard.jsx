import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  FileText, 
  FolderGit2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight,
  Clock,
  Activity,
  Layers
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
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import { ADMIN_BASE_PATH } from '../../config/adminConfig';

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
    { name: 'AI & Agents', value: 38, color: '#0066FF' },
    { name: 'Web Dev', value: 26, color: '#7928CA' },
    { name: 'SaaS Platform', value: 20, color: '#10B981' },
    { name: 'Mobile Apps', value: 16, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans pt-1">
            Real-time pipeline metrics, lead acquisition channels, and project status.
          </p>
        </div>

        <Link
          to={`${ADMIN_BASE_PATH}/leads`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white hover:opacity-95 rounded-xl font-mono text-xs transition-all font-bold uppercase self-start sm:self-auto shadow-md shadow-blue-500/20"
        >
          <span>Open Lead CRM</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 bg-[#0B1528] border border-slate-800 rounded-2xl space-y-2 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Leads</span>
            <div className="p-2 bg-[#070E1C] border border-slate-800 text-[#00F0FF] rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">{totalLeads}</div>
          <div className="font-mono text-[11px] text-emerald-400 font-bold">+34% vs last month</div>
        </div>

        <div className="p-5 sm:p-6 bg-[#0B1528] border border-[#0066FF]/40 rounded-2xl space-y-2 shadow-xl hover:border-[#00F0FF]/60 transition-all">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">New Inquiries</span>
            <div className="p-2 bg-[#070E1C] border border-slate-800 text-[#00F0FF] rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#00F0FF]">{newLeads}</div>
          <div className="font-mono text-[11px] text-slate-400 font-medium">Pending initial response</div>
        </div>

        <div className="p-5 sm:p-6 bg-[#0B1528] border border-slate-800 rounded-2xl space-y-2 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Proposals Active</span>
            <div className="p-2 bg-[#070E1C] border border-slate-800 text-purple-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">{proposals}</div>
          <div className="font-mono text-[11px] text-purple-400 font-bold">In review / negotiation</div>
        </div>

        <div className="p-5 sm:p-6 bg-[#0B1528] border border-slate-800 rounded-2xl space-y-2 shadow-xl hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Closed Won</span>
            <div className="p-2 bg-[#070E1C] border border-slate-800 text-emerald-400 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400">{wonLeads}</div>
          <div className="font-mono text-[11px] text-emerald-400 font-bold">Contracted & In Progress</div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#0B1528] border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="font-mono text-xs text-slate-400 uppercase font-semibold">Live Projects</div>
          <div className="text-xl font-bold text-white mt-1">{projects?.length || 6}</div>
        </div>
        <div className="p-4 bg-[#0B1528] border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="font-mono text-xs text-slate-400 uppercase font-semibold">Published Posts</div>
          <div className="text-xl font-bold text-white mt-1">{blogs?.length || 7}</div>
        </div>
        <div className="p-4 bg-[#0B1528] border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="font-mono text-xs text-slate-400 uppercase font-semibold">Open Careers</div>
          <div className="text-xl font-bold text-white mt-1">{careers?.length || 4}</div>
        </div>
        <div className="p-4 bg-[#0B1528] border border-slate-800 rounded-2xl text-center shadow-lg">
          <div className="font-mono text-xs text-slate-400 uppercase font-semibold">Qualified Rate</div>
          <div className="text-xl font-bold text-[#00F0FF] mt-1">78.4%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider">
              Lead Acquisition & Conversions (Last 6 Months)
            </h2>
            <Badge variant="cyan" size="sm">2026 Telemetry</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#070E1C', borderColor: '#1E293B', color: '#FFFFFF', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  cursor={{ fill: 'rgba(0, 240, 255, 0.05)' }}
                />
                <Bar dataKey="leads" name="Total Inquiries" fill="#1E293B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="won" name="Won Contracts" fill="#00F0FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Service Distribution */}
        <div className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider mb-1">
              Demand by Service
            </h2>
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
                <Tooltip contentStyle={{ backgroundColor: '#070E1C', borderColor: '#1E293B', color: '#FFFFFF', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 font-medium truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="p-6 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-bold uppercase text-white tracking-wider">
            Latest Pipeline Inquiries
          </h2>
          <Link to={`${ADMIN_BASE_PATH}/leads`} className="font-mono text-xs text-[#00F0FF] hover:underline font-bold">
            View All {totalLeads} Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 px-3">Client / Company</th>
                <th className="pb-3 px-3">Service</th>
                <th className="pb-3 px-3">Budget</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leads?.slice(0, 4).map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-3 text-white font-bold">{lead.name} <span className="text-slate-400 font-normal">({lead.company || lead.country})</span></td>
                  <td className="py-3.5 px-3 text-[#00F0FF] font-semibold">{lead.service}</td>
                  <td className="py-3.5 px-3 text-slate-300">{lead.budget || '$10k+'}</td>
                  <td className="py-3.5 px-3">
                    <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : 'cyan'} size="sm">
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link to={`${ADMIN_BASE_PATH}/leads/${lead.id}`} className="text-[#00F0FF] hover:underline uppercase font-bold">
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
