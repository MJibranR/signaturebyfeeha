"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle password reset logic here
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div
        className="w-full max-w-md px-8 py-10 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.78)",
          border: "1px solid rgba(201,168,76,0.3)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
        }}
      >
        {/* Top label */}
        <p
          className="text-center text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: "#a89070" }}
        >
          Login
        </p>

        {/* Heading */}
        <div className="text-center mb-2">
          <h1
            className="text-2xl font-black tracking-[0.18em] uppercase leading-tight"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
          >
            Reset Your
            <br />
            Password
          </h1>
          <div className="mt-3 h-px mx-auto w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
        </div>

        {!submitted ? (
          <>
            <p
              className="text-xs text-center leading-relaxed my-5"
              style={{ color: "#5a3e1a" }}
            >
              We will send you an email to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-[11px] font-bold tracking-[0.25em] uppercase"
                  style={{ color: "#8B6914" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "1.5px solid rgba(201,168,76,0.3)",
                    color: "#1a0a00",
                    fontFamily: "Georgia, serif",
                  }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #C9A84C")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid rgba(201,168,76,0.3)")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-auto self-center px-10 py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #1a0f00, #0d0800)",
                  border: "1.5px solid #C9A84C",
                  color: "#C9A84C",
                  fontFamily: "Georgia, serif",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                Submit
              </button>
            </form>

            {/* Cancel */}
            <div className="text-center mt-5">
              <Link
                href="/account/login"
                className="text-xs transition-colors hover:text-[#8B6914]"
                style={{ color: "#5a3e1a" }}
              >
                Cancel
              </Link>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center mt-6 flex flex-col gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
              style={{ background: "rgba(201,168,76,0.15)", border: "1.5px solid #C9A84C" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-sm font-bold" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
              Email Sent!
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>
              We've sent a password reset link to <span className="font-bold" style={{ color: "#8B6914" }}>{email}</span>. Please check your inbox.
            </p>
            <Link
              href="/account/login"
              className="mt-2 text-[11px] tracking-widest uppercase transition-colors hover:text-[#8B6914]"
              style={{ color: "#a89070" }}
            >
              ← Back to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}