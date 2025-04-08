import { GovernmentSections } from "@/components/industries/government/sections-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function GovernmentPage() {
    const heroConfig = {
        badge: "INDUSTRY",
        title: "Government & Civic Engagement",
        description: "The old ways of engaging citizens? Outdated, ineffective, and slow. We changed that—instantly. Pulp deciphers intent, anticipates reactions, and optimizes engagement in ways that weren't possible before.",
        primaryColor: "amber" as const,
        accentColor: "amber" as const,
        tertiaryColor: "amber" as const,
        imagePath: "/industries/government-engagement-visual.svg",
    };

  const sectionsConfig = [
    {
      title: "Engagement That Adapts in Real Time",
      description: "Public communication isn't one-size-fits-all. Pulp personalizes messaging dynamically, adapting tone and content to match audience sentiment, demographics, and even behavioral patterns. Whether addressing policy changes or crisis updates, every message lands with precision.",
      imageSide: "right" as const,
      color: "amber" as const,
      icon: "MessageCircle"
    },
    {
      title: "Predict Public Reactions Before They Happen",
      description: "Waiting for feedback isn't an option. Pulp forecasts how your messages will be received—before they go live. Anticipate support, controversy, or misinformation spikes, and adjust your strategy before the narrative takes on a life of its own.",
      imageSide: "left" as const,
      color: "amber" as const,
      icon: "TrendingUp"
    },
    {
      title: "Understand the True Pulse of Public Sentiment",
      description: "Go beyond surface-level sentiment analysis. Pulp deciphers hidden biases, emerging narratives, and the emotional drivers behind public opinion. Instead of reacting to headlines, you'll shape them with strategic, data-driven decisions.",
      imageSide: "right" as const,
      color: "amber" as const,
      icon: "BarChart"
    },
    {
      title: "Turn Awareness Into Action",
      description: "Mobilizing citizens, passing legislation, or shifting public opinion—it all depends on momentum. Pulp identifies key influencers, maps engagement patterns, and pinpoints the moments when action is most likely to happen. No more guesswork. Just results.",
      imageSide: "left" as const,
      color: "amber" as const,
      icon: "Target"
    },
    {
      title: "Tackle Misinformation Before It Spreads",
      description: "False narratives move fast. Pulp moves faster. Our AI detects misinformation in its early stages, traces its source, and suggests the best counter-messaging strategies. Stop misinformation before it shapes public discourse.",
      imageSide: "right" as const,
      color: "amber" as const,
      icon: "Shield"
    }
  ];

  const whyChooseUsConfig = {
    title: "Why Pulp?",
    description: "Most tools track conversations. Pulp understands them. Our AI doesn't just analyze words—it decodes intent, influence, and impact, giving you an unfair advantage in public engagement.",
    features: [
      "Intelligence, not just analytics",
      "Decode intent and influence",
      "Predict reactions before they happen",
      "Optimize messaging with precision",
      "Real-time adaptation"
    ],
    conclusion: "No noise. No lag. Just actionable intelligence for smarter civic engagement.",
    ctaText: "Schedule a Demo Today",
    ctaLink: "/contact",
    primaryColor: "amber" as const,
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Hero 
        badge={heroConfig.badge}
        title={heroConfig.title}
        description={heroConfig.description}
        primaryColor={heroConfig.primaryColor}
        accentColor={heroConfig.accentColor}
        tertiaryColor={heroConfig.tertiaryColor}
        imagePath={heroConfig.imagePath}
      />
      <GovernmentSections sections={sectionsConfig} />
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