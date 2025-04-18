import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DemoSection() {
  const { ref, controls } = useScrollAnimation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    industry: "",
    timeframe: "",
    disruptions: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerate = () => {
    // Validate form
    if (!formData.goal || !formData.industry || !formData.timeframe) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Show loading state
    setIsGenerating(true);
    setShowResults(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 2500);
    
    // Backend AI integration needed here. Connect to Gemini API using a secure backend process and API Key stored in secrets.
  };
  
  return (
    <section id="demo" className="py-20 px-4 bg-card" ref={ref}>
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">Timeline <span className="gradient-text">Explorer</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of Chrono Weaver AI through our interactive demo.
          </p>
        </div>
        
        <div className="bg-background rounded-xl border border-gray-800 overflow-hidden max-w-5xl mx-auto">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display font-semibold text-2xl mb-6">Define Your Scenario</h3>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">Strategic Goal</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="goal" 
                        name="goal" 
                        value={formData.goal}
                        onChange={handleInputChange}
                        className="w-full bg-card border border-gray-700 focus:border-primary rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300" 
                        placeholder="e.g., Market expansion, Cost reduction"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <i className="ri-focus-3-line text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                    <div className="relative">
                      <select 
                        id="industry" 
                        name="industry" 
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-card border border-gray-700 focus:border-secondary rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-300 appearance-none"
                      >
                        <option value="">Select an industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="energy">Energy</option>
                        <option value="education">Education</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300 mb-2">Time Horizon</label>
                    <div className="relative">
                      <select 
                        id="timeframe" 
                        name="timeframe" 
                        value={formData.timeframe}
                        onChange={handleInputChange}
                        className="w-full bg-card border border-gray-700 focus:border-accent rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 appearance-none"
                      >
                        <option value="">Select timeframe</option>
                        <option value="1">1 year</option>
                        <option value="3">3 years</option>
                        <option value="5">5 years</option>
                        <option value="10">10 years</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="disruptions" className="block text-sm font-medium text-gray-300 mb-2">Potential Disruptions</label>
                    <div className="relative">
                      <textarea 
                        id="disruptions" 
                        name="disruptions" 
                        rows={3} 
                        value={formData.disruptions}
                        onChange={handleInputChange}
                        className="w-full bg-card border border-gray-700 focus:border-primary rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300" 
                        placeholder="e.g., New technology, Regulatory changes, Market shifts"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <button 
                      type="button" 
                      onClick={handleGenerate}
                      className="w-full gradient-border glow-hover"
                    >
                      <div className="bg-background px-6 py-3 rounded-md font-semibold text-lg hover:bg-card transition-all duration-300 flex items-center justify-center">
                        <i className="ri-magic-line mr-2"></i> Generate Prediction
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              
              <div>
                <h3 className="font-display font-semibold text-2xl mb-6">Timeline Visualization</h3>
                <div className="bg-card h-[400px] rounded-lg border border-gray-700 flex items-center justify-center timeline-grid p-6">
                  {/* Initial state */}
                  {!isGenerating && !showResults && (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-background border border-gray-700 flex items-center justify-center mb-4">
                        <i className="ri-input-cursor-move text-3xl text-gray-400"></i>
                      </div>
                      <p className="text-gray-400">Fill in the form to generate<br />your future timeline prediction</p>
                    </div>
                  )}
                  
                  {/* Loading state */}
                  {isGenerating && (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4 mx-auto"></div>
                      <p className="text-primary">Analyzing data and generating scenarios...</p>
                    </div>
                  )}
                  
                  {/* Results state */}
                  {showResults && (
                    <div className="w-full h-full relative">
                      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
                        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
                      </div>
                      
                      {/* Timeline nodes */}
                      <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-primary flex items-center justify-center">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-primary font-semibold">Present</div>
                          <div className="text-xs text-gray-400 text-center">Current State</div>
                        </div>
                      </div>
                      
                      <div className="absolute top-1/4 left-[35%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-secondary flex items-center justify-center">
                          <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-secondary font-semibold">Pathway A</div>
                          <div className="text-xs text-gray-400 text-center">73% Probability</div>
                        </div>
                        {/* Connection line */}
                        <div className="absolute bottom-4 left-1/2 h-32 w-px bg-secondary/50"></div>
                      </div>
                      
                      <div className="absolute top-3/4 left-[35%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-accent flex items-center justify-center">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-accent font-semibold">Pathway B</div>
                          <div className="text-xs text-gray-400 text-center">27% Probability</div>
                        </div>
                        {/* Connection line */}
                        <div className="absolute top-4 left-1/2 h-20 w-px bg-accent/50"></div>
                      </div>
                      
                      <div className="absolute top-1/4 left-[65%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-secondary flex items-center justify-center">
                          <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-secondary font-semibold">Outcome A1</div>
                          <div className="text-xs text-gray-400 text-center">Growth +35%</div>
                        </div>
                        {/* Connection line */}
                        <div className="absolute bottom-4 left-1/2 h-32 w-px bg-secondary/50"></div>
                      </div>
                      
                      <div className="absolute top-3/4 left-[65%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-accent flex items-center justify-center">
                          <div className="w-3 h-3 bg-accent rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-accent font-semibold">Outcome B1</div>
                          <div className="text-xs text-gray-400 text-center">Growth +18%</div>
                        </div>
                        {/* Connection line */}
                        <div className="absolute top-4 left-1/2 h-20 w-px bg-accent/50"></div>
                      </div>
                      
                      <div className="absolute top-1/2 left-[90%] transform -translate-y-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-gray-600 flex items-center justify-center">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <div className="text-gray-300 font-semibold">Future State</div>
                          <div className="text-xs text-gray-400 text-center">Goal Achievement</div>
                        </div>
                      </div>
                      
                      {/* SVG connections */}
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <path d="M80,200 C150,150 250,150 280,100" stroke="rgba(10, 239, 255, 0.5)" strokeWidth="2" fill="none" />
                        <path d="M80,200 C150,250 250,250 280,300" stroke="rgba(255, 42, 109, 0.5)" strokeWidth="2" fill="none" />
                        <path d="M280,100 C320,100 380,100 520,200" stroke="rgba(10, 239, 255, 0.5)" strokeWidth="2" fill="none" />
                        <path d="M280,300 C320,300 380,300 520,200" stroke="rgba(255, 42, 109, 0.5)" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Analysis panel */}
                {showResults && (
                  <div className="mt-6">
                    <h4 className="font-display font-semibold text-xl mb-3">Analysis</h4>
                    <div className="bg-card rounded-lg border border-gray-700 p-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                          <h5 className="font-medium">Primary Trajectory</h5>
                        </div>
                        <p className="text-gray-300 text-sm pl-5">
                          This scenario indicates a 73% probability of achieving your goals within the specified timeframe, assuming moderate market disruption.
                        </p>
                        
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                          <h5 className="font-medium">Alternative Pathway</h5>
                        </div>
                        <p className="text-gray-300 text-sm pl-5">
                          An alternative scenario shows potential for accelerated growth if key technological adoption occurs in Q3.
                        </p>
                        
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                          <h5 className="font-medium">Risk Factors</h5>
                        </div>
                        <p className="text-gray-300 text-sm pl-5">
                          Primary risk vectors include regulatory changes (27% impact) and competitive landscape shifts (18% impact).
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <button type="button" className="text-primary flex items-center hover:text-white transition-colors">
                          <i className="ri-download-line mr-1"></i> Download Full Report
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
