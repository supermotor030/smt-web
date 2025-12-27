import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Check for saved preference or system preference
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('smt-theme')
      if (savedTheme) {
        return savedTheme
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    }
    return 'dark' // Default to dark (matches PRECISION FORGE theme)
  }

  const [theme, setTheme] = useState(getInitialTheme)

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
    
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('smt-theme')
      if (!savedTheme) {
        setTheme(e.matches ? 'light' : 'dark')
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
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

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
