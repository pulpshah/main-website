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

export function ProjectBasedVisual({ colorConfig, isInView }: VisualProps) {
  const animationDelay = (index: number) => 0.1 + index * 0.1;
  
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Background pattern */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke={colorConfig.fill}
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#grid)"
          opacity={isInView ? 0.3 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Central project board */}
        <motion.rect
          x="120"
          y="60"
          width="160"
          height="180"
          rx="8"
          fill="#1F2937"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Project board title */}
        <motion.rect
          x="130"
          y="70"
          width="140"
          height="20"
          rx="4"
          fill={colorConfig.fill}
          fillOpacity="0.2"
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: 140 } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.text
          x="140"
          y="85"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          PROJECT BOARD
        </motion.text>

        {/* Project cards */}
        {[
          { y: 100, title: "NLP Analysis", type: "AI", match: "95%" },
          { y: 140, title: "Interface Design", type: "UX", match: "87%" },
          { y: 180, title: "Data Modeling", type: "DEV", match: "92%" },
        ].map((card, index) => (
          <g key={index}>
            <motion.text
              x="140"
              y={card.y + 15}
              fill="white"
              fontSize="10"
              fontWeight="medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: animationDelay(index) + 0.1 }}
            >
              {card.title}
            </motion.text>
            <motion.rect
              x="140"
              y={card.y + 18}
              width="50"
              height="8"
              rx="4"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: 50 } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.5, delay: animationDelay(index) + 0.2 }}
            />
            <motion.rect
              x="210"
              y={card.y + 7}
              width="50"
              height="16"
              rx="8"
              fill={colorConfig.fill}
              fillOpacity="0.8"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: animationDelay(index) + 0.3 }}
            />
            <motion.text
              x="235"
              y={card.y + 18}
              fill="white"
              fontSize="9"
              fontWeight="bold"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: animationDelay(index) + 0.4 }}
            >
              {card.match}
            </motion.text>
          </g>
        ))}

        {/* Student figures */}
        {[
          { x: 70, y: 120, skill: "Design" },
          { x: 70, y: 180, skill: "Code" },
          { x: 330, y: 120, skill: "Research" },
          { x: 330, y: 180, skill: "Data" },
        ].map((student, index) => (
          <g key={index}>
            <motion.circle
              cx={student.x}
              cy={student.y}
              r="15"
              fill="#374151"
              stroke={colorConfig.fill}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            />
            <motion.text
              x={student.x}
              y={student.y + 30}
              fill="white"
              fontSize="8"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              {student.skill}
            </motion.text>
          </g>
        ))}

        {/* Connection lines */}
        {[
          { x1: 85, y1: 120, x2: 120, y2: 140 },
          { x1: 85, y1: 180, x2: 120, y2: 180 },
          { x1: 315, y1: 120, x2: 280, y2: 140 },
          { x1: 315, y1: 180, x2: 280, y2: 180 },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colorConfig.fill}
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeDasharray="4 2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
          />
        ))}

        {/* Title */}
        <motion.text
          x="200"
          y="0"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Project-Based Learning
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
          Matched to student strengths & interests
        </motion.text>
      </svg>
    </div>
  );
} 