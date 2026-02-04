import { useState, useEffect, lazy, Suspense, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Product } from './types'

// Critical Components (loaded immediately)
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import NotFound from './components/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import { AriaLiveProvider } from './components/ui/AriaLive'

// Lazy loaded components (below the fold)
const Stats = lazy(() => import('./components/Stats'))
const About = lazy(() => import('./components/About'))
const Products = lazy(() => import('./components/Products'))
const ProductModal = lazy(() => import('./components/ProductModal'))
const WhyUs = lazy(() => import('./components/WhyUs'))
const ServiceGuarantees = lazy(() => import('./components/ServiceGuarantees'))
const BrandCarousel = lazy(() => import('./components/BrandCarousel'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FAQ = lazy(() => import('./components/FAQ'))
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
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))

// Hooks
import useMediaQuery from './hooks/useMediaQuery'
import useScrollLock from './hooks/useScrollLock'
import useKonamiCode from './hooks/useKonamiCode'

// Loading fallback component - Using skeleton instead of spinner
interface SectionLoaderProps {
    height?: string
}

const SectionLoader = ({ height = 'h-96' }: SectionLoaderProps): ReactNode => (
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

// Small loader for floating elements
const SmallLoader = (): ReactNode => (
    <div className="w-12 h-12 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-ignition-600 border-t-transparent rounded-full animate-spin" />
    </div>
)

function App(): ReactNode {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [logoClickCount, setLogoClickCount] = useState<number>(0)
    const [turboMode, setTurboMode] = useState<boolean>(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)')

    // Path handling for routing
    const pathname = window.location.pathname
    const isPrivacyPage = pathname === '/privacy'
    const isTermsPage = pathname === '/terms'
    const isLegalPage = isPrivacyPage || isTermsPage
    const isNotFound = pathname !== '/' && !isLegalPage

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
                {/* Render 404 page if path is not root and not legal page */}
                {isNotFound ? (
                    <NotFound />
                ) : isLegalPage ? (
                    // Render legal pages
                    <ErrorBoundary>
                        <Suspense fallback={<SectionLoader />}>
                            {isPrivacyPage && <PrivacyPolicy />}
                            {isTermsPage && <TermsOfService />}
                        </Suspense>
                    </ErrorBoundary>
                ) : (
                    <>
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
                            <ErrorBoundary>
                                <Suspense fallback={<SectionLoader />}>
                                    <Stats />
                                    <About />
                                    <Products onProductSelect={setSelectedProduct} />
                                    <WhyUs />
                                    <ServiceGuarantees />
                                    <BrandCarousel />
                                    <Testimonials />
                                    <FAQ />
                                    <Contact />
                                </Suspense>
                            </ErrorBoundary>
                        </main>

                        {/* Footer */}
                        <ErrorBoundary>
                            <Suspense fallback={<SectionLoader height="h-48" />}>
                                <Footer />
                            </Suspense>
                        </ErrorBoundary>

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
                        <ErrorBoundary>
                            <Suspense fallback={<SmallLoader />}>
                                <WhatsAppButton />
                                <MobileCTABar />
                                <MobileBottomNav />
                                <BackToTop />
                                <MechanicMascot />
                            </Suspense>
                        </ErrorBoundary>

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
                    </>
                )}
            </div>
        </AriaLiveProvider>
    )
}

export default App
