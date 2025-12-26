import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [hoverType, setHoverType] = useState('default')
  const [isVisible, setIsVisible] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)
  
  const ringSpringConfig = { damping: 20, stiffness: 150 }
  const ringXSpring = useSpring(ringX, ringSpringConfig)
  const ringYSpring = useSpring(ringY, ringSpringConfig)

  const moveCursor = useCallback((e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    ringX.set(e.clientX)
    ringY.set(e.clientY)
  }, [cursorX, cursorY, ringX, ringY])

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      setIsVisible(false)
      return
    }

    // Hide if reduced motion preferred
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    const handleMouseMove = (e) => {
      moveCursor(e)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Add hover detection for interactive elements
    const handleElementHover = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .hoverable')
      if (target) {
        setIsHovering(true)
        if (target.closest('.card, .product-card')) {
          setHoverType('view')
        } else {
          setHoverType('link')
        }
      }
    }

    const handleElementLeave = () => {
      setIsHovering(false)
      setHoverType('default')
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementHover)
    document.addEventListener('mouseout', handleElementLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mouseout', handleElementLeave)
    }
  }, [moveCursor, prefersReducedMotion])

  if (!isVisible) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-ignition-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? (hoverType === 'view' ? 80 : 60) : 40,
          height: isHovering ? (hoverType === 'view' ? 80 : 60) : 40,
          borderWidth: isHovering ? 0 : 2,
          backgroundColor: isHovering ? 'rgba(255, 85, 0, 0.15)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="border-2 border-ignition-600 rounded-full w-full h-full absolute"
          style={{ display: isHovering ? 'none' : 'block' }}
        />
        {hoverType === 'view' && isHovering && (
          <span className="text-ignition-600 font-tech text-xs font-bold tracking-wider">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  )
}
