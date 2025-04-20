
import { AboutSections } from "@/components/about/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function AboutPage() {
  // About page specific configuration
  const aboutConfig = {
    // Hero section configuration
    hero: {
      badge: "ABOUT US",
      title: "AI That Thinks Like You",
      description: "Pulp is an AI research and development company building persuasive intelligence: technology that enhances thoughtful engagement, critical reasoning, and strategic communication.",
      primaryColor: "purple" as const,
      accentColor: "purple" as const,
      tertiaryColor: "purple" as const,
      imagePath: "/about/about-hero-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "Our Story",
        description: "Pulp was founded in New York in 2019 with a deep curiosity about how language influences, persuades, and connects people in the digital age. Driven by this understanding, we set out to build solutions that scale, making engagement, messaging, and marketing more people-centered, powered by data that goes beyond clicks.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "History",
      },
      {
        title: "Our Mission",
        description: "AI is already reshaping how we work, learn, and communicate, but too often, it prioritizes engagement and output over clarity and intention. At Pulp, we believe AI should sharpen awareness, not dull it.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Target",
      },
      {
        title: "What We Do",
        description: "Pulp is an interaction-first AI platform designed to elevate thinking. We build systems that understand persuasion, analyze discussion, and support strategic decision-making across industries.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "Lightbulb",
      },
      {
        title: "What Makes Us Different",
        description: "Most AI tools automate tasks or generate content. Pulp is different. We model how and why people think, decide, and influence each other. By embedding critical reasoning into every layer, we make AI a thought partner, not just a tool.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Sparkles",
      },
      {
        title: "Who We Serve",
        description: "Pulp is built for people who shape ideas and drive outcomes. Whether you're leading a company, running a campaign, publishing content, or teaching the next generation, our platform helps you think clearer, communicate better, and act smarter.",
        imageSide: "right" as const,
        color: "purple" as const,
        icon: "Users",
      },
      {
        title: "Our Values",
        description: "The principles that guide how we build, think, and collaborate: Strategic Clarity, Human-Centered Design, Transparency by Default, Ethical Intelligence, and Systems Thinking.",
        imageSide: "left" as const,
        color: "purple" as const,
        icon: "Heart",
      },
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "We're building the future of strategic reasoning",
      description: "From beta pilots to enterprise partnerships, we're scaling Pulp with people who want more from AI.",
      features: [
        "Strategic Clarity - We value insight over noise",
        "Human-Centered Design - Technology should amplify human strengths",
        "Transparency by Default - Clear methods and explainable models",
        "Ethical Intelligence - We build what's responsible",
        "Systems Thinking - We consider the broader impact"
      ],
      conclusion: "Ready to join us?",
      ctaText: "Contact Us",
      ctaLink: "/contact",
      primaryColor: "purple" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={aboutConfig.hero.badge}
        title={aboutConfig.hero.title}
        description={aboutConfig.hero.description}
        primaryColor={aboutConfig.hero.primaryColor}
        accentColor={aboutConfig.hero.accentColor}
        tertiaryColor={aboutConfig.hero.tertiaryColor}
        imagePath={aboutConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <AboutSections sections={aboutConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={aboutConfig.whyChooseUs.title}
        description={aboutConfig.whyChooseUs.description}
        features={aboutConfig.whyChooseUs.features}
        conclusion={aboutConfig.whyChooseUs.conclusion}
        ctaText={aboutConfig.whyChooseUs.ctaText}
        ctaLink={aboutConfig.whyChooseUs.ctaLink}
        primaryColor={aboutConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
}
