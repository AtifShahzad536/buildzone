import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';
import { siteConfig } from '../../config/siteConfig';

export const PrivacyPolicy = () => {
  return (
    <>
      <SEOHead title="Privacy Policy" description="BuildZone Privacy Policy and data protection practices." />
      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container className="max-w-4xl">
          <div className="bg-[#0B1528] border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-xs text-[#00F0FF]">Last updated: August 2026</p>

            <div className="space-y-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">1. Information We Collect</h2>
                <p>
                  We collect information directly from you when you submit project inquiries, book architectural consultations, or apply for open roles on our site.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">2. Use of Information</h2>
                <p>
                  All project parameters, NDAs, and technical scopes are strictly used to prepare feasibility reviews, service quotes, and deliver contracted software engineering services.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">3. Data Security</h2>
                <p>
                  We maintain enterprise physical, electronic, and procedural safeguards in compliance with applicable international standards to guard personal and proprietary company data.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">4. Contact</h2>
                <p>
                  Questions regarding our data protection policies may be directed to <a href={`mailto:${siteConfig.contact.email}`} className="text-[#00F0FF] hover:underline font-bold">{siteConfig.contact.email}</a>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PrivacyPolicy;
