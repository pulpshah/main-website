"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Book, BookOpen, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

interface StoryVisualProps {
  colorConfig: {
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    border: string;
    shadow: string;
    light: string;
    accent: string;
    gradient: string;
  };
  isInView: boolean;
}

interface BackgroundLine {
  width: string;
  height: string;
  left: string;
  top: string;
  transform: string;
  opacity: number;
}

export function StoryVisual({ colorConfig, isInView }: StoryVisualProps) {
  const [activePage, setActivePage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [backgroundLines, setBackgroundLines] = useState<BackgroundLine[]>([]);
  
  const storyPages = [
    {
      year: "2022",
      title: "The Beginning",
      content: "Founded with a vision to make AI accessible and impactful for businesses of all sizes."
    },
    {
      year: "2023",
      title: "Growth & Innovation",
      content: "Expanded our capabilities and built a team of experts to deliver customized AI solutions."
    },
    {
      year: "2024",
      title: "Strategic Partnerships",
      content: "Formed key relationships with industry leaders to enhance our technology offerings."
    },
    {
      year: "2025",
      title: "The Future",
      content: "Continuing to push the boundaries of what's possible with AI integration."
    }
  ];
  
  // Generate background lines on component mount
  useEffect(() => {
    const lines = Array(20).fill(0).map(() => ({
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 100 + 50}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      transform: `rotate(${Math.random() * 90}deg)`,
      opacity: Math.random() * 0.3
    }));
    
    setBackgroundLines(lines);
  }, []);
  
  useEffect(() => {
    if (!isInView) {
      setActivePage(0);
      setIsBookOpen(false);
      return;
    }
    
    // Animate book opening when in view
    const openTimer = setTimeout(() => {
      setIsBookOpen(true);
      
      // Auto-flip pages when in view
      const pageTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setActivePage(prev => (prev < storyPages.length - 1 ? prev + 1 : 0));
        }, 4000);
        
        return () => clearInterval(interval);
      }, 1000);
      
      return () => clearTimeout(pageTimer);
    }, 800);
    
    return () => clearTimeout(openTimer);
  }, [isInView, storyPages.length]);
  
  const handlePrevPage = () => {
    setActivePage(prev => (prev > 0 ? prev - 1 : storyPages.length - 1));
  };
  
  const handleNextPage = () => {
    setActivePage(prev => (prev < storyPages.length - 1 ? prev + 1 : 0));
  };
  
  // Book cover and page variants
  const bookVariants = {
    closed: { 
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    open: { 
      rotateY: -180,
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 }
    }
  };
  
  const pageVariants = {
    initial: { 
      opacity: 0,
      rotateY: 70,
      x: 20
    },
    animate: { 
      opacity: 1,
      rotateY: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      rotateY: -70,
      x: -20,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };
  
  return (
    <div className="relative w-full h-[300px] md:h-[350px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background with gradient */}
        <motion.div 
          className={cn(
            "absolute inset-0 rounded-xl overflow-hidden",
            "bg-gray-900/80 backdrop-blur-sm border",
            colorConfig.border
          )}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background texture/pattern */}
          <div className="absolute inset-0 opacity-20">
            {backgroundLines.map((line, i) => (
              <div 
                key={i}
                className="absolute bg-white/20" 
                style={{
                  width: line.width,
                  height: line.height,
                  left: line.left,
                  top: line.top,
                  transform: line.transform,
                  opacity: line.opacity
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Book visualization */}
        <div 
          className="relative perspective-[1200px] w-[280px] h-[200px] md:w-[320px] md:h-[220px]"
          style={{ perspective: "1200px" }}
        >
          {/* Book and pages */}
          <div className="relative w-full h-full">
            {/* Left side of book (static) */}
            <motion.div
              className="absolute inset-0 origin-right"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div 
                className={cn(
                  "absolute top-0 left-0 w-[50%] h-full rounded-l-lg border-l border-t border-b",
                  "bg-gray-800 shadow-lg flex items-center justify-center",
                  colorConfig.border
                )}
              >
                {!isBookOpen && (
                  <div className="text-center p-4">
                    <BookOpen className={cn("w-8 h-8 mx-auto mb-2", colorConfig.text)} />
                    <div className={cn("text-xs font-bold", colorConfig.text)}>OUR STORY</div>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Right side of book (cover that opens) */}
            <motion.div
              className="absolute inset-0 origin-left"
              initial="closed"
              animate={isBookOpen ? "open" : "closed"}
              variants={bookVariants}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of cover (outside) */}
              <div 
                className={cn(
                  "absolute top-0  left-[50%] w-[50%] h-full rounded-r-lg border-r border-t border-b",
                  "bg-gray-800 shadow-lg flex items-center justify-center backface-hidden",
                  colorConfig.border,
                  colorConfig.primary
                )}
              >
                <div className="absolute top-0 left-0 w-full h-full rounded-r-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-black" />
                  <div className="absolute top-[10%] left-0 w-full text-center">
                    <div className="text-white text-xl font-bold">Our Story</div>
                    <div className="text-white/70 text-sm mt-1">The Pulp Journey</div>
                  </div>
                  
                  <Book className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-12 h-12 text-white" />
                </div>
              </div>
              
              {/* Back of cover (inside) */}
              <div 
                className={cn(
                  "absolute top-0 left-[50%] w-[50%] h-full rounded-r-lg border-r border-t border-b",
                  "bg-gray-700/50 shadow-inner backface-hidden",
                  colorConfig.border
                )}
                style={{ transform: "rotateY(180deg)" }}
              />
            </motion.div>
            
            {/* Book pages */}
            {isBookOpen && (
              <div className="absolute top-[5%] left-[calc(50%+10px)] w-[calc(50%-20px)] h-[90%] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`page-${activePage}`}
                    className="w-full h-full rounded bg-gray-100/90 shadow-md p-4"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Page content */}
                    <div className="h-full flex flex-col">
                      {/* Year and bookmark */}
                      <div className="flex justify-between items-center mb-3">
                        <div className={cn(
                          "px-2 py-1 rounded-sm text-xs font-bold",
                          colorConfig.primary,
                          "text-white"
                        )}>
                          {storyPages[activePage].year}
                        </div>
                        <Bookmark className={cn("w-4 h-4", colorConfig.text.replace('text-', 'text-gray-'))} />
                      </div>
                      
                      {/* Title */}
                      <div className="text-gray-900 font-bold text-sm mb-2">
                        {storyPages[activePage].title}
                      </div>
                      
                      {/* Content */}
                      <div className="text-gray-700 text-xs leading-relaxed">
                        {storyPages[activePage].content}
                      </div>
                      
                      {/* Page decoration */}
                      <div className="mt-auto flex justify-between items-end">
                        <div className="text-gray-400 text-xs">Page {activePage + 1}</div>
                        <div 
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            colorConfig.primary.replace('bg-', 'text-')
                          )}
                        >
                          {activePage + 1}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Page navigation controls */}
                <div className="absolute bottom-2 left-0 w-full flex justify-between px-3">
                  <motion.button
                    className={cn(
                      "w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center",
                      "hover:bg-gray-300 transition-colors"
                    )}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevPage}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                  </motion.button>
                  
                  <motion.button
                    className={cn(
                      "w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center",
                      "hover:bg-gray-300 transition-colors"
                    )}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextPage}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Caption */}
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5, delay: isBookOpen ? 1.2 : 0 }}
      >
        <div className="text-xs text-gray-300 max-w-xs mx-auto">
          Our journey of innovation and growth continues to evolve with each chapter.
        </div>
      </motion.div>
    </div>
  );
} 