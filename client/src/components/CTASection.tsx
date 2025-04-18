import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CTASection() {
  const { ref, controls } = useScrollAnimation();
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert(`Thank you for joining the waitlist with email: ${email}`);
    setEmail("");
  };
  
  return (
    <section className="py-20 px-4 bg-card" ref={ref}>
      <motion.div 
        className="max-w-4xl mx-auto bg-background rounded-xl p-8 md:p-12 border border-gray-800 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="neural-bg absolute inset-0 opacity-10"></div>
          <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]"></div>
          <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Ready to <span className="gradient-text">Weave Your Future</span>?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join the waitlist today and be among the first to explore the potential futures for your organization.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-card border border-gray-700 focus:border-primary rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
            <button type="submit" className="gradient-border glow-hover whitespace-nowrap">
              <div className="bg-background px-6 py-3 rounded-md font-semibold hover:bg-card transition-all duration-300">
                Join Waitlist
              </div>
            </button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            No credit card required. Limited early access spots available.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
