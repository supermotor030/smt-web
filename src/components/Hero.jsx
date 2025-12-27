import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { contact } from '../data/siteData'
import useReducedMotion from '../hooks/useReducedMotion'
import { ANIMATION } from '../constants'

// Sub-components
import HeroBadge from './hero/HeroBadge'
import HeroHeading from './hero/HeroHeading'
import HeroCTA from './hero/HeroCTA'
import HeroFeatures from './hero/HeroFeatures'
import HeroVisual from './hero/HeroVisual'
import BlueprintGrid from './hero/BlueprintGrid'
import RacingStripes from './hero/RacingStripes'

export default function Hero() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [stripeTrigger, setStripeTrigger] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0])

  // Trigger racing stripes on CTA click
  const handleCTAClick = () => {
    setStripeTrigger(true)
    setTimeout(() => setStripeTrigger(false), 100)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : ANIMATION.STAGGER.DEFAULT, 
        delayChildren: prefersReducedMotion ? 0 : 0.2 
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0 : ANIMATION.DURATION.DEFAULT, 
        ease: ANIMATION.EASE.DEFAULT 
      },
    },
  }

  const handleScrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero section - Welcome to Super Motor Trading"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-void via-forge-900 to-void" aria-hidden="true" />
      
      {/* Blueprint grid background */}
      <BlueprintGrid />
      
      {/* Racing stripes effect */}
      <RacingStripes trigger={stripeTrigger} />
      
      {/* Decorative glows */}
      <div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,85,0,0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,119,255,0.3) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-24 lg:pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-4 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left"
          >
            <HeroBadge 
              text="YOUR TRUSTED AUTOMOTIVE PARTNER" 
              itemVariants={itemVariants} 
            />
            <HeroHeading itemVariants={itemVariants} />
            
            {/* Mobile visual - positioned between heading and CTA */}
            <div className="lg:hidden">
              <HeroVisual prefersReducedMotion={prefersReducedMotion} isMobile />
            </div>
            
            <HeroCTA 
              itemVariants={itemVariants} 
              whatsappLink={contact.whatsappLink}
              onCtaClick={handleCTAClick}
            />
            <HeroFeatures itemVariants={itemVariants} />
          </motion.div>

          {/* Right visual - Desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <HeroVisual prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReducedMotion ? 0 : 2 }}
      >
        <span className="font-tech text-xs text-steel-600 uppercase tracking-widest">Scroll</span>
        <motion.button
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={handleScrollToAbout}
          className="cursor-pointer p-2 hover:text-ignition-500 transition-colors"
          aria-label="Scroll to About section"
        >
          <LuChevronDown className="w-6 h-6 text-ignition-500" />
        </motion.button>
      </motion.div>
    </section>
  )
}