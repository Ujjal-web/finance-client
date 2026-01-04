import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const CTASection = () => {
    const { user } = useContext(AuthContext);

    return (
        <section className="py-20 bg-base-100 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-primary via-secondary to-accent p-12 md:p-16 rounded-3xl shadow-2xl text-white text-center relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="inline-block bg-white/20 p-4 rounded-full mb-6">
                                <Sparkles className="w-10 h-10" />
                            </div>

                            {/* Heading */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                                Ready to Take Control of Your Finances?
                            </h2>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of users who have transformed their financial lives with FinEase. Start your journey today!
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {user ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                                        >
                                            Go to Dashboard
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                        <Link
                                            to="/dashboard/add-transaction"
                                            className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-10 font-bold"
                                        >
                                            Add Transaction
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/register"
                                            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                                        >
                                            Get Started Free
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-10 font-bold"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-10 pt-8 border-t border-white/20">
                                <p className="text-white/80 text-sm">
                                    ✨ <span className="font-semibold">No credit card required</span> • Free forever • Cancel anytime
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
