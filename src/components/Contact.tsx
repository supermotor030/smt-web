import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Suspense, lazy } from 'react'
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuClock,
  LuExternalLink,
  LuNavigation
} from 'react-icons/lu'
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa6'
import { contact } from '../data/siteData'
import OpenClosedStatus from './OpenClosedStatus'
import ContactForm from './ContactForm'

// Lazy load the map component
const StoreMap = lazy(() => import('./StoreMap'))

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const contactItems = [
    {
      icon: LuMapPin,
      title: 'Location',
      content: contact.address,
      action: {
        label: 'Get Directions',
        href: contact.mapsLink,
        icon: LuNavigation,
        external: true,
      },
    },
    {
      icon: LuPhone,
      title: 'Phone',
      content: (
        <>
          <span className="block">Store: {contact.storePhone}</span>
          <span className="block">Mobile: {contact.mobile}</span>
        </>
      ),
      action: {
        label: 'Call Now',
        href: contact.callLink,
        icon: LuPhone,
      },
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: contact.whatsapp,
      action: {
        label: 'Chat Now',
        href: contact.whatsappLink,
        icon: FaWhatsapp,
        external: true,
        className: 'hover:text-whatsapp hover:border-whatsapp',
      },
    },
    {
      icon: LuMail,
      title: 'Email',
      content: contact.email,
      action: {
        label: 'Send Email',
        href: contact.emailLink,
        icon: LuMail,
      },
    },
  ]

  return (
    <section id="contact" className="py-20 lg:py-28 bg-forge-900 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <LuMapPin className="w-5 h-5 text-ignition-600" />
            <span className="font-tech font-semibold text-sm text-ignition-600 uppercase tracking-wider">
              Contact Us
            </span>
          </div>

          <h2 className="font-heading text-section font-bold text-steel-100 mb-4">
            VISIT OUR{' '}
            <span className="gradient-text">WORKSHOP</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Left - Contact Cards */}
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-forge-800 rounded-xl p-5 text-white transition-all duration-300 hover:bg-forge-700 border border-forge-700"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ignition-600/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-ignition-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-tech font-bold text-sm text-steel-400 uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    <p className="text-steel-100 font-semibold text-base lg:text-lg mb-3 leading-relaxed">
                      {item.content}
                    </p>
                    {item.action && (
                      <a
                        href={item.action.href}
                        target={item.action.external ? '_blank' : undefined}
                        rel={item.action.external ? 'noopener noreferrer' : undefined}
                        className={`inline-flex items-center gap-2 text-sm font-tech font-bold text-white bg-ignition-600 hover:bg-ignition-700 px-4 py-2 rounded-lg transition-colors ${item.action.className || ''}`}
                      >
                        <item.action.icon className="w-4 h-4" />
                        {item.action.label}
                        {item.action.external && <LuExternalLink className="w-3 h-3" />}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Hours Card with Open/Closed Status */}
            <motion.div
              variants={itemVariants}
              className="bg-forge-800 rounded-xl p-5 text-white border border-forge-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ignition-600/20 flex items-center justify-center flex-shrink-0">
                  <LuClock className="w-6 h-6 text-ignition-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-tech font-bold text-sm text-steel-400 uppercase tracking-wider mb-2">
                    Business Hours
                  </h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-steel-300">Monday - Sunday</span>
                      <span className="text-steel-100 font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                  <OpenClosedStatus />
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-3">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-forge-800 border border-forge-700 flex items-center justify-center text-steel-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-forge-800 border border-forge-700 flex items-center justify-center text-steel-400 hover:bg-whatsapp hover:text-white hover:border-whatsapp transition-all duration-300"
                aria-label="Contact us on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right - Map and Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            {/* Interactive Map */}
            <Suspense fallback={
              <div className="h-[380px] rounded-2xl bg-forge-800 animate-pulse flex items-center justify-center">
                <div className="text-steel-400 font-tech">Loading map...</div>
              </div>
            }>
              <StoreMap />
            </Suspense>

            {/* Contact Form */}
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
