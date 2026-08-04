import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'q',
    defaultColumns: ['q', 'order'],
    description: 'Questions shown in the FAQ section (also used for FAQ rich results in Google).',
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'q', label: 'Question', type: 'text', required: true },
    { name: 'a', label: 'Answer', type: 'textarea', required: true },
    { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
  defaultSort: 'order',
}
