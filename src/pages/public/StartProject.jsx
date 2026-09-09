import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Cpu, 
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
  ChevronRight,
  Send
} from 'lucide-react';
import { useCreateLeadMutation } from '../../services/api';
import { wizardSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';
import TubesCursorBg from '../../components/common/TubesCursorBg';

// Service catalog with rich icons, descriptions, and tags
const servicesList = [
  {
    id: 'Web Application',
    title: 'Web Application & Portal',
    desc: 'High-speed React, Next.js, and cloud backend architecture',
    icon: Globe,
    badge: 'Popular',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'Mobile App (iOS/Android)',
    title: 'Mobile App (iOS & Android)',
    desc: 'Native performance, cross-platform Flutter/React Native',
    icon: Smartphone,
    badge: 'Trending',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'AI & Intelligent Automation',
    title: 'AI & Custom LLM Systems',
    desc: 'Vector databases, RAG, automated agentic pipelines',
    icon: Bot,
    badge: 'Next-Gen',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'Custom Enterprise Software',
    title: 'Enterprise Software & ERP',
    desc: 'Tailored manufacturing, export, and operational workflow ERPs',
    icon: Server,
    badge: 'Enterprise',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'SaaS Product Architecture',
    title: 'SaaS Product Platform',
    desc: 'Multi-tenant architecture, subscription billing & RBAC',
    icon: Layers,
    badge: 'Scalable',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'E-Commerce & Payment Engine',
    title: 'E-Commerce & Payment Engine',
    desc: 'High-conversion headless store, global payment processing',
    icon: ShoppingCart,
    badge: 'High ROI',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'UI/UX & Product Design',
    title: 'UI/UX & Design System',
    desc: 'World-class interactive Figma prototypes and design tokens',
    icon: Palette,
    badge: 'Creative',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'Cloud Infrastructure & DevOps',
    title: 'Cloud & DevOps Engineering',
    desc: 'AWS, GCP, Docker, Kubernetes, CI/CD pipelines & 99.9% SLA',
    icon: Cloud,
    badge: 'DevOps',
    color: 'from-blue-600 to-cyan-600'
  }
];

// Budget options with deliverables and tier descriptions
const budgetTiers = [
  {
    id: '$10k - $25k',
    label: '$10,000 - $25,000',
    title: 'Starter MVP',
    desc: 'Rapid validation, essential core features & production launch in 4-6 weeks',
    tag: 'Fast Track'
  },
  {
    id: '$25k - $50k',
    label: '$25,000 - $50,000',
    title: 'Growth & Scale',
    desc: 'Full-stack production product, multi-platform sync, automated testing & security',
    tag: 'Recommended',
    featured: true
  },
  {
    id: '$50k - $100k',
    label: '$50,000 - $100,000',
    title: 'Enterprise Systems',
    desc: 'Complex custom architecture, AI pipelines, advanced microservices & integrations',
    tag: 'High Impact'
  },
  {
    id: '$100k+ (Enterprise Tier)',
    label: '$100,000+',
    title: 'Mission Critical Enterprise',
    desc: 'Dedicated dedicated engineering pod, custom IP, 24/7 SLA & massive scale',
    tag: 'Enterprise'
  }
];

// Timeline options
const timelineOptions = [
  {
    id: 'Under 1 Month (Urgent)',
    title: '⚡ Urgent Sprint (< 1 Month)',
    desc: 'Expedited development sprint with dedicated engineers'
  },
  {
    id: '1 - 3 Months',
    title: '🚀 Standard MVP (1 - 3 Months)',
    desc: 'Optimal timeline for comprehensive MVP and full QA rollout',
    recommended: true
  },
  {
    id: '3 - 6 Months',
    title: '🏢 Full Enterprise Build (3 - 6 Months)',
    desc: 'Multi-phase milestones, deep integrations & security audits'
  },
  {
    id: 'Ongoing Dedicated Pod',
    title: '♾️ Dedicated Engineering Pod (Ongoing)',
    desc: 'Retainer model with dedicated architects, developers & PM'
  }
];

// Quick feature chips to easily add to project scope
const quickFeatures = [
  'User Authentication & 2FA',
  'AI / LLM Integration',
  'Stripe / PayPal Gateway',
  'Admin Dashboard & Analytics',
  'Real-Time WebSockets',
  'Multi-tenant SaaS Architecture',
  'Mobile App Sync (iOS & Android)',
  'REST & GraphQL APIs',
  'Export / ERP Workflow',
  'Cloud Auto-scaling'
];

const wizardSteps = [
  { num: 1, key: 'services', title: 'Scope', subtitle: 'Product Type' },
  { num: 2, key: 'budget', title: 'Budget', subtitle: 'Investment' },
  { num: 3, key: 'timeline', title: 'Timeline', subtitle: 'Delivery' },
  { num: 4, key: 'projectDetails', title: 'Details', subtitle: 'Specifications' },
  { num: 5, key: 'contact', title: 'Contact', subtitle: 'Proposal Delivery' },
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

  const handleToggleChip = (chip) => {
    let newChips;
    if (selectedChips.includes(chip)) {
      newChips = selectedChips.filter(c => c !== chip);
    } else {
      newChips = [...selectedChips, chip];
    }
    setSelectedChips(newChips);

    // Auto-append selected features into projectDetails if not already present
    const current = projectDetailsText;
    if (!selectedChips.includes(chip)) {
      const addition = current ? `\n• Required Feature: ${chip}` : `• Required Feature: ${chip}`;
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
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
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
      toast.success("Project Scope Submitted Successfully! Our Solution Architect will reach out in 24 hours.");
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

      <div className="relative min-h-screen py-10 sm:py-16 overflow-hidden bg-[#F8FAFC]">
        {/* 3D Interactive Tubes Cursor Canvas */}
        <TubesCursorBg />

        {/* Ambient Decorative Grid & Radial Lighting */}
        <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none z-[1]"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-400/10 via-[#0066FF]/10 to-indigo-400/10 blur-[120px] pointer-events-none z-[1]"></div>

        <Container className="relative z-10 pointer-events-auto">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-md border border-blue-200/90 rounded-full shadow-xs mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                FAST-TRACK SCOPING & ARCHITECTURE ENGINE
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              LET'S BUILD SOMETHING <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                EXTRAORDINARY.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
              Complete this 2-minute interactive scope builder to receive an architect-reviewed technical blueprint, delivery timeline, and investment estimate within 24 hours.
            </p>

            {/* Trust Assurance Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-slate-200/70 font-mono text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>100% NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>24h Architect Review</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>Zero Obligation</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>#1 Software House in Sialkot</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Navigation Bar */}
          {!isCompleted && (
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 p-3 sm:p-4 rounded-2xl shadow-lg">
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
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
                        className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-xl transition-all text-left ${
                          isActive
                            ? 'bg-blue-50/90 border border-blue-300/80 text-[#0066FF] shadow-xs'
                            : isPassed
                            ? 'bg-slate-50/70 hover:bg-slate-100/80 text-slate-700 cursor-pointer'
                            : 'opacity-40 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all ${
                            isActive
                              ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4" /> : s.num}
                        </div>
                        <div className="hidden sm:block overflow-hidden">
                          <p className="font-mono text-[10px] uppercase font-bold tracking-wider leading-none">
                            {s.title}
                          </p>
                          <p className="text-xs font-medium truncate mt-0.5 opacity-80">
                            {s.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Smooth Animated Linear Bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0066FF] via-indigo-600 to-blue-400 transition-all duration-500 rounded-full"
                    style={{ width: `${((step) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Workspace (2 Columns Grid) */}
          <div className="max-w-5xl mx-auto">
            {isCompleted ? (
              /* Success Completion Screen */
              <div className="bg-white/95 backdrop-blur-2xl border border-white/80 p-8 sm:p-14 rounded-3xl shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCheck className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    SCOPE RECEIVED • ASSIGNED TO PRINCIPAL ARCHITECT
                  </span>
                  <h2 className="text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
                    PROJECT ROADMAP INITIATED!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for detailing your project. Our engineering team is already compiling your technical specifications, architecture diagram, and timeline estimate.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left space-y-2 font-mono text-xs text-slate-600">
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
                    <span className="font-bold text-[#0066FF]">+92 300 0000000 / info@buildzone.tech</span>
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
                
                {/* Left Wizard Body (8 Cols) */}
                <div className="lg:col-span-8 bg-white/95 backdrop-blur-2xl border border-white/80 p-6 sm:p-10 rounded-3xl shadow-2xl">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* STEP 1: PRODUCT TYPE SELECTION */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">Step 01 / 05</span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            What type of product are you building?
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            Select one or multiple technical areas you need engineered.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {servicesList.map((srv) => {
                            const isSelected = selectedServices.includes(srv.id);
                            const IconComponent = srv.icon;

                            return (
                              <div
                                key={srv.id}
                                onClick={() => handleToggleService(srv.id)}
                                className={`group p-4 sm:p-4.5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between relative overflow-hidden ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-md shadow-blue-500/10'
                                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-[#0066FF] text-white shadow-sm'
                                      : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#0066FF]'
                                  }`}>
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                      {srv.badge}
                                    </span>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                      isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-display font-bold text-sm text-[#0B1938]">
                                    {srv.title}
                                  </h3>
                                  <p className="text-xs text-slate-500 font-sans mt-1 leading-snug">
                                    {srv.desc}
                                  </p>
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

                    {/* STEP 2: BUDGET & INVESTMENT */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">Step 02 / 05</span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            What is your estimated investment tier?
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            Select a tier or specify a custom investment amount for precision sizing.
                          </p>
                        </div>

                        {/* Tier Selection Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {budgetTiers.map((tier) => {
                            const isSelected = selectedBudget === tier.id;

                            return (
                              <div
                                key={tier.id}
                                onClick={() => setValue('budget', tier.id, { shouldValidate: true })}
                                className={`group p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between relative overflow-hidden ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-md shadow-blue-500/10'
                                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                                }`}
                              >
                                {tier.featured && (
                                  <div className="absolute top-0 right-0 bg-[#0066FF] text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                    Most Popular
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-base font-extrabold text-[#0B1938]">
                                      {tier.label}
                                    </span>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                      isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                  </div>
                                  <h4 className="font-display font-bold text-sm text-[#0066FF] mb-1">
                                    {tier.title}
                                  </h4>
                                  <p className="text-xs text-slate-500 font-sans leading-snug">
                                    {tier.desc}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Custom Budget Input */}
                        <div className="p-4 bg-slate-50/90 border border-slate-200/90 rounded-2xl space-y-2">
                          <label className="block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                            Or Type Exact Budget (USD)
                          </label>
                          <div className="relative">
                            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                            <input
                              type="text"
                              placeholder="e.g. $18,500 or $35,000"
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

                    {/* STEP 3: TIMELINE SPEED */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">Step 03 / 05</span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            When do you need the product live?
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            Select your target release velocity.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3.5">
                          {timelineOptions.map((opt) => {
                            const isSelected = selectedTimeline === opt.id;

                            return (
                              <div
                                key={opt.id}
                                onClick={() => setValue('timeline', opt.id, { shouldValidate: true })}
                                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-blue-50/90 via-white to-blue-50/40 border-[#0066FF] shadow-md shadow-blue-500/10'
                                    : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                                }`}
                              >
                                <div className="space-y-1">
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

                    {/* STEP 4: SCOPE SPECIFICATIONS & FEATURE CHIPS */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">Step 04 / 05</span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            Describe your technical scope
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            Click feature tags below to quick-add, or type your custom architectural requirements.
                          </p>
                        </div>

                        {/* Quick Feature Chips */}
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-bold mb-2">
                            Quick-Add Core Capabilities:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {quickFeatures.map((chip) => {
                              const isChecked = selectedChips.includes(chip);

                              return (
                                <button
                                  type="button"
                                  key={chip}
                                  onClick={() => handleToggleChip(chip)}
                                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                                    isChecked
                                      ? 'bg-[#0066FF] text-white shadow-xs'
                                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                                  }`}
                                >
                                  {isChecked ? <Check className="w-3 h-3" /> : <span>+</span>}
                                  {chip}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Textarea */}
                        <div>
                          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                            Project Objectives & Specifications *
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Detail what your product should accomplish, primary user journeys, third-party integrations (e.g. Stripe, OpenAI), or current legacy codebase constraints..."
                            {...register('projectDetails')}
                            className="w-full bg-[#F8FAFC] border border-slate-300 p-4 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-2xl font-sans leading-relaxed shadow-2xs"
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
                      <div className="space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                          <span className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-wider">Step 05 / 05</span>
                          <h2 className="text-2xl font-black font-display uppercase tracking-tight text-[#0B1938] mt-1">
                            Where should we send your roadmap?
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1">
                            A Principal Solutions Architect will review your inputs and deliver a tailored proposal.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                              Full Name *
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

                        {/* Security Assurance Card */}
                        <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center gap-3">
                          <Shield className="w-5 h-5 text-[#0066FF] shrink-0" />
                          <p className="text-xs text-slate-700 font-sans">
                            <strong className="text-[#0B1938]">Strict Confidentiality:</strong> Your intellectual property and concept are covered under mutual non-disclosure obligations.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step Navigation Controls */}
                    <div className="flex items-center justify-between pt-8 border-t border-slate-200/80 mt-8">
                      {step > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="md"
                          onClick={prevStep}
                          leftIcon={<ArrowLeft className="w-4 h-4" />}
                          className="shadow-xs cursor-pointer"
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

                {/* Right Sticky Blueprint Drawer (4 Cols) */}
                <div className="lg:col-span-4 sticky top-24 space-y-4">
                  <div className="bg-white/95 backdrop-blur-2xl border border-white/80 p-6 rounded-3xl shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0066FF]" />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0B1938]">
                          Live Scope Blueprint
                        </h3>
                      </div>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    </div>

                    {/* Selected Stack */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                        Target Products ({selectedServices.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedServices.map(s => (
                          <span key={s} className="font-mono text-[11px] font-semibold bg-blue-50 text-[#0066FF] px-2.5 py-1 rounded-md border border-blue-200/80">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Target Budget & Timeline */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <div className="p-2.5 bg-slate-50/80 rounded-xl">
                        <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Investment</span>
                        <span className="font-mono text-xs font-bold text-[#0B1938] truncate block mt-0.5">
                          {selectedBudget || 'Pending'}
                        </span>
                      </div>
                      <div className="p-2.5 bg-slate-50/80 rounded-xl">
                        <span className="block font-mono text-[10px] text-slate-400 uppercase font-bold">Velocity</span>
                        <span className="font-mono text-xs font-bold text-[#0B1938] truncate block mt-0.5">
                          {selectedTimeline || 'Pending'}
                        </span>
                      </div>
                    </div>

                    {/* Assigned Squad Preview */}
                    <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-blue-300">
                          Assigned Engineering Squad
                        </span>
                      </div>
                      <ul className="font-mono text-[11px] text-slate-300 space-y-1">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" /> 1x Principal Solutions Architect
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" /> 2x Senior Full-Stack Engineers
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" /> 1x UI/UX Product Designer
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" /> 1x QA & DevOps Specialist
                        </li>
                      </ul>
                    </div>

                    {/* Direct Contact */}
                    <div className="text-center pt-1 border-t border-slate-100">
                      <p className="text-[11px] text-slate-500 font-sans">
                        Need immediate architecture advice?
                      </p>
                      <a
                        href="https://wa.me/92105464116"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:underline mt-1 font-mono"
                      >
                        ⚡ Chat with Lead Architect on WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default StartProject;
