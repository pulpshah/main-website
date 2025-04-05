"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  MessageCircle, 
  LineChart, 
  RefreshCw, 
  Sparkles, 
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Zap
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  MessageCircle: <MessageCircle className="h-full w-full" />,
  LineChart: <LineChart className="h-full w-full" />,
  RefreshCw: <RefreshCw className="h-full w-full" />,
  Sparkles: <Sparkles className="h-full w-full" />,
  ArrowUpRight: <ArrowUpRight className="h-full w-full" />,
  BarChart3: <BarChart3 className="h-full w-full" />,
  CheckCircle2: <CheckCircle2 className="h-full w-full" />,
  Zap: <Zap className="h-full w-full" />,
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
  green: {
    gradient: "from-green-600 to-green-400",
    gradientAlt: "from-green-900/20 to-green-900/5",
    border: "border-green-500/20",
    borderHover: "border-green-500/40",
    bg: "bg-green-500/10",
    text: "text-green-400",
    fill: "#10B981",
    shadowColor: "rgba(16,185,129,0.2)",
  },
  blue: {
    gradient: "from-blue-600 to-blue-400",
    gradientAlt: "from-blue-900/20 to-blue-900/5",
    border: "border-blue-500/20",
    borderHover: "border-blue-500/40",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    fill: "#3B82F6",
    shadowColor: "rgba(59,130,246,0.2)",
  },
};

const chaosAnimationStyles = `
  @keyframes floatLine1 {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-3px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes floatLine2 {
    0% { transform: translateY(0px); }
    50% { transform: translateY(3px); }
    100% { transform: translateY(0px); }
  }
  
  .chaotic-line-1 {
    animation: floatLine1 4s ease-in-out infinite;
  }
  
  .chaotic-line-2 {
    animation: floatLine2 3s ease-in-out infinite;
  }
`;

