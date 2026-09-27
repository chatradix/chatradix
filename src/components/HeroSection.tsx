import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBgVideo from '../assets/videos/bg-video-new.mp4';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);

  // GSAP ScrollTrigger Multi-Speed Parallax Scrub
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Lightweight Parallax Scrub on Scroll
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Split scrub velocities on headline stack
      if (titleLine1Ref.current) {
        scrubTl.to(titleLine1Ref.current, { y: -60, opacity: 0.3, letterSpacing: '0.04em' }, 0);
      }
      if (titleLine2Ref.current) {
        scrubTl.to(titleLine2Ref.current, { y: -100, scale: 0.94, opacity: 0.15 }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden flex flex-col items-center justify-center text-center py-16 md:py-24 z-10 perspective-1000"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-[-2] overflow-hidden pointer-events-none select-none">
        <video
          ref={(el) => {
            if (el) {
              el.defaultMuted = true;
              el.muted = true;
            }
          }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => ScrollTrigger.refresh()}
          className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
        >
          <source src={heroBgVideo} type="video/mp4" />
        </video>
        {/* Soft dark vignette so text remains crisp and edges blend into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/80 via-transparent to-[#0b0d12] pointer-events-none" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 flex flex-col items-center justify-center text-center w-full relative z-10 my-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative py-6 md:py-10">
          {/* Exact 2 Lines Headline (Increased size, no glow) */}
          <h1 className="font-black-ops text-[clamp(2.2rem,6.8vw,7.2rem)] text-white mb-4 sm:mb-5 uppercase max-w-full tracking-tight leading-[1.04] select-none">
            <span ref={titleLine1Ref} className="inline-block whitespace-nowrap will-change-transform">
              <span>OFFICIAL</span>{' '}
              <span className="text-[#0080FB]">
                WHATSAPP
              </span>
            </span>
            <br />
            <span
              ref={titleLine2Ref}
              className="text-[#25D366] inline-block whitespace-nowrap will-change-transform mt-1 sm:mt-2"
            >
              AUTOMATION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Hanken_Grotesk'] text-base sm:text-lg md:text-xl text-[#e5e2e1] max-w-3xl mb-12 sm:mb-16 mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Automate your Shopify store with Meta's official WhatsApp Business Cloud API. Recover abandoned checkouts, verify COD orders with instant two-way tags, and broadcast 10-card product carousels with zero phone ban risk.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center w-full sm:w-auto">
            <a
              href="https://apps.shopify.com/chatradix"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0080FB] border border-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:bg-white hover:text-[#0080FB] transition-all duration-300 active:scale-95 inline-flex items-center gap-3 justify-center tracking-[0.15em] rounded-none group shadow-[0_0_30px_rgba(0,128,251,0.35)]"
            >
              <span>INSTALL ON SHOPIFY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('flows');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-[#262626] bg-[#0e0e0e] text-[#e5e2e1] font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:border-[#0080FB] hover:text-[#0080FB] hover:bg-[#1c1b1b] transition-all duration-300 active:scale-95 inline-flex items-center gap-3 justify-center tracking-[0.15em] rounded-none"
            >
              <Calendar className="w-4 h-4 text-[#0080FB]" />
              <span>EXPLORE AUTOMATIONS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
