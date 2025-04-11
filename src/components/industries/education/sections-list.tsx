"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  FileEdit, 
  BarChart
} from "lucide-react";

// Define the interfaces
interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

// Create the icon map
const iconMap = {
  BookOpen,
  Users,
  Sparkles,
  FileEdit,
  BarChart
};

// Create the color map
const colorMap = {
  green: {
    primary: "#10B981",
    secondary: "#059669",
    gradientFrom: "from-green-500/20",
    gradientTo: "to-green-600/20",
    gradientFromDarker: "from-green-500/40",
    gradientToDarker: "to-green-600/40",
    border: "border-green-500/30",
    text: "text-green-500",
    shadow: "group-hover:shadow-green-500/30",
    fill: "#10B981"
  },
  amber: {
    primary: "#F59E0B",
    secondary: "#D97706",
    gradientFrom: "from-amber-500/20",
    gradientTo: "to-amber-600/20",
    gradientFromDarker: "from-amber-500/40",
    gradientToDarker: "to-amber-600/40",
    border: "border-amber-500/30",
    text: "text-amber-500",
    shadow: "group-hover:shadow-amber-500/30",
    fill: "#F59E0B"
  },
  purple: {
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-purple-600/20",
    gradientFromDarker: "from-purple-500/40",
    gradientToDarker: "to-purple-600/40",
    border: "border-purple-500/30",
    text: "text-purple-500",
    shadow: "group-hover:shadow-purple-500/30",
    fill: "#8B5CF6"
  },
  blue: {
    primary: "#3B82F6",
    secondary: "#2563EB",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-blue-600/20",
    gradientFromDarker: "from-blue-500/40",
    gradientToDarker: "to-blue-600/40",
    border: "border-blue-500/30",
    text: "text-blue-500",
    shadow: "group-hover:shadow-blue-500/30",
    fill: "#3B82F6"
  }
};

// Section component
function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  const Icon = iconMap[icon as keyof typeof iconMap];
  
  return (
    <div 
      ref={ref}
      className={`flex flex-col ${imageSide === "left" ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 py-12 md:py-24 items-center`}
    >
      {/* Content */}
      <div className="flex-1 space-y-4">
        <div className={`inline-flex items-center gap-2 ${colorConfig.text}`}>
          <Icon size={20} />
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        </div>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
      
      {/* Visual */}
      <div className="flex-1 w-full">
        <EducationVisual 
          index={index} 
          colorConfig={colorConfig} 
          isInView={isInView} 
        />
      </div>
    </div>
  );
}

