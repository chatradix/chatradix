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
  FileText,
  Settings,
  X,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Tag,
  Phone,
  Send
} from 'lucide-react';

interface AutomationsPageProps {
  onNotify?: (msg: string) => void;
  onNavigateHome: (targetSection?: string) => void;
}

export interface AutomationFeature {
  id: number;
  title: string;
  badge?: {
    label: string;
    type: 'recovery' | 'feedback' | 'hot' | 'vip';
  };
  desc: string;
  bullets: string[];
  trigger: string;
  previewMessage: {
    header?: string;
    body: string;
    footer?: string;
    buttons?: string[];
  };
}

export interface CategoryGroup {
  id: string;
  name: string;
  badge: {
    label: string;
    type: 'essential' | 'recovery' | 'marketing' | 'internal';
  };
  description: string;
  features: AutomationFeature[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'transactional',
    name: 'Transactional & Shipping',
    badge: {
      label: 'Essential',
      type: 'essential'
    },
    description: 'Core automated notifications for each stage of customer orders & fulfillment.',
    features: [
      {
        id: 1,
        title: 'Order Confirmation',
        desc: 'Confirm each new order immediately on WhatsApp, giving customers a clear receipt and helpful reassurance that their purchase is now being prepared.',
        bullets: [
          '2-Way Quick Reply buttons (Confirm / Cancel).',
          'Automatically updates Shopify order tags.',
          'Duplicate order protection stops double shipment.'
        ],
        trigger: 'Shopify order placement (orders/create)',
        previewMessage: {
          header: 'Order Confirmed #1024',
          body: 'Hello Alex! Thank you for your purchase from ChatRadix Store. We are preparing your order for fast dispatch.',
          footer: 'ChatRadix Official Verified Store',
          buttons: ['Confirm Address', 'Cancel Order']
        }
      },
      {
        id: 2,
        title: 'Order Fulfillment',
        desc: 'Send fulfillment and tracking updates on WhatsApp, keeping customers informed as each order is packed, shipped, and moving toward delivery.',
        bullets: [
          'Fires instantly upon Shopify fulfillment creation.',
          'Dynamic carrier name, tracking numbers & live URLs.',
          'Cuts "Where is my order?" support tickets by 70%.'
        ],
        trigger: 'Shopify fulfillment creation (fulfillments/create)',
        previewMessage: {
          header: 'Package Dispatched #1024',
          body: 'Great news Alex! Your items have shipped via DHL Express. Live tracking number: DHL-9482104.',
          footer: 'Tap below to trace your courier live',
          buttons: ['Track Shipment', 'View Order Details']
        }
      },
      {
        id: 3,
        title: 'Order Delivered',
        desc: 'Confirm delivery on WhatsApp when Shopify marks a fulfillment delivered, reassuring customers that their order has arrived safely at its destination.',
        bullets: [
          'Drop-off celebration message gives peace of mind.',
          'Invites customer to unbox and inspect their items.',
          'Minimizes false non-delivery disputes & chargebacks.'
        ],
        trigger: 'Shopify fulfillment delivered event',
        previewMessage: {
          header: 'Package Safely Delivered 🎉',
          body: 'Your package for order #1024 has safely arrived at your doorstep! We hope you love your new purchase.',
          footer: 'Need any assistance with your items?',
          buttons: ['Help with Order', 'Shop Again']
        }
      },
      {
        id: 4,
        title: 'Order Cancellation',
        desc: 'Notify customers promptly when Shopify cancels an order, clearly explaining the update and giving them confidence about what happens next.',
        bullets: [
          'Delivers immediate reassurance when order is voided.',
          'Outlines clear refund & store credit timelines.',
          'Drastically reduces angry inquiries and disputes.'
        ],
        trigger: 'Shopify order cancelled (orders/cancelled)',
        previewMessage: {
          header: 'Order Cancelled #1024',
          body: 'Your order #1024 has been cancelled as requested. Any pending payments will be returned to your original payment method in 3-5 business days.',
          footer: 'ChatRadix Store Support',
          buttons: ['Contact Support', 'Browse Store']
        }
      },
      {
        id: 5,
        title: 'Order Notification',
        desc: 'Send a tailored customer notification for selected Shopify events, keeping important order updates visible and easy to act on in WhatsApp.',
        bullets: [
          'Custom-triggered WhatsApp updates for lifecycle events.',
          'Flexible variable mapping for items, address & tags.',
          'Supports PDF invoices, documents and rich attachments.'
        ],
        trigger: 'Custom Shopify event or manual trigger',
        previewMessage: {
          header: 'Order Update #1024',
          body: 'Here is an important update regarding your order #1024: your requested address modification has been applied successfully.',
          footer: 'ChatRadix Automated Concierge',
          buttons: ['View Invoice', 'Chat with Team']
        }
      }
    ]
  },
  {
    id: 'recovery',
    name: 'Sales recovery',
    badge: {
      label: 'Recovery',
      type: 'recovery'
    },
    description: 'Timely re-engagement flows to reclaim abandoned carts and finalize pending draft orders.',
    features: [
      {
        id: 7,
        title: 'Draft Order Recovery',
        desc: 'Recover incomplete draft orders with timely WhatsApp reminders, guiding customers back to checkout and helping them complete their purchase before interest fades.',
        bullets: [
          'Multi-sequence reminders for B2B & wholesale invoices.',
          'Delivers secure 1-tap tracked payment links in chat.',
          'Automatically stops follow-ups once invoice is paid.'
        ],
        trigger: 'Shopify draft order created & unpaid',
        previewMessage: {
          header: 'Pending Invoice Draft #DF-881',
          body: 'Hello Alex, your custom wholesale invoice for $380.00 is ready. Complete payment with 1 tap using our secure link below.',
          footer: 'Invoice expires in 48 hours',
          buttons: ['Complete Payment', 'Request Change']
        }
      },
      {
        id: 8,
        title: 'Abandoned Checkout Recovery',
        badge: {
          label: 'Recovery',
          type: 'recovery'
        },
        desc: 'Recover incomplete checkouts with timely WhatsApp reminders and a secure link that lets customers return to their cart with ease.',
        bullets: [
          '3-step automated recovery sequence with custom delays.',
          'Dynamic recovery links restore exact cart session.',
          'Injects exclusive discount codes to drive checkout.'
        ],
        trigger: 'Shopify checkout abandoned (checkouts/create)',
        previewMessage: {
          header: 'You Left Something Behind! 🛒',
          body: 'We noticed you left 2 items in your cart. We saved them for you! Use discount code RECOVER10 to enjoy 10% off your order right now.',
          footer: 'Reserved for next 2 hours only',
          buttons: ['Return to Cart (10% OFF)', 'Unsubscribe']
        }
      }
    ]
  },
  {
    id: 'growth',
    name: 'Premium & Growth',
    badge: {
      label: 'Marketing',
      type: 'marketing'
    },
    description: 'High-converting campaigns, product catalogs, and review requests to multiply customer lifetime value.',
    features: [
      {
        id: 9,
        title: 'Product review request',
        badge: {
          label: 'Feedback',
          type: 'feedback'
        },
        desc: 'Request helpful feedback seven days after delivery, giving customers time to try their order before sharing their experience.',
        bullets: [
          'Scheduled review request sent X days post-delivery.',
          'Direct links to Judge.me, Loox, Yotpo or Shopify Reviews.',
          'Builds social proof and drives high-converting UGC.'
        ],
        trigger: '7 days after fulfillment delivery event',
        previewMessage: {
          header: 'How Did We Do? ⭐⭐⭐⭐⭐',
          body: 'Hi Alex! It has been 7 days since your order arrived. How are you liking your new items? Tap below to leave a quick 5-star rating.',
          footer: 'Earn 50 loyalty points for reviewing',
          buttons: ['Rate Your Order', 'Share Photos']
        }
      },
      {
        id: 11,
        title: 'Product Spotlight Campaign',
        badge: {
          label: 'HOT',
          type: 'hot'
        },
        desc: 'Showcase selected products in a rich WhatsApp carousel after Shopify events, creating timely campaigns that encourage customers to discover and shop more.',
        bullets: [
          'Multi-card swipeable catalog showcase in WhatsApp.',
          'Up to 10 visual cards with image, price & Buy button.',
          'Customers browse & purchase directly in chat.'
        ],
        trigger: 'Interactive campaign broadcast trigger',
        previewMessage: {
          header: 'New Arrivals Just Dropped 🔥',
          body: 'Check out this week’s trending arrivals handpicked for you. Swipe through our interactive catalog cards below to shop directly in WhatsApp!',
          footer: 'ChatRadix Swipeable Catalog',
          buttons: ['Browse Catalog', 'View Lookbook']
        }
      },
      {
        id: 10,
        title: 'Customer Campaign',
        badge: {
          label: 'VIP',
          type: 'vip'
        },
        desc: 'Send an approved WhatsApp marketing template to selected customers from Shopify, using a safe queued delivery flow.',
        bullets: [
          'Broadcast targeted WhatsApp promos to top customer tiers.',
          'Filter by minimum lifetime spend & purchase history.',
          'Personalized names & exclusive VIP voucher codes.'
        ],
        trigger: 'Segment-based VIP marketing queue',
        previewMessage: {
          header: 'Exclusive VIP Invitation 👑',
          body: 'As one of our highest-tier VIP patrons, enjoy private early access to our seasonal flash collection with exclusive code VIPACCESS.',
          footer: 'Exclusive invitation for Alex',
          buttons: ['Shop VIP Sale', 'View Perks']
        }
      },
      {
        id: 12,
        title: 'Win-Back Customers',
        badge: {
          label: 'Recovery',
          type: 'recovery'
        },
        desc: 'Reconnect with customers who have not ordered recently through an automatic WhatsApp campaign built to encourage their return.',
        bullets: [
          'Automated re-engagement for inactive shoppers in X days.',
          'Built-in cooldown periods prevent spam & message fatigue.',
          'Win-back vouchers re-engage historically profitable buyers.'
        ],
        trigger: '60 days without new order placement',
        previewMessage: {
          header: 'We Miss You, Alex! 💌',
          body: 'It has been a while since your last visit. We just restocked your favorite styles and added new collections. Take 15% off with code COMEBACK15.',
          footer: 'Valid on your next checkout',
          buttons: ['Claim 15% Off', 'Explore Restocks']
        }
      }
    ]
  },
  {
    id: 'operations',
    name: 'Store operations',
    badge: {
      label: 'Internal',
      type: 'internal'
    },
    description: 'Instant internal sales alerts to keep owners, managers, and fulfillment teams synchronized.',
    features: [
      {
        id: 6,
        title: 'Admin Notification',
        desc: 'Alert store administrators about every new Shopify order in WhatsApp, helping the team review, prepare, and process customer requests quickly.',
        bullets: [
          'High-priority WhatsApp alerts direct to store owners.',
          'Displays order ID, customer name, total & payment mode.',
          'Instant alert to warehouse staff for rapid dispatch.'
        ],
        trigger: 'Immediate trigger upon any paid Shopify order',
        previewMessage: {
          header: '🚨 New Paid Order #1024',
          body: 'Customer: Alex Smith ($149.00 USD via Stripe). Items: 2x Premium Wireless Headphones. Shipping Address: New York, USA.',
          footer: 'Warehouse Dispatch Alert',
          buttons: ['Open in Shopify Admin', 'Print Packing Slip']
        }
      }
    ]
  }
];

