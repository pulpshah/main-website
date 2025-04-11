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

export function ThinkBuildVisual({ colorConfig, isInView }: VisualProps) {
  const animationDelay = (index: number) => 0.1 + index * 0.1;
  
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Background */}
        <defs>
          <linearGradient id="thinkBuildGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colorConfig.accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#thinkBuildGradient)"
          opacity={isInView ? 1 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Brain (Think) side */}
        <motion.circle
          cx="120"
          cy="150"
          r="60"
          fill="transparent"
          stroke={colorConfig.fill}
          strokeWidth="2"
          strokeDasharray="4 2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.text
          x="120"
          y="100"
          fill={colorConfig.fill}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          THINK
        </motion.text>

        {/* Brain node connections */}
        {[
          { x1: 100, y1: 130, x2: 130, y2: 160 },
          { x1: 140, y1: 120, x2: 110, y2: 150 },
          { x1: 95, y1: 170, x2: 135, y2: 180 },
          { x1: 150, y1: 140, x2: 140, y2: 190 },
          { x1: 120, y1: 120, x2: 120, y2: 170 },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colorConfig.fill}
            strokeWidth="2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 0.6, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.4, delay: animationDelay(index) }}
          />
        ))}
        
        {/* Brain nodes */}
        {[
          { x: 100, y: 130, label: "Structure" },
          { x: 140, y: 120, label: "Ambiguity" },
          { x: 95, y: 170, label: "Ideas" },
          { x: 150, y: 140, label: "Analysis" },
          { x: 120, y: 120, label: "Strategy" },
          { x: 110, y: 150, label: "Context" },
          { x: 130, y: 160, label: "Research" },
          { x: 135, y: 180, label: "Planning" },
          { x: 140, y: 190, label: "Design" },
          { x: 120, y: 170, label: "Theory" },
        ].map((node, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill={colorConfig.fill}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.5 + index * 0.05,
                type: "spring",
                stiffness: 200
              }}
            />
            <motion.text
              x={node.x}
              y={node.y - 8}
              fill="white"
              fontSize="6"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            >
              {node.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Build side (right) */}
        <motion.rect
          x="230"
          y="90"
          width="120"
          height="120"
          rx="5"
          fill="transparent"
          stroke={colorConfig.accent}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        
        <motion.text
          x="290"
          y="100"
          fill={colorConfig.accent}
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          BUILD
        </motion.text>

        {/* Build elements */}
        {[
          { y: 120, width: 100, height: 10, label: "Execution" },
          { y: 140, width: 80, height: 10, label: "Development" },
          { y: 160, width: 90, height: 10, label: "Implementation" },
          { y: 180, width: 70, height: 10, label: "Testing" },
        ].map((bar, index) => (
          <motion.g key={index}>
            <motion.rect
              x="240"
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx="2"
              fill={colorConfig.accent}
              fillOpacity="0.6"
              initial={{ opacity: 0, width: 0 }}
              animate={isInView ? { opacity: 1, width: bar.width } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            />
            <motion.text
              x="240"
              y={bar.y - 5}
              fill="white"
              fontSize="8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              {bar.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Connection between Think and Build */}
        <motion.path
          d="M 180 150 C 200 120, 210 180, 230 150"
          fill="none"
          stroke={colorConfig.fill}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.8, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        />
        <motion.path
          d="M 180 150 C 200 180, 210 120, 230 150"
          fill="none"
          stroke={colorConfig.accent}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.8, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        />

        {/* Connection nodes */}
        <motion.circle
          cx="180"
          cy="150"
          r="6"
          fill={colorConfig.fill}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 1.2,
            type: "spring"
          }}
        />
        <motion.circle
          cx="230"
          cy="150"
          r="6"
          fill={colorConfig.accent}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: 1.2,
            type: "spring"
          }}
        />

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
          Think + Build
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="260"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          initial={{ opacity: 0, y: 280 }}
          animate={isInView ? { opacity: 1, y: 260 } : { opacity: 0, y: 280 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Structure ambiguity, translate ideas into execution
        </motion.text>
      </svg>
    </div>
  );
} 