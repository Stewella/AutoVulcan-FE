import { computed } from 'vue'
import { useLanguageStore } from '../store/language'
import { translations, languages } from '../i18n'

export function useI18n() {
  const languageStore = useLanguageStore()
  
  const currentLanguage = computed(() => languageStore.currentLanguage)
  
  const t = computed(() => translations[currentLanguage.value] || translations.en)
  
  function translate(key) {
    const keys = key.split('.')
    let value = t.value
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return value
  }
  
  function setLanguage(lang) {
    languageStore.setLanguage(lang)
  }
  
  function toggleLanguage() {
    languageStore.toggleLanguage()
  }
  
  return {
    t,
    translate,
    currentLanguage,
    setLanguage,
    toggleLanguage,
    languages
  }
}
