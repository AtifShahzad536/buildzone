import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';
import { siteConfig } from '../../config/siteConfig';

export const TermsAndConditions = () => {
  return (
    <>
      <SEOHead title="Terms and Conditions" description="Terms of service and engineering agreement principles for BuildZone." />
      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container className="max-w-4xl">
          <div className="bg-[#0B1528] border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              TERMS & CONDITIONS
            </h1>
            <p className="font-mono text-xs text-[#00F0FF]">Last updated: August 2026</p>

            <div className="space-y-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">1. Intellectual Property (IP)</h2>
                <p>
                  Unless otherwise explicitly agreed in custom statements of work, 100% intellectual property rights, code repositories, design assets, and database schemas are transferred to the client upon milestone settlement.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">2. Engagement Sprints</h2>
                <p>
                  All development is managed in transparent, agile two-week sprints with verifiable milestones, live demo staging environments, and continuous code commits.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">3. Warranties & SLA</h2>
                <p>
                  We provide an included 30-day post-launch warranty on all shipped features to guarantee zero functional deviations from approved architectural specifications.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsAndConditions;
