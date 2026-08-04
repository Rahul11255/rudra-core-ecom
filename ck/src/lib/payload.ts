import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (cached) return cached
  cached = await getPayload({ config })
  return cached
}

// Convenience CMS fetchers used by the frontend (safe to import in RSC).
// Each returns plain, serialisable data shaped to match the existing
// static objects in `lib/data.ts`, so pages can migrate incrementally.

export async function fetchProducts() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'products', limit: 100, depth: 2 })
  return docs.map((p: any) => ({
    slug: p.slug,
    name: p.name,
    desc: p.desc,
    price: p.price,
    img: p.image?.url || p.imagePath || '/images/hero.jpg',
    colors: (p.colors || []).map((c: any) => c.value),
    sizes: (p.sizes || []).map((s: any) => s.value),
    rating: p.rating ?? 5,
    category: typeof p.category === 'object' ? p.category.slug : p.category,
  }))
}

export async function fetchCategories() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'categories', limit: 100 })
  return docs.map((c: any) => ({
    slug: c.slug,
    name: c.name,
    emoji: c.emoji,
    tint: c.tint,
  }))
}

export async function fetchPosts() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'posts', limit: 100, sort: '-date', depth: 1 })
  return docs.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    body: p.body,
    date: p.date,
    cover: p.cover?.url || p.coverPath || '/images/hero.jpg',
    author: p.author,
    tags: (p.tags || []).map((t: any) => t.value),
  }))
}

export async function fetchSite() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function fetchFaqs() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'faqs', limit: 100, sort: 'order' })
  return docs.map((f: any) => ({ q: f.q, a: f.a }))
}

export async function fetchTestimonials() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'testimonials', limit: 100 })
  return docs.map((t: any) => ({ name: t.name, role: t.role, text: t.text, avatar: t.avatar }))
}