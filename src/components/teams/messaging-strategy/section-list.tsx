"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "@/components/ui/icons";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

const colorMap = {
  green: {
    text: "text-green-400",
    gradient: "from-green-600 to-green-400",
    gradientAlt: "from-green-900/20 to-green-800/0",
    gradientOverlay: "from-green-900/60 to-green-800/30",
    glow: "rgba(16,185,129,0.5)",
    border: "border-green-500/30",
    bg: "bg-green-500/20",
    fill: "#10B981",
    fillOpacity: "0.1",
  },
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

function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  const IconComponent = Icons[icon as keyof typeof Icons];

  return (
    <div ref={ref} className="py-16 md:py-24 relative ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-transparent">
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
            className="relative h-[725px] md:h-[725px] w-full rounded-xl overflow-hidden backdrop-blur"
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
              <WritingAssistantVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 1 && (
              <AudienceSentimentVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 2 && (
              <RealTimeStrategyVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 3 && (
              <ChannelConsistencyVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 4 && (
              <EngagementInsightsVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 5 && (
              <RiskDetectionVisual colorConfig={colorConfig} isInView={isInView} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Visualization 1: AI Writing Assistant
function WritingAssistantVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
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
        {/* Writing Assistant UI */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Pulp Writer</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
            <div className="h-2 w-2 rounded-full bg-gray-600"></div>
          </div>
        </div>
        
        {/* Text Area */}
        <div className="bg-gray-800/50 p-4 rounded border border-gray-700 mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: animationDelay(1), duration: 0.4 }}
          >
            <p className="text-sm text-white mb-2">Our new eco-friendly initiative will reduce waste by 30% and <span className="bg-green-400/20 text-green-300 px-1 rounded">improve sustainability</span> across operations.</p>
          </motion.div>
        </div>
        
        {/* Suggestions */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ delay: animationDelay(2), duration: 0.5 }}
            className={`p-3 border ${colorConfig.border} rounded bg-gray-800/30`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`text-xs ${colorConfig.text} font-medium`}>Tone Adjustment</span>
              <span className="text-xs text-gray-400">90% match</span>
            </div>
            <p className="text-xs text-white">Our groundbreaking sustainability initiative will slash waste by 30% and revolutionize our environmental footprint.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ delay: animationDelay(3), duration: 0.5 }}
            className="p-3 border border-gray-700 rounded bg-gray-800/30"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs text-amber-400 font-medium">Clarity Enhancement</span>
              <span className="text-xs text-gray-400">85% match</span>
            </div>
            <p className="text-xs text-white">Our new sustainability program will cut waste by 30% across all facilities while strengthening our commitment to environmental stewardship.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ delay: animationDelay(4), duration: 0.5 }}
            className="p-3 border border-gray-700 rounded bg-gray-800/30"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs text-purple-400 font-medium">Persuasion Optimization</span>
              <span className="text-xs text-gray-400">78% match</span>
            </div>
            <p className="text-xs text-white">Join us in our bold sustainability journey as we reduce waste by 30% and transform how businesses approach environmental responsibility.</p>
          </motion.div>
        </div>
        
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(5), duration: 0.6 }}
          className="mt-4 pt-3 border-t border-gray-700 grid grid-cols-3 gap-2"
        >
          <div className="text-center">
            <div className={`text-xs ${colorConfig.text} font-medium`}>Clarity</div>
            <div className="text-xs text-white">84%</div>
          </div>
          <div className="text-center">
            <div className={`text-xs ${colorConfig.text} font-medium`}>Engagement</div>
            <div className="text-xs text-white">76%</div>
          </div>
          <div className="text-center">
            <div className={`text-xs ${colorConfig.text} font-medium`}>Persuasion</div>
            <div className="text-xs text-white">92%</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 2: Audience Sentiment Analysis
function AudienceSentimentVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Sentiment data for different audience segments
  const segments = [
    { name: "General Public", positive: 72, neutral: 18, negative: 10 },
    { name: "Stakeholders", positive: 85, neutral: 10, negative: 5 },
    { name: "Industry Experts", positive: 58, neutral: 27, negative: 15 },
    { name: "Potential Customers", positive: 76, neutral: 14, negative: 10 }
  ];

  // Keywords that resonate
  const keywords = [
    { word: "Innovative", score: 94 },
    { word: "Sustainable", score: 88 },
    { word: "Affordable", score: 76 },
    { word: "Efficient", score: 82 },
    { word: "Reliable", score: 79 }
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
            <span className="text-sm text-gray-300 font-medium">Audience Sentiment Dashboard</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Last updated: 5m ago</span>
            <div className={`h-2 w-2 rounded-full ${colorConfig.bg} animate-pulse`}></div>
          </div>
        </div>
        
        {/* Message */}
        <motion.div 
          className="bg-gray-800/50 p-3 rounded border border-gray-700 mb-4 text-sm text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(1), duration: 0.4 }}
        >
          &quot;Our new product combines cutting-edge innovation with sustainable materials at an affordable price point, making it both efficient and reliable for everyday use.&quot;
        </motion.div>
        
        {/* Overall sentiment */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-300">Overall Sentiment</span>
            <span className={`text-xs ${colorConfig.text} font-medium`}>76% Positive</span>
          </div>
          <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colorConfig.gradient} rounded-full`} 
              style={{ 
                width: "76%",
                boxShadow: `0 0 8px ${colorConfig.glow}`
              }}
            ></div>
          </div>
        </motion.div>
        
        {/* Audience segments */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Sentiment by Audience Segment</div>
          <div className="space-y-2">
            {segments.map((segment, index) => (
              <motion.div 
                key={segment.name}
                className="space-y-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
                transition={{ delay: animationDelay(3) + (index * 0.1), duration: 0.4 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white">{segment.name}</span>
                  <span className="text-xs text-gray-400">{segment.positive}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden flex">
                  <div 
                    className={`h-full ${colorConfig.bg}`} 
                    style={{ width: `${segment.positive}%` }}
                  ></div>
                  <div 
                    className="h-full bg-gray-500" 
                    style={{ width: `${segment.neutral}%` }}
                  ></div>
                  <div 
                    className="h-full bg-red-600/40" 
                    style={{ width: `${segment.negative}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(4), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Top Resonating Keywords</div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, index) => (
              <motion.div 
                key={kw.word}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                transition={{ delay: animationDelay(4) + (index * 0.1), duration: 0.4 }}
                className={`px-2 py-1 rounded-full text-xs border ${colorConfig.border} ${colorConfig.bg}`}
                style={{ boxShadow: `0 0 10px ${colorConfig.glow}` }}
              >
                <span className="text-white mr-1">{kw.word}</span>
                <span className={`${colorConfig.text}`}>{kw.score}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 3: Real-time Strategy Adaptation
function RealTimeStrategyVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Sample performance metrics
  const performanceData = [
    { time: "9am", engagement: 38 },
    { time: "10am", engagement: 40 },
    { time: "11am", engagement: 45 },
    { time: "12pm", engagement: 42 },
    { time: "1pm", engagement: 48 },
    { time: "2pm", engagement: 52 },
    { time: "3pm", engagement: 60 },
    { time: "4pm", engagement: 58 }
  ];

  // Strategy adjustments based on real-time data
  const adjustments = [
    { type: "Timing", suggestion: "Shift posting to 3-4pm window", impact: "24% ↑" },
    { type: "Content", suggestion: "Add testimonial elements", impact: "18% ↑" },
    { type: "Format", suggestion: "Increase visual content", impact: "15% ↑" }
  ];

  const maxValue = Math.max(...performanceData.map(d => d.engagement));

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
            <span className="text-sm text-gray-300 font-medium">Strategy Adaptation Monitor</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${colorConfig.text} font-medium`}>LIVE</span>
            <div className={`h-2 w-2 rounded-full ${colorConfig.bg} animate-pulse`}></div>
          </div>
        </div>
        
        {/* Performance Chart */}
        <motion.div 
          className="bg-gray-800/30 p-4 rounded border border-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white">Message Engagement Rate</span>
            <span className={`text-xs ${colorConfig.text}`}>Today</span>
          </div>
          
          <div className="h-32 flex items-end space-x-1">
            {performanceData.map((data, index) => (
              <motion.div 
                key={data.time}
                className="flex flex-col items-center flex-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isInView ? 1 : 0,
                  height: "auto"
                }}
                transition={{ 
                  delay: animationDelay(2) + (index * 0.05),
                  duration: 0.5 
                }}
              >
                <div 
                  className={`w-full rounded-t ${
                    data.engagement > 50 ? colorConfig.bg : 'bg-gray-600/60'
                  }`}
                  style={{ 
                    height: `${(data.engagement / maxValue) * 100}%`,
                    boxShadow: data.engagement > 50 ? `0 0 8px ${colorConfig.glow}` : 'none'
                  }}
                ></div>
                <div className="text-[9px] text-gray-400 mt-1">{data.time}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Threshold indicator */}
          <div className="relative h-0">
            <motion.div 
              className="absolute bottom-0 w-full border-t border-dashed border-amber-500/50 flex justify-end -mt-[58px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: animationDelay(3), duration: 0.4 }}
            >
              <div className="bg-amber-500/20 text-amber-300 text-[9px] px-1 rounded">
                Target (50%)
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Alert */}
        <motion.div 
          className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded p-2 flex items-start space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(4), duration: 0.5 }}
        >
          <svg className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-xs text-amber-200">
            Engagement threshold exceeded at 3pm. Recommend adjusting strategy to capitalize on momentum.
          </span>
        </motion.div>
        
        {/* Suggested adjustments */}
        <div>
          <div className="text-xs text-gray-300 mb-2">Suggested Strategy Adjustments</div>
          <div className="space-y-2">
            {adjustments.map((adj, index) => (
              <motion.div 
                key={adj.type}
                className="flex items-center justify-between bg-gray-800/40 p-2 rounded border border-gray-700"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: animationDelay(5) + (index * 0.1), duration: 0.4 }}
              >
                <div>
                  <div className={`text-xs ${colorConfig.text} font-medium`}>{adj.type}</div>
                  <div className="text-xs text-white">{adj.suggestion}</div>
                </div>
                <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                  {adj.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Visualization 4: Channel Consistency
function ChannelConsistencyVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Channel data showing consistency scores and message variations
  const channels = [
    { name: "Instagram", icon: "instagram", consistencyScore: 87, lastUpdated: "2h ago" },
    { name: "Twitter", icon: "twitter", consistencyScore: 91, lastUpdated: "4h ago" },
    { name: "Email", icon: "mail", consistencyScore: 83, lastUpdated: "1d ago" },
    { name: "Website", icon: "globe", consistencyScore: 94, lastUpdated: "5h ago" },
    { name: "LinkedIn", icon: "linkedin", consistencyScore: 89, lastUpdated: "8h ago" }
  ];

  // Message comparison data
  const messageComparison = {
    core: "Our eco-friendly products reduce carbon footprint by 30%",
    variations: [
      { channel: "Instagram", text: "♻️ 30% less carbon footprint with our green products! #EcoFriendly", match: 85 },
      { channel: "LinkedIn", text: "Our innovative solutions reduce carbon footprint by 30%, leading the industry in sustainability.", match: 87 },
      { channel: "Email", text: "Discover how our eco-friendly products can reduce your carbon footprint by 30% while saving costs.", match: 82 }
    ]
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
            <span className="text-sm text-gray-300 font-medium">Channel Consistency Monitor</span>
          </div>
          <span className="text-xs text-gray-400">Overall: 88%</span>
        </div>
        
        {/* Channel grid */}
        <div className="grid grid-cols-5 gap-2 mb-5">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              className={`flex flex-col items-center p-2 rounded bg-gray-800/40 border ${
                channel.consistencyScore > 90 
                  ? colorConfig.border 
                  : channel.consistencyScore > 85 
                    ? 'border-amber-500/30' 
                    : 'border-gray-700'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ delay: animationDelay(1) + (index * 0.1), duration: 0.4 }}
              style={channel.consistencyScore > 90 ? { boxShadow: `0 0 10px ${colorConfig.glow}` } : {}}
            >
              <ChannelIcon name={channel.icon} colorConfig={colorConfig} />
              <div className="text-xs text-white mt-1">{channel.name}</div>
              <div className={`text-xs mt-1 ${
                channel.consistencyScore > 90 
                  ? colorConfig.text 
                  : channel.consistencyScore > 85 
                    ? 'text-amber-400' 
                    : 'text-gray-400'
              }`}>
                {channel.consistencyScore}%
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Core message */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-1">Core Message</div>
          <div className="bg-gray-800/50 p-3 rounded border border-gray-700 text-sm text-white">
            &quot;{messageComparison.core}&quot;
          </div>
        </motion.div>
        
        {/* Channel variations */}
        <div className="space-y-3">
          <div className="text-xs text-gray-300">Channel Adaptations</div>
          
          {messageComparison.variations.map((variation, index) => (
            <motion.div
              key={variation.channel}
              className="relative bg-gray-800/40 p-3 rounded border border-gray-700"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -15 }}
              transition={{ delay: animationDelay(3) + (index * 0.15), duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <ChannelIcon name={channels.find(c => c.name === variation.channel)?.icon || ''} size="sm" colorConfig={colorConfig} />
                  <span className="text-xs text-white ml-1">{variation.channel}</span>
                </div>
                <div className={`text-xs ${
                  variation.match > 85 ? colorConfig.text : 'text-amber-400'
                }`}>
                  {variation.match}% match
                </div>
              </div>
              <p className="text-xs text-gray-300">&quot;{variation.text}&quot;</p>
              
              {/* Match indicator */}
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${variation.match > 85 ? colorConfig.bg : 'bg-amber-500/40'}`} 
                  style={{ 
                    width: `${variation.match}%`,
                    boxShadow: variation.match > 85 ? `0 0 5px ${colorConfig.glow}` : ''
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Helper component for channel icons
function ChannelIcon({ 
  name, 
  size = "md", 
  colorConfig 
}: { 
  name: string; 
  size?: "sm" | "md";
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
}) {
  const sizeClass = size === "sm" ? "h-3 w-3" : "h-5 w-5";
  
  if (name === "instagram") {
    return (
      <svg className={`${sizeClass} ${colorConfig.text}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  
  if (name === "twitter") {
    return (
      <svg className={`${sizeClass} ${colorConfig.text}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    );
  }
  
  if (name === "mail") {
    return (
      <svg className={`${sizeClass} ${colorConfig.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  if (name === "globe") {
    return (
      <svg className={`${sizeClass} ${colorConfig.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    );
  }
  
  if (name === "linkedin") {
    return (
      <svg className={`${sizeClass} ${colorConfig.text}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  
  // Default fallback
  return (
    <div className={`${sizeClass} ${colorConfig.bg} rounded-full`}></div>
  );
}

// Visualization 5: Engagement Insights
function EngagementInsightsVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Engagement data for different message types
  const messageTypes = [
    { type: "Case Studies", engagement: 78, change: "+12%" },
    { type: "Product Updates", engagement: 64, change: "+5%" },
    { type: "Industry News", engagement: 51, change: "-3%" },
    { type: "Educational", engagement: 86, change: "+24%" }
  ];

  // Audience engagement factors
  const engagementFactors = [
    { factor: "Visual Content", impact: 87 },
    { factor: "Storytelling", impact: 92 },
    { factor: "Data Points", impact: 76 },
    { factor: "Call to Action", impact: 68 },
    { factor: "Personalization", impact: 81 }
  ];

  // Recent campaign performance
  const recentCampaigns = [
    { name: "Sustainability Series", clicks: 3842, shares: 712, comments: 521 },
    { name: "Product Launch", clicks: 5231, shares: 1204, comments: 847 },
    { name: "Customer Spotlight", clicks: 2967, shares: 541, comments: 326 }
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
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Engagement Insights Dashboard</span>
          </div>
          <div className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse mr-1"></div>
            <span className="text-xs text-green-400">Live Data</span>
          </div>
        </div>
        
        {/* Content types and engagement */}
        <motion.div 
          className="bg-gray-800/30 p-3 rounded border border-gray-700 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Content Type Performance</div>
          <div className="space-y-3">
            {messageTypes.map((type, index) => (
              <motion.div 
                key={type.type}
                className="space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: animationDelay(1) + (index * 0.1), duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white">{type.type}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-400 mr-2">{type.engagement}%</span>
                    <span className={`text-xs ${type.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {type.change}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${
                      type.engagement > 75 ? colorConfig.bg : 
                      type.engagement > 60 ? 'bg-amber-500/50' : 
                      'bg-gray-500'
                    }`} 
                    style={{ width: `${type.engagement}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${type.engagement}%` }}
                    transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Engagement Factors */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Highest-Impact Message Elements</div>
          <div className="flex flex-wrap gap-2">
            {engagementFactors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                className={`px-2 py-1.5 rounded-lg text-xs border ${
                  factor.impact > 85 ? colorConfig.border : 'border-gray-600'
                } ${factor.impact > 85 ? colorConfig.bg + '/30' : 'bg-gray-800/50'}`}
                style={factor.impact > 85 ? { boxShadow: `0 0 8px ${colorConfig.glow}` } : {}}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
                transition={{ delay: animationDelay(3) + (index * 0.1), duration: 0.4 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white">{factor.factor}</span>
                  <span className={factor.impact > 85 ? colorConfig.text : 'text-gray-400'}>
                    {factor.impact}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Recent Campaign Performance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(4), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Recent Campaign Performance</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 text-left text-gray-400 font-medium">Campaign</th>
                  <th className="py-2 text-right text-gray-400 font-medium">Clicks</th>
                  <th className="py-2 text-right text-gray-400 font-medium">Shares</th>
                  <th className="py-2 text-right text-gray-400 font-medium">Comments</th>
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((campaign, index) => (
                  <motion.tr 
                    key={campaign.name}
                    className="border-b border-gray-800"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
                    transition={{ delay: animationDelay(4) + (index * 0.15), duration: 0.4 }}
                  >
                    <td className="py-2 text-white">{campaign.name}</td>
                    <td className="py-2 text-right text-gray-300">{campaign.clicks.toLocaleString()}</td>
                    <td className="py-2 text-right text-gray-300">{campaign.shares.toLocaleString()}</td>
                    <td className="py-2 text-right text-gray-300">{campaign.comments.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Insights summary */}
          <motion.div 
            className={`mt-3 p-2 rounded ${colorConfig.bg}/10 border ${colorConfig.border}/30 text-xs`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: animationDelay(5), duration: 0.5 }}
          >
            <div className="flex items-start gap-2">
              <svg className={`h-4 w-4 ${colorConfig.text} mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white">
                Educational content with visual storytelling elements is driving 86% higher engagement than other content types. Consider pivoting strategy to focus on these elements.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 6: Risk Detection
function RiskDetectionVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Risk assessment data
  const riskData = [
    { 
      type: "Ambiguity", 
      severity: "Medium",
      description: "Potential confusion in product benefits messaging",
      impact: 65,
      action: "Clarify performance metrics"
    },
    { 
      type: "Competitor Response", 
      severity: "High",
      description: "Likely counterclaim to sustainability statements",
      impact: 82,
      action: "Prepare evidence documentation"
    },
    { 
      type: "Cultural Sensitivity", 
      severity: "Low",
      description: "Metaphor may not translate well globally",
      impact: 45,
      action: "Review regional adaptations"
    }
  ];

  // Problem phrases detected
  const problemPhrases = [
    { text: "revolutionary solution", issue: "Unsubstantiated claim", alternative: "innovative approach" },
    { text: "guaranteed results", issue: "Legal liability", alternative: "demonstrated outcomes" },
    { text: "better than competitors", issue: "Comparative claim", alternative: "industry-leading performance" }
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
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Risk Detection System</span>
          </div>
          <div className="bg-gray-800 rounded-full px-2 py-0.5 text-[10px] text-gray-300 flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></div>
            3 issues detected
          </div>
        </div>
        
        {/* Message preview with highlighted issues */}
        <motion.div 
          className="bg-gray-800/40 p-3 rounded border border-gray-700 mb-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(1), duration: 0.4 }}
        >
          <div className="text-xs text-gray-400 mb-1 flex items-center">
            <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Draft Message
          </div>
          <p className="text-xs text-white leading-relaxed">
            Our <span className="bg-amber-500/30 border-b border-amber-500 px-0.5">revolutionary solution</span> provides <span className="bg-red-500/30 border-b border-red-500 px-0.5">guaranteed results</span> that are <span className="bg-amber-500/30 border-b border-amber-500 px-0.5">better than competitors</span>. With industry-leading sustainability practices, we deliver consistent performance across all metrics.
          </p>
          
          {/* Warning badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            High Risk
          </div>
        </motion.div>
        
        {/* Risk scores */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Risk Assessment</div>
          <div className="space-y-3">
            {riskData.map((risk, index) => (
              <motion.div 
                key={risk.type}
                className={`p-2 bg-gray-800/40 rounded border ${
                  risk.severity === 'High' 
                    ? 'border-red-500/40' 
                    : risk.severity === 'Medium'
                      ? 'border-amber-500/40'
                      : 'border-gray-600'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: animationDelay(2) + (index * 0.15), duration: 0.4 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-xs text-white font-medium mr-2">{risk.type}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        risk.severity === 'High' 
                          ? 'bg-red-900/60 text-red-300' 
                          : risk.severity === 'Medium'
                            ? 'bg-amber-900/60 text-amber-300'
                            : 'bg-gray-700 text-gray-300'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{risk.description}</p>
                  </div>
                  <div className={`text-xs ${
                    risk.impact > 70 ? 'text-red-400' : 
                    risk.impact > 50 ? 'text-amber-400' : 
                    'text-gray-400'
                  }`}>
                    {risk.impact}%
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-[10px] text-blue-300">{risk.action}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Problematic phrases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Flagged Phrases</div>
          <div className="space-y-2 text-xs">
            {problemPhrases.map((phrase, index) => (
              <motion.div 
                key={phrase.text}
                className="flex items-start bg-gray-800/30 p-2 rounded border border-gray-700"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
                transition={{ delay: animationDelay(3) + (index * 0.1), duration: 0.4 }}
              >
                <div className="mr-2 mt-0.5">
                  <svg className="h-3 w-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-red-300">&quot;{phrase.text}&quot;</span>
                    <span className="text-gray-400">{phrase.issue}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <svg className="h-3 w-3 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-300">Suggest: &quot;{phrase.alternative}&quot;</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function MessagingStrategySections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
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