"use client";

import { JSX, useRef } from "react";
import { useInView } from "framer-motion";
import { 
  BarChart, 
  CheckCircle, 
  Shield, 
  Scale, 
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  Filter,
  Eye,
  Users,
  Ban,
  AlertCircle
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "purple" | "pink" | "green" | "blue";
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  BarChart: <BarChart className="h-full w-full" />,
  CheckCircle: <CheckCircle className="h-full w-full" />,
  Shield: <Shield className="h-full w-full" />,
  Scale: <Scale className="h-full w-full" />,
  AlertTriangle: <AlertTriangle className="h-full w-full" />,
  ShieldCheck: <ShieldCheck className="h-full w-full" />,
  FileCheck: <FileCheck className="h-full w-full" />,
  Filter: <Filter className="h-full w-full" />,
  Eye: <Eye className="h-full w-full" />,
  Users: <Users className="h-full w-full" />,
  Ban: <Ban className="h-full w-full" />,
  AlertCircle: <AlertCircle className="h-full w-full" />,
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
};

// Main export component
export default function ContentModerationSections({ sections }: { sections: SectionProps[] }) {
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
            <ContentModerationVisual 
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

// Define the ContentModerationVisual component
interface VisualProps {
  index: number;
  color: string;
  isInView: boolean;
}

function ContentModerationVisual({ index, color, isInView }: VisualProps) {
  const colorConfig = colorMap[color as keyof typeof colorMap];
  
  // Create different visualizations based on the section index
  switch(index) {
    case 0: // Detect Misinformation Before It Spreads
      return (
        <>
          <style jsx global>{moderationAnimationStyles}</style>
          <div className="w-full max-w-[500px]">
            <div className="relative h-full w-full">
              {/* Misinformation detection visualization */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="url(#blueGradient)" opacity="0.5" />
                
                {/* Network of information nodes */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.5s"
                }}>
                  {/* Central detection hub */}
                  <circle 
                    cx="200" 
                    cy="150" 
                    r="30" 
                    fill="#222" 
                    stroke={colorConfig.fill} 
                    strokeWidth="2" 
                  />
                  <text x="200" y="145" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">PULP</text>
                  <text x="200" y="155" fill="white" fontSize="7" textAnchor="middle">DETECTION</text>
                  
                  {/* Information nodes - green/safe, red/misleading */}
                  {[
                    { x: 90, y: 80, type: "safe", label: "Valid Source", delay: 0.7 },
                    { x: 310, y: 80, type: "misleading", label: "Citation Bias", delay: 0.8 },
                    { x: 120, y: 200, type: "safe", label: "True Context", delay: 0.9 },
                    { x: 280, y: 200, type: "misleading", label: "Fabricated Claims", delay: 1.0 },
                    { x: 200, y: 50, type: "safe", label: "Verified Facts", delay: 1.1 }
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
                        stroke={node.type === "safe" ? "#22c55e" : "#ef4444"} 
                        strokeWidth="1" 
                        strokeOpacity="0.5" 
                        strokeDasharray={node.type === "safe" ? "none" : "4,2"}
                      />
                      
                      <circle 
                        cx={node.x} 
                        cy={node.y} 
                        r="20" 
                        fill={node.type === "safe" ? "#22c55e22" : "#ef444422"} 
                        stroke={node.type === "safe" ? "#22c55e" : "#ef4444"} 
                        strokeWidth="1"
                      />
                      
                      <text x={node.x} y={node.y} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">
                        {node.label}
                      </text>
                      
                      {node.type === "misleading" && (
                        <circle 
                          cx={node.x} 
                          cy={node.y - 25} 
                          r="6" 
                          fill="#ef4444" 
                          fillOpacity="0.2"
                          stroke="#ef4444"
                          strokeWidth="1"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  ))}
                </g>
                
                {/* Detection rays */}
                {isInView && Array(12).fill(0).map((_, i) => {
                  const angle = (Math.PI * 2 * i) / 12;
                  const r1 = 30;
                  const r2 = 40 + Math.random() * 20;
                  return (
                    <line 
                      key={i}
                      x1={200 + Math.cos(angle) * r1}
                      y1={150 + Math.sin(angle) * r1}
                      x2={200 + Math.cos(angle) * r2}
                      y2={150 + Math.sin(angle) * r2}
                      stroke={colorConfig.fill}
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      style={{
                        animation: `pulse 1.5s infinite ease-in-out ${i * 0.1}s`
                      }}
                    />
                  )
                })}
                
                {/* Analysis overlays */}
                {[
                  { x: 90, y: 120, label: "Rhetoric Analysis", delay: 1.3 },
                  { x: 310, y: 150, label: "Source Verification", delay: 1.4 },
                  { x: 150, y: 230, label: "Context Mapping", delay: 1.5 },
                  { x: 235, y: 90, label: "Pattern Detection", delay: 1.6 }
                ].map((item, i) => (
                  <g 
                    key={i}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.4s ease ${item.delay}s`
                    }}
                  >
                    <rect 
                      x={item.x - 45} 
                      y={item.y - 10} 
                      width="90" 
                      height="20" 
                      rx="10" 
                      fill="#111" 
                      stroke={colorConfig.fill}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text 
                      x={item.x} 
                      y={item.y + 4} 
                      fill="white" 
                      fontSize="7" 
                      textAnchor="middle"
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </>
      );
      
    case 1: // Enforce Policies With Context-Aware AI
      return (
        <>
          <style jsx global>{moderationAnimationStyles}</style>
          <div className="w-full max-w-[500px]">
            <div className="relative h-full w-full">
              {/* Policy enforcement visualization */}
              <svg viewBox="0 0 400 300" className="w-full h-full">

                
                {/* Policy container */}
                <rect 
                  x="50" 
                  y="50" 
                  width="300" 
                  height="200" 
                  rx="10" 
                  fill="#222" 
                  stroke={colorConfig.fill}
                  strokeWidth="1"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 0.5s ease 0.5s"
                  }}
                />
                
                {/* Policy header */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.7s"
                }}>
                  <rect x="70" y="70" width="260" height="30" rx="5" fill="#333" />
                  <text x="80" y="90" fill="white" fontSize="12" fontWeight="bold">Platform Policy Enforcement</text>
                  <circle cx="320" cy="85" r="8" fill={colorConfig.fill} fillOpacity="0.4" />
                </g>
                
                {/* Content analysis zones */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.9s"
                }}>
                  {/* Safe zone */}
                  <rect x="70" y="120" width="110" height="110" rx="5" fill="#22c55e22" stroke="#22c55e" strokeWidth="1" />
                  <text x="125" y="135" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="bold">SAFE</text>
                  <text x="125" y="150" fill="white" fontSize="7" textAnchor="middle">Compliant Content</text>
                  
                  {/* Borderline zone */}
                  <rect x="190" y="120" width="110" height="40" rx="5" fill="#eab30822" stroke="#eab308" strokeWidth="1" />
                  <text x="245" y="135" fill="#eab308" fontSize="10" textAnchor="middle" fontWeight="bold">CONTEXT</text>
                  <text x="245" y="150" fill="white" fontSize="7" textAnchor="middle">Needs Analysis</text>
                  
                  {/* Violation zone */}
                  <rect x="190" y="170" width="110" height="60" rx="5" fill="#ef444422" stroke="#ef4444" strokeWidth="1" />
                  <text x="245" y="190" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">VIOLATION</text>
                  <text x="245" y="205" fill="white" fontSize="7" textAnchor="middle">Policy Breach</text>
                </g>
                
                {/* Context analyzer */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 1.1s"
                }}>
                  <rect x="100" y="170" width="50" height="40" rx="3" fill={colorConfig.fill + "33"} stroke={colorConfig.fill} strokeWidth="1" />
                  <text x="125" y="185" fill="white" fontSize="8" textAnchor="middle">Sarcasm</text>
                  <text x="125" y="195" fill="white" fontSize="7" textAnchor="middle">Detected</text>
                  <line x1="150" y1="190" x2="190" y2="190" stroke={colorConfig.fill} strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrowheadBlue)" />
                </g>
                
                {/* Decision nodes */}
                {[
                  { x: 210, y: 135, type: "context", label: "Academic", delay: 1.3 },
                  { x: 230, y: 135, type: "context", label: "Debate", delay: 1.4 },
                  { x: 280, y: 135, type: "context", label: "Quotation", delay: 1.5 },
                  { x: 210, y: 190, type: "violation", label: "Spam", delay: 1.6 },
                  { x: 280, y: 190, type: "violation", label: "Harmful", delay: 1.7 }
                ].map((node, i) => (
                  <g
                    key={i}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.4s ease ${node.delay}s`
                    }}
                  >
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r="10" 
                      fill="none" 
                      stroke={node.type === "context" ? "#eab308" : "#ef4444"} 
                      strokeWidth="1" 
                    />
                    <text x={node.x} y={node.y + 3} fill="white" fontSize="6" textAnchor="middle">{node.label}</text>
                  </g>
                ))}
                
                {/* Safe content examples */}
                {[
                  { x: 90, y: 180, width: 30 },
                  { x: 90, y: 195, width: 40 },
                  { x: 90, y: 210, width: 25 }
                ].map((line, i) => (
                  <rect 
                    key={i}
                    x={line.x} 
                    y={line.y} 
                    width={line.width} 
                    height="3" 
                    rx="1" 
                    fill="#22c55e44"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.3s ease ${1.3 + i * 0.1}s`
                    }}
                  />
                ))}
                
                {/* Arrow definitions */}
                <defs>
                  <marker
                    id="arrowheadBlue"
                    markerWidth="4"
                    markerHeight="4"
                    refX="3"
                    refY="2"
                    orient="auto"
                  >
                    <path d="M 0 0 L 4 2 L 0 4 Z" fill={colorConfig.fill} />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </>
      );
      
    case 2: // Optimize for Engagement Without Sacrificing Integrity
      return (
        <>
          <style jsx global>{moderationAnimationStyles}</style>
          <div className="w-full max-w-[500px]">
            <div className="relative h-full w-full">
              {/* Engagement-integrity balance visualization */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                
                {/* Balance scale background */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.6s"
                }}>
                  <line x1="200" y1="80" x2="200" y2="160" stroke="#555" strokeWidth="4" />
                  <rect x="180" y="60" width="40" height="20" rx="5" fill="#444" />
                  
                  {/* Fulcrum */}
                  <circle cx="200" cy="160" r="8" fill={colorConfig.fill} />
                  
                  {/* Scale arm - animated to balance */}
                  <line 
                    x1="110" 
                    y1={isInView ? "170" : "180"} 
                    x2="290" 
                    y2={isInView ? "170" : "160"} 
                    stroke="#555" 
                    strokeWidth="4"
                    style={{
                      transformOrigin: "center",
                      transition: "all 1s ease-in-out 1.2s"
                    }}
                  />
                  
                  {/* Left scale pan - Engagement */}
                  <g style={{
                    transform: isInView ? "translateY(-10px)" : "translateY(0)",
                    transition: "transform 1s ease-in-out 1.2s"
                  }}>
                    <circle cx="110" cy="170" r="40" fill="#222" stroke={colorConfig.fill} strokeWidth="1" />
                    <text x="110" y="165" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">ENGAGEMENT</text>
                    <text x="110" y="180" fill="#aaa" fontSize="8" textAnchor="middle">User Interest</text>
                  </g>
                  
                  {/* Right scale pan - Integrity */}
                  <g style={{
                    transform: isInView ? "translateY(-10px)" : "translateY(0)",
                    transition: "transform 1s ease-in-out 1.2s"
                  }}>
                    <circle cx="290" cy="170" r="40" fill="#222" stroke="#22c55e" strokeWidth="1" />
                    <text x="290" y="165" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">INTEGRITY</text>
                    <text x="290" y="180" fill="#aaa" fontSize="8" textAnchor="middle">Policy Compliance</text>
                  </g>
                </g>
                
                {/* Engagement metrics */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.9s"
                }}>
                  <text x="60" y="230" fill={colorConfig.fill} fontSize="10" textAnchor="middle" fontWeight="bold">ENGAGEMENT</text>
                  
                  {/* Metrics bars */}
                  {[
                    { label: "Discussion", value: 82, x: 30 },
                    { label: "Sharing", value: 68, x: 60 },
                    { label: "Time Spent", value: 75, x: 90 }
                  ].map((metric, i) => (
                    <g 
                      key={i}
                      style={{
                        opacity: isInView ? 1 : 0,
                        transition: `opacity 0.4s ease ${1.0 + i * 0.1}s`
                      }}
                    >
                      <text x={metric.x} y="245" fill="white" fontSize="7" textAnchor="middle">{metric.label}</text>
                      <rect x={metric.x - 10} y="250" width="20" height="100" fill="#333" rx="2" />
                      <rect 
                        x={metric.x - 10} 
                        y={350 - metric.value} 
                        width="20" 
                        height={metric.value} 
                        fill={colorConfig.fill} 
                        fillOpacity="0.3"
                        rx="2" 
                      />
                      <text x={metric.x} y="270" fill="white" fontSize="8" textAnchor="middle">{metric.value}%</text>
                    </g>
                  ))}
                </g>
                
                {/* Integrity metrics */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 0.9s"
                }}>
                  <text x="340" y="230" fill="#22c55e" fontSize="10" textAnchor="middle" fontWeight="bold">INTEGRITY</text>
                  
                  {/* Metrics bars */}
                  {[
                    { label: "Accuracy", value: 94, x: 310 },
                    { label: "Compliance", value: 87, x: 340 },
                    { label: "Transparency", value: 90, x: 370 }
                  ].map((metric, i) => (
                    <g 
                      key={i}
                      style={{
                        opacity: isInView ? 1 : 0,
                        transition: `opacity 0.4s ease ${1.0 + i * 0.1}s`
                      }}
                    >
                      <text x={metric.x} y="245" fill="white" fontSize="7" textAnchor="middle">{metric.label}</text>
                      <rect x={metric.x - 10} y="250" width="20" height="100" fill="#333" rx="2" />
                      <rect 
                        x={metric.x - 10} 
                        y={350 - metric.value} 
                        width="20" 
                        height={metric.value} 
                        fill="#22c55e" 
                        fillOpacity="0.3"
                        rx="2" 
                      />
                      <text x={metric.x} y="270" fill="white" fontSize="8" textAnchor="middle">{metric.value}%</text>
                    </g>
                  ))}
                </g>
                
                {/* Optimization arrow */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 1.3s"
                }}>
                  <text x="200" y="240" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">OPTIMIZE</text>
                </g>
              </svg>
            </div>
          </div>
        </>
      );
      
    case 3: // Ensure Ethical, Transparent Governance
      return (
        <>
          <style jsx global>{moderationAnimationStyles}</style>
          <div className="w-full max-w-[500px]">
            <div className="relative h-full w-full">
              {/* Ethical governance visualization */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                
                {/* Governance framework */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.6s ease 0.5s"
                }}>
                  {/* Central governance hub */}
                  <circle cx="200" cy="150" r="40" fill="#222" stroke={colorConfig.fill} strokeWidth="2" />
                  <text x="200" y="145" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">ETHICAL</text>
                  <text x="200" y="160" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">GOVERNANCE</text>
                  
                  {/* Governance pillars */}
                  {[
                    { angle: 0, label: "Transparency", delay: 0.7 },
                    { angle: Math.PI/2, label: "Fairness", delay: 0.8 },
                    { angle: Math.PI, label: "Accountability", delay: 0.9 },
                    { angle: Math.PI*1.5, label: "Explainability", delay: 1.0 }
                  ].map((pillar, i) => {
                    const x = 200 + Math.cos(pillar.angle) * 100;
                    const y = 150 + Math.sin(pillar.angle) * 100;
                    return (
                      <g 
                        key={i}
                        style={{
                          opacity: isInView ? 1 : 0,
                          transform: isInView ? "none" : "scale(0.8)",
                          transition: `all 0.6s ease ${pillar.delay}s`
                        }}
                      >
                        <circle cx={x} cy={y} r="25" fill="#222" stroke={colorConfig.fill} strokeWidth="1.5" />
                        <text x={x} y={y} fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">{pillar.label}</text>
                        
                        <line 
                          x1="200" 
                          y1="150" 
                          x2={200 + Math.cos(pillar.angle) * 70} 
                          y2={150 + Math.sin(pillar.angle) * 70} 
                          stroke={colorConfig.fill} 
                          strokeWidth="1" 
                          strokeOpacity="0.5" 
                          strokeDasharray="4,2"
                        />
                      </g>
                    )
                  })}
                </g>
                
                {/* Policy documents */}
                {[
                  { x: 130, y: 80, label: "Community Guidelines", delay: 1.2 },
                  { x: 280, y: 80, label: "Moderation Processes", delay: 1.3 },
                  { x: 130, y: 220, label: "Appeals System", delay: 1.4 },
                  { x: 280, y: 220, label: "Compliance Reports", delay: 1.5 }
                ].map((doc, i) => (
                  <g 
                    key={i}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transition: `opacity 0.5s ease ${doc.delay}s`
                    }}
                  >
                    <rect 
                      x={doc.x - 40} 
                      y={doc.y - 15} 
                      width="80" 
                      height="30" 
                      rx="3" 
                      fill="#222" 
                      stroke={colorConfig.fill}
                      strokeWidth="1"
                    />
                    <text x={doc.x} y={doc.y} fill="white" fontSize="7" textAnchor="middle">{doc.label}</text>
                    <text x={doc.x} y={doc.y + 10} fill={colorConfig.fill} fontSize="6" textAnchor="middle">DOCUMENTED</text>
                  </g>
                ))}
                
                {/* Decision explanation */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 1.6s"
                }}>
                  <rect x="150" y="250" width="100" height="35" rx="5" fill="#222" stroke="#22c55e" strokeWidth="1" />
                  <text x="200" y="265" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">DECISION</text>
                  <text x="200" y="277" fill="#22c55e" fontSize="6" textAnchor="middle">FULLY EXPLAINED</text>
                  
                  <line x1="200" y1="190" x2="200" y2="245" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2" />
                </g>
                
                {/* Protection shield */}
                <g style={{
                  opacity: isInView ? 1 : 0,
                  transition: "opacity 0.5s ease 1.8s",
                  transformOrigin: "center",
                  animation: isInView ? "pulse 2s infinite ease-in-out" : "none"
                }}>
                  <circle cx="200" cy="150" r="110" fill="none" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.1" />
                  <circle cx="200" cy="150" r="120" fill="none" stroke={colorConfig.fill} strokeWidth="1" strokeOpacity="0.05" />
                </g>
              </svg>
            </div>
          </div>
        </>
      );
      
    default:
      return null;
  }
}

// Add any CSS animations needed for the visualizations
const moderationAnimationStyles = `
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
  
  @keyframes ping {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(2); opacity: 0; }
  }
  
  .animate-pulse {
    animation: pulse 2s infinite ease-in-out;
  }
  
  .animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;

export { ContentModerationSections }; 