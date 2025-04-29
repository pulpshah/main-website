"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { SparklesTitle } from "@/components/landing/title";
import { MagicCard } from "@/components/magicui/magic-card";

import Image from "next/image";

interface LensCardProps {
  imageSrc: string;
  title: string;
  description: string;
  primaryAction: string;
}

const cards: LensCardProps[] = [
  {
    imageSrc: "/landing-images/Predict and Simulate Persuasive Resonance.svg",
    title: "Predict and Simulate Persuasive Resonance",
    description:
      "Anticipate how messages will be received. Pulp evaluates whether an audience will accept, consider, or reject a message before it's even delivered.",
    primaryAction: "Learn More",
  },
  {
    imageSrc:
      "/landing-images/Understand Appeals With Unprecedented Granularity.svg",
    title: "Understand Appeals With Unprecedented Granularity",
    description:
      "Analyze persuasion with unmatched precision. Pulp analyzes ethos, pathos, logos, and advanced rhetorical structures to map how arguments are built and how they land.",
    primaryAction: "Learn More",
  },
  {
    imageSrc:
      "/landing-images/Score Responses Based On Word Choice and Objective.svg",
    title: "Score Responses Based On Word Choice and Objective",
    description:
      "Quantify the power of language. Pulp's proprietary algorithm scores rhetoric's relative influence in any conversation.",
    primaryAction: "Learn More",
  },
  {
    imageSrc:
      "/landing-images/Create Realistic Personas Individual, Group, and Entity.svg",
    title: "Create Realistic Personas: Individual, Group, and Entity",
    description:
      "Go beyond demographics. Pulp maps psychographics, cognitive states, and decision-making patterns.",
    primaryAction: "Learn More",
  },
  {
    imageSrc: "/landing-images/Topic Clustering and Knowledge Mapping.svg",
    title: "Topic Clustering and Knowledge Mapping",
    description:
      "Conversations reveal themes, biases, and knowledge structures. Pulp traces connections others miss.",
    primaryAction: "Learn More",
  },
  {
    imageSrc:
      "/landing-images/Model Discussions as Digital, Physical, or Hybrid.svg",
    title: "Model Discussion Scenes as Digital, Physical, or Hybrid",
    description:
      "Simulate conversations across any setting. Pulp accounts for time, place, format, and mode.",
    primaryAction: "Learn More",
  },
];

export default function LensCardGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );

  const handleCardClick = (index: number) => {
    const updatedFlipped = [...flippedCards];
    updatedFlipped[index] = !updatedFlipped[index];
    setFlippedCards(updatedFlipped);
  };

  return (
    <div className="w-full px-6 py-16">
      <div className="flex justify-center mb-12">
        <div className="max-w-md text-center">
          <SparklesTitle> AI Language Capabilities </SparklesTitle>
        </div>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {cards.map((card, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(index)}
            className={`relative cursor-pointer transition-transform duration-500 ease-in-out perspective-[1200px] ${
              hoveredCard === null
                ? ""
                : hoveredCard === index
                ? "scale-105"
                : "scale-90 opacity-50"
            }`}
          >
            <div
              className={`relative w-full h-[420px] transition-transform duration-700 preserve-3d ${
                flippedCards[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Hidden Card */}
              <div className="absolute w-full h-full backface-hidden flex items-center justify-center shadow-md border border-white/10 backdrop-blur-md bg-white/5 p-4 rounded-2xl">
                <div className="relative w-32 h-32">
                  <Image
                    src="/horizontal-logo.svg"
                    alt="Card Back"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Shown Card */}

              <MagicCard className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col shadow-md border border-white/10 backdrop-blur-md bg-white/5 p-4 rounded-2xl">
                <div className="flex justify-center">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    width={240}
                    height={160}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 mt-4">
                  <div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-300 mt-2 leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </div>

                  <Button size="sm" className="w-full mt-4">
                    {card.primaryAction}
                  </Button>
                </div>
              </MagicCard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
