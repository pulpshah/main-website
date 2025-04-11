import { ProgramSections } from "@/components/programs/section-list";
import Hero from "@/components/shared/hero";
import WhyChooseUs from "@/components/shared/why-choose-us";

export default function ProgramsPage() {
  // Programs page configuration
  const programsConfig = {
    // Hero section configuration
    hero: {
      badge: "APPRENTICESHIP",
      title: "Train the Next Generation of Thinkers, Not Just Users",
      description: "At Pulp, we believe the future of technology depends on how we shape the people building it. Our Apprenticeship Program develops interdisciplinary, AI-native talent who think in systems, communicate with clarity, and lead with purpose.",
      primaryColor: "green" as const,
      accentColor: "purple" as const,
      tertiaryColor: "pink" as const,
      imagePath: "/programs/apprenticeship-visual.svg",
    },
    
    // Sections for main content area
    sections: [
      {
        title: "About the Program",
        subtitle: "Hands-on learning at the heart of AI workflows",
        description: "Apprentices work side by side with our team to solve real-world problems. No simulations, no case studies.",
        points: [
          {
            title: "Project-based, personalized",
            description: "Roles are matched to student strengths and interests, from automation and NLP, to software development and interaction design.",
            icon: "Briefcase"
          },
          {
            title: "Mentorship-driven growth",
            description: "Apprentices work closely with domain leads who offer structured feedback and support in developing strategic thinking, technical fluency, and leadership skills.",
            icon: "Users"
          },
          {
            title: "Think + build",
            description: "We teach how to structure ambiguity, translate ideas into execution, and work across disciplines.",
            icon: "Lightbulb"
          }
        ],
        color: "green" as const,
      },
      {
        title: "Rooted in Culture",
        subtitle: "Interdisciplinary. Intergenerational. Intentional.",
        description: "Our culture is built on collaboration across diverse backgrounds and experience levels, every member bringing unique value.",
        points: [
          {
            title: "Students from all fields",
            description: "We welcome thinkers from political science, design, cognitive science, engineering, and beyond.",
            icon: "GraduationCap"
          },
          {
            title: "Mutual mentorship",
            description: "Senior experts guide, while apprentices bring new tools, fresh perspectives, and lived context.",
            icon: "Compass"
          },
          {
            title: "Supportive & collaborative",
            description: "Traditional hierarchy takes a back seat to clear thinking, shared language, and mutual respect.",
            icon: "HandsHelping"
          }
        ],
        color: "green" as const,
      },
      {
        title: "Why It Matters",
        subtitle: "Tech should be built with the next generation, not just for them",
        description: "We see our apprenticeship as more than just a program. It's a long-term investment in the kind of visionary thinkers we want to see leading the future.",
        points: [
          {
            title: "Career acceleration",
            description: "Students gain real-world experience, build a meaningful portfolio, and grow their network.",
            icon: "Rocket"
          },
          {
            title: "Bridge perspectives",
            description: "Team members learn to work across generations, tools, and ways of thinking.",
            icon: "Bridge"
          },
          {
            title: "Shape what's next",
            description: "Builders help define how tech serves society, with strategy, empathy, and purpose.",
            icon: "Globe"
          }
        ],
        color: "green" as const,
      }
    ],
    
    // Why choose us section
    whyChooseUs: {
      title: "Join Our Apprenticeship Program",
      description: "This is where sharp thinkers become strategic operators. Guided by experience, powered by curiosity.",
      features: [
        "Hands-on experience with real projects",
        "Mentorship from industry experts", 
        "Cross-disciplinary collaboration",
        "Portfolio-building opportunities"
      ],
      conclusion: "Ready to shape the future of technology?",
      ctaText: "Apply Now",
      ctaLink: "/apply",
      primaryColor: "green" as const,
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero 
        badge={programsConfig.hero.badge}
        title={programsConfig.hero.title}
        description={programsConfig.hero.description}
        primaryColor={programsConfig.hero.primaryColor}
        accentColor={programsConfig.hero.accentColor}
        tertiaryColor={programsConfig.hero.tertiaryColor}
        imagePath={programsConfig.hero.imagePath}
      />
      
      {/* Content Sections */}
      <ProgramSections sections={programsConfig.sections} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs 
        title={programsConfig.whyChooseUs.title}
        description={programsConfig.whyChooseUs.description}
        features={programsConfig.whyChooseUs.features}
        conclusion={programsConfig.whyChooseUs.conclusion}
        ctaText={programsConfig.whyChooseUs.ctaText}
        ctaLink={programsConfig.whyChooseUs.ctaLink}
        primaryColor={programsConfig.whyChooseUs.primaryColor}
      />
    </main>
  );
} 