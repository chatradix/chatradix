import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface UltimateFlowsProps {
  onNotify?: (msg: string) => void;
}

export interface AutomationItem {
  id: number;
  title: string;
  desc: string;
  headlineA: string;
  headlineB: string;
  bullets: string[];
  nextPill: string;
  artworkType: string;
}

export const CHATRADIX_AUTOMATIONS: AutomationItem[] = [
  {
    id: 1,
    title: "Order Confirmation",
    desc: "Instant confirmation with interactive 2-way Quick Reply buttons ( Confirm / Cancel ).",
    headlineA: "INSTANT CONFIRMATION.",
    headlineB: "VERIFY IN SECONDS.",
    bullets: [
      "2-Way Quick Reply buttons (Confirm / Cancel).",
      "Automatically updates Shopify order tags.",
      "Duplicate order protection stops double shipment."
    ],
    nextPill: "(→) Next: Order Fulfillment",
    artworkType: "confirm"
  },
  {
    id: 2,
    title: "Order Fulfillment",
    desc: "Automatic shipping alerts with tracking details when fulfilled in Shopify.",
    headlineA: "AUTOMATIC SHIPPING.",
    headlineB: "REAL-TIME TRACKING.",
    bullets: [
      "Fires instantly upon Shopify fulfillment creation.",
      "Dynamic carrier name, tracking numbers & live URLs.",
      "Cuts 'Where is my order?' support tickets by 70%."
    ],
    nextPill: "(→) Next: Order Delivered",
    artworkType: "truck"
  },
  {
    id: 3,
    title: "Order Delivered",
    desc: "Delivery celebration & feedback message when package arrives.",
    headlineA: "PACKAGE ARRIVED.",
    headlineB: "DELIVERY CELEBRATION.",
    bullets: [
      "Drop-off celebration message gives peace of mind.",
      "Invites customer to unbox and inspect their items.",
      "Minimizes false non-delivery disputes & chargebacks."
    ],
    nextPill: "(→) Next: Order Cancellation",
    artworkType: "delivered"
  },
  {
    id: 4,
    title: "Order Cancellation",
    desc: "Instant refund/cancellation alert when an order is cancelled.",
    headlineA: "INSTANT TRANSPARENCY.",
    headlineB: "PROTECT BUYER TRUST.",
    bullets: [
      "Delivers immediate reassurance when order is voided.",
      "Outlines clear refund & store credit timelines.",
      "Drastically reduces angry inquiries and disputes."
    ],
    nextPill: "(→) Next: Custom Order Notifications",
    artworkType: "cancel"
  },
  {
    id: 5,
    title: "Custom Order Notifications",
    desc: "Custom-triggered WhatsApp notifications for specific order events.",
    headlineA: "TAILORED TRIGGERS.",
    headlineB: "SPECIFIC ORDER EVENTS.",
    bullets: [
      "Custom-triggered WhatsApp updates for lifecycle events.",
      "Flexible variable mapping for items, address & tags.",
      "Supports PDF invoices, documents and rich attachments."
    ],
    nextPill: "(→) Next: Admin Notifications",
    artworkType: "bell"
  },
  {
    id: 6,
    title: "Admin Notifications",
    desc: "Direct WhatsApp alerts to store owner when new orders occur.",
    headlineA: "DIRECT STORE ALERTS.",
    headlineB: "INSTANT SALES PINGS.",
    bullets: [
      "High-priority WhatsApp alerts direct to store owners.",
      "Displays order ID, customer name, total & payment mode.",
      "Instant alert to warehouse staff for rapid dispatch."
    ],
    nextPill: "(→) Next: Draft Order Recovery",
    artworkType: "admin"
  },
  {
    id: 7,
    title: "Draft Order Recovery",
    desc: "Sends reminder links to customers with pending draft invoices.",
    headlineA: "PENDING INVOICES.",
    headlineB: "CLOSE DRAFTS FAST.",
    bullets: [
      "Multi-sequence reminders for B2B & wholesale invoices.",
      "Delivers secure 1-tap tracked payment links in chat.",
      "Automatically stops follow-ups once invoice is paid."
    ],
    nextPill: "(→) Next: Abandoned Checkout Recovery",
    artworkType: "draft"
  },
  {
    id: 8,
    title: "Abandoned Checkout Recovery",
    desc: "3-step automated recovery sequence with custom delays & discount codes.",
    headlineA: "RECOVER LOST CARTS.",
    headlineB: "RECLAIM 25% REVENUE.",
    bullets: [
      "3-step automated recovery sequence with custom delays.",
      "Dynamic recovery links restore exact cart session.",
      "Injects exclusive discount codes to drive checkout."
    ],
    nextPill: "(→) Next: Product Review Requests",
    artworkType: "cart"
  },
  {
    id: 9,
    title: "Product Review Requests",
    desc: "Scheduled review request message sent X days after delivery.",
    headlineA: "DELIGHT CUSTOMERS.",
    headlineB: "GET 5-STAR REVIEWS.",
    bullets: [
      "Instant delivery pings.",
      "Automated review requests.",
      "Build massive social proof."
    ],
    nextPill: "(→) Next: Customer VIP Campaign",
    artworkType: "stars"
  },
  {
    id: 10,
    title: "Customer VIP Campaign",
    desc: "Broadcast targeted WhatsApp promotions to high-value customers.",
    headlineA: "VIP PROMOTIONS.",
    headlineB: "HIGH-VALUE BUYERS.",
    bullets: [
      "Broadcast targeted WhatsApp promos to top customer tiers.",
      "Filter by minimum lifetime spend & purchase history.",
      "Personalized names & exclusive VIP voucher codes."
    ],
    nextPill: "(→) Next: Product Spotlight (Carousel)",
    artworkType: "vip"
  },
  {
    id: 11,
    title: "Product Spotlight (Carousel)",
    desc: "Multi-card swipeable catalog showcase inside WhatsApp.",
    headlineA: "SWIPEABLE CATALOG.",
    headlineB: "BUY INSIDE CHAT.",
    bullets: [
      "Multi-card swipeable catalog showcase in WhatsApp.",
      "Up to 10 visual cards with image, price & Buy button.",
      "Customers browse & purchase directly in chat."
    ],
    nextPill: "(→) Next: Win-Back Customers",
    artworkType: "carousel"
  },
  {
    id: 12,
    title: "Win-Back Customers",
    desc: "Automated re-engagement for customers who haven't purchased in X days.",
    headlineA: "REAWAKEN BUYERS.",
    headlineB: "RECAPTURE PROFIT.",
    bullets: [
      "Automated re-engagement for inactive shoppers in X days.",
      "Built-in cooldown periods prevent spam & message fatigue.",
      "Win-back vouchers re-engage historically profitable buyers."
    ],
    nextPill: "(→) Next: Order Confirmation",
    artworkType: "winback"
  }
];

