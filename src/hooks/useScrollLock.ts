import { useEffect } from 'react'

/**
 * Custom hook to lock body scroll when a condition is true
 * Useful for modals, mobile menus, etc.
 */
export default function useScrollLock(isLocked: boolean): void {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isLocked])
}
