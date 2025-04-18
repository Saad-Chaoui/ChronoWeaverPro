import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function UseCasesSection() {
  const { ref, controls } = useScrollAnimation();
  
  const useCases = [
    {
      title: "Finance",
      description: "Predict market shifts, optimize investment portfolios, and identify emerging financial risks.",
      icon: "ri-bank-line",
      color: "primary",
      tags: ["Investment Strategy", "Risk Assessment", "Market Analysis"]
    },
    {
      title: "Technology",
      description: "Anticipate tech trends, plan product roadmaps, and identify disruptive innovations.",
      icon: "ri-code-s-slash-line",
      color: "secondary",
      tags: ["Innovation Planning", "Competitive Analysis", "Tech Adoption"]
    },
    {
      title: "Healthcare",
      description: "Forecast treatment outcomes, optimize resource allocation, and predict public health trends.",
      icon: "ri-heart-pulse-line",
      color: "accent",
      tags: ["Treatment Planning", "Resource Optimization", "Epidemiology"]
    },
    {
      title: "Manufacturing",
      description: "Optimize supply chains, predict maintenance needs, and anticipate material shortages.",
      icon: "ri-tools-line",
      color: "primary",
      tags: ["Supply Chain", "Predictive Maintenance", "Resource Planning"]
    },
    {
      title: "Retail",
      description: "Forecast consumer trends, optimize inventory, and plan targeted marketing campaigns.",
      icon: "ri-store-3-line",
      color: "secondary",
      tags: ["Demand Forecasting", "Inventory Management", "Consumer Insights"]
    },
    {
      title: "Urban Planning",
      description: "Model infrastructure needs, predict population shifts, and optimize resource allocation.",
      icon: "ri-building-4-line",
      color: "accent",
      tags: ["Infrastructure Planning", "Population Analysis", "Sustainability"]
    }
  ];
  
  return (
    <section id="use-cases" className="py-20 px-4 relative" ref={ref}>
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
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Industry <span className="gradient-text">Use Cases</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Chrono Weaver AI delivers powerful insights across a diverse range of industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div 
              key={index}
              className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-${useCase.color}/10`}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
            >
              <div className={`w-12 h-12 rounded-full bg-${useCase.color}/20 flex items-center justify-center mb-4`}>
                <i className={`${useCase.icon} text-2xl text-${useCase.color}`}></i>
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">{useCase.title}</h3>
              <p className="text-gray-300 mb-4">{useCase.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {useCase.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-background px-3 py-1 rounded-full text-xs font-medium text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
