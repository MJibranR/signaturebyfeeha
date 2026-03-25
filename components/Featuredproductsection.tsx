"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import oud from '../public/images/perfume/oud.png';
import Gucci_Ruches from '../public/images/perfume/gucci-ruch.png';
import Creed_Aventus from '../public/images/perfume/creed-aventus.png';

const featured = [
  {
    id: 1,
    name: "Oud Wood",
    brand: "Tom Ford",
    tagline: "Pour Homme · Woody Oriental",
    image: oud,
    video: "/video/perfume/oud.mp4",
    href: "/products/island-dreams",
    imageLeft: true,
    bg: "linear-gradient(135deg, #1a0800 0%, #2d1200 100%)",
  },
  {
    id: 2,
    name: "Gucci Ruches",
    brand: "Gucci",
    tagline: "Pour Femme · Floral Chypre",
    image: Gucci_Ruches,
    video: "/video/perfume/Gucci-Ruches.mp4",
    href: "/products/rayhaan-valhalla",
    imageLeft: false,
    bg: "linear-gradient(135deg, #2d0000 0%, #4a0a0a 100%)",
  },
  {
    id: 3,
    name: "Creed Aventus",
    brand: "Creed",
    tagline: "Pour Homme · Fruity Chypre",
    image: Creed_Aventus,
    video: "/video/perfume/Drift-Aura.mp4",
    href: "/products/vanilla-vibes",
    imageLeft: true,
    bg: "linear-gradient(135deg, #0a1528 0%, #1a2a4a 100%)",
  },
];

const TOTAL = featured.length;

export default function FeaturedProductSection() {
  const [current, setCurrent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Scroll → slide index
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;
      const vh = window.innerHeight;
      const idx = Math.round(scrolled / vh);
      const clamped = Math.max(0, Math.min(TOTAL - 1, idx));
      setCurrent(clamped);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync mute state to all videos whenever it changes
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = isMuted;
      if (i === current) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [current, isMuted]);

  const toggleMute = () => setIsMuted((m) => !m);

  return (
    <div ref={wrapperRef} style={{ height: `${TOTAL * 100}vh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Slides track */}
        <div
          className="flex h-full"
          style={{
            width: `${TOTAL * 100}%`,
            transform: `translateX(-${(current * 100) / TOTAL}%)`,
            transition: "transform 0.75s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {featured.map((item, i) => (
            <div
              key={item.id}
              className="relative flex flex-col md:flex-row h-full"
              style={{ width: `${100 / TOTAL}%`, background: item.bg }}
            >
              {/* IMAGE */}
              <div className={`relative flex-1 ${item.imageLeft ? "md:order-1" : "md:order-2"} order-1`}>
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)" }} />
                <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)" }} />
                <div className="absolute bottom-6 left-5 right-5 md:bottom-10 md:left-8 md:right-8">
                  <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: "#C9A84C" }}>{item.brand}</p>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none" style={{ fontFamily: "Georgia, serif" }}>
                    {item.name}
                  </h2>
                  <p className="text-sm mt-2" style={{ color: "#A89070" }}>{item.tagline}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 mt-4 md:mt-5 px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
                    style={{ background: "rgba(13,8,0,0.9)", border: "1.5px solid #C9A84C", color: "#C9A84C", backdropFilter: "blur(6px)" }}
                  >
                    <ShoppingBag size={14} />
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* VIDEO — hidden on mobile, shown on md+ */}
              <div className={`relative flex-1 hidden md:block ${item.imageLeft ? "md:order-2" : "md:order-1"}`}>
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={item.video}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />
                <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.2)" }} />

                {/* Mute / Unmute button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:scale-105"
                  style={{ background: "rgba(13,8,0,0.8)", border: "1px solid rgba(201,168,76,0.5)", backdropFilter: "blur(6px)" }}
                >
                  {isMuted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#C9A84C"/>
                      <line x1="23" y1="9" x2="17" y2="15" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="17" y1="9" x2="23" y2="15" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#C9A84C"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                    {isMuted ? "Tap to unmute" : "Mute"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {featured.map((_, i) => (
            <div key={i} style={{ width: i === current ? "28px" : "8px", height: "8px", borderRadius: "4px", background: i === current ? "#C9A84C" : "rgba(201,168,76,0.35)", transition: "all 0.3s" }} />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-8 z-20">
          <span className="text-2xl font-black" style={{ color: "#C9A84C", fontFamily: "Georgia, serif" }}>0{current + 1}</span>
          <span className="text-sm" style={{ color: "rgba(201,168,76,0.4)" }}> / 0{TOTAL}</span>
        </div>

        {/* Scroll hint */}
        {current < TOTAL - 1 && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2" style={{ opacity: 0.6 }}>
            <p className="text-xs tracking-widest uppercase" style={{ color: "#C9A84C", writingMode: "vertical-rl" }}>Scroll</p>
            <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #C9A84C, transparent)" }} />
          </div>
        )}

      </div>
    </div>
  );
}