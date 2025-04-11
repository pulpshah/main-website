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

export function MentorshipVisual({ colorConfig, isInView }: VisualProps) {
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
            id="dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="1"
              fill={colorConfig.fill}
              fillOpacity="0.3"
            />
          </pattern>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#dots)"
          opacity={isInView ? 0.2 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Central mentor figure */}
        <motion.circle
          cx="200"
          cy="150"
          r="30"
          fill={colorConfig.fill}
          fillOpacity="0.2"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="200"
          y="155"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          MENTOR
        </motion.text>

        {/* Apprentice figures */}
        {[
          { angle: 0, skill: "Strategic Thinking" },
          { angle: 72, skill: "Technical Fluency" },
          { angle: 144, skill: "Leadership" },
          { angle: 216, skill: "Problem Solving" },
          { angle: 288, skill: "Communication" },
        ].map((apprentice, index) => {
          const radius = 100;
          const x = 200 + radius * Math.cos(apprentice.angle * Math.PI / 180);
          const y = 150 + radius * Math.sin(apprentice.angle * Math.PI / 180);
          const textX = 200 + (radius + 25) * Math.cos(apprentice.angle * Math.PI / 180);
          const textY = apprentice.skill === "Strategic Thinking" 
            ? 150 + (radius + 25) * Math.sin(apprentice.angle * Math.PI / 180) + 10
            : 150 + (radius + 25) * Math.sin(apprentice.angle * Math.PI / 180);
          
          return (
            <g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r="20"
                fill="#374151"
                stroke={colorConfig.fill}
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: animationDelay(index),
                  type: "spring",
                  stiffness: 200
                }}
              />
              <motion.text
                x={x}
                y={y}
                fill="white"
                fontSize="10"
                textAnchor="middle"
                alignmentBaseline="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: animationDelay(index) + 0.1 }}
              >
                APPRENTICE
              </motion.text>
              <motion.text
                x={textX}
                y={textY}
                fill="white"
                fontSize="8"
                fontWeight="medium"
                textAnchor="middle"
                alignmentBaseline="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: animationDelay(index) + 0.2 }}
              >
                {apprentice.skill}
              </motion.text>
            </g>
          );
        })}

        {/* Connection lines */}
        {[0, 72, 144, 216, 288].map((angle, index) => {
          const radius = 100;
          const x = 200 + radius * Math.cos(angle * Math.PI / 180);
          const y = 150 + radius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.line
              key={index}
              x1="200"
              y1="150"
              x2={x}
              y2={y}
              stroke={colorConfig.fill}
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeDasharray="5 3"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
            />
          );
        })}

        {/* Growth indicators */}
        {[0, 72, 144, 216, 288].map((angle, index) => {
          const innerRadius = 55;
          const outerRadius = 85;
          const x1 = 200 + innerRadius * Math.cos(angle * Math.PI / 180);
          const y1 = 150 + innerRadius * Math.sin(angle * Math.PI / 180);
          const x2 = 200 + outerRadius * Math.cos(angle * Math.PI / 180);
          const y2 = 150 + outerRadius * Math.sin(angle * Math.PI / 180);
          
          return (
            <motion.g key={index}>
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colorConfig.accent}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.0 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              />
              <motion.circle
                cx={x2}
                cy={y2}
                r="3"
                fill={colorConfig.accent}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.0 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              />
            </motion.g>
          );
        })}

        {/* Title */}
        <motion.text
          x="200"
          y="-20"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mentorship-Driven Growth
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="30"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          initial={{ opacity: 0, y: 280 }}
          animate={isInView ? { opacity: 1, y: 260 } : { opacity: 0, y: 280 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Structured feedback and skill development
        </motion.text>
      </svg>
    </div>
  );
} 