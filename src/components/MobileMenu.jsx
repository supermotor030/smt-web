import { motion } from 'framer-motion'
import { LuPhone } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { navLinks, contact } from '../data/siteData'
import OpenClosedStatus from './OpenClosedStatus'

export default function MobileMenu({ onClose }) {
  const scrollToSection = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    onClose()
  }

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <motion.div
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-void z-50 flex flex-col"
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Background particles (reduced) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-ignition-600/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col h-full pt-24 px-6 pb-8 relative z-10">
          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={itemVariants}
                  className="border-b border-white/5"
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block py-4 font-heading font-semibold text-2xl text-steel-100 hover:text-ignition-500 transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Bottom CTAs */}
          <motion.div
            className="space-y-3 mt-8"
            variants={itemVariants}
          >
            {/* Open/Closed Status */}
            <div className="mb-4">
              <OpenClosedStatus />
            </div>

            {/* Call Button */}
            <a
              href={contact.callLink}
              className="btn-primary w-full py-4 text-base"
            >
              <LuPhone className="w-5 h-5" />
              Call Now
            </a>

            {/* WhatsApp Button */}
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full py-4 text-base"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>

          {/* Address */}
          <motion.p
            className="text-steel-600 text-sm text-center mt-6"
            variants={itemVariants}
          >
            {contact.address}
          </motion.p>
        </div>
      </motion.div>
    </>
  )
}
