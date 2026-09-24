import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Calendar, Mail, AlertCircle } from 'lucide-react';

interface SystemSupportSectionProps {
  onNotify: (msg: string) => void;
}

export const SystemSupportSection: React.FC<SystemSupportSectionProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    email: '',
    phone: '',
    details: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storeName || !formData.email || !formData.phone) return;

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@chatradix.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Store Name / Domain': formData.storeName,
          'Work Email': formData.email,
          'WhatsApp Phone Number': formData.phone,
          'Additional Details': formData.details || 'None provided',
          '_subject': `New System Support Inquiry from ${formData.storeName}`,
          '_replyto': formData.email,
          '_template': 'table',
          '_captcha': 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success === 'true' || data.success === true || response.status === 200)) {
        setIsSuccess(true);
        onNotify('Inquiry transmitted directly to info@chatradix.com!');
      } else {
        throw new Error((data && data.message) || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(
        'Unable to send automatically right now. You can email us directly at info@chatradix.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ storeName: '', email: '', phone: '', details: '' });
    setErrorMessage('');
    setIsSuccess(false);
  };

  return (
    <section id="support" className="mb-24 md:mb-32 max-w-[1440px] mx-auto px-6 md:px-16 perspective-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-[#262626] border border-[#262626] shadow-2xl">
        {/* Left Column */}
        <div className="lg:col-span-5 bg-[#0e0e0e] p-8 md:p-14 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-[#0080FB]/10 rounded-full blur-[90px] pointer-events-none"
          />

          <div className="relative z-10">
            {/* Terminal Header Dots */}
            <div className="flex items-center gap-2 mb-10">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-['JetBrains_Mono'] text-xs text-[#888888] uppercase tracking-[0.15em]">
                /// SYSTEM SUPPORT / INQUIRY
              </span>
            </div>

            <h2 className="font-['Hanken_Grotesk'] font-black text-5xl md:text-6xl lg:text-[5rem] leading-none text-[#e5e2e1] uppercase tracking-tighter mb-6">
              SYSTEM<br />
              <span className="text-[#0080FB] glow-text">SUPPORT</span>
            </h2>

            <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#888888] mb-8 max-w-md leading-relaxed">
              Fast and reliable WhatsApp infrastructure. Built for scale with 99.9% uptime.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#131313] border border-[#262626] text-xs font-['JetBrains_Mono'] text-[#c1c6d6] mb-8">
              <Mail className="w-4 h-4 text-[#0080FB]" />
              <span className="text-[#888888]">DISPATCH:</span>
              <a 
                href="mailto:info@chatradix.com" 
                className="text-[#0080FB] hover:text-white transition-colors underline decoration-[#0080FB]/40"
              >
                info@chatradix.com
              </a>
            </div>
          </div>

          <button
            onClick={() => onNotify('Redirecting to demo scheduling calendar...')}
            className="relative z-10 border border-[#262626] bg-[#131313] text-[#e5e2e1] font-['JetBrains_Mono'] text-xs font-semibold px-6 py-4 hover:border-[#0080FB] hover:text-[#0080FB] hover:shadow-[0_0_20px_rgba(0,128,251,0.2)] transition-all uppercase tracking-[0.15em] inline-flex items-center gap-3 self-start"
          >
            <Calendar className="w-4 h-4 text-[#0080FB]" />
            <span>&lt; Schedule a Demo Call &gt;</span>
          </button>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-[#0e0e0e] p-8 md:p-14 lg:p-16">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Field 1: Store Name / Domain */}
              <div className="flex flex-col gap-2">
                <label htmlFor="store-name" className="font-['JetBrains_Mono'] text-xs text-[#0080FB] uppercase tracking-[0.15em] font-semibold">
                  STORE NAME / DOMAIN *
                </label>
                <div className="border border-[#262626] p-4 focus-within:border-[#0080FB] transition-colors bg-[#131313]">
                  <input
                    id="store-name"
                    type="text"
                    required
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    placeholder="e.g. mybrand.com"
                    className="w-full bg-transparent border-none p-0 font-['JetBrains_Mono'] text-sm text-[#e5e2e1] focus:outline-none focus:ring-0 placeholder:text-[#353534]"
                  />
                </div>
              </div>

              {/* Field 2: Work Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="work-email" className="font-['JetBrains_Mono'] text-xs text-[#0080FB] uppercase tracking-[0.15em] font-semibold">
                  WORK EMAIL *
                </label>
                <div className="border border-[#262626] p-4 focus-within:border-[#0080FB] transition-colors bg-[#131313]">
                  <input
                    id="work-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@yourbrand.com"
                    className="w-full bg-transparent border-none p-0 font-['JetBrains_Mono'] text-sm text-[#e5e2e1] focus:outline-none focus:ring-0 placeholder:text-[#353534]"
                  />
                </div>
              </div>

              {/* Field 3: WhatsApp Phone Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp-phone" className="font-['JetBrains_Mono'] text-xs text-[#0080FB] uppercase tracking-[0.15em] font-semibold">
                  WHATSAPP PHONE NUMBER *
                </label>
                <div className="border border-[#262626] p-4 focus-within:border-[#0080FB] transition-colors bg-[#131313]">
                  <input
                    id="whatsapp-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border-none p-0 font-['JetBrains_Mono'] text-sm text-[#e5e2e1] focus:outline-none focus:ring-0 placeholder:text-[#353534]"
                  />
                </div>
              </div>

              {/* Field 4: Additional Details */}
              <div className="flex flex-col gap-2">
                <label htmlFor="additional-details" className="font-['JetBrains_Mono'] text-xs text-[#0080FB] uppercase tracking-[0.15em] font-semibold">
                  ADDITIONAL DETAILS
                </label>
                <div className="border border-[#262626] p-4 focus-within:border-[#0080FB] transition-colors bg-[#131313]">
                  <textarea
                    id="additional-details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us about your order volume & requirements..."
                    className="w-full bg-transparent border-none p-0 font-['JetBrains_Mono'] text-sm text-[#e5e2e1] focus:outline-none focus:ring-0 placeholder:text-[#353534] resize-none"
                  />
                </div>
              </div>

              {/* Error Notice if any */}
              {errorMessage && (
                <div className="p-4 border border-[#ff4d4f]/40 bg-[#ff4d4f]/10 text-xs font-['JetBrains_Mono'] text-[#ffb4ab] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#ff4d4f] shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href={`mailto:info@chatradix.com?subject=${encodeURIComponent(
                      `Support Inquiry: ${formData.storeName}`
                    )}&body=${encodeURIComponent(
                      `Store: ${formData.storeName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nDetails:\n${formData.details}`
                    )}`}
                    className="text-[#0080FB] underline hover:text-white transition-colors uppercase font-bold mt-1"
                  >
                    Click to dispatch directly via your email client &rarr;
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0080FB] border border-[#0080FB] text-white font-['JetBrains_Mono'] text-xs font-bold px-10 py-5 hover:bg-white hover:text-[#0080FB] transition-all duration-300 active:scale-95 inline-flex items-center gap-3 justify-center tracking-[0.15em] rounded-none self-start mt-2 disabled:opacity-50 group"
              >
                {submitting ? (
                  <>
                    <span>TRANSMITTING INQUIRY...</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>SUBMIT INQUIRY</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="flex flex-col gap-6 py-8">
              <div className="flex items-center gap-3 text-[#25D366]">
                <CheckCircle2 className="w-8 h-8" />
                <h3 className="font-['Hanken_Grotesk'] text-2xl font-extrabold uppercase">Inquiry Transmitted</h3>
              </div>
              <p className="font-['Hanken_Grotesk'] text-base text-[#888888] leading-relaxed">
                Thank you! Your inquiry has been securely dispatched to <strong className="text-white">info@chatradix.com</strong>. Our technical architecture team will analyze your requirements and connect via WhatsApp/Email within 24 hours.
              </p>
              <button
                onClick={handleReset}
                className="border border-[#262626] bg-[#131313] text-[#e5e2e1] font-['JetBrains_Mono'] text-xs font-semibold px-8 py-4 hover:border-[#0080FB] hover:text-[#0080FB] transition-all uppercase tracking-[0.15em] self-start"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
