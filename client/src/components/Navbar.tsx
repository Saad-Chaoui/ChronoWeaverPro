import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-2">
                  <i className="ri-time-line text-white"></i>
                </div>
                <span className="font-display font-bold text-xl">Chrono Weaver AI</span>
              </a>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-primary transition duration-200">
              How It Works
            </a>
            <a href="#features" className="text-gray-300 hover:text-primary transition duration-200">
              Features
            </a>
            <a href="#use-cases" className="text-gray-300 hover:text-primary transition duration-200">
              Use Cases
            </a>
            <a href="#demo" className="text-gray-300 hover:text-primary transition duration-200">
              Demo
            </a>
          </div>
          
          <div className="hidden md:flex items-center">
            <a href="#" className="gradient-border">
              <div className="bg-background px-5 py-2 rounded-md font-semibold hover:bg-card transition-all duration-300">
                Get Early Access
              </div>
            </a>
          </div>
          
          <div className="flex md:hidden items-center">
            <button 
              type="button" 
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <i className={`ri-${mobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-card border-b border-gray-800 transition-all duration-300 ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#how-it-works" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#features" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#use-cases" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            Use Cases
          </a>
          <a 
            href="#demo" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            Demo
          </a>
          <a 
            href="#" 
            className="block px-3 py-2 rounded-md text-base font-medium text-primary border border-primary mt-3 text-center"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
