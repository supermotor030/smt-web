import { useMemo } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import useReducedMotion from '../hooks/useReducedMotion'

/**
 * ParticleBackground - Lightweight CSS-only particles
 * Optimized: Uses pure CSS animations instead of Framer Motion for better performance
 */
export default function ParticleBackground() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useReducedMotion()

  // Reduced particle count: 8 on desktop, 4 on mobile
  const particleCount = isDesktop ? 8 : 4

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      color: i % 3 === 0 ? '#FF5500' : i % 3 === 1 ? '#E8E8F0' : '#0077FF',
      duration: 15 + i * 3, // Staggered durations
      delay: i * 2,
    }))
  }, [particleCount])

  // Disabled - dots are distracting
  return null

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.4,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
