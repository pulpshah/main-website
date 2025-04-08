"use client";

import { useEffect, useRef, useState } from "react";

interface RiskItem {
  title: string;
  description: string;
}

interface RiskSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  risks: RiskItem[];
}

export default function RiskSection({
  title = "Engagement data without direction goes nowhere.",
  subtitle = "You're Either Ahead of the Conversation or Behind It",
  description = "Incorrectly measuring engagement skews data, making improvement challenging, harming reputation, and eroding stakeholder confidence.",
  ctaText = "Let's Talk Risk Mitigation",
  risks = [
    {
      title: "Mistaking Quantity for Quality",
      description: "More interactions don't mean better engagement. Without clear goals, engagement data is noisy. If you can't measure quality, you can't improve it."
    },
    {
      title: "Failing to Read the Room",
      description: "Context isn't just words; it's when, where, and how people engage. Ignoring behavioral signals leads to misread urgency, intent, and interest, causing engagement to miss the mark."
    },
    {
      title: "Forgetting to Ask \"Why?\"",
      description: "Tracking what happens without understanding why leaves AI blind to intent. Without this depth, AI solutions remain rigid, failing to adapt to real human perspectives."
    }
  ]
}: Partial<RiskSectionProps>) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Intersection observer for header animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          style={{
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <div className="inline-block mb-4">
          <span className="px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-red-600 text-xs font-medium tracking-wider max-w-full break-words text-white shadow-[0_0_10px_2px_rgba(248,113,113,0.75)] ">
            RISK MITIGATION
          </span>
        </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
            {title}
          </h2>
          
          <h3 className="text-xl md:text-2xl font-semibold text-red-300 mb-6">
            {subtitle}
          </h3>
          
          <p className="text-gray-300 text-lg mb-10">
            {description}
          </p>
          
          <button className="group relative px-8 py-4 bg-red-700 hover:bg-red-600 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(248,113,113,0.4)] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              {ctaText}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
        
        {/* Risk cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {risks.map((risk, index) => (
            <RiskCard 
              key={index}
              risk={risk} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RiskCard({ risk, index }: { risk: RiskItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Custom animation effects based on card index
  const getRiskIcon = () => {
    const icons = [
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" key="icon-1">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>,
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" key="icon-2">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>,
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" key="icon-3">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ];
    
    return icons[index % icons.length];
  };

  // Different colors for each card
  const getCardColors = () => {
    const colorSchemes = [
      { border: "border-red-900/20", icon: "text-red-400", highlight: "text-red-400", glow: "bg-red-700/10", accent: "bg-red-700/30" },
      { border: "border-purple-900/20", icon: "text-purple-400", highlight: "text-purple-400", glow: "bg-purple-700/10", accent: "bg-purple-700/30" },
      { border: "border-blue-900/20", icon: "text-blue-400", highlight: "text-blue-400", glow: "bg-blue-700/10", accent: "bg-blue-700/30" }
    ];
    
    return colorSchemes[index % colorSchemes.length];
  };
  
  const colors = getCardColors();
  
  return (
    <div 
      ref={cardRef}
      className={`relative bg-gradient-to-br from-gray-900/80 to-gray-900/40 ${colors.border} rounded-xl overflow-hidden group hover:bg-gray-900/60 transition-all duration-500 shadow-lg hover:shadow-xl`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${index * 200}ms, transform 0.8s ease ${index * 200}ms`
      }}
      suppressHydrationWarning
    >
      {/* Number indicator */}
      <div 
        className={`absolute -top-3 -left-3 w-16 h-16 ${colors.glow} rounded-full flex items-center justify-center text-xl font-bold ${colors.icon} opacity-20 group-hover:opacity-40 transition-all duration-500`}
        suppressHydrationWarning
      >
        <span>{index + 1}</span>
      </div>
      
      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 ${colors.accent} w-0 group-hover:w-full transition-all duration-700 ease-in-out`}></div>
      
      {/* Right side glow effect */}
      <div className={`absolute -right-4 top-1/2 w-8 h-32 ${colors.glow} blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700 transform -translate-y-1/2`}></div>
      
      <div className="p-8 relative z-10">
        <div className="mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full ${colors.glow} ${colors.icon} flex items-center justify-center mr-4 transform group-hover:scale-110 transition-transform duration-500`}>
              {getRiskIcon()}
            </div>
            <h3 className={`text-xl font-semibold text-white transition-colors duration-300`}>
              {risk.title}
            </h3>
          </div>
        </div>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 pl-14 leading-relaxed">
          {risk.description}
        </p>
      </div>
    </div>
  );
} 