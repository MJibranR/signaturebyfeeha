import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://signaturebyfeeha.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                           lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${base}/all`,                  lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/men`,                  lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/women`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/unisex`,               lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/products`,             lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/pages/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pages/contact`,        lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/pages/faqs`,           lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/privacy-policy`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/pages/returns`,        lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/shipping`,       lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/pages/terms`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/account/login`,        lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${base}/account/register`,     lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  // Fetch products directly via API to avoid server-action issues in sitemap context
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${base}/api/products`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const products = await res.json();
      if (Array.isArray(products)) {
        productRoutes = products.map((p: any) => ({
          url: `${base}/products/${p.id}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
      }
    }
  } catch {
    // fall back to static only — sitemap still works
  }

  return [...staticRoutes, ...productRoutes];
}