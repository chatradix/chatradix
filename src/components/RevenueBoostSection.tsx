import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, Check, TrendingUp, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RevenueBoostSection: React.FC = () => {
  const [showTrialModal, setShowTrialModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const line5Ref = useRef<HTMLSpanElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const floatBadge1 = useRef<HTMLDivElement>(null);
  const floatBadge2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      if (line1Ref.current) tl.to(line1Ref.current, { x: 50, ease: 'none' }, 0);
      if (line2Ref.current) tl.to(line2Ref.current, { x: -40, ease: 'none' }, 0);
      if (line3Ref.current) tl.to(line3Ref.current, { x: 30, ease: 'none' }, 0);
      if (line4Ref.current) tl.to(line4Ref.current, { x: -50, ease: 'none' }, 0);
      if (line5Ref.current) tl.to(line5Ref.current, { x: 40, scale: 1.05, ease: 'none' }, 0);

      if (calloutRef.current) tl.to(calloutRef.current, { y: -40, ease: 'none' }, 0);
      if (floatBadge1.current) tl.to(floatBadge1.current, { y: -100, x: -30, ease: 'none' }, 0);
      if (floatBadge2.current) tl.to(floatBadge2.current, { y: -80, x: 40, ease: 'none' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0e0e0e] py-24 md:py-40 border-y border-[#262626] overflow-hidden relative perspective-1000"
    >
      {/* Background Accent Mesh */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 60%, rgba(37, 211, 102, 0.3) 0%, transparent 60%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        <div className="flex flex-col items-start relative">
          {/* Floating Metric Badge 1 */}
          <div
            ref={floatBadge1}
            className="hidden lg:flex absolute top-10 right-12 z-20 bg-[#131313]/95 border border-[#25D366]/40 px-4 py-2.5 items-center gap-2.5 shadow-[0_0_25px_rgba(37,211,102,0.2)] pointer-events-none will-change-transform"
          >
            <TrendingUp className="w-4 h-4 text-[#25D366]" />
            <span className="font-['JetBrains_Mono'] text-xs text-white font-bold tracking-wider">
              94% BRANDS SEE 14-DAY BOOST
            </span>
          </div>

          {/* Floating Metric Badge 2 */}
          <div
            ref={floatBadge2}
            className="hidden lg:flex absolute bottom-44 right-1/3 z-20 bg-[#131313]/95 border border-[#0080FB]/40 px-4 py-2.5 items-center gap-2.5 shadow-[0_0_25px_rgba(0,128,251,0.2)] pointer-events-none will-change-transform"
          >
            <ShieldCheck className="w-4 h-4 text-[#0080FB]" />
            <span className="font-['JetBrains_Mono'] text-xs text-white font-bold tracking-wider">
              99.98% OFFICIAL DELIVERABILITY
            </span>
          </div>

          {/* Protocol Tag */}
          <div className="font-['JetBrains_Mono'] text-xs text-[#25D366] mb-10 md:mb-12 tracking-[0.4em] uppercase font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>/// HIGH ROI / MAXIMIZE CONVERSION / SHOPIFY ///</span>
          </div>

          {/* Massive Stacked Headline with Kinetic Parallax Lines */}
          <h2 className="font-['Hanken_Grotesk'] font-black text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11.5rem] leading-[0.82] uppercase tracking-tighter text-[#e5e2e1] mb-14 select-none">
            <span ref={line1Ref} className="inline-block will-change-transform">
              INSTALL
            </span>{' '}
            <br />
            <span
              ref={line2Ref}
              className="text-[#0080FB] glow-text inline-block will-change-transform"
            >
              CHATRADIX
            </span>
            <br />
            <span ref={line3Ref} className="inline-block will-change-transform">
              AND MAKE
            </span>{' '}
            <br />
            <span ref={line4Ref} className="inline-block will-change-transform">
              REVENUE
            </span>{' '}
            <br />
            <span
              ref={line5Ref}
              className="text-[#25D366] glow-green-text inline-block will-change-transform"
            >
              BOOST
            </span>
          </h2>

          {/* Bottom Right Callout Box with Parallax */}
          <div className="w-full flex justify-end">
            <div
              ref={calloutRef}
              className="max-w-md border-l-4 border-[#25D366] bg-[#131313] p-8 border border-[#262626] shadow-2xl will-change-transform hover:border-[#25D366]/60 transition-colors"
            >
              <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#888888] mb-8 leading-relaxed">
                Out of 100+ Brands we've onboarded, 94% noticed a measurable sales increase within their first 14 days of WhatsApp launch.
              </p>

              <button
                onClick={() => setShowTrialModal(true)}
                className="bg-[#25D366] text-black font-['JetBrains_Mono'] text-xs font-bold px-8 py-4 hover:bg-white hover:text-black transition-all flex items-center gap-3 uppercase tracking-[0.15em] group shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
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
