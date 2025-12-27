import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { LuArrowRight } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiSpanner } from 'react-icons/gi'

export default function HeroCTA({ itemVariants, whatsappLink, onCtaClick }) {
  const handleClick = () => {
    onCtaClick?.()
    // Allow default navigation to continue
  }

  return (
    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 mb-6 lg:mb-10">
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-whatsapp to-green-600 text-white font-tech font-bold uppercase tracking-wide text-sm sm:text-base rounded-xl overflow-hidden transition-all duration-300 hover:shadow-whatsapp-glow hover:scale-[1.02]"
        whileTap={{ scale: 0.98 }}
        aria-label="Contact us on WhatsApp"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" aria-hidden="true" />
        <FaWhatsapp className="w-5 h-5 relative z-10" aria-hidden="true" />
        <span className="relative z-10">WhatsApp Now</span>
      </motion.a>

      <motion.a
        href="#products"
        onClick={handleClick}
        className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-transparent text-steel-100 font-tech font-bold uppercase tracking-wide text-sm sm:text-base rounded-xl border-2 border-steel-700 hover:border-ignition-600 overflow-hidden transition-all duration-300"
        whileTap={{ scale: 0.98 }}
        aria-label="Browse our spare parts catalog"
      >
        <div className="absolute inset-0 bg-ignition-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" aria-hidden="true" />
        <GiSpanner className="w-5 h-5 relative z-10 group-hover:text-ignition-500 transition-colors" aria-hidden="true" />
        <span className="relative z-10 group-hover:text-ignition-500 transition-colors">Browse Parts</span>
        <LuArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform group-hover:text-ignition-500" aria-hidden="true" />
      </motion.a>
    </motion.div>
  )
}

HeroCTA.propTypes = {
  itemVariants: PropTypes.object.isRequired,
  whatsappLink: PropTypes.string.isRequired,
  onCtaClick: PropTypes.func,
}
