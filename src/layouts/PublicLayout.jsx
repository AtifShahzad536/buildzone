import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import WhatsAppChatbot from '../components/common/WhatsAppChatbot';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import PageTransitionBlinds from '../components/common/PageTransitionBlinds';
import SplashScreen from '../components/common/SplashScreen';
import SmoothScroll from '../components/common/SmoothScroll';

export const PublicLayout = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#060B18] text-slate-100 selection:bg-[#0066FF] selection:text-white relative">
        <SplashScreen />
        <PageTransitionBlinds />
        <ScrollProgressBar />
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 w-full pt-20 sm:pt-24">
          <Outlet />
        </main>
        <Footer />
        {/* Global Floating WhatsApp Interactive AI Assistant */}
        <WhatsAppChatbot />
      </div>
    </SmoothScroll>
  );
};

export default PublicLayout;
