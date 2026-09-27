import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onInitialize: () => void;
  onOpenManifesto: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onInitialize, onOpenManifesto }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);

  // GSAP ScrollTrigger Multi-Speed Parallax Scrub
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Entry Animation
      gsap.fromTo(
        '.hero-anim-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.hero-anim-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(
        '.hero-anim-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );

      // Parallax Scrub on Scroll
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
        scrubTl.to(titleLine2Ref.current, { y: -90, scale: 0.94, opacity: 0.2 }, 0);
      }
      if (titleLine3Ref.current) {
        scrubTl.to(titleLine3Ref.current, { y: -120, opacity: 0.15 }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden flex flex-col items-center text-center pt-8 pb-20 md:pt-12 md:pb-28 z-10 perspective-1000"
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
          className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
        >
          <source src="./bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 flex flex-col items-center text-center w-full relative z-10">
        {/* Glassmorphic Container for Hero Text & Actions */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 md:px-16 py-10 sm:py-14 md:py-16 bg-[#080a0f]/75 backdrop-blur-xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] relative">
          {/* Subtle Cyber Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#0080FB]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0080FB]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#0080FB]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#0080FB]" />

          {/* Massive Bold Headline Stack with Multi-Speed Parallax Lines */}
          <h1 className="hero-anim-title font-['Hanken_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white mb-8 uppercase max-w-6xl tracking-tighter leading-[0.88] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            <span ref={titleLine1Ref} className="inline-block will-change-transform">
              Architect
            </span>
            <br />
            <span
              ref={titleLine2Ref}
              className="text-[#0080FB] glow-text inline-block my-1 will-change-transform drop-shadow-[0_0_30px_rgba(0,128,251,0.5)]"
            >
              Intelligent
            </span>
            <br />
            <span
              ref={titleLine3Ref}
              className="text-[#25D366] glow-green-text inline-block will-change-transform drop-shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              WhatsApp Flows
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-anim-sub font-['Hanken_Grotesk'] text-base sm:text-lg md:text-xl text-[#e5e2e1] max-w-3xl mb-12 mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-normal">
            Freedom is a luxury modern brand line needs. Deploy conversion-driven e-commerce journeys directly inside WhatsApp with native custom integration for Shopify/Shopline.
          </p>

          {/* Action Buttons */}
          <div className="hero-anim-cta flex flex-col sm:flex-row gap-5 md:gap-6 justify-center w-full sm:w-auto">
            <button
              onClick={onInitialize}
              className="bg-[#0080FB] border border-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:bg-white hover:text-[#0080FB] transition-all duration-300 active:scale-95 inline-flex items-center gap-3 justify-center tracking-[0.15em] rounded-none group shadow-[0_0_30px_rgba(0,128,251,0.35)]"
            >
              <span>GET STARTED NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenManifesto}
              className="border border-[#262626] bg-[#0e0e0e] text-[#e5e2e1] font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:border-[#0080FB] hover:text-[#0080FB] hover:bg-[#1c1b1b] transition-all duration-300 active:scale-95 inline-flex items-center gap-3 justify-center tracking-[0.15em] rounded-none"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A DEMO</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
