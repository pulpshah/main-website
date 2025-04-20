"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flag, Mountain } from "lucide-react";

interface MissionVisualProps {
  colorConfig: {
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    border: string;
    shadow: string;
    light: string;
    accent: string;
    gradient: string;
  };
  isInView: boolean;
}

export function MissionVisual({ colorConfig, isInView }: MissionVisualProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  // Mountain journey steps
  const journeySteps = [
    { 
      name: "Base Camp", 
      description: "Preparing businesses for AI transformation", 
      elevation: 0,
      xPosition: 10
    },
    { 
      name: "First Camp", 
      description: "Identifying key challenges and opportunities", 
      elevation: 25,
      xPosition: 30
    },
    { 
      name: "Traverse", 
      description: "Building customized strategic solutions", 
      elevation: 50,
      xPosition: 50
    },
    { 
      name: "High Camp", 
      description: "Implementing transformative AI technology", 
      elevation: 75,
      xPosition: 70
    },
    { 
      name: "Summit", 
      description: "Reaching full strategic AI potential", 
      elevation: 100,
      xPosition: 90
    },
  ];
  
  useEffect(() => {
    if (!isInView) {
      setActiveStep(null);
      return;
    }
    
    // Start animation sequence
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev === null) return 0;
          return prev < journeySteps.length - 1 ? prev + 1 : 0;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [isInView, journeySteps.length]);
  
  // Helper function to generate mountain path
  const generateMountainPath = () => {
    // Base mountain path
    let pathData = "M0,200 ";
    
    // Generate random mountain peaks
    const peaks = [
      { x: 20, y: 120 },
      { x: 40, y: 80 },
      { x: 60, y: 130 },
      { x: 80, y: 50 }, // Summit peak
      { x: 100, y: 110 },
      { x: 120, y: 90 },
      { x: 140, y: 130 },
      { x: 160, y: 100 },
      { x: 180, y: 140 },
      { x: 200, y: 170 },
    ];
    
    peaks.forEach(peak => {
      pathData += `L${peak.x},${peak.y} `;
    });
    
    // Close the path
    pathData += "L200,200 Z";
    
    return pathData;
  };
  
  // Generate a slightly different foreground mountain
  const generateForegroundPath = () => {
    let pathData = "M0,200 ";
    
    const peaks = [
      { x: 10, y: 160 },
      { x: 30, y: 120 },
      { x: 50, y: 150 },
      { x: 70, y: 90 },
      { x: 90, y: 130 },
      { x: 110, y: 120 },
      { x: 130, y: 150 },
      { x: 150, y: 130 },
      { x: 170, y: 160 },
      { x: 190, y: 180 },
    ];
    
    peaks.forEach(peak => {
      pathData += `L${peak.x},${peak.y} `;
    });
    
    pathData += "L200,200 Z";
    
    return pathData;
  };
  
  // Calculate path for journey line
  const generateJourneyPath = () => {
    let pathData = "M10,190 ";
    
    const points = [
      { x: 30, y: 160 },
      { x: 40, y: 140 },
      { x: 55, y: 120 },
      { x: 70, y: 90 },
      { x: 80, y: 50 },
    ];
    
    points.forEach(point => {
      pathData += `L${point.x},${point.y} `;
    });
    
    return pathData;
  };
  
  // Motion variants
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  const flagVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 2
      }
    }
  };
  
  const cloudVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 0.7, 
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5
      }
    },
    float: {
      x: [0, 5, 0, -5, 0],
      y: [0, -2, 0, 2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className="relative w-full h-[300px] md:h-[350px]">
      <div className="absolute inset-0">
        {/* Background with gradient */}
        <motion.div 
          className={cn(
            "absolute inset-0 rounded-xl overflow-hidden",
            "bg-gray-900/80 backdrop-blur-sm border",
            colorConfig.border
          )}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sky gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/20"
          />
        </motion.div>
        
        {/* Mountain visualization */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <svg width="200" height="200" viewBox="0 0 200 200" className="mt-8 md:mt-0">
            {/* Background mountains */}
            <motion.path
              d={generateMountainPath()}
              className="fill-gray-800"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            />
            
            {/* Foreground mountains */}
            <motion.path
              d={generateForegroundPath()}
              className="fill-gray-700"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            {/* Snow caps */}
            <motion.ellipse 
              cx="80" 
              cy="50" 
              rx="12" 
              ry="6" 
              className="fill-gray-200 opacity-80"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            />
            
            {/* Journey path */}
            <motion.path
              d={generateJourneyPath()}
              fill="none"
              stroke={colorConfig.primary.replace('bg-', '#')}
              strokeWidth="2"
              strokeDasharray="4 2"
              variants={pathVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
            
            {/* Journey waypoints */}
            {journeySteps.map((step, index) => {
              const x = step.xPosition / 100 * 190 + 5;
              const y = 190 - (step.elevation / 100 * 140);
              
              return (
                <g key={`step-${index}`}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={index === journeySteps.length - 1 ? 0 : 4}
                    className={cn(
                      "stroke-gray-800 stroke-2",
                      activeStep === index || hoveredStep === index 
                        ? colorConfig.primary 
                        : "fill-gray-600"
                    )}
                    initial={{ scale: 0 }}
                    animate={isInView ? { 
                      scale: 1,
                      fill: activeStep === index || hoveredStep === index 
                        ? colorConfig.primary.replace('bg-', '#') 
                        : "#4B5563"
                    } : { scale: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + (index * 0.1) 
                    }}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                  />
                  
                  {/* Flag for summit */}
                  {index === journeySteps.length - 1 && (
                    <motion.g
                      variants={flagVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                    >
                      <rect 
                        x={x - 1} 
                        y={y - 15} 
                        width="2" 
                        height="15" 
                        className="fill-gray-200" 
                      />
                      <polygon 
                        points={`${x+1},${y-15} ${x+9},${y-13} ${x+1},${y-8}`} 
                        className={colorConfig.primary.replace('bg-', 'fill-')} 
                      />
                    </motion.g>
                  )}
                  
                  {/* Labels with positioning adjustment */}
                  {(activeStep === index || hoveredStep === index) && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <rect
                        x={x - 30}
                        y={y - (index < 2 ? -20 : 35)}
                        width="60"
                        height="18"
                        rx="4"
                        className="fill-gray-900 opacity-90"
                      />
                      <text
                        x={x}
                        y={y - (index < 2 ? -33 : 22)}
                        className="text-[8px] font-medium fill-white text-center"
                        textAnchor="middle"
                      >
                        {step.name}
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
            
            {/* Decorative clouds */}
            <motion.g
              variants={cloudVariants}
              initial="hidden"
              animate={isInView ? ["visible", "float"] : "hidden"}
            >
              <circle cx="30" cy="40" r="10" className="fill-white opacity-40" />
              <circle cx="40" cy="45" r="12" className="fill-white opacity-40" />
              <circle cx="25" cy="50" r="10" className="fill-white opacity-40" />
            </motion.g>
            
            <motion.g
              variants={cloudVariants}
              initial="hidden"
              animate={isInView ? ["visible", "float"] : "hidden"}
              transition={{ delay: 0.7 }}
            >
              <circle cx="150" cy="30" r="8" className="fill-white opacity-30" />
              <circle cx="160" cy="33" r="10" className="fill-white opacity-30" />
              <circle cx="145" cy="38" r="7" className="fill-white opacity-30" />
            </motion.g>
          </svg>
        </div>
        
        {/* Mission statement */}
        <motion.div
          className="absolute bottom-6 left-0 right-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="text-center px-4">
            <div className="flex justify-center items-center mb-2">
              <Flag className={cn("w-4 h-4 mr-2", colorConfig.text)} />
              <div className={cn("text-sm font-bold", colorConfig.text)}>OUR MISSION</div>
            </div>
            <div className="text-xs text-gray-300 max-w-md mx-auto">
              Guiding businesses to the summit of strategic AI implementation, transforming how organizations operate and create value.
            </div>
          </div>
        </motion.div>
        
        {/* Current step description */}
        {activeStep !== null && (
          <motion.div
            className="absolute top-5 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={`desc-${activeStep}`}
          >
            <div className="text-center px-4">
              <div className={cn("text-xs text-gray-300 max-w-xs mx-auto", colorConfig.text)}>
                {journeySteps[activeStep].description}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Mountain icon */}
        <div className="absolute top-4 right-4">
          <Mountain className={cn("w-5 h-5 opacity-50", colorConfig.text)} />
        </div>
      </div>
    </div>
  );
} 