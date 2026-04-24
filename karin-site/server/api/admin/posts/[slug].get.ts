import { requireAdmin } from '~~/server/utils/require-admin'
import { readPost } from '~~/server/utils/posts'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const slug = getRouterParam(event, 'slug')!
  return await readPost(slug)
})
