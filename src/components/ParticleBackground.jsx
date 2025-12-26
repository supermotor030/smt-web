import { useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useMediaQuery from '../hooks/useMediaQuery'
import useReducedMotion from '../hooks/useReducedMotion'

export default function ParticleBackground() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  
  const particleCount = isDesktop ? 25 : 10
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: Math.random() < 0.5 
        ? '#FF5500' 
        : Math.random() < 0.7 
          ? '#E8E8F0' 
          : '#0077FF',
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  }, [particleCount])

  const y = useTransform(scrollY, [0, 3000], [0, -900])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{ y }}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: `blur(${particle.size / 3}px)`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}
