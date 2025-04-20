"use client";

import Image from "next/image";

interface StatBlockProps {
  value: string;
  description: string;
  footer?: string;
  className?: string;
}

function StatBlock({ value, description, footer, className = "" }: StatBlockProps) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-br from-[#2e2e33] via-[#1f1f22] to-[#19191c] border border-[#3A3A3F] p-6 text-center shadow-md ${className}`}
    >
      <h3 className="text-4xl font-extrabold text-white mb-2">{value}</h3>
      <p className="text-gray-200 text-sm">{description}</p>
      {footer && <p className="text-xs text-gray-500 mt-2">{footer}</p>}
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
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
      {ctaText && (
        <button className="inline-flex items-center text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-all">
          {ctaText}
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function DisengagementSection() {
  return (
    <section className="w-full px-4 py-16 sm:px-6">
      <div className="max-w-6xl mx-auto rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-800/60 to-gray-900/90 shadow-xl px-6 sm:px-10 py-16 space-y-16 overflow-hidden relative">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-4 relative z-10 max-w-3xl mx-auto">
          <div className="mx-auto h-16">
            <Image
              src="/horizontal-logo.svg"
              alt="Pulp Logo"
              width={200}
              height={52}
              className="mx-auto h-full w-auto object-contain"
            />
          </div>
          <p className="text-sm text-purple-300 font-medium tracking-wide uppercase">
            The Price of Disengagement is Too High
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            The Need is Everywhere. <br />
            The Time is Now.
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Engagement refers to sharing attention with and for other people and groups. Businesses have investors, employees, clients. Governments have citizens, representatives, and appointed officials. But everyone is a person.
          </p>
        </div>

       {/* Mobile Version (fixed alternation) */}
<div className="flex flex-col gap-8 md:hidden relative z-10">
  <StatBlock
    value="95%"
    description="Buyers choose subconsciously"
    footer="The subconscious drives purchasing behavior. Source: Harvard Business School"
  />
  <InfoBlock
    title="Engagement That Resonates"
    description="If you’re not speaking to the subconscious of your audience, you’re not in the conversation."
    ctaText="Learn More"
  />

  <StatBlock
    value="$228M+"
    description="Yearly Cost of Disengaged Workers"
    footer="Median-size S&P 500 companies could pay $1B+ in 5 years. Source: McKinsey & Company"
  />
  <InfoBlock
    title="Employee Disengagement is Expensive"
    description="Lost productivity and employee attrition cost people, managers, and businesses every year."
    ctaText="Learn More"
  />

  <StatBlock
    value="1 in 3"
    description="Adults 18–24 won’t participate"
    footer="Civic engagement is suffering needlessly. Source: Institute for Citizens & Scholars"
  />
  <InfoBlock
    title="Lowered Civic Engagement Hurts Us All"
    description="Activating youth civic engagement is a critical priority for political strategists across the aisle."
    ctaText="Learn More"
  />
</div>

        {/* Desktop Version */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 relative z-10">
          <div className="flex flex-col space-y-6">
            <InfoBlock
              title="Engagement That Resonates"
              description="If you’re not speaking to the subconscious of your audience, you’re not in the conversation."
              ctaText="Learn More"
            />
            <StatBlock
              value="95%"
              description="Buyers choose subconsciously"
              footer="The subconscious drives purchasing behavior. Source: Harvard Business School"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <StatBlock
              value="$228M+"
              description="Yearly Cost of Disengaged Workers"
              footer="Median-size S&P 500 companies could pay $1B+ in 5 years. Source: McKinsey & Company"
            />
            <InfoBlock
              title="Employee Disengagement is Expensive"
              description="Lost productivity and employee attrition cost people, managers, and businesses every year."
              ctaText="Learn More"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <InfoBlock
              title="Lowered Civic Engagement Hurts Us All"
              description="Activating youth civic engagement is a critical priority for political strategists across the aisle."
              ctaText="Learn More"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <StatBlock
              value="1 in 3"
              description="Adults 18–24 won’t participate"
              footer="Civic engagement is suffering needlessly. Source: Institute for Citizens & Scholars"
            />
          </div>
        </div>
      </div>
    </section>
  );
}