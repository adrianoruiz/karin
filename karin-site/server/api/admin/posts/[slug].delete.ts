import { requireAdmin } from '~~/server/utils/require-admin'
import { deletePost } from '~~/server/utils/posts'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const slug = getRouterParam(event, 'slug')!
  await deletePost(slug)
  return { ok: true }
})
