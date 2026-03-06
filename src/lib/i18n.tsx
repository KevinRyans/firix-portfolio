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
    document.documentElement.lang = 'en'
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
