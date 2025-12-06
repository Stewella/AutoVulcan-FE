import { defineStore } from 'pinia'
import { loginUser, setAuthToken } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    tokenType: 'bearer'
  }),
  
  actions: {
    async login(email, password) {
      try {
        const res = await loginUser({ email, password })
        if (res.ok) {
          const token = res.data?.access_token
          const type = res.data?.token_type || 'bearer'
          if (token) {
            this.setToken(token, type)
            setAuthToken(token, type)
          }
          this.user = { email }
          this.isAuthenticated = true
          return { success: true }
        }
        const msg = (res.data && (res.data.message || res.data.error)) || 'Invalid email or password'
        return { success: false, error: msg }
      } catch (e) {
        return { success: false, error: 'Network error' }
      }
    },
    signup(name, email, password) {
      const users = JSON.parse(localStorage.getItem('vulnshield-users') || '[]')
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'Email already registered' }
      }
      users.push({ name, email, password })
      localStorage.setItem('vulnshield-users', JSON.stringify(users))
      this.user = { email, name }
      this.isAuthenticated = true
      return { success: true }
    },
    setToken(token, type = 'bearer') {
      this.token = token
      this.tokenType = type || 'bearer'
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      this.tokenType = 'bearer'
      localStorage.removeItem('vulnshield-auth')
    }
  },
  
  persist: {
    key: 'vulnshield-auth',
    storage: localStorage,
    paths: ['user', 'isAuthenticated', 'token', 'tokenType']
  }
})
