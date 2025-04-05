"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SolutionHeroProps {
  badge: string;
  title: string;
  description: string;
  primaryColor: "purple" | "pink" | "green" | "blue" | "red";
  accentColor: "purple" | "pink" | "green" | "blue" | "red";
  tertiaryColor: "purple" | "pink" | "green" | "blue" | "red";
  imagePath: string;
}

const colorMap = {
  purple: {
    text: "text-purple-400",
    gradient: "from-purple-600 to-purple-400",
    gradientAlt: "from-purple-900/20 to-purple-800/0",
    gradientOverlay: "from-purple-900/60 to-purple-800/30",
    glow: "rgba(168,85,247,0.5)",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    fill: "#8A3FFC",
    fillOpacity: "0.2",
  },
  pink: {
    text: "text-pink-400",
    gradient: "from-pink-600 to-pink-400",
    gradientAlt: "from-pink-900/20 to-pink-800/0",
    gradientOverlay: "from-pink-900/60 to-pink-800/30",
    glow: "rgba(236,72,153,0.5)",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    fill: "#FF66C4",
    fillOpacity: "0.15",
  },
  green: {
    text: "text-green-400",
    gradient: "from-green-600 to-green-400",
    gradientAlt: "from-green-900/20 to-green-800/0",
    gradientOverlay: "from-green-900/60 to-green-800/30",
    glow: "rgba(16,185,129,0.5)",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    fill: "#10B981",
    fillOpacity: "0.1",
  },
  blue: {
    text: "text-blue-400",
    gradient: "from-blue-600 to-blue-400",
    gradientAlt: "from-blue-900/20 to-blue-800/0",
    gradientOverlay: "from-blue-900/60 to-blue-800/30",
    glow: "rgba(59,130,246,0.5)",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    fill: "#3B82F6",
    fillOpacity: "0.15",
  },
  red: {
    text: "text-red-400",
    gradient: "from-red-600 to-red-400",
    gradientAlt: "from-red-900/20 to-red-800/0",
    gradientOverlay: "from-red-900/60 to-red-800/30",
    glow: "rgba(239,68,68,0.5)",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    fill: "#EF4444",
    fillOpacity: "0.15",
  },
};

export default function SolutionHero({
  badge = "SOLUTION",
  title = "Solution Title",
  description = "Solution description goes here...",
  primaryColor = "purple",
  accentColor = "pink",
  tertiaryColor = "green",
  imagePath = "/default-solution.svg",
}: SolutionHeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const primary = colorMap[primaryColor];
  const accent = colorMap[accentColor];
  const tertiary = colorMap[tertiaryColor];

  return (
    <div className="w-full max-w-full mx-auto overflow-x-hidden px-4 sm:px-6 py-16 md:py-20 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(${primary.fill}_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]`}></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10">
          {/* Text Content */}
          <motion.div 
            className={`flex-1 space-y-6 md:space-y-8 ${isMobile ? 'text-center w-full order-2' : 'order-1'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`${isMobile ? 'flex justify-center' : 'inline-block'}`}>
              <motion.span 
                className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-gradient-to-r ${primary.gradient} ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium tracking-wider max-w-full break-words text-white`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {badge}
              </motion.span>
            </div>
            
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${primary.text} break-words`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className={`text-gray-300 text-base sm:text-lg md:text-xl ${isMobile ? 'mx-auto' : 'max-w-2xl'} break-words`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              className={`${isMobile ? 'flex justify-center' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button className={`group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r ${primary.gradient} rounded-lg text-white font-medium transition-all hover:shadow-[0_0_20px_${primary.glow}] hover:scale-105`}>
                Request Demo
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Visual Element */}
          <motion.div 
            className={`relative ${isMobile ? 'w-full order-1' : 'flex-1 order-2'} h-[300px] sm:h-[350px] md:h-[500px] rounded-xl overflow-hidden backdrop-blur`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${primary.gradientOverlay} mix-blend-overlay z-10 rounded-xl`}></div>
            <div className={`absolute inset-0 bg-gradient-to-b ${primary.gradientAlt} z-0 rounded-xl`}></div>
            
            {/* Animated blobs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 relative animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
                  <path fill={primary.fill} d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute top-0 left-0 opacity-10" style={{transform: 'scale(0.8) rotate(120deg)'}}>
                  <path fill={accent.fill} d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute top-0 left-0 opacity-10" style={{transform: 'scale(0.6) rotate(240deg)'}}>
                  <path fill={tertiary.fill} d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
            
            {/* Solution-specific visualization */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                type: "spring", 
                stiffness: 100 
              }}
            >
              <div className={`p-3 md:p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border ${primary.border} shadow-[0_0_30px_${primary.glow}]`}>
                <img 
                  src={imagePath} 
                  alt={title}
                  className="w-full h-full object-contain max-w-[400px]" 
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 