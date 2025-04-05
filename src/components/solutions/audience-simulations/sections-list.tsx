"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  BarChart3, 
  LineChart, 
  RefreshCw, 
  Sparkles, 
  User,
  UserCheck,
  UserCog,
  Users,
  UserPlus,
  ZoomIn,
  Target,
  ArrowUpRight,
  BrainCircuit,
  Brain
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  BarChart3: <BarChart3 className="h-full w-full" />,
  LineChart: <LineChart className="h-full w-full" />,
  RefreshCw: <RefreshCw className="h-full w-full" />,
  Sparkles: <Sparkles className="h-full w-full" />,
  ArrowUpRight: <ArrowUpRight className="h-full w-full" />,
  User: <User className="h-full w-full" />,
  UserCheck: <UserCheck className="h-full w-full" />,
  UserCog: <UserCog className="h-full w-full" />,
  Users: <Users className="h-full w-full" />,
  UserPlus: <UserPlus className="h-full w-full" />,
  ZoomIn: <ZoomIn className="h-full w-full" />,
  Target: <Target className="h-full w-full" />,
  BrainCircuit: <BrainCircuit className="h-full w-full" />,
  Brain: <Brain className="h-full w-full" />,
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

// Main export component
export default function AudienceSimulationsSections({ sections }: { sections: SectionProps[] }) {
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
          className={`aspect-[4/3] p-1 bg-black rounded-xl overflow-hidden border ${colorConfig.border} hover:${colorConfig.borderHover} transition-all`}
          style={{
            boxShadow: `0 0 30px ${colorConfig.shadowColor}`
          }}
        >
          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${colorConfig.gradientAlt} p-6 flex items-center justify-center overflow-hidden relative`}>
            <AudienceSimulationsVisual 
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

// Define the AudienceSimulationsVisual component
interface VisualProps {
  index: number;
  color: string;
  iconName: string;
  isInView: boolean;
}

function AudienceSimulationsVisual({ index, color, isInView }: VisualProps) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Create different visualizations based on the section index
  switch(index) {
    case 0: // Predict Reactions Before They Happen
      return (
        <div className="w-full max-w-[500px]">
          <div className="relative h-full w-full">
            {/* Message prediction visualization */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Background grid */}
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              
              <rect width="400" height="300" fill="url(#grid)" />
              
              {/* Central message node */}
              <g 
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.5s"
                }}
              >
                <circle cx="200" cy="150" r="30" fill="rgba(0,0,0,0.5)" stroke={colorConfig.fill} strokeWidth="2" />
                <text x="200" y="150" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="10">
                  MESSAGE
                </text>
                <circle cx="200" cy="150" r="40" fill="none" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="200" cy="150" r="55" fill="none" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.2" />
              </g>
              
              {/* Audience reaction prediction nodes */}
              {[
                { x: 100, y: 80, label: "Positive", percent: 65, delay: 0.7, pulse: true },
                { x: 280, y: 90, label: "Persuasive", percent: 72, delay: 0.8 },
                { x: 130, y: 230, label: "Memorable", percent: 58, delay: 0.9 },
                { x: 300, y: 210, label: "Actionable", percent: 81, delay: 1.0, pulse: true },
                { x: 200, y: 50, label: "Engaging", percent: 77, delay: 1.1 }
              ].map((node, i) => (
                <g 
                  key={i}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "none" : "scale(0.8)",
                    transition: `all 0.6s ease ${node.delay}s`
                  }}
                >
                  <line 
                    x1="200" 
                    y1="150" 
                    x2={node.x} 
                    y2={node.y} 
                    stroke={colorConfig.fill} 
                    strokeWidth="1.5" 
                    strokeOpacity="0.5" 
                    strokeDasharray="4,2"
                  />
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="25" 
                    fill="rgba(0,0,0,0.3)" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1.5"
                    className={node.pulse ? "animate-pulse" : ""}
                  />
                  <text x={node.x} y={node.y-7} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                    {node.label}
                  </text>
                  <text x={node.x} y={node.y+8} textAnchor="middle" fill={colorConfig.fill} fontSize="12" fontWeight="bold">
                    {node.percent}%
                  </text>
                </g>
              ))}
              
              {/* Prediction arrows and indicators */}
              {[
                { x1: 160, y1: 110, x2: 140, y2: 90, delay: 1.3 },
                { x1: 240, y1: 120, x2: 260, y2: 100, delay: 1.4 },
                { x1: 170, y1: 190, x2: 150, y2: 210, delay: 1.5 },
                { x1: 230, y1: 180, x2: 250, y2: 200, delay: 1.6 }
              ].map((arrow, i) => (
                <g 
                  key={i}
                  style={{
                    opacity: isInView ? 0.7 : 0,
                    transition: `opacity 0.4s ease ${arrow.delay}s`
                  }}
                >
                  <line 
                    x1={arrow.x1}
                    y1={arrow.y1}
                    x2={arrow.x2}
                    y2={arrow.y2}
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                    markerEnd="url(#arrowhead)"
                  />
                </g>
              ))}
              
              {/* Arrow definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="4"
                  markerHeight="4"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <path d="M 0 0 L 4 2 L 0 4 Z" fill={colorConfig.fill} />
                </marker>
              </defs>
              
              {/* Prediction confidence ring */}
              <circle 
                cx="200" 
                cy="150" 
                r="70" 
                fill="none" 
                stroke={colorConfig.fill} 
                strokeWidth="2" 
                strokeDasharray="200"
                strokeDashoffset={isInView ? "0" : "200"}
                style={{
                  transition: "stroke-dashoffset 1.5s ease-in-out 1s"
                }}
              />
              
              {/* Data analysis indicators */}
              {isInView && Array(8).fill(0).map((_, i) => (
                <circle
                  key={i}
                  cx={200 + 70 * Math.cos(Math.PI * 2 * i / 8)}
                  cy={150 + 70 * Math.sin(Math.PI * 2 * i / 8)}
                  r="3"
                  fill={colorConfig.fill}
                  style={{
                    opacity: 0.7,
                    transition: `all 0.2s ease ${1 + i * 0.1}s`
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      );
      
    case 1: // Refine Messaging With Tactical Precision
      return (
        <div className="w-full max-w-[500px]">
          <div className="relative h-full w-full">
            {/* Message refinement visualization */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              {/* Background grid */}
              <defs>
                <linearGradient id="messageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={`${colorConfig.fill}33`} />
                  <stop offset="100%" stopColor="#00000000" />
                </linearGradient>
              </defs>
              
              <rect width="400" height="300" fill="black" />
              
              {/* Message analysis and refinement stages */}
              <g 
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.5s"
                }}
              >
                {/* Initial message */}
                <rect 
                  x="40" 
                  y="40" 
                  width="320" 
                  height="50" 
                  rx="4" 
                  fill="rgba(30,30,30,0.8)" 
                  stroke="#444"
                  strokeWidth="1"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? "none" : "translateY(-10px)",
                    transition: "all 0.4s ease 0.6s"
                  }}
                />
                <text 
                  x="50" 
                  y="65" 
                  fill="#999" 
                  fontSize="12"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.4s ease 0.7s"
                  }}
                >
                  Initial Message Draft
                </text>
                <rect 
                  x="200" 
                  y="55" 
                  width="150" 
                  height="20" 
                  rx="2" 
                  fill="#333"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.4s ease 0.8s"
                  }}
                />
                
                {/* Analysis phase */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 1s"
                }}>
                  <path 
                    d="M 40 100 L 360 100" 
                    stroke="#555" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                  <text x="40" y="120" fill={colorConfig.fill} fontSize="10" fontWeight="bold">ANALYSIS</text>
                </g>
                
                {/* Analysis elements */}
                {[
                  { x: 80, label: "Tone", score: 65, width: 50 },
                  { x: 150, label: "Framing", score: 42, width: 60 },
                  { x: 230, label: "Emotion", score: 78, width: 70 },
                  { x: 320, label: "Clarity", score: 53, width: 40 }
                ].map((item, i) => (
                  <g 
                    key={i}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.4s ease ${1.2 + i * 0.1}s`
                    }}
                  >
                    <text x={item.x} y="140" fill="white" fontSize="8" textAnchor="middle">{item.label}</text>
                    <rect 
                      x={item.x - item.width/2} 
                      y="145" 
                      width={item.width} 
                      height="10" 
                      rx="2" 
                      fill={colorConfig.fill}
                      fillOpacity="0.2"
                    />
                    <rect 
                      x={item.x - item.width/2} 
                      y="145" 
                      width={item.width * item.score / 100} 
                      height="10" 
                      rx="2" 
                      fill={colorConfig.fill}
                    />
                    <text x={item.x} y="165" fill="white" fontSize="8" textAnchor="middle">{item.score}%</text>
                  </g>
                ))}
                
                {/* Refinement phase */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 1.6s"
                }}>
                  <path 
                    d="M 40 180 L 360 180" 
                    stroke="#555" 
                    strokeWidth="1" 
                    strokeDasharray="4 2"
                  />
                  <text x="40" y="200" fill={colorConfig.fill} fontSize="10" fontWeight="bold">REFINEMENT</text>
                </g>
                
                {/* Editing suggestions */}
                <g 
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.5s ease 1.8s"
                  }}
                >
                  <rect x="80" y="210" width="240" height="30" rx="3" fill="#222" stroke="#444" strokeWidth="1" />
                  <text x="90" y="228" fill="#aaa" fontSize="10">Suggested Improvements</text>
                  <circle cx="300" cy="225" r="8" fill={colorConfig.fill} fillOpacity="0.2" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="300" y="228" fill="white" fontSize="8" textAnchor="middle">+24%</text>
                </g>
                
                {/* Optimized message */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 2s"
                }}>
                  <rect 
                    x="40" 
                    y="250" 
                    width="320" 
                    height="35" 
                    rx="4" 
                    fill={`${colorConfig.fill}22`} 
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                  />
                  <text x="50" y="270" fill="white" fontSize="12" fontWeight="bold">Optimized Message</text>
                  <rect x="200" y="260" width="150" height="15" rx="2" fill={`${colorConfig.fill}44`} />
                  
                  {/* Success indicator */}
                  <circle cx="340" cy="268" r="10" fill="green" fillOpacity="0.2" stroke="green" strokeWidth="1" />
                  <text x="340" y="271" fill="white" fontSize="8" textAnchor="middle">✓</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      );
      
    case 2: // Simulate Real-World Conversations
      return (
        <div className="w-full max-w-[500px]">
          <div className="relative h-full w-full">
            {/* Conversation simulation visualization */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <radialGradient id="simulationGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor={`${colorConfig.fill}40`} />
                  <stop offset="100%" stopColor="#00000000" />
                </radialGradient>
              </defs>
              
              <rect width="400" height="300" fill="black" />
              <rect width="400" height="300" fill="url(#simulationGlow)" />
              
              {/* Simulation container */}
              <rect 
                x="20" 
                y="20" 
                width="360" 
                height="260" 
                rx="8" 
                fill="rgba(20,20,20,0.6)" 
                stroke="#333"
                strokeWidth="1"
                style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.3s"
                }}
              />
              
              {/* Simulation header */}
              <g style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.5s ease 0.5s"
              }}>
                <rect x="30" y="30" width="340" height="30" rx="4" fill="#222" />
                <text x="40" y="50" fill="white" fontSize="12" fontWeight="bold">Campaign Simulation: Market Response</text>
                <circle cx="350" cy="45" r="8" fill={colorConfig.fill} fillOpacity="0.4" className="animate-pulse" />
              </g>
              
              {/* Conversation threads */}
              <g style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.5s ease 0.7s"
              }}>
                <line x1="70" y1="80" x2="70" y2="250" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="200" y1="80" x2="200" y2="250" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
                <line x1="330" y1="80" x2="330" y2="250" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
                
                <text x="70" y="75" fill="#999" fontSize="10" textAnchor="middle">Message</text>
                <text x="200" y="75" fill="#999" fontSize="10" textAnchor="middle">Audience Response</text>
                <text x="330" y="75" fill="#999" fontSize="10" textAnchor="middle">Engagement</text>
              </g>
              
              {/* Conversation nodes */}
              {[
                {
                  messageY: 100,
                  messageLabel: "Initial Proposition",
                  responseY: 115,
                  responseLabel: "Cautious Interest",
                  engagementY: 108,
                  engagementValue: "42%",
                  delay: 0.9
                },
                {
                  messageY: 150,
                  messageLabel: "Value Clarification",
                  responseY: 165,
                  responseLabel: "Growing Consideration",
                  engagementY: 158,
                  engagementValue: "67%",
                  delay: 1.1
                },
                {
                  messageY: 200,
                  messageLabel: "Addressing Concerns",
                  responseY: 215,
                  responseLabel: "Positive Conversion",
                  engagementY: 208,
                  engagementValue: "85%",
                  delay: 1.3
                }
              ].map((node, i) => (
                <g
                  key={i}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: `opacity 0.5s ease ${node.delay}s`
                  }}
                >
                  {/* Message node */}
                  <circle cx="70" cy={node.messageY} r="10" fill="#333" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="70" y={node.messageY + 20} fill="white" fontSize="8" textAnchor="middle">{node.messageLabel}</text>
                  
                  {/* Response node */}
                  <circle 
                    cx="200" 
                    cy={node.responseY} 
                    r="12" 
                    fill="#222" 
                    stroke={i === 2 ? "#4ADE80" : colorConfig.fill} 
                    strokeWidth="1.5" 
                  />
                  <text x="200" y={node.responseY + 20} fill="white" fontSize="8" textAnchor="middle">{node.responseLabel}</text>
                  
                  {/* Engagement node */}
                  <rect 
                    x="315" 
                    y={node.engagementY - 8} 
                    width="30" 
                    height="16" 
                    rx="3" 
                    fill={i === 2 ? "#4ADE8055" : `${colorConfig.fill}33`} 
                    stroke={i === 2 ? "#4ADE80" : colorConfig.fill}
                    strokeWidth="1"
                  />
                  <text x="330" y={node.engagementY + 4} fill="white" fontSize="8" textAnchor="middle">{node.engagementValue}</text>
                  
                  {/* Connecting arrows */}
                  <line 
                    x1="80" 
                    y1={node.messageY} 
                    x2="185" 
                    y2={node.responseY} 
                    stroke={colorConfig.fill} 
                    strokeWidth="1" 
                    strokeDasharray="3 2"
                    markerEnd="url(#simArrow)"
                  />
                  <line 
                    x1="213" 
                    y1={node.responseY} 
                    x2="315" 
                    y2={node.engagementY} 
                    stroke={i === 2 ? "#4ADE80" : colorConfig.fill} 
                    strokeWidth="1" 
                    strokeDasharray="3 2"
                    markerEnd={i === 2 ? "url(#simArrowGreen)" : "url(#simArrow)"}
                  />
                </g>
              ))}
              
              {/* Context factors */}
              <g style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.5s ease 1.5s"
              }}>
                <rect x="30" y="250" width="340" height="20" rx="3" fill="#222" />
                <text x="40" y="264" fill="#aaa" fontSize="8">CONTEXT FACTORS:</text>
                {["Demographics", "Prior Messaging", "Competitor Analysis", "Market Trends"].map((factor, i) => (
                  <g key={i}>
                    <rect 
                      x={150 + i * 52} 
                      y="254" 
                      width="48" 
                      height="12" 
                      rx="2" 
                      fill={colorConfig.fill} 
                      fillOpacity="0.1"
                      stroke={colorConfig.fill}
                      strokeWidth="0.5"
                    />
                    <text x={174 + i * 52} y="263" fill="white" fontSize="6" textAnchor="middle">{factor}</text>
                  </g>
                ))}
              </g>
              
              {/* Arrow definitions */}
              <defs>
                <marker
                  id="simArrow"
                  markerWidth="4"
                  markerHeight="4"
                  refX="3"
                  refY="2"
                  orient="auto"
                >
                  <path d="M 0 0 L 4 2 L 0 4 Z" fill={colorConfig.fill} />
                </marker>
                <marker
                  id="simArrowGreen"
                  markerWidth="4"
                  markerHeight="4"
                  refX="3"
                  refY="2"
                  orient="auto"
                >
                  <path d="M 0 0 L 4 2 L 0 4 Z" fill="#4ADE80" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      );
      
    case 3: // Personalize at Scale
      return (
        <div className="w-full max-w-[500px]">
          <div className="relative h-full w-full">
            {/* Personalization visualization */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <rect width="400" height="300" fill="#111" />
              
              {/* Central message hub */}
              <g style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 0.5s ease 0.5s"
              }}>
                <circle 
                  cx="200" 
                  cy="150" 
                  r="30" 
                  fill="#222" 
                  stroke={colorConfig.fill} 
                  strokeWidth="2" 
                />
                <text x="200" y="150" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">CORE</text>
                <text x="200" y="162" fill="white" fontSize="8" textAnchor="middle">MESSAGE</text>
              </g>
              
              {/* Audience segments */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle = (Math.PI * 2 * i) / 6;
                const cx = 200 + Math.cos(angle) * 100;
                const cy = 150 + Math.sin(angle) * 100;
                const segmentColors = [
                  colorConfig.fill, 
                  "#4ADE80", 
                  "#3B82F6", 
                  "#8B5CF6", 
                  "#EC4899", 
                  "#F97316"
                ];
                
                return (
                  <g 
                    key={i}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "none" : "scale(0.8)",
                      transition: `all 0.6s ease ${0.7 + i * 0.1}s`
                    }}
                  >
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r="25" 
                      fill="#222" 
                      stroke={segmentColors[i]} 
                      strokeWidth="1.5" 
                    />
                    
                    <text 
                      x={cx} 
                      y={cy-8} 
                      fill="white" 
                      fontSize="8" 
                      textAnchor="middle" 
                      fontWeight="bold"
                    >
                      {["Segment A", "Segment B", "Segment C", "Segment D", "Segment E", "Segment F"][i]}
                    </text>
                    
                    <text 
                      x={cx} 
                      y={cy+8} 
                      fill={segmentColors[i]} 
                      fontSize="7" 
                      textAnchor="middle"
                    >
                      {["Early Adopters", "Value Seekers", "Skeptics", "Loyalists", "Influencers", "New Users"][i]}
                    </text>
                    
                    {/* Connecting line to core */}
                    <line 
                      x1="200" 
                      y1="150" 
                      x2={cx - (cx - 200) * 0.3} 
                      y2={cy - (cy - 150) * 0.3} 
                      stroke={segmentColors[i]} 
                      strokeWidth="2" 
                      strokeOpacity="0.3"
                      strokeDasharray="5,3"
                    />
                    
                    {/* Personalized message indicator */}
                    <g style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.4s ease ${1 + i * 0.15}s`
                    }}>
                      <rect 
                        x={cx - 20} 
                        y={cy + 20} 
                        width="40" 
                        height="10" 
                        rx="2" 
                        fill={segmentColors[i]} 
                        fillOpacity="0.1"
                        stroke={segmentColors[i]}
                        strokeWidth="0.5"
                      />
                      <text 
                        x={cx} 
                        y={cy + 27} 
                        fill="white" 
                        fontSize="6" 
                        textAnchor="middle"
                      >
                        TAILORED
                      </text>
                    </g>
                  </g>
                )
              })}
              
              {/* Personalization factors */}
              {isInView && [
                { label: "Psychographics", x: 80, y: 50, delay: 1.3 },
                { label: "Decision Drivers", x: 300, y: 60, delay: 1.4 },
                { label: "Engagement Patterns", x: 330, y: 230, delay: 1.5 },
                { label: "Past Responses", x: 90, y: 240, delay: 1.6 }
              ].map((factor, i) => (
                <g 
                  key={i}
                  style={{
                    opacity: isInView ? 0.9 : 0,
                    transition: `opacity 0.4s ease ${factor.delay}s`
                  }}
                >
                  <rect 
                    x={factor.x - 40} 
                    y={factor.y - 10} 
                    width="80" 
                    height="20" 
                    rx="10" 
                    fill="#111" 
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                    strokeDasharray="3,2"
                  />
                  <text 
                    x={factor.x} 
                    y={factor.y + 4} 
                    fill="white" 
                    fontSize="8" 
                    textAnchor="middle"
                  >
                    {factor.label}
                  </text>
                  
                  <line 
                    x1={factor.x} 
                    y1={factor.y} 
                    x2="200" 
                    y2="150" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1" 
                    strokeOpacity="0.2"
                    strokeDasharray="1,2"
                  />
                </g>
              ))}
              
              {/* Scale indicators */}
              {isInView && Array(12).fill(0).map((_, i) => {
                const angle = (Math.PI * 2 * i) / 12;
                const r = 130;
                return (
                  <circle
                    key={i}
                    cx={200 + Math.cos(angle) * r}
                    cy={150 + Math.sin(angle) * r}
                    r="2"
                    fill="white"
                    fillOpacity="0.3"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.2s ease ${1.7 + i * 0.05}s`
                    }}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      );
      
    default:
      return null;
  }
}

// Add any CSS animations needed for the visualizations
export const audienceAnimationStyles = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  
  .animate-pulse {
    animation: pulse 2s infinite ease-in-out;
  }
`;

export { AudienceSimulationsSections };

