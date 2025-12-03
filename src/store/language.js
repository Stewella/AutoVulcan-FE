import { defineStore } from 'pinia'

const SUPPORTED_LANGUAGES = ['en', 'id']

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'en'
  }),
  
  actions: {
    setLanguage(lang) {
      if (SUPPORTED_LANGUAGES.includes(lang)) {
        this.currentLanguage = lang
      } else {
        this.currentLanguage = 'en'
      }
    },
    
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'id' : 'en'
    },
    
    validateLanguage() {
      if (!SUPPORTED_LANGUAGES.includes(this.currentLanguage)) {
        this.currentLanguage = 'en'
      }
    }
  },
  
  persist: {
    key: 'vulnshield-language',
    storage: localStorage,
    afterRestore: (ctx) => {
      ctx.store.validateLanguage()
    }
  }
})
