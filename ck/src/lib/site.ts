/**
 * Static fallback values.
 *
 * The website reads everything from Payload (Site Settings global). These
 * defaults are only used to seed the CMS and to keep the site rendering if
 * the database has not been seeded yet.
 */
export const site = {
  companyName: "Rudracore",
  tagline: "DIY Paint Your Own POP Toys & Kits",
  url: "https://Rudracore.in",
  description:
    "Handcrafted DIY Paint Your Own POP toys, fridge magnets, religious idols, cartoon figures, animal toys, keychains and creative kits. Order on WhatsApp.",
  footerText: "Handcrafted DIY POP toys, idols & creative kits. Made in India with love.",
  whatsapp: "919354081946",
  email: "hello@Rudracore.in",
  phone: "+91 9354081946",
  workingHours: "Mon–Sat · 10am–7pm",
  address: "Made in India · Ships pan-India",
  instagram: "https://instagram.com/Rudracore",
  facebook: "https://facebook.com/Rudracore",
  linkedin: "",
  youtube: "",
  locale: "en_IN",
  ogImage: "/images/hero.jpg",
  logoUrl: "",
  faviconUrl: "/favicon.ico",
};

export type SiteSettings = typeof site;

/** Build a WhatsApp deep link with a pre-filled message. */
export const waFor = (whatsapp: string, msg: string) =>
  `https://wa.me/${(whatsapp || site.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

/** Convenience helper using the fallback number (client components use useSettings()). */
export const wa = (msg: string) => waFor(site.whatsapp, msg);
