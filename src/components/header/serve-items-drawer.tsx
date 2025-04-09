"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Building, BookOpen, GraduationCap, Globe, Briefcase, Building2, Network, BarChart, MessageSquare, Share2 } from "lucide-react";

export interface ItemCard {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  colorFaded: string;
  borderColor: string;
  hoverBorder: string;
  iconBg: string;
  href: string;
}

export const industryItems: ItemCard[] = [
  {
    title: "Government & Civic Engagement",
    description: "Transform public communication with predictive engagement and real-time adaptation",
    icon: <Globe className="h-5 w-5 text-amber-500" />,
    color: "from-amber-600 to-amber-400",
    colorFaded: "bg-amber-500/10",
    borderColor: "amber-500/20",
    hoverBorder: "amber-500/40",
    iconBg: "bg-amber-500/10",
    href: "/industries/government"
  },
  {
    title: "Education",
    description: "Redefine learning with adaptive, personalized, and intelligent educational solutions",
    icon: <GraduationCap className="h-5 w-5 text-green-500" />,
    color: "from-green-600 to-green-400",
    colorFaded: "bg-green-500/10",
    borderColor: "green-500/20",
    hoverBorder: "green-500/40",
    iconBg: "bg-green-500/10",
    href: "/industries/education"
  },
  {
    title: "Marketing",
    description: "Transform insights into action with AI-driven precision for strategic, adaptive campaigns",
    icon: <BookOpen className="h-5 w-5 text-purple-500" />,
    color: "from-purple-600 to-purple-400",
    colorFaded: "bg-purple-500/10",
    borderColor: "purple-500/20",
    hoverBorder: "purple-500/40",
    iconBg: "bg-purple-500/10",
    href: "/industries/marketing"
  },
  {
    title: "Technology",
    description: "Build with AI that integrates seamlessly and scales effortlessly",
    icon: <Building className="h-5 w-5 text-blue-500" />,
    color: "from-blue-600 to-blue-400",
    colorFaded: "bg-blue-500/10",
    borderColor: "blue-500/20",
    hoverBorder: "blue-500/40",
    iconBg: "bg-blue-500/10",
    href: "/industries/technology"
  },
  {
    title: "Professional Services",
    description: "Supercharge decision-making by transforming unstructured data into actionable intelligence",
    icon: <Briefcase className="h-5 w-5 text-pink-500" />,
    color: "from-pink-600 to-pink-400",
    colorFaded: "bg-pink-500/10",
    borderColor: "pink-500/20",
    hoverBorder: "pink-500/40",
    iconBg: "bg-pink-500/10",
    href: "/industries/professional-services"
  },
];

export const businessSizeItems: ItemCard[] = [
  {
    title: "Enterprise",
    description: "What happens when your messaging thinks for itself? Pulp helps large organizations turn language into leverage. Simulate how people respond. Catch misinformation before it spreads. Shape narratives that actually land.",
    icon: <Building2 className="h-5 w-5 text-blue-500" />,
    color: "from-blue-600 to-blue-400",
    colorFaded: "bg-blue-500/10",
    borderColor: "blue-500/20",
    hoverBorder: "blue-500/40",
    iconBg: "bg-blue-500/10",
    href: "/business-size/enterprise"
  },
  {
    title: "Mid-Market",
    description: "More reach. Sharper positioning. Smarter decisions. Growth isn't just about scaling, it's about knowing what moves the needle. Pulp helps mid-market businesses turn audience data into action, optimizing engagement, messaging, and marketing spend with precision.",
    icon: <Network className="h-5 w-5 text-purple-500" />,
    color: "from-purple-600 to-purple-400",
    colorFaded: "bg-purple-500/10",
    borderColor: "purple-500/20",
    hoverBorder: "purple-500/40",
    iconBg: "bg-purple-500/10",
    href: "/business-size/mid-market"
  },
];

