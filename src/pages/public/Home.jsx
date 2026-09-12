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
        title="BuildZone | Best Software House in Sialkot"
        description="BuildZone Technology is recognized as the best and #1 software house in Sialkot, Pakistan. We develop custom software, mobile apps, enterprise ERPs, and AI solutions for global startups and local exporters."
        keywords="Best Software House in Sialkot, No 1 Software House in Sialkot, Top Software House in Sialkot, Software House in Sialkot, Best IT Company in Sialkot, Software Development Sialkot, Web Development Sialkot, Mobile App Development Sialkot, AI Solutions Sialkot, ERP Systems Sialkot Pakistan, BuildZone Technology"
        canonical="https://buildzonetechnology.com/"
        schema={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
          "name": "BuildZone Technology",
          "alternateName": ["Best Software House in Sialkot", "No 1 Software House in Sialkot", "Top Software House in Sialkot", "BuildZone Software House"],
          "url": "https://buildzonetechnology.com/",
          "logo": "https://buildzonetechnology.com/logo.png",
          "description": "Best and No. 1 Software House in Sialkot providing high-end custom software development, enterprise ERP solutions, mobile apps, and AI engineering.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Executive Tech District, Paris Road",
            "addressLocality": "Sialkot",
            "addressRegion": "Punjab",
            "postalCode": "51310",
            "addressCountry": "PK"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.4945,
            "longitude": 74.5229
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150"
          }
        }}
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
