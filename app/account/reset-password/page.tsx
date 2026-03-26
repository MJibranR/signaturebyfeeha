// app/account/reset-password/page.tsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/actions/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    if (!token) {
      setError("Invalid reset token.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setSuccess(result.message || "Password reset successfully!" + " Redirecting to login...");
        setSubmitted(true);
        setTimeout(() => {
          router.push("/account/login");
        }, 3000);
      } else {
        setError(result.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md px-8 py-10 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.78)",
          border: "1px solid rgba(201,168,76,0.3)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
        }}
      >
        <p
          className="text-center text-xs font-bold tracking-[0.3em] uppercase mb-3"
          style={{ color: "#a89070" }}
        >
          Password Reset
        </p>

        <div className="text-center mb-2">
          <h1
            className="text-2xl font-black tracking-[0.18em] uppercase leading-tight"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
          >
            Create New
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
              Enter your new password below.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-center text-xs" 
                style={{ background: "rgba(201,68,68,0.1)", color: "#c94444", border: "1px solid rgba(201,68,68,0.3)" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

              <button
                type="submit"
                disabled={loading || !token}
                className="w-auto self-center px-10 py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #1a0f00, #0d0800)",
                  border: "1.5px solid #C9A84C",
                  color: "#C9A84C",
                  fontFamily: "Georgia, serif",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

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
              Password Reset Successfully!
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>
              {success || "Your password has been reset. Redirecting to login..."}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}