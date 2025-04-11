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

export function CareerAccelerationVisual({ colorConfig, isInView }: VisualProps) {
  
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Background grid */}
        <defs>
          <linearGradient id="careerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colorConfig.accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#careerGradient)"
          opacity={isInView ? 1 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Career trajectory path */}
        <motion.path
          d="M 50,250 Q 100,200 150,220 T 250,180 T 350,100"
          fill="none"
          stroke={colorConfig.fill}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* Start point */}
        <motion.circle
          cx="50"
          cy="250"
          r="10"
          fill="#374151"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.2,
            type: "spring"
          }}
        />
        
        <motion.text
          x="50"
          y="270"
          fill="white"
          fontSize="10"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          START
        </motion.text>

        {/* Key career milestones */}
        {[
          { x: 150, y: 220, label: "Real-world Experience" },
          { x: 250, y: 180, label: "Portfolio Building" },
          { x: 350, y: 100, label: "Career Opportunities" },
        ].map((milestone, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="10"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              stroke={colorConfig.fill}
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + index * 0.2,
                type: "spring",
                stiffness: 150
              }}
            />
            
            <motion.text
              x={milestone.x}
              y={milestone.y - 20}
              fill="white"
              fontSize="10"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.2 }}
            >
              {milestone.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Growth indicators */}
        {[
          { x: 100, y: 235, width: 20, height: 40, label: "Skills" },
          { x: 200, y: 200, width: 20, height: 60, label: "Network" },
          { x: 300, y: 140, width: 20, height: 80, label: "Value" },
        ].map((bar, index) => (
          <motion.g key={index}>
            <motion.rect
              x={bar.x - bar.width/2}
              y={bar.y}
              width={bar.width}
              height={0}
              rx="2"
              fill={colorConfig.accent}
              fillOpacity="0.7"
              initial={{ height: 0 }}
              animate={isInView ? { height: bar.height } : { height: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.2 + index * 0.2,
              }}
              style={{ transformOrigin: `${bar.x} ${bar.y + bar.height}` }}
            />
            
            <motion.text
              x={bar.x}
              y={bar.y - 10}
              fill="white"
              fontSize="8"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.3 + index * 0.2 }}
            >
              {bar.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Arrow indicators for acceleration */}
        {[
          { x: 120, y: 220, rotate: -30 },
          { x: 200, y: 200, rotate: -15 },
          { x: 280, y: 150, rotate: -30 },
        ].map((arrow, index) => (
          <motion.g 
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: 1.5 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            style={{ transformOrigin: `${arrow.x}px ${arrow.y}px` }}
          >
            <path
              d={`M ${arrow.x-10} ${arrow.y+5} L ${arrow.x+10} ${arrow.y} L ${arrow.x-10} ${arrow.y-5} Z`}
              fill={colorConfig.fill}
              transform={`rotate(${arrow.rotate} ${arrow.x} ${arrow.y})`}
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
          Career Acceleration
        </motion.text>
      </svg>
    </div>
  );
} 