import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Zap,
  ShoppingBag,
  Bell,
  MessageSquare,
  Truck,
  RotateCcw,
  Star,
  Users,
  Grid,
  TrendingUp,
  FileText
} from 'lucide-react';
import { CHATRADIX_AUTOMATIONS, AutomationItem } from './UltimateFlows';

interface AutomationsPageProps {
  onNotify?: (msg: string) => void;
  onNavigateHome: (targetSection?: string) => void;
}

export const AutomationsPage: React.FC<AutomationsPageProps> = ({ 
  onNotify, 
  onNavigateHome 
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pre' | 'post' | 'admin'>('all');

  const categories = [
    { id: 'all', label: 'ALL AUTOMATIONS (12)' },
    { id: 'pre', label: 'PRE-PURCHASE & SALES (4)' },
    { id: 'post', label: 'POST-PURCHASE & FULFILLMENT (5)' },
    { id: 'admin', label: 'ADMIN & RETENTION (3)' },
  ];

  const getFilteredItems = (): AutomationItem[] => {
    if (activeCategory === 'pre') {
      return CHATRADIX_AUTOMATIONS.filter(item => [8, 10, 11, 12].includes(item.id));
    }
    if (activeCategory === 'post') {
      return CHATRADIX_AUTOMATIONS.filter(item => [1, 2, 3, 4, 9].includes(item.id));
    }
    if (activeCategory === 'admin') {
      return CHATRADIX_AUTOMATIONS.filter(item => [5, 6, 7].includes(item.id));
    }
    return CHATRADIX_AUTOMATIONS;
  };

  const getCategoryBadge = (id: number) => {
    switch(id) {
      case 1: return 'CHECKOUT VERIFICATION';
      case 2: return 'SHIPPING & LOGISTICS';
      case 3: return 'DELIVERY CONFIRMATION';
      case 4: return 'FRAUD & REFUND';
      case 5: return 'CUSTOM EVENTS';
      case 6: return 'STORE ALERTS';
      case 7: return 'B2B INVOICES';
      case 8: return 'REVENUE RECOVERY';
      case 9: return 'SOCIAL PROOF & UGC';
      case 10: return 'VIP RETENTION';
      case 11: return 'INTERACTIVE COMMERCE';
      case 12: return 'CHURN PREVENTION';
      default: return 'AUTOMATION';
    }
  };

  const getFeatureIcon = (id: number) => {
    switch(id) {
      case 1: return <Check className="w-5 h-5 text-[#25D366]" />;
      case 2: return <Truck className="w-5 h-5 text-[#38BDF8]" />;
      case 3: return <Sparkles className="w-5 h-5 text-[#25D366]" />;
      case 4: return <ShieldCheck className="w-5 h-5 text-[#0080FB]" />;
      case 5: return <Bell className="w-5 h-5 text-[#38BDF8]" />;
      case 6: return <Zap className="w-5 h-5 text-[#25D366]" />;
      case 7: return <FileText className="w-5 h-5 text-[#0080FB]" />;
      case 8: return <ShoppingBag className="w-5 h-5 text-[#25D366]" />;
      case 9: return <Star className="w-5 h-5 text-[#25D366]" />;
      case 10: return <Users className="w-5 h-5 text-[#38BDF8]" />;
      case 11: return <Grid className="w-5 h-5 text-[#25D366]" />;
      case 12: return <RotateCcw className="w-5 h-5 text-[#25D366]" />;
      default: return <Zap className="w-5 h-5 text-[#25D366]" />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#070A0F] text-[#E5E2E1] pb-24 font-['Hanken_Grotesk'] selection:bg-[#0080FB] selection:text-white">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-10 pb-6 flex items-center justify-between border-b border-white/10">
        <button
          onClick={() => onNavigateHome()}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1 rounded-full">
            ● 12 FLOWS PRODUCTION READY
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-12 pb-10 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#25D366]">
            Official Shopify WhatsApp Suite
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
          ChatRadix <span className="bg-gradient-to-r from-[#25D366] via-teal-300 to-[#38BDF8] bg-clip-text text-transparent">Automations</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed mb-8">
          Explore all 12 official WhatsApp Business Cloud API flows built exclusively for Shopify stores. 
          Recover abandoned checkouts, confirm orders with 2-way tags, and broadcast product carousels with zero phone-ban risk.
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#25D366] text-[#050A10] shadow-[0_0_20px_rgba(37,211,202,0.4)]'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4-COLUMNS GRID OF ALL 12 FEATURES */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredItems().map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#090E16] border border-white/10 hover:border-[#25D366]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(37,211,102,0.15)]"
            >
              {/* Card Top: Number + Category Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-[#25D366]/40 transition-colors">
                    {getFeatureIcon(item.id)}
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-400 group-hover:text-[#25D366] transition-colors">
                    {item.id.toString().padStart(2, '0')} / 12
                  </span>
                </div>

                <div className="inline-block text-[10px] font-mono font-bold tracking-wider text-[#25D366] uppercase bg-[#25D366]/10 border border-[#25D366]/20 px-2.5 py-1 rounded-md mb-3">
                  {getCategoryBadge(item.id)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#25D366] transition-colors mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[44px]">
                  {item.desc}
                </p>

                {/* 3 Bullet Points with Checkmarks */}
                <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.08] mb-6">
                  {item.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-snug">
                      <span className="text-[#25D366] font-bold mt-0.5">✓</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href="https://apps.shopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#25D366] group-hover:text-white transition-colors"
                >
                  <span>Install on Shopify</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <span className="text-[10px] font-mono text-gray-400">
                  Shopify Live
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mt-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C1A24] via-[#09121B] to-[#070D14] border border-[#25D366]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,211,102,0.15)]">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#25D366] mb-2 block">
              Instant 60-Second Shopify Setup
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
              Ready to automate your store with WhatsApp?
            </h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Connect your Shopify store via Meta's Official Cloud API. Zero phone bans, 99.99% uptime, and instant two-way automation.
            </p>
          </div>

          <a
            href="https://apps.shopify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Install on Shopify</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
