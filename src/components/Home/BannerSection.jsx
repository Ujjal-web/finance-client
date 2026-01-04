import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const BannerSection = ({ user }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const slides = [
        {
            title: user?.displayName
                ? `Welcome back, ${user.displayName}!`
                : "Your Money, Managed. Your Future, Secured.",
            description: "Take control of your finances — plan, track, and visualize your progress effortlessly with FinEase.",
            image: "https://images.pexels.com/photos/8353809/pexels-photo-8353809.jpeg",
            gradient: "from-primary via-secondary to-accent",
        },
        {
            title: "Track Every Transaction",
            description: "Monitor your spending with detailed transaction history and categorization. Stay on top of your financial goals.",
            image: "https://images.pexels.com/photos/7887807/pexels-photo-7887807.jpeg",
            gradient: "from-primary via-accent to-secondary",
        },
        {
            title: "Visualize Your Progress",
            description: "Get powerful insights with interactive charts and reports. Make informed decisions about your money.",
            image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg",
            gradient: "from-secondary via-primary to-accent",
        },
    ];

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlay, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlay(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlay(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlay(false);
    };

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.65,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative h-[65vh] min-h-[500px] max-h-[700px] overflow-hidden">
            {/* Slider Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient}`}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAtMTZjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTIwIDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek00IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wLTE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>

                    {/* Content Container */}
                    <div className="relative h-full flex items-center px-6 md:px-16 max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="text-primary-content z-10"
                            >
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                                    {slides[currentSlide].title}
                                </h1>

                                <p className="text-lg md:text-xl text-primary-content/90 leading-relaxed mb-8 max-w-lg">
                                    {slides[currentSlide].description}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    {user ? (
                                        <>
                                            <Link
                                                to="/dashboard/add-transaction"
                                                className="btn bg-base-100 text-primary border-none rounded-full shadow-lg hover:bg-base-200 hover:scale-105 transition-all duration-300"
                                            >
                                                Add Transaction
                                            </Link>
                                            <Link
                                                to="/dashboard/reports"
                                                className="btn btn-outline border-2 border-primary-content text-primary-content rounded-full hover:bg-base-100 hover:text-primary transition-all duration-300"
                                            >
                                                View Reports
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="btn bg-base-100 text-primary border-none rounded-full shadow-lg hover:bg-base-200 hover:scale-105 transition-all duration-300"
                                            >
                                                Get Started
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="btn btn-outline border-2 border-primary-content text-primary-content rounded-full hover:bg-base-100 hover:text-primary transition-all duration-300"
                                            >
                                                Sign Up Free
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </motion.div>

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                                className="hidden md:flex justify-center items-center"
                            >
                                <div className="relative">
                                    <img
                                        src={slides[currentSlide].image}
                                        alt="Finance dashboard"
                                        className="w-full max-w-lg rounded-2xl shadow-2xl border-4 border-white/20 object-cover"
                                    />
                                    {/* Decorative elements */}
                                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                {/* Previous Button */}
                <button
                    onClick={prevSlide}
                    className="btn btn-circle btn-sm bg-primary-content/20 backdrop-blur-sm border-primary-content/30 text-primary-content hover:bg-primary-content/30 transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Slide Indicators */}
                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? "w-8 bg-primary-content"
                                : "w-2 bg-primary-content/50 hover:bg-primary-content/70"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="btn btn-circle btn-sm bg-primary-content/20 backdrop-blur-sm border-primary-content/30 text-primary-content hover:bg-primary-content/30 transition-all duration-300"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Auto-play Toggle */}
                {/* <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className="btn btn-sm bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300 ml-2"
                    aria-label={isAutoPlay ? "Pause auto-play" : "Resume auto-play"}
                >
                    {isAutoPlay ? "⏸" : "▶"}
                </button> */}
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
            >
                <button
                    onClick={scrollToNextSection}
                    className="flex flex-col items-center gap-1 text-primary-content/90 hover:text-primary-content transition-colors duration-500 group"
                    aria-label="Scroll to next section"
                >
                    <span className="text-xs font-medium tracking-wide opacity-80">Explore More</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: "easeInOut",
                            repeatDelay: 0.3
                        }}
                    >
                        <ChevronDown size={20} className="group-hover:scale-105 transition-transform duration-300" />
                    </motion.div>
                </button>
            </motion.div>
        </section>
    );
};

export default BannerSection;