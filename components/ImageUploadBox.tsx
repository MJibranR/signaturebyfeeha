// components/ImageUploadBox.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Upload, Search, X, Image, FolderOpen } from "lucide-react";
import { getImageFiles } from "@/lib/actions/files";

interface ImageUploadBoxProps {
  value: string;
  onChange: (src: string) => void;
  label?: string;
}

export default function ImageUploadBox({ value, onChange, label = "Upload Image" }: ImageUploadBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load images on mount
  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      try {
        const images = await getImageFiles();
        setAllImages(images);
      } catch (error) {
        console.error("Failed to load images:", error);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
  }, []);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allImages.filter(img => 
        img.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions(allImages.slice(0, 10));
    }
  }, [searchTerm, allImages]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (imgPath: string) => {
    onChange(imgPath);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="w-full relative" ref={containerRef}>
      <div className="flex flex-col gap-2">
        {/* Upload Button */}
        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 w-fit"
          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#8B6914" }}>
          <Upload size={13} /> {label}
          <input type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onChange(reader.result as string);
            reader.readAsDataURL(file);
          }} />
        </label>

        {/* Search Input with Auto-suggest */}
        <div className="relative">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#a89070" }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search existing images..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full pl-9 pr-8 py-2 rounded-lg text-xs outline-none"
              style={{ background: "#f8f5f0", border: "1px solid rgba(201,168,76,0.2)", color: "#1a0a00" }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X size={12} style={{ color: "#a89070" }} />
              </button>
            )}
          </div>

          {/* Dropdown Suggestions */}
          {isOpen && (
            <div 
              className="absolute z-[9999] mt-1 w-full rounded-lg shadow-lg overflow-hidden"
              style={{ 
                background: "#fff", 
                border: "1px solid rgba(201,168,76,0.3)", 
                maxHeight: "300px", 
                overflowY: "auto",
                top: "100%",
                left: 0,
                right: 0
              }}>
              {loading ? (
                <div className="p-4 text-center text-xs" style={{ color: "#a89070" }}>
                  Loading images...
                </div>
              ) : suggestions.length > 0 ? (
                <div className="py-1">
                  {suggestions.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(img)}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      style={{ color: "#5a3e1a" }}
                    >
                      <Image size={12} style={{ color: "#C9A84C" }} />
                      <span className="truncate flex-1">{img}</span>
                      {value === img && (
                        <span className="text-[10px]" style={{ color: "#C9A84C" }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs" style={{ color: "#a89070" }}>
                  No images found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current Value */}
        {value && !value.startsWith("data:") && (
          <div className="flex items-center gap-2 text-[10px]" style={{ color: "#a89070" }}>
            <FolderOpen size={10} />
            <span className="truncate">{value}</span>
          </div>
        )}
      </div>
    </div>
  );
}