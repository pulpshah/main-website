"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  FileText, 
  ListChecks, 
  Network, 
  Zap,
  FileDigit,
  BookOpen,
  FileSearch,
  Scroll,
  Clock
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue" | "red" | "amber";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  FileText: <FileText className="h-full w-full" />,
  ListChecks: <ListChecks className="h-full w-full" />,
  Network: <Network className="h-full w-full" />,
  Zap: <Zap className="h-full w-full" />,
  FileDigit: <FileDigit className="h-full w-full" />,
  BookOpen: <BookOpen className="h-full w-full" />,
  FileSearch: <FileSearch className="h-full w-full" />,
  Scroll: <Scroll className="h-full w-full" />,
  Clock: <Clock className="h-full w-full" />
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

// Main export component
export default function KnowledgeSynthesisSections({ sections }: { sections: SectionProps[] }) {
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
            <KnowledgeSynthesisVisual 
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

function KnowledgeSynthesisVisual({ index, color, isInView }: VisualProps) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Visualization based on section index
  switch(index) {
    case 0: // Summarize Without Losing Substance
      return (
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col space-y-6">
            {/* Original Document */}
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
                <FileText className={`h-4 w-4 ${colorConfig.text}`} />
                <span className="text-sm text-white font-medium">Original Document</span>
                <span className="text-xs text-gray-400 ml-auto">2,450 words</span>
              </div>
              
              <div className="space-y-1.5">
                {[...Array(10)].map((_, i) => (
                  <div suppressHydrationWarning
                    key={i} 
                    className="h-2 bg-gray-800 rounded-full"
                    style={{
                      width: `${85 + Math.random() * 15}%`,
                      opacity: 0.5 + Math.random() * 0.5
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Processing Animation */}
            <div 
              className="flex justify-center"
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 1.2s"
              }}
            >
              <div className="relative h-8 w-8">
                <div className={`absolute inset-0 ${colorConfig.bg} rounded-full opacity-50 animate-ping`}></div>
                <div className={`absolute inset-0 flex items-center justify-center ${colorConfig.bg} rounded-full`}>
                  <FileSearch className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            {/* Summarized Content */}
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
                <Scroll className={`h-4 w-4 ${colorConfig.text}`} />
                <span className="text-sm text-white font-medium">Precise Summary</span>
                <span className="text-xs text-gray-400 ml-auto">325 words</span>
              </div>
              
              <div className="space-y-2">
                <div 
                  className={`w-full h-6 bg-gradient-to-r ${colorConfig.gradient} rounded opacity-70`}
                ></div>
                
                <div className="space-y-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div suppressHydrationWarning
                      key={i} 
                      className="h-2 bg-gray-800 rounded-full"
                      style={{
                        width: `${85 + Math.random() * 15}%`,
                        opacity: 0.8
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex items-center mt-3 pt-2 border-t border-gray-800">
                  <div className="flex space-x-2">
                    <div className={`px-2 py-1 rounded text-xs ${colorConfig.bg} ${colorConfig.text}`}>Key Insight</div>
                    <div className={`px-2 py-1 rounded text-xs ${colorConfig.bg} ${colorConfig.text}`}>Preserved Nuance</div>
                  </div>
                  
                  <div className="ml-auto flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-xs text-gray-400">85% context preserved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 1: // Turn Meetings Into Actionable Next Steps
      return (
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col space-y-6">
            {/* Meeting Transcript */}
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
                <span className="text-sm text-white font-medium">Meeting Transcript</span>
                <span className="text-xs text-gray-400 ml-auto">1h 24m</span>
              </div>
              
              {/* Conversation snippets */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-white">A</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-4/5"></div>
                    <div className="h-2 bg-gray-700 rounded-full w-3/5 mt-1"></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-white">B</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-3/4"></div>
                    <div className="h-2 bg-gray-700 rounded-full w-2/3 mt-1"></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-xs text-white">C</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Items */}
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
                <ListChecks className={`h-4 w-4 ${colorConfig.text}`} />
                <span className="text-sm text-white font-medium">Actionable Next Steps</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full ${colorConfig.bg} flex items-center justify-center`}>
                    <span className="text-xs text-white">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-5/6"></div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">Owner: Alex</span>
                      <span className="text-xs text-gray-400 ml-auto">Due: April 15</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full ${colorConfig.bg} flex items-center justify-center`}>
                    <span className="text-xs text-white">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-2/3"></div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">Owner: Taylor</span>
                      <span className="text-xs text-gray-400 ml-auto">Due: April 20</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`h-5 w-5 rounded-full ${colorConfig.bg} flex items-center justify-center`}>
                    <span className="text-xs text-white">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-700 rounded-full w-4/5"></div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-400">Owner: Jordan</span>
                      <span className="text-xs text-gray-400 ml-auto">Due: April 22</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-800">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Key Decisions: 4</span>
                  <span>Agreements: 2</span>
                  <span>Questions: 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 2: // Map Hidden Connections
      return (
        <div className="w-full max-w-[400px] h-[200px] relative">
          <svg
            viewBox="0 0 400 200"
            className="w-full h-full"
            style={{
              opacity: isInView ? 1 : 0,
              transition: "opacity 0.8s ease-in-out 0.5s"
            }}
          >
            <defs>
              <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.7" />
              </linearGradient>
            </defs>
            
            {/* Connection Lines */}
            <g>
              <path 
                d="M50,100 C120,50 200,50 270,100" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                strokeDasharray="4,2" 
                opacity="0.6"
                strokeLinecap="round"
              />
              <path 
                d="M50,100 C100,150 150,150 200,100" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                strokeDasharray="4,2" 
                opacity="0.6"
                strokeLinecap="round"
              />
              <path 
                d="M200,100 C250,150 300,150 350,100" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                strokeDasharray="4,2" 
                opacity="0.6"
                strokeLinecap="round"
              />
              <path 
                d="M50,100 L110,60" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                opacity="0.8"
                strokeLinecap="round"
              />
              <path 
                d="M110,60 L200,100" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                opacity="0.8"
                strokeLinecap="round"
              />
              <path 
                d="M200,100 L290,60" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                opacity="0.8"
                strokeLinecap="round"
              />
              <path 
                d="M290,60 L350,100" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                opacity="0.8"
                strokeLinecap="round"
              />
              <path 
                d="M110,60 L290,60" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="1" 
                opacity="0.8"
                strokeLinecap="round"
              />
            </g>
            
            {/* Nodes */}
            <g>
              <circle cx="50" cy="100" r="15" fill="url(#nodeGradient)" stroke="#333" strokeWidth="1" />
              <circle cx="110" cy="60" r="10" fill="url(#nodeGradient)" stroke="#333" strokeWidth="1" />
              <circle cx="200" cy="100" r="18" fill="url(#nodeGradient)" stroke="#333" strokeWidth="1" />
              <circle cx="290" cy="60" r="10" fill="url(#nodeGradient)" stroke="#333" strokeWidth="1" />
              <circle cx="350" cy="100" r="15" fill="url(#nodeGradient)" stroke="#333" strokeWidth="1" />
            </g>
            
            {/* Labels */}
            <g>
              <text x="50" y="100" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Source 1</text>
              <text x="110" cy="60" y="60" textAnchor="middle" fill="white" fontSize="6">Theme A</text>
              <text x="200" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Key Insight</text>
              <text x="290" y="60" textAnchor="middle" fill="white" fontSize="6">Theme B</text>
              <text x="350" y="100" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Source 2</text>
            </g>
            
            {/* Animated Connection Points */}
            <g>
              <circle cx="80" cy="80" r="3" fill="white">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="155" cy="80" r="3" fill="white">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.3s" />
              </circle>
              <circle cx="245" cy="80" r="3" fill="white">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.6s" />
              </circle>
              <circle cx="320" cy="80" r="3" fill="white">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.9s" />
              </circle>
            </g>
            
            {/* Connection Strength */}
            <g>
              <rect x="200" y="150" width="120" height="20" rx="10" fill="#222" stroke={colorConfig.fill} strokeWidth="0.5" />
              <text x="260" y="163" textAnchor="middle" fill="white" fontSize="8">Connection Strength</text>
              <rect x="210" y="170" width="100" height="4" rx="2" fill="#333" />
              <rect x="210" y="170" width="80" height="4" rx="2" fill={colorConfig.fill} opacity="0.8">
                <animate attributeName="width" values="0;80" dur="1.5s" fill="freeze" begin="0.5s" />
              </rect>
            </g>
          </svg>
        </div>
      );
      
    case 3: // Accelerate Research & Decision-Making
      return (
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col space-y-6">
            {/* Research Dashboard */}
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
                <Zap className={`h-4 w-4 ${colorConfig.text}`} />
                <span className="text-sm text-white font-medium">Research Acceleration</span>
                <span className="text-xs text-gray-400 ml-auto">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Time Saved: 8.5 hours
                </span>
              </div>
              
              {/* Research Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-black/30 rounded border border-gray-800">
                  <div className="text-xs text-gray-400">Documents Analyzed</div>
                  <div className="text-xl text-white font-bold">348</div>
                </div>
                
                <div className="p-2 bg-black/30 rounded border border-gray-800">
                  <div className="text-xs text-gray-400">Key Insights</div>
                  <div className="text-xl text-white font-bold">27</div>
                </div>
                
                <div className="p-2 bg-black/30 rounded border border-gray-800">
                  <div className="text-xs text-gray-400">Emerging Trends</div>
                  <div className="text-xl text-white font-bold">5</div>
                </div>
                
                <div className="p-2 bg-black/30 rounded border border-gray-800">
                  <div className="text-xs text-gray-400">Conflicts Identified</div>
                  <div className="text-xl text-white font-bold">12</div>
                </div>
              </div>
            </div>
            
            {/* Decision Support */}
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
                <span className="text-sm text-white font-medium">Decision Support</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Option A Confidence</div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "65%" : "0%",
                        transition: "width 1s ease 1.8s"
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Supporting evidence: 18</span>
                    <span>65%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Option B Confidence</div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "82%" : "0%",
                        transition: "width 1s ease 2s"
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Supporting evidence: 31</span>
                    <span>82%</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-400 mb-1">Option C Confidence</div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "42%" : "0%",
                        transition: "width 1s ease 2.2s"
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Supporting evidence: 7</span>
                    <span>42%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-800">
                <div className={`px-3 py-1.5 rounded ${colorConfig.bg} ${colorConfig.text} text-xs inline-block`}>
                  Option B Recommended
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
    default:
      return <div className="text-white">Visual not available</div>;
  }
}

export { KnowledgeSynthesisSections }; 