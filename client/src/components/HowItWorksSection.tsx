import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const { ref, controls } = useScrollAnimation();
  
  const stepsData = [
    {
      icon: "ri-input-method-line",
      step: "Step 1",
      title: "Input Data",
      description: "Define your goals, industry context, and potential disruptive factors.",
      color: "primary"
    },
    {
      icon: "ri-brain-line",
      step: "Step 2",
      title: "AI Analysis",
      description: "Our multimodal AI engine analyzes historical data and current trends.",
      color: "secondary"
    },
    {
      icon: "ri-timeline-line",
      step: "Step 3",
      title: "Visualize Timelines",
      description: "Review multiple potential future scenarios with detailed analysis.",
      color: "accent"
    },
    {
      icon: "ri-focus-3-line",
      step: "Step 4",
      title: "Refine & Explore",
      description: "Adjust parameters and iteratively refine future scenarios.",
      color: "gray-700"
    }
  ];
  
  return (
    <section id="how-it-works" className="py-20 px-4 relative" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="neural-bg absolute inset-0 opacity-20"></div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">How It <span className="gradient-text">Works</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chrono Weaver uses advanced AI to analyze patterns and generate strategic future pathways.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 relative">
          {/* Progress line connecting steps */}
          <div className="hidden md:block absolute top-24 left-1/2 h-1/2 w-3/4 -translate-x-1/2">
            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-30"></div>
          </div>
          
          {stepsData.map((step, index) => (
            <motion.div 
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 flex flex-col items-center text-center relative transform transition-all duration-500 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className={`w-16 h-16 rounded-full bg-${step.color === 'gray-700' ? 'gray-700' : step.color}/20 flex items-center justify-center mb-4`}>
                <i className={`${step.icon} text-3xl ${step.color === 'gray-700' ? 'text-gray-300' : `text-${step.color}`}`}></i>
              </div>
              <span className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-${step.color === 'gray-700' ? 'gray-700' : step.color} ${step.color === 'gray-700' ? 'text-gray-300' : 'text-background'} text-sm font-semibold px-3 py-1 rounded-full`}>
                {step.step}
              </span>
              <h3 className="font-display font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
