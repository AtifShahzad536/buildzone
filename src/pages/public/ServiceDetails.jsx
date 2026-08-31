import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  HelpCircle,
  Terminal,
  Zap,
  DollarSign 
} from 'lucide-react';
import { useGetServiceBySlugQuery } from '../../services/api';
import { initialServices } from '../../data/services';
import { renderIcon } from '../../utils/helpers';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import SEOHead from '../../components/common/SEOHead';

export const ServiceDetails = () => {
  const { slug } = useParams();
  const { data: apiService, isLoading, isError, refetch } = useGetServiceBySlugQuery(slug);

  const service = apiService || initialServices.find(s => s.slug === slug || s.id === slug);

  if (isLoading && !service) return <Loader text="Loading service architecture..." fullScreen />;
  if (!service) return <ErrorState message="Service not found." onRetry={refetch} />;

  return (
    <>
      <SEOHead
        title={`${service.title} — Engineering Services`}
        description={service.shortDescription}
      />

      <div className="py-12 sm:py-20">
        <Container>
          {/* Back link */}
          <div className="mb-8">
            <Link
              to="/services"
              className="font-mono text-xs text-slate-500 hover:text-[#0066FF] inline-flex items-center gap-1.5 uppercase tracking-wider font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
                <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                  {service.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938] leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
                {service.heroDescription || service.shortDescription}
              </p>

              <div className="pt-2 flex flex-row items-center gap-3">
                <Link to="/start-project">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Scope This Service
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary" size="md">
                    Contact Architect
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6 text-center">
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] mx-auto">
                {renderIcon(service.iconName, { className: "w-8 h-8" })}
              </div>
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase font-bold block">Delivery Model</span>
                <span className="font-display font-bold text-lg text-[#0B1938]">Dedicated Agile Pod</span>
              </div>
              <div className="pt-4 border-t border-slate-100 font-mono text-xs text-slate-600 space-y-1">
                <div>Standard 2-Week Sprints</div>
                <div>Direct Slack & Git Access</div>
                <div className="text-[#0066FF] font-bold">100% Code & IP Ownership</div>
              </div>
            </div>
          </div>

          {/* Deliverables Grid */}
          <div className="mb-20">
            <SectionTitle
              badge="Included Architecture"
              title="What We Deliver"
              subtitle="Every engagement includes end-to-end architecture, QA, documentation, and automated CI/CD pipelines."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {service.deliverables?.map((del, idx) => (
                <div key={idx} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0066FF] shrink-0" />
                    <h3 className="font-display font-bold text-base uppercase text-[#0B1938]">{del}</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Engineered according to strict enterprise code reviews and automated test suites.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="p-8 sm:p-10 bg-white border border-slate-200 rounded-lg shadow-sm mb-20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-[#0B1938]">
                  Technology Stack & Tools
                </h3>
                <p className="font-mono text-xs text-slate-500">Frameworks utilized in this service</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {service.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-slate-100 border border-slate-200 rounded font-mono text-xs text-slate-800 font-bold uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Process Timeline for this Service */}
          {service.process && (
            <div className="mb-20">
              <SectionTitle
                badge="Engagement Roadmap"
                title="Service Execution Process"
                subtitle="Step-by-step delivery workflow from initial whiteboard architecture to cloud deployment."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {service.process.map((step) => (
                  <div key={step.step} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-2xl font-black text-[#0066FF] block mb-3">
                        {step.step}
                      </span>
                      <h4 className="font-display font-bold text-base uppercase text-[#0B1938] mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs for this Service */}
          {service.faqs && (
            <div className="mb-20">
              <SectionTitle
                badge="Common Questions"
                title={`${service.title} FAQ`}
              />

              <div className="space-y-4 mt-8 max-w-4xl">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-2">
                    <h4 className="font-display font-bold text-base uppercase text-[#0B1938]">{faq.q}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default ServiceDetails;
