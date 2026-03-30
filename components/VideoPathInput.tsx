"use client";
import { useState, useEffect, useRef } from "react";
import { Video, X, Link, ExternalLink } from "lucide-react";
import { getVideoFiles } from "@/lib/actions/files";

interface VideoPathInputProps {
  value: string;
  onChange: (src: string) => void;
  label?: string;
}

// ── URL type detection ────────────────────────────────────────────────────────

function getYouTubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getBlockedPlatform(url: string): { name: string; color: string } | null {
  if (/instagram\.com/i.test(url))
    return { name: "Instagram", color: "#E1306C" };
  if (/tiktok\.com/i.test(url))
    return { name: "TikTok", color: "#010101" };
  if (/facebook\.com|fb\.watch/i.test(url))
    return { name: "Facebook", color: "#1877F2" };
  if (/twitter\.com|x\.com/i.test(url))
    return { name: "X (Twitter)", color: "#000000" };
  return null;
}

function isExternalUrl(v: string) {
  return v.startsWith("http://") || v.startsWith("https://") || v.startsWith("//");
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VideoPathInput({
  value,
  onChange,
  label = "Video Path",
}: VideoPathInputProps) {
  const [mode, setMode] = useState<"path" | "url">(
    isExternalUrl(value) ? "url" : "path"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allVideos, setAllVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      const videos = await getVideoFiles();
      setAllVideos(videos);
      setLoading(false);
    }
    loadVideos();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = (() => {
    const term = searchTerm.trim().toLowerCase();
    const list = term
      ? allVideos.filter((v) => v.toLowerCase().includes(term))
      : allVideos;
    return list.slice(0, 10);
  })();

  const handleModeSwitch = (next: "path" | "url") => {
    setMode(next);
    onChange("");
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSelect = (videoPath: string) => {
    onChange(videoPath);
    setSearchTerm("");
    setIsOpen(false);
  };

  const inputBase = "w-full py-2.5 rounded-xl text-sm outline-none transition-all";
  const inputStyle = {
    background: "#f8f5f0",
    border: "1.5px solid rgba(201,168,76,0.2)",
    color: "#1a0a00",
  };
  const focusBorder = "1.5px solid #C9A84C";
  const blurBorder  = "1.5px solid rgba(201,168,76,0.2)";

  const youtubeId      = getYouTubeId(value);
  const blockedPlatform = value ? getBlockedPlatform(value) : null;

  // ── Render preview based on URL type ────────────────────────────────────────
  const renderPreview = () => {
    if (!value) return null;

    // Blocked platform — show a link card instead of a broken embed
    if (blockedPlatform) {
      return (
        <div
          className="mt-3 rounded-xl p-4 flex items-center gap-3"
          style={{ border: "1px solid rgba(201,168,76,0.2)", background: "#f8f5f0" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: blockedPlatform.color }}
          >
            <Video size={16} color="#fff" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold" style={{ color: "#1a0a00" }}>
              {blockedPlatform.name} Video
            </p>
            <p className="text-[10px] mt-0.5 truncate" style={{ color: "#a89070" }}>
              {blockedPlatform.name} blocks external embedding — the URL is saved and will open natively.
            </p>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold flex-shrink-0 transition-all hover:scale-105"
            style={{ background: blockedPlatform.color, color: "#fff" }}
          >
            <ExternalLink size={11} /> Open
          </a>
        </div>
      );
    }

    // YouTube → official iframe embed
    if (youtubeId) {
      return (
        <div
          className="mt-3 rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(201,168,76,0.2)", aspectRatio: "16/9" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Everything else — direct URL or local path → native <video>
    return (
      <div
        className="mt-3 rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <video
          key={value}
          src={value}
          className="w-full max-h-40 object-cover"
          controls
          muted
        />
      </div>
    );
  };

  return (
    <div className="w-full" ref={containerRef}>

      {/* Label */}
      {label && (
        <label
          className="text-[10px] font-black tracking-[0.22em] uppercase mb-2 block"
          style={{ color: "#8B6914" }}
        >
          {label}
        </label>
      )}

      {/* Mode tabs */}
      <div
        className="flex gap-1 mb-2 p-1 rounded-xl w-fit"
        style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
      >
        {(["path", "url"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeSwitch(m)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all"
            style={{
              background: mode === m ? "#C9A84C" : "transparent",
              color: mode === m ? "#1a0800" : "#8B6914",
            }}
          >
            {m === "path" ? (
              <><Video size={11} /> Local Path</>
            ) : (
              <><Link size={11} /> External URL</>
            )}
          </button>
        ))}
      </div>

      {/* ── Path mode ── */}
      {mode === "path" && (
        <div className="relative">
          <Video
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#a89070" }}
          />
          <input
            type="text"
            placeholder="Enter path or search public/video…"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={(e) => {
              setIsOpen(true);
              e.target.style.border = focusBorder;
            }}
            onBlur={(e) => (e.target.style.border = blurBorder)}
            className={`${inputBase} pl-9 pr-8`}
            style={inputStyle}
          />
          {value && (
            <button type="button" onClick={() => onChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X size={13} style={{ color: "#a89070" }} />
            </button>
          )}

          {/* Dropdown */}
          {isOpen && (
            <div
              className="absolute z-[9999] mt-1 w-full rounded-xl overflow-hidden shadow-lg"
              style={{
                background: "#fff",
                border: "1px solid rgba(201,168,76,0.3)",
                maxHeight: 280,
                overflowY: "auto",
              }}
            >
              {loading ? (
                <p className="p-4 text-center text-xs" style={{ color: "#a89070" }}>Loading videos…</p>
              ) : suggestions.length > 0 ? (
                suggestions.map((vid, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(vid)}
                    className="w-full px-3 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-amber-50/70 transition-colors"
                    style={{ color: "#5a3e1a", borderBottom: "1px solid rgba(201,168,76,0.06)" }}
                  >
                    <Video size={12} style={{ color: "#C9A84C" }} className="flex-shrink-0" />
                    <span className="truncate flex-1">{vid}</span>
                    {value === vid && (
                      <span className="text-[10px] font-bold" style={{ color: "#C9A84C" }}>✓</span>
                    )}
                  </button>
                ))
              ) : (
                <p className="p-4 text-center text-xs" style={{ color: "#a89070" }}>No videos found</p>
              )}
            </div>
          )}

          {value && (
            <p className="text-[10px] mt-1.5" style={{ color: "#a89070" }}>
              File must be in your <code className="font-mono">public/video</code> folder
            </p>
          )}
        </div>
      )}

      {/* ── URL mode ── */}
      {mode === "url" && (
        <div className="relative">
          <Link
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#a89070" }}
          />
          <input
            type="text"
            placeholder="YouTube, Instagram, TikTok, CDN, MP4…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={(e) => (e.target.style.border = focusBorder)}
            onBlur={(e) => (e.target.style.border = blurBorder)}
            className={`${inputBase} pl-9 pr-8`}
            style={inputStyle}
          />
          {value && (
            <button type="button" onClick={() => onChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2">
              <X size={13} style={{ color: "#a89070" }} />
            </button>
          )}
          {/* Dynamic hint based on what was pasted */}
          <p className="text-[10px] mt-1.5" style={{ color: blockedPlatform ? "#C9A84C" : "#a89070" }}>
            {blockedPlatform
              ? `${blockedPlatform.name} blocks external embeds — URL is saved and will open in-app.`
              : "YouTube embeds inline · Instagram/TikTok/Facebook save as link · MP4/CDN play directly"}
          </p>
        </div>
      )}

      {/* Preview */}
      {renderPreview()}

    </div>
  );
}