import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuPhone, LuMenu, LuX } from 'react-icons/lu'
import { navLinks, contact } from '../data/siteData'
import OpenClosedStatus from './OpenClosedStatus'
// ThemeToggle removed - dark mode only
import useMediaQuery from '../hooks/useMediaQuery'

export default function Navbar({ onMenuToggle, isMenuOpen, onLogoClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navLinks.map(link => link.id)
      let foundActive = false

      // If at the very top, set home as active
      if (window.scrollY < 100) {
        setActiveSection('home')
        return
      }

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            foundActive = true
            break
          }
        }
      }

      // Default to home if no section found
      if (!foundActive) {
        setActiveSection('home')
      }
    }

    // Run on mount to set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 lg:py-5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav
        className={`
          mx-auto max-w-6xl rounded-2xl px-4 lg:px-6 py-3 lg:py-4
          transition-all duration-300
          ${scrolled
            ? 'bg-forge-900/95 backdrop-blur-[20px] shadow-lg border border-ignition-600/20'
            : 'bg-forge-900/80 backdrop-blur-[16px] border border-white/5'
          }
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              scrollToSection(e, '#home')
              onLogoClick?.()
            }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/logo.jpg"
              alt="Super Motor Trading"
              className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover transition-all duration-300 ${scrolled ? 'shadow-[0_0_15px_rgba(255,106,26,0.6)] ring-2 ring-ignition-500/30' : ''
                }`}
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm lg:text-base text-steel-100 tracking-wide leading-tight">
                SUPER MOTOR
              </span>
              <span className="font-tech text-[10px] lg:text-xs text-ignition-600 tracking-widest">
                TRADING
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          {isDesktop && (
            <div className="flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`
                        font-tech font-semibold text-sm uppercase tracking-wider
                        transition-colors duration-300 relative
                        ${activeSection === link.id
                          ? 'text-ignition-500'
                          : 'text-steel-400 hover:text-ignition-500'
                        }
                      `}
                    >
                      {link.label}
                      {activeSection === link.id && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ignition-600 rounded-full"
                          layoutId="activeNav"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Open/Closed Status */}
              <OpenClosedStatus compact />

              {/* Call CTA - Desktop Only */}
              <motion.a
                href={contact.callLink}
                className="btn-primary py-2 px-4 text-sm magnetic-btn hidden lg:flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LuPhone className="w-4 h-4" />
                <span className="hidden xl:inline">Call Now</span>
              </motion.a>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {!isDesktop && (
            <motion.button
              onClick={onMenuToggle}
              className="p-2 text-steel-100 hover:text-ignition-500 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <LuX className="w-6 h-6" />
                ) : (
                  <LuMenu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
