import React from 'react';
import { ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToSection: (id: string) => void;
  onNavigatePage?: (
    page: 'home' | 'pricing' | 'meta-rates' | 'automations' | 'privacy-policy', 
    targetSection?: string,
    category?: string
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToSection, onNavigatePage }) => {
  const handleCategoryClick = (categoryId: string) => {
    if (onNavigatePage) {
      onNavigatePage('automations', undefined, categoryId);
    } else {
      onScrollToSection('flows');
    }
  };

  return (
    <footer className="bg-[#0b0d12] border-t border-[#262626] w-full pb-8 pt-16 md:pt-24">
      {/* Upper Grid - Perfectly balanced 12-column layout */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pb-16 border-b border-[#262626] mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
        
        {/* Column 1: Brand & Official Verification (lg:col-span-4) */}
        <div className="flex flex-col gap-5 lg:col-span-4 max-w-sm">
          <button 
            onClick={onScrollToTop}
            className="text-left group inline-flex items-center self-start"
            aria-label="ChatRadix - Scroll to top"
          >
            <img 
              src="./logo.svg" 
              alt="ChatRadix Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
            />
          </button>
          
          <p className="font-['JetBrains_Mono'] text-xs text-[#888888] uppercase tracking-[0.15em] leading-relaxed">
            OFFICIAL META WHATSAPP CLOUD API AUTOMATION FOR SHOPIFY.
          </p>

          <div className="mt-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#25D366] tracking-wider uppercase">
                Official Cloud API Engine
              </span>
            </div>
            <p className="text-[11px] text-[#888888] font-['JetBrains_Mono'] leading-relaxed">
              Direct Meta BSP architecture. Sub-second webhook triggers with 100% automated Shopify sync.
            </p>
          </div>
        </div>

        {/* Column 2: AUTOMATIONS - 4 Feature Categories (lg:col-span-3) */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
            AUTOMATIONS
          </span>

          <div className="flex flex-col gap-2.5">
            {/* Category 1 */}
            <button 
              onClick={() => handleCategoryClick('transactional')}
              className="group flex items-center justify-between text-left font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#25D366] transition-colors uppercase tracking-wider py-1"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Transactional & Shipping
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-400 group-hover:border-[#25D366]/40 group-hover:text-[#25D366] transition-colors">
                5
              </span>
            </button>

            {/* Category 2 */}
            <button 
              onClick={() => handleCategoryClick('recovery')}
              className="group flex items-center justify-between text-left font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#25D366] transition-colors uppercase tracking-wider py-1"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Sales Recovery
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-400 group-hover:border-[#25D366]/40 group-hover:text-[#25D366] transition-colors">
                2
              </span>
            </button>

            {/* Category 3 */}
            <button 
              onClick={() => handleCategoryClick('growth')}
              className="group flex items-center justify-between text-left font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#25D366] transition-colors uppercase tracking-wider py-1"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Premium & Growth
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-400 group-hover:border-[#25D366]/40 group-hover:text-[#25D366] transition-colors">
                4
              </span>
            </button>

            {/* Category 4 */}
            <button 
              onClick={() => handleCategoryClick('operations')}
              className="group flex items-center justify-between text-left font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#25D366] transition-colors uppercase tracking-wider py-1"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Store Operations
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-gray-400 group-hover:border-[#25D366]/40 group-hover:text-[#25D366] transition-colors">
                1
              </span>
            </button>

            {/* View All */}
            <button 
              onClick={() => handleCategoryClick('all')}
              className="inline-flex items-center gap-1.5 text-left font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:text-white transition-colors uppercase tracking-wider font-semibold pt-2"
            >
              <span>View All 12 Flows</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 3: QUICK LINKS (lg:col-span-3) */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
            QUICK LINKS
          </span>

          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => onNavigatePage ? onNavigatePage('home', 'architecture') : onScrollToSection('architecture')} 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1"
            >
              Architecture
            </button>

            <button 
              onClick={() => onNavigatePage ? onNavigatePage('meta-rates') : null} 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1"
            >
              Meta Rates by Country
            </button>

            <button 
              onClick={() => onNavigatePage ? onNavigatePage('pricing') : null} 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1"
            >
              Pricing & Plans
            </button>

            <button 
              onClick={() => onNavigatePage ? onNavigatePage('home', 'support') : onScrollToSection('support')} 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1"
            >
              System Support
            </button>

            <a 
              href="https://apps.shopify.com/chatradix" 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:text-white transition-colors text-left uppercase tracking-wider py-1"
            >
              <span>Shopify App Listing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Column 4: CONNECT (lg:col-span-2) */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
            CONNECT
          </span>

          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => onNavigatePage ? onNavigatePage('home', 'support') : onScrollToSection('support')} 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1"
            >
              Technical Support
            </button>

            <a 
              href="mailto:info@chatradix.com" 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider py-1 truncate"
            >
              info@chatradix.com
            </a>

            {/* Infrastructure Health Badge */}
            <div className="mt-3 pt-3 border-t border-[#262626] flex flex-col gap-1 font-['JetBrains_Mono'] text-[11px] text-[#888888]">
              <span className="text-white/40 uppercase tracking-widest text-[9px]">SLA STATUS</span>
              <div className="flex items-center gap-1.5 text-[#25D366]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span className="font-semibold">99.98% Uptime</span>
              </div>
              <span className="text-[10px] text-gray-500">TLS 1.3 Certified</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-['JetBrains_Mono'] text-[11px] text-[#888888] tracking-wider uppercase text-center sm:text-left">
          ©2026 CHATRADIX • OFFICIAL META WHATSAPP CLOUD API AUTOMATION
        </p>

        <nav className="flex gap-6 items-center">
          <button 
            onClick={() => onNavigatePage ? onNavigatePage('privacy-policy') : null}
            className="font-['JetBrains_Mono'] text-[11px] text-[#888888] hover:text-[#0080FB] transition-colors tracking-wider uppercase cursor-pointer"
          >
            Privacy Policy
          </button>
          <a 
            href="https://apps.shopify.com/chatradix" 
            target="_blank"
            rel="noopener noreferrer" 
            className="font-['JetBrains_Mono'] text-[11px] text-[#0080FB] hover:text-white transition-colors tracking-wider uppercase"
          >
            Shopify App Listing
          </a>
        </nav>
      </div>
    </footer>
  );
};
