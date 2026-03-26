"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Logo from '../public/images/Logo1-without-bg.png';

const services = [
  {
    icon: (
      <Image src={Logo} alt="SF Logo" width={35} height={35} />
    ),
    title: "100% ORIGINAL\nPERFUMES",
    description: "Authentic designer scents sourced from trusted brands.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="26" width="20" height="28" rx="4" fill="rgba(123,94,167,0.5)" stroke="#C9A84C" strokeWidth="1.5"/>
        <rect x="27" y="18" width="10" height="10" rx="2" fill="rgba(155,126,200,0.5)" stroke="#C9A84C" strokeWidth="1.5"/>
        <rect x="24" y="13" width="16" height="7" rx="2" fill="#C9A84C"/>
        <rect x="38" y="15" width="8" height="3" rx="1.5" fill="#C9A84C"/>
        <rect x="26" y="30" width="4" height="12" rx="2" fill="rgba(255,255,255,0.2)"/>
      </svg>
    ),
    title: "GLOBAL & LOCAL\nFRAGRANCE BRANDS",
    description: "Explore the finest perfumes from the Middle East and beyond.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="46" cy="48" rx="7" ry="7" stroke="#C9A84C" strokeWidth="2" fill="none"/>
        <ellipse cx="18" cy="48" rx="7" ry="7" stroke="#C9A84C" strokeWidth="2" fill="none"/>
        <path d="M25 48 L20 34 L36 30 L46 40 L38 48Z" fill="rgba(139,26,26,0.7)" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M36 30 L42 24 L48 26" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 36 L16 36" stroke="#FF4444" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 42 L13 42" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="28" y="22" width="12" height="10" rx="2" fill="#C9A84C"/>
        <text x="31" y="31" fontFamily="Georgia, serif" fontSize="8" fill="#1a0a0a" fontWeight="bold">SF</text>
      </svg>
    ),
    title: "FAST, SECURE\nDELIVERY",
    description: "Quick nationwide shipping with full authenticity guarantee.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.08)"/>
        <path d="M32 16 L36 28 L48 28 L38 36 L42 48 L32 40 L22 48 L26 36 L16 28 L28 28Z" fill="#C9A84C" opacity="0.9"/>
      </svg>
    ),
    title: "EXCLUSIVE\nGIFT SETS",
    description: "Curated luxury gift sets perfect for every occasion.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="44" height="32" rx="4" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.08)"/>
        <path d="M10 30 L54 30" stroke="#C9A84C" strokeWidth="1.5"/>
        <circle cx="20" cy="25" r="3" fill="#C9A84C"/>
        <circle cx="32" cy="25" r="3" fill="#C9A84C"/>
        <path d="M18 40 L28 40" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 46 L36 46" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M40 38 L46 44 L56 34" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "EASY RETURNS\n& EXCHANGES",
    description: "Hassle-free return policy within 7 days of delivery.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="26" r="14" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.08)"/>
        <circle cx="32" cy="26" r="6" fill="#C9A84C" opacity="0.6"/>
        <path d="M20 44 C20 38 44 38 44 44 L46 56 L18 56Z" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.08)"/>
      </svg>
    ),
    title: "EXPERT SCENT\nCONSULTATION",
    description: "Get personalized fragrance advice from our specialists.",
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8 C20 8 10 18 10 28 C10 40 22 50 32 58 C42 50 54 40 54 28 C54 18 44 8 32 8Z" stroke="#C9A84C" strokeWidth="2" fill="rgba(201,168,76,0.08)"/>
        <path d="M22 28 L28 34 L42 20" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "AUTHENTICITY\nGUARANTEED",
    description: "Every product verified and sealed for your peace of mind.",
  },
];

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 260;
    const gap = 16;
    const amount = (cardWidth + gap) * 2;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    if (dir === "right") {
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
      }
    } else {
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -amount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="w-full py-4 md:py-5 px-4 md:px-6" style={{ backgroundColor: "transparent" }}>
      <div className="max-w-screen-xl mx-auto relative">

        {/* Left Arrow — hidden on mobile */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110"
          style={{ background: "linear-gradient(135deg, #1a0f00, #2d1a00)", border: "1.5px solid #C9A84C", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} color="#C9A84C" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-2xl"
              style={{ width: "260px" }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">{service.icon}</div>

              {/* Gold divider */}
              <div className="w-px self-stretch" style={{ backgroundColor: "#8B6914", opacity: 0.45 }} />

              {/* Text */}
              <div>
                <h3
                  className="font-black text-xs md:text-sm leading-tight mb-1"
                  style={{ color: "#1a0a00", fontFamily: "Georgia, serif", letterSpacing: "0.04em", whiteSpace: "pre-line" }}
                >
                  {service.title}
                </h3>
                <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow — hidden on mobile */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-110"
          style={{ background: "linear-gradient(135deg, #1a0f00, #2d1a00)", border: "1.5px solid #C9A84C", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
          aria-label="Scroll right"
        >
          <ChevronRight size={18} color="#C9A84C" />
        </button>

      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}