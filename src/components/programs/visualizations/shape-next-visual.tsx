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

export function ShapeNextVisual({ colorConfig, isInView }: VisualProps) {
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
          <linearGradient id="futureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorConfig.fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={colorConfig.accent} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="400"
          height="300"
          fill="url(#futureGradient)"
          opacity={isInView ? 1 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Central Future Globe */}
        <motion.circle
          cx="200"
          cy="150"
          r="60"
          fill="transparent"
          stroke={colorConfig.fill}
          strokeWidth="1"
          strokeDasharray="2 2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        <motion.circle
          cx="200"
          cy="150"
          r="50"
          fill="transparent"
          stroke={colorConfig.fill}
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        
        <motion.circle
          cx="200"
          cy="150"
          r="40"
          fill={colorConfig.fill}
          fillOpacity="0.1"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Orbiting paths */}
        <motion.ellipse
          cx="200"
          cy="150"
          rx="80"
          ry="30"
          fill="transparent"
          stroke={colorConfig.fill}
          strokeWidth="1"
          strokeDasharray="3 2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        
        <motion.ellipse
          cx="200"
          cy="150"
          rx="30"
          ry="80"
          fill="transparent"
          stroke={colorConfig.fill}
          strokeWidth="1"
          strokeDasharray="3 2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        {/* Orbiting elements */}
        {[
          { angle: 0, radius: 80, type: "Strategy" },
          { angle: 60, radius: 80, type: "Empathy" },
          { angle: 120, radius: 80, type: "Purpose" },
          { angle: 180, radius: 80, type: "Vision" },
          { angle: 240, radius: 80, type: "Inclusivity" },
          { angle: 300, radius: 80, type: "Innovation" },
        ].map((element, index) => {
          const angleRad = (element.angle * Math.PI) / 180;
          const x = 200 + element.radius * Math.cos(angleRad);
          const y = 150 + element.radius * Math.sin(angleRad) * 0.4; // Squash for perspective
          
          return (
            <motion.g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r="10"
                fill="#374151"
                stroke={colorConfig.fill}
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: animationDelay(index + 3),
                  type: "spring",
                  stiffness: 150
                }}
              />
              
              <motion.text
                x={x}
                y={y + 3}
                fill="white"
                fontSize="6"
                fontWeight="medium"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: animationDelay(index + 3) + 0.1 }}
              >
                {element.type}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Future builders */}
        {[
          { x: 170, y: 130, label: "Apprentice" },
          { x: 200, y: 140, label: "Student" },
          { x: 230, y: 130, label: "Mentor" },
          { x: 180, y: 160, label: "Leader" },
          { x: 220, y: 160, label: "Builder" },
        ].map((person, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={person.x}
              cy={person.y}
              r="8"
              fill={colorConfig.accent}
              fillOpacity="0.8"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: animationDelay(index),
                type: "spring",
                stiffness: 200
              }}
            />
            
            <motion.text
              x={person.x}
              y={person.y + 3}
              fill="white"
              fontSize="5"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: animationDelay(index) + 0.1 }}
            >
              {person.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Innovation lines */}
        {[
          { x1: 180, y1: 130, x2: 150, y2: 100 },
          { x1: 190, y1: 120, x2: 180, y2: 80 },
          { x1: 210, y1: 120, x2: 220, y2: 80 },
          { x1: 220, y1: 130, x2: 250, y2: 100 },
          { x1: 170, y1: 170, x2: 140, y2: 200 },
          { x1: 230, y1: 170, x2: 260, y2: 200 },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colorConfig.fill}
            strokeWidth="1"
            strokeDasharray="2 2"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 0.6, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
          />
        ))}
        
        {/* Innovation ideas */}
        {[
          { x: 150, y: 100, label: "AI Ethics" },
          { x: 180, y: 80, label: "Accessibility" },
          { x: 220, y: 80, label: "Sustainability" },
          { x: 250, y: 100, label: "Education" },
          { x: 140, y: 200, label: "Community" },
          { x: 260, y: 200, label: "Governance" },
        ].map((idea, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={idea.x}
              cy={idea.y}
              r="15"
              fill={colorConfig.fill}
              fillOpacity="0.1"
              stroke={colorConfig.fill}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            />
            
            <motion.text
              x={idea.x}
              y={idea.y + 3}
              fill="white"
              fontSize="6"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            >
              {idea.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Title */}
        <motion.text
          x="200"
          y="20"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Shape What&apos;s Next
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
          Define how tech serves society
        </motion.text>
      </svg>
    </div>
  );
} 