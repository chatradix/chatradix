import React, { useEffect, useRef } from 'react';
import { Cpu, Terminal, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

export const ArchitectureSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arch-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'ESTABLISH LINK',
      description: 'Connect your store/platform API in seconds. Seamless webhook & data sync.',
      icon: Cpu,
    },
    {
      num: '02',
      title: 'DEFINE LOGIC',
      description: 'Configure flow logic with drag-and-drop triggers, customized timing & condition rules.',
      icon: Terminal,
    },
    {
      num: '03',
      title: 'EXECUTE',
      description: 'Receive responses in single-threaded dashboard, highly targeted WhatsApp campaigns.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="architecture" ref={sectionRef} className="max-w-[1440px] mx-auto px-6 md:px-16 mb-24 md:mb-32">
      {/* Header Row */}
      <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#262626] pb-8 relative">
        <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-[#0080FB]" />
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

      {/* Grid of 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#262626] border border-[#262626]">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.num}
              className="arch-card bg-[#0e0e0e] p-8 md:p-12 lg:p-14 hover:bg-[#131313] transition-colors duration-500 relative group cursor-pointer flex flex-col justify-between min-h-[340px]"
            >
              {/* Giant Background Step Number */}
              <div className="font-['Hanken_Grotesk'] font-black text-[7rem] md:text-[8rem] leading-none text-[#262626] group-hover:text-[#0080FB]/20 transition-colors absolute top-4 right-8 z-0 select-none">
                {step.num}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 border border-[#262626] bg-[#131313] flex items-center justify-center text-[#0080FB] group-hover:border-[#0080FB] transition-colors mb-8">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-['Hanken_Grotesk'] font-extrabold text-2xl md:text-3xl text-[#e5e2e1] uppercase tracking-tight mb-4 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="font-['Hanken_Grotesk'] text-sm md:text-base text-[#888888] group-hover:text-[#c1c6d6] transition-colors leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div className="relative z-10 pt-6 border-t border-[#262626]/50 mt-6 flex justify-between items-center">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] uppercase tracking-widest font-semibold">
                  STEP_{step.num} PROTOCOL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0080FB] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
