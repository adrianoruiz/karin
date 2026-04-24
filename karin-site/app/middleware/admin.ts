export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  const { useSession } = useAuth()
  const session = useSession()

  await session.refetch?.()

  if (!session.value?.data) {
    return navigateTo('/admin/login')
  }
})
