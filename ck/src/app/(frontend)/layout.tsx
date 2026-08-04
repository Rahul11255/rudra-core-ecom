import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FloatingWA } from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/components/SettingsProvider";
import { getCategories, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(s.url),
    title: { default: `${s.companyName} — ${s.tagline}`, template: `%s — ${s.companyName}` },
    description: s.description,
    applicationName: s.companyName,
    authors: [{ name: s.companyName }],
    keywords: ["DIY toys", "Paint your own", "POP toys", "Plaster of Paris", "Fridge magnets", "Religious idols", "Cartoon figures", "Keychains", "DIY kits", "Kids craft", "India"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: s.companyName,
      title: `${s.companyName} — ${s.tagline}`,
      description: s.description,
      url: s.url,
      locale: s.locale,
      images: [{ url: s.ogImage, width: 1200, height: 630, alt: s.companyName }],
    },
    twitter: { card: "summary_large_image", title: s.companyName, description: s.description, images: [s.ogImage] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    icons: { icon: s.faviconUrl || "/favicon.ico" },
  };
}

export const viewport: Viewport = { themeColor: "#7C5CFC", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.companyName,
    url: settings.url,
    logo: settings.logoUrl ? `${settings.url}${settings.logoUrl}` : `${settings.url}${settings.ogImage}`,
    email: settings.email,
    sameAs: [settings.instagram, settings.facebook, settings.linkedin, settings.youtube].filter(Boolean),
    contactPoint: [{ "@type": "ContactPoint", telephone: settings.phone, contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "hi"] }],
  };
  const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: settings.companyName, url: settings.url, inLanguage: "en-IN" };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      </head>
      <body>
        <SettingsProvider settings={settings}>
          <Nav />
          <main className="min-h-screen bg-background text-foreground">{children}</main>
          <Footer categories={categories} />
          <FloatingWA />
        </SettingsProvider>
      </body>
    </html>
  );
}
