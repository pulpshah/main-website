import Hero from "@/components/shared/hero";
import IntelligentCommunicationSections from "@/components/solutions/intelligent-communication/sections-list";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function IntelligentCommunicationPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Intelligent Communication & Engagement",
      description: "Messaging isn't just about what you say; it's about how it lands. Pulp turns conversation into strategy, structuring dialogue with precision, refining persuasion, and ensuring every interaction drives impact. Whether shaping narratives, enhancing collaboration, or optimizing engagement, Pulp makes communication sharper, smarter, and impossible to ignore.",
      primaryColor: "purple" as const,
      accentColor: "pink" as const,
      tertiaryColor: "green" as const,
      imagePath: "/solutions/communication-visual.svg",
    },
    
    // Content sections
    sections: [
      {
        title: "Make Every Conversation Count",
        description: "Communication isn't just about speaking; it's about understanding. Pulp structures messaging with precision, ensuring clarity, persuasion, and engagement in every interaction. No more misalignment. No more wasted words.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "MessageCircle",
      },
      {
        title: "Persuasion Engineered",
        description: "Most messaging platforms analyze sentiment. Pulp goes further, breaking down ethos, pathos, and logos to map exactly why an argument works. Whether you're refining a pitch, shaping a debate, or guiding collaboration, Pulp ensures your words move people the way you intend.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "LineChart",
      },
      {
        title: "Engagement That Evolves in Real Time",
        description: "Static messaging is dead. Pulp continuously refines language based on audience response, contextual cues, and persuasion patterns, adapting conversations dynamically for maximum impact.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "RefreshCw",
      },
      {
        title: "From Chaos to Clarity",
        description: "Disorganized discussions lead to missed opportunities. Pulp structures conversations, eliminating noise and surfacing what matters. Whether in sales, strategy, or collaboration, every exchange becomes more focused, efficient, and actionable.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Sparkles",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Most tools help you react. Pulp helps you direct.",
      features: [
        "AI-powered persuasion modeling",
        "Real-time discourse mapping",
        "Engagement insights",
      ],
      conclusion: "Pulp ensures every conversation is strategic, effective, and impossible to ignore.",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "purple" as const,
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero 
        badge={solutionConfig.hero.badge}
        title={solutionConfig.hero.title}
        description={solutionConfig.hero.description}
        primaryColor={solutionConfig.hero.primaryColor}
        accentColor={solutionConfig.hero.accentColor}
        tertiaryColor={solutionConfig.hero.tertiaryColor}
        imagePath={solutionConfig.hero.imagePath}
      />
      
      {/* Content Sections - Using custom component for intelligent communication */}
      <IntelligentCommunicationSections sections={solutionConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={solutionConfig.whyChooseUs.title}
        description={solutionConfig.whyChooseUs.description}
        features={solutionConfig.whyChooseUs.features}
        conclusion={solutionConfig.whyChooseUs.conclusion}
        ctaText={solutionConfig.whyChooseUs.ctaText}
        ctaLink={solutionConfig.whyChooseUs.ctaLink}
        primaryColor={solutionConfig.whyChooseUs.primaryColor}
      />
    </div>
  );
}
