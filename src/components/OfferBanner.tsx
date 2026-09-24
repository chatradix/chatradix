import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Copy, Gift } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface OfferBannerProps {
  onNotify: (msg: string) => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ onNotify }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const cardCtaRef = useRef<HTMLDivElement>(null);

  const offerCode = 'CHATRADIX60FREE';

  useEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      // Split kinetic typography parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      if (line1Ref.current) {
        tl.to(line1Ref.current, { x: 40, ease: 'none' }, 0);
      }
      if (line2Ref.current) {
        tl.to(line2Ref.current, { x: -30, opacity: 0.9, ease: 'none' }, 0);
      }
      if (line3Ref.current) {
        tl.to(line3Ref.current, { x: 30, ease: 'none' }, 0);
      }
      if (cardCtaRef.current) {
        tl.to(cardCtaRef.current, { y: -30, ease: 'none' }, 0);
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerCode);
    setCopiedCode(true);
    onNotify('Offer voucher key CHATRADIX60FREE copied!');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section
      id="offer"
      ref={bannerRef}
      className="mb-24 md:mb-32 w-full bg-[#0075FF] text-white py-20 md:py-28 relative overflow-hidden perspective-1000"
    >
      {/* Radial Gradient Subtle Glow */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #ffffff 0%, transparent 65%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Top Protocol Pill */}
        <div className="font-['JetBrains_Mono'] text-xs text-white/90 font-semibold tracking-[0.25em] uppercase mb-8 flex items-center gap-2">
          <Gift className="w-4 h-4 text-white" />
          <span>/// SPECIAL INTRO OFFER / 2026 ///</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Headline Column with Kinetic Parallax */}
          <div className="lg:col-span-8">
            <h2 className="font-['Hanken_Grotesk'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.88] uppercase tracking-tighter select-none">
              <span ref={line1Ref} className="inline-block will-change-transform">
                2 MONTHS
              </span>
              <br />
              <span ref={line2Ref} className="opacity-60 inline-block will-change-transform text-[#e5e2e1]">
                FREE
              </span>{' '}
              FOR <br />
              <span ref={line3Ref} className="inline-block will-change-transform text-white">
                ALL USERS
              </span>
            </h2>
          </div>

          {/* Right Copy & CTA */}
          <div ref={cardCtaRef} className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center will-change-transform">
            <div className="border-l-2 border-white/40 pl-6 lg:pl-8 py-3 mb-10 max-w-md bg-white/5 backdrop-blur-sm">
              <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-white/90 leading-relaxed">
                Lifetime deployment retention access. Tax bill and historical data sync stored for 90 days. Claim before offer expires.
              </p>
            </div>

            <button
              onClick={handleCopyCode}
              className="bg-[#0b0d12] text-white border border-black font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:bg-white hover:text-[#0075FF] transition-all duration-300 active:scale-95 inline-flex items-center gap-4 justify-center tracking-[0.2em] rounded-none group shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              <span>{copiedCode ? 'CODE COPIED: CHATRADIX60FREE' : 'CLAIM OFFER (CODE: CHATRADIX60FREE)'}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
