import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { profiles, type Language, type Profile } from '../content/profile'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)
const STORAGE_KEY = 'firix_lang'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'no') return stored

  const browser = window.navigator.language.toLowerCase()
  if (browser.startsWith('no') || browser.startsWith('nb') || browser.startsWith('nn')) {
    return 'no'
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = language === 'no' ? 'nb' : 'en'
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export function useProfile(): Profile {
  const { language } = useLanguage()
  return profiles[language]
}
