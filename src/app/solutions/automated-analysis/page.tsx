import AutomatedAnalysisSections from "@/components/solutions/automated-analysis/sections-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function AutomatedAnalysisPage() {
  // Solution-specific configuration
  const solutionConfig = {
    // Hero section configuration
    hero: {
      badge: "SOLUTION",
      title: "Automated Analysis & Decision Support",
      description: "Data is only useful if you know what to do with it. Automated Analysis is about understanding context and extracting valuable insights. Pulp doesn’t just surface insights—it tells you why they matter. By detecting hidden patterns, mapping rhetorical influence, and breaking down complex information, Pulp transforms unstructured data into strategy, helping you move from noise to knowledge in real time.",
      primaryColor: "red" as const,
      accentColor: "red" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/solutions/automated-analysis-visual.svg",
    },
    
    // Content sections
    sections: [
      {
        title: "See What Others Overlook",
        description: "Most analysis tools focus on what's obvious. Pulp goes deeper, uncovering implicit biases, persuasion tactics, and unseen connections that shape decisions. Whether it's decoding sentiment shifts or exposing the logic behind arguments, Pulp reveals the narratives behind the numbers.",
        imageSide: "right" as const,
        color: "red" as const,
        icon: "FileSearch",
      },
      {
        title: "From Raw Text to Tactical Advantage",
        description: "Reports, discussions, contracts. Pulp dissects dense language with surgical precision, extracting key themes, contradictions, and persuasion patterns. No fluff. No clutter. Just distilled intelligence, ready for action.",
        imageSide: "left" as const,
        color: "red" as const,
        icon: "Network",
      },
      {
        title: "Decisions at the Speed of Thought",
        description: "You don't need more reports. You need answers. Pulp delivers real-time insights that highlight risks, opportunities, and persuasion dynamics so you can move from analysis to execution. Fast.",
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
      <Hero 
        badge={solutionConfig.hero.badge}
        title={solutionConfig.hero.title}
        description={solutionConfig.hero.description}
        primaryColor={solutionConfig.hero.primaryColor}
        accentColor={solutionConfig.hero.accentColor}
        tertiaryColor={solutionConfig.hero.tertiaryColor}
        imagePath={solutionConfig.hero.imagePath}
      />
      
      {/* Content Sections - Using custom component for knowledge synthesis */}
      <AutomatedAnalysisSections sections={solutionConfig.sections} />
      
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