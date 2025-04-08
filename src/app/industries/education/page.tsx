import { EducationSections } from "@/components/industries/education/sections-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";


export default function EducationPage() {
  // Industry-specific configuration
  const industryConfig = {
    // Hero section configuration
    hero: {
      badge: "INDUSTRY",
      title: "Education",
      description: "Education should evolve as fast as the world around it. With Pulp, it does. From research breakthroughs to classroom engagement, we make learning dynamic, personalized, and intelligent.",
      primaryColor: "green" as const,
      accentColor: "green" as const,
      tertiaryColor: "green" as const,
      imagePath: "/industries/education-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "AI-Powered Research, Without the Busywork",
        description: "Forget manual sifting through sources. Pulp extracts critical insights, identifies connections, and structures research findings in minutes. Whether analyzing academic papers or compiling complex data, researchers get straight to what matters—instantly.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "BookOpen",
      },
      {
        title: "Adaptive Learning That Evolves With Students",
        description: "One-size-fits-all learning is outdated. Pulp personalizes lessons in real-time, adjusting to student comprehension, pace, and engagement. Whether it's reinforcing concepts or introducing new material, every learning experience is tailored for maximum impact.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "Users",
      },
      {
        title: "Smart Assistance for Student Projects",
        description: "Deadlines, research, revisions—Pulp keeps students on track. Acting like an intelligent research assistant, it offers real-time feedback, organizes findings, and refines ideas, so students spend less time struggling and more time producing high-quality work.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "Sparkles",
      },
      {
        title: "Curriculum That (Almost) Writes Itself",
        description: "Educators can design and refine course materials effortlessly. Pulp suggests curriculum adjustments based on student performance, ensuring content stays relevant, engaging, and effective—without endless manual revisions.",
        imageSide: "left" as const,
        color: "green" as const,
        icon: "FileEdit",
      },
      {
        title: "Institution-Wide Insights for Better Outcomes",
        description: "Pulp transforms raw data into actionable intelligence. Administrators can track student performance trends, predict drop-off risks, and optimize institutional strategies with AI-driven insights—scaling personalized education across entire departments.",
        imageSide: "right" as const,
        color: "green" as const,
        icon: "BarChart",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Why Pulp?",
      description: "Most educational tools react to student performance. Pulp anticipates it. By decoding learning patterns, adapting content in real-time, and automating research analysis, we make education more effective—not just more efficient.",
      features: [
        "Real-time content adaptation based on learning patterns and engagement",
        "Automated research analysis that saves hours of manual work",
        "Personalized learning pathways for every student",
        "Predictive analytics to identify at-risk students before they fall behind",
        "Curriculum optimization based on performance data",
        "Seamless integration with existing educational platforms and LMS",
      ],
      conclusion: "Ready to rethink learning?",
      ctaText: "Schedule a Demo",
      ctaLink: "/contact",
      primaryColor: "green" as const,
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
      <EducationSections sections={industryConfig.sections} />
      
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