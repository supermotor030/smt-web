import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuPhone, LuClock } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiGears } from 'react-icons/gi'
import { contact } from '../data/siteData'

export default function CTA() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <section className="py-20 lg:py-28 bg-forge-900 relative overflow-hidden">
      {/* Checkered pattern borders */}
      <div className="absolute top-0 left-0 right-0 h-4 opacity-20">
        <div className="h-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #FF5500 0, #FF5500 20px, transparent 20px, transparent 40px)',
        }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 opacity-20">
        <div className="h-full" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 20px, #FF5500 20px, #FF5500 40px)',
        }} />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-ignition-600/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Rotating gear icon */}
          <motion.div
            className="inline-block mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative">
              <GiGears className="w-16 h-16 text-ignition-600" />
              <div className="absolute inset-0 blur-xl bg-ignition-600/30" />
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="font-heading text-section font-bold text-steel-100 mb-2">
            NEED THE RIGHT PART?
          </h2>
          <p className="font-heading text-2xl lg:text-3xl font-bold gradient-text mb-6">
            LET'S FIND IT TOGETHER.
          </p>

          {/* Trust badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LuClock className="w-4 h-4 text-success" />
            <span className="font-tech text-sm text-success font-semibold">
              Response within 5 minutes!
            </span>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp py-4 px-8 text-lg shadow-whatsapp-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 6px 20px rgba(37,211,102,0.4)',
                  '0 6px 30px rgba(37,211,102,0.6)',
                  '0 6px 20px rgba(37,211,102,0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaWhatsapp className="w-6 h-6" />
              WhatsApp Now
            </motion.a>

            <motion.a
              href={contact.callLink}
              className="btn-secondary py-4 px-8 text-lg border-ignition-600/50 text-steel-200 hover:border-ignition-500 hover:text-ignition-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LuPhone className="w-5 h-5" />
              Call Us
            </motion.a>
          </div>

          {/* Working hours reminder */}
          <p className="text-steel-500 text-sm mt-6 font-tech">
            Open 7 days a week • 9:00 AM - 7:00 PM
          </p>
        </motion.div>
      </div>
    </section>
  )
}
