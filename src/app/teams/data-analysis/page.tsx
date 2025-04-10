
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";
import { DataAnalysisSections } from "@/components/teams/data-analysis/section-list";

export default function DataAnalysisPage() {
  // Data Analysis Teams configuration
  const dataAnalysisConfig = {
    // Hero section configuration
    hero: {
      badge: "TEAMS",
      title: "Data Analysis Teams",
      description: "See the signal. Cut the noise. Predict what's next. You don't need more dashboards. You need answers. Pulp helps your team move from monitoring to mastery—tracking what's happening now, why it's happening, and what your audience will care about next.",
      primaryColor: "amber" as const,
      accentColor: "blue" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/teams/data-analysis-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Unify engagement data across every channel.",
        description: "No more siloed insights. Pulp aggregates behavior across platforms into a single, coherent view.",
        imageSide: "right" as const,
        color: "amber" as const,
        icon: "BarChart",
      },
      {
        title: "Spot emerging narratives before they go mainstream.",
        description: "Identify rising topics, emotional shifts, and influential voices before they hit critical mass.",
        imageSide: "left" as const,
        color: "amber" as const,
        icon: "TrendingUp",
      },
      {
        title: "Go beyond sentiment. Understand intent.",
        description: "Our models analyze tone, rhetoric, and subtext—so you know not just what's being said, but what it means.",
        imageSide: "right" as const,
        color: "amber" as const,
        icon: "Brain",
      },
      {
        title: "Zoom out or drill down in seconds.",
        description: "Whether you're reporting to leadership or fine-tuning campaigns, get the right level of clarity instantly.",
        imageSide: "left" as const,
        color: "amber" as const,
        icon: "Search",
      },
      {
        title: "Quantify content performance. Qualify audience response.",
        description: "Track how specific messages land and evolve over time across different audience segments.",
        imageSide: "right" as const,
        color: "amber" as const,
        icon: "LineChart",
      },
      {
        title: "Predict the pivot points.",
        description: "Use trend forecasting to stay ahead of shifts in public conversation and adapt your strategy before the window closes.",
        imageSide: "left" as const,
        color: "amber" as const,
        icon: "Activity",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Built for teams who turn data into strategy",
      description: "From insights to action.",
      features: [
        "Research & Insights groups",
        "Comms analytics & strategy leads", 
        "Political operations & public affairs teams",
        "Marketing intelligence units"
      ],
      conclusion: "Ready to transform your data analysis approach?",
      ctaText: "Book a Demo",
      ctaLink: "/contact",
      primaryColor: "amber" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={dataAnalysisConfig.hero.badge}
        title={dataAnalysisConfig.hero.title}
        description={dataAnalysisConfig.hero.description}
        primaryColor={dataAnalysisConfig.hero.primaryColor}
        accentColor={dataAnalysisConfig.hero.accentColor}
        tertiaryColor={dataAnalysisConfig.hero.tertiaryColor}
        imagePath={dataAnalysisConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <DataAnalysisSections sections={dataAnalysisConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={dataAnalysisConfig.whyChooseUs.title}
        description={dataAnalysisConfig.whyChooseUs.description}
        features={dataAnalysisConfig.whyChooseUs.features}
        conclusion={dataAnalysisConfig.whyChooseUs.conclusion}
        ctaText={dataAnalysisConfig.whyChooseUs.ctaText}
        ctaLink={dataAnalysisConfig.whyChooseUs.ctaLink}
        primaryColor={dataAnalysisConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
} 