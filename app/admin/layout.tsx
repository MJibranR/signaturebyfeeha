"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Package, ShoppingBag, Settings,
  LogOut, Menu, X, ChevronRight, Home, Paperclip,
  Contact
} from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // change this

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "HomePage", href: "/admin/homepage", icon: Home },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Contact", href: "/admin/contact", icon: Contact },
  { label: "Pages", href: "/admin/pages", icon: Paperclip },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Sidebar closed by default on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const a = sessionStorage.getItem("sf_admin");
    if (a === "true") setAuthed(true);
    // Open sidebar by default on desktop
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [pathname]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("sf_admin", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("sf_admin");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0d0800 0%, #1a0f00 100%)" }}
      >
        <div
          className="w-full max-w-sm px-8 py-10 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(12px)" }}
        >
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: "#C9A84C" }}>Signature by Feeha</p>
            <h1 className="text-2xl font-black tracking-[0.2em] uppercase text-white" style={{ fontFamily: "Georgia, serif" }}>Admin Panel</h1>
            <div className="mt-3 h-px mx-auto w-12" style={{ background: "linear-gradient(to right, transparent, #C9A84C, transparent)" }} />
          </div>
          <form onSubmit={login} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#C9A84C" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(201,168,76,0.3)", color: "#fff" }}
                onFocus={(e) => (e.target.style.border = "1.5px solid #C9A84C")}
                onBlur={(e) => (e.target.style.border = "1.5px solid rgba(201,168,76,0.3)")}
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="py-3 rounded-xl text-xs font-black tracking-[0.2em] uppercase transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#1a0800" }}
            >
              Enter Admin
            </button>
          </form>
          <div className="text-center mt-6">
            <Link href="/" className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(201,168,76,0.5)" }}>
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f8f5f0" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — drawer on mobile, static on desktop */}
      <aside
        className="fixed md:static inset-y-0 left-0 z-30 flex-shrink-0 flex flex-col transition-all duration-300"
        style={{
          width: sidebarOpen ? "240px" : "0px",
          minWidth: sidebarOpen ? "240px" : "0px",
          overflow: "hidden",
          background: "linear-gradient(180deg, #0d0800 0%, #1a0f00 100%)",
          borderRight: "1px solid rgba(201,168,76,0.2)",
        }}
      >
        {/* Logo */}
        <div className="px-4 py-5 flex items-center justify-between flex-shrink-0" style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#C9A84C" }}>Admin</p>
            <p className="text-sm font-black text-white" style={{ fontFamily: "Georgia, serif" }}>Signature by Feeha</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-stone-400 hover:text-white transition-colors ml-auto md:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap"
                style={{
                  background: active ? "rgba(201,168,76,0.15)" : "transparent",
                  color: active ? "#C9A84C" : "rgba(255,255,255,0.5)",
                  borderLeft: active ? "2px solid #C9A84C" : "2px solid transparent",
                }}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="text-xs font-semibold tracking-widest uppercase">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-red-900/20 whitespace-nowrap"
            style={{ color: "rgba(255,100,100,0.7)" }}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className="text-xs font-semibold tracking-widest uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-4 md:px-6 py-4 sticky top-0 z-10 gap-3"
          style={{ background: "rgba(248,245,240,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
        >
          <div className="flex items-center gap-3">
            {/* Hamburger — always visible, toggles sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-stone-500 hover:text-stone-800 transition-colors flex-shrink-0"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs" style={{ color: "#a89070" }}>
              <Link href="/admin/dashboard" className="hover:text-[#8B6914] transition-colors hidden sm:inline">Admin</Link>
              <ChevronRight size={12} className="hidden sm:inline" />
              <span style={{ color: "#1a0a00" }}>{navItems.find(n => pathname.startsWith(n.href))?.label || "Dashboard"}</span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg transition-all hover:scale-105 flex-shrink-0"
            style={{ background: "rgba(201,168,76,0.1)", color: "#8B6914", border: "1px solid rgba(201,168,76,0.3)" }}
          >
            View Store ↗
          </Link>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}