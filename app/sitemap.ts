import { MetadataRoute } from "next";
import { getAllProductsAction } from "@/lib/actions/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://signaturebyfeeha.com";
  const now = new Date();

  // ── Static public pages ───────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: base,                              lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/all`,                     lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/men`,                     lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/women`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/unisex`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/products`,                lastModified: now, changeFrequency: "daily",   priority: 0.8 },

    // Info pages
    { url: `${base}/pages/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pages/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pages/faqs`,              lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/privacy-policy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/pages/returns`,           lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/shipping`,          lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/terms`,             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },

    // Account pages (indexable but low priority)
    { url: `${base}/account/login`,           lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/account/register`,        lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // ── Dynamic product pages ─────────────────────────────────────────────────
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProductsAction();
    if (products?.length) {
      productRoutes = products.map((p: any) => ({
        url: `${base}/products/${p.id}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // If products fail to load, sitemap still works with static routes
  }

  return [...staticRoutes, ...productRoutes];
}