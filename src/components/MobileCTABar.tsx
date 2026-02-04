import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuPhone } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { contact } from '../data/siteData'
import useMediaQuery from '../hooks/useMediaQuery'

export default function MobileCTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const isMobile = useMediaQuery('(max-width: 1023px)')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight

      // Show after scrolling past hero
      if (currentScrollY > heroHeight * 0.8) {
        // Hide when scrolling up, show when scrolling down or stopped
        if (currentScrollY < lastScrollY - 10) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Disabled - MobileBottomNav handles mobile navigation
  return null

  // Old code below - keeping for reference
  if (!isMobile) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 bg-forge-900/95 backdrop-blur-[20px] border-t border-ignition-600/10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex gap-3 p-3 safe-area-pb">
            <a
              href={contact.callLink}
              className="flex-1 btn-primary py-4 text-base justify-center"
            >
              <LuPhone className="w-5 h-5" />
              Call
            </a>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-whatsapp py-4 text-base justify-center"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
