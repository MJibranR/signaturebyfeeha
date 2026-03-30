// app/contact/page.tsx
"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { sendContactMessage } from "@/lib/actions/contact";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await sendContactMessage(form);
      
      if (result.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(result.error || "Failed to send message");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.9)",
    border: "1.5px solid rgba(201,168,76,0.3)",
    color: "#1a0a00",
    fontFamily: "Georgia, serif",
  };
  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    (e.target.style.border = "1.5px solid #C9A84C");
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    (e.target.style.border = "1.5px solid rgba(201,168,76,0.3)");

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-screen-md mx-auto">

        {/* Get in touch header */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.35em] uppercase mb-3" style={{ color: "#a89070" }}>
            We'd love to hear from you
          </p>
          <h1
            className="text-3xl md:text-4xl font-black tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
          >
            Get In Touch
          </h1>
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
            <span style={{ color: "#C9A84C" }}>✦</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
          </div>
          <p
            className="text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: "#5a3e1a", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Whether you have a question about our fragrances, an order, or just want to say hello — we're here for you. Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Info cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                </svg>
              ),
              label: "Phone",
              value: "3033708804",
              href: "tel:3033708804",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              ),
              label: "Email",
              value: "scentsbysignature@gmail.com",
              href: "mailto:scentsbysignature@gmail.com",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              ),
              label: "Address",
              value: "Sector 15-B, Buffer Zone, North Karachi, Karachi",
              href: "https://maps.app.goo.gl/p2g3GQL7n5q1EYrC9",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={i === 2 ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-5 rounded-2xl text-center transition-all hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(201,168,76,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                {item.icon}
              </div>
              <p className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>{item.label}</p>
              <p className="text-xs leading-snug" style={{ color: "#5a3e1a" }}>{item.value}</p>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div
          className="rounded-2xl px-8 py-10"
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(201,168,76,0.3)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            className="text-xl font-black tracking-[0.2em] uppercase mb-6 text-center"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
          >
            Contact Us
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-center text-sm" style={{ background: "rgba(201,68,68,0.1)", color: "#c94444", border: "1px solid rgba(201,68,68,0.3)" }}>
              {error}
            </div>
          )}

          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  placeholder="How can we help you?"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Send */}
              <button
                type="submit"
                disabled={loading}
                className="self-center px-12 py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #1a0f00, #0d0800)",
                  border: "1.5px solid #C9A84C",
                  color: "#C9A84C",
                  fontFamily: "Georgia, serif",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          ) : (
            /* Success state */
            <div className="flex flex-col items-center gap-4 py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.12)", border: "1.5px solid #C9A84C" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-lg font-black" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>Message Sent!</p>
              <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: "#5a3e1a", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                Thank you for reaching out, <span className="font-bold" style={{ color: "#8B6914" }}>{form.name}</span>. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-2 text-[11px] tracking-widest uppercase transition-colors hover:text-[#8B6914]"
                style={{ color: "#a89070" }}
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}