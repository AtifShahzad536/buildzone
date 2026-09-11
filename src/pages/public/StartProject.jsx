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
  Rocket,
  Send,
  Users,
  Award
} from 'lucide-react';
import { useCreateLeadMutation } from '../../services/api';
import { wizardSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';
import TubesCursorBg from '../../components/common/TubesCursorBg';

// Compact Services List
const servicesList = [
  { id: 'Web Application', title: 'Web Apps & Portals', icon: Globe, tech: 'React • Next.js' },
  { id: 'Mobile App (iOS/Android)', title: 'Mobile Apps (iOS & Android)', icon: Smartphone, tech: 'Flutter • React Native' },
  { id: 'AI & Intelligent Automation', title: 'AI & LLM Systems', icon: Bot, tech: 'OpenAI • Custom ML' },
  { id: 'Custom Enterprise Software', title: 'Enterprise ERP & Workflows', icon: Server, tech: 'Custom ERP • Backend' },
  { id: 'SaaS Product Architecture', title: 'SaaS Multi-Tenant', icon: Layers, tech: 'Billing • Subscriptions' },
  { id: 'E-Commerce & Payment Engine', title: 'E-Commerce Engines', icon: ShoppingCart, tech: 'High-Conversion Store' },
  { id: 'UI/UX & Product Design', title: 'UI/UX Design System', icon: Palette, tech: 'Figma • Prototypes' },
  { id: 'Cloud Infrastructure & DevOps', title: 'Cloud DevOps & Security', icon: Cloud, tech: 'AWS • Docker • CI/CD' }
];

// Realistic Budget Tiers
const budgetTiers = [
  { id: '$500 - $1,500', label: '$500 - $1,500', title: 'Starter MVP', desc: 'Core features & fast 2-4 weeks launch' },
  { id: '$1,500 - $3,500', label: '$1,500 - $3,500', title: 'Growth & Pro', desc: 'Full-stack web/mobile app & custom APIs', featured: true },
  { id: '$3,500 - $8,000', label: '$3,500 - $8,000', title: 'Enterprise & AI', desc: 'Custom ERP, AI pipelines & multi-tenant' },
  { id: '$8,000+ (Enterprise Tier)', label: '$8,000+', title: 'Dedicated Pod', desc: 'Dedicated team & ongoing engineering' }
];

// Timeline Options
const timelineOptions = [
  { id: 'Under 1 Month (Urgent)', title: '⚡ Urgent Sprint (< 1 Month)', desc: 'Expedited fast delivery' },
  { id: '1 - 3 Months', title: '🚀 Standard MVP (1 - 3 Months)', desc: 'Recommended optimal delivery', recommended: true },
  { id: '3 - 6 Months', title: '🏢 Enterprise Build (3 - 6 Months)', desc: 'Phased milestones & full scale' },
  { id: 'Ongoing Dedicated Pod', title: '♾️ Dedicated Pod', desc: 'Continuous monthly retainer' }
];

// Quick Feature Chips
const quickFeatures = [
  'User Auth & 2FA',
  'AI / LLM Bot',
  'Stripe / PayPal Gateway',
  'Admin Analytics',
  'Real-Time Chat',
  'Multi-tenant SaaS',
  'Mobile App Sync',
  'REST & GraphQL APIs',
  'Export / ERP Workflow',
  'Cloud CI/CD Deploy'
];

const wizardSteps = [
  { num: 1, title: 'Service' },
  { num: 2, title: 'Budget' },
  { num: 3, title: 'Timeline' },
  { num: 4, title: 'Scope' },
  { num: 5, title: 'Contact' },
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
      budget: '$1,500 - $3,500',
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

    if (!selectedChips.includes(chip)) {
      const current = projectDetailsText;
      const addition = current ? `\n• Feature: ${chip}` : `• Feature: ${chip}`;
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
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
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
      toast.success("Project Scope Submitted Successfully!");
    } catch (err) {
      toast.error("Failed to submit project scope.");
    }
  };

  return (
    <>
      <SEOHead
        title="Start Your Project | BuildZone Technology #1 Software House"
        description="Interactive scope onboarding for custom enterprise software, mobile apps, SaaS, and AI systems. Get architect-reviewed feasibility in 24 hours."
      />

      {/* Zero-Scroll / Compact Viewport Layout */}
      <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center py-6 sm:py-8 overflow-hidden bg-[#F8FAFC]">
        {/* 3D Interactive Tubes Canvas */}
        <TubesCursorBg />

        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none z-[1]"></div>

        <Container className="max-w-5xl relative z-10 pointer-events-auto my-auto">
          
          {/* Compact Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </span>
              <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[#0B1938] leading-none">
                Start Your Project
              </h1>
              <span className="hidden sm:inline font-mono text-[11px] text-slate-500 font-medium">
                • 2-Min Architecture Scope
              </span>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600">
              <span className="bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#0066FF]" /> 100% NDA
              </span>
              <span className="bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" /> 24h Feasibility
              </span>
            </div>
          </div>

          {/* Main Integrated Compact Card */}
          <div className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Top Stepper Ribbon */}
            {!isCompleted && (
              <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
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
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#0066FF] text-white shadow-xs'
                            : isPassed
                            ? 'bg-emerald-100 text-emerald-800 cursor-pointer hover:bg-emerald-200'
                            : 'text-slate-400 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isActive ? 'bg-white text-[#0066FF]' : isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isPassed ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : s.num}
                        </span>
                        <span>{s.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Compact Live Indicator */}
                <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-500">
                  <span>Step {step} of 5</span>
                  <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0066FF] transition-all duration-300"
                      style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Content Area */}
            <div className="p-5 sm:p-7">
              {isCompleted ? (
                /* Success View */
                <div className="text-center py-6 space-y-4 max-w-md mx-auto animate-fade-in-up">
                  <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                    <CheckCheck className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                      Scope Successfully Received
                    </span>
                    <h2 className="text-2xl font-black font-display uppercase text-[#0B1938]">
                      Roadmap Initiated!
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our Lead Solutions Architect is preparing your technical blueprint and estimate within 24 hours.
                    </p>
                  </div>

                  <div className="flex gap-2 justify-center pt-2">
                    <Button variant="primary" size="sm" onClick={() => window.location.href = '/'}>
                      Return Home
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open('https://wa.me/92105464116', '_blank')}>
                      WhatsApp Chat
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  
                  {/* STEP 1: SERVICE (Compact 4x2 Grid) */}
                  {step === 1 && (
                    <div key="step-1" className="space-y-4 animate-fade-in-up">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display font-bold text-base sm:text-lg text-[#0B1938]">
                          1. Select what you are building:
                        </h2>
                        <span className="font-mono text-[11px] text-slate-400">Multiple selection enabled</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {servicesList.map((srv) => {
                          const isSelected = selectedServices.includes(srv.id);
                          const IconComp = srv.icon;

                          return (
                            <div
                              key={srv.id}
                              onClick={() => handleToggleService(srv.id)}
                              className={`p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-blue-50/90 border-[#0066FF] shadow-sm text-[#0B1938]'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  isSelected ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                  isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-display font-bold text-xs sm:text-sm leading-tight mb-1">
                                  {srv.title}
                                </h3>
                                <span className="font-mono text-[10px] text-blue-600/80 block">
                                  {srv.tech}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BUDGET (Compact 4 Cards + Input) */}
                  {step === 2 && (
                    <div key="step-2" className="space-y-4 animate-fade-in-up">
                      <div className="flex items-center justify-between">
                        <h2 className="font-display font-bold text-base sm:text-lg text-[#0B1938]">
                          2. Select your target investment budget:
                        </h2>
                        <span className="font-mono text-[11px] text-slate-400">USD estimate</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {budgetTiers.map((tier) => {
                          const isSelected = selectedBudget === tier.id;

                          return (
                            <div
                              key={tier.id}
                              onClick={() => setValue('budget', tier.id, { shouldValidate: true })}
                              className={`p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-blue-50/90 border-[#0066FF] shadow-sm'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-mono font-bold text-xs sm:text-sm text-[#0B1938]">
                                    {tier.label}
                                  </span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0066FF] stroke-[3]" />}
                                </div>
                                <h3 className="font-display font-bold text-xs text-[#0066FF] uppercase">
                                  {tier.title}
                                </h3>
                                <p className="text-[11px] text-slate-500 font-sans mt-1 leading-snug">
                                  {tier.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Custom Input */}
                      <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="font-mono text-xs font-bold text-slate-600 shrink-0">
                          Custom Budget:
                        </span>
                        <div className="relative flex-1">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            placeholder="e.g. $800, $2,000, or $5,000"
                            value={selectedBudget}
                            onChange={(e) => setValue('budget', e.target.value, { shouldValidate: true })}
                            className="w-full bg-white border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-[#0B1938] font-mono font-bold placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: TIMELINE (Compact 4 Options) */}
                  {step === 3 && (
                    <div key="step-3" className="space-y-4 animate-fade-in-up">
                      <h2 className="font-display font-bold text-base sm:text-lg text-[#0B1938]">
                        3. Target delivery timeline:
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {timelineOptions.map((opt) => {
                          const isSelected = selectedTimeline === opt.id;

                          return (
                            <div
                              key={opt.id}
                              onClick={() => setValue('timeline', opt.id, { shouldValidate: true })}
                              className={`p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none flex items-center justify-between ${
                                isSelected
                                  ? 'bg-blue-50/90 border-[#0066FF] shadow-sm'
                                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <h3 className="font-display font-bold text-xs sm:text-sm text-[#0B1938]">
                                  {opt.title}
                                </h3>
                                <p className="text-[11px] text-slate-500 font-sans">
                                  {opt.desc}
                                </p>
                              </div>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                                isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SCOPE & QUICK TAGS */}
                  {step === 4 && (
                    <div key="step-4" className="space-y-3.5 animate-fade-in-up">
                      <div>
                        <h2 className="font-display font-bold text-base sm:text-lg text-[#0B1938]">
                          4. Requirements & Features:
                        </h2>
                        <p className="text-xs text-slate-500">
                          Click quick-tags below or describe your product scope:
                        </p>
                      </div>

                      {/* Quick Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {quickFeatures.map((chip) => {
                          const isChecked = selectedChips.includes(chip);

                          return (
                            <button
                              type="button"
                              key={chip}
                              onClick={() => handleToggleChip(chip)}
                              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-[#0066FF] text-white shadow-2xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                              }`}
                            >
                              {isChecked ? '✓ ' : '+ '}
                              {chip}
                            </button>
                          );
                        })}
                      </div>

                      <div>
                        <textarea
                          rows={3}
                          placeholder="Describe your product purpose, users, third-party APIs needed (e.g. Stripe, OpenAI), or any details..."
                          {...register('projectDetails')}
                          className="w-full bg-[#F8FAFC] border border-slate-300 p-3 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-xl font-sans leading-relaxed"
                        />
                        {errors.projectDetails && (
                          <p className="font-mono text-[11px] text-rose-600 font-semibold mt-1">
                            {errors.projectDetails.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: CONTACT */}
                  {step === 5 && (
                    <div key="step-5" className="space-y-3.5 animate-fade-in-up">
                      <div>
                        <h2 className="font-display font-bold text-base sm:text-lg text-[#0B1938]">
                          5. Where should we send your technical roadmap?
                        </h2>
                        <p className="text-xs text-slate-500">
                          We will formulate an architect-reviewed proposal and estimate.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              placeholder="e.g. Alex Henderson"
                              {...register('name')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg"
                            />
                          </div>
                          {errors.name && (
                            <p className="font-mono text-[10px] text-rose-600 font-semibold mt-0.5">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Work Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="email"
                              placeholder="alex@company.com"
                              {...register('email')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg"
                            />
                          </div>
                          {errors.email && (
                            <p className="font-mono text-[10px] text-rose-600 font-semibold mt-0.5">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Company Name (Optional)
                          </label>
                          <div className="relative">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              placeholder="Company Inc."
                              {...register('company')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 font-bold mb-1">
                            Phone / WhatsApp (Optional)
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="tel"
                              placeholder="+92 300 0000000"
                              {...register('phone')}
                              className="w-full bg-[#F8FAFC] border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation Buttons Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 mt-4">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={prevStep}
                        leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                        className="cursor-pointer"
                      >
                        Back
                      </Button>
                    ) : <div />}

                    <div className="flex items-center gap-2">
                      {step < 5 ? (
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={nextStep}
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                          className="shadow-sm cursor-pointer"
                        >
                          Next Step →
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          isLoading={isLoading}
                          rightIcon={<Send className="w-4 h-4" />}
                          className="shadow-md cursor-pointer"
                        >
                          Submit Project Scope
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Compact Summary Strip */}
            {!isCompleted && (
              <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-600">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400">Selected:</span>
                  <span className="font-bold text-[#0066FF]">{selectedServices.join(', ')}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Budget:</span>
                  <span className="font-bold text-[#0B1938]">{selectedBudget}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Timeline:</span>
                  <span className="font-bold text-[#0B1938]">{selectedTimeline}</span>
                </div>
                <a
                  href="https://wa.me/92105464116"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0066FF] font-bold hover:underline"
                >
                  WhatsApp Direct →
                </a>
              </div>
            )}

          </div>
        </Container>
      </div>
    </>
  );
};

export default StartProject;
