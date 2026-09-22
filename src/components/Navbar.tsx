import React, { useState } from 'react';
import { Mail, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'FEATURES', id: 'flows' },
    { label: 'ATTRIBUTES', id: 'attributes' },
    { label: 'ARCHITECTURE', id: 'architecture' },
    { label: 'CONTACT US', id: 'support' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b0d12]/90 backdrop-blur-md border-b border-[#262626]">
      <div className="flex justify-between items-center h-20 px-6 md:px-16 w-full mx-auto max-w-[1440px]">
        {/* Brand Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center group py-1"
          aria-label="ChatRadix"
        >
          <img 
            src="/logo.svg" 
            alt="ChatRadix Logo" 
            className="h-10 sm:h-11 md:h-12 w-auto object-contain group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.id)}
              className="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-[#888888] hover:text-[#0080FB] transition-colors py-1 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0080FB] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenTerminal}
            title="Open Support Terminal"
            className="hidden sm:flex items-center justify-center w-10 h-10 border border-[#262626] hover:border-[#0080FB] text-[#e5e2e1] hover:text-[#0080FB] transition-colors bg-[#131313]"
          >
            <Mail className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleNavClick('offer')}
            className="hidden sm:block font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.15em] text-[#e5e2e1] hover:text-[#0080FB] px-4 py-2 transition-colors"
          >
            LOG IN
          </button>

          <button
            onClick={() => handleNavClick('offer')}
            className="bg-[#0080FB] border border-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.15em] px-6 py-3 hover:bg-white hover:text-[#0080FB] transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(0,128,251,0.3)]"
          >
            <span>TRY FOR FREE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 border border-[#262626] text-[#e5e2e1]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e0e] border-b border-[#262626] px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.id)}
              className="font-['JetBrains_Mono'] text-sm uppercase tracking-[0.15em] text-[#c1c6d6] hover:text-[#0080FB] py-2 text-left border-b border-[#262626]/50"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTerminal();
            }}
            className="flex items-center gap-3 font-['JetBrains_Mono'] text-sm uppercase tracking-[0.15em] text-[#0080FB] py-2"
          >
            <Mail className="w-4 h-4" />
            <span>CONTACT US</span>
          </button>
        </div>
      )}
    </header>
  );
};
