import { EnterpriseSections } from "@/components/business-size/enterprise/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function EnterprisePage() {
  // Enterprise-specific configuration
  const enterpriseConfig = {
    // Hero section configuration
    hero: {
      badge: "BUSINESS SIZE",
      title: "Enterprise",
      description: "What happens when your messaging thinks for itself? Pulp helps large organizations turn language into leverage. Simulate how people respond. Catch misinformation before it spreads. Shape narratives that actually land.",
      primaryColor: "blue" as const,
      accentColor: "blue" as const,
      tertiaryColor: "blue" as const,
      imagePath: "/business-size/enterprise-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Know where you stand. Shift when it matters.",
        description: "Track favorability in real time. We scan the signals—across platforms, across continents—so you know what's working and what needs work.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "ChartBar",
      },
      {
        title: "Model the minds that matter.",
        description: "Voters. Customers. Executives. Activists. Run your messaging through AI simulations trained to think like them. Predict how they'll react before it hits the feed.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "Brain",
      },
      {
        title: "Test your message before it costs you.",
        description: "Pressure-test policies, campaigns, and statements. See what resonates. Spot the cracks. Refine before release.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "BeakerCheck",
      },
      {
        title: "Kill the noise. Flag the threat.",
        description: "Our AI isolates fake accounts, coordinated attacks, and bots designed to derail trust. Fast. Quietly. Surgically.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "Shield",
      },
      {
        title: "When the storm hits, act like you saw it coming.",
        description: "Get instant alerts when disinformation starts moving. Then deploy neurolinguistic counter-messaging that adapts to tone, timing, and urgency.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "Lightning",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Enterprise-ready. And then some.",
      description: "Powerful capabilities built for organizations with zero margin for error.",
      features: [
        "Real-time processing across millions of data points",
        "Open APIs to fit cleanly into your stack",
        "Secure. Compliant. Globally scalable",
        "Built for teams with zero margin for error"
      ],
      conclusion: "Ready to transform your enterprise messaging?",
      ctaText: "Contact our enterprise team",
      ctaLink: "/contact",
      primaryColor: "blue" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={enterpriseConfig.hero.badge}
        title={enterpriseConfig.hero.title}
        description={enterpriseConfig.hero.description}
        primaryColor={enterpriseConfig.hero.primaryColor}
        accentColor={enterpriseConfig.hero.accentColor}
        tertiaryColor={enterpriseConfig.hero.tertiaryColor}
        imagePath={enterpriseConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <EnterpriseSections sections={enterpriseConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={enterpriseConfig.whyChooseUs.title}
        description={enterpriseConfig.whyChooseUs.description}
        features={enterpriseConfig.whyChooseUs.features}
        conclusion={enterpriseConfig.whyChooseUs.conclusion}
        ctaText={enterpriseConfig.whyChooseUs.ctaText}
        ctaLink={enterpriseConfig.whyChooseUs.ctaLink}
        primaryColor={enterpriseConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
}
