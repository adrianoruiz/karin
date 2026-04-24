import { requireAdmin } from '~~/server/utils/require-admin'
import { readPost, writePost } from '~~/server/utils/posts'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const slug = getRouterParam(event, 'slug')!
  const updates = await readBody<{
    title?: string
    description?: string
    body?: string
    tags?: string[]
    draft?: boolean
    cover?: string
    publishedAt?: string
  }>(event)

  const existing = await readPost(slug)
  const fm = {
    title: updates.title ?? existing.title,
    description: updates.description ?? existing.description,
    cover: updates.cover ?? existing.cover,
    author: existing.author || 'Dra. Karin Boldarini',
    tags: updates.tags ?? existing.tags ?? [],
    publishedAt: updates.publishedAt ?? existing.publishedAt,
    draft: updates.draft ?? existing.draft ?? false
  }
  const body = updates.body ?? existing.body
  await writePost(slug, fm, body)
  return { slug, ...fm, body }
})
