import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Package, 
  ArrowRight, 
  CheckCheck, 
  Lock, 
  Phone, 
  Video, 
  MoreVertical, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Tag,
  Clock,
  ExternalLink,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UltimateFlowsProps {
  onNotify: (msg: string) => void;
}

export const UltimateFlows: React.FC<UltimateFlowsProps> = ({ onNotify }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Interactive Simulator States
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [checkoutRecovered, setCheckoutRecovered] = useState<boolean>(false);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // 3 Rich Carousel Items for Slide 3
  const carouselProducts = [
    {
      id: 'p1',
      title: 'Linen Overshirt',
      category: 'SUMMER ESSENTIALS',
      price: '$49.00',
      tag: 'NEW ARRIVAL',
      desc: '100% French linen weave with relaxed tailoring.',
      accent: '#25D366'
    },
    {
      id: 'p2',
      title: 'Oxford Cotton Shirt',
      category: 'CORE CLASSICS',
      price: '$55.00',
      tag: 'BESTSELLER',
      desc: 'Heavyweight combed organic cotton, bespoke cut.',
      accent: '#0080FB'
    },
    {
      id: 'p3',
      title: 'Canvas Weekender Bag',
      category: 'TRAVEL & GEAR',
      price: '$89.00',
      tag: 'LIMITED DROP',
      desc: 'Waxed waterproof canvas with solid brass clips.',
      accent: '#f59e0b'
    }
  ];

  // Jump smoothly to slide
  const handleJumpToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(2, index));
    setActiveSlide(clampedIndex);
    if (!containerRef.current) return;
    const st = ScrollTrigger.getById('flows-horizontal-trigger');
    if (st) {
      const targetScroll = st.start + (clampedIndex / 2) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // GSAP Horizontal Parallax Scrub with Lenis harmony & Multi-Layer Depth
  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Refresh ScrollTrigger once fonts and video dimensions settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      // Master horizontal pinned track
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          id: 'flows-horizontal-trigger',
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const idx = Math.min(2, Math.max(0, Math.round(self.progress * 2)));
            setActiveSlide(idx);
          },
        },
      });

      horizontalTl.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
      });

      // Internal Multi-layer Parallax Shift on Watermarks
      gsap.to('.card-watermark', {
        x: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1.2,
        },
      });

      // Internal Multi-layer Parallax Shift on Visual Panels
      gsap.to('.card-visual-panel', {
        x: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1.4,
        },
      });
    }, container);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const flowTabs = [
    { number: '01', title: 'ORDER CONFIRMATION' },
    { number: '02', title: 'CHECKOUT RECOVERY' },
    { number: '03', title: 'PRODUCT CAROUSEL' }
  ];

  return (
    <section
      id="flows"
      className="relative w-full bg-[#06080d] border-y border-[#151c28] overflow-hidden select-none"
    >
      {/* Inner Pin Container - GSAP pins this inner wrapper so root section is never reparented */}
      <div ref={containerRef} className="w-full relative">
        {/* Pinned Full Viewport Container - Generous Top and Bottom Padding & Luxury Breathing Room */}
        <div className="w-full h-screen min-h-[780px] max-h-[1080px] flex flex-col justify-between relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        
        {/* Consistent Electric Blue Ambient Backlight */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] pointer-events-none rounded-full blur-[200px] opacity-20 transition-all duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(0,128,251,0.55) 0%, rgba(0,80,200,0.18) 50%, transparent 70%)'
          }}
        />

        {/* Ambient Subtle Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* ==============================================================
            TOP CONTROL BAR: Header & Tab Switcher (Prominent & Premium)
        ============================================================== */}
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 md:px-12 shrink-0 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-8">
          
          {/* Header Title Stack - Large & Premium Authority */}
          <div className="border-l-4 border-[#0080FB] pl-3.5 sm:pl-5">
            <div className="flex items-center gap-3.5">
              <h2 className="font-['Hanken_Grotesk'] font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none text-white">
                FLAGSHIP <span className="text-[#0080FB]">FLOWS</span>
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0080FB]/15 border border-[#0080FB]/40 text-[10px] font-['JetBrains_Mono'] text-[#0080FB] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                <span>3 CORE ENGINES</span>
              </span>
            </div>
            <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] tracking-[0.25em] uppercase font-bold mt-1.5">
              // HIGH-CONVERTING WHATSAPP COMMERCE ARCHITECTURE
            </div>
          </div>

          {/* Interactive Navigation Pills & Prev/Next Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Prev Button */}
            <button
              onClick={() => handleJumpToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="w-8 h-8 rounded-lg border border-[#20293a] bg-[#0b1018]/90 text-white flex items-center justify-center hover:border-[#0080FB] hover:text-[#0080FB] disabled:opacity-20 disabled:hover:border-[#20293a] disabled:hover:text-white transition-all shadow-sm"
              aria-label="Previous Flow"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pill Tabs */}
            <div className="flex items-center gap-1 bg-[#0a0e16]/95 border border-[#1b2333] p-1 rounded-xl backdrop-blur-md shadow-inner">
              {flowTabs.map((tab, idx) => (
                <button
                  key={tab.number}
                  onClick={() => handleJumpToSlide(idx)}
                  className={`px-3 py-1 font-['JetBrains_Mono'] text-xs font-bold transition-all flex items-center gap-2 rounded-lg ${
                    activeSlide === idx
                      ? 'bg-[#0080FB] text-white shadow-[0_0_15px_rgba(0,128,251,0.5)]'
                      : 'text-[#63728f] hover:text-white hover:bg-[#141b27]'
                  }`}
                >
                  <span className="opacity-90">{tab.number}</span>
                  <span className="hidden md:inline-block text-[11px]">{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handleJumpToSlide(activeSlide + 1)}
              disabled={activeSlide === 2}
              className="w-8 h-8 rounded-lg border border-[#20293a] bg-[#0b1018]/90 text-white flex items-center justify-center hover:border-[#0080FB] hover:text-[#0080FB] disabled:opacity-20 disabled:hover:border-[#20293a] disabled:hover:text-white transition-all shadow-sm"
              aria-label="Next Flow"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ==============================================================
            HORIZONTAL PARALLAX TRACK: 3 Flagship Viewport Slides
        ============================================================== */}
        <div
          ref={trackRef}
          className="flex flex-nowrap h-full items-center will-change-transform z-10 my-auto py-2"
          style={{ width: '300vw' }}
        >
          {/* ==============================================================
              SLIDE 1: TWO-WAY ORDER CONFIRMATION & COD VERIFICATION
          ============================================================== */}
          <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 relative">
            <div className="w-full max-w-[1360px] h-[calc(100vh-320px)] min-h-[420px] max-h-[520px] relative my-auto">
              
              {/* Grand Monolithic Glass Card */}
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 border border-[#0080FB]/35 hover:border-[#0080FB]/60 bg-gradient-to-b from-[#0b1220]/95 via-[#070b14]/95 to-[#05070d]/98 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,128,251,0.12)] rounded-2xl sm:rounded-3xl overflow-hidden relative">
                
                {/* Glowing Blue Top Neon Rail */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-90" />

                {/* LEFT COLUMN: Specifications & Value Proposition */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#152033] flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Architectural Huge Watermark (Parallax Target) */}
                  <span className="card-watermark font-['Hanken_Grotesk'] font-black text-[9rem] sm:text-[11rem] md:text-[13rem] leading-none text-[#0d1627]/80 select-none pointer-events-none absolute -bottom-8 -right-6 z-0 will-change-transform">
                    01
                  </span>

                  {/* Header Meta Badge Row */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl border border-[#0080FB]/40 bg-[#0080FB]/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,128,251,0.25)]">
                        <ShieldCheck className="w-5 h-5 text-[#0080FB]" />
                      </div>
                      <div>
                        <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold uppercase tracking-widest flex items-center gap-2">
                          <span>01 // CONFIRMATION ENGINE</span>
                        </div>
                        <div className="font-['JetBrains_Mono'] text-[10px] text-[#63728f] uppercase">
                          SHOPIFY.ORDERS_CREATE
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a1220] border border-[#0080FB]/30 font-['JetBrains_Mono'] text-xs text-[#8695b0] uppercase font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                      <span>Sub-second: 12ms</span>
                    </div>
                  </div>

                  {/* Headline & Narrative */}
                  <div className="my-auto relative z-10 py-1.5 sm:py-2">
                    <h3 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl lg:text-[2.25rem] text-white uppercase tracking-tight leading-[1.02] mb-2 sm:mb-2.5">
                      INSTANT 2-WAY <br />
                      <span className="text-[#0080FB]">
                        COD VERIFICATION
                      </span>
                    </h3>

                    <p className="font-['Hanken_Grotesk'] text-xs sm:text-sm text-[#9aa5bb] leading-relaxed max-w-xl mb-3 font-normal">
                      Eliminate fake Cash on Delivery (COD) orders and prevent shipping returns. Customers receive an instant summary on WhatsApp with 2-way Quick Reply buttons that immediately sync confirmed order tags to your Shopify admin.
                    </p>

                    {/* Live Synchronized Tagging Pipeline */}
                    <div className="bg-[#090e17] border border-[#1b263b] rounded-xl p-2.5 mb-3">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>LIVE TWO-WAY SYNC PIPELINE</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-['JetBrains_Mono']">
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-white">
                          Shopify Order
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-[#0080FB]">
                          WhatsApp 2-Way Quick Reply
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#0080FB]/15 border border-[#0080FB]/50 text-[#0080FB] font-bold">
                          Tag: ✅ order-confirmed
                        </span>
                      </div>
                    </div>

                    {/* KPI Capability Pills */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0080FB]/10 border border-[#0080FB]/30 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>2-WAY SHOPIFY ORDER TAGS</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1624] border border-[#1b273d] text-xs font-['JetBrains_Mono'] text-[#cbd5e1] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>DUPLICATE ORDER SHIELD</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-[#152033] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                    <div className="border-l-2 border-[#0080FB] pl-3 py-0.5">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#55637d] uppercase tracking-wider font-semibold">
                        EVENT TRIGGER PROTOCOL
                      </div>
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB] uppercase tracking-wide">
                        <code>SHOPIFY.ORDERS_CREATE</code>
                      </div>
                    </div>

                    <a
                      href="https://apps.shopify.com/chatradix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-6 py-3 tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,128,251,0.35)] active:scale-95 rounded-lg"
                    >
                      <span>INSTALL ON SHOPIFY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* RIGHT COLUMN: Meta Official Cloud API Interactive Template Console */}
                <div className="card-visual-panel lg:col-span-5 bg-[#060a12] p-4 sm:p-6 lg:p-7 flex flex-col items-center justify-center relative overflow-hidden will-change-transform">
                  
                  {/* Subtle Spot Radial Light */}
                  <div 
                    className="absolute w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, #0080FB 0%, transparent 70%)' }}
                  />

                  {/* Meta Official Cloud API Template Window */}
                  <div className="relative w-full max-w-[420px] rounded-2xl border border-[#0080FB]/35 bg-[#0a101d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
                    
                    {/* Meta API Header Bar */}
                    <div className="bg-[#0e1626] border-b border-[#1b263b] px-3.5 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-wider uppercase">
                          META CLOUD API // TEMPLATE PREVIEW
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/15 border border-[#0080FB]/30 text-[#0080FB] uppercase">
                        APPROVED
                      </span>
                    </div>

                    {/* Verified WhatsApp Business Profile Row */}
                    <div className="px-4 py-2.5 bg-[#0c1322] border-b border-[#182338] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0080FB]/20 border border-[#0080FB]/40 flex items-center justify-center font-bold text-[10px] text-[#0080FB]">
                          CR
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 leading-none">
                            <span className="font-['Hanken_Grotesk'] text-xs font-bold text-white">Your Brand Store</span>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0080FB] flex items-center justify-center text-[8px] text-white font-black" title="Meta Verified Official Business">✓</span>
                          </div>
                          <span className="font-['JetBrains_Mono'] text-[9px] text-[#6b7c99] leading-none block mt-0.5">Official WhatsApp Business Account</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-[#4f617d]">
                        Cloud API v20.0
                      </span>
                    </div>

                    {/* Interactive Template Message Container */}
                    <div className="p-4 flex flex-col gap-2.5 select-none">
                      
                      {/* WhatsApp Chat Bubble */}
                      <div className="bg-[#121c2e] border border-[#1e2d47] rounded-xl p-3 text-white text-xs leading-relaxed relative shadow-md">
                        
                        {/* Order Milestone Card */}
                        <div className="bg-[#0a101b] border border-[#18253b] rounded-lg p-2.5 mb-2.5 flex items-center justify-between">
                          <div>
                            <div className="font-['JetBrains_Mono'] text-[9px] text-[#0080FB] font-bold uppercase tracking-wider">
                              ORDER #1042 SUMMARY
                            </div>
                            <div className="font-bold text-xs text-white mt-0.5">1x Linen Overshirt • Size L</div>
                            <div className="text-[10px] text-[#6b7c99] mt-0.5">Alex Morgan • Cash on Delivery</div>
                          </div>
                          <div className="text-right">
                            <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB]">$89.00</div>
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-['JetBrains_Mono'] font-bold bg-[#1a263c] text-[#8ea4c8]">COD</span>
                          </div>
                        </div>

                        {/* Incoming Message Body */}
                        <p className="text-[#c7d3e6] text-xs leading-normal">
                          Hi Alex! Thank you for ordering. Your order #1042 ($89.00 COD) has been received. Please confirm below to dispatch immediately.
                        </p>

                        <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#556987]">
                          <span>10:14 AM</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#0080FB]" />
                        </div>
                      </div>

                      {/* WhatsApp 2-Way Quick Reply Buttons */}
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            setOrderConfirmed(true);
                            onNotify("Order #1042 Confirmed! Shopify tag '✅ order-confirmed' applied.");
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] border shadow-sm ${
                            orderConfirmed
                              ? 'bg-[#0080FB] text-white border-[#0080FB] shadow-[0_0_20px_rgba(0,128,251,0.5)]'
                              : 'bg-[#10192a] hover:bg-[#0080FB] text-[#0080FB] hover:text-white border-[#1e2d47] hover:border-[#0080FB]'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{orderConfirmed ? '✅ Confirmed & Tagged in Shopify' : 'Confirm Order (Dispatch Now)'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setOrderConfirmed(false);
                            onNotify("Order #1042 Cancel Request Received. Shopify order tag updated.");
                          }}
                          className="w-full py-2 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-medium text-[#7d91b0] bg-[#0c1422] hover:bg-[#152033] hover:text-white border border-[#19243a] transition-all flex items-center justify-center gap-2"
                        >
                          <span>Edit Address / Cancel Order</span>
                        </button>
                      </div>

                      {/* Live Shopify Order Tag Status */}
                      <div className="bg-[#090e18] border border-[#182338] px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] font-['JetBrains_Mono']">
                        <span className="text-[#6b7c99]">Shopify Tag Sync:</span>
                        <span className="text-[#0080FB] font-bold">
                          {orderConfirmed ? '✅ order-confirmed' : '⏳ confirmation-pending'}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ==============================================================
              SLIDE 2: SMART DYNAMIC CART RECOVERY (/r/:token)
          ============================================================== */}
          <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 relative">
            <div className="w-full max-w-[1360px] h-[calc(100vh-320px)] min-h-[420px] max-h-[520px] relative my-auto">
              
              {/* Grand Monolithic Glass Card */}
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 border border-[#0080FB]/35 hover:border-[#0080FB]/60 bg-gradient-to-b from-[#0b1220]/95 via-[#070b14]/95 to-[#05070d]/98 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,128,251,0.12)] rounded-2xl sm:rounded-3xl overflow-hidden relative">
                
                {/* Glowing Blue Top Neon Rail */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-90" />

                {/* LEFT COLUMN: Specifications & Value Proposition */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#152033] flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Architectural Huge Watermark (Parallax Target) */}
                  <span className="card-watermark font-['Hanken_Grotesk'] font-black text-[9rem] sm:text-[11rem] md:text-[13rem] leading-none text-[#0d1627]/80 select-none pointer-events-none absolute -bottom-8 -right-6 z-0 will-change-transform">
                    02
                  </span>

                  {/* Header Meta Badge Row */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl border border-[#0080FB]/40 bg-[#0080FB]/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,128,251,0.25)]">
                        <ShoppingCart className="w-5 h-5 text-[#0080FB]" />
                      </div>
                      <div>
                        <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold uppercase tracking-widest flex items-center gap-2">
                          <span>02 // CART RECOVERY ENGINE</span>
                        </div>
                        <div className="font-['JetBrains_Mono'] text-[10px] text-[#63728f] uppercase">
                          SHOPIFY.CHECKOUT_UPDATE
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a1220] border border-[#0080FB]/30 font-['JetBrains_Mono'] text-xs text-[#8695b0] uppercase font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                      <span>Sub-second: 15ms</span>
                    </div>
                  </div>

                  {/* Headline & Narrative */}
                  <div className="my-auto relative z-10 py-1.5 sm:py-2">
                    <h3 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl lg:text-[2.25rem] text-white uppercase tracking-tight leading-[1.02] mb-2 sm:mb-2.5">
                      SMART DYNAMIC <br />
                      <span className="text-[#0080FB]">
                        CART RESTORATION
                      </span>
                    </h3>

                    <p className="font-['Hanken_Grotesk'] text-xs sm:text-sm text-[#9aa5bb] leading-relaxed max-w-xl mb-3 font-normal">
                      Trigger automated multi-step sequences when shoppers drop off at checkout. Restore the customer's exact items, quantities, and applied discount with single-tap dynamic recovery shortlinks (<code className="text-[#0080FB]">/r/:token</code>).
                    </p>

                    {/* Live Smart Link Architecture Pipeline */}
                    <div className="bg-[#090e17] border border-[#1b263b] rounded-xl p-2.5 mb-3">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>DYNAMIC TOKEN RESOLUTION PIPELINE</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-['JetBrains_Mono']">
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-white">
                          Cart Abandoned
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-[#0080FB]">
                          /r/:token Dispatched
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#0080FB]/15 border border-[#0080FB]/50 text-[#0080FB] font-bold">
                          10% OFF Restored
                        </span>
                      </div>
                    </div>

                    {/* KPI Capability Pills */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0080FB]/10 border border-[#0080FB]/30 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold">
                        <Tag className="w-3.5 h-3.5" />
                        <span>DYNAMIC /r/:token SHORTLINKS</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1624] border border-[#1b273d] text-xs font-['JetBrains_Mono'] text-[#cbd5e1] font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>3-STEP SEQUENCES (30M, 24H, 48H)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-[#152033] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                    <div className="border-l-2 border-[#0080FB] pl-3 py-0.5">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#55637d] uppercase tracking-wider font-semibold">
                        EVENT TRIGGER PROTOCOL
                      </div>
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB] uppercase tracking-wide">
                        <code>SHOPIFY.CHECKOUT_UPDATE</code>
                      </div>
                    </div>

                    <a
                      href="https://apps.shopify.com/chatradix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-6 py-3 tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,128,251,0.35)] active:scale-95 rounded-lg"
                    >
                      <span>INSTALL ON SHOPIFY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* RIGHT COLUMN: Meta Official Cloud API Interactive Template Console */}
                <div className="card-visual-panel lg:col-span-5 bg-[#060a12] p-4 sm:p-6 lg:p-7 flex flex-col items-center justify-center relative overflow-hidden will-change-transform">
                  
                  {/* Subtle Spot Radial Light */}
                  <div 
                    className="absolute w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, #0080FB 0%, transparent 70%)' }}
                  />

                  {/* Meta Official Cloud API Template Window */}
                  <div className="relative w-full max-w-[420px] rounded-2xl border border-[#0080FB]/35 bg-[#0a101d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
                    
                    {/* Meta API Header Bar */}
                    <div className="bg-[#0e1626] border-b border-[#1b263b] px-3.5 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-wider uppercase">
                          META CLOUD API // TEMPLATE PREVIEW
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/15 border border-[#0080FB]/30 text-[#0080FB] uppercase">
                        APPROVED
                      </span>
                    </div>

                    {/* Verified WhatsApp Business Profile Row */}
                    <div className="px-4 py-2.5 bg-[#0c1322] border-b border-[#182338] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0080FB]/20 border border-[#0080FB]/40 flex items-center justify-center font-bold text-[10px] text-[#0080FB]">
                          CR
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 leading-none">
                            <span className="font-['Hanken_Grotesk'] text-xs font-bold text-white">Your Brand Store</span>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0080FB] flex items-center justify-center text-[8px] text-white font-black" title="Meta Verified Official Business">✓</span>
                          </div>
                          <span className="font-['JetBrains_Mono'] text-[9px] text-[#6b7c99] leading-none block mt-0.5">Official WhatsApp Business Account</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-[#4f617d]">
                        Cloud API v20.0
                      </span>
                    </div>

                    {/* Interactive Template Message Container */}
                    <div className="p-4 flex flex-col gap-2.5 select-none">
                      
                      {/* WhatsApp Chat Bubble */}
                      <div className="bg-[#121c2e] border border-[#1e2d47] rounded-xl p-3 text-white text-xs leading-relaxed relative shadow-md">
                        
                        {/* Cart Reserved Voucher Card */}
                        <div className="bg-[#0a101b] border border-[#18253b] rounded-lg p-2.5 mb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#0080FB]/15 border border-[#0080FB]/30 flex items-center justify-center text-[#0080FB]">
                              <ShoppingCart className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-['JetBrains_Mono'] text-[9px] text-[#0080FB] font-bold uppercase tracking-wider">
                                CART RECOVERY // RESERVED
                              </div>
                              <div className="font-bold text-xs text-white mt-0.5">2 Items in Cart • Subtotal $120.00</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/20 border border-[#0080FB]/40 text-[#0080FB]">
                            10% OFF
                          </span>
                        </div>

                        {/* Incoming Message Body */}
                        <p className="text-[#c7d3e6] text-xs leading-normal mb-2">
                          Hey Alex! You left 2 items in your cart. We saved your bag—complete your checkout within 15 mins to claim 10% OFF with code SAVE10.
                        </p>

                        {/* Dynamic Shortlink Pill */}
                        <div className="p-2 rounded-lg bg-[#090e18] border border-[#1c2940] flex items-center justify-between text-[11px] font-['JetBrains_Mono']">
                          <span className="text-[#8ea4c8] truncate">chatradix.store/r/tk_9f82a17c</span>
                          <span className="text-[#0080FB] font-bold shrink-0 ml-2 flex items-center gap-1">
                            Auto-Fill <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>

                        <div className="flex justify-end items-center gap-1 mt-1.5 text-[9px] text-[#556987]">
                          <span>11:30 AM</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#0080FB]" />
                        </div>
                      </div>

                      {/* Interactive Recovery Action Button */}
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            setCheckoutRecovered(true);
                            onNotify("Cart Rehydrated! Session restored via /r/:token link.");
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] border shadow-sm ${
                            checkoutRecovered
                              ? 'bg-[#0080FB] text-white border-[#0080FB] shadow-[0_0_20px_rgba(0,128,251,0.5)]'
                              : 'bg-[#10192a] hover:bg-[#0080FB] text-[#0080FB] hover:text-white border-[#1e2d47] hover:border-[#0080FB]'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>{checkoutRecovered ? '✅ Cart Restored ($108.00)' : 'Complete Checkout ($108.00)'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onNotify("Live WhatsApp Support chat initiated with Sarah.")}
                          className="w-full py-2 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-medium text-[#7d91b0] bg-[#0c1422] hover:bg-[#152033] hover:text-white border border-[#19243a] transition-all flex items-center justify-center gap-2"
                        >
                          <span>Have Questions? Chat with Us</span>
                        </button>
                      </div>

                      {/* Redirect Token Status */}
                      <div className="bg-[#090e18] border border-[#182338] px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] font-['JetBrains_Mono']">
                        <span className="text-[#6b7c99]">Dynamic Link:</span>
                        <span className="text-[#0080FB] font-bold">
                          chatradix.store/r/tk_9f82a17c
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ==============================================================
              SLIDE 3: INTERACTIVE 10-CARD PRODUCT CAROUSEL CAMPAIGNS
          ============================================================== */}
          <div className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 lg:px-12 relative">
            <div className="w-full max-w-[1360px] h-[calc(100vh-320px)] min-h-[420px] max-h-[520px] relative my-auto">
              
              {/* Grand Monolithic Glass Card */}
              <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 border border-[#0080FB]/35 hover:border-[#0080FB]/60 bg-gradient-to-b from-[#0b1220]/95 via-[#070b14]/95 to-[#05070d]/98 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,128,251,0.12)] rounded-2xl sm:rounded-3xl overflow-hidden relative">
                
                {/* Glowing Blue Top Neon Rail */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-90" />

                {/* LEFT COLUMN: Specifications & Value Proposition */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#152033] flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Architectural Huge Watermark (Parallax Target) */}
                  <span className="card-watermark font-['Hanken_Grotesk'] font-black text-[9rem] sm:text-[11rem] md:text-[13rem] leading-none text-[#0d1627]/80 select-none pointer-events-none absolute -bottom-8 -right-6 z-0 will-change-transform">
                    03
                  </span>

                  {/* Header Meta Badge Row */}
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl border border-[#0080FB]/40 bg-[#0080FB]/10 flex items-center justify-center shadow-[0_0_25px_rgba(0,128,251,0.25)]">
                        <Package className="w-5 h-5 text-[#0080FB]" />
                      </div>
                      <div>
                        <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold uppercase tracking-widest flex items-center gap-2">
                          <span>03 // BROADCAST ENGINE</span>
                        </div>
                        <div className="font-['JetBrains_Mono'] text-[10px] text-[#63728f] uppercase">
                          META.CAROUSEL_BROADCAST
                        </div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0a1220] border border-[#0080FB]/30 font-['JetBrains_Mono'] text-xs text-[#8695b0] uppercase font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                      <span>Capacity: 10 Cards</span>
                    </div>
                  </div>

                  {/* Headline & Narrative */}
                  <div className="my-auto relative z-10 py-1.5 sm:py-2">
                    <h3 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl lg:text-[2.25rem] text-white uppercase tracking-tight leading-[1.02] mb-2 sm:mb-2.5">
                      INTERACTIVE 10-CARD <br />
                      <span className="text-[#0080FB]">
                        MEDIA CAROUSELS
                      </span>
                    </h3>

                    <p className="font-['Hanken_Grotesk'] text-xs sm:text-sm text-[#9aa5bb] leading-relaxed max-w-xl mb-3 font-normal">
                      Broadcast stunning multi-product catalog drops directly inside WhatsApp chat. Customers swipe through up to 10 interactive visual cards and tap native "Buy Now" buttons with pre-filled checkout.
                    </p>

                    {/* Live WhatsApp Carousel Pipeline */}
                    <div className="bg-[#090e17] border border-[#1b263b] rounded-xl p-2.5 mb-3">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>INTERACTIVE CAROUSEL ARCHITECTURE</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-['JetBrains_Mono']">
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-white">
                          Meta Broadcast
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#101826] border border-[#1f2e47] text-[#0080FB]">
                          Horizontal In-Chat Swipe
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4e6282]" />
                        <span className="px-2.5 py-1 rounded bg-[#0080FB]/15 border border-[#0080FB]/50 text-[#0080FB] font-bold">
                          1-Tap Instant Checkout
                        </span>
                      </div>
                    </div>

                    {/* KPI Capability Pills */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0080FB]/10 border border-[#0080FB]/30 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold">
                        <Package className="w-3.5 h-3.5" />
                        <span>10 VISUAL PRODUCT CARDS</span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1624] border border-[#1b273d] text-xs font-['JetBrains_Mono'] text-[#cbd5e1] font-semibold">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#0080FB]" />
                        <span>1-TAP NATIVE BUY NOW</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-[#152033] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                    <div className="border-l-2 border-[#0080FB] pl-3 py-0.5">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#55637d] uppercase tracking-wider font-semibold">
                        EVENT TRIGGER PROTOCOL
                      </div>
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB] uppercase tracking-wide">
                        <code>META.CAROUSEL_BROADCAST</code>
                      </div>
                    </div>

                    <a
                      href="https://apps.shopify.com/chatradix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-6 py-3 tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,128,251,0.35)] active:scale-95 rounded-lg"
                    >
                      <span>INSTALL ON SHOPIFY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* RIGHT COLUMN: Meta Official Cloud API Interactive Template Console */}
                <div className="card-visual-panel lg:col-span-5 bg-[#060a12] p-4 sm:p-6 lg:p-7 flex flex-col items-center justify-center relative overflow-hidden will-change-transform">
                  
                  {/* Subtle Spot Radial Light */}
                  <div 
                    className="absolute w-[360px] h-[360px] rounded-full blur-[100px] pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, #0080FB 0%, transparent 70%)' }}
                  />

                  {/* Meta Official Cloud API Template Window */}
                  <div className="relative w-full max-w-[420px] rounded-2xl border border-[#0080FB]/35 bg-[#0a101d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
                    
                    {/* Meta API Header Bar */}
                    <div className="bg-[#0e1626] border-b border-[#1b263b] px-3.5 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-wider uppercase">
                          META CLOUD API // TEMPLATE PREVIEW
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/15 border border-[#0080FB]/30 text-[#0080FB] uppercase">
                        APPROVED
                      </span>
                    </div>

                    {/* Verified WhatsApp Business Profile Row */}
                    <div className="px-4 py-2.5 bg-[#0c1322] border-b border-[#182338] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0080FB]/20 border border-[#0080FB]/40 flex items-center justify-center font-bold text-[10px] text-[#0080FB]">
                          CR
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 leading-none">
                            <span className="font-['Hanken_Grotesk'] text-xs font-bold text-white">Your Brand Store</span>
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0080FB] flex items-center justify-center text-[8px] text-white font-black" title="Meta Verified Official Business">✓</span>
                          </div>
                          <span className="font-['JetBrains_Mono'] text-[9px] text-[#6b7c99] leading-none block mt-0.5">Official WhatsApp Business Account</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-['JetBrains_Mono'] text-[#4f617d]">
                        Cloud API v20.0
                      </span>
                    </div>

                    {/* Interactive Template Message Container */}
                    <div className="p-4 flex flex-col gap-2.5 select-none">
                      
                      {/* WhatsApp Chat Bubble */}
                      <div className="bg-[#121c2e] border border-[#1e2d47] rounded-xl p-3 text-white text-xs leading-relaxed relative shadow-md">
                        
                        <div className="font-['JetBrains_Mono'] text-[9px] text-[#0080FB] font-bold uppercase tracking-wider mb-1">
                          VIP CATALOG BROADCAST
                        </div>
                        <p className="text-[#c7d3e6] text-xs leading-normal">
                          Swipe through our top 10 recommended pieces below and tap "Buy Now" for pre-filled checkout:
                        </p>

                        {/* Interactive Swipeable Carousel Card */}
                        <div className="relative bg-[#0a101b] border border-[#1d2b42] rounded-xl p-3 mt-2.5 shadow-inner">
                          
                          {/* Navigation Arrows */}
                          <button
                            onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselProducts.length - 1))}
                            className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#121d30] border border-[#253654] text-white flex items-center justify-center shadow-lg hover:bg-[#0080FB] transition-all z-20"
                            aria-label="Previous card"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setCarouselIndex((prev) => (prev < carouselProducts.length - 1 ? prev + 1 : 0))}
                            className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#121d30] border border-[#253654] text-white flex items-center justify-center shadow-lg hover:bg-[#0080FB] transition-all z-20"
                            aria-label="Next card"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Card Content */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/20 border border-[#0080FB]/40 text-[#0080FB]">
                                {carouselProducts[carouselIndex].tag}
                              </span>
                              <span className="font-['JetBrains_Mono'] text-sm font-bold text-white">
                                {carouselProducts[carouselIndex].price}
                              </span>
                            </div>

                            <div className="text-white font-bold text-sm">
                              {carouselProducts[carouselIndex].title}
                            </div>

                            <p className="text-[11px] text-[#8ea4c8] leading-snug">
                              {carouselProducts[carouselIndex].desc}
                            </p>

                            <button
                              onClick={() => onNotify(`Redirecting to Shopify Checkout for ${carouselProducts[carouselIndex].title} (${carouselProducts[carouselIndex].price})`)}
                              className="w-full mt-2 py-2 px-3 rounded-lg font-['JetBrains_Mono'] text-xs font-bold bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,128,251,0.35)] active:scale-95"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Buy Now • {carouselProducts[carouselIndex].price}</span>
                            </button>
                          </div>

                          {/* Carousel Dots & Card indicator */}
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#18253b]">
                            <div className="flex items-center gap-1.5">
                              {carouselProducts.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  onClick={() => setCarouselIndex(dotIdx)}
                                  className={`transition-all rounded-full ${
                                    carouselIndex === dotIdx 
                                      ? 'w-4 h-1.5 bg-[#0080FB]' 
                                      : 'w-1.5 h-1.5 bg-[#253654]'
                                  }`}
                                  aria-label={`Go to product ${dotIdx + 1}`}
                                />
                              ))}
                            </div>
                            <span className="text-[9px] font-['JetBrains_Mono'] text-[#6b7c99]">
                              Card {carouselIndex + 1} of 10
                            </span>
                          </div>

                        </div>

                        <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#556987]">
                          <span>3:45 PM</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#0080FB]" />
                        </div>
                      </div>

                      {/* Meta Payload Status Footer */}
                      <div className="bg-[#090e18] border border-[#182338] px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] font-['JetBrains_Mono']">
                        <span className="text-[#6b7c99]">Broadcast Engine:</span>
                        <span className="text-[#0080FB] font-bold">10 Interactive Cards Active</span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ==============================================================
            BOTTOM STATUS BAR: Progress Line & Flow Counter (Balanced)
        ============================================================== */}
        <div className="w-full max-w-[1580px] mx-auto px-4 sm:px-8 md:px-12 shrink-0 z-20 flex items-center justify-between gap-6 mt-4 sm:mt-6 pt-2">
          {/* Active Flow Indicator */}
          <div className="font-['JetBrains_Mono'] text-xs text-[#63708a] flex items-center gap-2.5 uppercase">
            <span className="text-[#0080FB] font-bold">FLOW 0{activeSlide + 1} OF 03</span>
            <span className="hidden sm:inline-block text-[#3d4b66]">•</span>
            <span className="hidden sm:inline-block font-medium text-[#93a2bd]">{flowTabs[activeSlide]?.title}</span>
          </div>

          {/* Interactive Step Dots */}
          <div className="hidden sm:flex items-center gap-2">
            {[0, 1, 2].map((dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => handleJumpToSlide(dotIdx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === dotIdx
                    ? 'w-7 h-2 bg-[#0080FB] shadow-[0_0_12px_#0080FB]'
                    : 'w-2 h-2 bg-[#20293a] hover:bg-[#3d4d6b]'
                }`}
                aria-label={`Go to flow ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Precision Smooth Scrub Progress Bar */}
          <div className="w-36 sm:w-56 md:w-72 h-1.5 bg-[#141a26] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0080FB] via-[#38bdf8] to-[#0080FB] transition-all duration-150"
              style={{ width: `${Math.max(12, scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
      </div>
    </section>
  );
};
