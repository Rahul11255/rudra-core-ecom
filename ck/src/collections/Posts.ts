import type { CollectionConfig } from 'payload'
import { slugField, statusField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'author', 'status'],
    description: 'Blog articles. Only Active posts appear on the website.',
    group: 'Content',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'body', type: 'richText' },
    {
      type: 'row',
      fields: [
        { name: 'date', type: 'date', required: true, admin: { width: '50%' } },
        { name: 'author', type: 'text', defaultValue: 'Team Chitrakala', admin: { width: '50%' } },
      ],
    },
    { name: 'cover', label: 'Cover Image', type: 'upload', relationTo: 'media' },
    {
      name: 'coverPath',
      label: 'Fallback cover path',
      type: 'text',
      admin: { description: 'Optional /public path, e.g. /images/g1.jpg' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [{ name: 'value', type: 'text', required: true }],
    },
    slugField('title'),
    statusField(),
  ],
  defaultSort: '-date',
}
