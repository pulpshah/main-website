import { ComingSoonAnimation } from "@/components/ui/coming-soon-animation";

export const metadata = {
  title: "Coming Soon | Our Company",
  description: "Our new website is coming soon. Stay tuned for updates!",
};

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="sr-only">Coming Soon</h1>
        <ComingSoonAnimation className="mb-10" />
        <div className="text-center text-gray-400 mt-10 space-y-6 animate-fade-in">
          <p className="text-lg">
            We&apos;re working on something exciting!
          </p>
        </div>
      </div>
    </main>
  );
} 