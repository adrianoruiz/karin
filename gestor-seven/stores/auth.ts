import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_CONFIG } from '~/config/constants';

interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified_at: string | null;
  is_whatsapp_user: boolean;
  status: boolean;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export const useAuthStore = defineStore('auth', () => {
  // Inicializa com valores nulos e depois carrega do localStorage no lado do cliente
  const token = ref<string | null>(null)
  const user = ref<UserType | null>(null)

  // Função para carregar dados do localStorage (apenas no cliente)
  const loadFromLocalStorage = () => {
    if (process.client) {
      // Carrega o token
      const storedToken = localStorage.getItem('access_token')
      if (storedToken) {
        token.value = storedToken
      }

      // Carrega o usuário
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          user.value = JSON.parse(storedUser)
        } catch (e) {
          localStorage.removeItem('user')
        }
      }
    }
  }

  // Carrega dados do localStorage na inicialização (apenas no cliente)
  if (process.client) {
    loadFromLocalStorage()
  }

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (process.client) {
      if (newToken) {
        localStorage.setItem('access_token', newToken)
      } else {
        localStorage.removeItem('access_token')
      }
    }
  }

  const setUser = (newUser: UserType | null) => {
    user.value = newUser
    if (process.client) {
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser))
      } else {
        localStorage.removeItem('user')
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.access_token) {
        setToken(data.access_token)
        await fetchUser()
        return true
      }

      return false
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      return false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return { success: false, data: null }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}auth/me`, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok && data) {
        setUser(data)
        return { success: true, data }
      }

      // Se a resposta não for ok, provavelmente o token expirou
      setToken(null)
      setUser(null)
      return { success: false, data: null }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      return { success: false, data: null }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const isAuthenticated = () => {
    // Verificar primeiro no estado da store
    if (token.value) return true
    
    // Se não encontrar no estado, verificar no localStorage (apenas no cliente)
    if (process.client) {
      const storedToken = localStorage.getItem('access_token')
      if (storedToken) {
        // Atualizar o estado da store com o token encontrado
        token.value = storedToken
        return true
      }
    }
    
    return false
  }

  return {
    token,
    user,
    login,
    logout,
    fetchUser,
    isAuthenticated,
  }
})
