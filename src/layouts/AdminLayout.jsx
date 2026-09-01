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
    <div className="h-screen overflow-hidden bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-1.5 text-slate-600 hover:text-[#0066FF] transition-colors"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="BuildZone Admin Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            <img
              src="/LOGO%20TEXT.png"
              alt="BuildZone Admin Text"
              className="h-5 sm:h-6 max-w-[130px] w-auto object-contain shrink-0"
            />
            <span className="font-mono text-[10px] text-[#0066FF] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase font-bold hidden md:inline-block ml-1">
              Admin Portal
            </span>
          </Link>
        </div>

        {/* User Role Switcher & Live Site Link */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 sm:px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-[#0066FF]" />
            <select
              value={role}
              onChange={(e) => handleRoleSwitch(e.target.value)}
              className="bg-transparent text-[11px] font-mono text-slate-700 font-bold focus:outline-none cursor-pointer"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Content Manager">Content Manager</option>
              <option value="Sales">Sales (CRM)</option>
              <option value="Developer">Developer</option>
            </select>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-slate-600 hover:text-[#0066FF] transition-colors font-medium"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors rounded-lg cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Sidebar Navigation */}
        <aside
          className={`fixed inset-y-16 left-0 z-20 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 lg:static lg:h-full shrink-0 shadow-2xs ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-3 overflow-y-auto flex-1 space-y-1">
            <div className="px-3 py-2 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Management Modules
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
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#0066FF] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-[#0066FF] hover:bg-blue-50/70 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#0066FF]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Account Strip */}
          <div className="p-3.5 border-t border-slate-200 bg-[#F8FAFC] shrink-0">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="truncate">
                <span className="text-[#0B1938] font-bold block truncate">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-slate-500 truncate block">{user?.email || 'admin@buildzone.tech'}</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-[#0066FF] text-[9px] rounded-full uppercase font-bold shrink-0">
                {role}
              </span>
            </div>
          </div>
        </aside>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
