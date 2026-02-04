import { motion } from 'framer-motion'
import { LuArrowLeft, LuShield } from 'react-icons/lu'
import { company, contact } from '../data/siteData'

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear()

    return (
        <div className="min-h-screen bg-void">
            {/* Header */}
            <header className="bg-forge-900 border-b border-forge-800">
                <div className="container mx-auto px-4 lg:px-8 py-6">
                    <motion.a
                        href="/"
                        className="inline-flex items-center gap-2 text-steel-400 hover:text-ignition-500 transition-colors font-tech mb-4"
                        whileHover={{ x: -5 }}
                    >
                        <LuArrowLeft className="w-5 h-5" />
                        Back to Home
                    </motion.a>
                    <div className="flex items-center gap-3">
                        <LuShield className="w-8 h-8 text-ignition-500" />
                        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">
                            Privacy Policy
                        </h1>
                    </div>
                    <p className="text-steel-400 mt-2 font-tech">
                        Last updated: January {currentYear}
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
                <div className="max-w-3xl mx-auto prose prose-invert prose-steel">
                    <div className="bg-forge-900/50 rounded-2xl p-8 lg:p-12 border border-forge-800 space-y-8">

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <p className="text-steel-300 leading-relaxed mb-3">
                                At {company.name}, we collect information you provide directly to us when you:
                            </p>
                            <ul className="list-disc list-inside text-steel-400 space-y-2">
                                <li>Make an inquiry about our products via WhatsApp, phone, or email</li>
                                <li>Place an order for spare parts</li>
                                <li>Subscribe to our newsletter</li>
                                <li>Contact us for customer support</li>
                            </ul>
                            <p className="text-steel-300 leading-relaxed mt-3">
                                This may include your name, phone number, email address, vehicle details, and delivery address.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <p className="text-steel-300 leading-relaxed mb-3">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside text-steel-400 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Communicate with you about products, services, and promotions</li>
                                <li>Provide customer support and respond to inquiries</li>
                                <li>Send you newsletter updates (if subscribed)</li>
                                <li>Improve our products and services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">3. Information Sharing</h2>
                            <p className="text-steel-300 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only with trusted delivery partners to fulfill your orders, or as required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">4. Data Security</h2>
                            <p className="text-steel-300 leading-relaxed">
                                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">5. Your Rights</h2>
                            <p className="text-steel-300 leading-relaxed">
                                You have the right to access, correct, or delete your personal information. You can also unsubscribe from our newsletter at any time. Contact us at {contact.email} for any privacy-related requests.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p className="text-steel-300 leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-forge-800 rounded-xl">
                                <p className="text-white font-semibold">{company.name}</p>
                                <p className="text-steel-400">{contact.address}</p>
                                <p className="text-steel-400">Email: {contact.email}</p>
                                <p className="text-steel-400">Phone: {contact.storePhone}</p>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    )
}
