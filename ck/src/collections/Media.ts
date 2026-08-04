import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  labels: {
    singular: 'Media',
    plural: 'Media Library',
  },

  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description: 'Upload images once and reuse them throughout the website.',
    group: 'Media',
  },

  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },

  upload: {
    disableLocalStorage: true,

    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ],

    focalPoint: true,

    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'center',
      },
      {
        name: 'card',
        width: 800,
        height: 800,
        position: 'center',
      },
      {
        name: 'wide',
        width: 1600,
        height: 900,
        position: 'center',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'center',
      },
    ],

    adminThumbnail: 'thumbnail',
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Alternative text used for accessibility and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional image caption.',
      },
    },
  ],
}