import next from "next";

export default function ReturnPolicyPage() {
  return (
    <>
      <main
        className="min-h-screen py-16 px-4"
      >
        <div className="max-w-screen-md mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
              Our commitment to you
            </p>
            <h1
              className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Return Policy
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
              <span style={{ color: "#C9A84C" }}>✦</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
            </div>
          </div>

          {/* Guarantee badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                ),
                label: "Longevity Guaranteed",
                value: "15–18 Hours Lasting",
                sub: "Every fragrance is tested and guaranteed to last.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
                  </svg>
                ),
                label: "Return Window",
                value: "1 Week / 7 Days",
                sub: "Return or exchange within 7 days of delivery.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  border: "1.5px solid rgba(201,168,76,0.4)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.12)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5" style={{ color: "#a89070" }}>{item.label}</p>
                  <p className="text-base font-black" style={{ fontFamily: "Georgia, serif", color: "#8B6914" }}>{item.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#5a3e1a" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main policy card */}
          <div
            className="rounded-2xl px-8 py-8 mb-6"
            style={{
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(201,168,76,0.25)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            }}
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#1a0800" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="text-sm font-black tracking-[0.12em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
                Signature by Feeha — Return Policy
              </h2>
            </div>
            <div className="h-px mb-5" style={{ background: "rgba(201,168,76,0.2)" }} />

            <p className="text-sm leading-relaxed mb-4" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>
              At Signature by Feeha, we guarantee the authenticity and longevity of all our fragrances. Every perfume is tested to last <span className="font-bold" style={{ color: "#8B6914" }}>15 to 18 hours</span> — and we stand behind that promise. Due to the nature of perfume products, <span className="font-bold" style={{ color: "#1a0a00" }}>we are unable to offer refunds</span> once an order has been shipped.
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>
              However, we understand that situations may arise during delivery. We will happily replace your order if:
            </p>

            {/* Bullet conditions */}
            <ul className="flex flex-col gap-2 mb-6">
              {[
                "The parcel arrives broken or damaged.",
                "The products inside are damaged, leaking, or tampered.",
                "The fragrance does not last the guaranteed 15–18 hours.",
                "The wrong product was delivered.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4" fill="#C9A84C" stroke="none"/>
                    </svg>
                  </span>
                  <p className="text-sm" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>{item}</p>
                </li>
              ))}
            </ul>

            {/* Steps */}
            <p className="text-sm font-black mb-4" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
              To request a return or replacement:
            </p>
            <ol className="flex flex-col gap-3 mb-6">
              {[
                <>Contact our Customer Service team within <span className="font-bold" style={{ color: "#8B6914" }}>48 hours</span> of receiving your order. You can reach us via WhatsApp at <a href="https://wa.me/923324892489" className="underline hover:text-[#8B6914] transition-colors" style={{ textUnderlineOffset: "3px" }}>+923324892489</a> or via the contact form on our website.</>,
                "Please provide clear photos of the damage to the packaging and/or products.",
                "Upon verification, we will arrange for a free replacement or exchange within 7 days.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black mt-0.5"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#1a0800" }}>
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "#5a3e1a", fontFamily: "Georgia, serif" }}>{step}</p>
                </li>
              ))}
            </ol>

            {/* Please note */}
            <div
              className="rounded-xl px-5 py-4"
              style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.25)" }}
            >
              <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: "#8B6914" }}>Please note</p>
              <ul className="flex flex-col gap-1.5">
                {[
                  "We cannot replace products due to a change of mind or incorrect selection.",
                  "This policy applies only to damaged or defective goods received upon delivery.",
                  "Return window is strictly 7 days from the date of delivery.",
                  "All items must be unused, sealed, and in original packaging to qualify.",
                ].map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">•</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>{note}</p>
                  </li>
                ))}
              </ul>
            </div>
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
              We appreciate your understanding. If you have any questions regarding this policy, please don't hesitate to{" "}
              <a href="/contact" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>contact us</a>{" "}
              or reach us on WhatsApp at{" "}
              <a href="https://wa.me/923353537028" className="font-bold underline hover:text-[#1a0a00] transition-colors" style={{ textUnderlineOffset: "3px" }}>+923353537028</a>.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}