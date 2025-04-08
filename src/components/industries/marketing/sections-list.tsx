"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Users, 
  MessageCircle, 
  LineChart, 
  Workflow,
  BarChart, 
  BarChart2, 
  Zap, 
  TrendingUp, 
  Target, 
  Eye,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Check
} from "lucide-react";

// Define the section props interface
interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Users: <Users />,
  MessageCircle: <MessageCircle />,
  LineChart: <LineChart />,
  Workflow: <Workflow />,
  BarChart: <BarChart />,
  BarChart2: <BarChart2 />,
  Zap: <Zap />,
  TrendingUp: <TrendingUp />,
  Target: <Target />,
  Eye: <Eye />,
};

// Color mapping
const colorMap = {
  purple: {
    background: "bg-purple-900/10",
    text: "text-purple-400",
    border: "border-purple-700/50",
    highlight: "text-purple-300",
    primary: "#9333EA", // purple-600
    secondary: "#C084FC", // purple-400
    gradient: "from-purple-700 to-fuchsia-600",
  },
  amber: {
    background: "bg-amber-900/10",
    text: "text-amber-400",
    border: "border-amber-700/50",
    highlight: "text-amber-300",
    primary: "#D97706", // amber-600
    secondary: "#FBBF24", // amber-400
    gradient: "from-amber-600 to-orange-500",
  },
  green: {
    background: "bg-emerald-900/10",
    text: "text-emerald-400",
    border: "border-emerald-700/50",
    highlight: "text-emerald-300",
    primary: "#059669", // emerald-600
    secondary: "#34D399", // emerald-400
    gradient: "from-emerald-600 to-teal-500",
  },
  blue: {
    background: "bg-blue-900/10",
    text: "text-blue-400",
    border: "border-blue-700/50",
    highlight: "text-blue-300",
    primary: "#2563EB", // blue-600
    secondary: "#60A5FA", // blue-400
    gradient: "from-blue-600 to-indigo-500",
  },
};

