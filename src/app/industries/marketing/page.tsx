import { MarketingSections } from "@/components/industries/marketing/sections-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function MarketingPage() {
  // Industry-specific configuration
  const industryConfig = {
    // Hero section configuration
    hero: {
      badge: "INDUSTRY",
      title: "Marketing",
      description: "Marketing isn't just about reaching people—it's about moving them. Pulp makes that movement smarter. With AI-driven precision, Pulp transforms insights into action, making every marketing move strategic, adaptive, and measurable.",
      primaryColor: "purple" as const,
      accentColor: "pink" as const,
      tertiaryColor: "green" as const,
      imagePath: "/industries/marketing-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Know Your Audience Before They Know Themselves",
        description: "What if you could predict how your audience will respond before launching a campaign? Pulp deciphers sentiment shifts, behavioral signals, and persuasion patterns, giving you an edge in crafting messages that land exactly how you want them to.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "Users",
      },
      {
        title: "Messaging That Hits, Every Time",
        description: "Every brand has a story—but is it resonating? Pulp uncovers why messaging works (or doesn't), optimizing language, tone, and framing for maximum impact. No more guesswork—just data-backed storytelling that drives action.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "MessageCircle",
      },
      {
        title: "From Raw Data to Actionable Strategy—Instantly",
        description: "Reports don't drive results—decisions do. Pulp automates deep market analysis, real-time consumer behavior tracking, and competitive intelligence, so you can react to trends faster than your competitors. Move from insight to execution in record time.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "LineChart",
      },
      {
        title: "Eliminate Friction in Internal Workflows",
        description: "Marketing teams don't just need better insights—they need better flow. Pulp organizes fragmented data, simplifies documentation, and streamlines internal processes, so teams spend less time chasing information and more time executing high-impact campaigns.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Workflow",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Marketing tools track performance. Pulp predicts it.",
      features: [
        "AI-driven audience sentiment prediction",
        "Message optimization before launch",
        "Real-time market analysis and competitive intelligence",
        "Streamlined workflows for marketing teams",
        "Data-backed strategic recommendations",
        "Campaign performance forecasting"
      ],
      conclusion: "Ready to outmaneuver the competition?",
      ctaText: "Schedule a Demo",
      ctaLink: "/contact",
      primaryColor: "purple" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={industryConfig.hero.badge}
        title={industryConfig.hero.title}
        description={industryConfig.hero.description}
        primaryColor={industryConfig.hero.primaryColor}
        accentColor={industryConfig.hero.accentColor}
        tertiaryColor={industryConfig.hero.tertiaryColor}
        imagePath={industryConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <MarketingSections sections={industryConfig.sections} />
      
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