"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export type TeamTabId = "leadership" | "team" | "board" | "advisors"

interface TeamTabsProps {
  activeTab: TeamTabId
  onChange: (tabId: TeamTabId) => void
}

const tabs: { id: TeamTabId; label: string }[] = [
  { id: "leadership", label: "Leadership" },
  { id: "team", label: "Team" },
  { id: "board", label: "Board of Directors" },
  { id: "advisors", label: "Advisors" },
]

export function TeamTabs({ activeTab, onChange }: TeamTabsProps) {
  // For mobile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile on mount and when window is resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Listen for window resize events
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])
  
  // Helper to get active tab name
  const getActiveTabName = () => {
    return tabs.find(tab => tab.id === activeTab)?.label || "Leadership"
  }
  
  return (
    <>
      {/* Mobile dropdown */}
      {isMobile && (
        <div className="relative w-full mb-6 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-800"
          >
            <span>{getActiveTabName()}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onChange(tab.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-zinc-800 transition-colors ${
                    tab.id === activeTab
                      ? "bg-purple-600/20 text-purple-400 font-medium"
                      : "text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Desktop vertical tabs */}
      <div className="hidden lg:flex flex-col w-64 border-r border-zinc-800 pr-6 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "text-left px-4 py-3 rounded-lg transition-all duration-200 relative",
              tab.id === activeTab
                ? "bg-purple-600/10 text-purple-400 font-medium after:absolute after:right-[-24px] after:top-1/2 after:-translate-y-1/2 after:h-10 after:w-1 after:bg-purple-600"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/20"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  )
} 