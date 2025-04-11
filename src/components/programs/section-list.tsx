"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  ProjectBasedVisual,
  MentorshipVisual,
  ThinkBuildVisual,
  DiverseFieldsVisual, 
  MutualMentorshipVisual,
  CollaborativeVisual,
  CareerAccelerationVisual,
  BridgePerspectivesVisual,
  ShapeNextVisual
} from "./visualizations";

interface PointProps {
  title: string;
  description: string;
  icon: string;
}

interface SectionProps {
  title: string;
  subtitle: string;
  description: string;
  points: PointProps[];
  color: "green" | "amber" | "purple" | "blue";
  index: number;
}

const colorMap = {
  green: {
    text: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    fill: "#10B981",
    accent: "#059669",
    glow: "rgba(16,185,129,0.5)",
    gradient: "from-green-600 to-green-400",
  },
  amber: {
    text: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    fill: "#F59E0B",
    accent: "#D97706",
    glow: "rgba(255,165,0,0.5)",
    gradient: "from-amber-600 to-amber-400",
  },
  purple: {
    text: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    fill: "#8A3FFC",
    accent: "#7C3AED",
    glow: "rgba(168,85,247,0.5)",
    gradient: "from-purple-600 to-purple-400",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    fill: "#3B82F6",
    accent: "#2563EB",
    glow: "rgba(59,130,246,0.5)",
    gradient: "from-blue-600 to-blue-400",
  },
};

function Section({ title, subtitle, description, points, color, index }: SectionProps) {
  const [currentPoint, setCurrentPoint] = useState(0);
  const ref = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];

  // Function to start the rotation timer
  const startRotationTimer = () => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set a new interval
    intervalRef.current = setInterval(() => {
      setCurrentPoint((prev) => (prev + 1) % points.length);
    }, 6000);
  };

  // Automatically rotate through points
  useEffect(() => {
    if (!isInView) return;
    
    startRotationTimer();
    
    // Clean up the interval when the component unmounts or loses view
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView, points.length, startRotationTimer]);

  // Handle point click with timer reset
  const handlePointClick = (idx: number) => {
    setCurrentPoint(idx);
    startRotationTimer(); // Reset the timer when a point is manually selected
  };

  // Determine which visualization to render based on section index and current point
  const renderVisualization = () => {
    if (index === 0) { // About the Program
      if (currentPoint === 0) return <ProjectBasedVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 1) return <MentorshipVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 2) return <ThinkBuildVisual colorConfig={colorConfig} isInView={isInView} />;
    } else if (index === 1) { // Rooted in Culture
      if (currentPoint === 0) return <DiverseFieldsVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 1) return <MutualMentorshipVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 2) return <CollaborativeVisual colorConfig={colorConfig} isInView={isInView} />;
    } else if (index === 2) { // Why It Matters
      if (currentPoint === 0) return <CareerAccelerationVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 1) return <BridgePerspectivesVisual colorConfig={colorConfig} isInView={isInView} />;
      if (currentPoint === 2) return <ShapeNextVisual colorConfig={colorConfig} isInView={isInView} />;
    }
    
    // Default fallback (should never happen)
    return <ProjectBasedVisual colorConfig={colorConfig} isInView={isInView} />;
  };

  return (
    <div 
      ref={ref}
      className={`py-16 md:py-24 w-full bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
          {/* Text content */}
          <div className="flex-1 space-y-6 md:space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className={`text-3xl md:text-4xl font-bold ${colorConfig.text} mb-2`}>
                {title}
              </h2>
              <p className="text-xl text-white font-medium mb-4">{subtitle}</p>
              <p className="text-gray-300 mb-8">{description}</p>
            </motion.div>

            {/* Points navigator */}
            <div className="space-y-4">
              {points.map((point, idx) => (
                <motion.div 
                  key={idx}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    currentPoint === idx 
                      ? `bg-gray-800 ${colorConfig.border} shadow-lg` 
                      : 'bg-transparent hover:bg-gray-800/50'
                  }`}
                  onClick={() => handlePointClick(idx)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                >
                  <h3 className={`font-medium ${currentPoint === idx ? colorConfig.text : 'text-white'}`}>
                    {point.title}
                  </h3>
                  {currentPoint === idx && (
                    <motion.p 
                      className="text-gray-300 mt-2 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {point.description}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress indicator */}
            <motion.div 
              className="flex space-x-2 mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {points.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    currentPoint === idx 
                      ? `w-8 bg-gradient-to-r ${colorConfig.gradient}` 
                      : 'w-2 bg-gray-600'
                  }`}
                  onClick={() => handlePointClick(idx)}
                  aria-label={`Go to point ${idx + 1}`}
                  style={currentPoint === idx ? {
                    boxShadow: `0 0 10px ${colorConfig.glow}`
                  } : {}}
                />
              ))}
            </motion.div>
          </div>

          {/* Visualization */}
          <motion.div 
            className="flex-1 h-[350px] md:h-[450px] w-full max-w-xl rounded-xl overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={`absolute inset-0 rounded-xl ${colorConfig.bg} ${colorConfig.border} backdrop-blur-sm overflow-hidden`}>
              {renderVisualization()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ProgramSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div>
      {sections.map((section, idx) => (
        <Section key={idx} {...section} index={idx} />
      ))}
    </div>
  );
} 