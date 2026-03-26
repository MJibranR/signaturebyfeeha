// lib/actions/homepage.ts
"use server";
import { db } from "@/lib/db";
import { homepageSettings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_HOMEPAGE_CONFIG } from "@/lib/config/homepage";

export type FeaturedSet = {
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

export type Brand = { 
  id: number; 
  name: string; 
  image: string; 
  href: string;
};

export type Review = { 
  id: number; 
  name: string; 
  title: string; 
  body: string; 
  rating: number;
};

export type Section = {
  key: string;
  label: string;
  enabled: boolean;
};

export type HomepageConfig = {
  sections: Section[];
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

// ─── Server Actions (ONLY async functions here) ─────────────────────────────────────────

export async function getHomepageConfig(): Promise<HomepageConfig | null> {
  try {
    const rows = await db
      .select()
      .from(homepageSettings)
      .where(eq(homepageSettings.key, "main"));
    
    if (rows[0]?.config) {
      const savedConfig = rows[0].config as HomepageConfig;
      return {
        ...DEFAULT_HOMEPAGE_CONFIG,
        ...savedConfig,
        sections: savedConfig.sections || DEFAULT_HOMEPAGE_CONFIG.sections,
        featuredSets: savedConfig.featuredSets || DEFAULT_HOMEPAGE_CONFIG.featuredSets,
        brands: savedConfig.brands || DEFAULT_HOMEPAGE_CONFIG.brands,
        reviews: savedConfig.reviews || DEFAULT_HOMEPAGE_CONFIG.reviews,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Failed to fetch homepage config:", error);
    return null;
  }
}

export async function saveHomepageConfig(config: HomepageConfig) {
  try {
    if (!config.sections) {
      config.sections = DEFAULT_HOMEPAGE_CONFIG.sections;
    }
    
    await db
      .insert(homepageSettings)
      .values({ 
        key: "main", 
        config: config,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: homepageSettings.key,
        set: { config: config, updatedAt: new Date() },
      });
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save homepage config:", error);
    return { success: false, error: "Failed to save homepage configuration" };
  }
}

export async function isSectionEnabled(sectionKey: string) {
  const config = await getHomepageConfig();
  if (!config) return true;
  
  const section = config.sections.find(s => s.key === sectionKey);
  return section?.enabled ?? true;
}

export async function getTrendingProducts(productIds: string[]) {
  const { products } = await import("@/lib/products");
  return products.filter(p => productIds.includes(p.id));
}

export async function getNewArrivals(productIds: string[]) {
  const { products } = await import("@/lib/products");
  return products.filter(p => productIds.includes(p.id));
}