"use client";

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue";
  icon: string;
  index: number;
}

// Define icon map for different section icons
const iconMap = {
  Code: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  User: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Database: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Shield: (className: string) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

// Define color configurations for different section colors
const colorMap = {
  blue: {
    primary: "text-blue-400",
    secondary: "text-blue-300",
    accent: "text-cyan-400",
    background: "bg-blue-500",
    backgroundOpacity: "bg-blue-500/10",
    backgroundHover: "hover:bg-blue-500/20",
    backgroundActive: "bg-blue-500/20",
    backgroundGradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/10",
    shadowAccent: "shadow-cyan-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  green: {
    primary: "text-green-400",
    secondary: "text-green-300",
    accent: "text-emerald-400",
    background: "bg-green-500",
    backgroundOpacity: "bg-green-500/10",
    backgroundHover: "hover:bg-green-500/20",
    backgroundActive: "bg-green-500/20",
    backgroundGradient: "bg-gradient-to-br from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    shadow: "shadow-green-500/10",
    shadowAccent: "shadow-emerald-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  purple: {
    primary: "text-purple-400",
    secondary: "text-purple-300",
    accent: "text-pink-400",
    background: "bg-purple-500",
    backgroundOpacity: "bg-purple-500/10",
    backgroundHover: "hover:bg-purple-500/20",
    backgroundActive: "bg-purple-500/20",
    backgroundGradient: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    shadow: "shadow-purple-500/10",
    shadowAccent: "shadow-pink-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
  amber: {
    primary: "text-amber-400",
    secondary: "text-amber-300",
    accent: "text-orange-400",
    background: "bg-amber-500",
    backgroundOpacity: "bg-amber-500/10",
    backgroundHover: "hover:bg-amber-500/20",
    backgroundActive: "bg-amber-500/20",
    backgroundGradient: "bg-gradient-to-br from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    shadow: "shadow-amber-500/10",
    shadowAccent: "shadow-orange-500/10",
    textDark: "text-gray-800",
    textLight: "text-white",
  },
};

function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;
  const colorConfig = colorMap[color];
  
  return (
    <div
      ref={ref}
      className={`py-16 md:py-24 px-4 relative overflow-hidden ${isEven ? 'bg-gray-900/30' : 'bg-transparent'}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${imageSide === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}>
          {/* Text content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorConfig.backgroundOpacity}`}>
                {icon && iconMap[icon as keyof typeof iconMap](`w-6 h-6 ${colorConfig.primary}`)}
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${colorConfig.primary}`}>
                {title}
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex-1 w-full max-w-xl">
            <TechnologyVisual index={index} colorConfig={colorConfig} isInView={isInView} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TechnologyVisual({ 
  index, 
  colorConfig, 
  isInView 
}: { 
  index: number; 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Return different visuals based on section index
  switch (index) {
    case 0:
      return <AIDeploymentVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <UserExperienceVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <UnstructuredDataVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <EnterprisePerformanceVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return null;
  }
}

function AIDeploymentVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[650px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Developer Workflow Area */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Pulp AI Deployment Workflow</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
        </div>
        
        {/* Main workspace with stages */}
        <div className="flex-1 flex flex-col">
          {/* Pipeline View */}
          <div 
            className="relative flex items-center justify-between py-3 px-2 mb-4"
            style={animationDelay(1)}
          >
            {/* Pipeline Stages */}
            <div className="absolute h-1 bg-gray-700 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
            
            {/* Stage 1: Prototype */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${colorConfig.backgroundActive} flex items-center justify-center border ${colorConfig.border}`}>
                <span className="text-xs font-medium text-white">1</span>
              </div>
              <span className="text-xs mt-1 text-gray-400">Prototype</span>
            </div>
            
            {/* Stage 2: Develop */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${colorConfig.backgroundOpacity} flex items-center justify-center border ${colorConfig.border}`}>
                <span className="text-xs font-medium text-white">2</span>
              </div>
              <span className="text-xs mt-1 text-gray-400">Develop</span>
            </div>
            
            {/* Stage 3: Test */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700`}>
                <span className="text-xs font-medium text-gray-400">3</span>
              </div>
              <span className="text-xs mt-1 text-gray-500">Test</span>
            </div>
            
            {/* Stage 4: Deploy */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700`}>
                <span className="text-xs font-medium text-gray-400">4</span>
              </div>
              <span className="text-xs mt-1 text-gray-500">Deploy</span>
            </div>
            
            {/* Stage 5: Scale */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700`}>
                <span className="text-xs font-medium text-gray-400">5</span>
              </div>
              <span className="text-xs mt-1 text-gray-500">Scale</span>
            </div>
          </div>
          
          {/* Code Editor and Preview */}
          <div className="flex-1 grid grid-cols-5 gap-4">
            {/* Code Editor Panel */}
            <div 
              className="col-span-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
              style={animationDelay(2)}
            >
              <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400">model.py</span>
                <div className="w-4"></div> {/* Empty div for alignment */}
              </div>
              
              <div className="text-sm font-mono p-3 text-gray-300 overflow-hidden">
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">1</span>
                  <span className="text-blue-400">import</span>
                  <span className="text-gray-300 ml-1">pulp</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">2</span>
                  <span></span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">3</span>
                  <span className="text-blue-400">class</span>
                  <span className={`ml-1 ${colorConfig.primary}`}>AIWorkflow</span>
                  <span className="text-gray-300">:</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">4</span>
                  <span className="ml-4 text-blue-400">def</span>
                  <span className="text-cyan-300 ml-1">__init__</span>
                  <span className="text-gray-300">(self, config):</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">5</span>
                  <span className="ml-8 text-gray-300">self.client = pulp.Client(config)</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">6</span>
                  <span className="ml-8 text-gray-300">self.model = pulp.Model(&quot;text-analysis&quot;)</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">7</span>
                  <span></span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">8</span>
                  <span className="ml-4 text-blue-400">def</span>
                  <span className="text-cyan-300 ml-1">process</span>
                  <span className="text-gray-300">(self, input_data):</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">9</span>
                  <span className="ml-8 text-gray-300">result = self.model.analyze(input_data)</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-6 text-right pr-2">10</span>
                  <span className="ml-8 text-blue-400">return</span>
                  <span className="text-gray-300 ml-1">result</span>
                </div>
              </div>
            </div>
            
            {/* API Console */}
            <div 
              className="col-span-2 flex flex-col overflow-hidden"
              style={animationDelay(3)}
            >
              {/* API Request/Response Panel */}
              <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <div className="flex items-center px-3 py-2 bg-gray-800 border-b border-gray-700">
                  <span className={`text-xs font-medium ${colorConfig.primary}`}>API Console</span>
                </div>
                
                <div className="p-3 space-y-3 text-xs font-mono">
                  {/* Request */}
                  <div>
                    <div className="text-gray-400 mb-1">POST /api/v1/analyze</div>
                    <div className="bg-gray-800 p-2 rounded border border-gray-700">
                      <span className="text-gray-300">{"{"}</span><br />
                      <span className="ml-2 text-green-300">&quot;text&quot;</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-amber-300">&quot;Analyze this message...&quot;</span><br />
                      <span className="ml-2 text-green-300">&quot;options&quot;</span>
                      <span className="text-gray-300">: {"{"}</span><br />
                      <span className="ml-4 text-green-300">&quot;detailed&quot;</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-blue-300">true</span><br />
                      <span className="ml-2 text-gray-300">{"}"}</span><br />
                      <span className="text-gray-300">{"}"}</span>
                    </div>
                  </div>
                  
                  {/* Response */}
                  <div>
                    <div className="text-gray-400 mb-1">Response (200 OK)</div>
                    <div className="bg-gray-800 p-2 rounded border border-gray-700">
                      <span className="text-gray-300">{"{"}</span><br />
                      <span className="ml-2 text-green-300">&quot;success&quot;</span>
                      <span className="text-gray-300">: </span>
                      <span className="text-blue-300">true</span>,<br />
                      <span className="ml-2 text-green-300">&quot;analysis&quot;</span>
                      <span className="text-gray-300">: {"{"} ... {"}"}</span><br />
                      <span className="text-gray-300">{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Metrics Dashboard */}
              <div 
                className="mt-4 h-24 bg-gray-900 rounded-lg border border-gray-800 p-3"
                style={animationDelay(4)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Metrics</span>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded bg-gray-800 p-2 text-center">
                    <div className={`text-xs ${colorConfig.accent}`}>Latency</div>
                    <div className="text-sm text-white font-medium">24ms</div>
                  </div>
                  <div className="rounded bg-gray-800 p-2 text-center">
                    <div className={`text-xs ${colorConfig.accent}`}>Success</div>
                    <div className="text-sm text-white font-medium">99.8%</div>
                  </div>
                  <div className="rounded bg-gray-800 p-2 text-center">
                    <div className={`text-xs ${colorConfig.accent}`}>Requests</div>
                    <div className="text-sm text-white font-medium">1.2K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserExperienceVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[600px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Adaptive AI User Experience Platform */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Adaptive AI User Experience</span>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          {/* User Interaction Panel */}
          <div 
            className="col-span-1 bg-gray-900 rounded-lg border border-gray-800 flex flex-col"
            style={animationDelay(1)}
          >
            <div className={`px-3 py-2 border-b border-gray-800 ${colorConfig.backgroundOpacity} rounded-t-lg`}>
              <span className="text-xs font-medium text-white">User Query</span>
            </div>
            
            <div className="p-3 flex-1 space-y-4 overflow-hidden">
              {/* User message bubbles */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-gray-800 p-2 rounded-lg rounded-tr-none text-xs text-gray-300">
                  Can you help me find relevant information about machine learning?
                </div>
              </div>
              
              <div className="flex">
                <div className={`max-w-[85%] ${colorConfig.backgroundOpacity} p-2 rounded-lg rounded-tl-none text-xs text-gray-200`}>
                  I&apos;d be happy to help! What specific aspects of machine learning are you interested in?
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-gray-800 p-2 rounded-lg rounded-tr-none text-xs text-gray-300">
                  I&apos;m looking for tutorials on image classification
                </div>
              </div>
              
              <div className="flex">
                <div className={`max-w-[85%] ${colorConfig.backgroundOpacity} p-2 rounded-lg rounded-tl-none text-xs text-gray-200`}>
                  Based on your interests, here are the most relevant tutorials for image classification...
                </div>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-800">
              <div className="relative">
                <input type="text" className="w-full bg-gray-800 border border-gray-700 rounded-lg text-xs text-gray-300 px-3 py-2 placeholder-gray-500" placeholder="Type your message..." />
                <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${colorConfig.primary} p-1 rounded-full hover:bg-gray-700`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* AI Processing Panel - Shows NLU in action */}
          <div 
            className="col-span-2 flex flex-col space-y-4"
            style={animationDelay(2)}
          >
            {/* Intent Recognition */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-3 h-1/3">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${colorConfig.primary}`}>Intent Recognition</span>
                <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">98% Confidence</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-20 text-xs text-gray-400">Primary:</div>
                  <div className="flex-1">
                    <div className="h-5 relative rounded-full bg-gray-800">
                      <div className={`absolute left-0 top-0 bottom-0 ${colorConfig.backgroundActive} rounded-full`} style={{ width: "80%" }}></div>
                      <div className="absolute left-2 top-0 bottom-0 flex items-center text-[10px] text-white">LEARNING_RESOURCE_REQUEST</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-20 text-xs text-gray-400">Secondary:</div>
                  <div className="flex-1">
                    <div className="h-5 relative rounded-full bg-gray-800">
                      <div className={`absolute left-0 top-0 bottom-0 ${colorConfig.backgroundOpacity} rounded-full`} style={{ width: "45%" }}></div>
                      <div className="absolute left-2 top-0 bottom-0 flex items-center text-[10px] text-white">TOPIC_SPECIFICATION</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Entity Extraction */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-3 h-1/3"
              style={animationDelay(3)}
            >
              <div className="mb-2">
                <span className={`text-xs font-medium ${colorConfig.primary}`}>Entity Extraction</span>
              </div>
              
              <div className="p-2 bg-gray-800 rounded border border-gray-700 text-xs font-mono">
                <span className="text-gray-300">I&apos;m looking for </span>
                <span className={`${colorConfig.accent} px-1 rounded ${colorConfig.backgroundOpacity}`}>tutorials</span>
                <span className="text-gray-300"> on </span>
                <span className={`${colorConfig.primary} px-1 rounded ${colorConfig.backgroundOpacity}`}>image classification</span>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded bg-gray-800 p-2">
                  <div className={`text-[10px] ${colorConfig.accent}`}>RESOURCE_TYPE</div>
                  <div className="text-xs text-white">tutorials</div>
                </div>
                <div className="rounded bg-gray-800 p-2">
                  <div className={`text-[10px] ${colorConfig.primary}`}>TOPIC</div>
                  <div className="text-xs text-white">image classification</div>
                </div>
              </div>
            </div>
            
            {/* Personalization Elements */}
            <div 
              className="bg-gray-900 rounded-lg border border-gray-800 p-3 h-1/3"
              style={animationDelay(4)}
            >
              <div className="mb-2">
                <span className={`text-xs font-medium ${colorConfig.primary}`}>Personalization Engine</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">User Preference Profile</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-300">Visual content</span>
                      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-300">Code examples</span>
                      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-300">Technical depth</span>
                      <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">Content Recommendation</div>
                  <div className="space-y-1">
                    <div className={`text-[10px] p-1 rounded bg-gray-800 border-l-2 ${colorConfig.border}`}>
                      TensorFlow Image Classification Tutorial
                    </div>
                    <div className={`text-[10px] p-1 rounded bg-gray-800 border-l-2 border-gray-700`}>
                      Computer Vision Fundamentals
                    </div>
                    <div className={`text-[10px] p-1 rounded bg-gray-800 border-l-2 border-gray-700`}>
                      CNN Architecture Patterns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnstructuredDataVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[550px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      {/* Unstructured Data Processing Platform */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Unstructured Data Processing</span>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Source Data Panel */}
          <div 
            className="col-span-4 flex flex-col bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
            style={animationDelay(1)}
          >
            <div className={`px-3 py-2 border-b border-gray-800 ${colorConfig.backgroundOpacity}`}>
              <span className="text-xs font-medium text-white">Source Data</span>
            </div>
            
            <div className="p-2 flex-1 overflow-y-auto space-y-2">
              {/* Document Types */}
              <div className="p-2 rounded bg-gray-800 border border-gray-700 flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <div>
                  <div className="text-[10px] text-gray-300">Documents</div>
                  <div className={`text-[8px] ${colorConfig.accent}`}>PDFs, Reports, Forms</div>
                </div>
              </div>
              
              <div className="p-2 rounded bg-gray-800 border border-gray-700 flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <div>
                  <div className="text-[10px] text-gray-300">Conversations</div>
                  <div className={`text-[8px] ${colorConfig.accent}`}>Chat, Support, Feedback</div>
                </div>
              </div>
              
              <div className="p-2 rounded bg-gray-800 border border-gray-700 flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div>
                  <div className="text-[10px] text-gray-300">Analytics</div>
                  <div className={`text-[8px] ${colorConfig.accent}`}>Logs, Metrics, Events</div>
                </div>
              </div>
              
              <div className="p-2 rounded bg-gray-800 border border-gray-700 flex items-center">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div>
                  <div className="text-[10px] text-gray-300">Social Data</div>
                  <div className={`text-[8px] ${colorConfig.accent}`}>Posts, Interactions, Media</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Processing Pipeline */}
          <div 
            className="col-span-3 flex flex-col"
            style={animationDelay(2)}
          >
            {/* Processing Arrows */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <svg className={`w-8 h-8 ${colorConfig.primary} mb-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              
              {/* Processing Steps */}
              <div className="space-y-3 w-full">
                <div className={`p-2 rounded-lg text-center ${colorConfig.backgroundOpacity} text-[10px] text-white`}>
                  Extraction & OCR
                </div>
                <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className={`p-2 rounded-lg text-center ${colorConfig.backgroundOpacity} text-[10px] text-white`}>
                  Entity Recognition
                </div>
                <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className={`p-2 rounded-lg text-center ${colorConfig.backgroundOpacity} text-[10px] text-white`}>
                  Classification
                </div>
              </div>
            </div>
          </div>
          
          {/* Structured Insights */}
          <div 
            className="col-span-5 flex flex-col bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
            style={animationDelay(3)}
          >
            <div className={`px-3 py-2 border-b border-gray-800 ${colorConfig.backgroundOpacity}`}>
              <span className="text-xs font-medium text-white">Structured Insights</span>
            </div>
            
            <div className="p-3 flex-1 overflow-y-auto">
              {/* Intelligent Extraction Preview */}
              <div className="mb-3">
                <div className="text-[10px] text-gray-400 mb-1">Document Intelligence</div>
                <div className="text-[9px] leading-3 p-2 bg-gray-800 rounded border border-gray-700 font-mono">
                  <span className="text-green-400">{"{"}</span><br />
                  <span className="pl-2 text-blue-300">&quot;id&quot;</span>: <span className="text-amber-300">&quot;DOC-1042&quot;</span>,<br />
                  <span className="pl-2 text-blue-300">&quot;entities&quot;</span>: <span className="text-green-400">{"["}</span><br />
                  <span className="pl-4 text-green-400">{"{"}</span> <span className="text-blue-300">&quot;type&quot;</span>: <span className="text-amber-300">&quot;PERSON&quot;</span>, <span className="text-blue-300">&quot;text&quot;</span>: <span className="text-amber-300">&quot;John Smith&quot;</span> <span className="text-green-400">{"}"}</span>,<br />
                  <span className="pl-4 text-green-400">{"{"}</span> <span className="text-blue-300">&quot;type&quot;</span>: <span className="text-amber-300">&quot;ORGANIZATION&quot;</span>, <span className="text-blue-300">&quot;text&quot;</span>: <span className="text-amber-300">&quot;Acme Inc&quot;</span> <span className="text-green-400">{"}"}</span><br />
                  <span className="pl-2 text-green-400">{"]"}</span>,<br />
                  <span className="pl-2 text-blue-300">&quot;sentiment&quot;</span>: <span className="text-amber-300">&quot;positive&quot;</span>,<br />
                  <span className="pl-2 text-blue-300">&quot;topics&quot;</span>: <span className="text-green-400">{"["}</span> <span className="text-amber-300">&quot;product feedback&quot;</span>, <span className="text-amber-300">&quot;feature request&quot;</span> <span className="text-green-400">{"]"}</span><br />
                  <span className="text-green-400">{"}"}</span>
                </div>
              </div>
              
              {/* Data Visualization */}
              <div 
                className="grid grid-cols-2 gap-2"
                style={animationDelay(4)}
              >
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">Sentiment Analysis</div>
                  <div className="p-2 bg-gray-800 rounded border border-gray-700 h-16 flex items-end justify-around">
                    <div style={{ height: '30%' }} className="w-3 bg-red-500 rounded-t"></div>
                    <div style={{ height: '40%' }} className="w-3 bg-amber-500 rounded-t"></div>
                    <div style={{ height: '70%' }} className={`w-3 ${colorConfig.background} rounded-t`}></div>
                  </div>
                  <div className="flex text-[8px] text-gray-400 justify-around mt-1">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-[10px] text-gray-400 mb-1">Key Topics</div>
                  <div className="space-y-1">
                    <div className="h-3 flex items-center">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "85%" }}></div>
                      </div>
                      <span className="text-[8px] text-gray-300 ml-2">Product (85%)</span>
                    </div>
                    <div className="h-3 flex items-center">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-[8px] text-gray-300 ml-2">Support (65%)</span>
                    </div>
                    <div className="h-3 flex items-center">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-[8px] text-gray-300 ml-2">Pricing (45%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actionable Insights */}
              <div 
                className="mt-3"
                style={animationDelay(5)}
              >
                <div className="text-[10px] text-gray-400 mb-1">Actionable Insights</div>
                <div className="space-y-1.5">
                  <div className={`p-1.5 rounded bg-gray-800 border-l-2 ${colorConfig.border} text-[8px] text-gray-300`}>
                    <div className={`font-medium ${colorConfig.primary} mb-0.5`}>Feature Request Trend ↑</div>
                    <div>25% increase in requests for integration capabilities</div>
                  </div>
                  <div className={`p-1.5 rounded bg-gray-800 border-l-2 ${colorConfig.border} text-[8px] text-gray-300`}>
                    <div className={`font-medium ${colorConfig.primary} mb-0.5`}>Support Improvement ↓</div>
                    <div>Response time reduced by 15% after UI update</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnterprisePerformanceVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const animationDelay = (index: number) => {
    return { 
      opacity: isInView ? 1 : 0,
      transform: isInView ? "none" : "translateY(20px)",
      transition: `opacity 0.5s ease ${0.1 + index * 0.1}s, transform 0.5s ease ${0.1 + index * 0.1}s`,
    };
  };

  return (
    <div className="relative h-[425px] p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg overflow-hidden">
      {/* Background grid and glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      {/* Enterprise Performance Dashboard */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header / Title Bar */}
        <div 
          className="flex items-center justify-between mb-4"
          style={animationDelay(0)}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity}`}>
              <svg className={`w-4 h-4 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className={`font-medium ${colorConfig.primary}`}>Enterprise Performance & Compliance</span>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="flex-1 grid grid-cols-12 gap-4">
          {/* Performance Metrics */}
          <div 
            className="col-span-4 flex flex-col"
            style={animationDelay(1)}
          >
            <div className="text-xs text-gray-400 mb-2">Performance Metrics</div>
            
            <div className="space-y-3 flex-1">
              {/* Latency Card */}
              <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-medium ${colorConfig.accent}`}>Avg. Latency</span>
                  <div className="px-1.5 py-0.5 rounded bg-green-900/30 text-green-400 text-[10px]">-15%</div>
                </div>
                <div className="flex items-end">
                  <span className="text-lg font-medium text-white">24</span>
                  <span className="text-xs text-gray-400 ml-1 mb-0.5">ms</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "25%" }}></div>
                </div>
              </div>
              
              {/* Throughput Card */}
              <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-medium ${colorConfig.accent}`}>Throughput</span>
                  <div className="px-1.5 py-0.5 rounded bg-green-900/30 text-green-400 text-[10px]">+32%</div>
                </div>
                <div className="flex items-end">
                  <span className="text-lg font-medium text-white">16K</span>
                  <span className="text-xs text-gray-400 ml-1 mb-0.5">req/s</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                </div>
              </div>
              
              {/* Uptime Card */}
              <div className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-medium ${colorConfig.accent}`}>Uptime</span>
                  <div className="px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-400 text-[10px]">SLA</div>
                </div>
                <div className="flex items-end">
                  <span className="text-lg font-medium text-white">99.99</span>
                  <span className="text-xs text-gray-400 ml-1 mb-0.5">%</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full ${colorConfig.background}`} style={{ width: "99.99%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Security & Compliance */}
          <div 
            className="col-span-4 bg-gray-900 rounded-lg border border-gray-800 p-3"
            style={animationDelay(2)}
          >
            <div className="text-xs text-gray-400 mb-3">Security & Compliance</div>
            
            <div className="space-y-3">
              {/* Compliance Status */}
              <div className="space-y-2">
                <div className="text-[10px] text-gray-300">Compliance Status</div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-1.5 rounded bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-[8px] text-gray-300">GDPR</span>
                  </div>
                  <div className="p-1.5 rounded bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-[8px] text-gray-300">HIPAA</span>
                  </div>
                  <div className="p-1.5 rounded bg-gray-800 border border-gray-700 flex flex-col items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                    <span className="text-[8px] text-gray-300">SOC 2</span>
                  </div>
                </div>
              </div>
              
              {/* Security Metrics */}
              <div>
                <div className="text-[10px] text-gray-300 mb-2">Security Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-400">Data Encryption</span>
                    <div className="flex items-center">
                      <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden mr-1">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-[8px] text-green-400">100%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-400">Auth Protocols</span>
                    <div className="flex items-center">
                      <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden mr-1">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "100%" }}></div>
                      </div>
                      <span className="text-[8px] text-green-400">100%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-gray-400">Vulnerability Scan</span>
                    <div className="flex items-center">
                      <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden mr-1">
                        <div className={`h-full ${colorConfig.background}`} style={{ width: "95%" }}></div>
                      </div>
                      <span className="text-[8px] text-green-400">Pass</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy Certification */}
              <div className="p-2 rounded bg-gray-800 flex items-center">
                <div className={`p-1.5 rounded ${colorConfig.backgroundOpacity} mr-2`}>
                  <svg className={`w-3 h-3 ${colorConfig.primary}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[9px] text-white">Privacy-First Certified</div>
                  <div className="text-[8px] text-gray-400">Data minimization principles applied</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resource Utilization */}
          <div 
            className="col-span-4 bg-gray-900 rounded-lg border border-gray-800 p-3"
            style={animationDelay(3)}
          >
            <div className="text-xs text-gray-400 mb-3">Resource Utilization</div>
            
            <div className="space-y-4">
              {/* Usage Gauges */}
              <div className="grid grid-cols-2 gap-3">
                {/* CPU Usage Gauge */}
                <div>
                  <div className="text-center text-[10px] text-gray-300 mb-1">CPU</div>
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    {/* Gauge Background */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8"
                        strokeDasharray="282.7"
                        strokeDashoffset="197.9" // 282.7 * (1 - 0.3) 
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute">
                      <div className="text-lg font-medium text-white">30<span className="text-xs">%</span></div>
                    </div>
                  </div>
                </div>
                
                {/* Memory Usage Gauge */}
                <div>
                  <div className="text-center text-[10px] text-gray-300 mb-1">Memory</div>
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    {/* Gauge Background */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8"
                        strokeDasharray="282.7"
                        strokeDashoffset="141.35" // 282.7 * (1 - 0.5)
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute">
                      <div className="text-lg font-medium text-white">50<span className="text-xs">%</span></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Scaling Metrics */}
              <div 
                style={animationDelay(4)}
              >
                <div className="text-[10px] text-gray-300 mb-2">Scaling Metrics</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400">Instances</span>
                    <span className="text-[10px] text-white font-medium">8</span>
                  </div>
                  <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400">Regions</span>
                    <span className="text-[10px] text-white font-medium">5</span>
                  </div>
                  <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400">Avg. Scale Time</span>
                    <span className="text-[10px] text-white font-medium">45s</span>
                  </div>
                  <div className="p-2 rounded bg-gray-800 flex items-center justify-between">
                    <span className="text-[9px] text-gray-400">Auto-scaling</span>
                    <span className="text-[10px] text-green-400 font-medium">Active</span>
                  </div>
                </div>
              </div>
              
              {/* Status Card */}
              <div 
                className={`p-2 rounded ${colorConfig.backgroundOpacity} flex items-center justify-between`}
                style={animationDelay(5)}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-[10px] text-white">All Systems Operational</span>
                </div>
                <span className="text-[8px] text-gray-300">Updated 2m ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TechnologySections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div>
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