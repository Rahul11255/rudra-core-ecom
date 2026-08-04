import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { ContactCTA } from "@/components/Sections";
import { getHomePage, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "Contact Us",
    description: `Reach ${s.companyName} on WhatsApp, phone or email for orders, custom kits and bulk inquiries.`,
    alternates: { canonical: "/contact" },
    openGraph: { title: `Contact ${s.companyName}`, description: `Talk to us on WhatsApp — ${s.phone}`, url: `${s.url}/contact`, images: [s.ogImage] },
  };
}

export default async function ContactPage() {
  const [home] = await Promise.all([getHomePage()]);
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      <section className="mx-auto max-w-3xl px-4 pb-10">
        <h1 className="text-4xl font-black sm:text-5xl">Let&apos;s create together</h1>
        <p className="mt-3 text-muted-foreground">Questions about a kit, bulk orders or a custom theme? Message us — we reply fast.</p>
        <div className="mt-8"><ContactForm /></div>
      </section>
      <ContactCTA heading={home.ctaHeading} description={home.ctaDescription} buttonText={home.ctaButtonText} />
    </>
  );
}
