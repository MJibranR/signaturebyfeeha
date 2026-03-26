"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrdersByEmail } from "@/lib/actions/orders";
import { ShoppingBag, Calendar, Hash, Package, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type Order = {
  id: string;
  customer: string;
  phone: string;
  email: string;
  product: string;
  qty: number;
  amount: number;
  status: string;
  note: string;
  date: string;
  createdAt: Date | null;
};

type StoredUser = {
  id: number;
  name: string;
  email: string;
};

const statusColors: Record<string, { bg: string; color: string; dot: string }> = {
  Pending:   { bg: "rgba(251,191,36,0.12)",  color: "#b45309", dot: "#f59e0b" },
  Confirmed: { bg: "rgba(59,130,246,0.10)",  color: "#1d4ed8", dot: "#3b82f6" },
  Shipped:   { bg: "rgba(139,105,20,0.10)",  color: "#8B6914", dot: "#C9A84C" },
  Delivered: { bg: "rgba(34,197,94,0.10)",   color: "#15803d", dot: "#22c55e" },
  Cancelled: { bg: "rgba(239,68,68,0.10)",   color: "#b91c1c", dot: "#ef4444" },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    if (!stored) { router.push("/account/login"); return; }
    setUser(stored);

    getOrdersByEmail(stored.email).then((data) => {
      setOrders(data as Order[]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen py-10 px-4 flex items-center justify-center" style={{ background: "#faf8f5" }}>
        <div className="text-center space-y-3">
          <div
            className="w-10 h-10 rounded-full border-2 mx-auto animate-spin"
            style={{ borderColor: "#C9A84C", borderTopColor: "transparent" }}
          />
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#aaa" }}>LOADING ORDERS</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4" style={{ background: "#faf8f5" }}>
      <div className="max-w-lg mx-auto space-y-5">

        {/* ── Title ── */}
        <div>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#1a1a1a", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            MY ORDERS
          </h1>
          <div className="mt-2 h-px w-10" style={{ background: "#C9A84C" }} />
        </div>

        {/* ── Back ── */}
        <Link
          href="/account/profile"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest transition-colors"
          style={{ color: "#8B6914" }}
        >
          ← BACK TO PROFILE
        </Link>

        {/* ── Empty state ── */}
        {orders.length === 0 ? (
          <div
            className="rounded-xl p-10 text-center"
            style={{ border: "1px solid #e7e0d4", background: "#fff" }}
          >
            <ShoppingBag size={36} color="#C9A84C" className="mx-auto mb-3 opacity-50" />
            <p style={{ fontFamily: "Georgia, serif", color: "#555", fontSize: "14px" }}>
              No orders found.
            </p>
            <p style={{ fontSize: "11px", color: "#aaa", marginTop: "6px" }}>
              Orders you place will appear here.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#888" }}>
              {orders.length} ORDER{orders.length !== 1 ? "S" : ""} FOUND
            </p>

            <div className="space-y-3">
              {orders.map((order) => {
                const s = statusColors[order.status] ?? statusColors["Pending"];
                const isOpen = expandedId === order.id;

                return (
                  <div
                    key={order.id}
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid #e7e0d4", background: "#fff" }}
                  >
                    {/* Card header */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : order.id)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#1a1a1a" }}>
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <span
                            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                            style={{ background: s.bg, color: s.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                            {order.status}
                          </span>
                        </div>
                        <p style={{ fontSize: "12px", color: "#555" }} className="truncate">
                          {order.product}
                        </p>
                        <p style={{ fontSize: "10px", color: "#aaa", letterSpacing: "0.05em" }}>
                          {order.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "14px", color: "#8B6914" }}>
                          Rs. {order.amount.toLocaleString()}
                        </span>
                        {isOpen
                          ? <ChevronUp size={14} color="#C9A84C" />
                          : <ChevronDown size={14} color="#C9A84C" />
                        }
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 space-y-3" style={{ borderTop: "1px solid #f0ebe3" }}>
                        <DetailRow icon={<Hash size={12} color="#8B6914" />}     label="ORDER ID"    value={order.id} />
                        <DetailRow icon={<Package size={12} color="#8B6914" />}  label="PRODUCT"     value={order.product} />
                        <DetailRow icon={<ShoppingBag size={12} color="#8B6914" />} label="QTY"      value={`${order.qty} item${order.qty > 1 ? "s" : ""}`} />
                        <DetailRow icon={<Calendar size={12} color="#8B6914" />} label="ORDER DATE"  value={order.date} />
                        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid #f5f0ea" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "#aaa" }}>
                            TOTAL AMOUNT
                          </span>
                          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "15px", color: "#8B6914" }}>
                            Rs. {order.amount.toLocaleString()}
                          </span>
                        </div>
                        {order.note && (
                          <p style={{ fontSize: "11px", color: "#888", fontStyle: "italic", paddingTop: "4px" }}>
                            Note: {order.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: "12px", color: "#1a1a1a", fontWeight: 500, marginTop: "1px" }}>{value}</p>
      </div>
    </div>
  );
}