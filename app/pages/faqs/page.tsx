"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Do you have original perfumes for men and women?",
    a: "Yes, we are one of the biggest importers and wholesalers of 100% authentic perfumes in Pakistan, supplying original branded perfumes to multiple retail stores across different cities. Signature by Feeha entered the e-commerce industry to bring these authentic scents directly to your doorstep.",
  },
  {
    q: "Do you suggest luxury perfumes to customers?",
    a: "Yes, we offer complimentary perfume consultation to our clients and help you select your signature scent. Our specialists guide you based on your preferences, personality, and occasion — so every fragrance feels made for you.",
  },
  {
    q: "What is the delivery time?",
    a: "Delivery time is max 7–10 working days. Most orders are processed within 2 days. In some cases orders may be delayed, but never beyond 10 working days. We always keep you updated via WhatsApp.",
  },
  {
    q: "How do I place an order?",
    a: "Placing an order is very simple. Our website is designed to make order processing smooth and intuitive. You can create an account or check out as a guest. You can also place an order by calling us or leaving a message on WhatsApp at +923353537028.",
  },
  {
    q: "What payment options are available?",
    a: "We encourage online bank transfers or direct deposits. We also offer Cash on Delivery (COD) for your convenience.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is dispatched, the tracking number will be sent to you via WhatsApp. You can use it to track your delivery in real time.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "We offer hassle-free returns and exchanges within 7 days of delivery, provided the product is unused and in its original packaging. Please contact us via WhatsApp or email to initiate a return.",
  },
  {
    q: "Are all your products sealed and original?",
    a: "Absolutely. Every product at Signature by Feeha is 100% original, sealed, and sourced directly from authorized distributors. We take authenticity very seriously — your trust is our priority.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <main
        className="min-h-screen py-16 px-4"
      >
        <div className="max-w-screen-md mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
              Everything you need to know
            </p>
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              FAQ's
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: openIndex === i ? "1.5px solid #C9A84C" : "1px solid rgba(201,168,76,0.25)",
                  backdropFilter: "blur(12px)",
                  boxShadow: openIndex === i
                    ? "0 8px 32px rgba(201,168,76,0.15)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                  transform: openIndex === i ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Number badge */}
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                      style={{
                        background: openIndex === i ? "linear-gradient(135deg, #C9A84C, #8B6914)" : "rgba(201,168,76,0.12)",
                        color: openIndex === i ? "#1a0800" : "#8B6914",
                        border: "1px solid rgba(201,168,76,0.3)",
                        transition: "all 0.3s",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-sm font-black leading-snug"
                      style={{
                        fontFamily: "Georgia, serif",
                        color: openIndex === i ? "#8B6914" : "#1a0a00",
                        transition: "color 0.3s",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Chevron */}
                  <span
                    className="flex-shrink-0 ml-4 transition-transform duration-300"
                    style={{
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      color: "#C9A84C",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* Answer — animated height */}
                <div
                  style={{
                    maxHeight: openIndex === i ? "400px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div
                    className="px-6 pb-5"
                    style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
                  >
                    <p
                      className="text-sm leading-relaxed pt-4"
                      style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-12 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div>
              <p className="text-sm font-black" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
                Still have questions?
              </p>
              <p className="text-xs mt-1" style={{ color: "#8B6914" }}>
                Our team is happy to help you anytime.
              </p>
            </div>
            <a
              href="https://wa.me/923353537028"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-black tracking-[0.2em] uppercase transition-all hover:scale-105"
              style={{
                border: "1.5px solid #C9A84C",
                color: "#C9A84C",
                fontFamily: "Georgia, serif",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

        </div>
      </main>
    </>
  );
}