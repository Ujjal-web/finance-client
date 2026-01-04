import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            Swal.fire({
                icon: "success",
                title: "Message Sent!",
                text: "Thank you for contacting us. We'll get back to you within 24 hours.",
                confirmButtonText: "Great!",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
            setErrors({});
            setLoading(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            content: "ujjaldas827@gmail.com",
            link: "mailto:ujjaldas827@gmail.com",
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Phone",
            content: "+8801749-361101",
            link: "tel:+8801749361101",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Address",
            content: "Sylhet, Bangladesh",
            link: null,
        },
    ];

    return (
        <div className="bg-base-100 text-base-content min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-linear-to-br from-primary via-secondary to-accent text-primary-content overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <MessageCircle className="w-16 h-16 mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Get in Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-content/90 leading-relaxed">
                            Have questions or feedback? We'd love to hear from you. Our team is here to help!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-base-200 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-2">
                                    {info.title}
                                </h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="text-base-content/70 hover:text-primary transition-colors"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-base-content/70">{info.content}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                                Send Us a Message
                            </h2>
                            <p className="text-lg text-base-content/70">
                                Fill out the form below and we'll respond within 24 hours
                            </p>
                        </div>

                        <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Your Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`input input-bordered w-full focus:input-primary ${errors.name ? "input-error" : ""}`}
                                        disabled={loading}
                                    />
                                    {errors.name && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.name}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`input input-bordered w-full focus:input-primary ${errors.email ? "input-error" : ""}`}
                                        disabled={loading}
                                    />
                                    {errors.email && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.email}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Subject */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Subject</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className={`input input-bordered w-full focus:input-primary ${errors.subject ? "input-error" : ""}`}
                                        disabled={loading}
                                    />
                                    {errors.subject && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.subject}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Message</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        className={`textarea textarea-bordered h-32 focus:textarea-primary ${errors.message ? "textarea-error" : ""}`}
                                        disabled={loading}
                                    />
                                    {errors.message && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.message}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full rounded-full text-lg font-bold hover:scale-105 transition-transform duration-300"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Support Section */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto bg-linear-to-br from-primary via-secondary to-accent p-12 rounded-3xl text-primary-content text-center shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Need Immediate Help?
                        </h2>
                        <p className="text-xl text-primary-content/90 mb-8">
                            Check out our comprehensive FAQ section for quick answers to common questions.
                        </p>
                        <a
                            href="/#faq"
                            className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-none rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            View FAQ
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
