import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Cookie, UserCheck, Globe, AlertCircle } from "lucide-react";

const PrivacyPolicy = () => {
    const lastUpdated = "January 1, 2026";

    const sections = [
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Information We Collect",
            content: `We collect information you provide directly to us when you create an account, add transactions, or use our services. This includes:
            • Email address and display name
            • Financial transaction data (income, expenses, categories)
            • Profile information and preferences
            • Usage data and analytics
            
            We do NOT collect or store your bank account credentials or payment card information.`,
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "How We Use Your Information",
            content: `Your information is used solely to provide and improve our services:
            • Deliver core finance management features
            • Generate personalized reports and insights
            • Send important service notifications
            • Improve user experience and platform performance
            • Provide customer support
            
            We will NEVER sell your personal data to third parties.`,
        },
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Data Security",
            content: `We take security seriously and use industry-standard measures to protect your data:
            • 256-bit SSL encryption for all data transmission
            • Encrypted data storage in secure cloud infrastructure
            • Regular security audits and updates
            • Access controls and authentication protocols
            • Automated backup systems
            
            While no system is 100% secure, we continuously work to maintain the highest security standards.`,
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Your Privacy Rights",
            content: `You have complete control over your data:
            • Access your personal data anytime
            • Export your transaction history
            • Correct or update your information
            • Delete your account and all associated data
            • Opt-out of non-essential communications
            
            To exercise these rights, visit your account settings or contact our support team.`,
        },
        {
            icon: <Cookie className="w-6 h-6" />,
            title: "Cookies and Tracking",
            content: `We use cookies and similar technologies to:
            • Maintain your login session
            • Remember your preferences (theme, language)
            • Analyze platform usage and performance
            • Improve user experience
            
            You can control cookie settings through your browser, though this may affect platform functionality.`,
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            title: "Third-Party Services",
            content: `We use trusted third-party services for:
            • Authentication (Google OAuth)
            • Cloud hosting (Firebase)
            • Analytics (anonymized usage data)
            
            These services have their own privacy policies and security measures. We carefully select partners who meet our security standards.`,
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "International Users",
            content: `FinEase is available globally. Your data may be stored and processed in the United States or other countries where our service providers operate. We ensure all data transfers comply with applicable privacy regulations.`,
        },
        {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "Changes to This Policy",
            content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or platform notification. Continued use of FinEase after policy updates constitutes acceptance of the changes.`,
        },
    ];

    return (
        <div className="bg-base-100 text-base-content min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-indigo-700 via-blue-700 to-indigo-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <Shield className="w-16 h-16 mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed mb-4">
                            Your privacy is our priority. We're committed to protecting your personal information.
                        </p>
                        <p className="text-indigo-200">
                            Last Updated: <span className="font-semibold">{lastUpdated}</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-12">
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                At FinEase, we understand that your financial data is sensitive and personal. This Privacy Policy explains how we collect, use, protect, and share your information when you use our platform. By using FinEase, you agree to the practices described in this policy.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-12 bg-base-200">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                                className="bg-base-100 p-8 rounded-2xl shadow-lg"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                        {section.title}
                                    </h2>
                                </div>
                                <p className="text-base-content/70 leading-relaxed whitespace-pre-line pl-16">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl mx-auto bg-linear-to-br from-primary via-secondary to-accent p-12 rounded-3xl text-white text-center shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Questions About Privacy?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            If you have any questions or concerns about our Privacy Policy, please don't hesitate to contact us.
                        </p>
                        <a
                            href="/contact"
                            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Contact Us
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
