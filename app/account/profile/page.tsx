"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, ShoppingBag, LogOut, ArrowRight, Phone, Pencil, X, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { updateUser, getUserById } from "@/lib/actions/auth";

interface StoredUser {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("user") || "null");
  if (!stored) { router.push("/account/login"); return; }

  // Fetch fresh from DB to always get createdAt
  getUserById(stored.id).then((freshUser) => {
    if (!freshUser) { router.push("/account/login"); return; }

    // Merge fresh DB data with localStorage
    const merged = { ...stored, ...freshUser };
    localStorage.setItem("user", JSON.stringify(merged));
    setUser(merged);
    setForm({
      firstName: merged.firstName ?? "",
      lastName:  merged.lastName  ?? "",
      email:     merged.email     ?? "",
      phone:     merged.phone     ?? "",
    });
  });
}, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleSave = async () => {
    if (!user) return;
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("First name, last name and email are required.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");

    const res = await updateUser(user.id, form);
    setSaving(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    // Update localStorage
    const updated: StoredUser = {
      ...user,
      ...form,
      name: form.firstName + " " + form.lastName,
    };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setSuccess("Profile updated successfully.");
    setEditing(false);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleCancel = () => {
    if (!user) return;
    setForm({
      firstName: user.firstName ?? "",
      lastName:  user.lastName  ?? "",
      email:     user.email     ?? "",
      phone:     user.phone     ?? "",
    });
    setError("");
    setEditing(false);
  };

  if (!user) return null;

  const getInitials = () =>
    ((user.firstName?.[0] ?? "") + (user.lastName?.[0] ?? "")).toUpperCase();

  const joined = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-PK", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "—";

  return (
    <main className="min-h-screen py-10 px-4" style={{ background: "#faf8f5" }}>
      <div className="max-w-lg mx-auto space-y-5">

        {/* ── Title ── */}
        <div className="mb-2">
          <h1 style={{ fontFamily: "Georgia, serif", color: "#1a1a1a", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.1em" }}>
            MY PROFILE
          </h1>
          <div className="mt-2 h-px w-10" style={{ background: "#C9A84C" }} />
        </div>

        {/* ── Avatar + name card ── */}
        <div
          className="rounded-xl p-6 flex items-center gap-5"
          style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.13), rgba(139,105,20,0.05))", border: "1px solid #e7e0d4" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff" }}
          >
            {getInitials()}
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", fontWeight: 700, color: "#1a1a1a" }}>
              {user.firstName} {user.lastName}
            </p>
            <p style={{ fontSize: "0.78rem", color: "#8B6914", letterSpacing: "0.05em", marginTop: "2px" }}>
              {user.email}
            </p>
            {user.phone && (
              <p style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "2px" }}>
                {user.phone}
              </p>
            )}
          </div>
        </div>

        {/* ── Success / Error banners ── */}
        {success && (
          <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#15803d" }}>
            <Check size={14} /> {success}
          </div>
        )}
        {error && (
          <div className="rounded-lg px-4 py-3 text-sm flex items-center gap-2" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#b91c1c" }}>
            <X size={14} /> {error}
          </div>
        )}

        {/* ── Info / Edit card ── */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e7e0d4", background: "#fff" }}>

          {/* Card header with Edit toggle */}
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid #f0ebe3" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#aaa" }}>
              PERSONAL INFORMATION
            </span>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors text-[10px] font-bold tracking-wider"
                style={{ background: "rgba(201,168,76,0.1)", color: "#8B6914", border: "1px solid rgba(201,168,76,0.3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.1)")}
              >
                <Pencil size={11} /> EDIT
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-colors"
                  style={{ background: "rgba(239,68,68,0.07)", color: "#b91c1c", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  <X size={11} /> CANCEL
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-opacity"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", color: "#fff", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                  {saving ? "SAVING…" : "SAVE"}
                </button>
              </div>
            )}
          </div>

          {/* Fields */}
          {editing ? (
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <EditField
                  label="FIRST NAME"
                  value={form.firstName}
                  onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                  icon={<User size={13} color="#8B6914" />}
                />
                <EditField
                  label="LAST NAME"
                  value={form.lastName}
                  onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                  icon={<User size={13} color="#8B6914" />}
                />
              </div>
              <EditField
                label="EMAIL"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                icon={<Mail size={13} color="#8B6914" />}
                type="email"
              />
              <EditField
                label="PHONE NUMBER"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                icon={<Phone size={13} color="#8B6914" />}
                type="tel"
                placeholder="03xx-xxxxxxx"
              />
            </div>
          ) : (
            <>
              <InfoRow icon={<User size={15} color="#8B6914" />}   label="FIRST NAME"    value={user.firstName} />
              <InfoRow icon={<User size={15} color="#8B6914" />}   label="LAST NAME"     value={user.lastName}  divider />
              <InfoRow icon={<Mail size={15} color="#8B6914" />}   label="EMAIL"         value={user.email}     divider />
              <InfoRow icon={<Phone size={15} color="#8B6914" />}  label="PHONE"         value={user.phone || "—"} divider />
              <InfoRow icon={<Calendar size={15} color="#8B6914" />} label="MEMBER SINCE" value={joined}        divider />
            </>
          )}
        </div>

        {/* ── Quick links ── */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e7e0d4", background: "#fff" }}>
          <Link
            href="/account/orders"
            className="flex items-center justify-between px-5 py-4 transition-colors"
            style={{ borderBottom: "1px solid #f0ebe3" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,168,76,0.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={15} color="#8B6914" />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#374151" }}>MY ORDERS</span>
            </div>
            <ArrowRight size={14} color="#C9A84C" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-5 py-4 transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(180,83,9,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <div className="flex items-center gap-3">
              <LogOut size={15} color="#b45309" />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#b45309" }}>LOGOUT</span>
            </div>
            <ArrowRight size={14} color="#b45309" />
          </button>
        </div>

      </div>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function InfoRow({ icon, label, value, divider }: {
  icon: React.ReactNode; label: string; value: string; divider?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4" style={{ borderTop: divider ? "1px solid #f0ebe3" : undefined }}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: "13px", color: "#1a1a1a", fontWeight: 500, marginTop: "1px" }} className="truncate">{value}</p>
      </div>
    </div>
  );
}

function EditField({ label, value, onChange, icon, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  icon: React.ReactNode; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: "9px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 600, display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
        style={{ border: "1.5px solid #e0d8cc", background: "#fdfcfa" }}
        onFocusCapture={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
        onBlurCapture={(e) => (e.currentTarget.style.borderColor = "#e0d8cc")}
      >
        {icon}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: "13px", color: "#1a1a1a" }}
        />
      </div>
    </div>
  );
}