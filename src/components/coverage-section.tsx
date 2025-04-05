"use client";

import { useEffect, useRef, useState } from "react";

interface CoverageItem {
  title: string;
  description: string;
}

interface CoverageSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  coverageAreas: CoverageItem[];
}

export default function CoverageSection({
  title = "Make Every Touchpoint an Advantage",
  subtitle = "Amplify Engagement Anytime, Anywhere.",
  description = "People navigate multiple roles in their daily lives. Pulp AI features are built to understand and adapt to individuals' communication needs across personal, professional, and civic contexts.",
  ctaText = "Get Full Coverage Engagement Tools",
  coverageAreas = [
    {
      title: "Individual & Personal Use",
      description: "Master your own reasoning. See your communication patterns, refine your argument strength, and make smarter decisions."
    },
    {
      title: "Business & Commercial Use",
      description: "Elevate customer interactions, refine internal workflows, and accelerate decision-making with precision."
    },
    {
      title: "Civic & Government Use",
      description: "Track persuasion, expose misinformation, and mobilize people to influence change where it matters most."
    }
  ]
}: Partial<CoverageSectionProps>) {
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
      {/* Geometric background elements - keeping transparent */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div 
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-20"
          style={{
            opacity: isHeaderVisible ? 1 : 0,
            transform: isHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}
        >
          <div className="inline-flex items-center justify-center bg-green-900/20 backdrop-blur-sm px-5 py-1.5 rounded-full mb-6 border border-green-500/30">
            <span className="text-green-300 text-sm font-medium tracking-wider">UNIVERSAL COVERAGE</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {title}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6"></div>
          
          <h3 className="text-xl md:text-2xl font-semibold text-green-100 mb-6">
            {subtitle}
          </h3>
          
          <p className="text-gray-300 text-lg mb-10">
            {description}
          </p>
          
          <div className="relative group inline-block">
            <button className="relative z-10 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] overflow-hidden group-hover:scale-[1.02]">
              {ctaText}
            </button>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-400 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          </div>
        </div>
        
        {/* Coverage cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch justify-center">
          {coverageAreas.map((area, index) => (
            <CoverageCard 
              key={index}
              area={area} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CoverageCard({ area, index }: { area: CoverageItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Icons for each coverage area with updated styling
  const icons = [
    // Person icon
    <svg key="person" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>,
    // Building icon
    <svg key="business" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
    </svg>,
    // Globe icon
    <svg key="civic" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
    </svg>
  ];

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
  
  return (
    <div 
      ref={cardRef}
      className="h-full flex flex-col relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${index * 200}ms, transform 0.8s ease ${index * 200}ms`
      }}
    >
      {/* Shield coverage effect on hover */}
      <div className="absolute inset-0 bg-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden">
        <div className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] rounded-full border-8 border-green-500/10 scale-0 group-hover:scale-100 transition-transform duration-1000 delay-100"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-[160%] rounded-full border-4 border-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-1000 delay-200"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-full border-2 border-green-300/10 scale-0 group-hover:scale-100 transition-transform duration-1000 delay-300"></div>
        </div>
      </div>
      
      {/* Card */}
      <div className="backdrop-blur-sm rounded-xl overflow-hidden relative h-full">
        {/* Card border glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Card inner content */}
        <div className="relative z-10 p-8 flex flex-col h-full border border-gray-800/50 rounded-xl bg-black/40 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-28 h-28 bg-green-500/5 rounded-bl-full group-hover:bg-green-500/10 transition-colors duration-500"></div>
          
          {/* Coverage shield icon on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500/40" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Top icon section with number */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
              {icons[index]}
            </div>
            <span className="font-mono text-2xl font-bold text-gray-500 opacity-40">0{index + 1}</span>
            <div className="h-px flex-grow bg-gradient-to-r from-green-500 to-transparent opacity-30"></div>
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">
            {area.title}
          </h3>
          
          <p className="text-gray-400 leading-relaxed flex-grow">
            {area.description}
          </p>
        </div>
      </div>
    </div>
  );
} 