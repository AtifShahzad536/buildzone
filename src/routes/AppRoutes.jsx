import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/common/Loader';

// Lazy-loaded Public Pages for Optimized Performance
const Home = lazy(() => import('../pages/public/Home'));
const About = lazy(() => import('../pages/public/About'));
const Team = lazy(() => import('../pages/public/Team'));
const Services = lazy(() => import('../pages/public/Services'));
const ServiceDetails = lazy(() => import('../pages/public/ServiceDetails'));
const Industries = lazy(() => import('../pages/public/Industries'));
const IndustryDetails = lazy(() => import('../pages/public/IndustryDetails'));
const Portfolio = lazy(() => import('../pages/public/Portfolio'));
const CaseStudies = lazy(() => import('../pages/public/CaseStudies'));
const CaseStudyDetails = lazy(() => import('../pages/public/CaseStudyDetails'));
const Technologies = lazy(() => import('../pages/public/Technologies'));
const AIDevelopment = lazy(() => import('../pages/public/AIDevelopment'));
const Careers = lazy(() => import('../pages/public/Careers'));
const JobDetails = lazy(() => import('../pages/public/JobDetails'));
const Blog = lazy(() => import('../pages/public/Blog'));
const BlogDetails = lazy(() => import('../pages/public/BlogDetails'));
const FAQ = lazy(() => import('../pages/public/FAQ'));
const Testimonials = lazy(() => import('../pages/public/Testimonials'));
const Security = lazy(() => import('../pages/public/Security'));
const Contact = lazy(() => import('../pages/public/Contact'));
const StartProject = lazy(() => import('../pages/public/StartProject'));
const PrivacyPolicy = lazy(() => import('../pages/public/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/public/TermsAndConditions'));
const CookiePolicy = lazy(() => import('../pages/public/CookiePolicy'));
const NotFound = lazy(() => import('../pages/public/NotFound'));

// Lazy-loaded Admin Pages
const Login = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const LeadsManager = lazy(() => import('../pages/admin/leads/LeadsManager'));
const LeadDetails = lazy(() => import('../pages/admin/leads/LeadDetails'));
const ProjectsManager = lazy(() => import('../pages/admin/projects/ProjectsManager'));
const ServicesManager = lazy(() => import('../pages/admin/services/ServicesManager'));
const IndustriesManager = lazy(() => import('../pages/admin/industries/IndustriesManager'));
const CaseStudiesManager = lazy(() => import('../pages/admin/caseStudies/CaseStudiesManager'));
const TeamManager = lazy(() => import('../pages/admin/team/TeamManager'));
const TestimonialsManager = lazy(() => import('../pages/admin/testimonials/TestimonialsManager'));
const BlogManager = lazy(() => import('../pages/admin/blog/BlogManager'));
const CareersManager = lazy(() => import('../pages/admin/careers/CareersManager'));
const FaqsManager = lazy(() => import('../pages/admin/faqs/FaqsManager'));
const TechnologiesManager = lazy(() => import('../pages/admin/technologies/TechnologiesManager'));
const MediaManager = lazy(() => import('../pages/admin/media/MediaManager'));
const SettingsManager = lazy(() => import('../pages/admin/settings/SettingsManager'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen text="Initializing BuildZone..." />}>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />

          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetails />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<CaseStudyDetails />} />

          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />

          <Route path="/technologies" element={<Technologies />} />
          <Route path="/ai-development" element={<AIDevelopment />} />

          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<JobDetails />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/security" element={<Security />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/start-project" element={<StartProject />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="/404" element={<NotFound />} />
        </Route>

        {/* Admin Authentication Route */}
        <Route element={<AuthLayout />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* Protected Admin Portal Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<LeadsManager />} />
          <Route path="leads/:id" element={<LeadDetails />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="industries" element={<IndustriesManager />} />
          <Route path="case-studies" element={<CaseStudiesManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="careers" element={<CareersManager />} />
          <Route path="faqs" element={<FaqsManager />} />
          <Route path="technologies" element={<TechnologiesManager />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="settings" element={<SettingsManager />} />
          <Route path="settings/seo" element={<SettingsManager />} />
          <Route path="settings/social" element={<SettingsManager />} />
        </Route>

        {/* Catch-all 404 Redirect */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
