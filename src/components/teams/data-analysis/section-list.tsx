"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  BarChart, 
  TrendingUp, 
  Brain, 
  Search, 
  LineChart, 
  Activity 
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "amber" | "pink" | "purple" | "blue";
  icon: string;
  index: number;
}

const colorMap = {
  amber: {
    text: "text-amber-400",
    gradient: "from-amber-600 to-amber-400",
    gradientAlt: "from-amber-900/20 to-amber-800/0",
    gradientOverlay: "from-amber-900/60 to-amber-800/30",
    glow: "rgba(255,165,0,0.5)",
    border: "border-amber-500/30",
    bg: "bg-amber-500/20",
    fill: "#F59E0B",
    fillOpacity: "0.15",
  },
  pink: {
    text: "text-pink-400",
    gradient: "from-pink-600 to-pink-400",
    gradientAlt: "from-pink-900/20 to-pink-800/0",
    gradientOverlay: "from-pink-900/60 to-pink-800/30",
    glow: "rgba(236,72,153,0.5)",
    border: "border-pink-500/30",
    bg: "bg-pink-500/20",
    fill: "#FF66C4",
    fillOpacity: "0.15",
  },
  purple: {
    text: "text-purple-400",
    gradient: "from-purple-600 to-purple-400",
    gradientAlt: "from-purple-900/20 to-purple-800/0",
    gradientOverlay: "from-purple-900/60 to-purple-800/30",
    glow: "rgba(168,85,247,0.5)",
    border: "border-purple-500/30",
    bg: "bg-purple-500/20",
    fill: "#8A3FFC",
    fillOpacity: "0.2",
  },
  blue: {
    text: "text-blue-400",
    gradient: "from-blue-600 to-blue-400",
    gradientAlt: "from-blue-900/20 to-blue-800/0",
    gradientOverlay: "from-blue-900/60 to-blue-800/30",
    glow: "rgba(59,130,246,0.5)",
    border: "border-blue-500/30",
    bg: "bg-blue-500/20",
    fill: "#3B82F6",
    fillOpacity: "0.15",
  },
};

// Map of icon names to their components
const IconMap = {
  BarChart,
  TrendingUp,
  Brain,
  Search,
  LineChart,
  Activity
};

