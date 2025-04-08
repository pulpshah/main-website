/**
 * This file contains utility functions for ensuring dark mode is consistently applied
 * across the application, even when the browser might try to override it.
 */

/**
 * Forces dark mode by adding the 'dark' class to the html element
 * This should be called on the client side to ensure consistent theming
 */
export function forceDarkMode(): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark');
    
    // Remove any light mode classes if they exist
    document.documentElement.classList.remove('light');
    
    // Store the preference in localStorage to persist across sessions
    localStorage.setItem('theme', 'dark');
  }
}

/**
 * Setup observer to ensure dark mode stays enabled even if something tries to remove it
 */
export function setupDarkModeObserver(): void {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') {
    return;
  }

  // Create a MutationObserver to watch for class changes on the html element
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class' &&
        !document.documentElement.classList.contains('dark')
      ) {
        // Re-add dark class if it was removed
        document.documentElement.classList.add('dark');
      }
    });
  });

  // Start observing the html element for class attribute changes
  observer.observe(document.documentElement, { attributes: true });
} 