export const AutomationsPage: React.FC<AutomationsPageProps> = ({ 
  onNotify, 
  onNavigateHome 
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [enabledFeatures, setEnabledFeatures] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    8: true
  });
  const [selectedFeatureForModal, setSelectedFeatureForModal] = useState<AutomationFeature | null>(null);

  // Storefront Chat button & Non-whatsapp customer states
  const [chatButtonCountry, setChatButtonCountry] = useState<string>('Pakistan (+92)');
  const [chatButtonPhone, setChatButtonPhone] = useState<string>('3263932418');
  const [chatButtonEnabled, setChatButtonEnabled] = useState<boolean>(true);
  const [nonWhatsAppTag, setNonWhatsAppTag] = useState<string>('WhatsApp Not Registered');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filterTabs = [
    { id: 'all', label: 'ALL PACKAGES (12)' },
    { id: 'transactional', label: 'TRANSACTIONAL & SHIPPING (5)' },
    { id: 'recovery', label: 'SALES RECOVERY (2)' },
    { id: 'growth', label: 'PREMIUM & GROWTH (4)' },
    { id: 'operations', label: 'STORE OPERATIONS (1)' },
  ];

  const handleToggleEnable = (id: number, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newState = !enabledFeatures[id];
    setEnabledFeatures(prev => ({
      ...prev,
      [id]: newState
    }));
    if (newState) {
      onNotify?.(`✓ Enabled "${title}" automation`);
    } else {
      onNotify?.(`Disabled "${title}" automation`);
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

  const renderBadge = (badge: { label: string; type: string }) => {
    switch (badge.type) {
      case 'essential':
        return (
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {badge.label}
          </span>
        );
      case 'recovery':
        return (
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#0080FB]/15 text-[#38BDF8] border border-[#0080FB]/30">
            {badge.label}
          </span>
        );
      case 'marketing':
        return (
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">
            {badge.label}
          </span>
        );
      case 'internal':
        return (
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {badge.label}
          </span>
        );
      case 'feedback':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0080FB]/20 text-[#38BDF8] border border-[#0080FB]/30">
            {badge.label}
          </span>
        );
      case 'hot':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            {badge.label}
          </span>
        );
      case 'vip':
        return (
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
            {badge.label}
          </span>
        );
      default:
        return null;
    }
  };

  const visibleGroups = activeCategoryFilter === 'all'
    ? CATEGORY_GROUPS
    : CATEGORY_GROUPS.filter(g => g.id === activeCategoryFilter);

  const totalActiveCount = Object.values(enabledFeatures).filter(Boolean).length;

  return (
    <div className="w-full min-h-screen bg-[#070A0F] text-[#E5E2E1] pb-24 font-['Hanken_Grotesk'] selection:bg-[#0080FB] selection:text-white">

      {/* Page Header (Exact Match to Reference Image - No Gradient) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-12 pb-8">
        
        {/* Header Row with Vertical Blue Bar, Solid White & Blue Heading, and Bottom Accent Line */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-8 relative">
          {/* Blue bottom highlight line */}
          <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-[#0080FB]" />

          <div className="flex items-start gap-4">
            {/* Vertical blue accent bar (exact from reference image) */}
            <div className="w-1.5 h-12 sm:h-14 md:h-16 bg-[#0080FB] shrink-0 mt-1" />

            <div>
              <h1 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-6xl md:text-7xl leading-none text-white uppercase tracking-tighter">
                CHATRADIX <span className="text-[#0080FB]">AUTOMATIONS</span>
              </h1>
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#0080FB] uppercase tracking-[0.2em] font-semibold mt-3">
                // OFFICIAL SHOPIFY WHATSAPP SUITE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>12 FLOWS PRODUCTION READY</span>
            </span>
          </div>
        </div>

        <p className="max-w-3xl text-sm md:text-base text-gray-400 leading-relaxed mb-8">
          Explore all 12 official WhatsApp Business Cloud API flows built exclusively for Shopify stores. 
          Recover abandoned checkouts, confirm orders with 2-way tags, and broadcast product carousels with zero phone-ban risk.
        </p>

        {/* Category Filters Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                activeCategoryFilter === tab.id
                  ? 'bg-[#25D366] text-[#050A10] shadow-[0_0_20px_rgba(37,211,102,0.3)]'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        
        {/* Automation Packages Section Header (Matching Screenshot) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-white/10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Automation packages
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Set up messages for key moments across your customer journey.
            </p>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full">
              <strong className="text-[#25D366] font-bold">{totalActiveCount}</strong> of 12 active
            </span>
          </div>
        </div>

        {/* CATEGORY GROUPS (Transactional & Shipping, Sales recovery, Premium & Growth, Store operations) */}
        <div className="space-y-12">
          {visibleGroups.map((group) => (
            <section key={group.id} className="relative">
              
              {/* Category Group Title & Badge Header */}
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {group.name}
                </h3>
                {renderBadge(group.badge)}
              </div>

              {/* Grid of feature cards in this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.features.map((feature) => {
                  const isEnabled = !!enabledFeatures[feature.id];

                  return (
                    <div
                      key={feature.id}
                      className="group relative rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 hover:border-[#25D366]/40 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/20"
                    >
                      {/* Top: Title + optional badge + status pill */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs">
                              {getFeatureIcon(feature.id)}
                            </span>
                            <h4 className="text-sm md:text-[15px] font-bold text-white tracking-tight group-hover:text-[#25D366] transition-colors">
                              {feature.title}
                            </h4>
                            {feature.badge && renderBadge(feature.badge)}
                          </div>

                          {/* Status Badge (Matching Screenshot: "Not enabled" or "Enabled") */}
                          <button
                            onClick={(e) => handleToggleEnable(feature.id, feature.title, e)}
                            title="Click to toggle status"
                            className={`shrink-0 text-[10px] font-mono px-2.5 py-0.5 rounded-full border transition-all ${
                              isEnabled
                                ? 'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/40 font-bold'
                                : 'bg-white/[0.04] text-gray-400 border-white/10 hover:text-white'
                            }`}
                          >
                            {isEnabled ? '● Enabled' : 'Not enabled'}
                          </button>
                        </div>

                        {/* Description (Exact text from screenshot) */}
                        <p className="text-xs text-gray-400 leading-relaxed min-h-[50px] mb-3">
                          {feature.desc}
                        </p>

                        {/* Feature Bullets (Clean specs) */}
                        <div className="space-y-1.5 pt-2.5 border-t border-white/[0.06] mb-4">
                          {feature.bullets.map((b, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300 leading-tight">
                              <span className="text-[#25D366] font-bold">✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Row (Matching Screenshot: "Enable →" & "Settings") */}
                      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                        <button
                          onClick={() => handleToggleEnable(feature.id, feature.title)}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#38BDF8] hover:text-[#25D366] transition-colors group-hover:underline"
                        >
                          <span>{isEnabled ? 'Disable' : 'Enable'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <button
                          onClick={() => setSelectedFeatureForModal(feature)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-lg transition-all"
                        >
                          <Settings className="w-3 h-3 text-gray-400" />
                          <span>Settings</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* STOREFRONT & TAGGING WIDGETS (Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          
          {/* WhatsApp Chat Button Widget */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <h3 className="text-base font-bold text-white">WhatsApp chat button</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40">
                  {chatButtonEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Let visitors begin a WhatsApp conversation from your storefront.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <select
                    value={chatButtonCountry}
                    onChange={(e) => setChatButtonCountry(e.target.value)}
                    className="w-full bg-[#070A0F] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                  >
                    <option value="Pakistan (+92)">Pakistan (+92)</option>
                    <option value="United States (+1)">United States (+1)</option>
                    <option value="United Kingdom (+44)">United Kingdom (+44)</option>
                    <option value="United Arab Emirates (+971)">United Arab Emirates (+971)</option>
                    <option value="Saudi Arabia (+966)">Saudi Arabia (+966)</option>
                    <option value="India (+91)">India (+91)</option>
                    <option value="Canada (+1)">Canada (+1)</option>
                    <option value="Australia (+61)">Australia (+61)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                    WhatsApp number
                  </label>
                  <input
                    type="text"
                    value={chatButtonPhone}
                    onChange={(e) => setChatButtonPhone(e.target.value)}
                    placeholder="3263932418"
                    className="w-full bg-[#070A0F] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08] flex-wrap">
              <button
                onClick={() => {
                  setChatButtonEnabled(true);
                  onNotify?.('✓ Storefront WhatsApp Chat Button saved & active!');
                }}
                className="px-4 py-2 rounded-xl bg-[#25D366] text-[#050A10] font-mono font-bold text-xs uppercase hover:bg-emerald-400 transition-colors"
              >
                Save and enable
              </button>

              <a
                href="https://admin.shopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors"
              >
                <span>Open theme editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Non-WhatsApp Customer Tagging Widget */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#38BDF8]" />
                  <h3 className="text-base font-bold text-white">Non-WhatsApp customer</h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#0080FB]/20 text-[#38BDF8] border border-[#0080FB]/40">
                  Order tag
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-5">
                Tag orders when Meta confirms that a customer number is not registered on WhatsApp.
              </p>

              <div className="mb-5">
                <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Tag to add
                </label>
                <input
                  type="text"
                  value={nonWhatsAppTag}
                  onChange={(e) => setNonWhatsAppTag(e.target.value)}
                  placeholder="WhatsApp Not Registered"
                  className="w-full bg-[#070A0F] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  onNotify?.(`✓ Saved order tag: "${nonWhatsAppTag}"`);
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono font-bold text-xs uppercase transition-colors"
              >
                Save tag
              </button>
            </div>
          </div>

        </div>

        {/* GUIDANCE & QUICK ANSWERS SECTION (Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          
          {/* Help & resources (Left Card) */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#0080FB]/10 border border-[#0080FB]/30 flex items-center justify-center text-[#38BDF8] mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Help & resources</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Get your WhatsApp automations live with practical merchant guidance.
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                <span className="text-[11px] font-mono text-gray-400 block mb-1">Email support</span>
                <a
                  href="mailto:info@chatradix.com"
                  className="text-xs font-mono font-bold text-[#25D366] hover:underline"
                >
                  info@chatradix.com
                </a>
              </div>
            </div>

            <a
              href="mailto:info@chatradix.com"
              className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-white font-mono font-bold text-xs text-center transition-colors block"
            >
              Contact Support
            </a>
          </div>

          {/* Quick Answers Accordion (Right Card - spans 2 cols) */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white">Quick answers</h3>
                <a 
                  href="mailto:info@chatradix.com" 
                  className="text-xs font-mono text-[#38BDF8] hover:underline"
                >
                  Help center
                </a>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Everything you need to start sending confidently.
              </p>

              {/* Accordion Items */}
              <div className="space-y-3 mb-6">
                {[
                  {
                    q: 'How do automations work?',
                    a: "Choose an approved WhatsApp template in an automation's settings. ChatRadix then sends it when the matching Shopify event occurs."
                  },
                  {
                    q: 'How do I connect WhatsApp Business?',
                    a: "Connect your Meta Business Manager and phone number through our official Embedded Signup in 60 seconds with zero manual API keys."
                  },
                  {
                    q: 'Why is my template pending approval?',
                    a: "Meta automatically reviews WhatsApp templates for compliance with business policies. Most automated order and transactional templates approve within 15 minutes."
                  },
                  {
                    q: 'How is store and customer data protected?',
                    a: "ChatRadix operates strictly on Meta's Official Cloud API with TLS 1.3 encryption. Your customer data never leaves secure sandboxed environments."
                  }
                ].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-white/[0.08] rounded-xl bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between text-xs md:text-sm font-medium text-white hover:text-[#25D366] transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#25D366] font-bold text-xs">{isOpen ? '▼' : '▶'}</span>
                          <span>{faq.q}</span>
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3.5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/[0.05] bg-white/[0.01]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links at Bottom of Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white mb-1">Explore templates</h4>
                <p className="text-[11px] text-gray-400 mb-2">Create a message ready for Meta approval.</p>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#38BDF8] hover:text-white transition-colors text-left"
                >
                  Open templates →
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-xs font-bold text-white mb-1">Send a first message</h4>
                <p className="text-[11px] text-gray-400 mb-2">Follow the guide for sending from Shopify Orders.</p>
                <a
                  href="https://apps.shopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#25D366] hover:text-white transition-colors"
                >
                  View guide →
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom CTA Banner */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 mt-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C1A24] via-[#09121B] to-[#070D14] border border-[#25D366]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
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
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap shadow-[0_0_25px_rgba(37,211,102,0.4)]"
          >
            <span>Install on Shopify</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Interactive Settings & Preview Modal */}
      {selectedFeatureForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0C111A] border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                  {getFeatureIcon(selectedFeatureForModal.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {selectedFeatureForModal.title}
                    </h3>
                    {selectedFeatureForModal.badge && renderBadge(selectedFeatureForModal.badge)}
                  </div>
                  <p className="text-xs text-gray-400">
                    Automation settings & WhatsApp template live preview
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFeatureForModal(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Settings + WhatsApp Bubble Preview */}
            <div className="space-y-6">
              
              {/* Trigger Info & Toggle */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                    Webhook Trigger
                  </span>
                  <p className="text-xs font-mono text-white">
                    {selectedFeatureForModal.trigger}
                  </p>
                </div>

                <button
                  onClick={() => handleToggleEnable(selectedFeatureForModal.id, selectedFeatureForModal.title)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    enabledFeatures[selectedFeatureForModal.id]
                      ? 'bg-[#25D366] text-[#050A10]'
                      : 'bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  {enabledFeatures[selectedFeatureForModal.id] ? '● Enabled' : 'Enable Automation'}
                </button>
              </div>

              {/* WhatsApp Live Preview Phone Bubble */}
              <div>
                <label className="block text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">
                  Official WhatsApp Cloud Template Preview
                </label>
                <div className="bg-[#0B141A] rounded-2xl p-4 md:p-6 border border-emerald-500/20 shadow-inner">
                  <div className="max-w-md mx-auto bg-[#1F2C34] rounded-2xl p-4 shadow-lg border border-white/5 text-white">
                    {selectedFeatureForModal.previewMessage.header && (
                      <div className="font-bold text-xs text-emerald-400 mb-1.5 pb-1 border-b border-white/10 flex items-center justify-between">
                        <span>{selectedFeatureForModal.previewMessage.header}</span>
                        <span className="text-[10px] font-normal text-gray-400">Official Template</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-line mb-2">
                      {selectedFeatureForModal.previewMessage.body}
                    </p>
                    {selectedFeatureForModal.previewMessage.footer && (
                      <p className="text-[10px] text-gray-400 italic mb-3">
                        {selectedFeatureForModal.previewMessage.footer}
                      </p>
                    )}
                    {selectedFeatureForModal.previewMessage.buttons && (
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        {selectedFeatureForModal.previewMessage.buttons.map((btn, bidx) => (
                          <div
                            key={bidx}
                            className="py-1.5 px-3 rounded-lg bg-[#2A3942] hover:bg-[#324450] text-[#00A884] text-xs font-semibold text-center cursor-pointer transition-colors"
                          >
                            {btn}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedFeatureForModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onNotify?.(`✓ Settings saved for "${selectedFeatureForModal.title}"`);
                    setSelectedFeatureForModal(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#25D366] text-[#050A10] font-mono font-bold text-xs uppercase hover:bg-emerald-400 transition-colors"
                >
                  Save Settings
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
