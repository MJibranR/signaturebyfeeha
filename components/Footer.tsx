"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const col1 = [
  { label: "About Us", href: "/pages/about" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Faq's", href: "/pages/faqs" },
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
  { label: "Term & Conditions", href: "/pages/terms" },
  { label: "Shipping Charges", href: "/pages/shipping" },
  { label: "Return Policy", href: "/pages/returns" },
];

const col2 = [
  { label: "Home",   href: "/" },
  { label: "All",    href: "/products" },
  { label: "Men",    href: "/men" },
  { label: "Women",  href: "/women" },
  { label: "Unisex", href: "/unisex" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      className="w-full"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201,168,76,0.3)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* Col 1 — Info links */}
          <div>
            <ul className="space-y-2.5">
              {col1.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors hover:text-[#8B6914]"
                    style={{ color: "#3a2a10", letterSpacing: "0.02em" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Nav links */}
          <div>
            <ul className="space-y-2.5">
              {col2.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors hover:text-[#8B6914]"
                    style={{ color: "#3a2a10", letterSpacing: "0.02em" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Location */}
          <div className="col-span-2 md:col-span-1">
            <h4
              className="text-xs font-black tracking-[0.25em] uppercase mb-4"
              style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}
            >
              Our Location
            </h4>
            <div className="space-y-3">
              <p className="text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>
                Address: Sector 15-B, Buffer Zone<br />
                North Karachi, Karachi
              </p>
              <p className="text-xs" style={{ color: "#5a3e1a" }}>
                Phone:{" "}
                <a href="tel:+923033708804" className="hover:text-[#8B6914] transition-colors">
                  +92 303 3708804
                </a>
              </p>
              <p className="text-xs" style={{ color: "#5a3e1a" }}>
                Email:{" "}
                <a href="mailto:Scentsbysignature@gmail.com" className="hover:text-[#8B6914] transition-colors">
                  Scentsbysignature@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Col 4 — Newsletter + Social */}
          <div className="col-span-2 md:col-span-1">
            <h4
              className="text-xs font-black tracking-[0.25em] uppercase mb-2"
              style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}
            >
              Sign Up And Save
            </h4>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#5a3e1a" }}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>

            {/* Email input */}
            <div
              className="flex items-center gap-2 mb-6 pb-2"
              style={{ borderBottom: "1.5px solid #C9A84C" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-stone-400 min-w-0"
                style={{ color: "#1a0a00" }}
              />
              <button
                onClick={() => setEmail("")}
                className="flex-shrink-0 transition-all hover:scale-110"
                aria-label="Subscribe"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/signature_by_feeha/" target="_blank" rel="noopener noreferrer"
                className="transition-all hover:scale-110" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#8B6914" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586351197047" target="_blank" rel="noopener noreferrer"
                className="transition-all hover:scale-110" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://wa.me/923033708804" target="_blank" rel="noopener noreferrer"
                className="transition-all hover:scale-110" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4 px-6 text-center space-y-1" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <p className="text-[11px] tracking-wide" style={{ color: "#8B6914" }}>
          © 2026 Signature by Feeha · Developed and Managed by{" "}
          <span className="font-bold">Muhammad Jibran Rehan</span>
        </p>
        <p className="text-[11px]" style={{ color: "#a89070" }}>
          +92 303 3708804 · scentsbysignature@gmail.com
        </p>
      </div>
    </footer>
  );
}