import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Truck, Package, Zap, Award, Clock, Users, Star, ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { contact, company } from '../data/siteData';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Static Background - Optimized for Safari */}
      <div className="absolute inset-0">
        {/* Main Background Image - Static for Safari performance */}
        <div
          className="absolute inset-0 bg-cover bg-center will-change-auto"
          style={{
            backgroundImage: `url('/hero-bg.png')`,
          }}
        />

        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />

        {/* Static Gradient Orbs - No blur for Safari performance */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)' }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center py-24 lg:py-32">

          {/* LEFT SIDE - 7 columns */}
          <div className="lg:col-span-7 space-y-8">

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-4 h-4 text-orange-500" />
                </motion.div>
                <span className="text-sm font-bold text-orange-400 tracking-widest uppercase">
                  Sri Lanka's #1 Parts Supplier
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
                <span className="block text-white">PRECISION</span>
                <span className="block relative">
                  <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                    SPARE PARTS
                  </span>
                  {/* Animated Underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 h-1.5 w-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                    style={{ transformOrigin: 'left center' }}
                  />
                </span>
                <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl mt-4 font-bold">
                  FOR EVERY VEHICLE
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed"
            >
              Experience <span className="text-white font-semibold">25+ years of industry expertise</span>.
              We deliver <span className="text-orange-500 font-semibold">100% genuine OEM & aftermarket parts</span> trusted by workshops and car enthusiasts across Sri Lanka.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA */}
              <a
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-xl font-bold text-white transition-all duration-300"
              >
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 shadow-xl shadow-green-600/30 group-hover:shadow-green-500/40 transition-shadow" />

                <span className="relative flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  INQUIRE NOW
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              {/* Secondary CTA */}
              <a
                href="#products"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-bold text-white transition-all duration-300 backdrop-blur-sm"
              >
                EXPLORE CATALOG
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/5"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck className="w-5 h-5 text-orange-500" />
                <span>Islandwide Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>Open 7 Days</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE - 5 columns */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-md"
            >
              {/* Glowing Background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/20 blur-3xl opacity-50" />

              {/* Stats Cards Container */}
              <div className="relative space-y-4">

                {/* Featured Card - Experience */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600/50 to-amber-500/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-orange-500/20 group-hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                            <Award className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Est. 2024</span>
                        </div>
                        <div className="text-5xl font-black bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                          25+
                        </div>
                        <div className="text-lg font-semibold text-white">Years Industry Experience</div>
                      </div>
                      <div className="hidden sm:block">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 rounded-full border-2 border-dashed border-orange-500/30 flex items-center justify-center"
                        >
                          <Zap className="w-6 h-6 text-orange-500" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">

                  {/* Genuine Parts */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-green-500/10 group-hover:border-green-500/30 rounded-xl p-5 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center mb-3 transition-colors">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-white">100%</div>
                      <div className="text-sm text-gray-500">Genuine Parts</div>
                    </div>
                  </motion.div>

                  {/* Parts Stock */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-blue-500/10 group-hover:border-blue-500/30 rounded-xl p-5 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center mb-3 transition-colors">
                        <Package className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-white">10K+</div>
                      <div className="text-sm text-gray-500">Parts in Stock</div>
                    </div>
                  </motion.div>

                  {/* Customers */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-purple-500/10 group-hover:border-purple-500/30 rounded-xl p-5 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mb-3 transition-colors">
                        <Users className="w-5 h-5 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold text-white">500+</div>
                      <div className="text-sm text-gray-500">Happy Customers</div>
                    </div>
                  </motion.div>

                  {/* Delivery */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-orange-500/10 group-hover:border-orange-500/30 rounded-xl p-5 transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 flex items-center justify-center mb-3 transition-colors">
                        <Truck className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold text-white">24hr</div>
                      <div className="text-sm text-gray-500">Fast Delivery</div>
                    </div>
                  </motion.div>

                </div>

                {/* Bottom Trust Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-[#111]/80 to-[#111]/80 border border-white/5 rounded-xl backdrop-blur-sm"
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-[#111] flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-semibold">4.9/5</span>
                    <span className="text-gray-500 ml-1">Customer Rating</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;