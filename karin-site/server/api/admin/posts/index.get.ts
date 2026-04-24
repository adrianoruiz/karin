import { requireAdmin } from '~~/server/utils/require-admin'
import { listPosts } from '~~/server/utils/posts'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return await listPosts()
})
