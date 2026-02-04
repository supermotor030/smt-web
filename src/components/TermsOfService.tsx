import { motion } from 'framer-motion'
import { LuArrowLeft, LuFileText } from 'react-icons/lu'
import { company, contact } from '../data/siteData'

export default function TermsOfService() {
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
                        <LuFileText className="w-8 h-8 text-ignition-500" />
                        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white">
                            Terms of Service
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
                            <h2 className="font-heading text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-steel-300 leading-relaxed">
                                By accessing or using the services of {company.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">2. Products and Services</h2>
                            <p className="text-steel-300 leading-relaxed mb-3">
                                {company.name} sells genuine and aftermarket vehicle spare parts. We strive to provide accurate product descriptions and pricing, but errors may occur. We reserve the right to correct any errors and update information without prior notice.
                            </p>
                            <ul className="list-disc list-inside text-steel-400 space-y-2">
                                <li>All prices are in Sri Lankan Rupees (LKR) unless otherwise stated</li>
                                <li>Prices are subject to change without notice</li>
                                <li>Product availability is subject to stock levels</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">3. Orders and Payment</h2>
                            <p className="text-steel-300 leading-relaxed mb-3">
                                When placing an order:
                            </p>
                            <ul className="list-disc list-inside text-steel-400 space-y-2">
                                <li>You confirm that the information provided is accurate</li>
                                <li>Payment must be made using accepted methods (cash, card, or bank transfer)</li>
                                <li>Orders are confirmed only after payment verification</li>
                                <li>We reserve the right to cancel orders if payment cannot be verified</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">4. Delivery</h2>
                            <p className="text-steel-300 leading-relaxed">
                                We offer islandwide delivery across Sri Lanka. Delivery times and charges vary based on location. Same-day delivery is available for Colombo and suburban areas for orders placed before 2 PM. We are not responsible for delays caused by courier services or circumstances beyond our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">5. Returns and Refunds</h2>
                            <p className="text-steel-300 leading-relaxed mb-3">
                                We offer a 7-day return policy under the following conditions:
                            </p>
                            <ul className="list-disc list-inside text-steel-400 space-y-2">
                                <li>Product must be unused and in original packaging</li>
                                <li>Original receipt or proof of purchase is required</li>
                                <li>Special order items may not be eligible for return</li>
                                <li>Refunds are processed within 5-7 business days</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">6. Warranty</h2>
                            <p className="text-steel-300 leading-relaxed">
                                OEM parts come with manufacturer's warranty. Aftermarket parts include our satisfaction guarantee covering manufacturing defects. Warranty does not cover damage caused by improper installation, misuse, or normal wear and tear.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                            <p className="text-steel-300 leading-relaxed">
                                {company.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products. Our liability is limited to the purchase price of the product.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-heading text-xl font-bold text-white mb-4">8. Contact Information</h2>
                            <p className="text-steel-300 leading-relaxed">
                                For questions about these Terms of Service, please contact us at:
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
