<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="auth-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </div>
        <h1>{{ t.auth.signupTitle }}</h1>
        <p>{{ t.auth.signupSubtitle }}</p>
      </div>
      
      <form @submit.prevent="handleSignup" class="auth-form">
        <div class="form-group">
          <label for="name">{{ t.auth.name }}</label>
          <input 
            id="name"
            v-model="name" 
            type="text" 
            required
            :placeholder="t.auth.namePlaceholder"
          />
        </div>
        
        <div class="form-group">
          <label for="email">{{ t.auth.email }}</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            required
            :placeholder="t.auth.emailPlaceholder"
          />
        </div>
        
        <div class="form-group">
          <label for="password">{{ t.auth.password }}</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            required
            minlength="6"
            :placeholder="t.auth.passwordPlaceholder"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">{{ t.auth.confirmPassword }}</label>
          <input 
            id="confirmPassword"
            v-model="confirmPassword" 
            type="password" 
            required
            :placeholder="t.auth.confirmPasswordPlaceholder"
          />
        </div>
        
        <div v-if="error" class="error-message">{{ error }}</div>
        
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? t.auth.signingUp : t.auth.signup }}
        </button>
      </form>
      
      <div class="auth-footer">
        <p>{{ t.auth.hasAccount }} <router-link to="/login">{{ t.auth.loginLink }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

function handleSignup() {
  error.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = t.value.auth.passwordMismatch
    return
  }
  
  if (password.value.length < 6) {
    error.value = t.value.auth.passwordTooShort
    return
  }
  
  loading.value = true
  
  setTimeout(() => {
    const result = authStore.signup(name.value, email.value, password.value)
    
    if (result.success) {
      const redirectPath = route.query.redirect || '/dashboard'
      router.push(redirectPath)
    } else {
      error.value = t.value.auth.emailExists
    }
    
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.auth-container {
  width: 100%;
  max-width: 400px;
  background: var(--bg-card);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-logo {
  color: var(--primary);
  margin-bottom: 1rem;
}

.auth-header h1 {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.auth-header p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.form-group input {
  padding: 0.875rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
}

.error-message {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  color: var(--error);
  font-size: 0.875rem;
}

.btn {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.auth-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
