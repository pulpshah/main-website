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

export function DiverseFieldsVisual({ colorConfig, isInView }: VisualProps) {
  const animationDelay = (index: number) => 0.1 + index * 0.1;
  
  // Different academic disciplines
  const fields = [
    { name: "Political Science", x: 100, y: 110, radius: 35 },
    { name: "Design", x: 300, y: 110, radius: 35 },
    { name: "Cognitive Science", x: 150, y: 200, radius: 35 },
    { name: "Engineering", x: 250, y: 200, radius: 35 },
    { name: "AI", x: 200, y: 120, radius: 40 },
  ];
  
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {/* Background grid */}
        <defs>
          <pattern
            id="diverse-grid"
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
          fill="url(#diverse-grid)"
          opacity={isInView ? 0.2 : 0}
          style={{ transition: "opacity 0.5s" }}
        />

        {/* Center point - Pulp */}
        <motion.circle
          cx="200"
          cy="150"
          r="25"
          fill={colorConfig.fill}
          fillOpacity="0.2"
          stroke={colorConfig.fill}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
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
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          PULP
        </motion.text>

        {/* Academic disciplines */}
        {fields.map((field, index) => (
          <g key={index}>
            <motion.circle
              cx={field.x}
              cy={field.y}
              r={field.radius}
              fill="transparent"
              stroke={colorConfig.fill}
              strokeWidth={field.name === "AI" ? 2 : 1}
              strokeOpacity={field.name === "AI" ? 0.8 : 0.5}
              strokeDasharray={field.name === "AI" ? "none" : "3 2"}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: animationDelay(index),
                type: "spring",
                stiffness: 150
              }}
            />
            
            <motion.text
              x={field.x}
              y={field.y}
              fill={field.name === "AI" ? colorConfig.fill : "white"}
              fontSize={field.name === "AI" ? "14" : "10"}
              fontWeight={field.name === "AI" ? "bold" : "medium"}
              textAnchor="middle"
              alignmentBaseline="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: animationDelay(index) + 0.1 }}
            >
              {field.name}
            </motion.text>
          </g>
        ))}

        {/* Connection lines */}
        {fields.map((field, index) => (
          <motion.line
            key={index}
            x1="200"
            y1="150"
            x2={field.x}
            y2={field.y}
            stroke={colorConfig.fill}
            strokeOpacity="0.6"
            strokeWidth={field.name === "AI" ? 2 : 1}
            strokeDasharray={field.name === "AI" ? "none" : "4 2"}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
          />
        ))}

        {/* Additional disciplines radiating out */}
        {[
          { name: "History", x: 90, y: 70 },
          { name: "Psychology", x: 320, y: 80 },
          { name: "Computer Science", x: 100, y: 240 },
          { name: "Linguistics", x: 300, y: 240 },
          { name: "Math", x: 270, y: 70 },
          { name: "Philosophy", x: 130, y: 70 },
        ].map((field, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={field.x}
              cy={field.y}
              r="5"
              fill={colorConfig.fill}
              fillOpacity="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 1.2 + index * 0.05,
                type: "spring"
              }}
            />
            
            <motion.text
              x={field.x}
              y={field.y - 10}
              fill="white"
              fontSize="8"
              textAnchor="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 1.2 + index * 0.05 }}
            >
              {field.name}
            </motion.text>
          </motion.g>
        ))}

        {/* Title */}
        <motion.text
          x="200"
          y="10"
          fill={colorConfig.fill}
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 40 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Students from All Fields
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
          Interdisciplinary collaboration
        </motion.text>
      </svg>
    </div>
  );
} 