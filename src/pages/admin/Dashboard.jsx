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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
            OPERATIONAL DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-sans pt-1">
            Real-time pipeline metrics, lead acquisition channels, and project status.
          </p>
        </div>

        <Link
          to={`${ADMIN_BASE_PATH}/leads`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white hover:bg-[#0052cc] rounded-lg font-mono text-xs transition-all font-bold uppercase self-start sm:self-auto shadow-sm shadow-[#0066FF]/20"
        >
          <span>Open Lead CRM</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Total Leads</span>
            <div className="p-2 bg-blue-50 text-[#0066FF] rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0B1938]">{totalLeads}</div>
          <div className="font-mono text-[11px] text-emerald-600 font-bold">+34% vs last month</div>
        </div>

        <div className="p-5 sm:p-6 bg-white border border-blue-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">New Inquiries</span>
            <div className="p-2 bg-blue-50 text-[#0066FF] rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0066FF]">{newLeads}</div>
          <div className="font-mono text-[11px] text-slate-500 font-medium">Pending initial response</div>
        </div>

        <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Proposals Active</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-[#0B1938]">{proposals}</div>
          <div className="font-mono text-[11px] text-purple-600 font-bold">In review / negotiation</div>
        </div>

        <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 font-mono text-xs">
            <span className="font-semibold uppercase tracking-wider">Closed Won</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-emerald-600">{wonLeads}</div>
          <div className="font-mono text-[11px] text-emerald-600 font-bold">Contracted & In Progress</div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-2xs">
          <div className="font-mono text-xs text-slate-500 uppercase font-semibold">Live Projects</div>
          <div className="text-xl font-bold text-[#0B1938] mt-1">{projects?.length || 6}</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-2xs">
          <div className="font-mono text-xs text-slate-500 uppercase font-semibold">Published Posts</div>
          <div className="text-xl font-bold text-[#0B1938] mt-1">{blogs?.length || 7}</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-2xs">
          <div className="font-mono text-xs text-slate-500 uppercase font-semibold">Open Careers</div>
          <div className="text-xl font-bold text-[#0B1938] mt-1">{careers?.length || 4}</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-2xs">
          <div className="font-mono text-xs text-slate-500 uppercase font-semibold">Qualified Rate</div>
          <div className="text-xl font-bold text-[#0066FF] mt-1">78.4%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Bar Chart */}
        <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider">
              Lead Acquisition & Conversions (Last 6 Months)
            </h3>
            <Badge variant="cyan" size="sm">2026 Telemetry</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748B" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#0B1938', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: 'rgba(0, 102, 255, 0.05)' }}
                />
                <Bar dataKey="leads" name="Total Inquiries" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="won" name="Won Contracts" fill="#0066FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Service Distribution */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider mb-1">
              Demand by Service
            </h3>
            <p className="font-mono text-[11px] text-slate-500">Share of incoming inquiries</p>
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
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', color: '#0B1938', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-700 font-medium truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads Preview */}
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase text-[#0B1938] tracking-wider">
            Latest Pipeline Inquiries
          </h3>
          <Link to={`${ADMIN_BASE_PATH}/leads`} className="font-mono text-xs text-[#0066FF] hover:underline font-bold">
            View All {totalLeads} Leads →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                <th className="pb-3 px-3">Client / Company</th>
                <th className="pb-3 px-3">Service</th>
                <th className="pb-3 px-3">Budget</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads?.slice(0, 4).map((lead) => (
                <tr key={lead.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-3 text-[#0B1938] font-bold">{lead.name} <span className="text-slate-500 font-normal">({lead.company || lead.country})</span></td>
                  <td className="py-3.5 px-3 text-[#0066FF] font-semibold">{lead.service}</td>
                  <td className="py-3.5 px-3 text-slate-700">{lead.budget || '$10k+'}</td>
                  <td className="py-3.5 px-3">
                    <Badge variant={lead.status === 'Won' ? 'emerald' : lead.status === 'Negotiation' ? 'violet' : 'cyan'} size="sm">
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link to={`${ADMIN_BASE_PATH}/leads/${lead.id}`} className="text-[#0066FF] hover:underline uppercase font-bold">
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
