import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Terminal, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ index: -1, x: 0, y: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Entry Animation
      gsap.fromTo(
        '.arch-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Deep Parallax Scrub for Background Numbers 01, 02, 03
      numberRefs.current.forEach((numEl, i) => {
        if (!numEl) return;
        gsap.to(numEl, {
          y: -40 * (i + 1),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ index, x, y });

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    gsap.to(card, {
      rotateY: normX * 10,
      rotateX: -normY * 10,
      transformPerspective: 800,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    setMousePos({ index: -1, x: 0, y: 0 });

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const steps = [
    {
      num: '01',
      title: 'ESTABLISH LINK',
      description: 'Connect your store/platform API in seconds. Seamless webhook & real-time bidirectional data sync.',
      icon: Cpu,
      meta: 'API_HOOK // 12ms',
    },
    {
      num: '02',
      title: 'DEFINE LOGIC',
      description: 'Configure flow logic with drag-and-drop triggers, customized timing & condition branch rules.',
      icon: Terminal,
      meta: 'LOGIC_ENGINE // v3',
    },
    {
      num: '03',
      title: 'EXECUTE',
      description: 'Receive customer responses in single-threaded dashboard, driving highly targeted WhatsApp conversions.',
      icon: ShieldCheck,
      meta: 'DISPATCH // 99.9%',
    },
  ];

  return (
    <section id="architecture" ref={sectionRef} className="max-w-[1440px] mx-auto px-6 md:px-16 mb-24 md:mb-32 perspective-1000">
      {/* Header Row */}
      <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#262626] pb-8 relative">
        <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-[#0080FB] shadow-[0_0_10px_#0080FB]" />
        <div>
          <h2 className="font-['Hanken_Grotesk'] font-black text-5xl md:text-7xl lg:text-[5.5rem] leading-none text-[#e5e2e1] uppercase tracking-tighter mb-4">
            ARCHITECTURE
          </h2>
          <p className="font-['JetBrains_Mono'] text-xs text-[#0080FB] uppercase tracking-[0.2em] font-semibold">
            /// WORKFLOW LOGIC / HIGH CONVERSION ///
          </p>
        </div>
        <div className="font-['JetBrains_Mono'] text-xs text-[#888888] max-w-md border-l-2 border-[#262626] pl-4 py-2 leading-relaxed">
          It's a one-stop-shop to create smart flows whether for abandoned carts or custom workflows.
        </div>
      </div>

      {/* Grid of 3 Step Cards with Spotlight and 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#262626] border border-[#262626]">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isHovered = mousePos.index === index;

          return (
            <div
              key={step.num}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              className="arch-card bg-[#0e0e0e] p-8 md:p-12 lg:p-14 hover:bg-[#131313] transition-colors duration-500 relative group cursor-pointer flex flex-col justify-between min-h-[360px] preserve-3d overflow-hidden will-change-transform shadow-xl"
            >
              {/* Spotlight radial light follower */}
              {isHovered && (
                <div
                  className="absolute pointer-events-none -inset-px opacity-70 transition-opacity duration-300 z-10"
                  style={{
                    background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 128, 251, 0.15), transparent 70%)`,
                  }}
                />
              )}

              {/* Giant Background Step Number with Deep Parallax */}
              <div
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
                className="font-['Hanken_Grotesk'] font-black text-[7rem] md:text-[8rem] leading-none text-[#1b1e26] group-hover:text-[#0080FB]/20 transition-colors absolute top-4 right-8 z-0 select-none pointer-events-none will-change-transform"
              >
                {step.num}
              </div>

              {/* Content */}
              <div className="relative z-20">
                <div className="w-12 h-12 border border-[#262626] bg-[#131313] flex items-center justify-center text-[#0080FB] group-hover:border-[#0080FB] group-hover:shadow-[0_0_15px_rgba(0,128,251,0.3)] transition-all mb-8">
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>

                <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-semibold tracking-widest uppercase mb-2">
                  {step.meta}
                </div>

                <h3 className="font-['Hanken_Grotesk'] font-extrabold text-2xl md:text-3xl text-[#e5e2e1] uppercase tracking-tight mb-4 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="font-['Hanken_Grotesk'] text-sm md:text-base text-[#888888] group-hover:text-[#c1c6d6] transition-colors leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="relative z-20 pt-6 border-t border-[#262626]/50 mt-6 flex justify-between items-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#0080FB]" />
                  STEP_{step.num} PROTOCOL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0080FB] opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#0080FB] transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
