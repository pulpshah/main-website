"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  MessageCircle, 
  TrendingUp, 
  BarChart, 
  Target, 
  Shield,
  Users,
  AlertTriangle,
  UserCheck,
  LineChart,
  Bell
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue" | "red" | "amber";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  MessageCircle: <MessageCircle className="h-full w-full" />,
  TrendingUp: <TrendingUp className="h-full w-full" />,
  BarChart: <BarChart className="h-full w-full" />,
  Target: <Target className="h-full w-full" />,
  Shield: <Shield className="h-full w-full" />,
  Users: <Users className="h-full w-full" />,
  AlertTriangle: <AlertTriangle className="h-full w-full" />,
  UserCheck: <UserCheck className="h-full w-full" />,
  LineChart: <LineChart className="h-full w-full" />,
  Bell: <Bell className="h-full w-full" />
};

const colorMap = {
  purple: {
    gradient: "from-purple-600 to-purple-400",
    gradientAlt: "from-purple-900/20 to-purple-900/5",
    border: "border-purple-500/20",
    borderHover: "border-purple-500/40",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    fill: "#8A3FFC",
    shadowColor: "rgba(168,85,247,0.2)", 
  },
  pink: {
    gradient: "from-pink-600 to-pink-400",
    gradientAlt: "from-pink-900/20 to-pink-900/5",
    border: "border-pink-500/20",
    borderHover: "border-pink-500/40",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    fill: "#FF66C4",
    shadowColor: "rgba(236,72,153,0.2)",
  },
  amber: {
    gradient: "from-amber-600 to-amber-400",
    gradientAlt: "from-amber-900/20 to-amber-900/5",
    border: "border-amber-500/20",
    borderHover: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    fill: "#F59E0B",
    shadowColor: "rgba(245,158,11,0.2)",
  },
  green: {
    gradient: "from-green-600 to-emerald-400",
    gradientAlt: "from-green-900/20 to-green-900/5",
    border: "border-green-500/20",
    borderHover: "border-green-500/40",
    bg: "bg-green-500/10",
    text: "text-green-400",
    fill: "#10B981",
    shadowColor: "rgba(16,185,129,0.2)",
  },
  blue: {
    gradient: "from-blue-600 to-cyan-400",
    gradientAlt: "from-blue-900/20 to-blue-900/5",
    border: "border-blue-500/20",
    borderHover: "border-blue-500/40",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    fill: "#3B82F6",
    shadowColor: "rgba(59,130,246,0.2)",
  },
  red: {
    gradient: "from-red-600 to-red-400",
    gradientAlt: "from-red-900/20 to-red-900/5",
    border: "border-red-500/20", 
    borderHover: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    fill: "#EF4444",
    shadowColor: "rgba(239,68,68,0.2)",
  },
};

interface colorConfigType {
    gradient: string;
    gradientAlt: string;
    border: string; 
    borderHover: string;
    bg: string;
    text: string;
    fill: string;
    shadowColor: string;
}

