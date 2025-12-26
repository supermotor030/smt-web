import { useState, useEffect } from 'react'

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener
    const handler = (event) => setMatches(event.matches)

    // Add listener
    mediaQuery.addEventListener('change', handler)

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
