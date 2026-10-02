import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal,
  Sparkles 
} from 'lucide-react';
import { useCreateLeadMutation } from '../../services/api';
import { contactSchema } from '../../utils/validation';
import { siteConfig } from '../../config/siteConfig';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const Contact = () => {
  const [createLead, { isLoading }] = useCreateLeadMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service: 'Web Development',
      budget: '',
      timeline: '2-3 Months',
      ndaRequired: false,
      honeypot: '',
    }
  });

  const onSubmit = async (data) => {
    if (data.honeypot) {
      toast.error("Spam bot submission detected");
      return;
    }

    try {
      await createLead({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        country: data.country || 'Global',
        service: data.service,
        budget: data.budget,
        timeline: data.timeline,
        projectDetails: data.projectDetails,
        message: data.projectDetails,
        source: 'Contact Form',
      }).unwrap();

      setIsSubmitted(true);
      toast.success("Inquiry Submitted Successfully!", {
        description: "A senior solutions architect will contact you within 24 business hours.",
      });
      reset();
    } catch (err) {
      toast.error("Failed to submit inquiry. Please email us directly.");
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | BuildZone"
        description="Connect with BuildZone, the best & top-rated software agency in Sialkot, Pakistan. Scope your next custom software, ERP system, mobile app, or AI solution."
        keywords="Contact Software Agency in Sialkot, Contact Software House in Sialkot, Best Software Agency in Sialkot, Best Software House in Sialkot, No 1 Software House in Sialkot, No 1 Software Agency in Sialkot, IT Company in Sialkot, Software House in Sialkot Address, BuildZone Sialkot Phone WhatsApp, Hire Developers Sialkot"
        canonical="https://buildzonetechnology.com/contact"
      />

      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full mb-4 shadow-[0_0_15px_rgba(0,102,255,0.15)]">
              <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00F0FF]">
                DIRECT ARCHITECT CHANNEL
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white mb-4">
              LET'S TALK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-sky-400">ENGINEERING</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Have an ambitious project or need senior engineering talent? Send us your scope parameters and receive an architectural roadmap and proposal within 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Info & Assurances */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl space-y-6">
                <h2 className="text-xl font-bold font-display uppercase text-white border-b border-slate-800 pb-3">
                  Direct Inbound Channels
                </h2>

                <div className="space-y-4 font-mono text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Official Inquiries</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-white hover:text-[#00F0FF] font-bold block transition-colors">
                        {siteConfig.contact.email}
                      </a>
                      <a href={`mailto:${siteConfig.contact.alternateEmail}`} className="text-slate-400 hover:text-[#00F0FF] text-[11px] block mt-0.5 transition-colors">
                        {siteConfig.contact.alternateEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Call & WhatsApp</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a href={`tel:${siteConfig.contact.phone}`} className="text-white hover:text-[#00F0FF] font-bold transition-colors">
                          {siteConfig.contact.phone}
                        </a>
                        <a
                          href={siteConfig.contact.whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-0.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[9px] font-bold uppercase rounded-md transition-colors"
                        >
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Headquarters</span>
                      <span className="text-slate-300">{siteConfig.contact.address}, {siteConfig.contact.city}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Working Hours</span>
                      <span className="text-slate-300">{siteConfig.contact.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Non-Disclosure Agreement signed upon request</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct contact with senior architects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-xl">
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-[#0066FF]/15 border border-[#0066FF]/40 rounded-full flex items-center justify-center text-[#00F0FF] mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold font-display uppercase text-white">
                      Scope Received!
                    </h2>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for submitting your project parameters. Our engineering lead has been notified and will review your technical requirements.
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4"
                    >
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot for Spam Protection */}
                    <input type="text" className="hidden" tabIndex={-1} {...register('honeypot')} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Alex Henderson"
                          {...register('name')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                        />
                        {errors.name && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          placeholder="alex@company.com"
                          {...register('email')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                        />
                        {errors.email && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          placeholder="Company Inc."
                          {...register('company')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          placeholder="+1 (555) 000-0000"
                          {...register('phone')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Required Service *
                        </label>
                        <select
                          {...register('service')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl cursor-pointer"
                        >
                          <option value="Web Development">Web Application Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="AI & Automation">AI & Intelligent Automation</option>
                          <option value="Custom Software">Custom Enterprise Software</option>
                          <option value="SaaS Platform">SaaS Product Engineering</option>
                          <option value="E-Commerce">E-Commerce Architecture</option>
                          <option value="UI/UX Design">UI/UX & Product Design</option>
                          <option value="Cloud & DevOps">Cloud & DevOps Infrastructure</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                          Estimated Budget (USD) *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. $15,000, $50k, or Enter Custom Budget"
                          {...register('budget')}
                          className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl font-mono"
                        />
                        {errors.budget && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.budget.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-bold">
                        Project Overview & Technical Requirements *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about the product, current challenges, desired features, or key integrations..."
                        {...register('projectDetails')}
                        className="w-full bg-[#070E1C] border border-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF]/60 rounded-xl font-sans leading-relaxed"
                      />
                      {errors.projectDetails && <p className="font-mono text-[10px] text-rose-400 mt-1">{errors.projectDetails.message}</p>}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="nda"
                        {...register('ndaRequired')}
                        className="w-4 h-4 text-[#0066FF] border-slate-700 bg-[#070E1C] rounded focus:ring-[#00F0FF]"
                      />
                      <label htmlFor="nda" className="font-mono text-xs text-slate-300 cursor-pointer select-none">
                        Send Mutual Non-Disclosure Agreement (NDA) prior to technical calls
                      </label>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      isLoading={isLoading}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Technical Scope
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

export default Contact;
