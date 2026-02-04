import { useState, useEffect } from 'react'

export default function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

    useEffect(() => {
        // Check if window is available (SSR safety)
        if (typeof window === 'undefined') return

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        // Set initial value
        setPrefersReducedMotion(mediaQuery.matches)

        // Create event listener
        const handler = (event: MediaQueryListEvent): void => setPrefersReducedMotion(event.matches)

        // Add listener
        mediaQuery.addEventListener('change', handler)

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReducedMotion
}
