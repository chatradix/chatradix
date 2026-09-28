import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UltimateFlows } from './components/UltimateFlows';
import { ArchitectureSection } from './components/ArchitectureSection';
import { MetaPartnerSection } from './components/MetaPartnerSection';
import { OfferBanner } from './components/OfferBanner';
import { SystemSupportSection } from './components/SystemSupportSection';
import { RevenueBoostSection } from './components/RevenueBoostSection';
import { PricingPage } from './components/PricingPage';
import { Footer } from './components/Footer';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Resilient UI Error Boundary prevents black screen crashes
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ChatRadix ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06080d] text-white flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-lg bg-[#0e1626] border border-[#0080FB] rounded-2xl p-8 shadow-[0_0_50px_rgba(0,128,251,0.3)]">
            <h2 className="text-xl font-bold font-['JetBrains_Mono'] text-[#0080FB] mb-3 uppercase tracking-wider">
              Navigation Recovery
            </h2>
            <p className="text-sm text-[#9aa5bb] mb-6">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.hash = '';
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#0080FB] transition-all"
            >
              Reload ChatRadix Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize currentPage directly from URL hash on first render
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('pricing')) return 'pricing';
    }
    return 'home';
  });

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
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle URL hash changes (e.g. #pricing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('pricing')) {
        setCurrentPage('pricing');
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      } else {
        setCurrentPage('home');
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigatePage = (page: 'home' | 'pricing', targetSection?: string) => {
    setCurrentPage(page);
    if (page === 'pricing') {
      window.location.hash = 'pricing';
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    } else {
      if (window.location.hash.includes('pricing')) {
        window.history.replaceState(null, '', ' ');
      }
      if (targetSection) {
        setTimeout(() => {
          handleScrollToSection(targetSection);
        }, 150);
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    }
  };

  return (
    <ErrorBoundary>
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

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e0e0e] border border-[#0080FB] text-white px-5 py-3 shadow-[0_0_30px_rgba(0,128,251,0.3)] flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="w-4 h-4 text-[#25D366]" />
          <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Page Layout */}
      <main className="flex-grow pt-20">
        <div style={{ display: currentPage === 'pricing' ? 'block' : 'none' }}>
          <PricingPage 
            onNotify={handleNotify} 
            onNavigateHome={(sec) => handleNavigatePage('home', sec)} 
          />
        </div>

        <div style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
          {/* 1. Hero Section */}
          <HeroSection />

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
        </div>
      </main>

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onScrollToSection={(id) => handleNavigatePage('home', id)}
        onNavigatePage={handleNavigatePage}
      />
    </div>
    </ErrorBoundary>
  );
};

export default App;
