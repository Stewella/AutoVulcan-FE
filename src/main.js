import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useAuthStore } from './store/auth'
import { setAuthToken } from './services/api'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)

const auth = useAuthStore(pinia)
if (auth?.token) {
  setAuthToken(auth.token, auth.tokenType)
}

app.use(router)
app.mount('#app')
