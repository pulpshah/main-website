"use client";

import { useState } from "react";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export default function CtaSection({
  title = "Ready to Strengthen Your Engagement?",
  subtitle = "Start Driving Meaningful Connections Today",
  description = "Discover how Pulp's engagement platform can transform your communication strategy and help you connect with what truly motivates your audience.",
  primaryButtonText = "Request Demo",
  secondaryButtonText = "Talk to Sales"
}: CtaSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background with gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl opacity-60 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-green-500/10 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>
        
        {/* Content */}
        <div className="relative z-10 py-12 px-6 sm:px-12 md:py-16 md:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {title}
              </h2>
              <p className="text-xl text-purple-300 font-medium">
                {subtitle}
              </p>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {description}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium shadow-lg shadow-purple-900/30 transition-all hover:shadow-xl hover:shadow-purple-700/40 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex items-center justify-center gap-2">
                  {primaryButtonText}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </button>
              
              <button className="px-8 py-4 bg-gray-800/80 border border-gray-700 rounded-lg text-white font-medium transition-all hover:bg-gray-700/80">
                {secondaryButtonText}
              </button>
            </div>
            
            {/* Decorative element */}
            <div className="pt-6">
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Border gradient */}
        <div className="absolute inset-0 border border-purple-500/20 rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  );
} 