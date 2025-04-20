"use client";

import { useState, useEffect, useRef } from "react";

interface PageData {
  url: string;
  title: string;
  structuredText: Array<{ text: string | undefined; path: string }>;
  links: Array<{ text: string; url: string; path: string }>;
  buttons: Array<{ text: string; action: string; path: string }>;
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    path: string;
  }>;
}

const getElementPath = (element: HTMLElement): string => {
  const parts = [];
  while (element && element.tagName.toLowerCase() !== "html") {
    let tag = element.tagName.toLowerCase();
    if (element.id) {
      tag += `#${element.id}`;
    } else if (element.classList.length > 0) {
      const firstClass = Array.from(element.classList).find(
        (cls) => !cls.startsWith("__variable_")
      );
      if (firstClass) tag += `.${firstClass}`;
    }
    parts.unshift(tag);
    element = element.parentElement as HTMLElement;
  }
  return parts.join(" > ");
};

// Check if element is part of the chatbot UI
const isPartOfChatbot = (element: HTMLElement): boolean => {
  // Check if the element or any of its parents have chatbot-related classes/attributes
  let currentElement: HTMLElement | null = element;
  
  while (currentElement && currentElement !== document.body) {
    // Check for chat-related classes
    const classNames = Array.from(currentElement.classList);
    if (
      classNames.some(cls => 
        cls.includes('chat') || 
        cls.includes('message') || 
        cls.includes('bot')
      ) ||
      currentElement.getAttribute('aria-label')?.includes('chat') ||
      currentElement.getAttribute('aria-label')?.includes('message') ||
      // Check for fixed positioning which is often used for chat overlays
      (window.getComputedStyle(currentElement).position === 'fixed' &&
       (window.getComputedStyle(currentElement).bottom === '24px' || 
        window.getComputedStyle(currentElement).bottom === '6px' ||
        window.getComputedStyle(currentElement).right === '6px'))
    ) {
      return true;
    }
    
    currentElement = currentElement.parentElement;
  }
  
  // Also check if it's our page data tester
  if (currentElement && 
      (currentElement.classList.contains('PageDataTester') || 
       currentElement.getAttribute('data-testid') === 'page-data-tester')) {
    return true;
  }
  
  return false;
};

