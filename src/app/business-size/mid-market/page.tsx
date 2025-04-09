import { MidMarketSections } from "@/components/business-size/mid-market/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function MidMarketPage() {
  // Mid-Market specific configuration
  const midMarketConfig = {
    // Hero section configuration
    hero: {
      badge: "BUSINESS SIZE",
      title: "Mid-Market",
      description: "More reach. Sharper positioning. Smarter decisions. Growth isn't just about scaling, it's about knowing what moves the needle. Pulp helps mid-market businesses turn audience data into action, optimizing engagement, messaging, and marketing spend with precision.",
      primaryColor: "purple" as const,
      accentColor: "purple" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/business-size/mid-market-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Expand your audience. Without the guesswork.",
        description: "Stop chasing engagement. Start attracting the right people. Pulp refines your content and strategy in real-time to grow your following with purpose.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "Users",
      },
      {
        title: "Know what customers want, before they ask.",
        description: "Predictive AI pinpoints shifting needs and behaviors. Anticipate customer concerns, streamline responses, and turn satisfaction into loyalty.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "BrainCircuit",
      },
      {
        title: "Refine your messaging. Make every word count.",
        description: "From first contact to final sale, Pulp ensures your messaging lands with the right people at the right moment. Targeted, consistent, built for growth.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "MessageSquare",
      },
      {
        title: "Segment smarter. Convert faster.",
        description: "AI-driven behavioral insights sort your audience into high-impact segments, so your campaigns hit harder and scale without wasted effort.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "PieChart",
      },
      {
        title: "Higher ROI. Lower ad spend waste.",
        description: "Optimize every campaign with real-time performance data. More conversions. Less trial and error.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "TrendingUp",
      },
      {
        title: "See your competitors coming. Move first.",
        description: "Track industry trends, monitor competitor positioning, and adjust in real-time. The best offense is knowing their next play before they make it.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Target",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Built for businesses on the rise",
      description: "Powerful tools designed for growing mid-market companies.",
      features: [
        "AI-powered insights designed for agility",
        "Plug-and-play integrations for growth-focused teams",
        "Smarter automation, fewer inefficiencies, better margins",
        "The tools to scale, without losing control"
      ],
      conclusion: "Ready to scale with precision?",
      ctaText: "Book a Demo",
      ctaLink: "/contact",
      primaryColor: "purple" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={midMarketConfig.hero.badge}
        title={midMarketConfig.hero.title}
        description={midMarketConfig.hero.description}
        primaryColor={midMarketConfig.hero.primaryColor}
        accentColor={midMarketConfig.hero.accentColor}
        tertiaryColor={midMarketConfig.hero.tertiaryColor}
        imagePath={midMarketConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <MidMarketSections sections={midMarketConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={midMarketConfig.whyChooseUs.title}
        description={midMarketConfig.whyChooseUs.description}
        features={midMarketConfig.whyChooseUs.features}
        conclusion={midMarketConfig.whyChooseUs.conclusion}
        ctaText={midMarketConfig.whyChooseUs.ctaText}
        ctaLink={midMarketConfig.whyChooseUs.ctaLink}
        primaryColor={midMarketConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
}
