import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';

export const CookiePolicy = () => {
  return (
    <>
      <SEOHead title="Cookie Policy" description="BuildZone Cookie Policy and session telemetry." />
      <div className="py-12 sm:py-20 bg-[#060B18]">
        <Container className="max-w-4xl">
          <div className="bg-[#0B1528] border border-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-white">
              COOKIE POLICY
            </h1>
            <p className="font-mono text-xs text-[#00F0FF]">Last updated: August 2026</p>

            <div className="space-y-6 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">1. Essential Cookies</h2>
                <p>
                  We use essential cookies to manage authentication sessions, secure staff logins, and persist interactive cost estimator preferences.
                </p>
              </div>

              <div>
                <h2 className="font-bold text-base text-white uppercase mb-2">2. Analytics Telemetry</h2>
                <p>
                  We collect anonymous telemetry to measure page speed, resource caching performance, and user interface responsiveness.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CookiePolicy;
