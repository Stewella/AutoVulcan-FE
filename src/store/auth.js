import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
    tokenType: 'bearer'
  }),
  
  actions: {
    async login(email, password) {
      const users = JSON.parse(localStorage.getItem('vulnshield-users') || '[]')
      const user = users.find(u => u.email === email && u.password === password)
      
      if (user) {
        this.user = { email: user.email, name: user.name }
        this.isAuthenticated = true
        this.token = 'mock-token-' + Date.now()
        return { success: true }
      }
      
      if (users.length === 0) {
        this.user = { email }
        this.isAuthenticated = true
        this.token = 'mock-token-' + Date.now()
        return { success: true }
      }
      
      return { success: false, error: 'Invalid email or password' }
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
      this.token = 'mock-token-' + Date.now()
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
