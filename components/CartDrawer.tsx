"use client";
import { X, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { createOrder } from "@/lib/actions/orders";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface StoredUser {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
}

const WHATSAPP_NUMBER = "923353537028";

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQty, total, count, clearCart } = useCart();
  const [orderNote, setOrderNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  // Read user from localStorage whenever drawer opens
  useEffect(() => {
    if (open) {
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      setUser(stored);
    }
  }, [open]);

  const buildWhatsAppMessage = () => {
    const lines: string[] = [];
    lines.push("🛍️ *New Order — Signature by Feeha*");
    lines.push("─────────────────────────");
    if (user) {
      lines.push(`👤 *Customer:* ${user.name}`);
      lines.push(`📧 *Email:* ${user.email}`);
      if (user.phone) lines.push(`📞 *Phone:* ${user.phone}`);
      lines.push("─────────────────────────");
    }
    items.forEach((item, i) => {
      lines.push(`*${i + 1}. ${item.name}*`);
      lines.push(`   Qty: ${item.quantity}`);
      lines.push(`   Price: Rs.${(item.price * item.quantity).toLocaleString()}.00`);
    });
    lines.push("─────────────────────────");
    lines.push(`*Subtotal: Rs.${total.toLocaleString()}.00*`);
    lines.push(`🚚 Shipping: FREE`);
    if (orderNote.trim()) {
      lines.push("─────────────────────────");
      lines.push(`📝 Order Note: ${orderNote}`);
    }
    lines.push("─────────────────────────");
    lines.push("Please confirm my order. Thank you! 🙏");
    return encodeURIComponent(lines.join("\n"));
  };

  const handleCheckout = async () => {
    if (items.length === 0 || submitting || !user) return;
    setSubmitting(true);

    try {
      for (const item of items) {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        await createOrder({
          id: orderId,
          customer: user.name,
          phone: user.phone ?? "",
          email: user.email,          // ← linked to user's email
          product: item.name,
          qty: item.quantity,
          amount: item.price * item.quantity,
          status: "Pending",
          note: orderNote,
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank");
    setSubmitting(false);
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[9998]" 
          style={{ backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-[9999] flex flex-col w-full sm:w-[360px]"  // ← change from z-50
        style={{
          background: "rgba(250,247,242,0.98)",
          backdropFilter: "blur(12px)",
          borderLeft: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.25)" }}
        >
          <div className="flex items-center gap-2">
            <h2
              className="text-lg font-black tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}
            >
              Cart
            </h2>
            {count > 0 && (
              <span
                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: "rgba(201,168,76,0.15)", color: "#8B6914", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                {count}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-sm text-center" style={{ color: "#8B6914", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Your cart is currently empty.
              </p>
              <button
                onClick={onClose}
                className="text-[11px] tracking-widest uppercase underline transition-colors hover:text-[#8B6914]"
                style={{ color: "#a89070", textUnderlineOffset: "3px" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-5"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Link href={`/products/${item.id}`} onClick={onClose}>
                    <div
                      className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                      style={{ background: "rgba(245,240,235,0.9)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} onClick={onClose}>
                      <p
                        className="text-xs font-bold leading-snug hover:text-[#8B6914] transition-colors truncate"
                        style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}
                      >
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-xs font-black mt-0.5" style={{ color: "#8B6914" }}>
                      Rs.{item.price.toLocaleString()}.00
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: "1px solid rgba(201,168,76,0.3)" }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-black transition-colors hover:bg-stone-100"
                          style={{ color: "#5a3e1a" }}
                        >−</button>
                        <span
                          className="w-8 text-center text-xs font-black"
                          style={{ color: "#1a0a00", borderLeft: "1px solid rgba(201,168,76,0.2)", borderRight: "1px solid rgba(201,168,76,0.2)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-black transition-colors hover:bg-stone-100"
                          style={{ color: "#5a3e1a" }}
                        >+</button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-xs font-black" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
                          Rs.{(item.price * item.quantity).toLocaleString()}.00
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="transition-colors hover:text-red-400"
                          style={{ color: "#a89070" }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order note */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black tracking-[0.25em] uppercase" style={{ color: "#8B6914" }}>
                  Order Note
                </label>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Add a note to your order..."
                  className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none placeholder:text-stone-300"
                  style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(201,168,76,0.25)", color: "#1a0a00", fontFamily: "Georgia, serif" }}
                  onFocus={(e) => (e.target.style.border = "1.5px solid #C9A84C")}
                  onBlur={(e) => (e.target.style.border = "1.5px solid rgba(201,168,76,0.25)")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-3 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(201,168,76,0.25)" }}
          >
            {/* Totals */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#8B6914" }}>Subtotal</span>
              <span className="text-sm font-black" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>
                Rs.{total.toLocaleString()}.00
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: "#a89070" }}>Shipping</span>
              <span className="text-xs font-black" style={{ color: "#2d8a4e" }}>FREE</span>
            </div>

            {/* ── NOT logged in — show login/register prompt ── */}
            {!user ? (
              <div
                className="rounded-xl p-4 flex flex-col gap-3 mt-1"
                style={{ background: "rgba(201,168,76,0.07)", border: "1.5px solid rgba(201,168,76,0.3)" }}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} color="#8B6914" />
                  <p className="text-[11px] font-bold tracking-wide" style={{ color: "#8B6914" }}>
                    LOGIN REQUIRED TO ORDER
                  </p>
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: "#a89070" }}>
                  Please sign in or create an account to place your order via WhatsApp.
                </p>
                <div className="flex gap-2">
                  <Link
                    href="/account/login"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
                  >
                    <LogIn size={11} /> LOGIN
                  </Link>
                  <Link
                    href="/account/register"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-colors"
                    style={{ background: "transparent", color: "#8B6914", border: "1.5px solid rgba(201,168,76,0.5)" }}
                  >
                    <UserPlus size={11} /> REGISTER
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Logged in — show user pill + checkout button ── */
              <>
                {/* User pill */}
                <div
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
                  >
                    {(user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold truncate" style={{ color: "#1a0a00" }}>{user.name}</p>
                    <p className="text-[9px] truncate" style={{ color: "#8B6914" }}>{user.email}</p>
                  </div>
                </div>

                <p className="text-[10px]" style={{ color: "#a89070" }}>
                  Free shipping all over Pakistan. Order confirmed via WhatsApp.
                </p>

                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  className="w-full py-3.5 flex items-center justify-center gap-2.5 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                  style={{ background: "#25D366", color: "#fff", fontFamily: "Georgia, serif", boxShadow: "0 4px 16px rgba(37,211,102,0.35)", border: "none", cursor: "pointer" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {submitting ? "Saving..." : "Checkout via WhatsApp"}
                </button>

                <p className="text-[9px] text-center leading-relaxed" style={{ color: "#a89070" }}>
                  Your order will be sent as a WhatsApp message to our team for confirmation.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}