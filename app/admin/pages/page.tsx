"use client";
import { useState } from "react";
import { Plus, Trash2, X, Check, ChevronDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type FAQ       = { id: number; q: string; a: string };
type Section   = { id: number; title: string; body: string; icon?: string };
type ReturnItem= { id: number; text: string };

// ─── Defaults ────────────────────────────────────────────────────────────────
const DEFAULT_FAQS: FAQ[] = [
  { id: 1, q: "Do you have original perfumes for men and women?", a: "Yes, we are one of the biggest importers and wholesalers of 100% authentic perfumes in Pakistan..." },
  { id: 2, q: "Do you suggest luxury perfumes to customers?", a: "Yes, we offer complimentary perfume consultation to our clients and help you select your signature scent." },
  { id: 3, q: "What is the delivery time?", a: "Delivery time is max 7–10 working days. Most orders are processed within 2 days." },
  { id: 4, q: "How do I place an order?", a: "Placing an order is very simple. You can create an account or check out as a guest." },
  { id: 5, q: "What payment options are available?", a: "We encourage online bank transfers or direct deposits. We also offer Cash on Delivery (COD)." },
  { id: 6, q: "How do I track my order?", a: "Once your order is dispatched, the tracking number will be sent to you via WhatsApp." },
  { id: 7, q: "What is your return & exchange policy?", a: "We offer hassle-free returns and exchanges within 7 days of delivery." },
  { id: 8, q: "Are all your products sealed and original?", a: "Absolutely. Every product at Signature by Feeha is 100% original, sealed, and sourced directly from authorized distributors." },
];

const DEFAULT_ABOUT = {
  intro: "Signature by Feeha is one of the leading online stores for original perfumes in Pakistan. We offer an elegant and curated range of fragrances from all around the world — from the heart of the Middle East to the finest European maisons.",
  mission: "To bring the world's finest fragrances to every doorstep in Pakistan — authentically, affordably, and elegantly. Every bottle we deliver carries a promise: 100% original, carefully sourced, and beautifully presented.",
  customerService: "Signature by Feeha is proud to ensure that every customer receives the best possible experience. We are keen believers that it's you — the customers — who help us grow and make us what we are today.",
};

const DEFAULT_PRIVACY: Section[] = [
  { id: 1, title: "Log Files", body: "Signature by Feeha follows a standard procedure of using log files..." },
  { id: 2, title: "Cookies and Web Beacons", body: "Like any other website, Signature by Feeha uses cookies to store visitor preferences..." },
  { id: 3, title: "Our Advertising Partners", body: "Some advertisers may use cookies and web beacons. Partners include Google and Meta..." },
  { id: 4, title: "Third-Party Privacy Policies", body: "Signature by Feeha's Privacy Policy does not apply to other advertisers or websites..." },
  { id: 5, title: "Children's Information", body: "Signature by Feeha does not knowingly collect information from children under 13..." },
  { id: 6, title: "Online Privacy Policy Only", body: "This policy applies only to our online activities and is valid for visitors to our website..." },
  { id: 7, title: "Consent", body: "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions." },
];

const DEFAULT_TERMS: Section[] = [
  { id: 1, title: "Order Placement & Acceptance", body: "Order placing is to be done through the 'my cart' option, which will generate an email informing us about your purchase." },
  { id: 2, title: "Content Accuracy", body: "Signature by Feeha ensures that the price and descriptions of all products are error-free." },
  { id: 3, title: "Privacy Policy", body: "Our order and shipping process is dealt with high confidentiality." },
  { id: 4, title: "Delivery Charges", body: "Customers throughout Pakistan are provided with cash on delivery." },
  { id: 5, title: "Shipment", body: "The shipping time for orders across Pakistan is 2 to 4 working days." },
  { id: 6, title: "Exchange Policy", body: "We work on a no-return policy and sold items are exchangeable only within 5 days." },
  { id: 7, title: "Communication", body: "Phone: +923353537028\nEmail: signaturebyfeeha@gmail.com\nWhatsApp: +923353537028" },
];

const DEFAULT_SHIPPING = {
  heroText: "FREE Shipping All Over Pakistan",
  subText: "No minimum order. No hidden fees. Always free.",
  deliveryDays: "2–4",
  payment: "Cash on Delivery (COD)",
  coverage: "All cities across Pakistan",
  faqs: [
    { id: 1, q: "What is the process for Cash on Delivery (COD)?", a: "When you make a purchase using COD, your product will be booked. You will receive a call from us to confirm your order." },
    { id: 2, q: "Are there any hidden charges?", a: "There are absolutely NO hidden charges. You pay only the amount in your order summary." },
    { id: 3, q: "When will my order be dispatched?", a: "Orders are typically dispatched within 1–2 working days of confirmation." },
  ] as FAQ[],
};

const DEFAULT_RETURN = {
  longevityHours: "15–18",
  returnDays: 7,
  noRefundText: "Due to the nature of perfume products, we are unable to offer refunds once an order has been shipped.",
  qualifyingConditions: [
    { id: 1, text: "The parcel arrives broken or damaged." },
    { id: 2, text: "The products inside are damaged, leaking, or tampered." },
    { id: 3, text: "The fragrance does not last the guaranteed 15–18 hours." },
    { id: 4, text: "The wrong product was delivered." },
  ] as ReturnItem[],
  steps: [
    { id: 1, text: "Contact our Customer Service team within 48 hours via WhatsApp at +923353537028." },
    { id: 2, text: "Please provide clear photos of the damage to the packaging and/or products." },
    { id: 3, text: "Upon verification, we will arrange for a free replacement or exchange within 7 days." },
  ] as ReturnItem[],
  notes: [
    { id: 1, text: "We cannot replace products due to a change of mind or incorrect selection." },
    { id: 2, text: "This policy applies only to damaged or defective goods received upon delivery." },
    { id: 3, text: "Return window is strictly 7 days from the date of delivery." },
    { id: 4, text: "All items must be unused, sealed, and in original packaging to qualify." },
  ] as ReturnItem[],
};

// ─── Shared helpers ───────────────────────────────────────────────────────────
const inp  = "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all";
const inpSt= { background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.2)", color: "#1a0a00" };
const lbl  = "text-[10px] font-black tracking-[0.22em] uppercase mb-1 block";
const focus= (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.border = "1.5px solid #C9A84C");
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.border = "1.5px solid rgba(201,168,76,0.2)");

