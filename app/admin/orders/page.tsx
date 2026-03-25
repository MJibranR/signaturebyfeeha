"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { Search, MessageCircle, X } from "lucide-react";
import { getOrders, updateOrderStatus } from "@/lib/actions/orders";

type Order = {
  id: string;
  customer: string;
  phone: string;
  product: string;
  qty: number;
  amount: number;
  status: string;
  note: string;
  date: string;
};

const STATUSES = ["All", "Pending", "Confirmed", "Dispatched", "Delivered"];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Pending:    { bg: "rgba(201,118,42,0.12)", color: "#c9762a" },
  Confirmed:  { bg: "rgba(201,168,76,0.12)", color: "#8B6914" },
  Dispatched: { bg: "rgba(45,138,78,0.12)",  color: "#2d8a4e" },
  Delivered:  { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders]           = useState<Order[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    getOrders().then(data => {
      setOrders(data as Order[]);
      setLoading(false);
    });
  }, []);

  const filtered = orders.filter(o => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const waMessage = (o: Order) =>
    `https://api.whatsapp.com/send?phone=${o.phone.replace(/\s|\+/g, "")}&text=${encodeURIComponent(
      `Hello ${o.customer}! 🌸\n\nYour order from *Signature by Feeha* has been *${o.status}*.\n\n📦 *${o.product}* (Qty: ${o.qty})\n💰 Total: Rs.${o.amount.toLocaleString()}.00\n\nThank you for shopping with us! 🙏`
    )}`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Orders</h1>
        <p className="text-xs mt-1" style={{ color: "#a89070" }}>{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full sm:max-w-xs"
          style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)" }}>
          <Search size={14} color="#8B6914" />
          <input type="text" placeholder="Search orders..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none min-w-0" style={{ color: "#1a0a00" }} />
          {search && <button onClick={() => setSearch("")}><X size={12} color="#a89070" /></button>}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className="px-3 py-2 rounded-xl text-[11px] font-bold tracking-wide transition-all whitespace-nowrap flex-shrink-0"
              style={{
                background: filterStatus === s ? "linear-gradient(135deg, #1a0f00, #0d0800)" : "#fff",
                color: filterStatus === s ? "#C9A84C" : "#5a3e1a",
                border: filterStatus === s ? "1.5px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
              }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}>
                {["Order", "Customer", "Product", "Amount", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase" style={{ color: "#8B6914" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: "#a89070" }}>Loading orders...</td></tr>
              ) : filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
                  className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: "#C9A84C" }}>{o.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold" style={{ color: "#1a0a00" }}>{o.customer}</p>
                    <p className="text-[10px]" style={{ color: "#a89070" }}>{o.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs max-w-[160px] truncate" style={{ color: "#5a3e1a" }}>{o.product}</p>
                    <p className="text-[10px]" style={{ color: "#a89070" }}>Qty: {o.qty}</p>
                  </td>
                  <td className="px-4 py-3 text-xs font-black" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
                    Rs.{o.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                      className="text-[10px] font-bold px-2 py-1 rounded-full outline-none cursor-pointer"
                      style={{ background: statusStyle[o.status]?.bg, color: statusStyle[o.status]?.color, border: "none" }}>
                      {["Pending", "Confirmed", "Dispatched", "Delivered"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#a89070" }}>{o.date}</td>
                  <td className="px-4 py-3">
                    <a href={waMessage(o)} target="_blank" rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      style={{ background: "rgba(37,211,102,0.12)" }} title="Notify via WhatsApp">
                      <MessageCircle size={13} color="#25D366" />
                    </a>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: "#a89070", fontStyle: "italic" }}>
                  {orders.length === 0 ? "No orders yet. Orders placed via WhatsApp will appear here once added." : "No orders match your search."}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}