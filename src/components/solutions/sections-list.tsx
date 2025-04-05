"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  MessageCircle, 
  LineChart, 
  RefreshCw, 
  Sparkles, 
  Users,
  Shield,
  BookOpen,
  Bot,
  ArrowRight
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
  Users: <Users className="h-full w-full" />,
  Shield: <Shield className="h-full w-full" />,
  BookOpen: <BookOpen className="h-full w-full" />,
  Bot: <Bot className="h-full w-full" />,
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

export default function SectionsList({ sections }: { sections: SectionProps[] }) {
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
          <button 
            className={`group inline-flex items-center gap-2 text-sm font-medium ${colorConfig.text} hover:underline transition-all`}
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
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
          className={`aspect-video p-1 bg-black rounded-xl overflow-hidden border ${colorConfig.border} hover:${colorConfig.borderHover} transition-all`}
          style={{
            boxShadow: `0 0 30px ${colorConfig.shadowColor}`
          }}
        >
          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${colorConfig.gradientAlt} p-6 flex items-center justify-center overflow-hidden relative`}>
            <SectionVisual 
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

function SectionVisual({ 
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
            <div className="text-white text-sm font-medium">Persuasion Analysis</div>
            
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
              </div>
            </div>
          </div>
        </div>
      );
      
    case 2: // Engagement That Evolves in Real Time
      return (
        <div className="w-full max-w-[400px]">
          <div className="space-y-4">
            {/* Real-time adaption visualization */}
            <div 
              className={`relative p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm`}
              style={{
                boxShadow: `0 0 20px ${colorConfig.shadowColor}`
              }}
            >
              <div className="text-white text-sm font-medium mb-3">Audience Response: Live</div>
              
              <div className="flex items-end h-20 space-x-2">
                {[40, 65, 55, 75, 60, 80, 70, 90].map((height, i) => (
                  <div 
                    key={i}
                    className="flex-1"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.3s ease ${0.8 + i * 0.1}s`
                    }}
                  >
                    <div 
                      className={`w-full bg-gradient-to-t ${colorConfig.gradient} rounded-t-sm`}
                      style={{
                        height: isInView ? `${height}%` : "0%",
                        transition: `height 1s ease ${0.8 + i * 0.1}s`
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div 
                className="mt-2 text-xs text-gray-400 flex justify-between"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 1.6s"
                }}
              >
                <span>Initial</span>
                <span>Time</span>
                <span>Current</span>
              </div>
            </div>
            
            {/* Message adaption */}
            <div className="space-y-3">
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
      
    case 3: // From Chaos to Clarity
      return (
        <div className="w-full max-w-[400px]">
          <div className="space-y-6">
            {/* Before: Chaotic conversation */}
            <div 
              className="space-y-2"
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.8s"
              }}
            >
              <div className="text-sm text-white/70">Before Pulp:</div>
              <div className="flex flex-wrap gap-2">
                {["Product specs?", "Timeline update", "Budget concerns", "Who's responsible?", "Previous version", "Customer feedback"].map((item, i) => (
                  <div 
                    key={i}
                    className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs rounded-full"
                    style={{
                      transform: isInView ? "none" : `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)`,
                      transition: `transform 0.8s ease ${0.8 + i * 0.1}s`
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Transformation arrow */}
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
            
            {/* After: Structured conversation */}
            <div 
              className={`p-4 border ${colorConfig.border} rounded-lg bg-black/50 backdrop-blur-sm space-y-3`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(20px)",
                transition: "all 0.6s ease 1.8s",
                boxShadow: `0 0 20px ${colorConfig.shadowColor}`
              }}
            >
              <div className="text-sm text-white font-medium">After Pulp: Structured Conversation</div>
              
              <div className="space-y-2">
                <div 
                  className={`p-2 border-l-2 ${colorConfig.border} bg-gray-900/50 pl-3`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "none" : "translateX(20px)",
                    transition: "all 0.4s ease 2s"
                  }}
                >
                  <div className="text-white text-xs font-medium">1. Project Background</div>
                  <div className="text-xs text-white/70 mt-1">Previous version overview, product specifications</div>
                </div>
                
                <div 
                  className={`p-2 border-l-2 ${colorConfig.border} bg-gray-900/50 pl-3`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "none" : "translateX(20px)",
                    transition: "all 0.4s ease 2.2s"
                  }}
                >
                  <div className="text-white text-xs font-medium">2. Customer Insights</div>
                  <div className="text-xs text-white/70 mt-1">Feedback summary, key improvement areas</div>
                </div>
                
                <div 
                  className={`p-2 border-l-2 ${colorConfig.border} bg-gray-900/50 pl-3`}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "none" : "translateX(20px)",
                    transition: "all 0.4s ease 2.4s"
                  }}
                >
                  <div className="text-white text-xs font-medium">3. Implementation Plan</div>
                  <div className="text-xs text-white/70 mt-1">Timeline, budget allocation, responsibilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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