// Section component
function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const colorConfig = colorMap[color];
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  return (
    <div
      ref={sectionRef} 
      className={`py-24 bg-black`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imageSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          {/* Text Content - 40% width on desktop */}
          <div className={`w-full lg:w-2/5 space-y-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className={`inline-flex items-center gap-2 ${colorConfig.text}`}>
              <div className={`p-2 rounded-lg ${colorConfig.background} border ${colorConfig.border}`}>
                {iconMap[icon]}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>
          
          {/* Visual Component - 60% width on desktop */}
          <div className="w-full lg:w-3/5">
            <MarketingVisual index={index} colorConfig={colorConfig} isInView={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual Component that renders different visualizations based on the index
function MarketingVisual({ 
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
      return <AudienceInsightVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <MessageOptimizationVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <DataToStrategyVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <WorkflowOptimizationVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return null;
  }
}

// Audience Insight Visualization Component
function AudienceInsightVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Audience Analysis Dashboard */}
        <div 
          className={`absolute left-4 top-4 w-64 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Audience Analysis</div>
          
          {/* Sentiment Prediction */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Sentiment Prediction</div>
            <div className="flex items-center gap-1 h-8">
              {[
                { value: -30, label: 'Negative' }, 
                { value: 20, label: 'Neutral' }, 
                { value: 50, label: 'Positive' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex-1 h-full flex flex-col relative"
                >
                  <div className="bg-gray-700 rounded-full h-2 w-full absolute top-0"></div>
                  <div 
                    className={`rounded-full h-2 absolute top-0`}
                    style={{ 
                      width: isInView ? '100%' : '0%',
                      backgroundColor: i === 0 ? '#EF4444' : i === 1 ? '#A3A3A3' : colorConfig.primary,
                      transitionDelay: `${400 + i * 100}ms`,
                      transition: 'width 1s ease-out'
                    }}
                  ></div>
                  <div 
                    className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      left: `${Math.max(10, Math.min(90, 50 + item.value))}%`,
                      backgroundColor: i === 0 ? '#FEE2E2' : i === 1 ? '#F5F5F5' : '#F3E8FF',
                      borderColor: i === 0 ? '#EF4444' : i === 1 ? '#A3A3A3' : colorConfig.primary,
                      transitionDelay: `${700 + i * 100}ms` 
                    }}
                  ></div>
                  <div 
                    className={`absolute -bottom-1 left-1/3 transform -translate-x-2/3 text-[8px] transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      left: `${Math.max(5, Math.min(85, 50 + item.value - 10))}%`,
                      color: i === 0 ? '#FCA5A5' : i === 1 ? '#D4D4D4' : colorConfig.text.split('-')[1],
                      transitionDelay: `${800 + i * 100}ms` 
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Behavioral Signals */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Behavioral Signals</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Engagement Rate', value: '32%', change: '+8%', positive: true },
                { label: 'Return Visits', value: '4.2x', change: '+1.3x', positive: true },
                { label: 'Time on Page', value: '3:45', change: '+0:52', positive: true },
                { label: 'Conversion', value: '5.7%', change: '+2.1%', positive: true }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded bg-gray-800 border border-gray-700 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${700 + i * 100}ms` }}
                >
                  <div className="text-[8px] text-gray-400">{item.label}</div>
                  <div className="flex items-end justify-between">
                    <div className={`text-xs font-medium ${colorConfig.text}`}>{item.value}</div>
                    <div className={`text-[8px] ${item.positive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                      {item.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Response Prediction */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Audience Response Prediction</div>
            <div className="space-y-2">
              {[
                { label: 'Will Click Through', likelihood: 72 },
                { label: 'Will Share Content', likelihood: 41 },
                { label: 'Will Convert', likelihood: 28 }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex justify-between text-[10px] transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${1000 + i * 100}ms` }}
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className={colorConfig.text}>{item.likelihood}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.likelihood}%` : '0%',
                        background: `linear-gradient(90deg, ${colorConfig.primary}80, ${colorConfig.primary})`,
                        transitionDelay: `${1100 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Audience Segments */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Audience Segments</div>
          
          {/* Demographics */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Demographics</div>
            <div className="flex items-center gap-0.5 h-28">
              <div 
                className={`flex-1 h-full relative transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                {/* Age Distribution Chart */}
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect x="10" y="70" width="12" height="20" rx="1" fill={`${colorConfig.primary}50`} />
                  <rect 
                    x="10" y="70" width="12" height="0" rx="1" 
                    fill={colorConfig.primary}
                    style={{ 
                      height: isInView ? '20' : '0',
                      transitionDelay: '700ms', 
                      transition: 'height 1s ease-out' 
                    }}
                  />
                  <text x="16" y="95" textAnchor="middle" fontSize="8" fill="#9CA3AF">18-24</text>
                  
                  <rect x="30" y="50" width="12" height="40" rx="1" fill={`${colorConfig.primary}50`} />
                  <rect 
                    x="30" y="50" width="12" height="0" rx="1" 
                    fill={colorConfig.primary}
                    style={{ 
                      height: isInView ? '40' : '0',
                      transitionDelay: '800ms', 
                      transition: 'height 1s ease-out' 
                    }}
                  />
                  <text x="36" y="95" textAnchor="middle" fontSize="8" fill="#9CA3AF">25-34</text>
                  
                  <rect x="50" y="35" width="12" height="55" rx="1" fill={`${colorConfig.primary}50`} />
                  <rect 
                    x="50" y="35" width="12" height="0" rx="1" 
                    fill={colorConfig.primary}
                    style={{ 
                      height: isInView ? '55' : '0',
                      transitionDelay: '900ms', 
                      transition: 'height 1s ease-out' 
                    }}
                  />
                  <text x="56" y="95" textAnchor="middle" fontSize="8" fill="#9CA3AF">35-44</text>
                  
                  <rect x="70" y="55" width="12" height="35" rx="1" fill={`${colorConfig.primary}50`} />
                  <rect 
                    x="70" y="55" width="12" height="0" rx="1" 
                    fill={colorConfig.primary}
                    style={{ 
                      height: isInView ? '35' : '0',
                      transitionDelay: '1000ms', 
                      transition: 'height 1s ease-out' 
                    }}
                  />
                  <text x="76" y="95" textAnchor="middle" fontSize="8" fill="#9CA3AF">45+</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Interests & Affinities */}
          <div 
            className={`mb-3 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Interests & Affinities</div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Technology', score: 92 },
                { label: 'Innovation', score: 87 },
                { label: 'Productivity', score: 76 },
                { label: 'Finance', score: 64 },
                { label: 'Entertainment', score: 58 }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`py-1 px-2 rounded-full text-[8px] transition-all duration-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ 
                    backgroundColor: `${colorConfig.primary}${20 + Math.floor(item.score / 10) * 5}`,
                    transitionDelay: `${900 + i * 100}ms` 
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          
          {/* Persuasion Patterns */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1`}>
              <span>Persuasion Patterns</span>
              <div className="text-[8px] bg-gray-700 px-1.5 py-0.5 rounded-full">AI Insights</div>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Logic-Based Arguments', effectiveness: 'High', icon: <Check size={12} /> },
                { label: 'Social Proof', effectiveness: 'Medium', icon: <Users size={12} /> },
                { label: 'Scarcity Messaging', effectiveness: 'Low', icon: <AlertTriangle size={12} /> }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${1400 + i * 100}ms` }}
                >
                  <div className="text-[10px] text-gray-300 flex-1 flex items-center gap-1.5">
                    <div className={`p-0.5 rounded ${item.effectiveness === 'High' ? 'bg-green-900/30' : item.effectiveness === 'Medium' ? 'bg-yellow-900/30' : 'bg-red-900/30'}`}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div 
                    className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${item.effectiveness === 'High' ? 'bg-green-900/30 text-green-400' : item.effectiveness === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}
                  >
                    {item.effectiveness}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Central Prediction Engine */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          
          {/* Central Prediction Engine */}
          <div 
            className={`w-36 h-36 bg-gray-800 rounded-full border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* AI Prediction Visualization */}
            <div 
              className={`w-28 h-28 rounded-full transition-all duration-500 relative ${isInView ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Radar/Scanner Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" fill="none" stroke={`${colorConfig.primary}30`} strokeWidth="1" />
                <circle cx="50" cy="50" r="35" fill="none" stroke={`${colorConfig.primary}40`} strokeWidth="1" />
                <circle cx="50" cy="50" r="25" fill="none" stroke={`${colorConfig.primary}50`} strokeWidth="1" />
                
                {/* Scanner Line */}
                <line 
                  x1="50" y1="50" x2="50" y2="5" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  className={isInView ? 'animate-spin' : ''}
                  style={{ transformOrigin: 'center', animationDuration: '4s', animationTimingFunction: 'linear' }}
                />
                
                {/* Pulse Circle */}
                <circle cx="50" cy="50" r="42" fill="none" stroke={colorConfig.primary} strokeWidth="1.5" opacity="0.5" className={isInView ? 'animate-ping' : ''} style={{ animationDuration: '3s' }} />
                
                {/* Data Points */}
                <circle cx="65" cy="30" r="3" fill={colorConfig.primary} fillOpacity="0.7" />
                <circle cx="30" cy="40" r="2" fill={colorConfig.primary} fillOpacity="0.5" />
                <circle cx="75" cy="65" r="2.5" fill={colorConfig.primary} fillOpacity="0.6" />
                <circle cx="40" cy="75" r="3" fill={colorConfig.primary} fillOpacity="0.7" />
                <circle cx="60" cy="60" r="2" fill={colorConfig.primary} fillOpacity="0.5" />
              </svg>
            </div>
          </div>
          
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            Audience Prediction Engine
          </div>
        </div>
      </div>
    </div>
  );
}

// Message Optimization Visualization Component
function MessageOptimizationVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Message Creator Panel */}
        <div 
          className={`absolute left-4 top-4 w-64 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Message Crafting</div>
          
          {/* Message Input Area */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Your Message</div>
            <div className="relative">
              <div 
                className="bg-gray-900 border border-gray-700 rounded-lg p-2 min-h-[70px] text-[10px] text-gray-300 leading-relaxed"
              >
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500`} style={{ transitionDelay: '600ms' }}>Introducing our new AI-powered platform that </span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500 ${colorConfig.highlight}`} style={{ transitionDelay: '1000ms' }}>revolutionizes</span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500`} style={{ transitionDelay: '1200ms' }}> how businesses analyze customer data. </span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500 ${colorConfig.highlight}`} style={{ transitionDelay: '1400ms' }}>Save hours</span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500`} style={{ transitionDelay: '1600ms' }}> of manual work and gain </span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500 ${colorConfig.highlight}`} style={{ transitionDelay: '1800ms' }}>deeper insights</span>
                <span className={`opacity-${isInView ? '100' : '0'} transition-opacity duration-500`} style={{ transitionDelay: '2000ms' }}> than ever before.</span>
              </div>
              
              {/* Cursor Animation */}
              <div 
                className={`absolute top-2 left-2 w-0.5 h-3 ${isInView ? 'animate-pulse' : ''} bg-white`}
                style={{ 
                  left: isInView ? 'calc(100% - 10px)' : '10px',
                  transition: 'left 2.5s ease-out',
                  transitionDelay: '500ms',
                  opacity: isInView ? 1 : 0
                }}
              ></div>
            </div>
          </div>
          
          {/* Message Analysis */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Persuasion Analysis</div>
            <div className="space-y-2">
              {[
                { label: 'Ethos (Credibility)', value: 35 },
                { label: 'Pathos (Emotion)', value: 68 },
                { label: 'Logos (Logic)', value: 52 }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex justify-between text-[10px] transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${800 + i * 100}ms` }}
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className={colorConfig.text}>{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.value}%` : '0%',
                        backgroundColor: i === 0 ? '#4ADE80' : i === 1 ? '#FB7185' : '#60A5FA',
                        transitionDelay: `${900 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Recommendations */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1200ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1`}>
              <span>Optimization Suggestions</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Add concrete examples for credibility', type: 'Ethos', priority: 'High' },
                { label: 'Include cost savings estimate', type: 'Logos', priority: 'Medium' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${1300 + i * 150}ms` }}
                >
                  <div className={`flex-shrink-0 w-2 h-2 mt-1 rounded-full ${item.priority === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <div className="text-[10px] text-gray-300">{item.label}</div>
                    <div className={`text-[8px] ${colorConfig.text} mt-0.5`}>{item.type} Enhancement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Message Analysis Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Audience Reception</div>
          
          {/* Tone Analysis */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Message Tone</div>
            <div className="flex items-center gap-6 h-16">
              <div 
                className={`w-full h-full relative transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                {/* Tone Spectrum */}
                <svg width="100%" height="100%" viewBox="0 0 200 60">
                  {/* Spectrum Background */}
                  <defs>
                    <linearGradient id="toneGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  
                  <rect x="10" y="20" width="180" height="8" rx="4" fill="url(#toneGradient)" opacity="0.3" />
                  
                  {/* Tone Labels */}
                  <text x="10" y="45" textAnchor="middle" fontSize="10" fill="#9CA3AF">Professional</text>
                  <text x="100" y="45" textAnchor="middle" fontSize="10" fill="#9CA3AF">Conversational</text>
                  <text x="190" y="45" textAnchor="middle" fontSize="10" fill="#9CA3AF">Emotional</text>
                  
                  {/* Current Tone Indicator */}
                  <circle 
                    cx="115" 
                    cy="24" 
                    r="6" 
                    fill="#A855F7"
                    stroke="#F3E8FF"
                    strokeWidth="1.5"
                    className={`transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '800ms' }}
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Language Effectiveness */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Language Effectiveness</div>
            
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Clarity', value: '92%', positive: true },
                { label: 'Persuasiveness', value: '78%', positive: true },
                { label: 'Memorability', value: '85%', positive: true },
                { label: 'Call-to-Action', value: '67%', positive: false }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-1.5 rounded bg-gray-800 border border-gray-700 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${900 + i * 100}ms` }}
                >
                  <div className="text-[8px] text-gray-400">{item.label}</div>
                  <div className="flex items-center">
                    <div className={`text-xs font-medium ${item.positive ? colorConfig.text : 'text-amber-400'}`}>{item.value}</div>
                    {!item.positive && (
                      <span className="ml-1.5 text-[8px] bg-amber-900/30 text-amber-400 px-1 rounded">Improve</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Audience Match */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Audience Match</div>
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
                    strokeDashoffset={isInView ? "20" : "100"}
                    className="transition-all duration-1500 ease-out"
                    style={{ transitionDelay: '1300ms' }}
                  />
                  <text x="18" y="21" textAnchor="middle" fill={colorConfig.primary} fontSize="8" fontWeight="bold">
                    80%
                  </text>
                </svg>
              </div>
              
              <div className="flex-1 space-y-2">
                <div 
                  className={`transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: '1400ms' }}
                >
                  <div className="text-[8px] text-gray-400">Top Segment Match</div>
                  <div className={`text-xs ${colorConfig.text}`}>Tech Decision Makers</div>
                </div>
                <div 
                  className={`transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: '1500ms' }}
                >
                  <div className="text-[8px] text-gray-400">Language Alignment</div>
                  <div className={`text-xs ${colorConfig.text}`}>Strong</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message Optimization Engine */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          
          {/* Central Message Optimization Engine */}
          <div 
            className={`w-32 h-32 bg-gray-800 rounded-lg border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* Message Analysis Visualization */}
            <div 
              className={`w-24 h-24 transition-all duration-500 relative ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Text Analysis Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Text Lines Background */}
                <rect x="20" y="20" width="60" height="4" rx="2" fill="#374151" />
                <rect x="20" y="30" width="50" height="4" rx="2" fill="#374151" />
                <rect x="20" y="40" width="55" height="4" rx="2" fill="#374151" />
                <rect x="20" y="50" width="40" height="4" rx="2" fill="#374151" />
                <rect x="20" y="60" width="60" height="4" rx="2" fill="#374151" />
                <rect x="20" y="70" width="45" height="4" rx="2" fill="#374151" />
                
                {/* Highlight Animation */}
                <rect 
                  x="20" 
                  y="20" 
                  width="0" 
                  height="4" 
                  rx="2" 
                  fill={colorConfig.primary}
                  opacity="0.8"
                  className={isInView ? '' : ''}
                >
                  <animate 
                    attributeName="width" 
                    values="0;60;0" 
                    dur="2s" 
                    begin={isInView ? '0s' : 'indefinite'} 
                    repeatCount="indefinite"
                  />
                </rect>
                
                <rect 
                  x="20" 
                  y="40" 
                  width="0" 
                  height="4" 
                  rx="2" 
                  fill={colorConfig.primary}
                  opacity="0.8"
                  className={isInView ? '' : ''}
                >
                  <animate 
                    attributeName="width" 
                    values="0;55;0" 
                    dur="2s" 
                    begin={isInView ? '0.7s' : 'indefinite'} 
                    repeatCount="indefinite"
                  />
                </rect>
                
                <rect 
                  x="20" 
                  y="60" 
                  width="0" 
                  height="4" 
                  rx="2" 
                  fill={colorConfig.primary}
                  opacity="0.8"
                  className={isInView ? '' : ''}
                >
                  <animate 
                    attributeName="width" 
                    values="0;60;0" 
                    dur="2s" 
                    begin={isInView ? '1.4s' : 'indefinite'} 
                    repeatCount="indefinite"
                  />
                </rect>
                
                {/* Spinner Element */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1" 
                  strokeDasharray="10,5"
                  className={isInView ? 'animate-spin' : ''}
                  style={{ 
                    transformOrigin: 'center',
                    animationDuration: '10s',
                    opacity: 0.4
                  }}
                />
              </svg>
            </div>
          </div>
          
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            Message Optimizer
          </div>
        </div>
      </div>
    </div>
  );
}

// Data to Strategy Visualization Component
function DataToStrategyVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-100 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Market Analysis Panel */}
        <div 
          className={`absolute left-4 top-4 w-64 h-80 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Market Intelligence</div>
          
          {/* Real-time Market Trends */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5 flex items-center gap-1`}>
              <LineChart size={12} />
              <span>Real-time Trend Analysis</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-2 h-28">
              <div 
                className={`w-full h-full relative transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                {/* Trend Line Chart */}
                <svg width="100%" height="100%">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100%" y2="20" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="60" x2="100%" y2="60" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="80" x2="100%" y2="80" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2" />
                  
                  {/* Trend Lines */}
                  <path 
                    d={`M 0,70 L 30,65 L 60,40 L 90,30 L 120,35 L 150,20 L 180,25 L 210,10`}
                    fill="none" 
                    stroke={colorConfig.primary} 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="230"
                    strokeDashoffset={isInView ? "0" : "230"}
                    className="transition-all duration-1500 ease-out"
                    style={{ transitionDelay: '500ms' }}
                  />
                  
                  {/* Competitor Trend */}
                  <path 
                    d={`M 0,75 L 30,80 L 60,70 L 90,65 L 120,75 L 150,60 L 180,65 L 210,50`}
                    fill="none" 
                    stroke="#4ADE80" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="230"
                    strokeDashoffset={isInView ? "0" : "230"}
                    className="transition-all duration-1500 ease-out"
                    style={{ transitionDelay: '700ms' }}
                  />
                  
                  {/* Data Points */}
                  {[
                    {x: 0, y: 70},
                    {x: 30, y: 65},
                    {x: 60, y: 40},
                    {x: 90, y: 30},
                    {x: 120, y: 35},
                    {x: 150, y: 20},
                    {x: 180, y: 25},
                    {x: 210, y: 10}
                  ].map((point, i) => (
                    <circle 
                      key={i}
                      cx={point.x} 
                      cy={point.y} 
                      r="3"
                      fill="none"
                      stroke={colorConfig.primary}
                      strokeWidth="1.5"
                      className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${600 + i * 100}ms` }}
                    />
                  ))}
                  
                  {/* Forecast Area */}
                  <path 
                    d={`M 150,20 L 180,25 L 210,10 L 210,100 L 150,100 Z`}
                    fill={colorConfig.primary}
                    fillOpacity="0.1"
                    className={`transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1200ms' }}
                  />
                  
                  {/* "Forecast" Label */}
                  <text 
                    x="180" 
                    y="90" 
                    fontSize="8" 
                    fill={colorConfig.text.split('-')[1]}
                    className={`transition-all duration-300 ${isInView ? 'opacity-70' : 'opacity-0'}`}
                    style={{ transitionDelay: '1300ms' }}
                  >
                    Forecast
                  </text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Competitive Intelligence */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Competitive Intelligence</div>
            <div className="space-y-1.5">
              {[
                { name: 'Your Brand', share: 34, trend: '+5.2%', positive: true },
                { name: 'Competitor A', share: 28, trend: '-1.7%', positive: false },
                { name: 'Competitor B', share: 22, trend: '+0.8%', positive: true },
                { name: 'Others', share: 16, trend: '-4.3%', positive: false }
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div 
                    className={`flex justify-between text-[10px] transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: `${900 + i * 100}ms` }}
                  >
                    <span className="text-gray-300">{item.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={i === 0 ? colorConfig.text : 'text-gray-400'}>{item.share}%</span>
                      <span className={`text-[8px] ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full w-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isInView ? `${item.share}%` : '0%',
                        backgroundColor: i === 0 ? colorConfig.primary : i === 1 ? '#4ADE80' : i === 2 ? '#FB7185' : '#94A3B8',
                        transitionDelay: `${1000 + i * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Strategy Recommendations Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-80 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Strategic Recommendations</div>
          
          {/* Overall Direction */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Recommended Direction</div>
            <div 
              className={`bg-gray-900 border border-gray-700 rounded-lg p-2 transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-start gap-2">
                <div className={`p-1 rounded-full bg-${colorConfig.text.split('-')[1]}-900/30 mt-0.5`}>
                  <TrendingUp size={12} className={colorConfig.text} />
                </div>
                <div>
                  <div className={`text-xs font-medium ${colorConfig.text}`}>Accelerate Growth</div>
                  <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">
                    Market conditions favorable for expansion. Increase marketing spend and capitalize on competitor weaknesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actionable Tactics */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Actionable Tactics</div>
            
            {/* Tactics List */}
            <div className="space-y-2">
              {[
                { tactic: 'Increase ad spend by 15% on high-converting channels', impact: 'High', timeframe: 'Immediate' },
                { tactic: 'Launch competitor comparison campaign', impact: 'Medium', timeframe: '2 weeks' },
                { tactic: 'Optimize product messaging for Gen Z', impact: 'High', timeframe: '1 month' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${800 + i * 150}ms` }}
                >
                  <div className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full ${item.impact === 'High' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <div className="text-[9px] text-gray-300">{item.tactic}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={`text-[8px] ${colorConfig.text}`}>Impact: {item.impact}</div>
                      <div className="text-[8px] text-gray-500">|</div>
                      <div className="text-[8px] text-gray-400">{item.timeframe}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expected Outcomes */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1200ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Expected Outcomes</div>
            <div className="flex items-center gap-x-3">
              <div 
                className={`flex-1 transition-all duration-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: '1300ms' }}
              >
                <div className="bg-gray-900 rounded-lg p-2 flex flex-col items-center">
                  <div className={`text-lg font-bold ${colorConfig.text}`}>+18%</div>
                  <div className="text-[8px] text-gray-400 text-center">Revenue Growth</div>
                </div>
              </div>
              <div 
                className={`flex-1 transition-all duration-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: '1400ms' }}
              >
                <div className="bg-gray-900 rounded-lg p-2 flex flex-col items-center">
                  <div className={`text-lg font-bold ${colorConfig.text}`}>+6%</div>
                  <div className="text-[8px] text-gray-400 text-center">Market Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Processing Engine */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          
          {/* Central Data Analysis Engine */}
          <div 
            className={`w-32 h-32 bg-gray-800 rounded-full border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* Data Processing Visualization */}
            <div 
              className={`w-24 h-24 transition-all duration-500 relative ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Data Analysis Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Data Flow Paths */}
                <path 
                  d="M50,10 Q80,30 70,50 Q60,70 50,90" 
                  fill="none" 
                  stroke={`${colorConfig.primary}40`} 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
                
                <path 
                  d="M50,10 Q20,30 30,50 Q40,70 50,90" 
                  fill="none" 
                  stroke={`${colorConfig.primary}40`} 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
                
                {/* Moving Data Points */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r="3" 
                  fill="#FFFFFF"
                >
                  <animateMotion 
                    path="M50,10 Q80,30 70,50 Q60,70 50,90" 
                    dur="2s" 
                    repeatCount="indefinite" 
                    begin={isInView ? '0s' : 'indefinite'} 
                  />
                </circle>
                
                <circle 
                  cx="0" 
                  cy="0" 
                  r="3" 
                  fill="#FFFFFF"
                >
                  <animateMotion 
                    path="M50,10 Q20,30 30,50 Q40,70 50,90" 
                    dur="2s" 
                    repeatCount="indefinite" 
                    begin={isInView ? '0.5s' : 'indefinite'} 
                  />
                </circle>
                
                {/* Rotating Outer Ring */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1" 
                  strokeDasharray="5,5"
                  className={isInView ? 'animate-spin' : ''}
                  style={{ animationDuration: '20s', transformOrigin: 'center' }}
                />
                
                {/* Central Processing Hub */}
                <circle cx="50" cy="50" r="15" fill={`${colorConfig.primary}30`} />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="10" 
                  fill={colorConfig.primary}
                  className={isInView ? 'animate-pulse' : ''}
                  style={{ animationDuration: '3s' }}
                />
              </svg>
            </div>
          </div>
          
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            Data Intelligence Engine
          </div>
        </div>
      </div>
    </div>
  );
}

// Workflow Optimization Visualization Component
function WorkflowOptimizationVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  return (
    <div className={`h-80 bg-gray-900 rounded-lg border ${colorConfig.border} overflow-hidden transition-all duration-1000 ease-in-out`}>
      <div className="w-full h-full p-4 relative">
        {/* Current Workflow Panel */}
        <div 
          className={`absolute left-4 top-4 w-64 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Current Workflow</div>
          
          {/* Workflow Diagram */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="h-36 bg-gray-900 rounded-lg p-3">
              <div 
                className={`w-full h-full relative transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '400ms' }}
              >
                {/* Workflow Steps Visualization */}
                <svg width="100%" height="100%" viewBox="0 0 220 120">
                  {/* Step 1 - Research */}
                  <rect 
                    x="10" y="10" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}
                  />
                  <text x="30" y="27" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '550ms' }}>Research</text>
                  
                  {/* Arrow 1 */}
                  <path 
                    d="M50,25 L70,25" 
                    stroke="#9CA3AF" 
                    strokeWidth="1" 
                    strokeDasharray="3,2"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '600ms' }}
                  />
                  <polygon 
                    points="70,25 65,22 65,28" 
                    fill="#9CA3AF"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '650ms' }}
                  />
                  
                  {/* Step 2 - Planning */}
                  <rect 
                    x="70" y="10" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}
                  />
                  <text x="90" y="27" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '750ms' }}>Planning</text>
                  
                  {/* Arrow 2 */}
                  <path 
                    d="M110,25 L130,25" 
                    stroke="#9CA3AF" 
                    strokeWidth="1" 
                    strokeDasharray="3,2"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '800ms' }}
                  />
                  <polygon 
                    points="130,25 125,22 125,28" 
                    fill="#9CA3AF"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '850ms' }}
                  />
                  
                  {/* Step 3 - Creation */}
                  <rect 
                    x="130" y="10" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '900ms' }}
                  />
                  <text x="150" y="27" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '950ms' }}>Creation</text>
                  
                  {/* Arrow 3 */}
                  <path 
                    d="M150,40 L150,55" 
                    stroke="#9CA3AF" 
                    strokeWidth="1" 
                    strokeDasharray="3,2"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1000ms' }}
                  />
                  <polygon 
                    points="150,55 147,50 153,50" 
                    fill="#9CA3AF"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1050ms' }}
                  />
                  
                  {/* Step 4 - Review */}
                  <rect 
                    x="130" y="55" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1100ms' }}
                  />
                  <text x="150" y="72" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1150ms' }}>Review</text>
                  
                  {/* Arrow 4 */}
                  <path 
                    d="M130,70 L110,70" 
                    stroke="#9CA3AF" 
                    strokeWidth="1" 
                    strokeDasharray="3,2"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1200ms' }}
                  />
                  <polygon 
                    points="110,70 115,67 115,73" 
                    fill="#9CA3AF"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1250ms' }}
                  />
                  
                  {/* Step 5 - Approval */}
                  <rect 
                    x="70" y="55" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1300ms' }}
                  />
                  <text x="90" y="72" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1350ms' }}>Approval</text>
                  
                  {/* Arrow 5 */}
                  <path 
                    d="M70,70 L50,70" 
                    stroke="#9CA3AF" 
                    strokeWidth="1" 
                    strokeDasharray="3,2"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1400ms' }}
                  />
                  <polygon 
                    points="50,70 55,67 55,73" 
                    fill="#9CA3AF"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1450ms' }}
                  />
                  
                  {/* Step 6 - Launch */}
                  <rect 
                    x="10" y="55" width="40" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke="#374151" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1500ms' }}
                  />
                  <text x="30" y="72" textAnchor="middle" fontSize="8" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1550ms' }}>Launch</text>
                  
                  {/* Workflow Pain Points */}
                  <circle 
                    cx="150" 
                    cy="25" 
                    r="6" 
                    fill="#EF4444" 
                    fillOpacity="0.2" 
                    stroke="#EF4444" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1600ms' }}
                  />
                  <circle 
                    cx="90" 
                    cy="70" 
                    r="6" 
                    fill="#EF4444" 
                    fillOpacity="0.2" 
                    stroke="#EF4444" 
                    strokeWidth="1"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1700ms' }}
                  />
                  
                  {/* Time Indicators */}
                  <text x="30" y="100" textAnchor="middle" fontSize="7" fill="#EF4444" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1800ms' }}>3-5 days</text>
                  <text x="150" y="100" textAnchor="middle" fontSize="7" fill="#EF4444" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1900ms' }}>7-10 days</text>
                  <text x="180" y="85" textAnchor="middle" fontSize="7" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '2000ms' }}>Total: 2-3 weeks</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Pain Points */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Workflow Bottlenecks</div>
            <div className="space-y-1.5">
              {[
                { issue: 'Content creation delays', impact: '42% of projects' },
                { issue: 'Approval backlogs', impact: '68% of campaigns' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${800 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-1 rounded-full bg-red-500"></div>
                  <div>
                    <div className="text-[10px] text-gray-300">{item.issue}</div>
                    <div className="text-[8px] text-red-400 mt-0.5">Affects {item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Optimized Workflow Panel */}
        <div 
          className={`absolute right-4 top-4 w-56 h-72 bg-gray-800 rounded-lg border border-gray-700 p-3 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-xs uppercase tracking-wider font-semibold mb-2 text-gray-400">Optimized Workflow</div>
          
          {/* Pulp's Solution */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>AI-Powered Streamlining</div>
            <div className="bg-gray-900 rounded-lg p-3 h-28">
              <div 
                className={`w-full h-full relative transition-opacity duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                {/* Streamlined Workflow */}
                <svg width="100%" height="100%" viewBox="0 0 180 100">
                  {/* Research + Planning */}
                  <rect 
                    x="10" y="10" width="50" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke={colorConfig.primary} 
                    strokeWidth="1.5"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}
                  />
                  <text x="35" y="22" textAnchor="middle" fontSize="8" fill={colorConfig.text.split('-')[1]} className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '750ms' }}>Research + Planning</text>
                  <text x="35" y="32" textAnchor="middle" fontSize="6" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '775ms' }}>AI-Powered</text>
                  
                  {/* Arrow 1 */}
                  <path 
                    d="M60,25 L80,25" 
                    stroke={colorConfig.primary} 
                    strokeWidth="1.5"
                    className={`transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '800ms' }}
                  />
                  <polygon 
                    points="80,25 75,22 75,28" 
                    fill={colorConfig.primary}
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '850ms' }}
                  />
                  
                  {/* Creation + Review */}
                  <rect 
                    x="80" y="10" width="50" height="30" rx="3" 
                    fill="#1F2937" 
                    stroke={colorConfig.primary} 
                    strokeWidth="1.5"
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '900ms' }}
                  />
                  <text x="105" y="22" textAnchor="middle" fontSize="8" fill={colorConfig.text.split('-')[1]} className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '950ms' }}>Creation + Review</text>
                  <text x="105" y="32" textAnchor="middle" fontSize="6" fill="#9CA3AF" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '975ms' }}>Automated Assistance</text>
                  
                  {/* Success Indicators */}
                  <g 
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1300ms' }}
                  >
                    <circle cx="145" cy="25" r="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
                    <text x="145" y="28" textAnchor="middle" fontSize="7" fill="#10B981">✓</text>
                  </g>
                  
                  <g 
                    className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1400ms' }}
                  >
                    <circle cx="145" cy="65" r="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" />
                    <text x="145" y="68" textAnchor="middle" fontSize="7" fill="#10B981">✓</text>
                  </g>
                  
                  {/* Time Saved Indicator */}
                  <text x="105" y="95" textAnchor="middle" fontSize="8" fill="#10B981" className={`transition-all duration-300 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1500ms' }}>Total: 3-5 days (65% faster)</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Efficiency Improvements */}
          <div 
            className={`mb-4 transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Efficiency Improvements</div>
            <div className="space-y-2">
              {[
                { metric: 'Time to Launch', before: '17 days', after: '6 days', change: '-65%' },
                { metric: 'Projects per Month', before: '4', after: '11', change: '+175%' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`transition-all duration-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                  style={{ transitionDelay: `${900 + i * 150}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] text-gray-300">{item.metric}</div>
                    <div className="text-[10px] text-green-400">{item.change}</div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="bg-gray-900 py-0.5 px-1.5 rounded text-[8px] text-gray-400">Before: {item.before}</div>
                    <div className="text-[10px] text-gray-500">→</div>
                    <div className={`py-0.5 px-1.5 rounded text-[8px] ${colorConfig.text} bg-${colorConfig.text.split('-')[1]}-900/20`}>Now: {item.after}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Automation Features */}
          <div 
            className={`transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: '1200ms' }}
          >
            <div className={`text-xs font-medium ${colorConfig.text} mb-1.5`}>Key Automation Features</div>
            <div className="space-y-1.5">
              {[
                { feature: 'Smart document generation', icon: <Zap size={12} /> },
                { feature: 'One-click approval routing', icon: <Check size={12} /> },
                { feature: 'Content suggestion engine', icon: <MessageCircle size={12} /> }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-1.5 transition-all duration-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${1300 + i * 100}ms` }}
                >
                  <div className={`p-0.5 rounded ${colorConfig.background}`}>
                    {item.icon}
                  </div>
                  <div className="text-[9px] text-gray-300">{item.feature}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Workflow Transformation Engine */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Central Workflow Engine */}
          <div 
            className={`w-32 h-32 bg-gray-800 rounded-lg border-2 ${colorConfig.border} flex items-center justify-center relative z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{ 
              transitionDelay: '600ms',
              boxShadow: isInView ? `0 0 20px ${colorConfig.primary}30` : 'none' 
            }}
          >
            {/* Workflow Transform Visualization */}
            <div 
              className={`w-24 h-24 transition-all duration-500 relative ${isInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {/* Workflow Gears */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Central Gear */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="18" 
                  fill="#1F2937" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1.5"
                  className={`${isInView ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '10s', transformOrigin: 'center' }}
                />
                
                {/* Gear Teeth */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x1 = 50 + 18 * Math.cos(angle);
                  const y1 = 50 + 18 * Math.sin(angle);
                  const x2 = 50 + 24 * Math.cos(angle);
                  const y2 = 50 + 24 * Math.sin(angle);
                  
                  return (
                    <line 
                      key={i}
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke={colorConfig.primary} 
                      strokeWidth="3"
                      strokeLinecap="round"
                      className={`${isInView ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '10s', transformOrigin: 'center' }}
                    />
                  );
                })}
                
                {/* Upper Small Gear */}
                <circle 
                  cx="30" 
                  cy="25" 
                  r="12" 
                  fill="#1F2937" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1"
                  className={`${isInView ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '7s', animationDirection: 'reverse', transformOrigin: 'center' }}
                />
                
                {/* Small Gear Teeth */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (i * 60) * Math.PI / 180;
                  const x1 = 30 + 12 * Math.cos(angle);
                  const y1 = 25 + 12 * Math.sin(angle);
                  const x2 = 30 + 16 * Math.cos(angle);
                  const y2 = 25 + 16 * Math.sin(angle);
                  
                  return (
                    <line 
                      key={`small-1-${i}`}
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke={colorConfig.primary} 
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={`${isInView ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '7s', animationDirection: 'reverse', transformOrigin: '30px 25px' }}
                    />
                  );
                })}
                
                {/* Connecting Lines */}
                <line 
                  x1="39" y1="34" x2="43" y2="38" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1" 
                  strokeDasharray="2,1"
                />
                
                <line 
                  x1="63" y1="62" x2="67" y2="66" 
                  stroke={colorConfig.primary} 
                  strokeWidth="1" 
                  strokeDasharray="2,1"
                />
                
                {/* Center Icon */}
                <text 
                  x="50" 
                  y="55" 
                  fontSize="16" 
                  textAnchor="middle" 
                  fill={colorConfig.primary}
                  className={`${isInView ? 'animate-pulse' : ''}`}
                  style={{ animationDuration: '2s' }}
                >
                  ⚡
                </text>
              </svg>
            </div>
          </div>
          
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider font-semibold ${colorConfig.text} text-center transition-all duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1100ms' }}
          >
            Workflow Optimizer
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export component
export function MarketingSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div className="w-full">
      {sections.map((section, index) => (
        <Section
          key={index}
          {...section}
          index={index}
        />
      ))}
    </div>
  );
} 