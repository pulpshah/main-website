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
import { MessageSquare, Users, Shield, BookOpen, Bot } from "lucide-react";

export interface OfferItem {
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

export const offerItems: OfferItem[] = [
  {
    title: "Intelligent Communication & Engagement",
    description: "Optimize your messaging for maximum impact and engagement",
    icon: <MessageSquare className="h-5 w-5 text-purple-500" />,
    color: "from-purple-600 to-purple-400",
    colorFaded: "bg-purple-500/10",
    borderColor: "purple-500/20",
    hoverBorder: "purple-500/40",
    iconBg: "bg-purple-500/10",
    href: "/solutions/intelligent-communication"
  },
  {
    title: "Audience Simulations",
    description: "Test your messaging with AI-powered audience simulations",
    icon: <Users className="h-5 w-5 text-pink-500" />,
    color: "from-pink-600 to-pink-400",
    colorFaded: "bg-pink-500/10",
    borderColor: "pink-500/20",
    hoverBorder: "pink-500/40",
    iconBg: "bg-pink-500/10",
    href: "/solutions/audience-simulations"
  },
  {
    title: "Scalable Content Moderation & Governance",
    description: "Ensure content quality and compliance at scale",
    icon: <Shield className="h-5 w-5 text-blue-600" />,
    color: "from-blue-600 to-blue-400",
    colorFaded: "bg-blue-500/10",
    borderColor: "blue-500/20",
    hoverBorder: "blue-500/40",
    iconBg: "bg-blue-500/10",
    href: "/solutions/content-moderation"
  },
  {
    title: "Knowledge Synthesis & Summarization",
    description: "Extract insights from large volumes of data",
    icon: <BookOpen className="h-5 w-5 text-amber-500" />,
    color: "from-amber-600 to-amber-400",
    colorFaded: "bg-amber-500/10",
    borderColor: "amber-500/20",
    hoverBorder: "amber-500/40",
    iconBg: "bg-amber-500/10",
    href: "/solutions/knowledge-synthesis"
  },
  {
    title: "Adaptive Chatbots & Personalization",
    description: "Create personalized conversational experiences",
    icon: <Bot className="h-5 w-5 text-green-500" />,
    color: "from-green-600 to-green-400",
    colorFaded: "bg-green-500/10",
    borderColor: "green-500/20",
    hoverBorder: "green-500/40",
    iconBg: "bg-green-500/10",
    href: "/solutions/adaptive-chatbots"
  },
  {
    title: "Automated Analysis & Decision Support",
    description: "Automate data analysis and decision-making",
    icon: <Bot className="h-5 w-5 text-red-500" />,
    color: "from-red-600 to-red-400",
    colorFaded: "bg-red-500/10",
    borderColor: "red-500/20",
    hoverBorder: "red-500/40",
    iconBg: "bg-red-500/10",
    href: "/solutions/automated-analysis"
  }
];

interface OfferItemsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerContent: ReactNode;
}

export function OfferItemsDrawer({ isOpen, onOpenChange, triggerContent }: OfferItemsDrawerProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

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
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                How You Think, Work, and Communicate—Optimized
              </span>
            </DrawerTitle>
            <DrawerDescription className="text-zinc-400 max-w-2xl mt-2 text-sm">
              Pulp doesn&apos;t just process information—it understands it. Whether refining communication, decoding data, or automating complex workflows, Pulp turns intelligence into action.
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {offerItems.map((offer, index) => (
              <Link 
                key={offer.title} 
                href={offer.href}
                className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease forwards ${0.1 + index * 0.05}s`
                }}
                onClick={handleLinkClick}
              >
                {/* Card glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${offer.color} opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                
                <div className="p-3 relative z-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 ${offer.iconBg} rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      {offer.icon}
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                      {offer.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs text-zinc-400 line-clamp-3">
                    {offer.description}
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

export function OfferItemsMobile({ items, onClick }: { items: OfferItem[], onClick?: () => void }) {
  return (
    <div className="py-3 pl-4 space-y-4 border-t border-zinc-800/30 mt-3">
      {items.map((offer, index) => (
        <Link 
          key={offer.title} 
          href={offer.href}
          className="flex items-start py-2 group cursor-pointer overflow-hidden relative"
          style={{
            animation: `slideInRight 0.3s ease forwards ${index * 0.1}s`
          }}
          onClick={onClick}
        >
          <div className={`shrink-0 w-10 h-10 ${offer.iconBg} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
            {offer.icon}
          </div>
          <div className="ml-3">
            <span className="text-white group-hover:text-purple-400 transition-colors font-medium">{offer.title}</span>
            <p className="text-sm text-zinc-400 mt-1">{offer.description}</p>
          </div>
          {/* Mobile item hover indicator */}
          <div className="absolute left-0 top-[50%] w-1 h-0 bg-purple-500 group-hover:h-[80%] group-hover:top-[10%] transition-all duration-300"></div>
        </Link>
      ))}
    </div>
  );
} 