"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  BarChartHorizontal, 
  Users, 
  BookOpen, 
  PieChart, 
  FileCheck, 
  LineChart, 
  CircleDollarSign, 
  Clock, 
  TrendingUp, 
  BadgeCheck,
  Star,
  User,
  Calendar,
  DollarSign,
  Briefcase,
  Brain,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Database,
  Search,
  FileText,
  Link2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Gauge,
  Activity,
  PanelRight
} from "lucide-react";

// Types for section props
export interface SectionProps {
  title: string;
  description: string;
  imageSide: "left" | "right";
  color: "pink" | "purple" | "gradient";
  icon: string;
  index: number;
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  chart: <BarChart3 className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  book: <BookOpen className="w-5 h-5" />,
  pie: <PieChart className="w-5 h-5" />,
  file: <FileCheck className="w-5 h-5" />,
  line: <LineChart className="w-5 h-5" />,
  dollar: <CircleDollarSign className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  check: <BadgeCheck className="w-5 h-5" />,
  horizontal: <BarChartHorizontal className="w-5 h-5" />
};

// Color mapping for sections
const colorMap = {
  pink: {
    badge: "bg-pink-500/10 text-pink-500",
    title: "text-white",
    description: "text-pink-100/80",
    button: "bg-pink-500 hover:bg-pink-600 text-white",
    outline: "border-pink-500/20 text-pink-500 hover:bg-pink-500/10",
    visual: "from-pink-500/20 to-pink-500/0",
    accent: "bg-pink-500",
    accentTransparent: "bg-pink-500/10",
    text: "text-pink-500",
    border: "border-pink-500/20",
    shadow: "shadow-pink-500/10",
    fill: "fill-pink-500",
    stroke: "stroke-pink-500"
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-500",
    title: "text-white",
    description: "text-purple-100/80",
    button: "bg-purple-500 hover:bg-purple-600 text-white",
    outline: "border-purple-500/20 text-purple-500 hover:bg-purple-500/10",
    visual: "from-purple-500/20 to-purple-500/0",
    accent: "bg-purple-500",
    accentTransparent: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20",
    shadow: "shadow-purple-500/10",
    fill: "fill-purple-500",
    stroke: "stroke-purple-500"
  },
  gradient: {
    badge: "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-500",
    title: "text-white",
    description: "text-pink-100/80",
    button: "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white",
    outline: "border-pink-500/20 text-pink-500 hover:bg-pink-500/10",
    visual: "from-pink-500/20 via-purple-500/20 to-transparent",
    accent: "bg-gradient-to-r from-pink-500 to-purple-500",
    accentTransparent: "bg-gradient-to-r from-pink-500/10 to-purple-500/10",
    text: "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500",
    border: "border-pink-500/20",
    shadow: "shadow-pink-500/10",
    fill: "fill-pink-500",
    stroke: "stroke-purple-500"
  }
};

// Main sections component
export function ProfessionalServicesSections({ sections }: { sections: SectionProps[] }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </div>
  );
}

// Individual section component
function Section(props: SectionProps) {
  const { title, description, imageSide, color, icon, index } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorConfig = colorMap[color];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`flex flex-col ${
        imageSide === "right" ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 md:gap-12 items-center py-12 md:py-24`}
    >
      {/* Text content */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorConfig.badge}`}>
          {iconMap[icon]} <span className="ml-2">Professional Services</span>
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold ${colorConfig.title}`}>
          {title}
        </h2>
        <p className={`text-lg ${colorConfig.description}`}>
          {description}
        </p>
        <div className="pt-4 flex flex-wrap gap-3">
          <Button
            className={`rounded-full ${colorConfig.button}`}
          >
            Learn More
          </Button>
          <Button
            variant="outline"
            className={`rounded-full ${colorConfig.outline}`}
          >
            Book a Demo
          </Button>
        </div>
      </div>

      {/* Visual content */}
      <div className="w-full lg:w-1/2 aspect-square max-w-[500px] mx-auto">
        <ProfessionalServicesVisual 
          index={index} 
          colorConfig={colorConfig} 
          isInView={isInView} 
        />
      </div>
    </motion.div>
  );
}

