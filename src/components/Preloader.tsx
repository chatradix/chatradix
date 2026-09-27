import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Quick smooth dismiss on site load
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
        if (onComplete) onComplete();
      }, 350);
      return () => clearTimeout(hideTimer);
    }, 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0b0d12] flex items-center justify-center pointer-events-none transition-opacity duration-300 ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Small sleek loading spinner */}
      <div className="relative w-8 h-8">
        <div className="w-8 h-8 rounded-full border-2 border-white/10" />
        <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-transparent border-t-[#0080FB] animate-spin" />
      </div>
    </div>
  );
};