// Main component export
export function EducationSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-0">
        {sections.map((section, index) => (
          <Section 
            key={index}
            {...section}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

// Visual Component that renders different visualizations based on the index
function EducationVisual({ 
  index, 
  colorConfig, 
  isInView 
}: { 
  index: number; 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Render different visualizations based on the section index
  switch (index) {
    case 0:
      return <ResearchVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <AdaptiveLearningVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <StudentProjectsVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <CurriculumVisual colorConfig={colorConfig} isInView={isInView} />;
    case 4:
      return <InstitutionalInsightsVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return null;
  }
}

// Research Visualization Component
function ResearchVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-80 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-5 relative">
        {/* Research Papers and Sources */}
        <div 
          className={`absolute left-5 top-5 w-48 h-64 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Research Sources</div>
          {[1, 2, 3, 4, 5].map((index) => (
            <div 
              key={index} 
              className="flex items-center mb-2.5 transition-all duration-500"
              style={{ transitionDelay: `${300 + index * 100}ms` }} 
            >
              <div className={`w-1.5 h-1.5 rounded-full ${colorConfig.text} mr-2`}></div>
              <div className={`h-2.5 ${isInView ? 'w-full' : 'w-0'} bg-gray-700 rounded transition-all duration-500`} 
                   style={{ transitionDelay: `${400 + index * 150}ms` }}></div>
            </div>
          ))}
          
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-xs uppercase tracking-wider font-semibold mb-1 text-gray-400">Source Types</div>
            <div className="grid grid-cols-2 gap-1.5">
              {['Academic', 'Journals', 'Books', 'Articles'].map((type, i) => (
                <div 
                  key={i} 
                  className={`text-xs px-2 py-1 rounded bg-gray-800 border ${colorConfig.border} ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Extraction Process in the Center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          {/* Connection Lines */}
          <svg 
            width="300" 
            height="200" 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000"
            style={{ opacity: isInView ? 1 : 0, transitionDelay: '300ms' }}
          >
            {/* Left to Center */}
            <path 
              d={`M 10,70 Q 80,70 140,85`} 
              stroke={colorConfig.primary} 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,3"
              className={`transition-all duration-1000 ${isInView ? 'opacity-70' : 'opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            />
            
            {/* Center to Right */}
            <path 
              d={`M 140,85 Q 220,70 290,70`} 
              stroke={colorConfig.primary} 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="5,3"
              className={`transition-all duration-1000 ${isInView ? 'opacity-70' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            />
            
            {/* Animated Dots */}
            <circle 
              cx="80" 
              cy="70" 
              r="3" 
              fill={colorConfig.primary} 
              className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            >
              <animate attributeName="cx" values="10;120" dur="2s" repeatCount="indefinite" begin={isInView ? '0s' : 'indefinite'} />
            </circle>
            
            <circle 
              cx="220" 
              cy="70" 
              r="3" 
              fill={colorConfig.primary} 
              className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            >
              <animate attributeName="cx" values="180;290" dur="2s" repeatCount="indefinite" begin={isInView ? '0.5s' : 'indefinite'} />
            </circle>
          </svg>
          
          {/* Central Processing Hub */}
          <div 
            className={`w-24 h-24 rounded-full bg-gray-800 border-2 ${isInView ? 'border-opacity-100' : 'border-opacity-0'} transition-all duration-700`}
            style={{ 
              borderColor: colorConfig.primary, 
              transitionDelay: '500ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div 
                className={`w-16 h-16 rounded-full relative overflow-hidden transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colorConfig.primary} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={colorConfig.secondary} stopOpacity="0.5" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="url(#processGradient)" />
                    
                    {/* Rotating Processing Segments */}
                    <g className={isInView ? 'animate-spin' : ''} style={{ transformOrigin: 'center', animationDuration: '8s' }}>
                      <path d="M 50,50 L 90,50 A 40,40 0 0,1 75,84 z" fill={colorConfig.primary} fillOpacity="0.2" />
                      <path d="M 50,50 L 75,84 A 40,40 0 0,1 25,84 z" fill={colorConfig.primary} fillOpacity="0.3" />
                      <path d="M 50,50 L 25,84 A 40,40 0 0,1 10,50 z" fill={colorConfig.primary} fillOpacity="0.4" />
                    </g>
                    
                    <circle cx="50" cy="50" r="15" fill={colorConfig.primary} fillOpacity="0.5" />
                    <circle cx="50" cy="50" r="10" fill={colorConfig.primary} fillOpacity="0.7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`mt-3 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '700ms' }}
          >
            AI Analysis Engine
          </div>
        </div>
        
        {/* Structured Output */}
        <div 
          className={`absolute right-5 top-5 w-48 h-64 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Structured Insights</div>
          
          {/* Key Findings */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1`}>Key Findings</div>
            <div className="space-y-1">
              {[1, 2].map((i) => (
                <div key={i} className="h-2 bg-gray-700 rounded w-full"></div>
              ))}
            </div>
          </div>
          
          
          {/* Relevance Meter */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1`}>Relevance</div>
            <div className="h-3 bg-gray-700 rounded-full w-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isInView ? 'w-4/5' : 'w-0'}`}
                style={{ 
                  backgroundColor: colorConfig.primary,
                  transitionDelay: '1200ms'
                }}
              ></div>
            </div>
          </div>
          
          {/* Citations */}
          <div 
            className={`absolute bottom-3 left-3 right-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1`}>Auto-Generated Citations</div>
            <div className="space-y-1.5">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${colorConfig.text}`}></div>
                  <div className="h-2 bg-gray-700 rounded flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Adaptive Learning Visualization Component
function AdaptiveLearningVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Student Profile Section */}
        <div 
          className={`absolute left-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Student Learning Profile</div>
          
          {/* Student Avatar */}
          <div className="flex items-center mb-3">
            <div 
              className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center ${colorConfig.text} mr-2 transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <Users size={16} />
            </div>
            <div 
              className={`h-2.5 w-20 bg-gray-700 rounded transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '400ms' }}
            ></div>
          </div>
          
          {/* Learning Style */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Learning Style</div>
            <div className="flex gap-1.5">
              {['Visual', 'Interactive', 'Applied'].map((style, i) => (
                <div 
                  key={i} 
                  className={`text-xs px-2 py-0.5 rounded bg-gray-800 border ${colorConfig.border} ${colorConfig.text} text-center transition-all duration-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  {style}
                </div>
              ))}
            </div>
          </div>
          
          {/* Proficiency Levels */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Proficiency Levels</div>
            <div className="space-y-2">
              {[
                { label: 'Algebra', level: '85%' },
                { label: 'Calculus', level: '62%' },
                { label: 'Statistics', level: '78%' }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{item.label}</span>
                    <span 
                      className={`${colorConfig.text} transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${800 + i * 100}ms` }}
                    >
                      {item.level}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? item.level : '0%',
                        backgroundColor: colorConfig.primary,
                        transitionDelay: `${800 + i * 150}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Learning Pace */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Learning Pace</div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Slower</span>
              <span>Average</span>
              <span>Faster</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full w-full mt-1 relative">
              <div 
                className={`absolute h-3 w-3 rounded-full top-1/2 transform -translate-y-1/2 transition-all duration-700 ease-out`}
                style={{ 
                  left: isInView ? 'calc(72% - 3px)' : '0%',
                  backgroundColor: colorConfig.primary,
                  transitionDelay: '1100ms',
                  boxShadow: isInView ? `0 0 8px ${colorConfig.primary}` : 'none'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Adaptive Content Generator in Center */}
        <div 
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-lg bg-gray-800 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{ transitionDelay: '600ms' }}
        >
          {/* Animated Processing */}
          <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
            {/* Radar-like Animation */}
            <div 
              className={`absolute inset-0 ${isInView ? 'animate-ping' : ''} bg-transparent rounded-lg`}
              style={{ 
                border: `2px solid ${colorConfig.primary}`, 
                animationDuration: '3s', 
                opacity: 0.3 
              }}
            ></div>
            
            {/* Central Icon */}
            <div 
              className={`relative z-10 w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center transition-transform duration-700 ${isInView ? 'scale-100' : 'scale-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <defs>
                  <linearGradient id="adaptiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorConfig.primary} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={colorConfig.secondary} stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                
                {/* Brain Visualization */}
                <path 
                  d="M20,5 C12,5 5,12 5,20 C5,28 12,35 20,35 C28,35 35,28 35,20 C35,12 28,5 20,5 Z M15,14 C17,12 23,12 25,14 M25,14 C28,16 28,24 25,26 M25,26 C23,28 17,28 15,26 M15,26 C12,24 12,16 15,14 M16,18 C18,16 22,16 24,18 M24,18 C26,20 26,24 24,26 M24,26 C22,28 18,28 16,26 M16,26 C14,24 14,20 16,18 M18,22 C19,21 21,21 22,22 M22,22 C23,23 23,25 22,26 M22,26 C21,27 19,27 18,26 M18,26 C17,25 17,23 18,22"
                  fill="none"
                  stroke="url(#adaptiveGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={isInView ? 'animate-pulse' : ''}
                  style={{ animationDuration: '3s' }}
                />
              </svg>
            </div>
            
            {/* Connection Points */}
            <svg 
              width="200" 
              height="200" 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              {/* Data Flow Paths */}
              <path 
                d="M-48,-10 Q-24,-35 0,0" 
                stroke={colorConfig.primary} 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="3,2"
                className={`transition-all duration-700 ${isInView ? 'opacity-70' : 'opacity-0'}`}
                style={{ transitionDelay: '900ms' }}
              />
              
              <path 
                d="M0,0 Q24,35 48,10" 
                stroke={colorConfig.primary} 
                strokeWidth="1.5" 
                fill="none" 
                strokeDasharray="3,2"
                className={`transition-all duration-700 ${isInView ? 'opacity-70' : 'opacity-0'}`}
                style={{ transitionDelay: '1000ms' }}
              />
              
              {/* Animated Particles */}
              <circle 
                cx="-24" 
                cy="-20" 
                r="2" 
                fill={colorConfig.primary} 
                className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              >
                <animate attributeName="cx" values="-48,-24,0" dur="1.5s" repeatCount="indefinite" begin={isInView ? '0s' : 'indefinite'} />
                <animate attributeName="cy" values="-10,-20,0" dur="1.5s" repeatCount="indefinite" begin={isInView ? '0s' : 'indefinite'} />
              </circle>
              
              <circle 
                cx="24" 
                cy="20" 
                r="2" 
                fill={colorConfig.primary} 
                className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              >
                <animate attributeName="cx" values="0,24,48" dur="1.5s" repeatCount="indefinite" begin={isInView ? '0.5s' : 'indefinite'} />
                <animate attributeName="cy" values="0,20,10" dur="1.5s" repeatCount="indefinite" begin={isInView ? '0.5s' : 'indefinite'} />
              </circle>
            </svg>
          </div>
          
          {/* Label */}
          <div 
            className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center whitespace-nowrap transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            Adaptive Learning Engine
          </div>
        </div>
        
        {/* Personalized Learning Content */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Personalized Learning Path</div>
          
          {/* Current Lesson */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1.5`}>
              <div className={`w-2 h-2 rounded-full animate-pulse bg-${colorConfig.text.split('-')[1]}-500`}></div>
              <span>Current Lesson</span>
            </div>
            <div className={`p-2 rounded bg-gray-800 border ${colorConfig.border}`}>
              <div className="h-2.5 w-24 bg-gray-700 rounded mb-1.5"></div>
              <div className="h-2 w-full bg-gray-700 rounded mb-1"></div>
              <div className="h-2 w-4/5 bg-gray-700 rounded"></div>
            </div>
          </div>
          
          {/* Next Topics - Adaptive Recommendations */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Recommended Next</div>
            <div className="space-y-2">
              {[
                { difficulty: 'Challenging', priority: 'high' },
                { difficulty: 'Reinforcement', priority: 'medium' },
                { difficulty: 'Extension', priority: 'low' },
              ].map((topic, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-1.5 rounded bg-gray-800 border border-gray-700 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${1000 + i * 100}ms` }}
                >
                  <div className="flex-1">
                    <div className="h-2 w-16 bg-gray-700 rounded mb-1"></div>
                    <div className="flex items-center gap-1">
                      <div 
                        className={`text-xs px-1.5 rounded text-${topic.priority === 'high' ? colorConfig.text.split('-')[1] : 'gray'}-${topic.priority === 'high' ? '400' : '500'} border border-${topic.priority === 'high' ? colorConfig.text.split('-')[1] : 'gray'}-${topic.priority === 'high' ? '500' : '600'}`}
                      >
                        {topic.difficulty}
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full`}
                    style={{ 
                      backgroundColor: topic.priority === 'high' 
                        ? colorConfig.primary 
                        : topic.priority === 'medium'
                          ? colorConfig.secondary
                          : '#6B7280'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Engagement Metrics */}
          <div 
            className={`mt-2 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Current Engagement</div>
            <div className="flex items-center gap-1">
              {['Low', 'Medium', 'High'].map((level, i) => (
                <div 
                  key={i} 
                  className={`flex-1 text-center text-xs py-1 rounded ${i === 2 ? `bg-${colorConfig.text.split('-')[1]}-500 bg-opacity-20 ${colorConfig.text}` : 'text-gray-500 bg-gray-800'} transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${1200 + i * 100}ms` }}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Projects Visualization Component
function StudentProjectsVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Project Dashboard */}
        <div 
          className={`absolute left-4 top-4 w-64 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-3 text-gray-400">Student Project Assistant</div>
          
          {/* Project Timeline */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Project Timeline</div>
            <div className="flex items-center gap-1">
              {['Research', 'Draft', 'Review', 'Final'].map((phase, i) => (
                <div key={i} className="flex-1 relative">
                  <div 
                    className={`h-1 ${i <= 1 ? colorConfig.text : 'bg-gray-700'} rounded-full transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  ></div>
                  <div 
                    className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${i <= 1 ? `bg-${colorConfig.text.split('-')[1]}-500` : 'bg-gray-700'} transition-all duration-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  ></div>
                  <div 
                    className={`mt-2 text-center text-xs ${i <= 1 ? colorConfig.text : 'text-gray-500'} transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${600 + i * 100}ms` }}
                  >
                    {phase}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current Tasks */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Current Tasks</div>
            <div className="space-y-2">
              {[
                { task: 'Literature Review', complete: true },
                { task: 'Data Collection', complete: true },
                { task: 'Initial Analysis', complete: false },
                { task: 'Draft Introduction', complete: false }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-2 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div 
                    className={`flex-shrink-0 w-4 h-4 rounded-full border ${item.complete ? colorConfig.border : 'border-gray-600'} flex items-center justify-center`}
                  >
                    {item.complete && (
                      <div className={`w-2 h-2 rounded-full ${colorConfig.text.replace('text', 'bg')}`}></div>
                    )}
                  </div>
                  <div className={`text-xs ${item.complete ? 'text-gray-400 line-through' : 'text-gray-300'}`}>
                    {item.task}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Research Sources */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Research Sources</div>
            <div 
              className={`p-2 rounded bg-gray-800 border ${colorConfig.border} border-opacity-30 mb-2 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-gray-300">Academic Papers</span>
                <span className={colorConfig.text}>12</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isInView ? 'w-3/4' : 'w-0'}`}
                  style={{ backgroundColor: colorConfig.primary }}
                ></div>
              </div>
            </div>
            
            <div 
              className={`p-2 rounded bg-gray-800 border ${colorConfig.border} border-opacity-30 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '900ms' }}
            >
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-gray-300">Datasets</span>
                <span className={colorConfig.text}>4</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isInView ? 'w-1/2' : 'w-0'}`}
                  style={{ backgroundColor: colorConfig.primary }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Assistant Feedback Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-3 text-gray-400">AI Feedback Assistant</div>
          
          {/* Current Draft Analysis */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Draft Analysis</div>
            
            <div className="space-y-2">
              {[
                { label: 'Clarity', score: 85 },
                { label: 'Evidence', score: 72 },
                { label: 'Structure', score: 90 }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex justify-between text-xs transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${600 + i * 100}ms` }}
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className={colorConfig.text}>{item.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.score}%` : '0%',
                        backgroundColor: colorConfig.primary,
                        transitionDelay: `${700 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Improvement Suggestions */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Suggestions</div>
            <div className="space-y-2">
              {[
                'Add more quantitative evidence',
                'Strengthen literature connections',
                'Consider counterarguments'
              ].map((suggestion, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                  style={{ transitionDelay: `${900 + i * 100}ms` }}
                >
                  <div className={`flex-shrink-0 w-3 h-3 mt-0.5 rounded-full ${colorConfig.text.replace('text', 'bg')} opacity-70`}></div>
                  <div className="text-xs text-gray-300">{suggestion}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Citation Help */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-2`}>Citation Assistant</div>
            <div 
              className={`p-2 rounded bg-gray-800 border ${colorConfig.border} border-opacity-30 text-xs text-gray-300 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              All citations formatted correctly in APA style
              <div className={`mt-1 flex items-center gap-1 text-xs ${colorConfig.text}`}>
                <Sparkles size={12} />
                <span>Auto-fix 3 inconsistencies</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI - Project Connection in the Middle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Connection Lines */}
          <svg 
            width="480" 
            height="200" 
            className="absolute"
            style={{ opacity: isInView ? 1 : 0, transitionDelay: '300ms', transition: 'opacity 1s ease-in-out' }}
          >
          </svg>
          
          {/* Central AI Assistant */}
          <div 
            className={`w-32 h-32 rounded-full bg-gray-800 border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* Pulse Animation */}
            <div 
              className={`absolute inset-0 rounded-full border-4 ${colorConfig.border} animate-ping`}
              style={{ animationDuration: '3s', opacity: 0.2 }}
            ></div>
            
            {/* Brain Icon */}
            <div 
              className={`w-16 h-16 transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <svg viewBox="0 0 50 50" className="w-full h-full">
                <defs>
                  <linearGradient id="assistantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colorConfig.primary} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={colorConfig.secondary} stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                
                {/* Central Circle */}
                <circle cx="25" cy="25" r="15" fill="url(#assistantGradient)" />
                
                {/* Spark Lines */}
                <g className={isInView ? 'animate-pulse' : ''} style={{ animationDuration: '2s' }}>
                  <path d="M25,10 L25,5" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M25,45 L25,40" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M10,25 L5,25" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M45,25 L40,25" stroke={colorConfig.primary} strokeWidth="1.5" />
                  
                  <path d="M15,15 L10,10" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M35,35 L40,40" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M15,35 L10,40" stroke={colorConfig.primary} strokeWidth="1.5" />
                  <path d="M35,15 L40,10" stroke={colorConfig.primary} strokeWidth="1.5" />
                </g>
                
                {/* AI Symbol */}
                <text x="25" y="29" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="10" fontWeight="bold">AI</text>
              </svg>
            </div>
          </div>
          
          <div 
            className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '900ms' }}
          >
            Smart Project Assistant
          </div>
        </div>
      </div>
    </div>
  );
}

// Curriculum Visualization Component
function CurriculumVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Course Builder Panel */}
        <div 
          className={`absolute left-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">AI Curriculum Builder</div>
          
          {/* Module Structure */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Course Structure</div>
            <div className="space-y-2">
              {[
                { module: 'Module 1: Foundations', expanded: true },
                { module: 'Module 2: Core Concepts', expanded: true },
                { module: 'Module 3: Advanced Topics', expanded: false },
                { module: 'Module 4: Applications', expanded: false }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded bg-gray-800 border ${item.expanded ? colorConfig.border : 'border-gray-700'} transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-300 truncate max-w-[170px]">{item.module}</div>
                    <div className={`w-3 h-3 rounded-full ${item.expanded ? colorConfig.text.replace('text', 'bg') : 'bg-gray-600'}`}></div>
                  </div>
                  
                  {item.expanded && (
                    <div 
                      className={`mt-2 space-y-1.5 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${500 + i * 100}ms` }}
                    >
                      {[1, 2, 3].map((lesson) => (
                        <div key={lesson} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                          <div className="h-1.5 w-full bg-gray-700 rounded"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Learning Outcomes */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1.5`}>
              <FileEdit size={12} />
              <span>Learning Outcomes</span>
            </div>
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-2 bg-gray-700 rounded w-full transition-all duration-300 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                  style={{ 
                    transformOrigin: 'left',
                    transitionDelay: `${900 + i * 100}ms` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* AI Analysis Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Curriculum Analytics</div>
          
          {/* Student Performance */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Content Effectiveness</div>
            <div className="space-y-2.5">
              {[
                { topic: 'Core Concept A', score: 92 },
                { topic: 'Interactive Module B', score: 78 },
                { topic: 'Assessment Section C', score: 65 }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex justify-between text-xs transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${600 + i * 100}ms` }}
                  >
                    <span className="text-gray-400 truncate mr-2">{item.topic}</span>
                    <span className={colorConfig.text}>{item.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.score}%` : '0%',
                        backgroundColor: colorConfig.primary,
                        transitionDelay: `${700 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Curriculum Recommendations */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>AI Recommendations</div>
            <div className="space-y-2">
              {[
                { type: 'Add more practical exercises', priority: 'high' },
                { type: 'Simplify theoretical section', priority: 'medium' },
                { type: 'Update assessment rubric', priority: 'low' }
              ].map((rec, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                  style={{ transitionDelay: `${1000 + i * 100}ms` }}
                >
                  <div 
                    className={`flex-shrink-0 w-2 h-2 mt-1 rounded-full`}
                    style={{ 
                      backgroundColor: rec.priority === 'high' 
                        ? colorConfig.primary 
                        : rec.priority === 'medium'
                          ? colorConfig.secondary
                          : '#6B7280'
                    }}
                  ></div>
                  <div className="text-xs text-gray-300">{rec.type}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Industry Alignment */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Industry Alignment</div>
            <div className="flex items-center gap-1">
              {['Low', 'Medium', 'High'].map((level, i) => (
                <div 
                  key={i} 
                  className={`flex-1 text-center text-xs py-1 rounded ${i === 2 ? `bg-${colorConfig.text.split('-')[1]}-500 bg-opacity-20 ${colorConfig.text}` : 'text-gray-500 bg-gray-800'} transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${1200 + i * 100}ms` }}
                >
                  {level}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* AI Curriculum Generation Visualization in the Middle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          
          
          {/* Central AI Curriculum Generator */}
          <div 
            className={`w-36 h-36 bg-gray-800 rounded-lg border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* AI Document Generator Animation */}
            <div 
              className={`w-24 h-24 relative transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Document Page Stack */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background Pages */}
                <div 
                  className={`absolute w-20 h-24 rounded-lg bg-gray-700 transform rotate-[-8deg] transition-all duration-300 ${isInView ? 'opacity-60 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                  style={{ transitionDelay: '900ms' }}
                ></div>
                <div 
                  className={`absolute w-20 h-24 rounded-lg bg-gray-600 transform rotate-[8deg] transition-all duration-300 ${isInView ? 'opacity-60 translate-x-0' : 'opacity-0 translate-x-2'}`}
                  style={{ transitionDelay: '950ms' }}
                ></div>
                
                {/* Main Document */}
                <div 
                  className={`w-20 h-24 rounded-lg bg-gray-800 border ${colorConfig.border} relative z-10 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} 
                  style={{ transitionDelay: '1000ms' }}
                >
                  {/* Document Lines */}
                  <div className="absolute left-2 right-2 top-3 space-y-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((line, i) => (
                      <div 
                        key={i} 
                        className={`h-1 bg-gray-700 rounded-full w-full transition-all duration-300 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                        style={{ 
                          transformOrigin: 'left',
                          transitionDelay: `${1050 + i * 50}ms` 
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* AI Generation Indicator */}
                  <div 
                    className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 ${isInView ? 'animate-ping' : ''}`}
                    style={{ animationDuration: '2s' }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-${colorConfig.text.split('-')[1]}-500`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Label */}
          <div 
            className={`absolute  left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            AI Curriculum Generator
          </div>
        </div>
      </div>
    </div>
  );
}

// Institutional Insights Visualization Component
function InstitutionalInsightsVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-110 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Data Dashboard */}
        <div 
          className={`absolute left-4 top-4 w-60 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Institution Analytics</div>
          
          {/* Performance Overview */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1.5`}>
              <BarChart size={12} />
              <span>Performance Overview</span>
            </div>
            
            {/* Chart */}
            <div 
              className="h-20 flex items-end gap-1 pt-1.5 pb-0.5 px-0.5"
              style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: '100% 25%',
                backgroundRepeat: 'repeat-y'
              }}
            >
              {[65, 72, 58, 80, 75, 63, 81, 70, 85, 78, 90, 88].map((value, i) => (
                <div 
                  key={i} 
                  className="flex-1 flex flex-col items-center"
                >
                  <div 
                    className={`w-full transition-all duration-500 rounded-t-sm ${isInView ? `h-[${value}%]` : 'h-0'}`}
                    style={{ 
                      backgroundColor: colorConfig.primary,
                      height: isInView ? `${value}%` : '0%',
                      transitionDelay: `${400 + i * 50}ms`,
                      opacity: 0.7 + (i % 3) * 0.1
                    }}
                  ></div>
                  {i % 3 === 0 && (
                    <div 
                      className={`text-[8px] text-gray-400 mt-1 transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${700 + i * 50}ms` }}
                    >
                      {`Q${1 + i / 3}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div 
              className={`flex items-center justify-between text-[8px] text-gray-400 mt-2 transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '850ms' }}
            >
              <span>Last 3 Years</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full bg-${colorConfig.text.split('-')[1]}-500 opacity-80`}></div>
                  <span>Performance</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* At-Risk Students */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>At-Risk Student Detection</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Predicted Dropouts', value: '4.2%', delta: '-2.8%', improved: true },
                { label: 'Failing Courses', value: '7.5%', delta: '-3.1%', improved: true },
                { label: 'Low Engagement', value: '12.8%', delta: '+2.3%', improved: false },
                { label: 'Financial Risk', value: '9.6%', delta: '-1.7%', improved: true }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded bg-gray-800 border border-gray-700 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                  style={{ transitionDelay: `${700 + i * 100}ms` }}
                >
                  <div className="text-[8px] text-gray-400 truncate">{item.label}</div>
                  <div className="flex items-end justify-between mt-1">
                    <div className={`text-xs font-medium ${colorConfig.text}`}>{item.value}</div>
                    <div className={`text-[8px] ${item.improved ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                      {item.improved ? '↓' : '↑'} {item.delta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Department Effectiveness */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Department Effectiveness</div>
            <div className="space-y-1.5">
              {[
                { dept: 'Computer Science', score: 92 },
                { dept: 'Engineering', score: 87 },
                { dept: 'Business', score: 78 },
                { dept: 'Humanities', score: 74 }
              ].map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div 
                    className={`flex justify-between text-xs transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${1000 + i * 100}ms` }}
                  >
                    <span className="text-[8px] text-gray-400 truncate">{item.dept}</span>
                    <span className={`text-[8px] ${colorConfig.text}`}>{item.score}%</span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.score}%` : '0%',
                        backgroundColor: colorConfig.primary,
                        transitionDelay: `${1100 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Predictive Insights Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Predictive Analytics</div>
          
          {/* Enrollment Forecast */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Enrollment Forecast</div>
            <div 
              className={`h-16 relative transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              {/* Line Chart */}
              <svg width="100%" height="100%" viewBox="0 0 200 60">
                {/* Grid Lines */}
                <line x1="0" y1="15" x2="200" y2="15" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="0" y1="45" x2="200" y2="45" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Trend Line */}
                <path 
                  d={`M 10,40 C 30,45 50,35 70,30 C 90,25 110,15 130,20 C 150,25 170,15 190,10`} 
                  fill="none" 
                  stroke={colorConfig.primary} 
                  strokeWidth="2"
                  className={`transition-all duration-1000 ${isInView ? 'opacity-70 stroke-dashoffset-0' : 'opacity-0 stroke-dashoffset-[300px]'}`}
                  style={{ 
                    strokeDasharray: '300px',
                    strokeDashoffset: isInView ? '0px' : '300px',
                    transitionDelay: '700ms' 
                  }}
                />
                
                {/* Forecast Area */}
                <path 
                  d={`M 130,20 C 150,25 170,15 190,10 L 190,60 L 130,60 Z`} 
                  fill={colorConfig.primary} 
                  fillOpacity="0.1"
                  className={`transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: '900ms' }}
                />
                
                {/* Forecast Indicator */}
                <line x1="130" y1="0" x2="130" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="4,2" />
                <text x="135" y="58" fill="#9CA3AF" fontSize="6">Forecast</text>
              </svg>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { label: 'Next Year', value: '+8.5%', positive: true },
                { label: '5-Year Trend', value: '+12.3%', positive: true }
              ].map((metric, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded bg-gray-800 border border-gray-700 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${1000 + i * 100}ms` }}
                >
                  <div className="text-[8px] text-gray-400">{metric.label}</div>
                  <div className={`text-xs ${metric.positive ? 'text-green-400' : 'text-red-400'} font-medium`}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Resource Optimization */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Resource Optimization</div>
            
            {/* Recommendations */}
            <div className="space-y-1.5">
              {[
                { action: 'Increase faculty in CS dept', impact: 'High' },
                { action: 'Reallocate lab resources', impact: 'Medium' },
                { action: 'Update financial aid strategy', impact: 'High' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${900 + i * 100}ms` }}
                >
                  <div 
                    className={`flex-shrink-0 w-2 h-2 mt-1 rounded-full`}
                    style={{ 
                      backgroundColor: item.impact === 'high' 
                        ? colorConfig.primary 
                        : item.impact === 'medium'
                          ? colorConfig.secondary
                          : '#6B7280'
                    }}
                  ></div>
                  <div className="text-xs text-gray-300">{item.action}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cost Reduction */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Projected Savings</div>
            <div className="flex items-center gap-2">
              <div 
                className={`h-16 w-16 relative transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: '1200ms' }}
              >
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeDasharray="100"
                  />
                  <path 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={colorConfig.primary}
                    strokeWidth="2"
                    strokeDasharray="100"
                    strokeDashoffset={isInView ? "32" : "100"}
                    className="transition-all duration-1500 ease-out"
                    style={{ transitionDelay: '1300ms' }}
                  />
                  <text x="18" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                    68%
                  </text>
                </svg>
              </div>
              
              <div className="flex-1 space-y-2">
                <div 
                  className={`transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: '1400ms' }}
                >
                  <div className="text-[8px] text-gray-400">Annual Reduction</div>
                  <div className={`text-sm font-medium ${colorConfig.text}`}>$1.2M</div>
                </div>
                <div 
                  className={`transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: '1500ms' }}
                >
                  <div className="text-[8px] text-gray-400">5-Year Projection</div>
                  <div className={`text-sm font-medium ${colorConfig.text}`}>$6.8M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Central Institutional Intelligence Hub */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          
          {/* Central AI Curriculum Generator */}
          <div 
            className={`w-36 h-36 bg-gray-800 rounded-lg border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* AI Document Generator Animation */}
            <div 
              className={`w-24 h-24 relative transition-all duration-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Document Page Stack */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background Pages */}
                <div 
                  className={`absolute w-20 h-24 rounded-lg bg-gray-700 transform rotate-[-8deg] transition-all duration-300 ${isInView ? 'opacity-60 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                  style={{ transitionDelay: '900ms' }}
                ></div>
                <div 
                  className={`absolute w-20 h-24 rounded-lg bg-gray-600 transform rotate-[8deg] transition-all duration-300 ${isInView ? 'opacity-60 translate-x-0' : 'opacity-0 translate-x-2'}`}
                  style={{ transitionDelay: '950ms' }}
                ></div>
                
                {/* Main Document */}
                <div 
                  className={`w-20 h-24 rounded-lg bg-gray-800 border ${colorConfig.border} relative z-10 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} 
                  style={{ transitionDelay: '1000ms' }}
                >
                  {/* Document Lines */}
                  <div className="absolute left-2 right-2 top-3 space-y-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((line, i) => (
                      <div 
                        key={i} 
                        className={`h-1 bg-gray-700 rounded-full w-full transition-all duration-300 ${isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                        style={{ 
                          transformOrigin: 'left',
                          transitionDelay: `${1050 + i * 50}ms` 
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* AI Generation Indicator */}
                  <div 
                    className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 ${isInView ? 'animate-ping' : ''}`}
                    style={{ animationDuration: '2s' }}
                  >
                    <div className={`w-3 h-3 rounded-full bg-${colorConfig.text.split('-')[1]}-500`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Label */}
          <div 
            className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            Institutional Intelligence
          </div>
        </div>
      </div>
    </div>
  );
} 