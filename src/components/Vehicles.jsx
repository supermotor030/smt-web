import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuArrowRight, LuGlobe } from 'react-icons/lu'
import { GiCarWheel } from 'react-icons/gi'
import { vehicleBrands } from '../data/siteData'
import { trackBrandClick, trackWhatsAppClick } from '../utils/analytics'

// Brand logo mapping (lowercase for matching)
const brandLogos = {
  'toyota': '/brands/toyota.jpg',
  'honda': '/brands/honda.jpg',
  'nissan': '/brands/nissan.jpg',
  'suzuki': '/brands/suzuki.jpg',
  'mitsubishi': '/brands/mitsubishi.jpg',
  'mazda': '/brands/mazda.jpg',
  'subaru': '/brands/subaru.jpg',
  'isuzu': '/brands/isuzu.jpg',
  'bmw': '/brands/bmw.jpg',
  'mercedes-benz': '/brands/mercedes.jpg',
  'volkswagen': '/brands/volkswagen.jpg',
  'audi': '/brands/audi.jpg',
  'peugeot': '/brands/peugeot.jpg',
  'volvo': '/brands/volvo.jpg',
  'tata': '/brands/tata.jpg',
  'mahindra': '/brands/mahindra.jpg',
  'maruti suzuki': '/brands/suzuki.jpg',
  'hyundai': '/brands/hyundai.jpg',
  'kia': '/brands/kia.jpg',
}

// Custom colored icons for each region
const JapanIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1"/>
    <circle cx="12" cy="12" r="4" fill="#DC2626"/>
  </svg>
)

const EuroIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="10" fill="#003399"/>
    <g fill="#FFCC00">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <polygon
          key={i}
          points="12,4 12.5,6 14,6 13,7.5 13.5,9 12,8 10.5,9 11,7.5 10,6 11.5,6"
          transform={`rotate(${angle} 12 12)`}
          style={{ transformOrigin: '12px 12px' }}
        />
      ))}
    </g>
  </svg>
)

const IndiaIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="2" y="5" width="20" height="4.67" fill="#FF9933"/>
    <rect x="2" y="9.67" width="20" height="4.67" fill="#FFFFFF"/>
    <rect x="2" y="14.33" width="20" height="4.67" fill="#138808"/>
    <circle cx="12" cy="12" r="2" fill="#000080" fillOpacity="0.8"/>
  </svg>
)

// Icon mapping for regions
const regionIcons = {
  japanese: JapanIcon,
  european: EuroIcon,
  indian: IndiaIcon,
}

export default function Vehicles() {
  const [, setSelectedBrand] = useState(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand)
    trackBrandClick(brand)
    const message = `Hi! I need parts for my ${brand}. Can you help?`
    trackWhatsAppClick('brand_inquiry', message)
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  const regions = Object.entries(vehicleBrands)

  return (
    <section id="vehicles" className="py-20 lg:py-28 bg-forge-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      
      {/* Decorative Gears */}
      <div className="absolute top-10 left-10 opacity-10">
        <GiCarWheel className="w-32 h-32 text-ignition-500 animate-spin-slow" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <GiCarWheel className="w-24 h-24 text-ignition-500 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <LuGlobe className="w-5 h-5 text-ignition-500" />
            <span className="font-tech font-semibold text-sm text-ignition-500 uppercase tracking-wider">
              Global Coverage
            </span>
          </div>
          
          <h2 className="font-heading text-section font-bold text-white mb-4">
            PARTS FOR{' '}
            <span className="text-ignition-500">ALL MAJOR BRANDS</span>
          </h2>
          
          <p className="text-steel-400 max-w-2xl mx-auto">
            We stock genuine and aftermarket parts for Japanese, European, and Indian vehicles. 
            Click on any brand to inquire about parts availability.
          </p>
        </motion.div>

        {/* Brand Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {regions.map(([key, region]) => {
            const RegionIcon = regionIcons[key] || LuGlobe
            
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group relative bg-forge-800/50 backdrop-blur-sm rounded-2xl border border-steel-700/30 overflow-hidden hover:border-ignition-500/50 transition-all duration-500"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${region.gradient} p-6 relative overflow-hidden`}>
                  {/* Background Icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <RegionIcon className="w-24 h-24 text-white" />
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <RegionIcon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide">
                        {region.label}
                      </h3>
                      <p className="text-white/80 text-sm font-tech">
                        {region.brands.length} Brands
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {region.brands.map((brand) => {
                      const logoPath = brandLogos[brand.toLowerCase()]
                      return (
                        <motion.button
                          key={brand}
                          onClick={() => handleBrandClick(brand)}
                          className="group/brand flex flex-col items-center gap-1.5 sm:gap-2 p-2 rounded-xl bg-white border border-steel-600/20 transition-all duration-300 hover:border-ignition-500 hover:shadow-lg hover:shadow-ignition-500/20"
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {logoPath ? (
                            <div className="w-full h-10 sm:h-14 flex items-center justify-center p-1.5 sm:p-2">
                              <img 
                                src={logoPath}
                                alt={`${brand} logo`}
                                width={80}
                                height={48}
                                className="max-w-full max-h-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.nextSibling.style.display = 'flex'
                                }}
                              />
                              <span className="hidden text-forge-800 font-tech text-xs sm:text-sm font-semibold">
                                {brand}
                              </span>
                            </div>
                          ) : (
                            <div className="w-full h-10 sm:h-14 flex items-center justify-center">
                              <span className="text-forge-800 font-tech text-xs sm:text-sm font-semibold">
                                {brand}
                              </span>
                            </div>
                          )}
                          <span className="font-tech text-[10px] sm:text-xs text-forge-600 group-hover/brand:text-ignition-600 transition-colors pb-0.5 sm:pb-1 truncate max-w-full">
                            {brand}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ignition-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-steel-400 mb-4">
            Can't find your brand? We source parts for all makes and models!
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Us
            <LuArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
