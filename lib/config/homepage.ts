// lib/config/homepage.ts
import { HomepageConfig } from "@/lib/actions/homepage";

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  announcement: "Please confirm order via phone/WhatsApp, orders not confirmed within 24 hours may be cancelled",
  sections: [
    { key: "hero", label: "Hero Section", enabled: true },
    { key: "services", label: "Services Section", enabled: true },
    { key: "trending", label: "Trending Now", enabled: true },
    { key: "featured", label: "Featured Products", enabled: true },
    { key: "arrivals", label: "New Arrivals", enabled: true },
    { key: "brands", label: "Top Brands", enabled: true },
    { key: "reviews", label: "Customer Reviews", enabled: true },
  ],
  heroImage: "",
  heroVideo: "",
  heroType: "image",
  trendingProducts: [],
  featuredSets: [],
  newArrivalProducts: [],
  brands: [],
  reviews: [],
};