// Main export component
export default function GovernmentSections({ sections }: { sections: SectionProps[] }) {
  return (
    <div className="py-16 w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-32">
          {sections.map((section, index) => (
            <Section 
              key={index}
              title={section.title}
              description={section.description}
              imageSide={section.imageSide}
              color={section.color}
              icon={section.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Section component 
function Section({ 
  title,
  description,
  imageSide,
  color,
  icon,
  index
}: SectionProps & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color as keyof typeof colorMap];

  return (
    <div 
      ref={ref}
      className={`flex flex-col ${imageSide === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
    >
      {/* Content */}
      <div 
        className="flex-1 space-y-4"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "none" : `translateX(${imageSide === 'left' ? '-20px' : '20px'})`,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className={`h-10 w-10 rounded-lg ${colorConfig.bg} flex items-center justify-center p-2 ${colorConfig.text}`}
            style={{
              boxShadow: `0 0 20px ${colorConfig.shadowColor}`
            }}
          >
            {iconMap[icon]}
          </div>
          <h2 className={`text-2xl md:text-3xl font-bold ${colorConfig.text}`}>
            {title}
          </h2>
        </div>
        
        <p className="text-lg text-gray-300 max-w-xl">
          {description}
        </p>
        
        <div className="pt-2">
        </div>
      </div>
      
      {/* Visual */}
      <div 
        className="flex-1"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "none" : `translateX(${imageSide === 'right' ? '-20px' : '20px'})`,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        <div 
          className={`aspect-2 p-1 bg-black rounded-xl overflow-hidden border ${colorConfig.border} hover:${colorConfig.borderHover} transition-all`}
          style={{
            boxShadow: `0 0 30px ${colorConfig.shadowColor}`
          }}
        >
          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${colorConfig.gradientAlt} p-6 flex items-center justify-center overflow-hidden relative`}>
            <GovernmentVisual 
              index={index} 
              color={color} 
              isInView={isInView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the visual component
interface VisualProps {
  index: number;
  color: string;
  isInView: boolean;
}

function GovernmentVisual({ index, color, isInView }: VisualProps) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Visualization based on section index
  switch(index) {
    case 0: // Engagement That Adapts in Real Time
      return <RealTimeEngagementVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1: // Predict Public Reactions Before They Happen
      return <PredictReactionsVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2: // Understand the True Pulse of Public Sentiment
      return <PublicSentimentVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3: // Turn Awareness Into Action
      return <AwarenessToActionVisual colorConfig={colorConfig} isInView={isInView} />;
    case 4: // Tackle Misinformation Before It Spreads
      return <MisinformationVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return <div className="text-white">Visual not available</div>;
  }
}



// Visualizations
function RealTimeEngagementVisual({ colorConfig, isInView }: { colorConfig: colorConfigType, isInView: boolean }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col space-y-6">
        {/* Message Templates */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.8s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Message Templates</span>
            <span className="text-xs text-gray-400 ml-auto">Dynamic Adaptation</span>
          </div>
          
          <div className="flex flex-col space-y-3 mt-3">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">A</div>
              <div className="flex-1 p-2 rounded-lg bg-gray-800 text-xs text-gray-300">
                Policy update affects downtown residents...
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">B</div>
              <div className="flex-1 p-2 rounded-lg bg-gray-800 text-xs text-gray-300">
                New healthcare initiative launches next month...
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">C</div>
              <div className="flex-1 p-2 rounded-lg bg-gray-800 text-xs text-gray-300">
                Emergency response protocols updated...
              </div>
            </div>
          </div>
        </div>
        
        {/* Processing & Adaptation */}
        <div 
          className={`flex justify-center`}
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.6s ease 1.2s"
          }}
        >
          <svg width="200" height="50" viewBox="0 0 200 50">
            <defs>
              <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2"/>
                <stop offset="50%" stopColor={colorConfig.fill} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.2"/>
              </linearGradient>
            </defs>
            
            {/* Flow arrows */}
            <path d="M30,25 L170,25" stroke="#444" strokeWidth="1" strokeDasharray="4,2"/>
            
            {/* Animated pulse */}
            <rect x="0" y="10" width="200" height="30" fill="url(#pulseGradient)" opacity="0.5">
              <animate 
                attributeName="x" 
                from="-200" 
                to="200" 
                dur="3s" 
                repeatCount="indefinite"
              />
            </rect>
            
            {/* Labels */}
            <text x="100" y="45" fill="white" fontSize="10" textAnchor="middle">Real-time adaptation</text>
          </svg>
        </div>
        
        {/* Personalized Messages */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(-20px)",
            transition: "all 0.6s ease 1.6s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Personalized Delivery</span>
            <span className="text-xs text-gray-400 ml-auto">Audience-Optimized</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex flex-col space-y-1">
              <div className="h-10 w-10 mx-auto rounded-full border border-gray-700 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4,21V19A7,7,0,0,1,16,13" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="8" r="4" stroke="#999" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className={`p-1.5 rounded text-[10px] ${colorConfig.bg} ${colorConfig.text} text-center`}>Seniors</div>
              <div className="p-1 bg-gray-800 rounded h-12 overflow-hidden">
                <div className="h-1.5 w-3/4 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-1/2 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-5/6 bg-gray-700 rounded"></div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <div className="h-10 w-10 mx-auto rounded-full border border-gray-700 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12,12m-9,0a9,9,0,1,0,18,0a9,9,0,1,0,-18,0" stroke="#999" strokeWidth="1.5"/>
                  <path d="M18,18.7L21.1,21.8" stroke="#999" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className={`p-1.5 rounded text-[10px] ${colorConfig.bg} ${colorConfig.text} text-center`}>Downtown</div>
              <div className="p-1 bg-gray-800 rounded h-12 overflow-hidden">
                <div className="h-1.5 w-5/6 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-2/3 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-3/4 bg-gray-700 rounded"></div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <div className="h-10 w-10 mx-auto rounded-full border border-gray-700 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3,21L3,5A2,2,0,0,1,5,3L19,3A2,2,0,0,1,21,5L21,21" stroke="#999" strokeWidth="1.5"/>
                  <path d="M9,21V17a2,2,0,0,1,2-2h2a2,2,0,0,1,2,2v4" stroke="#999" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className={`p-1.5 rounded text-[10px] ${colorConfig.bg} ${colorConfig.text} text-center`}>Homeowners</div>
              <div className="p-1 bg-gray-800 rounded h-12 overflow-hidden">
                <div className="h-1.5 w-2/3 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-5/6 bg-gray-700 rounded mb-1"></div>
                <div className="h-1.5 w-1/2 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800">
            <div className="text-xs text-gray-400">Real-time delivery analytics</div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-400">+68% engagement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PredictReactionsVisual({ colorConfig, isInView }: { colorConfig: colorConfigType, isInView: boolean }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col space-y-6">
        {/* Draft Message */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.8s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-white font-medium">Draft Announcement</span>
            <span className="text-xs text-gray-400 ml-auto">Before Publishing</span>
          </div>
          
          <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="h-3 w-5/6 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-4/5 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-11/12 bg-gray-700 rounded"></div>
          </div>
          
          <div className="flex justify-between mt-3">
            <div className="text-xs text-white">Transit System Update</div>
            <div className="flex items-center">
              <Bell className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-400">3.4M potential reach</span>
            </div>
          </div>
        </div>
        
        {/* Prediction Engine */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(-20px)",
            transition: "all 0.6s ease 1.6s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Reaction Prediction</span>
          </div>
          
          <div className="space-y-4">
            {/* Sentiment Prediction */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Sentiment Prediction</span>
                <span className="text-gray-300">Mixed (42% Positive)</span>
              </div>
              <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-green-500"
                  style={{
                    width: isInView ? "42%" : "0%",
                    transition: "width 1s ease 1.8s"
                  }}
                ></div>
                <div 
                  className="h-full bg-gray-600"
                  style={{
                    width: isInView ? "38%" : "0%",
                    transition: "width 1s ease 2s"
                  }}
                ></div>
                <div 
                  className="h-full bg-red-500"
                  style={{
                    width: isInView ? "20%" : "0%",
                    transition: "width 1s ease 2.2s"
                  }}
                ></div>
              </div>
            </div>
            
            {/* Engagement Forecast */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Engagement Forecast</span>
                <span className="text-gray-300">High (3.2K responses)</span>
              </div>
              <div className="relative h-16">
                <svg width="100%" height="100%" viewBox="0 0 300 60">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.1"/>
                      <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.5"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <line x1="0" y1="15" x2="300" y2="15" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="0" y1="30" x2="300" y2="30" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="0" y1="45" x2="300" y2="45" stroke="#333" strokeWidth="1" strokeDasharray="2,2" />
                  
                  {/* Chart line - define the path but set initial strokeDashoffset to hide it */}
                  <path 
                    d="M0,50 C30,45 60,40 90,20 S150,5 180,15 S240,35 300,10" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="2"
                    strokeDasharray="300"
                    strokeDashoffset={isInView ? "0" : "300"}
                    style={{ transition: "stroke-dashoffset 1.5s ease 2s" }}
                  />
                  
                  {/* Fill area under the curve */}
                  <path 
                    d="M0,50 C30,45 60,40 90,20 S150,5 180,15 S240,35 300,10 V60 H0 Z" 
                    fill="url(#chartGradient)"
                    opacity={isInView ? "1" : "0"}
                    style={{ transition: "opacity 1.5s ease 2.2s" }}
                  />
                  
                  {/* Highlight the peak point */}
                  <circle 
                    cx="180" 
                    cy="15" 
                    r="4" 
                    fill={colorConfig.fill}
                    opacity={isInView ? "1" : "0"}
                    style={{ transition: "opacity 0.5s ease 3.3s" }}
                  />
                </svg>
              </div>
            </div>
            
            {/* Potential Issues */}
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-red-900/30 border border-red-700/30 rounded text-xs text-red-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Route changes confusion
              </div>
              <div className="px-2 py-1 bg-orange-900/30 border border-orange-700/30 rounded text-xs text-orange-400 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Timing concerns
              </div>
            </div>
            
            <div className="mt-1 text-xs text-white flex justify-between items-center">
              <div className={`px-2 py-1 ${colorConfig.bg} rounded`}>Optimize before publishing</div>
              <span className="text-gray-400">+54 suggested edits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublicSentimentVisual({ colorConfig, isInView }: { colorConfig: colorConfigType, isInView: boolean }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col space-y-6">
        {/* Sentiment Analysis Dashboard */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.8s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BarChart className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Sentiment Analysis</span>
            <span className="text-xs text-gray-400 ml-auto">Deep Analysis</span>
          </div>
          
          {/* Sentiment Distribution */}
          <div className="relative h-24 mt-2">
            <svg width="100%" height="100%" viewBox="0 0 300 85">
              <defs>
                <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#A3A3A3" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              
              {/* Sentiment Scale */}
              <rect x="30" y="70" width="240" height="4" rx="2" fill="url(#sentimentGradient)" />
              
              {/* Sentiment Labels */}
              <text x="30" y="85" fontSize="10" fill="#EF4444" textAnchor="middle">Negative</text>
              <text x="150" y="85" fontSize="10" fill="#A3A3A3" textAnchor="middle">Neutral</text>
              <text x="270" y="85" fontSize="10" fill="#10B981" textAnchor="middle">Positive</text>
              
              {/* Actual Distribution */}
              <g opacity={isInView ? "1" : "0"} style={{ transition: "opacity 1s ease 1.2s" }}>
                {/* Cluster 1 - Negative */}
                <circle cx="70" cy="40" r="15" fill="#EF4444" opacity="0.2" />
                <circle cx="70" cy="40" r="8" fill="#EF4444" opacity="0.4" />
                <text x="70" y="43" fontSize="8" fill="white" textAnchor="middle">12%</text>
                
                {/* Cluster 2 - Neutral/Slightly Negative */}
                <circle cx="120" cy="35" r="18" fill="#A3A3A3" opacity="0.2" />
                <circle cx="120" cy="35" r="12" fill="#A3A3A3" opacity="0.4" />
                <text x="120" y="38" fontSize="9" fill="white" textAnchor="middle">28%</text>
                
                {/* Cluster 3 - Neutral/Slightly Positive */}
                <circle cx="180" cy="30" r="22" fill="#65A3B8" opacity="0.2" />
                <circle cx="180" cy="30" r="16" fill="#65A3B8" opacity="0.4" />
                <text x="180" y="33" fontSize="10" fill="white" textAnchor="middle">37%</text>
                
                {/* Cluster 4 - Positive */}
                <circle cx="240" cy="40" r="17" fill="#10B981" opacity="0.2" />
                <circle cx="240" cy="40" r="10" fill="#10B981" opacity="0.4" />
                <text x="240" y="43" fontSize="8" fill="white" textAnchor="middle">23%</text>
              </g>
              
              {/* Surface vs Deep Indicator */}
              <g opacity={isInView ? "1" : "0"} style={{ transition: "opacity 1s ease 1.6s" }}>
                <path d="M30,10 L270,10" stroke="#444" strokeWidth="1" strokeDasharray="4,2" />
                <text x="10" y="13" fontSize="8" fill="#999" textAnchor="start">Surface</text>
                
                <path d="M30,50 L270,50" stroke="#444" strokeWidth="1" strokeDasharray="4,2" />
                <text x="10" y="53" fontSize="8" fill="#999" textAnchor="start">Deep</text>
                
                {/* Connecting lines between surface and deep sentiment */}
                <line x1="70" y1="15" x2="70" y2="40" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,1" opacity="0.5" />
                <line x1="120" y1="15" x2="120" y2="35" stroke="#A3A3A3" strokeWidth="1" strokeDasharray="2,1" opacity="0.5" />
                <line x1="180" y1="15" x2="180" y2="30" stroke="#65A3B8" strokeWidth="1" strokeDasharray="2,1" opacity="0.5" />
                <line x1="240" y1="15" x2="240" y2="40" stroke="#10B981" strokeWidth="1" strokeDasharray="2,1" opacity="0.5" />
              </g>
            </svg>
          </div>
          
          <div className="text-xs text-gray-400 mt-2">
            Hidden sentiment differs from surface expressions
          </div>
        </div>
        
        {/* Narrative Analysis */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(-20px)",
            transition: "all 0.6s ease 1.6s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-white font-medium">Emerging Narratives</span>
            <span className="text-xs text-gray-400 ml-auto">Real-time Analysis</span>
          </div>
          
          <div className="space-y-3">
            {/* Narrative 1 */}
            <div className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className={`${colorConfig.text}`}>Economic Impact Concerns</span>
                <span className="text-gray-400">32% of conversations</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorConfig.gradient}`}
                  style={{
                    width: isInView ? "32%" : "0%",
                    transition: "width 1s ease 1.8s"
                  }}
                ></div>
              </div>
              <div 
                className="absolute -right-1 top-4 h-12 w-1 bg-gray-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 2.2s"
                }}
              >
                <div 
                  className="absolute top-0 right-0 h-5 w-1 bg-red-500"
                  style={{
                    height: isInView ? "5px" : "0px",
                    transition: "height 0.5s ease 2.3s"
                  }}
                ></div>
                <div className="absolute -right-14 -top-1 text-[9px] text-red-400">Trending ↑</div>
              </div>
            </div>
            
            {/* Narrative 2 */}
            <div className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className={`${colorConfig.text}`}>Safety Improvement Recognition</span>
                <span className="text-gray-400">27% of conversations</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorConfig.gradient}`}
                  style={{
                    width: isInView ? "27%" : "0%",
                    transition: "width 1s ease 2s"
                  }}
                ></div>
              </div>
              <div 
                className="absolute -right-1 top-4 h-12 w-1 bg-gray-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 2.4s"
                }}
              >
                <div 
                  className="absolute top-0 right-0 h-3 w-1 bg-green-500"
                  style={{
                    height: isInView ? "3px" : "0px",
                    transition: "height 0.5s ease 2.5s"
                  }}
                ></div>
                <div className="absolute -right-14 -top-1 text-[9px] text-green-400">Stable</div>
              </div>
            </div>
            
            {/* Narrative 3 */}
            <div className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className={`${colorConfig.text}`}>Transparency Questions</span>
                <span className="text-gray-400">22% of conversations</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorConfig.gradient}`}
                  style={{
                    width: isInView ? "22%" : "0%",
                    transition: "width 1s ease 2.2s"
                  }}
                ></div>
              </div>
              <div 
                className="absolute -right-1 top-4 h-12 w-1 bg-gray-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 2.6s"
                }}
              >
                <div 
                  className="absolute top-7 right-0 h-3 w-1 bg-blue-500"
                  style={{
                    height: isInView ? "3px" : "0px",
                    transition: "height 0.5s ease 2.7s"
                  }}
                ></div>
                <div className="absolute -right-14 top-6 text-[9px] text-blue-400">Declining ↓</div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center">
            <div className="text-xs text-gray-400">Hidden emotional drivers detected</div>
            <div className={`px-2 py-1 ${colorConfig.bg} rounded text-xs ${colorConfig.text}`}>
              3 strategic opportunities
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwarenessToActionVisual({ colorConfig, isInView }: { colorConfig: colorConfigType, isInView: boolean }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col space-y-6">
        {/* Awareness to Action Funnel */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.8s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Civic Engagement Funnel</span>
          </div>
          
          {/* Awareness to Action Funnel */}
          <div className="relative h-40 mt-2">
            <svg width="100%" height="100%" viewBox="0 0 300 160">
              <defs>
                <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              {/* Funnel Background */}
              <path 
                d="M50,10 L250,10 L220,50 L200,90 L180,130 L120,130 L100,90 L80,50 Z" 
                fill="url(#funnelGradient)" 
                opacity="0.3"
              />
              
              {/* Funnel Stages - animated on view */}
              <g opacity={isInView ? "1" : "0"} style={{ transition: "opacity 1s ease 1.2s" }}>
                {/* Stage 1: Awareness */}
                <rect 
                  x="50" 
                  y="10" 
                  width="200" 
                  height="12" 
                  fill="url(#funnelGradient)"
                  style={{
                    transform: isInView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.8s ease 1.3s"
                  }}
                />
                <text x="150" y="18" fontSize="10" fill="white" textAnchor="middle">Awareness (100%)</text>
                
                {/* Stage 2: Understanding */}
                <path 
                  d="M65,30 L235,30 L225,40 L75,40 Z" 
                  fill="url(#funnelGradient)"
                  style={{
                    transform: isInView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.8s ease 1.5s"
                  }}
                />
                <text x="150" y="38" fontSize="9" fill="white" textAnchor="middle">Understanding (78%)</text>
                
                {/* Stage 3: Conviction */}
                <path 
                  d="M85,60 L215,60 L205,70 L95,70 Z" 
                  fill="url(#funnelGradient)"
                  style={{
                    transform: isInView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.8s ease 1.7s"
                  }}
                />
                <text x="150" y="68" fontSize="9" fill="white" textAnchor="middle">Conviction (54%)</text>
                
                {/* Stage 4: Advocacy */}
                <path 
                  d="M100,90 L200,90 L190,100 L110,100 Z" 
                  fill="url(#funnelGradient)"
                  style={{
                    transform: isInView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.8s ease 1.9s"
                  }}
                />
                <text x="150" y="98" fontSize="9" fill="white" textAnchor="middle">Advocacy (32%)</text>
                
                {/* Stage 5: Action */}
                <path 
                  d="M120,120 L180,120 L180,130 L120,130 Z" 
                  fill="url(#funnelGradient)"
                  style={{
                    transform: isInView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform 0.8s ease 2.1s"
                  }}
                />
                <text x="150" y="128" fontSize="9" fill="white" textAnchor="middle">Action (17%)</text>
              </g>
              
              {/* Conversion Rate */}
              <text 
                x="150" 
                y="150" 
                fontSize="12" 
                fill={colorConfig.fill} 
                textAnchor="middle"
                opacity={isInView ? "1" : "0"} 
                style={{ transition: "opacity 0.5s ease 2.3s" }}
              >
                Total Conversion: 17%
              </text>
            </svg>
          </div>
        </div>
        
        {/* Key Influencers */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(-20px)",
            transition: "all 0.6s ease 1.6s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-white font-medium">Key Influencers & Momentum</span>
          </div>
          
          <div className="space-y-4">
            {/* Network Map */}
            <div className="h-24 relative">
              <svg width="100%" height="100%" viewBox="0 0 300 100">
                {/* Nodes and connections */}
                <g opacity={isInView ? "1" : "0"} style={{ transition: "opacity 1s ease 1.9s" }}>
                  {/* Main Influencers */}
                  <circle cx="150" cy="50" r="12" fill={colorConfig.fill} opacity="0.3" />
                  <circle cx="150" cy="50" r="8" fill={colorConfig.fill} opacity="0.6" />
                  <text x="150" y="53" fontSize="7" fill="white" textAnchor="middle">ID-1</text>
                  
                  <circle cx="190" cy="40" r="10" fill={colorConfig.fill} opacity="0.3" />
                  <circle cx="190" cy="40" r="6" fill={colorConfig.fill} opacity="0.6" />
                  <text x="190" y="42" fontSize="6" fill="white" textAnchor="middle">ID-2</text>
                  
                  <circle cx="120" cy="30" r="9" fill={colorConfig.fill} opacity="0.3" />
                  <circle cx="120" cy="30" r="5" fill={colorConfig.fill} opacity="0.6" />
                  <text x="120" y="32" fontSize="6" fill="white" textAnchor="middle">ID-3</text>
                  
                  {/* Secondary Influencers */}
                  <circle cx="80" cy="45" r="7" fill="#888" opacity="0.3" />
                  <circle cx="80" cy="45" r="4" fill="#888" opacity="0.6" />
                  
                  <circle cx="220" cy="60" r="7" fill="#888" opacity="0.3" />
                  <circle cx="220" cy="60" r="4" fill="#888" opacity="0.6" />
                  
                  <circle cx="180" cy="75" r="6" fill="#888" opacity="0.3" />
                  <circle cx="180" cy="75" r="3" fill="#888" opacity="0.6" />
                  
                  <circle cx="100" cy="70" r="6" fill="#888" opacity="0.3" />
                  <circle cx="100" cy="70" r="3" fill="#888" opacity="0.6" />
                  
                  {/* Network Connections */}
                  <line x1="150" y1="50" x2="190" y2="40" stroke="#666" strokeWidth="1" />
                  <line x1="150" y1="50" x2="120" y2="30" stroke="#666" strokeWidth="1" />
                  <line x1="150" y1="50" x2="80" y2="45" stroke="#666" strokeWidth="1" />
                  <line x1="150" y1="50" x2="220" y2="60" stroke="#666" strokeWidth="1" />
                  <line x1="150" y1="50" x2="180" y2="75" stroke="#666" strokeWidth="1" />
                  <line x1="150" y1="50" x2="100" y2="70" stroke="#666" strokeWidth="1" />
                  
                  <line x1="120" y1="30" x2="80" y2="45" stroke="#666" strokeWidth="1" strokeDasharray="2,1" />
                  <line x1="190" y1="40" x2="220" y2="60" stroke="#666" strokeWidth="1" strokeDasharray="2,1" />
                  
                  {/* Tertiary nodes */}
                  <circle cx="60" cy="20" r="4" fill="#555" opacity="0.4" />
                  <circle cx="70" cy="70" r="4" fill="#555" opacity="0.4" />
                  <circle cx="230" cy="30" r="4" fill="#555" opacity="0.4" />
                  <circle cx="210" cy="80" r="4" fill="#555" opacity="0.4" />
                  <circle cx="140" cy="80" r="4" fill="#555" opacity="0.4" />
                </g>
              </svg>
            </div>
            
            {/* Influencer Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-black/30 rounded border border-gray-800">
                <div className="text-[10px] text-gray-400">Reach</div>
                <div className="text-sm text-white font-bold">142K</div>
              </div>
              
              <div className="p-2 bg-black/30 rounded border border-gray-800">
                <div className="text-[10px] text-gray-400">Engagement</div>
                <div className="text-sm text-white font-bold">28.5%</div>
              </div>
              
              <div className="p-2 bg-black/30 rounded border border-gray-800">
                <div className="text-[10px] text-gray-400">Trust Score</div>
                <div className="text-sm text-white font-bold">High</div>
              </div>
            </div>
            
            {/* Momentum Timeline */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Campaign Momentum</span>
                <span className={`${colorConfig.text}`}>Tipping Point Approaching</span>
              </div>
              
              <div className="relative h-10">
                <svg width="100%" height="100%" viewBox="0 0 300 30">
                  {/* Timeline */}
                  <line x1="10" y1="15" x2="290" y2="15" stroke="#444" strokeWidth="1" />
                  
                  {/* Timeline nodes */}
                  <circle cx="50" cy="15" r="3" fill="#666" />
                  <circle cx="110" cy="15" r="3" fill="#888" />
                  <circle cx="170" cy="15" r="3" fill="#aaa" />
                  <circle cx="230" cy="15" r="4" fill={colorConfig.fill} />
                  <circle cx="230" cy="15" r="8" fill={colorConfig.fill} opacity="0.3" />
                  
                  {/* Timeline labels */}
                  <text x="50" y="25" fontSize="8" fill="#666" textAnchor="middle">Past</text>
                  <text x="170" y="25" fontSize="8" fill="#aaa" textAnchor="middle">Now</text>
                  <text x="230" y="25" fontSize="8" fill={colorConfig.fill} textAnchor="middle">Optimal</text>
                  
                  {/* Current position indicator */}
                  <rect 
                    x="165" 
                    y="5" 
                    width="10" 
                    height="20" 
                    fill="#aaa" 
                    opacity="0.3"
                    style={{
                      opacity: isInView ? 0.3 : 0,
                      transition: "opacity 0.5s ease 2s"
                    }}
                  />
                  
                  {/* Progress arrow */}
                  <path 
                    d="M10,15 Q100,30 170,15" 
                    fill="none" 
                    stroke="#666" 
                    strokeWidth="1.5"
                    strokeDasharray="200"
                    strokeDashoffset={isInView ? "0" : "200"}
                    style={{ transition: "stroke-dashoffset 1.5s ease 2.2s" }}
                  />
                  <path 
                    d="M170,15 Q220,5 270,15" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1.5" 
                    strokeDasharray="1,1"
                    strokeDashoffset={isInView ? "0" : "100"}
                    style={{ transition: "stroke-dashoffset 1s ease 3.2s" }}
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Action window: 3-5 days</span>
              <div className={`px-2 py-1 rounded text-xs ${colorConfig.bg} ${colorConfig.text}`}>
                Mobilization Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MisinformationVisual({ colorConfig, isInView }: { colorConfig: colorConfigType, isInView: boolean }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col space-y-6">
        {/* Misinformation Detection */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.8s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className={`h-4 w-4 ${colorConfig.text}`} />
            <span className="text-sm text-white font-medium">Misinformation Radar</span>
            <span className="text-xs text-gray-400 ml-auto">Early Detection</span>
          </div>
          
          {/* Misinformation Detection Visualization */}
          <div className="relative h-36">
            <svg width="100%" height="100%" viewBox="0 0 300 140">
              <defs>
                <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.7" />
                  <stop offset="70%" stopColor={colorConfig.fill} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0" />
                </radialGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Radar Background */}
              <circle 
                cx="150" 
                cy="70" 
                r="60" 
                fill="url(#radarGradient)" 
                opacity="0.3"
              />
              
              {/* Radar Rings */}
              <circle cx="150" cy="70" r="20" fill="none" stroke="#444" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx="150" cy="70" r="40" fill="none" stroke="#444" strokeWidth="1" strokeDasharray="2,2" />
              <circle cx="150" cy="70" r="60" fill="none" stroke="#444" strokeWidth="1" strokeDasharray="2,2" />
              
              {/* Radar Sweep */}
              <path 
                d="M150,70 L150,10 A60,60 0 0,1 150,70" 
                fill={colorConfig.fill} 
                opacity="0.6"
                style={{
                  transformOrigin: "150px 70px",
                  animation: isInView ? "radarSweep 4s linear infinite" : "none"
                }}
              />
              
              {/* Threat Points */}
              <g opacity={isInView ? "1" : "0"} style={{ transition: "opacity 1s ease 1.2s" }}>
                {/* High-threat point (red) */}
                <circle 
                  cx="190" 
                  cy="40" 
                  r="4" 
                  fill="#EF4444" 
                  filter="url(#glow)"
                  style={{
                    animation: "pulse 2s infinite"
                  }}
                />
                <text x="200" y="40" fontSize="8" fill="#EF4444" textAnchor="start">High Threat</text>
                <line x1="190" y1="40" x2="150" y2="70" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,1" />
                
                {/* Medium-threat points (orange) */}
                <circle cx="100" cy="50" r="3" fill="#F59E0B" filter="url(#glow)" />
                <text x="90" y="50" fontSize="8" fill="#F59E0B" textAnchor="end">Medium</text>
                <line x1="100" y1="50" x2="150" y2="70" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,1" />
                
                <circle cx="170" cy="110" r="3" fill="#F59E0B" filter="url(#glow)" />
                <text x="180" y="110" fontSize="8" fill="#F59E0B" textAnchor="start">Medium</text>
                <line x1="170" y1="110" x2="150" y2="70" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,1" />
                
                {/* Low-threat points (yellow) */}
                <circle cx="130" cy="30" r="2" fill="#EAB308" />
                <circle cx="210" cy="80" r="2" fill="#EAB308" />
                <circle cx="90" cy="100" r="2" fill="#EAB308" />
              </g>
              
              {/* Alert Notice */}
              <g 
                opacity={isInView ? "1" : "0"} 
                style={{ 
                  transition: "opacity 0.5s ease 2s",
                  animation: isInView ? "pulseAlert 2s infinite" : "none"
                }}
              >
                <rect x="100" y="125" width="100" height="15" rx="4" fill="rgba(239, 68, 68, 0.2)" stroke="#EF4444" strokeWidth="1" />
                <text x="150" y="135" fontSize="9" fill="#EF4444" textAnchor="middle">ALERT: 1 Critical Threat Detected</text>
              </g>
            </svg>
            
            <style jsx global>{`
              @keyframes radarSweep {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0% { r: 4; opacity: 1; }
                50% { r: 6; opacity: 0.8; }
                100% { r: 4; opacity: 1; }
              }
              @keyframes pulseAlert {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
              }
            `}</style>
          </div>
          
          <div className="text-xs text-gray-400">
            Early detection system monitoring social channels
          </div>
        </div>
        
        {/* Misinformation Analysis */}
        <div 
          className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(-20px)",
            transition: "all 0.6s ease 1.6s",
            boxShadow: `0 0 20px ${colorConfig.shadowColor}`
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-white font-medium">Threat Analysis & Response</span>
          </div>
          
          <div className="space-y-4">
            {/* Source Tracing */}
            <div className="flex space-x-2">
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">Source Identification</div>
                <div className="p-2 bg-red-900/20 border border-red-900/30 rounded">
                  <div className="flex justify-between">
                    <span className="text-xs text-white">Coordinated Sources</span>
                    <span className="text-xs text-red-400">High Risk</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#999" strokeWidth="1" />
                      <path d="M12,3 C16.97,3 21,7.03 21,12" stroke="#EF4444" strokeWidth="1.5" />
                      <path d="M13,7 L17,7 L17,11" stroke="#EF4444" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[10px] text-gray-400">3 primary networks</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 mb-1">Growth Pattern</div>
                <div className="p-2 bg-red-900/20 border border-red-900/30 rounded">
                  <div className="h-10 relative">
                    <svg width="100%" height="100%" viewBox="0 0 100 30">
                      <path 
                        d="M0,30 L10,28 L20,25 L30,22 L40,18 L50,15 L60,10 L70,7 L80,3 L90,2 L100,0" 
                        stroke="#EF4444" 
                        strokeWidth="1.5" 
                        fill="none"
                        strokeDasharray="60"
                        strokeDashoffset={isInView ? "0" : "60"}
                        style={{ transition: "stroke-dashoffset 1s ease 2.2s" }}
                      />
                    </svg>
                  </div>
                  <div className="text-[10px] text-gray-400">Exponential spread pattern</div>
                </div>
              </div>
            </div>
            
            {/* Counter Strategy */}
            <div className="p-2 border border-gray-700 rounded bg-black/30">
              <div className="flex items-center mb-1">
                <div className={`w-4 h-4 rounded-full ${colorConfig.bg} flex items-center justify-center mr-2`}>
                  <Shield className="h-2.5 w-2.5 text-white" />
                </div>
                <span className="text-xs text-white">Recommended Counter-Strategy</span>
              </div>
              
              <div className="space-y-2 mt-2">
                <div className="flex items-center text-[10px]">
                  <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <span className="text-[8px] text-white">1</span>
                  </div>
                  <span className="text-gray-200">Direct factual rebuttal via trusted channels</span>
                </div>
                <div className="flex items-center text-[10px]">
                  <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <span className="text-[8px] text-white">2</span>
                  </div>
                  <span className="text-gray-200">Amplify through identified community leaders</span>
                </div>
                <div className="flex items-center text-[10px]">
                  <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <span className="text-[8px] text-white">3</span>
                  </div>
                  <span className="text-gray-200">Deploy pre-built visual explainer assets</span>
                </div>
              </div>
            </div>
            
            {/* Effectiveness Prediction */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className={`${colorConfig.text}`}>Strategy Effectiveness Prediction</span>
                <span className="text-white">78%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorConfig.gradient}`}
                  style={{
                    width: isInView ? "78%" : "0%",
                    transition: "width 1s ease 2.5s"
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Recommended action window: &lt;3 hours</span>
                <span className="text-green-400">Containable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { GovernmentSections }; 