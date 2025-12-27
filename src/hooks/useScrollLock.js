import { useEffect } from 'react'

/**
 * Custom hook to lock body scroll when a condition is true
 * Useful for modals, mobile menus, etc.
 * @param {boolean} isLocked - Whether to lock the scroll
 */
export default function useScrollLock(isLocked) {
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
