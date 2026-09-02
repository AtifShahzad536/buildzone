import React from 'react';
import Hero from '../../components/home/Hero';
import TrustedTech from '../../components/home/TrustedTech';
import SEOHead from '../../components/common/SEOHead';
import ServicesPreview from '../../components/home/ServicesPreview';
import FeaturedProjects from '../../components/home/FeaturedProjects';
import IndustriesPreview from '../../components/home/IndustriesPreview';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import Process from '../../components/home/Process';
import AISection from '../../components/home/AISection';
import BlogPreview from '../../components/home/BlogPreview';
import Testimonials from '../../components/home/Testimonials';
import FAQPreview from '../../components/home/FAQPreview';
import FinalCTA from '../../components/home/FinalCTA';

export const Home = () => {
  return (
    <>
      <SEOHead
        title="Scalable Digital Products, Enterprise Software & AI Engineering"
        description="We design and develop scalable web applications, mobile apps, AI solutions and custom software for startups and growing businesses worldwide."
      />
      <div className="flex flex-col">
        {/* Above the fold (instant paint, zero render-delay) */}
        <Hero />
        <TrustedTech />

        {/* Below the fold (core sections) */}
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
      </div>
    </>
  );
};

export default Home;
