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

export function BridgePerspectivesVisual({ colorConfig, isInView }: VisualProps) {
  
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
            id="bridge-grid"
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
          fill="url(#bridge-grid)"
          opacity={isInView ? 0.2 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Left island - Traditional perspective */}
        <motion.path
          d="M 30,180 C 40,150 80,130 100,180 C 120,220 60,220 30,180 Z"
          fill="#374151"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="65"
          y="165"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          EXPERIENCE
        </motion.text>
        
        <motion.text
          x="65"
          y="180"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          WISDOM
        </motion.text>

        {/* Right island - Newer perspective */}
        <motion.path
          d="M 300,180 C 310,150 350,130 370,180 C 390,220 330,220 300,180 Z"
          fill="#374151"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="335"
          y="165"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          NEW TOOLS
        </motion.text>
        
        <motion.text
          x="335"
          y="180"
          fill="white"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          PERSPECTIVES
        </motion.text>

        {/* Bridge */}
        <motion.path
          d="M 100,180 C 130,140 150,120 200,120 C 250,120 270,140 300,180"
          fill="none"
          stroke={colorConfig.fill}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
        
        {/* Bridge suspensions */}
        {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
          const x = 115 + index * 30;
          return (
            <motion.line
              key={index}
              x1={x}
              y1="120"
              x2={x}
              y2="180"
              stroke={colorConfig.fill}
              strokeWidth="2"
              strokeDasharray="4 2"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 0.8, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              style={{ transformOrigin: `${x}px 120px` }}
            />
          );
        })}

        {/* Bridge concepts */}
        {[
          { x: 115, y: 100, label: "Generations" },
          { x: 145, y: 100, label: "Tools" },
          { x: 175, y: 100, label: "Methods" },
          { x: 205, y: 100, label: "Thinking" },
          { x: 235, y: 100, label: "Contexts" },
          { x: 265, y: 100, label: "Approaches" },
          { x: 295, y: 100, label: "Visions" },
        ].map((concept, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={concept.x}
              cy={concept.y}
              r="12"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              stroke={colorConfig.fill}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            />
            
            <motion.text
              x={concept.x}
              y={concept.y + 4}
              fill="white"
              fontSize="6"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
            >
              {concept.label}
            </motion.text>
          </motion.g>
        ))}

        {/* People crossing the bridge */}
        {[
          { x: 130, y: 175, dir: -1, delay: 0 },
          { x: 170, y: 165, dir: 1, delay: 0.2 },
          { x: 230, y: 155, dir: -1, delay: 0.4 },
          { x: 270, y: 165, dir: 1, delay: 0.3 },
        ].map((person, index) => (
          <motion.g 
            key={index}
            initial={{ opacity: 0, x: person.dir * 30 }}
            animate={isInView 
              ? { 
                  opacity: 1, 
                  x: [
                    person.x + person.dir * 30,
                    person.x,
                    person.x - person.dir * 30
                  ]
                } 
              : { opacity: 0, x: person.dir * 30 }
            }
            transition={{ 
              duration: 6, 
              delay: 1.5 + person.delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <circle
              cx="0"
              cy={person.y}
              r="5"
              fill={colorConfig.accent}
            />
          </motion.g>
        ))}

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
          Bridge Perspectives
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="20"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          initial={{ opacity: 0, y: 260 }}
          animate={isInView ? { opacity: 1, y: 240 } : { opacity: 0, y: 260 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Working across generations and ways of thinking
        </motion.text>
      </svg>
    </div>
  );
} 