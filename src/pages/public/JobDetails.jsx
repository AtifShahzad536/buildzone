import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  MapPin, 
  DollarSign, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  Send,
  Sparkles,
  Terminal 
} from 'lucide-react';
import { useGetCareerBySlugQuery, useSubmitApplicationMutation } from '../../services/api';
import { jobApplicationSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const JobDetails = () => {
  const { slug } = useParams();
  const { data: job, isLoading, isError, refetch } = useGetCareerBySlugQuery(slug);
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitApplicationMutation();
  const [isApplied, setIsApplied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(jobApplicationSchema),
  });

  if (isLoading) return <Loader text="Loading job specifications..." fullScreen />;
  if (isError || !job) return <ErrorState message="Job opening not found." onRetry={refetch} />;

  const onSubmit = async (data) => {
    try {
      await submitApplication({
        ...data,
        jobId: job.id,
        position: job.title,
      }).unwrap();

      setIsApplied(true);
      toast.success("Application Submitted Successfully!", {
        description: "Our hiring team will review your application and reach out if there's a strong fit.",
      });
      reset();
    } catch (e) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <>
      <SEOHead
        title={`${job.title} — Careers`}
        description={job.shortDescription}
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="mb-8">
            <Link
              to="/careers"
              className="font-mono text-xs text-slate-500 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Open Positions</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Job Spec */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <Badge variant="cyan" size="sm">
                  {job.department}
                </Badge>

                <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938]">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-600 pt-2 border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0066FF]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#0066FF]" />
                    <span>{job.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>{job.salaryRange}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                  What You'll Lead & Build
                </h3>
                <ul className="space-y-2.5">
                  {job.responsibilities?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                  Required Qualifications
                </h3>
                <ul className="space-y-2.5">
                  {job.requirements?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                  Perks & Compensation
                </h3>
                <ul className="space-y-2.5">
                  {job.benefits?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Application Form (Sticky) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-lg shadow-lg sticky top-24">
                {isApplied ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-full flex items-center justify-center text-[#0066FF] mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold font-display uppercase text-[#0B1938]">
                      Application Sent!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      We’ve received your credentials. Our recruiting team will review your background and respond promptly.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setIsApplied(false)} className="mt-4">
                      Submit Update
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="border-b border-slate-200 pb-3 mb-4">
                      <h3 className="font-display font-bold text-lg uppercase text-[#0B1938]">
                        Apply for this Role
                      </h3>
                      <p className="font-mono text-[11px] text-slate-500">Fast-track direct engineering review</p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jordan Sterling"
                        {...register('name')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                      />
                      {errors.name && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="jordan@dev.com"
                        {...register('email')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                      />
                      {errors.email && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                      />
                      {errors.phone && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Portfolio / GitHub / LinkedIn
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourhandle"
                        {...register('portfolio')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                      />
                      {errors.portfolio && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.portfolio.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Resume / CV Link *
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or LinkedIn"
                        {...register('resumeLink')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md"
                      />
                      {errors.resumeLink && <p className="font-mono text-[10px] text-rose-500 mt-1">{errors.resumeLink.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-700 mb-1 font-bold">
                        Why are you excited about BuildZone?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Highlight recent technical architectures you've built..."
                        {...register('coverLetter')}
                        className="w-full bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-xs text-[#0B1938] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] rounded-md font-sans"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Application
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default JobDetails;
