import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid max-w-4xl mx-auto grid-cols-2 gap-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl min-h-[18rem]",
      "bg-background shadow-md dark:bg-background dark:border dark:border-white/10",
      "transform-gpu transition-all duration-300 hover:scale-[1.02]",
      className,
    )}
    {...props}
  >
    {/* Background decoration */}
    <div>{background}</div>

    {/* Main content */}
    <div className="pointer-events-none z-10 flex flex-col gap-2 p-6 transition-all group-hover:-translate-y-4">
      <Icon className="h-10 w-10 text-neutral-700 dark:text-neutral-300 transition-transform group-hover:scale-90" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="text-sm text-neutral-400">{description}</p>
    </div>

    {/* Button CTA */}
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    {/* Hover background overlay */}
    <div className="pointer-events-none absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/5 group-hover:dark:bg-white/5" />
  </div>
);

export { BentoCard, BentoGrid };