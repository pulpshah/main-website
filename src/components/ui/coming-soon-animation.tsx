"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ComingSoonAnimationProps {
  className?: string;
}

export function ComingSoonAnimation({ className }: ComingSoonAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      document.querySelectorAll('.pulse-circle').forEach((circle) => {
        circle.classList.remove('animate-pulse');
        setTimeout(() => {
          circle.classList.add('animate-pulse');
        }, 10);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("relative w-full h-full max-w-md mx-auto", className)}>
      <svg 
        className={cn(
          "w-full transition-opacity duration-1000", 
          isVisible ? "opacity-100" : "opacity-0"
        )}
        viewBox="0 0 400 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          
          {/* Glowing effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background rect */}
        <rect width="400" height="200" rx="10" fill="url(#bgGradient)" />
        
        {/* Decorative circles */}
        <circle 
          className="pulse-circle"
          cx="80" 
          cy="40" 
          r="15" 
          fill="#ff00ff" 
          opacity="0.6" 
          filter="url(#glow)"
        >
          <animate 
            attributeName="r" 
            from="15" 
            to="18" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        <circle 
          className="pulse-circle"
          cx="320" 
          cy="160" 
          r="20" 
          fill="#9333ea" 
          opacity="0.6" 
          filter="url(#glow)"
        >
          <animate 
            attributeName="r" 
            from="20" 
            to="25" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        <circle 
          className="pulse-circle"
          cx="350" 
          cy="50" 
          r="12" 
          fill="#10b981" 
          opacity="0.5" 
          filter="url(#glow)"
        >
          <animate 
            attributeName="r" 
            from="12" 
            to="16" 
            dur="2.5s" 
            repeatCount="indefinite" 
          />
        </circle>
        
        {/* "Coming Soon" text with animated stroke */}
        <text 
          x="200" 
          y="100" 
          textAnchor="middle" 
          className="text-4xl font-bold" 
          fill="none" 
          stroke="#e879f9" 
          strokeWidth="1.5"
          filter="url(#glow)"
        >
          COMING SOON
          <animate 
            attributeName="stroke-dasharray" 
            from="0 300" 
            to="300 0" 
            dur="4s" 
            begin="0.5s"
            fill="freeze" 
          />
        </text>
        
        {/* Filled text that appears after stroke animation */}
        <text 
          x="200" 
          y="100" 
          textAnchor="middle" 
          className="text-4xl font-bold" 
          fill="white"
          opacity="0"
        >
          COMING SOON
          <animate 
            attributeName="opacity" 
            from="0" 
            to="1" 
            dur="1s" 
            begin="4.5s"
            fill="freeze" 
          />
        </text>
        
        {/* Animated line below text */}
        <line 
          x1="100" 
          y1="120" 
          x2="100" 
          y2="120" 
          stroke="#e879f9" 
          strokeWidth="2"
        >
          <animate 
            attributeName="x2" 
            from="100" 
            to="300" 
            dur="2s" 
            begin="5s"
            fill="freeze" 
          />
        </line>
        
        {/* Decorative dots animation */}
        <g>
          <circle cx="180" cy="150" r="0" fill="#d946ef">
            <animate 
              attributeName="r" 
              from="0" 
              to="5" 
              dur="0.5s" 
              begin="6s"
              fill="freeze" 
            />
          </circle>
          <circle cx="200" cy="150" r="0" fill="#d946ef">
            <animate 
              attributeName="r" 
              from="0" 
              to="5" 
              dur="0.5s" 
              begin="6.2s"
              fill="freeze" 
            />
          </circle>
          <circle cx="220" cy="150" r="0" fill="#d946ef">
            <animate 
              attributeName="r" 
              from="0" 
              to="5" 
              dur="0.5s" 
              begin="6.4s"
              fill="freeze" 
            />
          </circle>
        </g>
      </svg>
    </div>
  );
} 