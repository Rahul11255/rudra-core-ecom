import type { Field } from 'payload'

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

/**
 * Auto-generated, editable slug field.
 * Generated from `from` (default: `name`) whenever it is left empty.
 */
export const slugField = (from = 'name'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: 'Slug (URL)',
  admin: {
    position: 'sidebar',
    description: 'Auto-generated from the title. Edit only if you need a custom URL.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, originalDoc }) => {
        if (typeof value === 'string' && value.length > 0) return slugify(value)
        const source = (data?.[from] ?? originalDoc?.[from]) as string | undefined
        return source ? slugify(source) : value
      },
    ],
  },
})

/** Active / Inactive publishing switch used across collections. */
export const statusField = (): Field => ({
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'active',
  options: [
    { label: 'Active (visible on website)', value: 'active' },
    { label: 'Inactive (hidden)', value: 'inactive' },
  ],
  admin: { position: 'sidebar' },
})
