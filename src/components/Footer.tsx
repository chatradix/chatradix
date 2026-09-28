import React from 'react';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToSection: (id: string) => void;
  onNavigatePage?: (page: 'home' | 'pricing', targetSection?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToSection, onNavigatePage }) => {
  return (
    <footer className="bg-[#0b0d12] border-t border-[#262626] w-full pb-8 pt-16 md:pt-24">
      {/* Upper Grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pb-16 border-b border-[#262626] mb-8 flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* Brand Summary */}
        <div className="flex flex-col gap-6 max-w-sm">
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
        </div>

        {/* Nav Columns Grid */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16 w-full lg:w-auto">
          {/* Column 1: AUTOMATIONS */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              AUTOMATIONS
            </span>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Order Confirmation
            </button>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Abandoned Checkout
            </button>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Shipping & Delivery
            </button>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Media Carousels
            </button>
          </div>

          {/* Column 2: FEATURES */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              FEATURES
            </span>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              2-Way Order Tagging
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              60s Embedded Signup
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Shopify Admin 1-Click
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Anti-Spam Shield
            </button>
          </div>

          {/* Column 3: PLATFORM */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              PLATFORM
            </span>
            <button onClick={() => onScrollToSection('meta-partner')} className="font-['JetBrains_Mono'] text-xs text-[#25D366] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Official Meta API
            </button>
            <a 
              href="https://apps.shopify.com/chatradix"
              target="_blank"
              rel="noopener noreferrer" 
              className="font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:underline transition-colors text-left uppercase tracking-wider"
            >
              Shopify App Store
            </a>
            <button 
              onClick={() => onNavigatePage ? onNavigatePage('pricing') : null} 
              className="font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:underline transition-colors text-left uppercase tracking-wider font-semibold"
            >
              Pricing & Plans
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Sub-second Webhooks
            </button>
          </div>

          {/* Column 4: CONNECT */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              CONNECT
            </span>
            <button onClick={() => onScrollToSection('support')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Technical Support
            </button>
            <button onClick={() => onScrollToSection('offer')} className="font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:underline transition-colors text-left uppercase tracking-wider">
              2 Months Free Launch
            </button>
            <a 
              href="mailto:info@chatradix.com" 
              className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider"
            >
              info@chatradix.com
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-['JetBrains_Mono'] text-[11px] text-[#888888] tracking-wider uppercase text-center sm:text-left">
          ©2026 CHATRADIX • OFFICIAL META WHATSAPP CLOUD API AUTOMATION
        </p>

        <nav className="flex gap-6">
          <a 
            href="https://chatradix.com/privacy-policy" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-['JetBrains_Mono'] text-[11px] text-[#888888] hover:text-[#e5e2e1] transition-colors tracking-wider uppercase"
          >
            Privacy Policy
          </a>
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
