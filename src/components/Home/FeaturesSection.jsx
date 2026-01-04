import React from "react";
import { motion } from "framer-motion";
import { Wallet, BarChart3, Bell, Shield, TrendingUp, PieChart } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <Wallet className="w-8 h-8" />,
            title: "Smart Budgeting",
            description: "Set budgets and track spending in real-time with intelligent alerts and insights.",
            color: "primary",
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Visual Analytics",
            description: "Interactive charts and graphs make understanding your finances effortless.",
            color: "secondary",
        },
        {
            icon: <Bell className="w-8 h-8" />,
            title: "Smart Notifications",
            description: "Get timely alerts about spending patterns, budgets, and financial goals.",
            color: "accent",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Bank-Level Security",
            description: "Your financial data is protected with enterprise-grade encryption.",
            color: "primary",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Goal Tracking",
            description: "Set financial goals and monitor your progress with visual trackers.",
            color: "secondary",
        },
        {
            icon: <PieChart className="w-8 h-8" />,
            title: "Category Management",
            description: "Organize transactions by categories for better financial visibility.",
            color: "accent",
        },
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                        Powerful Features for
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Complete Control</span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Everything you need to manage your finances effectively, all in one place.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group bg-base-200/50 backdrop-blur-sm border border-base-300 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className={`bg-${feature.color}/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-base-content mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
