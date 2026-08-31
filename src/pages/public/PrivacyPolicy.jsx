import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';
import { siteConfig } from '../../config/siteConfig';

export const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead title="Privacy Policy" description="BuildZone Privacy Policy and data protection practices." />
      <div className="py-12 sm:py-20">
        <Container className="max-w-4xl">
          <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-lg shadow-sm space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-xs text-slate-500">Last updated: August 2026</p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
              <h3 className="font-bold text-base text-[#0B1938] uppercase">1. Information We Collect</h3>
              <p>
                We collect information directly from you when you submit project inquiries, book architectural consultations, or apply for open roles on our site.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">2. Use of Information</h3>
              <p>
                All project parameters, NDAs, and technical scopes are strictly used to prepare feasibility reviews, service quotes, and deliver contracted software engineering services.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">3. Data Security</h3>
              <p>
                We maintain enterprise physical, electronic, and procedural safeguards in compliance with applicable international standards to guard personal and proprietary company data.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">4. Contact</h3>
              <p>
                Questions regarding our data protection policies may be directed to <a href={`mailto:${siteConfig.contact.email}`} className="text-[#0066FF] font-bold">{siteConfig.contact.email}</a>.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
