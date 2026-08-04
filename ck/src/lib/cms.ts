import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'
import { site, type SiteSettings } from './site'
import {
  categories as fallbackCategories,
  products as fallbackProducts,
  posts as fallbackPosts,
  faqs as fallbackFaqs,
  testimonials as fallbackTestimonials,
  whyUs as fallbackWhyUs,
  steps as fallbackSteps,
  type Product,
  type Post,
  type Category,
} from './data'

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (!cachedPayload) cachedPayload = await getPayload({ config })
  return cachedPayload
}

/** Runs a Payload query and falls back to static defaults if the DB is unreachable/empty. */
async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.warn(`[cms] ${label} failed, using fallback content:`, (err as Error).message)
    return fallback
  }
}

const mediaUrl = (media: unknown, fallback = ''): string => {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: string | null }).url
    if (url) return url
  }
  return fallback
}

const mediaAlt = (media: unknown, fallback = ''): string => {
  if (media && typeof media === 'object' && 'alt' in media) {
    const alt = (media as { alt?: string | null }).alt
    if (alt) return alt
  }
  return fallback
}

const values = (arr?: { value?: string | null }[] | null): string[] =>
  (arr || []).map((a) => a?.value).filter((v): v is string => Boolean(v))

/* ------------------------------------------------------------------ */
/* Site Settings                                                       */
/* ------------------------------------------------------------------ */

export async function getSiteSettings(): Promise<SiteSettings> {
  return safe(
    'site-settings',
    async () => {
      const payload = await getPayloadClient()
      const s = (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as any
      if (!s?.companyName) return site
      return {
        companyName: s.companyName ?? site.companyName,
        tagline: s.tagline ?? site.tagline,
        url: s.url ?? site.url,
        description: s.description ?? site.description,
        footerText: s.footerText ?? site.footerText,
        whatsapp: (s.whatsapp ?? site.whatsapp).replace(/\D/g, ''),
        email: s.email ?? site.email,
        phone: s.phone ?? site.phone,
        workingHours: s.workingHours ?? site.workingHours,
        address: s.address ?? site.address,
        instagram: s.instagram ?? '',
        facebook: s.facebook ?? '',
        linkedin: s.linkedin ?? '',
        youtube: s.youtube ?? '',
        locale: s.locale ?? site.locale,
        ogImage: mediaUrl(s.ogImage, site.ogImage),
        logoUrl: mediaUrl(s.logo, ''),
        faviconUrl: mediaUrl(s.favicon, site.faviconUrl),
      }
    },
    site,
  )
}

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export async function getCategories(): Promise<Category[]> {
  return safe(
    'categories',
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'categories',
        where: { status: { equals: 'active' } },
        limit: 200,
        sort: 'order',
        depth: 1,
      })
      if (!docs.length) return fallbackCategories
      return docs.map((c: any) => ({
        slug: c.slug,
        name: c.name,
        emoji: c.emoji || '🎨',
        tint: c.tint || 'from-brand/40 to-blue/10',
        description: c.description || '',
        image: mediaUrl(c.image, ''),
      }))
    },
    fallbackCategories,
  )
}

const mapProduct = (p: any): Product => ({
  slug: p.slug,
  name: p.name,
  desc: p.shortDescription || '',
  description: p.description ?? null,
  price: p.price,
  img: mediaUrl(p.featuredImage, p.imagePath || '/images/hero.jpg'),
  imgAlt: mediaAlt(p.featuredImage, p.name),
  gallery: (Array.isArray(p.gallery) ? p.gallery : []).map((g: any) => mediaUrl(g)).filter(Boolean),
  colors: values(p.colors),
  sizes: values(p.sizes),
  rating: typeof p.rating === 'number' ? p.rating : 5,
  featured: Boolean(p.featured),
  whatsappMessage: p.whatsappMessage || '',
  category:
    p.category && typeof p.category === 'object'
      ? { slug: p.category.slug, name: p.category.name }
      : { slug: String(p.category ?? ''), name: '' },
  seo: { title: p.seo?.title || '', description: p.seo?.description || '' },
})

