import { motion } from 'framer-motion'
import { FaFacebookF, FaWhatsapp } from 'react-icons/fa6'
import { LuHeart, LuClock, LuMapPin, LuPhone, LuMail, LuShield } from 'react-icons/lu'
import { company, contact, navLinks, products } from '../data/siteData'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
    products: products.slice(0, 5).map(p => ({
      label: p.name,
      href: '#products',
    })),
  }

  return (
    <footer className="bg-void relative overflow-hidden">
      {/* Top gradient line with glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ignition-500 to-transparent opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ignition-500 to-transparent blur-sm opacity-30" />

      {/* Deep Tech Background */}
      <div className="absolute inset-0 bg-[#08080c]" />

      {/* Blueprint Grid Pattern - More Subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,46,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,46,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />

      {/* Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-ignition-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-forge-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-14 lg:py-18">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">

            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <motion.a
                href="#home"
                onClick={(e) => scrollToSection(e, '#home')}
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-ignition-500/30 rounded-full blur-lg" />
                  <img
                    src="/logo.jpg"
                    alt="Super Motor Trading"
                    className="relative w-16 h-16 rounded-full object-cover border-2 border-ignition-600/50 shadow-lg"
                  />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-steel-100 block leading-tight">
                    SUPER MOTOR
                  </span>
                  <span className="font-tech text-xs text-ignition-500 tracking-wider">
                    TRADING
                  </span>
                </div>
              </motion.a>

              <p className="text-steel-400 text-sm mb-6 leading-relaxed max-w-[280px]">
                Sri Lanka's premier destination for genuine vehicle spare parts. Trusted by mechanics and workshops nationwide.
              </p>

              {/* Trust badge */}
              <div className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-lg px-3 py-2 mb-6 w-fit">
                <LuShield className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold text-success">100% Genuine Parts</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <motion.a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-forge-900 border border-forge-700 flex items-center justify-center text-steel-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: 5,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-forge-900 border border-forge-700 flex items-center justify-center text-steel-400 hover:bg-whatsapp hover:text-white hover:border-whatsapp transition-all"
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    rotate: -5,
                    boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-tech font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-4 bg-ignition-500 rounded" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-steel-400 hover:text-ignition-500 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-ignition-500 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-tech font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-4 bg-ignition-500 rounded" />
                Products
              </h4>
              <ul className="space-y-3">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-steel-400 hover:text-ignition-500 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-ignition-500 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-tech font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-4 bg-ignition-500 rounded" />
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-steel-400 group">
                  <LuMapPin className="w-4 h-4 text-ignition-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed">{contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <LuPhone className="w-4 h-4 text-ignition-500 flex-shrink-0" />
                  <a href={contact.callLink} className="text-steel-400 hover:text-ignition-500 transition-colors font-medium">
                    {contact.mobile}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <LuMail className="w-4 h-4 text-ignition-500 flex-shrink-0" />
                  <a href={contact.emailLink} className="text-steel-400 hover:text-ignition-500 transition-colors">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-tech font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-4 bg-ignition-500 rounded" />
                Business Hours
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <LuClock className="w-4 h-4 text-ignition-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-steel-200 block mb-1">Open 7 Days</span>
                    <span className="text-steel-400">9:00 AM - 7:00 PM</span>
                  </div>
                </div>
                <div className="bg-forge-900/50 border border-forge-700 rounded-lg p-3">
                  <p className="text-xs text-steel-500 leading-relaxed">
                    Same-day delivery available for Colombo & suburbs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forge-800/50 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-steel-500 text-sm">
              © {currentYear} <span className="text-steel-300 font-semibold">{company.name}</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-steel-500 hover:text-ignition-500 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-steel-500 hover:text-ignition-500 transition-colors">Terms of Service</a>
            </div>
            <p className="text-steel-500 text-sm flex items-center gap-1.5">
              Made with <LuHeart className="w-3.5 h-3.5 text-ignition-600 animate-pulse" /> in Sri Lanka
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-forge-950 via-ignition-600/20 to-forge-950" />
    </footer>
  )
}
