import { requireAdmin } from '~~/server/utils/require-admin'
import { createPost } from '~~/server/utils/posts'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody<{
    title: string
    description: string
    body: string
    tags?: string[]
    draft?: boolean
    cover?: string
    publishedAt?: string
  }>(event)
  return await createPost(body)
})
