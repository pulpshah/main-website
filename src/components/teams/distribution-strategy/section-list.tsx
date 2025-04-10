"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Command, 
  Clock, 
  Check, 
  Sliders, 
  Target, 
  TrendingUp 
} from "lucide-react";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "pink" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

const colorMap = {
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

// Map of icon names to their components
const IconMap = {
  Command,
  Clock,
  Check,
  Sliders,
  Target,
  TrendingUp
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
            className="relative h-[650px] md:h-[650px] w-full rounded-xl overflow-hidden backdrop-blur"
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
              <UnifiedPlatformVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 1 && (
              <SchedulingVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 2 && (
              <ConsistencyVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 3 && (
              <PlatformOptimizationVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 4 && (
              <AudienceTargetingVisual colorConfig={colorConfig} isInView={isInView} />
            )}
            {index === 5 && (
              <PerformanceTrackingVisual colorConfig={colorConfig} isInView={isInView} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Visualization 1: Unified Platform Control
function UnifiedPlatformVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Social media platform data
  const platforms = [
    { name: "Instagram", icon: "instagram", active: true },
    { name: "Twitter", icon: "twitter", active: true },
    { name: "Facebook", icon: "facebook", active: true },
    { name: "LinkedIn", icon: "linkedin", active: true },
    { name: "YouTube", icon: "youtube", active: false },
    { name: "TikTok", icon: "tiktok", active: false },
    { name: "Email", icon: "mail", active: true },
    { name: "Blog", icon: "file-text", active: true }
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
            <span className="text-sm text-gray-300 font-medium">Unified Distribution Dashboard</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">5 active channels</span>
            <div className={`h-2 w-2 rounded-full ${colorConfig.bg} animate-pulse`}></div>
          </div>
        </div>
        
        {/* Platform Grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
              transition={{ delay: animationDelay(1) + (index * 0.1), duration: 0.4 }}
              className={`p-3 rounded-lg ${platform.active ? `${colorConfig.bg} border ${colorConfig.border}` : 'bg-gray-800/40 border border-gray-700'} flex flex-col items-center`}
              style={platform.active ? { boxShadow: `0 0 15px ${colorConfig.glow}` } : {}}
            >
              <PlatformIcon name={platform.icon} active={platform.active} colorConfig={colorConfig} />
              <span className={`text-xs mt-2 ${platform.active ? 'text-white' : 'text-gray-400'}`}>{platform.name}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Content Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="bg-gray-800/40 p-3 rounded border border-gray-700 mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white">Campaign: Summer Launch</span>
            <span className={`text-xs ${colorConfig.text} px-2 py-0.5 rounded-full border ${colorConfig.border}`}>Ready</span>
          </div>
          <p className="text-xs text-gray-300">Introducing our new summer collection! Perfect for those hot days and cool nights. #SummerVibes</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center">
              <span className="text-[8px] text-white">IMG</span>
            </div>
            <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center">
              <span className="text-[8px] text-white">VID</span>
            </div>
          </div>
        </motion.div>
        
        {/* Channel Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Distribution Status</div>
          <div className="flex flex-wrap gap-2">
            <div className={`px-2 py-1 rounded text-xs ${colorConfig.bg} ${colorConfig.border}`}>
              <span className="text-white">5/8 Channels Ready</span>
            </div>
            <div className="px-2 py-1 rounded text-xs bg-blue-500/20 border border-blue-500/30">
              <span className="text-blue-300">2 Drafts</span>
            </div>
            <div className="px-2 py-1 rounded text-xs bg-amber-500/20 border border-amber-500/30">
              <span className="text-amber-300">1 Needs Review</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 2: Scheduling Calendar
function SchedulingVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return isInView ? 0.6 + (index * 0.1) : 0;
  };

  // Calendar week data
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = ["9am", "12pm", "3pm", "6pm", "9pm"];
  
  // Posts scheduled at certain times
  const scheduledPosts = [
    { day: "Mon", time: "12pm", platform: "Instagram" },
    { day: "Mon", time: "3pm", platform: "Twitter" },
    { day: "Tue", time: "9am", platform: "LinkedIn" },
    { day: "Tue", time: "6pm", platform: "Facebook" },
    { day: "Wed", time: "12pm", platform: "Email" },
    { day: "Thu", time: "3pm", platform: "Instagram" },
    { day: "Fri", time: "9am", platform: "Twitter" },
    { day: "Fri", time: "6pm", platform: "Facebook" },
    { day: "Sun", time: "3pm", platform: "Instagram" }
  ];

  // Check if a post is scheduled at a given day and time
  const isScheduled = (day: string, time: string) => {
    return scheduledPosts.find(post => post.day === day && post.time === time);
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
        {/* Calendar Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Content Calendar</span>
          </div>
          <div className="text-xs text-gray-400">
            June 2023
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="mb-4">
          {/* Days header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDays.map((day) => (
              <div key={day} className="text-[10px] text-center text-gray-400">{day}</div>
            ))}
          </div>
          
          {/* Time slots grid */}
          <div className="space-y-2">
            {timeSlots.map((time, timeIndex) => (
              <motion.div 
                key={time}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
                transition={{ delay: animationDelay(1) + (timeIndex * 0.1), duration: 0.5 }}
                className="grid grid-cols-7 gap-1"
              >
                {weekDays.map((day) => {
                  const post = isScheduled(day, time);
                  return (
                    <div 
                      key={`${day}-${time}`} 
                      className={`h-10 rounded flex items-center justify-center ${
                        post ? `${colorConfig.bg} border ${colorConfig.border}` : 'bg-gray-800/30 border border-gray-700'
                      }`}
                      style={post ? { boxShadow: `0 0 10px ${colorConfig.glow}` } : {}}
                    >
                      {post && (
                        <div className="text-[9px] text-white">
                          {post.platform}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Automation Settings */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
        >
          <div className="text-xs text-gray-300 mb-2">Smart Scheduling</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800/40 p-3 rounded border border-gray-700">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-white">Peak Time Optimization</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Posts automatically schedule during highest engagement periods</p>
            </div>
            <div className="bg-gray-800/40 p-3 rounded border border-gray-700">
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-white">Frequency Balancer</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Maintains optimal posting cadence across all channels</p>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex justify-between"
        >
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Add Post
          </button>
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Optimize Schedule
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Publish Now
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Helper function for platform icons
function PlatformIcon({ 
  name, 
  active = true,
  colorConfig 
}: { 
  name: string; 
  active?: boolean;
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
}) {
  const iconColor = active ? colorConfig.text : "text-gray-500";
  
  if (name === "instagram") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  
  if (name === "twitter") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    );
  }
  
  if (name === "facebook") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  
  if (name === "linkedin") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  
  if (name === "mail") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  
  if (name === "youtube") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  
  if (name === "tiktok") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }

  if (name === "file-text") {
    return (
      <svg className={`h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }
  
  // Default placeholder
  return (
    <div className={`h-5 w-5 rounded-full ${active ? colorConfig.bg : 'bg-gray-700'}`}></div>
  );
}

// Visualization 3: Consistency Across Channels
function ConsistencyVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
  isInView: boolean; 
}) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Message variants for different platforms
  const messageVariants = [
    { 
      platform: "Instagram", 
      message: "Summer vibes 🌞 Check our new collection! #SummerFashion", 
      format: "Short with hashtags and emojis",
      icon: "instagram"
    },
    { 
      platform: "LinkedIn", 
      message: "Introducing our new summer collection designed for the modern professional. Perfect for both office and outdoor events.", 
      format: "Professional, longer form",
      icon: "linkedin"
    },
    { 
      platform: "Email", 
      message: "Dear valued customer, We're excited to announce our new summer collection, now available online and in stores...", 
      format: "Formal, detailed with CTA",
      icon: "mail"
    },
    { 
      platform: "Twitter", 
      message: "Our summer collection just dropped! Get yours before they're gone. Link in bio ☀️", 
      format: "Concise with urgency",
      icon: "twitter"
    }
  ];

  // Key message elements that stay consistent
  const keyElements = [
    "New summer collection",
    "Available now",
    "Stylish designs",
    "Limited time"
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
            <span className="text-sm text-gray-300 font-medium">Cross-Channel Consistency</span>
          </div>
          <div className="text-xs text-gray-400">
            Brand Voice Analysis
          </div>
        </div>
        
        {/* Core Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className={`p-3 mb-4 rounded border ${colorConfig.border} ${colorConfig.bg}`}
        >
          <div className="text-xs text-white mb-2 font-semibold">Core Message Elements</div>
          <div className="grid grid-cols-2 gap-2">
            {keyElements.map((element, index) => (
              <div key={index} className="bg-gray-800/40 rounded-md px-2 py-1 text-xs text-white flex items-center">
                <div className={`w-2 h-2 rounded-full ${colorConfig.bg} mr-2`}></div>
                {element}
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Platform Message Variants */}
        <div className="space-y-3 mb-3">
          {messageVariants.map((variant, index) => (
            <motion.div
              key={variant.platform}
              initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (index % 2 === 0 ? -10 : 10) }}
              transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.4 }}
              className="bg-gray-800/40 p-3 rounded border border-gray-700"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <PlatformIcon name={variant.icon} active={true} colorConfig={colorConfig} />
                  <span className="ml-2 text-xs text-white">{variant.platform}</span>
                </div>
                <span className="text-[9px] text-gray-400">{variant.format}</span>
              </div>
              <p className="text-xs text-gray-300">{variant.message}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Consistency Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex items-center justify-between bg-gray-800/40 p-2 rounded border border-gray-700"
        >
          <div className="text-xs text-white">Brand Consistency Score</div>
          <div className={`text-xs ${colorConfig.text} px-2 py-0.5 rounded-full border ${colorConfig.border}`}>
            98%
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 4: Platform Optimization
function PlatformOptimizationVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
  isInView: boolean; 
}) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Platform-specific optimizations
  const platformOptimizations = [
    {
      platform: "Instagram",
      icon: "instagram",
      contentType: "Visual Stories",
      optimizations: [
        { name: "Image Ratio", value: "4:5" },
        { name: "Text Overlay", value: "Minimal" },
        { name: "Hashtags", value: "5-10" }
      ]
    },
    {
      platform: "LinkedIn",
      icon: "linkedin",
      contentType: "Professional Articles",
      optimizations: [
        { name: "Content Length", value: "1200-2000 words" },
        { name: "Tone", value: "Professional" },
        { name: "Format", value: "Case Study" }
      ]
    },
    {
      platform: "Twitter",
      icon: "twitter",
      contentType: "Quick Updates",
      optimizations: [
        { name: "Character Count", value: "<280 chars" },
        { name: "Media", value: "GIFs + Images" },
        { name: "CTA", value: "Clear + Direct" }
      ]
    },
    {
      platform: "Email",
      icon: "mail",
      contentType: "Newsletters",
      optimizations: [
        { name: "Subject Line", value: "30-50 chars" },
        { name: "Layout", value: "Single Column" },
        { name: "Links", value: "3-5 max" }
      ]
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
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Platform-Specific Optimization</span>
          </div>
          <div className="text-xs text-gray-400">
            Content Adaptation Engine
          </div>
        </div>
        
        {/* Selected Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(1), duration: 0.5 }}
          className="p-3 mb-4 bg-gray-800/40 rounded border border-gray-700"
        >
          <div className="text-xs text-white mb-2">Original Content</div>
          <p className="text-xs text-gray-300">
            Our new eco-friendly product line represents our commitment to sustainability without compromising on quality or design.
          </p>
          <div className="mt-2 flex items-center">
            <span className={`text-[10px] ${colorConfig.text} px-2 py-0.5 rounded-full border ${colorConfig.border}`}>
              Ready to optimize
            </span>
          </div>
        </motion.div>
        
        {/* Platform Optimizations */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {platformOptimizations.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
              transition={{ delay: animationDelay(2) + (index * 0.1), duration: 0.4 }}
              className={`p-3 rounded border ${colorConfig.border} ${colorConfig.bg}`}
            >
              <div className="flex items-center mb-2">
                <PlatformIcon name={platform.icon} active={true} colorConfig={colorConfig} />
                <div className="ml-2">
                  <div className="text-xs text-white">{platform.platform}</div>
                  <div className="text-[9px] text-gray-300">{platform.contentType}</div>
                </div>
              </div>
              
              <div className="space-y-1.5">
                {platform.optimizations.map((opt, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-400">{opt.name}</span>
                    <span className="text-[9px] text-white bg-gray-800/60 px-1.5 py-0.5 rounded">{opt.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Apply Optimizations Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex justify-center"
        >
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Apply All Optimizations
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 5: Audience Targeting
function AudienceTargetingVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
  isInView: boolean; 
}) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Audience segments data
  const audienceSegments = [
    { 
      name: "Tech Enthusiasts", 
      size: 32, 
      engagementRate: 4.8,
      peakHours: "7-9 PM",
      platforms: ["Twitter", "LinkedIn", "Reddit"],
      selected: true
    },
    { 
      name: "Industry Leaders", 
      size: 15, 
      engagementRate: 3.2,
      peakHours: "8-10 AM",
      platforms: ["LinkedIn", "Email"],
      selected: true
    },
    { 
      name: "New Customers", 
      size: 28, 
      engagementRate: 2.5,
      peakHours: "12-2 PM",
      platforms: ["Instagram", "Facebook"],
      selected: false
    },
    { 
      name: "Loyal Users", 
      size: 25, 
      engagementRate: 5.1,
      peakHours: "5-8 PM",
      platforms: ["Email", "SMS", "App"],
      selected: true
    }
  ];
  
  // Engagement data by hour
  const hourlyEngagement = [
    { hour: "6 AM", rate: 1.2 },
    { hour: "8 AM", rate: 3.8 },
    { hour: "10 AM", rate: 2.9 },
    { hour: "12 PM", rate: 2.5 },
    { hour: "2 PM", rate: 2.1 },
    { hour: "4 PM", rate: 2.7 },
    { hour: "6 PM", rate: 4.2 },
    { hour: "8 PM", rate: 4.9 },
    { hour: "10 PM", rate: 3.1 }
  ];
  
  // Get max engagement for scaling the chart
  const maxEngagement = Math.max(...hourlyEngagement.map(h => h.rate));
  
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
            <span className="text-sm text-gray-300 font-medium">Audience Targeting Dashboard</span>
          </div>
          <div className="text-xs text-gray-400">
            Campaign: Product Launch
          </div>
        </div>
        
        {/* Audience Segments */}
        <div className="mb-4">
          <div className="text-xs text-white mb-2">Target Audience Segments</div>
          <div className="space-y-2">
            {audienceSegments.map((segment, index) => (
              <motion.div 
                key={segment.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                transition={{ delay: animationDelay(1) + (index * 0.1), duration: 0.4 }}
                className={`p-2 rounded border ${segment.selected ? `${colorConfig.border} ${colorConfig.bg}` : 'border-gray-700 bg-gray-800/40'}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${segment.selected ? 'bg-white' : 'bg-gray-600'} mr-2`}></div>
                    <span className="text-xs text-white">{segment.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{segment.size}% of audience</span>
                </div>
                
                <div className="mt-1.5 flex justify-between text-[9px] text-gray-400">
                  <div>Engagement: <span className="text-white">{segment.engagementRate}%</span></div>
                  <div>Peak: <span className="text-white">{segment.peakHours}</span></div>
                </div>
                
                <div className="mt-1 flex flex-wrap gap-1">
                  {segment.platforms.map(platform => (
                    <span key={platform} className="text-[8px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">
                      {platform}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Engagement Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Daily Engagement Pattern</div>
          <div className="bg-gray-800/40 p-3 rounded border border-gray-700">
            <div className="flex items-end h-20 space-x-1">
              {hourlyEngagement.map((hour, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full ${colorConfig.bg}`} 
                    style={{ 
                      height: `${(hour.rate / maxEngagement) * 100}%`,
                      opacity: (hour.rate / maxEngagement) * 0.8 + 0.2
                    }}
                  ></div>
                  <span className="text-[8px] text-gray-400 mt-1">{hour.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Targeting Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(3), duration: 0.5 }}
          className="flex justify-between"
        >
          <button className={`text-xs px-3 py-1.5 rounded bg-gray-800 border ${colorConfig.border} text-white`}>
            Edit Segments
          </button>
          <button className={`text-xs px-3 py-1.5 rounded ${colorConfig.bg} border ${colorConfig.border} text-white`}>
            Schedule Optimal Times
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Visualization 6: Performance Tracking
function PerformanceTrackingVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap]; 
  isInView: boolean; 
}) {
  const animationDelay = (index: number) => isInView ? 0.6 + (index * 0.1) : 0;
  
  // Performance metrics data
  const performanceMetrics = [
    { 
      name: "Engagement Rate",
      current: "4.8%",
      previous: "3.2%",
      change: "+1.6%",
      trend: "up",
      isPositive: true
    },
    { 
      name: "Click-Through Rate",
      current: "2.3%",
      previous: "1.9%",
      change: "+0.4%",
      trend: "up",
      isPositive: true
    },
    { 
      name: "Conversion Rate",
      current: "1.2%",
      previous: "1.4%",
      change: "-0.2%",
      trend: "down",
      isPositive: false
    },
    { 
      name: "Audience Growth",
      current: "567",
      previous: "349",
      change: "+218",
      trend: "up",
      isPositive: true
    },
  ];
  
  // Channel performance data
  const channelPerformance = [
    { name: "Instagram", value: 78, target: 70 },
    { name: "Email", value: 92, target: 85 },
    { name: "Twitter", value: 65, target: 75 },
    { name: "LinkedIn", value: 83, target: 80 }
  ];
  
  // Real-time alerts
  const alerts = [
    { 
      type: "warning", 
      message: "Twitter engagement down 12% in the last hour", 
      time: "15 min ago" 
    },
    { 
      type: "success", 
      message: "LinkedIn post exceeding expected reach by 45%", 
      time: "32 min ago" 
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
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${colorConfig.bg} mr-2`}></div>
            <span className="text-sm text-gray-300 font-medium">Real-Time Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${colorConfig.bg} animate-pulse`}></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ delay: animationDelay(1) + (index * 0.1), duration: 0.4 }}
              className="bg-gray-800/40 p-3 rounded border border-gray-700"
            >
              <div className="text-[10px] text-gray-400 mb-1">{metric.name}</div>
              <div className="flex justify-between items-end">
                <div className="text-sm text-white font-semibold">{metric.current}</div>
                <div className="flex items-center">
                  <span className={`text-[10px] ${metric.isPositive ? 'text-green-400' : 'text-red-400'} mr-1`}>
                    {metric.change}
                  </span>
                  <svg 
                    className={`h-3 w-3 ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={metric.isPositive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                    />
                  </svg>
                </div>
              </div>
              <div className="text-[9px] text-gray-500 mt-1">vs. {metric.previous} prev period</div>
            </motion.div>
          ))}
        </div>
        
        {/* Channel Performance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: animationDelay(2), duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-xs text-white mb-2">Channel Performance vs. Target</div>
          <div className="space-y-2">
            {channelPerformance.map((channel) => (
              <div key={channel.name} className="bg-gray-800/40 px-3 py-2 rounded border border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-white">{channel.name}</span>
                  <span className="text-[10px] text-gray-400">
                    {channel.value}% of Target ({channel.target}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${channel.value >= channel.target ? 'bg-green-500' : colorConfig.bg}`} 
                    style={{ width: `${(channel.value / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Alerts and Actions */}
        <div className="grid grid-cols-3 gap-3">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
            transition={{ delay: animationDelay(3), duration: 0.5 }}
            className="col-span-2 bg-gray-800/40 p-3 rounded border border-gray-700"
          >
            <div className="text-xs text-white mb-2">Real-time Alerts</div>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${alert.type === 'warning' ? 'bg-amber-500' : 'bg-green-500'} mr-2 flex-shrink-0`}></div>
                  <div>
                    <div className="text-[10px] text-white">{alert.message}</div>
                    <div className="text-[8px] text-gray-400">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 10 }}
            transition={{ delay: animationDelay(3), duration: 0.5 }}
            className="flex flex-col justify-between bg-gray-800/40 p-3 rounded border border-gray-700"
          >
            <div className="text-xs text-white mb-2">Actions</div>
            <button className={`text-[10px] mb-2 px-2 py-1 rounded ${colorConfig.bg} text-white`}>
              Boost Posts
            </button>
            <button className="text-[10px] px-2 py-1 rounded bg-gray-700 text-white">
              Adjust Targets
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function DistributionStrategySections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
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