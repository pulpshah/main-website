"use client";

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

// Define icon map for different section icons
const iconMap = {
  ChartBar: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Brain: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  BeakerCheck: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Shield: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Lightning: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// Define color configurations for different section colors
const colorMap = {
  blue: {
    primary: "text-blue-400",
    secondary: "text-blue-300",
    accent: "text-cyan-400",
    background: "bg-blue-500",
    backgroundOpacity: "bg-blue-500/10",
    backgroundHover: "hover:bg-blue-500/20",
    backgroundActive: "bg-blue-500/20",
    backgroundGradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/10",
    shadowAccent: "shadow-cyan-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  green: {
    primary: "text-green-400",
    secondary: "text-green-300",
    accent: "text-emerald-400",
    background: "bg-green-500",
    backgroundOpacity: "bg-green-500/10",
    backgroundHover: "hover:bg-green-500/20",
    backgroundActive: "bg-green-500/20",
    backgroundGradient: "bg-gradient-to-br from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    shadow: "shadow-green-500/10",
    shadowAccent: "shadow-emerald-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  purple: {
    primary: "text-purple-400",
    secondary: "text-purple-300",
    accent: "text-pink-400",
    background: "bg-purple-500",
    backgroundOpacity: "bg-purple-500/10",
    backgroundHover: "hover:bg-purple-500/20",
    backgroundActive: "bg-purple-500/20",
    backgroundGradient: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    shadow: "shadow-purple-500/10",
    shadowAccent: "shadow-pink-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  amber: {
    primary: "text-amber-400",
    secondary: "text-amber-300",
    accent: "text-orange-400",
    background: "bg-amber-500",
    backgroundOpacity: "bg-amber-500/10",
    backgroundHover: "hover:bg-amber-500/20",
    backgroundActive: "bg-amber-500/20",
    backgroundGradient: "bg-gradient-to-br from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    shadow: "shadow-amber-500/10",
    shadowAccent: "shadow-orange-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
};

function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  
  return (
    <div
      ref={ref}
      className={`py-16 md:py-24 px-4 relative overflow-hidden bg-transparent`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${imageSide === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}>
          {/* Text content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorConfig.backgroundOpacity}`}>
                {icon && iconMap[icon as keyof typeof iconMap](`w-6 h-6 ${colorConfig.primary}`)}
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${colorConfig.primary}`}>
                {title}
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex-1 w-full max-w-xl">
            <EnterpriseVisual index={index} colorConfig={colorConfig} isInView={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterpriseVisual({ 
  index, 
  colorConfig, 
  isInView 
}: { 
  index: number; 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Return different visuals based on section index
  switch (index) {
    case 0:
      return <FavorabilityTrackingVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <AudienceSimulationVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <MessageTestingVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <ThreatDetectionVisual colorConfig={colorConfig} isInView={isInView} />;
    case 4:
      return <CrisisResponseVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return null;
  }
}

function FavorabilityTrackingVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[800px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Analytics Dashboard Area */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Favorability Tracking Dashboard</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Real-time</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Last 24h</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Last 7d</div>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Main Chart Area */}
          <div 
            className="col-span-8 bg-gray-900 rounded-lg border border-gray-800 p-4"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-300">Sentiment Trend</span>
              <span className={`text-xs ${colorConfig.primary}`}>Updated 2 min ago</span>
            </div>
            
            {/* Chart Visualization */}
            <div className="h-64 relative">
              {/* Chart area */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#374151" strokeWidth="0.2" />
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#374151" strokeWidth="0.2" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#374151" strokeWidth="0.2" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#374151" strokeWidth="0.2" />
                  <line x1="0" y1="40" x2="100" y2="40" stroke="#374151" strokeWidth="0.2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#374151" strokeWidth="0.2" />
                  
                  {/* Vertical grid lines */}
                  <line x1="0" y1="0" x2="0" y2="50" stroke="#374151" strokeWidth="0.2" />
                  <line x1="20" y1="0" x2="20" y2="50" stroke="#374151" strokeWidth="0.2" />
                  <line x1="40" y1="0" x2="40" y2="50" stroke="#374151" strokeWidth="0.2" />
                  <line x1="60" y1="0" x2="60" y2="50" stroke="#374151" strokeWidth="0.2" />
                  <line x1="80" y1="0" x2="80" y2="50" stroke="#374151" strokeWidth="0.2" />
                  <line x1="100" y1="0" x2="100" y2="50" stroke="#374151" strokeWidth="0.2" />
                  
                  {/* Positive sentiment line */}
                  <path 
                    d="M0,30 C10,25 20,15 30,18 C40,21 50,15 60,10 C70,5 80,8 90,12 L100,10" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                  />
                  
                  {/* Area under the line with gradient */}
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <path 
                    d="M0,30 C10,25 20,15 30,18 C40,21 50,15 60,10 C70,5 80,8 90,12 L100,10 V50 H0 Z" 
                    fill="url(#blueGradient)" 
                  />
                  
                  {/* Negative sentiment line */}
                  <path 
                    d="M0,35 C5,40 15,43 25,38 C35,33 45,38 55,42 C65,46 75,40 85,35 L100,38" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
              
              {/* Chart labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>12am</span>
                <span>4am</span>
                <span>8am</span>
                <span>12pm</span>
                <span>4pm</span>
                <span>Now</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between text-xs text-gray-500">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex space-x-4 mt-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-300">Positive Sentiment</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-300">Negative Sentiment</span>
              </div>
            </div>
          </div>
          
          {/* Metrics Cards */}
          <div 
            className="col-span-4 grid grid-rows-4 gap-4"
            style={animationDelay(2)}
          >
            {/* Current Favorability */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">Current Favorability</div>
                <div className="text-2xl font-bold text-white">72<span className="text-xl">%</span></div>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+3.2%</span>
              </div>
            </div>
            
            {/* Platform Breakdown */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-xs text-gray-400 mb-3">Platform Breakdown</div>
              <div className="space-y-3">
                {/* Twitter/X */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Twitter/X</span>
                    <span className="text-xs text-white">68%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "68%" }}></div>
                  </div>
                </div>
                
                {/* LinkedIn */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">LinkedIn</span>
                    <span className="text-xs text-white">84%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "84%" }}></div>
                  </div>
                </div>
                
                {/* News Media */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">News Media</span>
                    <span className="text-xs text-white">59%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "59%" }}></div>
                  </div>
                </div>
                
                {/* Facebook */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Facebook</span>
                    <span className="text-xs text-white">71%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "71%" }}></div>
                  </div>
                </div>
                
                {/* Reddit */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Reddit</span>
                    <span className="text-xs text-white">63%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "63%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Insights Row */}
        <div 
          className="grid grid-cols-3 gap-4 mt-4"
          style={animationDelay(3)}
        >
          {/* Key Topics */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">Top Topics</div>
            <div className="flex flex-wrap gap-2">
              <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Product Launch (+28%)</div>
              <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">CEO Statement (+12%)</div>
              <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">Sustainability (+8%)</div>
              <div className="px-2 py-1 rounded-full text-xs bg-red-900/20 text-red-400">Service Outage (-15%)</div>
              <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300">Partnership (+5%)</div>
            </div>
          </div>
          
          {/* Geographic Insights */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">Geographic Hotspots</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${colorConfig.background} mr-2`}></div>
                <span className="text-xs text-gray-300">North America</span>
                <span className="text-xs text-white ml-auto">78%</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${colorConfig.background} mr-2`}></div>
                <span className="text-xs text-gray-300">Europe</span>
                <span className="text-xs text-white ml-auto">72%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs text-gray-300">Asia</span>
                <span className="text-xs text-white ml-auto">65%</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-xs text-gray-300">Latin America</span>
                <span className="text-xs text-white ml-auto">61%</span>
              </div>
            </div>
          </div>
          
          {/* Alert Summary */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">Actionable Insights</div>
            <div className="space-y-2">
              <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                <div className="text-xs text-white">Key Message Resonating</div>
                <div className="text-xs text-gray-400">&quot;Innovation initiative&quot; shows 28% higher engagement</div>
              </div>
              <div className="p-2 rounded bg-gray-800 border-l-2 border-red-500/20">
                <div className="text-xs text-white">Potential Concern</div>
                <div className="text-xs text-gray-400">Negative responses to pricing in European markets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceSimulationVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[900px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* AI Audience Simulation Platform */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Audience Simulation Platform</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>AI-Powered</div>
        </div>
        
        {/* Main simulation content */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Message Input and Simulation Controls */}
          <div 
            className="col-span-5 flex flex-col space-y-4"
            style={animationDelay(1)}
          >
            {/* Message Input Area */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex-1 flex flex-col">
              <div className="text-xs text-gray-400 mb-2">Message Input</div>
              <div className="p-3 bg-gray-800 rounded border border-gray-700 flex-1 text-sm text-gray-300 flex flex-col">
                <div className="flex-1">
                  <p>We are excited to announce our new sustainability initiative that will reduce our carbon footprint by 30% over the next three years. This ambitious plan includes investments in renewable energy, sustainable supply chains, and carbon offset programs.</p>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">150 words</span>
                  <button className={`px-3 py-1 rounded text-xs ${colorConfig.backgroundActive} text-white`}>Update</button>
                </div>
              </div>
            </div>
            
            {/* Audience Selection */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-xs text-gray-400 mb-3">Target Audience Profiles</div>
              <div className="space-y-2">
                <div className={`p-2 rounded ${colorConfig.backgroundActive} flex items-center justify-between`}>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 mr-2">C</div>
                    <span className="text-xs text-white">Consumers (25-45)</span>
                  </div>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 mr-2">I</div>
                    <span className="text-xs text-gray-300">Investors</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 mr-2">P</div>
                    <span className="text-xs text-gray-300">Policy Makers</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 mr-2">E</div>
                    <span className="text-xs text-gray-300">Environmentalists</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simulation Results */}
          <div 
            className="col-span-7 flex flex-col space-y-4"
            style={animationDelay(2)}
          >
            {/* Simulation Status */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-xs text-gray-300">Simulation Active</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-400">Updated 30s ago</span>
                </div>
                <button className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-300">Rerun</button>
              </div>
            </div>
            
            {/* Reaction Simulation Results */}
            <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col">
              <div className="text-xs text-gray-400 mb-3">Predicted Reactions</div>
              
              {/* Sentiment Distribution */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded bg-gray-800 border border-gray-700 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-1">Positive</div>
                  <div className="text-2xl font-bold text-green-400">65%</div>
                </div>
                <div className="p-3 rounded bg-gray-800 border border-gray-700 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-1">Neutral</div>
                  <div className="text-2xl font-bold text-gray-300">24%</div>
                </div>
                <div className="p-3 rounded bg-gray-800 border border-gray-700 flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-1">Negative</div>
                  <div className="text-2xl font-bold text-red-400">11%</div>
                </div>
              </div>
              
              {/* Simulated Response Samples */}
              <div className="flex-1 space-y-3">
                <div className="text-xs text-gray-400">Sample Responses (AI Generated)</div>
                
                {/* Positive Response */}
                <div className="p-3 rounded bg-green-900/20 border border-green-800/30">
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-gray-700 mr-2"></div>
                    <span className="text-xs text-gray-300">Emily W.</span>
                    <div className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] bg-green-900/50 text-green-400">Positive</div>
                  </div>
                  <p className="text-xs text-gray-300">This is exactly what I have been hoping to see from companies like yours. The 30% reduction target is ambitious but necessary. Looking forward to seeing the detailed implementation plan.</p>
                </div>
                
                {/* Neutral Response */}
                <div className="p-3 rounded bg-gray-800 border border-gray-700">
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-gray-700 mr-2"></div>
                    <span className="text-xs text-gray-300">Marcus T.</span>
                    <div className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] bg-gray-700 text-gray-400">Neutral</div>
                  </div>
                  <p className="text-xs text-gray-300">Sounds promising, but I have heard similar commitments before. Will you be publishing regular progress reports? How will this impact product pricing?</p>
                </div>
                
                {/* Negative Response */}
                <div className="p-3 rounded bg-red-900/20 border border-red-800/30">
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 rounded-full bg-gray-700 mr-2"></div>
                    <span className="text-xs text-gray-300">Jordan K.</span>
                    <div className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] bg-red-900/50 text-red-400">Concern</div>
                  </div>
                  <p className="text-xs text-gray-300">30% over three years feels too little, too late. Your competitors are already carbon neutral. This reads like greenwashing without meaningful immediate action.</p>
                </div>
              </div>
            </div>
            
            {/* Key Findings */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-4"
              style={animationDelay(3)}
            >
              <div className="text-xs text-gray-400 mb-3">Pulp Recommendations</div>
              <div className="space-y-2">
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Highlight Specifics</div>
                  <div className="text-xs text-gray-400">Include more specific milestones and measurement metrics</div>
                </div>
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Address Competition</div>
                  <div className="text-xs text-gray-400">Acknowledge industry standards and differentiate your approach</div>
                </div>
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Emotional Triggers</div>
                  <div className="text-xs text-gray-400">Incorporate more values-based language to increase engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageTestingVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[900px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Message Testing Platform */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Message Testing Lab</span>
          </div>
          <div className="flex space-x-2 text-xs">
            <div className={`px-2 py-1 rounded-full ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>A/B Testing</div>
            <div className="px-2 py-1 rounded-full bg-gray-800 text-gray-400">Multi-variant</div>
          </div>
        </div>
        
        {/* Main A/B Testing Area */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Message Variants */}
          <div 
            className="col-span-8 grid grid-cols-2 gap-4"
            style={animationDelay(1)}
          >
            {/* Variant A */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2 py-1 bg-blue-600 text-xs text-white">
                Variant A
              </div>
              
              <div className="text-sm text-gray-400 mt-4 mb-2">Message</div>
              <div className="p-3 bg-gray-800 rounded border border-gray-700 flex-1 text-sm text-gray-300">
                <p>We are excited to announce a significant price reduction across our premium product line, effective immediately. These savings reflect our commitment to making quality accessible to all customers.</p>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Clarity</div>
                  <div className="text-sm font-medium text-white">92%</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Impact</div>
                  <div className="text-sm font-medium text-white">78%</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Tone</div>
                  <div className="text-sm font-medium text-white">+ Positive</div>
                </div>
              </div>
            </div>
            
            {/* Variant B */}
            <div className="bg-gray-900 rounded-lg border-2 border-blue-500/30 p-4 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 px-2 py-1 bg-blue-600 text-xs text-white">
                Variant B
              </div>
              <div className="absolute -top-1 -left-1">
                <div className={`px-2 py-1 ${colorConfig.backgroundActive} text-[10px] text-white`}>
                  WINNER
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mt-4 mb-2">Message</div>
              <div className={`p-3 bg-gray-800 rounded border border-blue-500/30 flex-1 text-sm text-gray-300`}>
                <p>Customers spoke, we listened. Today we are slashing prices on our premium lineup by up to 20%. That is top quality at a price that works for your budget.</p>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Clarity</div>
                  <div className="text-sm font-medium text-white">95%</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Impact</div>
                  <div className="text-sm font-medium text-white">86%</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Tone</div>
                  <div className="text-sm font-medium text-white">++ Excited</div>
                </div>
              </div>
            </div>
            
            {/* Analysis */}
            <div 
              className="col-span-2 mt-3 bg-gray-900 rounded-lg border border-gray-800 p-4"
              style={animationDelay(2)}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-gray-300">Performance Comparison</div>
                <div className="text-xs text-gray-400">Based on 5,000 simulations</div>
              </div>
              
              <div className="space-y-4">
                {/* Engagement Comparison */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Click-through Rate</span>
                    <span className="text-xs text-gray-300">+8.2% improvement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">A</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-600" style={{ width: "64%" }}></div>
                    </div>
                    <span className="text-xs text-gray-300">6.4%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">B</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "72%" }}></div>
                    </div>
                    <span className="text-xs text-gray-300">7.2%</span>
                  </div>
                </div>
                
                {/* Sentiment Comparison */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Positive Sentiment</span>
                    <span className="text-xs text-gray-300">+11.5% improvement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">A</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-600" style={{ width: "52%" }}></div>
                    </div>
                    <span className="text-xs text-gray-300">52%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">B</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "63%" }}></div>
                    </div>
                    <span className="text-xs text-gray-300">63%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insights and Recommendations */}
          <div 
            className="col-span-4 flex flex-col space-y-4"
            style={animationDelay(3)}
          >
            {/* Key Differences */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex-1">
              <div className="text-sm text-gray-300 mb-3">Key Differences</div>
              
              <div className="space-y-3">
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Specific Numbers</div>
                  <div className="text-xs text-gray-400">Variant B includes specific percent figure</div>
                </div>
                
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Conversational Tone</div>
                  <div className="text-xs text-gray-400">Variant B uses conversational tone creating dialogue</div>
                </div>
                
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Direct Value Statement</div>
                  <div className="text-xs text-gray-400">Variant B directly mentions budget benefit</div>
                </div>
                
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white">Shorter Length</div>
                  <div className="text-xs text-gray-400">Variant B is 25% shorter with higher impact</div>
                </div>
              </div>
            </div>
            
            {/* Winning Elements */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-300 mb-3">Winning Elements</div>
              
              <div className="space-y-2">
                <div className="flex items-center p-2 rounded bg-gray-800">
                  <div className={`w-8 h-8 rounded-full ${colorConfig.backgroundOpacity} flex items-center justify-center mr-3`}>
                    <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-200">Customer-centric framing</div>
                    <div className="text-[10px] text-gray-400">Conversational opening phrase</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded bg-gray-800">
                  <div className={`w-8 h-8 rounded-full ${colorConfig.backgroundOpacity} flex items-center justify-center mr-3`}>
                    <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-200">Specific numbers</div>
                    <div className="text-[10px] text-gray-400">Clear percentage discount mention</div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded bg-gray-800">
                  <div className={`w-8 h-8 rounded-full ${colorConfig.backgroundOpacity} flex items-center justify-center mr-3`}>
                    <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-200">Contrasting language</div>
                    <div className="text-[10px] text-gray-400">Quality vs price comparison</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreatDetectionVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[550px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-1/3 right-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/2 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Threat Detection System */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Security Status Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Threat Intelligence Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-xs text-gray-300">System Active</span>
            </div>
            <div className="px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-400 flex items-center">
              <span className="font-medium mr-1">3</span> Active Threats
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Network Activity Map */}
          <div 
            className="col-span-6 bg-gray-900 rounded-lg border border-gray-800 p-4 relative overflow-hidden"
            style={animationDelay(1)}
          >
            <div className="text-sm text-gray-300 mb-3">Network Activity Map</div>
            
            {/* Network Visualization */}
            <div className="h-[350px] relative">
              {/* Background hexagon grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="hexagons" width="10" height="12" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
                      <path d="M5,0 L10,5 L5,10 L0,5 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
              </div>
              
              {/* Network nodes and connections */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Safe connections - blue */}
                  <line x1="20" y1="30" x2="35" y2="25" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="35" y1="25" x2="45" y2="40" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="45" y1="40" x2="60" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="60" y1="45" x2="65" y2="60" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="65" y1="60" x2="50" y2="70" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="50" y1="70" x2="35" y2="65" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="35" y1="65" x2="20" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                  <line x1="20" y1="50" x2="20" y2="30" stroke="#3b82f6" strokeWidth="0.3" />
                  
                  {/* Suspicious connections - red */}
                  <line x1="75" y1="20" x2="90" y2="30" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1">
                    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="90" y1="30" x2="85" y2="50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1">
                    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="85" y1="50" x2="65" y2="60" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1">
                    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </line>
                  
                  {/* Regular nodes */}
                  <circle cx="20" cy="30" r="1" fill="#3b82f6" />
                  <circle cx="35" cy="25" r="1" fill="#3b82f6" />
                  <circle cx="45" cy="40" r="1" fill="#3b82f6" />
                  <circle cx="60" cy="45" r="1" fill="#3b82f6" />
                  <circle cx="50" cy="70" r="1" fill="#3b82f6" />
                  <circle cx="35" cy="65" r="1" fill="#3b82f6" />
                  <circle cx="20" cy="50" r="1" fill="#3b82f6" />
                  
                  {/* Threat nodes - pulsing */}
                  <circle cx="75" cy="20" r="1.5" fill="#ef4444">
                    <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="90" cy="30" r="1.5" fill="#ef4444">
                    <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="85" cy="50" r="1.5" fill="#ef4444">
                    <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Main node (highlighted) */}
                  <circle cx="65" cy="60" r="2" fill="#3b82f6">
                    <animate attributeName="r" values="2;2.5;2" dur="3s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
              
              {/* Threat location markers */}
              <div className="absolute left-[75%] top-[20%]">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 absolute animate-ping"></div>
                  <div className="w-5 h-5 rounded-full bg-red-500/40 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">1</span>
                  </div>
                </div>
              </div>
              <div className="absolute left-[90%] top-[30%]">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 absolute animate-ping"></div>
                  <div className="w-5 h-5 rounded-full bg-red-500/40 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">2</span>
                  </div>
                </div>
              </div>
              <div className="absolute left-[85%] top-[50%]">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 absolute animate-ping"></div>
                  <div className="w-5 h-5 rounded-full bg-red-500/40 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-3 left-4 bg-gray-900/80 p-2 rounded border border-gray-800 text-xs">
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-300">Legitimate Activity</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="text-gray-300">Suspicious Activity</span>
              </div>
            </div>
          </div>
          
          {/* Threat Analysis Panel */}
          <div 
            className="col-span-6 flex flex-col space-y-4"
            style={animationDelay(2)}
          >
            {/* Threat Summary */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-300 mb-3">Threat Analysis</div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Bot Detection</div>
                  <div className="text-xl font-medium text-white">97.2%</div>
                  <div className="text-[10px] text-green-400">+2.1% accuracy</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Coordinated Activity</div>
                  <div className="text-xl font-medium text-white">3</div>
                  <div className="text-[10px] text-red-400">+1 new cluster</div>
                </div>
                <div className="p-2 rounded bg-gray-800 border border-gray-700 text-center">
                  <div className="text-xs text-gray-400 mb-1">Response Time</div>
                  <div className="text-xl font-medium text-white">1.2s</div>
                  <div className="text-[10px] text-green-400">-300ms improved</div>
                </div>
              </div>
            </div>
            
            {/* Detected Threats */}
            <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-gray-300">Detected Threats</div>
                <div className="text-xs text-gray-400">Last 24 hours</div>
              </div>
              
              <div className="space-y-3 overflow-y-auto max-h-[240px] pr-1">
                {/* Threat 1 */}
                <div className="p-3 rounded bg-red-900/20 border border-red-800/30">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center mr-2 text-xs">1</div>
                      <div>
                        <div className="text-sm text-white">Bot Network</div>
                        <div className="text-xs text-gray-400">32 accounts detected</div>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-red-900/40 text-red-400 text-xs">Critical</div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    Coordinated network of bots posting identical anti-product messaging within 30-second intervals.
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 text-xs">Isolate</button>
                      <button className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 text-xs">Block</button>
                    </div>
                    <div className="text-xs text-gray-500">First detected 42m ago</div>
                  </div>
                </div>
                
                {/* Threat 2 */}
                <div className="p-3 rounded bg-amber-900/20 border border-amber-800/30">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-amber-900/50 text-amber-400 flex items-center justify-center mr-2 text-xs">2</div>
                      <div>
                        <div className="text-sm text-white">Fake News Spread</div>
                        <div className="text-xs text-gray-400">Source traced to competitor domain</div>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-400 text-xs">High</div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    Misinformation about product safety spreading through coordinated accounts. Content similarity: 87%.
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 text-xs">Counter Narrative</button>
                    </div>
                    <div className="text-xs text-gray-500">First detected 3h ago</div>
                  </div>
                </div>
                
                {/* Threat 3 */}
                <div className="p-3 rounded bg-amber-900/20 border border-amber-800/30">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-amber-900/50 text-amber-400 flex items-center justify-center mr-2 text-xs">3</div>
                      <div>
                        <div className="text-sm text-white">Credential Attack</div>
                        <div className="text-xs text-gray-400">Multiple login attempts</div>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-400 text-xs">High</div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2">
                    Brute force attempts detected on social media management portal. 350+ attempts from 5 IPs.
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-2 py-0.5 rounded bg-green-900/30 text-green-400 text-xs">Mitigated</button>
                    </div>
                    <div className="text-xs text-gray-500">Resolved 15m ago</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions Panel */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-3"
              style={animationDelay(3)}
            >
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-300">Automated Actions</div>
                <div className="flex items-center text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-gray-400">2 active responses</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-2">
                <button className={`p-2 rounded ${colorConfig.backgroundActive} text-white text-xs`}>Block Bots</button>
                <button className="p-2 rounded bg-gray-800 text-gray-300 text-xs">Report IPs</button>
                <button className="p-2 rounded bg-gray-800 text-gray-300 text-xs">Pattern Alert</button>
                <button className={`p-2 rounded ${colorConfig.backgroundActive} text-white text-xs`}>Counter Messages</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrisisResponseVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[625px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-1/3 left-2/3 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Crisis Management Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Alert Status */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Crisis Response Center</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2"></div>
              <span className="text-xs text-gray-300">Alert Level</span>
            </div>
            <div className="px-2 py-1 rounded-full text-xs bg-amber-900/30 text-amber-400">
              Level 2 - Emerging
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Crisis Timeline */}
          <div 
            className="col-span-8 bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-300">Disinformation Incident Timeline</div>
              <div className="text-xs text-gray-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Live Tracking
              </div>
            </div>
            
            {/* Timeline Visualization */}
            <div className="flex-1 relative">
              {/* Timeline Track */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700"></div>
              
              {/* Timeline Events */}
              <div className="space-y-6 pl-10 relative">
                {/* Event 1 - Detection */}
                <div className="relative">
                  <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-amber-900/50 border border-amber-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">Initial Detection</div>
                      <div className="ml-3 px-2 py-0.5 rounded-full bg-amber-900/20 text-amber-400 text-xs">Alert</div>
                      <div className="ml-auto text-xs text-gray-500">08:42 AM</div>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      AI detection system flagged potential disinformation campaign about product safety across 3 social platforms.
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <div className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">12 posts</div>
                      <div className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">4 accounts</div>
                      <div className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-xs">~500 views</div>
                    </div>
                  </div>
                </div>
                
                {/* Event 2 - Analysis */}
                <div className="relative">
                  <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">Analysis Complete</div>
                      <div className="ml-3 px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-400 text-xs">System</div>
                      <div className="ml-auto text-xs text-gray-500">09:15 AM</div>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      Narrative analysis identified coordinated messaging. Source tracking indicates competitor involvement.
                    </div>
                    <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-700 text-xs text-gray-300">
                      <div className="font-medium mb-1">Key Claim Analysis:</div>
                      <div className="ml-2">Product false claim detected - Rated FALSE (98% confidence)</div>
                    </div>
                  </div>
                </div>
                
                {/* Event 3 - Response */}
                <div className="relative">
                  <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-green-900/50 border border-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white">Response Deployed</div>
                      <div className="ml-3 px-2 py-0.5 rounded-full bg-green-900/20 text-green-400 text-xs">Action</div>
                      <div className="ml-auto text-xs text-gray-500">09:38 AM</div>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      Counter-messaging deployed across affected platforms. Medical expert statements and safety certification published.
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <div className={`px-2 py-0.5 rounded ${colorConfig.backgroundOpacity} text-white text-xs`}>Targeted Response</div>
                      <div className={`px-2 py-0.5 rounded ${colorConfig.backgroundOpacity} text-white text-xs`}>Fact Check Published</div>
                    </div>
                  </div>
                </div>
                
                {/* Event 4 - Monitoring */}
                <div className="relative">
                  <div className="absolute -left-10 mt-1 w-6 h-6 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-400">Monitoring</div>
                      <div className="ml-3 px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs">Active</div>
                      <div className="ml-auto text-xs text-gray-500">Now</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Continued monitoring of spread rate, sentiment shift, and platform response in real-time.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Response Metrics and Tools */}
          <div 
            className="col-span-4 flex flex-col space-y-4"
            style={animationDelay(2)}
          >
            {/* Crisis Metrics */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm text-gray-300 mb-3">Response Metrics</div>
              
              <div className="space-y-3">
                {/* Spread Containment */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Spread Containment</span>
                    <span className="text-xs text-green-400">72%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "72%" }}></div>
                  </div>
                </div>
                
                {/* Message Reach */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Counter-Message Reach</span>
                    <span className="text-xs text-blue-400">15.4K</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                {/* Sentiment Recovery */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Sentiment Recovery</span>
                    <span className="text-xs text-amber-400">51%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: "51%" }}></div>
                  </div>
                </div>
                
                {/* Platform Cooperation */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Platform Cooperation</span>
                    <span className="text-xs text-green-400">2/3</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "66%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Communication Tools */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex-1"
              style={animationDelay(3)}
            >
              <div className="text-sm text-gray-300 mb-3">Neurolinguistic Response Tools</div>
              
              <div className="space-y-3 mb-4">
                <div className={`p-2 rounded ${colorConfig.backgroundActive} flex items-center`}>
                  <svg className="w-4 h-4 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span className="text-xs text-white">Adaptive Messaging</span>
                  <div className="ml-auto w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs text-gray-300">Fact Sheet Generator</span>
                  <div className="ml-auto w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span className="text-xs text-gray-300">Direct Response</span>
                  <div className="ml-auto w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
                
                <div className="p-2 rounded bg-gray-800 flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="text-xs text-gray-300">Alert System</span>
                  <div className="ml-auto w-3 h-3 rounded-full bg-gray-700"></div>
                </div>
              </div>
              
              {/* Adaptive Message Preview */}
              <div className="p-3 rounded bg-gray-800 border border-gray-700">
                <div className="text-xs text-gray-400 mb-2">Active Message</div>
                <div className="text-xs text-gray-300">
                  Safety certification message with expert statements and testing results link.
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-gray-400">
                  <span>Delivered to: 15,402 users</span>
                  <span>Engagement rate: 4.8%</span>
                </div>
              </div>
            </div>
            
            {/* Team Notifications */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-4"
              style={animationDelay(4)}
            >
              <div className="text-sm text-gray-300 mb-3">Team Notifications</div>
              
              <div className="space-y-2">
                <div className="flex items-center bg-gray-800 rounded p-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300">Communications Director</div>
                    <div className="text-[10px] text-gray-400">Notified 09:05 AM</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                
                <div className="flex items-center bg-gray-800 rounded p-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300">Legal Department</div>
                    <div className="text-[10px] text-gray-400">Notified 09:12 AM</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                
                <div className="flex items-center bg-gray-800 rounded p-2">
                  <div className="w-6 h-6 rounded-full bg-gray-700 mr-2"></div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-300">Product Safety Team</div>
                    <div className="text-[10px] text-gray-400">Notified 09:15 AM</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EnterpriseSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={index}
          {...section}
          index={index}
        />
      ))}
    </div>
  );
}
