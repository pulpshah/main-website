import { TechnologySections } from "@/components/industries/technology/sections-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function TechnologyPage() {
  // Industry-specific configuration
  const industryConfig = {
    // Hero section configuration
    hero: {
      badge: "INDUSTRY",
      title: "Technology",
      description: "AI should integrate seamlessly—not slow you down. With Pulp, it just works. Building with AI shouldn't mean wrestling with fragmented tools, rigid models, or endless fine-tuning. Pulp's developer-first ecosystem delivers powerful APIs, SDKs, and adaptable AI workflows designed to scale effortlessly.",
      primaryColor: "blue" as const,
      accentColor: "blue" as const,
      tertiaryColor: "blue" as const,
      imagePath: "/industries/technology-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Seamless AI Deployment, from Prototype to Scale",
        description: "Skip the complexity. Pulp lets developers build, fine-tune, and deploy AI workflows with minimal friction. Whether orchestrating AI pipelines, automating content summarization, or integrating advanced NLU, it's all streamlined in one platform.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "Code",
      },
      {
        title: "Elevate User Experiences with Adaptive AI",
        description: "AI should feel human. Pulp's natural language understanding (NLU) models power hyper-intelligent chatbots, knowledge retrieval systems, and personalization engines—enhancing search, recommendations, and real-time adaptive learning.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "User",
      },
      {
        title: "Unstructured Data, Instantly Structured",
        description: "From conversations to reports to social interactions—Pulp extracts real insights at scale. No more sifting through endless documents or datasets. Get precise, actionable intelligence in real time.",
        imageSide: "right" as const,
        color: "blue" as const,
        icon: "Database",
      },
      {
        title: "Enterprise-Grade Performance & Compliance",
        description: "Built for low-latency, high-availability, and airtight security, Pulp meets the demands of enterprise-scale AI. Stay compliant with industry standards while ensuring privacy-first AI deployments that don't compromise performance.",
        imageSide: "left" as const,
        color: "blue" as const,
        icon: "Shield",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Pulp isn't just an AI model—it's a complete AI development platform.",
      features: [
        "Flexible APIs for seamless integration",
        "Real-time adaptability for dynamic applications",
        "Developer-first approach with robust SDKs",
        "Enterprise-grade performance and security",
        "Scalable infrastructure for growing needs",
        "Privacy-first AI deployments"
      ],
      conclusion: "Ready to build with Pulp?",
      ctaText: "Get started with our SDK",
      ctaLink: "/contact",
      primaryColor: "blue" as const,
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
      <TechnologySections sections={industryConfig.sections} />
      
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