import SolutionHero from "@/components/solutions/solution-hero";
import ContentModerationSections from "@/components/solutions/content-moderation/sections-list";
import WhyChooseUs from "@/components/solutions/why-choose-us";

export default function ContentModerationPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Scalable Content Moderation & Governance",
      description: "Moderation isn't just about filtering words—it's about understanding intent. Pulp analyzes context, persuasion tactics, and discourse patterns to enforce policies with precision—scaling governance without sacrificing nuance.",
      primaryColor: "blue" as const,
      accentColor: "blue" as const,
      tertiaryColor: "green" as const,
      imagePath: "/content-moderation-visual.svg",
    },
    
    // Content sections
    sections: [
      {
        title: "Detect Misinformation Before It Spreads",
        description: "Pulp doesn't just flag keywords—it tracks rhetorical influence, identifying misleading narratives and manipulative framing before they take hold.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "Shield",
      },
      {
        title: "Enforce Policies With Context-Aware AI",
        description: "Rules mean nothing without understanding. Pulp ensures policy enforcement adapts to context, distinguishing between debate, sarcasm, and genuine harm.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "CheckCircle",
      },
      {
        title: "Optimize for Engagement Without Sacrificing Integrity",
        description: "Maintain vibrant discussions without chaos. Pulp refines moderation strategies to balance free expression with platform integrity.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "BarChart",
      },
      {
        title: "Ensure Ethical, Transparent Governance",
        description: "From community guidelines to corporate compliance, Pulp provides explainable AI-driven moderation—so decisions aren't just made, they're justified.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "Scale",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Keyword filters are blunt instruments. Pulp is surgical.",
      features: [
        "Intent-aware moderation",
        "Context-sensitive policy enforcement",
        "Rhetorical pattern detection",
      ],
      conclusion: "By analyzing rhetoric, influence, and intent, Pulp elevates moderation from rule enforcement to discourse intelligence—keeping communities informed, engaged, and protected.",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "blue" as const,
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <SolutionHero 
        badge={solutionConfig.hero.badge}
        title={solutionConfig.hero.title}
        description={solutionConfig.hero.description}
        primaryColor={solutionConfig.hero.primaryColor}
        accentColor={solutionConfig.hero.accentColor}
        tertiaryColor={solutionConfig.hero.tertiaryColor}
        imagePath={solutionConfig.hero.imagePath}
      />
      
      {/* Content Sections - Using custom component for content moderation */}
      <ContentModerationSections sections={solutionConfig.sections} />
      
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