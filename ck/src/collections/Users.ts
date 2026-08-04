import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin User', plural: 'Admin Users' },
  admin: { useAsTitle: 'email', group: 'Settings' },
  auth: true,
  fields: [{ name: 'name', type: 'text' }],
}
