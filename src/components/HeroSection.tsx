import React, { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  onInitialize: () => void;
  onOpenManifesto: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onInitialize, onOpenManifesto }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="max-w-[1440px] mx-auto px-6 md:px-16 mb-24 md:mb-32 flex flex-col items-center text-center mt-20 md:mt-24 relative z-10">
      {/* Background Radial Ambient Glow */}
      <div 
        className="absolute inset-0 z-[-1] opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #0080FB 0%, transparent 65%)' }}
      />

      {/* Protocol Tag */}
      <div className="hero-anim-tag border border-[#262626] px-5 py-2 mb-8 md:mb-10 inline-flex items-center gap-3 bg-[#0e0e0e] shadow-lg">
        <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping shadow-[0_0_10px_#25D366]" />
        <span className="font-['JetBrains_Mono'] text-xs text-[#888888] tracking-[0.2em] uppercase font-medium">
          /// META / API DRIVEN / HIGH-CONVERTING FLOWS ///
        </span>
      </div>

      {/* Massive Bold Headline Stack */}
      <h1 
        ref={headlineRef}
        className="hero-anim-title font-['Hanken_Grotesk'] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-[#e5e2e1] mb-8 uppercase max-w-6xl tracking-tighter leading-[0.88] select-none"
      >
        Architect <br />
        <span className="text-[#0080FB] glow-text inline-block my-1">Intelligent</span><br />
        <span className="text-[#25D366] glow-green-text">WhatsApp Flows</span>
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
