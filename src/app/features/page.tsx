import { FeaturesTables } from "@/components/features/features-tables"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black py-12 px-4 md:px-6">
      <div className="container mx-auto">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-pink-500">
            Features & Plans
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Compare our feature-rich plans to find the perfect solution for your needs.
            Each tier unlocks more powerful capabilities to drive your success.
          </p>
        </div>
        
        <FeaturesTables />
      </div>
    </main>
  )
} 