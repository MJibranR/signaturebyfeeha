// components/AnnouncementBar.tsx
"use client";
import { useState } from "react";

interface AnnouncementBarProps {
  text: string;
  dismissible?: boolean;
}

export default function AnnouncementBar({ text, dismissible = true }: AnnouncementBarProps) {
  return (
    <div className="relative bg-black text-white text-center text-[10px] sm:text-[11px] py-2 px-4 tracking-widest uppercase font-medium leading-snug">
      {text}
    </div>
  );
}