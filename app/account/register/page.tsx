"use client";
import { registerUser } from "@/lib/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await registerUser(form);

  if (res?.error) {
    alert(res.error);
    return;
  }

  alert("Account created!");
  window.location.href = "/account/login";
};

  const inputStyle = {
    background: "rgba(255,255,255,0.9)",
    border: "1.5px solid rgba(201,168,76,0.3)",
    color: "#1a0a00",
    fontFamily: "Georgia, serif",
  };

  const focusIn = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.border = "1.5px solid #C9A84C");
  const focusOut = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.border = "1.5px solid rgba(201,168,76,0.3)");

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10"
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
        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-black tracking-[0.22em] uppercase"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
          >
            Create Account
          </h1>
          <div className="mt-3 h-px mx-auto w-16" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
              First Name
            </label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
              Last Name
            </label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={focusIn}
              onBlur={focusOut}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors hover:text-[#8B6914]"
                style={{ color: "#a89070" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Create button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-xs font-black tracking-[0.25em] uppercase transition-all hover:scale-105 active:scale-95 mt-2"
            style={{
              background: "linear-gradient(135deg, #1a0f00, #0d0800)",
              border: "1.5px solid #C9A84C",
              color: "#C9A84C",
              fontFamily: "Georgia, serif",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Create
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.25)" }} />
          <span className="text-[11px] tracking-widest" style={{ color: "#a89070" }}>OR</span>
          <div className="h-px flex-1" style={{ background: "rgba(201,168,76,0.25)" }} />
        </div>

        {/* Already have account */}
        <p className="text-center text-xs" style={{ color: "#5a3e1a" }}>
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="font-black tracking-wide transition-colors hover:text-[#8B6914]"
            style={{ color: "#C9A84C", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Sign in
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-[11px] tracking-widest uppercase transition-colors hover:text-[#8B6914]" style={{ color: "#a89070" }}>
            ← Back to Store
          </Link>
        </div>
      </div>
    </main>
  );
}