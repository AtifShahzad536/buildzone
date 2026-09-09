import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Server, 
  Layers, 
  ShoppingCart, 
  Palette, 
  Cloud, 
  Shield, 
  Zap, 
  Sparkles, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Check, 
  CheckCheck,
  Lock,
  Flame,
  Rocket,
  Code2,
  Users,
  Award,
  Send,
  HelpCircle,
  CheckSquare,
  Compass,
  Cpu
} from 'lucide-react';
import { useCreateLeadMutation } from '../../services/api';
import { wizardSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';
import TubesCursorBg from '../../components/common/TubesCursorBg';

// 8 Main Services with rich metadata
const servicesList = [
  {
    id: 'Web Application',
    title: 'Web Apps & Cloud Portals',
    desc: 'High-performance React 19, Next.js 15, and distributed cloud microservices.',
    icon: Globe,
    badge: 'Popular',
    tech: 'React • Next.js • Node'
  },
  {
    id: 'Mobile App (iOS/Android)',
    title: 'Mobile Apps (iOS & Android)',
    desc: 'Ultra-fast cross-platform Flutter and React Native mobile experiences.',
    icon: Smartphone,
    badge: 'High Demand',
    tech: 'Flutter • Swift • Kotlin'
  },
  {
    id: 'AI & Intelligent Automation',
    title: 'AI & Agentic Systems',
    desc: 'Custom LLMs, vector database RAG, autonomous agents & predictive ML.',
    icon: Bot,
    badge: 'Cutting-Edge',
    tech: 'OpenAI • LangChain • PyTorch'
  },
  {
    id: 'Custom Enterprise Software',
    title: 'Enterprise ERP & Workflows',
    desc: 'Bespoke manufacturing, export operations, inventory & logistics ERPs.',
    icon: Server,
    badge: 'Enterprise',
    tech: 'Microservices • PostgreSQL'
  },
  {
    id: 'SaaS Product Architecture',
    title: 'SaaS Multi-Tenant Platforms',
    desc: 'Scalable subscription billing, role permissions, analytics & API gateway.',
    icon: Layers,
    badge: 'Scalable',
    tech: 'Stripe • Multi-tenant • Auth'
  },
  {
    id: 'E-Commerce & Payment Engine',
    title: 'E-Commerce Engines',
    desc: 'High-conversion headless checkout, multi-currency & high-traffic resilience.',
    icon: ShoppingCart,
    badge: 'High ROI',
    tech: 'Custom Cart • Global Gateways'
  },
  {
    id: 'UI/UX & Product Design',
    title: 'UI/UX Design Systems',
    desc: 'World-class interactive Figma prototypes, motion design & user flows.',
    icon: Palette,
    badge: 'Design',
    tech: 'Figma • Design Tokens • Motion'
  },
  {
    id: 'Cloud Infrastructure & DevOps',
    title: 'Cloud DevOps & Security',
    desc: 'AWS, GCP, Kubernetes orchestration, CI/CD automation & 99.99% uptime.',
    icon: Cloud,
    badge: 'Infrastructure',
    tech: 'AWS • Docker • K8s • CI/CD'
  }
];

// Budget Tiers with expected scope deliverables
const budgetTiers = [
  {
    id: '$10k - $25k',
    label: '$10,000 - $25,000',
    title: 'Starter MVP Sprint',
    desc: 'Core feature validation, modern design system, rapid 4-6 week market launch.',
    tag: 'Fast-Track',
    icon: Zap,
    color: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: '$25k - $50k',
    label: '$25,000 - $50,000',
    title: 'Growth & Scaling Build',
    desc: 'Production-ready full stack, automated testing, security compliance & scalability.',
    tag: 'Most Popular',
    featured: true,
    icon: Rocket,
    color: 'border-blue-500'
  },
  {
    id: '$50k - $100k',
    label: '$50,000 - $100,000',
    title: 'Enterprise Architecture',
    desc: 'Complex multi-tier microservices, AI workflows, ERP synchronization & high SLA.',
    tag: 'Enterprise',
    icon: Building2,
    color: 'border-indigo-200 hover:border-indigo-400'
  },
  {
    id: '$100k+ (Enterprise Tier)',
    label: '$100,000+',
    title: 'Mission Critical & Retainer',
    desc: 'Dedicated dedicated engineering pod, custom proprietary IP & 24/7 priority support.',
    tag: 'Dedicated Pod',
    icon: Award,
    color: 'border-purple-200 hover:border-purple-400'
  }
];

// Timeline Options
const timelineOptions = [
  {
    id: 'Under 1 Month (Urgent)',
    title: '⚡ Urgent Sprint (< 1 Month)',
    desc: 'High-intensity dedicated sprint for immediate go-to-market deadlines.'
  },
  {
    id: '1 - 3 Months',
    title: '🚀 Standard MVP (1 - 3 Months)',
    desc: 'Industry benchmark for solid architecture, iterative sprints, and thorough QA.',
    recommended: true
  },
  {
    id: '3 - 6 Months',
    title: '🏢 Enterprise Rollout (3 - 6 Months)',
    desc: 'Comprehensive multi-module development with phased beta milestones.'
  },
  {
    id: 'Ongoing Dedicated Pod',
    title: '♾️ Dedicated Engineering Pod',
    desc: 'Continuous monthly feature engineering, staff augmentation & DevOps maintenance.'
  }
];

// Quick Feature Tags grouped by capability
const quickFeatures = [
  { name: 'User Authentication & 2FA', cat: 'Security' },
  { name: 'AI / LLM Integration (OpenAI)', cat: 'AI' },
  { name: 'Stripe / PayPal Payment Gateway', cat: 'Payments' },
  { name: 'Admin Analytics Dashboard', cat: 'Admin' },
  { name: 'Real-Time WebSockets / Chat', cat: 'Real-Time' },
  { name: 'Multi-tenant SaaS Architecture', cat: 'Architecture' },
  { name: 'Mobile App Sync (iOS & Android)', cat: 'Mobile' },
  { name: 'REST & GraphQL API Endpoints', cat: 'APIs' },
  { name: 'Export / Manufacturing ERP', cat: 'Enterprise' },
  { name: 'Automated CI/CD & Cloud Deploy', cat: 'DevOps' },
  { name: 'Multi-lingual Localization', cat: 'Global' },
  { name: 'Search Engine SEO & Meta Engine', cat: 'SEO' }
];

const wizardSteps = [
  { num: 1, key: 'services', title: '01. Architecture', subtitle: 'Product Selection' },
  { num: 2, key: 'budget', title: '02. Investment', subtitle: 'Target Budget' },
  { num: 3, key: 'timeline', title: '03. Velocity', subtitle: 'Target Timeline' },
  { num: 4, key: 'projectDetails', title: '04. Specifications', subtitle: 'Technical Scope' },
  { num: 5, key: 'contact', title: '05. Delivery', subtitle: 'Proposal Recipient' },
];

export const StartProject = () => {
  const [step, setStep] = useState(1);
  const [createLead, { isLoading }] = useCreateLeadMutation();
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      services: ['Web Application'],
      budget: '$25k - $50k',
      timeline: '1 - 3 Months',
      name: '',
      email: '',
      company: '',
      phone: '',
      projectDetails: '',
    }
  });

  const selectedServices = watch('services') || [];
  const selectedBudget = watch('budget');
  const selectedTimeline = watch('timeline');
  const projectDetailsText = watch('projectDetails') || '';

  const handleToggleService = (srvId) => {
    if (selectedServices.includes(srvId)) {
      if (selectedServices.length > 1) {
        setValue('services', selectedServices.filter(s => s !== srvId), { shouldValidate: true });
      }
    } else {
      setValue('services', [...selectedServices, srvId], { shouldValidate: true });
    }
  };

  const handleToggleChip = (chipName) => {
    let newChips;
    if (selectedChips.includes(chipName)) {
      newChips = selectedChips.filter(c => c !== chipName);
    } else {
      newChips = [...selectedChips, chipName];
    }
    setSelectedChips(newChips);

    // Auto append feature to description
    if (!selectedChips.includes(chipName)) {
      const current = projectDetailsText;
      const addition = current ? `\n• Required Capability: ${chipName}` : `• Required Capability: ${chipName}`;
      setValue('projectDetails', current + addition, { shouldValidate: true });
    }
  };

  const nextStep = async () => {
    let isValid = true;
    if (step === 1) isValid = await trigger('services');
    if (step === 2) isValid = await trigger('budget');
    if (step === 3) isValid = await trigger('timeline');
    if (step === 4) isValid = await trigger('projectDetails');

    if (isValid && step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data) => {
    try {
      await createLead({
        name: data.name,
        email: data.email,
        company: data.company || '',
        phone: data.phone || '',
        service: data.services.join(', '),
        budget: data.budget,
        timeline: data.timeline,
        projectDetails: data.projectDetails,
        message: data.projectDetails,
        source: 'Start Project Wizard',
      }).unwrap();

      setIsCompleted(true);
      toast.success("Project Roadmap Scheduled! Our Lead Architect will email your feasibility report within 24 hours.");
    } catch (err) {
      toast.error("Failed to submit project scope. Please try again or WhatsApp us directly.");
    }
  };

  return (
    <>
      <SEOHead
        title="Start Your Project | BuildZone Technology #1 Software House"
        description="Interactive scope onboarding for custom enterprise software, mobile apps, SaaS, and AI systems. Get architect-reviewed feasibility and quotation in 24 hours."
      />

      <div className="relative min-h-screen py-8 sm:py-14 overflow-hidden bg-[#F8FAFC]">
        {/* 3D Interactive Tubes Cursor Canvas */}
        <TubesCursorBg />

        {/* Ambient Decorative Lighting */}
        <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none z-[1]"></div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-blue-500/10 via-[#0066FF]/10 to-indigo-500/10 blur-[140px] pointer-events-none z-[1]"></div>

        {/* Wide Container Max-W-7xl */}
        <Container fluid={false} className="max-w-7xl relative z-10 pointer-events-auto">
          
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md border border-blue-200/90 rounded-full shadow-xs mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]"></span>
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                FAST-TRACK SCOPING & ARCHITECTURE ENGINE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-3">
              LET'S BUILD SOMETHING <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                EXTRAORDINARY.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
              Configure your technical requirements below. Our Principal Solutions Architects will formulate a high-fidelity roadmap, technology stack, and investment estimate within 24 hours.
            </p>

            {/* Trust Assurance Metric Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-5 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-medium">100% NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-medium">24h Architect Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-medium">Zero Obligation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-medium">#1 Software House in Sialkot</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          {!isCompleted && (
            <div className="w-full mb-8 animate-fade-in-up">
              <div className="bg-white/90 backdrop-blur-xl border border-white/80 p-3 sm:p-4 rounded-3xl shadow-xl">
                <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                  {wizardSteps.map((s) => {
                    const isActive = step === s.num;
                    const isPassed = step > s.num;

                    return (
                      <button
                        type="button"
                        key={s.num}
                        onClick={() => {
                          if (isPassed) setStep(s.num);
                        }}
                        disabled={!isPassed && !isActive}
                        className={`flex flex-col sm:flex-row items-center gap-2 p-2.5 sm:p-3 rounded-2xl transition-all text-left duration-300 ${
                          isActive
                            ? 'bg-blue-50/90 border border-blue-400/80 text-[#0066FF] shadow-xs ring-2 ring-blue-400/30'
                            : isPassed
                            ? 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 cursor-pointer'
                            : 'opacity-40 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono text-xs font-extrabold shrink-0 transition-all ${
                            isActive
                              ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30 animate-pulse-ring'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                        </div>
                        <div className="hidden sm:block overflow-hidden">
                          <p className="font-mono text-[11px] uppercase font-bold tracking-wider leading-none">
                            {s.title}
                          </p>
                          <p className="text-xs font-medium truncate mt-1 opacity-75">
                            {s.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Animated Progress Track */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0066FF] via-indigo-600 to-cyan-400 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Main Scoping Workspace */}
          {isCompleted ? (
            /* Success Screen */
            <div className="bg-white/95 backdrop-blur-2xl border border-white/80 p-8 sm:p-14 rounded-3xl shadow-2xl text-center space-y-6 max-w-2xl mx-auto animate-fade-in-up">
              <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCheck className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  SCOPE RECEIVED • ASSIGNED TO PRINCIPAL ARCHITECT
                </span>
                <h2 className="text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
                  PROJECT ROADMAP INITIATED!
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for detailing your project. Our engineering pod is already compiling your technical specifications, architecture diagram, and timeline estimate.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-2.5 font-mono text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Response Window:</span>
                  <span className="font-bold text-[#0B1938]">Within 24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Deliverable:</span>
                  <span className="font-bold text-[#0B1938]">Architecture Blueprint & Fixed Scope Quote</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Direct Support:</span>
                  <span className="font-bold text-[#0066FF]">+92 105464116 / info@buildzonetechnology.com</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button variant="primary" size="md" onClick={() => window.location.href = '/'}>
                  Return to Homepage
                </Button>
                <Button variant="outline" size="md" onClick={() => window.open('https://wa.me/92105464116', '_blank')}>
                  Instant WhatsApp Chat
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Form Workspace (8 Columns on Wide Screen) */}
              <div className="lg:col-span-8 bg-white/95 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 rounded-3xl shadow-2xl transition-all">
                <form onSubmit={handleSubmit(onSubmit)}>
                  
                  {/* STEP 1: ARCHITECTURE / PRODUCT SELECTION (Wide 4 Columns Grid) */}
                  {step === 1 && (
                    <div key="step-1" className="space-y-6 animate-fade-in-up">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                            Step 01 / 05 • Core Product Category
                          </span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            What type of product are you building?
                          </h2>
                        </div>
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                          Multi-select enabled
                        </span>
                      </div>

                      {/* Wide 4-column responsive cards grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                        {servicesList.map((srv) => {
                          const isSelected = selectedServices.includes(srv.id);
                          const IconComp = srv.icon;

                          return (
                            <div
                              key={srv.id}
                              onClick={() => handleToggleService(srv.id)}
                              className={`group p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between relative overflow-hidden ${
                                isSelected
                                  ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-lg shadow-blue-500/15 -translate-y-1'
                                  : 'bg-white/80 border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/60 hover:-translate-y-1'
                              }`}
                            >
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-[#0066FF] text-white shadow-md'
                                      : 'bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-[#0066FF]'
                                  }`}>
                                    <IconComp className="w-5 h-5" />
                                  </div>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                    isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 inline-block">
                                    {srv.badge}
                                  </span>
                                  <h3 className="font-display font-bold text-sm text-[#0B1938] leading-tight">
                                    {srv.title}
                                  </h3>
                                  <p className="text-[11px] text-slate-500 font-sans leading-snug pt-1 line-clamp-3">
                                    {srv.desc}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-3 mt-3 border-t border-slate-100">
                                <span className="font-mono text-[10px] text-blue-600/80 font-semibold block truncate">
                                  {srv.tech}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {errors.services && (
                        <p className="font-mono text-xs text-rose-600 font-semibold">{errors.services.message}</p>
                      )}
                    </div>
                  )}

                  {/* STEP 2: BUDGET & INVESTMENT TIERS (Wide 4 Columns Grid) */}
                  {step === 2 && (
                    <div key="step-2" className="space-y-6 animate-fade-in-up">
                      <div className="border-b border-slate-100 pb-4">
                        <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                          Step 02 / 05 • Investment Sizing
                        </span>
                        <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                          What is your target investment tier?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                          Select an investment range or specify a custom allocation for architecture scoping.
                        </p>
                      </div>

                      {/* Wide 4-column budget cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                        {budgetTiers.map((tier) => {
                          const isSelected = selectedBudget === tier.id;
                          const TierIcon = tier.icon;

                          return (
                            <div
                              key={tier.id}
                              onClick={() => setValue('budget', tier.id, { shouldValidate: true })}
                              className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between relative overflow-hidden ${
                                isSelected
                                  ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-lg shadow-blue-500/15 -translate-y-1'
                                  : 'bg-white/80 border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/60 hover:-translate-y-1'
                              }`}
                            >
                              {tier.featured && (
                                <div className="absolute top-0 right-0 bg-[#0066FF] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                  Most Popular
                                </div>
                              )}

                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                    isSelected ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    <TierIcon className="w-4 h-4" />
                                  </div>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                    isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                </div>

                                <span className="font-mono text-base font-extrabold text-[#0B1938] block">
                                  {tier.label}
                                </span>
                                <h4 className="font-display font-bold text-xs text-[#0066FF] uppercase tracking-wider mt-0.5">
                                  {tier.title}
                                </h4>
                                <p className="text-xs text-slate-500 font-sans leading-snug mt-2">
                                  {tier.desc}
                                </p>
                              </div>

                              <div className="pt-3 mt-3 border-t border-slate-100">
                                <span className="font-mono text-[10px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-md">
                                  {tier.tag}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Custom Budget Precision Box */}
                      <div className="p-4 bg-slate-50/90 border border-slate-200/90 rounded-2xl space-y-2">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                          Or Type Custom Target Budget (USD):
                        </label>
                        <div className="relative">
                          <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            placeholder="e.g. $15,000 or $35,000"
                            value={selectedBudget}
                            onChange={(e) => setValue('budget', e.target.value, { shouldValidate: true })}
                            className="w-full bg-white border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-[#0B1938] font-mono font-bold placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                          />
                        </div>
                        {errors.budget && (
                          <p className="font-mono text-xs text-rose-600 font-semibold">{errors.budget.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: TIMELINE & VELOCITY */}
                  {step === 3 && (
                    <div key="step-3" className="space-y-6 animate-fade-in-up">
                      <div className="border-b border-slate-100 pb-4">
                        <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                          Step 03 / 05 • Release Velocity
                        </span>
                        <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                          When do you need the production build live?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                          Choose the sprint velocity that aligns with your market launch schedule.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {timelineOptions.map((opt) => {
                          const isSelected = selectedTimeline === opt.id;

                          return (
                            <div
                              key={opt.id}
                              onClick={() => setValue('timeline', opt.id, { shouldValidate: true })}
                              className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer select-none flex items-center justify-between ${
                                isSelected
                                  ? 'bg-gradient-to-r from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-lg shadow-blue-500/15 -translate-y-1'
                                  : 'bg-white/80 border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/60 hover:-translate-y-1'
                              }`}
                            >
                              <div className="space-y-1 pr-3">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-display font-bold text-sm sm:text-base text-[#0B1938]">
                                    {opt.title}
                                  </h3>
                                  {opt.recommended && (
                                    <span className="font-mono text-[9px] uppercase font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                      Optimal
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 font-sans">
                                  {opt.desc}
                                </p>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-all ${
                                isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {errors.timeline && (
                        <p className="font-mono text-xs text-rose-600 font-semibold">{errors.timeline.message}</p>
                      )}
                    </div>
                  )}

                  {/* STEP 4: TECHNICAL SPECIFICATIONS & FEATURE CHIPS */}
                  {step === 4 && (
                    <div key="step-4" className="space-y-6 animate-fade-in-up">
                      <div className="border-b border-slate-100 pb-4">
                        <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                          Step 04 / 05 • Technical Scope & Capabilities
                        </span>
                        <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                          Detail your requirements & feature list
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                          Click any feature chip to quick-append, or outline custom workflows, APIs, and competitors below.
                        </p>
                      </div>

                      {/* Interactive Feature Chips Grid */}
                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold mb-2.5">
                          ⚡ Click To Quick-Add Desired Capabilities:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {quickFeatures.map((chip) => {
                            const isChecked = selectedChips.includes(chip.name);

                            return (
                              <button
                                type="button"
                                key={chip.name}
                                onClick={() => handleToggleChip(chip.name)}
                                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                                  isChecked
                                    ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border border-slate-200/80 hover:border-slate-300'
                                }`}
                              >
                                {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-blue-500">+</span>}
                                <span>{chip.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Textarea */}
                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                          Technical Scope & Specifications *
                        </label>
                        <textarea
                          rows={6}
                          placeholder="Describe what your product accomplishes, target user personas, required 3rd party APIs (e.g. OpenAI, Stripe, Google Maps), or existing codebase status..."
                          {...register('projectDetails')}
                          className="w-full bg-[#F8FAFC] border border-slate-300 p-4 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-2xl font-sans leading-relaxed shadow-2xs transition-all"
                        />
                        {errors.projectDetails && (
                          <p className="font-mono text-xs text-rose-600 font-semibold mt-1">
                            {errors.projectDetails.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: PROPOSAL RECIPIENT & CONTACT */}
                  {step === 5 && (
                    <div key="step-5" className="space-y-6 animate-fade-in-up">
                      <div className="border-b border-slate-100 pb-4">
                        <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">
                          Step 05 / 05 • Proposal Delivery
                        </span>
                        <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                          Where should we send your technical roadmap?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                          A Lead Solution Architect will review your inputs and formulate a formal quote & deliverable schedule.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Your Full Name *
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              placeholder="e.g. Alex Henderson"
                              {...register('name')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                            />
                          </div>
                          {errors.name && (
                            <p className="font-mono text-xs text-rose-600 font-semibold mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Work Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="email"
                              placeholder="alex@company.com"
                              {...register('email')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                            />
                          </div>
                          {errors.email && (
                            <p className="font-mono text-xs text-rose-600 font-semibold mt-1">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Company / Organization
                          </label>
                          <div className="relative">
                            <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="text"
                              placeholder="e.g. Apex Global Corp"
                              {...register('company')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Phone / WhatsApp (Optional)
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              {...register('phone')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl shadow-2xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Assurance & SLA */}
                      <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#0066FF] shrink-0" />
                        <p className="text-xs text-slate-700 font-sans">
                          <strong className="text-[#0B1938]">Strict Confidentiality:</strong> All technical specifications and proprietary concepts are governed by our mutual NDA guarantee.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-8 border-t border-slate-200/80 mt-8">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={prevStep}
                        leftIcon={<ArrowLeft className="w-4 h-4" />}
                        className="shadow-xs cursor-pointer hover:bg-slate-100"
                      >
                        Previous Step
                      </Button>
                    ) : <div />}

                    {step < 5 ? (
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={nextStep}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        Continue to {wizardSteps[step]?.title}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isLoading={isLoading}
                        rightIcon={<Send className="w-4 h-4" />}
                        className="shadow-lg shadow-blue-500/30 cursor-pointer"
                      >
                        Request Architecture Proposal
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Sticky Blueprint Drawer (4 Columns) */}
              <div className="lg:col-span-4 sticky top-24 space-y-4 animate-fade-in-up">
                <div className="bg-white/95 backdrop-blur-2xl border border-white/80 p-6 rounded-3xl shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0066FF]" />
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1938]">
                        Live Scope Blueprint
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-time
                    </span>
                  </div>

                  {/* Selected Products */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                      Target Stack ({selectedServices.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedServices.map(s => (
                        <span key={s} className="font-mono text-[11px] font-semibold bg-blue-50 text-[#0066FF] px-2.5 py-1 rounded-lg border border-blue-200/80 animate-fade-in-up">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Investment & Timeline */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div className="p-2.5 bg-slate-50/80 rounded-xl">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Budget</span>
                      <span className="font-mono text-xs font-bold text-[#0B1938] truncate block mt-0.5">
                        {selectedBudget || 'Custom'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50/80 rounded-xl">
                      <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Velocity</span>
                      <span className="font-mono text-xs font-bold text-[#0B1938] truncate block mt-0.5">
                        {selectedTimeline || '1-3 Months'}
                      </span>
                    </div>
                  </div>

                  {/* Assigned Squad Preview */}
                  <div className="p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-navy text-white rounded-2xl space-y-2.5 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-blue-300">
                        Assigned Engineering Squad
                      </span>
                    </div>
                    <ul className="font-mono text-[11px] text-slate-300 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1x Principal Solutions Architect
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 2x Senior Full-Stack Engineers
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1x UI/UX Product Designer
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1x QA & DevOps Specialist
                      </li>
                    </ul>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="text-center pt-2 border-t border-slate-100">
                    <p className="text-[11px] text-slate-500 font-sans">
                      Need direct consultation before submitting?
                    </p>
                    <a
                      href="https://wa.me/92105464116"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline mt-1.5 font-mono"
                    >
                      ⚡ WhatsApp with Lead Architect →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default StartProject;
