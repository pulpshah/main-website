"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface TeamMemberCardProps {
  name: string
  position?: string
  photoUrl: string
  onReadMore: () => void
}

export function TeamMemberCard({ name, position, photoUrl, onReadMore }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative w-full aspect-square rounded-lg overflow-hidden group cursor-pointer transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <div className="w-full h-full bg-zinc-900 rounded-lg overflow-hidden">
        <Image
          src={photoUrl || "/placeholder-profile.jpg"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Overlay on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="font-bold text-white text-lg leading-tight">{name}</h3>
        {position && (
          <p className="text-purple-300 text-sm mt-1">{position}</p>
        )}
        <Button 
          size="sm" 
          className="mt-3 bg-purple-600 hover:bg-purple-700 text-white w-fit"
          onClick={(e) => {
            e.stopPropagation()
            onReadMore()
          }}
        >
          Read More
        </Button>
      </div>
    </div>
  )
} 