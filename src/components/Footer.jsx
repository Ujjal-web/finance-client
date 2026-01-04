import React from "react";
import { FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="relative bg-linear-to-r from-primary via-secondary to-primary dark:bg-neutral text-primary-content dark:text-neutral-content py-14 overflow-hidden dark:border-t dark:border-neutral-content/10 transition-colors duration-300">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

            <div className="relative container mx-auto px-6 flex flex-col items-center text-center gap-6">
                {/* Logo Section */}
                <div className="flex flex-col items-center gap-2">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
                        <span className="bg-base-100 text-primary dark:bg-primary dark:text-primary-content rounded-md px-2 py-1 text-xl font-bold shadow">
                            FE
                        </span>
                        FinEase
                    </Link>
                    <p className="text-primary-content/80 dark:text-neutral-content/70">
                        © {new Date().getFullYear()} FinEase — Personal Finance App
                    </p>
                </div>

                {/* Links Section */}
                <nav className="flex flex-wrap justify-center gap-6 text-primary-content/90 dark:text-neutral-content/80 font-medium text-sm mt-3">
                    <Link to="/about" className="hover:text-accent dark:hover:text-primary transition-colors duration-300">
                        About Us
                    </Link>
                    <Link to="/contact" className="hover:text-accent dark:hover:text-primary transition-colors duration-300">
                        Contact Us
                    </Link>
                    <Link to="/privacy" className="hover:text-accent dark:hover:text-primary transition-colors duration-300">
                        Privacy Policy
                    </Link>
                </nav>

                {/* Social Links */}
                <div className="flex justify-center gap-8 mt-6">
                    <a
                        href="https://x.com/"
                        aria-label="X (Twitter)"
                        className="hover:scale-110 transition-transform hover:text-accent dark:hover:text-primary duration-300"
                    >
                        <FaXTwitter className="w-6 h-6" />
                    </a>
                    <a
                        href="https://youtube.com"
                        aria-label="YouTube"
                        className="hover:scale-110 transition-transform hover:text-accent dark:hover:text-primary duration-300"
                    >
                        <FaYoutube className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        aria-label="Facebook"
                        className="hover:scale-110 transition-transform hover:text-accent dark:hover:text-primary duration-300"
                    >
                        <FaFacebookF className="w-6 h-6" />
                    </a>
                </div>


                <div className="w-3/4 border-t border-primary-content/20 dark:border-neutral-content/10 mt-8"></div>

                <p className="text-primary-content/70 dark:text-neutral-content/60 text-sm italic mt-3">
                    “Take control of your money, and your future will follow.”
                </p>
            </div>
        </footer>
    );
};

export default Footer;