const TABS = ["faqs", "about", "privacy", "terms", "shipping", "returns"];
const TAB_LABELS: Record<string, string> = {
  faqs: "FAQ's", about: "About Us", privacy: "Privacy Policy",
  terms: "Terms & Conditions", shipping: "Shipping Charges", returns: "Return Policy",
};

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap"
      style={{
        background: active ? "linear-gradient(135deg,#1a0f00,#0d0800)" : "#fff",
        color: active ? "#C9A84C" : "#5a3e1a",
        border: active ? "1.5px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
      }}>
      {label}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 md:p-6" style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      {children}
    </div>
  );
}

function SectionList({
  items, onChange, onAdd, onRemove, addLabel = "Add Section",
}: {
  items: Section[];
  onChange: (id: number, key: string, val: string) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((s, i) => (
        <div key={s.id} className="rounded-xl p-4 flex flex-col gap-3"
          style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#C9A84C" }}>Section {i + 1}</span>
            <button onClick={() => onRemove(s.id)} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(201,26,26,0.1)" }}>
              <X size={11} color="#c94444" />
            </button>
          </div>
          <div>
            <label className={lbl} style={{ color: "#8B6914" }}>Title</label>
            <input type="text" value={s.title} onChange={e => onChange(s.id, "title", e.target.value)}
              className={inp} style={inpSt} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label className={lbl} style={{ color: "#8B6914" }}>Body</label>
            <textarea rows={4} value={s.body} onChange={e => onChange(s.id, "body", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={inpSt} onFocus={focus} onBlur={blur} />
          </div>
        </div>
      ))}
      <button onClick={onAdd}
        className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all"
        style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

function ItemList({
  items, onChange, onAdd, onRemove, placeholder = "Enter text...", addLabel = "Add Item",
}: {
  items: ReturnItem[];
  onChange: (id: number, val: string) => void;
  onAdd: () => void;
  onRemove: (id: number) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="text-[10px] font-black w-5 text-center flex-shrink-0" style={{ color: "#C9A84C" }}>{i + 1}</span>
          <input type="text" value={item.text} placeholder={placeholder}
            onChange={e => onChange(item.id, e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none min-w-0"
            style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
            onFocus={focus} onBlur={blur} />
          <button onClick={() => onRemove(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,26,26,0.08)" }}>
            <Trash2 size={12} color="#c94444" />
          </button>
        </div>
      ))}
      <button onClick={onAdd}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all mt-1"
        style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
        <Plus size={13} /> {addLabel}
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PagesAdminPage() {
  const [tab, setTab]           = useState("faqs");
  const [saved, setSaved]       = useState(false);
  const [faqs, setFaqs]         = useState<FAQ[]>(DEFAULT_FAQS);
  const [about, setAbout]       = useState(DEFAULT_ABOUT);
  const [privacy, setPrivacy]   = useState<Section[]>(DEFAULT_PRIVACY);
  const [terms, setTerms]       = useState<Section[]>(DEFAULT_TERMS);
  const [shipping, setShipping] = useState(DEFAULT_SHIPPING);
  const [ret, setRet]           = useState(DEFAULT_RETURN);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Pages</h1>
          <p className="text-xs mt-1" style={{ color: "#a89070" }}>Edit content for all static pages</p>
        </div>
        <button onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105 flex-shrink-0"
          style={{ background: saved ? "linear-gradient(135deg,#2d8a4e,#1a5c30)" : "linear-gradient(135deg,#1a0f00,#0d0800)", border: `1.5px solid ${saved ? "#2d8a4e" : "#C9A84C"}`, color: saved ? "#fff" : "#C9A84C" }}>
          {saved ? <><Check size={13} /> Saved!</> : "Save Changes"}
        </button>
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {TABS.map(t => <Tab key={t} label={TAB_LABELS[t]} active={tab === t} onClick={() => setTab(t)} />)}
      </div>

      {/* ── FAQ's ─────────────────────────────────────────────────────────── */}
      {tab === "faqs" && (
        <Card>
          <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>FAQ's</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div key={f.id} className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#C9A84C" }}>Q{i + 1}</span>
                  <button onClick={() => setFaqs(prev => prev.filter(x => x.id !== f.id))}
                    className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(201,26,26,0.1)" }}>
                    <X size={11} color="#c94444" />
                  </button>
                </div>
                <div>
                  <label className={lbl} style={{ color: "#8B6914" }}>Question</label>
                  <input type="text" value={f.q} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                    onChange={e => setFaqs(prev => prev.map(x => x.id === f.id ? { ...x, q: e.target.value } : x))} />
                </div>
                <div>
                  <label className={lbl} style={{ color: "#8B6914" }}>Answer</label>
                  <textarea rows={3} value={f.a} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={inpSt} onFocus={focus} onBlur={blur}
                    onChange={e => setFaqs(prev => prev.map(x => x.id === f.id ? { ...x, a: e.target.value } : x))} />
                </div>
              </div>
            ))}
            <button onClick={() => setFaqs(prev => [...prev, { id: Date.now(), q: "", a: "" }])}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all"
              style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
              <Plus size={14} /> Add FAQ
            </button>
          </div>
        </Card>
      )}

      {/* ── About Us ──────────────────────────────────────────────────────── */}
      {tab === "about" && (
        <Card>
          <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>About Us</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className={lbl} style={{ color: "#8B6914" }}>Introduction Paragraph</label>
              <textarea rows={4} value={about.intro} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={inpSt} onFocus={focus} onBlur={blur}
                onChange={e => setAbout(a => ({ ...a, intro: e.target.value }))} />
            </div>
            <div>
              <label className={lbl} style={{ color: "#8B6914" }}>Our Mission</label>
              <textarea rows={4} value={about.mission} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={inpSt} onFocus={focus} onBlur={blur}
                onChange={e => setAbout(a => ({ ...a, mission: e.target.value }))} />
            </div>
            <div>
              <label className={lbl} style={{ color: "#8B6914" }}>Customer Service</label>
              <textarea rows={4} value={about.customerService} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={inpSt} onFocus={focus} onBlur={blur}
                onChange={e => setAbout(a => ({ ...a, customerService: e.target.value }))} />
            </div>
          </div>
        </Card>
      )}

      {/* ── Privacy Policy ────────────────────────────────────────────────── */}
      {tab === "privacy" && (
        <Card>
          <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Privacy Policy</h2>
          <SectionList
            items={privacy}
            onChange={(id, key, val) => setPrivacy(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))}
            onAdd={() => setPrivacy(prev => [...prev, { id: Date.now(), title: "", body: "" }])}
            onRemove={id => setPrivacy(prev => prev.filter(s => s.id !== id))}
          />
        </Card>
      )}

      {/* ── Terms & Conditions ────────────────────────────────────────────── */}
      {tab === "terms" && (
        <Card>
          <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Terms & Conditions</h2>
          <SectionList
            items={terms}
            onChange={(id, key, val) => setTerms(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s))}
            onAdd={() => setTerms(prev => [...prev, { id: Date.now(), title: "", body: "" }])}
            onRemove={id => setTerms(prev => prev.filter(s => s.id !== id))}
            addLabel="Add Section"
          />
        </Card>
      )}

      {/* ── Shipping Charges ──────────────────────────────────────────────── */}
      {tab === "shipping" && (
        <div className="flex flex-col gap-5">
          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Hero Banner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Hero Text</label>
                <input type="text" value={shipping.heroText} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setShipping(s => ({ ...s, heroText: e.target.value }))} />
              </div>
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Sub Text</label>
                <input type="text" value={shipping.subText} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setShipping(s => ({ ...s, subText: e.target.value }))} />
              </div>
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Delivery Days</label>
                <input type="text" value={shipping.deliveryDays} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setShipping(s => ({ ...s, deliveryDays: e.target.value }))} />
              </div>
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Payment Method</label>
                <input type="text" value={shipping.payment} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setShipping(s => ({ ...s, payment: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl} style={{ color: "#8B6914" }}>Coverage</label>
                <input type="text" value={shipping.coverage} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setShipping(s => ({ ...s, coverage: e.target.value }))} />
              </div>
            </div>
          </Card>
          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>FAQ's</h2>
            <div className="flex flex-col gap-4">
              {shipping.faqs.map((f, i) => (
                <div key={f.id} className="rounded-xl p-4 flex flex-col gap-3"
                  style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#C9A84C" }}>Q{i + 1}</span>
                    <button onClick={() => setShipping(s => ({ ...s, faqs: s.faqs.filter(x => x.id !== f.id) }))}
                      className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(201,26,26,0.1)" }}>
                      <X size={11} color="#c94444" />
                    </button>
                  </div>
                  <input type="text" value={f.q} placeholder="Question" className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                    onChange={e => setShipping(s => ({ ...s, faqs: s.faqs.map(x => x.id === f.id ? { ...x, q: e.target.value } : x) }))} />
                  <textarea rows={2} value={f.a} placeholder="Answer" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={inpSt} onFocus={focus} onBlur={blur}
                    onChange={e => setShipping(s => ({ ...s, faqs: s.faqs.map(x => x.id === f.id ? { ...x, a: e.target.value } : x) }))} />
                </div>
              ))}
              <button onClick={() => setShipping(s => ({ ...s, faqs: [...s.faqs, { id: Date.now(), q: "", a: "" }] }))}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all"
                style={{ background: "rgba(201,168,76,0.08)", border: "1.5px dashed rgba(201,168,76,0.4)", color: "#8B6914" }}>
                <Plus size={14} /> Add FAQ
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ── Return Policy ─────────────────────────────────────────────────── */}
      {tab === "returns" && (
        <div className="flex flex-col gap-5">
          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-5" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Guarantees</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Longevity Guarantee (hours)</label>
                <input type="text" value={ret.longevityHours} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setRet(r => ({ ...r, longevityHours: e.target.value }))} />
              </div>
              <div>
                <label className={lbl} style={{ color: "#8B6914" }}>Return Window (days)</label>
                <input type="number" value={ret.returnDays} className={inp} style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setRet(r => ({ ...r, returnDays: Number(e.target.value) }))} />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl} style={{ color: "#8B6914" }}>No Refund Statement</label>
                <textarea rows={2} value={ret.noRefundText} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={inpSt} onFocus={focus} onBlur={blur}
                  onChange={e => setRet(r => ({ ...r, noRefundText: e.target.value }))} />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Qualifying Conditions for Replacement</h2>
            <ItemList items={ret.qualifyingConditions} placeholder="Condition text..."
              addLabel="Add Condition"
              onChange={(id, val) => setRet(r => ({ ...r, qualifyingConditions: r.qualifyingConditions.map(x => x.id === id ? { ...x, text: val } : x) }))}
              onAdd={() => setRet(r => ({ ...r, qualifyingConditions: [...r.qualifyingConditions, { id: Date.now(), text: "" }] }))}
              onRemove={id => setRet(r => ({ ...r, qualifyingConditions: r.qualifyingConditions.filter(x => x.id !== id) }))} />
          </Card>

          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>How to Request a Return (Steps)</h2>
            <ItemList items={ret.steps} placeholder="Step description..."
              addLabel="Add Step"
              onChange={(id, val) => setRet(r => ({ ...r, steps: r.steps.map(x => x.id === id ? { ...x, text: val } : x) }))}
              onAdd={() => setRet(r => ({ ...r, steps: [...r.steps, { id: Date.now(), text: "" }] }))}
              onRemove={id => setRet(r => ({ ...r, steps: r.steps.filter(x => x.id !== id) }))} />
          </Card>

          <Card>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Please Note</h2>
            <ItemList items={ret.notes} placeholder="Note text..."
              addLabel="Add Note"
              onChange={(id, val) => setRet(r => ({ ...r, notes: r.notes.map(x => x.id === id ? { ...x, text: val } : x) }))}
              onAdd={() => setRet(r => ({ ...r, notes: [...r.notes, { id: Date.now(), text: "" }] }))}
              onRemove={id => setRet(r => ({ ...r, notes: r.notes.filter(x => x.id !== id) }))} />
          </Card>
        </div>
      )}

    </div>
  );
}