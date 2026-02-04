import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Check for saved preference or system preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('smt-theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    }
    return 'dark' // Default to dark (matches PRECISION FORGE theme)
  }

  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (theme === 'light') {
      root.classList.add('light-mode')
      root.classList.remove('dark-mode')
      body.classList.add('light-mode')
      body.classList.remove('dark-mode')
      // Also set data attribute for more flexible CSS targeting
      root.setAttribute('data-theme', 'light')
    } else {
      root.classList.add('dark-mode')
      root.classList.remove('light-mode')
      body.classList.add('dark-mode')
      body.classList.remove('light-mode')
      root.setAttribute('data-theme', 'dark')
    }

    localStorage.setItem('smt-theme', theme)
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')

    const handleChange = (e: MediaQueryListEvent): void => {
      const savedTheme = localStorage.getItem('smt-theme')
      if (!savedTheme) {
        setTheme(e.matches ? 'light' : 'dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = (): void => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const isDark = theme === 'dark'
  const isLight = theme === 'light'

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark, isLight }}>
      {children}
    </ThemeContext.Provider>
  )
}


export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
