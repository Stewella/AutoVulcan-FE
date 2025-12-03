<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-logo">
          <span class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </span>
          <span class="logo-text">VulnShield Labs</span>
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">{{ t.nav.home }}</router-link>
          <router-link to="/features" class="nav-link">{{ t.nav.features }}</router-link>
          <router-link to="/dashboard" class="nav-link">{{ t.nav.dashboard }}</router-link>
          <button @click="toggleLanguage" class="lang-switcher" :title="currentLanguage === 'en' ? t.common.switchToIndonesian : t.common.switchToEnglish">
            <svg class="globe-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span class="lang-code">{{ currentLanguage.toUpperCase() }}</span>
          </button>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <div class="footer-container">
        <p>{{ t.footer.tagline }}</p>
        <p class="footer-copy">{{ t.footer.tech }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from './composables/useI18n'

const { t, currentLanguage, toggleLanguage } = useI18n()
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
}

.logo-icon {
  color: #0ea5e9;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #0ea5e9;
}

.lang-switcher {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: rgba(51, 65, 85, 0.6);
  border: none;
  border-radius: 0.375rem;
  color: #94a3b8;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-switcher:hover {
  background: rgba(71, 85, 105, 0.7);
  color: #e2e8f0;
}

.globe-icon {
  width: 14px;
  height: 14px;
  opacity: 0.8;
}

.lang-code {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.main-content {
  min-height: calc(100vh - 160px);
}

.footer {
  background: #0f172a;
  color: #64748b;
  padding: 2rem;
  text-align: center;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-copy {
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #475569;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
