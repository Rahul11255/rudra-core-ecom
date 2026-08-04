import type { CollectionConfig } from 'payload'
import { slugField, statusField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Category', plural: 'Categories' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'emoji', 'status', 'updatedAt'],
    description: 'Product categories shown on the website. Only Active categories appear on the frontend.',
    group: 'Catalogue',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '60%' } },
        { name: 'emoji', type: 'text', admin: { width: '40%', description: 'Optional icon, e.g. 🦄' } },
      ],
    },
    {
      name: 'image',
      label: 'Category Image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional.' },
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'tint',
      type: 'text',
      admin: {
        description: 'Optional card gradient classes, e.g. "from-pink/40 to-pink/10".',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
    slugField('name'),
    statusField(),
  ],
  defaultSort: 'order',
}
