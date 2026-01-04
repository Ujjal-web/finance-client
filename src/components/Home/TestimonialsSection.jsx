import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Freelance Designer",
            image: "https://i.pravatar.cc/150?img=5",
            rating: 5,
            text: "FinEase has completely transformed how I manage my freelance income. The visual reports help me understand my cash flow instantly!",
        },
        {
            name: "Michael Chen",
            role: "Small Business Owner",
            image: "https://i.pravatar.cc/150?img=12",
            rating: 5,
            text: "As a business owner, tracking expenses was a nightmare. FinEase made it simple and actually enjoyable. Highly recommend!",
        },
        {
            name: "Emily Rodriguez",
            role: "Software Engineer",
            image: "https://i.pravatar.cc/150?img=9",
            rating: 5,
            text: "The best finance tracker I've used. Clean interface, powerful features, and the insights have helped me save 30% more each month.",
        },
        {
            name: "David Thompson",
            role: "Marketing Manager",
            image: "https://i.pravatar.cc/150?img=13",
            rating: 5,
            text: "Finally, a finance app that doesn't overcomplicate things. FinEase is intuitive, beautiful, and gets the job done perfectly.",
        },
        {
            name: "Lisa Anderson",
            role: "Student",
            image: "https://i.pravatar.cc/150?img=10",
            rating: 5,
            text: "Managing my student budget became so much easier with FinEase. The category tracking helps me see exactly where my money goes.",
        },
        {
            name: "James Wilson",
            role: "Consultant",
            image: "https://i.pravatar.cc/150?img=14",
            rating: 5,
            text: "I've tried many finance apps, but FinEase stands out with its simplicity and powerful analytics. It's my go-to tool now.",
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
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what real users have to say about FinEase.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-base-200/50 backdrop-blur-sm border border-base-300 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-6 text-primary/20">
                                <Quote className="w-12 h-12" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-base-content/80 mb-6 leading-relaxed italic">
                                "{testimonial.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                />
                                <div>
                                    <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                                    <p className="text-sm text-base-content/60">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
