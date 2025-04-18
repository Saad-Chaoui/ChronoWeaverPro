import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const { ref, controls } = useScrollAnimation();
  
  const features = [
    {
      title: "Predictive Insights",
      description: "Uncover hidden patterns and emerging opportunities before they become obvious to the market.",
      icon: "ri-lightbulb-flash-line",
      color: "primary",
      list: [
        "Trend analysis across multiple domains",
        "Signal detection from noise",
        "Probability-weighted outcomes"
      ]
    },
    {
      title: "Risk Mitigation",
      description: "Identify potential threats and develop robust contingency plans to navigate uncertainty.",
      icon: "ri-shield-check-line",
      color: "secondary",
      list: [
        "Early warning systems",
        "Scenario planning and stress testing",
        "Resilience optimization"
      ]
    },
    {
      title: "Opportunity Identification",
      description: "Discover untapped markets and emerging needs before your competition does.",
      icon: "ri-compass-discover-line",
      color: "accent",
      list: [
        "Market gap analysis",
        "Emerging consumer behavior insights",
        "Strategic pivot recommendations"
      ]
    }
  ];
  
  return (
    <section id="features" className="py-20 px-4 bg-card" ref={ref}>
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Powerful <span className="gradient-text">Features</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leverage our advanced AI capabilities to gain strategic advantages in an uncertain future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`bg-background rounded-xl overflow-hidden border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 hover:border-${feature.color}/50 group`}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className={`h-2 bg-${feature.color}`}></div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:bg-${feature.color}/30 transition-all duration-300`}>
                  <i className={`${feature.icon} text-2xl text-${feature.color}`}></i>
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                <ul className="mt-4 space-y-2">
                  {feature.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <i className={`ri-check-line text-${feature.color} mr-2 mt-0.5`}></i>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
