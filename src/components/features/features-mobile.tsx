"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { FeatureData } from "@/lib/features-data"
import { cn } from "@/lib/utils"

interface FeatureMobileItemProps {
  feature: FeatureData
  isOpen: boolean
  toggleOpen: () => void
}

function FeatureMobileItem({ feature, isOpen, toggleOpen }: FeatureMobileItemProps) {
  return (
    <div className="bg-black/90 border border-gray-800 rounded-lg mb-3 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <h3 className="font-medium text-white">{feature.name}</h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 pt-1">
          <p className="text-gray-300 text-sm mb-4">{feature.description}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Creator</span>
                <div className="text-right">{renderFeatureStatus(feature.creator)}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Professional</span>
                <div className="text-right">{renderFeatureStatus(feature.professional)}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Business</span>
                <div className="text-right">{renderFeatureStatus(feature.business)}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Enterprise</span>
                  <div className="text-right">
                    <span className="text-purple-500 text-lg">✓</span>
                  </div>
                </div>
                {feature.enterprise && (
                  <div className="mt-1 text-amber-300 text-xs">
                    {feature.enterprise}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface FeaturesMobileProps {
  data: FeatureData[]
}

export function FeaturesMobile({ data }: FeaturesMobileProps) {
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null)

  const toggleFeature = (index: number) => {
    if (openFeatureIndex === index) {
      setOpenFeatureIndex(null)
    } else {
      setOpenFeatureIndex(index)
    }
  }

  return (
    <div className="space-y-1">
      {data.map((feature, index) => (
        <FeatureMobileItem
          key={index}
          feature={feature}
          isOpen={openFeatureIndex === index}
          toggleOpen={() => toggleFeature(index)}
        />
      ))}
    </div>
  )
}

function renderFeatureStatus(status: string | null) {
  if (!status) return <span className="text-pink-500 opacity-50">✓</span>

  // Check if it's an add-on feature
  if (status.toLowerCase().includes("add-on")) {
    return (
      <div className="text-yellow-500 text-xs text-right">
        <span className="text-pink-500 opacity-50 text-base">✓</span> Add-on
      </div>
    )
  }

  // Basic feature
  if (status.toLowerCase().includes("basic")) {
    return (
      <div className="text-right">
        <span className="text-purple-500 text-lg">✓</span>
        <div className="text-xs text-gray-400">Basic</div>
      </div>
    )
  }

  // Advanced feature
  if (status.toLowerCase().includes("advanced")) {
    return (
      <div className="text-right">
        <span className="text-purple-500 text-lg">✓</span>
        <div className="text-xs text-gray-400">Advanced</div>
      </div>
    )
  }

  // Custom feature
  if (status.toLowerCase().includes("custom")) {
    return (
      <div className="text-right">
        <span className="text-purple-500 text-lg">✓</span>
        <div className="text-xs text-gray-400">Custom</div>
      </div>
    )
  }

  // Months-based feature
  if (status.toLowerCase().includes("months")) {
    return (
      <div className="text-right">
        <span className="text-purple-500 text-lg">✓</span>
        <div className="text-xs text-gray-400">{status}</div>
      </div>
    )
  }

  // Just a checkmark for "✅" entries
  if (status === "✅") {
    return <span className="text-purple-500 text-lg">✓</span>
  }
  
  // Default case: just a checkmark
  return <span className="text-purple-500 text-lg">✓</span>
} 