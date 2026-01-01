import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BannerSection = ({ user }) => {
    return (
        <section className="relative py-20 px-6 md:px-16 overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-blue-600 dark:bg-none dark:bg-base-200 text-white dark:text-base-content rounded-3xl shadow-xl">

            {/* <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div> */}

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-12 max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl"
                >
                    <h1 className="text-2xl md:text-5xl font-extrabold leading-tight mb-4 bg-linear-to-r from-white via-indigo-100 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">
                        {user?.displayName
                            ? `Welcome, ${user.displayName}!`
                            : "Your Money, Managed. Your Future, Secured."}
                    </h1>

                    <p className="text-lg md:text-xl text-indigo-100 leading-relaxed mb-8">
                        Take control of your finances — plan, track, and visualize your
                        progress effortlessly with <span className="font-semibold text-white">FinEase</span>.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {user ? (
                            <>
                                <Link
                                    to="/add-transaction"
                                    className="btn bg-white text-indigo-700 border-none rounded-full shadow-md hover:bg-indigo-100 transition-all duration-300"
                                >
                                    Add Transaction
                                </Link>
                                <Link
                                    to="/reports"
                                    className="btn btn-outline border-white text-white rounded-full hover:bg-white hover:text-indigo-700 transition-all duration-300"
                                >
                                    View Reports
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="btn bg-white text-indigo-700 border-none rounded-full shadow-md hover:bg-indigo-100 transition-all duration-300"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center md:justify-end"
                >
                    <div className="relative">
                        <img
                            src="https://images.pexels.com/photos/8353809/pexels-photo-8353809.jpeg"
                            alt="Finance dashboard"
                            className="w-[360px] md:w-[420px] lg:w-[480px] rounded-2xl shadow-2xl border-4 border-white/20"
                        />
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BannerSection;