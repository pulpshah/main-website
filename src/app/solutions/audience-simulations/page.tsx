import AudienceSimulationsSections from "@/components/solutions/audience-simulations/sections-list";
import SolutionHero from "@/components/solutions/solution-hero";
import WhyChooseUs from "@/components/solutions/why-choose-us";

export default function AudienceSimulationsPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Audience Simulations",
      description: "Know your audience before they even respond. Pulp models cognitive states, persuasion dynamics, and decision-making patterns—so you can test, refine, and optimize messaging with certainty before it ever reaches the real world.",
      primaryColor: "pink" as const,
      accentColor: "purple" as const,
      tertiaryColor: "green" as const,
      imagePath: "/audience-simulation-visual.svg",
    },
    
    // Content sections
    sections: [
      {
        title: "Predict Reactions Before They Happen",
        description: "Will your message land? Will it persuade, provoke, or fall flat? Pulp forecasts audience responses, analyzing rhetorical impact so you can fine-tune content before launch.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "BarChart3",
      },
      {
        title: "Refine Messaging With Tactical Precision",
        description: "Not all words carry the same weight. Pulp dissects tone, framing, and emotional resonance—pinpointing what makes a message stick and what makes it fail.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "LineChart",
      },
      {
        title: "Simulate Real-World Conversations",
        description: "Pulp doesn't just analyze text—it recreates audience dynamics. Model debates, marketing campaigns, or policy discussions, factoring in context, biases, and shifting discourse.",
        imageSide: "right" as const,
        color: "pink" as const,
        icon: "RefreshCw",
      },
      {
        title: "Personalize at Scale",
        description: "Every audience is different. Pulp adapts messaging based on psychographics, decision-making drivers, and engagement patterns, delivering tailored experiences that connect.",
        imageSide: "left" as const,
        color: "pink" as const,
        icon: "Sparkles",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "A/B testing is trial and error. Pulp is certainty.",
      features: [
        "Pre-launch audience simulation",
        "Strategic messaging optimization",
        "Dynamic response modeling",
      ],
      conclusion: "Instead of launching and hoping, simulate and know. Pulp gives you a strategic edge—refining messaging before it ever meets the audience, so every word counts.",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "pink" as const,
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
      
      {/* Content Sections - Using custom component for audience simulations */}
      <AudienceSimulationsSections sections={solutionConfig.sections} />
      
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