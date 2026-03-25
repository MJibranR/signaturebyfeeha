export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { products, orders, reviews } from "@/lib/schema";
import { sql, desc } from "drizzle-orm";
import { Package, ShoppingBag, TrendingUp, Star, ArrowUpRight } from "lucide-react";

const statusStyle: Record<string, { bg: string; color: string }> = {
  Pending:    { bg: "rgba(201,118,42,0.12)", color: "#c9762a" },
  Confirmed:  { bg: "rgba(201,168,76,0.12)", color: "#8B6914" },
  Dispatched: { bg: "rgba(45,138,78,0.12)",  color: "#2d8a4e" },
  Delivered:  { bg: "rgba(59,130,246,0.12)", color: "#3b82f6" },
};

export default async function DashboardPage() {
  // Real counts from DB
  const [productCount] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  const [orderCount]   = await db.select({ count: sql<number>`count(*)::int` }).from(orders);
  const [reviewCount]  = await db.select({ count: sql<number>`count(*)::int` }).from(reviews);

  // Total revenue from all orders
  const [revenueRow] = await db.select({ total: sql<number>`coalesce(sum(amount),0)::int` }).from(orders);
  const revenue = revenueRow.total;
  const revenueDisplay = revenue >= 1_000_000
    ? `Rs.${(revenue / 1_000_000).toFixed(1)}M`
    : revenue >= 1_000
    ? `Rs.${(revenue / 1_000).toFixed(0)}K`
    : `Rs.${revenue}`;

  // Recent 5 orders
  const recentOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(5);

  // Top 5 products by review count
  const topProducts = await db.select().from(products).orderBy(desc(products.reviews)).limit(5);

  const stats = [
    { label: "Total Products", value: productCount.count, icon: Package,    color: "#C9A84C", bg: "rgba(201,168,76,0.1)" },
    { label: "Total Orders",   value: orderCount.count,   icon: ShoppingBag, color: "#2d8a4e", bg: "rgba(45,138,78,0.1)" },
    { label: "Total Revenue",  value: revenueDisplay,     icon: TrendingUp,  color: "#8B6914", bg: "rgba(139,105,20,0.1)" },
    { label: "Total Reviews",  value: reviewCount.count,  icon: Star,        color: "#c9762a", bg: "rgba(201,118,42,0.1)" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Dashboard</h1>
        <p className="text-xs mt-1" style={{ color: "#a89070" }}>Welcome back — here's what's happening at Signature by Feeha.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="rounded-2xl p-4 md:p-5"
              style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={17} color={s.color} />
                </div>
                <ArrowUpRight size={13} color="#C9A84C" />
              </div>
              <p className="text-xl md:text-2xl font-black" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>{s.value}</p>
              <p className="text-[10px] mt-0.5 tracking-wide uppercase" style={{ color: "#a89070" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent orders */}
        <div className="lg:col-span-2 rounded-2xl p-4 md:p-6"
          style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h2 className="text-sm font-black tracking-[0.15em] uppercase mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-xs text-center py-8" style={{ color: "#a89070", fontStyle: "italic" }}>No orders yet.</p>
          ) : (
            <div className="flex flex-col">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-start sm:items-center justify-between gap-3 py-3 border-b last:border-0"
                  style={{ borderColor: "rgba(201,168,76,0.1)" }}>
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: "#1a0a00" }}>{o.customer}</p>
                    <p className="text-[10px] mt-0.5 truncate" style={{ color: "#a89070" }}>{o.product} · {o.date}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-3 flex-shrink-0">
                    <p className="text-xs font-black" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
                      Rs.{o.amount.toLocaleString()}
                    </p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={statusStyle[o.status] ?? statusStyle.Pending}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="rounded-2xl p-4 md:p-6"
          style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h2 className="text-sm font-black tracking-[0.15em] uppercase mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Top Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-xs text-center py-8" style={{ color: "#a89070", fontStyle: "italic" }}>No products yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs font-black w-5 flex-shrink-0" style={{ color: "#C9A84C" }}>0{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: "#1a0a00" }}>{p.name}</p>
                    <p className="text-[10px]" style={{ color: "#a89070" }}>
                      {p.brand} · {p.reviews > 0 ? `${p.reviews} reviews` : "No reviews"}
                    </p>
                  </div>
                  <p className="text-xs font-black flex-shrink-0" style={{ color: "#8B6914" }}>
                    Rs.{(p.price / 1000).toFixed(0)}k
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}