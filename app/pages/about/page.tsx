import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <main
        className="min-h-screen"
      >
        <div className="max-w-screen-md mx-auto px-6 py-16">

          {/* Page heading */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <h1
              className="text-2xl md:text-3xl font-black tracking-[0.25em] uppercase"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              About Us
            </h1>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          {/* About section */}
          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#3a2a10" }}>
              Signature by Feeha is one of the leading online stores for original perfumes in Pakistan. We offer an elegant and curated range of fragrances from all around the world — from the heart of the Middle East to the finest European maisons.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#3a2a10" }}>
              Signature by Feeha offers elegant, long-lasting perfumes for every mood and style, creating unique scents that leave a lasting impression. We are here to solve the problem for all fragrance lovers in Pakistan — providing 100% original perfumes at a reasonable price, so that you keep shopping with us and we keep satisfying your fragrance needs. A win-win situation for both of us.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.3)" }} />
            <span style={{ color: "#C9A84C", fontSize: "1.2rem" }}>✦</span>
            <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.3)" }} />
          </div>

          {/* Customer Service section */}
          <div
            className="rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <h2
              className="text-lg font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Customer Service
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#3a2a10" }}>
              Signature by Feeha is proud to ensure that every customer receives the best possible experience. We are keen believers that it's you — the customers — who help us grow and make us what we are today. Our team personally handles all queries to make sure you are given the best solution when it comes to the fragrance world.
            </p>
          </div>

          {/* Our Mission */}
          <div
            className="rounded-2xl p-8 mb-10"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            <h2
              className="text-lg font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Our Mission
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#3a2a10" }}>
              To bring the world's finest fragrances to every doorstep in Pakistan — authentically, affordably, and elegantly. Every bottle we deliver carries a promise: 100% original, carefully sourced, and beautifully presented.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 text-xs font-black tracking-[0.25em] uppercase rounded-xl text-center transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1a0f00, #0d0800)",
                border: "1.5px solid #C9A84C",
                color: "#C9A84C",
                fontFamily: "Georgia, serif",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 text-xs font-black tracking-[0.25em] uppercase rounded-xl text-center transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1.5px solid rgba(201,168,76,0.5)",
                color: "#8B6914",
                fontFamily: "Georgia, serif",
                backdropFilter: "blur(8px)",
              }}
            >
              Contact Us
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}