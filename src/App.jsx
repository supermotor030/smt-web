import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

// Critical Components (loaded immediately)
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import { AriaLiveProvider } from './components/ui/AriaLive'

// Lazy loaded components (below the fold)
const Stats = lazy(() => import('./components/Stats'))
const About = lazy(() => import('./components/About'))
const Products = lazy(() => import('./components/Products'))
const ProductModal = lazy(() => import('./components/ProductModal'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const ServiceGuarantees = lazy(() => import('./components/ServiceGuarantees'))
const Vehicles = lazy(() => import('./components/Vehicles'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const PriceQuoteCalculator = lazy(() => import('./components/PriceQuoteCalculator'))
const PartFinder = lazy(() => import('./components/PartFinder'))
const FAQ = lazy(() => import('./components/FAQ'))
const CTA = lazy(() => import('./components/CTA'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'))
const MobileCTABar = lazy(() => import('./components/MobileCTABar'))
const MobileBottomNav = lazy(() => import('./components/MobileBottomNav'))
const BackToTop = lazy(() => import('./components/BackToTop'))
const ParticleBackground = lazy(() => import('./components/ParticleBackground'))
const MechanicMascot = lazy(() => import('./components/MechanicMascot'))
const SeasonalEffects = lazy(() => import('./components/SeasonalEffects'))
const StructuredData = lazy(() => import('./components/seo/StructuredData'))

// Hooks
import useMediaQuery from './hooks/useMediaQuery'
import useScrollLock from './hooks/useScrollLock'
import useKonamiCode from './hooks/useKonamiCode'

// Loading fallback component - Using skeleton instead of spinner
const SectionLoader = ({ height = 'h-96' }) => (
  <div className={`${height} flex items-center justify-center bg-forge-900/50 content-visibility-auto`}>
    <div className="w-full max-w-4xl px-4 space-y-4">
      <div className="h-8 w-48 mx-auto bg-forge-800 rounded shimmer" />
      <div className="h-4 w-64 mx-auto bg-forge-800 rounded shimmer" />
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-forge-800 rounded-xl shimmer" />
        ))}
      </div>
    </div>
  </div>
)

SectionLoader.propTypes = {
  height: PropTypes.string,
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [turboMode, setTurboMode] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Custom hooks for cleaner code
  useScrollLock(isMobileMenuOpen)
  useKonamiCode(() => {
    document.body.style.setProperty('--animation-speed', '0.5')
    setTimeout(() => {
      document.body.style.setProperty('--animation-speed', '1')
    }, 10000)
  })

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

  return (
    <AriaLiveProvider>
      <div className={`relative ${turboMode ? 'turbo-mode' : ''}`}>
        {/* SEO Structured Data */}
        <Suspense fallback={null}>
          <StructuredData />
        </Suspense>

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
            <Suspense fallback={<SectionLoader />}>
              <Stats />
              <About />
              <Products onProductSelect={setSelectedProduct} />
              <WhyUs />
              <ServiceGuarantees />
              <Vehicles />
              <Testimonials />
              <PartFinder />
              <FAQ />
              <PriceQuoteCalculator />
              <CTA />
              <Contact />
            </Suspense>
          </main>

          {/* Footer */}
          <Suspense fallback={<SectionLoader height="h-48" />}>
            <Footer />
          </Suspense>

          {/* Product modal */}
          <AnimatePresence>
            {selectedProduct && (
              <Suspense fallback={null}>
                <ProductModal 
                  product={selectedProduct} 
                  onClose={() => setSelectedProduct(null)} 
                />
              </Suspense>
            )}
          </AnimatePresence>

          {/* Floating elements */}
          <Suspense fallback={null}>
            <WhatsAppButton />
            <MobileCTABar />
            <MobileBottomNav />
            <BackToTop />
            <MechanicMascot />
          </Suspense>

          {/* Turbo mode badge */}
          <AnimatePresence>
            {turboMode && (
              <div className="fixed top-4 right-4 bg-ignition-600 text-white px-4 py-2 rounded-full font-tech font-bold z-[100] animate-pulse" role="status" aria-live="polite">
                🏎️ TURBO MODE
              </div>
            )}
          </AnimatePresence>

          {/* Particle background for dark sections */}
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>

          {/* Seasonal effects (snow, fireworks, banners) */}
          <Suspense fallback={null}>
            <SeasonalEffects />
          </Suspense>
      </div>
    </AriaLiveProvider>
  )
}

export default App
