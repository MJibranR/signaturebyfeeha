"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getSettings, saveSettings } from "@/lib/actions/misc";

type StoreSettings = {
  storeName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  facebook: string;
  announcement: string;
  codEnabled: boolean;
  bankEnabled: boolean;
  jazzcashEnabled: boolean;
  freeShipping: boolean;
};

const DEFAULT: StoreSettings = {
  storeName: "Signature by Feeha",
  email: "Scentsbysignature@gmail.com",
  phone: "+92 335 3537028",
  whatsapp: "923353537028",
  address: "Sector 15-B, Buffer Zone, North Karachi, Karachi",
  instagram: "https://www.instagram.com/signature_by_feeha/",
  facebook: "https://www.facebook.com/profile.php?id=61586351197047",
  announcement: "Please confirm order via phone/WhatsApp, orders not confirmed within 24 hours may be cancelled",
  codEnabled: true,
  bankEnabled: true,
  jazzcashEnabled: true,
  freeShipping: true,
};

export default function AdminSettingsPage() {
  const [store, setStore] = useState<StoreSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSettings().then(data => {
      if (data) setStore(data as StoreSettings);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    await saveSettings(store);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.25)", color: "#1a0a00" };
  const labelCls = "text-[10px] font-black tracking-[0.25em] uppercase mb-1 block";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl p-4 md:p-6" style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
      <h2 className="text-sm font-black tracking-[0.15em] uppercase mb-5 pb-3" style={{ fontFamily: "Georgia, serif", color: "#1a0a00", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        {title}
      </h2>
      {children}
    </div>
  );

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: "rgba(201,168,76,0.1)" }}>
      <span className="text-xs font-medium pr-4" style={{ color: "#1a0a00" }}>{label}</span>
      <button onClick={onChange} className="w-10 h-5 rounded-full transition-all relative flex-shrink-0"
        style={{ background: checked ? "#C9A84C" : "rgba(201,168,76,0.15)" }}>
        <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
          style={{ left: checked ? "calc(100% - 18px)" : "2px" }} />
      </button>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <p className="text-sm" style={{ color: "#a89070" }}>Loading settings...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-[0.1em] uppercase" style={{ fontFamily: "Georgia, serif", color: "#1a0a00" }}>Settings</h1>
          <p className="text-xs mt-1" style={{ color: "#a89070" }}>Manage your store configuration</p>
        </div>
        <button onClick={save}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:scale-105 flex-shrink-0"
          style={{ background: saved ? "linear-gradient(135deg, #2d8a4e, #1a5c30)" : "linear-gradient(135deg, #1a0f00, #0d0800)", border: `1.5px solid ${saved ? "#2d8a4e" : "#C9A84C"}`, color: saved ? "#fff" : "#C9A84C" }}>
          {saved ? <><Check size={13} /> Saved!</> : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Section title="Store Information">
          <div className="flex flex-col gap-4">
            {[
              { key: "storeName", label: "Store Name" },
              { key: "email",     label: "Email" },
              { key: "phone",     label: "Phone" },
              { key: "whatsapp",  label: "WhatsApp Number (no spaces/+)" },
              { key: "address",   label: "Address" },
            ].map(f => (
              <div key={f.key}>
                <label className={labelCls} style={{ color: "#8B6914" }}>{f.label}</label>
                <input type="text" value={(store as any)[f.key]}
                  onChange={e => setStore({ ...store, [f.key]: e.target.value })}
                  className={inputCls} style={inputStyle}
                  onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                  onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.25)")} />
              </div>
            ))}
          </div>
        </Section>

        <div className="flex flex-col gap-5">
          <Section title="Social Media">
            <div className="flex flex-col gap-4">
              {[
                { key: "instagram", label: "Instagram URL" },
                { key: "facebook",  label: "Facebook URL" },
              ].map(f => (
                <div key={f.key}>
                  <label className={labelCls} style={{ color: "#8B6914" }}>{f.label}</label>
                  <input type="text" value={(store as any)[f.key]}
                    onChange={e => setStore({ ...store, [f.key]: e.target.value })}
                    className={inputCls} style={inputStyle}
                    onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
                    onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.25)")} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Payment Methods">
            <Toggle label="Cash on Delivery (COD)"  checked={store.codEnabled}      onChange={() => setStore(s => ({ ...s, codEnabled: !s.codEnabled }))} />
            <Toggle label="Bank Transfer"            checked={store.bankEnabled}     onChange={() => setStore(s => ({ ...s, bankEnabled: !s.bankEnabled }))} />
            <Toggle label="JazzCash"                 checked={store.jazzcashEnabled} onChange={() => setStore(s => ({ ...s, jazzcashEnabled: !s.jazzcashEnabled }))} />
            <Toggle label="Free Shipping (Pakistan)" checked={store.freeShipping}   onChange={() => setStore(s => ({ ...s, freeShipping: !s.freeShipping }))} />
          </Section>
        </div>
      </div>

      <Section title="Announcement Bar">
        <label className={labelCls} style={{ color: "#8B6914" }}>Announcement Text</label>
        <textarea rows={2} value={store.announcement}
          onChange={e => setStore({ ...store, announcement: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
          style={inputStyle}
          onFocus={e => (e.target.style.border = "1.5px solid #C9A84C")}
          onBlur={e => (e.target.style.border = "1.5px solid rgba(201,168,76,0.25)")} />
        <p className="text-[10px] mt-2" style={{ color: "#a89070" }}>This text appears in the black bar at the top of your store.</p>
      </Section>
    </div>
  );
}