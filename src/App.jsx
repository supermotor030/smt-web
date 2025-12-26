import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Components
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Products from './components/Products'
import ProductModal from './components/ProductModal'
import WhyUs from './components/WhyUs'
import Vehicles from './components/Vehicles'
import Testimonials from './components/Testimonials'
import PartFinder from './components/PartFinder'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import MobileCTABar from './components/MobileCTABar'
import BackToTop from './components/BackToTop'

// Hooks
import useMediaQuery from './hooks/useMediaQuery'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [turboMode, setTurboMode] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          document.body.style.setProperty('--animation-speed', '0.5')
          setTimeout(() => {
            document.body.style.setProperty('--animation-speed', '1')
          }, 10000)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Logo click easter egg
  useEffect(() => {
    if (logoClickCount >= 5) {
      setTurboMode(true)
      setTimeout(() => {
        setTurboMode(false)
        setLogoClickCount(0)
      }, 5000)
    }
  }, [logoClickCount])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <div className={`relative ${turboMode ? 'turbo-mode' : ''}`}>
      {/* Skip to main content link */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Custom cursor - desktop only */}
      {isDesktop && <CustomCursor />}

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
        onLogoClick={() => setLogoClickCount(prev => prev + 1)}
      />

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Products onProductSelect={setSelectedProduct} />
        <WhyUs />
        <Vehicles />
        <Testimonials />
        <PartFinder />
        <FAQ />
        <CTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Floating elements */}
      <WhatsAppButton />
      <MobileCTABar />
      <BackToTop />

      {/* Turbo mode badge */}
      <AnimatePresence>
        {turboMode && (
          <div className="fixed top-4 right-4 bg-ignition-600 text-white px-4 py-2 rounded-full font-tech font-bold z-[100] animate-pulse">
            🏎️ TURBO MODE
          </div>
        )}
      </AnimatePresence>

      {/* Particle background for dark sections */}
      <ParticleBackground />
    </div>
  )
}

export default App
