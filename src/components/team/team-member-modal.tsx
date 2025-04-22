"use client"

import * as React from "react"
import Image from "next/image"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface TeamMemberDetails {
  name: string
  position?: string
  photoUrl: string
  bio: string
}

interface TeamMemberModalProps {
  member: TeamMemberDetails | null
  isOpen: boolean
  onClose: () => void
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  if (!member) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-zinc-900 border-zinc-800 text-white p-0 overflow-hidden max-h-[90vh] w-[95%]">
        {/* More visible close button for mobile */}
        <DialogClose className="absolute right-3 top-3 z-30 rounded-full bg-zinc-800/80 p-2 opacity-90 shadow-md hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {/* Responsive grid that stacks on mobile */}
        <div className="flex flex-col sm:grid sm:grid-cols-[minmax(0,300px)_1fr] gap-4">
          {/* Image column with blurred background */}
          <div className="relative w-full max-h-[300px] sm:max-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Blurred background version of the image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={member.photoUrl || "/placeholder-profile.jpg"}
                alt=""
                fill
                className="object-cover blur-md brightness-50 scale-110"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Main image - smaller on mobile */}
            <div className="relative z-1 w-full h-[250px] sm:h-[400px] flex items-center justify-center p-3">
              <div className="relative w-full h-full max-w-full max-h-full">
                <Image
                  src={member.photoUrl || "/placeholder-profile.jpg"}
                  alt={member.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 95vw, 300px"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Content column with scrollable content */}
          <div className="p-4 sm:p-6 pt-2 flex flex-col overflow-hidden">
            <DialogHeader className="mb-3">
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                {member.name}
              </DialogTitle>
              {member.position && (
                <DialogDescription className="text-purple-400 text-base sm:text-lg">
                  {member.position}
                </DialogDescription>
              )}
            </DialogHeader>
            
            <div className="mt-2 text-zinc-300 space-y-3 overflow-y-auto max-h-[30vh] sm:max-h-[400px] pr-2 text-sm sm:text-base">
              {member.bio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Extra close button at bottom for mobile */}
        <div className="sm:hidden w-full p-3 flex justify-center border-t border-zinc-800 mt-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white font-medium text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 