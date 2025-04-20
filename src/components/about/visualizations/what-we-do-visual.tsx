"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Music, Wand2 } from "lucide-react";

interface WhatWeDoVisualProps {
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

export function WhatWeDoVisual({ colorConfig, isInView }: WhatWeDoVisualProps) {
  const [activeElement, setActiveElement] = useState<number | null>(null);
  
  // Orchestra elements
  const elements = [
    { 
      name: "Reasoning", 
      instrument: "Strings", 
      position: { x: -100, y: -70 },
      size: 18,
      delay: 0
    },
    { 
      name: "Discourse", 
      instrument: "Brass", 
      position: { x: 100, y: -70 },
      size: 18,
      delay: 0.2
    },
    { 
      name: "Influence", 
      instrument: "Woodwinds", 
      position: { x: -120, y: 20 },
      size: 18,
      delay: 0.4
    },
    { 
      name: "Strategy", 
      instrument: "Percussion", 
      position: { x: 120, y: 20 },
      size: 18,
      delay: 0.6
    },
    { 
      name: "Analysis", 
      instrument: "Piano", 
      position: { x: 0, y: 70 },
      size: 18,
      delay: 0.8
    },
  ];
  
  useEffect(() => {
    if (!isInView) {
      setActiveElement(null);
      return;
    }
    
    const interval = setInterval(() => {
      setActiveElement(prev => {
        if (prev === null) return 0;
        return (prev + 1) % elements.length;
      });
    }, 2500);
    
    return () => clearInterval(interval);
  }, [isInView, elements.length]);
  
  // Sound wave animation variants
  const waveVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: [0, 0.8, 0],
      scale: [1, 2, 3],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };
  
  // Note animation variants
  const noteVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (custom: number) => ({
      opacity: [0, 1, 0],
      y: [-20, -40 - (custom * 10)],
      x: [0, custom * 5, custom * 10],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
        delay: Math.random()
      }
    })
  };
  
  return (
    <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center">
      <div className="relative w-full max-w-md h-full">
        {/* Stage background */}
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
          {/* Stage patterns */}
          <div className="absolute inset-0">
            <svg width="100%" height="100%" fill="none">
              <motion.path
                d="M0,150 Q100,100 200,150 T400,150"
                stroke={colorConfig.primary.replace('bg-', '#')}
                strokeOpacity="0.1"
                strokeWidth="60"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              />
            </svg>
          </div>
        </motion.div>
        
        {/* Orchestra elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          {elements.map((element, index) => {
            const isActive = activeElement === index;
            
            return (
              <motion.div
                key={element.name}
                className="absolute"
                style={{
                  left: "calc(50% + " + element.position.x + "px)",
                  top: "calc(50% + " + element.position.y + "px)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: isActive ? [0, -3, 3, 0] : 0
                } : { 
                  opacity: 0, 
                  scale: 0 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: element.delay,
                  x: { 
                    duration: 0.3,
                    repeat: isActive ? 3 : 0
                  }
                }}
              >
                <motion.div 
                  className={cn(
                    "rounded-full flex items-center justify-center",
                    isActive ? colorConfig.primary : colorConfig.light,
                    isActive ? "shadow-lg" : "",
                    isActive ? colorConfig.shadow : ""
                  )}
                  style={{
                    width: element.size,
                    height: element.size
                  }}
                  animate={isActive ? {
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isActive && (
                    <motion.div
                      className={cn(
                        "absolute inset-0 rounded-full",
                        colorConfig.primary
                      )}
                      variants={waveVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  )}
                </motion.div>
                
                {/* Musical notes when active */}
                {isActive && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={`note-${i}`}
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 top-0 text-xs",
                      colorConfig.text
                    )}
                    custom={i + 1}
                    variants={noteVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ♪
                  </motion.div>
                ))}
                
                {/* Label */}
                <motion.div
                  className={cn(
                    "absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap",
                    "text-xs font-medium px-2 py-0.5 rounded",
                    isActive ? "bg-gray-900/80" : "bg-transparent",
                    isActive ? colorConfig.text : "text-gray-400"
                  )}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: element.delay + 0.3 }}
                >
                  {element.name}
                  
                  {/* Show instrument type when active */}
                  {isActive && (
                    <motion.div
                      className="text-[10px] text-gray-400 text-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                    >
                      {element.instrument}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Conductor (Pulp) */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <motion.div
              className={cn(
                "w-20 h-20 rounded-full",
                colorConfig.primary,
                "flex items-center justify-center",
                "shadow-lg",
                colorConfig.shadow
              )}
              animate={activeElement !== null ? {
                y: [0, -5, 0],
              } : {}}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                repeatDelay: 1.7
              }}
            >
              <div className="text-xl font-bold text-white">PULP</div>
            </motion.div>
            
            {/* Conductor's wand */}
            <motion.div 
              className="absolute -top-2 -right-2"
              animate={activeElement !== null ? {
                rotate: [-10, 20, -20, 10, -10],
              } : {}}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <Wand2 className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              className={cn(
                "absolute -bottom-8 left-1/2 -translate-x-1/2",
                "text-xs uppercase tracking-widest font-medium",
                colorConfig.text
              )}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Conductor
            </motion.div>
          </motion.div>
        </div>
        
        {/* Music notation in background */}
        <div className="absolute inset-0 pointer-events-none">
          <Music className={cn(
            "absolute right-5 bottom-5 text-gray-800 w-20 h-20 opacity-20"
          )} />
        </div>
      </div>
    </div>
  );
} 