function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  const IconComponent = IconMap[icon as keyof typeof IconMap];

  return (
    <div ref={ref} className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text Content - Ordered based on imageSide */}
        <div 
          className={`${imageSide === "right" ? "md:order-1" : "md:order-2"}`}
        >
          <motion.div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
            }}
          >
            {/* Section Icon */}
            <div 
              className={`w-14 h-14 rounded-xl ${colorConfig.bg} flex items-center justify-center mb-6`} 
              style={{ boxShadow: `0 0 20px ${colorConfig.glow}` }}
            >
              {IconComponent && <IconComponent className={`h-6 w-6 ${colorConfig.text}`} />}
            </div>
            
            {/* Section Title */}
            <h2 className={`text-3xl md:text-4xl font-bold ${colorConfig.text} mb-4`}>
              {title}
            </h2>
            
            {/* Section Description */}
            <p className="text-gray-300 text-lg md:text-xl">
              {description}
            </p>
          </motion.div>
        </div>
        
        {/* Visual Element - Ordered based on imageSide */}
        <div 
          className={`${imageSide === "right" ? "md:order-2" : "md:order-1"}`}
        >
          <motion.div 
            layout
            className="relative h-[750px] md:h-[750px] w-full rounded-xl overflow-hidden backdrop-blur"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : `translateX(${imageSide === "right" ? "" : "-"}20px)`,
              transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${colorConfig.gradientOverlay} mix-blend-overlay z-10 rounded-xl`}></div>
            <div className={`absolute inset-0 bg-gradient-to-b ${colorConfig.gradientAlt} z-0 rounded-xl`}></div>
            
            {/* Section-specific visualization */}
            {index === 0 && (
              <UnifiedDashboardVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 1 && (
              <EmergingNarrativesVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 2 && (
              <IntentAnalysisVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 3 && (
              <DrillingDownVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 4 && (
              <ContentPerformanceVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 5 && (
              <TrendForecastingVisual colorConfig={colorConfig} isInView={isInView} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Visualization 1: Unified Dashboard
function UnifiedDashboardVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Platform data
  const platformData = [
    { name: "Twitter", engagement: 78, growth: "+12%", trend: "up" },
    { name: "Instagram", engagement: 92, growth: "+8%", trend: "up" },
    { name: "Facebook", engagement: 64, growth: "-3%", trend: "down" },
    { name: "LinkedIn", engagement: 85, growth: "+15%", trend: "up" },
    { name: "YouTube", engagement: 71, growth: "+5%", trend: "up" },
    { name: "Email", engagement: 48, growth: "-2%", trend: "down" }
  ];

  // Aggregated metrics
  const aggregatedMetrics = [
    { 
      name: "Total Engagement", 
      value: "248.7K", 
      change: "+7.3%", 
      isPositive: true,
      icon: "activity"
    },
    { 
      name: "Audience Growth", 
      value: "12.4K", 
      change: "+4.8%", 
      isPositive: true,
      icon: "trending-up"
    },
    { 
      name: "Average Response", 
      value: "3.8%", 
      change: "+0.6%", 
      isPositive: true,
      icon: "bar-chart"
    }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Dashboard Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Unified Engagement Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${colorConfig.bg} animate-pulse`}></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        
        {/* Aggregated Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          {aggregatedMetrics.map((metric) => (
            <div key={metric.name} className="bg-gray-800/40 p-3 rounded border border-gray-700">
              <div className="text-[10px] text-gray-400">{metric.name}</div>
              <div className="flex items-end justify-between mt-1">
                <div className="text-base text-white font-semibold">{metric.value}</div>
                <div className={`text-xs ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Platform Engagement Grid */}
        <div className="mb-4">
          <div className="text-xs text-gray-300 mb-2">Platform Performance</div>
          <div className="space-y-2">
            {platformData.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.4 }}
                className="bg-gray-800/40 p-3 rounded border border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white">{platform.name}</span>
                  <span className={`text-xs ${platform.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {platform.growth}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`${colorConfig.bg} h-2 rounded-full`} 
                    style={{ width: `${platform.engagement}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-[10px] text-gray-400 text-right">
                  Engagement: {platform.engagement}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex justify-between"
        >
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            View Details
          </button>
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Export Report
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Share Insights
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Placeholder visualizations for the remaining sections
function EmergingNarrativesVisual({ colorConfig, isInView }: { colorConfig: typeof colorMap[keyof typeof colorMap]; isInView: boolean; }) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Topics with growth data
  const emergingTopics = [
    { 
      name: "Climate Policy", 
      growth: 187, 
      sentiment: 0.65, 
      influential: ["@GreenActivist", "@PolicyExpert", "@NewsOutlet"],
      keywords: ["sustainability", "carbon neutral", "policy", "agreement"]
    },
    { 
      name: "AI Ethics", 
      growth: 214, 
      sentiment: 0.38, 
      influential: ["@TechLeader", "@EthicsProf", "@AIResearcher"],
      keywords: ["regulation", "safety", "bias", "oversight"]
    },
    { 
      name: "Remote Work", 
      growth: 94, 
      sentiment: 0.82, 
      influential: ["@WorkplaceGuru", "@CEOInsider", "@FutureOfWork"],
      keywords: ["flexibility", "productivity", "hybrid", "culture"]
    }
  ];
  
  // Sentiment ranges for visualization
  const sentimentRanges = [
    { label: "Negative", min: 0, max: 0.33, color: "bg-red-500" },
    { label: "Neutral", min: 0.34, max: 0.66, color: "bg-blue-500" },
    { label: "Positive", min: 0.67, max: 1, color: "bg-green-500" }
  ];
  
  
  // Helper for growth indicator
  const getGrowthIndicator = (growth: number) => {
    if (growth > 200) return "Very High";
    if (growth > 100) return "High";
    if (growth > 50) return "Moderate";
    return "Low";
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Emerging Narrative Detection</span>
          </div>
          <div className="text-xs text-gray-400">
            Last updated: 2 hours ago
          </div>
        </div>
        
        {/* Topic Detection Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="mb-4"
        >
          <div className="flex justify-between items-center">
            <div className="text-xs text-white">Pre-viral Topic Detection</div>
            <div className={`text-[10px] px-2 py-0.5 rounded-full ${colorConfig.bg} text-white`}>
              3 emerging narratives detected
            </div>
          </div>
        </motion.div>
        
        {/* Emerging Topics */}
        <div className="space-y-3 mb-4">
          {emergingTopics.map((topic, index) => (
            <motion.div
              key={topic.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
              transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.4 }}
              className={`p-3 rounded border ${colorConfig.border} ${index === 0 ? colorConfig.bg : 'bg-gray-800/40'}`}
            >
              <div className="flex justify-between items-center mb-1.5">
                <div className="text-sm text-white font-medium">{topic.name}</div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="text-[10px] text-gray-400">Growth</div>
                    <div className="text-xs text-white">{topic.growth}%</div>
                  </div>
                  <div className={`text-[9px] ${colorConfig.text} px-1.5 py-0.5 rounded-full border ${colorConfig.border}`}>
                    {getGrowthIndicator(topic.growth)}
                  </div>
                </div>
              </div>
              
              {/* Sentiment Indicator */}
              <div className="mb-2">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>Sentiment Distribution</span>
                  <span>{(topic.sentiment * 100).toFixed(0)}% Positive</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  {sentimentRanges.map((range, i) => (
                    <div 
                      key={i} 
                      className={`h-full ${range.color} inline-block`} 
                      style={{ 
                        width: `${(range.max - range.min) * 100}%`, 
                        opacity: (topic.sentiment >= range.min && topic.sentiment <= range.max) ? 1 : 0.3 
                      }} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Keywords */}
              <div className="mb-2">
                <div className="text-[10px] text-gray-400 mb-1">Key Terms</div>
                <div className="flex flex-wrap gap-1">
                  {topic.keywords.map(keyword => (
                    <span 
                      key={keyword} 
                      className="text-[9px] bg-gray-800/60 px-1.5 py-0.5 rounded text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Influential Voices */}
              <div>
                <div className="text-[10px] text-gray-400 mb-1">Influential Voices</div>
                <div className="flex gap-1.5">
                  {topic.influential.map((voice) => (
                    <div 
                      key={voice} 
                      className="flex items-center bg-gray-800/60 px-1.5 py-0.5 rounded"
                    >
                      <div className={`h-2 w-2 rounded-full ${colorConfig.bg} mr-1`}></div>
                      <span className="text-[9px] text-gray-300">{voice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex justify-between"
        >
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            View All Topics
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Create Alert
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function IntentAnalysisVisual({ colorConfig, isInView }: { colorConfig: typeof colorMap[keyof typeof colorMap]; isInView: boolean; }) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Sample message with intent analysis
  const messageAnalysis = {
    message: "We appreciate your feedback on our new policy changes. While we understand your concerns, we believe these adjustments will ultimately benefit the entire community in the long run.",
    intentScore: 0.72,
    surfaceSentiment: 0.48,
    toneMarkers: [
      { start: 0, end: 14, type: "diplomatic", label: "Diplomatic" },
      { start: 15, end: 61, type: "acknowledging", label: "Acknowledging" },
      { start: 62, end: 130, type: "assertive", label: "Assertive" }
    ],
    analyses: {
      rhetoric: [
        { name: "Persuasive", score: 0.78 },
        { name: "Defensive", score: 0.41 },
        { name: "Informative", score: 0.65 }
      ],
      intent: [
        { name: "Pacify Criticism", score: 0.82 },
        { name: "Establish Authority", score: 0.65 },
        { name: "Build Credibility", score: 0.71 }
      ],
      subtext: [
        { name: "Decision is final", confidence: "High" },
        { name: "Feedback not actionable", confidence: "Medium" },
        { name: "Signaling leadership", confidence: "High" }
      ]
    }
  };
  
  // Helper functions
  const getScoreColor = (score: number) => {
    if (score > 0.7) return "bg-green-500";
    if (score > 0.4) return "bg-blue-500";
    return "bg-red-500";
  };
  
  const getConfidenceClass = (confidence: string) => {
    switch(confidence) {
      case "High": return "text-green-400";
      case "Medium": return "text-blue-400";
      case "Low": return "text-red-400";
      default: return "text-gray-400";
    }
  };
  
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(0)}%`;
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Intent Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-[10px] py-0.5 px-2 rounded-full bg-gray-800 text-gray-300`}>
              NLP Engine v4.2
            </div>
          </div>
        </div>
        
        {/* Original Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="mb-4 p-3 rounded bg-gray-800/40 border border-gray-700"
        >
          <div className="text-[10px] text-gray-400 mb-1.5">Message Content</div>
          <p className="text-xs text-gray-300 leading-relaxed">
            {messageAnalysis.message}
          </p>
          
          {/* Sentiment Comparison */}
          <div className="mt-3 flex items-center justify-between gap-3 pt-3 border-t border-gray-700">
            <div>
              <div className="text-[10px] text-gray-400">Surface Sentiment</div>
              <div className="text-sm font-medium text-gray-300">{formatPercentage(messageAnalysis.surfaceSentiment)}</div>
            </div>
            <div className="text-gray-500">vs</div>
            <div>
              <div className="text-[10px] text-gray-400">True Intent</div>
              <div className={`text-sm font-medium ${colorConfig.text}`}>{formatPercentage(messageAnalysis.intentScore)}</div>
            </div>
          </div>
        </motion.div>
        
        {/* Tone Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Tone Analysis</div>
          <div className="p-3 rounded bg-gray-800/40 border border-gray-700">
            <div className="mb-2 relative bg-gray-700 rounded-md p-2 text-[10px] text-gray-300 leading-relaxed">
              {/* Tone markers */}
              {messageAnalysis.toneMarkers.map((marker, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: animationDelay(2) + (index * 0.15), duration: 0.3 }}
                  className={`absolute top-0 px-1 rounded text-[8px] -mt-2.5
                    ${marker.type === 'diplomatic' ? 'bg-blue-500/80 text-white' : 
                      marker.type === 'acknowledging' ? 'bg-green-500/80 text-white' : 
                      'bg-amber-500/80 text-white'}`}
                  style={{ 
                    left: `${(marker.start / messageAnalysis.message.length) * 100}%`,
                  }}
                >
                  {marker.label}
                </motion.span>
              ))}
              {messageAnalysis.message}
            </div>
            
            {/* Rhetoric Analysis */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] text-gray-400 mb-1.5">Rhetoric Style</div>
                <div className="space-y-1.5">
                  {messageAnalysis.analyses.rhetoric.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[9px] text-gray-300">{item.name}</span>
                        <span className="text-[9px] text-gray-400">{formatPercentage(item.score)}</span>
                      </div>
                      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColor(item.score)}`} 
                          style={{ width: `${item.score * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Intent Analysis */}
              <div>
                <div className="text-[10px] text-gray-400 mb-1.5">Intent Detection</div>
                <div className="space-y-1.5">
                  {messageAnalysis.analyses.intent.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[9px] text-gray-300">{item.name}</span>
                        <span className="text-[9px] text-gray-400">{formatPercentage(item.score)}</span>
                      </div>
                      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${colorConfig.bg}`} 
                          style={{ width: `${item.score * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Subtext Analysis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Subtext Analysis</div>
          <div className="p-3 rounded bg-gray-800/40 border border-gray-700">
            <div className="space-y-2">
              {messageAnalysis.analyses.subtext.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${colorConfig.bg} mr-2`}></div>
                    <span className="text-xs text-gray-300">{item.name}</span>
                  </div>
                  <span className={`text-[10px] ${getConfidenceClass(item.confidence)}`}>
                    {item.confidence} Confidence
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex justify-end">
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Generate Response
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function DrillingDownVisual({ colorConfig, isInView }: { colorConfig: typeof colorMap[keyof typeof colorMap]; isInView: boolean; }) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Hierarchical data for drilling
  const hierarchicalData = {
    currentLevel: "Campaign",
    breadcrumbs: ["All Campaigns", "Q3 Awareness", "Social Media", "Campaign #1042"],
    metrics: [
      { name: "Engagement", value: "182.4K", change: "+17%", isPositive: true },
      { name: "Conversions", value: "3,841", change: "+8%", isPositive: true },
      { name: "Avg. Cost", value: "$2.14", change: "-12%", isPositive: true }
    ],
    drillOptions: [
      { name: "By Audience", count: 4, icon: "users" },
      { name: "By Platform", count: 6, icon: "share" },
      { name: "By Content", count: 12, icon: "file" },
      { name: "By Geography", count: 18, icon: "map" },
      { name: "By Time", count: 7, icon: "clock" }
    ],
    insights: [
      { 
        type: "suggestion", 
        message: "Male 25-34 segment shows 2x higher conversion rates on weekends",
        cta: "Drill to Segment"
      },
      { 
        type: "alert", 
        message: "Instagram story performance dropped 32% in the last 24hrs",
        cta: "Investigate"
      }
    ]
  };
  
  // Icons for the drill options
  const OptionIcon = ({ icon }: { icon: string }) => {
    switch(icon) {
      case "users":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "share":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        );
      case "file":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "map":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case "clock":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Header with Level Indicator */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">
              Data Explorer
            </span>
          </div>
          <div className={`text-[10px] py-0.5 px-2 rounded-full ${colorConfig.bg} text-white`}>
            {hierarchicalData.currentLevel} Level
          </div>
        </div>
        
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="mb-4"
        >
          <div className="flex items-center flex-wrap gap-1 bg-gray-800/40 px-3 py-2 rounded border border-gray-700">
            {hierarchicalData.breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <span 
                  className={`text-[10px] ${index === hierarchicalData.breadcrumbs.length - 1 ? colorConfig.text : 'text-gray-400'} cursor-pointer hover:underline`}
                >
                  {crumb}
                </span>
                {index < hierarchicalData.breadcrumbs.length - 1 && (
                  <svg className="w-3 h-3 text-gray-600 mx-1" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Key Metrics at Current Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          {hierarchicalData.metrics.map((metric, index) => (
            <div 
              key={metric.name} 
              className={`p-3 rounded border ${index === 0 ? colorConfig.border : 'border-gray-700'} ${index === 0 ? colorConfig.bg : 'bg-gray-800/40'}`}
            >
              <div className="text-[10px] text-gray-400">{metric.name}</div>
              <div className="flex items-end justify-between mt-1">
                <div className="text-base text-white font-semibold">{metric.value}</div>
                <div className={`text-xs ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Drill Down Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Drill Down Options</div>
          <div className="grid grid-cols-2 gap-2">
            {hierarchicalData.drillOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
                transition={{ delay: animationDelay(3) + (index * 0.1), duration: 0.4 }}
                className="flex items-center justify-between bg-gray-800/40 p-2 rounded border border-gray-700 hover:border-gray-500 cursor-pointer group transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorConfig.bg} mr-2`}>
                    <OptionIcon icon={option.icon} />
                  </div>
                  <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                    {option.name}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400">
                  {option.count} segments
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* AI Insights */}
        <div className="mb-3">
          <div className="text-xs text-white mb-2">AI-Detected Insights</div>
          <div className="space-y-2">
            {hierarchicalData.insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
                transition={{ delay: animationDelay(4) + (index * 0.1), duration: 0.4 }}
                className="bg-gray-800/40 p-3 rounded border border-gray-700"
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center ${insight.type === 'suggestion' ? 'bg-blue-500/30 text-blue-400' : 'bg-amber-500/30 text-amber-400'} mr-2 mt-0.5`}>
                    {insight.type === 'suggestion' ? (
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-300 mb-1.5">{insight.message}</p>
                    <button className={`text-[10px] px-2 py-0.5 rounded ${colorConfig.bg} text-white`}>
                      {insight.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-700">
          <button className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zoom Out
          </button>
          
          <button className="text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-300">
            Reset View
          </button>
          
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} text-white flex items-center gap-1`}>
            Snapshot
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ContentPerformanceVisual({ colorConfig, isInView }: { colorConfig: typeof colorMap[keyof typeof colorMap]; isInView: boolean; }) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Content performance data
  const contentData = {
    selectedContent: "Product Launch Announcement",
    dateRange: "Last 30 days",
    overallMetrics: {
      views: "328.4K",
      engagement: "18.7K",
      conversionRate: "3.2%",
      shareRate: "5.7%"
    },
    segments: [
      { 
        name: "Young Professionals", 
        engagement: 78, 
        conversion: 4.2, 
        sentiment: 0.82,
        shareRate: 6.8,
        demographics: "25-34, Urban, Tech"
      },
      { 
        name: "Business Decision Makers", 
        engagement: 65, 
        conversion: 5.1, 
        sentiment: 0.74,
        shareRate: 3.2,
        demographics: "35-54, Suburban, Management"
      },
      { 
        name: "Industry Influencers", 
        engagement: 87, 
        conversion: 2.8, 
        sentiment: 0.91,
        shareRate: 12.4,
        demographics: "28-45, Tech Leaders, Social"
      },
      { 
        name: "General Audience", 
        engagement: 41, 
        conversion: 1.9, 
        sentiment: 0.62,
        shareRate: 2.3,
        demographics: "All Demographics, Mixed"
      }
    ],
    channelPerformance: [
      { channel: "Email", performance: 68 },
      { channel: "LinkedIn", performance: 82 },
      { channel: "Twitter", performance: 74 },
      { channel: "Facebook", performance: 51 },
      { channel: "Instagram", performance: 63 }
    ]
  };
  
  // Helper function for conditional styling
  const getPerformanceColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return `${colorConfig.bg}`;
    if (value >= 40) return "bg-amber-500";
    return "bg-red-500";
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Content Performance</span>
          </div>
          <div className="text-xs text-gray-400">
            {contentData.dateRange}
          </div>
        </div>
        
        {/* Selected Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="mb-4 p-3 bg-gray-800/40 rounded border border-gray-700"
        >
          <div className="text-[10px] text-gray-400 mb-1">Selected Content</div>
          <div className="text-sm text-white font-medium">
            {contentData.selectedContent}
          </div>
          
          {/* Overview Metrics */}
          <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-4 gap-2">
            <div>
              <div className="text-[10px] text-gray-400">Views</div>
              <div className="text-xs text-white">{contentData.overallMetrics.views}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400">Engagement</div>
              <div className="text-xs text-white">{contentData.overallMetrics.engagement}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400">Conversion</div>
              <div className="text-xs text-white">{contentData.overallMetrics.conversionRate}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400">Shares</div>
              <div className="text-xs text-white">{contentData.overallMetrics.shareRate}</div>
            </div>
          </div>
        </motion.div>
        
        {/* Audience Segments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-white">Audience Segment Performance</div>
            <div className={`text-[10px] px-2 py-0.5 rounded-full ${colorConfig.bg} text-white`}>
              {contentData.segments.length} segments
            </div>
          </div>
          
          <div className="space-y-3">
            {contentData.segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.4 }}
                className={`p-3 rounded border ${index === 2 ? colorConfig.border : 'border-gray-700'} ${index === 2 ? colorConfig.bg : 'bg-gray-800/40'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-white font-medium">{segment.name}</div>
                  <div className="text-[10px] text-gray-400">{segment.demographics}</div>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-2">
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">Engagement</span>
                      <span className="text-white">{segment.engagement}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getPerformanceColor(segment.engagement)}`} 
                        style={{ width: `${segment.engagement}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">Conversion</span>
                      <span className="text-white">{segment.conversion}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colorConfig.bg}`} 
                        style={{ width: `${segment.conversion * 10}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">Sentiment</span>
                      <span className="text-white">{(segment.sentiment * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${segment.sentiment > 0.7 ? 'bg-green-500' : segment.sentiment > 0.5 ? colorConfig.bg : 'bg-red-500'}`} 
                        style={{ width: `${segment.sentiment * 100}%` }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">Shares</span>
                      <span className="text-white">{segment.shareRate}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colorConfig.bg}`} 
                        style={{ width: `${segment.shareRate * 8}%` }} 
                      />
                    </div>
                  </div>
                </div>
                
                {index === 2 && (
                  <div className="mt-2 flex justify-end">
                    <button className={`text-[10px] px-2 py-0.5 rounded bg-gray-800 text-white`}>
                      View Segment Details
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Compare Content
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Export Insights
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TrendForecastingVisual({ colorConfig, isInView }: { colorConfig: typeof colorMap[keyof typeof colorMap]; isInView: boolean; }) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Trend forecasting data
  const forecastData = {
    topic: "Clean Energy Technology",
    currentDate: "Sep 12, 2023",
    predictionWindow: "Next 60 days",
    currentVolume: 4830,
    forecastedGrowth: "+142%",
    confidenceScore: 87,
    inflectionPoints: [
      { date: "Sep 24", event: "Industry Conference", impact: "high" },
      { date: "Oct 15", event: "Policy Announcement", impact: "critical" },
      { date: "Nov 02", event: "Q3 Earnings", impact: "medium" }
    ],
    trendChart: [
      { day: 0, value: 42 },
      { day: 5, value: 40 },
      { day: 10, value: 45 },
      { day: 15, value: 48 },
      { day: 20, value: 52 },
      { day: 25, value: 58 },
      { day: 30, value: 62 },
      { day: 35, value: 64 },
      { day: 40, value: 70 },
      { day: 45, value: 84 },
      { day: 50, value: 92 },
      { day: 55, value: 96 },
      { day: 60, value: 100 }
    ],
    relatedTopics: [
      { name: "Renewable Subsidies", correlation: 0.78 },
      { name: "Carbon Footprint", correlation: 0.65 },
      { name: "Energy Storage", correlation: 0.91 }
    ]
  };
  
  // Helper function for impact styling
  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "critical": return "bg-red-500";
      case "high": return `${colorConfig.bg}`;
      case "medium": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };
  
  // Get position for the inflection point markers on the chart
  const getInflectionPointPosition = (date: string) => {
    const dayStr = date.split(" ")[0];
    const month = date.split(" ")[1] || "";
    const day = parseInt(dayStr);
    // Map Sep 24 to ~12 days, Oct 15 to ~33 days, Nov 2 to ~51 days
    let position = 0;
    
    if (month === "Sep") {
      position = day - 12;
    } else if (month === "Oct") {
      position = day + 18;
    } else if (month === "Nov") {
      position = day + 49;
    }
    
    return position;
  };
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <motion.div 
        className={`p-6 bg-gray-900/70 backdrop-blur-sm rounded-lg border ${colorConfig.border} w-5/6 max-w-lg shadow-xl`}
        style={{
          boxShadow: `0 0 30px ${colorConfig.glow}`,
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.9,
          transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${animationDelay(0)}s`
        }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Trend Forecasting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-[10px] py-0.5 px-2 rounded-full ${colorConfig.bg} text-white`}>
              {forecastData.predictionWindow}
            </div>
          </div>
        </div>
        
        {/* Topic Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="mb-4 grid grid-cols-2 gap-4"
        >
          <div className="p-3 bg-gray-800/40 rounded border border-gray-700">
            <div className="text-[10px] text-gray-400 mb-1">Analyzed Topic</div>
            <div className="text-sm text-white font-medium mb-2">
              {forecastData.topic}
            </div>
            <div className="text-[10px] text-gray-400">Current Volume</div>
            <div className="text-xs text-white">{forecastData.currentVolume.toLocaleString()} mentions</div>
          </div>
          
          <div className="p-3 bg-gray-800/40 rounded border border-gray-700">
            <div className="text-[10px] text-gray-400 mb-1">Forecast</div>
            <div className="flex items-end gap-2">
              <div className="text-xl font-bold text-green-400">{forecastData.forecastedGrowth}</div>
              <div className="text-[10px] text-gray-400 mb-1">volume growth</div>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="text-[10px] text-gray-400">Confidence:</div>
              <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colorConfig.bg}`} 
                  style={{ width: `${forecastData.confidenceScore}%` }} 
                />
              </div>
              <div className="text-[10px] text-white">{forecastData.confidenceScore}%</div>
            </div>
          </div>
        </motion.div>
        
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Volume Trend Projection</div>
          <div className="p-3 bg-gray-800/40 rounded border border-gray-700">
            <div className="relative h-32">
              {/* Chart background grid */}
              <div className="absolute inset-0 grid grid-rows-4 gap-0">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-b border-gray-700/50"></div>
                ))}
              </div>
              
              {/* Current vs Projected Divider */}
              <div className="absolute h-full w-px bg-gray-500/50 left-1/4"></div>
              <div className="absolute top-full left-1/4 transform -translate-x-1/2 mt-1">
                <div className="text-[9px] text-gray-500">Today</div>
              </div>
              
              {/* Chart line - historical (first 25% of data) */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ delay: animationDelay(2), duration: 1 }}
                  d={`M 0,${100 - forecastData.trendChart[0].value} 
                     L ${(forecastData.trendChart[1].day / 60) * 100},${100 - forecastData.trendChart[1].value}
                     L ${(forecastData.trendChart[2].day / 60) * 100},${100 - forecastData.trendChart[2].value}`}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Chart line - projected (remaining 75% of data) */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor={colorConfig.fill} />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ delay: animationDelay(2) + 0.5, duration: 1.5 }}
                  d={`M ${(forecastData.trendChart[2].day / 60) * 100},${100 - forecastData.trendChart[2].value} 
                     ${forecastData.trendChart.slice(3).map(point => 
                       `L ${(point.day / 60) * 100},${100 - point.value}`
                     ).join(' ')}`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inflection markers */}
              {forecastData.inflectionPoints.map((point, i) => {
                const position = getInflectionPointPosition(point.date);
                const positionPercent = (position / 60) * 100;
                
                // Don't render if position calculation failed
                if (position <= 0) return null;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
                    transition={{ delay: animationDelay(3) + (i * 0.2), duration: 0.4 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${positionPercent}%`, 
                      top: `${100 - (forecastData.trendChart.find(p => p.day >= position)?.value || 50)}%` 
                    }}
                  >
                    <div className={`h-3 w-3 rounded-full ${getImpactColor(point.impact)} border-2 border-gray-900`} />
                  </motion.div>
                );
              })}
            </div>
            
            {/* Labels */}
            <div className="mt-5 flex justify-between text-[9px] text-gray-500">
              <div>{forecastData.currentDate}</div>
              <div>30 days</div>
              <div>60 days</div>
            </div>
          </div>
        </motion.div>
        
        {/* Inflection Points & Related Topics */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          {/* Inflection Points */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
            transition={{ delay: animationDelay(3), duration: 0.5 }}
          >
            <div className="text-xs text-white mb-2">Pivot Points</div>
            <div className="space-y-2">
              {forecastData.inflectionPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 bg-gray-800/40 rounded border border-gray-700"
                >
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${getImpactColor(point.impact)} mr-2`}></div>
                    <div className="text-[10px] text-gray-300">{point.date}</div>
                  </div>
                  <div className="text-[9px] text-white">{point.event}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Related Topics */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
            transition={{ delay: animationDelay(3), duration: 0.5 }}
          >
            <div className="text-xs text-white mb-2">Related Topics</div>
            <div className="space-y-2">
              {forecastData.relatedTopics.map((topic, index) => (
                <div key={index} className="p-2 bg-gray-800/40 rounded border border-gray-700">
                  <div className="flex justify-between mb-1">
                    <div className="text-[10px] text-gray-300">{topic.name}</div>
                    <div className="text-[9px] text-gray-400">
                      {(topic.correlation * 100).toFixed(0)}% correlation
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colorConfig.bg}`} 
                      style={{ width: `${topic.correlation * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between">
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Adjust Parameters
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Create Strategy
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function DataAnalysisSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div className="bg-transparent w-full">
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