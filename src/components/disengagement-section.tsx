"use client";

interface StatBlockProps {
  value: string;
  title: string;
  description: string;
  className?: string;
}

function StatBlock({ value, title, description, className = "" }: StatBlockProps) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-gray-800/60 to-gray-900/90 border border-gray-800/50 ${className}`}>
      <div className="p-6 sm:p-8 relative z-10">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"></div>
        
        <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
          {value}
        </h3>
        
        <h4 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-2">
          {title}
        </h4>
        
        <p className="text-gray-300 text-sm sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

interface InfoBlockProps {
  title: string;
  description: string;
  ctaText?: string;
  className?: string;
}

function InfoBlock({ title, description, ctaText, className = "" }: InfoBlockProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-xl sm:text-2xl font-semibold text-purple-300">{title}</h3>
      <p className="text-gray-300 text-sm sm:text-base">{description}</p>
      
      {ctaText && (
        <div>
          <button className="group flex items-center gap-2 px-4 py-2 bg-purple-600/90 rounded-lg text-white text-sm font-medium transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:scale-105">
            {ctaText}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform group-hover:translate-x-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function DisengagementSection() {

  return (
    <div className="w-full max-w-full mx-auto overflow-x-hidden px-4 sm:px-6">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Disengagement Costs More Than You Think
          </h2>
          <p className="text-xl text-gray-300">
            Connection Drives Everything. The Time to Act is Now.
          </p>
          <p className="text-gray-400">
            Engagement isn&apos;t just about attention, it&apos;s about impact. Businesses rely on engaged employees, customers, and investors. Governments depend on active citizens and leaders. <span className="text-purple-300 font-medium">At the core of it all? People.</span>
          </p>
        </div>

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col justify-between h-full">
            <InfoBlock 
              title="Engagement that Sticks"
              description="If you're not tapping into what drives people beneath the surface, you're not really in the conversation."
              ctaText="Learn More"
              className="mb-8"
            />
            
            <StatBlock 
              value="95%"
              title="Buyers choose subconsciously"
              description="The subconscious drives purchasing behavior."
              className="h-56 sm:h-64"
            />
          </div>
          
          <div className="flex flex-col justify-between h-full">
            <InfoBlock 
              title="Employee Disengagement is Expensive"
              description="Lost productivity and employee attrition cost business leaders and companies every year."
              ctaText="Learn More"
              className="mb-8"
            />
            
            <StatBlock 
              value="$228M+"
              title="Yearly Cost of Disengaged Workers"
              description="Median-size S&P 500 companies could pay $1B+ in 5 years"
              className="h-56 sm:h-64"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col justify-between h-full">
            <InfoBlock 
              title="Lowered Civic Engagement Hurts Us All"
              description="Activating youth civic engagement isn't just political - it's about shaping the future."
              ctaText="Learn More"
              className="mb-8"
            />
          </div>
          
          <div className="flex flex-col justify-between h-full">
            <StatBlock 
              value="1 in 3"
              title="Adults 18-24 won't participate"
              description="Civic engagement is suffering needlessly"
              className="h-56 sm:h-64"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 