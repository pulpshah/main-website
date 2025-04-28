"use client"

import { BellIcon, Share2Icon, RocketIcon, AwardIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import AnimatedBeamMultipleOutputDemo from "@/components/landing/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/components/landing/animated-list-demo";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useEffect, useRef, useState } from "react";


const features = [
  {
    Icon: BellIcon,
    name: "Blog",
    description: "Stay up-to-date with our latest release notes.",
    href: "#",
    cta: "Learn more",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: RocketIcon,
    name: "Get Started Now",
    description:
      "Sign up today and experience the future of AI-driven communication.",
    href: "#",
    cta: "Get Started",
    background: <div className="absolute inset-0 bg-background" />,
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 10+ integrations and counting.",
    href: "#",
    cta: "Explore",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: AwardIcon,
    name: "Market Position Matrix",
    description:
      "Recognized as a leader in Generative AI for execution and market strength.",
    href: "#",
    cta: "View Report",
    background: <div className="absolute inset-0 bg-background" />,
  },
];

export default function MarketSection() {
  return (
    <section className="grid grid-cols-2 lg:flex-row w-full py-20 px-8 gap-12">
      {/* Left side: Grid */}
      <div className="flex-1">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>

      {/* Right side: Text */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Unmatched Market Performance
        </h2>
        <p className="text-black mb-6 leading-relaxed max-w-lg">
          {`See why we're recognized as leaders in execution and market impact. 
          Explore our latest innovations and integrations powering businesses globally.`}
        </p>
        <InteractiveHoverButton className="w-fit">
          Request Demo
        </InteractiveHoverButton>
      </div>

      {/* Left side: Text */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6 text-black">
          The Benefits of Language Accelerated Automation
        </h2>
        <p className="text-black mb-6 leading-relaxed max-w-lg">
          {`Pulp’s Momentum by the Numbers: Real Stats, Real Progress, Real Impact. Our natural language AI enhances comprehension and streamlines workflows for both technical and non-technical teams.`}
        </p>
        <InteractiveHoverButton className="w-fit">
          Request Demo
        </InteractiveHoverButton>
      </div>

      <div className="flex-1">
        <ImpactGrid />
      </div>
    </section>
  );
}
const stats = [
    { change: "+200", label: "Faster Insights", description: "Reach audiences sooner." },
    { change: "-70", label: "Shorter Time-to-Value", description: "Value with less wait." },
    { change: "+15", label: "Higher Revenue/User", description: "Boosted user value." },
    { change: "-10", label: "Lower Churn", description: "Keep users longer." },
    { change: "+10", label: "Higher NPS", description: "Stronger loyalty scores." },
    { change: "-50", label: "Cut Reporting Costs", description: "Smarter, cheaper ops." },
  ];
  
  function AnimatedNumber({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    const [startAnimation, setStartAnimation] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
            observer.disconnect(); 
          }
        },
        { threshold: 0.5 } // 50% visible
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => observer.disconnect();
    }, []);
  
    useEffect(() => {
      if (!startAnimation) return;
  
      const duration = 1200;
      const start = performance.now();
  
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
  
      requestAnimationFrame(animate);
    }, [startAnimation, target]);
  
    return <span ref={ref}>{count}%</span>;
  }
  
  function ImpactStat({
    change,
    label,
    description,
  }: {
    change: string;
    label: string;
    description: string;
  }) {
    const isNegative = change.startsWith("-");
    const numeric = parseInt(change.replace("+", "").replace("-", ""));
  
    return (
      <div className="flex flex-col items-start p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
        <div className="text-3xl font-semibold text-gray-900 mb-1">
          {isNegative ? "-" : "+"}
          <AnimatedNumber target={numeric} />
        </div>
        <div className="text-lg font-medium text-gray-800">{label}</div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    );
  }
  
  export function ImpactGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
        {stats.map((stat, idx) => (
          <ImpactStat
            key={idx}
            change={stat.change}
            label={stat.label}
            description={stat.description}
          />
        ))}
      </div>
    );
  }