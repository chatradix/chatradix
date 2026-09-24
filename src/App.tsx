import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UltimateFlows } from './components/UltimateFlows';
import { ArchitectureSection } from './components/ArchitectureSection';
import { MetaPartnerSection } from './components/MetaPartnerSection';
import { OfferBanner } from './components/OfferBanner';
import { SystemSupportSection } from './components/SystemSupportSection';
import { RevenueBoostSection } from './components/RevenueBoostSection';
import { Footer } from './components/Footer';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ambient mouse glow coords
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNotify = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0b0d12] text-[#e5e2e1] min-h-screen flex flex-col font-['Hanken_Grotesk'] selection:bg-[#0080FB] selection:text-white relative overflow-x-hidden">
      {/* Dynamic Ambient Mouse Glow Tracking Light */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-transform duration-700 ease-out will-change-transform opacity-35 blur-[120px]"
        style={{
          transform: `translate3d(${cursorPos.x - 300}px, ${cursorPos.y - 300}px, 0)`,
          background: 'radial-gradient(circle, rgba(0,128,251,0.22) 0%, rgba(37,211,102,0.12) 40%, transparent 70%)',
        }}
      />

      {/* Cyber Technical Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid opacity-30" />

      {/* Porsche Style Preloader */}
      <Preloader />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e0e0e] border border-[#0080FB] text-white px-5 py-3 shadow-[0_0_30px_rgba(0,128,251,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4 text-[#25D366]" />
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Page Layout */}
      <main className="flex-grow pt-20">
        {/* 1. Hero Section */}
        <HeroSection
          onInitialize={() => handleScrollToSection('offer')}
          onOpenManifesto={() => handleScrollToSection('support')}
        />

        {/* 2. Ultimate Flows Section */}
        <UltimateFlows onNotify={handleNotify} />

        {/* 3. Architecture Section */}
        <ArchitectureSection />

        {/* 4. Verified Meta Partner Section */}
        <MetaPartnerSection />

        {/* 5. 2 Months Free Offer Banner */}
        <OfferBanner onNotify={handleNotify} />

        {/* 6. System Support Section */}
        <SystemSupportSection onNotify={handleNotify} />

        {/* 7. Revenue Boost Section */}
        <RevenueBoostSection />
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onScrollToSection={handleScrollToSection}
      />
    </div>
  );
};

export default App;
