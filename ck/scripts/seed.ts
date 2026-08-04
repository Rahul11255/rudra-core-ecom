/**
 * Seeds MongoDB with the initial Chitrakala content.
 *   npm run seed
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { categories, products, posts, faqs, testimonials, whyUs, steps } from '../src/lib/data'
import { site } from '../src/lib/site'

const rich = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: text.split('\n\n').map((para) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [{ type: 'text', text: para, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
    })),
  },
})

async function seed() {
  const payload = await getPayload({ config })

  const email = 'admin@chitrakala.in'
  const password = 'chitrakala123'
  const existingUser = await payload.find({ collection: 'users', where: { email: { equals: email } } })
  if (existingUser.docs.length === 0) {
    await payload.create({ collection: 'users', data: { email, password, name: 'Admin' } as any })
    console.log(`✓ Admin created — ${email} / ${password}`)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: site.companyName,
      tagline: site.tagline,
      description: site.description,
      footerText: site.footerText,
      phone: site.phone,
      whatsapp: site.whatsapp,
      email: site.email,
      workingHours: site.workingHours,
      address: site.address,
      instagram: site.instagram,
      facebook: site.facebook,
      url: site.url,
      locale: site.locale,
    } as any,
  })
  console.log('✓ Site Settings')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'Create · Paint · Relax · Smile',
      whyChoose: whyUs.map((w) => ({ icon: w.icon, title: w.title, desc: w.desc })),
      steps: steps.map((s) => ({ n: s.n, title: s.title, desc: s.desc })),
      kitItems: [
        { i: '🦄', t: 'POP Toy' },
        { i: '🎨', t: 'Paint Set' },
        { i: '🖌️', t: 'Brushes' },
        { i: '🎯', t: 'Palette' },
        { i: '🎁', t: 'Gift Box' },
        { i: '📋', t: 'Instruction Card' },
      ],
      categoriesSection: { eyebrow: 'Categories', heading: 'Explore our', highlight: 'handcrafted collection', description: 'From dinosaurs to deities — find your next DIY adventure.' },
      featuredSection: { eyebrow: 'Featured', heading: 'Best-selling DIY toys' },
      whyChooseSection: { eyebrow: 'Why Chitrakala', heading: 'Designed for', highlight: 'little hands & big hearts' },
      howItWorksSection: { eyebrow: 'How It Works', heading: 'Ordering is this easy' },
      gallerySection: { eyebrow: 'Customer Gallery', heading: 'Made by our', highlight: 'amazing community', description: 'A peek into thousands of creations painted by kids, students and families across India.' },
      testimonialsSection: { eyebrow: 'Reviews', heading: 'Loved by families across India' },
      faqSection: { eyebrow: 'FAQ', heading: 'Questions, answered' },
    } as any,
  })
  console.log('✓ Home Page')

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heading: 'Crafted to spark creativity, not screen time.',
      stats: [
        { value: '10k+', label: 'Happy kids' },
        { value: '500+', label: 'Designs' },
        { value: '4.9★', label: 'Avg. rating' },
      ],
      bannerImagePath: '/images/g2.jpg',
    } as any,
  })
  console.log('✓ About Page')

  const catMap: Record<string, string> = {}
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i]
    const data = { name: c.name, slug: c.slug, emoji: c.emoji, tint: c.tint, order: i, status: 'active' }
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: c.slug } } })
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'categories', id: existing.docs[0].id, data: data as any })
      : await payload.create({ collection: 'categories', data: data as any })
    catMap[c.slug] = String(doc.id)
  }
  console.log(`✓ ${categories.length} categories`)

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const data = {
      name: p.name,
      slug: p.slug,
      shortDescription: p.desc,
      description: rich(p.desc),
      price: p.price,
      imagePath: p.img,
      category: catMap[p.category.slug],
      colors: p.colors.map((v) => ({ value: v })),
      sizes: p.sizes.map((v) => ({ value: v })),
      rating: p.rating,
      featured: true,
      order: i,
      status: 'active',
      whatsappMessage: `Hi! I'd like to order: ${p.name} (${p.price}).`,
    }
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: p.slug } } })
    if (existing.docs[0]) await payload.update({ collection: 'products', id: existing.docs[0].id, data: data as any })
    else await payload.create({ collection: 'products', data: data as any })
  }
  console.log(`✓ ${products.length} products`)

  for (const post of posts) {
    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: rich(post.body),
      date: post.date,
      coverPath: post.cover,
      author: post.author,
      tags: post.tags.map((v) => ({ value: v })),
      status: 'active',
    }
    const existing = await payload.find({ collection: 'posts', where: { slug: { equals: post.slug } } })
    if (existing.docs[0]) await payload.update({ collection: 'posts', id: existing.docs[0].id, data: data as any })
    else await payload.create({ collection: 'posts', data: data as any })
  }
  console.log(`✓ ${posts.length} blog posts`)

  for (let i = 0; i < faqs.length; i++) {
    const f = faqs[i]
    const existing = await payload.find({ collection: 'faqs', where: { q: { equals: f.q } } })
    const data = { q: f.q, a: f.a, order: i }
    if (existing.docs[0]) await payload.update({ collection: 'faqs', id: existing.docs[0].id, data })
    else await payload.create({ collection: 'faqs', data })
  }
  console.log(`✓ ${faqs.length} FAQs`)

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } } })
    const data = { ...t, order: i }
    if (existing.docs[0]) await payload.update({ collection: 'testimonials', id: existing.docs[0].id, data: data as any })
    else await payload.create({ collection: 'testimonials', data: data as any })
  }
  console.log(`✓ ${testimonials.length} testimonials`)

  console.log('\nAll done. Log in at http://localhost:3000/admin')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