export const teamsItems: ItemCard[] = [
  {
    title: "Messaging Strategy Teams",
    description: "Craft narratives that resonate and drive engagement through data-driven messaging optimization",
    icon: <MessageSquare className="h-5 w-5 text-green-500" />,
    color: "from-green-600 to-green-400",
    colorFaded: "bg-green-500/10",
    borderColor: "green-500/20",
    hoverBorder: "green-500/40",
    iconBg: "bg-green-500/10",
    href: "/teams/messaging-strategy"
  },
  {
    title: "Distribution Strategy Teams",
    description: "Optimize your content delivery with intelligent audience targeting and channel selection",
    icon: <Share2 className="h-5 w-5 text-pink-500" />,
    color: "from-pink-600 to-pink-400",
    colorFaded: "bg-pink-500/10",
    borderColor: "pink-500/20",
    hoverBorder: "pink-500/40",
    iconBg: "bg-pink-500/10",
    href: "/teams/distribution-strategy"
  },
  {
    title: "Data Analysis Teams",
    description: "Transform complex data into actionable insights with powerful analytics and visualization tools",
    icon: <BarChart className="h-5 w-5 text-amber-500" />,
    color: "from-amber-600 to-amber-400",
    colorFaded: "bg-amber-500/10",
    borderColor: "amber-500/20",
    hoverBorder: "amber-500/40",
    iconBg: "bg-amber-500/10",
    href: "/teams/data-analysis"
  },
];

type TabType = 'industries' | 'business-size' | 'teams';

interface ServeItemsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerContent: ReactNode;
}

