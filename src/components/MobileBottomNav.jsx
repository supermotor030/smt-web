import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineHome, HiOutlineCube, HiOutlinePhone, HiOutlineChatBubbleLeftRight, HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { contact } from '../data/siteData'
import useMediaQuery from '../hooks/useMediaQuery'

const navItems = [
  { id: 'home', label: 'Home', icon: HiOutlineHome, href: '#' },
  { id: 'products', label: 'Parts', icon: HiOutlineCube, href: '#products' },
  { id: 'search', label: 'Search', icon: HiOutlineMagnifyingGlass, action: 'search' },
  { id: 'contact', label: 'Contact', icon: HiOutlinePhone, href: '#contact' },
  { id: 'chat', label: 'Chat', icon: HiOutlineChatBubbleLeftRight, action: 'whatsapp' },
]

export default function MobileBottomNav() {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showSearch, setShowSearch] = useState(false)

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home')
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (item) => {
    if (item.action === 'whatsapp') {
      window.open(contact.whatsappLink, '_blank')
    } else if (item.action === 'search') {
      setShowSearch(true)
    } else if (item.href) {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!isMobile) return null

  return (
    <>
      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forge-950/95 backdrop-blur-xl"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="flex flex-col items-center justify-center h-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-md">
                <h3 className="font-display text-2xl text-steel-100 mb-4 text-center">
                  Search Parts
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter part name or number..."
                    className="w-full bg-forge-800 border border-forge-600 rounded-xl px-4 py-4 text-steel-200 placeholder-steel-500 focus:outline-none focus:border-ignition-500 transition-colors text-lg"
                    autoFocus
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-ignition-500 text-white p-2 rounded-lg">
                    <HiOutlineMagnifyingGlass className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-steel-500 text-sm text-center mt-4">
                  Or browse our <a href="#products" className="text-ignition-500" onClick={() => setShowSearch(false)}>product categories</a>
                </p>
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="absolute top-6 right-6 text-steel-400 hover:text-white"
              >
                <HiOutlineXMark className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      >
        {/* Background blur */}
        <div className="absolute inset-0 bg-forge-900/95 backdrop-blur-xl border-t border-forge-700" />
        
        {/* Safe area padding for notched devices */}
        <div className="relative flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const isActive = item.href === '#' 
              ? activeSection === 'home' 
              : activeSection === item.href?.replace('#', '')
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-colors relative ${
                  isActive ? 'text-ignition-500' : 'text-steel-400'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-ignition-500/10 rounded-xl"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                
                <item.icon className={`w-6 h-6 mb-1 relative z-10 ${
                  isActive ? 'text-ignition-500' : ''
                }`} />
                <span className={`text-xs font-tech relative z-10 ${
                  isActive ? 'text-ignition-500' : ''
                }`}>
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}