export default function IntelligentCommunicationSections({ sections }: { sections: SectionProps[] }) {
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
  const colorConfig = colorMap[color];

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
            <IntelligentCommunicationVisual 
              index={index} 
              color={color} 
              iconName={icon} 
              isInView={isInView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function IntelligentCommunicationVisual({ 
  index, 
  color,
  iconName,
  isInView 
}: { 
  index: number; 
  color: string;
  iconName: string;
  isInView: boolean;
}) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Different visualizations based on the section index
  switch(index) {
    case 0: // Make Every Conversation Count
      return (
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col space-y-4">
            {/* Conversation flow diagram */}
            <div className="flex items-start justify-between space-x-6">
              <div 
                className="space-y-2 flex-1"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 0.8s"
                }}
              >
                <div className={`h-8 w-8 rounded-full ${colorConfig.bg} flex items-center justify-center text-white`}>
                  <span className="font-medium text-sm">1</span>
                </div>
                <div className={`p-3 rounded-lg ${colorConfig.bg} text-white text-sm`}>
                  <p>Introduction</p>
                </div>
              </div>
              
              <div 
                className="space-y-2 flex-1"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 1s"
                }}
              >
                <div className={`h-8 w-8 rounded-full ${colorConfig.bg} flex items-center justify-center text-white`}>
                  <span className="font-medium text-sm">2</span>
                </div>
                <div className={`p-3 rounded-lg ${colorConfig.bg} text-white text-sm`}>
                  <p>Value Proposition</p>
                </div>
              </div>
              
              <div 
                className="space-y-2 flex-1"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 1.2s"
                }}
              >
                <div className={`h-8 w-8 rounded-full ${colorConfig.bg} flex items-center justify-center text-white`}>
                  <span className="font-medium text-sm">3</span>
                </div>
                <div className={`p-3 rounded-lg ${colorConfig.bg} text-white text-sm`}>
                  <p>Call to Action</p>
                </div>
              </div>
            </div>
            
            {/* Flow arrows */}
            <div 
              className="flex justify-between px-4"
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 1.4s"
              }}
            >
              <ArrowRight className={`h-5 w-5 ${colorConfig.text}`} />
              <ArrowRight className={`h-5 w-5 ${colorConfig.text}`} />
            </div>
            
            {/* Performance indicators */}
            <div 
              className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm space-y-3`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 1.6s",
                boxShadow: `0 0 20px ${colorConfig.shadowColor}`
              }}
            >
              <div className="text-white text-sm font-medium">Conversation Performance:</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Clarity:</span>
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "92%" : "0%",
                        transition: "width 1s ease 1.8s"
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Engagement:</span>
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "86%" : "0%",
                        transition: "width 1s ease 2s"
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Conversion:</span>
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "78%" : "0%",
                        transition: "width 1s ease 2.2s"
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 1: // Persuasion, Engineered
      return (
        <div className="w-full max-w-[400px]">
          <div 
            className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm space-y-4`}
            style={{
              boxShadow: `0 0 20px ${colorConfig.shadowColor}`
            }}
          >
            <div className="text-white text-sm font-medium">Persuasion Analysis Framework</div>
            
            {/* Ethos */}
            <div 
              className="space-y-2"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 0.8s"
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full ${colorConfig.bg} flex items-center justify-center text-white text-xs`}>E</div>
                <h3 className="text-white font-medium">Ethos</h3>
              </div>
              <div className={`p-3 rounded-lg border ${colorConfig.border} ${colorConfig.bg} text-sm text-white/90`}>
                <p>Credibility markers identified: 3</p>
                <p className="mt-1 text-xs text-white/70">Expert positioning, social proof, industry statistics</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "75%" : "0%",
                        transition: "width 1s ease 1s"
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/70">Strong</span>
                </div>
              </div>
            </div>
            
            {/* Pathos */}
            <div 
              className="space-y-2"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 1.0s"
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full ${colorConfig.bg} flex items-center justify-center text-white text-xs`}>P</div>
                <h3 className="text-white font-medium">Pathos</h3>
              </div>
              <div className={`p-3 rounded-lg border ${colorConfig.border} ${colorConfig.bg} text-sm text-white/90`}>
                <p>Emotional triggers: Strong</p>
                <p className="mt-1 text-xs text-white/70">Urgency, aspiration, relief from pain point</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "85%" : "0%",
                        transition: "width 1s ease 1.2s"
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/70">Very Strong</span>
                </div>
              </div>
            </div>
            
            {/* Logos */}
            <div 
              className="space-y-2"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 1.2s"
              }}
            >
              <div className="flex items-center gap-2">
                <div className={`h-6 w-6 rounded-full ${colorConfig.bg} flex items-center justify-center text-white text-xs`}>L</div>
                <h3 className="text-white font-medium">Logos</h3>
              </div>
              <div className={`p-3 rounded-lg border ${colorConfig.border} ${colorConfig.bg} text-sm text-white/90`}>
                <p>Logical structure: Coherent</p>
                <p className="mt-1 text-xs text-white/70">Clear premise, supporting evidence, valid conclusion</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`}
                      style={{
                        width: isInView ? "70%" : "0%",
                        transition: "width 1s ease 1.4s"
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-white/70">Strong</span>
                </div>
              </div>
            </div>
            
            {/* Overall Score */}
            <div 
              className="pt-2 mt-2 border-t border-gray-800"
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 1.6s"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">Overall Persuasiveness:</span>
                <span className={`text-sm font-medium ${colorConfig.text}`}>Exceptional</span>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 2: // Engagement That Evolves in Real Time - Enhanced with SVG graph
      return (
        <div className="w-full max-w-[400px]">
          <div className="space-y-4">
            {/* Real-time engagement graph SVG */}
            <div 
              className={`relative p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
              style={{
                boxShadow: `0 0 20px ${colorConfig.shadowColor}`
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-white text-sm font-medium">Audience Response: Live</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full bg-red-500 animate-pulse`}></div>
                  <span className="text-xs text-white/70">Live</span>
                </div>
              </div>
              
              {/* Enhanced SVG Graph */}
              <div 
                className="h-32 w-full relative"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.8s"
                }}
              >
                <svg 
                  viewBox="0 0 300 100" 
                  className="w-full h-full" 
                  preserveAspectRatio="none"
                >
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="300" y2="25" stroke="#333" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#333" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="#333" strokeWidth="0.5" />
                  
                  {/* Y-axis grid labels */}
                  <text x="5" y="25" fontSize="8" fill="#888">75%</text>
                  <text x="5" y="50" fontSize="8" fill="#888">50%</text>
                  <text x="5" y="75" fontSize="8" fill="#888">25%</text>
                  
                  {/* Gradient for the area under the curve */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area under the curve */}
                  <path 
                    d="M0,80 C20,75 40,65 60,60 C80,55 100,60 120,40 C140,20 160,25 180,15 C200,5 220,10 240,15 C260,20 280,10 300,5 L300,100 L0,100 Z" 
                    fill="url(#areaGradient)"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: "opacity 1s ease 1s"
                    }}
                  />
                  
                  {/* Main line */}
                  <path 
                    d="M0,80 C20,75 40,65 60,60 C80,55 100,60 120,40 C140,20 160,25 180,15 C200,5 220,10 240,15 C260,20 280,10 300,5" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="2"
                    strokeDasharray="300"
                    strokeDashoffset={isInView ? "0" : "300"}
                    style={{
                      transition: "stroke-dashoffset 1.5s ease-in-out 1.2s"
                    }}
                  />
                  
                  {/* Animated data point */}
                  <circle 
                    cx="300" 
                    cy="5" 
                    r="4" 
                    fill="#fff"
                    stroke={colorConfig.fill} 
                    strokeWidth="2"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: "opacity 0.3s ease 2.7s",
                    }}
                    className="animate-pulse"
                  />
                  
                  {/* Annotated point indicators */}
                  {[
                    {x: 60, y: 60, label: "Initial Copy"},
                    {x: 120, y: 40, label: "First Revision"},
                    {x: 180, y: 15, label: "User Feedback"},
                    {x: 240, y: 15, label: "A/B Test"},
                    {x: 300, y: 5, label: "Current"}
                  ].map((point, i) => (
                    <g 
                      key={i}
                      style={{
                        opacity: isInView ? 1 : 0,
                        transition: `opacity 0.6s ease ${1.2 + i * 0.3}s`
                      }}
                    >
                      <circle cx={point.x} cy={point.y} r="3" fill={colorConfig.fill} />
                      {point.x < 270 && (
                        <text x={point.x - 20} y={point.y - 10} fontSize="7" fill="#aaa" textAnchor="start">
                          {point.label}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
              
              <div 
                className="mt-2 text-xs text-gray-400 flex justify-between"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 1.6s"
                }}
              >
                <span>Initial Version</span>
                <span>Iterations</span>
                <span>Current Version</span>
              </div>
            </div>
            
            {/* Message adaption */}
            <div className="space-y-3 mt-6 pt-2">
              <div 
                className={`p-3 rounded-lg border border-gray-800 bg-gray-900/50 text-white text-sm w-4/5 ml-auto line-through opacity-50`}
                style={{
                  opacity: isInView ? 0.5 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 1.8s"
                }}
              >
                <p>Our product offers the best analytics on the market.</p>
              </div>
              
              <div 
                className={`p-3 rounded-lg border ${colorConfig.border} ${colorConfig.bg} text-white text-sm w-4/5 ml-auto`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 2s"
                }}
              >
                <p>Our analytics provide 37% more actionable insights than the industry average, as confirmed by independent testing.</p>
              </div>
              
              <div 
                className="text-xs text-right text-white/60 mr-2"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 2.2s"
                }}
              >
                <p>Message adapted based on audience feedback</p>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 3: // From Chaos to Clarity - Enhanced with SVG visualization
      return (
        <>
          <style jsx global>{chaosAnimationStyles}</style>
          <div className="w-full max-w-[500px]">
            <div className="space-y-6">
              {/* Before: Chaotic conversation visualization */}
              <div 
                className="space-y-2"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.8s"
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm text-white/70">Before Pulp:</div>
                  <div className="h-2 w-2 bg-red-500/70 rounded-full"></div>
                </div>
                
                {/* Chaotic conversation SVG - with decreased space between nodes */}
                <div 
                  className="h-48 w-full relative p-3 border border-gray-800 rounded-lg bg-black/30"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.6s ease 1s"
                  }}
                >
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Chaotic connections between nodes */}
                    {[
                      {x1: 30, y1: 50, x2: 70, y2: 25},
                      {x1: 30, y1: 50, x2: 90, y2: 75},
                      {x1: 30, y1: 50, x2: 150, y2: 50},
                      {x1: 70, y1: 25, x2: 120, y2: 30},
                      {x1: 90, y1: 75, x2: 170, y2: 70},
                      {x1: 150, y1: 50, x2: 170, y2: 70},
                      {x1: 120, y1: 30, x2: 170, y2: 70},
                      {x1: 120, y1: 30, x2: 150, y2: 50},
                      {x1: 70, y1: 25, x2: 170, y2: 70, className: "chaotic-line-1"},
                      {x1: 30, y1: 50, x2: 120, y2: 30, className: "chaotic-line-2"},
                    ].map((line, i) => (
                      <line 
                        key={i}
                        x1={line.x1} 
                        y1={line.y1} 
                        x2={line.x2} 
                        y2={line.y2} 
                        stroke="gray" 
                        strokeWidth="0.5" 
                        strokeOpacity="0.3"
                        strokeDasharray={i % 2 === 0 ? "1,1" : "none"}
                        className={line.className}
                        style={{
                          opacity: isInView ? 1 : 0,
                          transition: `opacity 0.6s ease ${1.2 + i * 0.1}s`
                        }}
                      />
                    ))}
                    
                    {/* Topic nodes - with adjusted positions */}
                    {[
                      {x: 30, y: 50, label: "Product specs?"},
                      {x: 70, y: 25, label: "Timeline update"},
                      {x: 90, y: 75, label: "Budget concerns"},
                      {x: 120, y: 30, label: "Who's responsible?"},
                      {x: 150, y: 50, label: "Previous version"},
                      {x: 170, y: 70, label: "Customer feedback"}
                    ].map((node, i) => (
                      <g 
                        key={i}
                        style={{
                          transform: isInView ? "none" : `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`,
                          transition: `transform 0.8s ease ${1.2 + i * 0.2}s`,
                          opacity: isInView ? 1 : 0
                        }}
                      >
                        <circle cx={node.x} cy={node.y} r="5" fill="#444" />
                        <text x={node.x} y={node.y + 15} fontSize="6" fill="#aaa" textAnchor="middle">
                          {node.label}
                        </text>
                      </g>
                    ))}

                    {/* Animated warning indicators */}
                    {[
                      {x: 50, y: 37},
                      {x: 105, y: 52},
                      {x: 135, y: 40}
                    ].map((pos, i) => (
                      <g 
                        key={i}
                        style={{
                          opacity: isInView ? 0.7 : 0,
                          transition: `opacity 0.4s ease ${1.8 + i * 0.2}s`
                        }}
                      >
                        <circle 
                          cx={pos.x} 
                          cy={pos.y} 
                          r="4" 
                          fill="none" 
                          stroke="#eb4545" 
                          strokeWidth="0.5"
                          className={`animate-ping`}
                        />
                        <circle cx={pos.x} cy={pos.y} r="2" fill="#eb4545" />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
              
              {/* Transformation arrow - decreased height */}
              <div 
                className="flex justify-center"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 1.5s"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke={colorConfig.fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* After: Structured conversation - no connecting lines, simpler layout */}
              <div 
                className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm space-y-3`}
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(20px)",
                  transition: "all 0.6s ease 1.8s",
                  boxShadow: `0 0 20px ${colorConfig.shadowColor}`
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm text-white font-medium">After Pulp: Structured Conversation</div>
                  <div className="h-2 w-2 bg-green-500/70 rounded-full"></div>
                </div>
                
                {/* Simplified structured report - no flow lines */}
                <div className="space-y-2 pt-2">
                  {[
                    {label: "Project Background", details: "Previous version overview, product specifications", delay: 2.2},
                    {label: "Customer Insights", details: "Feedback summary, key improvement areas", delay: 2.4},
                    {label: "Implementation Plan", details: "Timeline, budget, responsibilities", delay: 2.6},
                    {label: "Success Metrics", details: "KPIs, target outcomes, monitoring", delay: 2.8}
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className={`p-2 border-l-2 ${colorConfig.border} bg-gray-900/50 pl-3`}
                      style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "none" : "translateX(20px)",
                        transition: `all 0.4s ease ${item.delay}s`
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-5 w-5 rounded-full ${colorConfig.bg} flex items-center justify-center text-white text-xs font-medium`}>
                          {i + 1}
                        </div>
                        <div className="text-white text-sm font-medium">{item.label}</div>
                      </div>
                      <div className="text-xs text-white/70 mt-1 ml-7">{item.details}</div>
                      
                      {/* Success indicator */}
                      {i < 3 && (
                        <div 
                          className="w-0.5 h-3 bg-gray-700 ml-[10px] mt-1"
                          style={{
                            opacity: isInView ? 0.6 : 0,
                            transition: `opacity 0.4s ease ${item.delay + 0.2}s`
                          }}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div 
                  className="flex items-center justify-center gap-1.5 pt-2 mt-1"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.6s ease 3s"
                  }}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                </div>
                
                <div className="text-center text-xs text-white/70 pt-1">
                  <p>Clear, structured conversation flow with defined objectives</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      
    default:
      return (
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s"
          }}
          className={`w-24 h-24 ${colorConfig.bg} rounded-full flex items-center justify-center p-6 ${colorConfig.text}`}
        >
          {iconMap[iconName]}
        </div>
      );
  }
} 