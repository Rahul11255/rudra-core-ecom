import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    description: 'Customer reviews shown on the home page.',
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', required: true, admin: { width: '50%', description: 'e.g. Mom of two, Pune' } },
      ],
    },
    { name: 'text', label: 'Review', type: 'textarea', required: true },
    { name: 'avatar', type: 'text', admin: { description: 'Initials shown in the circle, e.g. AS' } },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  defaultSort: 'order',
}
