"use client";

import { useEffect, useState } from "react";

interface HeroSectionProps {
  badge: string;
  title: string;
  description: string[];
  ctaText: string;
}

export default function HeroSection({
  badge = "THE ART OF CONVERSATION MEETS THE SCIENCE OF ENGAGEMENT",
  title = "Drive the Dialogue.",
  description = [
    "Pulp is a premium engagement system for full-stack, full-cycle communication and language-based automation. We help businesses craft, deploy, and monitor conversations across social media, news platforms, and internal communications. Every interaction is analyzed through the lens of persuasion to reveal what moves people.",
    "With Pulp, you gain control of your narrative by applying neurolinguistics to real conversations, turning language into leverage."
  ],
  ctaText = "Request Demo"
}: Partial<HeroSectionProps>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full max-w-full mx-auto overflow-x-hidden px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text Content */}
        <div className={`flex-1 space-y-6 md:space-y-8 ${isMobile ? 'text-center w-full' : ''}`}>
          <div className={`${isMobile ? 'flex justify-center' : 'inline-block'}`}>
            <span className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-purple-600 ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium tracking-wider max-w-full break-words`}>
              {isMobile ? "CONVERSATION MEETS ENGAGEMENT" : badge}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-purple-400 break-words">
            {title}
          </h1>
          
          {description.map((paragraph, index) => (
            <p key={index} className={`text-gray-300 text-base sm:text-lg md:text-xl ${isMobile ? 'mx-auto' : 'max-w-2xl'} break-words`}>
              {paragraph}
            </p>
          ))}
          
          <div className={`${isMobile ? 'flex justify-center' : ''}`}>
            <button className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-purple-600 rounded-lg text-white font-medium transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105">
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
            </button>
          </div>
        </div>
        
        <HeroVisual isMobile={isMobile} />
      </div>
    </div>
  );
}

function HeroVisual({ isMobile }: { isMobile?: boolean }) {
  return (
    <div className={`relative ${isMobile ? 'w-full' : 'flex-1'} h-[300px] sm:h-[350px] md:h-[500px] rounded-xl overflow-hidden backdrop-blur`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/60 to-purple-800/30 mix-blend-overlay z-10 rounded-xl"></div>
      <div className="absolute inset-0 bg-purple-900/20 z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 relative animate-[spin_20s_linear_infinite]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
            <path fill="#8A3FFC" d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute top-0 left-0 opacity-10" style={{transform: 'scale(0.8) rotate(120deg)'}}>
            <path fill="#FF66C4" d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute top-0 left-0 opacity-10" style={{transform: 'scale(0.6) rotate(240deg)'}}>
            <path fill="#10B981" d="M44.7,-76.4C58.9,-69.2,71.8,-59,79.6,-45.3C87.4,-31.7,90.2,-14.4,88.1,1.8C86,18.1,79,33.1,69.9,47.2C60.8,61.2,49.7,74.2,35.9,80.7C22.1,87.2,5.7,87,-9.2,83.1C-24.1,79.3,-37.6,71.9,-47.7,61.8C-57.8,51.8,-64.6,39.1,-71.6,25.6C-78.7,12.1,-86,-2.3,-83.9,-14.2C-81.7,-26.1,-70.1,-35.6,-58.9,-43.3C-47.7,-51,-36.9,-56.8,-25.8,-65C-14.6,-73.2,-3.2,-83.6,9.4,-87.2C21.9,-90.7,30.5,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="p-2 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
          <div className="grid grid-cols-2 gap-2">
            {isMobile ? (
              <>
                <div className="h-14 w-16 sm:h-16 sm:w-20 bg-purple-600/80 rounded animate-pulse"></div>
                <div className="h-14 w-16 sm:h-16 sm:w-20 bg-purple-800/80 rounded animate-pulse delay-300"></div>
                <div className="h-14 w-16 sm:h-16 sm:w-20 bg-green-500/40 rounded animate-pulse delay-500"></div>
                <div className="h-14 w-16 sm:h-16 sm:w-20 bg-gray-800/80 rounded animate-pulse delay-700"></div>
              </>
            ) : (
              <>
                <div className="h-20 w-32 bg-purple-600/80 rounded animate-pulse"></div>
                <div className="h-20 w-32 bg-purple-800/80 rounded animate-pulse delay-300"></div>
                <div className="h-20 w-32 bg-green-500/40 rounded animate-pulse delay-500"></div>
                <div className="h-20 w-32 bg-gray-800/80 rounded animate-pulse delay-700"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 