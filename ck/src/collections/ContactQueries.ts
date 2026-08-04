import type { CollectionConfig } from 'payload'

export const ContactQueries: CollectionConfig = {
  slug: 'contact-queries',
  labels: { singular: 'Contact Query', plural: 'Contact Queries' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    description: 'Messages submitted through the website contact form.',
    group: 'Enquiries',
  },
  access: {
    // Visitors may submit the form without logging in.
    create: () => true,
    // Only admins can read / manage submissions.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Marked as handled',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
