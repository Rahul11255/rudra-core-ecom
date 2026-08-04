import path from 'path'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Posts } from './collections/Posts'
import { Faqs } from './collections/Faqs'
import { Testimonials } from './collections/Testimonials'
import { ContactQueries } from './collections/ContactQueries'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Chitrakala CMS',
    },
  },

  editor: lexicalEditor(),

  collections: [
    Users,
    Media,
    Categories,
    Products,
    Posts,
    Faqs,
    Testimonials,
    ContactQueries,
  ],

  globals: [
    HomePage,
    AboutPage,
    SiteSettings,
  ],

  plugins: [
    cloudinaryStorage({
      cloudConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
      },

      collections: {
        media: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url:
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/payload-cms',
  }),

  sharp,

  serverURL,

  cors: [serverURL],

  csrf: [serverURL],
})