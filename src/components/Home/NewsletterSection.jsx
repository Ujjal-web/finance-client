import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import Swal from "sweetalert2";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            Swal.fire("Error", "Please enter a valid email address", "error");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            Swal.fire({
                icon: "success",
                title: "Successfully Subscribed!",
                text: "Thank you for subscribing to our newsletter. You'll receive updates about new features and tips.",
                confirmButtonText: "Great!",
            });
            setEmail("");
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Icon */}
                        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-10 h-10" />
                        </div>

                        {/* Text Content */}
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Subscribe to our newsletter and get the latest tips on personal finance, new features, and exclusive insights delivered to your inbox.
                        </p>

                        {/* Newsletter Form */}
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="input input-lg w-full bg-white/10 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/20"
                                    disabled={loading}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-8 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        Subscribe
                                        <Send className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Privacy Note */}
                        <p className="text-sm text-white/70 mt-6">
                            🔒 We respect your privacy. Unsubscribe anytime.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
