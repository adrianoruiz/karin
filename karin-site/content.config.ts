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
        category: z.string().default('Saúde mental'),
        author: z.string().default('Dra. Karin Boldarini'),
        tags: z.array(z.string()).default([]),
        publishedAt: z.string(),
        draft: z.boolean().default(false)
      })
    }),
    especialidades: defineCollection({
      type: 'page',
      source: 'especialidades/**/*.md',
      schema: z.object({
        title: z.string(),
        h1: z.string(),
        description: z.string(),
        condition: z.string(),
        icon: z.string(),
        order: z.number().default(0),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
        updatedAt: z.string()
      })
    })
  }
})
