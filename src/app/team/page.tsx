import { Metadata } from "next"
import { TeamSection } from "@/components/team/team-section"

export const metadata: Metadata = {
  title: "Our Team | Pulp",
  description: "Meet the multidisciplinary team of builders, thinkers, and strategists at Pulp. From AI researchers to product designers and social scientists.",
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <TeamSection />
    </main>
  )
}
