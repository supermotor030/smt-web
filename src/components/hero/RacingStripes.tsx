import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

interface Stripe {
  id: number
  y: number
  height: number
  delay: number
}

interface RacingStripesProps {
  trigger?: boolean
}

/**
 * RacingStripes - Orange stripes that streak across on CTA trigger only
 * Optimized: No ambient animations, only triggers on user interaction
 */
export default function RacingStripes({ trigger = false }: RacingStripesProps) {
  const prefersReducedMotion = useReducedMotion()
  const [stripes, setStripes] = useState<Stripe[]>([])

  // Generate stripes on trigger
  const generateStripes = useCallback(() => {
    if (prefersReducedMotion) return []

    return Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      y: 20 + i * 25, // Spread evenly (20%, 45%, 70%)
      height: 3,
      delay: i * 0.08,
    }))
  }, [prefersReducedMotion])

  // Trigger stripe animation on click
  useEffect(() => {
    if (!trigger || prefersReducedMotion) return

    const newStripes = generateStripes()
    setStripes(newStripes)

    // Clean up after animation
    const timeout = setTimeout(() => {
      setStripes([])
    }, 800)

    return () => clearTimeout(timeout)
  }, [trigger, prefersReducedMotion, generateStripes])

  if (stripes.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {stripes.map((stripe) => (
          <motion.div
            key={stripe.id}
            className="absolute left-0 right-0 h-[3px]"
            style={{ top: `${stripe.y}%` }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: stripe.delay,
              ease: 'easeOut',
            }}
          >
            <div
              className="w-full h-full bg-gradient-to-r from-transparent via-ignition-500 to-transparent"
              style={{ boxShadow: '0 0 15px rgba(255, 85, 0, 0.6)' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