export const UltimateFlows: React.FC<UltimateFlowsProps> = ({ onNotify }) => {
  const [activeIndex, setActiveIndex] = useState<number>(8); // Defaults to Slide 09: Review Requests (from user screenshot)
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const deckScrollRef = useRef<HTMLDivElement | null>(null);

  const AUTOPLAY_DURATION = 5000;

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay timer - Disabled on mobile, runs on desktop only
  useEffect(() => {
    if (!isAutoplay || isMobile) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CHATRADIX_AUTOMATIONS.length);
    }, AUTOPLAY_DURATION);

    return () => clearInterval(timer);
  }, [isAutoplay, isMobile]);

  // Ensure active card is ALWAYS 100% fully visible (NEVER cut off on left or right)
  useEffect(() => {
    const container = deckScrollRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const cardEl = document.getElementById(`acc-card-${activeIndex}`);
      if (!cardEl) return;

      const containerWidth = container.clientWidth;
      const cardLeft = cardEl.offsetLeft;
      const cardWidth = cardEl.offsetWidth;
      const currentScroll = container.scrollLeft;

      // If full card is already visible within viewport, do not scroll
      const isLeftVisible = cardLeft >= currentScroll;
      const isRightVisible = (cardLeft + cardWidth) <= (currentScroll + containerWidth);

      if (isLeftVisible && isRightVisible) return;

      let targetScroll = 0;
      if (cardLeft + cardWidth + 24 <= containerWidth) {
        targetScroll = 0;
      } else {
        targetScroll = Math.max(0, cardLeft - 20);
      }

      // Never scroll past card's left boundary
      targetScroll = Math.max(0, Math.min(targetScroll, cardLeft));

      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }, 60);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
    if (onNotify) {
      onNotify(`Viewing ${CHATRADIX_AUTOMATIONS[index].title}`);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % CHATRADIX_AUTOMATIONS.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + CHATRADIX_AUTOMATIONS.length) % CHATRADIX_AUTOMATIONS.length);
  };

  const renderArtwork = (type: string) => {
    if (type === "stars") {
      return (
        <div className="relative w-full h-[270px] flex items-center justify-center animate-[float_4.8s_ease-in-out_infinite_alternate]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_20px_rgba(37,211,102,0.4)]" viewBox="0 0 300 280" fill="none">
            <path d="M 40,240 C 120,260 220,180 200,90 C 180,20 80,40 100,140 C 120,220 260,200 280,40" stroke="url(#ribbonGradCyan)" strokeWidth="8" strokeLinecap="round" opacity="0.9"/>
            <path d="M 20,180 C 80,230 180,190 220,120 C 260,50 160,-10 90,40 C 30,80 80,220 220,230" stroke="url(#ribbonGradGreen)" strokeWidth="5" strokeLinecap="round" opacity="0.9"/>
            <defs>
              <linearGradient id="ribbonGradCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0080FB" stopOpacity="0.1"/>
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#25D366" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="ribbonGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25D366" stopOpacity="0.9"/>
                <stop offset="60%" stopColor="#0080FB" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute -top-6 flex items-center gap-1 z-20">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} className="w-5 h-5 fill-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.9)] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <div className="w-[190px] h-[190px] rounded-3xl bg-gradient-to-br from-[#142030]/90 to-[#09101a]/95 border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(37,211,102,0.2)]">
            <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(37,211,102,0.8)]">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="mt-3 text-[10px] font-extrabold text-[#25D366] font-mono tracking-widest uppercase">
              5★ VERIFIED REVIEW
            </span>
          </div>
        </div>
      );
    } else if (type === "confirm") {
      return (
        <div className="relative w-full h-[270px] flex items-center justify-center animate-[float_4.8s_ease-in-out_infinite_alternate]">
          <div className="w-[210px] h-[180px] rounded-3xl bg-gradient-to-br from-[#142030]/90 to-[#09101a]/95 border border-white/20 backdrop-blur-xl flex flex-col justify-between p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(37,211,102,0.2)]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]" />
                <span className="text-[10px] font-bold text-white font-mono">ORDER #48291</span>
              </div>
              <span className="text-[10px] text-[#25D366] font-bold">$89.00</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-snug">
              "Please confirm your delivery address to dispatch order today."
            </p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="bg-[#25D366] text-[#050A10] text-[10px] font-extrabold py-1.5 rounded-lg text-center">Confirm ✓</div>
              <div className="bg-white/10 text-gray-400 text-[10px] font-semibold py-1.5 rounded-lg text-center">Cancel</div>
            </div>
          </div>
        </div>
      );
    } else if (type === "truck") {
      return (
        <div className="relative w-full h-[270px] flex items-center justify-center animate-[float_4.8s_ease-in-out_infinite_alternate]">
          <div className="w-[200px] h-[180px] rounded-3xl bg-gradient-to-br from-[#142030]/90 to-[#09101a]/95 border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_14px_rgba(56,189,248,0.8)] mb-3">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div className="bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-lg px-2.5 py-1 text-[10px] font-bold text-[#38BDF8] font-mono">
              LIVE GPS IN TRANSIT
            </div>
          </div>
        </div>
      );
    } else if (type === "cart") {
      return (
        <div className="relative w-full h-[270px] flex items-center justify-center animate-[float_4.8s_ease-in-out_infinite_alternate]">
          <div className="w-[200px] h-[180px] rounded-3xl bg-gradient-to-br from-[#142030]/90 to-[#09101a]/95 border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_16px_rgba(37,211,102,0.85)] mb-3">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className="bg-[#25D366]/15 border border-[#25D366]/40 rounded-lg px-2.5 py-1 text-[10px] font-bold text-[#25D366] font-mono">
              +25% RECOVERED CART
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative w-full h-[270px] flex items-center justify-center animate-[float_4.8s_ease-in-out_infinite_alternate]">
          <div className="w-[190px] h-[190px] rounded-3xl bg-gradient-to-br from-[#142030]/90 to-[#09101a]/95 border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_16px_rgba(37,211,102,0.8)] mb-3">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <div className="bg-[#25D366]/15 border border-[#25D366]/40 rounded-lg px-2.5 py-1 text-[10px] font-bold text-[#25D366] font-mono uppercase">
              OFFICIAL CLOUD API
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="flows" className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-20 pb-16 selection:bg-[#0080FB] selection:text-white">
      {/* Scoped style to ensure NO scrollbar renders on any browser */}
      <style>{`
        #flows-deck-scroll::-webkit-scrollbar,
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        #flows-deck-scroll,
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Header Row Matching ARCHITECTURE & Reference Image */}
      <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-8 relative">
        {/* Glowing bottom line accent */}
        <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-[#0080FB] shadow-[0_0_10px_#0080FB]" />
        
        <div className="flex items-start gap-4">
          {/* Vertical blue accent bar (from reference image) */}
          <div className="w-1.5 h-12 sm:h-14 md:h-16 bg-[#0080FB] shadow-[0_0_14px_#0080FB] rounded-full shrink-0 mt-1" />

          <div>
            <h2 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-6xl md:text-7xl leading-none text-white uppercase tracking-tighter">
              FLAGSHIP <span className="text-[#0080FB]">FLOWS</span>
            </h2>
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#0080FB] uppercase tracking-[0.2em] font-semibold mt-3">
              // HIGH-CONVERTING WHATSAPP COMMERCE ARCHITECTURE
            </p>
          </div>
        </div>

        {/* Slide indicator pill on right */}
        <div className="px-4 py-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center gap-3 text-xs font-semibold text-gray-300 self-start md:self-end">
          <span>
            Slide <strong className="text-[#25D366] text-sm font-bold">{(activeIndex + 1).toString().padStart(2, '0')}</strong> / <strong>12</strong>
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5 text-[#25D366]">
            <Check className="w-3.5 h-3.5" /> Shopify Live
          </span>
        </div>
      </div>

      {/* Accordion Deck - Zero scrollbar */}
      <div 
        id="flows-deck-scroll"
        ref={deckScrollRef} 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        <div className="flex flex-col lg:flex-row gap-3 min-w-full lg:h-[560px]">
          {CHATRADIX_AUTOMATIONS.map((item, i) => {
            const isExpanded = i === activeIndex;

            return (
              <div
                key={item.id}
                id={`acc-card-${i}`}
                onClick={() => !isExpanded && handleSelectCard(i)}
                style={{
                  flex: isExpanded ? '1 0 630px' : '0 0 60px',
                  transition: 'flex-basis 0.65s cubic-bezier(0.2, 0.9, 0.2, 1), flex-grow 0.65s cubic-bezier(0.2, 0.9, 0.2, 1), border-color 0.3s ease, box-shadow 0.5s ease'
                }}
                className={`relative rounded-3xl overflow-hidden border bg-[#070D14] will-change-[flex-basis,flex-grow] cursor-pointer ${
                  isExpanded 
                    ? 'border-[#25D366]/50 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(37,211,102,0.2)] cursor-default' 
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                {/* Background glow canvas */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_75%_25%,#0C1A24_0%,#060D15_65%,#03060A_100%)]">
                  <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#0080FB]/20 blur-[60px]" />
                  <div className="absolute -bottom-10 right-10 w-72 h-72 rounded-full bg-[#25D366]/15 blur-[60px]" />
                </div>

                {/* Collapsed State: Top Number, Bottom-Aligned Text, NO BOTTOM ICON */}
                <div 
                  className={`absolute inset-0 z-10 flex lg:flex-col justify-between lg:justify-between items-center p-5 lg:py-6 lg:px-0 transition-opacity duration-300 ${
                    isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <span className="text-[11px] font-mono font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 px-2 py-0.5 rounded-md">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>

                  <span className="block lg:hidden text-xs font-bold uppercase tracking-wider text-white truncate max-w-[75%]">
                    {item.title}
                  </span>

                  {/* Desktop Vertical Rotated Title ANCHORED TO BOTTOM - 1rem font size */}
                  <span className="hidden lg:block [writing-mode:vertical-rl] rotate-180 text-[1rem] font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap mt-auto pb-2 hover:text-[#25D366] transition-colors">
                    {item.title}
                  </span>
                </div>

                {/* Expanded Rich State - Smooth fade in without layout flicker */}
                <div 
                  className={`relative z-20 h-full p-6 md:p-8 flex flex-col justify-between w-full min-w-full lg:min-w-[580px] transition-opacity duration-500 ease-out delay-100 ${
                    isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                      <span className="text-[#25D366]">Chat</span><span className="text-[#0080FB]">Radix</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      {(i + 1).toString().padStart(2, '0')} / 12 AUTOMATIONS
                    </span>
                  </div>

                  {/* Body Grid: Left Content + Right 3D Artwork */}
                  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-center my-auto">
                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 px-3 py-1 rounded-md w-fit leading-relaxed">
                        ⚡ {item.desc}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight">
                        {item.headlineA} <br />
                        <span className="text-[#25D366] drop-shadow-[0_0_20px_rgba(37,211,102,0.45)]">
                          {item.headlineB}
                        </span>
                      </h3>

                      <div className="flex flex-col gap-1.5 pt-1">
                        {item.bullets.map((b, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                            <span className="text-[#25D366] font-bold">-</span>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleNext}
                        className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/40 px-4 py-2 rounded-full w-fit hover:bg-[#25D366] hover:text-[#04080F] transition-all hover:translate-x-1"
                      >
                        {item.nextPill}
                      </button>
                    </div>

                    {/* Right 3D Artwork */}
                    <div className="hidden md:flex items-center justify-center">
                      {renderArtwork(item.artworkType)}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10 flex-wrap">
                    <a
                      href="https://apps.shopify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    >
                      <span>Install on Shopify</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-4 text-xs font-semibold text-white/60">
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#25D366]" /> Official Meta Cloud API</span>
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#0080FB]" /> Shopify Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion Controls Footer */}
      <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Pill Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CHATRADIX_AUTOMATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelectCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? 'w-7 bg-[#25D366] shadow-md shadow-[#25D366]/50' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#25D366] hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAutoplay((prev) => !prev)}
            className="px-3.5 h-9 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#25D366] flex items-center gap-2 text-xs font-bold text-[#25D366] transition-all"
          >
            {isAutoplay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoplay ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#25D366] hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
