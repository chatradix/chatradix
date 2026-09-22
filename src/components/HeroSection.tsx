import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, ShieldCheck, Zap, TrendingUp, Sparkles } from 'lucide-react';
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
  const floatBadgeLeftRef = useRef<HTMLDivElement>(null);
  const floatBadgeRightRef = useRef<HTMLDivElement>(null);
  const floatingHudRef = useRef<HTMLDivElement>(null);

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

      // Floating telemetry badges (opposite directional depth)
      if (floatBadgeLeftRef.current) {
        gsap.to(floatBadgeLeftRef.current, {
          x: -normX * 25,
          y: -normY * 20,
          rotateZ: -normX * 3,
          duration: 1.1,
          ease: 'power2.out',
        });
      }

      if (floatBadgeRightRef.current) {
        gsap.to(floatBadgeRightRef.current, {
          x: normX * 35,
          y: normY * 25,
          rotateZ: normX * 4,
          duration: 1.2,
          ease: 'power2.out',
        });
      }

      if (floatingHudRef.current) {
        gsap.to(floatingHudRef.current, {
          x: normX * 15,
          y: normY * 15,
          duration: 0.9,
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
        '.hero-anim-tag',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(
        '.hero-anim-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo(
        '.hero-anim-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(
        '.hero-anim-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo(
        '.hero-float-badge',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.7)', delay: 0.9 }
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

      // Parallax float badges drift away
      if (floatBadgeLeftRef.current) {
        scrubTl.to(floatBadgeLeftRef.current, { y: -160, x: -50, opacity: 0 }, 0);
      }
      if (floatBadgeRightRef.current) {
        scrubTl.to(floatBadgeRightRef.current, { y: -190, x: 60, opacity: 0 }, 0);
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
      className="max-w-[1440px] mx-auto px-6 md:px-16 mb-24 md:mb-32 flex flex-col items-center text-center mt-16 md:mt-24 relative z-10 perspective-1000"
    >
      {/* Background Radial Ambient Glow & Parallax Mesh */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 z-[-1] opacity-25 pointer-events-none will-change-transform"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(0, 128, 251, 0.45) 0%, rgba(37, 211, 102, 0.15) 35%, transparent 70%)',
        }}
      />

      {/* Floating Interactive Telemetry Badge: LEFT */}
      <div
        ref={floatBadgeLeftRef}
        className="hero-float-badge hidden xl:flex absolute left-8 top-32 z-20 bg-[#0e0e0e]/90 border border-[#0080FB]/40 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(0,128,251,0.2)] flex-col gap-2 text-left pointer-events-none will-change-transform"
        style={{ width: '240px' }}
      >
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0080FB]" />
            CONVERSION RECOVERY
          </span>
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        </div>
        <div className="font-['Hanken_Grotesk'] font-black text-2xl text-white">
          +34.8% <span className="text-xs font-normal text-[#888888]">Lift</span>
        </div>
        <div className="font-['JetBrains_Mono'] text-[10px] text-[#888888]">
          Abandoned Cart Intercept
        </div>
      </div>

      {/* Floating Interactive Telemetry Badge: RIGHT */}
      <div
        ref={floatBadgeRightRef}
        className="hero-float-badge hidden xl:flex absolute right-8 top-44 z-20 bg-[#0e0e0e]/90 border border-[#25D366]/40 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(37,211,102,0.2)] flex-col gap-2 text-left pointer-events-none will-change-transform"
        style={{ width: '250px' }}
      >
        <div className="flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
            META CLOUD API
          </span>
          <span className="font-['JetBrains_Mono'] text-[9px] text-[#25D366] bg-[#25D366]/10 px-1.5 py-0.5 border border-[#25D366]/30">
            v19.0
          </span>
        </div>
        <div className="font-['Hanken_Grotesk'] font-black text-2xl text-white">
          18ms <span className="text-xs font-normal text-[#888888]">Latency</span>
        </div>
        <div className="font-['JetBrains_Mono'] text-[10px] text-[#888888]">
          Official BSP Infrastructure
        </div>
      </div>

      {/* Protocol Tag */}
      <div
        ref={floatingHudRef}
        className="hero-anim-tag border border-[#262626] px-5 py-2 mb-8 md:mb-10 inline-flex items-center gap-3 bg-[#0e0e0e]/90 backdrop-blur-sm shadow-xl will-change-transform"
      >
        <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping shadow-[0_0_10px_#25D366]" />
        <span className="font-['JetBrains_Mono'] text-xs text-[#888888] tracking-[0.2em] uppercase font-medium">
          /// META / API DRIVEN / HIGH-CONVERTING FLOWS ///
        </span>
      </div>

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
    </section>
  );
};
