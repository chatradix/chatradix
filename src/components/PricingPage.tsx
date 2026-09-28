import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShoppingCart, 
  Package, 
  ArrowRight, 
  Check, 
  Zap, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Plus, 
  Minus,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  BadgeCheck
} from 'lucide-react';

interface PricingPageProps {
  onNotify: (msg: string) => void;
  onNavigateHome: (targetSection?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNotify, onNavigateHome }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // 6 Flagship Plans from merchant specifications
  const plans = [
    {
      id: 'free',
      name: 'FREE',
      badge: 'GET STARTED',
      monthlyPrice: 0,
      messages: 200,
      description: 'Ideal for new stores exploring WhatsApp automation and testing 2-way COD flows.',
      recommendedOrders: '0 – 100 orders/mo',
      popular: false,
      ctaText: 'INSTALL FREE TIER',
    },
    {
      id: 'basic',
      name: 'BASIC',
      badge: 'STARTER STORE',
      monthlyPrice: 3.99,
      messages: 2500,
      description: 'Essential automated order confirmation and abandoned checkout recovery for growing shops.',
      recommendedOrders: '100 – 600 orders/mo',
      popular: false,
      ctaText: 'START WITH BASIC',
    },
    {
      id: 'grow',
      name: 'GROW',
      badge: 'MOST POPULAR // BEST VALUE',
      monthlyPrice: 7.99,
      messages: 6000,
      description: 'Expanded message volume for scaling Shopify brands running regular carousel drops.',
      recommendedOrders: '600 – 1,500 orders/mo',
      popular: true,
      ctaText: 'SELECT GROW PLAN',
    },
    {
      id: 'advance',
      name: 'ADVANCE',
      badge: 'HIGH CONVERSION',
      monthlyPrice: 14.99,
      messages: 15000,
      description: 'Our flagship capacity for high-converting stores requiring multi-step sequences.',
      recommendedOrders: '1,500 – 4,000 orders/mo',
      popular: false,
      ctaText: 'SELECT ADVANCE PLAN',
    },
    {
      id: 'plus',
      name: 'PLUS',
      badge: 'HIGH VOLUME',
      monthlyPrice: 24.99,
      messages: 35000,
      description: 'Built for high-volume stores managing heavy order volume and automated COD verification.',
      recommendedOrders: '4,000 – 10,000 orders/mo',
      popular: false,
      ctaText: 'SELECT PLUS PLAN',
    },
    {
      id: 'pro',
      name: 'PRO',
      badge: 'ENTERPRISE SCALE',
      monthlyPrice: 49.99,
      messages: 75000,
      description: 'Maximum throughput for top-tier Shopify Plus merchants, wholesale, and massive seasonal spikes.',
      recommendedOrders: '10,000+ orders/mo',
      popular: false,
      ctaText: 'SELECT PRO ENTERPRISE',
    },
  ];

