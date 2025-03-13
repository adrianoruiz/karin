import { useAuthStore } from '~/stores/auth'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const auth = useAuthStore()
    
    // Permitir acesso à página de login mesmo sem autenticação
    if (to.path === '/login') {
      // Se já estiver autenticado e tentar acessar o login, redireciona para a página inicial
      if (auth.isAuthenticated()) {
        return navigateTo('/')
      }
      return
    }
    
    // Verificar se o usuário está autenticado
    if (!auth.isAuthenticated()) {
      return navigateTo('/login')
    }
  }
})
