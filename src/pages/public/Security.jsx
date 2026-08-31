import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  FileCheck, 
  Server, 
  Cpu, 
  Terminal,
  CheckCircle2
} from 'lucide-react';
import Container from '../../components/common/Container';
import SectionTitle from '../../components/common/SectionTitle';
import Badge from '../../components/common/Badge';
import SEOHead from '../../components/common/SEOHead';

export const Security = () => {
  return (
    <>
      <SEOHead
        title="Security, Compliance & Data Privacy Architecture"
        description="Learn about BuildZone's enterprise security protocols, automated vulnerability scanning, SOC 2, HIPAA, and GDPR compliance standards."
      />

      <div className="py-12 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mb-4">
              <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0066FF]">
                ENTERPRISE PROTECTION
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B1938] mb-4">
              SECURITY & COMPLIANCE
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              We treat security as a first-class architectural primitive. Every product is engineered to withstand modern adversarial threats and pass strict third-party compliance audits.
            </p>
          </div>

          {/* 6 Security Protocols */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: Lock,
                title: "Zero-Trust Architecture",
                desc: "Every API endpoint, microservice, and database connection requires strict mutual TLS and cryptographically verified JWT/OAuth tokens.",
              },
              {
                icon: KeyRound,
                title: "End-to-End Encryption",
                desc: "All data in transit is encrypted using TLS 1.3. Sensitive databases utilize AES-256 encryption at rest with automated key rotation.",
              },
              {
                icon: Server,
                title: "Private VPC Isolation",
                desc: "Multi-tenant and dedicated cloud workloads are isolated inside secure Virtual Private Clouds (VPC) with strict egress firewalls.",
              },
              {
                icon: FileCheck,
                title: "Automated CI/CD Auditing",
                desc: "Static and dynamic AST code scanners (SAST/DAST) automatically run on every pull request to detect OWASP vulnerabilities before merging.",
              },
              {
                icon: ShieldCheck,
                title: "Compliance Readiness",
                desc: "We engineer systems ready for SOC 2 Type II, HIPAA, GDPR, ISO 27001, and PCI-DSS compliance verification from day one.",
              },
              {
                icon: Cpu,
                title: "AI Guardrails & Sandboxes",
                desc: "Custom LLM integrations run through private deterministic sandboxes with automated PII masking and prompt-injection defenses.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-white border border-slate-200 hover:border-[#0066FF]/40 rounded-lg transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg uppercase text-[#0B1938] mb-2 group-hover:text-[#0066FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secure SDLC Lifecycle */}
          <div className="max-w-4xl mx-auto p-8 bg-white border border-slate-200 rounded-lg shadow-sm mb-20 space-y-6">
            <h2 className="text-2xl font-bold font-display uppercase text-[#0B1938] border-b border-slate-100 pb-3">
              Secure Software Development Lifecycle (SDLC)
            </h2>

            <div className="space-y-4 font-sans text-sm text-slate-700 leading-relaxed">
              <p>
                Our engineering pods operate according to strict security protocols from initial whiteboard architectural diagrams through to production cloud deployments:
              </p>
              <ul className="space-y-2 font-mono text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Threat modeling and surface analysis during Sprint 0</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mandatory peer code review and branch protection policies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automated secret scanning preventing API key leaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Third-party penetration test coordination prior to enterprise launch</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Security;
