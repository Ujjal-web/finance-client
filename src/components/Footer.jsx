import React from "react";
import { FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="relative bg-linear-to-br from-indigo-700 via-blue-700 to-indigo-900 text-white py-14 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]"></div>

            <div className="relative container mx-auto px-6 flex flex-col items-center text-center gap-6">
                {/* Logo Section */}
                <div className="flex flex-col items-center gap-2">
                    {/* Logo */}
                    <Link to="/" className="text-3xl font-extrabold tracking-wide flex items-center gap-2">
                        <span className="bg-white text-indigo-700 rounded-md px-2 py-1 text-xl font-bold shadow">
                            FE
                        </span>
                        FinEase
                    </Link>
                    <p className="text-white/80">
                        © {new Date().getFullYear()} FinEase — Personal Finance App
                    </p>
                </div>

                {/* Links Section */}
                <nav className="flex flex-wrap justify-center gap-6 text-white/80 font-medium text-sm mt-3">
                    <a href="#" className="hover:text-white transition">
                        Contact Us
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Terms & Conditions
                    </a>
                    <a href="#" className="hover:text-white transition">
                        Privacy Policy
                    </a>
                </nav>

                {/* Social Links */}
                <div className="flex justify-center gap-8 mt-6">
                    <a
                        href="https://x.com/"
                        aria-label="X (Twitter)"
                        className="hover:scale-110 transition-transform"
                    >
                        <FaXTwitter className="w-6 h-6 text-white/80 hover:text-white transition" />
                    </a>
                    <a
                        href="https://youtube.com"
                        aria-label="YouTube"
                        className="hover:scale-110 transition-transform"
                    >
                        <FaYoutube className="w-6 h-6 text-white/80 hover:text-white transition" />
                    </a>
                    <a
                        href="https://www.facebook.com/"
                        aria-label="Facebook"
                        className="hover:scale-110 transition-transform"
                    >
                        <FaFacebookF className="w-6 h-6 text-white/80 hover:text-white transition" />
                    </a>
                </div>


                <div className="w-3/4 border-t border-white/20 mt-8"></div>

                <p className="text-white/60 text-sm italic mt-3">
                    “Take control of your money, and your future will follow.”
                </p>
            </div>
        </footer>
    );
};

export default Footer;