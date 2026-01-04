import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";

const SecuritySection = () => {
    const securityFeatures = [
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Bank-Level Encryption",
            description: "Your data is protected with 256-bit SSL encryption, the same standard used by major financial institutions.",
        },
        {
            icon: <Lock className="w-10 h-10" />,
            title: "Secure Authentication",
            description: "Multiple authentication layers including password protection and Google OAuth integration.",
        },
        {
            icon: <Eye className="w-10 h-10" />,
            title: "Privacy First",
            description: "We never sell your data. Your financial information remains completely private and belongs only to you.",
        },
        {
            icon: <Database className="w-10 h-10" />,
            title: "Data Backup",
            description: "Automatic cloud backups ensure your financial records are never lost, even if you change devices.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
                        <span className="text-primary font-semibold">🔒 Security & Privacy</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                        Your Financial Data is
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Safe & Secure</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        We take security seriously. Your trust is our top priority, and we use industry-leading measures to protect your information.
                    </p>
                </motion.div>

                {/* Security Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {securityFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-base-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-base-content mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-2xl border border-primary/20"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                        <div className="bg-white/50 dark:bg-base-100 p-4 rounded-full">
                            <Shield className="w-12 h-12 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-base-content mb-2">
                                Trusted by Thousands
                            </h3>
                            <p className="text-base-content/70">
                                Join over 50,000 users who trust FinEase with their financial data. We're committed to maintaining the highest security standards.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SecuritySection;
