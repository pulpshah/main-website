"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  FileSearch, 
  Network, 
  Library, 
  Rocket, 
  BookOpen, 
  Database,
  FileText,
  GitBranch,
  BookMarked,
  Lightbulb,
  BrainCircuit,
  BarChart,
  Compass,
  Brain
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue" | "red";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  FileSearch: <FileSearch className="h-full w-full" />,
  Network: <Network className="h-full w-full" />,
  Library: <Library className="h-full w-full" />,
  Rocket: <Rocket className="h-full w-full" />,
  BookOpen: <BookOpen className="h-full w-full" />,
  Database: <Database className="h-full w-full" />,
  FileText: <FileText className="h-full w-full" />,
  GitBranch: <GitBranch className="h-full w-full" />,
  BookMarked: <BookMarked className="h-full w-full" />,
  Lightbulb: <Lightbulb className="h-full w-full" />,
  BrainCircuit: <BrainCircuit className="h-full w-full" />,
  BarChart: <BarChart className="h-full w-full" />,
  Compass: <Compass className="h-full w-full" />,
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
  
  // Simple placeholder visuals for now
  return (
    <>
      <style jsx global>{knowledgeAnimationStyles}</style>
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
          {index === 0 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <defs>
                <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              {/* Central Knowledge Framework */}
              <polygon 
                points="150,70 200,100 150,130 100,100" 
                fill="url(#dataGradient)" 
                stroke={colorConfig.fill} 
                strokeWidth="1.5" 
                className={isInView ? "animate-pulse" : ""}
              />
              
              {/* Scattered Data Points */}
              {[
                { x: 40, y: 40, size: 12, delay: 0.2, label: "DOCS" },
                { x: 260, y: 40, size: 8, delay: 0.5, label: "API" },
                { x: 60, y: 160, size: 10, delay: 0.3, label: "MESSAGES" },
                { x: 240, y: 160, size: 14, delay: 0.1, label: "RESEARCH" },
                { x: 30, y: 100, size: 7, delay: 0.4, label: "METRICS" },
                { x: 270, y: 100, size: 9, delay: 0.6, label: "INSIGHTS" },
                { x: 80, y: 30, size: 11, delay: 0.25, label: "VIDEOS" },
                { x: 220, y: 30, size: 9, delay: 0.45, label: "PODCASTS" },
                { x: 40, y: 180, size: 12, delay: 0.35, label: "WIKIPEDIA" },
                { x: 260, y: 180, size: 10, delay: 0.55, label: "SOCIAL" },
                { x: 100, y: 190, size: 8, delay: 0.3, label: "NEWS" },
                { x: 200, y: 190, size: 9, delay: 0.5, label: "BLOGS" },
                { x: 150, y: 35, size: 10, delay: 0.4, label: "BOOKS" },
                { x: 85, y: 70, size: 9, delay: 0.35, label: "PAPERS" },
                { x: 215, y: 70, size: 8, delay: 0.25, label: "FORUMS" }
              ].map((point, i) => (
                <g key={i}>
                  {/* Connection lines from data points to central framework */}
                  <line 
                    x1={point.x} 
                    y1={point.y} 
                    x2="150" 
                    y2="100" 
                    stroke={colorConfig.fill} 
                    strokeWidth="0.8" 
                    strokeDasharray="3,2" 
                    strokeOpacity="0.6" 
                    style={{
                      animation: isInView ? `pulse 2s infinite ease-in-out ${point.delay}s` : "none"
                    }}
                  />
                  
                  {/* Data point */}
                  <circle 
                    cx={point.x} 
                    cy={point.y} 
                    r={point.size / 2} 
                    fill={colorConfig.fill} 
                    fillOpacity="0.7" 
                    style={{
                      animation: isInView ? `float 3s infinite ease-in-out ${point.delay}s` : "none"
                    }}
                  />
                  
                  {/* Data source label */}
                  <text 
                    x={point.x} 
                    y={point.y - (point.size / 2) - 3} 
                    textAnchor="middle" 
                    fill="white" 
                    fontSize="6"
                    style={{
                      animation: isInView ? `float 3s infinite ease-in-out ${point.delay}s` : "none"
                    }}
                  >
                    {point.label}
                  </text>
                </g>
              ))}
              
              {/* Knowledge Framework Labels */}
              <text x="150" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SYNTHESIS</text>
              
              {/* Actionable Knowledge Arrow */}
              <g transform="translate(150, 150)">
                <rect x="-45" y="-10" width="90" height="20" rx="5" fill="#111" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.8" />
                <text x="0" y="4" textAnchor="middle" fill="white" fontSize="8">ACTIONABLE KNOWLEDGE</text>
                <path d="M0,15 L0,30 L10,20 L-10,20 Z" fill={colorConfig.fill} />
              </g>
            </svg>
          )}
          
          {index === 1 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <defs>
                <linearGradient id="patternGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.4" />
                </linearGradient>
                
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              
              {/* Topic/Data clusters */}
              {[
                { x: 75, y: 50, radius: 30, label: "TOPIC A", connections: [1, 2, 3] },
                { x: 225, y: 50, radius: 30, label: "TOPIC B", connections: [0, 3, 4] },
                { x: 50, y: 150, radius: 30, label: "TOPIC C", connections: [0, 4] },
                { x: 150, y: 130, radius: 30, label: "TOPIC D", connections: [0, 1] },
                { x: 250, y: 150, radius: 30, label: "TOPIC E", connections: [1, 2] }
              ].map((node, i) => (
                <g key={i}>
                  {/* Circle for each topic cluster */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius}
                    fill="transparent"
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                    strokeOpacity="0.6"
                    strokeDasharray="2,1"
                    style={{
                      animation: isInView ? `pulse 3s infinite ease-in-out ${i * 0.2}s` : "none"
                    }}
                  />
                  
                  {/* Inner data points for each topic */}
                  {Array.from({ length: 5 + i }).map((_, j) => {
                    const angle = (Math.PI * 2 * j) / (5 + i);
                    const distance = (Math.random() * 0.6 + 0.2) * node.radius;
                    const x = node.x + Math.cos(angle) * distance;
                    const y = node.y + Math.sin(angle) * distance;
                    return (
                      <circle
                        key={`${i}-${j}`}
                        cx={x}
                        cy={y}
                        r="2"
                        fill={colorConfig.fill}
                        fillOpacity="0.8"
                        style={{
                          animation: isInView ? `float 2s infinite ease-in-out ${i * 0.1 + j * 0.05}s` : "none"
                        }}
                      />
                    );
                  })}
                  
                  {/* Topic labels */}
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
              
              {/* Non-obvious connections revealed by algorithm */}
              {[
                { from: 0, to: 2, discovered: true },
                { from: 0, to: 1, discovered: false },
                { from: 1, to: 4, discovered: false },
                { from: 2, to: 4, discovered: true },
                { from: 0, to: 3, discovered: false },
                { from: 1, to: 3, discovered: false },
                { from: 3, to: 4, discovered: true },
                { from: 2, to: 3, discovered: true }
              ].map((connection, i) => {
                const nodes = [
                  { x: 75, y: 50 },
                  { x: 225, y: 50 },
                  { x: 50, y: 150 },
                  { x: 150, y: 130 },
                  { x: 250, y: 150 }
                ];
                
                const startNode = nodes[connection.from];
                const endNode = nodes[connection.to];
                
                return (
                  <g key={i}>
                    <line
                      x1={startNode.x}
                      y1={startNode.y}
                      x2={endNode.x}
                      y2={endNode.y}
                      stroke={connection.discovered ? colorConfig.fill : "#555"}
                      strokeWidth={connection.discovered ? "1.5" : "0.8"}
                      strokeOpacity={connection.discovered ? "0.8" : "0.3"}
                      strokeDasharray={connection.discovered ? "none" : "1,2"}
                      style={{
                        filter: connection.discovered ? "url(#glow)" : "none",
                        animation: connection.discovered && isInView ? "pulse 3s infinite ease-in-out" : "none"
                      }}
                    />
                    
                    {/* Connection indicators for discovered connections */}
                    {connection.discovered && (
                      <g>
                        <circle
                          cx={(startNode.x + endNode.x) / 2}
                          cy={(startNode.y + endNode.y) / 2}
                          r="4"
                          fill={colorConfig.fill}
                          fillOpacity="0.8"
                          style={{
                            animation: isInView ? "pulse 2s infinite ease-in-out" : "none"
                          }}
                        />
                        <text
                          x={(startNode.x + endNode.x) / 2}
                          y={(startNode.y + endNode.y) / 2 - 8}
                          textAnchor="middle"
                          fill="white"
                          fontSize="6"
                          fontWeight="bold"
                          style={{
                            animation: isInView ? "float 3s infinite ease-in-out" : "none"
                          }}
                        >
                          DISCOVERED
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              
              {/* Algorithm visualization */}
              <g transform="translate(150, 90)">
                <polygon
                  points="0,-20 15,10 -15,10"
                  fill="url(#patternGradient)"
                  stroke={colorConfig.fill}
                  strokeWidth="1"
                  style={{
                    animation: isInView ? "pulse 2s infinite ease-in-out" : "none"
                  }}
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                  fontWeight="bold"
                >
                  AI
                </text>
              </g>
              
              {/* Label */}
              <g transform="translate(150, 180)">
                <rect
                  x="-50"
                  y="-12"
                  width="100"
                  height="24"
                  rx="5"
                  fill="#111"
                  stroke={colorConfig.fill}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  HIDDEN CONNECTIONS
                </text>
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                >
                  REVEALED BY ALGORITHMS
                </text>
              </g>
            </svg>
          )}
          
          {index === 2 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <defs>
                <linearGradient id="insightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.5" />
                </linearGradient>
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Information Overload Side (Left) */}
              <g transform="translate(70, 100)">
                {/* Information Noise */}
                {Array.from({ length: 40 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const distance = Math.random() * 40;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;
                  const size = Math.random() * 2 + 1;
                  
                  return (
                    <circle
                      key={`noise-${i}`}
                      cx={x}
                      cy={y}
                      r={size}
                      fill="#aaa"
                      fillOpacity={0.4 + Math.random() * 0.3}
                      style={{
                        animation: isInView ? `float ${1 + Math.random()}s infinite ease-in-out ${Math.random()}s` : "none"
                      }}
                    />
                  );
                })}
                
                {/* Information Overflow Label */}
                <text x="0" y="-45" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                  INFORMATION OVERLOAD
                </text>
              </g>
              
              {/* Transformation Process (Middle) */}
              <g transform="translate(150, 100)">
                {/* Process Flow Arrow */}
                <path
                  d="M-50,0 C-30,-15 -10,-15 10,-15 C30,-15 50,0 70,0"
                  fill="none"
                  stroke={colorConfig.fill}
                  strokeWidth="2"
                  strokeDasharray="4,2"
                  strokeLinecap="round"
                  style={{
                    animation: isInView ? "pulse 2s infinite ease-in-out" : "none"
                  }}
                />
                
                {/* Filter/Transform Symbol */}
                <g filter="url(#glowFilter)">
                  <path
                    d="M-10,-20 L10,-20 L5,0 L-5,0 Z"
                    fill="url(#insightGradient)"
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                  />
                  
                  <path
                    d="M-5,0 L5,0 L3,15 L-3,15 Z"
                    fill="url(#insightGradient)"
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                  />
                </g>
                
                {/* Process Label */}
                <text x="0" y="-30" textAnchor="middle" fill="white" fontSize="8">
                  SYNTHESIS PROCESS
                </text>
              </g>
              
              {/* Strategic Knowledge Side (Right) */}
              <g transform="translate(230, 100)">
                {/* Strategic Hexagon Structure */}
                <g style={{
                  animation: isInView ? "pulse 3s infinite ease-in-out" : "none"
                }}>
                  <polygon
                    points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
                    fill="url(#insightGradient)"
                    stroke={colorConfig.fill}
                    strokeWidth="1.5"
                  />
                  
                  <line x1="0" y1="-30" x2="0" y2="30" stroke={colorConfig.fill} strokeWidth="1" />
                  <line x1="-26" y1="-15" x2="26" y2="15" stroke={colorConfig.fill} strokeWidth="1" />
                  <line x1="-26" y1="15" x2="26" y2="-15" stroke={colorConfig.fill} strokeWidth="1" />
                  
                  {/* Center Node */}
                  <circle cx="0" cy="0" r="6" fill={colorConfig.fill} fillOpacity="0.9" />
                  
                  {/* Strategic Points */}
                  {[
                    { x: 0, y: -30, label: "GOALS" },
                    { x: 26, y: -15, label: "OPPORTUNITIES" }, 
                    { x: 26, y: 15, label: "RESOURCES" },
                    { x: 0, y: 30, label: "METRICS" },
                    { x: -26, y: 15, label: "RISKS" },
                    { x: -26, y: -15, label: "CONTEXT" }
                  ].map((point, i) => (
                    <g key={i}>
                      <circle 
                        cx={point.x} 
                        cy={point.y} 
                        r="4" 
                        fill={colorConfig.fill} 
                        fillOpacity="0.8"
                      />
                      <text 
                        x={point.x} 
                        y={point.y + (point.y < 0 ? -6 : 12)} 
                        textAnchor="middle" 
                        fill="white" 
                        fontSize="5"
                        fontWeight="bold"
                      >
                        {point.label}
                      </text>
                    </g>
                  ))}
                </g>
                
                {/* Strategic Knowledge Label */}
                <text x="0" y="-45" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                  STRATEGIC KNOWLEDGE
                </text>
              </g>
              
              {/* Bottom Benefit Labels */}
              <g transform="translate(150, 175)">
                <rect x="-80" y="-10" width="160" height="20" rx="5" fill="#111" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.5" />
                <text x="0" y="2" textAnchor="middle" fill="white" fontSize="8">
                  CONFIDENT DECISION-MAKING
                </text>
              </g>
            </svg>
          )}
          
          {index === 3 && (
            <svg viewBox="0 0 300 200" className="w-full h-auto">
              <defs>
                <linearGradient id="researchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.6" />
                </linearGradient>
                <filter id="researchGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Siloed Research Repositories */}
              {[
                { x: 75, y: 130, width: 40, height: 30, label: "DATASET A" },
                { x: 125, y: 130, width: 40, height: 30, label: "PAPERS" },
                { x: 175, y: 130, width: 40, height: 30, label: "PATENTS" },
                { x: 225, y: 130, width: 40, height: 30, label: "DATASET B" }
              ].map((repo, i) => (
                <g key={i}>
                  <rect
                    x={repo.x - repo.width/2}
                    y={repo.y - repo.height/2}
                    width={repo.width}
                    height={repo.height}
                    rx="3"
                    fill="#333"
                    stroke={colorConfig.fill}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  
                  {/* Document Lines */}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <line
                      key={`line-${i}-${j}`}
                      x1={repo.x - repo.width/2 + 5}
                      y1={repo.y - repo.height/2 + 8 + j * 6}
                      x2={repo.x + repo.width/2 - 5}
                      y2={repo.y - repo.height/2 + 8 + j * 6}
                      stroke="#666"
                      strokeWidth="1"
                    />
                  ))}
                  
                  <text
                    x={repo.x}
                    y={repo.y + repo.height/2 + 10}
                    textAnchor="middle"
                    fill="white"
                    fontSize="6"
                    fontWeight="bold"
                  >
                    {repo.label}
                  </text>
                </g>
              ))}
              
              {/* Silos Label */}
              <text
                x="50"
                y="180"
                textAnchor="start"
                fill="white"
                fontSize="7"
              >
                SILOED INFORMATION
              </text>
              
              {/* Extraction and Connection Process - Animated Particles */}
              {[0, 1, 2, 3].map((sourceIndex) => {
                const source = [60, 110, 160, 210][sourceIndex];
                
                return Array.from({ length: 3 }).map((_, i) => (
                  <circle
                    key={`particle-${sourceIndex}-${i}`}
                    cx={source}
                    cy={150}
                    r="2"
                    fill={colorConfig.fill}
                    style={{
                      animation: isInView ? 
                        `particleFlow ${1.5 + Math.random() * 0.5}s infinite ${0.2 * sourceIndex + 0.1 * i}s` : 
                        "none"
                    }}
                  />
                ));
              })}
              
              {/* Knowledge Extraction and Connection System */}
              <g transform="translate(150, 90)">
                {/* Connection Framework */}
                <rect
                  x="-100"
                  y="-15"
                  width="200"
                  height="30"
                  rx="15"
                  fill="url(#researchGradient)"
                  stroke={colorConfig.fill}
                  strokeWidth="1.5"
                  filter="url(#researchGlow)"
                  style={{
                    animation: isInView ? "pulse 3s infinite ease-in-out" : "none"
                  }}
                />
                
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  AUTOMATED EXTRACTION
                </text>
                
                <text
                  x="0"
                  y="10"
                  textAnchor="middle"
                  fill="white"
                  fontSize="6"
                >
                  & CONNECTION
                </text>
              </g>
              
              {/* Accelerated Research Path */}
              <g>
                <path
                  d="M150,70 L150,40"
                  stroke={colorConfig.fill}
                  strokeWidth="2"
                  strokeDasharray="none"
                  markerEnd="url(#arrowMarker)"
                  style={{
                    animation: isInView ? "extendArrow 1.5s ease-out forwards" : "none"
                  }}
                />
                
                <polygon
                  points="150,30 140,45 160,45"
                  fill={colorConfig.fill}
                  style={{
                    animation: isInView ? "pulse 2s infinite ease-in-out 1s" : "none"
                  }}
                />
              </g>
              
              {/* Breakthrough/Discovery */}
              <g transform="translate(150, 30)">
                <circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill="url(#researchGradient)"
                  stroke={colorConfig.fill}
                  strokeWidth="1.5"
                  filter="url(#researchGlow)"
                  style={{
                    animation: isInView ? "pulse 2s infinite ease-in-out" : "none"
                  }}
                />
                
                {/* Burst/Star shape for "breakthrough" */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (Math.PI * 2 * i) / 8;
                  const x1 = Math.cos(angle) * 15;
                  const y1 = Math.sin(angle) * 15;
                  const x2 = Math.cos(angle) * 20;
                  const y2 = Math.sin(angle) * 20;
                  
                  return (
                    <line
                      key={`burst-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={colorConfig.fill}
                      strokeWidth="1"
                      style={{
                        animation: isInView ? `burstOut 2s ease-out forwards ${i * 0.1}s` : "none"
                      }}
                    />
                  );
                })}
                
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="bold"
                >
                  BREAKTHROUGH
                </text>
              </g>
              
              {/* Labels */}
              <text
                x="250"
                y="180"
                textAnchor="end"
                fill="white"
                fontSize="7"
              >
                INCREASED EFFICIENCY
              </text>
              
              {/* Add required markers and animations */}
              <defs>
                <marker
                  id="arrowMarker"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={colorConfig.fill} />
                </marker>
                
                <style>
                  {`
                    @keyframes particleFlow {
                      0% {
                        transform: translate(0, 0);
                        opacity: 0;
                      }
                      20% {
                        opacity: 1;
                      }
                      100% {
                        transform: translate(0, -120px);
                        opacity: 0;
                      }
                    }
                    
                    @keyframes extendArrow {
                      0% {
                        stroke-dasharray: 0, 40;
                        stroke-dashoffset: 40;
                      }
                      100% {
                        stroke-dasharray: 40, 0;
                        stroke-dashoffset: 0;
                      }
                    }
                    
                    @keyframes burstOut {
                      0% {
                        opacity: 0;
                        stroke-width: 0;
                      }
                      100% {
                        opacity: 1;
                        stroke-width: 1;
                      }
                    }
                  `}
                </style>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </>
  );
}

// CSS animations for the knowledge synthesis visuals
const knowledgeAnimationStyles = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .animate-pulse {
    animation: pulse 2s infinite ease-in-out;
  }
  
  .animate-float {
    animation: float 3s infinite ease-in-out;
  }
`;

export { KnowledgeSynthesisSections }; 