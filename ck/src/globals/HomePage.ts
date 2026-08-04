import type { GlobalConfig } from 'payload'

const heading = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    { name: 'eyebrow', type: 'text' as const },
    { name: 'heading', type: 'text' as const },
    { name: 'highlight', type: 'text' as const, admin: { description: 'Optional part of the heading shown in the brand colour.' } },
    { name: 'description', type: 'textarea' as const },
  ],
})

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: { description: 'All content shown on the website home page.', group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroBadge', type: 'text', defaultValue: 'Handcrafted in India · Ships Pan-India' },
            { name: 'heroTitle', type: 'text', required: true, defaultValue: 'Create · Paint · Relax · Smile' },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              required: true,
              defaultValue:
                'Discover handcrafted DIY POP toys, fridge magnets, idols, keychains and creative painting kits for kids, students, families and adults. A screen-free hobby that boosts creativity and reduces stress.',
            },
            {
              type: 'row',
              fields: [
                { name: 'heroButtonText', type: 'text', defaultValue: 'Order on WhatsApp', admin: { width: '50%' } },
                {
                  name: 'heroButtonLink',
                  type: 'text',
                  admin: { width: '50%', description: 'Leave blank to open WhatsApp with a pre-filled message.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'heroSecondaryButtonText', type: 'text', defaultValue: '📷 View Collection', admin: { width: '50%' } },
                { name: 'heroSecondaryButtonLink', type: 'text', defaultValue: '/products', admin: { width: '50%' } },
              ],
            },
            { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Main hero image.' } },
            {
              name: 'heroImages',
              label: 'Extra hero slider images',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            { name: 'heroStatsText', type: 'text', defaultValue: '10,000+ happy little artists' },
          ],
        },
        {
          label: 'Sections',
          fields: [
            heading('categoriesSection', 'Categories section'),
            heading('featuredSection', 'Featured products section'),
            heading('whyChooseSection', 'Why choose us section'),
            {
              name: 'whyChoose',
              label: 'Why choose us — cards',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', label: 'Description', type: 'text' },
              ],
            },
            heading('howItWorksSection', 'How it works section'),
            {
              name: 'steps',
              label: 'How it works — steps',
              type: 'array',
              fields: [
                { name: 'n', label: 'Number', type: 'text' },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', label: 'Description', type: 'text' },
              ],
            },
            heading('gallerySection', 'Customer gallery section'),
            { name: 'galleryImages', type: 'upload', relationTo: 'media', hasMany: true },
            heading('testimonialsSection', 'Testimonials section'),
            heading('faqSection', 'FAQ section'),
          ],
        },
        {
          label: 'DIY Kit',
          fields: [
            { name: 'kitEyebrow', type: 'text', defaultValue: 'DIY Kit' },
            { name: 'kitHeading', type: 'text', defaultValue: 'Everything you need, beautifully boxed.' },
            {
              name: 'kitDescription',
              type: 'textarea',
              defaultValue:
                'A complete creative experience in one premium gift box — perfect for birthdays, weekends and family time.',
            },
            {
              name: 'kitItems',
              type: 'array',
              fields: [
                { name: 'i', label: 'Icon', type: 'text' },
                { name: 't', label: 'Label', type: 'text', required: true },
              ],
            },
            { name: 'kitImage', type: 'upload', relationTo: 'media' },
            { name: 'kitButtonText', type: 'text', defaultValue: 'Order DIY Kit on WhatsApp' },
          ],
        },
        {
          label: 'Contact CTA',
          fields: [
            { name: 'ctaHeading', type: 'text', defaultValue: 'Need help choosing?' },
            {
              name: 'ctaDescription',
              type: 'textarea',
              defaultValue:
                "Message us directly and we'll help you choose the perfect DIY kit for any age, occasion, or budget.",
            },
            { name: 'ctaButtonText', type: 'text', defaultValue: 'Chat on WhatsApp' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
