import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ArrowUpRight, 
  Sparkles,
  Info,
  TrendingDown,
  Zap,
  ExternalLink,
  ChevronRight,
  Sliders,
  DollarSign,
  Layers,
  HelpCircle,
  Activity,
  Check
} from 'lucide-react';
import { META_RATES_DATA, MetaCountryRate } from '../data/metaRatesData';

interface MetaRatesPageProps {
  onNotify: (msg: string) => void;
  onNavigateHome: (targetSection?: string) => void;
  onNavigatePricing: () => void;
}

export const MetaRatesPage: React.FC<MetaRatesPageProps> = ({ 
  onNotify, 
  onNavigateHome,
  onNavigatePricing 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('pakistan');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [calcVolume, setCalcVolume] = useState<number>(5000);

  // Top 6 featured benchmark countries requested
  const featuredCountryIds = ['pakistan', 'india', 'egypt', 'united-states', 'united-kingdom', 'canada'];
  
  const featuredCountries = useMemo(() => {
    return featuredCountryIds
      .map(id => META_RATES_DATA.find(c => c.id === id))
      .filter((c): c is MetaCountryRate => Boolean(c));
  }, []);

  // Filtered countries based on user search and region
  const filteredCountries = useMemo(() => {
    let result = META_RATES_DATA;

    if (activeRegionFilter === 'featured') {
      result = result.filter(c => featuredCountryIds.includes(c.id));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(c => 
        c.country.toLowerCase().includes(q) || 
        c.callingCode.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeRegionFilter]);

  // Selected Country details
  const activeCountry = useMemo(() => {
    return META_RATES_DATA.find(c => c.id === selectedCountryId) || featuredCountries[0];
  }, [selectedCountryId, featuredCountries]);

  // Volume calculator calculations
  const utilityCost = useMemo(() => {
    return (calcVolume * activeCountry.utility).toFixed(2);
  }, [calcVolume, activeCountry]);

  const marketingCost = useMemo(() => {
    return (calcVolume * activeCountry.marketing).toFixed(2);
  }, [calcVolume, activeCountry]);

  // Estimated savings vs typical aggregator markup ($0.008/msg markup)
  const estimatedMarkupSavings = useMemo(() => {
    return (calcVolume * 0.008).toFixed(2);
  }, [calcVolume]);

  const volumePresets = [1000, 2500, 5000, 15000, 35000, 75000];

  return (
    <div id="meta-rates" className="w-full bg-[#06080d] text-[#e5e2e1] pt-28 sm:pt-32 lg:pt-36 pb-24 selection:bg-[#0080FB] selection:text-white relative">
      
      {/* Background Cyber Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #0080FB 1px, transparent 1px), linear-gradient(to bottom, #0080FB 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Dynamic Ambient Electric Blue Glow */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] pointer-events-none rounded-full blur-[200px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(0,128,251,0.55) 0%, rgba(37,211,102,0.12) 45%, transparent 70%)'
        }}
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">

        {/* ==============================================================
            1. PAGE HERO & TELEMETRIC HEADER
        ============================================================== */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          
          {/* Protocol Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0080FB]/10 border border-[#0080FB]/35 text-xs font-['JetBrains_Mono'] text-[#0080FB] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_25px_rgba(0,128,251,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#0080FB] animate-ping" />
            <span>/// OFFICIAL META CLOUD API v20.0 WHOLESALE DIRECTORY ///</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.96] mb-6 text-white">
            META WHATSAPP RATES <br />
            <span className="text-[#0080FB] drop-shadow-[0_0_35px_rgba(0,128,251,0.4)]">
              BY COUNTRY
            </span>
          </h1>

          <p className="font-['Hanken_Grotesk'] text-base sm:text-lg text-[#9aa5bb] leading-relaxed max-w-2xl font-normal mb-8">
            Official wholesale per-conversation rates direct from Meta's API rate card. ChatRadix connects directly with <span className="text-white font-semibold underline decoration-[#0080FB] decoration-2 underline-offset-4">0% extra markup</span>—you pay wholesale Meta pricing with complete transparency.
          </p>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl font-['JetBrains_Mono'] text-xs">
            <div className="bg-[#0b1220]/90 border border-[#1b283d] rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center">
              <span className="text-[#0080FB] font-bold text-base sm:text-lg">200+</span>
              <span className="text-[10px] text-[#63728f] uppercase tracking-wider mt-0.5">Countries Covered</span>
            </div>
            
            <div className="bg-[#0b1220]/90 border border-[#1b283d] rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center">
              <span className="text-[#25D366] font-bold text-base sm:text-lg">0.00%</span>
              <span className="text-[10px] text-[#63728f] uppercase tracking-wider mt-0.5">ChatRadix Markup</span>
            </div>

            <div className="bg-[#0b1220]/90 border border-[#1b283d] rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center">
              <span className="text-white font-bold text-base sm:text-lg">1,000 / mo</span>
              <span className="text-[10px] text-[#63728f] uppercase tracking-wider mt-0.5">Free Meta Service Msgs</span>
            </div>

            <div className="bg-[#0b1220]/90 border border-[#1b283d] rounded-xl px-4 py-3 flex flex-col items-center justify-center text-center">
              <span className="text-[#0080FB] font-bold text-base sm:text-lg">OCT 1, 2026</span>
              <span className="text-[10px] text-[#63728f] uppercase tracking-wider mt-0.5">Official Rate Schedule</span>
            </div>
          </div>

        </div>

        {/* ==============================================================
            2. TOP GLOBAL MARKETS — HIGH-IMPACT BENTO CARDS
            (Pakistan, India, Egypt, United States, United Kingdom, Canada)
        ============================================================== */}
        <div className="mb-20">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#1b283d] pb-5">
            <div>
              <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold tracking-widest uppercase mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0080FB]" />
                <span>BENCHMARK DESTINATIONS</span>
              </div>
              <h2 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Top Merchant Markets
              </h2>
            </div>
            <span className="text-xs font-['JetBrains_Mono'] text-[#63728f]">
              Click any country card to spotlight live telemetry & cost simulator
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCountries.map((c) => {
              const isSelected = c.id === activeCountry.id;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCountryId(c.id);
                    const inspectorEl = document.getElementById('rate-inspector');
                    if (inspectorEl) {
                      inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  className={`group relative rounded-2xl p-5 sm:p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? 'border-2 border-[#0080FB] bg-gradient-to-b from-[#0f1b2f] via-[#09111f] to-[#060a12] shadow-[0_15px_45px_rgba(0,128,251,0.28)] scale-[1.01]'
                      : 'border border-[#1a253a] hover:border-[#0080FB]/60 bg-gradient-to-b from-[#0c1424]/90 via-[#080d18]/90 to-[#050810]/95 hover:shadow-[0_10px_35px_rgba(0,128,251,0.12)]'
                  }`}
                >
                  {/* Active Top Glowing Accent Line */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent" />
                  )}

                  <div>
                    {/* Header Row: Flag + Name + Calling Code + Status */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl drop-shadow-md select-none">{c.flag}</span>
                        <div>
                          <h3 className="font-['Hanken_Grotesk'] font-bold text-lg text-white group-hover:text-[#0080FB] transition-colors leading-tight">
                            {c.country}
                          </h3>
                          <span className="font-['JetBrains_Mono'] text-xs text-[#63728f] block">
                            Dial: <strong className="text-[#8ea4c8]">{c.callingCode}</strong>
                          </span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-['JetBrains_Mono'] font-bold tracking-wider uppercase transition-all ${
                        isSelected 
                          ? 'bg-[#0080FB] text-white shadow-[0_0_12px_#0080FB]' 
                          : 'bg-[#10192a] border border-[#1e2d47] text-[#63728f] group-hover:text-[#8ea4c8] group-hover:border-[#0080FB]/40'
                      }`}>
                        {isSelected ? 'INSPECTING' : 'SELECT'}
                      </span>
                    </div>

                    {/* Dual Rates Telemetry Matrix */}
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      
                      {/* Utility Rate Card */}
                      <div className={`p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#0080FB]/10 border-[#0080FB]/40'
                          : 'bg-[#0b1220] border-[#162236]'
                      }`}>
                        <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] font-semibold text-[#0080FB] uppercase mb-1">
                          <span>Utility</span>
                          <span className="text-[9px] text-[#25D366]">COD</span>
                        </div>
                        <div className="font-['JetBrains_Mono'] text-xl font-black text-white">
                          ${c.utility.toFixed(4)}
                        </div>
                        <span className="text-[9px] font-['JetBrains_Mono'] text-[#63728f] block mt-0.5">
                          per 2-way alert
                        </span>
                      </div>

                      {/* Marketing Rate Card */}
                      <div className="p-3 rounded-xl bg-[#0b1220] border border-[#162236]">
                        <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] font-semibold text-[#f59e0b] uppercase mb-1">
                          <span>Marketing</span>
                          <span className="text-[9px] text-[#8ea4c8]">Promo</span>
                        </div>
                        <div className="font-['JetBrains_Mono'] text-xl font-black text-white">
                          ${c.marketing.toFixed(4)}
                        </div>
                        <span className="text-[9px] font-['JetBrains_Mono'] text-[#63728f] block mt-0.5">
                          per carousel/blast
                        </span>
                      </div>

                    </div>

                    {/* Minor Specs: Authentication & Service */}
                    <div className="bg-[#080e18] border border-[#141e2e] rounded-xl px-3 py-2 space-y-1 text-[11px] font-['JetBrains_Mono'] text-[#8ea4c8] mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#63728f]">Authentication (OTP):</span>
                        <span className="text-white font-bold">${c.authentication.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#63728f]">Service Conversation:</span>
                        <span className="text-[#25D366] font-bold">${c.service.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-3 border-t border-[#162236] flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#0080FB] group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{isSelected ? 'Live in inspector below' : 'Load deep breakdown'}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ==============================================================
            3. INTERACTIVE COUNTRY RATE INSPECTOR & COST SIMULATOR
        ============================================================== */}
        <div id="rate-inspector" className="w-full mb-20 scroll-mt-36">
          
          <div className="bg-gradient-to-b from-[#0e1728] via-[#09101d] to-[#060a12] border-2 border-[#0080FB] rounded-3xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,128,251,0.22)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent" />
            
            {/* Inspector Header: Selected Country Banner */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#1b283d] mb-8">
              
              <div className="flex items-start sm:items-center gap-4">
                <span className="text-5xl sm:text-6xl drop-shadow-md select-none">{activeCountry.flag}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h2 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                      {activeCountry.country}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold bg-[#0080FB]/20 text-[#0080FB] border border-[#0080FB]/40">
                      {activeCountry.callingCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold bg-[#141e2e] text-[#8ea4c8] border border-[#1f2e47]">
                      {activeCountry.currency}
                    </span>
                  </div>
                  <span className="text-xs font-['JetBrains_Mono'] text-[#63728f] block">
                    Official Meta Wholesale Rate Schedule • Direct API Passthrough
                  </span>
                </div>
              </div>

              {/* Status & Markup Guarantees */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] font-bold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/35 flex items-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>0% CHATRADIX MARKUP GUARANTEE</span>
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] font-bold bg-[#0e1626] text-[#8ea4c8] border border-[#1b2a42]">
                  TIER: WHOLESALE META
                </span>
              </div>

            </div>

            {/* 4 Deep Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
              
              {/* 1. Utility Rate Card */}
              <div className="bg-[#0b1322] border-2 border-[#0080FB] rounded-2xl p-5 flex flex-col justify-between relative shadow-[0_0_30px_rgba(0,128,251,0.18)]">
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-md text-[9px] font-['JetBrains_Mono'] font-black bg-[#0080FB] text-white uppercase tracking-wider shadow-[0_0_10px_#0080FB]">
                  CORE UTILITY
                </span>
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-[#0080FB]/20 text-[#0080FB] uppercase mb-2 inline-block">
                    UTILITY CONVERSATIONS
                  </span>
                  <div className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-[#0080FB] my-2">
                    ${activeCountry.utility.toFixed(4)}
                  </div>
                  <p className="text-xs text-[#8ea4c8] leading-relaxed mb-3">
                    2-way cash on delivery confirmations, automated Shopify order tagging, dispatch notices, and tracking numbers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1a2942] text-[10px] font-['JetBrains_Mono'] text-[#25D366] flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Volume tiers: up to -25% discount</span>
                </div>
              </div>

              {/* 2. Marketing Rate Card */}
              <div className="bg-[#0b1220] border border-[#1a273e] hover:border-[#f59e0b]/50 rounded-2xl p-5 flex flex-col justify-between transition-all">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-[#f59e0b]/15 text-[#f59e0b] uppercase mb-2 inline-block">
                    MARKETING CONVERSATIONS
                  </span>
                  <div className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white my-2">
                    ${activeCountry.marketing.toFixed(4)}
                  </div>
                  <p className="text-xs text-[#8ea4c8] leading-relaxed mb-3">
                    High-converting 10-card product carousels, abandoned checkout dynamic restore links, and custom merchant broadcasts.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#162236] text-[10px] font-['JetBrains_Mono'] text-[#556987]">
                  Charged only per delivered template
                </div>
              </div>

              {/* 3. Authentication Rate Card */}
              <div className="bg-[#0b1220] border border-[#1a273e] hover:border-[#a855f7]/50 rounded-2xl p-5 flex flex-col justify-between transition-all">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-[#a855f7]/15 text-[#a855f7] uppercase mb-2 inline-block">
                    AUTHENTICATION (OTP)
                  </span>
                  <div className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-white my-2">
                    ${activeCountry.authentication.toFixed(4)}
                  </div>
                  <p className="text-xs text-[#8ea4c8] leading-relaxed mb-3">
                    One-time login passwords, secure customer account sign-ins, and checkout verification codes.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#162236] text-[10px] font-['JetBrains_Mono'] text-[#8ea4c8]">
                  {activeCountry.authInternational 
                    ? `Intl OTP: $${activeCountry.authInternational.toFixed(4)}`
                    : 'Domestic standard OTP tier'}
                </div>
              </div>

              {/* 4. Service Rate Card */}
              <div className="bg-[#0b1220] border border-[#1a273e] hover:border-[#25D366]/50 rounded-2xl p-5 flex flex-col justify-between transition-all">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold bg-[#25D366]/15 text-[#25D366] uppercase mb-2 inline-block">
                    SERVICE CONVERSATIONS
                  </span>
                  <div className="font-['JetBrains_Mono'] text-3xl sm:text-4xl font-black text-[#25D366] my-2">
                    ${activeCountry.service.toFixed(4)}
                  </div>
                  <p className="text-xs text-[#8ea4c8] leading-relaxed mb-3">
                    Inbound customer support messages answered within the standard 24-hour service window.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#162236] text-[10px] font-['JetBrains_Mono'] text-[#25D366] font-bold">
                  ✓ 1,000 Free conversations / month
                </div>
              </div>

            </div>

            {/* Interactive Live Message Cost Simulator */}
            <div className="bg-[#080d17] border border-[#1b2a42] rounded-2xl p-6 sm:p-8">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold uppercase tracking-wider mb-1">
                    <Sliders className="w-4 h-4 text-[#0080FB]" />
                    <span>MONTHLY WHOLESALE COST ESTIMATOR</span>
                  </div>
                  <h3 className="font-['Hanken_Grotesk'] font-bold text-xl sm:text-2xl text-white">
                    Simulate Your Monthly WhatsApp Spend for {activeCountry.country}
                  </h3>
                </div>

                {/* Preset Volume Quick Buttons */}
                <div className="flex flex-wrap items-center gap-2 font-['JetBrains_Mono'] text-xs">
                  {volumePresets.map((vol) => (
                    <button
                      key={vol}
                      onClick={() => setCalcVolume(vol)}
                      className={`px-3 py-1.5 rounded-lg border transition-all ${
                        calcVolume === vol
                          ? 'bg-[#0080FB] text-white border-[#0080FB] shadow-[0_0_10px_#0080FB]'
                          : 'bg-[#0e1626] border-[#1b2b42] text-[#8ea4c8] hover:text-white hover:border-[#0080FB]'
                      }`}
                    >
                      {vol.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Controller */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-['JetBrains_Mono'] text-[#63728f] mb-2">
                  <span>Selected Monthly Volume: <strong className="text-white">{calcVolume.toLocaleString()} messages</strong></span>
                  <span>Range: 500 – 100,000 msgs</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={calcVolume}
                  onChange={(e) => setCalcVolume(Number(e.target.value))}
                  className="w-full h-2 bg-[#121c2c] rounded-lg appearance-none cursor-pointer accent-[#0080FB]"
                />
              </div>

              {/* Output Cost Cards Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="bg-[#0b1322] border border-[#1e2f4a] rounded-xl p-4">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#0080FB] uppercase font-bold block mb-1">
                    Utility (2-Way COD) Meta Cost
                  </span>
                  <div className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-black text-white">
                    ${utilityCost} <span className="text-xs text-[#63728f] font-normal">USD / mo</span>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#63728f] block mt-1">
                    Based on ${activeCountry.utility.toFixed(4)} / message
                  </span>
                </div>

                <div className="bg-[#0b1322] border border-[#1e2f4a] rounded-xl p-4">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#f59e0b] uppercase font-bold block mb-1">
                    Marketing (Carousels) Meta Cost
                  </span>
                  <div className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-black text-white">
                    ${marketingCost} <span className="text-xs text-[#63728f] font-normal">USD / mo</span>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#63728f] block mt-1">
                    Based on ${activeCountry.marketing.toFixed(4)} / message
                  </span>
                </div>

                <div className="bg-[#091b1a] border border-[#25D366]/40 rounded-xl p-4 shadow-[0_0_20px_rgba(37,211,102,0.1)]">
                  <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#25D366] uppercase font-bold mb-1">
                    <span>ChatRadix Added Fee</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#25D366]/20 text-[#25D366] text-[9px]">0% MARKUP</span>
                  </div>
                  <div className="font-['JetBrains_Mono'] text-2xl sm:text-3xl font-black text-[#25D366]">
                    $0.00 <span className="text-xs text-[#8ea4c8] font-normal">USD</span>
                  </div>
                  <span className="text-[10px] font-['JetBrains_Mono'] text-[#25D366] block mt-1">
                    You save ~${estimatedMarkupSavings}/mo vs aggregator markup
                  </span>
                </div>

              </div>

            </div>

            {/* Bottom Callout Info Strip */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1b283d]">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#0080FB] shrink-0" />
                <span className="text-xs text-[#8ea4c8]">
                  Meta bills directly to your linked credit card or Meta Business Manager account. ChatRadix charges zero extra transaction commissions.
                </span>
              </div>

              <button
                onClick={onNavigatePricing}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>View ChatRadix Software Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* ==============================================================
            4. SEARCH & FILTER CONSOLE FOR ALL 47 MARKETS
        ============================================================== */}
        <div className="mb-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#0080FB] font-bold tracking-widest uppercase mb-1">
                <Globe className="w-4 h-4 text-[#0080FB]" />
                <span>OFFICIAL PDF RATE DIRECTORY</span>
              </div>
              <h2 className="font-['Hanken_Grotesk'] font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                All Global Markets ({META_RATES_DATA.length})
              </h2>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 font-['JetBrains_Mono'] text-xs">
              <button
                onClick={() => setActiveRegionFilter('all')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeRegionFilter === 'all'
                    ? 'bg-[#0080FB] text-white border-[#0080FB]'
                    : 'bg-[#0c1424] border-[#1a273e] text-[#8ea4c8] hover:text-white'
                }`}
              >
                All Markets ({META_RATES_DATA.length})
              </button>
              <button
                onClick={() => setActiveRegionFilter('featured')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  activeRegionFilter === 'featured'
                    ? 'bg-[#0080FB] text-white border-[#0080FB]'
                    : 'bg-[#0c1424] border-[#1a273e] text-[#8ea4c8] hover:text-white'
                }`}
              >
                Top Featured (6)
              </button>
            </div>
          </div>

          {/* Integrated Cyber Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-[#556987]">
              <Search className="w-5 h-5 text-[#0080FB]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by country name, dial code (e.g. +92, +91, +20, +1, +44), or region..."
              className="w-full pl-12 sm:pl-14 pr-16 py-4 rounded-2xl bg-[#0a101d] border-2 border-[#1a253a] focus:border-[#0080FB] text-white placeholder-[#556987] font-['Hanken_Grotesk'] text-sm sm:text-base outline-none transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus:shadow-[0_0_25px_rgba(0,128,251,0.35)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-xs font-['JetBrains_Mono'] text-[#63728f] hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Table Container */}
          <div className="bg-[#0a101d] border border-[#1a253a] rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1b283d] bg-[#0c1424] text-[11px] font-['JetBrains_Mono'] text-[#63728f] uppercase tracking-wider">
                    <th className="py-4 px-5">Market / Country</th>
                    <th className="py-4 px-4">Dial Code</th>
                    <th className="py-4 px-4 text-[#0080FB]">Utility (2-Way COD)</th>
                    <th className="py-4 px-4 text-[#f59e0b]">Marketing</th>
                    <th className="py-4 px-4 text-[#a855f7]">Authentication</th>
                    <th className="py-4 px-4 text-[#63728f]">Auth (Intl)</th>
                    <th className="py-4 px-4 text-[#25D366]">Service</th>
                    <th className="py-4 px-5 text-right">Quick Select</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131d2e] text-xs font-['JetBrains_Mono']">
                  {filteredCountries.map((c) => {
                    const isCurrent = c.id === activeCountry.id;

                    return (
                      <tr 
                        key={c.id} 
                        className={`hover:bg-[#0f1726]/80 transition-colors ${
                          isCurrent ? 'bg-[#0080FB]/15' : ''
                        }`}
                      >
                        <td className="py-3.5 px-5 font-['Hanken_Grotesk'] font-medium text-white flex items-center gap-3">
                          <span className="text-xl select-none">{c.flag}</span>
                          <div>
                            <span className="font-bold text-sm text-white">{c.country}</span>
                            {c.notes && (
                              <span className="text-[10px] text-[#63728f] font-['JetBrains_Mono'] block">
                                {c.notes}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#8ea4c8]">{c.callingCode}</td>
                        <td className="py-3.5 px-4 text-[#0080FB] font-bold text-sm">
                          ${c.utility.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 text-[#f59e0b] font-bold text-sm">
                          ${c.marketing.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 text-white">
                          ${c.authentication.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-4 text-[#8ea4c8]">
                          {c.authInternational ? `$${c.authInternational.toFixed(4)}` : '—'}
                        </td>
                        <td className="py-3.5 px-4 text-[#25D366] font-bold">
                          ${c.service.toFixed(4)}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => {
                              setSelectedCountryId(c.id);
                              const el = document.getElementById('rate-inspector');
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                              isCurrent
                                ? 'bg-[#0080FB] text-white shadow-[0_0_10px_#0080FB]'
                                : 'bg-[#10192a] hover:bg-[#0080FB] text-[#8ea4c8] hover:text-white border border-[#1d2c44]'
                            }`}
                          >
                            {isCurrent ? 'ACTIVE' : 'INSPECT'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredCountries.length === 0 && (
              <div className="py-16 text-center text-[#63728f] font-['JetBrains_Mono'] text-sm">
                No matching country found for "{searchQuery}". Try searching by country name or dial code (e.g. +92, +91).
              </div>
            )}
          </div>

        </div>

        {/* ==============================================================
            5. TRANSPARENT VALUE PROPOSITION & SHOPIFY TRIAL BANNER
        ============================================================== */}
        <div className="w-full bg-gradient-to-b from-[#0b1220] via-[#080d17] to-[#05070d] border border-[#0080FB]/50 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_20px_70px_rgba(0,128,251,0.2)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0080FB] to-transparent opacity-90" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-xs font-['JetBrains_Mono'] text-[#25D366] font-bold uppercase mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>DIRECT META CLOUD API PASSTHROUGH</span>
          </div>

          <h2 className="font-['Hanken_Grotesk'] font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            NO HIDDEN MARKUPS. DIRECT META INVOICING.
          </h2>
          
          <p className="text-sm sm:text-base text-[#9aa5bb] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            ChatRadix provides complete Shopify 2-way COD verification, abandoned checkout recovery, and 10-card product carousels without charging any percentage cut or wholesale conversation markups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.shopify.com/chatradix"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onNotify("Opening Shopify App Store for ChatRadix...")}
              className="bg-[#0080FB] hover:bg-white hover:text-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-8 py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,128,251,0.45)] transition-all active:scale-95"
            >
              <span>INSTALL ON SHOPIFY (14-DAY TRIAL)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={onNavigatePricing}
              className="px-6 py-4 rounded-xl font-['JetBrains_Mono'] text-xs font-bold text-[#8ea4c8] hover:text-white bg-[#101828] hover:bg-[#162238] border border-[#1e2e47] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore ChatRadix Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
