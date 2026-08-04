import type { Metadata } from "next";
import { Hero, Categories, Products, DIYKit, WhyChoose, HowItWorks, Gallery, Testimonials, FAQ, ContactCTA } from "@/components/Sections";
import { getCategories, getFaqs, getHomePage, getProducts, getSiteSettings, getTestimonials } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const [home, s] = await Promise.all([getHomePage(), getSiteSettings()]);
  const title = home.metaTitle || `${s.companyName} — ${s.tagline}`;
  const description = home.metaDescription || s.description;
  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: s.url, images: [s.ogImage] },
  };
}

export default async function HomePage() {
  const [home, categories, products, faqs, testimonials] = await Promise.all([
    getHomePage(),
    getCategories(),
    getProducts({ featured: true, limit: 6 }),
    getFaqs(),
    getTestimonials(),
  ]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <Hero home={home} />
      <Categories categories={categories} heading={home.categoriesSection} />
      <Products products={products} heading={home.featuredSection} />
      <DIYKit home={home} />
      <WhyChoose home={home} />
      <HowItWorks home={home} />
      <Gallery home={home} />
      <Testimonials testimonials={testimonials} heading={home.testimonialsSection} />
      <FAQ faqs={faqs} heading={home.faqSection} />
      <ContactCTA heading={home.ctaHeading} description={home.ctaDescription} buttonText={home.ctaButtonText} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
