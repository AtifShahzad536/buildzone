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
        title="Scalable Digital Products, Enterprise Software & AI Engineering"
        description="We design and develop scalable web applications, mobile apps, AI solutions and custom software for startups and growing businesses worldwide."
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
