import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Is FinEase really free?",
            answer: "Yes! FinEase is completely free to use with unlimited transactions, reports, and core features. We also plan to offer premium features in the future for advanced users.",
        },
        {
            question: "Is my financial data secure?",
            answer: "Absolutely. We use bank-level 256-bit SSL encryption to protect your data. Your information is stored securely in the cloud and we never share or sell your data to third parties.",
        },
        {
            question: "Can I access FinEase on mobile devices?",
            answer: "Yes! FinEase is fully responsive and works beautifully on all devices - desktop, tablet, and mobile phones. You can manage your finances on the go.",
        },
        {
            question: "How do I categorize my transactions?",
            answer: "When adding a transaction, simply select or create a category. You can customize categories to match your spending habits and view reports broken down by category.",
        },
        {
            question: "Can I export my financial data?",
            answer: "Currently, you can view and manage all your data within FinEase. Export features (CSV, PDF) will be available in our upcoming Premium plan.",
        },
        {
            question: "Do I need to link my bank account?",
            answer: "No! FinEase doesn't require bank account linking. You manually add your transactions, giving you complete control and privacy over your financial data.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you have complete control over your data. You can delete your account anytime from your profile settings. All your data will be permanently removed.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-base-200">
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
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-base-200/50 transition-colors duration-200"
                            >
                                <span className="text-lg font-semibold text-base-content pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <div className="px-6 pb-6 pt-2">
                                    <p className="text-base-content/70 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
