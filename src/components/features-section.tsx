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
      image: "/landing-images/Predict and Simulate Persuasive Resonance.png",
      title: "Predict and Simulate Persuasive Resonance",
      description: "Anticipate how messages will be received. Pulp evaluates whether an audience will accept, consider, or reject a message before it's even delivered."
    },
    {
      image: "/landing-images/Understand Appeals With Unprecedented Granularity.png",
      title: "Understand Appeals With Unprecedented Granularity",
      description: "Decode persuasion in action. Pulp analyzes ethos, pathos, logos, and advanced rhetorical structures to map how arguments are built—and how they land."
    },
    {
      image: "/landing-images/Score Responses Based On Word Choice and Objective.png",
      title: "Score Responses Based On Word Choice and Objective",
      description: "Measure the impact of specific language. Not all words carry the same weight. Pulp's proprietary algorithm scores rhetoric's relative influence in any conversation."
    },
    {
      image: "/landing-images/Create Realistic Personas Individual, Group, and Entity.png",
      title: "Create Realistic Personas: Individual, Group, and Entity",
      description: "Map deep psychographics, acute cognitive states, and decision-making tendencies. Pulp understands not just who is engaging, but why they engage the way they do."
    },
    {
      image: "/landing-images/Topic Clustering and Knowledge Mapping.png",
      title: "Topic Clustering and Knowledge Mapping",
      description: "Utilize the deeper narrative within words. Conversations reveal themes, biases, and implicit knowledge structures. Pulp traces connections that others miss."
    },
    {
      image: "/landing-images/Model Discussions as Digital, Physical, or Hybrid.png",
      title: "Model Discussions as Digital, Physical, or Hybrid",
      description: "Simulate conversations across any setting. Context matters. Pulp accounts for time, place, format, and interaction mode to refine engagement insights."
    }
  ]
}: Partial<FeaturesSectionProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const featuresSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }

    return () => {
      if (featuresSectionRef.current) {
        observer.unobserve(featuresSectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={featuresSectionRef} className="py-16 relative overflow-hidden">
      {/* Background blob */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/20 via-transparent to-transparent rounded-full blur-3xl opacity-30 -z-10"
        style={{
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 1s ease-out'
        }}
      />

      {/* Section Heading */}
      <div className="mb-16 text-center px-4">
        <div className="inline-flex items-center justify-center bg-blue-900/20 backdrop-blur-sm px-5 py-1.5 rounded-full mb-6 border border-blue-500/30">
          <span className="text-blue-300 text-sm font-medium tracking-wider">AI LANGUAGE CAPABILITIES</span>
        </div>
        
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease'
          }}
        >
          {title}
        </h2>
        
        <div 
          className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            width: isVisible ? '96px' : '20px',
            transition: 'opacity 0.6s ease, width 0.8s ease'
          }}
        />
        
        <h3 
          className="text-xl md:text-2xl font-semibold text-blue-200 mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s'
          }}
        >
          {subtitle}
        </h3>
        
        <p 
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
          }}
        >
          {description}
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto px-4 overflow-hidden">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            feature={feature} 
            index={index} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ 
  feature, 
  index, 
  isVisible 
}: { 
  feature: FeatureItem; 
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="bg-black/20 backdrop-filter backdrop-blur-lg border border-blue-800/20 rounded-xl overflow-hidden group relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
      }}
    >
      {/* Image section */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-800 ease-in-out transform group-hover:scale-105"
        />
      </div>
      
      {/* Content section */}
      <div className="p-6 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
        
        <h3 className="text-lg font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {feature.description}
        </p>
        
        {/* Hover border effect */}
        <div className="absolute inset-0 border border-blue-500/0 rounded-xl group-hover:border-blue-500/30 transition-all duration-300"></div>
      </div>
    </div>
  );
} 