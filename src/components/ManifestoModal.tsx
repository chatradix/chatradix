import React from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="bg-[#131313] border border-[#0080FB] text-[#e5e2e1] w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-12 relative shadow-[0_0_50px_rgba(0,128,251,0.3)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white border border-[#262626] hover:border-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-[#0080FB]" />
          <span className="font-['JetBrains_Mono'] text-xs text-[#0080FB] tracking-[0.2em] uppercase font-semibold">
            CHATRADIX MANIFESTO // V1.0
          </span>
        </div>

        <h2 className="font-['Hanken_Grotesk'] font-black text-4xl md:text-5xl uppercase tracking-tight mb-8 text-white">
          High-Precision Swiss Architecture for Conversational Commerce
        </h2>

        {/* Manifesto Content */}
        <div className="space-y-6 font-['Hanken_Grotesk'] text-base text-[#c1c6d6] leading-relaxed">
          <div className="border-l-2 border-[#0080FB] pl-6 py-2 bg-[#0e0e0e] border-y border-r border-[#262626]">
            <p className="font-['JetBrains_Mono'] text-xs text-[#25D366] uppercase mb-1">AXIOM 01: INTENTIONAL FRICTION</p>
            <p className="text-white font-semibold">
              We reject chaotic web clutter. By utilizing compound grids, strict monospace alignment, and extreme typography contrast, we guide customer attention directly to high-converting actions.
            </p>
          </div>

          <div className="border-l-2 border-[#25D366] pl-6 py-2 bg-[#0e0e0e] border-y border-r border-[#262626]">
            <p className="font-['JetBrains_Mono'] text-xs text-[#25D366] uppercase mb-1">AXIOM 02: ZERO DELAY LOGISTICS</p>
            <p className="text-white font-semibold">
              Automated notifications must be instant. Operating natively on Meta's WhatsApp Cloud API, our flow engine dispatches checkout recovery messages within milliseconds of Shopify event emission.
            </p>
          </div>

          <div className="border-l-2 border-[#0080FB] pl-6 py-2 bg-[#0e0e0e] border-y border-r border-[#262626]">
            <p className="font-['JetBrains_Mono'] text-xs text-[#25D366] uppercase mb-1">AXIOM 03: EMPIRICAL DELTA</p>
            <p className="text-white font-semibold">
              Every message payload is mathematically optimized for ROI. We measure success strictly through net revenue lift, support ticket reduction, and checkout conversion velocity.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-10 bg-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-semibold py-4 uppercase tracking-[0.15em] hover:bg-white hover:text-[#0080FB] transition-all"
        >
          ACKNOWLEDGE & CLOSE MANIFESTO
        </button>
      </div>
    </div>
  );
};
