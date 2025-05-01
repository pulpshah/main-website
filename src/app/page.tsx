import FeaturesSection from "@/components/landing/features-section";
import RiskSection from "@/components/landing/risk-section";
import CoverageSection from "@/components/landing/coverage-section";
import DisengagementSection from "@/components/landing/disengagement-section";
import CtaSection from "@/components/landing/cta-section";
import AboutSection from "@/components/landing/about-section";
import MarketSection from "@/components/landing/bento-grid-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative pb-20 overflow-x-hidden" suppressHydrationWarning>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden z-0 opacity-30" suppressHydrationWarning>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" suppressHydrationWarning />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(#8A3FFC_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" suppressHydrationWarning />
      </div>

      <div className="relative z-10 w-full overflow-hidden" suppressHydrationWarning>
        <div className="w-full max-w-full mx-auto" suppressHydrationWarning>
          {/* Hero Section */}
          <div className="w-full h-px bg-neutral-800" />
          <section data-section="hero">
            <AboutSection />
          </section>
        </div>

        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto" suppressHydrationWarning>

          {/* Features Section */}
          <section data-section="features" className="py-6 md:py-10 w-full">
            <div className="max-w-full mx-auto">
              <FeaturesSection />
            </div>
          </section>

          {/* Market Section */}
          <section data-section="market" className="mt-20 py-6 md:py-10 w-full bg-[#fefefe] rounded-4xl shadow-inner shadow-black/50">
            <div className="width-screen px-8">
              <MarketSection />
            </div>
          </section>

          {/* Risk Section */}
          <section data-section="risk" className="py-6 md:py-10 w-full">
            <div className="max-w-full mx-auto">
              <RiskSection />
            </div>
          </section>

          {/* Coverage Section */}
          <section data-section="coverage" className="py-6 md:py-10 w-full">
            <div className="max-w-full mx-auto">
              <CoverageSection />
            </div>
          </section>

          {/* Disengagement Section */}
          <section data-section="disengagement" className="py-6 md:py-10 w-full">
            <div className="max-w-full mx-auto">
              <DisengagementSection />
            </div>
          </section>

          {/* CTA Section */}
          <section data-section="cta" className="py-10 md:py-16 w-full">
            <div className="max-w-full mx-auto">
              <CtaSection />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}