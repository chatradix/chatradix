import React, { useState } from 'react';
import { ArrowRight, X, Check } from 'lucide-react';

export const RevenueBoostSection: React.FC = () => {
  const [showTrialModal, setShowTrialModal] = useState(false);

  return (
    <section className="w-full bg-[#0e0e0e] py-24 md:py-40 border-y border-[#262626] overflow-hidden relative">
      {/* Background Accent Mesh */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 60%, #25D366 0%, transparent 60%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex flex-col items-start">
          {/* Protocol Tag */}
          <div className="font-['JetBrains_Mono'] text-xs text-[#25D366] mb-10 md:mb-12 tracking-[0.4em] uppercase font-semibold">
            /// HIGH ROI / MAXIMIZE CONVERSION / SHOPIFY ///
          </div>

          {/* Massive Stacked Headline */}
          <h2 className="font-['Hanken_Grotesk'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.82] uppercase tracking-tighter text-[#e5e2e1] mb-14 select-none">
            INSTALL <br />
            <span className="text-[#0080FB] glow-text">CHATRADIX</span><br />
            AND MAKE <br />
            REVENUE <br />
            <span className="text-[#25D366] glow-green-text">BOOST</span>
          </h2>

          {/* Bottom Right Callout Box */}
          <div className="w-full flex justify-end">
            <div className="max-w-md border-l-4 border-[#25D366] bg-[#131313] p-8 border border-[#262626] shadow-2xl">
              <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#888888] mb-8 leading-relaxed">
                Out of 100+ Brands we've onboarded, 94% noticed a measurable sales increase within their first 14 days of WhatsApp launch.
              </p>

              <button
                onClick={() => setShowTrialModal(true)}
                className="bg-[#25D366] text-black font-['JetBrains_Mono'] text-xs font-bold px-8 py-4 hover:bg-white hover:text-black transition-all flex items-center gap-3 uppercase tracking-[0.15em] group"
              >
                <span>START FREE TRIAL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial Modal */}
      {showTrialModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131313] border border-[#25D366] w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(37,211,102,0.3)]">
            <button
              onClick={() => setShowTrialModal(false)}
              className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-['JetBrains_Mono'] text-xs text-[#25D366] uppercase mb-2 tracking-widest">
              /// INSTANT ONBOARDING ///
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-3xl font-black uppercase text-[#e5e2e1] mb-4">
              Start Your 14-Day Free Trial
            </h3>
            <p className="font-['Hanken_Grotesk'] text-sm text-[#888888] mb-6 leading-relaxed">
              Connect your Shopify store in under 2 minutes with automated webhook setup. No credit card required.
            </p>

            <div className="space-y-3 font-['JetBrains_Mono'] text-xs text-[#c1c6d6] mb-8">
              <div className="flex items-center gap-2 text-[#25D366]">
                <Check className="w-4 h-4" />
                <span>Zero-Code Shopify App Store Installation</span>
              </div>
              <div className="flex items-center gap-2 text-[#25D366]">
                <Check className="w-4 h-4" />
                <span>Pre-configured Abandoned Checkout & Shipping Flows</span>
              </div>
              <div className="flex items-center gap-2 text-[#25D366]">
                <Check className="w-4 h-4" />
                <span>Official Meta WhatsApp API Connection</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Redirecting to Shopify App Store installation...');
                setShowTrialModal(false);
              }}
              className="w-full bg-[#25D366] text-black font-['JetBrains_Mono'] text-xs font-bold py-4 uppercase tracking-[0.15em] hover:bg-white transition-all"
            >
              INSTALL ON SHOPIFY NOW
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
