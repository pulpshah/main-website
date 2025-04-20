"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  description: string;
  features: FeatureItem[];
}

export default function FeaturesSection({
  title = "The Most Natural Artificial Intelligence Ever",
  subtitle = "Pulp AI Understands Language Like Humans Do",
  description = "Natural language is about conveying meaning, grasping ideas, and compelling action. Use Pulp AI's language dynamics to do what humans naturally do, and more.",
  features = [
    {
      image: "/landing-images/Predict and Simulate Persuasive Resonance.svg",
      title: "Predict and Simulate Persuasive Resonance",
      description:
        "Anticipate how messages will be received. Pulp evaluates whether an audience will accept, consider, or reject a message before it's even delivered.",
    },
    {
      image:
        "/landing-images/Understand Appeals With Unprecedented Granularity.svg",
      title: "Understand Appeals With Unprecedented Granularity",
      description:
        "Analyze persuasion with unmatched precision. Pulp analyzes ethos, pathos, logos, and advanced rhetorical structures to map how arguments are built and how they land.",
    },
    {
      image:
        "/landing-images/Score Responses Based On Word Choice and Objective.svg",
      title: "Score Responses Based On Word Choice and Objective",
      description:
        "Quantify the power of language. Not all words carry the same weight. Pulp's proprietary algorithm scores rhetoric' relative influence in any conversation.",
    },
    {
      image:
        "/landing-images/Create Realistic Personas Individual, Group, and Entity.svg",
      title: "Create Realistic Personas: Individual, Group, and Entity",
      description:
        "Go beyond basic demographics. Pulp maps deep psychographics, cognitive states, and decision-making patterns. Pulp reveals not just who is engaging but why they engage the way they do.",
    },
    {
      image: "/landing-images/Topic Clustering and Knowledge Mapping.svg",
      title: "Topic Clustering and Knowledge Mapping",
      description:
        "Utilize the deeper narrative within words. Conversations reveal themes, biases, and implicit knowledge structures. Pulp traces connections that others miss.",
    },
    {
      image:
        "/landing-images/Model Discussions as Digital, Physical, or Hybrid.svg",
      title: "Model Discussion Scenes as Digital, Physical, or Hybrid",
      description:
        "Simulate conversations across any setting. Context matters. Pulp accounts for time, place, format, and interaction mode to refine engagement insights.",
    },
  ],
}: Partial<FeaturesSectionProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-20 px-4 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Light Blob */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl opacity-30 -z-10"
        style={{
          opacity: isVisible ? 0.3 : 0,
          transition: "opacity 1s ease-out",
        }}
      />

      {/* Heading */}
      <div className="text-center mb-20">
        <span className="inline-block mb-4 px-4 py-2 text-xs text-white bg-blue-600/20 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.7)]">
          AI LANGUAGE CAPABILITIES
        </span>
        <h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {title}
        </h2>
        <h3
          className="text-xl text-blue-200 font-semibold mb-4 transition-all duration-700 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {subtitle}
        </h3>
        <p
          className="text-gray-400 max-w-2xl mx-auto transition-all duration-700 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {description}
        </p>
      </div>

      {/* Feature List */}
      <div className="flex flex-col space-y-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {/* Left Title */}
            <div
              className="text-2xl md:text-3xl font-bold text-white text-center md:text-left md:w-1/3"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-blue-300 bg-clip-text text-transparent">
                {feature.title}
              </span>
            </div>

            {/* Middle Icon */}
            <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0 group">
              <div className="absolute inset-0 rounded-xl bg-white/10 blur-lg z-0 transition-opacity duration-300 group-hover:opacity-30" />
              <Image
                src={feature.image}
                alt={feature.title}
                width={192}
                height={192}
                className="relative z-10 object-contain opacity-80 grayscale-[20%] rounded-xl transition-transform duration-300 group-hover:scale-125"
              />
            </div>

            {/* Right Description */}
            <div className="text-sm text-gray-200 md:w-1/3 text-center md:text-right">
              {feature.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}