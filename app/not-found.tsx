import Link from "next/link";
import Image from "next/image";
import Logo from '../public/images/Logo1-without-bg.png'

export default function NotFound() {
  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="flex flex-col items-center text-center max-w-lg w-full">

          {/* Big 404 */}
          <div className="mt-5 relative mb-4 select-none">
            <span
              className="font-black"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(7rem, 20vw, 12rem)",
                lineHeight: 1,
                color: "transparent",
                WebkitTextStroke: "2px rgba(201,168,76,0.35)",
                letterSpacing: "0.1em",
              }}
            >
              404
            </span>
            {/* Floating perfume bottle in the middle of 404 */}
            <div
              className="mb-5 absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 2 }}
            >
              <Image src={Logo} alt="Perfume Bottle" width={100} height={160} />
            </div>
          </div>

          {/* Gold divider */}
          <div className="flex items-center gap-3 w-48 mb-6">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C" }}>✦</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>

          {/* Message card */}
          <div
            className="w-full rounded-2xl px-8 py-8 mb-8"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(201,168,76,0.3)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            }}
          >
            <h1
              className="text-2xl font-black tracking-[0.15em] uppercase mb-3"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Page Not Found
            </h1>
            <p className="text-sm leading-relaxed mb-1" style={{ color: "#5a3e1a" }}>
              It seems the scent you were looking for has drifted away.
            </p>
            <p className="text-xs" style={{ color: "#a89070" }}>
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href="/"
              className="flex-1 py-3.5 text-xs font-black tracking-[0.25em] uppercase rounded-xl text-center transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,)",
                border: "1.5px solid #C9A84C",
                color: "#C9A84C",
                fontFamily: "Georgia, serif",
              }}
            >
              ← Back to Home
            </Link>
            <Link
              href="/products"
              className="flex-1 py-3.5 text-xs font-black tracking-[0.25em] uppercase rounded-xl text-center transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1.5px solid rgba(201,168,76,0.5)",
                color: "#8B6914",
                fontFamily: "Georgia, serif",
                backdropFilter: "blur(8px)",
              }}
            >
              Browse Collections
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}