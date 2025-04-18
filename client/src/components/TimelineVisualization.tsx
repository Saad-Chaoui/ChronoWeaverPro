import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useToast } from '@/hooks/use-toast';

interface TimelineOutcome {
  name: string;
  impact: string;
  description: string;
}

interface TimelineScenario {
  name: string;
  probability: number;
  description: string;
  outcomes: TimelineOutcome[];
  recommendations: string[];
}

interface TimelinePrediction {
  summary: string;
  scenarios: TimelineScenario[];
  insights: string[];
}

interface TimelineVisualizationProps {
  prediction: TimelinePrediction | null;
  isLoading: boolean;
}

const TimelineVisualization = ({ prediction, isLoading }: TimelineVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGPathElement | null)[]>([]);
  const scenarioRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [showingDetails, setShowingDetails] = useState(false);
  const { toast } = useToast();

  // Initialize the timeline
  useEffect(() => {
    if (!prediction || isLoading) return;

    // Reset refs
    nodesRef.current = [];
    linesRef.current = [];
    scenarioRefs.current = [];

    // Animate the timeline entries
    const timeline = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.out" }
    });

    // First, reset everything
    timeline.set(".timeline-node", { opacity: 0, scale: 0 });
    timeline.set(".timeline-connector", { strokeDashoffset: 1000, strokeDasharray: 1000 });
    timeline.set(".timeline-label", { opacity: 0, y: 20 });
    timeline.set(".scenario-card", { opacity: 0, y: 30, scale: 0.95 });
    
    // Then animate nodes
    timeline.to(".timeline-node", { 
      opacity: 1, 
      scale: 1, 
      stagger: 0.15,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Animate connectors
    timeline.to(".timeline-connector", { 
      strokeDashoffset: 0, 
      duration: 1.5, 
      stagger: 0.1,
    }, "-=1");
    
    // Animate labels
    timeline.to(".timeline-label", { 
      opacity: 1, 
      y: 0, 
      stagger: 0.1 
    }, "-=1.5");

    // Set up reactive hover effects
    document.querySelectorAll('.scenario-node').forEach((node, index) => {
      node.addEventListener('mouseenter', () => {
        setActiveScenario(index);
        if (!showingDetails) {
          // Animate the corresponding scenario card
          gsap.to(scenarioRefs.current[index], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out"
          });
        }
      });

      node.addEventListener('mouseleave', () => {
        if (!showingDetails) {
          // Hide the card
          gsap.to(scenarioRefs.current[index], {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.5,
            ease: "power3.in"
          });
        }
      });
    });

    // Add background particle animation
    initParticleBackground();

  }, [prediction, isLoading]);

  // Function to initialize particle background
  const initParticleBackground = () => {
    if (!containerRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 -z-10';
    containerRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${10 + Math.random() * 30}, ${190 + Math.random() * 65}, ${220 + Math.random() * 35}, ${0.2 + Math.random() * 0.5})`
      });
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect nearby particles
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(20, 210, 240, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
    };
  };

  // Function to handle viewing full details of a scenario
  const handleViewDetails = (index: number) => {
    setActiveScenario(index);
    setShowingDetails(true);
    
    // Hide all scenario cards
    scenarioRefs.current.forEach((ref, i) => {
      if (i !== index) {
        gsap.to(ref, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.5
        });
      } else {
        gsap.to(ref, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5
        });
      }
    });
    
    // Animate the active scenario node
    gsap.to(nodesRef.current[index + 1], {
      scale: 1.2,
      boxShadow: "0 0 15px 3px rgba(10, 210, 255, 0.7)",
      duration: 0.5
    });
  };
  
  // Function to close details view
  const handleCloseDetails = () => {
    setShowingDetails(false);
    
    // Reset node animations
    nodesRef.current.forEach(node => {
      if (node) {
        gsap.to(node, {
          scale: 1,
          boxShadow: "none",
          duration: 0.5
        });
      }
    });
    
    // Hide all scenario cards
    scenarioRefs.current.forEach(ref => {
      gsap.to(ref, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.5
      });
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500px] bg-background/60 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
    >
      {/* Futuristic Grid */}
      <div className="absolute inset-0 bg-grid z-0 opacity-20"></div>
      
      {/* Initial State */}
      {!prediction && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto rounded-full bg-background/80 border border-gray-700 flex items-center justify-center mb-5 glow-ring">
              <i className="ri-input-cursor-move text-4xl text-gray-400"></i>
            </div>
            <p className="text-gray-400 text-lg">Fill in the form to generate<br />your future timeline prediction</p>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="relative mx-auto mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-primary/40 animate-pulse"></div>
            </div>
            <p className="text-lg font-display text-primary animate-pulse">
              Analyzing timelines and calculating probabilities...
            </p>
          </div>
        </div>
      )}
      
      {/* Timeline Visualization */}
      {prediction && !isLoading && (
        <div ref={timelineRef} className="absolute inset-0 p-8 z-10">
          {/* Main Timeline Track */}
          <div className="relative h-16 mt-44">
            <div className="absolute left-0 right-0 top-1/2 h-1 transform -translate-y-1/2 bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 rounded-full shadow-glow"></div>
            
            {/* Timeline Nodes */}
            {/* Present Node (Static) */}
            <div 
              ref={el => nodesRef.current[0] = el}
              className="timeline-node absolute top-1/2 left-[5%] w-10 h-10 rounded-full bg-dark border-2 border-primary transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
            >
              <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
              <div className="timeline-label absolute top-12 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                <div className="text-primary font-semibold">Present</div>
              </div>
            </div>
            
            {/* Scenario Nodes (Dynamic) */}
            {prediction.scenarios.map((scenario, index) => (
              <div key={`node-${index}`}>
                <div 
                  ref={el => nodesRef.current[index + 1] = el}
                  className={`timeline-node scenario-node absolute top-1/2 left-${index % 2 === 0 ? '1/3' : '2/3'} w-10 h-10 rounded-full bg-dark border-2 border-${index % 2 === 0 ? 'secondary' : 'accent'} transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 cursor-pointer transition-transform hover:scale-110`}
                  onClick={() => handleViewDetails(index)}
                >
                  <div className={`w-4 h-4 rounded-full bg-${index % 2 === 0 ? 'secondary' : 'accent'}`}></div>
                  <div className="timeline-label absolute top-12 left-1/2 transform -translate-x-1/2 text-center w-40">
                    <div className={`text-${index % 2 === 0 ? 'secondary' : 'accent'} font-semibold line-clamp-1`}>
                      {scenario.name}
                    </div>
                    <div className="text-xs text-gray-400">{scenario.probability}% Probability</div>
                  </div>
                </div>
                
                {/* Scenario detail cards */}
                <div
                  ref={el => scenarioRefs.current[index] = el}
                  className="scenario-card absolute p-4 rounded-lg bg-dark/80 backdrop-blur-sm border border-gray-700 w-72 opacity-0"
                  style={{
                    top: index % 2 === 0 ? '30%' : '60%',
                    left: index % 2 === 0 ? '30%' : '70%', 
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`text-${index % 2 === 0 ? 'secondary' : 'accent'} font-semibold mb-2`}>{scenario.name}</div>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">{scenario.description}</p>
                  <div className="text-xs text-gray-400 flex justify-between">
                    <span>Probability: {scenario.probability}%</span>
                    <button 
                      className={`text-${index % 2 === 0 ? 'secondary' : 'accent'} hover:underline`}
                      onClick={() => handleViewDetails(index)}
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Future State Node (Static) */}
            <div 
              ref={el => nodesRef.current[prediction.scenarios.length + 1] = el}
              className="timeline-node absolute top-1/2 left-[95%] w-10 h-10 rounded-full bg-dark border-2 border-gray-500 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
            >
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <div className="timeline-label absolute top-12 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                <div className="text-gray-300 font-semibold">Future</div>
              </div>
            </div>
            
            {/* SVG Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Present to Scenario connections */}
              {prediction.scenarios.map((_, index) => (
                <path
                  key={`path-present-${index}`}
                  ref={el => linesRef.current[index] = el}
                  className="timeline-connector"
                  d={`M ${5}%,50% C ${15}%,${index % 2 === 0 ? 40 : 60} ${25}%,${index % 2 === 0 ? 40 : 60} ${index % 2 === 0 ? 33 : 66}%,50%`}
                  stroke={index % 2 === 0 ? "rgba(10, 210, 255, 0.7)" : "rgba(255, 42, 109, 0.7)"}
                  strokeWidth="2"
                  fill="none"
                />
              ))}
              
              {/* Scenario to Future connections */}
              {prediction.scenarios.map((_, index) => (
                <path
                  key={`path-future-${index}`}
                  ref={el => linesRef.current[prediction.scenarios.length + index] = el}
                  className="timeline-connector"
                  d={`M ${index % 2 === 0 ? 33 : 66}%,50% C ${index % 2 === 0 ? 45 : 75}%,${index % 2 === 0 ? 40 : 60} ${85}%,${index % 2 === 0 ? 40 : 60} ${95}%,50%`}
                  stroke={index % 2 === 0 ? "rgba(10, 210, 255, 0.7)" : "rgba(255, 42, 109, 0.7)"}
                  strokeWidth="2"
                  fill="none"
                />
              ))}
            </svg>
          </div>
          
          {/* Detail View */}
          {showingDetails && activeScenario !== null && prediction.scenarios[activeScenario] && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm p-6 overflow-y-auto">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={handleCloseDetails}
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              
              <div className="max-w-3xl mx-auto">
                <h3 className={`text-${activeScenario % 2 === 0 ? 'secondary' : 'accent'} text-2xl font-display mb-4`}>
                  {prediction.scenarios[activeScenario].name}
                </h3>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${activeScenario % 2 === 0 ? 'secondary' : 'accent'} mr-2`}></div>
                    <span className="text-gray-300">Probability: {prediction.scenarios[activeScenario].probability}%</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-time-line text-gray-400 mr-2"></i>
                    <span className="text-gray-300">Timeline Branch #{activeScenario + 1}</span>
                  </div>
                </div>
                
                <div className="bg-dark/40 rounded-lg border border-gray-700 p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">Scenario Description</h4>
                  <p className="text-gray-300">{prediction.scenarios[activeScenario].description}</p>
                </div>
                
                {prediction.scenarios[activeScenario].outcomes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Potential Outcomes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prediction.scenarios[activeScenario].outcomes.map((outcome, idx) => (
                        <div 
                          key={idx} 
                          className="bg-dark/40 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors"
                        >
                          <div className={`text-${activeScenario % 2 === 0 ? 'secondary' : 'accent'} font-medium mb-1`}>
                            {outcome.name}
                          </div>
                          <div className="text-sm text-gray-400 mb-2">{outcome.impact}</div>
                          <p className="text-sm text-gray-300">{outcome.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {prediction.scenarios[activeScenario].recommendations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Strategic Recommendations</h4>
                    <ul className="bg-dark/40 rounded-lg border border-gray-700 p-4 space-y-2">
                      {prediction.scenarios[activeScenario].recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className={`w-5 h-5 rounded-full bg-${activeScenario % 2 === 0 ? 'secondary' : 'accent'}/20 flex items-center justify-center mr-3 mt-0.5`}>
                            <div className={`w-2 h-2 rounded-full bg-${activeScenario % 2 === 0 ? 'secondary' : 'accent'}`}></div>
                          </div>
                          <span className="text-gray-300">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button 
                    className="px-4 py-2 rounded bg-transparent border border-gray-700 text-white hover:bg-dark transition-colors"
                    onClick={handleCloseDetails}
                  >
                    Back to Timeline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Glowing Corners Effect */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-xl"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/60 rounded-tr-xl"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-secondary/60 rounded-bl-xl"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-xl"></div>
    </div>
  );
};

export default TimelineVisualization;