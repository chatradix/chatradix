import React, { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MetaPartnerSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeCardRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt on Partner Badge
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeCardRef.current) return;
    const rect = badgeCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    gsap.to(badgeCardRef.current, {
      rotateY: normX * 12,
      rotateX: -normY * 12,
      transformPerspective: 800,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!badgeCardRef.current) return;
    gsap.to(badgeCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  // Parallax background glow on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current, {
          y: -60,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="meta-partner"
      ref={sectionRef}
      className="mb-24 md:mb-32 border-y border-[#262626] py-24 md:py-32 bg-[#0e0e0e] relative overflow-hidden perspective-1000"
    >
      {/* Ambient Green Glow with Parallax */}
      <div 
        ref={bgGlowRef}
        className="absolute inset-0 pointer-events-none opacity-25 will-change-transform"
        style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(37, 211, 102, 0.25) 0%, transparent 70%)' }}
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

        {/* Right Partner Badge Box with 3D Tilt */}
        <div className="shrink-0 preserve-3d">
          <div 
            ref={badgeCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="border-2 border-[#25D366]/40 bg-[#25D366]/5 px-12 md:px-16 py-10 md:py-12 flex flex-col items-center gap-4 group shadow-[0_0_40px_rgba(37,211,102,0.15)] relative overflow-hidden will-change-transform"
          >
            <ShieldCheck className="w-14 h-14 md:w-16 md:h-16 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span className="font-['Hanken_Grotesk'] font-extrabold text-xl md:text-2xl text-[#e5e2e1] tracking-wider uppercase">
              META TECH PARTNER
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] tracking-[0.2em] uppercase font-semibold">
              OFFICIAL BSP INFRASTRUCTURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
