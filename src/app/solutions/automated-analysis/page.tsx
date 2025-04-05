import SolutionHero from "@/components/solutions/solution-hero";
import KnowledgeSynthesisSections from "@/components/solutions/knowledge-synthesis/sections-list";
import WhyChooseUs from "@/components/solutions/why-choose-us";

export default function KnowledgeSynthesisPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Automated Analysis",
      description: "Automated Analysis is about understanding context and extracting valuable insights. Pulp analyzes information from diverse sources, identifying patterns and organizing knowledge to drive more informed decision-making.",
      primaryColor: "red" as const,
      accentColor: "red" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/knowledge-synthesis-visual.svg",
    },
    
    // Content sections
    sections: [
      {
        title: "Extract Insights From Disparate Data",
        description: "Pulp connects information across sources, formats, and platforms—transforming scattered data points into cohesive, actionable knowledge frameworks.",
        imageSide: "right" as const,
        color: "red" as const,
        icon: "FileSearch",
      },
      {
        title: "Identify Hidden Patterns and Correlations",
        description: "Advanced algorithmic analysis reveals non-obvious connections between topics, trends, and perspectives that would remain hidden to human analysts alone.",
        imageSide: "left" as const,
        color: "red" as const,
        icon: "Network",
      },
      {
        title: "Transform Information Into Strategic Knowledge",
        description: "Move beyond information overload to synthesized insights that support confident decision-making and strategic planning.",
        imageSide: "right" as const,
        color: "red" as const,
        icon: "Library",
      },
      {
        title: "Accelerate Research and Development",
        description: "Automate knowledge extraction and organization to increase research efficiency and enable breakthroughs by connecting previously siloed information.",
        imageSide: "left" as const,
        color: "red" as const,
        icon: "Rocket",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "When data becomes overwhelming, Pulp brings clarity.",
      features: [
        "Multi-source knowledge integration",
        "Advanced semantic modeling",
        "Contextual understanding",
        "Continuous learning systems"
      ],
      conclusion: "By transforming fragmented information into coherent, actionable insights, Pulp helps organizations build institutional knowledge that drives innovation and competitive advantage.",
      ctaText: "Request a Demo",
      ctaLink: "/contact",
      primaryColor: "red" as const,
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
      
      {/* Content Sections - Using custom component for knowledge synthesis */}
      <KnowledgeSynthesisSections sections={solutionConfig.sections} />
      
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