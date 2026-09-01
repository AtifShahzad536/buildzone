/**
 * Secure Admin Route Configuration
 * Obfuscated URL path prefix to prevent brute-force attacks and unauthorized portal discovery.
 */
export const ADMIN_BASE_PATH = '/bz-secure-portal-hq-99x';
export const ADMIN_LOGIN_PATH = `${ADMIN_BASE_PATH}/login`;

export const adminNavConfig = [
  { label: 'Overview', path: '', icon: 'LayoutDashboard', exact: true },
  { label: 'Leads & CRM', path: 'leads', icon: 'Users' },
  { label: 'Projects', path: 'projects', icon: 'Briefcase' },
  { label: 'Services', path: 'services', icon: 'Layers' },
  { label: 'Industries', path: 'industries', icon: 'Building2' },
  { label: 'Case Studies', path: 'case-studies', icon: 'BookOpen' },
  { label: 'Team Members', path: 'team', icon: 'UserCheck' },
  { label: 'Testimonials', path: 'testimonials', icon: 'Star' },
  { label: 'Blog Articles', path: 'blog', icon: 'FileText' },
  { label: 'Job Openings', path: 'careers', icon: 'FolderGit2' },
  { label: 'FAQs', path: 'faqs', icon: 'HelpCircle' },
  { label: 'Tech Stack', path: 'technologies', icon: 'Cpu' },
  { label: 'Media Library', path: 'media', icon: 'Image' },
  { label: 'Site Settings', path: 'settings', icon: 'Settings' },
];
