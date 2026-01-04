import React from "react";
import { motion } from "framer-motion";
import { UserPlus, ListPlus, BarChart2, Target } from "lucide-react";

const HowItWorksSection = () => {
    const steps = [
        {
            icon: <UserPlus className="w-10 h-10" />,
            step: "Step 1",
            title: "Create Your Account",
            description: "Sign up in seconds with email or Google. No credit card required.",
        },
        {
            icon: <ListPlus className="w-10 h-10" />,
            step: "Step 2",
            title: "Add Transactions",
            description: "Record your income and expenses quickly with our intuitive interface.",
        },
        {
            icon: <BarChart2 className="w-10 h-10" />,
            step: "Step 3",
            title: "Track & Analyze",
            description: "View beautiful charts and reports to understand your spending patterns.",
        },
        {
            icon: <Target className="w-10 h-10" />,
            step: "Step 4",
            title: "Achieve Your Goals",
            description: "Make informed decisions and reach your financial milestones faster.",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-base-200 to-base-300">
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
                        How It Works
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Get started in minutes and take control of your finances in 4 simple steps.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            className="relative"
                        >
                            {/* Connection Line (desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                            )}

                            {/* Card */}
                            <div className="relative bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 z-10">
                                <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white mx-auto">
                                    {step.icon}
                                </div>
                                <div className="badge badge-primary mb-4 mx-auto block w-fit">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-3 text-center">
                                    {step.title}
                                </h3>
                                <p className="text-base-content/70 text-center leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
