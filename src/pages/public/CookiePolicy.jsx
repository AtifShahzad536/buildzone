import React from 'react';
import Container from '../../components/common/Container';
import SEOHead from '../../components/common/SEOHead';

export const CookiePolicy = () => {
  return (
    <>
      <SEOHead title="Cookie Policy" description="BuildZone Cookie Policy and session telemetry." />
      <div className="py-12 sm:py-20">
        <Container className="max-w-4xl">
          <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-lg shadow-sm space-y-6">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              COOKIE POLICY
            </h1>
            <p className="font-mono text-xs text-slate-500">Last updated: August 2026</p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
              <h3 className="font-bold text-base text-[#0B1938] uppercase">1. Essential Cookies</h3>
              <p>
                We use essential cookies to manage authentication sessions, secure staff logins, and persist interactive cost estimator preferences.
              </p>

              <h3 className="font-bold text-base text-[#0B1938] uppercase">2. Analytics Telemetry</h3>
              <p>
                We collect anonymous telemetry to measure page speed, resource caching performance, and user interface responsiveness.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CookiePolicy;
