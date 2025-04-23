"use client"

import { useState } from "react"
import { TeamMember, teamMembers } from "./team-data"
import { TeamTabs, TeamTabId } from "./team-tabs"
import { TeamMemberCard } from "./team-member-card"
import { TeamMemberModal } from "./team-member-modal"

export function TeamSection() {
  const [activeTab, setActiveTab] = useState<TeamTabId>("team")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Filter team members based on active tab
  const filteredMembers = teamMembers.filter(member => member.category === activeTab)
  
  // Handle opening modal with selected member
  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }
  
  // Get section title and description
  const getSectionTitle = () => {
    switch (activeTab) {
      case "team":
        return "Team"
      case "board":
        return "Board of Directors"
      case "advisors":
        return "Advisors"
      default:
        return "Team"
    }
  }
  
  const getSectionDescription = () => {
    switch (activeTab) {
      case "team":
        return "A multidisciplinary group of builders, thinkers, and strategists."
      case "board":
        return "Our Board of Directors provides strategic guidance and industry expertise."
      case "advisors":
        return "Our advisors bring specialized knowledge and experience to help guide our mission."
      default:
        return ""
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Team</h1>
        <p className="text-xl text-zinc-300">
          A multidisciplinary group of builders, thinkers, and strategists. We come from AI research, product design, social science, creative industries, and systems operations. What unites us is a shared belief: <span className="font-semibold text-purple-400">AI should serve independent thought, not override it.</span>
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tabs component */}
        <TeamTabs activeTab={activeTab} onChange={setActiveTab} />
        
        {/* Content area */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              {getSectionTitle()}
            </h2>
            <p className="text-zinc-400 text-lg">
              {getSectionDescription()}
            </p>
          </div>
          
          {/* Team members grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                position={member.position}
                photoUrl={member.photoUrl}
                onReadMore={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal for displaying team member details */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
} 