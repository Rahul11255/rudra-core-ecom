# Chitrakala — Next.js 15 + Payload CMS 3 + MongoDB

The website UI is unchanged; **all content now comes from the Payload admin panel**.

## Quick start

```bash
cp .env.example .env      # MONGODB_URI=mongodb://127.0.0.1:27017/payload-cms
npm install
npm run dev               # http://localhost:3000
npm run seed              # loads all existing content into MongoDB
```

Admin panel: <http://localhost:3000/admin> — `admin@chitrakala.in` / `chitrakala123` (change it).

Make sure a local MongoDB is running (`mongod`). Until the DB is seeded the site still renders using
the built-in default content, so it never breaks.

## What is manageable in the CMS

| Area | Where in admin |
|---|---|
| Categories (name, auto slug, image, status) | Catalogue → Categories |
| Products (auto slug, required category, price, rich description, WhatsApp message, featured image, gallery, status, featured) | Catalogue → Products |
| Home page (hero, featured, DIY kit, why-us, steps, gallery, testimonials, FAQ, CTA, SEO) | Pages → Home Page |
| About page (heading, description, banner, stats, mission, vision, extra sections, SEO) | Pages → About Page |
| Company name, phone, WhatsApp, email, address, social links, logo, favicon, OG image, site URL | Settings → Site Settings |
| Blog posts, FAQs, Testimonials | Content → … |
| Contact form submissions | Enquiries → Contact Queries |
| Images (auto webp + thumbnail/card/wide/og sizes) | Media Library |

Only **Active** categories, products and posts appear on the website.
A product cannot be created before at least one category exists.

## Structure

```
src/
  collections/   Categories, Products, Posts, Faqs, Testimonials, ContactQueries, Media, Users
  globals/       HomePage, AboutPage, SiteSettings
  fields/slug.ts auto-slug + active/inactive helpers
  lib/cms.ts     all Payload queries used by the frontend (with safe fallbacks)
  lib/data.ts    default content (used by the seeder + as fallback)
  components/    reusable UI (SettingsProvider, WhatsAppButton, Sections, RichText, ContactForm …)
  app/(frontend) public website
  app/(payload)  admin panel + Payload REST/GraphQL API
  app/api/contact  contact form endpoint (validates + stores a Contact Query)
```

SEO: per-page metadata, canonical URLs, breadcrumbs with JSON-LD, Organization/WebSite/Product/Article/FAQ
schema, dynamic `sitemap.xml` and `robots.txt` — all driven by CMS values.
