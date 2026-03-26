"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { getHomepageConfig, saveHomepageConfig } from "@/lib/actions/homepage";
import { getAllProductsAction } from "@/lib/actions/products";
import ImageUploadBox from "@/components/ImageUploadBox"; // Import the new component
import VideoPathInput from "@/components/VideoPathInput"; // Import for videos
import { ChevronDown, ChevronUp, Upload, Plus, Trash2, Eye, EyeOff, Check, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FeaturedSet = {
  id: number;
  name: string;
  brand: string;
  tagline: string;
  imagePreview: string;
  videoName: string;
  videoPath: string;
  imageLeft: boolean;
  bg: string;
  href: string;
};

type Brand = { id: number; name: string; image: string; href: string };
type Review = { id: number; name: string; title: string; body: string; rating: number };

type HomepageConfig = {
  sections: { key: string; label: string; enabled: boolean }[];
  heroImage: string;
  heroVideo?: string;
  heroType?: 'image' | 'video';
  trendingProducts: string[];
  featuredSets: FeaturedSet[];
  newArrivalProducts: string[];
  brands: Brand[];
  reviews: Review[];
  announcement: string;
};

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: HomepageConfig = {
  announcement: "Please confirm order via phone/WhatsApp, orders not confirmed within 24 hours may be cancelled",
  sections: [
    { key: "hero", label: "Hero Section", enabled: true },
    { key: "services", label: "Services Section", enabled: true },
    { key: "trending", label: "Trending Now", enabled: true },
    { key: "featured", label: "Featured Products", enabled: true },
    { key: "arrivals", label: "New Arrivals", enabled: true },
    { key: "brands", label: "Top Brands", enabled: true },
    { key: "reviews", label: "Customer Reviews", enabled: true },
  ],
  heroImage: "",
  heroVideo: "",
  heroType: "image",
  trendingProducts: [],
  featuredSets: [
    { id: 1, name: "Oud Wood", brand: "Tom Ford", tagline: "Pour Homme · Woody Oriental", imagePreview: "", videoName: "", videoPath: "/video/perfume/oud.mp4", imageLeft: true, bg: "linear-gradient(135deg, #1a0800 0%, #2d1200 100%)", href: "/products/oud-wood" },
    { id: 2, name: "Gucci Ruches", brand: "Gucci", tagline: "Pour Femme · Floral Chypre", imagePreview: "", videoName: "", videoPath: "/video/perfume/Gucci-Ruches.mp4", imageLeft: false, bg: "linear-gradient(135deg, #2d0000 0%, #4a0a0a 100%)", href: "/products/gucci-ruches" },
    { id: 3, name: "Creed Aventus", brand: "Creed", tagline: "Pour Homme · Fruity Chypre", imagePreview: "", videoName: "", videoPath: "/video/perfume/Drift-Aura.mp4", imageLeft: true, bg: "linear-gradient(135deg, #0a1528 0%, #1a2a4a 100%)", href: "/products/creed-aventus" },
  ],
  newArrivalProducts: [],
  brands: [
    { id: 1, name: "Tom Ford", image: "", href: "/brands/tom-ford" },
    { id: 2, name: "Gucci", image: "", href: "/brands/gucci" },
    { id: 3, name: "Creed", image: "", href: "/brands/creed" },
    { id: 4, name: "Dior", image: "", href: "/brands/dior" },
    { id: 5, name: "Lattafa", image: "", href: "/brands/lattafa" },
    { id: 6, name: "Afnan", image: "", href: "/brands/afnan" },
    { id: 7, name: "Rayhaan", image: "", href: "/brands/rayhaan" },
  ],
  reviews: [
    { id: 1, name: "Umar Jawaid", title: "Awesome Fragrance", body: "A very exotic and spicy fragrance. Worth spending every rupee on it.", rating: 5 },
    { id: 2, name: "Asim Ali", title: "Finally Found a Reliable Perfume Store", body: "I had a great experience shopping at Signature by Feeha. Fast delivery and original products.", rating: 5 },
    { id: 3, name: "Khurram Amin", title: "Amazing CS Experience", body: "I had an absolutely amazing customer service experience. The team was so helpful.", rating: 5 },
    { id: 4, name: "Sara Malik", title: "Best Oud Collection", body: "The oud selection here is unmatched. Authentic, long-lasting and beautifully packaged.", rating: 5 },
    { id: 5, name: "Bilal Qureshi", title: "Super Fast Delivery", body: "Ordered on Monday, received Tuesday. Packaging was premium.", rating: 5 },
    { id: 6, name: "Hina Farooq", title: "My Go-To Fragrance Store", body: "I've ordered 4 times now and every single time the experience has been flawless.", rating: 5 },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: checked ? "#C9A84C" : "rgba(201,168,76,0.15)" }}>
      <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
        style={{ left: checked ? "calc(100% - 20px)" : "4px" }} />
    </button>
  );
}