export async function getProducts(opts: { featured?: boolean; limit?: number } = {}): Promise<Product[]> {
  return safe(
    'products',
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'products',
        where: {
          status: { equals: 'active' },
          ...(opts.featured ? { featured: { equals: true } } : {}),
        },
        limit: opts.limit ?? 200,
        sort: 'order',
        depth: 2,
      })
      if (!docs.length && opts.featured) {
        // No product flagged as featured yet — show the newest active ones.
        const all = await payload.find({
          collection: 'products',
          where: { status: { equals: 'active' } },
          limit: opts.limit ?? 6,
          sort: 'order',
          depth: 2,
        })
        return all.docs.length ? all.docs.map(mapProduct) : fallbackProducts
      }
      return docs.length ? docs.map(mapProduct) : fallbackProducts
    },
    opts.featured ? fallbackProducts.slice(0, opts.limit ?? 6) : fallbackProducts,
  )
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safe(
    `product:${slug}`,
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'products',
        where: { slug: { equals: slug }, status: { equals: 'active' } },
        limit: 1,
        depth: 2,
      })
      return docs[0] ? mapProduct(docs[0]) : (fallbackProducts.find((p) => p.slug === slug) ?? null)
    },
    fallbackProducts.find((p) => p.slug === slug) ?? null,
  )
}

/* ------------------------------------------------------------------ */
/* Blog                                                               */
/* ------------------------------------------------------------------ */

const mapPost = (p: any): Post => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  body: typeof p.body === 'string' ? p.body : '',
  richBody: p.body && typeof p.body === 'object' ? p.body : null,
  date: typeof p.date === 'string' ? p.date : new Date(p.date).toISOString(),
  cover: mediaUrl(p.cover, p.coverPath || '/images/hero.jpg'),
  author: p.author || 'Team Chitrakala',
  tags: values(p.tags),
})

export async function getPosts(): Promise<Post[]> {
  return safe(
    'posts',
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'posts',
        where: { status: { equals: 'active' } },
        limit: 200,
        sort: '-date',
        depth: 1,
      })
      return docs.length ? docs.map(mapPost) : fallbackPosts
    },
    fallbackPosts,
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safe(
    `post:${slug}`,
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug }, status: { equals: 'active' } },
        limit: 1,
        depth: 1,
      })
      return docs[0] ? mapPost(docs[0]) : (fallbackPosts.find((p) => p.slug === slug) ?? null)
    },
    fallbackPosts.find((p) => p.slug === slug) ?? null,
  )
}

/* ------------------------------------------------------------------ */
/* FAQs / Testimonials                                                 */
/* ------------------------------------------------------------------ */

export async function getFaqs() {
  return safe(
    'faqs',
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({ collection: 'faqs', limit: 100, sort: 'order' })
      return docs.length ? docs.map((f: any) => ({ q: f.q, a: f.a })) : fallbackFaqs
    },
    fallbackFaqs,
  )
}

export async function getTestimonials() {
  return safe(
    'testimonials',
    async () => {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({ collection: 'testimonials', limit: 100, sort: 'order' })
      return docs.length
        ? docs.map((t: any) => ({ name: t.name, role: t.role, text: t.text, avatar: t.avatar || t.name?.[0] }))
        : fallbackTestimonials
      },
    fallbackTestimonials,
  )
}

/* ------------------------------------------------------------------ */
/* Page globals                                                        */
/* ------------------------------------------------------------------ */

export type HomeContent = Awaited<ReturnType<typeof getHomePage>>

const heroDefaults = {
  heroBadge: 'Handcrafted in India · Ships Pan-India',
  heroTitle: 'Create · Paint · Relax · Smile',
  heroSubtitle:
    'Discover handcrafted DIY POP toys, fridge magnets, idols, keychains and creative painting kits for kids, students, families and adults. A screen-free hobby that boosts creativity and reduces stress.',
  heroButtonText: 'Order on WhatsApp',
  heroButtonLink: '',
  heroSecondaryButtonText: '📷 View Collection',
  heroSecondaryButtonLink: '/products',
  heroStatsText: '10,000+ happy little artists',
}

