import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { LuArrowRight, LuChevronDown, LuShield, LuZap, LuClock } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiSpanner, GiGears, GiCarWheel } from 'react-icons/gi'
import { company, contact } from '../data/siteData'

export default function Hero() {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-void via-forge-900 to-void" />
      
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.4) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,119,255,0.3) 0%, transparent 70%)' }}
      />
      
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 lg:pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-ignition-600/20 to-transparent border border-ignition-600/30 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ignition-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ignition-500"></span>
                </span>
                <span className="font-tech text-sm text-ignition-400 tracking-wider">
                  YOUR TRUSTED AUTOMOTIVE PARTNER
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
              <h1 className="font-display leading-[0.9] tracking-tight">
                <span className="block text-steel-100 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  PRECISION
                </span>
                <span className="block gradient-text text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  ENGINEERED
                </span>
                <span className="block text-steel-100 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  EXCELLENCE
                </span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-ignition-600 via-ignition-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <GiGears className="w-5 h-5 text-ignition-500 animate-spin-slow" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-steel-400 text-lg lg:text-xl max-w-xl mb-8 leading-relaxed"
            >
              Sri Lanka's trusted source for <span className="text-ignition-500 font-semibold">genuine spare parts</span>. 
              Premium quality components for Japanese, European & Indian vehicles.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-whatsapp to-green-600 text-white font-tech font-bold uppercase tracking-wide rounded-xl overflow-hidden transition-all duration-300 hover:shadow-whatsapp-glow hover:scale-[1.02]"
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <FaWhatsapp className="w-5 h-5 relative z-10" />
                <span className="relative z-10">WhatsApp Now</span>
              </motion.a>

              <motion.a
                href="#products"
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-4 bg-transparent text-steel-100 font-tech font-bold uppercase tracking-wide rounded-xl border-2 border-steel-700 hover:border-ignition-600 overflow-hidden transition-all duration-300"
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-ignition-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <GiSpanner className="w-5 h-5 relative z-10 group-hover:text-ignition-500 transition-colors" />
                <span className="relative z-10 group-hover:text-ignition-500 transition-colors">Browse Parts</span>
                <LuArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-ignition-500" />
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { label: '100% Genuine', Icon: LuShield },
                { label: 'Expert Advice', Icon: LuZap },
                { label: 'Fast Service', Icon: LuClock },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-forge-800 border border-forge-600 flex items-center justify-center">
                    <item.Icon className="w-4 h-4 text-ignition-500" />
                  </span>
                  <span className="font-tech text-sm text-steel-400">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative aspect-square max-w-[450px] mx-auto">
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF5500" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#FF7A2E" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <circle cx="200" cy="200" r="190" fill="none" stroke="url(#ringGrad)" strokeWidth="2" strokeDasharray="30 20" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute inset-8 rounded-full border border-ignition-600/30"
                animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="absolute inset-16 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  >
                    <GiGears className="w-full h-full text-forge-700 opacity-30" />
                  </motion.div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.img 
                      src="/logo.jpg" 
                      alt="Super Motor Trading" 
                      className="w-28 h-28 rounded-full object-cover border-4 border-ignition-600/50 shadow-lg mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, delay: 1, type: 'spring' }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="text-center"
                    >
                      <div className="font-display text-3xl text-ignition-500 tracking-tight">5000+</div>
                      <div className="font-tech text-xs text-steel-500 tracking-widest">PARTS IN STOCK</div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {[
                { Icon: GiCarWheel, x: '-5%', y: '20%', delay: 0, size: 45 },
                { Icon: GiSpanner, x: '80%', y: '15%', delay: 0.2, size: 35 },
                { Icon: GiGears, x: '85%', y: '65%', delay: 0.4, size: 40 },
                { Icon: GiCarWheel, x: '0%', y: '70%', delay: 0.6, size: 50 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: item.x, top: item.y }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + item.delay, type: 'spring' }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    className="p-3 rounded-xl bg-forge-800/80 border border-forge-600 backdrop-blur-sm shadow-lg"
                  >
                    <item.Icon className="text-ignition-500" style={{ width: item.size, height: item.size }} />
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                className="absolute -top-2 right-[-40px]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="bg-forge-800/90 backdrop-blur-xl border border-ignition-600/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ignition-600 to-ignition-700 flex items-center justify-center">
                      <LuShield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-display text-xl text-ignition-400">100%</div>
                      <div className="font-tech text-xs text-steel-500">Genuine Parts</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-2 left-[-40px]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                <div className="bg-forge-800/90 backdrop-blur-xl border border-electric-600/30 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-600 to-electric-700 flex items-center justify-center">
                      <GiCarWheel className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-display text-xl text-electric-400">50+</div>
                      <div className="font-tech text-xs text-steel-500">Vehicle Brands</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <span className="font-tech text-xs text-steel-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <LuChevronDown className="w-6 h-6 text-ignition-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}