import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Shield, TrendingUp, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    const values = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security First",
            description: "Your financial data deserves the highest level of protection. We use bank-level encryption.",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "User-Centric",
            description: "Every feature is designed with you in mind. Simple, intuitive, and powerful.",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Transparency",
            description: "No hidden fees, no data selling. We're committed to honest, transparent practices.",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Innovation",
            description: "We continuously improve and add features based on user feedback and industry trends.",
        },
    ];

    const stats = [
        { value: "50,000+", label: "Active Users" },
        { value: "2020", label: "Founded" },
        { value: "$10M+", label: "Tracked" },
        { value: "4.9/5", label: "Rating" },
    ];

    return (
        <div className="bg-base-100 text-base-content">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary via-secondary to-accent text-primary-content overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            About FinEase
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-content/90 leading-relaxed">
                            Empowering everyone to take control of their financial future with simple, powerful tools.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-6">
                                <span className="text-primary font-semibold flex items-center gap-2">
                                    <Target className="w-5 h-5" />
                                    Our Mission
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-6">
                                Making Finance Management Accessible to Everyone
                            </h2>
                            <p className="text-lg text-base-content/70 leading-relaxed">
                                Founded in 2020, FinEase was born from a simple idea: personal finance doesn't have to be complicated.
                                We believe everyone deserves easy access to powerful financial tools without the complexity of traditional software.
                                Our platform combines simplicity with powerful analytics to help you make informed financial decisions.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-base-content/70 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                            >
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-base-content/70 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-br from-primary via-secondary to-accent text-primary-content">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <Award className="w-16 h-16 mx-auto mb-6" />
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Join Our Community
                        </h2>
                        <p className="text-xl text-primary-content/90 mb-8">
                            Experience the difference that simple, powerful finance management can make.
                        </p>
                        <Link
                            to="/register"
                            className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-none rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            Get Started Free
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
