import { Metadata } from "next";
import WhyChooseUs from "@/components/shared/why-choose-us";
import { ProfessionalServicesSections } from "@/components/industries/professional-services/sections-list";
import Hero from "@/components/shared/hero";

export const metadata: Metadata = {
  title: "Professional Services Solutions | Pulp",
  description: "Elevate professional services with Pulp AI - transform unstructured data into actionable intelligence, enhancing decision-making and client impact.",
};

export default function ProfessionalServicesPage() {
  // Industry-specific configuration
  const industryConfig = {
    // Hero section configuration
    hero: {
      badge: "INDUSTRY",
      title: "Professional Services",
      description: "Expertise sets you apart. Pulp makes it unstoppable. Transform unstructured data into actionable intelligence, supercharging your decision-making and client impact.",
      primaryColor: "pink" as const,
      accentColor: "pink" as const,
      tertiaryColor: "pink" as const,
    },
    
    // Content sections
    sections: [
      {
        title: "Accelerate Research & Analysis—Instantly",
        description: "Drowning in reports, case law, financial data, or market trends? Pulp extracts key insights in seconds, summarizing critical information and surfacing hidden connections—so you can make informed decisions faster than ever before.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "chart",
      },
      {
        title: "Deliver Next-Level Client Insights",
        description: "Your clients expect clarity, not complexity. Pulp automates high-impact reports, strategic summaries, and data-backed recommendations, ensuring every insight you deliver is precise, persuasive, and effortlessly scalable.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "pie",
      },
      {
        title: "Turn Knowledge into a Competitive Asset",
        description: "Expertise shouldn't get buried in emails, reports, or disconnected systems. Pulp structures and organizes institutional knowledge, making it instantly accessible and actionable—so your team can work smarter, not harder.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "file",
      },
      {
        title: "Anticipate the Future, Not Just Analyze the Past",
        description: "From legal risk assessment to market forecasting, Pulp detects patterns, predicts industry shifts, and flags emerging risks—before they happen. Stay ahead of disruption with AI-powered strategic foresight.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "trending",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Traditional tools help manage information. Pulp transforms it into intelligence.",
      features: [
        "Elevates expertise",
        "Enhances decision-making",
        "Delivers smarter, faster strategic solutions"
      ],
      conclusion: "Our AI doesn't just automate tasks—it elevates expertise, enhances decision-making, and gives professionals an edge in delivering smarter, faster, and more strategic solutions.",
      ctaText: "Elevate Your Expertise",
      ctaLink: "/contact",
      primaryColor: "pink" as const,
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section - Using custom Professional Services Hero */}
      <Hero 
        badge={industryConfig.hero.badge}
        title={industryConfig.hero.title}
        description={industryConfig.hero.description}
        primaryColor={industryConfig.hero.primaryColor}
        accentColor={industryConfig.hero.accentColor}
        tertiaryColor={industryConfig.hero.tertiaryColor}
        imagePath={"/industries/professional-services-visual.svg"}
      />
      
      {/* Content Sections */}
      <ProfessionalServicesSections 
        sections={industryConfig.sections.map((section, index) => ({
          ...section,
          index
        }))} 
      />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={industryConfig.whyChooseUs.title}
        description={industryConfig.whyChooseUs.description}
        features={industryConfig.whyChooseUs.features}
        conclusion={industryConfig.whyChooseUs.conclusion}
        ctaText={industryConfig.whyChooseUs.ctaText}
        ctaLink={industryConfig.whyChooseUs.ctaLink}
        primaryColor={industryConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
} 