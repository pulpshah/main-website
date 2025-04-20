"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MessageCircle, Users, Lightbulb, ArrowRight } from "lucide-react";

interface GoldenCircleVisualProps {
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

export function GoldenCircleVisual({ colorConfig, isInView }: GoldenCircleVisualProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  const goldenCircleSections = [
    {
      id: "why",
      title: "WHY",
      description: "Because meaningful conversations transform relationships and drive human progress",
      icon: <Lightbulb className="w-5 h-5" />,
      color: colorConfig.primary,
      radius: 40,
    },
    {
      id: "how",
      title: "HOW",
      description: "By creating spaces and tools that facilitate deeper, more intentional exchanges",
      icon: <ArrowRight className="w-5 h-5" />,
      color: colorConfig.secondary,
      radius: 70,
    },
    {
      id: "what",
      title: "WHAT",
      description: "Increasing both quality and quantity of deliberate conversational engagement",
      icon: <MessageCircle className="w-5 h-5" />,
      color: colorConfig.tertiary,
      radius: 100,
    },
  ];
  
  useEffect(() => {
    if (!isInView) {
      setActiveSection(null);
      return;
    }
    
    // Start animation sequence
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveSection(prev => {
          if (prev === null) return "why";
          if (prev === "why") return "how";
          if (prev === "how") return "what";
          return "why";
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [isInView]);
  
  // Animation variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.7,
        delay: custom * 0.3,
        ease: "easeOut"
      }
    })
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + (custom * 0.3)
      }
    })
  };
  
  // Helper functions to generate conversation bubbles
  const generateBubbles = () => {
    const bubbles = [];
    const bubbleCount = 12;
    
    for (let i = 0; i < bubbleCount; i++) {
      const angle = (i / bubbleCount) * 2 * Math.PI;
      const distance = 115 + (i % 3) * 15;
      const x = 100 + Math.cos(angle) * distance;
      const y = 100 + Math.sin(angle) * distance;
      const size = 6 + (i % 3) * 2;
      
      bubbles.push({ x, y, size, delay: i * 0.1 });
    }
    
    return bubbles;
  };
  
  const conversationBubbles = generateBubbles();
  
  // Connection lines between bubbles
  const generateConnectionLines = () => {
    const connections = [];
    const bubbles = generateBubbles();
    
    for (let i = 0; i < bubbles.length; i++) {
      // Connect to next bubble (circular)
      const next = (i + 1) % bubbles.length;
      connections.push({
        x1: bubbles[i].x,
        y1: bubbles[i].y,
        x2: bubbles[next].x,
        y2: bubbles[next].y,
        delay: i * 0.05 + 2
      });
      
      // Add some diagonal connections for a network effect
      if (i % 3 === 0) {
        const target = (i + 3) % bubbles.length;
        connections.push({
          x1: bubbles[i].x,
          y1: bubbles[i].y,
          x2: bubbles[target].x,
          y2: bubbles[target].y,
          delay: i * 0.05 + 2.3
        });
      }
    }
    
    return connections;
  };
  
  const connectionLines = generateConnectionLines();
  
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
          {/* Background gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-green-900/20"
          />
        </motion.div>
        
        {/* Golden Circle visualization */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Connection lines between conversation bubbles */}
            {connectionLines.map((line, index) => (
              <motion.line
                key={`line-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={colorConfig.primary.replace('bg-', '#')}
                strokeWidth="0.5"
                strokeOpacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { 
                  pathLength: 1, 
                  opacity: 0.3
                } : { pathLength: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: line.delay 
                }}
              />
            ))}
            
            {/* Conversation bubbles */}
            {conversationBubbles.map((bubble, index) => (
              <motion.circle
                key={`bubble-${index}`}
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.size}
                fill={index % 3 === 0 
                  ? colorConfig.primary.replace('bg-', '#')
                  : index % 3 === 1 
                    ? colorConfig.secondary.replace('bg-', '#')
                    : colorConfig.tertiary.replace('bg-', '#')
                }
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate={isInView ? ["visible", "pulse"] : "hidden"}
                transition={{
                  duration: 0.5,
                  delay: bubble.delay
                }}
              />
            ))}
            
            {/* Golden Circle Layers */}
            {goldenCircleSections.map((section, index) => (
              <motion.circle
                key={`circle-${section.id}`}
                cx="100"
                cy="100"
                r={section.radius}
                fill="none"
                stroke={section.color.replace('bg-', '#')}
                strokeWidth="2"
                strokeDasharray="3 2"
                custom={index}
                variants={circleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                opacity={activeSection === section.id || hoveredSection === section.id ? 0.9 : 0.4}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              />
            ))}
            
            {/* Center icon */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <circle
                cx="100"
                cy="100"
                r="15"
                className={colorConfig.primary.replace('bg-', 'fill-')}
              />
              <g transform="translate(92, 92)">
                <Users className="w-6 h-6 text-white" />
              </g>
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
              <MessageCircle className={cn("w-4 h-4 mr-2", colorConfig.text)} />
              <div className={cn("text-sm font-bold", colorConfig.text)}>OUR MISSION</div>
            </div>
            <div className="text-xs text-gray-300 max-w-md mx-auto">
              To increase the quality and quantity of deliberate conversational engagement.
            </div>
          </div>
        </motion.div>
        
        {/* Current section description */}
        {activeSection && (
          <motion.div
            className="absolute top-5 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={`desc-${activeSection}`}
          >
            <div className="text-center px-4">
              <div className={cn(
                "text-sm font-semibold mb-1",
                colorConfig.text
              )}>
                {goldenCircleSections.find(s => s.id === activeSection)?.title}
              </div>
              <div className="text-xs text-gray-300 max-w-xs mx-auto">
                {goldenCircleSections.find(s => s.id === activeSection)?.description}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Section indicator */}
        <div className="absolute top-4 right-4 flex space-x-1">
          {goldenCircleSections.map((section) => (
            <div 
              key={`indicator-${section.id}`}
              className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                activeSection === section.id 
                  ? section.color.replace('bg-', 'bg-')
                  : "bg-gray-600"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 