  // Features included in 100% of all plans without gating
  const coreFeatures = [
    {
      title: 'Automated 2-Way COD Verification',
      desc: 'Automatic Shopify order tagging when customer taps confirm or cancel on WhatsApp.',
      category: 'Workflows',
    },
    {
      title: 'Abandoned Checkout Recovery',
      desc: 'Dynamic single-tap shortlinks (/r/:token) that restore cart items and auto-apply discounts.',
      category: 'Workflows',
    },
    {
      title: 'Interactive 10-Card Product Carousels',
      desc: 'Broadcast multi-item visual product drops directly in chat with native Buy Now buttons.',
      category: 'Marketing',
    },
    {
      title: 'Meta Official Cloud API v20.0',
      desc: 'Direct enterprise infrastructure with sub-second (<12ms) delivery and zero third-party delay.',
      category: 'Meta Platform',
    },
    {
      title: 'WhatsApp Coexistence Mode',
      desc: 'Keep using your regular WhatsApp mobile business app while Cloud API runs concurrently.',
      category: 'Meta Platform',
    },
    {
      title: 'Shopify Admin 1-Click Extensions',
      desc: 'Trigger manual updates and quick template sends directly from your native Shopify Orders dashboard.',
      category: 'Shopify Native',
    },
    {
      title: 'Anti-Spam & Duplicate Shield',
      desc: 'Protects customers from duplicate alerts and eliminates bot-generated fake cash-on-delivery orders.',
      category: 'Security',
    },
    {
      title: '0% Revenue Commission',
      desc: 'Keep 100% of all sales and recovered carts. We charge zero cut or hidden transaction commissions.',
      category: 'Value Guarantee',
    },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'Are all features really unlocked on the Free and $3.99 Basic plan?',
      a: 'Yes, 100%! We believe in zero feature gating. Every single ChatRadix plan—from Free to Pro—has full access to 2-way COD verification, abandoned cart recovery, 10-card carousels, and the official Meta Cloud API. You only choose a plan based on the message volume your store needs.',
    },
    {
      q: 'What happens if my store exceeds its monthly message limit?',
      a: 'We never abruptly shut off your critical customer flows. You will receive an automated early warning notification at 80% and 95% quota usage. If you exceed the quota, you can upgrade instantly with 1 click in your Shopify admin, or continue with standard overage messaging at transparent rates.',
    },
    {
      q: 'Do you take any percentage commission on recovered checkout revenue?',
      a: 'Zero. Unlike competitors that charge 2% to 5% commission on recovered carts, ChatRadix takes 0% commission. You retain 100% of your store revenue.',
    },
    {
      q: 'Can I change, upgrade, or downgrade my plan at any time?',
      a: 'Yes. All billing is handled safely and transparently through your native Shopify Billing API. Upgrades and downgrades take effect immediately, and Shopify prorates charges automatically.',
    },
    {
      q: 'How does Meta WhatsApp Cloud API billing work?',
      a: 'ChatRadix connects directly to Meta Official Cloud API. Meta grants every WhatsApp Business Account 1,000 free service conversations per month. For paid marketing conversations, Meta charges standard official local rates without any markup from ChatRadix.',
    },
  ];

  return (
    <div id="pricing" className="w-full bg-[#06080d] text-[#e5e2e1] pt-28 sm:pt-32 lg:pt-36 pb-20 selection:bg-[#0080FB] selection:text-white relative">
      
      {/* Dynamic Ambient Electric Blue Glow */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] pointer-events-none rounded-full blur-[200px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,128,251,0.6) 0%, rgba(0,80,200,0.2) 50%, transparent 70%)'
        }}
      />

      <div className="max-w-[1580px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* ==============================================================
            PAGE HERO & TITLE
        ============================================================== */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          
          {/* Breadcrumb Technical Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0080FB]/10 border border-[#0080FB]/30 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(0,128,251,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-pulse" />
            <span>TRANSPARENT TIER ARCHITECTURE</span>
          </div>

          <h1 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[0.98] mb-6 text-white">
            PREDICTABLE PRICING. <br />
            <span className="text-[#0080FB]">ALL FEATURES INCLUDED.</span>
          </h1>

          <p className="font-['Hanken_Grotesk'] text-base sm:text-lg text-[#9aa5bb] leading-relaxed max-w-2xl font-normal mb-8">
            Every plan unlocks 100% of our WhatsApp automation engines, 2-way COD verification, and Meta Cloud API. <span className="text-white font-semibold">Zero feature gating.</span> Pick the message quota that matches your store's scale.
          </p>

          {/* Value Proposition Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-['JetBrains_Mono'] text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1626] border border-[#1d2b42] text-[#8ea4c8]">
              <BadgeCheck className="w-4 h-4 text-[#0080FB]" />
              <span>All 12+ Features Included in Every Plan</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1626] border border-[#1d2b42] text-[#8ea4c8]">
              <ShieldCheck className="w-4 h-4 text-[#0080FB]" />
              <span>0% Extra Commission</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e1626] border border-[#1d2b42] text-[#8ea4c8]">
              <Zap className="w-4 h-4 text-[#0080FB]" />
              <span>14-Day Free Trial on Shopify</span>
            </span>
          </div>

        </div>

        {/* ==============================================================
            THE 6 PRICING TIERS GRID
        ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#0080FB] bg-gradient-to-b from-[#0e1728]/95 via-[#09101d]/95 to-[#060a12]/98 shadow-[0_20px_60px_rgba(0,128,251,0.22)] scale-[1.02] z-20'
                    : 'border border-[#1a253a] hover:border-[#0080FB]/50 bg-gradient-to-b from-[#0b1220]/80 via-[#070b14]/80 to-[#05070d]/90 hover:shadow-[0_15px_40px_rgba(0,128,251,0.1)]'
                }`}
              >
                {/* Glowing Top Rail on featured plan */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent" />
                )}

                <div>
                  {/* Plan Top Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-['Hanken_Grotesk'] font-black text-2xl uppercase tracking-tight text-white">
                      {plan.name}
                    </span>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-['JetBrains_Mono'] font-bold tracking-widest uppercase ${
                      plan.popular
                        ? 'bg-[#0080FB] text-white shadow-[0_0_12px_#0080FB]'
                        : 'bg-[#10192a] border border-[#1e2d47] text-[#8ea4c8]'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-['JetBrains_Mono'] text-4xl sm:text-5xl font-black text-white">
                        ${plan.monthlyPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-['JetBrains_Mono'] text-[#63728f] uppercase">
                        / month
                      </span>
                    </div>
                  </div>

                  {/* Message Quota Hero Callout */}
                  <div className="bg-[#0d1626] border border-[#1b2a42] rounded-2xl p-4 mb-6">
                    <div className="font-['JetBrains_Mono'] text-[10px] text-[#0080FB] font-bold uppercase tracking-wider mb-1">
                      MONTHLY INCLUDED QUOTA
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="font-['JetBrains_Mono'] text-2xl font-black text-white">
                        {plan.messages.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#8ea4c8] font-['JetBrains_Mono']">
                        Messages / mo
                      </span>
                    </div>
                    <span className="text-[11px] text-[#63728f] block mt-1.5 border-t border-[#18253b] pt-1.5">
                      Recommended for: <strong className="text-white">{plan.recommendedOrders}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-[#9aa5bb] leading-relaxed mb-6 font-normal">
                    {plan.description}
                  </p>

                  {/* What's Unlocked in this Plan */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[10px] font-['JetBrains_Mono'] font-bold text-[#63728f] uppercase tracking-wider mb-2">
                      INCLUDED CAPABILITIES:
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span><strong>{plan.messages.toLocaleString()}</strong> WhatsApp Messages / month</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>Instant 2-Way COD Verification & Tags</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>Smart Abandoned Cart Link Generator (/r/:token)</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>Interactive 10-Card Product Carousels</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>Meta Official Cloud API & Coexistence Mode</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>Sub-second 12ms Webhook Engine</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#c7d3e6]">
                      <Check className="w-3.5 h-3.5 text-[#0080FB] shrink-0" />
                      <span>24/7 Support & 0% Revenue Commission</span>
                    </div>
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div>
                  <a
                    href="https://apps.shopify.com/chatradix"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onNotify(`Redirecting to Shopify App Store for ${plan.name} Plan...`)}
                    className={`w-full py-3.5 px-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      plan.popular
                        ? 'bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white shadow-[0_0_25px_rgba(0,128,251,0.45)]'
                        : 'bg-[#10192a] hover:bg-[#0080FB] text-[#0080FB] hover:text-white border border-[#1e2d47] hover:border-[#0080FB]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#556987] text-center block mt-2">
                    Direct Shopify Billing API • Cancel anytime
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* ==============================================================
            ALL PLANS INCLUDE: COMPREHENSIVE FEATURE BREAKDOWN
        ============================================================== */}
        <div className="mb-24 bg-[#0a101d] border border-[#1a253a] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold tracking-widest uppercase block mb-2">
              // COMPLETE FEATURE MANIFESTO
            </span>
            <h2 className="font-['Hanken_Grotesk'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Included in Every Single Plan (No Gating)
            </h2>
            <p className="text-sm text-[#9aa5bb] mt-2">
              Unlike other apps that lock basic features behind $100+ tiers, ChatRadix provides all 12 enterprise automations on every tier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat) => (
              <div 
                key={feat.title}
                className="bg-[#0e1626] border border-[#1b283d] rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/15 text-[#0080FB] uppercase mb-3 inline-block">
                    {feat.category}
                  </span>
                  <h4 className="font-bold text-sm text-white mb-1.5">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#8ea4c8] leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-['JetBrains_Mono'] text-[#25D366] mt-4 pt-3 border-t border-[#162236]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Unlocked in All Tiers</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ==============================================================
            TRANSPARENT META CLOUD API PROTOCOL EXPLANATION
        ============================================================== */}
        <div className="mb-24 bg-gradient-to-r from-[#0b1424] via-[#09101c] to-[#070b14] border border-[#1b2b42] rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-[#0080FB]" />
              <span>OFFICIAL META WHATSAPP PLATFORM PARTNER</span>
            </div>
            <h3 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
              How Does Meta's Official Pricing Work?
            </h3>
            <p className="text-xs sm:text-sm text-[#9aa5bb] leading-relaxed mb-4">
              ChatRadix connects directly to Meta's Official Cloud API. Every WhatsApp Business Account receives <strong className="text-white">1,000 free service conversations per month</strong> directly from Meta. For outbound utility & marketing messages, Meta bills at their official country wholesale rates with <strong className="text-white">0% markup from ChatRadix</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-['JetBrains_Mono']">
              <span className="text-[#25D366] flex items-center gap-1">
                ✓ 1,000 Free Meta Service Conversations / mo
              </span>
              <span className="text-[#0080FB] flex items-center gap-1">
                ✓ Zero API Markup Guaranteed
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href="https://apps.shopify.com/chatradix"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-8 py-4 rounded-xl uppercase tracking-widest flex items-center gap-2 shadow-[0_0_25px_rgba(0,128,251,0.4)] transition-all"
            >
              <span>CONNECT META API NOW</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ==============================================================
            FAQ ACCORDION
        ============================================================== */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold tracking-widest uppercase block mb-1">
              // CLARIFICATIONS & POLICIES
            </span>
            <h2 className="font-['Hanken_Grotesk'] font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-[#0a101d] border border-[#1a253a] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                    aria-expanded={isExpanded}
                  >
                    <span className="font-['Hanken_Grotesk'] font-bold text-base sm:text-lg text-white">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-[#111928] border border-[#202e48] flex items-center justify-center text-[#0080FB] shrink-0">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#9aa5bb] leading-relaxed border-t border-[#131d2e]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            BOTTOM CONVERSION CTA BANNER
        ============================================================== */}
        <div className="w-full bg-[#0a101d] border border-[#0080FB]/40 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(0,128,251,0.15)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-90" />
          
          <h2 className="font-['Hanken_Grotesk'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            START AUTOMATING WITH CHATRADIX TODAY
          </h2>
          
          <p className="text-sm sm:text-base text-[#9aa5bb] max-w-xl mx-auto mb-8 font-normal">
            Install ChatRadix on your Shopify store in under 60 seconds with Meta Embedded Signup. All features included from Day 1.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.shopify.com/chatradix"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onNotify("Opening Shopify App Store for ChatRadix...")}
              className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-8 py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,128,251,0.45)] transition-all active:scale-95"
            >
              <span>INSTALL ON SHOPIFY (14-DAY TRIAL)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigateHome('flows')}
              className="px-6 py-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold text-[#8ea4c8] hover:text-white bg-[#101828] hover:bg-[#162238] border border-[#1e2e47] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Flagship Flows</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
