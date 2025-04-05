"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  MessageSquare, 
  Users, 
  Workflow, 
  BookOpen, 
  Bot,
  UserRound,
  BrainCircuit,
  Gauge,
  Cog,
  SlidersHorizontal,
  MessagesSquare,
  School
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue" | "red";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  MessageSquare: <MessageSquare className="h-full w-full" />,
  Users: <Users className="h-full w-full" />,
  Workflow: <Workflow className="h-full w-full" />,
  BookOpen: <BookOpen className="h-full w-full" />,
  Bot: <Bot className="h-full w-full" />,
  UserRound: <UserRound className="h-full w-full" />,
  BrainCircuit: <BrainCircuit className="h-full w-full" />,
  Gauge: <Gauge className="h-full w-full" />,
  Cog: <Cog className="h-full w-full" />,
  SlidersHorizontal: <SlidersHorizontal className="h-full w-full" />,
  MessagesSquare: <MessagesSquare className="h-full w-full" />,
  School: <School className="h-full w-full" />
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
export default function AdaptiveChatsSection({ sections }: { sections: SectionProps[] }) {
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
          className={`aspect-2 p-1 bg-black rounded-xl overflow-hidden border ${colorConfig.border} hover:${colorConfig.borderHover} transition-all`}
          style={{
            boxShadow: `0 0 30px ${colorConfig.shadowColor}`
          }}
        >
          <div className={`h-full w-full rounded-lg bg-gradient-to-br ${colorConfig.gradientAlt} p-6 flex items-center justify-center overflow-hidden relative`}>
            <AdaptiveChatsVisual 
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

function AdaptiveChatsVisual({ index, color, isInView }: VisualProps) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Simple placeholder visuals
  return (
    <>
      <style jsx global>{chatAnimationStyles}</style>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full p-2">
          {index === 0 && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="contextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="toneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="intentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
                
              <rect width="300" height="200" fill="#111111" rx="5" />
                
                
              {/* Chat bubbles to show natural conversation */}
              <g className="chat-group">
                {/* AI greeting with tone awareness */}
                <rect x="40" y="35" width="130" height="35" rx="15" fill="#333" className={isInView ? "animate-fade-in" : ""} />
                <text x="105" y="53" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in" : ""} fontWeight="medium">
                  Hi Sarah, how can I help you?
                </text>
                <text x="105" y="63" textAnchor="middle" fill="white" fontSize="7" className={isInView ? "animate-fade-in" : ""} opacity="0.7">
                  Friendly tone detected
                </text>
                
                {/* Tone indicator */}
                <circle cx="40" cy="35" r="6" fill="url(#toneGradient)" className={isInView ? "animate-fade-in" : ""} filter="url(#glow)" />
                <text x="40" y="37" textAnchor="middle" fill="white" fontSize="5" className={isInView ? "animate-fade-in" : ""}>T</text>
                
                {/* User Message with intent recognition */}
                <rect x="120" y="80" width="140" height="35" rx="15" fill={colorConfig.fill} fillOpacity="0.8" className={isInView ? "animate-fade-in-delay" : ""} />
                <text x="190" y="95" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in-delay" : ""} fontWeight="medium">
                  I need the quarterly report for
                </text>
                <text x="190" y="105" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in-delay" : ""} fontWeight="medium">
                  the marketing team
                </text>
                
                {/* Intent indicator */}
                <circle cx="260" cy="80" r="6" fill="url(#intentGradient)" className={isInView ? "animate-fade-in-delay" : ""} filter="url(#glow)" />
                <text x="260" y="82" textAnchor="middle" fill="white" fontSize="5" className={isInView ? "animate-fade-in-delay" : ""}>I</text>
                
                {/* AI thinking animation - shows processing */}
                <g className={isInView ? "animate-fade-in-delay-2" : ""}>
                  <circle cx="55" cy="130" r="3" fill="#666">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="2" />
                  </circle>
                  <circle cx="65" cy="130" r="3" fill="#666">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="2" begin="0.2s" />
                  </circle>
                  <circle cx="75" cy="130" r="3" fill="#666">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="2" begin="0.4s" />
                  </circle>
                </g>
                
                {/* Context-aware personalized AI response */}
                <rect x="40" y="140" width="210" height="50" rx="15" fill="#333" className={isInView ? "animate-fade-in-delay-3" : ""} />
                <text x="145" y="157" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in-delay-3" : ""} fontWeight="medium">
                  I see you&apos;re looking for the Q3 marketing report.
                </text>
                <text x="145" y="170" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in-delay-3" : ""} fontWeight="medium">
                  Based on your recent presentation needs,
                </text>
                <text x="145" y="183" textAnchor="middle" fill="white" fontSize="9" className={isInView ? "animate-fade-in-delay-3" : ""} fontWeight="medium">
                  I&apos;ll include the campaign performance graphs.
                </text>
                
                {/* Context indicator */}
                <circle cx="40" cy="140" r="6" fill="url(#contextGradient)" className={isInView ? "animate-fade-in-delay-3" : ""} filter="url(#glow)" />
                <text x="40" y="142" textAnchor="middle" fill="white" fontSize="5" className={isInView ? "animate-fade-in-delay-3" : ""}>C</text>
              </g>
                
              {/* Central AI Understanding System */}
              <g className={isInView ? "animate-fade-in-delay-2" : ""} filter="url(#glow)">
                <circle cx="250" cy="45" r="18" fill="url(#gradientGreen)" strokeWidth="1" stroke={colorConfig.fill} opacity="0.9" />
                <path 
                  d="M242,38 C246,35 254,35 258,38 C262,42 262,48 258,52 C254,55 246,55 242,52 C238,48 238,42 242,38" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.2"
                />
                
                {/* Small pulsing connections from central brain to each message */}
                <line x1="235" y1="45" x2="170" y2="45" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="2,1" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="235" y1="50" x2="210" y2="80" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="2,1" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </line>
                <line x1="235" y1="55" x2="200" y2="140" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="2,1" opacity="0.6">
                  <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" begin="1s" />
                </line>
              </g>
                
              {/* Legend for natural conversation elements */}
              <g transform="translate(270, 120)" className={isInView ? "animate-fade-in-delay-4" : ""}>
                <rect x="-20" y="0" width="40" height="60" rx="5" fill="#222" stroke="#333" strokeWidth="0.5" />
                
                <circle cx="-10" cy="10" r="4" fill="url(#contextGradient)" />
                <text x="0" y="13" fontSize="6" fill="white" textAnchor="start">Context</text>
                
                <circle cx="-10" cy="25" r="4" fill="url(#toneGradient)" />
                <text x="0" y="28" fontSize="6" fill="white" textAnchor="start">Tone</text>
                
                <circle cx="-10" cy="40" r="4" fill="url(#intentGradient)" />
                <text x="0" y="43" fontSize="6" fill="white" textAnchor="start">Intent</text>
                
                <text x="0" y="58" fontSize="5" fill="white" textAnchor="middle" opacity="0.7">Natural AI</text>
              </g>
            </svg>
          )}
          
          {index === 1 && (
            <svg viewBox="0 0 300 200" className="w-full h-full">
              <defs>
                <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="userGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="userGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="userGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
                
              <rect width="300" height="200" fill="#111111" rx="5" />
                
              {/* Central AI Personalization Engine */}
              <g filter="url(#glow)">
                <circle cx="150" cy="100" r="30" fill="url(#gradientGreen)" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="150" y="95" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PULP AI</text>
                <text x="150" y="105" textAnchor="middle" fill="white" fontSize="6">Personalization</text>
                
                {/* Animated pulse ring */}
                <circle cx="150" cy="100" r="40" fill="none" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="3,2" opacity="0.5" className="pulse-circle" />
              </g>
                
              {/* User profiles - distinct personas */}
              <g className={isInView ? "animate-fade-in" : ""}>
                {/* User 1 - Business Professional */}
                <g transform="translate(60, 70)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient1)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <rect x="-10" y="-15" width="20" height="5" rx="2" fill="#333" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">BUSINESS</text>
                </g>
                
                {/* User 2 - Technical User */}
                <g transform="translate(60, 140)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient2)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-8,-12 L8,-12 L4,-18 L-4,-18 Z" fill="#333" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">TECHNICAL</text>
                </g>
                
                {/* User 3 - Casual User */}
                <g transform="translate(240, 70)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient3)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="0" cy="-15" r="5" fill="#333" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">CASUAL</text>
                </g>
                
                {/* User 4 - Creative User */}
                <g transform="translate(240, 140)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient1)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,-15 Q0,-20 5,-15" fill="none" stroke="#333" strokeWidth="2" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">CREATIVE</text>
                </g>
              </g>
                
              {/* Personalization flows - dynamic content for each user */}
              <g>
                {/* Flow to Business User */}
                <path 
                  d="M120,90 C130,85 135,80 140,70" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-0" : ""}
                  opacity="0"
                />
                <g transform="translate(95, 55)" className={isInView ? "animate-fade-in-delay-2" : ""} opacity="0">
                  <rect x="-25" y="-10" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="0" y="-2" fontSize="5" fill="white" textAnchor="middle">FORMAL MESSAGING</text>
                  <text x="0" y="6" fontSize="5" fill="white" textAnchor="middle">ROI FOCUSED</text>
                </g>
                
                {/* Flow to Technical User */}
                <path 
                  d="M120,110 C130,115 135,125 140,140" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-1" : ""}
                  opacity="0"
                />
                <g transform="translate(95, 155)" className={isInView ? "animate-fade-in-delay-3" : ""} opacity="0">
                  <rect x="-25" y="-10" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="0" y="-2" fontSize="5" fill="white" textAnchor="middle">DETAILED SPECS</text>
                  <text x="0" y="6" fontSize="5" fill="white" textAnchor="middle">TECH TERMINOLOGY</text>
                </g>
                
                {/* Flow to Casual User */}
                <path 
                  d="M180,90 C170,85 165,80 160,70" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-2" : ""}
                  opacity="0"
                />
                <g transform="translate(205, 55)" className={isInView ? "animate-fade-in-delay-4" : ""} opacity="0">
                  <rect x="-25" y="-10" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="0" y="-2" fontSize="5" fill="white" textAnchor="middle">FRIENDLY TONE</text>
                  <text x="0" y="6" fontSize="5" fill="white" textAnchor="middle">SIMPLE & DIRECT</text>
                </g>
                
                {/* Flow to Creative User */}
                <path 
                  d="M180,110 C170,115 165,125 160,140" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-3" : ""}
                  opacity="0"
                />
                <g transform="translate(205, 155)" className={isInView ? "animate-fade-in-delay-5" : ""} opacity="0">
                  <rect x="-25" y="-10" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="0" y="-2" fontSize="5" fill="white" textAnchor="middle">VISUAL EXAMPLES</text>
                  <text x="0" y="6" fontSize="5" fill="white" textAnchor="middle">EXPRESSIVE STYLE</text>
                </g>
              </g>
                
              {/* User behavior and preference indicators */}
              <g className={isInView ? "animate-fade-in-delay" : ""}>
                {/* User 1 preferences */}
                <g transform="translate(40, 50)">
                  <circle cx="0" cy="0" r="5" fill="#333" />
                  <text x="0" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="10" y="2" textAnchor="start" fill="white" fontSize="5">Data-driven</text>
                </g>
                
                {/* User 2 preferences */}
                <g transform="translate(40, 160)">
                  <circle cx="0" cy="0" r="5" fill="#333" />
                  <text x="0" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="10" y="2" textAnchor="start" fill="white" fontSize="5">Detail-oriented</text>
                </g>
                
                {/* User 3 preferences */}
                <g transform="translate(260, 50)">
                  <circle cx="0" cy="0" r="5" fill="#333" />
                  <text x="0" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="-10" y="2" textAnchor="end" fill="white" fontSize="5">Convenience</text>
                </g>
                
                {/* User 4 preferences */}
                <g transform="translate(260, 160)">
                  <circle cx="0" cy="0" r="5" fill="#333" />
                  <text x="0" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="-10" y="2" textAnchor="end" fill="white" fontSize="5">Inspirational</text>
                </g>
              </g>
                
              {/* Legend and title */}
              <g transform="translate(150, 25)">
                <rect x="-70" y="-15" width="140" height="20" rx="10" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                <text x="0" y="2" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PERSONALIZATION AT SCALE</text>
              </g>
                
              <g transform="translate(150, 180)">
                <text x="0" y="0" textAnchor="middle" fill="white" fontSize="6">Each interaction uniquely tailored to user preferences</text>
                <line x1="-70" y1="5" x2="70" y2="5" stroke={colorConfig.fill} strokeWidth="0.5" opacity="0.5" />
              </g>
            </svg>
          )}
          
          {index === 2 && (
            <div className="w-full max-w-[500px]">
              <svg viewBox="0 0 300 200" className="w-full h-auto">
                <defs>
                  <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                <rect width="300" height="200" fill="#111111" rx="5" />
                
                {/* Top section - Before Automation (Manual Tasks) */}
                <g transform="translate(150, 35)">
                  <rect x="-120" y="-15" width="240" height="30" rx="5" fill="#333" strokeWidth="1" stroke="#444" />
                  <text x="0" y="0" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">MANUAL REPETITIVE TASKS</text>
                  
                  {/* Manual workload visualization */}
                  <g className={isInView ? "animate-fade-in" : ""}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <g key={i} transform={`translate(${-100 + i * 30}, 0)`}>
                        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#666" />
                        <text x="0" y="1" fontSize="7" fill="white" textAnchor="middle">!</text>
                      </g>
                    ))}
                  </g>
                </g>
                
                {/* Central AI Automation System */}
                <g transform="translate(150, 100)" filter="url(#glow)" className={isInView ? "animate-fade-in-delay" : ""}>
                  <circle cx="0" cy="0" r="25" fill="url(#gradientGreen)" stroke={colorConfig.fill} strokeWidth="1.5" />
                  <text x="0" y="-5" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">PULP AI</text>
                  <text x="0" y="5" fontSize="6" fill="white" textAnchor="middle">AUTOMATION</text>
                  
                  {/* Rotating dots to show processing */}
                  <g className="pulse-circle">
                    <circle cx="0" cy="-30" r="3" fill={colorConfig.fill} />
                    <circle cx="21.2" cy="-21.2" r="3" fill={colorConfig.fill} opacity="0.9" />
                    <circle cx="30" cy="0" r="3" fill={colorConfig.fill} opacity="0.8" />
                    <circle cx="21.2" cy="21.2" r="3" fill={colorConfig.fill} opacity="0.7" />
                    <circle cx="0" cy="30" r="3" fill={colorConfig.fill} opacity="0.6" />
                    <circle cx="-21.2" cy="21.2" r="3" fill={colorConfig.fill} opacity="0.5" />
                    <circle cx="-30" cy="0" r="3" fill={colorConfig.fill} opacity="0.4" />
                    <circle cx="-21.2" cy="-21.2" r="3" fill={colorConfig.fill} opacity="0.3" />
                  </g>
                </g>
                
                {/* Automation Workflow Categories */}
                <g>
                  {/* Knowledge Retrieval */}
                  <g transform="translate(70, 75)" className={isInView ? "animate-fade-in-delay-2" : ""}>
                    <rect x="-30" y="-15" width="60" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">KNOWLEDGE</text>
                    <text x="0" y="5" fontSize="6" fill="white" textAnchor="middle">RETRIEVAL</text>
                    
                    {/* Connection to AI */}
                    <path d="M30,0 C45,0 60,15 80,25" stroke={colorConfig.fill} strokeWidth="1.5" strokeDasharray="3,2" />
                    
                    {/* Automation effects - documents being found */}
                    <g>
                      <rect x="-20" y="-30" width="12" height="15" rx="1" fill="#666" />
                      <rect x="-18" y="-28" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="-18" y="-25" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="-18" y="-22" width="8" height="1" fill="white" opacity="0.6" />
                      
                      <rect x="-5" y="-25" width="12" height="15" rx="1" fill="#666" />
                      <rect x="-3" y="-23" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="-3" y="-20" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="-3" y="-17" width="8" height="1" fill="white" opacity="0.6" />
                      
                      <rect x="10" y="-28" width="12" height="15" rx="1" fill="#666" />
                      <rect x="12" y="-26" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="12" y="-23" width="8" height="1" fill="white" opacity="0.6" />
                      <rect x="12" y="-20" width="8" height="1" fill="white" opacity="0.6" />
                      
                      {/* Animation for document search */}
                      <circle cx="15" cy="-20" r="8" fill="none" stroke={colorConfig.fill} strokeWidth="1" className="pulse-circle" opacity="0.7" />
                    </g>
                  </g>
                  
                  {/* Onboarding */}
                  <g transform="translate(70, 125)" className={isInView ? "animate-fade-in-delay-3" : ""}>
                    <rect x="-30" y="-15" width="60" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">ONBOARDING</text>
                    <text x="0" y="5" fontSize="6" fill="white" textAnchor="middle">AUTOMATION</text>
                    
                    {/* Connection to AI */}
                    <path d="M30,0 C45,0 60,-15 80,-25" stroke={colorConfig.fill} strokeWidth="1.5" strokeDasharray="3,2" />
                    
                    {/* Automation effects - onboarding user & progress */}
                    <g>
                      <circle cx="-15" cy="-5" r="5" fill="#666" />
                      <path d="M-15,-8 C-13,-8 -11,-6 -11,-4 C-11,-1 -19,-1 -19,-4 C-19,-6 -17,-8 -15,-8" fill="none" stroke="white" strokeWidth="0.8" />
                      <path d="M-18,0 C-18,-2 -12,-2 -12,0" fill="none" stroke="white" strokeWidth="0.8" />
                      
                      <rect x="-5" y="-7" width="20" height="4" rx="2" fill="#555" />
                      <rect x="-5" y="-7" width="15" height="4" rx="2" fill={colorConfig.fill} opacity="0.7" />
                      <text x="5" y="4" fontSize="4" fill="white" textAnchor="middle">AUTO-PROGRESS</text>
                    </g>
                  </g>
                  
                  {/* Internal Operations */}
                  <g transform="translate(230, 75)" className={isInView ? "animate-fade-in-delay-4" : ""}>
                    <rect x="-30" y="-15" width="60" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">INTERNAL</text>
                    <text x="0" y="5" fontSize="6" fill="white" textAnchor="middle">OPERATIONS</text>
                    
                    {/* Connection to AI */}
                    <path d="M-30,0 C-45,0 -60,15 -80,25" stroke={colorConfig.fill} strokeWidth="1.5" strokeDasharray="3,2" />
                    
                    {/* Automation effects - tasks being completed */}
                    <g>
                      <rect x="-20" y="-5" width="12" height="12" rx="1" fill="#555" />
                      <path d="M-17,1 L-14,4 L-9,-2" stroke="white" strokeWidth="0.8" fill="none" />
                      
                      <rect x="-5" y="-5" width="12" height="12" rx="1" fill="#555" />
                      <path d="M-2,1 L1,4 L6,-2" stroke="white" strokeWidth="0.8" fill="none" />
                      
                      <rect x="10" y="-5" width="12" height="12" rx="1" fill="#555" />
                      <path d="M13,1 L16,4 L21,-2" stroke="white" strokeWidth="0.8" fill="none" />
                    </g>
                  </g>
                  
                  {/* Strategic Focus */}
                  <g transform="translate(230, 125)" className={isInView ? "animate-fade-in-delay-5" : ""}>
                    <rect x="-30" y="-15" width="60" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">STRATEGIC</text>
                    <text x="0" y="5" fontSize="6" fill="white" textAnchor="middle">FOCUS</text>
                    
                    {/* Connection to AI */}
                    <path d="M-30,0 C-45,0 -60,-15 -80,-25" stroke={colorConfig.fill} strokeWidth="1.5" strokeDasharray="3,2" />
                    
                    {/* Automation effects - strategic thinking */}
                    <g>
                      <path d="M-15,-5 L-5,5 M-15,5 L-5,-5" stroke="#666" strokeWidth="1.5" />
                      <path d="M5,-5 L15,5 M5,5 L15,-5" stroke="#666" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="5" fill={colorConfig.fill} opacity="0.7" />
                      <text x="0" y="1" fontSize="4" fill="white" textAnchor="middle">IDEA</text>
                    </g>
                  </g>
                </g>
                
                {/* Bottom section - After Automation (Strategic Results) */}
                <g transform="translate(150, 165)" className={isInView ? "animate-fade-in-delay-5" : ""}>
                  <rect x="-120" y="-15" width="240" height="30" rx="5" fill="#333" strokeWidth="1" stroke={colorConfig.fill} />
                  <text x="0" y="0" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">FOCUS ON STRATEGY, NOT BUSYWORK</text>
                  
                  {/* Results icons */}
                  <g transform="translate(-90, 0)">
                    <path d="M-5,-5 L0,5 L5,-5" stroke={colorConfig.fill} strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(-60, 0)">
                    <circle cx="0" cy="0" r="5" fill="none" stroke={colorConfig.fill} strokeWidth="1" />
                    <circle cx="0" cy="0" r="2" fill={colorConfig.fill} />
                  </g>
                  <g transform="translate(-30, 0)">
                    <rect x="-3" y="-3" width="6" height="6" fill="none" stroke={colorConfig.fill} strokeWidth="1" />
                  </g>
                  <g transform="translate(30, 0)">
                    <polygon points="0,-5 5,3 -5,3" fill="none" stroke={colorConfig.fill} strokeWidth="1" />
                  </g>
                  <g transform="translate(60, 0)">
                    <path d="M-5,-5 C-5,0 5,0 5,5 M-5,5 C-5,0 5,0 5,-5" stroke={colorConfig.fill} strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(90, 0)">
                    <path d="M-5,0 L5,0 M0,-5 L0,5" stroke={colorConfig.fill} strokeWidth="1" />
                  </g>
                </g>
                
                {/* Animated workers transitioning from manual to strategic work */}
                <g className={isInView ? "animate-fade-in-delay-3" : ""}>
                  {/* Transition arrow 1 */}
                  <path 
                    d="M80,35 Q110,70 110,100 Q110,130 80,165" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1" 
                    strokeDasharray="3,2" 
                    opacity="0.6"
                  >
                    <animate attributeName="stroke-dashoffset" values="5;0" dur="3s" repeatCount="1" fill="freeze" />
                  </path>
                  <circle cx="80" cy="35" r="3" fill="#888">
                    <animate attributeName="cx" values="80;80;110;110;80;80" dur="3s" repeatCount="1" fill="freeze" />
                    <animate attributeName="cy" values="35;35;70;130;165;165" dur="3s" repeatCount="1" fill="freeze" />
                  </circle>
                  
                  {/* Transition arrow 2 */}
                  <path 
                    d="M120,35 Q135,70 150,100 Q165,130 180,165" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1" 
                    strokeDasharray="3,2" 
                    opacity="0.6"
                  >
                    <animate attributeName="stroke-dashoffset" values="5;0" dur="3.5s" repeatCount="1" fill="freeze" />
                  </path>
                  <circle cx="120" cy="35" r="3" fill="#888">
                    <animate attributeName="cx" values="120;120;135;150;165;180;180" dur="3.5s" repeatCount="1" fill="freeze" />
                    <animate attributeName="cy" values="35;35;70;100;130;165;165" dur="3.5s" repeatCount="1" fill="freeze" />
                  </circle>
                  
                  {/* Transition arrow 3 */}
                  <path 
                    d="M220,35 Q190,70 190,100 Q190,130 220,165" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1" 
                    strokeDasharray="3,2" 
                    opacity="0.6"
                  >
                    <animate attributeName="stroke-dashoffset" values="5;0" dur="4s" repeatCount="1" fill="freeze" />
                  </path>
                  <circle cx="220" cy="35" r="3" fill="#888">
                    <animate attributeName="cx" values="220;220;190;190;220;220" dur="4s" repeatCount="1" fill="freeze" />
                    <animate attributeName="cy" values="35;35;70;130;165;165" dur="4s" repeatCount="1" fill="freeze" />
                  </circle>
                </g>
              </svg>
            </div>
          )}
          
          {index === 3 && (
            <div className="w-full max-w-[500px]">
              <svg viewBox="0 0 300 200" className="w-full h-auto">
                <defs>
                  <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF4B4B" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#FFDE59" stopOpacity="0.7" />
                    <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.7" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Title */}
                <g transform="translate(150, 15)">
                  <text x="0" y="0" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">ADAPTIVE LEARNING SYSTEM</text>
                  <line x1="-80" y1="5" x2="80" y2="5" stroke={colorConfig.fill} strokeWidth="0.5" opacity="0.7" />
                </g>
                
                {/* Central AI Tutor */}
                <g transform="translate(150, 90)" filter="url(#glow)" className={isInView ? "animate-fade-in" : ""}>
                  <circle cx="0" cy="0" r="22" fill="url(#gradientGreen)" stroke={colorConfig.fill} strokeWidth="1.5" />
                  <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PULP AI</text>
                  <text x="0" y="5" textAnchor="middle" fill="white" fontSize="6">TUTOR</text>
                  
                  {/* Radiating adaptive signals */}
                  <g className="pulse-circle">
                    <circle cx="0" cy="0" r="30" fill="none" stroke={colorConfig.fill} strokeWidth="0.5" strokeDasharray="1,2" />
                    <circle cx="0" cy="0" r="38" fill="none" stroke={colorConfig.fill} strokeWidth="0.5" strokeDasharray="1,3" />
                  </g>
                </g>
                
                {/* Learning Modules */}
                <g className={isInView ? "animate-fade-in-delay" : ""}>
                  {/* Visual Learning Style */}
                  <g transform="translate(75, 55)">
                    <rect x="-25" y="-15" width="50" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">VISUAL</text>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="6">LEARNING</text>
                    
                    {/* Visual learning elements */}
                    <g transform="translate(0, -35)">
                      <rect x="-20" y="-15" width="40" height="30" rx="3" fill="#333" />
                      <rect x="-15" y="-10" width="10" height="10" fill={colorConfig.fill} opacity="0.7" />
                      <rect x="5" y="-10" width="10" height="10" fill="#666" />
                      <rect x="-15" y="5" width="30" height="5" fill="#555" />
                    </g>
                    
                    {/* Connection to AI */}
                    <path 
                      d="M0,15 C0,35 40,50 75,35" 
                      fill="none" 
                      stroke={colorConfig.fill} 
                      strokeWidth="1.5" 
                      strokeDasharray="3,2"
                      className={isInView ? "animate-grow-delay-0" : ""}
                    />
                  </g>
                  
                  {/* Auditory Learning Style */}
                  <g transform="translate(225, 55)">
                    <rect x="-25" y="-15" width="50" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">AUDITORY</text>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="6">LEARNING</text>
                    
                    {/* Auditory learning elements */}
                    <g transform="translate(0, -35)">
                      <rect x="-20" y="-15" width="40" height="30" rx="3" fill="#333" />
                      <path d="M-7,-7 C0,-14 0,-14 7,-7 C10,-4 10,4 7,7 C0,14 0,14 -7,7 C-10,4 -10,-4 -7,-7" fill="none" stroke="#666" strokeWidth="1.5" />
                      <path d="M-3,-3 C0,-6 0,-6 3,-3 C6,0 6,0 3,3 C0,6 0,6 -3,3 C-6,0 -6,0 -3,-3" fill="none" stroke={colorConfig.fill} strokeWidth="1.5" />
                    </g>
                    
                    {/* Connection to AI */}
                    <path 
                      d="M0,15 C0,35 -40,50 -75,35" 
                      fill="none" 
                      stroke={colorConfig.fill} 
                      strokeWidth="1.5" 
                      strokeDasharray="3,2"
                      className={isInView ? "animate-grow-delay-1" : ""}
                    />
                  </g>
                  
                  {/* Kinesthetic Learning Style */}
                  <g transform="translate(75, 125)">
                    <rect x="-25" y="-15" width="50" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">KINESTHETIC</text>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="6">LEARNING</text>
                    
                    {/* Kinesthetic learning elements */}
                    <g transform="translate(0, 35)">
                      <rect x="-20" y="-15" width="40" height="30" rx="3" fill="#333" />
                      <circle cx="-5" cy="0" r="6" fill="#666" />
                      <circle cx="10" cy="-5" r="4" fill={colorConfig.fill} opacity="0.8">
                        <animate attributeName="cy" values="-5;5;-5" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </g>
                    
                    {/* Connection to AI */}
                    <path 
                      d="M0,-15 C0,-35 40,-50 75,-35" 
                      fill="none" 
                      stroke={colorConfig.fill} 
                      strokeWidth="1.5" 
                      strokeDasharray="3,2"
                      className={isInView ? "animate-grow-delay-2" : ""}
                    />
                  </g>
                  
                  {/* Reading/Writing Learning Style */}
                  <g transform="translate(225, 125)">
                    <rect x="-25" y="-15" width="50" height="30" rx="5" fill="url(#gradientGreen)" fillOpacity="0.3" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">ANALYTICAL</text>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="6">LEARNING</text>
                    
                    {/* Reading/Writing learning elements */}
                    <g transform="translate(0, 35)">
                      <rect x="-20" y="-15" width="40" height="30" rx="3" fill="#333" />
                      <line x1="-15" y1="-8" x2="15" y2="-8" stroke="#666" strokeWidth="1.5" />
                      <line x1="-15" y1="-3" x2="10" y2="-3" stroke="#666" strokeWidth="1.5" />
                      <line x1="-15" y1="2" x2="5" y2="2" stroke="#666" strokeWidth="1.5" />
                      <line x1="-15" y1="7" x2="15" y2="7" stroke={colorConfig.fill} strokeWidth="1.5" />
                    </g>
                    
                    {/* Connection to AI */}
                    <path 
                      d="M0,-15 C0,-35 -40,-50 -75,-35" 
                      fill="none" 
                      stroke={colorConfig.fill} 
                      strokeWidth="1.5" 
                      strokeDasharray="3,2"
                      className={isInView ? "animate-grow-delay-3" : ""}
                    />
                  </g>
                </g>
                
                {/* Knowledge Gap Analysis */}
                <g transform="translate(45, 90)" className={isInView ? "animate-fade-in-delay-2" : ""}>
                  <rect x="-20" y="-30" width="40" height="60" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" opacity="0.7" />
                  <text x="0" y="-20" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">KNOWLEDGE MAP</text>
                  
                  {/* Topic mastery representation */}
                  <rect x="-15" y="-12" width="30" height="4" rx="2" fill="#444" />
                  <rect x="-15" y="-12" width="25" height="4" rx="2" fill={colorConfig.fill} opacity="0.8" />
                  <text x="-12" y="-8" textAnchor="start" fill="white" fontSize="3">Topic A</text>
                  
                  <rect x="-15" y="-4" width="30" height="4" rx="2" fill="#444" />
                  <rect x="-15" y="-4" width="10" height="4" rx="2" fill="#FF4B4B" opacity="0.8" />
                  <text x="-12" y="0" textAnchor="start" fill="white" fontSize="3">Topic B</text>
                  
                  <rect x="-15" y="4" width="30" height="4" rx="2" fill="#444" />
                  <rect x="-15" y="4" width="20" height="4" rx="2" fill="#FFDE59" opacity="0.8" />
                  <text x="-12" y="8" textAnchor="start" fill="white" fontSize="3">Topic C</text>
                  
                  <rect x="-15" y="12" width="30" height="4" rx="2" fill="#444" />
                  <rect x="-15" y="12" width="28" height="4" rx="2" fill={colorConfig.fill} opacity="0.8" />
                  <text x="-12" y="16" textAnchor="start" fill="white" fontSize="3">Topic D</text>
                  
                  {/* Gap indicator */}
                  <circle cx="10" cy="-4" r="3" fill="none" stroke="#FF4B4B" strokeWidth="0.5" className="pulse-circle" />
                  <text x="10" y="-4" textAnchor="middle" fill="white" fontSize="4">!</text>
                </g>
                
                {/* Engagement Monitoring */}
                <g transform="translate(255, 90)" className={isInView ? "animate-fade-in-delay-3" : ""}>
                  <rect x="-20" y="-30" width="40" height="60" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" opacity="0.7" />
                  <text x="0" y="-20" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">ENGAGEMENT</text>
                  
                  {/* Engagement meter */}
                  <rect x="-15" y="-10" width="30" height="40" rx="2" fill="#222" />
                  <rect x="-15" y="10" width="30" height="20" rx="2" fill="url(#engagementGradient)" />
                  
                  <g>
                    <line x1="-15" y1="-5" x2="-10" y2="-5" stroke="#444" strokeWidth="0.5" />
                    <text x="-8" y="-4" textAnchor="start" fill="#666" fontSize="4">LOW</text>
                  </g>
                  <g>
                    <line x1="-15" y1="10" x2="-10" y2="10" stroke="#444" strokeWidth="0.5" />
                    <text x="-8" y="11" textAnchor="start" fill="#FFDE59" fontSize="4">MED</text>
                  </g>
                  <g>
                    <line x1="-15" y1="25" x2="-10" y2="25" stroke="#444" strokeWidth="0.5" />
                    <text x="-8" y="26" textAnchor="start" fill={colorConfig.fill} fontSize="4">HIGH</text>
                  </g>
                  
                  {/* Engagement indicator - animated */}
                  <g>
                    <circle cx="0" cy="15" r="4" fill="white" opacity="0.8">
                      <animate attributeName="cy" values="15;18;12;20;15" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <line x1="-15" y1="15" x2="15" y2="15" stroke="white" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.5">
                      <animate attributeName="y1" values="15;18;12;20;15" dur="5s" repeatCount="indefinite" />
                      <animate attributeName="y2" values="15;18;12;20;15" dur="5s" repeatCount="indefinite" />
                    </line>
                  </g>
                </g>
                
                {/* Real-time Learning Path Refinement */}
                <g transform="translate(150, 180)" className={isInView ? "animate-fade-in-delay-4" : ""}>
                  <rect x="-100" y="-15" width="200" height="25" rx="5" fill="url(#gradientGreen)" fillOpacity="0.2" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">REAL-TIME LEARNING PATH REFINEMENT</text>
                  
                  {/* Initial path vs. Adaptive path */}
                  <path 
                    d="M-80,5 C-60,-5 -30,15 0,5 C30,-5 60,15 80,5" 
                    fill="none" 
                    stroke="#666" 
                    strokeWidth="1" 
                    strokeDasharray="2,2"
                  />
                  <text x="-90" y="7" textAnchor="start" fill="#666" fontSize="4">INITIAL</text>
                  
                  <path 
                    d="M-80,5 C-70,0 -50,0 -40,5 C-30,10 -20,0 0,5 C20,10 40,0 60,5 C70,10 75,0 80,5" 
                    fill="none" 
                    stroke={colorConfig.fill} 
                    strokeWidth="1.5" 
                    className={isInView ? "animate-dash" : ""}
                    strokeDasharray="200"
                    strokeDashoffset="200"
                  />
                  <text x="85" y="7" textAnchor="start" fill={colorConfig.fill} fontSize="4">ADAPTIVE</text>
                </g>
                
                {/* Cognitive Styles Visualization */}
                <g transform="translate(150, 50)" className={isInView ? "animate-fade-in-delay-3" : ""}>
                  <rect x="-50" y="-10" width="100" height="20" rx="10" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" opacity="0.7" />
                  <text x="0" y="0" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">ADAPTING TO COGNITIVE STYLES</text>
                  
                  {/* Icons representing different cognitive approaches */}
                  <g transform="translate(-35, 0)">
                    <circle cx="0" cy="0" r="3" fill={colorConfig.fill} opacity="0.7" />
                    <text x="0" y="7" textAnchor="middle" fill="white" fontSize="3">SEQUENTIAL</text>
                  </g>
                  <g transform="translate(-12, 0)">
                    <rect x="-3" y="-3" width="6" height="6" fill={colorConfig.fill} opacity="0.7" />
                    <text x="0" y="7" textAnchor="middle" fill="white" fontSize="3">GLOBAL</text>
                  </g>
                  <g transform="translate(12, 0)">
                    <polygon points="0,-3 3,2 -3,2" fill={colorConfig.fill} opacity="0.7" />
                    <text x="0" y="7" textAnchor="middle" fill="white" fontSize="3">ACTIVE</text>
                  </g>
                  <g transform="translate(35, 0)">
                    <path d="M-2,-2 L2,2 M-2,2 L2,-2" stroke={colorConfig.fill} strokeWidth="1.5" />
                    <text x="0" y="7" textAnchor="middle" fill="white" fontSize="3">REFLECTIVE</text>
                  </g>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// CSS animations for the chatbot visuals
const chatAnimationStyles = `
  @keyframes pulse {
    0% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
    100% { opacity: 0.6; transform: scale(1); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes growWidth {
    from { width: 0; }
    to { width: 140px; }
  }
  
  @keyframes popIn {
    0% { transform: scale(0); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes dash {
    to { stroke-dashoffset: 0; }
  }
  
  .pulse-circle {
    animation: pulse 2s infinite ease-in-out;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-fade-in-delay {
    animation: fadeIn 0.5s ease-out 0.3s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-2 {
    animation: fadeIn 0.5s ease-out 0.6s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-3 {
    animation: fadeIn 0.5s ease-out 0.9s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-4 {
    animation: fadeIn 0.5s ease-out 1.2s forwards;
    opacity: 0;
  }
  
  .animate-fade-in-delay-5 {
    animation: fadeIn 0.5s ease-out 1.5s forwards;
    opacity: 0;
  }
  
  .animate-grow-width {
    animation: growWidth 1.5s ease-out 0.3s forwards;
    width: 0;
  }
  
  .animate-pop-delay-0 {
    animation: popIn 0.5s ease-out 0.3s forwards;
  }
  
  .animate-pop-delay-1 {
    animation: popIn 0.5s ease-out 0.6s forwards;
  }
  
  .animate-pop-delay-2 {
    animation: popIn 0.5s ease-out 0.9s forwards;
  }
  
  .animate-pop-delay-3 {
    animation: popIn 0.5s ease-out 1.2s forwards;
  }
  
  .animate-grow-delay-0 {
    animation: fadeIn 0.5s ease-out 0.2s forwards;
    opacity: 0;
  }
  
  .animate-grow-delay-1 {
    animation: fadeIn 0.5s ease-out 0.4s forwards;
    opacity: 0;
  }
  
  .animate-grow-delay-2 {
    animation: fadeIn 0.5s ease-out 0.6s forwards;
    opacity: 0;
  }
  
  .animate-grow-delay-3 {
    animation: fadeIn 0.5s ease-out 0.8s forwards;
    opacity: 0;
  }
  
  .animate-grow-delay-4 {
    animation: fadeIn 0.5s ease-out 1.0s forwards;
    opacity: 0;
  }
  
  .animate-dash {
    animation: dash 2s ease-out 1.0s forwards;
  }
`;

export { AdaptiveChatsSection }; 