// Visual component based on section index
function ProfessionalServicesVisual({ 
  index, 
  colorConfig, 
  isInView 
}: { 
  index: number;
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  switch (index) {
    case 0:
      return <ClientInsightsVisual colorConfig={colorConfig} isInView={isInView} />;
    case 1:
      return <ResourceAllocationVisual colorConfig={colorConfig} isInView={isInView} />;
    case 2:
      return <KnowledgeManagementVisual colorConfig={colorConfig} isInView={isInView} />;
    case 3:
      return <PredictiveAnalyticsVisual colorConfig={colorConfig} isInView={isInView} />;
    default:
      return (
        <div className="w-full h-full relative bg-black/40 rounded-lg border border-white/10 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-radial ${colorConfig.visual} z-0`}></div>
          
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <p className={`text-lg font-medium ${colorConfig.text}`}>
              Visual {index + 1} coming soon
            </p>
          </div>
        </div>
      );
  }
}

// Client Insights Dashboard Visual
function ClientInsightsVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  const clients = [
    { name: "Acme Corp", revenue: 85, satisfaction: 92, retention: 88 },
    { name: "GlobalTech", revenue: 92, satisfaction: 85, retention: 94 },
    { name: "BizSolutions", revenue: 78, satisfaction: 90, retention: 82 },
    { name: "InnovateCo", revenue: 88, satisfaction: 87, retention: 90 }
  ];

  return (
    <div className="w-full h-full relative bg-black/40 rounded-lg border border-white/10 overflow-hidden p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="opacity-5">
          <defs>
            <pattern id="smallGridCI" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <pattern id="gridCI" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="url(#smallGridCI)"/>
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <linearGradient id="bgGradientCI" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`${colorConfig.accent}22`} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          <rect width="100" height="100" fill="url(#gridCI)" />
          <rect width="100" height="100" fill="url(#bgGradientCI)" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${colorConfig.accent} mr-2`}></div>
            <h3 className="text-white font-semibold">Client Insights Dashboard</h3>
          </div>
          <div className="flex space-x-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-1 rounded ${colorConfig.accentTransparent}`}
            >
              <Calendar className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="p-1 rounded bg-white/10"
            >
              <User className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Client Metrics Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <DollarSign className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">Revenue Growth</span>
            </div>
            <p className="text-lg font-semibold text-white">+24.5%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <Star className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">Satisfaction</span>
            </div>
            <p className="text-lg font-semibold text-white">89%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <Users className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">Retention</span>
            </div>
            <p className="text-lg font-semibold text-white">93%</p>
          </div>
        </motion.div>

        {/* Client Performance Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="flex-grow bg-white/5 rounded-lg border border-white/10 p-3 overflow-hidden"
        >
          <div className="text-sm text-white/70 font-medium flex border-b border-white/10 pb-2 mb-2">
            <div className="w-1/4">Client</div>
            <div className="w-1/4 text-center">Revenue</div>
            <div className="w-1/4 text-center">Satisfaction</div>
            <div className="w-1/4 text-center">Retention</div>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
            {clients.map((client, idx) => (
              <motion.div 
                key={client.name}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-center text-sm py-1"
              >
                <div className="w-1/4 font-medium text-white">{client.name}</div>
                <div className="w-1/4">
                  <div className="mx-auto w-4/5 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${client.revenue}%` } : { width: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.8 }}
                      className={`h-full ${colorConfig.accent}`}
                    ></motion.div>
                  </div>
                  <div className="text-center text-xs mt-1">{client.revenue}%</div>
                </div>
                <div className="w-1/4">
                  <div className="mx-auto w-4/5 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${client.satisfaction}%` } : { width: 0 }}
                      transition={{ delay: 1.0 + idx * 0.1, duration: 0.8 }}
                      className={`h-full ${colorConfig.accent}`}
                    ></motion.div>
                  </div>
                  <div className="text-center text-xs mt-1">{client.satisfaction}%</div>
                </div>
                <div className="w-1/4">
                  <div className="mx-auto w-4/5 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${client.retention}%` } : { width: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1, duration: 0.8 }}
                      className={`h-full ${colorConfig.accent}`}
                    ></motion.div>
                  </div>
                  <div className="text-center text-xs mt-1">{client.retention}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.5 }}
          className="mt-4 bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center mb-2">
            <div className={`w-2 h-2 rounded-full ${colorConfig.accent} mr-2`}></div>
            <h4 className="text-sm font-medium text-white">AI Recommendations</h4>
          </div>
          <div className="text-xs text-white/70 space-y-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-start"
            >
              <TrendingUp className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>Increase engagement with BizSolutions to improve retention rates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.7 }}
              className="flex items-start"
            >
              <Star className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>GlobalTech satisfaction rates need attention - schedule executive review</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-start"
            >
              <DollarSign className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>Opportunity to cross-sell additional services to Acme Corp</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Resource Allocation Visual
function ResourceAllocationVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Project team members
  const teamMembers = [
    { id: 1, name: "Sarah Chen", role: "Project Manager", allocation: 100, skills: ["Leadership", "Client Mgmt", "Strategy"] },
    { id: 2, name: "Marcus Hill", role: "Senior Consultant", allocation: 85, skills: ["Analysis", "Finance", "Presentations"] },
    { id: 3, name: "Aisha Johnson", role: "UX Specialist", allocation: 60, skills: ["Design", "User Research", "Testing"] },
    { id: 4, name: "David Kim", role: "Technical Lead", allocation: 75, skills: ["Architecture", "Development", "DevOps"] },
    { id: 5, name: "Elena Garcia", role: "Data Analyst", allocation: 45, skills: ["Analytics", "Visualization", "Statistics"] }
  ];

  // Projects
  const projects = [
    { id: 1, name: "GlobalTech Digital Transformation", priority: "High", status: "In Progress", completion: 65 },
    { id: 2, name: "Acme Corp Strategy Review", priority: "Medium", status: "Planning", completion: 20 },
    { id: 3, name: "BizSolutions Implementation", priority: "High", status: "In Progress", completion: 45 }
  ];

  return (
    <div className="w-full h-full relative bg-black/40  p-4">
      {/* Background patterns */}
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${colorConfig.accent} mr-2`}></div>
            <h3 className="text-white font-semibold">Resource Optimization</h3>
          </div>
          <div className="flex space-x-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-1 rounded ${colorConfig.accentTransparent}`}
            >
              <Calendar className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="p-1 rounded bg-white/10"
            >
              <Briefcase className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Allocation Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <Users className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">Team Utilization</span>
            </div>
            <p className="text-lg font-semibold text-white">73%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <CheckCircle2 className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">On-Time Delivery</span>
            </div>
            <p className="text-lg font-semibold text-white">91%</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center mb-1">
              <Brain className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <span className="text-xs text-white/70">AI Efficiency Gain</span>
            </div>
            <p className="text-lg font-semibold text-white">+32%</p>
          </div>
        </motion.div>

        {/* AI Team Allocation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="flex-grow grid grid-cols-3 gap-4 mb-4"
        >
          {/* Team Allocation */}
          <div className="col-span-2 bg-white/5 rounded-lg border border-white/10 p-3 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white">Team Allocation</h4>
              <div className={`text-xs ${colorConfig.text} px-2 py-0.5 rounded-full bg-white/5`}>
                AI Optimized
              </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[calc(100%-2rem)]">
              {teamMembers.map((member, idx) => (
                <motion.div 
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="flex justify-between text-xs mb-1">
                    <div>
                      <span className="text-white font-medium">{member.name}</span>
                      <span className="text-white/60 ml-1">• {member.role}</span>
                    </div>
                    <span className={`${member.allocation > 90 ? 'text-red-400' : member.allocation > 70 ? colorConfig.text : 'text-green-400'}`}>
                      {member.allocation}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${member.allocation}%` } : { width: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1, duration: 0.8 }}
                      className={`h-full ${
                        member.allocation > 90 ? 'bg-red-400' : 
                        member.allocation > 70 ? colorConfig.accent : 
                        'bg-green-400'
                      }`}
                    ></motion.div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.skills.map((skill, sidx) => (
                      <motion.span
                        key={sidx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ delay: 1.2 + (idx * 0.1) + (sidx * 0.05) }}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-white/60"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Project Status */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-3 overflow-hidden">
            <h4 className="text-sm font-medium text-white mb-2">Project Status</h4>
            
            <div className="space-y-4 max-h-[calc(100%-3rem)]">
              {projects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 1.0 + idx * 0.2 }}
                  className="bg-white/5 rounded p-2"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-xs font-medium text-white">{project.name}</div>
                    <div className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      project.priority === "High" ? "bg-red-400/20 text-red-400" : 
                      "bg-yellow-400/20 text-yellow-400"
                    }`}>
                      {project.priority}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5">
                    <span>{project.status}</span>
                    <span>{project.completion}% Complete</span>
                  </div>
                  
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${project.completion}%` } : { width: 0 }}
                      transition={{ delay: 1.1 + idx * 0.2, duration: 0.8 }}
                      className={`h-full ${colorConfig.accent}`}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.5 }}
          className="bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${colorConfig.accent} mr-2`}></div>
              <h4 className="text-sm font-medium text-white">AI Resource Recommendations</h4>
            </div>
            <div className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded-full text-white/60">
              Updated 2h ago
            </div>
          </div>
          
          <div className="text-xs text-white/70 space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-start"
            >
              <CheckCircle2 className={`w-3 h-3 text-green-400 mt-0.5 mr-1 flex-shrink-0`} />
              <p>Reassign Elena Garcia to Acme Corp project for increased analytics support</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.7 }}
              className="flex items-start"
            >
              <XCircle className={`w-3 h-3 text-red-400 mt-0.5 mr-1 flex-shrink-0`} />
              <p>Sarah Chen at risk of burnout - reduce allocation by 15%</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-start"
            >
              <ArrowRight className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>Hire junior analyst to support BizSolutions implementation (66% AI confidence)</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Knowledge Management Visual
function KnowledgeManagementVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Knowledge categories
  const knowledgeCategories = [
    { 
      id: 1, 
      title: "Client Engagements", 
      documents: 124, 
      insights: 47,
      updatedAt: "2 hours ago",
      icon: <Briefcase className="w-4 h-4" />,
      contributors: 8
    },
    { 
      id: 2, 
      title: "Industry Research", 
      documents: 86, 
      insights: 31,
      updatedAt: "Yesterday",
      icon: <Search className="w-4 h-4" />,
      contributors: 5
    },
    { 
      id: 3, 
      title: "Best Practices", 
      documents: 58, 
      insights: 22,
      updatedAt: "3 days ago",
      icon: <CheckCircle2 className="w-4 h-4" />,
      contributors: 12
    },
    { 
      id: 4, 
      title: "Methodologies", 
      documents: 42, 
      insights: 19,
      updatedAt: "Last week",
      icon: <FileText className="w-4 h-4" />,
      contributors: 6
    }
  ];

  // Recent insights
  const recentInsights = [
    { 
      id: 1, 
      title: "Client churn prevention framework", 
      relevance: 94,
      source: "Multiple engagements",
      trend: "trending_up"
    },
    { 
      id: 2, 
      title: "Digital transformation success factors", 
      relevance: 88,
      source: "GlobalTech project",
      trend: "trending_up"
    },
    { 
      id: 3, 
      title: "Remote team productivity metrics", 
      relevance: 85,
      source: "Internal analysis",
      trend: "stable"
    }
  ];

  return (
    <div className="w-full h-full relative bg-black/40  p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="opacity-5">
          <defs>
            <pattern id="dotsKM" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <pattern id="largeDotKM" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="url(#dotsKM)"/>
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </pattern>
            <linearGradient id="bgGradientKM" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={`${colorConfig.accent}25`} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          <rect width="100" height="100" fill="url(#largeDotKM)" />
          <rect width="100" height="100" fill="url(#bgGradientKM)" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${colorConfig.accent} mr-2`}></div>
            <h3 className="text-white font-semibold">Knowledge Hub</h3>
          </div>
          <div className="flex space-x-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-1 rounded ${colorConfig.accentTransparent}`}
            >
              <Database className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="p-1 rounded bg-white/10"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Knowledge Network Visualization */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
          className="relative h-28 mb-4 bg-black/30 rounded-lg border border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0">
            {/* Central Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className={`w-10 h-10 rounded-full ${colorConfig.accent} flex items-center justify-center shadow-lg shadow-pink-500/20`}>
                <Database className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            {/* Connection Lines */}
            {knowledgeCategories.map((category, idx) => {
              // Calculate position around the circle
              const angle = (idx * (360 / knowledgeCategories.length)) * (Math.PI / 180);
              const radius = 75;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <React.Fragment key={category.id}>
                  {/* Connection Line */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      width: Math.abs(x) * 2, 
                      height: Math.abs(y) * 2,
                      transform: `translate(-50%, -50%) rotate(${angle + (idx % 2 ? 0 : Math.PI)}rad)`
                    }}
                  >
                    <div className={`w-full h-px ${colorConfig.border} opacity-60`}></div>
                  </motion.div>
                  
                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                    className="absolute"
                    style={{ 
                      top: `calc(50% + ${y}px)`, 
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-black flex items-center justify-center border ${colorConfig.border}`}>
                      {category.icon}
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}
            
            {/* Pulse Animation */}
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={isInView ? { 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.1, 0.2]
              } : { scale: 1, opacity: 0.3 }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                repeatType: "loop"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className={`w-16 h-16 rounded-full ${colorConfig.accentTransparent}`}></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Knowledge Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.4 }}
          className="flex-grow grid grid-cols-2 gap-3 mb-4"
        >
          {knowledgeCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="bg-white/5 rounded-lg p-3 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`p-1.5 rounded ${colorConfig.accentTransparent} mr-2`}>
                      {category.icon}
                    </div>
                    <h4 className="text-sm font-medium text-white">{category.title}</h4>
                  </div>
                  <div className="text-[10px] text-white/60">
                    {category.updatedAt}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="bg-white/5 rounded px-2 py-1.5">
                    <div className="text-[10px] text-white/60 mb-0.5">Documents</div>
                    <div className="text-sm font-medium text-white">{category.documents}</div>
                  </div>
                  <div className="bg-white/5 rounded px-2 py-1.5">
                    <div className="text-[10px] text-white/60 mb-0.5">Key Insights</div>
                    <div className="text-sm font-medium text-white">{category.insights}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Users className="w-3 h-3 text-white/60 mr-1" />
                  <span className="text-white/60">{category.contributors} contributors</span>
                </div>
                <div className={`text-xs ${colorConfig.text}`}>
                  <div className="flex items-center">
                    <Link2 className="w-3 h-3 mr-1" />
                    <span>View</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Insights & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.3 }}
          className="bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${colorConfig.accent} mr-2`}></div>
              <h4 className="text-sm font-medium text-white">AI-Surfaced Key Insights</h4>
            </div>
            <div className={`text-xs px-2 py-0.5 rounded-full ${colorConfig.accentTransparent} text-white`}>
              <div className="flex items-center">
                <Lightbulb className="w-3 h-3 mr-1" />
                <span>New</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2.5">
            {recentInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -5 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
                transition={{ delay: 1.4 + idx * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-start">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${colorConfig.accentTransparent} mr-2 flex-shrink-0`}>
                    <div className="text-[10px] font-semibold text-white">{idx + 1}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">{insight.title}</div>
                    <div className="text-[10px] text-white/60">Source: {insight.source}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-[10px] text-white/60 mr-2">Relevance</div>
                  <div className={`text-xs font-medium px-1.5 py-0.5 rounded ${colorConfig.accentTransparent}`}>
                    {insight.relevance}%
                  </div>
                  {insight.trend === "trending_up" && (
                    <TrendingUp className={`w-3 h-3 ${colorConfig.text} ml-1`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.7 }}
            className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs"
          >
            <div className="flex items-center text-white/60">
              <Activity className="w-3 h-3 mr-1" />
              <span>Updated continuously based on new data</span>
            </div>
            <div className={`${colorConfig.text}`}>
              <div className="flex items-center">
                <ArrowRight className="w-3 h-3 mr-1" />
                <span>View all insights</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Predictive Analytics Visual
function PredictiveAnalyticsVisual({ 
  colorConfig, 
  isInView 
}: { 
  colorConfig: typeof colorMap[keyof typeof colorMap];
  isInView: boolean;
}) {
  // Risk metrics
  const riskMetrics = [
    { id: 1, category: "Market Volatility", current: 65, forecast: 78, change: 13, trend: "increasing" },
    { id: 2, category: "Regulatory Compliance", current: 42, forecast: 38, change: -4, trend: "decreasing" },
    { id: 3, category: "Client Attrition", current: 29, forecast: 24, change: -5, trend: "decreasing" },
    { id: 4, category: "Talent Shortage", current: 51, forecast: 62, change: 11, trend: "increasing" }
  ];

  // Opportunity metrics
  const opportunityMetrics = [
    { id: 1, category: "Digital Transformation", probability: 88, value: "High", trend: "stable" },
    { id: 2, category: "Sustainability Services", probability: 75, value: "Medium", trend: "increasing" },
    { id: 3, category: "Talent Development", probability: 62, value: "Medium", trend: "increasing" }
  ];

  return (
    <div className="w-full h-full relative bg-black/40  p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="opacity-5">
          <defs>
            <pattern id="graphPA" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="transparent"/>
              <path d="M0,25 L50,25 M25,0 L25,50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4"/>
              <path d="M12.5,12.5 L37.5,37.5 M37.5,12.5 L12.5,37.5" stroke="currentColor" strokeWidth="0.2" />
            </pattern>
            <linearGradient id="bgGradientPA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor={`${colorConfig.accent}20`} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          <rect width="100" height="100" fill="url(#graphPA)" />
          <rect width="100" height="100" fill="url(#bgGradientPA)" />
        </svg>
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${colorConfig.accent} mr-2`}></div>
            <h3 className="text-white font-semibold">Predictive Intelligence</h3>
          </div>
          <div className="flex space-x-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-1 rounded ${colorConfig.accentTransparent}`}
            >
              <TrendingUp className="w-4 h-4 text-white" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="p-1 rounded bg-white/10"
            >
              <Gauge className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Forecast Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.3 }}
          className="mb-4 bg-black/30 border border-white/10 rounded-lg p-3"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-white">Forecast Timeline</h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[10px] text-white/60">
                <div className="w-2 h-2 bg-white/60 rounded-full mr-1"></div>
                <span>Current</span>
              </div>
              <div className="flex items-center text-[10px] text-white/60">
                <div className={`w-2 h-2 rounded-full ${colorConfig.accent} mr-1`}></div>
                <span>Forecast</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-12">
            {/* Timeline bar */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 transform -translate-y-1/2"></div>
            
            {/* Timeline markers */}
            {[0, 1, 2, 3, 4].map((marker) => (
              <div 
                key={marker} 
                className="absolute top-1/2 transform -translate-y-1/2" 
                style={{ left: `${marker * 25}%` }}
              >
                <div className="h-2 w-px bg-white/40"></div>
                <div className="text-[10px] text-white/60 mt-1">
                  {marker === 0 ? 'Now' : `Q${marker} ${new Date().getFullYear()}`}
                </div>
              </div>
            ))}
            
            {/* Current marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.5 }}
              className="absolute top-1/2 transform -translate-y-1/2 left-0"
            >
              <div className="w-3 h-3 rounded-full bg-white/60 transform translate-x(-50%)"></div>
            </motion.div>
            
            {/* Forecast marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 0 }}
              animate={isInView ? { opacity: 1, scale: 1, x: '100%' } : { opacity: 0, scale: 0.5, x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="absolute top-1/2 transform -translate-y-1/2 left-[60%]"
            >
              <div className={`w-4 h-4 rounded-full ${colorConfig.accent} transform translate-x(-50%) flex items-center justify-center`}>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </motion.div>
            
            {/* Forecast confidence region */}
            <motion.div
              initial={{ opacity: 0, width: '0%' }}
              animate={isInView ? { opacity: 0.2, width: '35%' } : { opacity: 0, width: '0%' }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className={`absolute top-1/2 transform -translate-y-1/2 h-4 ${colorConfig.accentTransparent} rounded`}
              style={{ left: '60%' }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Risk Assessment */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
          className="flex-grow grid grid-cols-2 gap-4 mb-4"
        >
          {/* Risks */}
          <div className="bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col">
            <div className="flex items-center mb-2">
              <AlertTriangle className={`w-4 h-4 ${colorConfig.text} mr-1`} />
              <h4 className="text-sm font-medium text-white">Risk Forecast</h4>
            </div>
            
            <div className="flex-grow space-y-3 overflow-y-auto">
              {riskMetrics.map((metric, idx) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className="bg-white/5 rounded p-2"
                >
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-medium text-white">{metric.category}</span>
                    <div className={`px-1.5 py-0.5 rounded text-[10px] ${
                      metric.trend === "increasing" 
                        ? "bg-red-400/20 text-red-400" 
                        : "bg-green-400/20 text-green-400"
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] text-white/60 mb-1">
                        <span>Current: {metric.current}%</span>
                        <span>Forecast: {metric.forecast}%</span>
                      </div>
                      <div className="relative h-1.5 bg-white/10 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${metric.current}%` } : { width: 0 }}
                          transition={{ delay: 1.0 + idx * 0.1, duration: 0.5 }}
                          className="absolute h-full bg-white/50 rounded-full"
                        ></motion.div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${metric.forecast}%` } : { width: 0 }}
                          transition={{ delay: 1.2 + idx * 0.1, duration: 0.5 }}
                          className={`absolute h-full ${
                            metric.trend === "increasing" ? "bg-red-400" : "bg-green-400"
                          } rounded-full opacity-70`}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Opportunities */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col">
              <div className="flex items-center mb-2">
                <Lightbulb className={`w-4 h-4 ${colorConfig.text} mr-1`} />
                <h4 className="text-sm font-medium text-white">Opportunity Scanner</h4>
              </div>
              
              <div className="space-y-2">
                {opportunityMetrics.map((opportunity, idx) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    className="flex items-center"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${colorConfig.accent} mr-2`}></div>
                    <div className="flex-grow">
                      <div className="flex justify-between text-xs">
                        <span className="text-white">{opportunity.category}</span>
                        <span className={`${colorConfig.text}`}>{opportunity.probability}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${opportunity.probability}%` } : { width: 0 }}
                          transition={{ delay: 1.0 + idx * 0.1, duration: 0.8 }}
                          className={`h-full ${colorConfig.accent}`}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Market Sentiment Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.3 }}
              className="bg-white/5 rounded-lg border border-white/10 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-white">Market Sentiment</h4>
                <div className={`px-1.5 py-0.5 rounded-full text-[10px] bg-green-400/20 text-green-400 flex items-center`}>
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  <span>Positive</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between mt-2 h-28">
                {[28*3, 45*3, 36*3, 52*3, 38*3, 64*3, 71*3].map((value, idx) => (
                    <div key={idx} className="w-[8%] relative group">
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: (value / 100) * 40 } : { height: 0 }}
                        transition={{ delay: 1.4 + idx * 0.05, duration: 0.5 }}
                        className={`w-full rounded-t ${idx >= 4 ? 'bg-green-400' : colorConfig.accent} group-hover:opacity-80 transition-opacity`}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[8px] rounded px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {value/3}%
                    </div>
                    </div>
                ))}
                </div>

              
              <div className="flex justify-between text-[8px] text-white/40 mt-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1.5 }}
          className="bg-white/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${colorConfig.accent} mr-2`}></div>
              <h4 className="text-sm font-medium text-white">Strategic Recommendations</h4>
            </div>
            <div className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded-full text-white/60">
              Confidence: 87%
            </div>
          </div>
          
          <div className="text-xs text-white/70 space-y-1.5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.6 }}
              className="flex items-start"
            >
              <PanelRight className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>Accelerate digital transformation offerings to capitalize on emerging market demand</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.7 }}
              className="flex items-start"
            >
              <AlertTriangle className={`w-3 h-3 text-yellow-400 mt-0.5 mr-1 flex-shrink-0`} />
              <p>Implement risk mitigation strategies for anticipated talent shortages in Q3</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8 }}
              className="flex items-start"
            >
              <Sparkles className={`w-3 h-3 ${colorConfig.text} mt-0.5 mr-1 flex-shrink-0`} />
              <p>Develop sustainability service offerings—high probability growth opportunity</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 