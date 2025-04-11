"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type TabOption = {
  id: string
  label: string
}

interface MobileTabsProps {
  options: TabOption[]
  activeTab: string
  onChange: (id: string) => void
}

export function MobileTabs({ options, activeTab, onChange }: MobileTabsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeOption = options.find(option => option.id === activeTab) || options[0]

  return (
    <div className="relative w-full mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-black/80 text-white rounded-lg border border-gray-800"
      >
        <span className="font-medium">{activeOption.label}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-black/90 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-800/50 transition-colors ${
                option.id === activeTab
                  ? "bg-purple-600/20 text-purple-400"
                  : "text-gray-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}