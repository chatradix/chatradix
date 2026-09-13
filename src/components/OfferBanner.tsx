import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';

interface OfferBannerProps {
  onNotify: (msg: string) => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ onNotify }) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const offerCode = 'CHATRADIX60FREE';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerCode);
    setCopiedCode(true);
    onNotify('Offer voucher key CHATRADIX60FREE copied!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section id="offer" className="mb-24 md:mb-32 w-full bg-[#0075FF] text-white py-20 md:py-28 relative overflow-hidden">
      {/* Radial Gradient Subtle Glow */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #ffffff 0%, transparent 60%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Top Protocol Pill */}
        <div className="font-['JetBrains_Mono'] text-xs text-white/80 font-semibold tracking-[0.25em] uppercase mb-8">
          /// SPECIAL INTRO OFFER / 2026 ///
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Headline Column */}
          <div className="lg:col-span-8">
            <h2 className="font-['Hanken_Grotesk'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.88] uppercase tracking-tighter select-none">
              2 MONTHS <br />
              <span className="opacity-60">FREE</span> FOR <br />
              ALL USERS
            </h2>
          </div>

          {/* Right Copy & CTA */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
            <div className="border-l-2 border-white/40 pl-6 lg:pl-8 py-3 mb-10 max-w-md">
              <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-white/90 leading-relaxed">
                Lifetime deployment retention access. Tax bill and historical data sync stored for 90 days. Claim before offer expires.
              </p>
            </div>

            <button
              onClick={() => setShowOfferModal(true)}
              className="bg-[#0b0d12] text-white border border-black font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:bg-white hover:text-[#0075FF] transition-all duration-300 active:scale-95 inline-flex items-center gap-4 justify-center tracking-[0.2em] rounded-none group shadow-2xl"
            >
              <span>CLAIM OFFER</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Claim Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131313] border border-[#0075FF] text-white w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(0,117,255,0.4)]">
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-['JetBrains_Mono'] text-xs text-[#0075FF] uppercase mb-2 tracking-[0.2em]">
              /// VOUCHER KEY // 60-DAY ACCESS ///
            </div>
            <h3 className="font-['Hanken_Grotesk'] text-3xl font-black uppercase tracking-tight text-[#e5e2e1] mb-4">
              Claim Your 2 Months Free
            </h3>
            <p className="font-['Hanken_Grotesk'] text-sm text-[#888888] mb-6 leading-relaxed">
              Use this voucher key during your WhatsApp flow app activation to claim 60 days complimentary full enterprise access.
            </p>

            <div className="bg-[#0e0e0e] border border-[#262626] p-5 flex items-center justify-between mb-8">
              <span className="font-['JetBrains_Mono'] text-xl font-bold text-[#25D366] tracking-wider">
                {offerCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-[#0075FF] text-white px-4 py-2 font-['JetBrains_Mono'] text-xs font-semibold hover:bg-white hover:text-[#0075FF] transition-colors flex items-center gap-2"
              >
                {copiedCode ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'COPIED' : 'COPY KEY'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                handleCopyCode();
                setShowOfferModal(false);
              }}
              className="w-full bg-[#0075FF] text-white font-['JetBrains_Mono'] text-xs font-bold py-4 uppercase tracking-[0.15em] hover:bg-white hover:text-[#0075FF] transition-all"
            >
              COPY KEY & PROCEED TO ACTIVATION
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
