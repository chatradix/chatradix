import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';

export const MetaPartnerSection: React.FC = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  return (
    <section id="meta-partner" className="mb-24 md:mb-32 border-y border-[#262626] py-24 md:py-32 bg-[#0e0e0e] relative overflow-hidden">
      {/* Ambient Green Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(37, 211, 102, 0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">
        {/* Left Copy */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
            </span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#25D366] tracking-[0.25em] uppercase">
              /// META APPROVED ///
            </span>
          </div>

          <h2 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-6xl lg:text-[4.5rem] leading-none text-[#e5e2e1] uppercase tracking-tighter mb-6">
            VERIFIED META<br />
            PARTNER
          </h2>

          <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#888888] leading-relaxed max-w-xl">
            Operating on official WhatsApp Cloud API infrastructure. Ensuring high deliverability, zero phone number risk, and instantaneous processing speed at global scale.
          </p>
        </div>

        {/* Right Partner Badge Box */}
        <div className="shrink-0">
          <div 
            onClick={() => setShowVerifyModal(true)}
            className="border-2 border-[#25D366]/40 bg-[#25D366]/5 px-12 md:px-16 py-10 md:py-12 flex flex-col items-center gap-4 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all cursor-pointer group shadow-[0_0_40px_rgba(37,211,102,0.15)] relative overflow-hidden"
          >
            <ShieldCheck className="w-14 h-14 md:w-16 md:h-16 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span className="font-['Hanken_Grotesk'] font-extrabold text-xl md:text-2xl text-[#e5e2e1] tracking-wider uppercase">
              META TECH PARTNER
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] tracking-[0.2em] uppercase font-semibold">
              CLICK TO VERIFY CERTIFICATION
            </span>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#131313] border border-[#25D366] w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(37,211,102,0.25)]">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
              <div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] uppercase tracking-widest">OFFICIAL PARTNER CERTIFICATION</span>
                <h3 className="font-['Hanken_Grotesk'] text-2xl font-extrabold text-[#e5e2e1] uppercase">Meta Business Solution Provider</h3>
              </div>
            </div>

            <div className="space-y-4 font-['JetBrains_Mono'] text-xs text-[#c1c6d6] border-t border-[#262626] pt-6">
              <div className="flex justify-between py-2 border-b border-[#262626]/50">
                <span className="text-[#888888]">PARTNER ID</span>
                <span className="text-white font-semibold">BSP_META_9920148</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#262626]/50">
                <span className="text-[#888888]">API INFRASTRUCTURE</span>
                <span className="text-[#25D366] font-semibold">WhatsApp Cloud API v19.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#262626]/50">
                <span className="text-[#888888]">DELIVERABILITY RATE</span>
                <span className="text-white font-semibold">99.98% High Precision</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#262626]/50">
                <span className="text-[#888888]">SECURITY</span>
                <span className="text-[#25D366] font-semibold">Zero Phone Number Risk</span>
              </div>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full mt-8 bg-[#25D366] text-black font-['JetBrains_Mono'] text-xs font-bold py-4 uppercase tracking-[0.15em] hover:bg-white transition-all"
            >
              CLOSE VERIFICATION
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
