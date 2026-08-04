import type { MetadataRoute } from "next";
import { getCategories, getPosts, getProducts, getSiteSettings } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [s, products, categories, posts] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getCategories(),
    getPosts(),
  ]);
  const now = new Date();
  return [
    { url: `${s.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${s.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${s.url}/categories`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${s.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${s.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${s.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...products.map((p) => ({ url: `${s.url}/products/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...categories.map((c) => ({ url: `${s.url}/categories#${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${s.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
