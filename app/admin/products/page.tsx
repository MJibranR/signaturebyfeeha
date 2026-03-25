"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { Search, Plus, Pencil, Trash2, X, Check, Upload } from "lucide-react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/products";

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  size: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  shippingFee: number;
};

const EMPTY: Product = {
  id: "", name: "", brand: "", price: 0, image: "", rating: 5, reviews: 0,
  size: "100ML", topNotes: "", heartNotes: "", baseNotes: "",
  category: "unisex", inStock: true, stockCount: 10, shippingFee: 0,
};

const FIELDS = [
  { key: "name",        label: "Product Name",            type: "text",   required: true },
  { key: "brand",       label: "Brand",                   type: "text",   required: true },
  { key: "price",       label: "Price (Rs.)",             type: "number", required: true },
  { key: "size",        label: "Size (e.g. 100ML)",       type: "text",   required: true },
  { key: "stockCount",  label: "Stock Count",             type: "number", required: true },
  { key: "shippingFee", label: "Shipping Fee (0 = Free)", type: "number", required: true },
  { key: "topNotes",    label: "Top Notes",               type: "text",   required: true },
  { key: "heartNotes",  label: "Heart Notes",             type: "text",   required: true },
  { key: "baseNotes",   label: "Base Notes",              type: "text",   required: true },
];

const CATEGORIES = ["men", "women", "unisex", "niche", "gift-sets", "body-mists", "middle-eastern"];

const statusStyle: Record<string, { bg: string; color: string }> = {
  true:  { bg: "rgba(45,138,78,0.12)",  color: "#2d8a4e" },
  false: { bg: "rgba(201,26,26,0.12)",  color: "#c94444" },
};