export async function getHomePage() {
  const fallback = {
    ...heroDefaults,
    heroImages: ['/images/hero.jpg', '/images/hero-2.jpg', '/images/hero-3.jpg'],
    categoriesSection: {
      eyebrow: 'Categories',
      heading: 'Explore our',
      highlight: 'handcrafted collection',
      description: 'From dinosaurs to deities — find your next DIY adventure.',
    },
    featuredSection: {
      eyebrow: 'Featured',
      heading: 'Best-selling DIY toys',
      highlight: '',
      description: '',
    },
    whyChooseSection: {
      eyebrow: 'Why Chitrakala',
      heading: 'Designed for',
      highlight: 'little hands & big hearts',
      description: '',
    },
    whyChoose: fallbackWhyUs,
    howItWorksSection: { eyebrow: 'How It Works', heading: 'Ordering is this easy', highlight: '', description: '' },
    steps: fallbackSteps,
    gallerySection: {
      eyebrow: 'Customer Gallery',
      heading: 'Made by our',
      highlight: 'amazing community',
      description:
        'A peek into thousands of creations painted by kids, students and families across India.',
    },
    galleryImages: [
      '/images/g1.jpg',
      '/images/g2.jpg',
      '/images/g3.jpg',
      '/images/g4.jpg',
      '/images/p-cartoon.jpg',
      '/images/p-unicorn.jpg',
      '/images/p-magnets.jpg',
      '/images/p-idol.jpg',
    ],
    testimonialsSection: { eyebrow: 'Reviews', heading: 'Loved by families across India', highlight: '', description: '' },
    faqSection: { eyebrow: 'FAQ', heading: 'Questions, answered', highlight: '', description: '' },
    kitEyebrow: 'DIY Kit',
    kitHeading: 'Everything you need, beautifully boxed.',
    kitDescription:
      'A complete creative experience in one premium gift box — perfect for birthdays, weekends and family time.',
    kitItems: [
      { i: '🦄', t: 'POP Toy' },
      { i: '🎨', t: 'Paint Set' },
      { i: '🖌️', t: 'Brushes' },
      { i: '🎯', t: 'Palette' },
      { i: '🎁', t: 'Gift Box' },
      { i: '📋', t: 'Instruction Card' },
    ],
    kitImage: '/images/kit.jpg',
    kitButtonText: 'Order DIY Kit on WhatsApp',
    ctaHeading: 'Need help choosing?',
    ctaDescription:
      "Message us directly and we'll help you choose the perfect DIY kit for any age, occasion, or budget.",
    ctaButtonText: 'Chat on WhatsApp',
    metaTitle: '',
    metaDescription: '',
  }

  return safe(
    'home-page',
    async () => {
      const payload = await getPayloadClient()
      const h = (await payload.findGlobal({ slug: 'home-page', depth: 2 })) as any
      if (!h?.heroTitle) return fallback

      const heroImages = [mediaUrl(h.heroImage), ...(Array.isArray(h.heroImages) ? h.heroImages.map((m: any) => mediaUrl(m)) : [])].filter(Boolean)
      const group = (g: any, def: any) => ({
        eyebrow: g?.eyebrow || def.eyebrow,
        heading: g?.heading || def.heading,
        highlight: g?.highlight ?? def.highlight,
        description: g?.description ?? def.description,
      })

      return {
        heroBadge: h.heroBadge || fallback.heroBadge,
        heroTitle: h.heroTitle,
        heroSubtitle: h.heroSubtitle || fallback.heroSubtitle,
        heroButtonText: h.heroButtonText || fallback.heroButtonText,
        heroButtonLink: h.heroButtonLink || '',
        heroSecondaryButtonText: h.heroSecondaryButtonText || fallback.heroSecondaryButtonText,
        heroSecondaryButtonLink: h.heroSecondaryButtonLink || fallback.heroSecondaryButtonLink,
        heroStatsText: h.heroStatsText || fallback.heroStatsText,
        heroImages: heroImages.length ? heroImages : fallback.heroImages,
        categoriesSection: group(h.categoriesSection, fallback.categoriesSection),
        featuredSection: group(h.featuredSection, fallback.featuredSection),
        whyChooseSection: group(h.whyChooseSection, fallback.whyChooseSection),
        whyChoose: h.whyChoose?.length
          ? h.whyChoose.map((w: any) => ({ icon: w.icon || '✨', title: w.title, desc: w.desc || '' }))
          : fallback.whyChoose,
        howItWorksSection: group(h.howItWorksSection, fallback.howItWorksSection),
        steps: h.steps?.length
          ? h.steps.map((s: any, i: number) => ({ n: s.n || String(i + 1).padStart(2, '0'), title: s.title, desc: s.desc || '' }))
          : fallback.steps,
        gallerySection: group(h.gallerySection, fallback.gallerySection),
        galleryImages: Array.isArray(h.galleryImages) && h.galleryImages.length
          ? h.galleryImages.map((m: any) => mediaUrl(m)).filter(Boolean)
          : fallback.galleryImages,
        testimonialsSection: group(h.testimonialsSection, fallback.testimonialsSection),
        faqSection: group(h.faqSection, fallback.faqSection),
        kitEyebrow: h.kitEyebrow || fallback.kitEyebrow,
        kitHeading: h.kitHeading || fallback.kitHeading,
        kitDescription: h.kitDescription || fallback.kitDescription,
        kitItems: h.kitItems?.length ? h.kitItems.map((k: any) => ({ i: k.i || '🎨', t: k.t })) : fallback.kitItems,
        kitImage: mediaUrl(h.kitImage, fallback.kitImage),
        kitButtonText: h.kitButtonText || fallback.kitButtonText,
        ctaHeading: h.ctaHeading || fallback.ctaHeading,
        ctaDescription: h.ctaDescription || fallback.ctaDescription,
        ctaButtonText: h.ctaButtonText || fallback.ctaButtonText,
        metaTitle: h.metaTitle || '',
        metaDescription: h.metaDescription || '',
      }
    },
    fallback,
  )
}

