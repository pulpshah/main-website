import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/features/features-section";
import StatsSection from "@/components/landing/stats-section";
import RiskSection from "@/components/landing/risk-section";
import CoverageSection from "@/components/landing/coverage-section";
import DisengagementSection from "@/components/landing/disengagement-section";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative pb-20 overflow-x-hidden" suppressHydrationWarning>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30" suppressHydrationWarning>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" suppressHydrationWarning></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" suppressHydrationWarning></div>
      </div>
      
      <div className="relative z-10 w-full overflow-hidden" suppressHydrationWarning>
        {/* Hero Section */}
        <div className="w-full max-w-full mx-auto py-8 md:py-12" suppressHydrationWarning>
          <HeroSection />
        </div>
        
        {/* Section Separator - Purple */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-purple-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(168,85,247,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-purple-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* Features Section - Blue */}
        <div className="py-6 md:py-10 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <FeaturesSection />
          </div>
        </div>
        
        {/* Section Separator - Blue */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-blue-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(59,130,246,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-blue-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* Stats Section - Amber/Orange */}
        <div className="py-6 md:py-10 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <StatsSection />
          </div>
        </div>
        
        {/* Section Separator - Amber */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-amber-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(245,158,11,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-amber-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* Risk Section - Red/Purple */}
        <div className="py-6 md:py-10 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <RiskSection />
          </div>
        </div>
        
        {/* Section Separator - Red */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-red-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(239,68,68,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-red-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* Coverage Section - Green */}
        <div className="py-6 md:py-10 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <CoverageSection />
          </div>
        </div>
        
        {/* Section Separator - Green to Purple */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-purple-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(168,85,247,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-purple-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* Disengagement Section - Purple */}
        <div className="py-6 md:py-10 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <DisengagementSection />
          </div>
        </div>
        
        {/* Section Separator - Purple to Pink */}
        <div className="w-full py-4 md:py-6 relative" suppressHydrationWarning>
          <div className="max-w-sm mx-auto bg-gradient-to-r from-transparent via-pink-500/40 to-transparent h-[2px] shadow-[0_0_8px_rgba(236,72,153,0.5)]" suppressHydrationWarning></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black border-2 border-pink-500/30 rounded-full flex items-center justify-center" suppressHydrationWarning>
            <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" suppressHydrationWarning></div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="py-10 md:py-16 w-full" suppressHydrationWarning>
          <div className="max-w-full mx-auto" suppressHydrationWarning>
            <CtaSection />
          </div>
        </div>
      </div>
    </div>
  );
}
