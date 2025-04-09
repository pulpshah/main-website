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
  Users: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  BrainCircuit: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  MessageSquare: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  PieChart: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  TrendingUp: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  Target: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
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
            <MidMarketVisual index={index} colorConfig={colorConfig} isInView={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MidMarketVisual({ 
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
      return <AudienceGrowthVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <CustomerInsightsVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <MessageOptimizationVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <AudienceSegmentationVisual colorConfig={colorConfig} isInView={isInView} />;
    case 4:
      return <CampaignPerformanceVisual colorConfig={colorConfig} isInView={isInView} />;
    case 5:
      return <CompetitorAnalysisVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return null;
  }
}

function AudienceGrowthVisual({ 
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
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Audience Growth Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Audience Growth Engine</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Last 30 days</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Last quarter</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">YTD</div>
          </div>
        </div>
        
        {/* Main Growth Dashboard */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Growth Chart */}
          <div 
            className="col-span-8 bg-gray-900 rounded-lg border border-gray-800 p-4"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-300">Audience Growth Trend</span>
              <div className="flex items-center text-xs">
                <span className={`mr-2 ${colorConfig.primary}`}>+24.8% growth</span>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>5.2%</span>
                </div>
              </div>
            </div>
            
            {/* Growth Chart Visualization */}
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
                  
                  {/* Total Audience line */}
                  <path 
                    d="M0,40 C10,38 20,35 30,32 C40,29 50,25 60,20 C70,16 80,11 90,8 L100,5" 
                    fill="none" 
                    stroke="#9333ea" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                  />
                  
                  {/* Area under the line with gradient */}
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                  </linearGradient>
                  <path 
                    d="M0,40 C10,38 20,35 30,32 C40,29 50,25 60,20 C70,16 80,11 90,8 L100,5 V50 H0 Z" 
                    fill="url(#purpleGradient)" 
                  />
                  
                  {/* AI-Driven Growth Contribution */}
                  <path 
                    d="M0,45 C10,44 20,43 30,42 C40,41 50,39 60,35 C70,30 80,25 90,22 L100,20" 
                    fill="none" 
                    stroke="#ec4899" 
                    strokeWidth="2"
                    strokeDasharray="3,2"
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
              
              {/* Chart labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>30d ago</span>
                <span>24d</span>
                <span>18d</span>
                <span>12d</span>
                <span>6d</span>
                <span>Today</span>
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between text-xs text-gray-500">
                <span>50k</span>
                <span>40k</span>
                <span>30k</span>
                <span>20k</span>
                <span>10k</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex space-x-4 mt-4 justify-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-300">Total Audience</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                <span className="text-xs text-gray-300">AI-Driven Growth</span>
              </div>
            </div>
          </div>
          
          {/* Growth Metrics */}
          <div 
            className="col-span-4 grid grid-rows-4 gap-4"
            style={animationDelay(2)}
          >
            {/* Total Audience Size */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">Total Audience</div>
                <div className="text-2xl font-bold text-white">48.3<span className="text-xl">k</span></div>
              </div>
              <div className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+12.4%</span>
              </div>
            </div>
            
            {/* Growth Sources */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-xs text-gray-400 mb-3">Growth Channels</div>
              <div className="space-y-4">
                {/* Organic Search */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Organic Search</span>
                    <span className="text-xs text-white">+4.8k</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "34%" }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">34% of growth</span>
                    <span className="text-green-400">+18%</span>
                  </div>
                </div>
                
                {/* Content Marketing */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Content Marketing</span>
                    <span className="text-xs text-white">+3.9k</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "28%" }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">28% of growth</span>
                    <span className="text-green-400">+22%</span>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Social Media</span>
                    <span className="text-xs text-white">+2.5k</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "18%" }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">18% of growth</span>
                    <span className="text-green-400">+15%</span>
                  </div>
                </div>
                
                {/* Referrals */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Referrals</span>
                    <span className="text-xs text-white">+1.6k</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "12%" }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">12% of growth</span>
                    <span className="text-green-400">+8%</span>
                  </div>
                </div>
                
                {/* Paid Campaigns */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Paid Campaigns</span>
                    <span className="text-xs text-white">+1.1k</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: "8%" }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">8% of growth</span>
                    <span className="text-amber-400">+2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Insights Row */}
        <div 
          className="grid grid-cols-3 gap-4 mt-4"
          style={animationDelay(3)}
        >
          {/* Audience Quality */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">Audience Quality</div>
            <div className="flex items-center mb-2">
              <div className="text-xl font-medium text-white">92%</div>
              <div className="ml-2 px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">+4.3%</div>
            </div>
            <div className="text-xs text-gray-400">High engagement rate with 62% returning visitors</div>
          </div>
          
          {/* Content Performance */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">Top Performing Content</div>
            <div className="space-y-2">
              <div className={`p-2 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Product Tutorials (+38%)</div>
              <div className="p-2 rounded-full text-xs bg-gray-800 text-gray-300">Industry Analysis (+25%)</div>
              <div className="p-2 rounded-full text-xs bg-gray-800 text-gray-300">Case Studies (+18%)</div>
            </div>
          </div>
          
          {/* AI Recommendations */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="text-xs text-gray-400 mb-3">AI Growth Recommendations</div>
            <div className="space-y-2">
              <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                <div className="text-xs text-white">Expand LinkedIn presence</div>
                <div className="text-xs text-gray-400">Target underutilized channel (+28% potential)</div>
              </div>
              <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                <div className="text-xs text-white">Increase video content</div>
                <div className="text-xs text-gray-400">4.2x higher engagement than text content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignPerformanceVisual({ 
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

  // Campaign performance data
  const campaigns = [
    { 
      id: 1, 
      name: "Summer Product Launch", 
      status: "Active",
      spend: 12500,
      revenue: 48750,
      roi: 3.9,
      ctr: 4.8,
      convRate: 2.6,
      target: "High-Value Prospects"
    },
    { 
      id: 2, 
      name: "Retargeting Campaign", 
      status: "Active",
      spend: 5800,
      revenue: 26100,
      roi: 4.5,
      ctr: 3.2,
      convRate: 4.9,
      target: "Evaluators"
    },
    { 
      id: 3, 
      name: "Industry Webinar Series", 
      status: "Completed",
      spend: 8200,
      revenue: 22140,
      roi: 2.7,
      ctr: 2.9,
      convRate: 1.8,
      target: "Early Researchers"
    },
    { 
      id: 4, 
      name: "Feature Showcase", 
      status: "Draft",
      spend: 0,
      revenue: 0,
      roi: 0,
      ctr: 0,
      convRate: 0,
      target: "Multiple"
    }
  ];

  // Channel performance data
  const channels = [
    { name: "Paid Search", spend: 10200, revenue: 35700, roi: 3.5 },
    { name: "Social Media", spend: 8400, revenue: 32760, roi: 3.9 },
    { name: "Email", spend: 3600, revenue: 16200, roi: 4.5 },
    { name: "Content/SEO", spend: 4300, revenue: 12900, roi: 3.0 }
  ];

  // Time range options
  const timeRanges = ["Last 30 days", "This quarter", "YTD", "Last 12 months"];

  return (
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Campaign Performance Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Campaign Performance Center</span>
          </div>
          <div className="flex space-x-2">
            {timeRanges.map((range, i) => (
              <div 
                key={i} 
                className={`px-2 py-1 rounded-full text-xs ${i === 0 ? `${colorConfig.backgroundOpacity} ${colorConfig.primary}` : 'bg-gray-800 text-gray-400'}`}
              >
                {range}
              </div>
            ))}
          </div>
        </div>
        
        {/* KPI Overview Row */}
        <div 
          className="grid grid-cols-4 gap-4 mb-4"
          style={animationDelay(1)}
        >
          {/* Total Spend */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
            <div className="text-xs text-gray-400 mb-1">Total Ad Spend</div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-white">$26,500</div>
              <div className="px-1.5 py-0.5 rounded-full bg-amber-900/30 text-amber-400 text-xs flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>+8.2%</span>
              </div>
            </div>
          </div>
          
          {/* Total Revenue */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
            <div className="text-xs text-gray-400 mb-1">Campaign Revenue</div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-white">$97,590</div>
              <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+15.4%</span>
              </div>
            </div>
          </div>
          
          {/* ROI */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-3">
            <div className="text-xs text-gray-400 mb-1">Average ROI</div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium text-white">3.7x</div>
              <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+0.5x</span>
              </div>
            </div>
          </div>
          
          {/* AI Efficiency */}
          <div className={`bg-gray-900 rounded-lg border ${colorConfig.border} p-3`}>
            <div className="text-xs text-gray-400 mb-1">AI Efficiency Score</div>
            <div className="flex items-center justify-between">
              <div className={`text-xl font-medium ${colorConfig.primary}`}>92%</div>
              <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span>+6.8%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Campaign List - Left Column */}
          <div 
            className="col-span-7 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden"
            style={animationDelay(2)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Active Campaigns</span>
              <div className="flex items-center text-xs">
                <span className={`mr-2 ${colorConfig.primary}`}>4 campaigns</span>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">2 active</div>
              </div>
            </div>
            
            {/* Campaign Table */}
            <div className="overflow-auto max-h-[210px]">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Campaign</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Spend</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ROI</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-800/50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs font-medium text-white">{campaign.name}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`px-1.5 py-0.5 rounded-full text-xs inline-block ${
                          campaign.status === "Active" ? "bg-green-900/30 text-green-400" : 
                          campaign.status === "Completed" ? "bg-blue-900/30 text-blue-400" : 
                          "bg-gray-800 text-gray-400"
                        }`}>
                          {campaign.status}
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs text-white">${campaign.spend.toLocaleString()}</span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{campaign.roi.toFixed(1)}x</span>
                          {campaign.roi > 0 && (
                            <div className={`w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden`}>
                              <div 
                                className={`h-full ${campaign.roi > 3.5 ? `${colorConfig.background}` : campaign.roi > 2.5 ? 'bg-green-500' : 'bg-amber-500'}`} 
                                style={{ width: `${Math.min(campaign.roi / 5 * 100, 100)}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-xs text-gray-300">{campaign.target}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Campaign Performance Details for Selected Campaign */}
            <div className="mt-4 pt-3 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium text-gray-300">Summer Product Launch - Performance</div>
                <div className={`px-1.5 py-0.5 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>
                  View Details
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-[10px] text-gray-400 mb-1">Click-Through Rate</div>
                  <div className="flex items-center">
                    <span className="text-xs text-white mr-1">{campaigns[0].ctr}%</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">
                      +0.8%
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-[10px] text-gray-400 mb-1">Conversion Rate</div>
                  <div className="flex items-center">
                    <span className="text-xs text-white mr-1">{campaigns[0].convRate}%</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">
                      +0.3%
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-[10px] text-gray-400 mb-1">Cost per Acquisition</div>
                  <div className="flex items-center">
                    <span className="text-xs text-white mr-1">$78</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">
                      -12%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Channel Performance & AI Insights */}
          <div 
            className="col-span-5 grid grid-rows-2 gap-4"
            style={animationDelay(3)}
          >
            {/* Channel Performance */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Channel Performance</span>
                <div className="px-1.5 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-xs">By ROI</div>
              </div>
              
              <div className="space-y-3">
                {channels.map((channel, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-300">{channel.name}</span>
                      <div className="flex items-center">
                        <span className="text-xs text-white mr-2">${channel.spend.toLocaleString()}</span>
                        <span className={`text-xs ${channel.roi > 3.5 ? colorConfig.primary : 'text-gray-400'}`}>{channel.roi.toFixed(1)}x</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${i === 2 ? colorConfig.background : 'bg-gray-600'}`} 
                          style={{ width: `${(channel.roi / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-gray-800 text-gray-300">
                        ${channel.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Optimization Suggestions */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                    <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-300">AI Campaign Optimizations</span>
                </div>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">
                  +28% potential gain
                </div>
              </div>
              
              <div className="space-y-3 overflow-auto max-h-[140px]">
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white mb-1">Reallocate budget from Paid Search to Email</div>
                  <div className="text-[10px] text-gray-400">Shift 15% of paid search budget to email marketing for 32% higher ROI based on last 30 days performance.</div>
                </div>
                
                <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                  <div className="text-xs text-white mb-1">Optimize landing pages for &quot;Retargeting Campaign&quot;</div>
                  <div className="text-[10px] text-gray-400">A/B test shows 18% higher conversion with simplified form and social proof elements.</div>
                </div>
                
                <div className="p-2 rounded bg-gray-800 border-l-2 border-amber-500">
                  <div className="text-xs text-white mb-1">Pause underperforming ad creative #3428</div>
                  <div className="text-[10px] text-gray-400">CTR is 42% below average with 2.1x higher cost per click than other variants.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceSegmentationVisual({ 
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

  // Audience segments data
  const segments = [
    { 
      id: 1, 
      name: "High-Value Prospects", 
      size: 18, 
      conversionRate: 8.2,
      cac: 125,
      ltv: 1850,
      behaviors: ["Multiple product views", "Engaged with pricing", "Downloaded resources"]
    },
    { 
      id: 2, 
      name: "Active Evaluators", 
      size: 24, 
      conversionRate: 4.8,
      cac: 95,
      ltv: 1240,
      behaviors: ["Feature comparison", "Multiple visits", "Blog engagement"] 
    },
    { 
      id: 3, 
      name: "Early Researchers", 
      size: 32, 
      conversionRate: 2.1,
      cac: 140,
      ltv: 920,
      behaviors: ["Single session", "Content consumption", "Low engagement"] 
    },
    { 
      id: 4, 
      name: "Returning Customers", 
      size: 26, 
      conversionRate: 12.6,
      cac: 45,
      ltv: 2250,
      behaviors: ["Repeat purchases", "Support interaction", "Feature adoption"] 
    }
  ];

  // Segment characteristics
  const characteristics = [
    { label: "Industry", values: ["Technology", "Financial Services", "Healthcare", "Retail"] },
    { label: "Company Size", values: ["50-100", "101-250", "251-500", "501-1000"] },
    { label: "Tech Stack", values: ["Modern", "Transitioning", "Legacy", "Mixed"] },
    { label: "Pain Points", values: ["Scalability", "Integration", "Analytics", "Security"] },
  ];

  return (
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Audience Segmentation Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Audience Segmentation Platform</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Behavioral</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Demographic</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Psychographic</div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Segment Overview - Left Column */}
          <div 
            className="col-span-7 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Behavioral Segments</span>
              <div className="flex items-center text-xs">
                <span className={`mr-2 ${colorConfig.primary}`}>4 active segments</span>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">AI-optimized</div>
              </div>
            </div>
            
            {/* Segment Visualization - Bubble Chart */}
            <div className="h-[200px] relative mb-3 border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This is a simplified representation of a bubble chart */}
                <div className="relative w-full h-full">
                  {/* High-Value Prospects */}
                  <div 
                    className={`absolute rounded-full ${colorConfig.backgroundOpacity} border ${colorConfig.border} flex items-center justify-center shadow-lg`}
                    style={{ 
                      width: '28%', 
                      height: '28%', 
                      left: '65%', 
                      top: '30%',
                      animation: 'pulse 3s infinite'
                    }}
                  >
                    <div className="text-center">
                      <div className={`text-xs font-medium ${colorConfig.primary}`}>High-Value</div>
                      <div className="text-[10px] text-gray-400">18%</div>
                    </div>
                  </div>
                  
                  {/* Active Evaluators */}
                  <div 
                    className={`absolute rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-lg`}
                    style={{ 
                      width: '32%', 
                      height: '32%', 
                      left: '25%', 
                      top: '20%',
                      animation: 'pulse 4s infinite' 
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium text-green-400">Evaluators</div>
                      <div className="text-[10px] text-gray-400">24%</div>
                    </div>
                  </div>
                  
                  {/* Early Researchers */}
                  <div 
                    className="absolute rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg"
                    style={{ 
                      width: '38%', 
                      height: '38%', 
                      left: '40%', 
                      top: '50%',
                      animation: 'pulse 5s infinite' 
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium text-amber-400">Researchers</div>
                      <div className="text-[10px] text-gray-400">32%</div>
                    </div>
                  </div>
                  
                  {/* Returning Customers */}
                  <div 
                    className="absolute rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg"
                    style={{ 
                      width: '34%', 
                      height: '34%', 
                      left: '10%', 
                      top: '60%',
                      animation: 'pulse 3.5s infinite' 
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium text-blue-400">Returning</div>
                      <div className="text-[10px] text-gray-400">26%</div>
                    </div>
                  </div>
                  
                  {/* Connecting lines */}
                  <svg className="absolute inset-0" width="100%" height="100%">
                    <line x1="25%" y1="20%" x2="65%" y2="30%" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="65%" y1="30%" x2="40%" y2="50%" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="40%" y1="50%" x2="10%" y2="60%" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="10%" y1="60%" x2="25%" y2="20%" stroke="#4B5563" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-2 right-2">
                <div className="text-[10px] text-gray-500">Size = Audience %</div>
              </div>
            </div>
            
            {/* Segment Details Table */}
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Segment</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Conv. Rate</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CAC</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">LTV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {segments.map((segment) => (
                    <tr key={segment.id} className="hover:bg-gray-800/50">
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="text-xs font-medium text-white">{segment.name}</span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{segment.conversionRate}%</span>
                          <div className={`w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden`}>
                            <div 
                              className={segment.id === 1 || segment.id === 4 ? `h-full ${colorConfig.background}` : 'h-full bg-gray-600'} 
                              style={{ width: `${(segment.conversionRate / 15) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="text-xs text-white">${segment.cac}</span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">${segment.ltv}</span>
                          <div className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${segment.ltv / segment.cac > 10 ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                            {(segment.ltv / segment.cac).toFixed(1)}x
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Right Column - Segment Details & Recommendations */}
          <div 
            className="col-span-5 grid grid-rows-7 gap-4"
            style={animationDelay(2)}
          >
            {/* Highlighted Segment */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${colorConfig.background}`}></div>
                  <span className="text-sm font-medium text-gray-300">High-Value Prospects</span>
                </div>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">Best ROI</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Key Behaviors</div>
                  <div className="flex flex-wrap gap-1">
                    {segments[0].behaviors.map((behavior, i) => (
                      <span key={i} className={`px-1.5 py-0.5 rounded text-xs ${i === 0 ? `${colorConfig.backgroundOpacity} ${colorConfig.primary}` : 'bg-gray-800 text-gray-300'}`}>
                        {behavior}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-400">Engagement Metrics</div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Visit Frequency</span>
                    <div className="flex items-center">
                      <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden mr-2">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-xs text-white">4.2/wk</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Pages per Visit</span>
                    <div className="flex items-center">
                      <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden mr-2">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "72%" }}></div>
                      </div>
                      <span className="text-xs text-white">6.8</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">Time on Site</span>
                    <div className="flex items-center">
                      <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden mr-2">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "90%" }}></div>
                      </div>
                      <span className="text-xs text-white">9.5m</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Recommended Approach</div>
                  <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                    <div className="text-xs text-gray-300">Personalized demos with case studies specific to their industry and current tech stack.</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Segment Characteristics */}
            <div className="row-span-4 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="text-sm font-medium text-gray-300 mb-3">Segment Characteristics</div>
              
              <div className="space-y-3 overflow-auto max-h-[180px]">
                {characteristics.map((characteristic, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-xs text-gray-400">{characteristic.label}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {characteristic.values.map((value, j) => (
                        <div 
                          key={j} 
                          className={`px-2 py-1 rounded-full text-center text-xs ${j === 0 ? `${colorConfig.backgroundOpacity} ${colorConfig.primary}` : 'bg-gray-800 text-gray-300'}`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendations Bar */}
        <div 
          className="mt-4 bg-gray-900 rounded-lg border border-gray-800 p-3"
          style={animationDelay(3)}
        >
          <div className="flex items-center mb-2">
            <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-gray-300">AI Segmentation Recommendations</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
              <div className="text-xs text-white mb-1">Create &quot;Tech Decision Makers&quot; micro-segment</div>
              <div className="text-[10px] text-gray-400">Split from High-Value Prospects based on role and feature usage patterns. 3.2x higher conversion potential.</div>
            </div>
            
            <div className="p-2 rounded bg-gray-800 border-l-2 border-amber-500">
              <div className="text-xs text-white mb-1">Merge similar &quot;Early Researcher&quot; segments</div>
              <div className="text-[10px] text-gray-400">Consolidate similar behaviors between &quot;Industry Explorers&quot; and &quot;Early Researchers&quot; to simplify targeting.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageOptimizationVisual({ 
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

  // Sample message performance data
  const messagePerformance = [
    { id: 1, channel: "Email", openRate: 28.4, clickRate: 3.8, conversionRate: 1.2, improvementSuggestion: "Personalize subject lines based on user behavior" },
    { id: 2, channel: "In-App", openRate: 42.6, clickRate: 12.5, conversionRate: 4.8, improvementSuggestion: "Use action-oriented CTAs with benefit statements" },
    { id: 3, channel: "Push", openRate: 18.2, clickRate: 2.4, conversionRate: 0.8, improvementSuggestion: "Implement time-sensitive offers with countdown timers" },
    { id: 4, channel: "SMS", openRate: 94.1, clickRate: 6.2, conversionRate: 2.1, improvementSuggestion: "Keep messages under 100 characters with clear CTAs" }
  ];

  // Message tone analysis data
  const toneEffectiveness = [
    { tone: "Professional", effectiveness: 78, bestFor: "Tech Innovators" },
    { tone: "Friendly", effectiveness: 92, bestFor: "Service Leaders" },
    { tone: "Urgent", effectiveness: 65, bestFor: "Growth Scalers" },
    { tone: "Educational", effectiveness: 84, bestFor: "Industry Specialists" }
  ];

  return (
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Message Optimization Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Message Optimization Engine</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Last 30 days</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Last quarter</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">YTD</div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Message Performance Table */}
          <div 
            className="col-span-8 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Message Performance By Channel</span>
              <div className="flex items-center text-xs">
                <span className={`mr-2 ${colorConfig.primary}`}>+18.2% overall improvement</span>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>4.5%</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Channel</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Open Rate</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Click Rate</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Conv. Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {messagePerformance.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800/50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`p-1 rounded ${colorConfig.backgroundOpacity} mr-2`}>
                            {item.channel === "Email" && (
                              <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {item.channel === "In-App" && (
                              <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            )}
                            {item.channel === "Push" && (
                              <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            )}
                            {item.channel === "SMS" && (
                              <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <span className="text-xs font-medium text-white">{item.channel}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{item.openRate}%</span>
                          <div className={`w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden`}>
                            <div className={`h-full ${colorConfig.background}`} style={{ width: `${(item.openRate / 100) * 100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{item.clickRate}%</span>
                          <div className={`w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden`}>
                            <div className={`h-full ${colorConfig.background}`} style={{ width: `${(item.clickRate / 15) * 100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{item.conversionRate}%</span>
                          <div className={`w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden`}>
                            <div className={`h-full ${colorConfig.background}`} style={{ width: `${(item.conversionRate / 5) * 100}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-800">
              <div className="text-xs text-gray-400 mb-1">Message Optimization Impact</div>
              <div className="text-xs text-gray-300">AI-optimized messages show +42% higher engagement than manual campaigns across all channels.</div>
            </div>
          </div>
          
          {/* Right Column - AI Insights & Tone Analysis */}
          <div 
            className="col-span-4 grid grid-rows-2 gap-4"
            style={animationDelay(2)}
          >
            {/* Tone Effectiveness */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Message Tone Effectiveness</span>
                <div className="px-1.5 py-0.5 rounded-full bg-purple-900/30 text-purple-400 text-xs">AI Analysis</div>
              </div>
              
              <div className="space-y-3">
                {toneEffectiveness.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-300">{item.tone}</span>
                        <span className="ml-2 text-[10px] text-gray-500">Best for: {item.bestFor}</span>
                      </div>
                      <span className="text-xs text-white">{item.effectiveness}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.effectiveness > 85 ? 'bg-green-500' : item.effectiveness > 70 ? colorConfig.background : 'bg-amber-500'}`} 
                        style={{ width: `${item.effectiveness}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Message Recommendations */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                    <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-300">AI Message Suggestions</span>
                </div>
              </div>
              
              <div className="space-y-3 overflow-auto max-h-[120px]">
                {messagePerformance.map((item) => (
                  <div key={item.id} className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-white">{item.channel}</span>
                      <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">+28% potential</div>
                    </div>
                    <div className="text-xs text-gray-300">{item.improvementSuggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* A/B Testing Results */}
        <div 
          className="mt-4 bg-gray-900 rounded-lg border border-gray-800 p-3"
          style={animationDelay(3)}
        >   
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-300">Latest A/B Test Results</span>
            </div>
            <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs">
              32% improvement
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
              <div className="text-[10px] text-gray-400 mb-1">Variant A (Original)</div>
              <div className="text-xs text-gray-300">&quot;Check out our new features today!&quot;</div>
              <div className="mt-1 flex justify-between items-center">
                <span className="text-[10px] text-gray-500">4.2% CTR</span>
                <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: "42%" }}></div>
                </div>
              </div>
            </div>
            
            <div className={`bg-gray-800 p-2 rounded border ${colorConfig.border}`}>
              <div className="text-[10px] text-gray-400 mb-1">Variant B (AI-Optimized)</div>
              <div className={`text-xs ${colorConfig.primary}`}>&quot;Discover how our new features can save you 5 hours per week&quot;</div>
              <div className="mt-1 flex justify-between items-center">
                <span className="text-[10px] text-gray-300">7.8% CTR</span>
                <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${colorConfig.background}`} style={{ width: "78%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerInsightsVisual({ 
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

  // Customer personas data
  const personas = [
    { 
      id: 1, 
      name: "Tech Innovators", 
      size: 38, 
      satisfaction: 87,
      growth: 18,
      attributes: ["Tech-savvy", "Early adopters", "Process-oriented"],
      needs: ["Automation tools", "Data analytics", "Integration capabilities"]
    },
    { 
      id: 2, 
      name: "Growth Scalers", 
      size: 26, 
      satisfaction: 79,
      growth: 24,
      attributes: ["Fast-growing", "Agile teams", "ROI focused"],
      needs: ["Scalable solutions", "Performance metrics", "Cost efficiency"]
    },
    { 
      id: 3, 
      name: "Service Leaders", 
      size: 21, 
      satisfaction: 92,
      growth: 11,
      attributes: ["Customer-centric", "Quality focused", "Relationship builders"],
      needs: ["Customer analytics", "Personalization tools", "Journey mapping"]
    },
    { 
      id: 4, 
      name: "Industry Specialists", 
      size: 15, 
      satisfaction: 84,
      growth: 9,
      attributes: ["Niche expertise", "Compliance focused", "Traditional"],
      needs: ["Industry templates", "Compliance features", "Specialized tools"]
    }
  ];

  // Sentiment analysis data - sample customer feedback with sentiment scores
  const sentimentData = [
    { category: "Product Features", positive: 68, neutral: 22, negative: 10 },
    { category: "Ease of Use", positive: 72, neutral: 18, negative: 10 },
    { category: "Support Quality", positive: 81, neutral: 12, negative: 7 },
    { category: "Value for Money", positive: 64, neutral: 26, negative: 10 },
    { category: "Integration", positive: 59, neutral: 22, negative: 19 }
  ];

  // Predicted trends data
  const trends = [
    { id: 1, trend: "Increasing demand for personalization", probability: 92, growth: "↑ 28%" },
    { id: 2, trend: "Higher focus on team collaboration features", probability: 88, growth: "↑ 22%" },
    { id: 3, trend: "Growing need for compliance tools", probability: 76, growth: "↑ 15%" },
    { id: 4, trend: "Shift toward AI-powered analytics", probability: 94, growth: "↑ 35%" }
  ];

  return (
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Customer Insights Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Customer Insights Platform</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Current Quarter</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Historical</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Predictions</div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Customer Personas Column */}
          <div 
            className="col-span-4 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden"
            style={animationDelay(1)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Customer Personas</span>
              <div className="px-1.5 py-0.5 rounded-full bg-purple-900/30 text-purple-400 text-xs">AI-Generated</div>
            </div>
            
            <div className="space-y-3 overflow-auto max-h-[380px] pr-1">
              {personas.map((persona) => (
                <div key={persona.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white text-sm">{persona.name}</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-300 text-xs">{persona.size}% of base</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Satisfaction</div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-white mr-1">{persona.satisfaction}%</div>
                        <div className={`px-1 py-0.5 rounded text-[10px] ${persona.satisfaction > 85 ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'}`}>
                          {persona.satisfaction > 85 ? 'High' : 'Medium'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Growth</div>
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-white mr-1">+{persona.growth}%</div>
                        <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-xs text-gray-400 mb-1">Key Attributes</div>
                    <div className="flex flex-wrap gap-1">
                      {persona.attributes.map((attr, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-gray-700 rounded text-xs text-gray-300">{attr}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Primary Needs</div>
                    <div className="flex flex-wrap gap-1">
                      {persona.needs.map((need, i) => (
                        <span key={i} className={`px-1.5 py-0.5 rounded text-xs ${i === 0 ? `${colorConfig.backgroundOpacity} ${colorConfig.primary}` : 'bg-gray-700 text-gray-300'}`}>{need}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Center Column - Sentiment Analysis */}
          <div 
            className="col-span-4 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden"
            style={animationDelay(2)}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-300">Sentiment Analysis</span>
              <div className="flex items-center text-xs">
                <span className={`mr-2 ${colorConfig.primary}`}>68.8% positive</span>
                <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 flex items-center">
                  <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>3.2%</span>
                </div>
              </div>
            </div>
            
            {/* Sentiment Graph */}
            <div className="space-y-4">
              {sentimentData.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-300">{item.category}</span>
                    <div className="flex space-x-2 text-xs">
                      <span className="text-green-400">{item.positive}%</span>
                      <span className="text-gray-400">{item.neutral}%</span>
                      <span className="text-red-400">{item.negative}%</span>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden flex">
                    <div className="h-full bg-green-500" style={{ width: `${item.positive}%` }}></div>
                    <div className="h-full bg-gray-500" style={{ width: `${item.neutral}%` }}></div>
                    <div className="h-full bg-red-500" style={{ width: `${item.negative}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Sample Customer Feedback */}
            <div className="mt-6">
              <div className="text-xs text-gray-400 mb-2">Latest Customer Feedback</div>
              
              <div className="space-y-3 max-h-[180px] overflow-auto pr-1">
                <div className={`p-3 rounded-lg border-l-2 bg-gray-800 ${colorConfig.border}`}>
                  <div className="text-xs text-gray-300 mb-1">The analytics dashboard is exactly what we needed to understand our customers better. Great visualizations that are easy to interpret.</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Growth Scalers segment</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">Positive</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border-l-2 border-amber-500 bg-gray-800">
                  <div className="text-xs text-gray-300 mb-1">Integration with our existing tools could be more streamlined. Setup required more technical knowledge than expected.</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Tech Innovators segment</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-amber-900/30 text-amber-400 text-[10px]">Neutral</div>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg border-l-2 bg-gray-800 ${colorConfig.border}`}>
                  <div className="text-xs text-gray-300 mb-1">The predictive analytics feature has helped us anticipate customer needs and adjust our offerings accordingly. Game changer for our strategy.</div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Service Leaders segment</span>
                    <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">Positive</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Predicted Trends */}
          <div 
            className="col-span-4 grid grid-rows-5 gap-4"
            style={animationDelay(3)}
          >
            {/* AI Insight */}
            <div className="row-span-2 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                    <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-300">AI Key Insight</span>
                </div>
                <div className="px-1.5 py-0.5 rounded-full bg-purple-900/30 text-purple-400 text-xs">High confidence</div>
              </div>
              
              <div className={`mt-2 p-3 rounded-lg border border-gray-700 ${colorConfig.backgroundOpacity} bg-opacity-30`}>
                <div className={`text-sm ${colorConfig.primary} mb-2 font-medium`}>Opportunity Detected</div>
                <div className="text-xs text-gray-300 mb-2">Tech Innovators segment shows strong interest (4.2x) in advanced analytics features but 32% report limited usage due to complex implementation.</div>
                <div className={`text-xs ${colorConfig.primary}`}>Recommended Action: Develop simplified onboarding for analytics tools specifically for this segment.</div>
              </div>
            </div>
            
            {/* Predicted Trends */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="text-sm font-medium text-gray-300 mb-3">Predicted Market Trends</div>
              
              <div className="space-y-3 max-h-[180px] overflow-auto pr-1">
                {trends.map((trend) => (
                  <div key={trend.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-xs font-medium text-white">{trend.trend}</div>
                      <div className={`text-xs ${colorConfig.primary}`}>{trend.growth}</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="text-[10px] text-gray-400 mr-2">Probability</div>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${colorConfig.background}`} 
                          style={{ width: `${trend.probability}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-gray-300 ml-2">{trend.probability}%</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-800">
                <div className="text-[10px] text-gray-400 mb-1">AI Recommendation</div>
                <div className="text-xs text-gray-300">Focus product development on AI analytics and personalization features to align with predicted market demand shifts.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompetitorAnalysisVisual({ 
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

  // Competitor data
  const competitors = [
    { 
      id: 1, 
      name: "MarketLeader", 
      marketShare: 34,
      growth: 5.8,
      strengths: ["Enterprise clients", "Comprehensive suite", "Large support team"],
      weaknesses: ["Costly implementation", "Slow innovation", "Complex UI"],
      threat: "Medium"
    },
    { 
      id: 2, 
      name: "FastRiser", 
      marketShare: 12,
      growth: 28.4,
      strengths: ["Modern UX", "AI-first approach", "Rapid releases"],
      weaknesses: ["Limited integrations", "Less mature product", "Small team"],
      threat: "High"
    },
    { 
      id: 3, 
      name: "NicheExpert", 
      marketShare: 8,
      growth: 12.2,
      strengths: ["Industry specialization", "Compliance focus", "High retention"],
      weaknesses: ["Narrow feature set", "Regional focus", "Manual processes"],
      threat: "Low"
    },
    { 
      id: 4, 
      name: "LegacyPro", 
      marketShare: 21,
      growth: -2.6,
      strengths: ["Established clients", "Deep features", "Strong partnerships"],
      weaknesses: ["Aging platform", "Declining reputation", "Infrequent updates"],
      threat: "Low"
    }
  ];

  // Market trends data
  const trends = [
    "Increased focus on AI and automation",
    "Shift toward vertical-specific solutions",
    "Rising demand for no-code customization",
    "Greater emphasis on data privacy and compliance",
    "Integration capabilities becoming a key differentiator"
  ];

  // Competitive positioning - simplified 2D mapping
  const positioning = [
    { name: "Your Company", x: 68, y: 72, focus: "Innovation" },  // x: Innovation, y: Value
    { name: "MarketLeader", x: 42, y: 39, focus: "Scale" },
    { name: "FastRiser", x: 81, y: 64, focus: "Innovation" },
    { name: "NicheExpert", x: 58, y: 78, focus: "Specialization" },
    { name: "LegacyPro", x: 29, y: 51, focus: "Stability" }
  ];

  // Competitive gap opportunities
  const opportunities = [
    { name: "Mid-market automation suite", score: 9.2, competitors: ["MarketLeader", "NicheExpert"], potential: "High" },
    { name: "Industry-specific AI templates", score: 8.7, competitors: ["FastRiser"], potential: "Very High" },
    { name: "Self-service integration platform", score: 7.4, competitors: ["MarketLeader"], potential: "Medium" }
  ];

  return (
    <div className="relative h-[500px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      {/* Competitor Analysis Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Competitor Intelligence Platform</span>
          </div>
          <div className="flex space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs ${colorConfig.backgroundOpacity} ${colorConfig.primary}`}>Industry Overview</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Direct Competitors</div>
            <div className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">Market Trends</div>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Competitive Positioning & Market Share Column */}
          <div 
            className="col-span-7 grid grid-rows-7 gap-4"
            style={animationDelay(1)}
          >
            {/* Competitor Positioning Quadrant */}
            <div className="row-span-4 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Competitive Positioning Matrix</span>
                <div className="px-1.5 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-xs">Innovation vs. Value</div>
              </div>
              
              <div className="h-[220px] relative border border-gray-800 rounded bg-gray-900/50 p-3">
                {/* Axis labels */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] text-gray-500">
                  High Innovation
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 text-[10px] text-gray-500">
                  Low Innovation
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 -rotate-90 text-[10px] text-gray-500">
                  High Value
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 rotate-90 text-[10px] text-gray-500">
                  Low Value
                </div>
                
                {/* Quadrant grid lines */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-gray-800"></div>
                </div>
                <div className="absolute inset-0 flex justify-center">
                  <div className="h-full w-px bg-gray-800"></div>
                </div>
                
                {/* Company positions */}
                {positioning.map((company, i) => (
                  <div 
                    key={i} 
                    className={`absolute flex flex-col items-center ${i === 0 ? `${colorConfig.backgroundOpacity} border ${colorConfig.border}` : 'bg-gray-800 border-gray-700'} rounded-full px-2 py-1 transform -translate-x-1/2 -translate-y-1/2 border shadow-lg`}
                    style={{ 
                      left: `${company.x}%`, 
                      top: `${100 - company.y}%`,
                      zIndex: i === 0 ? 10 : 5
                    }}
                  >
                    <span className={`text-[10px] font-medium ${i === 0 ? colorConfig.primary : 'text-gray-300'}`}>{company.name}</span>
                    <span className="text-[8px] text-gray-500">{company.focus}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Market Share Breakdown */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Market Share Analysis</span>
                <div className="flex items-center text-xs">
                  <span className={`mr-2 ${colorConfig.primary}`}>Your share: 25%</span>
                  <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-xs flex items-center">
                    <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+3.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Market share donut chart - simplified representation */}
                <div className="relative h-[120px] flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full border-8 border-gray-600 bg-gray-800"></div>
                  <div className="absolute w-24 h-24 rounded-full border-t-8 border-r-8 border-transparent border-b-8 border-l-8 transform rotate-45"></div>
                  <div className="absolute w-24 h-24 rounded-full border-t-8 border-r-8 border-amber-500 border-b-8 border-l-8  transform rotate-[270deg]"></div>
                  <div className="absolute w-24 h-24 rounded-full border-8 border-gray-700 bg-transparent clip-path-[polygon(50%_50%,_100%_0,_100%_40%,_50%_50%)]"></div>
                  <div className="absolute w-16 h-16 rounded-full bg-gray-900"></div>
                  <div className={`absolute text-sm font-medium ${colorConfig.primary}`}>25%</div>
                </div>
                
                {/* Growth rates */}
                <div className="space-y-2 flex flex-col justify-center">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${colorConfig.background} mr-1.5`}></div>
                        <span className="text-xs text-gray-300">Your Growth</span>
                      </div>
                      <div className={`text-xs ${colorConfig.primary}`}>+14.8%</div>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full ${colorConfig.background}`} style={{ width: "76%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
                        <span className="text-xs text-gray-300">FastRiser</span>
                      </div>
                      <div className="text-xs text-amber-400">+28.4%</div>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
                        <span className="text-xs text-gray-300">Market Average</span>
                      </div>
                      <div className="text-xs text-green-400">+6.2%</div>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Competitor Profiles & Opportunities */}
          <div 
            className="col-span-5 grid grid-rows-5 gap-4"
            style={animationDelay(2)}
          >
            {/* Key Competitors */}
            <div className="row-span-3 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Key Competitors Profile</span>
                <div className="px-1.5 py-0.5 rounded-full bg-amber-900/30 text-amber-400 text-xs">Monitoring 4</div>
              </div>
              
              <div className="space-y-2.5 overflow-auto max-h-[200px] pr-1">
                {competitors.map((competitor) => (
                  <div key={competitor.id} className={`bg-gray-800 rounded-lg p-2.5 border ${competitor.threat === "High" ? 'border-amber-500/50' : 'border-gray-700'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-white">{competitor.name}</span>
                      <div className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        competitor.threat === "High" ? "bg-amber-900/30 text-amber-400" : 
                        competitor.threat === "Medium" ? "bg-blue-900/30 text-blue-400" : 
                        "bg-gray-700 text-gray-400"
                      }`}>
                        {competitor.threat} threat
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-1.5">
                      <div>
                        <div className="text-[10px] text-gray-400 mb-0.5">Market Share</div>
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{competitor.marketShare}%</span>
                          <div className="h-1 w-12 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${competitor.id === 2 ? 'bg-amber-500' : 'bg-gray-500'}`} 
                              style={{ width: `${(competitor.marketShare / 40) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 mb-0.5">Growth</div>
                        <div className="flex items-center">
                          <span className="text-xs text-white mr-1">{competitor.growth > 0 ? '+' : ''}{competitor.growth}%</span>
                          <svg className={`w-3 h-3 ${competitor.growth > 0 ? 'text-green-400' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={competitor.growth > 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {competitor.threat === "High" && (
                      <div>
                        <div className="text-[10px] text-gray-400 mb-0.5">Key Strengths</div>
                        <div className="flex flex-wrap gap-1">
                          {competitor.strengths.map((strength, j) => (
                            <span key={j} className="px-1.5 py-0.5 bg-gray-700 rounded text-[10px] text-gray-300">{strength}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Competitive Gaps & Opportunities */}
            <div className="row-span-2 bg-gray-900 rounded-lg border border-gray-800 p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                    <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-300">AI-Detected Opportunities</span>
                </div>
              </div>
              
              <div className="space-y-2 overflow-auto max-h-[90px]">
                {opportunities.map((opportunity, i) => (
                  <div key={i} className={`p-2 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-white">{opportunity.name}</span>
                      <div className="px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 text-[10px]">
                        {opportunity.potential}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400">Competitive gap vs {opportunity.competitors.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Trends Bar */}
        <div 
          className="mt-4 bg-gray-900 rounded-lg border border-gray-800 p-3"
          style={animationDelay(3)}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className={`p-1 rounded mr-2 ${colorConfig.backgroundOpacity}`}>
                <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-300">Top Industry Trends</span>
            </div>
            <div className="px-1.5 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-xs">
              Updated weekly
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {trends.map((trend, i) => (
              <div 
                key={i} 
                className={`px-2 py-1 rounded-full text-xs ${i === 0 ? `${colorConfig.backgroundOpacity} ${colorConfig.primary}` : 'bg-gray-800 text-gray-300'}`}
              >
                {trend}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MidMarketSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
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
