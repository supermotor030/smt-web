import { useEffect, useCallback, useRef } from 'react'

const KONAMI_CODE: string[] = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
]

/**
 * Custom hook to detect Konami code input
 */
export default function useKonamiCode(
    callback: () => void,
    code: string[] = KONAMI_CODE
): void {
    const indexRef = useRef<number>(0)

    const handleKeyDown = useCallback((e: KeyboardEvent): void => {
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
