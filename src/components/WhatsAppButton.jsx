import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { contact } from '../data/siteData'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden lg:block"
          >
            <div className="bg-forge-900 text-white px-4 py-2 rounded-lg font-tech text-sm shadow-lg">
              Chat with us!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-forge-900 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 lg:w-16 lg:h-16 bg-whatsapp rounded-full flex items-center justify-center text-white shadow-whatsapp-glow"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
        }}
        transition={{ 
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7 lg:w-8 lg:h-8" />
        
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-whatsapp"
          animate={{
            scale: [1, 1.4, 1.4],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.a>
    </div>
  )
}
