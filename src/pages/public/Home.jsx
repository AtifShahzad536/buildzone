import React, { Suspense } from 'react';
import Hero from '../../components/home/Hero';
import TrustedTech from '../../components/home/TrustedTech';
import SEOHead from '../../components/common/SEOHead';
import { lazyWithRetry as lazy } from '../../utils/lazyWithRetry';

// Below-the-fold components lazy loaded to eliminate render-blocking JS for initial LCP
const ServicesPreview = lazy(() => import('../../components/home/ServicesPreview'));
const FeaturedProjects = lazy(() => import('../../components/home/FeaturedProjects'));
const IndustriesPreview = lazy(() => import('../../components/home/IndustriesPreview'));
const WhyChooseUs = lazy(() => import('../../components/home/WhyChooseUs'));
const Process = lazy(() => import('../../components/home/Process'));
const AISection = lazy(() => import('../../components/home/AISection'));
const BlogPreview = lazy(() => import('../../components/home/BlogPreview'));
const Testimonials = lazy(() => import('../../components/home/Testimonials'));
const FAQPreview = lazy(() => import('../../components/home/FAQPreview'));
const FinalCTA = lazy(() => import('../../components/home/FinalCTA'));

export const Home = () => {
  return (
    <>
      <SEOHead
        title="No. 1 Software House in Sialkot — Enterprise Software & AI Engineering"
        description="BuildZone is the #1 Software House in Sialkot, Pakistan. We engineer custom enterprise software, mobile apps, web applications, and AI systems for exporters and global enterprises."
        keywords="Software House in Sialkot, Best Software House in Sialkot, No 1 Software House in Sialkot, Top IT Company in Sialkot, Software Development Sialkot, Web Development Sialkot, Mobile App Development Sialkot, AI Solutions Sialkot, ERP Systems Sialkot"
        canonical="https://buildzonetechnology.com/"
      />

      <div className="flex flex-col">
        {/* Above the fold (instant paint, zero render-delay for H1 LCP) */}
        <Hero />
        <TrustedTech />

        {/* Below the fold (streamed asynchronously with zero impact on LCP) */}
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <ServicesPreview />
          <FeaturedProjects />
          <IndustriesPreview />
          <WhyChooseUs />
          <Process />
          <AISection />
          <BlogPreview />
          <Testimonials />
          <FAQPreview />
          <FinalCTA />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
