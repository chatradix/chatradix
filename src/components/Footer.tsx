import React from 'react';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToSection }) => {
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
              src="/logo.svg" 
              alt="ChatRadix Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
            />
          </button>
          <p className="font-['JetBrains_Mono'] text-xs text-[#888888] uppercase tracking-[0.15em] leading-relaxed">
            HIGH-PRECISION CONVERSATIONAL COMMERCE ARCHITECTURE FOR SHOPIFY.
          </p>
        </div>

        {/* Nav Columns Grid */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-16 w-full lg:w-auto">
          {/* Column 1: FEATURES */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              FEATURES
            </span>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Abandoned Checkout
            </button>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Shipping Alerts
            </button>
            <button onClick={() => onScrollToSection('flows')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Upsell Engine
            </button>
          </div>

          {/* Column 2: ATTRIBUTES */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              ATTRIBUTES
            </span>
            <button onClick={() => onScrollToSection('meta-partner')} className="font-['JetBrains_Mono'] text-xs text-[#25D366] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Meta Approved
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              99.98% Deliverability
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Sub-50ms Latency
            </button>
          </div>

          {/* Column 3: ARCHITECTURE */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              ARCHITECTURE
            </span>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Establish Link
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Define Logic
            </button>
            <button onClick={() => onScrollToSection('architecture')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Execution
            </button>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-xs text-[#888888] border-b border-[#262626] pb-2 uppercase tracking-[0.2em] font-semibold">
              CONTACT US
            </span>
            <button onClick={() => onScrollToSection('support')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              Support Channel
            </button>
            <button onClick={() => onScrollToSection('support')} className="font-['JetBrains_Mono'] text-xs text-[#e5e2e1] hover:text-[#0080FB] transition-colors text-left uppercase tracking-wider">
              System Terminal
            </button>
            <button onClick={() => onScrollToSection('offer')} className="font-['JetBrains_Mono'] text-xs text-[#0080FB] hover:underline transition-colors text-left uppercase tracking-wider">
              Claim 2 Months Free
            </button>
          </div>
        </nav>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-['JetBrains_Mono'] text-[11px] text-[#888888] tracking-wider uppercase text-center sm:text-left">
          SAN JOSE, CALIFORNIA, UNITED STATES • ©2026 CHATRADIX SYSTEMS
        </p>

        <nav className="flex gap-6">
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service: ChatRadix Architectural Systems'); }} className="font-['JetBrains_Mono'] text-[11px] text-[#888888] hover:text-[#e5e2e1] transition-colors tracking-wider uppercase">
            Terms
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: WhatsApp Cloud API Data Privacy Protocol'); }} className="font-['JetBrains_Mono'] text-[11px] text-[#888888] hover:text-[#e5e2e1] transition-colors tracking-wider uppercase">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
};
