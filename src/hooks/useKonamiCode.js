import { useEffect, useCallback, useRef } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
]

/**
 * Custom hook to detect Konami code input
 * @param {Function} callback - Function to call when Konami code is entered
 * @param {Array} code - Custom code sequence (optional)
 */
export default function useKonamiCode(callback, code = KONAMI_CODE) {
  const indexRef = useRef(0)

  const handleKeyDown = useCallback((e) => {
    if (e.code === code[indexRef.current]) {
      indexRef.current++
      if (indexRef.current === code.length) {
        callback()
        indexRef.current = 0
      }
    } else {
      indexRef.current = 0
    }
  }, [callback, code])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
