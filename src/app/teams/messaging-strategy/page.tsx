import { MessagingStrategySections } from "@/components/teams/messaging-strategy/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function MessagingStrategyPage() {
  // Messaging Strategy Teams configuration
  const messagingStrategyConfig = {
    // Hero section configuration
    hero: {
      badge: "TEAMS",
      title: "Messaging Strategy",
      description: "Your words shape perception. Pulp ensures they hit with precision. AI-powered analysis fine-tunes your messaging—so it resonates, adapts, and drives engagement across every audience.",
      primaryColor: "green" as const,
      accentColor: "green" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/teams/messaging-strategy-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Fine-tune your messaging with data-driven clarity.",
        description: "AI-assisted writing helps you craft compelling, on-brand content—optimized for clarity, tone, and persuasion.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "Pencil",
      },
      {
        title: "Know what resonates before you publish.",
        description: "Pulp analyzes audience sentiment, highlighting the words and angles that create impact.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "BarChart",
      },
      {
        title: "Adapt your strategy in real time.",
        description: "Measure response patterns and adjust messaging dynamically based on real-world engagement.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "RefreshCw",
      },
      {
        title: "Maintain consistency across all channels.",
        description: "From social media to email campaigns, Pulp ensures alignment in voice and messaging strategy.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "Share",
      },
      {
        title: "Turn insights into engagement.",
        description: "Identify key themes, trends, and audience preferences to craft messaging that drives action.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "Brain",
      },
      {
        title: "Avoid blind spots.",
        description: "Spot potential backlash, misinformation risks, and weak points before they reach your audience.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "Shield",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Powering Messaging Teams Across Industries",
      description: "Craft messages that land. Every time.",
      features: [
        "Political campaigns & advocacy groups",
        "Corporate communications & brand strategy", 
        "Marketing & PR agencies",
        "Thought leaders & public figures"
      ],
      conclusion: "Ready to transform your messaging strategy?",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "green" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={messagingStrategyConfig.hero.badge}
        title={messagingStrategyConfig.hero.title}
        description={messagingStrategyConfig.hero.description}
        primaryColor={messagingStrategyConfig.hero.primaryColor}
        accentColor={messagingStrategyConfig.hero.accentColor}
        tertiaryColor={messagingStrategyConfig.hero.tertiaryColor}
        imagePath={messagingStrategyConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <MessagingStrategySections sections={messagingStrategyConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={messagingStrategyConfig.whyChooseUs.title}
        description={messagingStrategyConfig.whyChooseUs.description}
        features={messagingStrategyConfig.whyChooseUs.features}
        conclusion={messagingStrategyConfig.whyChooseUs.conclusion}
        ctaText={messagingStrategyConfig.whyChooseUs.ctaText}
        ctaLink={messagingStrategyConfig.whyChooseUs.ctaLink}
        primaryColor={messagingStrategyConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
}