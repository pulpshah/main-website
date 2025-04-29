"use client";

import Link from "next/link";
import { Github, XIcon, Linkedin, Mail, ChevronRight } from "lucide-react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { WarpBackground } from "@/components/magicui/warp-background";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AboutSection() {
  return (
    <section className="w-full text-white px-6 py-40 flex flex-col items-center justify-center relative">
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-7xl gap-20 md:gap-40 items-stretch">
        {/* Left Column */}
        <div className="flex flex-col justify-start max-w-2xl space-y-12 text-gray-300 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight break-keep">
            <div className="text-left">
              {" "}
              <span className="tracking-widest ml-3 "> › › </span> Empower Your{" "}
              <br /> Conversations{" "}
              <span className="text-gray-400 tracking-widest ml-3">
                {" "}
                › › ›{" "}
              </span>
            </div>
            <div className="text-right">
              <span className="bg-gradient-to-r from-[#D8B4F8] to-primary bg-clip-text text-transparent font-semibold">
                <span className="text-gray-400 tracking-widest  "> </span>{" "}
                Engineer Your{" "}
                <span className=" tracking-widest ml-2"> ‹ ‹ ‹ </span>{" "}
                Engagement
              </span>
            </div>
          </h2>

          <div className="flex justify-start -mt-2">
            <AnimatedGradientTextDemo />
          </div>

          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              Pulp is a premium engagement suite for full-stack, full-cycle
              communication and language-based automation. Every interaction is
              analyzed through the lens of persuasion to reveal what truly moves
              people.
            </p>

            <p>
              Powered by our proprietary NLP algorithms, AI agents, and a{" "}
              next-generation language intelligence stack, Pulp helps businesses
              craft, deploy, and monitor conversations — ensuring every message{" "}
              <span className="bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent font-semibold">
                reaches, resonates, and converts
              </span>
              .
            </p>

            <p>
              With Pulp, you gain control of your narrative by applying
              neurolinguistics to real conversations — turning language into
              leverage.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center gap-8 w-full max-w-lg">
          {/* Card */}
          <WarpBackground className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col text-black p-0">
            {" "}
            <div className="w-full p-6 pb-0">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  [ Live Demo Placeholder ]
                </span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">Your Personal AI Agent</h3>
              <p className="text-black text-base leading-relaxed">
                Discover advanced features designed to empower your business.
              </p>
            </div>
            <div className="flex gap-4 p-6 pt-0">
              <InteractiveHoverButton className="flex-1 bg-black text-white text-base py-2 rounded-full hover:bg-gray-800 transition">
                Request Demo
              </InteractiveHoverButton>
              <InteractiveHoverButton className="flex-1 bg-gray-100 text-gray-700 text-base py-2 rounded-full hover:bg-gray-200 transition">
                Learn More
              </InteractiveHoverButton>
            </div>
          </WarpBackground>

          <BoxRevealDemo />
          <DockDemo />
        </div>
      </div>
    </section>
  );
}

// --- Support components ---

export function AnimatedGradientTextDemo() {
  return (
    <div className="group relative flex items-center justify-end rounded-full px-4 py-3 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
      <span
        className={cn(
          "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <span className="text-sm align-middle">🎉</span>
      <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
      <AnimatedGradientText className="text-sm font-medium">
        Introducing Resume Scorer
      </AnimatedGradientText>
      <ChevronRight className="ml-1 size-5 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  );
}

export function BoxRevealDemo() {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden gap-4">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6 text-center">
          <p>
            -&gt; 20+ agents and 5+ products built with
            <span className="font-semibold text-primary">
              {" "}
              state-of-the-art technology, over 5,000 hours of relentless
              fine-tuning, and a dedicated team of 10 people.
            </span>
            .
            <br />
            -&gt; 100% satisfaction, 24/7 support.
          </p>
        </div>
      </BoxReveal>
    </div>
  );
}

export function DockDemo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <TooltipProvider>
        <Dock direction="middle">
          {/* GitHub */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://github.com/yourprofile"
                  aria-label="GitHub"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Github className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://x.com/yourprofile"
                  aria-label="X"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <XIcon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>X</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="https://linkedin.com/in/yourprofile"
                  aria-label="LinkedIn"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Linkedin className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="mailto:youremail@example.com"
                  aria-label="Email"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <Mail className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Email</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
