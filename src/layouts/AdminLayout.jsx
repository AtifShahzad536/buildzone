import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Layers, 
  Building2, 
  BookOpen, 
  UserCheck, 
  Star, 
  FileText, 
  FolderGit2, 
  HelpCircle, 
  Cpu, 
  Image, 
  Settings, 
  LogOut, 
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { logout, setRole } from '../features/auth/authSlice';
import { siteConfig } from '../config/siteConfig';

const adminNavItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Leads & CRM', href: '/admin/leads', icon: Users },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Industries', href: '/admin/industries', icon: Building2 },
  { label: 'Case Studies', href: '/admin/case-studies', icon: BookOpen },
  { label: 'Team Members', href: '/admin/team', icon: UserCheck },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Blog Articles', href: '/admin/blog', icon: FileText },
  { label: 'Job Openings', href: '/admin/careers', icon: FolderGit2 },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Tech Stack', href: '/admin/technologies', icon: Cpu },
  { label: 'Media Library', href: '/admin/media', icon: Image },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const handleRoleSwitch = (newRole) => {
    dispatch(setRole(newRole));
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Status Bar */}
      <header className="h-14 bg-[#080B14] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="BuildZone Admin Logo"
              className="h-7 w-auto object-contain"
            />
            <img
              src="/LOGO%20TEXT.png"
              alt="BuildZone Admin Text"
              className="h-4.5 w-auto object-contain hidden sm:inline-block"
            />
            <span className="font-mono text-[10px] text-cyan-400 bg-[#0E1424] border border-cyan-500/30 px-1.5 py-0.5 rounded-md uppercase font-bold hidden md:inline-block ml-1">
              Admin OS
            </span>
          </Link>
        </div>

        {/* User Role Switcher & Live Site Link */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-[#0E1424] border border-slate-800 px-2 sm:px-2.5 py-1 rounded-md">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={role}
              onChange={(e) => handleRoleSwitch(e.target.value)}
              className="bg-transparent text-[11px] font-mono text-cyan-300 focus:outline-none cursor-pointer"
            >
              <option value="Super Admin" className="bg-[#0E1424]">Super Admin</option>
              <option value="Admin" className="bg-[#0E1424]">Admin</option>
              <option value="Content Manager" className="bg-[#0E1424]">Content Manager</option>
              <option value="Sales" className="bg-[#0E1424]">Sales (CRM)</option>
              <option value="Developer" className="bg-[#0E1424]">Developer</option>
            </select>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-md"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-14 left-0 z-20 w-64 bg-[#080B14] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-3 overflow-y-auto flex-1 space-y-1">
            <div className="px-3 py-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Modules
            </div>

            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-mono rounded-md transition-all ${
                    isActive
                      ? 'bg-[#141C33] text-cyan-400 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0E1424]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Account Strip */}
          <div className="p-3 border-t border-slate-800 bg-[#06080F]">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="truncate">
                <span className="text-white font-bold block truncate">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-slate-500 truncate block">{user?.email || 'admin@buildzone.tech'}</span>
              </div>
              <span className="px-1.5 py-0.5 bg-[#0E1424] border border-cyan-500/30 text-cyan-400 text-[9px] rounded-md uppercase font-bold">
                {role}
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#06080F]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
