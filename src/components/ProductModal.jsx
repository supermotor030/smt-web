import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuX, LuPhone, LuMail, LuArrowRight, LuStar } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { contact } from '../data/siteData'

export default function ProductModal({ product, onClose }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleWhatsApp = () => {
    const message = `Hi! I'm looking for ${product.name}. Can you help me find the right parts?`
    window.open(`https://wa.me/94704344855?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-x-4 bottom-4 top-auto lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-50 max-h-[85vh] lg:max-h-[80vh] lg:w-full lg:max-w-2xl overflow-y-auto"
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div 
            className="relative p-6 lg:p-8"
            style={{ backgroundColor: `${product.color}10` }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-forge-900 transition-colors"
              aria-label="Close modal"
            >
              <LuX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: product.color }}
              >
                <product.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>

              <div>
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-forge-900">
                  {product.name}
                </h3>
                <p className="font-tech text-steel-600">
                  {product.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Description */}
            <p className="text-steel-600 mb-6">
              {product.description}. We stock a comprehensive range of high-quality parts to keep your vehicle running smoothly.
            </p>

            {/* Items list */}
            <div className="mb-6">
              <h4 className="font-tech font-semibold text-sm uppercase tracking-wider text-forge-900 mb-3">
                Available Parts
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="text-sm text-forge-800">{item}</span>
                    {product.popular?.includes(item) && (
                      <span className="ml-auto flex items-center gap-1 text-xs text-warning font-tech">
                        <LuStar className="w-3 h-3 fill-current" />
                        Popular
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <motion.button
                onClick={handleWhatsApp}
                className="w-full btn-whatsapp py-4 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp Now
                <LuArrowRight className="w-5 h-5 ml-auto" />
              </motion.button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contact.callLink}
                  className="btn-primary py-3 text-sm"
                >
                  <LuPhone className="w-4 h-4" />
                  Call Us
                </a>
                <a
                  href={contact.emailLink}
                  className="btn-secondary py-3 text-sm"
                >
                  <LuMail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
