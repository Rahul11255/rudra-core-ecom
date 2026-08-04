import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Company details, contact information, social links and branding used across the whole website.',
    group: 'Settings',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'companyName', type: 'text', required: true, defaultValue: 'Chitrakala' },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'DIY Paint Your Own POP Toys & Kits',
              admin: { description: 'Appended to the browser title on the home page.' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue:
                'Handcrafted DIY Paint Your Own POP toys, fridge magnets, religious idols, cartoon figures, animal toys, keychains and creative kits. Order on WhatsApp.',
            },
            { name: 'footerText', type: 'textarea', defaultValue: 'Handcrafted DIY POP toys, idols & creative kits. Made in India with love.' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', required: true, defaultValue: '+91 9354081946', admin: { width: '50%' } },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp Number',
                  type: 'text',
                  required: true,
                  defaultValue: '919354081946',
                  admin: { width: '50%', description: 'Digits only, including country code (e.g. 919354081946).' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true, defaultValue: 'hello@chitrakala.in', admin: { width: '50%' } },
                { name: 'workingHours', type: 'text', defaultValue: 'Mon–Sat · 10am–7pm', admin: { width: '50%' } },
              ],
            },
            { name: 'address', type: 'textarea', defaultValue: 'Made in India · Ships pan-India' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'facebook', label: 'Facebook URL', type: 'text' },
            { name: 'instagram', label: 'Instagram URL', type: 'text' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
            { name: 'youtube', label: 'YouTube URL', type: 'text' },
          ],
        },
        {
          label: 'Branding & SEO',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
            { name: 'ogImage', label: 'Default social share image', type: 'upload', relationTo: 'media' },
            {
              name: 'url',
              label: 'Website URL',
              type: 'text',
              required: true,
              defaultValue: 'https://chitrakala.in',
              admin: { description: 'Used for canonical URLs, sitemap and structured data.' },
            },
            { name: 'locale', type: 'text', defaultValue: 'en_IN' },
            {
              name: 'keywords',
              type: 'array',
              labels: { singular: 'Keyword', plural: 'Keywords' },
              fields: [{ name: 'value', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
