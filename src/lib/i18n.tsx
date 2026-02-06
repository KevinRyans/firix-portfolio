import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { profiles, type Language, type Profile } from '../content/profile'

type LanguageContextValue = {
  language: Language
  displayLanguage: Language
  setLanguage: (language: Language) => void
  setDisplayLanguage: (language: Language) => void
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
  const [displayLanguage, setDisplayLanguage] = useState<Language>(language)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore storage errors
    }
  }, [language])

  useEffect(() => {
    document.documentElement.lang = displayLanguage === 'no' ? 'nb' : 'en'
  }, [displayLanguage])

  const value = useMemo(
    () => ({ language, displayLanguage, setLanguage, setDisplayLanguage }),
    [language, displayLanguage],
  )

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
  const { displayLanguage } = useLanguage()
  return profiles[displayLanguage]
}
