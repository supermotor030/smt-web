import { motion } from 'framer-motion'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { LuHeart, LuClock, LuMapPin, LuPhone, LuMail } from 'react-icons/lu'
import { company, contact, navLinks, products } from '../data/siteData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const footerLinks = {
    quickLinks: navLinks,
    products: products.slice(0, 6).map(p => ({
      label: p.name,
      href: '#products',
    })),
  }

  return (
    <footer className="bg-void relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-ignition-700 via-ignition-500 to-warning" />

      {/* Blueprint pattern background */}
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      {/* Gear watermark */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
        <img src="/logo.jpg" alt="" className="w-96 h-96 rounded-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <motion.a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/logo.jpg" 
                alt="Super Motor Trading" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-heading font-bold text-lg text-steel-100 block leading-tight">
                  SUPER MOTOR
                </span>
                <span className="font-tech text-xs text-ignition-500 tracking-widest">
                  TRADING
                </span>
              </div>
            </motion.a>
            
            <p className="text-steel-500 text-sm mb-6 max-w-xs leading-relaxed">
              Your trusted destination for genuine vehicle spare parts. Premium quality for all vehicle types.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <motion.a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-forge-800 flex items-center justify-center text-steel-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-forge-800 flex items-center justify-center text-steel-400 hover:bg-whatsapp hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-tech font-semibold text-sm text-steel-300 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-steel-500 hover:text-ignition-500 transition-colors font-tech text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-tech font-semibold text-sm text-steel-300 uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-steel-500 hover:text-ignition-500 transition-colors font-tech text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-tech font-semibold text-sm text-steel-300 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-steel-500 text-sm">
              <li className="flex items-start gap-2">
                <LuMapPin className="w-4 h-4 text-ignition-500 mt-0.5 flex-shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <LuPhone className="w-4 h-4 text-ignition-500 flex-shrink-0" />
                <a 
                  href={contact.callLink}
                  className="hover:text-ignition-500 transition-colors"
                >
                  {contact.storePhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <LuMail className="w-4 h-4 text-ignition-500 flex-shrink-0" />
                <a 
                  href={contact.emailLink}
                  className="hover:text-ignition-500 transition-colors break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2 mt-2 border-t border-forge-800">
                <LuClock className="w-4 h-4 text-ignition-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-steel-400 text-xs uppercase tracking-wider mb-1">Hours</span>
                  <span className="block">Mon-Sun: 9AM - 7PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forge-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-steel-600 text-sm font-tech">
            © {currentYear} {company.name}. All rights reserved.
          </p>
          
          <p className="text-steel-600 text-sm font-tech flex items-center gap-1">
            Built with <LuHeart className="w-4 h-4 text-ignition-600" /> in Sri Lanka
          </p>
        </div>
      </div>

      {/* Tire track pattern at very bottom */}
      <div className="h-8 bg-forge-950 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              #FF5500 10px,
              #FF5500 12px,
              transparent 12px,
              transparent 22px
            )`
          }}
        />
      </div>
    </footer>
  )
}
