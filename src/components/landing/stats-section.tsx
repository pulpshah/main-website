"use client";

import { useEffect, useRef, useState } from "react";

// Scramble effect component
function ScrambleOnHover({
  value,
  duration = 600,
}: {
  value: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplay(value);
      return;
    }

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const speed = 30;
    const scrambleFrames = Math.floor(duration / speed);
    let frame = 0;

    const interval = setInterval(() => {
      if (frame >= scrambleFrames) {
        setDisplay(value);
        clearInterval(interval);
        return;
      }

      const scrambled = value
        .split("")
        .map((char) =>
          /\d/.test(char)
            ? chars[Math.floor(Math.random() * chars.length)]
            : char
        )
        .join("");

      setDisplay(scrambled);
      frame++;
    }, speed);

    return () => clearInterval(interval);
  }, [isHovering, value, duration]);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="font-mono tabular-nums cursor-default"
    >
      <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent">
        {display}
      </span>
    </div>
  );
}

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  isPositive?: boolean;
  duration?: number;
}

interface StatsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  stats: StatItem[];
}

export default function StatsSection({
  title = "Just Use Your Words",
  subtitle = "The Benefits of Language Accelerated Automation",
  description = "Pulp’s natural language AI enhances comprehension and streamlines workflows for both technical and non-technical teams.",
  stats = [
    {
      value: 200,
      prefix: "+",
      suffix: "%",
      title: "Faster Engagement Insights (ROAS)",
      description:
        "Capitalize on audience behavior sooner with fewer resources.",
      isPositive: true,
      duration: 2.5,
    },
    {
      value: 70,
      prefix: "-",
      suffix: "%",
      title: "Decrease in Time-to-Value (TTV)",
      description:
        "Let users experience value faster, without the learning curve.",
      isPositive: false,
      duration: 2,
    },
    {
      value: 15,
      prefix: "+",
      suffix: "%",
      title: "Avg. Revenue per User (ARPU)",
      description: "Higher engagement & smarter monetization strategies.",
      isPositive: true,
      duration: 1.5,
    },
    {
      value: 10,
      prefix: "-",
      suffix: "%",
      title: "Decrease in Lost Customers (Churn Rate)",
      description:
        "Reduce churn with predictive insights and proactive engagement.",
      isPositive: false,
      duration: 1.5,
    },
    {
      value: 10,
      prefix: "+",
      suffix: "%",
      title: "Net Promoter Score (NPS)",
      description: "Happier teams & customers, leading to stronger retention.",
      isPositive: true,
      duration: 1.5,
    },
    {
      value: 50,
      prefix: "-",
      suffix: "%",
      title: "Reduction in Data & Reporting Costs (Labor & SaaS)",
      description:
        "Automate analysis, cut overhead, and reduce software spend.",
      isPositive: false,
      duration: 2,
    },
  ],
}: Partial<StatsSectionProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/10 to-orange-500/10 rounded-full blur-3xl"
          style={{
            opacity: isVisible ? 0.3 : 0,
            transition: "opacity 1s ease",
          }}
        ></div>
      </div>

      {/* Section heading */}
      <div className="text-center relative z-10 mb-16 px-4">
        <div className="inline-block mb-4">
          <span className="px-2 md:px-4 py-1.5 md:py-2 rounded-full bg-amber-600/20 text-xs font-medium tracking-wider max-w-full break-words text-white shadow-[0_0_10px_2px_rgba(255,193,7,0.75)] ">
            BUSINESS IMPACT
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {title}
        </h2>

        <div
          className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 mx-auto mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            width: isVisible ? "96px" : "20px",
            transition: "opacity 0.6s ease, width 0.8s ease",
          }}
        ></div>

        <h3
          className="text-xl md:text-2xl font-semibold text-amber-200 mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          {subtitle}
        </h3>

        <p
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {description}
        </p>
      </div>

      {/* Stats grid */}
      <div className="w-full max-w-6xl mx-auto relative z-10 overflow-hidden px-4">
        {/* Format */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="h-full">
              <StatCard stat={stat} index={index} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  stat,
  index,
  isVisible,
}: {
  stat: StatItem;
  index: number;
  isVisible: boolean;
}) {
  const accentColor = stat.isPositive
    ? "from-amber-500 to-orange-400"
    : "from-amber-700 to-amber-500";

  const iconColor = stat.isPositive ? "text-amber-400" : "text-amber-600";
  const hoverTextColor = stat.isPositive
    ? "group-hover:text-amber-200"
    : "group-hover:text-amber-300";

  const icon = stat.isPositive ? (
    <svg
      className={`w-5 h-5 ${iconColor}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  ) : (
    <svg
      className={`w-5 h-5 ${iconColor}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>
  );

  return (
    <div
      className="bg-black/30 backdrop-blur-sm border border-amber-900/20 rounded-xl p-6 flex flex-col group relative overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${
          index * 0.15
        }s`,
      }}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentColor} rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div
        className={`w-12 h-1 bg-gradient-to-r ${accentColor} rounded-full mb-4`}
      ></div>

      <div className="absolute top-4 right-4">{icon}</div>

      {/* Stat value with scramble effect */}
      <div
        className={`font-bold text-4xl md:text-5xl mb-2 bg-gradient-to-r ${accentColor} bg-clip-text text-transparent flex items-center`}
      >
        {isVisible ? (
          <ScrambleOnHover
            value={`${stat.prefix || ""}${Math.round(stat.value)}${
              stat.suffix || ""
            }`}
          />
        ) : (
          <span>
            {stat.prefix || ""}0{stat.suffix || ""}
          </span>
        )}
      </div>

      <h3
        className={`text-xl font-bold text-white mb-2 ${hoverTextColor} transition-colors duration-300`}
      >
        {stat.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed flex-grow">
        {stat.description}
      </p>

      <div
        className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${accentColor} group-hover:w-full transition-all duration-500`}
      ></div>
    </div>
  );
}
