import { navigateTo } from '#app'
import { useAuthStore } from '../stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ['/login']
  
  // Se a rota atual é pública, permitir acesso sem autenticação
  if (publicRoutes.includes(to.path)) {
    // Se já estiver autenticado e tentar acessar o login, redireciona para a página inicial
    if (process.client) {
      const auth = useAuthStore()
      if (auth.isAuthenticated()) {
        return navigateTo('/')
      }
    }
    return
  }
  
  // Verificar autenticação
  if (process.client) {
    const auth = useAuthStore()
    
    // Verificar se o usuário está autenticado
    if (!auth.isAuthenticated()) {
      return navigateTo('/login')
    }
    
    // Verificar se o token ainda é válido fazendo uma chamada para buscar o usuário
    try {
      const result = await auth.fetchUser()
      if (!result.success) {
        // Se não conseguir obter os dados do usuário, o token pode ter expirado
        auth.logout() // Limpar dados de autenticação
        return navigateTo('/login')
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      auth.logout() // Limpar dados de autenticação em caso de erro
      return navigateTo('/login')
    }
  } else {
    // No lado do servidor, não podemos verificar a autenticação
    // Podemos redirecionar para a página de login ou deixar o cliente lidar com isso
    // Neste caso, estamos permitindo a renderização inicial e deixando o cliente verificar
  }
})
