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
      try {
        const { loginUser, setAuthToken } = await import('../services/api')
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
    async signup(name, email, password) {
      try {
        const { registerUser, setAuthToken } = await import('../services/api')
        const res = await registerUser({ full_name: name, email, password, confirm_password: password })
        if (res.ok) {
          const token = res.data?.access_token
          const type = res.data?.token_type || 'bearer'
          if (token) {
            this.setToken(token, type)
            setAuthToken(token, type)
          }
          this.user = { email, name }
          this.isAuthenticated = true
          return { success: true }
        }
        const msg = (res.data && (res.data.message || res.data.error)) || 'Registration failed'
        return { success: false, error: msg }
      } catch (e) {
        return { success: false, error: 'Network error' }
      }
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
