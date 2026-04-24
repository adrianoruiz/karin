import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        cover: z.string().optional(),
        author: z.string().default('Dra. Karin Boldarini'),
        tags: z.array(z.string()).default([]),
        publishedAt: z.string(),
        draft: z.boolean().default(false)
      })
    })
  }
})
