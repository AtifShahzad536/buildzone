import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';
import { siteConfig } from '../../config/siteConfig';

export const TermsAndConditions = () => {
  return (
    <>
      <SEOHead title="Terms and Conditions" description="Terms of service and engineering agreement principles for BuildZone." />
      <div className="py-12 sm:py-20">
        <Container className="max-w-4xl">
          <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-lg shadow-sm space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              TERMS & CONDITIONS
            </h1>
            <p className="font-mono text-xs text-slate-500">Last updated: August 2026</p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
              <h3 className="font-bold text-base text-[#0B1938] uppercase">1. Intellectual Property (IP)</h3>
              <p>
                Unless otherwise explicitly agreed in custom statements of work, 100% intellectual property rights, code repositories, design assets, and database schemas are transferred to the client upon milestone settlement.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">2. Engagement Sprints</h3>
              <p>
                All development is managed in transparent, agile two-week sprints with verifiable milestones, live demo staging environments, and continuous code commits.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">3. Warranties & SLA</h3>
              <p>
                We provide an included 30-day post-launch warranty on all shipped features to guarantee zero functional deviations from approved architectural specifications.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsAndConditions;
