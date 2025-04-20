"use client";

import { useInView } from "framer-motion";
import { BrainCircuit, Heart, History, Lightbulb, MessageSquare, Sparkles, Target, Users } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { StoryVisual } from "./visualizations/story-visual";
import { MissionVisual } from "./visualizations/mission-visual";
import { WhatWeDoVisual } from "./visualizations/what-we-do-visual";
import { DifferentVisual } from "./visualizations/different-visual";
import { WhoWeServeVisual } from "./visualizations/who-we-serve-visual";
import { ValuesVisual } from "./visualizations/values-visual";

interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "green" | "amber" | "purple" | "blue" | "pink";
  icon: string;
  index: number;
}

const colorMap = {
  purple: {
    primary: "bg-purple-600",
    secondary: "bg-purple-500",
    tertiary: "bg-purple-400",
    text: "text-purple-500",
    border: "border-purple-500",
    shadow: "shadow-purple-500/20",
    light: "bg-purple-500/10",
    accent: "bg-purple-400/20",
    gradient: "from-purple-600 to-purple-400",
  },
  green: {
    primary: "bg-emerald-600",
    secondary: "bg-emerald-500",
    tertiary: "bg-emerald-400",
    text: "text-emerald-500",
    border: "border-emerald-500",
    shadow: "shadow-emerald-500/20",
    light: "bg-emerald-500/10",
    accent: "bg-emerald-400/20",
    gradient: "from-emerald-600 to-emerald-400",
  },
  pink: {
    primary: "bg-pink-600",
    secondary: "bg-pink-500",
    tertiary: "bg-pink-400",
    text: "text-pink-500",
    border: "border-pink-500",
    shadow: "shadow-pink-500/20",
    light: "bg-pink-500/10",
    accent: "bg-pink-400/20",
    gradient: "from-pink-600 to-pink-400",
  },
  amber: {
    primary: "bg-amber-600",
    secondary: "bg-amber-500",
    tertiary: "bg-amber-400",
    text: "text-amber-500",
    border: "border-amber-500",
    shadow: "shadow-amber-500/20",
    light: "bg-amber-500/10",
    accent: "bg-amber-400/20",
    gradient: "from-amber-600 to-amber-400",
  },
  blue: {
    primary: "bg-blue-600",
    secondary: "bg-blue-500",
    tertiary: "bg-blue-400",
    text: "text-blue-500",
    border: "border-blue-500",
    shadow: "shadow-blue-500/20",
    light: "bg-blue-500/10",
    accent: "bg-blue-400/20",
    gradient: "from-blue-600 to-blue-400",
  },
};

const iconComponents = {
  History,
  Target,
  Lightbulb,
  Sparkles,
  Users,
  Heart,
  MessageSquare,
  BrainCircuit,
};

function Section({ title, description, imageSide, color, icon, index }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col-reverse gap-y-8 lg:gap-y-0 lg:gap-x-12 relative py-16 md:py-24",
        imageSide === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Content */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center">
        <div
          className={cn(
            "flex items-center gap-2 mb-3 opacity-0 transition-all duration-700 delay-100",
            isInView ? "opacity-100 translate-y-0" : "translate-y-8"
          )}
        >
          <div
            className={cn(
              "p-1.5 rounded-md",
              colorConfig.light
            )}
          >
            <IconComponent className={cn("w-5 h-5", colorConfig.text)} />
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              colorConfig.text
            )}
          >
            Section {index + 1}
          </span>
        </div>
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4 opacity-0 transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "translate-y-8"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "text-gray-300 opacity-0 transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "translate-y-8"
          )}
        >
          {description}
        </p>
      </div>

      {/* Visualization */}
      <div className="w-full lg:w-1/2 min-h-[300px] flex items-center justify-center">
        {icon === "History" && <StoryVisual colorConfig={colorConfig} isInView={isInView} />}
        {icon === "Target" && <MissionVisual colorConfig={colorConfig} isInView={isInView} />}
        {icon === "Lightbulb" && <WhatWeDoVisual colorConfig={colorConfig} isInView={isInView} />}
        {icon === "Sparkles" && <DifferentVisual colorConfig={colorConfig} isInView={isInView} />}
        {icon === "Users" && <WhoWeServeVisual colorConfig={colorConfig} isInView={isInView} />}
        {icon === "Heart" && <ValuesVisual colorConfig={colorConfig} isInView={isInView} />}
      </div>
    </section>
  );
}

export function AboutSections({ sections }: { sections: Omit<SectionProps, "index">[] }) {
  return (
    <div className="container mx-auto px-4">
      {sections.map((section, index) => (
        <Section key={section.title} {...section} index={index} />
      ))}
    </div>
  );
} 