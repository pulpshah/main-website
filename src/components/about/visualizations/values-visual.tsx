"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, Lightbulb, Eye, Compass, Layers } from "lucide-react";

interface ValuesVisualProps {
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

export function ValuesVisual({ colorConfig, isInView }: ValuesVisualProps) {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [backgroundLines, setBackgroundLines] = useState<BackgroundLine[]>([]);

  const values = [
    {
      name: "Strategic Clarity",
      icon: Lightbulb,
      description: "Insight over noise"
    },
    {
      name: "Human-Centered",
      icon: Heart,
      description: "Amplify human strengths"
    },
    {
      name: "Transparency",
      icon: Eye,
      description: "Clear methods & models"
    },
    {
      name: "Ethical Intelligence",
      icon: Compass,
      description: "Build what's responsible"
    },
    {
      name: "Systems Thinking",
      icon: Layers,
      description: "Consider broader impact"
    }
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
        setActiveValue((prev) => (prev === null ? 0 : (prev + 1) % values.length));
      }, 2000);

      return () => clearInterval(interval);
    } else {
      setActiveValue(null);
    }
  }, [isInView, values.length]);

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

        {/* Center Circle */}
        <motion.div
          className={cn("absolute w-36 h-36 rounded-full ml-40", colorConfig.light)}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-28 h-28 rounded-full",
              colorConfig.primary,
              "flex items-center justify-center"
            )}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Heart className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>

        {/* Value Labels */}
        {values.map((value, index) => {
          const angleDeg = index * (360 / values.length);
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(angleRad) * 140;
          const y = Math.sin(angleRad) * 140;
          const isActive = activeValue === index;
          const IconComponent = value.icon;

          return (
            <motion.div
              key={value.name}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 10 : 1,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -5 : 0,
                    }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                scale: { duration: 0.3 },
                y: { duration: 0.3 },
              }}
            >
              <motion.div
                className={cn(
                  "bg-gray-900/60 backdrop-blur-sm rounded-lg",
                  "border shadow-lg min-w-[140px]",
                  isActive ? colorConfig.border : "border-gray-800",
                  isActive ? colorConfig.shadow : ""
                )}
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={cn(
                        "p-1 rounded",
                        isActive ? colorConfig.light : "bg-gray-800"
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "w-4 h-4",
                          isActive ? colorConfig.text : "text-gray-400"
                        )}
                      />
                    </div>
                    <div
                      className={cn(
                        "font-semibold text-sm",
                        isActive ? colorConfig.text : "text-gray-300"
                      )}
                    >
                      {value.name}
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      className="text-xs text-gray-400 mt-1 pl-7"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {value.description}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
