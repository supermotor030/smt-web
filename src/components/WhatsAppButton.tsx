import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { LuX, LuMessageCircle, LuClock, LuSend } from 'react-icons/lu'
import { contact, company } from '../data/siteData'
import { trackWhatsAppClick } from '../utils/analytics'

const quickMessages = [
  { text: 'I need a spare part', icon: '🔧' },
  { text: 'Check part availability', icon: '📦' },
  { text: 'Get a price quote', icon: '💰' },
  { text: 'Vehicle inquiry', icon: '🚗' },
]

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const [showWidget, setShowWidget] = useState(false)

  // Delay showing the widget for better UX
  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleQuickMessage = (message) => {
    trackWhatsAppClick('quick_message', message)
    const encodedMessage = encodeURIComponent(`Hi! ${message}`)
    window.open(`${contact.whatsappLink}&text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  const handleCustomMessage = (e) => {
    e.preventDefault()
    if (customMessage.trim()) {
      trackWhatsAppClick('custom_message', customMessage)
      const encodedMessage = encodeURIComponent(customMessage)
      window.open(`${contact.whatsappLink}&text=${encodedMessage}`, '_blank')
      setCustomMessage('')
      setIsOpen(false)
    }
  }

  if (!showWidget) return null

  return (
    <div className="fixed bottom-6 right-4 lg:right-6 z-[9999] hidden lg:block">
      {/* Expanded Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-forge-900 rounded-2xl shadow-2xl overflow-hidden border border-forge-700"
          >
            {/* Header */}
            <div className="bg-whatsapp px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-white text-sm">{company.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-xs">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span>Typically replies instantly</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-forge-950">
              {/* Welcome Message */}
              <div className="bg-forge-800 rounded-lg rounded-tl-none p-3 mb-4">
                <p className="text-steel-300 text-sm">
                  👋 Hi there! How can we help you today? Select a quick option or type your message below.
                </p>
                <div className="flex items-center gap-1 mt-2 text-steel-500 text-xs">
                  <LuClock className="w-3 h-3" />
                  <span>Average response: &lt; 5 minutes</span>
                </div>
              </div>

              {/* Quick Messages */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickMessages.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickMessage(item.text)}
                    className="bg-forge-800 hover:bg-forge-700 border border-forge-600 rounded-lg p-3 text-left transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg mb-1 block">{item.icon}</span>
                    <span className="text-steel-300 text-xs font-tech group-hover:text-ignition-400 transition-colors">
                      {item.text}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Custom Message Input */}
              <form onSubmit={handleCustomMessage} className="flex gap-2">
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-forge-800 border border-forge-600 rounded-lg px-3 py-2 text-sm text-steel-200 placeholder-steel-500 focus:outline-none focus:border-ignition-500 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-whatsapp text-white p-2 rounded-lg hover:bg-whatsapp/90 transition-colors"
                  aria-label="Send message"
                >
                  <LuSend className="w-5 h-5" />
                </motion.button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-forge-900 border-t border-forge-700">
              <p className="text-steel-500 text-xs text-center">
                Powered by WhatsApp Business
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 lg:w-16 lg:h-16 bg-whatsapp rounded-full flex items-center justify-center text-white shadow-whatsapp-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          // Subtle shake animation every 5 seconds when closed
          x: isOpen ? 0 : [0, -3, 3, -3, 3, 0],
          rotate: isOpen ? 0 : [0, -5, 5, -5, 5, 0],
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          x: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          },
        }}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <LuX className="w-7 h-7 lg:w-8 lg:h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaWhatsapp className="w-7 h-7 lg:w-8 lg:h-8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring - only when closed */}
        {!isOpen && (
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
        )}

        {/* Notification badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-ignition-500 rounded-full flex items-center justify-center"
          >
            <LuMessageCircle className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}
