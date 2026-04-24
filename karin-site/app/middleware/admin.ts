export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  // Validate session — forward cookie headers during SSR so $fetch can authenticate
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}

  try {
    const session = await $fetch('/api/auth/get-session', {
      headers,
      credentials: 'include'
    }) as { user?: { id: string } } | null

    if (!session?.user) {
      return navigateTo('/admin/login')
    }
  } catch {
    return navigateTo('/admin/login')
  }
})
