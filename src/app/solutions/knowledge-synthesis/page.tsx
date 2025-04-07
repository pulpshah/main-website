import { Metadata } from "next";
import SolutionHero from "@/components/solutions/solution-hero";
import { KnowledgeSynthesisSections } from "@/components/solutions/knowledge-synthesis/sections-list";
import WhyChooseUs from "@/components/solutions/why-choose-us";

export const metadata: Metadata = {
  title: "Knowledge Synthesis & Automated Summarization | Pulp",
  description: "Transform information overload into concise, actionable intelligence with Pulp's AI-powered Knowledge Synthesis solutions.",
};

export default function KnowledgeSynthesisPage() {
    const heroConfig = {
        badge: "SOLUTION",
        title: "Knowledge Synthesis & Automated Summarization",
        description: "Transform overwhelming information into clear, concise, and actionable insights. Our AI doesn't just summarize—it synthesizes knowledge while preserving nuance and depth",
        primaryColor: "amber" as const,
        accentColor: "amber" as const,
        tertiaryColor: "amber" as const,
        imagePath: "/knowledge-synthesis-visual.svg",
    };

  const sectionsConfig = [
    {
      title: "Summarize Without Losing Substance",
      description: "Our AI extracts key insights while preserving vital context and nuance. Condense hours of reading into minutes without sacrificing depth or accuracy.",
      imageSide: "right" as const,
      color: "amber" as const,
      icon: "FileText"
    },
    {
      title: "Turn Meetings Into Actionable Next Steps",
      description: "Convert lengthy meeting transcripts into clear action items, decisions made, and outstanding questions. Automatically assign owners and due dates to keep projects moving forward.",
      imageSide: "left" as const,
      color: "amber" as const,
      icon: "ListChecks"
    },
    {
      title: "Map Hidden Connections",
      description: "Discover relationships between documents, meetings, and knowledge assets that would otherwise remain hidden. Synthesize information across multiple sources to reveal insights that exist between the lines.",
      imageSide: "right" as const,
      color: "amber" as const,
      icon: "Network"
    },
    {
      title: "Accelerate Research & Decision-Making",
      description: "Speed up research workflows by quickly analyzing vast amounts of information and extracting what matters. Support decision-making with synthesized evidence and confidence assessments.",
      imageSide: "left" as const,
      color: "amber" as const,
      icon: "Zap"
    }
  ];

  const whyChooseUsConfig = {
    title: "Why Pulp?",
    description: "Our knowledge synthesis capabilities go beyond basic summarization to deliver higher-quality outputs that preserve context and drive action.",
    features: [
      "Deep Knowledge Synthesis",
      "Context-Aware Summaries",
      "Multiple Output Formats",
      "Clarity Without Compromise"
    ],
    conclusion: "Transform information overload into streamlined intelligence that drives better decisions, faster research, and more productive meetings.",
    ctaText: "Request a Demo",
    ctaLink: "/contact",
    primaryColor: "amber" as const,
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SolutionHero 
        badge={heroConfig.badge}
        title={heroConfig.title}
        description={heroConfig.description}
        primaryColor={heroConfig.primaryColor}
        accentColor={heroConfig.accentColor}
        tertiaryColor={heroConfig.tertiaryColor}
        imagePath={heroConfig.imagePath}
      />
      <KnowledgeSynthesisSections sections={sectionsConfig} />
        <WhyChooseUs 
        title={whyChooseUsConfig.title}
        description={whyChooseUsConfig.description}
        features={whyChooseUsConfig.features}
        conclusion={whyChooseUsConfig.conclusion}
        ctaText={whyChooseUsConfig.ctaText}
        ctaLink={whyChooseUsConfig.ctaLink}
        primaryColor={whyChooseUsConfig.primaryColor}
      />
    </main>
  );
} 