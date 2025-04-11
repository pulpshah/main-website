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

export function CollaborativeVisual({ colorConfig, isInView }: VisualProps) {
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
            id="dots-collab"
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
          fill="url(#dots-collab)"
          opacity={isInView ? 0.2 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Central Hub */}
        <motion.circle
          cx="200"
          cy="150"
          r="50"
          fill={colorConfig.fill}
          fillOpacity="0.1"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring", 
            stiffness: 100 
          }}
        />
        
        <motion.text
          x="200"
          y="145"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          COLLABORATIVE
        </motion.text>
        
        <motion.text
          x="200"
          y="160"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          CULTURE
        </motion.text>

        {/* Team members */}
        {[
          { angle: 45, label: "Designer" },
          { angle: 90, label: "Developer" },
          { angle: 135, label: "Researcher" },
          { angle: 180, label: "Strategist" },
          { angle: 225, label: "Mentor" },
          { angle: 270, label: "Apprentice" },
          { angle: 315, label: "Manager" },
          { angle: 360, label: "Analyst" },
        ].map((member, index) => {
          const radius = 120;
          const angleRad = (member.angle * Math.PI) / 180;
          const x = 200 + radius * Math.cos(angleRad);
          const y = 150 + radius * Math.sin(angleRad);
          
          return (
            <motion.g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r="15"
                fill="#374151"
                stroke={colorConfig.fill}
                strokeWidth="1"
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
                fontSize="8"
                textAnchor="middle"
                alignmentBaseline="middle"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: animationDelay(index) + 0.1 }}
              >
                {member.label}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Connection lines */}
        {[45, 90, 135, 180, 225, 270, 315, 360].map((angle, index) => {
          const radius = 120;
          const innerRadius = 50;
          const angleRad = (angle * Math.PI) / 180;
          const x1 = 200 + innerRadius * Math.cos(angleRad);
          const y1 = 150 + innerRadius * Math.sin(angleRad);
          const x2 = 200 + radius * Math.cos(angleRad);
          const y2 = 150 + radius * Math.sin(angleRad);
          
          return (
            <motion.line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colorConfig.fill}
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="3 2"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
            />
          );
        })}

        {/* Interconnecting lines between team members */}
        {[
          { from: 0, to: 2 },
          { from: 1, to: 5 },
          { from: 2, to: 4 },
          { from: 3, to: 7 },
          { from: 4, to: 6 },
          { from: 5, to: 0 },
          { from: 6, to: 1 },
          { from: 7, to: 3 },
        ].map((connection, index) => {
          const radius = 120;
          const fromAngleRad = ([45, 90, 135, 180, 225, 270, 315, 360][connection.from] * Math.PI) / 180;
          const toAngleRad = ([45, 90, 135, 180, 225, 270, 315, 360][connection.to] * Math.PI) / 180;
          
          const x1 = 200 + radius * Math.cos(fromAngleRad);
          const y1 = 150 + radius * Math.sin(fromAngleRad);
          const x2 = 200 + radius * Math.cos(toAngleRad);
          const y2 = 150 + radius * Math.sin(toAngleRad);
          
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const controlPoint = 20; // Curve control point distance
          
          // Calculate control point that curves away from center
          const centerToMidX = midX - 200;
          const centerToMidY = midY - 150;
          const distance = Math.sqrt(centerToMidX * centerToMidX + centerToMidY * centerToMidY);
          const normX = centerToMidX / distance;
          const normY = centerToMidY / distance;
          
          const ctrlX = midX + normX * controlPoint;
          const ctrlY = midY + normY * controlPoint;
          
          return (
            <motion.path
              key={index}
              d={`M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`}
              fill="none"
              stroke={colorConfig.accent}
              strokeWidth="1"
              strokeOpacity="0.8"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.05 }}
            />
          );
        })}

        {/* Core value labels */}
        {[
          { text: "Clear Thinking", x: 160, y: 100 },
          { text: "Shared Language", x: 240, y: 100 },
          { text: "Mutual Respect", x: 200, y: 200 },
        ].map((value, index) => (
          <motion.g key={index}>
            <motion.rect
              x={value.x - 50}
              y={value.y - 10}
              width="100"
              height="20"
              rx="10"
              fill={colorConfig.fill}
              fillOpacity="0.2"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.5 + index * 0.1,
                type: "spring"
              }}
            />
            
            <motion.text
              x={value.x}
              y={value.y + 5}
              fill="white"
              fontSize="10"
              fontWeight="medium"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
            >
              {value.text}
            </motion.text>
          </motion.g>
        ))}

        {/* Title */}
        <motion.text
          x="200"
          y="-30"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Supportive & Collaborative
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="200"
          y="40"
          fill="white"
          fontSize="12"
          textAnchor="middle"
          initial={{ opacity: 0, y: 280 }}
          animate={isInView ? { opacity: 1, y: 260 } : { opacity: 0, y: 280 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Clear thinking over hierarchy
        </motion.text>
      </svg>
    </div>
  );
} 