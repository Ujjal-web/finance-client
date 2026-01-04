import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import BannerSection from "../components/Home/BannerSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import HowItWorksSection from "../components/Home/HowItWorksSection";
import StatisticsSection from "../components/Home/StatisticsSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import SecuritySection from "../components/Home/SecuritySection";
import FAQSection from "../components/Home/FAQSection";
import NewsletterSection from "../components/Home/NewsletterSection";
import CTASection from "../components/Home/CTASection";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-base-100 text-base-content">
            {/* 1. Banner Section - Hero slider with CTA */}
            <BannerSection user={user} />

            {/* 2. Features Section - Key features showcase */}
            <FeaturesSection />

            {/* 3. How It Works Section - Step-by-step process */}
            <HowItWorksSection />

            {/* 4. Statistics Section - Numbers showcase */}
            <StatisticsSection />

            {/* 5. Testimonials Section - User reviews */}
            <TestimonialsSection />

            {/* 6. Security Section - Trust & security features */}
            <SecuritySection />



            {/* 8. FAQ Section - Common questions */}
            <FAQSection />

            {/* 9. Newsletter Section - Email subscription */}
            <NewsletterSection />

            {/* 10. CTA Section - Final call-to-action */}
            <CTASection />
        </div>
    );
};

export default Home;