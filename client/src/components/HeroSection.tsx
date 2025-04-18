import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="neural-bg absolute inset-0 opacity-30"></div>
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]"></div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            <span>Navigate </span>
            <span className="gradient-text">Tomorrow</span>
            <span>, Today</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Harness the power of advanced AI to explore potential futures and build strategic pathways toward your ideal outcomes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="#demo" className="gradient-border glow-hover">
              <div className="bg-background px-8 py-3 rounded-md font-semibold text-lg hover:bg-card transition-all duration-300">
                Start Weaving
              </div>
            </a>
            <a href="#how-it-works" className="px-8 py-3 rounded-md font-semibold text-lg border border-gray-700 hover:border-primary transition-all duration-300">
              Learn More
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative mt-16 mx-auto max-w-5xl h-64 md:h-96 rounded-xl bg-card/60 backdrop-blur-sm border border-gray-800 overflow-hidden timeline-grid"
          variants={itemVariants}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Timeline visualization placeholder */}
            <div className="relative w-full px-8">
              <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
              
              {/* Timeline nodes */}
              <div className="absolute -top-3 left-[15%] w-7 h-7 rounded-full bg-muted border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              
              <div className="absolute -top-3 left-[40%] w-7 h-7 rounded-full bg-muted border-2 border-secondary flex items-center justify-center">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
              
              <div className="absolute -top-3 left-[65%] w-7 h-7 rounded-full bg-muted border-2 border-accent flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              
              <div className="absolute -top-3 left-[85%] w-7 h-7 rounded-full bg-muted border-2 border-white/30 flex items-center justify-center pulse-element">
                <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              </div>
              
              {/* Labels */}
              <div className="absolute top-8 left-[15%] transform -translate-x-1/2 text-center">
                <div className="text-primary font-semibold">Present</div>
                <div className="text-xs text-gray-400">Decision Point</div>
              </div>
              
              <div className="absolute top-8 left-[40%] transform -translate-x-1/2 text-center">
                <div className="text-secondary font-semibold">Scenario A</div>
                <div className="text-xs text-gray-400">+2 Years</div>
              </div>
              
              <div className="absolute top-8 left-[65%] transform -translate-x-1/2 text-center">
                <div className="text-accent font-semibold">Scenario B</div>
                <div className="text-xs text-gray-400">+5 Years</div>
              </div>
              
              <div className="absolute top-8 left-[85%] transform -translate-x-1/2 text-center">
                <div className="text-gray-300 font-semibold">Future</div>
                <div className="text-xs text-gray-400">+10 Years</div>
              </div>
              
              {/* Connecting lines */}
              <div className="absolute top-4 left-[15%] h-16 w-px bg-gradient-to-b from-primary to-transparent"></div>
              <div className="absolute top-4 left-[40%] h-16 w-px bg-gradient-to-b from-secondary to-transparent"></div>
              <div className="absolute top-4 left-[65%] h-16 w-px bg-gradient-to-b from-accent to-transparent"></div>
              <div className="absolute top-4 left-[85%] h-16 w-px bg-gradient-to-b from-white/30 to-transparent"></div>
              
              {/* Data points */}
              <div className="absolute top-40 left-0 w-full h-24">
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg"></div>
                <div className="absolute bottom-4 left-[10%] w-1 h-8 bg-primary/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[20%] w-1 h-12 bg-primary/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[30%] w-1 h-6 bg-secondary/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[40%] w-1 h-14 bg-secondary/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[50%] w-1 h-10 bg-secondary/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[60%] w-1 h-8 bg-accent/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[70%] w-1 h-12 bg-accent/40 rounded-full"></div>
                <div className="absolute bottom-4 left-[80%] w-1 h-5 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 left-[90%] w-1 h-9 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
