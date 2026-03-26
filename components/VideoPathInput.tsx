// components/VideoPathInput.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Video, Search, X, FolderOpen } from "lucide-react";
import { getVideoFiles } from "@/lib/actions/files";

interface VideoPathInputProps {
  value: string;
  onChange: (src: string) => void;
  label?: string;
}

export default function VideoPathInput({ value, onChange, label = "Video Path" }: VideoPathInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allVideos, setAllVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (searchTerm.trim()) {
      const filtered = allVideos.filter(v => 
        v.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions(allVideos.slice(0, 10));
    }
  }, [searchTerm, allVideos]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (videoPath: string) => {
    onChange(videoPath);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black tracking-[0.22em] uppercase mb-1 block" style={{ color: "#8B6914" }}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <Video size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a89070" }} />
        <input
          type="text"
          placeholder="Enter video path or search..."
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "#f8f5f0", border: "1.5px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <X size={14} style={{ color: "#a89070" }} />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-[9999] mt-1 w-full rounded-lg shadow-lg overflow-hidden"
          style={{ 
            background: "#fff", 
            border: "1px solid rgba(201,168,76,0.3)", 
            maxHeight: "300px", 
            overflowY: "auto",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0
          }}>
          {loading ? (
            <div className="p-4 text-center text-xs" style={{ color: "#a89070" }}>
              Loading videos...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-1">
              {suggestions.map((video, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(video)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  style={{ color: "#5a3e1a" }}
                >
                  <Video size={12} style={{ color: "#C9A84C" }} />
                  <span className="truncate flex-1">{video}</span>
                  {value === video && (
                    <span className="text-[10px]" style={{ color: "#C9A84C" }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs" style={{ color: "#a89070" }}>
              No videos found
            </div>
          )}
        </div>
      )}

      {value && (
        <p className="text-[10px] mt-1" style={{ color: "#a89070" }}>
          File must be in your public/video folder
        </p>
      )}
    </div>
  );
}