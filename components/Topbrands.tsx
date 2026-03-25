import { getBrands } from "@/lib/actions/misc";
import Link from "next/link";

export default async function Topbrands() {
  let brands: any[] = [];
  try {
    brands = await getBrands();
  } catch {
    return null;
  }
  if (!brands.length) return null;

  const doubled = [...brands, ...brands];
  return (
    <section className="py-10 px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #C9A84C)" }} />
          <h2 className="text-xl font-black tracking-[0.2em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Top Brands</h2>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #C9A84C)" }} />
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 items-center" style={{ animation: "scroll-brands 20s linear infinite", width: "max-content" }}>
            {doubled.map((brand, i) => (
              <Link key={`${brand.id}-${i}`} href={brand.href}
                className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-2xl transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(201,168,76,0.2)", minWidth: "120px" }}>
                {brand.image
                  ? <img src={brand.image} alt={brand.name} className="h-10 w-auto object-contain" />
                  : <span className="text-sm font-black tracking-widest" style={{ color: "#1a0a00", fontFamily: "Georgia, serif" }}>{brand.name}</span>}
              </Link>
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll-brands { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>
    </section>
  );
}