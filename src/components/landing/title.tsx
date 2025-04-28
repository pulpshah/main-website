import { SparklesText } from "@/components/magicui/sparkles-text";

export function SparklesTitle({ children }: { children: React.ReactNode }) {
  return (
    <SparklesText className="tracking-wide opacity-90 text-center mb-8">
      {children}
    </SparklesText>
  );
}