import { DistributionStrategySections } from "@/components/teams/distribution-strategy/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function DistributionStrategyPage() {
  // Distribution Strategy Teams configuration
  const distributionStrategyConfig = {
    // Hero section configuration
    hero: {
      badge: "TEAMS",
      title: "Distribution Strategy",
      description: "Your message. Everywhere it needs to be. Reaching your audience isn't just about posting—it's about precision. Pulp ensures your message is deployed across every channel, optimized for engagement, and unified in execution.",
      primaryColor: "pink" as const,
      accentColor: "purple" as const,
      tertiaryColor: "blue" as const,
      imagePath: "/teams/distribution-strategy-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "One platform, total control.",
        description: "Manage social media, email, newsletters, and direct outreach from a single portal—no more juggling tools.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "Command",
      },
      {
        title: "Schedule, automate, adapt.",
        description: "Deploy content in real-time or set dynamic schedules that adjust based on audience activity.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "Clock",
      },
      {
        title: "Ensure consistency at scale.",
        description: "Keep messaging aligned across every touchpoint while tailoring delivery to each platform's strengths.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "Check",
      },
      {
        title: "Optimize for each platform.",
        description: "Pulp fine-tunes content structure, length, and format to match the way people engage on different channels.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "Sliders",
      },
      {
        title: "Target the right audience at the right time.",
        description: "AI-driven insights determine peak engagement windows and ideal distribution sequences.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "Target",
      },
      {
        title: "Course-correct in real time.",
        description: "Track performance, spot drop-offs, and adjust strategies instantly—no waiting for post-mortem reports.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "TrendingUp",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Powering Distribution Teams Across Industries",
      description: "Seamless distribution, maximum impact.",
      features: [
        "Media & publishing networks",
        "Political & advocacy organizations", 
        "Corporate brand & PR teams",
        "Multi-channel marketing agencies"
      ],
      conclusion: "Ready to transform your distribution strategy?",
      ctaText: "Book a Demo",
      ctaLink: "/contact",
      primaryColor: "pink" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={distributionStrategyConfig.hero.badge}
        title={distributionStrategyConfig.hero.title}
        description={distributionStrategyConfig.hero.description}
        primaryColor={distributionStrategyConfig.hero.primaryColor}
        accentColor={distributionStrategyConfig.hero.accentColor}
        tertiaryColor={distributionStrategyConfig.hero.tertiaryColor}
        imagePath={distributionStrategyConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <DistributionStrategySections sections={distributionStrategyConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={distributionStrategyConfig.whyChooseUs.title}
        description={distributionStrategyConfig.whyChooseUs.description}
        features={distributionStrategyConfig.whyChooseUs.features}
        conclusion={distributionStrategyConfig.whyChooseUs.conclusion}
        ctaText={distributionStrategyConfig.whyChooseUs.ctaText}
        ctaLink={distributionStrategyConfig.whyChooseUs.ctaLink}
        primaryColor={distributionStrategyConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
} 