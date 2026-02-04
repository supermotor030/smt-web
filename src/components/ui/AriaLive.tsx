import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type Politeness = 'polite' | 'assertive'

interface AnnouncerContextType {
  announce: (text: string, level?: Politeness) => void
}

interface AriaLiveProviderProps {
  children: ReactNode
}

const AnnouncerContext = createContext<AnnouncerContextType | null>(null)

/**
 * AriaLiveProvider - Provides screen reader announcements
 */
export function AriaLiveProvider({ children }: AriaLiveProviderProps) {
  const [message, setMessage] = useState<string>('')
  const [politeness, setPoliteness] = useState<Politeness>('polite')

  const announce = useCallback((text: string, level: Politeness = 'polite') => {
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
