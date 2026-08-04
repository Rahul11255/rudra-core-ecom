import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: { description: 'All content shown on the About page.', group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              defaultValue: 'Crafted to spark creativity, not screen time.',
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              defaultValue:
                'Chitrakala was born from a simple wish: bring back the joy of making things with your hands. We craft beautiful POP toys, idols and kits to help children unplug, adults unwind, and families create memories together — one brushstroke at a time.',
            },
            { name: 'bannerImage', type: 'upload', relationTo: 'media' },
            {
              name: 'bannerImagePath',
              type: 'text',
              defaultValue: '/images/g2.jpg',
              admin: { description: 'Fallback /public path used when no banner image is uploaded.' },
            },
            {
              name: 'stats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 10k+' } },
                { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Happy kids' } },
              ],
            },
            { name: 'buttonText', type: 'text', defaultValue: 'Order on WhatsApp' },
          ],
        },
        {
          label: 'Mission & Vision',
          fields: [
            { name: 'missionHeading', type: 'text', defaultValue: 'Our Mission' },
            {
              name: 'mission',
              type: 'textarea',
              defaultValue:
                'To put a paintbrush in every child’s hand — replacing screen time with handmade, joyful, screen-free creativity that families can share.',
            },
            { name: 'visionHeading', type: 'text', defaultValue: 'Our Vision' },
            {
              name: 'vision',
              type: 'textarea',
              defaultValue:
                'To become India’s most loved DIY art brand, crafting affordable, safe and beautiful POP kits for every home, school and celebration.',
            },
            {
              name: 'extraSections',
              label: 'Additional About sections',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
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
