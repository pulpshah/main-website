"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { OfferItemsDrawer, offerItems, OfferItemsMobile } from "@/components/header/offer-items-drawer";
import { 
  ServeItemsDrawer, 
  industryItems, 
  ServeItemsMobile, 
  businessSizeItems, 
  teamsItems 
} from "@/components/header/serve-items-drawer";

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
    title: "Features",
    href: "/features",
    hasDropdown: false,
  },
];

export function Header() {
  const [isWhatWeOfferOpen, setIsWhatWeOfferOpen] = useState(false);
  const [isWhoWeServeOpen, setIsWhoWeServeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [whoWeServeTab, setWhoWeServeTab] = useState<'industries' | 'business-size' | 'teams'>('industries');

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

  // Close drawers when screen resizes to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (isWhatWeOfferOpen) setIsWhatWeOfferOpen(false);
        if (isWhoWeServeOpen) setIsWhoWeServeOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isWhatWeOfferOpen, isWhoWeServeOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-zinc-800 ${isMobileMenuOpen ? 'bg-black' : 'bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/25'}`}>
      <div className="container flex h-16 items-center justify-between px-4 max-w-full md:mx-12">
        <div className="flex items-center" suppressHydrationWarning>
          <Link href="/" className="">
            <Image 
              src="/horizontal-logo.svg" 
              alt="Pulp Logo" 
              width={143} 
              height={143} 
              priority
              className="h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="mx-auto hidden md:flex pl-16 items-center space-x-8">
          {navItems.map((item) => (
            item.hasDropdown && item.title === "What We Offer" ? (
              <OfferItemsDrawer
                key={item.title}
                isOpen={isWhatWeOfferOpen}
                onOpenChange={setIsWhatWeOfferOpen}
                triggerContent={
                  <button className="group inline-flex items-center text-sm font-medium text-zinc-200 hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all hover:after:w-full">
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                }
              />
            ) : item.hasDropdown && item.title === "Who We Serve" ? (
              <ServeItemsDrawer
                key={item.title}
                isOpen={isWhoWeServeOpen}
                onOpenChange={setIsWhoWeServeOpen}
                triggerContent={
                  <button className="group inline-flex items-center text-sm font-medium text-zinc-200 hover:text-white transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all hover:after:w-full">
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                }
              />
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

        <div className="flex items-center md:space-x-24" suppressHydrationWarning>
          <Button className="hidden sm:inline-flex bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20 transition-all hover:shadow-purple-800/30">
            <Link href="/contact">
              Request Demo
            </Link>
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
                  {item.hasDropdown && item.title === "What We Offer" ? (
                    <div className="flex flex-col">
                      <button 
                        className="flex justify-between items-center py-2 text-white font-medium text-lg"
                        onClick={() => {
                          if (expandedMobileSection === item.title) {
                            setExpandedMobileSection(null);
                          } else {
                            setExpandedMobileSection(item.title);
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
                      {expandedMobileSection === item.title && (
                        <OfferItemsMobile 
                          items={offerItems} 
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      )}
                    </div>
                  ) : item.hasDropdown && item.title === "Who We Serve" ? (
                    <div className="flex flex-col">
                      <button 
                        className="flex justify-between items-center py-2 text-white font-medium text-lg"
                        onClick={() => {
                          if (expandedMobileSection === item.title) {
                            setExpandedMobileSection(null);
                            // Reset tab selection when closing
                            setWhoWeServeTab('industries');
                          } else {
                            setExpandedMobileSection(item.title);
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
                      {expandedMobileSection === item.title && (
                        <div className="py-3 pl-4 space-y-4 border-t border-zinc-800/30 mt-3">
                          {/* Tab selection for Who We Serve on mobile */}
                          <div className="flex flex-col space-y-2 mb-4">
                            <div className="grid grid-cols-3 gap-2 rounded-md bg-zinc-900/50 p-1">
                              <button
                                onClick={() => setWhoWeServeTab('industries')}
                                className={`py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
                                  whoWeServeTab === 'industries' 
                                    ? 'bg-purple-500/20 text-purple-400 font-medium' 
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Industries
                              </button>
                              <button
                                onClick={() => setWhoWeServeTab('business-size')}
                                className={`py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
                                  whoWeServeTab === 'business-size' 
                                    ? 'bg-blue-500/20 text-blue-400 font-medium' 
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Business Size
                              </button>
                              <button
                                onClick={() => setWhoWeServeTab('teams')}
                                className={`py-2 px-3 text-sm rounded-md transition-colors duration-200 ${
                                  whoWeServeTab === 'teams' 
                                    ? 'bg-green-500/20 text-green-400 font-medium' 
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                              >
                                Teams
                              </button>
                            </div>
                          </div>
                          
                          {/* Show items based on selected tab */}
                          {whoWeServeTab === 'industries' && (
                            <ServeItemsMobile 
                              items={industryItems}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          )}
                          {whoWeServeTab === 'business-size' && (
                            <ServeItemsMobile 
                              items={businessSizeItems}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          )}
                          {whoWeServeTab === 'teams' && (
                            <ServeItemsMobile 
                              items={teamsItems}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                          )}
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
                <Link href="/contact">
                  Request Demo
                </Link>
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
