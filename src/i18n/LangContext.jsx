import { createContext, useContext, useEffect, useState } from 'react'
import { content } from './content'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('tqt-lang') || 'vi'
    } catch {
      return 'vi'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('tqt-lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