export async function getAboutPage() {
  const fallback = {
    heading: 'Crafted to spark creativity, not screen time.',
    description:
      'Chitrakala was born from a simple wish: bring back the joy of making things with your hands. We craft beautiful POP toys, idols and kits to help children unplug, adults unwind, and families create memories together — one brushstroke at a time.',
    bannerImage: '/images/g2.jpg',
    bannerAlt: 'A family painting DIY POP toys together',
    stats: [
      { value: '10k+', label: 'Happy kids' },
      { value: '500+', label: 'Designs' },
      { value: '4.9★', label: 'Avg. rating' },
    ],
    buttonText: 'Order on WhatsApp',
    missionHeading: 'Our Mission',
    mission:
      'To put a paintbrush in every child’s hand — replacing screen time with handmade, joyful, screen-free creativity that families can share.',
    visionHeading: 'Our Vision',
    vision:
      'To become India’s most loved DIY art brand, crafting affordable, safe and beautiful POP kits for every home, school and celebration.',
    extraSections: [] as { title: string; body: string }[],
    metaTitle: '',
    metaDescription: '',
  }

  return safe(
    'about-page',
    async () => {
      const payload = await getPayloadClient()
      const a = (await payload.findGlobal({ slug: 'about-page', depth: 2 })) as any
      if (!a?.heading) return fallback
      return {
        heading: a.heading,
        description: a.description || fallback.description,
        bannerImage: mediaUrl(a.bannerImage, a.bannerImagePath || fallback.bannerImage),
        bannerAlt: mediaAlt(a.bannerImage, fallback.bannerAlt),
        stats: a.stats?.length ? a.stats.map((s: any) => ({ value: s.value, label: s.label })) : fallback.stats,
        buttonText: a.buttonText || fallback.buttonText,
        missionHeading: a.missionHeading || fallback.missionHeading,
        mission: a.mission || fallback.mission,
        visionHeading: a.visionHeading || fallback.visionHeading,
        vision: a.vision || fallback.vision,
        extraSections: a.extraSections?.length ? a.extraSections.map((s: any) => ({ title: s.title, body: s.body })) : [],
        metaTitle: a.metaTitle || '',
        metaDescription: a.metaDescription || '',
      }
    },
    fallback,
  )
}

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export async function createContactQuery(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const payload = await getPayloadClient()
  await payload.create({ collection: 'contact-queries', data })
}
