'use client';

import { CalendarClock } from 'lucide-react'; // or use ArrowRight if you prefer


import { useEffect, useRef, useState } from 'react';

export default function AboutSection({ onFocus }: { onFocus?: (inView: boolean) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const phrases = [
    'Meet Pulp AI.',
    'Drive the Dialogue.',
    'Maximize Your Reach.',
    'Activate Your Audience.'
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );
      setScrollProgress(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for focus effect
  useEffect(() => {
    if (!onFocus) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onFocus(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onFocus]);

  // Typing effect logic
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText.length === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 3500);
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  const translateX = -scrollProgress * 80;
  const demoTranslateX = scrollProgress * 80;

  return (
    <section
      ref={sectionRef}
      className="w-full text-white px-6 py-32 flex flex-col items-center justify-center z-20 relative"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-7xl gap-10">
        {/* TEXT BLOCK */}
        <div
          ref={textRef}
          style={{
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.2s ease-out',
          }}
          className="max-w-2xl text-gray-300 text-center md:text-left leading-normal space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            THE ART OF CONVERSATION MEETS THE{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              SCIENCE OF ENGAGEMENT
            </span>
          </h2>

          <h3 className="text-2xl md:text-3xl font-semibold tracking-wide">
            <span className="inline-block bg-yellow-400 text-black px-2 rounded">
              {displayText}
              <span className="animate-pulse ml-1">|</span>
            </span>
          </h3>

          <p>
            Pulp is a premium engagement suite for full-stack, full-cycle communication and language-based automation.
            Every interaction is analyzed through the lens of persuasion to reveal what truly moves people.
          </p>

          <p>
            Powered by our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              proprietary NLP algorithms
            </span>
            ,{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              AI agents
            </span>
            , and a{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              next-gen language intelligence stack
            </span>
            , Pulp helps businesses craft, deploy, and monitor conversations — ensuring every message{' '}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent font-semibold">
              reaches, resonates, and converts
            </span>
            .
          </p>

          <p>
            With Pulp, you gain control of your narrative by applying neurolinguistics to real conversations — turning language into leverage.
          </p>
        </div>

        {/* DEMO BLOCK */}
        <div
          style={{
            transform: `translateX(${demoTranslateX}px)`,
            transition: 'transform 0.2s ease-out',
          }}
          className="w-full md:w-[40%] flex flex-col items-center mt-10"
        >
          <div className="w-full h-72 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
            [ Live Demo Placeholder ]
          </div>

          <button className="mt-10 px-8 py-3 bg-white text-black text-lg font-semibold rounded-lg border border-gray-300 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] transition duration-200 hover:shadow-md active:translate-y-[1px] flex items-center gap-2">
            Book A Demo
            <CalendarClock className="w-5 h-5" />
            </button>
        </div>
      </div>
    </section>
  );
}