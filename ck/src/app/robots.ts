import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const s = await getSiteSettings();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }],
    sitemap: `${s.url}/sitemap.xml`,
    host: s.url,
  };
}
