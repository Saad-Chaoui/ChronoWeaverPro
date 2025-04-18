import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import DemoSection from "@/components/DemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PreloaderAnimation from "@/components/PreloaderAnimation";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <PreloaderAnimation isLoading={loading} />
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen overflow-hidden"
        >
          <Navbar />
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <UseCasesSection />
          <DemoSection />
          <TestimonialsSection />
          <CTASection />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
