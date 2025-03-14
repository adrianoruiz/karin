import { navigateTo, abortNavigation } from '#app'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login']
  
  // Se a rota atual é pública, permitir acesso sem autenticação
  if (publicRoutes.includes(to.path)) {
    // Se já estiver autenticado e tentar acessar o login, redireciona para a página inicial
    if (process.client) {
      const auth = useAuthStore()
      if (auth.isAuthenticated()) {
        return navigateTo('/', { replace: true })
      }
    }
    return
  }
  
  // Verificar autenticação
  if (process.client) {
    const auth = useAuthStore()
    
    // Verificar se o usuário está autenticado
    if (!auth.isAuthenticated()) {
      // Usar replace: true para evitar problemas de carregamento de CSS
      return navigateTo('/login', { replace: true })
    }
    
    // Verificar se o token ainda é válido fazendo uma chamada para buscar o usuário
    try {
      const result = await auth.fetchUser()
      if (!result.success) {
        // Se não conseguir obter os dados do usuário, o token pode ter expirado
        auth.logout() // Limpar dados de autenticação
        // Usar replace: true para evitar problemas de carregamento de CSS
        return navigateTo('/login', { replace: true })
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      auth.logout() // Limpar dados de autenticação em caso de erro
      // Usar replace: true para evitar problemas de carregamento de CSS
      return navigateTo('/login', { replace: true })
    }
  } else {
    // No lado do servidor, redirecionamos para o login se não for uma rota pública
    if (!publicRoutes.includes(to.path)) {
      return navigateTo('/login', { replace: true })
    }
  }
})
