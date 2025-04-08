"use client"

import { Info, Crown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FeatureData } from "@/lib/features-data"

interface FeaturesTableProps {
  data: FeatureData[]
}

export function FeaturesTable({ data }: FeaturesTableProps) {
  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-base uppercase bg-black/80">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-300">
              Feature
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-300 text-center">
              Creator
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-300 text-center">
              Professional
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-300 text-center">
              Business
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-300 text-center">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((feature, index) => (
            <tr key={index} className="bg-black/90 border-b border-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-white flex items-center gap-2"
              >
                {feature.name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-gray-400 hover:text-gray-300 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md bg-gray-800 text-gray-100 border border-gray-700">
                      <p>{feature.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
              <td className="px-6 py-4 text-center">
                {renderFeatureStatus(feature.creator)}
              </td>
              <td className="px-6 py-4 text-center">
                {renderFeatureStatus(feature.professional)}
              </td>
              <td className="px-6 py-4 text-center">
                {renderFeatureStatus(feature.business)}
              </td>
              <td className="px-6 py-4 text-center">
                {renderEnterpriseFeature(feature.enterprise)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderFeatureStatus(status: string | null) {
  if (!status) return <span className="text-pink-500 opacity-50">✓</span>

  // Check if it's an add-on feature
  if (status.toLowerCase().includes("add-on")) {
    return (
      <span className="text-yellow-500">
        <span className="text-pink-500 opacity-50">✓</span>
        <br />
        <span className="text-xs">Add-on ({status.replace(/add-on\s*\(([^)]+)\)/i, "$1")})</span>
      </span>
    )
  }

  // Basic feature
  if (status.toLowerCase().includes("basic")) {
    return (
      <span>
        <span className="text-purple-500 text-2xl">✓</span>
        <br />
        <span className="text-xs text-gray-400">Basic</span>
      </span>
    )
  }

  // Advanced feature
  if (status.toLowerCase().includes("advanced")) {
    return (
      <span>
        <span className="text-purple-500 text-2xl">✓</span>
        <br />
        <span className="text-xs text-gray-400">Advanced</span>
      </span>
    )
  }

  // Custom feature
  if (status.toLowerCase().includes("custom")) {
    return (
      <span>
        <span className="text-purple-500 text-2xl">✓</span>
        <br />
        <span className="text-xs text-gray-400">Custom</span>
      </span>
    )
  }

  // Months-based feature (for Social Content Scheduling & Publishing)
  if (status.toLowerCase().includes("months")) {
    return (
      <span>
        <span className="text-purple-500 text-2xl">✓</span>
        <br />
        <span className="text-xs text-gray-400">{status}</span>
      </span>
    )
  }

  // Just a checkmark for "✅" entries
  if (status === "✅") {
    return <span className="text-purple-500 text-2xl">✓</span>
  }
  
  // Default case: just a checkmark
  return (
    <span>
      <span className="text-purple-500 text-2xl">✓</span>
    </span>
  )
}

function renderEnterpriseFeature(feature: string | null) {
  if (!feature) return <span className="text-pink-500 opacity-50">✓</span>

  // Extract the advanced capability from the feature description (text in parentheses)
  const advancedCapability = feature.match(/\(([^)]+)\)/)?.[1] || feature

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className="flex justify-center items-center gap-1">
            <Crown size={20} className="text-amber-300" />
            <span className="text-purple-500 text-2xl">✓</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-md bg-gray-800 text-amber-300 border border-gray-700">
          <p className="font-medium">{advancedCapability}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 