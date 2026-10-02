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
  X,
} from 'lucide-react';
import { logout, setRole } from '../features/auth/authSlice';
import { ADMIN_BASE_PATH, ADMIN_LOGIN_PATH } from '../config/adminConfig';

const adminNavItems = [
  { label: 'Overview', href: ADMIN_BASE_PATH, icon: LayoutDashboard, exact: true },
  { label: 'Leads & CRM', href: `${ADMIN_BASE_PATH}/leads`, icon: Users },
  { label: 'Projects', href: `${ADMIN_BASE_PATH}/projects`, icon: Briefcase },
  { label: 'Services', href: `${ADMIN_BASE_PATH}/services`, icon: Layers },
  { label: 'Industries', href: `${ADMIN_BASE_PATH}/industries`, icon: Building2 },
  { label: 'Case Studies', href: `${ADMIN_BASE_PATH}/case-studies`, icon: BookOpen },
  { label: 'Team Members', href: `${ADMIN_BASE_PATH}/team`, icon: UserCheck },
  { label: 'Testimonials', href: `${ADMIN_BASE_PATH}/testimonials`, icon: Star },
  { label: 'Blog Articles', href: `${ADMIN_BASE_PATH}/blog`, icon: FileText },
  { label: 'Job Openings', href: `${ADMIN_BASE_PATH}/careers`, icon: FolderGit2 },
  { label: 'FAQs', href: `${ADMIN_BASE_PATH}/faqs`, icon: HelpCircle },
  { label: 'Tech Stack', href: `${ADMIN_BASE_PATH}/technologies`, icon: Cpu },
  { label: 'Media Library', href: `${ADMIN_BASE_PATH}/media`, icon: Image },
  { label: 'Site Settings', href: `${ADMIN_BASE_PATH}/settings`, icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, currentRole } = useSelector((state) => state.auth);

  const role = 'Admin';
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ADMIN_LOGIN_PATH);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#060B18] text-slate-100 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="h-16 shrink-0 bg-[#0B1528] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-[#00F0FF] transition-colors"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to={ADMIN_BASE_PATH} className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="BuildZone Admin Logo"
              className="h-8 w-auto object-contain shrink-0 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
            />
            <span className="font-display font-black text-base tracking-wider text-white hidden sm:inline-block">
              BUILDZONE <span className="text-[#00F0FF]">TECH</span>
            </span>
            <span className="font-mono text-[10px] text-[#00F0FF] bg-[#0066FF]/15 border border-[#00F0FF]/30 px-2 py-0.5 rounded-full uppercase font-bold hidden md:inline-block ml-1">
              Admin Portal
            </span>
          </Link>
        </div>

        {/* User Role Badge & Live Site Link */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 bg-[#070E1C] border border-slate-800 px-2.5 py-1 rounded-lg">
            <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[11px] font-mono text-slate-200 font-bold tracking-wide">
              Admin
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-[#00F0FF] transition-colors font-medium"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors rounded-lg cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Fixed Sidebar Navigation */}
        <aside
          className={`fixed inset-y-16 left-0 z-20 w-64 bg-[#0B1528] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:static lg:h-full lg:translate-x-0 shrink-0 shadow-xl ${
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
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00F0FF] text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#00F0FF]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Account Strip */}
          <div className="p-3.5 border-t border-slate-800 bg-[#070E1C] shrink-0">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="truncate">
                <span className="text-white font-bold block truncate">{user?.name || 'Administrator'}</span>
                <span className="text-[10px] text-slate-400 truncate block">{user?.email || 'admin@buildzone.tech'}</span>
              </div>
              <span className="px-2 py-0.5 bg-[#0066FF]/20 border border-[#00F0FF]/30 text-[#00F0FF] text-[9px] rounded-full uppercase font-bold shrink-0">
                {role}
              </span>
            </div>
          </div>
        </aside>

        {/* Scrollable Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#060B18]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
