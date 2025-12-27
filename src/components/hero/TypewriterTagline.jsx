import { useState, useEffect } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

const taglines = [
  'PRECISION PARTS. POWERFUL PERFORMANCE.',
  'QUALITY YOU CAN TRUST.',
  'YOUR VEHICLE DESERVES THE BEST.',
  'GENUINE PARTS. REAL RESULTS.',
]

export default function TypewriterTagline() {
  const prefersReducedMotion = useReducedMotion()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(taglines[0])
      return
    }

    const currentTagline = taglines[currentIndex]
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = 2000

    if (!isDeleting && displayText === currentTagline) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === '') {
      // Move to next tagline
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
      return
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(currentTagline.substring(0, displayText.length - 1))
      } else {
        setDisplayText(currentTagline.substring(0, displayText.length + 1))
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, prefersReducedMotion])

  return (
    <div className="h-6 sm:h-8 lg:h-10 flex items-center justify-center lg:justify-start">
      <span className="font-tech text-xs sm:text-sm lg:text-base text-steel-400 tracking-wider">
        {displayText}
        <span 
          className={`inline-block w-0.5 h-4 sm:h-5 lg:h-6 bg-ignition-500 ml-1 transition-opacity ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </span>
    </div>
  )
}
