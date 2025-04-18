import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const { ref, controls } = useScrollAnimation();
  
  const testimonials = [
    {
      quote: "Chrono Weaver's predictive analytics helped us identify a key market shift 18 months before our competitors, giving us a substantial first-mover advantage.",
      name: "Sarah Chen",
      title: "Director of Strategy, TechFuture Inc.",
      color: "primary"
    },
    {
      quote: "The timeline explorer fundamentally changed how we approach strategic planning. We've optimized resource allocation and increased ROI by 23% in one year.",
      name: "Marcus Johnson",
      title: "CFO, Global Innovations",
      color: "secondary"
    },
    {
      quote: "Chrono Weaver's scenario modeling has been instrumental in helping us navigate regulatory uncertainty in emerging markets with remarkable confidence.",
      name: "Elena Rodriguez",
      title: "Head of Expansion, Meridian Group",
      color: "accent"
    }
  ];
  
  const companies = ["ACME Corp", "TechGlobal", "FutureX", "Innovatech", "NexGen"];
  
  return (
    <section className="py-20 px-4 relative" ref={ref}>
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
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Trusted <span className="gradient-text">Insights</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what leading organizations have achieved with Chrono Weaver AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className={`absolute -top-4 -left-4 text-5xl text-${testimonial.color} opacity-30`}>"</div>
              
              <p className="text-gray-300 italic mb-6">{testimonial.quote}</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mr-3">
                  <i className="ri-user-line text-xl text-gray-400"></i>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-6">Trusted by forward-thinking organizations</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="w-36 h-12 bg-gray-800 rounded flex items-center justify-center">
                <div className="text-gray-400 font-semibold">{company}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
