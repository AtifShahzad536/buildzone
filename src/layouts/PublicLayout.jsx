import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import WhatsAppChatbot from '../components/common/WhatsAppChatbot';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1938] selection:bg-blue-100 selection:text-[#0066FF]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full pt-20 sm:pt-24">
        <Outlet />
      </main>
      <Footer />
      {/* Global Floating WhatsApp Interactive AI Assistant */}
      <WhatsAppChatbot />
    </div>
  );
};

export default PublicLayout;
