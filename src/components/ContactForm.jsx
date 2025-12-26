import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LuSend, LuCheck, LuCircleAlert, LuLoader } from 'react-icons/lu'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Formspree form for Super Motor Trading
      const response = await fetch('https://formspree.io/f/mjgvkrrk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleBrand: formData.vehicleBrand,
          message: formData.message,
          _subject: `New inquiry from ${formData.name} - Super Motor Trading`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicleBrand: '',
          message: '',
        })
        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or contact us via WhatsApp.')
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputClasses = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-forge-900 font-body placeholder-steel-500 focus:outline-none focus:border-ignition-600 focus:ring-2 focus:ring-ignition-600/20 transition-all duration-300"
  const labelClasses = "block font-tech text-sm text-steel-600 uppercase tracking-wider mb-2"

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 lg:p-8 shadow-card border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-heading text-2xl font-bold text-forge-900 mb-6">
        Send Us a Message
      </h3>

      <div className="space-y-4">
        {/* Name & Phone Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+94 77 123 4567"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Email & Vehicle Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="vehicleBrand" className={labelClasses}>
              Vehicle Brand
            </label>
            <input
              type="text"
              id="vehicleBrand"
              name="vehicleBrand"
              value={formData.vehicleBrand}
              onChange={handleChange}
              placeholder="Toyota, Honda, BMW..."
              className={inputClasses}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClasses}>
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the parts you're looking for..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={`w-full py-4 rounded-xl font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
            status === 'success'
              ? 'bg-success text-white'
              : status === 'error'
              ? 'bg-error text-white'
              : 'bg-gradient-to-r from-ignition-700 via-ignition-600 to-ignition-400 text-white hover:shadow-orange-glow'
          }`}
          whileHover={status === 'idle' ? { scale: 1.02 } : {}}
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
        >
          {status === 'loading' ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <LuLoader className="w-5 h-5" />
              </motion.div>
              <span>Sending...</span>
            </>
          ) : status === 'success' ? (
            <>
              <LuCheck className="w-5 h-5" />
              <span>Message Sent!</span>
            </>
          ) : status === 'error' ? (
            <>
              <LuCircleAlert className="w-5 h-5" />
              <span>Try Again</span>
            </>
          ) : (
            <>
              <LuSend className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-error text-sm text-center font-tech"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Privacy Note */}
        <p className="text-xs text-steel-500 text-center">
          By submitting, you agree to our privacy policy. We'll never share your information.
        </p>
      </div>
    </motion.form>
  )
}
