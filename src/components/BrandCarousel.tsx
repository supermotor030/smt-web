import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GiCarWheel } from 'react-icons/gi'
import useReducedMotion from '../hooks/useReducedMotion'

// Brand logos with SVG components
const BrandLogo = ({ name }) => {
  const logos = {
    Toyota: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#EB0A1E" d="M88.1 23.3c-1.4 0-2.7.3-3.8.9v-8.7h-4.3v18.9c0 .5 0 1.1.1 1.6 2.1 1.2 4.5 1.9 7.1 1.9 7.5 0 13.6-5.5 13.6-12.3S95.6 23.3 88.1 23.3zm-.9 20.3c-1.8 0-3.4-.4-4.8-1.1v-14c1.1-.6 2.4-.9 3.8-.9 5.5 0 9.9 4 9.9 8.9s-4.4 9.1-9.9 9.1zm-24.7-20.3c-7.5 0-13.6 5.5-13.6 12.3s6.1 12.3 13.6 12.3c7.5 0 13.6-5.5 13.6-12.3s-6.1-12.3-13.6-12.3zm0 20.6c-5.5 0-9.9-4-9.9-8.9s4.4-8.9 9.9-8.9 9.9 4 9.9 8.9-4.4 8.9-9.9 8.9zm-24.8-20.6c-2.6 0-5 .7-7.1 1.9-.1-.5-.1-1.1-.1-1.6V14.7h-4.3v8.7c-1.1-.6-2.4-.9-3.8-.9-7.5 0-13.6 5.5-13.6 12.3s6.1 12.3 13.6 12.3c2.6 0 5-.7 7.1-1.9.1.5.1 1.1.1 1.6v1.1h4.3v-1.1c0-.5 0-1.1-.1-1.6 2.1 1.2 4.5 1.9 7.1 1.9 7.5 0 13.6-5.5 13.6-12.3s-6.1-12.3-13.6-12.3zm-11.8 20.3c-1.8 0-3.4-.4-4.8-1.1v-14c1.1-.6 2.4-.9 3.8-.9 5.5 0 9.9 4 9.9 8.9s-4.4 9.1-9.9 9.1zm11.8 0c-5.5 0-9.9-4-9.9-8.9s4.4-8.9 9.9-8.9 9.9 4 9.9 8.9-4.4 8.9-9.9 8.9z" />
        <ellipse fill="#EB0A1E" cx="142.5" cy="16.1" rx="11.5" ry="11.1" />
        <ellipse fill="#EB0A1E" cx="168.7" cy="16.1" rx="11.5" ry="11.1" />
        <path fill="#EB0A1E" d="M155.6 5c-12.6 0-22.8 9.2-22.8 20.6s10.2 20.6 22.8 20.6 22.8-9.2 22.8-20.6S168.2 5 155.6 5zm0 37.2c-10.4 0-18.8-7.4-18.8-16.6s8.4-16.6 18.8-16.6 18.8 7.4 18.8 16.6-8.4 16.6-18.8 16.6z" />
      </svg>
    ),
    Honda: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#CC0000" d="M96 5C73.9 5 56 22.9 56 45s17.9 40 40 40 40-17.9 40-40S118.1 5 96 5zm0 76c-19.9 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z" />
        <path fill="#CC0000" d="M116.5 28.5h-8.3V45h-24.4V28.5h-8.3V61.5h8.3V52h24.4v9.5h8.3z" />
      </svg>
    ),
    Nissan: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#C3002F" d="M96 10L56 25v25l40 15 40-15V25L96 10zm32 37.5l-32 12-32-12V27.5l32-12 32 12v20z" />
        <path fill="#C3002F" d="M88 25v25l-16-6V19l16 6zm16 0l16 6v25l-16-6V25z" />
      </svg>
    ),
    Suzuki: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#E30613" d="M96 15c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 56c-14.3 0-26-11.7-26-26s11.7-26 26-26 26 11.7 26 26-11.7 26-26 26z" />
        <path fill="#E30613" d="M110 35h-8v-5h-12v5h-8v10h8v5h12v-5h8V35zm-12 10h-4v-5h4v5z" />
      </svg>
    ),
    Mitsubishi: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#E60012" d="M96 15l-20 17.3L96 50l20-17.7L96 15zm0 6.9l13.3 11.5L96 45l-13.3-11.6L96 21.9z" />
        <path fill="#E60012" d="M76 32.3L96 15 116 32.3 96 50 76 32.3zm6.7 0L96 43.1l13.3-10.8L96 21.9 82.7 32.3z" />
      </svg>
    ),
    Mazda: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#000" d="M96 15c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm0 56c-14.3 0-26-11.7-26-26s11.7-26 26-26 26 11.7 26 26-11.7 26-26 26z" />
        <path fill="#000" d="M96 25c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 36c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" />
        <path fill="#000" d="M96 33v24l12-12-12-12z" />
      </svg>
    ),
    BMW: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <circle fill="#fff" cx="96" cy="45" r="28" />
        <circle fill="none" stroke="#000" strokeWidth="2" cx="96" cy="45" r="28" />
        <path fill="#0066B1" d="M96 17v28h28c0-15.5-12.5-28-28-28z" />
        <path fill="#fff" d="M96 17c-15.5 0-28 12.5-28 28h28V17z" />
        <path fill="#0066B1" d="M68 45h28v28c-15.5 0-28-12.5-28-28z" />
        <path fill="#fff" d="M96 45v28c15.5 0 28-12.5 28-28H96z" />
      </svg>
    ),
    Mercedes: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <circle fill="none" stroke="#00ADEF" strokeWidth="2" cx="96" cy="45" r="28" />
        <path fill="#00ADEF" d="M96 20v25l21.7 12.5c-5.5 9.5-15.8 16-27.7 16s-22.2-6.5-27.7-16L96 45V20z" />
        <path fill="#00ADEF" d="M96 20l-21.7 37.5c11 6.4 24.4 6.4 35.4 0L96 20z" />
      </svg>
    ),
    Audi: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <g fill="none" stroke="#BB0A30" strokeWidth="2">
          <circle cx="60" cy="45" r="12" />
          <circle cx="84" cy="45" r="12" />
          <circle cx="108" cy="45" r="12" />
          <circle cx="132" cy="45" r="12" />
        </g>
      </svg>
    ),
    Volkswagen: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <circle fill="#001E50" cx="96" cy="45" r="28" />
        <circle fill="#fff" cx="96" cy="45" r="24" />
        <path fill="#001E50" d="M96 25l-8 20h16l-8-20zm-12 24l4-10h16l4 10H84z" />
      </svg>
    ),
    Hyundai: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <ellipse fill="none" stroke="#002C5F" strokeWidth="2.5" cx="96" cy="45" rx="32" ry="28" />
        <path fill="#002C5F" d="M76 30h8v30h-8V30zm32 0h8v30h-8V30zm-24 5v20c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V35H84z" />
      </svg>
    ),
    Kia: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <ellipse fill="#BB162B" cx="96" cy="45" rx="35" ry="30" />
        <path fill="#fff" d="M80 30h6v30h-6V30zm12 0h6l10 15V30h6v30h-6L98 45v15h-6V30zm22 0h6l8 12 8-12h6l-12 15 12 15h-6l-8-12-8 12h-6l12-15-12-15z" />
      </svg>
    ),
    TATA: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#6C2C91" d="M60 30h72v8H108v22h-8V38H60v-8z" />
        <path fill="#6C2C91" d="M88 42h16l-8 18-8-18z" />
      </svg>
    ),
    Mahindra: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#E2231A" d="M96 20L76 35v20l20 10 20-10V35L96 20zm16 32l-16 8-16-8V37l16-12 16 12v15z" />
        <path fill="#E2231A" d="M88 35v20l8 4 8-4V35l-8-6-8 6z" />
      </svg>
    ),
    Subaru: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <ellipse fill="#003D7E" cx="96" cy="45" rx="35" ry="30" />
        <g fill="#fff">
          <circle cx="96" cy="30" r="3" />
          <circle cx="82" cy="40" r="3" />
          <circle cx="110" cy="40" r="3" />
          <circle cx="88" cy="52" r="3" />
          <circle cx="104" cy="52" r="3" />
          <circle cx="96" cy="60" r="3" />
        </g>
      </svg>
    ),
    Isuzu: () => (
      <svg viewBox="0 0 192 50" className="w-full h-full">
        <path fill="#E2231A" d="M96 20L76 35v20l20 10 20-10V35L96 20zm0 6l16 12v16l-16 8-16-8V38l16-12z" />
        <rect fill="#E2231A" x="88" y="35" width="16" height="20" />
      </svg>
    ),
  }

  const LogoComponent = logos[name]
  return LogoComponent ? <LogoComponent /> : null
}

