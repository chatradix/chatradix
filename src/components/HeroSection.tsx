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
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const titleLine3Ref = useRef<HTMLSpanElement>(null);

  // Mouse Parallax 3D & Depth Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      // Background subtle shift
      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current, {
          x: normX * 30,
          y: normY * 30,
          duration: 1.4,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

      // Background ambient light scales down
      if (bgGlowRef.current) {
        scrubTl.to(bgGlowRef.current, { y: 100, scale: 1.3, opacity: 0.05 }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden flex flex-col items-center text-center pt-8 pb-20 md:pt-12 md:pb-28 mb-24 md:mb-32 z-10 perspective-1000"
    >
      {/* Background YouTube Video */}
      <div className="absolute inset-0 z-[-2] overflow-hidden pointer-events-none select-none">
        <iframe
          src="https://www.youtube.com/embed/cUB7w5ju3ZM?autoplay=1&mute=1&loop=1&playlist=cUB7w5ju3ZM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1"
          title="Hero Background Video"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100%] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none opacity-45 mix-blend-screen scale-110 filter brightness-95 contrast-110"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
        />
        {/* Dark Vignette / Gradient overlays for contrast and edge fading */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d12]/80 via-[#0b0d12]/50 to-[#0b0d12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0b0d12_85%)]" />
      </div>

      {/* Background Radial Ambient Glow & Parallax Mesh */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 z-[-1] opacity-25 pointer-events-none will-change-transform"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(0, 128, 251, 0.45) 0%, rgba(37, 211, 102, 0.15) 35%, transparent 70%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col items-center text-center w-full relative z-10">
        {/* Massive Bold Headline Stack with Multi-Speed Parallax Lines */}
        <h1 className="hero-anim-title font-['Hanken_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-[#e5e2e1] mb-8 uppercase max-w-6xl tracking-tighter leading-[0.88] select-none">
          <span ref={titleLine1Ref} className="inline-block will-change-transform">
            Architect
          </span>
          <br />
          <span
            ref={titleLine2Ref}
            className="text-[#0080FB] glow-text inline-block my-1 will-change-transform"
          >
            Intelligent
          </span>
          <br />
          <span
            ref={titleLine3Ref}
            className="text-[#25D366] glow-green-text inline-block will-change-transform"
          >
            WhatsApp Flows
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-anim-sub font-['Hanken_Grotesk'] text-lg md:text-xl text-[#888888] max-w-2xl mb-12 mx-auto leading-relaxed">
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
    </section>
  );
};
