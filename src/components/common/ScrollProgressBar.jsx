import React, { useState, useEffect } from 'react';

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight === 0) {
        setScrollProgress(0);
        return;
      }
      
      const scrollPercent = (totalScroll / windowHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#8B5CF6] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,102,255,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
