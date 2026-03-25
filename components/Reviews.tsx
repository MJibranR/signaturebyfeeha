import { getReviews } from "@/lib/actions/misc";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i < rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default async function Reviews() {
  let reviews: any[] = [];
  try {
    reviews = await getReviews();
  } catch {
    return null;
  }
  if (!reviews.length) return null;

  return (
    <section className="py-10 px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <h2 className="text-xl font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>What Customers Say</h2>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map(r => (
            <div key={r.id} className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(8px)" }}>
              <Stars rating={r.rating} />
              <p className="text-sm font-bold" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>{r.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "#5a3e1a" }}>{r.body}</p>
              <p className="text-[10px] font-black tracking-widest uppercase mt-auto pt-2"
                style={{ color: "#C9A84C", borderTop: "1px solid rgba(201,168,76,0.15)" }}>— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}