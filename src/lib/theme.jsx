import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

function readInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme)
  const timer = useRef(null)

  /**
   * Applies a theme to the document.
   * `animate` adds a temporary class so every colour cross-fades over 300ms.
   */
  const applyTheme = useCallback((next, animate = true) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement

    if (animate) {
      root.classList.add('theme-anim')
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => root.classList.remove('theme-anim'), 340)
    }

    root.setAttribute('data-theme', next)
    root.style.colorScheme = next
    setThemeState(next)
  }, [])

  const setTheme = useCallback(
    (next) => {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch (e) {
        /* storage unavailable (private mode) — theme still applies for this session */
      }
      applyTheme(next)
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  // Follow the OS preference until the visitor explicitly picks a theme.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handle = (event) => {
      let stored = null
      try {
        stored = localStorage.getItem(STORAGE_KEY)
      } catch (e) {
        stored = null
      }
      if (stored === 'light' || stored === 'dark') return
      applyTheme(event.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [applyTheme])

  // Keep multiple tabs in sync.
  useEffect(() => {
    const handle = (event) => {
      if (event.key !== STORAGE_KEY) return
      if (event.newValue === 'light' || event.newValue === 'dark') {
        applyTheme(event.newValue, false)
      }
    }
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [applyTheme])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
