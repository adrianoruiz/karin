import { defineStore } from 'pinia'
import { ref } from 'vue'

import { API_CONFIG } from '@/config/constants'
import { UserType } from '@/types/userType'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('access_token'))
  const user = ref<UserType | null>(null)

  // Tenta recuperar o usuário do localStorage no início
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (e) {
      localStorage.removeItem('user')
    }
  }

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('access_token', newToken)
    } else {
      localStorage.removeItem('access_token')
    }
  }

  const setUser = (newUser: UserType | null) => {
    user.value = newUser
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_CONFIG.ADMIN_URL}/auth/login/panel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setToken(data.access_token)
      setUser(data.user)
      router.push('/orders-kanban')
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return null

    try {
      const response = await fetch(`${API_CONFIG.ADMIN_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }

      const userData = await response.json()
      setUser(userData)
      return userData
    } catch (error) {
      console.error('Fetch user error:', error)
      logout()
      return null
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    router.push('/login')
  }

  const isAuthenticated = () => {
    return !!token.value && !!user.value
  }

  return {
    token,
    user,
    login,
    logout,
    fetchUser,
    isAuthenticated
  }
})
