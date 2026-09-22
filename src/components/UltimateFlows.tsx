import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Truck, 
  Megaphone, 
  Package, 
  ShieldCheck, 
  Star, 
  X, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  Signal, 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Camera, 
  Mic, 
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
  const [showAllModal, setShowAllModal] = useState(false);
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

        {/* Top Header Bar inside Pinned Viewport */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 shrink-0 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          {/* Slide Navigation Numbers & Controls */}
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
            <button
              onClick={() => setShowAllModal(true)}
              className="px-2.5 py-1 font-['JetBrains_Mono'] text-xs font-bold text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors"
            >
              ALL
            </button>
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
              className="w-screen shrink-0 h-full flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16"
            >
              {/* Slide Card Container */}
              <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 border border-[#1e2330] bg-[#0c0f16] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden items-stretch my-auto">
                
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

                {/* RIGHT COLUMN: Full-Size Realistic iPhone Screen */}
                <div className="lg:col-span-6 bg-[#080a0f] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  {/* Floating Status Tag */}
                  <div className="absolute top-3 right-6 hidden sm:flex items-center gap-2 bg-[#0e121a] border border-[#1e2638] px-3 py-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#8ea0be] uppercase font-semibold">
                      WhatsApp Cloud API v19.0
                    </span>
                  </div>

                  {/* FULL IPHONE SCREEN CONTAINER */}
                  <div className="w-[280px] sm:w-[310px] md:w-[330px] h-[490px] sm:h-[540px] md:h-[580px] lg:h-[610px] max-h-[72vh] bg-[#0c0e14] border-[4px] border-[#2b3345] rounded-[46px] p-[6px] shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(0,128,251,0.2)] relative flex flex-col justify-between transition-all duration-300">
                    
                    {/* Titanium Metallic Side Buttons */}
                    <div className="absolute -left-[6px] top-20 w-[3px] h-9 bg-[#3a4457] rounded-l-md" />
                    <div className="absolute -left-[6px] top-32 w-[3px] h-9 bg-[#3a4457] rounded-l-md" />
                    <div className="absolute -right-[6px] top-26 w-[3px] h-12 bg-[#3a4457] rounded-r-md" />

                    {/* Inner Screen Area */}
                    <div className="w-full h-full bg-[#0b141a] rounded-[40px] overflow-hidden flex flex-col justify-between border border-[#1a2230] relative shadow-inner">
                      
                      {/* 1. iOS Status Bar & Dynamic Island */}
                      <div className="w-full pt-2.5 px-5 pb-1.5 shrink-0 z-30 flex items-center justify-between text-white font-['JetBrains_Mono'] text-[11px] font-bold">
                        <span>9:41</span>
                        
                        {/* Dynamic Island Pill Notch */}
                        <div className="w-22 h-5 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto shadow-md">
                          <span className="w-2 h-2 rounded-full bg-[#09152a] ring-1 ring-[#1b263b]" />
                          <span className="w-2 h-2 rounded-full bg-[#0080FB] opacity-60 animate-pulse" />
                        </div>

                        <div className="flex items-center gap-1.5 text-white/90">
                          <Signal className="w-3 h-3" />
                          <Wifi className="w-3 h-3" />
                          <Battery className="w-3.5 h-3.5 fill-white" />
                        </div>
                      </div>

                      {/* 2. WhatsApp Official Header */}
                      <div className="bg-[#1f2c34] px-3 py-2 flex items-center justify-between shrink-0 border-b border-[#2a3942] z-20 shadow-sm">
                        <div className="flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4 text-[#8696a0] cursor-pointer" />
                          
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-7 h-7 rounded-full bg-[#0080FB] text-white flex items-center justify-center font-['Hanken_Grotesk'] font-black text-xs shadow-md">
                              CR
                            </div>
                            <span className="w-2 h-2 rounded-full bg-[#25D366] border border-[#1f2c34] absolute bottom-0 right-0" />
                          </div>

                          {/* Contact Name & Status */}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                              <span className="font-['Hanken_Grotesk'] text-[11px] sm:text-xs font-bold text-white leading-tight">
                                ChatRadix Store
                              </span>
                              <CheckCircle2 className="w-3 h-3 text-[#25D366] fill-[#25D366]/20" />
                            </div>
                            <span className="font-['JetBrains_Mono'] text-[9px] text-[#25D366] font-medium leading-tight">
                              Official WhatsApp Business
                            </span>
                          </div>
                        </div>

                        {/* WhatsApp Action Icons */}
                        <div className="flex items-center gap-2.5 text-[#aebac1]">
                          <Video className="w-3.5 h-3.5 hover:text-white transition-colors" />
                          <Phone className="w-3.5 h-3.5 hover:text-white transition-colors" />
                          <MoreVertical className="w-3.5 h-3.5 hover:text-white transition-colors" />
                        </div>
                      </div>

                      {/* 3. WhatsApp Chat Message Thread */}
                      <div 
                        className="flex-grow p-2.5 sm:p-3 overflow-y-auto space-y-2.5 flex flex-col justify-end relative"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      >
                        {/* Security Notice Pill */}
                        <div className="bg-[#182229] border border-[#222e35] rounded px-2.5 py-1 text-center mx-auto shadow-sm max-w-[92%]">
                          <p className="font-['Hanken_Grotesk'] text-[8px] sm:text-[9px] text-[#ffd279] leading-tight">
                            🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
                          </p>
                        </div>

                        {/* Date Divider */}
                        <div className="flex justify-center">
                          <span className="bg-[#182229] text-[#8696a0] font-['JetBrains_Mono'] text-[8px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            TODAY
                          </span>
                        </div>

                        {/* Incoming WhatsApp Business Flow Message Bubble */}
                        <div className="self-start max-w-[94%] bg-[#202c33] rounded-2xl rounded-tl-sm p-3 text-white shadow-md border border-[#2a3942]/60">
                          {/* Product Badge Tag */}
                          {flow.productBadge && (
                            <div className="bg-[#111b21] border border-[#0080FB]/40 rounded px-2 py-0.5 mb-1.5 inline-flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0080FB]" />
                              <span className="font-['JetBrains_Mono'] text-[9px] text-[#0080FB] font-semibold uppercase tracking-wider">
                                {flow.productBadge}
                              </span>
                            </div>
                          )}

                          {/* Message Body */}
                          <p className="font-['Hanken_Grotesk'] text-[11px] sm:text-xs leading-relaxed text-[#e9edef] mb-2">
                            {flow.incomingMessage}
                          </p>

                          {/* Timestamp */}
                          <div className="text-[8px] font-['JetBrains_Mono'] text-[#8696a0] text-right">
                            {flow.timestamp}
                          </div>

                          {/* Interactive WhatsApp Flow Buttons */}
                          <div className="mt-2.5 pt-2 border-t border-[#2a3942] flex flex-col gap-1.5">
                            {flow.interactiveButtons.map((btnText, bIndex) => (
                              <button
                                key={bIndex}
                                onClick={() => onNotify(`Tapped: ${btnText}`)}
                                className={`w-full py-1.5 px-2.5 rounded-lg font-['Hanken_Grotesk'] text-[10px] sm:text-[11px] font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                                  bIndex === 0
                                    ? 'bg-[#0080FB] hover:bg-[#006bd6] text-white shadow-[0_0_12px_rgba(0,128,251,0.3)]'
                                    : 'bg-[#111b21] hover:bg-[#2a3942] text-[#00a884] border border-[#2a3942]'
                                }`}
                              >
                                <span>{btnText}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Outgoing Customer Response Bubble */}
                        {flow.userReply && (
                          <div className="self-end max-w-[85%] bg-[#005c4b] rounded-2xl rounded-tr-sm p-2 px-2.5 text-white shadow-md">
                            <p className="font-['Hanken_Grotesk'] text-[11px] sm:text-xs leading-relaxed text-[#e9edef]">
                              {flow.userReply}
                            </p>
                            <div className="flex items-center justify-end gap-1 text-[8px] font-['JetBrains_Mono'] text-[#8696a0] mt-0.5">
                              <span>{flow.timestamp}</span>
                              <span className="text-[#53bdeb] font-bold text-[9px]">✓✓</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4. WhatsApp Bottom Input Bar */}
                      <div className="bg-[#1f2c34] p-1.5 px-2.5 flex items-center gap-1.5 shrink-0 border-t border-[#2a3942]">
                        <div className="flex items-center gap-1.5 text-[#8696a0]">
                          <Smile className="w-4 h-4 hover:text-white cursor-pointer" />
                          <Paperclip className="w-4 h-4 hover:text-white cursor-pointer" />
                        </div>

                        <div className="flex-grow bg-[#2a3942] rounded-full px-3 py-1 flex items-center justify-between text-xs text-[#8696a0]">
                          <span className="font-['Hanken_Grotesk'] text-[10px]">Type a message...</span>
                          <Camera className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                        </div>

                        <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-black shadow-md cursor-pointer">
                          <Mic className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* iPhone Home Swipe Bar */}
                      <div className="w-full pb-1 pt-0.5 bg-[#1f2c34] flex justify-center">
                        <div className="w-28 h-1 bg-white/30 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Footer: Visual Progress Line & Indicator */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 shrink-0 z-20 flex items-center justify-between gap-6 pt-1">
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

      {/* Modal for All Flows */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#0d0f14] border border-[#0080FB] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
            <button
              onClick={() => setShowAllModal(false)}
              className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white border border-[#1e222d] hover:border-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <span className="font-['JetBrains_Mono'] text-xs text-[#0080FB] tracking-[0.2em] uppercase font-semibold">
                // ARCHITECTURE STACK ({flowsList.length})
              </span>
              <h3 className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-extrabold uppercase text-white mt-2">
                All Pre-Configured Flow Architectures
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flowsList.map((f, i) => (
                <div
                  key={f.id}
                  onClick={() => {
                    handleJumpToSlide(i);
                    setShowAllModal(false);
                  }}
                  className={`bg-[#0a0c10] border p-6 transition-all cursor-pointer ${
                    activeSlide === i ? 'border-[#0080FB] bg-[#0080FB]/5' : 'border-[#1e222d] hover:border-[#0080FB]'
                  }`}
                >
                  <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-semibold mb-2">
                    {f.number} • {f.seq}
                  </div>
                  <h4 className="font-['Hanken_Grotesk'] text-xl font-bold uppercase text-white mb-2">
                    {f.titleLine1} {f.titleLine2}
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xs text-[#818a9c] leading-relaxed mb-4">
                    {f.description}
                  </p>
                  <div className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] bg-[#0d0f14] p-2.5 border border-[#1e222d] flex justify-between items-center">
                    <span>{f.triggerProtocol}</span>
                    <span className="text-[#0080FB] font-bold">JUMP TO SLIDE →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
