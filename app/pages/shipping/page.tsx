"use client";
import { useState, useEffect } from "react";
import { getPageData } from "@/lib/actions/pages";

type ShippingFAQ = {
  id: number;
  q: string;
  a: string;
};

type ShippingData = {
  heroText: string;
  subText: string;
  deliveryDays: string;
  payment: string;
  coverage: string;
  faqs: ShippingFAQ[];
};

// Default shipping data as fallback
const DEFAULT_SHIPPING: ShippingData = {
  heroText: "FREE Shipping All Over Pakistan",
  subText: "No minimum order. No hidden fees. Always free.",
  deliveryDays: "2–4",
  payment: "Cash on Delivery (COD)",
  coverage: "All cities across Pakistan",
  faqs: [
    {
      id: 1,
      q: "What is the process for Cash on Delivery (COD) purchase?",
      a: "When you make a purchase using the COD option, your product will be booked. You will receive a call from us to confirm your order before it gets dispatched. If you are unreachable or unable to attend the call, please contact us if you are still interested in receiving the product.",
    },
    {
      id: 2,
      q: "Are there any hidden charges?",
      a: "There are absolutely NO hidden charges. You pay only the amount that you see in your order summary. What you see is what you pay — always.",
    },
    {
      id: 3,
      q: "When will my order be dispatched?",
      a: "Orders are typically dispatched within 1–2 working days of confirmation. You will receive a WhatsApp notification with your tracking details once your order is on its way.",
    },
  ],
};

export default function ShippingPage() {
  const [shipping, setShipping] = useState<ShippingData>(DEFAULT_SHIPPING);
  const [loading, setLoading] = useState(true);

  // Fetch shipping data from Neon DB on mount
  useEffect(() => {
    async function loadShipping() {
      try {
        const data = await getPageData("shipping");
        if (data) {
          setShipping(data as ShippingData);
        }
      } catch (error) {
        console.error("Failed to load shipping data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadShipping();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm" style={{ color: "#8B6914" }}>Loading Shipping Information...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-screen-md mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
              Delivered to your door
            </p>
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Shipping Charges
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
            </div>
          </div>

          {/* FREE SHIPPING hero card */}
          <div
            className="rounded-2xl px-8 py-10 mb-6 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a0f00 0%, #0d0800 100%)",
              border: "1.5px solid #C9A84C",
              boxShadow: "0 8px 40px rgba(201,168,76,0.2)",
            }}
          >
            {/* Subtle gold glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-[10px] font-black tracking-[0.3em] uppercase"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9A84C">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Exclusive Offer
              </div>
              <p
                className="text-5xl md:text-6xl font-black mb-2"
                style={{
                  fontFamily: "Georgia, serif",
                  background: "linear-gradient(135deg, #C9A84C, #FFD700, #8B6914)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FREE
              </p>
              <p className="text-lg font-black tracking-[0.15em] uppercase text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>
                {shipping.heroText}
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                {shipping.subText}
              </p>
            </div>
          </div>

          {/* Shipping options — Pakistan only */}
          <div className="mb-6">
            <div
              className="rounded-2xl px-6 py-6"
              style={{
                background: "rgba(255,255,255,0.78)",
                border: "1px solid rgba(201,168,76,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#1a0800" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="text-xs font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
                  Within Pakistan
                </h3>
              </div>
              <div className="h-px mb-4" style={{ background: "rgba(201,168,76,0.2)" }} />
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Shipping Fee", value: "FREE", highlight: true },
                  { label: "Payment", value: shipping.payment },
                  { label: "Standard Delivery", value: `${shipping.deliveryDays} working days` },
                  { label: "Coverage", value: shipping.coverage },
                ].map((row, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: "#a89070" }}>{row.label}</span>
                    <span className="text-sm font-black" style={{ color: row.highlight ? "#C9A84C" : "#1a0a00", fontFamily: "Georgia, serif" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ sections */}
          <div className="flex flex-col gap-4 mb-8">
            {shipping.faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl px-8 py-6"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-xs font-black tracking-[0.15em] uppercase mb-3" style={{ fontFamily: "Georgia, serif", color: "#8B6914" }}>
                  {faq.q}
                </h3>
                <div className="h-px mb-3" style={{ background: "rgba(201,168,76,0.2)" }} />
                <p className="text-sm leading-relaxed" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="rounded-2xl px-8 py-5 flex items-start gap-4"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "#8B6914" }}>
              For any shipping queries, reach us on WhatsApp at{" "}
              <a href="https://wa.me/923353537028" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>+92 335 3537028</a>{" "}
              or visit our{" "}
              <a href="/contact" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>contact page</a>.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}