'use client';

/**
 * This script runs on page load to ensure dark mode is applied
 * It's executed inline to prevent any flash of light mode content
 */

if (typeof window !== 'undefined') {
  // Immediately apply dark mode class
  document.documentElement.classList.add('dark');
  
  // Remove any light mode classes
  document.documentElement.classList.remove('light');
  
  // Force preferred color scheme via meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#0a0a0a');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = '#0a0a0a';
    document.head.appendChild(meta);
  }
  
  // Ensure the body has dark background
  document.body.classList.add('bg-background', 'text-foreground');
  
  // Store the preference
  localStorage.setItem('theme', 'dark');
} 