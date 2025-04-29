"use client";

import { BellIcon, Share2Icon, RocketIcon, AwardIcon } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import AnimatedBeamMultipleOutputDemo from "@/components/landing/animated-beam-multiple-outputs";
import { TextAnimate } from "@/components/magicui/text-animate";
import AnimatedListDemo from "@/components/landing/animated-list-demo";
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
    <div>
      <div className="text-center mb-8 pt-12">
        <h2 className="text-4xl font-bold text-black">Why Choose Us?</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover how our innovations are reshaping engagement, performance,
          and growth.
        </p>
      </div>

      <section className="flex flex-col w-full py-20 px-8 gap-12">
        {/* Item 1 */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12">
          <div className="flex flex-col order-2 md:order-1">
            <BentoGrid>
              {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </BentoGrid>
          </div>

          <div className="flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6 text-black">
              <TextAnimate>Unmatched Market Performance</TextAnimate>
            </h2>

            <p className="text-black mb-6 leading-relaxed max-w-lg">
              {
                "See why we're recognized as leaders in execution and market impact. Explore our latest innovations and integrations powering businesses globally."
              }
            </p>
            <InteractiveHoverButton className="w-fit">
              Request Demo
            </InteractiveHoverButton>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 mt-16">
          <div className="flex flex-col justify-center order-1 md:order-1 ">
            <h2 className="text-4xl font-bold mb-6 text-black">
            <TextAnimate>The Benefits of Language Accelerated Automation</TextAnimate>
            </h2>
             <p className="text-black mb-6 leading-relaxed max-w-lg">
              Pulp’s Momentum by the Numbers: Real Stats, Real Progress, Real
              Impact. Our natural language AI enhances comprehension and
              streamlines workflows for both technical and non-technical teams
            </p>
            <InteractiveHoverButton className="w-fit ">
              Request Demo
            </InteractiveHoverButton>
          </div>

          <div className="flex flex-col order-2 md:order-1">
            <ImpactGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
const stats = [
  {
    change: "+200",
    label: "Faster Insights",
    description: "Reach audiences sooner.",
  },
  {
    change: "-70",
    label: "Shorter Time-to-Value",
    description: "Value with less wait.",
  },
  {
    change: "+15",
    label: "Higher Revenue/User",
    description: "Boosted user value.",
  },
  { change: "-10", label: "Lower Churn", description: "Keep users longer." },
  {
    change: "+10",
    label: "Higher NPS",
    description: "Stronger loyalty scores.",
  },
  {
    change: "-50",
    label: "Cut Reporting Costs",
    description: "Smarter, cheaper ops.",
  },
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
    <div className="flex flex-col items-start p-6 rounded-2xl border bg-gradient-to-br from-primary/10 to-white shadow-xl transition-all">
      <div className="text-4xl font-bold text-primary mb-2">
        {isNegative ? "-" : "+"}
        <AnimatedNumber target={numeric} />
      </div>
      <div className="text-lg font-semibold text-gray-900 dark:text-gray-700">
        {label}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-700 mt-1">
        {description}
      </p>
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
