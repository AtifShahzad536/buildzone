import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Terminal, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { useCreateLeadMutation } from '../../services/api';
import { wizardSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

const servicesList = [
  'Web Application',
  'Mobile App (iOS/Android)',
  'AI & Intelligent Automation',
  'Custom Enterprise Software',
  'SaaS Product Architecture',
  'E-Commerce & Payment Engine',
  'UI/UX & Product Design',
  'Cloud Infrastructure & DevOps'
];

const budgetRanges = [
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+ (Enterprise Tier)'
];

const timelines = [
  'Under 1 Month (Urgent)',
  '1 - 3 Months',
  '3 - 6 Months',
  'Ongoing Dedicated Pod'
];

export const StartProject = () => {
  const [step, setStep] = useState(1);
  const [createLead, { isLoading }] = useCreateLeadMutation();
  const [isCompleted, setIsCompleted] = useState(false);

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
      budget: '',
      timeline: '1 - 3 Months',
      name: '',
      email: '',
      company: '',
      projectDetails: '',
    }
  });

  const selectedServices = watch('services') || [];
  const selectedBudget = watch('budget');
  const selectedTimeline = watch('timeline');

  const handleToggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setValue('services', selectedServices.filter(s => s !== srv));
      }
    } else {
      setValue('services', [...selectedServices, srv]);
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
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = async (data) => {
    try {
      await createLead({
        name: data.name,
        email: data.email,
        company: data.company || '',
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
        title="Start a Project — 5-Step Lead Scoping Wizard"
        description="Interactive scope onboarding for software engineering, mobile development, and applied AI systems."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                INTERACTIVE SCOPE WIZARD
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-3">
              START YOUR PROJECT
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Complete this 2-minute questionnaire to receive an architect-reviewed timeline and quote.
            </p>
          </div>

          {/* Wizard Progress Stepper */}
          {!isCompleted && (
            <div className="max-w-2xl mx-auto mb-10">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#0066FF] transition-all duration-300 z-0"
                  style={{ width: `${((step - 1) / 4) * 100}%` }}
                ></div>

                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold relative z-10 transition-all ${
                      i <= step
                        ? 'bg-[#0066FF] text-white ring-4 ring-blue-100 shadow-sm'
                        : 'bg-white text-slate-400 border border-slate-300'
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Container */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 p-6 sm:p-10 rounded-lg shadow-sm">
            {isCompleted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center text-[#0066FF] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display uppercase text-[#0B1938]">
                  Project Roadmap Scheduled!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  We've received your requirements and assigned a Principal Architect to prepare your feasibility report and estimate.
                </p>
                <div className="pt-4">
                  <Button variant="primary" size="md" onClick={() => window.location.href = '/'}>
                    Return to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Services */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                        Step 1: What type of product are you building?
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">Select one or more core technical requirements</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {servicesList.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <div
                            key={srv}
                            onClick={() => handleToggleService(srv)}
                            className={`p-4 border rounded-md cursor-pointer transition-all flex items-center justify-between select-none ${
                              isSelected
                                ? 'bg-blue-50 border-[#0066FF] text-[#0B1938] shadow-sm'
                                : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="font-display font-semibold text-xs sm:text-sm">{srv}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300 bg-white'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                        Step 2: What is your estimated investment budget?
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">Enter your custom target budget in USD or choose a preset</p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-700 font-bold">
                          Custom Investment Budget (USD) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. $15,000 or Enter Custom Amount"
                            value={selectedBudget}
                            onChange={(e) => setValue('budget', e.target.value, { shouldValidate: true })}
                            className="w-full bg-[#F8FAFC] border border-slate-300 px-4 py-3 text-sm sm:text-base text-[#0B1938] font-mono font-bold placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-lg shadow-2xs"
                          />
                        </div>
                        {errors.budget && <p className="font-mono text-xs text-rose-500">{errors.budget.message}</p>}
                      </div>

                      <div>
                        <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                          Or quick select a common budget range:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {['$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'].map((b) => {
                            const isSelected = selectedBudget === b;
                            return (
                              <button
                                type="button"
                                key={b}
                                onClick={() => setValue('budget', b, { shouldValidate: true })}
                                className={`p-3 border rounded-lg cursor-pointer transition-all text-center font-mono text-xs font-bold ${
                                  isSelected
                                    ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-2xs'
                                    : 'bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                {b}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Timeline */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                        Step 3: What is your target delivery timeline?
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">When do you need the MVP or production build live?</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {timelines.map((t) => {
                        const isSelected = selectedTimeline === t;
                        return (
                          <div
                            key={t}
                            onClick={() => setValue('timeline', t)}
                            className={`p-5 border rounded-md cursor-pointer transition-all flex items-center justify-between select-none ${
                              isSelected
                                ? 'bg-blue-50 border-[#0066FF] text-[#0B1938] shadow-sm'
                                : 'bg-[#F8FAFC] border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span className="font-mono font-bold text-xs sm:text-sm">{t}</span>
                            <div className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-[#0066FF] border-[#0066FF]' : 'border-slate-300 bg-white'}`}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                        Step 4: Describe your technical scope
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">Provide any context, competitors, APIs, or user personas</p>
                    </div>

                    <div>
                      <textarea
                        rows={5}
                        placeholder="Tell us what the product does, key features needed, or existing codebase status..."
                        {...register('projectDetails')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-4 py-3 text-xs sm:text-sm text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md font-sans leading-relaxed"
                      />
                      {errors.projectDetails && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.projectDetails.message}</p>}
                    </div>
                  </div>
                )}

                {/* Step 5: Contact Info */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                        Step 5: Where should we send the estimate?
                      </h3>
                      <p className="font-mono text-xs text-slate-500 mt-1">We'll review your scope and follow up with a proposal</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-slate-700 mb-1 font-bold">Your Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Alex Henderson"
                          {...register('name')}
                          className="w-full bg-[#F8FAFC] border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                        />
                        {errors.name && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase text-slate-700 mb-1 font-bold">Work Email *</label>
                        <input
                          type="email"
                          placeholder="alex@company.com"
                          {...register('email')}
                          className="w-full bg-[#F8FAFC] border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                        />
                        {errors.email && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase text-slate-700 mb-1 font-bold">Company Name</label>
                        <input
                          type="text"
                          placeholder="Company Inc."
                          {...register('company')}
                          className="w-full bg-[#F8FAFC] border border-slate-300 px-3.5 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-8">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={prevStep}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                  ) : <div></div>}

                  {step < 5 ? (
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={nextStep}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isLoading}
                      rightIcon={<Sparkles className="w-4 h-4" />}
                    >
                      Request Architecture Proposal
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default StartProject;
