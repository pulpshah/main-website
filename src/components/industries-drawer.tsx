"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Building, BookOpen, GraduationCap, Globe, Briefcase } from "lucide-react";

export interface IndustryItem {
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

export const industryItems: IndustryItem[] = [
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

interface IndustriesDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerContent: ReactNode;
}

export function IndustriesDrawer({ isOpen, onOpenChange, triggerContent }: IndustriesDrawerProps) {
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
          <DrawerHeader className="px-0 flex flex-col items-center text-center mb-8">
            <DrawerTitle className="text-xl md:text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                Solutions Tailored to Your Industry
              </span>
            </DrawerTitle>
            <DrawerDescription className="text-zinc-400 max-w-2xl mt-2 text-sm">
              Pulp delivers specialized solutions designed for the unique challenges and opportunities in your industry.
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Top row - 3 cards */}
            {industryItems.slice(0, 3).map((industry, index) => (
              <Link 
                key={industry.title} 
                href={industry.href}
                className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease forwards ${0.1 + index * 0.05}s`
                }}
              >
                {/* Card glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${industry.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 ${industry.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {industry.icon}
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                      {industry.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-400 line-clamp-3">
                    {industry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Bottom row - 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mt-4">
            {industryItems.slice(3, 5).map((industry, index) => (
              <Link 
                key={industry.title} 
                href={industry.href}
                className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease forwards ${0.3 + index * 0.05}s`
                }}
              >
                {/* Card glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${industry.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 ${industry.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {industry.icon}
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                      {industry.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-400 line-clamp-3">
                    {industry.description}
                  </p>
                </div>
              </Link>
            ))}
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

export function IndustriesMobile({ items, onClick }: { items: IndustryItem[], onClick?: () => void }) {
  return (
    <div className="py-3 pl-4 space-y-4 border-t border-zinc-800/30 mt-3">
      {items.map((industry, index) => (
        <Link 
          key={industry.title} 
          href={industry.href}
          className="flex items-start py-2 group cursor-pointer overflow-hidden relative"
          style={{
            animation: `slideInRight 0.3s ease forwards ${index * 0.1}s`
          }}
          onClick={onClick}
        >
          <div className={`shrink-0 w-10 h-10 ${industry.iconBg} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            {industry.icon}
          </div>
          <div className="ml-3">
            <span className="text-white group-hover:text-purple-400 transition-colors font-medium">{industry.title}</span>
            <p className="text-sm text-zinc-400 mt-1">{industry.description}</p>
          </div>
          {/* Mobile item hover indicator */}
          <div className="absolute left-0 top-[50%] w-1 h-0 bg-purple-500 group-hover:h-[80%] group-hover:top-[10%] transition-all duration-300"></div>
        </Link>
      ))}
    </div>
  );
} 