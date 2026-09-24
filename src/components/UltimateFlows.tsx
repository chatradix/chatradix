import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Truck, 
  Megaphone, 
  Package, 
  ShieldCheck, 
  Star, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UltimateFlowsProps {
  onNotify: (msg: string) => void;
}

interface FlowItem {
  id: string;
  number: string;
  seq: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  triggerProtocol: string;
  iconName: string;
  kpiBadge: string;
  incomingMessage: string;
  interactiveButtons: string[];
  userReply?: string;
  timestamp: string;
  productBadge?: string;
}

export const UltimateFlows: React.FC<UltimateFlowsProps> = ({ onNotify }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const flowsList: FlowItem[] = [
    {
      id: 'flow-1',
      number: '01',
      seq: 'SEQ_01',
      titleLine1: 'ABANDONED',
      titleLine2: 'CHECKOUT',
      description: 'Intercept lost store revenue with instantaneous high-urgency notifications. Triggered via Shopify checkout/update webhooks with sub-second latency.',
      triggerProtocol: 'WEBHOOK.CHECKOUT_UPDATE',
      iconName: 'cart',
      kpiBadge: '+34.8% RECOVERED REVENUE',
      productBadge: 'Cart: $140.00 • 2 Items',
      incomingMessage: 'Hey Alex! You left the Nike Air Velocity Pro (Size 10.5) in your bag. Complete your checkout within 15 mins to claim 10% OFF with code SAVE10.',
      interactiveButtons: ['🛍️ Complete Checkout ($126.00)', '💬 Ask Sizing Specialist'],
      userReply: 'Claiming my 10% discount now!',
      timestamp: '10:42 AM',
    },
    {
      id: 'flow-2',
      number: '02',
      seq: 'SEQ_02',
      titleLine1: 'SHIPPING',
      titleLine2: 'UPDATES',
      description: 'Automated fulfillment tracking that reduces support WISMO tickets by up to 78% with live milestone updates sent automatically via WhatsApp.',
      triggerProtocol: 'WEBHOOK.ORDERS_FULFILLED',
      iconName: 'truck',
      kpiBadge: '-78% WISMO TICKETS',
      productBadge: 'FedEx Tracking #CR-99201',
      incomingMessage: 'Great news Alex! Order #CR-9042 has shipped via FedEx Priority. Your package is currently out for delivery and estimated today by 2:15 PM.',
      interactiveButtons: ['📍 Live GPS Tracking', '📦 Change Delivery Window'],
      userReply: 'Awesome! Leave at front porch please.',
      timestamp: '02:15 PM',
    },
    {
      id: 'flow-3',
      number: '03',
      seq: 'SEQ_03',
      titleLine1: 'POST-PURCHASE',
      titleLine2: 'UPSELL',
      description: 'Deploy targeted 1-click upgrade offers based on cart items immediately following order confirmation before packaging begins.',
      triggerProtocol: 'WEBHOOK.ORDERS_PAID',
      iconName: 'megaphone',
      kpiBadge: '+22.4% AVERAGE ORDER VALUE',
      productBadge: 'Exclusive 1-Click Offer',
      incomingMessage: 'Thanks for purchasing the Pro Kit! Add the VIP Ceramic Coating Kit for 40% OFF ($29 instead of $49). 1-click addition to your existing shipment.',
      interactiveButtons: ['⚡ 1-Click Add to Shipment ($29)', '✨ No thanks, keep order'],
      userReply: 'Added to order! Thanks.',
      timestamp: '04:30 PM',
    },
    {
      id: 'flow-4',
      number: '04',
      seq: 'SEQ_04',
      titleLine1: 'BACK-IN-STOCK',
      titleLine2: 'ALERTS',
      description: 'Notify high-intent shoppers the exact second inventory restocks in your catalog. Converts waiting list users before public announcements.',
      triggerProtocol: 'WEBHOOK.INVENTORY_UPDATE',
      iconName: 'package',
      kpiBadge: '62% IMMEDIATE CHECKOUT',
      productBadge: 'High Demand • 4 Units Left',
      incomingMessage: '🔥 You asked to be notified: HyperGlide Stealth Jacket (Large) is officially back in stock! Only 4 units available in this restock run.',
      interactiveButtons: ['🛒 Buy Now in WhatsApp', '📐 View Size Chart'],
      userReply: 'Ordered in Large! Thank you!',
      timestamp: '09:10 AM',
    },
    {
      id: 'flow-5',
      number: '05',
      seq: 'SEQ_05',
      titleLine1: 'COD ORDER',
      titleLine2: 'VERIFICATION',
      description: 'Eliminate bogus Cash On Delivery orders and shipping losses with automated 2-way verification directly inside WhatsApp.',
      triggerProtocol: 'WEBHOOK.ORDER_CREATE',
      iconName: 'shield',
      kpiBadge: '99.4% ZERO RETURN LOSS',
      productBadge: 'COD Total: $120.00',
      incomingMessage: 'Order #CR-8812 for $120.00 was placed with Cash On Delivery. To prevent cancellation and dispatch immediately, please confirm by tapping below.',
      interactiveButtons: ['✅ Confirm Order #CR-8812', '❌ Cancel Order'],
      userReply: '1 (Confirmed)',
      timestamp: '01:20 PM',
    },
    {
      id: 'flow-6',
      number: '06',
      seq: 'SEQ_06',
      titleLine1: 'VIP WINBACK',
      titleLine2: 'SEQUENCE',
      description: 'Re-engage dormant high-value customers with personalized loyalty credits and bespoke recommendations after 45 days of inactivity.',
      triggerProtocol: 'WEBHOOK.CUSTOMER_INACTIVE',
      iconName: 'star',
      kpiBadge: '+18.6% RETENTION RATE',
      productBadge: '$35 Gift Credit Applied',
      incomingMessage: 'We miss you Alex! As an elite loyalty tier member, we credited your store wallet with $35 towards any purchase above $90. Valid for 48 hours.',
      interactiveButtons: ['🎁 Claim $35 VIP Credit', '👟 Shop New Arrivals'],
      userReply: 'Claimed! Browsing new gear now.',
      timestamp: '06:05 PM',
    },
  ];

  // GSAP Horizontal Scroll Pin Slider
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'flows-scroll-trigger',
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(getScrollDistance(), window.innerWidth * (flowsList.length - 1))}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const index = Math.min(
              flowsList.length - 1,
              Math.floor(self.progress * flowsList.length)
            );
            setActiveSlide(index);
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, [flowsList.length]);

  // Click to scroll to a specific slide smoothly
  const handleJumpToSlide = (index: number) => {
    setActiveSlide(index);
    if (!containerRef.current || !trackRef.current) return;
    const st = ScrollTrigger.getById('flows-scroll-trigger');
    if (st) {
      const targetScroll = st.start + (index / (flowsList.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'cart': return <ShoppingCart className="w-6 h-6 text-[#0080FB]" />;
      case 'truck': return <Truck className="w-6 h-6 text-[#0080FB]" />;
      case 'megaphone': return <Megaphone className="w-6 h-6 text-[#0080FB]" />;
      case 'package': return <Package className="w-6 h-6 text-[#0080FB]" />;
      case 'shield': return <ShieldCheck className="w-6 h-6 text-[#0080FB]" />;
      case 'star': return <Star className="w-6 h-6 text-[#0080FB]" />;
      default: return <ShoppingCart className="w-6 h-6 text-[#0080FB]" />;
    }
  };

  return (
    <section
      id="flows"
      ref={containerRef}
      className="relative w-full bg-[#08090d] border-y border-[#1e222d] overflow-hidden"
    >
      {/* Pinned Viewport Container - Exactly 100vh */}
      <div className="w-full h-screen flex flex-col justify-between relative overflow-hidden py-3 sm:py-5">
        
        {/* Ambient Backlight Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none rounded-full blur-[160px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0,128,251,0.5) 0%, rgba(37,211,102,0.2) 45%, transparent 70%)'
          }}
        />

        {/* Top Header Bar inside Pinned Viewport - Fluid */}
        <div className="w-full px-6 md:px-12 shrink-0 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="border-l-4 border-[#0080FB] pl-4">
              <h2 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter uppercase leading-none text-white">
                ULTIMATE <span className="text-[#3a4457]">FLOWS</span>
              </h2>
              <div className="font-['JetBrains_Mono'] text-[11px] text-[#0080FB] tracking-[0.2em] uppercase font-semibold mt-1 flex items-center gap-2">
                <span>// PRE-CONFIGURED ARCHITECTURES ({flowsList.length})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Slide Navigation Numbers */}
          <div className="flex items-center gap-2 bg-[#0e1118]/90 border border-[#1e222d] p-1.5 backdrop-blur-md self-start md:self-center">
            {flowsList.map((flow, i) => (
              <button
                key={flow.id}
                onClick={() => handleJumpToSlide(i)}
                className={`px-3 py-1 font-['JetBrains_Mono'] text-xs font-bold transition-all ${
                  activeSlide === i
                    ? 'bg-[#0080FB] text-white shadow-[0_0_15px_rgba(0,128,251,0.4)]'
                    : 'text-[#616c82] hover:text-white hover:bg-[#161c28]'
                }`}
              >
                {flow.number}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Track with Full Slides */}
        <div
          ref={trackRef}
          className="flex flex-nowrap h-full items-center will-change-transform z-10 my-auto"
          style={{ width: `${flowsList.length * 100}vw` }}
        >
          {flowsList.map((flow, index) => (
            <div
              key={flow.id}
              className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12"
            >
              {/* Slide Card Container - Fluid */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 border border-[#1e2330] bg-[#0c0f16] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden items-stretch my-auto">
                
                {/* LEFT COLUMN: Flow Specs Card */}
                <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#1e2330] flex flex-col justify-between bg-[#0a0c12] relative">
                  {/* Top: Icon Left, Step Number Right */}
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#0080FB] bg-[#0080FB]/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,128,251,0.25)]">
                      {renderIcon(flow.iconName)}
                    </div>
                    <div className="text-right">
                      <span className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-5xl md:text-6xl text-[#1e2433] select-none block leading-none">
                        {flow.number}
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[10px] text-[#556075] uppercase tracking-widest font-semibold">
                        ARCH_0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="my-auto">
                    <div className="inline-flex items-center gap-2 mb-2 bg-[#0080FB]/10 border border-[#0080FB]/30 px-2.5 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0080FB]" />
                      <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#0080FB] tracking-[0.2em]">
                        {flow.seq}
                      </span>
                    </div>

                    <h3 className="font-['Hanken_Grotesk'] font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight mb-3 leading-[0.94]">
                      {flow.titleLine1}<br />
                      <span className="text-[#0080FB]">{flow.titleLine2}</span>
                    </h3>

                    <p className="font-['Hanken_Grotesk'] text-xs sm:text-sm text-[#8d97ac] leading-relaxed max-w-lg mb-4">
                      {flow.description}
                    </p>

                    {/* KPI Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1 mb-4">
                      <TrendingUp className="w-3.5 h-3.5 text-[#25D366]" />
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#25D366] font-bold tracking-wider">
                        {flow.kpiBadge}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Trigger Protocol & Actions */}
                  <div className="pt-4 border-t border-[#1e2330] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="border-l-2 border-[#0080FB] pl-3 py-0.5">
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#556075] uppercase tracking-wider font-semibold">
                        TRIGGER PROTOCOL
                      </div>
                      <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB] uppercase tracking-wide">
                        {flow.triggerProtocol}
                      </div>
                    </div>

                    <button
                      onClick={() => onNotify(`Template ${flow.titleLine1} ${flow.titleLine2} loaded`)}
                      className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-4 py-2.5 tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,128,251,0.3)]"
                    >
                      <span>DEPLOY TEMPLATE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Mobile Screen Mockup Image */}
                <div className="lg:col-span-6 bg-[#080a0f] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="relative flex items-center justify-center w-full h-full max-h-[72vh]">
                    <img
                      src="/whatsapp-mockup.png"
                      alt={`${flow.titleLine1} ${flow.titleLine2} WhatsApp Flow`}
                      className="max-h-[66vh] w-auto max-w-[90%] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Footer: Visual Progress Line & Indicator */}
        <div className="w-full px-6 md:px-12 shrink-0 z-20 flex items-center justify-between gap-6 pt-1">
          {/* Scroll instruction indicator */}
          <div className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-[#63708a] flex items-center gap-2 uppercase">
            <span className="text-[#0080FB] font-bold">SCROLL HORIZONTALLY</span>
            <span>• SLIDE {activeSlide + 1} OF {flowsList.length}</span>
          </div>

          {/* Scrub Progress Bar */}
          <div className="w-40 sm:w-56 md:w-72 h-1.5 bg-[#1a202c] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0080FB] to-[#25D366] transition-all duration-150"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      </section>
  );
};
