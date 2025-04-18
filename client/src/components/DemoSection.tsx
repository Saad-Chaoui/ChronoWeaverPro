import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import TimelineVisualization from "./TimelineVisualization";

// Types for API response
interface TimelineScenario {
  name: string;
  probability: number;
  description: string;
  outcomes: {
    name: string;
    impact: string;
    description: string;
  }[];
  recommendations: string[];
}

interface TimelinePrediction {
  summary: string;
  scenarios: TimelineScenario[];
  insights: string[];
}

interface ApiResponse {
  message: string;
  status: string;
  prediction: TimelinePrediction;
}

export default function DemoSection() {
  const { ref, controls } = useScrollAnimation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictionData, setPredictionData] = useState<TimelinePrediction | null>(null);
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
  
  const handleGenerate = async () => {
    // Validate form
    if (!formData.goal || !formData.industry || !formData.timeframe) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Show loading state
    setIsGenerating(true);
    setShowResults(false);
    
    try {
      // Call the API to generate prediction
      const response = await apiRequest<ApiResponse>('/api/generate-prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Update state with the prediction data
      if (response.prediction) {
        setPredictionData(response.prediction);
        setIsGenerating(false);
        setShowResults(true);
        
        toast({
          title: "Success!",
          description: "Timeline prediction generated successfully",
        });
      } else {
        throw new Error("No prediction data received");
      }
    } catch (error) {
      console.error("Error generating prediction:", error);
      setIsGenerating(false);
      
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate timeline prediction. Please try again.",
        variant: "destructive"
      });
    }
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
                <TimelineVisualization 
                  prediction={showResults ? predictionData : null}
                  isLoading={isGenerating}
                />
                
                {/* Analysis panel */}
                {showResults && predictionData && (
                  <div className="mt-6">
                    <h4 className="font-display font-semibold text-xl mb-3">Analysis</h4>
                    <div className="bg-card rounded-lg border border-gray-700 p-4">
                      <div className="space-y-3">
                        {/* Summary */}
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                          <h5 className="font-medium">Summary</h5>
                        </div>
                        <p className="text-gray-300 text-sm pl-5">
                          {predictionData.summary}
                        </p>
                        
                        {/* First Scenario */}
                        {predictionData.scenarios.length > 0 && (
                          <>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                              <h5 className="font-medium">{predictionData.scenarios[0].name}</h5>
                            </div>
                            <p className="text-gray-300 text-sm pl-5">
                              {predictionData.scenarios[0].description}
                            </p>
                          </>
                        )}
                        
                        {/* Second Scenario */}
                        {predictionData.scenarios.length > 1 && (
                          <>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                              <h5 className="font-medium">{predictionData.scenarios[1].name}</h5>
                            </div>
                            <p className="text-gray-300 text-sm pl-5">
                              {predictionData.scenarios[1].description}
                            </p>
                          </>
                        )}
                        
                        {/* Key Insights */}
                        {predictionData.insights && predictionData.insights.length > 0 && (
                          <>
                            <div className="flex items-center mt-4">
                              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                              <h5 className="font-medium">Key Insights</h5>
                            </div>
                            <ul className="text-gray-300 text-sm pl-8 list-disc space-y-1">
                              {predictionData.insights.map((insight, index) => (
                                <li key={index}>{insight}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      
                      {/* Recommendations from first scenario */}
                      {predictionData.scenarios.length > 0 && predictionData.scenarios[0].recommendations && predictionData.scenarios[0].recommendations.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <h5 className="font-medium mb-2">Strategic Recommendations</h5>
                          <ul className="text-gray-300 text-sm pl-5 list-disc space-y-1">
                            {predictionData.scenarios[0].recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
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
