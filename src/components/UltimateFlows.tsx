import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Truck, 
  Megaphone, 
  Package, 
  ShieldCheck, 
  Star, 
  ArrowUpRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  CheckCheck,
  Lock,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Zap,
  Sparkles,
  ArrowRight
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
  tabLabel: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  triggerProtocol: string;
  latency: string;
  iconName: string;
  kpiBadge: string;
  productBadge: string;
  storeName: string;
  productPreviewTitle: string;
  productPreviewSubtitle: string;
  incomingMessage: string;
  interactiveButtons: string[];
  userReply: string;
  timestamp: string;
  accentColor: string;
}

export const UltimateFlows: React.FC<UltimateFlowsProps> = ({ onNotify }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testedFlows, setTestedFlows] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const flowsList: FlowItem[] = [
    {
      id: 'flow-1',
      number: '01',
      seq: 'SEQ_01',
      tabLabel: 'CHECKOUT',
      titleLine1: 'ABANDONED',
      titleLine2: 'CHECKOUT',
      description: 'Intercept lost store revenue with instantaneous high-urgency notifications. Triggered via Shopify checkout/update webhooks with sub-second latency.',
      triggerProtocol: 'WEBHOOK.CHECKOUT_UPDATE',
      latency: '12ms',
      iconName: 'cart',
      kpiBadge: '+34.8% RECOVERED REVENUE',
      productBadge: 'Cart: $140.00 • 2 Items',
      storeName: 'Velocity Store',
      productPreviewTitle: 'Nike Air Velocity Pro (10.5)',
      productPreviewSubtitle: 'Pending in cart • 10% coupon reserved',
      incomingMessage: 'Hey Alex! You left the Nike Air Velocity Pro (Size 10.5) in your bag. Complete your checkout within 15 mins to claim 10% OFF with code SAVE10.',
      interactiveButtons: ['🛍️ Complete Checkout ($126.00)', '💬 Ask Sizing Specialist'],
      userReply: 'Claiming my 10% discount now! 🚀',
      timestamp: '10:42 AM',
      accentColor: '#0080FB',
    },
    {
      id: 'flow-2',
      number: '02',
      seq: 'SEQ_02',
      tabLabel: 'SHIPPING',
      titleLine1: 'SHIPPING',
      titleLine2: 'UPDATES',
      description: 'Automated fulfillment tracking that reduces support WISMO tickets by up to 78% with live milestone updates sent automatically via WhatsApp.',
      triggerProtocol: 'WEBHOOK.ORDERS_FULFILLED',
      latency: '18ms',
      iconName: 'truck',
      kpiBadge: '-78% WISMO TICKETS',
      productBadge: 'FedEx Tracking #CR-99201',
      storeName: 'Velocity Logistics',
      productPreviewTitle: 'FedEx Priority Track #CR-9042',
      productPreviewSubtitle: 'Out for delivery • Estimated 2:15 PM',
      incomingMessage: 'Great news Alex! Order #CR-9042 has shipped via FedEx Priority. Your package is currently out for delivery and estimated today by 2:15 PM.',
      interactiveButtons: ['📍 Live GPS Tracking', '📦 Change Delivery Window'],
      userReply: 'Awesome! Leave at front porch please. 🙏',
      timestamp: '02:15 PM',
      accentColor: '#25D366',
    },
    {
      id: 'flow-3',
      number: '03',
      seq: 'SEQ_03',
      tabLabel: 'UPSELL',
      titleLine1: 'POST-PURCHASE',
      titleLine2: 'UPSELL',
      description: 'Deploy targeted 1-click upgrade offers based on cart items immediately following order confirmation before packaging begins.',
      triggerProtocol: 'WEBHOOK.ORDERS_PAID',
      latency: '24ms',
      iconName: 'megaphone',
      kpiBadge: '+22.4% AVERAGE ORDER VALUE',
      productBadge: 'Exclusive 1-Click Offer',
      storeName: 'Velocity Care',
      productPreviewTitle: 'VIP Ceramic Coating Add-on',
      productPreviewSubtitle: '40% Bundle Discount • Ships Together',
      incomingMessage: 'Thanks for purchasing the Pro Kit! Add the VIP Ceramic Coating Kit for 40% OFF ($29 instead of $49). 1-click addition to your existing shipment.',
      interactiveButtons: ['⚡ 1-Click Add to Shipment ($29)', '✨ No thanks, keep order'],
      userReply: 'Added to order! Thanks for the discount.',
      timestamp: '04:30 PM',
      accentColor: '#0080FB',
    },
    {
      id: 'flow-4',
      number: '04',
      seq: 'SEQ_04',
      tabLabel: 'RESTOCK',
      titleLine1: 'BACK-IN-STOCK',
      titleLine2: 'ALERTS',
      description: 'Notify high-intent shoppers the exact second inventory restocks in your catalog. Converts waiting list users before public announcements.',
      triggerProtocol: 'WEBHOOK.INVENTORY_UPDATE',
      latency: '9ms',
      iconName: 'package',
      kpiBadge: '62% IMMEDIATE CHECKOUT',
      productBadge: 'High Demand • 4 Units Left',
      storeName: 'Velocity Drops',
      productPreviewTitle: 'HyperGlide Stealth Jacket (Large)',
      productPreviewSubtitle: 'Limited Run • Restocked 2 mins ago',
      incomingMessage: '🔥 You asked to be notified: HyperGlide Stealth Jacket (Large) is officially back in stock! Only 4 units available in this restock run.',
      interactiveButtons: ['🛒 Buy Now in WhatsApp', '📐 View Size Chart'],
      userReply: 'Ordered in Large! Thank you so much! 🔥',
      timestamp: '09:10 AM',
      accentColor: '#0080FB',
    },
    {
      id: 'flow-5',
      number: '05',
      seq: 'SEQ_05',
      tabLabel: 'COD VERIFY',
      titleLine1: 'COD ORDER',
      titleLine2: 'VERIFICATION',
      description: 'Eliminate bogus Cash On Delivery orders and shipping losses with automated 2-way verification directly inside WhatsApp.',
      triggerProtocol: 'WEBHOOK.ORDER_CREATE',
      latency: '15ms',
      iconName: 'shield',
      kpiBadge: '99.4% ZERO RETURN LOSS',
      productBadge: 'COD Total: $120.00',
      storeName: 'Velocity Security',
      productPreviewTitle: 'Order #CR-8812 Verification',
      productPreviewSubtitle: 'Dispatch pending customer confirmation',
      incomingMessage: 'Order #CR-8812 for $120.00 was placed with Cash On Delivery. To prevent cancellation and dispatch immediately, please confirm by tapping below.',
      interactiveButtons: ['✅ Confirm Order #CR-8812', '❌ Cancel Order'],
      userReply: '1 (Confirmed & Verified)',
      timestamp: '01:20 PM',
      accentColor: '#25D366',
    },
    {
      id: 'flow-6',
      number: '06',
      seq: 'SEQ_06',
      tabLabel: 'WINBACK',
      titleLine1: 'VIP WINBACK',
      titleLine2: 'SEQUENCE',
      description: 'Re-engage dormant high-value customers with personalized loyalty credits and bespoke recommendations after 45 days of inactivity.',
      triggerProtocol: 'WEBHOOK.CUSTOMER_INACTIVE',
      latency: '31ms',
      iconName: 'star',
      kpiBadge: '+18.6% RETENTION RATE',
      productBadge: '$35 Gift Credit Applied',
      storeName: 'Velocity VIP',
      productPreviewTitle: 'Elite VIP Rewards Tier',
      productPreviewSubtitle: '$35 Gift Credit active • 48h validity',
      incomingMessage: 'We miss you Alex! As an elite loyalty tier member, we credited your store wallet with $35 towards any purchase above $90. Valid for 48 hours.',
      interactiveButtons: ['🎁 Claim $35 VIP Credit', '👟 Shop New Arrivals'],
      userReply: 'Claimed! Browsing new collection now. ✨',
      timestamp: '06:05 PM',
      accentColor: '#0080FB',
    },
  ];

  const activeSlideRef = useRef(activeSlide);
  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleJumpToSlide(activeSlideRef.current + 1);
      } else {
        handleJumpToSlide(activeSlideRef.current - 1);
      }
    }
  };

  // Click to scroll to a specific slide smoothly & accurately
  const handleJumpToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(flowsList.length - 1, index));
    setActiveSlide(clampedIndex);
    if (!containerRef.current || !trackRef.current) return;
    const st = ScrollTrigger.getById('flows-scroll-trigger');
    if (st) {
      const targetScroll = st.start + (clampedIndex / (flowsList.length - 1)) * (st.end - st.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // GSAP Horizontal Scroll Pin Slider with Snapping & Single-Scroll Advance
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => track.scrollWidth - window.innerWidth;
      // Snappy distance per slide (around 400px) instead of huge screen width
      const distancePerSlide = 400;
      const totalScrollDistance = (flowsList.length - 1) * distancePerSlide;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'flows-scroll-trigger',
          trigger: container,
          start: 'top top',
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          scrub: 0.15,
          snap: {
            snapTo: 1 / (flowsList.length - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0.05,
            ease: 'power2.out',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const index = Math.min(
              flowsList.length - 1,
              Math.max(0, Math.round(self.progress * (flowsList.length - 1)))
            );
            setActiveSlide(index);
          },
        },
      });
    }, container);

    // Wheel listener: Single scroll flick immediately advances to the next full slide
    let isNavigating = false;
    let navCooldown: any = null;

    const onWheel = (e: WheelEvent) => {
      const st = ScrollTrigger.getById('flows-scroll-trigger');
      if (!st || !st.isActive) return;

      // Ignore micro noise
      if (Math.abs(e.deltaY) < 18) return;

      const currentSlide = activeSlideRef.current;

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (currentSlide < flowsList.length - 1) {
          e.preventDefault();
          if (isNavigating) return;
          isNavigating = true;
          handleJumpToSlide(currentSlide + 1);
          clearTimeout(navCooldown);
          navCooldown = setTimeout(() => {
            isNavigating = false;
          }, 500);
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (currentSlide > 0) {
          e.preventDefault();
          if (isNavigating) return;
          isNavigating = true;
          handleJumpToSlide(currentSlide - 1);
          clearTimeout(navCooldown);
          navCooldown = setTimeout(() => {
            isNavigating = false;
          }, 500);
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
      clearTimeout(navCooldown);
      ctx.revert();
    };
  }, [flowsList.length]);

  const handleTestInteractiveButton = (flowId: string, buttonText: string) => {
    setTestedFlows(prev => ({ ...prev, [flowId]: true }));
    onNotify(`WhatsApp Action Triggered: "${buttonText}". Instant webhook confirmation.`);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'cart': return <ShoppingCart className="w-5 h-5 text-[#0080FB]" />;
      case 'truck': return <Truck className="w-5 h-5 text-[#25D366]" />;
      case 'megaphone': return <Megaphone className="w-5 h-5 text-[#0080FB]" />;
      case 'package': return <Package className="w-5 h-5 text-[#0080FB]" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-[#25D366]" />;
      case 'star': return <Star className="w-5 h-5 text-[#0080FB]" />;
      default: return <ShoppingCart className="w-5 h-5 text-[#0080FB]" />;
    }
  };

  return (
    <section
      id="flows"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full bg-[#07080c] border-y border-[#1e222d] overflow-hidden"
    >
      {/* Pinned Viewport Container - Exactly 100vh */}
      <div className="w-full h-screen flex flex-col justify-between relative overflow-hidden py-3 sm:py-4">
        
        {/* Ambient Backlight Dynamic Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none rounded-full blur-[170px] opacity-25 transition-all duration-700"
          style={{
            background: activeSlide % 2 === 0
              ? 'radial-gradient(circle, rgba(0,128,251,0.55) 0%, rgba(37,211,102,0.18) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(37,211,102,0.45) 0%, rgba(0,128,251,0.22) 45%, transparent 70%)'
          }}
        />

        {/* Top Header Bar inside Pinned Viewport */}
        <div className="w-full px-4 sm:px-8 md:px-14 shrink-0 z-20 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <div className="border-l-4 border-[#0080FB] pl-3 sm:pl-4">
              <div className="flex items-center gap-3">
                <h2 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter uppercase leading-none text-white">
                  ULTIMATE <span className="text-[#3b475d]">FLOWS</span>
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#0080FB]/15 border border-[#0080FB]/30 text-[10px] font-['JetBrains_Mono'] text-[#0080FB] font-bold tracking-widest uppercase">
                  v3.4 LIVE
                </span>
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-[#0080FB] tracking-[0.2em] uppercase font-semibold mt-1 flex items-center gap-2">
                <span>// PRE-CONFIGURED ARCHITECTURES ({flowsList.length})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Slide Navigation Tabs & Controls */}
          <div className="flex items-center gap-2 self-start md:self-center">
            {/* Arrow Prev */}
            <button
              onClick={() => handleJumpToSlide(activeSlide - 1)}
              disabled={activeSlide === 0}
              className="w-8 h-8 rounded border border-[#1e222d] bg-[#0c1017]/90 text-white flex items-center justify-center hover:border-[#0080FB] hover:text-[#0080FB] disabled:opacity-30 disabled:hover:border-[#1e222d] disabled:hover:text-white transition-all shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Tab Chips */}
            <div className="flex items-center gap-1.5 bg-[#0c1017]/95 border border-[#1e222d] p-1 backdrop-blur-md overflow-x-auto max-w-[80vw] sm:max-w-none">
              {flowsList.map((flow, i) => (
                <button
                  key={flow.id}
                  onClick={() => handleJumpToSlide(i)}
                  className={`px-2.5 sm:px-3 py-1 font-['JetBrains_Mono'] text-[11px] font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeSlide === i
                      ? 'bg-[#0080FB] text-white shadow-[0_0_15px_rgba(0,128,251,0.45)]'
                      : 'text-[#616c82] hover:text-white hover:bg-[#161c28]'
                  }`}
                >
                  <span>{flow.number}</span>
                  <span className="hidden sm:inline-block text-[10px] opacity-80">{flow.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* Arrow Next */}
            <button
              onClick={() => handleJumpToSlide(activeSlide + 1)}
              disabled={activeSlide === flowsList.length - 1}
              className="w-8 h-8 rounded border border-[#1e222d] bg-[#0c1017]/90 text-white flex items-center justify-center hover:border-[#0080FB] hover:text-[#0080FB] disabled:opacity-30 disabled:hover:border-[#1e222d] disabled:hover:text-white transition-all shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
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
              className="w-screen shrink-0 h-full flex items-center justify-center px-3 sm:px-6 lg:px-8 py-2 relative"
            >
              {/* Card & Pipeline Container */}
              <div className="w-full max-w-[1460px] xl:max-w-[1520px] 2xl:max-w-[1580px] relative my-auto">
                
                {/* Glassmorphic Cyber Slide Card Container */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 border border-[#202636] bg-[#0a0d14]/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden items-center my-auto rounded-none relative">
                  
                  {/* Subtle top edge neon line indicator */}
                  <div 
                    className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-60" 
                  />

                  {/* LEFT COLUMN: Flow Architectural Specs */}
                  <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-11 border-b lg:border-b-0 lg:border-r border-[#1e2434] flex flex-col justify-between bg-[#080b11] relative overflow-hidden">
                    
                    {/* Huge Watermark Number in Background */}
                    <span className="font-['Hanken_Grotesk'] font-black text-[9rem] sm:text-[11rem] md:text-[13rem] leading-none text-[#121722]/60 select-none pointer-events-none absolute -bottom-6 -right-6 z-0">
                      {flow.number}
                    </span>

                    {/* Header Meta: Icon & Sequence */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-[#0080FB] bg-[#0080FB]/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,128,251,0.25)]">
                          {renderIcon(flow.iconName)}
                        </div>
                        <div>
                          <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] tracking-[0.2em] font-bold uppercase">
                            {flow.seq} // PIPELINE
                          </div>
                          <div className="font-['JetBrains_Mono'] text-[10px] text-[#63728f] uppercase">
                            Shopify Webhook Sync
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#101520] border border-[#232b3c] font-['JetBrains_Mono'] text-[10px] text-[#8695b0] uppercase font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        <span>Sub-second: {flow.latency}</span>
                      </div>
                    </div>

                    {/* Title & Core Copy */}
                    <div className="my-auto relative z-10">
                      <h3 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] text-white uppercase tracking-tight mb-3 leading-[0.94]">
                        {flow.titleLine1}<br />
                        <span className="text-[#0080FB] glow-text">{flow.titleLine2}</span>
                      </h3>

                      <p className="font-['Hanken_Grotesk'] text-sm sm:text-base text-[#9aa5bb] leading-relaxed max-w-xl mb-5">
                        {flow.description}
                      </p>

                      {/* High-Impact KPI Badge & Product Context */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-1.5 text-[#25D366] font-['JetBrains_Mono'] text-xs font-bold tracking-wider shadow-[0_0_20px_rgba(37,211,102,0.15)]">
                          <TrendingUp className="w-4 h-4 text-[#25D366]" />
                          <span>{flow.kpiBadge}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-[#121722] border border-[#232b3c] px-3.5 py-1.5 text-[#c1cbdc] font-['JetBrains_Mono'] text-[11px] font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-[#0080FB]" />
                          <span>{flow.productBadge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Trigger Protocol & Actions */}
                    <div className="pt-4 border-t border-[#1e2434] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="border-l-2 border-[#0080FB] pl-3 py-0.5">
                        <div className="font-['JetBrains_Mono'] text-[10px] text-[#55637d] uppercase tracking-wider font-semibold">
                          EVENT TRIGGER PROTOCOL
                        </div>
                        <div className="font-['JetBrains_Mono'] text-xs font-bold text-[#0080FB] uppercase tracking-wide flex items-center gap-1.5">
                          <code>{flow.triggerProtocol}</code>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onNotify(`Template "${flow.titleLine1} ${flow.titleLine2}" downloaded into workspace!`)}
                          className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-5 py-3 tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,128,251,0.35)] active:scale-95"
                        >
                          <span>DEPLOY TEMPLATE</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Realistic Live WhatsApp Interactive Device Simulator */}
                  <div className="lg:col-span-5 bg-[#06080d] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
                    
                    {/* Spotlight behind phone */}
                    <div 
                      className="absolute w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none opacity-30"
                      style={{
                        background: 'radial-gradient(circle, #0080FB 0%, #25D366 50%, transparent 75%)'
                      }}
                    />

                    {/* Floating HUD Telemetry Pill 1: Top Right */}
                    <div className="hidden sm:flex absolute top-4 right-3 sm:right-6 lg:right-4 z-30 bg-[#0c121d]/90 border border-[#25D366]/40 px-3 py-1.5 rounded-md backdrop-blur-md items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.2)]">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                      <div className="text-[10px] font-['JetBrains_Mono']">
                        <span className="text-white font-bold block leading-none">WEBHOOK DISPATCH</span>
                        <span className="text-[#25D366] text-[9px]">Status: 200 OK • {flow.latency}</span>
                      </div>
                    </div>

                    {/* Floating HUD Telemetry Pill 2: Bottom Left */}
                    <div className="hidden sm:flex absolute bottom-4 left-3 sm:left-6 lg:left-4 z-30 bg-[#0c121d]/90 border border-[#0080FB]/40 px-3 py-1.5 rounded-md backdrop-blur-md items-center gap-2 shadow-[0_0_20px_rgba(0,128,251,0.2)]">
                      <Zap className="w-3.5 h-3.5 text-[#0080FB]" />
                      <div className="text-[10px] font-['JetBrains_Mono']">
                        <span className="text-white font-bold block leading-none">{flow.kpiBadge.split(' ')[0]} RECOVERY</span>
                        <span className="text-[#8898b0] text-[9px]">WhatsApp Cloud API</span>
                      </div>
                    </div>

                    {/* Smartphone Hardware Frame */}
                    <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[480px] sm:h-[510px] md:h-[530px] rounded-[38px] p-2.5 bg-gradient-to-b from-[#2a3242] via-[#161c26] to-[#0f131a] border-[2px] border-[#364154] shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(0,128,251,0.2)] flex flex-col overflow-hidden">
                      
                      {/* Inner Device Screen */}
                      <div className="w-full h-full rounded-[28px] bg-[#0b141a] flex flex-col overflow-hidden relative border border-[#1e2736]">
                        
                        {/* Dynamic Island Notch */}
                        <div className="w-24 h-4 bg-black rounded-full mx-auto my-1.5 flex items-center justify-end px-2 gap-1 z-30 shrink-0 shadow-inner">
                          <span className="w-2 h-2 rounded-full bg-[#111928] border border-white/10" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0080FB]/50" />
                        </div>

                        {/* WhatsApp Header Bar */}
                        <div className="bg-[#202c33] px-3 py-2 flex items-center justify-between border-b border-[#2a3942] shrink-0 z-20 shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#0080FB]/20 border border-[#0080FB]/40 flex items-center justify-center font-bold text-xs text-[#0080FB]">
                              CR
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-['Hanken_Grotesk'] text-xs font-bold text-white tracking-tight leading-none">
                                  {flow.storeName}
                                </span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] flex items-center justify-center text-[8px] text-black font-black">
                                  ✓
                                </span>
                              </div>
                              <span className="font-['JetBrains_Mono'] text-[9px] text-[#25D366] leading-none block mt-0.5 font-medium">
                                Official WhatsApp Cloud API
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 text-[#aebac1]">
                            <Video className="w-3.5 h-3.5" />
                            <Phone className="w-3.5 h-3.5" />
                            <MoreVertical className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* WhatsApp Chat Canvas */}
                        <div className="flex-1 overflow-y-auto p-3 flex flex-col justify-end gap-2.5 bg-[#0b141a] text-xs relative select-none cyber-grid-dense opacity-95">
                          
                          {/* Security Disclaimer Banner */}
                          <div className="mx-auto bg-[#182229]/90 border border-[#222e35] text-[9px] text-[#8696a0] px-2.5 py-1 rounded-md text-center max-w-[270px] flex items-center justify-center gap-1 shadow-sm shrink-0">
                            <Lock className="w-2.5 h-2.5 text-[#ffd279] shrink-0" />
                            <span>Messages are end-to-end encrypted.</span>
                          </div>

                          {/* Product / Milestone Card */}
                          <div className="bg-[#182229] border border-[#2a3942] p-2.5 rounded-xl shadow-md max-w-[95%]">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-ping" />
                              <span className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold uppercase tracking-wider">
                                AUTOMATED WEBHOOK DISPATCH
                              </span>
                            </div>
                            <div className="font-bold text-[#e9edef] text-xs leading-snug">
                              {flow.productPreviewTitle}
                            </div>
                            <div className="text-[10px] text-[#8696a0] mt-0.5">
                              {flow.productPreviewSubtitle}
                            </div>
                          </div>

                          {/* Store Message Bubble */}
                          <div className="bg-[#202c33] text-[#e9edef] p-2.5 rounded-2xl rounded-tl-sm max-w-[95%] shadow-md border border-[#2a3942] text-xs leading-relaxed">
                            <p>{flow.incomingMessage}</p>
                            <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#8696a0]">
                              <span>{flow.timestamp}</span>
                              <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                            </div>
                          </div>

                          {/* Interactive WhatsApp Quick-Reply Buttons */}
                          <div className="flex flex-col gap-1.5 max-w-[95%]">
                            {flow.interactiveButtons.map((btn, btnIdx) => (
                              <button
                                key={btnIdx}
                                onClick={() => handleTestInteractiveButton(flow.id, btn)}
                                className="w-full bg-[#202c33] hover:bg-[#00a884] text-[#00a884] hover:text-white border border-[#2a3942] hover:border-[#00a884] py-1.5 px-3 rounded-lg font-['JetBrains_Mono'] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm group"
                              >
                                <span>{btn}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>

                          {/* Customer Simulated Reply Bubble */}
                          <div className="self-end bg-[#005c4b] text-[#e9edef] p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md text-xs leading-relaxed">
                            <p>{flow.userReply}</p>
                            <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#8696a0]">
                              <span>{flow.timestamp}</span>
                              <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                            </div>
                          </div>

                        </div>

                        {/* WhatsApp Bottom Input Bar */}
                        <div className="bg-[#202c33] px-2.5 py-1.5 flex items-center gap-2 border-t border-[#2a3942] shrink-0 text-[#8696a0]">
                          <Smile className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                          <Paperclip className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                          <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-1 text-[11px] text-[#8696a0]">
                            {testedFlows[flow.id] ? 'Reply dispatched ✓' : 'Type a message...'}
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow">
                            <Mic className="w-3.5 h-3.5" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>

                {/* Between-Card Cyber Data Bridge (connecting this card to the next across the gap) */}
                {index < flowsList.length - 1 && (
                  <div 
                    className="hidden xl:flex absolute top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none"
                    style={{
                      right: 'calc((100vw - 100%) / -2)',
                      transform: 'translate(50%, -50%)',
                      width: 'calc(max(200px, (100vw - 100%)))',
                    }}
                  >
                    {/* Glowing Laser Data Rails & Bridge Capsule */}
                    <div className="w-full relative flex items-center justify-center py-6">
                      {/* Top Neon Laser Rail */}
                      <div className="absolute top-2 w-full h-[2px] bg-gradient-to-r from-[#0080FB] via-[#25D366] to-[#0080FB] shadow-[0_0_15px_#0080FB] opacity-65" />
                      
                      {/* Ambient Glow in the Gap */}
                      <div className="absolute w-56 h-36 bg-[#0080FB]/15 rounded-full blur-[50px] pointer-events-none" />

                      {/* High-Tech Telemetry Capsule */}
                      <div className="relative z-10 px-4 py-2.5 bg-[#090d15]/95 border border-[#0080FB]/50 shadow-[0_0_35px_rgba(0,128,251,0.35)] backdrop-blur-xl flex flex-col items-center gap-1 rounded-sm">
                        <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold tracking-widest uppercase">
                          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                          <span>SYNAPSE 0{index + 1} ➔ 0{index + 2}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-['JetBrains_Mono'] text-[9px] text-[#25D366] font-semibold">
                          <span>API DISPATCH BUS</span>
                          <ArrowRight className="w-3 h-3 text-[#25D366] animate-pulse" />
                        </div>
                      </div>

                      {/* Bottom Neon Laser Rail */}
                      <div className="absolute bottom-2 w-full h-[2px] bg-gradient-to-r from-[#25D366] via-[#0080FB] to-[#25D366] shadow-[0_0_15px_#25D366] opacity-65" />
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Footer: Visual Progress Line & Indicator */}
        <div className="w-full px-4 sm:px-8 md:px-14 shrink-0 z-20 flex items-center justify-between gap-6 pt-1">
          {/* Scroll instruction indicator */}
          <div className="font-['JetBrains_Mono'] text-[10px] sm:text-[11px] text-[#63708a] flex items-center gap-2 uppercase">
            <span className="text-[#0080FB] font-bold">SCROLL TO ROTATE FLOWS</span>
            <span>• ARCHITECTURE {activeSlide + 1} OF {flowsList.length}</span>
          </div>

          {/* Interactive Slide Dots */}
          <div className="hidden sm:flex items-center gap-2">
            {flowsList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => handleJumpToSlide(dotIdx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === dotIdx
                    ? 'w-6 h-1.5 bg-[#0080FB] shadow-[0_0_10px_#0080FB]'
                    : 'w-1.5 h-1.5 bg-[#2c364c] hover:bg-[#526388]'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Scrub Progress Bar */}
          <div className="w-32 sm:w-56 md:w-72 h-1.5 bg-[#171d28] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0080FB] via-[#00a884] to-[#25D366] transition-all duration-150"
              style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
