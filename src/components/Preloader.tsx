import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to('#preloader-overlay', {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          setHidden(true);
          if (onComplete) onComplete();
        },
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      id="preloader-overlay"
      className="fixed inset-0 z-[9999] bg-[#090b10] flex flex-col items-center justify-center transition-opacity duration-700"
    >
      <div className="flex flex-col items-center gap-6">
        {/* CR Brand Logo Emblem */}
        <div className="w-16 h-16 border-2 border-[#0080FB] bg-[#0080FB]/10 flex items-center justify-center font-['Hanken_Grotesk'] font-black text-2xl text-[#0080FB] shadow-[0_0_30px_rgba(0,128,251,0.5)] animate-pulse">
          CR
        </div>

        <div className="font-['Hanken_Grotesk'] font-black text-2xl tracking-tighter text-[#e5e2e1] uppercase">
          CHATRADIX
        </div>

        {/* Porsche Style Glowing Spinner */}
        <div className="relative w-12 h-12 mt-2">
          <div className="absolute inset-0 border-2 border-[#262626] rounded-full" />
          <div className="absolute inset-0 border-2 border-[#0080FB] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#0080FB]" />
        </div>

        <span className="font-['JetBrains_Mono'] text-[10px] text-[#888888] tracking-[0.3em] uppercase mt-2">
          INITIALIZING_FLOW_ENGINE...
        </span>
      </div>
    </div>
  );
};
