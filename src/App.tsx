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
import { MetaRatesPage } from './components/MetaRatesPage';
import { AutomationsPage } from './components/AutomationsPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
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
          <div className="max-w-lg bg-[#0e1626] border border-[#0080FB] rounded-2xl p-8">
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

  // Initialize currentPage directly from URL pathname or legacy hash on first render
  const [automationCategory, setAutomationCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && ["all", "transactional", "recovery", "growth", "operations"].includes(cat)) {
        return cat;
      }
    }
    return "all";
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'meta-rates' | 'automations' | 'privacy-policy'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy-policy') || hash.includes('privacy-policy') || path.includes('privacy') || hash.includes('privacy')) return 'privacy-policy';
      if (path.includes('automations') || hash.includes('automations')) return 'automations';
      if (path.includes('meta-rates') || path.includes('rates') || hash.includes('meta-rates') || hash.includes('rates')) return 'meta-rates';
      if (path.includes('pricing') || hash.includes('pricing')) return 'pricing';
    }
    return 'home';
  });

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

  // Handle clean URL routing (popstate) and sanitize any legacy hashtags
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      // Automatically sanitize and remove any legacy '#' from the URL
      if (hash.includes('privacy-policy') || hash.includes('privacy')) {
        window.history.replaceState(null, '', '/privacy-policy');
        setCurrentPage('privacy-policy');
        return;
      }
      const searchParams = new URLSearchParams(window.location.search);
      const urlCat = searchParams.get('category');
      if (urlCat && ['all', 'transactional', 'recovery', 'growth', 'operations'].includes(urlCat)) {
        setAutomationCategory(urlCat);
      }

      if (hash.includes('automations')) {
        window.history.replaceState(null, '', '/automations');
        setCurrentPage('automations');
        return;
      }
      if (hash.includes('meta-rates') || hash.includes('rates')) {
        window.history.replaceState(null, '', '/meta-rates');
        setCurrentPage('meta-rates');
        return;
      }
      if (hash.includes('pricing')) {
        window.history.replaceState(null, '', '/pricing');
        setCurrentPage('pricing');
        return;
      }
      if (hash.length > 0) {
        window.history.replaceState(null, '', window.location.pathname);
      }

      // Route based on clean pathname
      if (path.endsWith('/privacy-policy') || path.endsWith('/privacy')) {
        setCurrentPage('privacy-policy');
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (path.endsWith('/automations')) {
        setCurrentPage('automations');
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (path.endsWith('/meta-rates')) {
        setCurrentPage('meta-rates');
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (path.endsWith('/pricing')) {
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

    // Sanitize immediately on component mount (strips any existing '#' on localhost)
    handleUrlChange();

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
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

  const handleNavigatePage = (
    page: 'home' | 'pricing' | 'meta-rates' | 'automations' | 'privacy-policy',
    targetSection?: string,
    category?: string
  ) => {
    setCurrentPage(page);

    if (category) {
      setAutomationCategory(category);
    }

    let targetPath = page === 'home' ? '/' : `/${page}`;
    if (page === 'automations' && category && category !== 'all') {
      targetPath += `?category=${encodeURIComponent(category)}`;
    }
    window.history.pushState(null, '', targetPath);

    if (page === 'automations' || page === 'meta-rates' || page === 'privacy-policy') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } else if (page === 'pricing') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    } else {
      // Home page navigation
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

      {/* Cyber Technical Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid opacity-30" />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e0e0e] border border-[#0080FB] text-white px-5 py-3 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
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
        <div style={{ display: currentPage === 'privacy-policy' ? 'block' : 'none' }}>
          <PrivacyPolicyPage 
            onNotify={handleNotify} 
            onNavigateHome={(sec) => handleNavigatePage('home', sec)} 
          />
        </div>

        <div style={{ display: currentPage === 'automations' ? 'block' : 'none' }}>
          <AutomationsPage 
            onNotify={handleNotify} 
            onNavigateHome={(sec) => handleNavigatePage('home', sec)}
            selectedCategory={automationCategory}
            onSelectCategory={(cat) => {
              setAutomationCategory(cat);
              const targetPath = cat === 'all' ? '/automations' : `/automations?category=${encodeURIComponent(cat)}`;
              window.history.replaceState(null, '', targetPath);
            }}
          />
        </div>

        <div style={{ display: currentPage === 'meta-rates' ? 'block' : 'none' }}>
          <MetaRatesPage 
            onNotify={handleNotify} 
            onNavigateHome={(sec) => handleNavigatePage('home', sec)} 
            onNavigatePricing={() => handleNavigatePage('pricing')} 
          />
        </div>

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
