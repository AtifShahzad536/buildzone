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
import { initialCareers } from '../../data/careers';
import { jobApplicationSchema } from '../../utils/validation';
import Container from '../../components/common/Container';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const JobDetails = () => {
  const { slug } = useParams();
  const { data: apiJob, isLoading, isError, refetch } = useGetCareerBySlugQuery(slug);
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitApplicationMutation();
  const [isApplied, setIsApplied] = useState(false);

  const job = apiJob || initialCareers.find(c => c.slug === slug || c.id === slug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(jobApplicationSchema),
  });

  if (isLoading && !job) return <Loader text="Loading job specifications..." fullScreen />;
  if (!job) return <ErrorState message="Job opening not found." onRetry={refetch} />;

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
        title={`${job.title} | BuildZone Careers`}
        description={job.shortDescription}
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="mb-8">
            <Link
              to="/careers"
              className="font-mono text-xs text-slate-400 hover:text-[#00F0FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold transition-colors"
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

                <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-slate-400 pt-2 border-b border-slate-800 pb-6">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#00F0FF]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-[#00F0FF]" />
                    <span>{job.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>{job.salaryRange}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  What You'll Lead & Build
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  Required Qualifications
                </h2>
                <ul className="space-y-3">
                  {job.requirements?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-4">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  Perks & Compensation
                </h2>
                <ul className="space-y-3">
                  {job.benefits?.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Application Form (Sticky) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-2xl sticky top-24">
                {isApplied ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 bg-[#0066FF]/15 border border-[#0066FF]/40 rounded-full flex items-center justify-center text-[#00F0FF] mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h2 className="text-xl font-bold font-display uppercase text-white">
                      Application Sent!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      We’ve received your credentials. Our recruiting team will review your background and respond promptly.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setIsApplied(false)} className="mt-4">
                      Submit Update
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="border-b border-slate-800 pb-3 mb-4">
                      <h2 className="font-display font-bold text-lg uppercase text-white">
                        Apply for this Role
                      </h2>
                      <p className="font-mono text-[11px] text-slate-400">Fast-track direct engineering review</p>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jordan Sterling"
                        {...register('name')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                      />
                      {errors.name && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="jordan@dev.com"
                        {...register('email')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                      />
                      {errors.email && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        {...register('phone')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                      />
                      {errors.phone && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Portfolio / GitHub / LinkedIn
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/yourhandle"
                        {...register('portfolio')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                      />
                      {errors.portfolio && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.portfolio.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Resume / CV Link *
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or LinkedIn"
                        {...register('resumeLink')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                      />
                      {errors.resumeLink && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.resumeLink.message}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Why are you excited about BuildZone?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Highlight recent technical architectures you've built..."
                        {...register('coverLetter')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl font-sans"
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
