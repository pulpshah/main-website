"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown, MessageSquare, Users, Shield, BookOpen, Bot, X } from "lucide-react";

interface NavigationItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
}

const navItems: NavigationItem[] = [
  {
    title: "What We Offer",
    href: "#",
    hasDropdown: true,
  },
  {
    title: "Who We Serve",
    href: "#",
    hasDropdown: true,
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

const offerItems = [
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
    icon: <BookOpen className="h-5 w-5 text-red-500" />,
    color: "from-red-600 to-red-400",
    colorFaded: "bg-red-500/10",
    borderColor: "red-500/20",
    hoverBorder: "red-500/40",
    iconBg: "bg-red-500/10",
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
    icon: <Bot className="h-5 w-5 text-amber-500" />,
    color: "from-amber-600 to-amber-400",
    colorFaded: "bg-amber-500/10",
    borderColor: "amber-500/20",
    hoverBorder: "amber-500/40",
    iconBg: "bg-amber-500/10",
    href: "/solutions/automated-analysis"
  }
];

export function Header() {
  const [isWhatWeOfferOpen, setIsWhatWeOfferOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Reset expanded section when closing mobile menu
      setExpandedMobileSection(null);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Close drawer when screen resizes to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isWhatWeOfferOpen) {
        setIsWhatWeOfferOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isWhatWeOfferOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-zinc-800 ${isMobileMenuOpen ? 'bg-black' : 'bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60'} overflow-hidden`}>
      <div className="container flex h-16 items-center justify-between px-4 max-w-full">
        <div className="flex items-center" suppressHydrationWarning>
          <Link href="/" className="mr-6">
            <Image 
              src="/horizontal-logo.svg" 
              alt="Pulp Logo" 
              width={143} 
              height={34} 
              priority
              className="h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="mx-auto hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.hasDropdown && item.title === "What We Offer" ? (
              <Drawer 
                key={item.title} 
                open={isWhatWeOfferOpen} 
                onOpenChange={setIsWhatWeOfferOpen} 
                direction="top"
                modal={true}
              >
                <DrawerTrigger asChild>
                  <button className="group inline-flex items-center text-sm font-medium text-zinc-200 hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all hover:after:w-full">
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
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

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto">
                      {offerItems.map((offer, index) => (
                        <Link 
                          key={offer.title} 
                          href={offer.href}
                          className="group rounded-lg border border-zinc-800 backdrop-filter backdrop-blur-lg bg-black/40 hover:bg-black/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
                          style={{
                            opacity: 0,
                            animation: `fadeInUp 0.5s ease forwards ${0.1 + index * 0.05}s`
                          }}
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
            ) : item.hasDropdown ? (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger className="group inline-flex items-center text-sm font-medium text-zinc-200 hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all hover:after:w-full">
                  {item.title}
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border border-zinc-800">
                  <DropdownMenuItem className="text-zinc-200 hover:text-white hover:bg-zinc-800">
                    Coming Soon
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                className="group inline-flex items-center text-sm font-medium text-zinc-200 hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all hover:after:w-full"
              >
                {item.title}
                {item.hasDropdown && (
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4" suppressHydrationWarning>
          <Button className="hidden sm:inline-flex bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-800/30">
            Request Demo
          </Button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-zinc-200 hover:text-white" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-[100] bg-black/95 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          {/* Background pattern similar to main site */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
          
          <div className="flex flex-col min-h-screen h-full py-20 px-6 overflow-y-auto">
            <div className="absolute top-4 right-4">
              <button 
                className="p-2 text-zinc-200 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-6 mt-4">
              {navItems.map((item) => (
                <div key={item.title} className="py-3 border-b border-zinc-800/50">
                  {item.hasDropdown ? (
                    <div className="flex flex-col">
                      <button 
                        className="flex justify-between items-center py-2 text-white font-medium text-lg"
                        onClick={() => {
                          if (item.title === "What We Offer") {
                            if (expandedMobileSection === item.title) {
                              setExpandedMobileSection(null);
                            } else {
                              setExpandedMobileSection(item.title);
                            }
                          }
                        }}
                      >
                        {item.title}
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedMobileSection === item.title ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {item.title === "What We Offer" && expandedMobileSection === item.title && (
                        <div className="py-3 pl-4 space-y-4 border-t border-zinc-800/30 mt-3">
                          {offerItems.map((offer, index) => (
                            <Link 
                              key={offer.title} 
                              href={offer.href}
                              className="flex items-start py-2 group cursor-pointer overflow-hidden relative"
                              style={{
                                animation: `slideInRight 0.3s ease forwards ${index * 0.1}s`
                              }}
                              onClick={() => setIsMobileMenuOpen(false)}
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
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-2 text-white font-medium text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="mt-auto pt-6">
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-6 text-base font-medium shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-800/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Demo
              </Button>
            </div>
          </div>
          
          {/* Keyframes for mobile animations */}
          <style jsx global>{`
            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      )}
    </header>
  );
}
