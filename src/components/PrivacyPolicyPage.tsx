import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle2, 
  Server, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNotify?: (msg: string) => void;
  onNavigateHome: (targetSection?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ 
  onNotify, 
  onNavigateHome 
}) => {
  const lastUpdated = "July 10, 2026";

  return (
    <div className="w-full min-h-screen bg-[#070A0F] text-[#E5E2E1] pb-24 font-['Hanken_Grotesk'] selection:bg-[#0080FB] selection:text-white">

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10">
        {/* Header Section with Signature Blue Accent */}
        <div className="mb-12 border-b border-[#262626] pb-8 relative">
          <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-[#0080FB]" />

          <div className="flex items-start gap-4">
            {/* Vertical blue accent bar */}
            <div className="w-1.5 h-12 sm:h-14 md:h-16 bg-[#0080FB] shrink-0 mt-1" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#25D366] mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official Policy Document</span>
              </div>
              <h1 className="font-['Hanken_Grotesk'] font-black text-4xl sm:text-5xl md:text-6xl leading-none text-white uppercase tracking-tighter">
                PRIVACY <span className="text-[#0080FB]">POLICY</span>
              </h1>
              <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-gray-400 uppercase tracking-[0.15em] mt-3">
                Last Updated: {lastUpdated} • Effective Immediately
              </p>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col gap-8 text-gray-300 text-sm sm:text-base leading-relaxed">

          {/* 1. Introduction Card */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl mb-4">
              <Eye className="w-5 h-5 text-[#25D366]" />
              <h2>1. Introduction</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Welcome to ChatRadix. We are committed to protecting the privacy, security, and integrity of the data collected from merchants using our Shopify application (&quot;App&quot;), as well as their end customers. This Privacy Policy details how we collect, use, process, and protect your information when utilizing our automated WhatsApp marketing and commerce solutions integrated with the official Meta WhatsApp Cloud API.
            </p>
          </section>

          {/* 2. Data We Collect */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl border-b border-white/10 pb-3">
              <Database className="w-5 h-5 text-[#0080FB]" />
              <h2>2. Data We Collect</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              To deliver high-converting WhatsApp workflows, ChatRadix synchronization requires access to specific Shopify store details and customer communication paths:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#25D366] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Shopify Merchant Data: </strong>
                  <span className="text-gray-300">Store URL, store owner email address, shop name, physical address, and billing configuration required for account setup.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#25D366] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Order & Fulfillment Data: </strong>
                  <span className="text-gray-300">Information concerning purchases (order IDs, product titles, prices, currency, shipping addresses, and tracking codes) to send transaction confirmations and real-time shipment updates.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#25D366] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Abandoned Cart Telemetry: </strong>
                  <span className="text-gray-300">Customer cart tokens, items left in checkout, and associated phone numbers, used exclusively to trigger automated recovery flows.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#25D366] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Meta API Integration Metadata: </strong>
                  <span className="text-gray-300">WhatsApp phone number ID, templates status, and message transmission logs (e.g., delivered, read, clicked status) provided through Meta webhooks.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* 3. Meta WhatsApp API Compliance & Data Routing */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl border-b border-white/10 pb-3">
              <Server className="w-5 h-5 text-[#25D366]" />
              <h2>3. Meta WhatsApp API Compliance & Data Routing</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              ChatRadix operates strictly as an official Meta WhatsApp Cloud API partner application. All messaging activities comply with the Meta WhatsApp Business Terms of Service:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/[0.03] border border-white/10 p-5 rounded-xl">
                <span className="font-bold text-white text-sm block mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  Direct Encrypted Routing
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  All customer communications are encrypted in transit and routed directly through secure official Meta Cloud endpoints.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 p-5 rounded-xl">
                <span className="font-bold text-white text-sm block mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0080FB]" />
                  No Storage of Chat Content
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  We do not store the textual content of chats beyond transmission. Logs only contain statuses (e.g., delivered, read).
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-gray-400 pt-2">
              Customers have absolute control over receiving WhatsApp messages. We enforce strict compliance by rendering an opt-out action (e.g., reply with &quot;STOP&quot;) inside every promotional and cart recovery template.
            </p>
          </section>

          {/* 4. How We Use Your Information */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl border-b border-white/10 pb-3">
              <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
              <h2>4. How We Use Your Information</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              We process merchant and customer information solely to operate and improve the ChatRadix systems:
            </p>
            <ul className="space-y-2.5 pl-1 pt-1">
              <li className="flex items-start gap-2.5 text-sm md:text-base">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Deploying automated cart reminders, fulfillment updates, and delivery alerts.</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm md:text-base">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Monitoring delivery statuses and optimizing template conversion rates.</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm md:text-base">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Providing merchant support, troubleshooting Meta API configurations, and custom setups.</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm md:text-base">
                <span className="text-[#25D366] font-bold">✓</span>
                <span>Detecting, preventing, or mitigating technical errors, security vulnerabilities, or policy violations.</span>
              </li>
            </ul>
          </section>

          {/* 5. Data Security & Retention */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl border-b border-white/10 pb-3">
              <Lock className="w-5 h-5 text-[#25D366]" />
              <h2>5. Data Security & Retention</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start bg-white/[0.03] border border-white/10 p-5 rounded-xl">
              <div className="p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] shrink-0 border border-[#25D366]/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1.5 text-sm">Security Protocols</h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  All stored database tables are encrypted at rest using AES-256 standards. Connection channels leverage TLS 1.3 encryption. We conduct quarterly security updates on our infrastructure and restrict employee database access strictly on a need-to-know basis.
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-sm md:text-base pt-1">
              We retain Shopify store synchronization data only as long as your ChatRadix account remains active. Upon application uninstallation, all sync databases are automatically scheduled for complete, permanent deletion from our primary servers within forty-eight (48) hours.
            </p>
          </section>

          {/* 6. Merchant & Customer Rights (GDPR & CCPA) */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-[#0080FB]" />
              <h2>6. Merchant & Customer Rights (GDPR & CCPA)</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base">
              If you or your customers reside in the European Economic Area (EEA) or California, you are entitled to specific rights regarding data processing:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#0080FB] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Right of Access: </strong>
                  <span className="text-gray-300">Request a copy of all stored personal telemetry.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#0080FB] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Right to Rectification: </strong>
                  <span className="text-gray-300">Request correction of inaccurate information.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base">
                <span className="text-[#0080FB] font-bold mt-0.5">●</span>
                <div>
                  <strong className="text-white font-bold">Right to Deletion: </strong>
                  <span className="text-gray-300">Request immediate erasure of personal data from our databases.</span>
                </div>
              </li>
            </ul>
            <p className="text-xs md:text-sm text-gray-400 pt-2">
              To trigger data access or erasure requests, merchants can email our privacy team directly at{' '}
              <a href="mailto:info@chatradix.com" className="text-[#25D366] hover:underline font-mono font-bold">
                info@chatradix.com
              </a>.
            </p>
          </section>

          {/* 7. Contact Information */}
          <section className="bg-gradient-to-b from-[#0F1722] to-[#0A0E15] border border-white/10 p-6 md:p-8 rounded-2xl">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg md:text-xl mb-3">
              <Mail className="w-5 h-5 text-[#25D366]" />
              <h2>7. Contact Information</h2>
            </div>
            <p className="text-gray-300 text-sm md:text-base mb-6">
              For any questions, concerns, or requests regarding this Privacy Policy or your data, please contact the ChatRadix privacy officer:
            </p>
            
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-1">
                  Email Inquiry
                </span>
                <a 
                  href="mailto:info@chatradix.com" 
                  className="text-base font-mono font-bold text-[#25D366] hover:underline"
                >
                  info@chatradix.com
                </a>
              </div>

              <a
                href="mailto:info@chatradix.com"
                className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono font-bold text-xs uppercase transition-colors flex items-center gap-2"
              >
                <span>Email Privacy Team</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
