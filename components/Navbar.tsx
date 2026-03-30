"use client";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, LogOut, Package, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from '../public/images/Logo1-without-bg.png';

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ALL", href: "/products" },
  { label: "MEN", href: "/men" },
  { label: "WOMEN", href: "/women" },
  { label: "UNISEX", href: "/unisex" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    setUser(stored);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    router.push("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16"
          style={{ backgroundColor: "rgba(245,240,235,0.55)", backdropFilter: "blur(3px)" }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl mx-4 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex-1 flex items-center gap-3 px-5 py-3.5 rounded-lg"
              style={{ border: "1.5px solid #1a0a00", background: "rgba(255,255,255,0.9)" }}
            >
              <input
                autoFocus
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm tracking-wide"
                style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <Search size={18} color="#8B6914" />
            </div>
            <button
              onClick={() => setSearchOpen(false)}
              className="text-stone-600 hover:text-stone-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* ── Cart Drawer ── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ── Navbar ── */}
<header
  className="border-b border-stone-200 top-0 z-[40]"
  style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)" }}
>
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="text-stone-600 hover:text-[#8B6914] transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center gap-0.5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center">
                <Image src={Logo} alt="SF Logo" width={32} height={32} className="object-contain md:w-10 md:h-10" />
                <div className="w-px h-7 md:h-10 bg-stone-300 mx-2 md:mx-3" />
              </div>
              <div className="flex flex-col leading-none">
                <span style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.9rem, 3.5vw, 1.45rem)", letterSpacing: "0.15em", color: "#1a1a1a", fontWeight: 700 }}>
                  SIGNATURE
                </span>
                <span style={{ fontSize: "clamp(0.45rem, 1.5vw, 0.6rem)", letterSpacing: "0.25em", color: "#555", textAlign: "center", marginTop: "2px" }}>
                  BY FEEHA
                </span>
              </div>
            </Link>
            <p className="hidden sm:block" style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#777", fontStyle: "italic" }}>
              Curated Fragrance Collections.
            </p>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4 text-stone-600">

            {/* Account */}
            <div className="relative hidden sm:block" ref={dropdownRef}>
              {user ? (
                // Logged-in: avatar circle + name + chevron
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-1.5 hover:text-[#8B6914] transition-colors"
                  aria-label="Account menu"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wide select-none"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
                  >
                    {getInitials(user.name)}
                  </div>
                  <span
                    className="hidden md:block text-[11px] font-semibold tracking-wide max-w-[80px] truncate"
                    style={{ color: "#1a1a1a" }}
                  >
                    {user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-200"
                    style={{ transform: accountOpen ? "rotate(180deg)" : "rotate(0deg)", color: "#8B6914" }}
                  />
                </button>
              ) : (
                // Guest: plain user icon → goes to login
                <Link href="/account/login" className="hover:text-[#8B6914] transition-colors" aria-label="Account">
                  <User size={20} />
                </Link>
              )}

              {/* Dropdown */}
              {accountOpen && user && (
                <div
                  className="absolute right-0 mt-2.5 w-56 rounded-xl shadow-xl overflow-hidden z-50"
                  style={{ border: "1px solid #e7e0d6", background: "#fff" }}
                >
                  {/* User info header */}
                  <div className="px-4 py-3.5" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(139,105,20,0.04))", borderBottom: "1px solid #ede8e0" }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-semibold truncate" style={{ color: "#1a1a1a", letterSpacing: "0.02em" }}>
                          {user.name || "Guest"}
                        </p>
                        <p className="text-[10px] truncate" style={{ color: "#888", letterSpacing: "0.02em" }}>
                          {user.email || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <Link
                      href="/account/orders"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold tracking-wide transition-colors group"
                      style={{ color: "#4b5563", letterSpacing: "0.06em" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    >
                      <Package size={14} style={{ color: "#8B6914" }} />
                      MY ORDERS
                    </Link>

                    <Link
                      href="/account/profile"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold tracking-wide transition-colors"
                      style={{ color: "#4b5563", letterSpacing: "0.06em" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    >
                      <User size={14} style={{ color: "#8B6914" }} />
                      MY PROFILE
                    </Link>
                  </div>

                  {/* Divider + Logout */}
                  <div style={{ borderTop: "1px solid #ede8e0" }} className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-semibold tracking-wide transition-colors"
                      style={{ color: "#b45309", letterSpacing: "0.06em" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(180,83,9,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                    >
                      <LogOut size={14} />
                      LOGOUT
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="hover:text-[#8B6914] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{ background: "#C9A84C", color: "#1a0800" }}
                >
                  {count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button className="sm:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:block border-t border-stone-200">
          <div className="max-w-screen-xl mx-auto px-4">
            <ul className="flex items-center justify-center flex-wrap">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-0.5 px-3 py-3 text-[11px] font-semibold tracking-widest transition-colors border-b-2"
                      style={{
                        color: active ? "#8B6914" : "#4b5563",
                        borderBottomColor: active ? "#8B6914" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = "#8B6914";
                          (e.currentTarget as HTMLElement).style.borderBottomColor = "#C9A84C";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = "#4b5563";
                          (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-stone-200">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex justify-between items-center px-5 py-3 text-[11px] font-semibold tracking-widest border-b border-stone-100 transition-colors"
                  style={{
                    color: active ? "#8B6914" : "#374151",
                    backgroundColor: active ? "rgba(201,168,76,0.06)" : "",
                    borderLeft: active ? "3px solid #C9A84C" : "3px solid transparent",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile account section */}
            {user ? (
              <>
                <div className="px-5 py-3 border-b border-stone-100" style={{ background: "rgba(201,168,76,0.04)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold" style={{ color: "#1a1a1a" }}>{user.name}</p>
                      <p className="text-[10px]" style={{ color: "#888" }}>{user.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-5 py-3 text-[11px] font-semibold tracking-widest border-b border-stone-100"
                  style={{ color: "#4b5563", borderLeft: "3px solid transparent" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Package size={14} style={{ color: "#8B6914" }} /> MY ORDERS
                </Link>
                <Link
                  href="/account/profile"
                  className="flex items-center gap-3 px-5 py-3 text-[11px] font-semibold tracking-widest border-b border-stone-100"
                  style={{ color: "#4b5563", borderLeft: "3px solid transparent" }}
                  onClick={() => setMobileOpen(false)}
                >
                  <User size={14} style={{ color: "#8B6914" }} /> MY PROFILE
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-semibold tracking-widest border-b border-stone-100"
                  style={{ color: "#b45309", borderLeft: "3px solid transparent" }}
                >
                  <LogOut size={14} /> LOGOUT
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                className="flex items-center gap-3 px-5 py-3 text-[11px] font-semibold tracking-widest border-b border-stone-100"
                style={{ color: "#4b5563", borderLeft: "3px solid transparent" }}
                onClick={() => setMobileOpen(false)}
              >
                <User size={14} style={{ color: "#8B6914" }} /> LOGIN / REGISTER
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}