// In your SectionCard component, make sure it doesn't have overflow: hidden
function SectionCard({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 md:px-6 py-4"
        style={{ borderBottom: open ? "1px solid rgba(201,168,76,0.1)" : "none" }}>
        <span className="text-sm font-black uppercase tracking-widest text-left" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>{title}</span>
        {open ? <ChevronUp size={16} color="#8B6914" /> : <ChevronDown size={16} color="#8B6914" />}
      </button>
      {open && <div className="p-4 md:p-6">{children}</div>}
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all";
const inputSt  = { background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.2)", color: "#1a0a00" };
const labelCls = "text-[10px] font-black tracking-[0.22em] uppercase mb-1 block";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomepageAdminPage() {
  const [cfg, setCfg] = useState<HomepageConfig>(DEFAULT_CONFIG);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load config and products from DB on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [config, products] = await Promise.all([
          getHomepageConfig(),
          getAllProductsAction()
        ]);
        
        console.log("Loaded products:", products);
        console.log("Products count:", products?.length);
        
        if (config) {
          setCfg(config);
        }
        if (products && products.length > 0) {
          setAllProducts(products);
        } else {
          console.log("No products returned from server action");
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load configuration");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const result = await saveHomepageConfig(cfg);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(result.error || "Failed to save configuration");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (key: string) =>
    setCfg(c => ({ ...c, sections: c.sections.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s) }));

  const toggleTrending = (id: string) =>
    setCfg(c => ({
      ...c,
      trendingProducts: c.trendingProducts.includes(id)
        ? c.trendingProducts.filter(x => x !== id)
        : [...c.trendingProducts, id],
    }));

  const toggleArrival = (id: string) =>
    setCfg(c => ({
      ...c,
      newArrivalProducts: c.newArrivalProducts.includes(id)
        ? c.newArrivalProducts.filter(x => x !== id)
        : [...c.newArrivalProducts, id],
    }));

  const updateSet = (id: number, key: string, val: string | boolean) =>
    setCfg(c => ({ ...c, featuredSets: c.featuredSets.map(s => s.id === id ? { ...s, [key]: val } : s) }));

  const addSet = () =>
    setCfg(c => ({
      ...c,
      featuredSets: [...c.featuredSets, {
        id: Date.now(), name: "", brand: "", tagline: "", imagePreview: "", videoName: "", videoPath: "",
        imageLeft: true, bg: "linear-gradient(135deg, #1a0f00 0%, #0d0800 100%)", href: "",
      }],
    }));

  const removeSet = (id: number) =>
    setCfg(c => ({ ...c, featuredSets: c.featuredSets.filter(s => s.id !== id) }));

  const addBrand = () =>
    setCfg(c => ({ ...c, brands: [...c.brands, { id: Date.now(), name: "", image: "", href: "" }] }));

  const updateBrand = (id: number, key: string, val: string) =>
    setCfg(c => ({ ...c, brands: c.brands.map(b => b.id === id ? { ...b, [key]: val } : b) }));

  const removeBrand = (id: number) =>
    setCfg(c => ({ ...c, brands: c.brands.filter(b => b.id !== id) }));

  const addReview = () =>
    setCfg(c => ({ ...c, reviews: [...c.reviews, { id: Date.now(), name: "", title: "", body: "", rating: 5 }] }));

  const updateReview = (id: number, key: string, val: string | number) =>
    setCfg(c => ({ ...c, reviews: c.reviews.map(r => r.id === id ? { ...r, [key]: val } : r) }));

  const removeReview = (id: number) =>
    setCfg(c => ({ ...c, reviews: c.reviews.filter(r => r.id !== id) }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm" style={{ color: "#8B6914" }}>Loading homepage configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>
            Homepage
          </h1>
          <p className="text-xs mt-1" style={{ color: "#a89070" }}>Manage every section of your homepage</p>
        </div>
        
        {error && (
          <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(201,68,68,0.1)", color: "#c94444" }}>
            {error}
          </div>
        )}
        
        <button 
          onClick={save} 
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: saved ? "linear-gradient(135deg,#2d8a4e,#1a5c30)" : "linear-gradient(135deg,#1a0f00,#0d0800)", 
            border: `1.5px solid ${saved ? "#2d8a4e" : "#C9A84C"}`, 
            color: saved ? "#fff" : "#C9A84C" 
          }}>
          {saving ? (
            <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
          ) : saved ? (
            <><Check size={13} /> Saved!</>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* ── 1. Sections ON/OFF ─────────────────────────────────────────────── */}
      <SectionCard title="Section Visibility" defaultOpen>
        <div className="flex flex-col gap-3">
          {cfg.sections.map(s => (
            <div key={s.key} className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ background: s.enabled ? "rgba(201,168,76,0.06)" : "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
              <div className="flex items-center gap-3 min-w-0">
                {s.enabled ? <Eye size={15} color="#C9A84C" className="flex-shrink-0" /> : <EyeOff size={15} color="#a89070" className="flex-shrink-0" />}
                <span className="text-sm font-semibold truncate" style={{ color: s.enabled ? "#1a0a00" : "#a89070" }}>{s.label}</span>
              </div>
              <Toggle checked={s.enabled} onChange={() => toggleSection(s.key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── 2. Announcement ───────────────────────────────────────────────── */}
      <SectionCard title="Announcement Bar">
        <label className={labelCls} style={{ color: "#8B6914" }}>Announcement Text</label>
        <input type="text" value={cfg.announcement}
          onChange={e => setCfg(c => ({ ...c, announcement: e.target.value }))}
          className={inputCls} style={inputSt}
          onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
          onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
      </SectionCard>

      {/* ── 3. Hero ───────────────────────────────────────────────────────── */}
{/* ── 3. Hero ───────────────────────────────────────────────────────── */}
<SectionCard title="Hero Section">
  <div className="space-y-4">
    {/* Hero Type Selection */}
    <div className="flex gap-4">
      <button
        onClick={() => setCfg(c => ({ ...c, heroType: "image" }))}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
          cfg.heroType === "image" 
            ? "bg-[#C9A84C] text-[#1a0800]" 
            : "bg-gray-100 text-[#8B6914]"
        }`}
      >
        Image Hero
      </button>
      <button
        onClick={() => setCfg(c => ({ ...c, heroType: "video" }))}
        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
          cfg.heroType === "video" 
            ? "bg-[#C9A84C] text-[#1a0800]" 
            : "bg-gray-100 text-[#8B6914]"
        }`}
      >
        Video Hero
      </button>
    </div>
    
    {cfg.heroType === "image" ? (
      <>
        <p className="text-xs" style={{ color: "#a89070" }}>Upload or set the hero banner image.</p>
        <ImageUploadBox 
          value={cfg.heroImage} 
          onChange={v => setCfg(c => ({ ...c, heroImage: v }))} 
          label="Upload Hero Image" 
        />
        {cfg.heroImage && (
          <div className="mt-4 rounded-xl overflow-hidden" style={{ maxHeight: "200px" }}>
            <img src={cfg.heroImage} alt="hero preview" className="w-full object-cover" />
          </div>
        )}
      </>
    ) : (
      <>
        <p className="text-xs" style={{ color: "#a89070" }}>Upload or set the hero banner video.</p>
        <VideoPathInput 
          value={cfg.heroVideo || ""} 
          onChange={(v) => setCfg(c => ({ ...c, heroVideo: v }))}
          label="Hero Video Path"
        />
        {cfg.heroVideo && (
          <div className="mt-4 rounded-xl overflow-hidden" style={{ maxHeight: "200px" }}>
            <video src={cfg.heroVideo} className="w-full object-cover" controls />
          </div>
        )}
      </>
    )}
  </div>
</SectionCard>

      {/* ── 4. Trending ───────────────────────────────────────────────────── */}
      <SectionCard title="Trending Now — Product Selection">
        <p className="text-xs mb-4" style={{ color: "#a89070" }}>
          Toggle which products appear in the Trending Now section. <span style={{ color: "#C9A84C" }}>{cfg.trendingProducts.length} selected</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allProducts.map(p => {
            const on = cfg.trendingProducts.includes(p.id);
            return (
              <button key={p.id} onClick={() => toggleTrending(p.id)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                style={{ background: on ? "rgba(201,168,76,0.1)" : "#f8f5f0", border: `1px solid ${on ? "#C9A84C" : "rgba(201,168,76,0.15)"}` }}>
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ background: "rgba(245,240,235,0.9)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "#1a0a00" }}>{p.name}</p>
                  <p className="text-[10px]" style={{ color: "#a89070" }}>{p.brand}</p>
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: on ? "#C9A84C" : "rgba(201,168,76,0.15)" }}>
                  {on && <Check size={11} color="#1a0800" />}
                </div>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* ── 5. Featured Sets ──────────────────────────────────────────────── */}
      <SectionCard title="Featured Products — Sets">
        <p className="text-xs mb-5" style={{ color: "#a89070" }}>
          Each set shows an image on one side and a video on the other. Scroll-jacked horizontally.
        </p>
        <div className="flex flex-col gap-5">
          {cfg.featuredSets.map((set, idx) => (
            <div key={set.id} className="rounded-2xl p-4 md:p-5 flex flex-col gap-4"
              style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#C9A84C" }}>Set {idx + 1}</span>
                <button onClick={() => removeSet(set.id)} className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,26,26,0.1)" }}>
                  <X size={12} color="#c94444" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: "#8B6914" }}>Product Name</label>
                  <input type="text" value={set.name} className={inputCls} style={inputSt}
                    onChange={e => updateSet(set.id, "name", e.target.value)}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#8B6914" }}>Brand</label>
                  <input type="text" value={set.brand} className={inputCls} style={inputSt}
                    onChange={e => updateSet(set.id, "brand", e.target.value)}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#8B6914" }}>Tagline</label>
                  <input type="text" value={set.tagline} className={inputCls} style={inputSt}
                    onChange={e => updateSet(set.id, "tagline", e.target.value)}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#8B6914" }}>Product Link (href)</label>
                  <input type="text" value={set.href} placeholder="/products/your-product-id" className={inputCls} style={inputSt}
                    onChange={e => updateSet(set.id, "href", e.target.value)}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
                </div>
                <div>
                <VideoPathInput 
                  value={set.videoPath} 
                  onChange={(v) => updateSet(set.id, "videoPath", v)}
                  label="Video Path"
                />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#8B6914" }}>Background Gradient</label>
                  <input type="text" value={set.bg} className={inputCls} style={inputSt}
                    onChange={e => updateSet(set.id, "bg", e.target.value)}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)")} />
                </div>
              </div>

              <div>
                <label className={labelCls} style={{ color: "#8B6914" }}>Product Image</label>
                <ImageUploadBox value={set.imagePreview} onChange={v => updateSet(set.id, "imagePreview", v)} />
              </div>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl flex-wrap gap-3"
                style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)" }}>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#1a0a00" }}>Image Position</p>
                  <p className="text-[10px]" style={{ color: "#a89070" }}>Which side should the image appear?</p>
                </div>
                <div className="flex gap-2">
                  {["Left", "Right"].map(side => (
                    <button key={side} onClick={() => updateSet(set.id, "imageLeft", side === "Left")}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all"
                      style={{
                        background: (side === "Left") === set.imageLeft ? "#C9A84C" : "rgba(201,168,76,0.08)",
                        color: (side === "Left") === set.imageLeft ? "#1a0800" : "#8B6914",
                        border: `1px solid ${(side === "Left") === set.imageLeft ? "#C9A84C" : "rgba(201,168,76,0.2)"}`,
                      }}>
                      {side}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button onClick={addSet}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
            <Plus size={14} /> Add Featured Set
          </button>
        </div>
      </SectionCard>

      {/* ── 6. New Arrivals ───────────────────────────────────────────────── */}
      <SectionCard title="New Arrivals — Product Selection">
        <p className="text-xs mb-4" style={{ color: "#a89070" }}>
          Toggle which products appear in New Arrivals. <span style={{ color: "#C9A84C" }}>{cfg.newArrivalProducts.length} selected</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {allProducts.map(p => {
            const on = cfg.newArrivalProducts.includes(p.id);
            return (
              <button key={p.id} onClick={() => toggleArrival(p.id)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
                style={{ background: on ? "rgba(201,168,76,0.1)" : "#f8f5f0", border: `1px solid ${on ? "#C9A84C" : "rgba(201,168,76,0.15)"}` }}>
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ background: "rgba(245,240,235,0.9)", border: "1px solid rgba(201,168,76,0.2)" }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "#1a0a00" }}>{p.name}</p>
                  <p className="text-[10px]" style={{ color: "#a89070" }}>{p.brand} · Rs.{p.price.toLocaleString()}</p>
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: on ? "#C9A84C" : "rgba(201,168,76,0.15)" }}>
                  {on && <Check size={11} color="#1a0800" />}
                </div>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* ── 7. Brands ─────────────────────────────────────────────────────── */}
{/* ── 7. Brands ─────────────────────────────────────────────────────── */}
<SectionCard title="Top Brands">
  <p className="text-xs mb-4" style={{ color: "#a89070" }}>Add, edit or remove brand logos shown in the auto-scrolling brands row.</p>
  <div className="flex flex-col gap-3">
    {cfg.brands.map(b => (
      <div key={b.id} className="flex flex-col gap-3 px-4 py-3 rounded-xl"
        style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
        
        {/* Logo preview and upload with auto-suggest */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)" }}>
            {b.image ? <img src={b.image} alt={b.name} className="w-full h-full object-contain p-1" /> : <Upload size={14} color="rgba(201,168,76,0.3)" />}
          </div>
          
          {/* Use ImageUploadBox for brand logos */}
          <div className="flex-1 w-full">
            <ImageUploadBox 
              value={b.image} 
              onChange={(v) => updateBrand(b.id, "image", v)}
              label="Brand Logo"
            />
          </div>
        </div>
        
        {/* Brand name and href inputs */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input type="text" value={b.name} placeholder="Brand name"
            className="flex-1 px-3 py-2 rounded-lg text-xs outline-none min-w-0"
            style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
            onChange={e => updateBrand(b.id, "name", e.target.value)} />
          <input type="text" value={b.href} placeholder="/brands/slug"
            className="flex-1 px-3 py-2 rounded-lg text-xs outline-none min-w-0"
            style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
            onChange={e => updateBrand(b.id, "href", e.target.value)} />
        </div>
        
        {/* Delete button */}
        <div className="flex justify-end">
          <button onClick={() => removeBrand(b.id)} className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,26,26,0.1)" }}>
            <Trash2 size={12} color="#c94444" />
          </button>
        </div>
      </div>
    ))}
    
    <button onClick={addBrand}
      className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
      style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
      <Plus size={14} /> Add Brand
    </button>
  </div>
</SectionCard>

      {/* ── 8. Reviews ────────────────────────────────────────────────────── */}
      <SectionCard title="Customer Reviews">
        <p className="text-xs mb-4" style={{ color: "#a89070" }}>Manage the reviews displayed in the homepage reviews carousel.</p>
        <div className="flex flex-col gap-3">
          {cfg.reviews.map(r => (
            <div key={r.id} className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => updateReview(r.id, "rating", n)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={n <= r.rating ? "#C9A84C" : "rgba(201,168,76,0.2)"}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </button>
                  ))}
                </div>
                <button onClick={() => removeReview(r.id)} className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,26,26,0.1)" }}>
                  <X size={11} color="#c94444" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" value={r.name} placeholder="Customer name" className="px-3 py-2 rounded-lg text-xs outline-none"
                  style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
                  onChange={e => updateReview(r.id, "name", e.target.value)} />
                <input type="text" value={r.title} placeholder="Review title" className="px-3 py-2 rounded-lg text-xs outline-none"
                  style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
                  onChange={e => updateReview(r.id, "title", e.target.value)} />
              </div>
              <textarea rows={2} value={r.body} placeholder="Review body..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
                onChange={e => updateReview(r.id, "body", e.target.value)} />
            </div>
          ))}
          <button onClick={addReview}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
            style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
            <Plus size={14} /> Add Review
          </button>
        </div>
      </SectionCard>

    </div>
  );
}