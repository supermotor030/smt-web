import { motion } from 'framer-motion'
import { LuHouse, LuTriangleAlert } from 'react-icons/lu'
import { useEffect } from 'react'

export default function NotFound() {
    useEffect(() => {
        // Track 404 in analytics if available
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: '404 Not Found',
                page_location: window.location.href,
                page_path: window.location.pathname,
            })
        }
    }, [])

    const handleGoHome = () => {
        window.location.href = '/'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-void via-forge-900 to-forge-800 flex items-center justify-center px-4">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-ignition-600/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
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

            <motion.div
                className="max-w-2xl w-full text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 404 Number */}
                <motion.div
                    className="relative mb-8"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="font-display text-[12rem] md:text-[16rem] leading-none text-transparent bg-clip-text bg-gradient-to-br from-ignition-600 via-ignition-500 to-ignition-400 select-none">
                        404
                    </h1>
                    <motion.div
                        className="absolute inset-0 blur-3xl opacity-30"
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-ignition-600 to-ignition-400" />
                    </motion.div>
                </motion.div>

                {/* Alert Icon */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="bg-ignition-600/10 p-4 rounded-full border border-ignition-600/20">
                        <LuTriangleAlert className="w-12 h-12 text-ignition-500" />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-steel-100 mb-4 uppercase tracking-wider">
                        Page Not Found
                    </h2>
                    <p className="font-body text-steel-400 text-lg max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.button
                        onClick={handleGoHome}
                        className="btn-primary px-8 py-4 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LuHouse className="w-5 h-5" />
                        Return Home
                    </motion.button>

                    <motion.a
                        href="tel:+94704344855"
                        className="btn-secondary px-8 py-4 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Us
                    </motion.a>
                </motion.div>

                {/* Additional Help */}
                <motion.p
                    className="mt-12 text-steel-600 text-sm font-tech"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Need help finding parts? Call us at{' '}
                    <a href="tel:+94704344855" className="text-ignition-500 hover:text-ignition-400 transition-colors">
                        +94 70 434 4855
                    </a>
                </motion.p>
            </motion.div>
        </div>
    )
}
