import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const PricingSection = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started with personal finance tracking",
            features: [
                "Unlimited transactions",
                "Basic reports & analytics",
                "Category management",
                "Mobile responsive",
                "Email support",
            ],
            buttonText: "Get Started Free",
            buttonStyle: "btn-outline btn-primary",
            popular: false,
        },
        {
            name: "Premium",
            price: "$9.99",
            period: "/ month",
            description: "Advanced features for serious financial management",
            features: [
                "Everything in Free",
                "Advanced analytics & insights",
                "Goal tracking & budgeting",
                "Export to  CSV/PDF",
                "Priority support",
                "Custom categories",
                "Recurring transactions",
            ],
            buttonText: "Coming Soon",
            buttonStyle: "btn-primary",
            popular: true,
        },
        {
            name: "Business",
            price: "$29.99",
            period: "/ month",
            description: "For teams and small businesses",
            features: [
                "Everything in Premium",
                "Multi-user access",
                "Team collaboration",
                "Advanced reporting",
                "API access",
                "Dedicated support",
                "Custom integrations",
            ],
            buttonText: "Coming Soon",
            buttonStyle: "btn-outline btn-primary",
            popular: false,
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
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Start for free. Upgrade when you need more power. No hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative bg-base-200/50 backdrop-blur-sm border ${plan.popular ? "border-primary shadow-2xl scale-105" : "border-base-300"
                                } p-8 rounded-2xl hover:shadow-xl transition-all duration-300 ${!plan.popular && "hover:-translate-y-2"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-base-content mb-2">{plan.name}</h3>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-5xl font-extrabold text-base-content">{plan.price}</span>
                                <span className="text-base-content/60 ml-2">{plan.period}</span>
                            </div>

                            {/* Description */}
                            <p className="text-base-content/70 mb-6">{plan.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-base-content/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            {plan.name === "Free" ? (
                                <Link
                                    to="/register"
                                    className={`btn ${plan.buttonStyle} w-full rounded-full`}
                                >
                                    {plan.buttonText}
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className={`btn ${plan.buttonStyle} w-full rounded-full`}
                                >
                                    {plan.buttonText}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
