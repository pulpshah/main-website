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
            <svg
            viewBox="0 0 400 270"
            style={{ width: '100%', height: 'auto' }}
          >
            <defs>
              {/* === Gradients === */}
              <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="contextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="toneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="intentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.4" />
              </linearGradient>
          
              {/* === Glow Filter === */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* === Chat Group === */}
            <g>
              {/* AI Greeting (Tone) */}
              <rect
                x="40"
                y="70"
                width="140"
                height="35"
                rx="15"
                fill="#333"
              />
              <text
                x="110"
                y="88"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                Hi Sarah, how can I help you?
              </text>
              <text
                x="110"
                y="98"
                textAnchor="middle"
                fill="white"
                fontSize="7"
                opacity="0.7"
              >
                Friendly tone detected
              </text>
              {/* Tone Indicator (T) */}
              <circle
                cx="40"
                cy="70"
                r="6"
                fill="url(#toneGradient)"
                filter="url(#glow)"
              />
              <text x="40" y="72" textAnchor="middle" fill="white" fontSize="5">
                T
              </text>
          
              {/* User Message (Intent) */}
              <rect
                x="140"
                y="120"
                width="160"
                height="35"
                rx="15"
                fill="#22C55E"
                fillOpacity="0.8"
              />
              <text
                x="220"
                y="135"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                I need the quarterly report
              </text>
              <text
                x="220"
                y="147"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                for the marketing team
              </text>
              {/* Intent Indicator (I) */}
              <circle
                cx="300"
                cy="120"
                r="6"
                fill="url(#intentGradient)"
                filter="url(#glow)"
              />
              <text x="300" y="122" textAnchor="middle" fill="white" fontSize="5">
                I
              </text>
          
              {/* AI "Thinking" Animation */}
              <g>
                <circle cx="70" cy="165" r="3" fill="#666">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="1s"
                    repeatCount="2"
                  />
                </circle>
                <circle cx="80" cy="165" r="3" fill="#666">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="1s"
                    repeatCount="2"
                    begin="0.2s"
                  />
                </circle>
                <circle cx="90" cy="165" r="3" fill="#666">
                  <animate
                    attributeName="opacity"
                    values="0.3;1;0.3"
                    dur="1s"
                    repeatCount="2"
                    begin="0.4s"
                  />
                </circle>
              </g>
          
              {/* AI Response (Context) */}
              <rect
                x="40"
                y="180"
                width="240"
                height="50"
                rx="15"
                fill="#333"
              />
              <text
                x="160"
                y="197"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                I see you&apos;re looking for the Q3 marketing report.
              </text>
              <text
                x="160"
                y="210"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                Based on your recent presentation needs,
              </text>
              <text
                x="160"
                y="223"
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="medium"
              >
                I&apos;ll include the campaign performance graphs.
              </text>
              {/* Context Indicator (C) */}
              <circle
                cx="40"
                cy="180"
                r="6"
                fill="url(#contextGradient)"
                filter="url(#glow)"
              />
              <text x="40" y="182" textAnchor="middle" fill="white" fontSize="5">
                C
              </text>
            </g>
          
            {/* === Central "AI Brain" Circle === */}
            <g filter="url(#glow)">
              <circle
                cx="330"
                cy="80"
                r="18"
                fill="url(#gradientGreen)"
                strokeWidth="1"
                stroke="#22C55E"
                opacity="0.9"
              />
              {/* White decorative arc inside the circle */}
              <path
                d="M322,73 C326,70 334,70 338,73 C342,77 342,83 338,87 C334,90 326,90 322,87 C318,83 318,77 322,73"
                fill="none"
                stroke="white"
                strokeWidth="1.2"
              />
              {/* Pulsing connections */}
              <line
                x1="312"
                y1="80"
                x2="180"
                y2="80"
                stroke="#22C55E"
                strokeWidth="1"
                strokeDasharray="2,1"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="312"
                y1="85"
                x2="275"
                y2="120"
                stroke="#22C55E"
                strokeWidth="1"
                strokeDasharray="2,1"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="0.5s"
                />
              </line>
              <line
                x1="312"
                y1="90"
                x2="250"
                y2="200"
                stroke="#22C55E"
                strokeWidth="1"
                strokeDasharray="2,1"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.2;0.6;0.2"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </line>
            </g>
          
            {/* === Legend === */}
            <g transform="translate(360, 150)">
              <rect x="-20" y="0" width="40" height="60" rx="5" fill="#222" stroke="#333" strokeWidth="0.5" />
              <circle cx="-10" cy="10" r="4" fill="url(#contextGradient)" />
              <text x="0" y="13" fontSize="6" fill="white" textAnchor="start">
                Context
              </text>
              <circle cx="-10" cy="25" r="4" fill="url(#toneGradient)" />
              <text x="0" y="28" fontSize="6" fill="white" textAnchor="start">
                Tone
              </text>
              <circle cx="-10" cy="40" r="4" fill="url(#intentGradient)" />
              <text x="0" y="43" fontSize="6" fill="white" textAnchor="start">
                Intent
              </text>
              <text x="0" y="58" fontSize="5" fill="white" textAnchor="middle" opacity="0.7">
                Natural AI
              </text>
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
                <g transform="translate(65, 45)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient1)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">BUSINESS</text>
                </g>

                {/* User 2 - Technical User */}
                <g transform="translate(65, 155)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient2)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">TECHNICAL</text>
                </g>

                {/* User 3 - Casual User */}
                <g transform="translate(235, 45)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient3)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">CASUAL</text>
                </g>

                {/* User 4 - Creative User */}
                <g transform="translate(235, 155)">
                  <circle cx="0" cy="0" r="15" fill="url(#userGradient1)" stroke={colorConfig.fill} strokeWidth="1" />
                  <path d="M0,-7 C3,-7 5,-5 5,-2 C5,2 -5,2 -5,-2 C-5,-5 -3,-7 0,-7" fill="none" stroke="white" strokeWidth="1" />
                  <path d="M-5,5 C-5,2 5,2 5,5" fill="none" stroke="white" strokeWidth="1" />
                  <text x="0" y="15" textAnchor="middle" fill="white" fontSize="5">CREATIVE</text>
                </g>
              </g>

              {/* Personalization flows - dynamic content for each user */}
              <g>
                {/* Flow to Business User */}
                <path 
                  d="M130,80 C125,70 110,60 85,50" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-0" : ""}
                  opacity="0"
                />
                <g transform="translate(100, 40)" className={isInView ? "animate-fade-in-delay-2" : ""} opacity="0">
                  <rect x="85" y="35" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="110" y="50" fontSize="5" fill="white" textAnchor="middle">FORMAL MESSAGING</text>
                  <text x="110" y="40" fontSize="5" fill="white" textAnchor="middle">ROI FOCUSED</text>
                </g>
                
                {/* Flow to Technical User */}
                <path 
                  d="M130,120 C125,130 110,140 85,150" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-1" : ""}
                  opacity="0"
                />
                <g transform="translate(100, 160)" className={isInView ? "animate-fade-in-delay-3" : ""} opacity="0">
                  <rect x="85" y="145" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="110" y="160" fontSize="5" fill="white" textAnchor="middle">DETAILED SPECS</text>
                  <text x="110" y="150" fontSize="5" fill="white" textAnchor="middle">TECH TERMINOLOGY</text>
                </g>
                
                {/* Flow to Casual User */}
                <path 
                  d="M170,80 C175,70 190,60 215,50" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-2" : ""}
                  opacity="0"
                />
                <g transform="translate(200, 40)" className={isInView ? "animate-fade-in-delay-4" : ""} opacity="0">
                  <rect x="165" y="35" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="190" y="50" fontSize="5" fill="white" textAnchor="middle">FRIENDLY TONE</text>
                  <text x="190" y="40" fontSize="5" fill="white" textAnchor="middle">SIMPLE & DIRECT</text>
                </g>
                
                {/* Flow to Creative User */}
                <path 
                  d="M170,120 C175,130 190,140 215,150" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="3,2" 
                  className={isInView ? "animate-grow-delay-3" : ""}
                  opacity="0"
                />
                <g transform="translate(200, 160)" className={isInView ? "animate-fade-in-delay-5" : ""} opacity="0">
                  <rect x="165" y="145" width="50" height="20" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <text x="190" y="160" fontSize="5" fill="white" textAnchor="middle">VISUAL EXAMPLES</text>
                  <text x="190" y="150" fontSize="5" fill="white" textAnchor="middle">EXPRESSIVE STYLE</text>
                </g>
              </g>

              {/* User behavior and preference indicators */}
              <g className={isInView ? "animate-fade-in-delay" : ""}>
                {/* User 1 preferences */}
                <g transform="translate(35, 30)">
                  <circle cx="-20" cy="0" r="5" fill="#333" />
                  <text x="-20" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="-10" y="2" textAnchor="start" fill="white" fontSize="5">Data-driven</text>
                </g>
                
                {/* User 2 preferences */}
                <g transform="translate(35, 170)">
                  <circle cx="-20" cy="3" r="5" fill="#333" />
                  <text x="-20" y="5" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="-10" y="5" textAnchor="start" fill="white" fontSize="5">Detail-oriented</text>
                </g>
                
                {/* User 3 preferences */}
                <g transform="translate(265, 30)">
                  <circle cx="20" cy="0" r="5" fill="#333" />
                  <text x="20" y="2" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="10" y="2" textAnchor="end" fill="white" fontSize="5">Convenience</text>
                </g>
                
                {/* User 4 preferences */}
                <g transform="translate(265, 170)">
                  <circle cx="20" cy="3" r="5" fill="#333" />
                  <text x="20" y="5" textAnchor="middle" fill="white" fontSize="4">P</text>
                  <text x="10" y="5" textAnchor="end" fill="white" fontSize="5">Inspirational</text>
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
            <svg viewBox="0 0 400 240" className="w-full h-full">
              <defs>
                <linearGradient id="pulpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={colorConfig.fill} />
                </marker>
              </defs>
              
              
              {/* Title */}
              <g transform="translate(200, 20)">
                <text x="0" y="0" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">SEAMLESS AUTOMATION</text>
                <line x1="-120" y1="10" x2="120" y2="10" stroke={colorConfig.fill} strokeWidth="1" opacity="1" />
              </g>
              
              {/* Before & After Labels */}
              <g>
                <text x="100" y="50" fontSize="12" fill={colorConfig.fill} textAnchor="middle" fontWeight="bold">BEFORE</text>
                <text x="300" y="50" fontSize="12" fill={colorConfig.fill} textAnchor="middle" fontWeight="bold">AFTER</text>
              </g>

              {/* Manual tasks section - BEFORE */}
              <g transform="translate(100, 125)">
                <rect x="-70" y="-60" width="140" height="120" rx="8" fill="#222" stroke={colorConfig.fill} strokeWidth="1" opacity="1" />
                
                {/* Tasks */}
                <g>
                  {/* Task stack 1 */}
                  <g transform="translate(-35, -30)">
                    <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="0" x2="5" y2="0" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="5" x2="8" y2="5" stroke="#999" strokeWidth="1" />
                  </g>
                  
                  {/* Task stack 2 */}
                  <g transform="translate(0, -15)">
                    <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="0" x2="5" y2="0" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="5" x2="8" y2="5" stroke="#999" strokeWidth="1" />
                  </g>
                  
                  {/* Task stack 3 */}
                  <g transform="translate(35, -30)">
                    <rect x="-15" y="-10" width="30" height="20" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <line x1="-10" y1="-5" x2="10" y2="-5" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="0" x2="5" y2="0" stroke="#999" strokeWidth="1" />
                    <line x1="-10" y1="5" x2="8" y2="5" stroke="#999" strokeWidth="1" />
                  </g>
                  
                  {/* Person icon struggling with tasks */}
                  <g transform="translate(0, 25)">
                    <circle cx="0" cy="-5" r="8" fill="#666" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <path d="M0,3 L0,15 M-8,7 L0,15 L8,7" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                    <path d="M-3,-7 L-1,-5 M3,-7 L1,-5" stroke="#333" strokeWidth="1" />
                    <path d="M-2,-2 C-2,0 2,0 2,-2" stroke="#333" strokeWidth="1" />
                    
                    {/* Thought bubble showing frustration */}
                    <path d="M10,-10 C15,-12 20,-10 20,-5 C20,0 15,0 15,-5 C15,-8 12,-10 10,-10" fill="#444" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <circle cx="8" cy="-12" r="2" fill="#444" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <text x="15" y="-5" fontSize="7" fill="white" textAnchor="middle">!</text>
                  </g>
                  
                  {/* Label */}
                  <text x="0" y="-45" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">REPETITIVE TASKS</text>
                  <text x="0" y="45" fontSize="7" fill="white" textAnchor="middle">TIME CONSUMING</text>
                </g>
              </g>
              
              {/* Central AI Automation Engine */}
              <g transform="translate(200, 125)" filter="url(#glow)">
                <circle cx="0" cy="0" r="25" fill="url(#pulpGradient)" stroke={colorConfig.fill} strokeWidth="2" />
                <text x="0" y="-5" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">PULP AI</text>
                <text x="0" y="8" fontSize="7" fill="white" textAnchor="middle">AUTOMATION</text>
                
                {/* Pulse effect */}
                <circle cx="0" cy="0" r="35" fill="none" stroke={colorConfig.fill} strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8" className="pulse-circle" />
              </g>
              
              {/* Strategic focus section - AFTER */}
              <g transform="translate(300, 125)">
                <rect x="-70" y="-60" width="140" height="120" rx="8" fill="#222" stroke={colorConfig.fill} strokeWidth="1" opacity="1" />
                
                {/* Strategic elements */}
                <g>
                  {/* Strategy board */}
                  <g transform="translate(0, -30)">
                    <rect x="-35" y="-15" width="70" height="30" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                    <line x1="-30" y1="-10" x2="30" y2="-10" stroke={colorConfig.fill} strokeWidth="1" opacity="0.9" />
                    <line x1="-30" y1="0" x2="20" y2="0" stroke="#999" strokeWidth="1" />
                    <line x1="-30" y1="10" x2="30" y2="10" stroke="#999" strokeWidth="1" />
                    
                    {/* Checkpoints on strategy */}
                    <circle cx="-20" cy="-10" r="2" fill={colorConfig.fill} />
                    <circle cx="0" cy="-10" r="2" fill={colorConfig.fill} />
                    <circle cx="20" cy="-10" r="2" fill={colorConfig.fill} />
                  </g>
                  
                  {/* Team collaboration */}
                  <g transform="translate(0, 20)">
                    {/* Person 1 */}
                    <g transform="translate(-20, 0)">
                      <circle cx="0" cy="-5" r="6" fill="#666" stroke={colorConfig.fill} strokeWidth="0.5" />
                      <path d="M0,1 L0,10 M-5,5 L0,10 L5,5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    
                    {/* Person 2 */}
                    <g transform="translate(0, 0)">
                      <circle cx="0" cy="-5" r="6" fill="#666" stroke={colorConfig.fill} strokeWidth="0.5" />
                      <path d="M0,1 L0,10 M-5,5 L0,10 L5,5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    
                    {/* Person 3 */}
                    <g transform="translate(20, 0)">
                      <circle cx="0" cy="-5" r="6" fill="#666" stroke={colorConfig.fill} strokeWidth="0.5" />
                      <path d="M0,1 L0,10 M-5,5 L0,10 L5,5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
                    </g>
                    
                    {/* Connection lines */}
                    <line x1="-20" y1="-10" x2="0" y2="-10" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="2,1" />
                    <line x1="0" y1="-10" x2="20" y2="-10" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="2,1" />
                    
                    <text x="0" y="20" fontSize="7" fill="white" textAnchor="middle">TEAM COLLABORATION</text>
                  </g>
                  
                  {/* Label */}
                  <text x="0" y="-45" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">STRATEGIC FOCUS</text>
                  <text x="0" y="45" fontSize="7" fill="white" textAnchor="middle">VALUE CREATION</text>
                </g>
              </g>
              
              {/* Transformation arrows */}
              <g>
                {/* From manual to Pulp */}
                <path d="M120,125 L155,125" stroke={colorConfig.fill} strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* From Pulp to strategic */}
                <path d="M225,125 L260,125" stroke={colorConfig.fill} strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Task reduction indicator */}
                <g transform="translate(157, 110)">
                  <path d="M0,0 L5,5 L0,10 L-5,5 Z" fill={colorConfig.fill} opacity="0.9" />
                  <text x="0" y="4" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">-</text>
                </g>
                
                {/* Value addition indicator */}
                <g transform="translate(243, 110)">
                  <path d="M0,0 L5,5 L0,10 L-5,5 Z" fill={colorConfig.fill} opacity="0.9" />
                  <text x="0" y="4" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">+</text>
                </g>
              </g>
              
              {/* Automation capabilities */}
              <g transform="translate(200, 200)">
                <rect x="-160" y="-15" width="320" height="30" rx="5" fill="#222" stroke={colorConfig.fill} strokeWidth="1" opacity="1" />
                
                {/* Categories */}
                <g transform="translate(-120, 0)">
                  <circle cx="0" cy="0" r="10" fill="#333" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="0" y="3" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">KR</text>
                  <text x="0" y="15" fontSize="6" fill="white" textAnchor="middle">KNOWLEDGE</text>
                </g>
                
                <g transform="translate(-40, 0)">
                  <circle cx="0" cy="0" r="10" fill="#333" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="0" y="3" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">O</text>
                  <text x="0" y="15" fontSize="6" fill="white" textAnchor="middle">ONBOARDING</text>
                </g>
                
                <g transform="translate(40, 0)">
                  <circle cx="0" cy="0" r="10" fill="#333" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="0" y="3" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">IO</text>
                  <text x="0" y="15" fontSize="6" fill="white" textAnchor="middle">INTERNAL OPS</text>
                </g>
                
                <g transform="translate(120, 0)">
                  <circle cx="0" cy="0" r="10" fill="#333" stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="0" y="3" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">C</text>
                  <text x="0" y="15" fontSize="6" fill="white" textAnchor="middle">COMPLIANCE</text>
                </g>
              </g>
            </svg>
          )}
          
          {index === 3 && (
            <svg viewBox="0 0 400 240" className="w-full h-full">
              <defs>
                <linearGradient id="learningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Title */}
              <g transform="translate(200, 25)">
                <text x="0" y="0" fontSize="14" fill="white" textAnchor="middle" fontWeight="bold">ADAPTIVE LEARNING SYSTEM</text>
                <line x1="-120" y1="10" x2="120" y2="10" stroke={colorConfig.fill} strokeWidth="1" />
              </g>
              
              {/* Learning Styles Boxes */}
              {/* Visual Learning - Top Left */}
              <g transform="translate(120, 85)">
                <rect x="-50" y="-20" width="100" height="40" rx="5" fill="transparent" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="0" y="-5" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">VISUAL</text>
                <text x="0" y="10" fontSize="9" fill="white" textAnchor="middle">LEARNING</text>
                
                {/* Icon */}
                <g transform="translate(-75, 0)">
                  <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <rect x="-8" y="-8" width="16" height="16" fill={colorConfig.fill} opacity="0.5" />
                </g>
              </g>
              
              {/* Auditory Learning - Top Right */}
              <g transform="translate(280, 85)">
                <rect x="-50" y="-20" width="100" height="40" rx="5" fill="transparent" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="0" y="-5" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">AUDITORY</text>
                <text x="0" y="10" fontSize="9" fill="white" textAnchor="middle">LEARNING</text>
                
                {/* Icon */}
                <g transform="translate(75, 0)">
                  <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <circle cx="0" cy="0" r="8" fill={colorConfig.fill} opacity="0.5" />
                </g>
              </g>
              
              {/* Kinesthetic Learning - Bottom Left */}
              <g transform="translate(120, 165)">
                <rect x="-50" y="-20" width="100" height="40" rx="5" fill="transparent" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="0" y="-5" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">KINESTHETIC</text>
                <text x="0" y="10" fontSize="9" fill="white" textAnchor="middle">LEARNING</text>
                
                {/* Icon */}
                <g transform="translate(-75, 0)">
                  <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <circle cx="-5" cy="0" r="5" fill="#666" />
                  <circle cx="5" cy="0" r="3" fill={colorConfig.fill} />
                </g>
              </g>
              
              {/* Analytical Learning - Bottom Right */}
              <g transform="translate(280, 165)">
                <rect x="-50" y="-20" width="100" height="40" rx="5" fill="transparent" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="0" y="-5" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">ANALYTICAL</text>
                <text x="0" y="10" fontSize="9" fill="white" textAnchor="middle">LEARNING</text>
                
                {/* Icon */}
                <g transform="translate(75, 0)">
                  <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                  <line x1="-8" y1="-8" x2="8" y2="-8" stroke={colorConfig.fill} strokeWidth="1" />
                  <line x1="-8" y1="-3" x2="5" y2="-3" stroke={colorConfig.fill} strokeWidth="1" />
                  <line x1="-8" y1="2" x2="8" y2="2" stroke={colorConfig.fill} strokeWidth="1" />
                  <line x1="-8" y1="7" x2="3" y2="7" stroke={colorConfig.fill} strokeWidth="1" />
                </g>
              </g>
              
              {/* Connecting Lines */}
              <g>
                {/* Top Connection */}
                <path 
                  d="M120,65 C150,45 250,45 280,65" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
                
                {/* Bottom Connection */}
                <path 
                  d="M120,185 C150,205 250,205 280,185" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
                
                {/* Left Connection */}
                <path 
                  d="M100,85 C80,100 80,150 100,165" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
                
                {/* Right Connection */}
                <path 
                  d="M300,85 C320,100 320,150 300,165" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
                
                {/* Diagonal Connection */}
                <path 
                  d="M135,100 C180,125 220,125 265,100" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
                
                {/* Diagonal Connection */}
                <path 
                  d="M135,150 C180,125 220,125 265,150" 
                  fill="none" 
                  stroke={colorConfig.fill} 
                  strokeWidth="1.5" 
                  strokeDasharray="5,3" 
                />
              </g>
              
              {/* Labels */}
              <g transform="translate(200, 125)">
                <circle cx="0" cy="0" r="15" fill="url(#learningGradient)" stroke={colorConfig.fill} strokeWidth="1.5" />
                <text x="0" y="0" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">AI</text>
              </g>
              
              {/* Engagement Indicator */}
              <g transform="translate(80, 35)">
                <rect x="-25" y="-15" width="50" height="30" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                <path d="M-15,-6 L-5,-6" stroke={colorConfig.fill} strokeWidth="1" />
                <path d="M-15,0 L0,0" stroke={colorConfig.fill} strokeWidth="1" />
                <path d="M-15,6 L-8,6" stroke={colorConfig.fill} strokeWidth="1" />
              </g>
              
              {/* Learning Path */}
              <g transform="translate(320, 35)">
                <rect x="-25" y="-15" width="50" height="30" rx="5" fill="#333" stroke={colorConfig.fill} strokeWidth="0.5" />
                <polygon points="0,-7 7,0 0,7 -7,0" fill={colorConfig.fill} />
              </g>
            </svg>
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