const brands = [
  { name: 'Toyota' },
  { name: 'Honda' },
  { name: 'Nissan' },
  { name: 'Suzuki' },
  { name: 'Mitsubishi' },
  { name: 'Mazda' },
  { name: 'BMW' },
  { name: 'Mercedes' },
  { name: 'Audi' },
  { name: 'Volkswagen' },
  { name: 'Hyundai' },
  { name: 'Kia' },
  { name: 'Mahindra' },
  { name: 'Subaru' },
  { name: 'Isuzu' },
  { name: 'TATA' },
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
          className="flex gap-0"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
          style={{ animationPlayState: 'running' }}
        >
          {/* Brand logos - duplicated for seamless loop */}
          {[1, 2].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 px-4 flex-shrink-0">
              {[
                { name: 'Toyota', file: 'toyota.png' },
                { name: 'Honda', file: 'honda.png' },
                { name: 'Nissan', file: 'nissan.png' },
                { name: 'Suzuki', file: 'suzuki.png' },
                { name: 'Mitsubishi', file: 'mitsubishi_real.png' },
                { name: 'Mazda', file: 'mazda.png' },
                { name: 'BMW', file: 'bmw.png' },
                { name: 'Mercedes', file: 'mercedes.png' },
                { name: 'Audi', file: 'audi.png' },
                { name: 'Volkswagen', file: 'volkswagen.png' },
              ].map((brand, idx) => (
                <div
                  key={`${setIndex}-${idx}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`/brands/${brand.file}`}
                    alt={brand.name}
                    className="w-full h-full object-contain filter grayscale brightness-110 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
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
            <span className="font-display text-3xl md:text-4xl text-ignition-500">15+</span>
            <p className="font-tech text-xs text-steel-400 uppercase tracking-wider mt-1">Brands Supported</p>
          </div>
          <div className="w-px bg-forge-700" />
          <div>
            <span className="font-display text-3xl md:text-4xl text-electric-500">10,000+</span>
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
