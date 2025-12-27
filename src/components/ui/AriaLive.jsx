import { createContext, useContext, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const AnnouncerContext = createContext(null)

/**
 * AriaLiveProvider - Provides screen reader announcements
 */
export function AriaLiveProvider({ children }) {
  const [message, setMessage] = useState('')
  const [politeness, setPoliteness] = useState('polite')

  const announce = useCallback((text, level = 'polite') => {
    // Clear first to ensure re-announcement of same message
    setMessage('')
    setPoliteness(level)
    
    // Small delay to ensure DOM update
    requestAnimationFrame(() => {
      setMessage(text)
    })
  }, [])

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      
      {/* Polite announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeness === 'polite' && message}
      </div>
      
      {/* Assertive announcements (interrupts) */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {politeness === 'assertive' && message}
      </div>
    </AnnouncerContext.Provider>
  )
}

AriaLiveProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * useAnnounce - Hook to announce messages to screen readers
 */
export function useAnnounce() {
  const context = useContext(AnnouncerContext)
  
  if (!context) {
    // Fallback if used outside provider
    return {
      announce: (text, _level = 'polite') => {
        console.warn('useAnnounce used outside AriaLiveProvider:', text)
      }
    }
  }
  
  return context
}

export default AriaLiveProvider