export const usePageData = (options?: { debug?: boolean }) => {
  const [pageData, setPageData] = useState<PageData>({
    url: "",
    title: "",
    structuredText: [],
    links: [],
    buttons: [],
    images: [],
  });

  // Use ref to prevent excessive updates
  const updatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUrlRef = useRef<string>('');
  const lastContentSignatureRef = useRef<string>('');

  useEffect(() => {
    // Calculate a signature of the page content to detect significant changes
    const getContentSignature = (): string => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
        .map(h => h.textContent?.trim())
        .filter(Boolean)
        .join('|');
      
      const mainContent = document.querySelector('main')?.textContent?.trim() || '';
      
      return `${window.location.pathname}|${document.title}|${headings}|${mainContent.length}`;
    };

    const extractPageData = () => {
      // Prevent concurrent updates
      if (updatingRef.current) return;
      updatingRef.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce the extraction to avoid multiple rapid updates
      timeoutRef.current = setTimeout(() => {
        try {
          // Check if URL or page content has changed significantly
          const currentUrl = window.location.href;
          const currentContentSignature = getContentSignature();
          
          // Skip update if URL and content haven't changed significantly
          if (currentUrl === lastUrlRef.current && 
              currentContentSignature === lastContentSignatureRef.current) {
            updatingRef.current = false;
            return;
          }
          
          // Update our references
          lastUrlRef.current = currentUrl;
          lastContentSignatureRef.current = currentContentSignature;
          
          if (options?.debug) {
            console.log("Page change detected:", currentUrl);
          }

          const extractedTexts = new Set<string>();
          const buttonTexts = new Set<string>();

          // Process buttons first
          const buttons = Array.from(
            document.querySelectorAll(
              "button, input[type='submit'], [role='button']"
            )
          )
            .filter(button => !isPartOfChatbot(button as HTMLElement))
            .map((button) => {
              const text = (
                (button as HTMLElement).innerText.trim() ||
                button.getAttribute("value") ||
                "No text"
              ).replace(/\s+/g, " ");
              buttonTexts.add(text);
              return {
                text,
                action: button.getAttribute("onclick") || "No direct action",
                path: getElementPath(button as HTMLElement),
              };
            })
            .filter((button) => button.text !== "No text");

          // Process structured text with depth-first leaf node extraction
          const structuredText = Array.from(
            document.body.querySelectorAll(
              "h1, h2, h3, h4, h5, h6, p, label, li, strong, em, span, div, td, th, blockquote, pre, code"
            )
          )
            .filter(el => !isPartOfChatbot(el as HTMLElement))
            .flatMap((el) => {
              const results: Array<{ text: string; path: string }> = [];

              const traverse = (element: Element) => {
                // Skip chatbot elements
                if (isPartOfChatbot(element as HTMLElement)) return;
                
                // Skip elements already processed as buttons
                if (
                  element.matches('button, input[type="submit"], [role="button"]')
                )
                  return;

                // Skip hidden elements
                const style = window.getComputedStyle(element as HTMLElement);
                if (
                  style.display === "none" || 
                  style.visibility === "hidden" || 
                  style.opacity === "0" ||
                  (element as HTMLElement).offsetParent === null
                ) {
                  return;
                }

                // Capture direct text nodes regardless of children
                const directText = Array.from(element.childNodes)
                  .filter(
                    (node) =>
                      node.nodeType === Node.TEXT_NODE &&
                      node.textContent?.trim() &&
                      !buttonTexts.has(node.textContent.trim())
                  )
                  .map((node) => node.textContent?.trim().replace(/\s+/g, " "))
                  .join(" ")
                  .trim();

                if (directText && !extractedTexts.has(directText)) {
                  extractedTexts.add(directText);
                  results.push({
                    text: directText,
                    path: getElementPath(element as HTMLElement),
                  });
                }

                // Continue depth-first traversal
                Array.from(element.children).forEach(traverse);
              };

              traverse(el);
              return results;
            })
            .filter(
              (entry, index, arr) =>
                !arr.some(
                  (e, i) =>
                    i < index &&
                    e.path.startsWith(entry.path) &&
                    e.text.includes(entry.text)
                )
            );

          const links = Array.from(document.querySelectorAll("a[href]"))
            .filter(link => !isPartOfChatbot(link as HTMLElement))
            .map(
              (link) => ({
                text: (link as HTMLAnchorElement).innerText.trim(),
                url: (link as HTMLAnchorElement).href,
                path: getElementPath(link as HTMLElement),
              })
            )
            .filter(link => link.text); // Filter out links without text

          const images = Array.from(document.querySelectorAll("img"))
            .filter(img => !isPartOfChatbot(img as HTMLElement))
            .map(
              (img) => ({
                src: img.src,
                alt: img.alt || "No alt text",
                width: img.width,
                height: img.height,
                path: getElementPath(img),
              })
            );

          const newPageData = {
            url: window.location.href,
            title: document.title,
            structuredText,
            links,
            buttons,
            images,
          };

          setPageData(newPageData);
          
          if (options?.debug) {
            console.log("Updated Page Data:", {
              url: newPageData.url,
              title: newPageData.title,
              textCount: newPageData.structuredText.length,
              linksCount: newPageData.links.length,
              buttonsCount: newPageData.buttons.length,
              imagesCount: newPageData.images.length
            });
          }
        } catch (error) {
          console.error("Error extracting page data:", error);
        } finally {
          updatingRef.current = false;
        }
      }, 300); // Debounce for 300ms
    };

    // Initial extraction
    extractPageData();

    // Track URL changes for SPAs that use history API
    const handleUrlChange = () => {
      if (lastUrlRef.current !== window.location.href) {
        if (options?.debug) {
          console.log("URL change detected:", window.location.href);
        }
        extractPageData();
      }
    };

    // Handle lazy-loaded content with more sensitive mutation detection
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      // Check if mutations are significant enough to trigger an update
      for (const mutation of mutations) {
        // Added/removed nodes
        if (mutation.type === 'childList' && 
            (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          shouldUpdate = true;
          break;
        }
        
        // Text content changes
        if (mutation.type === 'characterData' && 
            mutation.target.nodeType === Node.TEXT_NODE && 
            mutation.target.textContent?.trim()) {
          shouldUpdate = true;
          break;
        }
        
        // Attribute changes that affect visibility
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || 
            mutation.attributeName === 'class' || 
            mutation.attributeName === 'hidden')) {
          shouldUpdate = true;
          break;
        }
      }
      
      if (shouldUpdate) {
        extractPageData();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden']
    });

    // Handle content that loads on scroll
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(extractPageData, 500);
    };

    // Listen for browser navigation events (back/forward buttons)
    const handlePopState = () => {
      if (options?.debug) {
        console.log("Navigation event (popstate):", window.location.href);
      }
      extractPageData();
    };

    // Listen for programmatic navigation via history API
    const handleHistoryChange = () => {
      if (options?.debug) {
        console.log("History API change detected");
      }
      
      // Wait a tick for the URL to update
      setTimeout(handleUrlChange, 0);
    };

    // Override history methods to detect SPA navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(this, arguments as any);
      handleHistoryChange();
    };

    history.replaceState = function() {
      originalReplaceState.apply(this, arguments as any);
      handleHistoryChange();
    };

    // Set up periodic check for URL changes (for client-side routing)
    const urlCheckInterval = setInterval(handleUrlChange, 1000);

    // Install event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleUrlChange);
    document.addEventListener('click', event => {
      // Check for link clicks that might change the page
      const link = (event.target as HTMLElement).closest('a');
      if (link && link.getAttribute('href')) {
        setTimeout(handleUrlChange, 100);
      }
    });

    return () => {
      observer.disconnect();
      clearInterval(urlCheckInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleUrlChange);
      document.removeEventListener('click', handleUrlChange);
      
      // Restore original history methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [options?.debug]);

  return pageData;
}; 