import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Home, ArrowRight } from 'lucide-react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import SEOHead from '../../components/common/SEOHead';

export const NotFound = () => {
  return (
    <>
      <SEOHead title="404 — Page Not Found" description="The requested route does not exist." />
      <div className="py-20 sm:py-32 flex items-center justify-center text-center">
        <Container className="max-w-2xl">
          <div className="p-8 sm:p-12 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6">
            <div className="font-mono text-xs font-bold text-[#0066FF] uppercase tracking-widest flex items-center justify-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>HTTP 404: RESOURCE NOT FOUND</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-[#0B1938]">
              PAGE NOT FOUND
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-md mx-auto">
              The endpoint or document you are trying to access does not exist or has been relocated to another route.
            </p>

            <div className="flex flex-row items-center justify-center gap-3 pt-4 max-w-xs mx-auto">
              <Link to="/" className="flex-1">
                <Button variant="primary" size="md" className="w-full" leftIcon={<Home className="w-4 h-4" />}>
                  Home
                </Button>
              </Link>
              <Link to="/services" className="flex-1">
                <Button variant="secondary" size="md" className="w-full">
                  Services
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NotFound;
