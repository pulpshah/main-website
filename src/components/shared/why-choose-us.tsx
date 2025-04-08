"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WhyChooseUsProps {
  title: string;
  description: string;
  features: string[];
  conclusion: string;
  ctaText: string;
  ctaLink: string;
  primaryColor: "purple" | "pink" | "green" | "blue" | "red" | "amber";
}

const colorMap = {
  purple: {
    gradient: "from-purple-600 to-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    shadow: "shadow-purple-900/20",
    hoverShadow: "shadow-purple-800/30",
    glow: "rgba(168,85,247,0.5)",
  },
  pink: {
    gradient: "from-pink-600 to-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    shadow: "shadow-pink-900/20",
    hoverShadow: "shadow-pink-800/30",
    glow: "rgba(236,72,153,0.5)",
  },
  green: {
    gradient: "from-green-600 to-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    shadow: "shadow-green-900/20",
    hoverShadow: "shadow-green-800/30",
    glow: "rgba(16,185,129,0.5)",
  },
  blue: {
    gradient: "from-blue-600 to-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    shadow: "shadow-blue-900/20",
    hoverShadow: "shadow-blue-800/30",
    glow: "rgba(59,130,246,0.5)",
  },
  red: {
    gradient: "from-red-600 to-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    shadow: "shadow-red-900/20",
    hoverShadow: "shadow-red-800/30",
    glow: "rgba(239,68,68,0.5)",
  },
  amber: {
    gradient: "from-amber-600 to-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    shadow: "shadow-amber-900/20",
    hoverShadow: "shadow-amber-800/30",
    glow: "rgba(255,165,0,0.5)",
  },
};

export default function WhyChooseUs({
  title = "Why Pulp?",
  description = "Most tools help you react. Pulp helps you direct.",
  features = [
    "AI-powered persuasion modeling",
    "Real-time discourse mapping",
    "Engagement insights",
  ],
  conclusion = "Pulp ensures every conversation is strategic, effective, and impossible to ignore.",
  ctaText = "Request a Demo",
  ctaLink = "/contact",
  primaryColor = "purple",
}: WhyChooseUsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[primaryColor];
  
  return (
    <div ref={ref} className="py-16 w-full px-4 sm:px-6 relative">
      {/* Background pattern/radial gradient */}
      <div className="absolute inset-0 bg-black opacity-40 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold ${colorConfig.text} mb-4`}
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {title}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
            }}
          >
            {description}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`p-6 rounded-lg bg-gray-900/50 border ${colorConfig.border} backdrop-blur-sm`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.4 + index * 0.1}s`,
                boxShadow: `0 0 30px ${colorConfig.glow.replace("0.5", "0.1")}`
              }}
            >
              <div 
                className={`w-12 h-12 rounded-full ${colorConfig.bg} flex items-center justify-center mb-4`}
                style={{
                  boxShadow: `0 0 20px ${colorConfig.glow.replace("0.5", "0.2")}`
                }}
              >
                <div className={`text-2xl font-bold ${colorConfig.text}`}>{index + 1}</div>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{feature}</h3>
              <div 
                className={`h-1 w-16 bg-gradient-to-r ${colorConfig.gradient} rounded-full mt-4`}
                style={{
                  boxShadow: `0 0 10px ${colorConfig.glow.replace("0.5", "0.3")}`
                }}
              ></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s"
          }}
        >
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">{conclusion}</p>
          
          <a 
            href={ctaLink}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${colorConfig.gradient} rounded-lg text-white font-medium transition-all hover:shadow-lg ${colorConfig.shadow} hover:${colorConfig.hoverShadow} hover:scale-105`}
            style={{
              boxShadow: `0 8px 20px ${colorConfig.glow.replace("0.5", "0.2")}`
            }}
          >
            {ctaText}
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
          </a>
        </motion.div>
      </div>
    </div>
  );
} 