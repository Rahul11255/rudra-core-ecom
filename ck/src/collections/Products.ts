import type { CollectionConfig } from 'payload'
import { slugField, statusField } from '../fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Product', plural: 'Products' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'featured', 'status'],
    description: 'Every product must belong to a category. Only Active products appear on the website.',
    group: 'Catalogue',
  },
  access: { read: () => true },
  hooks: {
    beforeValidate: [
      async ({ req, operation }) => {
        // A product cannot exist without a category — block creation when none exist yet.
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'categories' })
          if (totalDocs === 0) {
            throw new Error('Please create at least one Category before adding products.')
          }
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Details',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: { description: 'Required — pick the category this product belongs to.' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'Shown as-is, e.g. ₹349' },
                },
                {
                  name: 'shortDescription',
                  type: 'text',
                  admin: { width: '50%', description: 'One-line text used on product cards.' },
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              admin: { description: 'Full description shown on the product page.' },
            },
            {
              name: 'whatsappMessage',
              type: 'textarea',
              admin: {
                description:
                  'Pre-filled WhatsApp message. Leave blank to use: "Hi! I\u2019d like to order: <product> (<price>)."',
              },
            },
          ],
        },
        {
          label: 'Images',
          fields: [
            {
              name: 'featuredImage',
              label: 'Featured Image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Main image used on cards, listings and social previews.' },
            },
            {
              name: 'gallery',
              label: 'Product Gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Optional extra images shown on the product page.' },
            },
            {
              name: 'imagePath',
              label: 'Fallback image path',
              type: 'text',
              admin: {
                description: 'Optional /public path used when no featured image is uploaded, e.g. /images/p-unicorn.jpg',
              },
            },
          ],
        },
        {
          label: 'Options & SEO',
          fields: [
            {
              name: 'colors',
              label: 'Colour swatches',
              type: 'array',
              labels: { singular: 'Colour', plural: 'Colours' },
              fields: [{ name: 'value', type: 'text', required: true, admin: { description: 'Hex, e.g. #FF8FB8' } }],
            },
            {
              name: 'sizes',
              type: 'array',
              labels: { singular: 'Size', plural: 'Sizes' },
              fields: [{ name: 'value', type: 'text', required: true }],
            },
            { name: 'rating', type: 'number', min: 0, max: 5, defaultValue: 5 },
            {
              name: 'seo',
              label: 'SEO overrides',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
      ],
    },
    slugField('name'),
    statusField(),
    {
      name: 'featured',
      label: 'Featured Product',
      type: 'checkbox',
      admin: { position: 'sidebar', description: 'Show in the "Best-selling" section on the home page.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers appear first.' },
    },
  ],
  defaultSort: 'order',
}
