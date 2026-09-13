import React, { useState, useEffect } from 'react';
import { ShoppingCart, Truck, Megaphone, Check, ChevronRight, X, Phone, MoreVertical, Send } from 'lucide-react';

interface UltimateFlowsProps {
  onNotify: (msg: string) => void;
}

interface FlowItem {
  id: string;
  number: string;
  tag: string;
  tagColor: 'blue' | 'green';
  title: string;
  description: string;
  payload: string;
  icon: string;
  category: string;
  trigger: string;
  messageText: string;
  timestamp: string;
}

export const UltimateFlows: React.FC<UltimateFlowsProps> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const flowsList: FlowItem[] = [
    {
      id: 'flow-1',
      number: '01',
      tag: '/// 01 / ABANDONED CHECKOUT ///',
      tagColor: 'blue',
      title: 'ABANDONED CHECKOUT',
      description: 'Intercept lost revenue with high-urgency notifications. Triggered via checkout/update events.',
      payload: 'TRIGGER: CHECKOUT/UPDATE',
      icon: 'shopping_cart',
      category: 'RECOVERY',
      trigger: 'checkout/update',
      messageText: 'Hey Alex! 🛒 You left items in your cart. Here is a PERSONAL OFFER & recovery Coupon code for 10% off: SAVE10. Click below to complete your checkout before inventory sells out!',
      timestamp: '10:42 AM',
    },
    {
      id: 'flow-2',
      number: '02',
      tag: '/// 02 / SHIPPING UPDATES ///',
      tagColor: 'green',
      title: 'SHIPPING UPDATES',
      description: 'Automated fulfillment tracking. Reduces support tickets proactively with real-time delivery milestones.',
      payload: 'TRIGGER: ORDERS/FULFILLED',
      icon: 'truck',
      category: 'LOGISTICS',
      trigger: 'orders/fulfilled',
      messageText: 'Great news! 🚚 Your order #CR-9481 has shipped and is out for delivery with live tracking. Click to track shipment real-time.',
      timestamp: '02:15 PM',
    },
    {
      id: 'flow-3',
      number: '03',
      tag: '/// 03 / POST-PURCHASE UPSELL ///',
      tagColor: 'blue',
      title: 'POST-PURCHASE UPSELL',
      description: 'Deploy targeted offers based on cart contents immediately following successful transaction.',
      payload: 'TRIGGER: ORDERS/PAID',
      icon: 'megaphone',
      category: 'MONETIZATION',
      trigger: 'orders/paid',
      messageText: 'Thank you for your order! 🎉 Add our bestselling Protection Bundle to your shipment now for 20% off before it leaves our warehouse.',
      timestamp: '04:30 PM',
    },
  ];

  // Auto-switch tabs every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % flowsList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [flowsList.length]);

  const currentFlow = flowsList[activeTab];

  const handleCopyPayload = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onNotify('Flow payload copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="flows" className="mb-24 md:mb-32 w-full bg-[#0e0e0e] py-20 md:py-28 border-y border-[#262626] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #0080FB 0%, transparent 60%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-16">
          <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] tracking-[0.25em] uppercase font-semibold mb-3">
            /// 01 / AUTOMATED MESSAGING STACK
          </div>
          <h2 className="font-['Hanken_Grotesk'] font-black text-5xl md:text-7xl lg:text-[6rem] leading-none text-[#e5e2e1] uppercase tracking-tighter">
            ULTIMATE <span className="text-[#353534]">FLOWS</span>
          </h2>
        </div>

        {/* Content Layout: Left Spec Info & Right Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Active Flow Detail Card) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full bg-[#131313] border border-[#262626] p-8 md:p-12 relative group min-h-[440px]">
            <div className="font-['Hanken_Grotesk'] font-black text-7xl md:text-8xl text-[#262626] absolute top-6 right-8 select-none">
              {currentFlow.number}
            </div>

            <div className="relative z-10">
              <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#0080FB] tracking-[0.2em] mb-4">
                {currentFlow.tag}
              </div>

              <h3 className="font-['Hanken_Grotesk'] font-extrabold text-3xl md:text-5xl text-[#e5e2e1] uppercase tracking-tight mb-6 leading-tight transition-all duration-300">
                {currentFlow.title}
              </h3>

              <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#888888] leading-relaxed mb-8 min-h-[72px]">
                {currentFlow.description}
              </p>

              {/* Protocol Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="font-['JetBrains_Mono'] text-[11px] bg-[#0e0e0e] border border-[#0080FB]/30 text-[#0080FB] px-3 py-1.5 uppercase tracking-wider font-semibold">
                  {currentFlow.payload}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] bg-[#0e0e0e] border border-[#25D366]/30 text-[#25D366] px-3 py-1.5 uppercase tracking-wider font-semibold">
                  CATEGORY: {currentFlow.category}
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#262626] flex items-center justify-between">
              <button
                onClick={() => setShowAllModal(true)}
                className="bg-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-6 py-3.5 hover:bg-white hover:text-[#0080FB] transition-all uppercase tracking-[0.15em] flex items-center gap-2"
              >
                <span>VIEW ALL FLOWS STACK</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCopyPayload(currentFlow.messageText)}
                className="font-['JetBrains_Mono'] text-xs text-[#888888] hover:text-[#25D366] transition-colors flex items-center gap-1 uppercase"
              >
                {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : null}
                <span>{copied ? 'COPIED' : 'COPY PAYLOAD'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Precision Smartphone Frame / WhatsApp Chat Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Phone Container */}
            <div className="w-full max-w-[420px] bg-[#08090c] border-[6px] border-[#20232a] rounded-[40px] p-4 shadow-[0_0_50px_rgba(0,128,251,0.25)] relative overflow-hidden">
              {/* Notch */}
              <div className="w-32 h-5 bg-[#20232a] rounded-b-xl mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#111] mr-2" />
                <div className="w-10 h-1 bg-[#111] rounded-full" />
              </div>

              {/* WhatsApp App Header */}
              <div className="bg-[#1f2c34] px-4 py-3 rounded-t-2xl flex items-center justify-between border-b border-[#2a3942]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0080FB] text-white flex items-center justify-center font-bold text-sm">
                    CR
                  </div>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-white leading-tight">ChatRadix Store</h4>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                      Online • WhatsApp Verified
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[#aebac1]">
                  <Phone className="w-4 h-4" />
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>

              {/* WhatsApp Chat Body */}
              <div className="bg-[#0b141a] p-4 min-h-[320px] flex flex-col justify-end gap-3 font-sans relative" style={{ backgroundImage: 'radial-gradient(circle at center, #111b21 0%, #0b141a 100%)' }}>
                <div className="text-center my-2">
                  <span className="bg-[#182229] text-[#8696a0] font-['JetBrains_Mono'] text-[10px] px-3 py-1 rounded-md uppercase tracking-wider">
                    TODAY • AUTOMATED FLOW
                  </span>
                </div>

                {/* Chat Bubble */}
                <div key={currentFlow.id} className="bg-[#005c4b] text-[#e9edef] p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-[#007a63] shadow-md self-start relative animate-in fade-in slide-in-from-left duration-300">
                  <p className="text-xs md:text-sm leading-relaxed mb-2 font-['Hanken_Grotesk']">
                    {currentFlow.messageText}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#8696a0] mt-1 border-t border-white/10 pt-1">
                    <span>{currentFlow.timestamp}</span>
                    <span className="text-[#53bdeb] font-bold">✓✓ Read</span>
                  </div>
                </div>

                {/* Interactive Action Button inside WhatsApp */}
                <div className="bg-[#182229] border border-[#0080FB]/40 hover:border-[#0080FB] p-2.5 rounded-xl text-center cursor-pointer transition-all active:scale-95 text-[#0080FB] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider">
                  🛒 COMPLETE ORDER WITH 10% OFF
                </div>
              </div>

              {/* Phone Footer Input Mock */}
              <div className="bg-[#1f2c34] p-3 rounded-b-2xl flex items-center gap-2 mt-1">
                <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-[11px] text-[#8696a0] font-['JetBrains_Mono']">
                  Type a reply...
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                  <Send className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Dynamic Flow Selector Tabs below Phone with Progress Bar */}
            <div className="flex gap-2 mt-6 w-full max-w-[420px] justify-center">
              {flowsList.map((flow, index) => (
                <button
                  key={flow.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-2.5 px-3 font-['JetBrains_Mono'] text-[11px] font-semibold uppercase tracking-wider border relative overflow-hidden transition-all ${
                    activeTab === index
                      ? 'bg-[#0080FB] border-[#0080FB] text-white shadow-[0_0_15px_rgba(0,128,251,0.4)]'
                      : 'bg-[#131313] border-[#262626] text-[#888888] hover:text-white hover:border-[#0080FB]'
                  }`}
                >
                  <span>{flow.number} {flow.title.split(' ')[0]}</span>
                  {activeTab === index && (
                    <div 
                      key={`progress-${activeTab}`} 
                      className="absolute bottom-0 left-0 h-[2px] bg-white animate-[pulse_3s_linear]" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* View All Configurations Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-[#131313] border border-[#0080FB] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
            <button
              onClick={() => setShowAllModal(false)}
              className="absolute top-6 right-6 p-2 text-[#888888] hover:text-white border border-[#262626] hover:border-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <span className="font-['JetBrains_Mono'] text-xs text-[#0080FB] tracking-[0.2em] uppercase font-semibold">
                /// AUTOMATION STACK ARCHIVE
              </span>
              <h3 className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-extrabold uppercase text-[#e5e2e1] mt-2">
                All WhatsApp Flow Configurations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flowsList.map((f, i) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setActiveTab(i);
                    setShowAllModal(false);
                  }}
                  className={`bg-[#0e0e0e] border p-6 transition-all cursor-pointer ${
                    activeTab === i ? 'border-[#0080FB] bg-[#0080FB]/5' : 'border-[#262626] hover:border-[#0080FB]'
                  }`}
                >
                  <div className="font-['JetBrains_Mono'] text-xs text-[#0080FB] font-semibold mb-2">
                    {f.number} • {f.category}
                  </div>
                  <h4 className="font-['Hanken_Grotesk'] text-xl font-bold uppercase text-[#e5e2e1] mb-3">
                    {f.title}
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-xs text-[#888888] leading-relaxed mb-4">
                    {f.description}
                  </p>
                  <div className="font-['JetBrains_Mono'] text-[10px] text-[#25D366] bg-[#131313] p-2.5 border border-[#262626]">
                    {f.payload}
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