export function ServeItemsDrawer({ isOpen, onOpenChange, triggerContent }: ServeItemsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('industries');

  const getActiveItems = () => {
    switch (activeTab) {
      case 'industries':
        return industryItems;
      case 'business-size':
        return businessSizeItems;
      case 'teams':
        return teamsItems;
      default:
        return industryItems;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'industries':
        return 'Solutions Tailored to Your Industry';
      case 'business-size':
        return 'Solutions for Your Business Scale';
      case 'teams':
        return 'Empower Your Teams';
      default:
        return 'Solutions Tailored to Your Industry';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'industries':
        return 'Pulp delivers specialized solutions designed for the unique challenges and opportunities in your industry.';
      case 'business-size':
        return 'Scale with confidence using solutions designed for businesses at every stage of growth.';
      case 'teams':
        return 'Equip your teams with the tools they need to drive results and maximize their impact.';
      default:
        return 'Pulp delivers specialized solutions designed for the unique challenges and opportunities in your industry.';
    }
  };

  const activeItems = getActiveItems();

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={onOpenChange} 
      direction="top"
      modal={true}
    >
      <DrawerTrigger asChild>
        {triggerContent}
      </DrawerTrigger>
      <DrawerContent className="bg-black border-b border-zinc-800 z-[100] shadow-2xl shadow-purple-900/10 overflow-hidden">
        {/* Spherical gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-900/20 to-transparent rounded-full"></div>
        </div>
        
        <div className="container py-8 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
          {/* Restructured layout with tabs on left side */}
          <div className="flex flex-col md:flex-row md:items-stretch md:gap-8">
            {/* Tab navigation on the left - full height */}
            <div className="flex flex-row md:flex-col md:min-h-[400px] space-x-4 md:space-x-0 md:space-y-4 mb-6 md:mb-0 md:border-r md:border-zinc-800/30 md:pr-8 md:py-4 md:min-w-[220px] md:flex md:justify-center">
              <button 
                onClick={() => setActiveTab('industries')}
                className={`px-6 py-4 text-base rounded-md transition-all duration-300 text-left ${
                  activeTab === 'industries' 
                    ? 'bg-purple-500/20 text-purple-400 font-medium relative md:after:content-[""] md:after:absolute md:after:right-[-32px] md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-12 md:after:w-1 md:after:bg-purple-500' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/20'
                }`}
              >
                Industries
              </button>
              <button 
                onClick={() => setActiveTab('business-size')}
                className={`px-6 py-4 text-base rounded-md transition-all duration-300 text-left ${
                  activeTab === 'business-size' 
                    ? 'bg-blue-500/20 text-blue-400 font-medium relative md:after:content-[""] md:after:absolute md:after:right-[-32px] md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-12 md:after:w-1 md:after:bg-blue-500' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/20'
                }`}
              >
                Business Size
              </button>
              <button 
                onClick={() => setActiveTab('teams')}
                className={`px-6 py-4 text-base rounded-md transition-all duration-300 text-left ${
                  activeTab === 'teams' 
                    ? 'bg-green-500/20 text-green-400 font-medium relative md:after:content-[""] md:after:absolute md:after:right-[-32px] md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-12 md:after:w-1 md:after:bg-green-500' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/20'
                }`}
              >
                Teams
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col items-center">
              <DrawerHeader className="px-0 flex flex-col items-center text-center mb-8 max-w-2xl">
                <DrawerTitle className="text-xl md:text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                    {getTabTitle()}
                  </span>
                </DrawerTitle>
                <DrawerDescription className="text-zinc-400 max-w-lg mt-2 text-sm mx-auto">
                  {getTabDescription()}
                </DrawerDescription>
              </DrawerHeader>

              <div className="w-full max-w-5xl mx-auto">
                {activeTab === 'industries' ? (
                  // Special rendering for Industries tab - 3 items on top, 2 centered at bottom
                  <>
                    {/* Top row - 3 cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                      {industryItems.slice(0, 3).map((item, index) => (
                        <Link 
                          key={item.title} 
                          href={item.href}
                          className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                          style={{
                            opacity: 0,
                            animation: `fadeInUp 0.5s ease forwards ${0.1 + index * 0.05}s`
                          }}
                        >
                          {/* Card glow effect */}
                          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                          
                          <div className="p-5 relative z-10">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-10 h-10 ${item.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                {item.icon}
                              </div>
                              <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                                {item.title}
                              </h3>
                            </div>
                            
                            <p className="text-sm text-zinc-400 line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Bottom row - 2 cards centered */}
                    <div className="flex justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                        {industryItems.slice(3, 5).map((item, index) => (
                          <Link 
                            key={item.title} 
                            href={item.href}
                            className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                            style={{
                              opacity: 0,
                              animation: `fadeInUp 0.5s ease forwards ${0.3 + index * 0.05}s`
                            }}
                          >
                            {/* Card glow effect */}
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                            
                            <div className="p-5 relative z-10">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-10 h-10 ${item.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                  {item.icon}
                                </div>
                                <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                                  {item.title}
                                </h3>
                              </div>
                              
                              <p className="text-sm text-zinc-400 line-clamp-3">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Default rendering for other tabs
                  <div className="flex justify-center">
                    <div className={`grid gap-5 ${
                      activeItems.length === 1 ? 'grid-cols-1 max-w-md' : 
                      activeItems.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl' : 
                      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl'
                    }`}>
                      {activeItems.map((item, index) => (
                        <Link 
                          key={item.title} 
                          href={item.href}
                          className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                          style={{
                            opacity: 0,
                            animation: `fadeInUp 0.5s ease forwards ${0.1 + index * 0.05}s`
                          }}
                        >
                          {/* Card glow effect */}
                          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                          
                          <div className="p-5 relative z-10">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-10 h-10 ${item.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                {item.icon}
                              </div>
                              <h3 className="text-base font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                                {item.title}
                              </h3>
                            </div>
                            
                            <p className="text-sm text-zinc-400 line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Keyframes for animations */}
        <style jsx global>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </DrawerContent>
    </Drawer>
  );
}

export function ServeItemsMobile({ items, onClick }: { items: ItemCard[], onClick?: () => void }) {
  return (
    <div className="py-3 pl-4 space-y-4 border-t border-zinc-800/30 mt-3">
      {items.map((item, index) => (
        <Link 
          key={item.title} 
          href={item.href}
          className="flex items-start py-2 group cursor-pointer overflow-hidden relative"
          style={{
            animation: `slideInRight 0.3s ease forwards ${index * 0.1}s`
          }}
          onClick={onClick}
        >
          <div className={`shrink-0 w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            {item.icon}
          </div>
          <div className="ml-3">
            <span className="text-white group-hover:text-purple-400 transition-colors font-medium">{item.title}</span>
            <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
          </div>
          {/* Mobile item hover indicator */}
          <div className="absolute left-0 top-[50%] w-1 h-0 bg-purple-500 group-hover:h-[80%] group-hover:top-[10%] transition-all duration-300"></div>
        </Link>
      ))}
    </div>
  );
} 