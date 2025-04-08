"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { OfferItemsDrawer, offerItems, OfferItemsMobile } from "@/components/offer-items-drawer";
import { IndustriesDrawer, industryItems, IndustriesMobile } from "@/components/industries-drawer";

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

export function Header() {
  const [isWhatWeOfferOpen, setIsWhatWeOfferOpen] = useState(false);
  const [isWhoWeServeOpen, setIsWhoWeServeOpen] = useState(false);
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
              <IndustriesDrawer
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
                      {item.title === "What We Offer" && expandedMobileSection === item.title && (
                        <OfferItemsMobile 
                          items={offerItems} 
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
                      )}
                      {item.title === "Who We Serve" && expandedMobileSection === item.title && (
                        <IndustriesMobile 
                          items={industryItems}
                          onClick={() => setIsMobileMenuOpen(false)}
                        />
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
