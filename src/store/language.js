import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: 'en'
  }),
  
  actions: {
    setLanguage(lang) {
      this.currentLanguage = lang
    },
    
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'id' : 'en'
    }
  },
  
  persist: {
    key: 'vulnshield-language',
    storage: localStorage
  }
})
