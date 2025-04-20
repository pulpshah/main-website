"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shapes, ArrowRightLeft } from "lucide-react";

interface DifferentVisualProps {
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

export function DifferentVisual({ colorConfig, isInView }: DifferentVisualProps) {
  const [activeStage, setActiveStage] = useState(0);
  
  const transformationStages = [
    {
      title: "Traditional",
      description: "Limited, rule-based",
      shapes: [
        { type: "circle", x: 150, y: 80, size: 40, opacity: 0.7 },
        { type: "square", x: 80, y: 130, size: 35, opacity: 0.5 },
        { type: "triangle", x: 200, y: 170, size: 30, opacity: 0.6 },
      ]
    },
    {
      title: "Enhanced",
      description: "Statistical, probabilistic",
      shapes: [
        { type: "circle", x: 140, y: 90, size: 45, opacity: 0.8 },
        { type: "square", x: 90, y: 120, size: 40, opacity: 0.6 },
        { type: "triangle", x: 190, y: 160, size: 35, opacity: 0.7 },
        { type: "hexagon", x: 120, y: 180, size: 30, opacity: 0.5 },
        { type: "diamond", x: 220, y: 110, size: 25, opacity: 0.6 },
      ]
    },
    {
      title: "Neural",
      description: "Deep learning, embeddings",
      shapes: [
        { type: "circle", x: 120, y: 100, size: 50, opacity: 0.9 },
        { type: "square", x: 100, y: 110, size: 45, opacity: 0.7 },
        { type: "triangle", x: 180, y: 150, size: 40, opacity: 0.8 },
        { type: "hexagon", x: 130, y: 170, size: 35, opacity: 0.6 },
        { type: "diamond", x: 210, y: 120, size: 30, opacity: 0.7 },
        { type: "pentagon", x: 90, y: 190, size: 25, opacity: 0.5 },
        { type: "star", x: 170, y: 80, size: 20, opacity: 0.6 },
      ]
    },
    {
      title: "Pulp",
      description: "Synergistic, emergent",
      shapes: [
        { type: "circle", x: 100, y: 110, size: 55, opacity: 1.0 },
        { type: "square", x: 110, y: 100, size: 50, opacity: 0.9 },
        { type: "triangle", x: 170, y: 140, size: 45, opacity: 1.0 },
        { type: "hexagon", x: 140, y: 160, size: 40, opacity: 0.8 },
        { type: "diamond", x: 200, y: 130, size: 35, opacity: 0.9 },
        { type: "pentagon", x: 100, y: 180, size: 30, opacity: 0.7 },
        { type: "star", x: 160, y: 90, size: 25, opacity: 0.8 },
        { type: "octagon", x: 120, y: 150, size: 20, opacity: 0.6 },
        { type: "ellipse", x: 180, y: 170, size: 15, opacity: 0.7 },
      ]
    },
  ];
  
  useEffect(() => {
    if (!isInView) {
      setActiveStage(0);
      return;
    }
    
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % transformationStages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView, transformationStages.length]);
  
  // Render shape based on type
  const renderShape = (shape: { type: string; x: number; y: number; size: number; opacity: number }) => {
    const { type, x, y, size, opacity } = shape;
    const color = colorConfig.primary.replace('bg-', '');
    
    switch (type) {
      case "circle":
        return (
          <circle 
            cx={x} 
            cy={y} 
            r={size / 2} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "square":
        return (
          <rect 
            x={x - size / 2} 
            y={y - size / 2} 
            width={size} 
            height={size} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "triangle":
        const points = `${x},${y - size / 2} ${x - size / 2},${y + size / 2} ${x + size / 2},${y + size / 2}`;
        return (
          <polygon 
            points={points} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "hexagon":
        const hexPoints = Array.from({length: 6}, (_, i) => {
          const angle = Math.PI / 3 * i;
          const hx = x + size / 2 * Math.cos(angle);
          const hy = y + size / 2 * Math.sin(angle);
          return `${hx},${hy}`;
        }).join(' ');
        return (
          <polygon 
            points={hexPoints} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "diamond":
        const diamondPoints = `${x},${y-size/2} ${x+size/2},${y} ${x},${y+size/2} ${x-size/2},${y}`;
        return (
          <polygon 
            points={diamondPoints} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "pentagon":
        const pentPoints = Array.from({length: 5}, (_, i) => {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const px = x + size / 2 * Math.cos(angle);
          const py = y + size / 2 * Math.sin(angle);
          return `${px},${py}`;
        }).join(' ');
        return (
          <polygon 
            points={pentPoints} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "star":
        const starPoints = Array.from({length: 10}, (_, i) => {
          const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
          const radius = i % 2 === 0 ? size / 2 : size / 4;
          const sx = x + radius * Math.cos(angle);
          const sy = y + radius * Math.sin(angle);
          return `${sx},${sy}`;
        }).join(' ');
        return (
          <polygon 
            points={starPoints} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "octagon":
        const octPoints = Array.from({length: 8}, (_, i) => {
          const angle = (Math.PI * 2 * i) / 8;
          const ox = x + size / 2 * Math.cos(angle);
          const oy = y + size / 2 * Math.sin(angle);
          return `${ox},${oy}`;
        }).join(' ');
        return (
          <polygon 
            points={octPoints} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      case "ellipse":
        return (
          <ellipse 
            cx={x} 
            cy={y} 
            rx={size / 2} 
            ry={size / 4} 
            className={`fill-${color} opacity-${opacity * 100}`} 
          />
        );
      default:
        return null;
    }
  };
  
  // Connection lines effect animation variant
  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.5,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
  };
  
  return (
    <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center">
      <div className="relative w-full max-w-md h-full">
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
          {/* Background patterns */}
          <div className="absolute inset-0 opacity-10">
            <Shapes className="absolute right-5 bottom-5 w-32 h-32 text-gray-600" />
          </div>
        </motion.div>
        
        {/* Timeline progress bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className={cn("h-full rounded-full", colorConfig.primary)}
            initial={{ width: "0%" }}
            animate={{ width: `${(activeStage / (transformationStages.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Stage title */}
        <motion.div
          className={cn(
            "absolute top-8 left-1/2 -translate-x-1/2",
            "text-lg font-bold text-center",
            colorConfig.text
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {transformationStages[activeStage].title}
          <motion.div
            className="text-xs font-medium text-gray-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {transformationStages[activeStage].description}
          </motion.div>
        </motion.div>
        
        {/* Transformation icon */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-center">
            <ArrowRightLeft 
              className={cn(
                "w-8 h-8",
                colorConfig.text
              )} 
            />
          </div>
          <div className={cn(
            "text-xs font-medium mt-1",
            colorConfig.text
          )}>
            Transformational Approach
          </div>
        </motion.div>
        
        {/* Shape visualization */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg width="300" height="200" viewBox="0 0 300 200">
            {/* Connection lines */}
            {activeStage > 0 && transformationStages[activeStage].shapes.map((shape, i) => {
              // Draw connections from previous stage shapes to current stage shapes when possible
              if (i < transformationStages[activeStage - 1].shapes.length) {
                const prevShape = transformationStages[activeStage - 1].shapes[i];
                return (
                  <motion.path
                    key={`connection-${i}`}
                    d={`M${prevShape.x},${prevShape.y} C${(prevShape.x + shape.x) / 2 - 30},${prevShape.y} ${(prevShape.x + shape.x) / 2 + 30},${shape.y} ${shape.x},${shape.y}`}
                    stroke={colorConfig.primary.replace('bg-', '#')}
                    strokeWidth="1"
                    fill="none"
                    variants={connectionVariants}
                    initial="hidden"
                    animate="visible"
                  />
                );
              }
              return null;
            })}
            
            {/* Current stage shapes */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {transformationStages[activeStage].shapes.map((shape, i) => (
                <motion.g
                  key={`shape-${i}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.1 * i
                  }}
                >
                  {renderShape(shape)}
                </motion.g>
              ))}
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Stage indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2">
          {transformationStages.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full",
                index === activeStage ? colorConfig.primary : "bg-gray-700"
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 * index }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 