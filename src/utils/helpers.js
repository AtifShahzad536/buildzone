import React from 'react';
import {
  Globe,
  Smartphone,
  Cpu,
  Bot,
  Layers,
  ShoppingBag,
  Palette,
  Cloud,
  Shield,
  Database,
  Code,
  Terminal,
  Building2,
  Activity,
  Truck,
  GraduationCap,
  Briefcase,
  Home,
  DollarSign,
  Zap,
  Server,
  Sparkles,
  CheckCircle2,
  Box,
  Wifi,
  Battery,
  Play,
  Star,
  FileText,
  LayoutGrid,
  CheckSquare,
  BarChart2,
  Settings,
  Search,
  Bell,
  User,
  TrendingUp,
  Check,
  X,
  Factory,
  Trophy,
  Plane,
  CloudLightning,
  Rocket,
  FileCode,
  Network,
  Eye,
  Workflow,
  Boxes,
  GitBranch
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  Bot,
  Layers,
  ShoppingBag,
  Palette,
  Cloud,
  Shield,
  Database,
  Code,
  Terminal,
  Building2,
  Activity,
  Truck,
  GraduationCap,
  Briefcase,
  Home,
  DollarSign,
  Zap,
  Server,
  Sparkles,
  CheckCircle2,
  Box,
  Wifi,
  Battery,
  Play,
  Star,
  FileText,
  LayoutGrid,
  CheckSquare,
  BarChart2,
  Settings,
  Search,
  Bell,
  User,
  TrendingUp,
  Check,
  X,
  Factory,
  Trophy,
  Plane,
  CloudLightning,
  Rocket,
  FileCode,
  Apple: Smartphone,
  Network,
  FileSearch: Search,
  Eye,
  Workflow,
  Boxes,
  GitBranch,
  Container: Box
};

export const renderIcon = (iconName, props = {}) => {
  const IconComponent = (iconName && iconMap[iconName]) || Code;
  return React.createElement(IconComponent, props);
};

export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};
