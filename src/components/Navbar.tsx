import React, { useState } from 'react';
import { Mail, Menu, X, ArrowUpRight } from 'lucide-react';
import headerLogo from '../assets/headerlogo.png';

interface NavbarProps {
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'AUTOMATIONS', id: 'flows' },
    { label: 'ARCHITECTURE', id: 'architecture' },
    { label: 'META API', id: 'meta-partner' },
    { label: 'SUPPORT', id: 'support' },
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
            src={headerLogo} 
            alt="ChatRadix" 
            className="h-8 sm:h-9 md:h-10 w-auto object-contain group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-300"
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
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0080FB] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#0080FB]" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">

          {/* Quick Support Dispatch Icon */}
          <button
            onClick={() => handleNavClick('support')}
            title="Contact Support & Onboarding"
            className="hidden sm:flex items-center justify-center w-10 h-10 border border-[#262626] hover:border-[#0080FB] text-[#e5e2e1] hover:text-[#0080FB] transition-all bg-[#131313] hover:shadow-[0_0_15px_rgba(0,128,251,0.25)] relative group"
          >
            <Mail className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0080FB] opacity-80" />
          </button>

          {/* High-Impact Creative Install CTA Button */}
          <a
            href="https://apps.shopify.com/chatradix"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 px-6 py-3 bg-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.15em] border border-[#0090ff] shadow-[0_0_20px_rgba(0,128,251,0.35)] hover:shadow-[0_0_30px_rgba(0,128,251,0.55)] hover:bg-white hover:text-[#0080FB] hover:border-white transition-all duration-300 active:scale-95 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>INSTALL APP</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </a>

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
              handleNavClick('support');
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
