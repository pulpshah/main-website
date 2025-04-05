import SolutionHero from "@/components/solutions/solution-hero";
import { AdaptiveChatsSection } from "@/components/solutions/adaptive-chatbots/sections-list";
import WhyChooseUs from "@/components/solutions/why-choose-us";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive Chatbots & Personalization | Pulp AI",
  description: "Our AI-driven agents don't just respond—they anticipate, evolving with every interaction to deliver precision, relevance, and a human-like touch.",
};

export default function AdaptiveChatsPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Adaptive Chatbots & Personalization",
      description: "Most AI assistants follow scripts. Pulp adapts. Our AI-driven agents don't just respond—they anticipate, evolving with every interaction to deliver precision, relevance, and a human-like touch.",
      primaryColor: "green" as const,
      accentColor: "green" as const,
      tertiaryColor: "green" as const,
      imagePath: "/adaptive-chatbots-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Conversations That Feel Natural",
        description: "Forget robotic replies. Pulp understands context, tone, and intent—shaping responses that resonate, persuade, and engage.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "MessageSquare",
      },
      {
        title: "Personalization at Scale",
        description: "Every user is different. Pulp dynamically tailors messaging, recommendations, and interactions to match individual preferences, behaviors, and decision patterns.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "Users",
      },
      {
        title: "Seamless Automation Without the Friction",
        description: "Eliminate repetitive workflows. Pulp's AI assists with knowledge retrieval, onboarding, and internal operations—so teams can focus on strategy, not busywork.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "Workflow",
      },
      {
        title: "Smarter Learning, Smarter Engagement",
        description: "From AI tutors to interactive training modules, Pulp refines learning experiences in real time, adjusting to knowledge gaps, engagement levels, and cognitive styles.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "BookOpen",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Most bots react. Pulp evolves—delivering hyper-relevant interactions that feel less like automation and more like intuition.",
      features: [
        "Emotion Recognition - Detect sentiment and adapt tone in real-time for more empathetic interactions",
        "Contextual Memory - Build on past conversations to provide continuity without asking users to repeat themselves",
        "Preference Learning - Automatically adapt to user behaviors and preferences over time",
        "Seamless Handoff - Intelligently escalate to human agents when needed, with complete context transfer",
        "Multi-channel Consistency - Maintain consistent personalization across web, mobile, and messaging platforms",
        "Continuous Improvement - Learn from every interaction to constantly improve response quality and relevance",
      ],
      conclusion: "Experience the difference adaptive AI makes in customer satisfaction and engagement.",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "green" as const,
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
      
      {/* Content Sections */}
      <AdaptiveChatsSection sections={solutionConfig.sections} />
      
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