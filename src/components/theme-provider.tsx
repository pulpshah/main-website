"use client";

import { useEffect } from "react";
import { forceDarkMode, setupDarkModeObserver } from "@/lib/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Force dark mode when the component mounts
    forceDarkMode();
    
    // Set up observer to ensure dark mode stays enabled
    setupDarkModeObserver();
    
    // Also force dark mode whenever the color scheme might change
    const handleColorSchemeChange = () => {
      forceDarkMode();
    };
    
    // Listen for color scheme changes (though we'll override them anyway)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorSchemeChange);
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', handleColorSchemeChange);
    
    return () => {
      // Clean up listeners
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleColorSchemeChange);
      window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', handleColorSchemeChange);
    };
  }, []);

  return <>{children}</>;
} 