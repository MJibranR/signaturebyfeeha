import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://signaturebyfeeha.com";

  return [
    { url: base,                   lastModified: new Date(), changeFrequency: "daily",   priority: 1 },
    { url: `${base}/all`,          lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/men`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/women`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/unisex`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/about-us`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact-us`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}