"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, LandmarkIcon, Newspaper } from "lucide-react";

interface WhoWeServeVisualProps {
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

interface BackgroundLine {
  width: string;
  height: string;
  left: string;
  top: string;
  transform: string;
  opacity: number;
}

export function WhoWeServeVisual({ colorConfig, isInView }: WhoWeServeVisualProps) {
  const [activeIndustry, setActiveIndustry] = useState<number | null>(null);
  const [backgroundLines, setBackgroundLines] = useState<BackgroundLine[]>([]);
  
  const industries = [
    { 
      name: "Business", 
      icon: Briefcase, 
      description: "Strategic decision-making" 
    },
    { 
      name: "Government", 
      icon: LandmarkIcon, 
      description: "Policy development" 
    },
    { 
      name: "Education", 
      icon: GraduationCap, 
      description: "Critical thinking tools" 
    },
    { 
      name: "Media", 
      icon: Newspaper, 
      description: "Content analysis" 
    },
  ];
  
  // Generate background lines on component mount
  useEffect(() => {
    const lines = Array(20).fill(0).map(() => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 100 + 50}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 90}deg)`,
      opacity: Math.random() * 0.3
    }));
    
    setBackgroundLines(lines);
  }, []);
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveIndustry(prev => {
          if (prev === null) return 0;
          return (prev + 1) % industries.length;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    } else {
      setActiveIndustry(null);
    }
  }, [isInView, industries.length]);
  
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center">
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
          {/* Background texture/pattern */}
          <div className="absolute inset-0 opacity-20">
            {backgroundLines.map((line, i) => (
              <div 
                key={i}
                className="absolute bg-white/20" 
                style={{
                  width: line.width,
                  height: line.height,
                  left: line.left,
                  top: line.top,
                  transform: line.transform,
                  opacity: line.opacity
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Central hub */}
        <motion.div
          className={cn(
            "w-24 h-24 rounded-full ml-20 mt-20",
            colorConfig.primary,
            "flex items-center justify-center z-20",
            "shadow-lg",
            colorConfig.shadow
          )}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ 
            type: "spring",
            duration: 0.8,
          }}
        >
          <motion.div 
            className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div className="text-lg font-bold text-white">PULP</div>
          </motion.div>
          
          {/* Pulses */}
          {isInView && (
            <motion.div
              className={cn(
                "absolute rounded-full border-2 border-dashed",
                colorConfig.border
              )}
              initial={{ width: 24, height: 24, opacity: 0.8 }}
              animate={{ width: 180, height: 180, opacity: 0 }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </motion.div>
        
        {/* Spokes and industry nodes */}
        {industries.map((industry, index) => {
          const IconComponent = industry.icon;
          const angle = (index * 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 130;
          const y = Math.sin(angle) * 130;
          const isActive = activeIndustry === index;
          
          return (
            <div key={industry.name}>
              {/* Connection line */}
              <motion.div 
                className="absolute left-1/2 top-1/2"
                style={{
                  width: "130px",
                  height: "2px",
                  transformOrigin: "left center",
                  transform: `rotate(${index * 90}deg)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              >
                
                {/* Moving particle */}
                {isActive && (
                  <motion.div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
                      colorConfig.tertiary
                    )}
                    initial={{ left: 0, scale: 0 }}
                    animate={{ left: "100%", scale: 1.5 }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
              
              {/* Industry node */}
              <motion.div 
                className={cn(
                  "absolute flex flex-col items-center",
                  "z-10"
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: isActive ? 1.1 : 1
                } : { 
                  opacity: 0, 
                  scale: 0.8
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + (index * 0.1),
                  scale: {
                    duration: 0.3,
                  }
                }}
              >
                <motion.div 
                  className={cn(
                    "w-16 h-16 rounded-full",
                    isActive ? colorConfig.primary : colorConfig.light,
                    "flex items-center justify-center mb-2",
                    "shadow-md",
                    colorConfig.shadow
                  )}
                  whileHover={{ scale: 1.1 }}
                  animate={isActive ? { 
                    boxShadow: ["0 0 0 rgba(147, 51, 234, 0.4)", "0 0 20px rgba(147, 51, 234, 0.6)", "0 0 0 rgba(147, 51, 234, 0.4)"]
                  } : {
                    boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: isActive ? Infinity : 0 
                  }}
                >
                  <IconComponent className={cn(
                    "w-8 h-8",
                    isActive ? "text-white" : colorConfig.text
                  )} />
                </motion.div>
                
                <div className="text-center">
                  <div className={cn(
                    "font-semibold",
                    isActive ? colorConfig.text : "text-gray-300"
                  )}>
                    {industry.name}
                  </div>
                  {isActive && (
                    <motion.div 
                      className="text-xs text-gray-400 mt-1 max-w-28 text-center"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {industry.description}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 