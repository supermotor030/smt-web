import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiCarWheel } from 'react-icons/gi'
import useReducedMotion from '../hooks/useReducedMotion'

// Brand logos - add your logo files to /public/brands/
// Supported formats: .jpg, .png, .svg, .webp
const brands = [
  { name: 'Toyota', logo: '/brands/toyota.jpg' },
  { name: 'Honda', logo: '/brands/honda.jpg' },
  { name: 'Nissan', logo: '/brands/nissan.jpg' },
  { name: 'Suzuki', logo: '/brands/suzuki.jpg' },
  { name: 'Mitsubishi', logo: '/brands/mitsubishi.jpg' },
  { name: 'Mazda', logo: '/brands/mazda.jpg' },
  { name: 'BMW', logo: '/brands/bmw.jpg' },
  { name: 'Mercedes', logo: '/brands/mercedes.jpg' },
  { name: 'Audi', logo: '/brands/audi.jpg' },
  { name: 'Volkswagen', logo: '/brands/volkswagen.jpg' },
  { name: 'Hyundai', logo: '/brands/hyundai.jpg' },
  { name: 'Kia', logo: '/brands/kia.jpg' },
  { name: 'TATA', logo: '/brands/tata.jpg' },
  { name: 'Mahindra', logo: '/brands/mahindra.jpg' },
  { name: 'Subaru', logo: '/brands/subaru.jpg' },
  { name: 'Isuzu', logo: '/brands/isuzu.jpg' },
]

// Duplicate for seamless loop
const duplicatedBrands = [...brands, ...brands]

export default function BrandCarousel() {
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="py-16 lg:py-20 bg-forge-950 overflow-hidden" aria-label="Supported vehicle brands">
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Label - matches About, Products, etc. */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiCarWheel className="w-5 h-5 text-ignition-500" />
            <span className="font-tech font-semibold text-sm text-ignition-500 uppercase tracking-wider">
              Trusted By Drivers
            </span>
          </div>
          
          {/* Headline - matches other sections */}
          <h2 className="font-heading text-section font-bold text-white leading-tight mb-4">
            PARTS FOR ALL{' '}
            <span className="gradient-text">MAJOR BRANDS</span>
          </h2>
          
          {/* Orange line - matches other sections */}
          <div className="w-20 h-1 bg-gradient-to-r from-ignition-600 to-ignition-400 rounded-full mx-auto" />
        </motion.div>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-forge-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-forge-950 to-transparent z-10" />

        {/* Scrolling track */}
        <motion.div
          className="flex gap-6 md:gap-8 py-4"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div 
                className="w-28 h-20 md:w-36 md:h-24 rounded-xl flex items-center justify-center bg-white border border-forge-700 transition-all duration-300 group-hover:border-ignition-500/50 group-hover:shadow-lg group-hover:shadow-ignition-500/20"
              >
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="w-20 h-14 md:w-24 md:h-16 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }}
                />
                <span 
                  className="hidden font-tech text-sm text-forge-800 uppercase tracking-wide group-hover:text-ignition-600"
                >
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 lg:px-8 mt-10"
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
          <div>
            <span className="font-display text-3xl md:text-4xl text-ignition-500">16+</span>
            <p className="font-tech text-xs text-steel-400 uppercase tracking-wider mt-1">Brands Supported</p>
          </div>
          <div className="w-px bg-forge-700" />
          <div>
            <span className="font-display text-3xl md:text-4xl text-electric-500">5000+</span>
            <p className="font-tech text-xs text-steel-400 uppercase tracking-wider mt-1">Parts Available</p>
          </div>
          <div className="w-px bg-forge-700" />
          <div>
            <span className="font-display text-3xl md:text-4xl text-success">100%</span>
            <p className="font-tech text-xs text-steel-400 uppercase tracking-wider mt-1">Genuine Quality</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
