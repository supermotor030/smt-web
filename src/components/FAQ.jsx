import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LuPlus, LuMinus, LuMessageCircle } from 'react-icons/lu'
import { GiSpanner } from 'react-icons/gi'
import { faqs, contact } from '../data/siteData'
import { trackFAQInteraction } from '../utils/analytics'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const toggleFAQ = (index) => {
    const isOpening = openIndex !== index
    trackFAQInteraction(faqs[index].question, isOpening)
    setOpenIndex(openIndex === index ? null : index)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 lg:py-28 bg-snow relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GiSpanner className="w-5 h-5 text-ignition-600" />
            <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
              FAQ
            </span>
          </div>
          
          <h2 className="font-heading text-section font-bold text-forge-900 mb-4">
            FREQUENTLY ASKED{' '}
            <span className="gradient-text">QUESTIONS</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto"
        >
          {/* Manual-style container */}
          <div className="relative bg-white rounded-2xl shadow-card overflow-hidden">
            {/* Tab markers */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gray-50 border-l border-gray-100">
              {faqs.map((_, index) => (
                <div
                  key={index}
                  className={`absolute right-0 w-full h-8 transition-colors ${
                    openIndex === index ? 'bg-ignition-600' : 'bg-gray-200'
                  }`}
                  style={{ top: `${index * 20 + 5}%` }}
                />
              ))}
            </div>

            <div className="pr-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center gap-4 p-6 text-left transition-colors hover:bg-gray-50"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    {/* Wrench toggle icon */}
                    <motion.div
                      animate={{ rotate: openIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <GiSpanner className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-ignition-600' : 'text-steel-400'
                      }`} />
                    </motion.div>

                    <h3 className="font-heading font-semibold text-lg text-forge-900 flex-1">
                      {faq.question}
                    </h3>

                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      {openIndex === index ? (
                        <LuMinus className="w-5 h-5 text-ignition-600" />
                      ) : (
                        <LuPlus className="w-5 h-5 text-steel-400" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-16">
                          <p className="text-steel-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-steel-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <motion.a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LuMessageCircle className="w-5 h-5" />
              Chat with Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
