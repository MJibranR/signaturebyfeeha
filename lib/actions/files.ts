// lib/actions/files.ts
"use server";
import { readdir } from "fs/promises";
import path from "path";

export async function getImageFiles() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    
    async function scanDirectory(dir: string, basePath: string = ""): Promise<string[]> {
      const files: string[] = [];
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relativePath = path.join(basePath, entry.name);
          
          if (entry.isDirectory()) {
            const subFiles = await scanDirectory(fullPath, relativePath);
            files.push(...subFiles);
          } else if (imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
            files.push(`/images/${relativePath.replace(/\\/g, "/")}`);
          }
        }
      } catch (error) {
        console.error(`Error scanning ${dir}:`, error);
      }
      return files;
    }
    
    return await scanDirectory(imagesDir);
  } catch (error) {
    console.error("Failed to get image files:", error);
    return [];
  }
}

export async function getVideoFiles() {
  try {
    const videosDir = path.join(process.cwd(), "public", "video");
    const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv"];
    
    async function scanDirectory(dir: string, basePath: string = ""): Promise<string[]> {
      const files: string[] = [];
      try {
        const entries = await readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relativePath = path.join(basePath, entry.name);
          
          if (entry.isDirectory()) {
            const subFiles = await scanDirectory(fullPath, relativePath);
            files.push(...subFiles);
          } else if (videoExtensions.includes(path.extname(entry.name).toLowerCase())) {
            files.push(`/video/${relativePath.replace(/\\/g, "/")}`);
          }
        }
      } catch (error) {
        console.error(`Error scanning ${dir}:`, error);
      }
      return files;
    }
    
    return await scanDirectory(videosDir);
  } catch (error) {
    console.error("Failed to get video files:", error);
    return [];
  }
}