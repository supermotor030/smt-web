import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSeasonal } from '../context/SeasonalContext'
import useReducedMotion from '../hooks/useReducedMotion'

// Snowfall effect for Christmas/New Year
function Snowfall() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // Fewer snowflakes on mobile for performance
  const snowflakeCount = isMobile ? 25 : 50
  
  const snowflakes = useMemo(() => 
    Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: isMobile ? (3 + Math.random() * 5) : (4 + Math.random() * 8),
      opacity: 0.4 + Math.random() * 0.4,
    })), [snowflakeCount, isMobile])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white"
          style={{
            left: `${flake.left}%`,
            fontSize: flake.size,
            opacity: flake.opacity,
          }}
          initial={{ y: -20, x: 0 }}
          animate={{
            y: '100vh',
            x: [0, 20, -20, 10, 0],
          }}
          transition={{
            y: { duration: flake.duration, repeat: Infinity, delay: flake.delay },
            x: { duration: flake.duration / 2, repeat: Infinity, delay: flake.delay },
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  )
}

// Fireworks effect for New Year
function Fireworks() {
  const prefersReducedMotion = useReducedMotion()
  const [fireworks, setFireworks] = useState([])
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (prefersReducedMotion) return

    const createFirework = () => {
      const id = Date.now() + Math.random()
      const newFirework = {
        id,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 50,
        color: ['#ff6b6b', '#ffd700', '#4ecdc4', '#ff5500', '#00ff88', '#ff00ff'][Math.floor(Math.random() * 6)],
        size: isMobile ? 40 : 60,
      }
      
      setFireworks(prev => [...prev, newFirework])
      
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== id))
      }, 2000)
    }

    // Create first firework immediately
    createFirework()
    
    // Then create more at intervals (slower on mobile)
    const intervalTime = isMobile ? 3000 : 1500
    const interval = setInterval(createFirework, intervalTime)
    return () => clearInterval(interval)
  }, [prefersReducedMotion, isMobile])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute"
            style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Firework burst particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ 
                  backgroundColor: fw.color,
                  width: isMobile ? 4 : 6,
                  height: isMobile ? 4 : 6,
                  boxShadow: `0 0 ${isMobile ? 8 : 12}px ${fw.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 12) * fw.size,
                  y: Math.sin((i * Math.PI * 2) / 12) * fw.size,
                  opacity: 0,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            ))}
            {/* Inner particles for extra sparkle */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`inner-${i}`}
                className="absolute rounded-full"
                style={{ 
                  backgroundColor: '#ffffff',
                  width: isMobile ? 2 : 3,
                  height: isMobile ? 2 : 3,
                  boxShadow: `0 0 6px #ffffff`,
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8 + 0.4) * (fw.size * 0.6),
                  y: Math.sin((i * Math.PI * 2) / 8 + 0.4) * (fw.size * 0.6),
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            ))}
            {/* Center glow */}
            <motion.div 
              className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ 
                backgroundColor: fw.color,
                width: isMobile ? 8 : 12,
                height: isMobile ? 8 : 12,
                boxShadow: `0 0 20px ${fw.color}, 0 0 40px ${fw.color}`,
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Floating lanterns for Vesak/Avurudu
function Lanterns() {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // Fewer lanterns on mobile
  const lanternCount = isMobile ? 5 : 8
  
  const lanterns = useMemo(() => 
    Array.from({ length: lanternCount }, (_, i) => ({
      id: i,
      left: 10 + (i * (80 / lanternCount)),
      delay: i * 0.5,
      duration: 8 + Math.random() * 4,
    })), [lanternCount])

  if (prefersReducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute text-3xl"
          style={{ left: `${lantern.left}%` }}
          initial={{ y: '100vh', opacity: 0.8 }}
          animate={{ 
            y: '-20vh',
            x: [0, 15, -15, 10, 0],
          }}
          transition={{
            y: { duration: lantern.duration, repeat: Infinity, delay: lantern.delay },
            x: { duration: lantern.duration / 2, repeat: Infinity, delay: lantern.delay },
          }}
        >
          🏮
        </motion.div>
      ))}
    </div>
  )
}

// Main seasonal effects component - visual effects only
export default function SeasonalEffects() {
  const { effects, isHoliday } = useSeasonal()
  
  if (!isHoliday) return null
  
  return (
    <>
      {effects.snowfall && <Snowfall />}
      {effects.fireworks && <Fireworks />}
      {effects.lanterns && <Lanterns />}
    </>
  )
}

// Export subcomponents for individual use
export { Snowfall, Fireworks, Lanterns }