// ─── Product Form Modal ───────────────────────────────────────────────────────
function ProductForm({
  title, initial, onSave, onClose,
}: {
  title: string;
  initial: Product;
  onSave: (p: Product) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [imagePreview, setImagePreview] = useState(initial.image);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())       e.name       = "Required";
    if (!form.brand.trim())      e.brand      = "Required";
    if (form.price <= 0)         e.price      = "Must be > 0";
    if (!form.size.trim())       e.size       = "Required";
    if (!form.topNotes.trim())   e.topNotes   = "Required";
    if (!form.heartNotes.trim()) e.heartNotes = "Required";
    if (!form.baseNotes.trim())  e.baseNotes  = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImagePreview(src);
      setForm(f => ({ ...f, image: src }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all";
  const inputStyle = (hasError: boolean) => ({
    background: "#f8f5f0",
    border: `1.5px solid ${hasError ? "#c94444" : "rgba(201,168,76,0.25)"}`,
    color: "#1a0a00",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.3)", maxHeight: "92vh" }}>

        <div className="flex items-center justify-between px-4 sm:px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <h2 className="text-sm font-black uppercase tracking-widest"
            style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>{title}</h2>
          <button onClick={onClose}><X size={18} color="#a89070" /></button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-5">
          {/* Image upload */}
          <div>
            <label className="text-[10px] font-black tracking-[0.25em] uppercase mb-2 block" style={{ color: "#8B6914" }}>
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(245,240,235,0.9)", border: "1.5px solid rgba(201,168,76,0.25)" }}>
                {imagePreview
                  ? <img src={imagePreview} alt="preview" className="w-full h-full object-contain p-1.5" />
                  : <Upload size={20} color="rgba(201,168,76,0.4)" />}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all hover:scale-105"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#8B6914" }}>
                  <Upload size={13} /> Upload Image
                  <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                </label>
                <input type="text" placeholder="Or paste image URL..."
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setImagePreview(e.target.value); }}
                  className="px-3 py-2 rounded-lg text-xs outline-none w-full"
                  style={{ background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.2)", color: "#1a0a00" }} />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELDS.map(f => (
              <div key={f.key} className={f.key === "name" ? "sm:col-span-2" : ""}>
                <label className="text-[10px] font-black tracking-[0.2em] uppercase mb-1 block"
                  style={{ color: errors[f.key] ? "#c94444" : "#8B6914" }}>
                  {f.label}{f.required && " *"}
                </label>
                <input type={f.type} value={(form as any)[f.key]}
                  onChange={e => setForm(prev => ({
                    ...prev,
                    [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                  }))}
                  className={inputCls} style={inputStyle(!!errors[f.key])}
                  onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                  onBlur={e => (e.target.style.border = `1.5px solid ${errors[f.key] ? "#c94444" : "rgba(201,168,76,0.25)"}`)} />
                {errors[f.key] && <p className="text-[10px] mt-0.5" style={{ color: "#c94444" }}>{errors[f.key]}</p>}
              </div>
            ))}

            <div>
              <label className="text-[10px] font-black tracking-[0.2em] uppercase mb-1 block" style={{ color: "#8B6914" }}>Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className={inputCls} style={inputStyle(false)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black tracking-[0.2em] uppercase mb-1 block" style={{ color: "#8B6914" }}>Rating (1–5)</label>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}
                className={inputCls} style={inputStyle(false)}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black tracking-[0.2em] uppercase mb-1 block" style={{ color: "#8B6914" }}>Reviews Count</label>
              <input type="number" value={form.reviews}
                onChange={e => setForm(f => ({ ...f, reviews: Number(e.target.value) }))}
                className={inputCls} style={inputStyle(false)}
                onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.25)")} />
            </div>

            <div className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.2)" }}>
              <span className="text-xs font-semibold" style={{ color: "#1a0a00" }}>In Stock</span>
              <button onClick={() => setForm(f => ({ ...f, inStock: !f.inStock }))}
                className="w-10 h-5 rounded-full transition-all relative"
                style={{ background: form.inStock ? "#C9A84C" : "rgba(201,168,76,0.15)" }}>
                <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                  style={{ left: form.inStock ? "calc(100% - 18px)" : "2px" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 flex gap-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #1a0f00, #0d0800)", border: "1.5px solid #C9A84C", color: "#C9A84C" }}>
            <Check size={13} /> {saving ? "Saving..." : title}
          </button>
          <button onClick={onClose}
            className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(201,168,76,0.08)", color: "#8B6914", border: "1px solid rgba(201,168,76,0.25)" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [editing, setEditing]         = useState<Product | null>(null);
  const [showAdd, setShowAdd]         = useState(false);
  const [deleteId, setDeleteId]       = useState<string | null>(null);

  // Load products from DB on mount
  useEffect(() => {
    getProducts().then(data => {
      setProductList(data as Product[]);
      setLoading(false);
    });
  }, []);

  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (form: Product) => {
    const id = form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now();
    await createProduct({ ...form, id });
    setProductList(prev => [{ ...form, id }, ...prev]);
    setShowAdd(false);
  };

  const handleSave = async (form: Product) => {
    await updateProduct(form.id, form);
    setProductList(prev => prev.map(p => p.id === form.id ? form : p));
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProductList(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Products</h1>
          <p className="text-xs mt-1" style={{ color: "#a89070" }}>{productList.length} products in store</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1a0f00, #0d0800)", border: "1.5px solid #C9A84C", color: "#C9A84C" }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full sm:max-w-sm"
        style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)" }}>
        <Search size={14} color="#8B6914" />
        <input type="text" placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-xs outline-none min-w-0" style={{ color: "#1a0a00" }} />
        {search && <button onClick={() => setSearch("")}><X size={12} color="#a89070" /></button>}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.04)" }}>
                {["Product", "Brand", "Price", "Stock", "Category", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black tracking-widest uppercase" style={{ color: "#8B6914" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: "#a89070" }}>Loading products...</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
                  className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ background: "rgba(245,240,235,0.9)", border: "1px solid rgba(201,168,76,0.2)" }}>
                        {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />}
                      </div>
                      <p className="text-xs font-semibold max-w-[160px] leading-snug" style={{ color: "#1a0a00" }}>{p.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#5a3e1a" }}>{p.brand}</td>
                  <td className="px-4 py-3 text-xs font-black" style={{ color: "#8B6914", fontFamily: "Georgia, serif" }}>
                    Rs.{p.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: p.stockCount <= 3 ? "rgba(201,26,26,0.1)" : "rgba(45,138,78,0.1)", color: p.stockCount <= 3 ? "#c94444" : "#2d8a4e" }}>
                      {p.stockCount} left
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs capitalize" style={{ color: "#5a3e1a" }}>{p.category}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={p.inStock ? statusStyle.true : statusStyle.false}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditing(p)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(201,168,76,0.1)" }}>
                        <Pencil size={12} color="#8B6914" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(201,26,26,0.1)" }}>
                        <Trash2 size={12} color="#c94444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-sm" style={{ color: "#a89070", fontStyle: "italic" }}>No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <ProductForm title="Add Product" initial={{ ...EMPTY }} onSave={handleAdd} onClose={() => setShowAdd(false)} />
      )}
      {editing && (
        <ProductForm title="Save Changes" initial={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-6"
            style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.3)" }}>
            <h2 className="text-sm font-black uppercase tracking-widest mb-2"
              style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Delete Product</h2>
            <p className="text-xs mb-5" style={{ color: "#5a3e1a" }}>
              Are you sure you want to delete <strong>{productList.find(p => p.id === deleteId)?.name}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest"
                style={{ background: "#c94444", color: "#fff" }}>Delete</button>
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest"
                style={{ background: "rgba(201,168,76,0.1)", color: "#8B6914", border: "1px solid rgba(201,168,76,0.3)" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}