import { useAuthStore } from '~/stores/auth'
import { useRoute, navigateTo } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Aguarde a hidratação do Pinia no lado do cliente
  if (process.client) {
    const auth = useAuthStore()
    
    // Adicionar um hook de navegação para verificar a autenticação
    nuxtApp.hook('page:start', () => {
      const route = useRoute()
      
      // Permitir acesso à página de login mesmo sem autenticação
      if (route.path === '/login') {
        // Se já estiver autenticado e tentar acessar o login, redireciona para a página inicial
        if (auth.isAuthenticated()) {
          navigateTo('/')
        }
        return
      }
      
      // Verificar se o usuário está autenticado
      if (!auth.isAuthenticated()) {
        navigateTo('/login')
      }
    })
  }
})
