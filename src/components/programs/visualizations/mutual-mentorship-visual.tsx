import { motion } from "framer-motion";

interface VisualProps {
  colorConfig: {
    text: string;
    border: string;
    bg: string;
    fill: string;
    accent: string;
    glow: string;
    gradient: string;
  };
  isInView: boolean;
}

export function MutualMentorshipVisual({ colorConfig, isInView }: VisualProps) {
  const animationDelay = (index: number) => 0.1 + index * 0.1;
  
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="mentorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colorConfig.fill} stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#mentorGradient)"
          opacity={isInView ? 1 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Senior expert (left) */}
        <motion.circle
          cx="120"
          cy="150"
          r="40"
          fill="#374151"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="120"
          y="142"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          SENIOR
        </motion.text>
        
        <motion.text
          x="120"
          y="158"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          EXPERTS
        </motion.text>

        {/* Apprentice (right) */}
        <motion.circle
          cx="280"
          cy="150"
          r="40"
          fill="#374151"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="280"
          y="150"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          APPRENTICES
        </motion.text>

        {/* Senior expert traits */}
        {[
          { text: "Experience", y: 90 },
          { text: "Domain Knowledge", y: 110 },
          { text: "Strategic Vision", y: 130 },
          { text: "Organizational Context", y: 150 },
          { text: "Network", y: 170 },
          { text: "Industry Insights", y: 190 },
          { text: "Leadership", y: 210 },
        ].map((trait, index) => (
          <motion.g key={index}>
            <motion.rect
              x="40"
              y={trait.y - 6}
              width="60"
              height="12"
              rx="6"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: 60 } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.4, delay: animationDelay(index) }}
            />
            <motion.text
              x="40"
              y={trait.y + 3}
              fill="white"
              fontSize="8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: animationDelay(index) + 0.1 }}
            >
              {trait.text}
            </motion.text>
          </motion.g>
        ))}

        {/* Apprentice traits */}
        {[
          { text: "Fresh Perspectives", y: 90 },
          { text: "New Tools", y: 110 },
          { text: "Digital Fluency", y: 130 },
          { text: "Lived Context", y: 150 },
          { text: "Current Trends", y: 170 },
          { text: "Adaptability", y: 190 },
          { text: "Creative Approaches", y: 210 },
        ].map((trait, index) => (
          <motion.g key={index}>
            <motion.rect
              x="300"
              y={trait.y - 6}
              width="60"
              height="12"
              rx="6"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: 60 } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.4, delay: animationDelay(index) }}
            />
            <motion.text
              x="300"
              y={trait.y + 3}
              fill="white"
              fontSize="8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: animationDelay(index) + 0.1 }}
            >
              {trait.text}
            </motion.text>
          </motion.g>
        ))}

        {/* Exchange arrows */}
        <motion.path
          d="M 160 130 C 180 110, 220 110, 240 130"
          fill="none"
          stroke={colorConfig.fill}
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.8, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        
        <motion.path
          d="M 240 170 C 220 190, 180 190, 160 170"
          fill="none"
          stroke={colorConfig.fill}
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd="url(#arrowhead)"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.8, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={colorConfig.fill} />
          </marker>
        </defs>

        {/* Exchange labels */}
        <motion.text
          x="200"
          y="120"
          fill={colorConfig.fill}
          fontSize="10"
          fontWeight="medium"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          GUIDANCE
        </motion.text>
        
        <motion.text
          x="200"
          y="180"
          fill={colorConfig.fill}
          fontSize="10"
          fontWeight="medium"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          INNOVATION
        </motion.text>

        {/* Title */}
        <motion.text
          x="200"
          y="40"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mutual Mentorship
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="20"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          initial={{ opacity: 0, y: 280 }}
          animate={isInView ? { opacity: 1, y: 260 } : { opacity: 0, y: 280 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Exchanging knowledge across generations
        </motion.text>
      </svg>
    </div>
  );
} 