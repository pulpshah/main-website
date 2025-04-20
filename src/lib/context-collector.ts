"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface ContextChunk {
  id: string;
  text: string;
  tagName?: string;
  path?: string;
}

export interface ContextPayload {
  url: string;
  visibleTextChunks: ContextChunk[];
  hoveredText: string | null;
  selectedText: string | null;
  clickedElement: string | null;
}

export function useContextCollector(options: {
  enabled: boolean;
  onContextUpdate?: (context: ContextPayload) => void;
  debug?: boolean;
}) {
  const [context, setContext] = useState<ContextPayload>({
    url: "",
    visibleTextChunks: [],
    hoveredText: null,
    selectedText: null,
    clickedElement: null,
  });
  
  // Use refs to store intermediate state without causing re-renders
  const contextRef = useRef<ContextPayload>(context);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingRef = useRef(false);
  
  // Refs for DOM tracking to prevent re-renders
  const observedElementsRef = useRef(new Map<string, HTMLElement>());
  const visibleElementsRef = useRef(new Set<string>());
  const isScanningRef = useRef(false);

  // Throttled context update to prevent excessive renders
  const updateContext = useCallback(
    (updates: Partial<ContextPayload>) => {
      // Update the ref immediately (no re-render)
      contextRef.current = { ...contextRef.current, ...updates };
      
      // Debounce the actual state update to prevent frequent re-renders
      if (!isUpdatingRef.current) {
        isUpdatingRef.current = true;
        
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        
        updateTimeoutRef.current = setTimeout(() => {
          setContext(contextRef.current);
          options.onContextUpdate?.(contextRef.current);
          isUpdatingRef.current = false;
        }, 300); // Throttle to max 1 update per 300ms
      }
    },
    [options] // Only depend on options to avoid re-creating function on every render
  );

  // Process text to ensure proper formatting
  const processText = useCallback((text: string): string => {
    if (!text) return "";
    
    // Add spaces between sentences if missing
    let processed = text.replace(/\.([A-Z])/g, '. $1');
    
    // Add space after headings or between title case words
    processed = processed.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Clean up multiple spaces
    processed = processed.replace(/\s+/g, ' ').trim();
    
    return processed;
  }, []);

  // Get element path for better context
  const getElementPath = useCallback((element: HTMLElement): string => {
    const path: string[] = [];
    let currentElement: HTMLElement | null = element;
    
    while (currentElement && currentElement !== document.body) {
      const tagName = currentElement.tagName.toLowerCase();
      const id = currentElement.id ? `#${currentElement.id}` : '';
      const classes = Array.from(currentElement.classList).map(c => `.${c}`).join('');
      
      path.unshift(tagName + id + classes);
      currentElement = currentElement.parentElement;
    }
    
    return path.join(' > ');
  }, []);

  // Check if element is part of the chatbot UI
  const isPartOfChatbot = useCallback((element: HTMLElement): boolean => {
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
    
    return false;
  }, []);

  // Extract meaningful text from an element
  const extractMeaningfulText = useCallback((element: HTMLElement): string | null => {
    // Skip chatbot UI elements
    if (isPartOfChatbot(element)) {
      return null;
    }
    
    // Skip invisible elements
    const style = window.getComputedStyle(element);
    if (
      style.display === "none" || 
      style.visibility === "hidden" || 
      style.opacity === "0" ||
      element.offsetParent === null
    ) {
      return null;
    }
    
    // Skip elements with no text
    const text = element.textContent?.trim();
    if (!text) return null;
    
    // Skip very short text if not a heading
    const isHeading = /^h[1-6]$/i.test(element.tagName);
    if (text.length < 5 && !isHeading) return null;
    
    // Get only direct text node content if element has children
    if (element.children.length > 0) {
      let directText = '';
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          directText += node.textContent?.trim() + ' ';
        }
      }
      
      directText = directText.trim();
      
      // If there's meaningful direct text, return it
      if (directText.length > 5) {
        return processText(directText);
      }
      
      // Otherwise return the full text from all children
      return processText(text);
    }
    
    // For leaf nodes, return their text content
    return processText(text);
  }, [processText, isPartOfChatbot]);

  // Initialize context collection
  useEffect(() => {
    if (!options.enabled) return;

    // Store references to avoid re-creating functions in the dependency array
    const processTextFn = processText;
    const getElementPathFn = getElementPath;
    const isPartOfChatbotFn = isPartOfChatbot;
    const extractMeaningfulTextFn = extractMeaningfulText;
    
    const url = window.location.pathname;
    updateContext({ url });

    // Get our refs for easier access
    const observedElements = observedElementsRef.current;
    const visibleElements = visibleElementsRef.current;

    // Process visible elements without causing re-renders for each change
    const processVisibleElements = () => {
      const visibleTextChunks = Array.from(visibleElements)
        .map((id) => {
          const element = observedElements.get(id);
          if (!element) return null;
          
          const text = extractMeaningfulTextFn(element);
          if (!text) return null;
          
          return { 
            id, 
            text, 
            tagName: element.tagName.toLowerCase(),
            path: getElementPathFn(element)
          };
        })
        .filter(Boolean) as ContextChunk[];

      // Remove duplicate text chunks
      const uniqueTexts = new Map<string, ContextChunk>();
      visibleTextChunks.forEach(chunk => {
        if (!uniqueTexts.has(chunk.text)) {
          uniqueTexts.set(chunk.text, chunk);
        }
      });

      // Only update if we have changes
      const chunks = Array.from(uniqueTexts.values());
      if (chunks.length !== contextRef.current.visibleTextChunks.length || 
          JSON.stringify(chunks) !== JSON.stringify(contextRef.current.visibleTextChunks)) {
        updateContext({ visibleTextChunks: chunks });
        
        if (options.debug) {
          console.log("Visible Text Chunks:", chunks);
        }
      }
    };

    // Create a more sensitive observer for lazy-loaded content
    const observer = new IntersectionObserver(
      (entries) => {
        let hasChanges = false;

        entries.forEach((entry) => {
          const id = entry.target.id || `element-${Math.random().toString(36).substr(2, 9)}`;
          
          if (entry.isIntersecting) {
            visibleElements.add(id);
            hasChanges = true;
          } else if (visibleElements.has(id)) {
            visibleElements.delete(id);
            hasChanges = true;
          }
        });

        if (hasChanges) {
          processVisibleElements();
        }
      },
      { 
        // Use a lower threshold to detect elements earlier
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        // Include root margin to detect elements before they enter viewport
        rootMargin: "200px 0px 200px 0px" 
      }
    );

    // Function to scan for new elements and observe them
    const scanForNewElements = (rootElement: Document | HTMLElement = document) => {
      if (isScanningRef.current) return;
      isScanningRef.current = true;

      // Observe semantically important elements first
      const semanticSelectors = [
        // Key content elements
        "article", "section", "header", "footer", "nav",
        // Headings
        "h1", "h2", "h3", "h4", "h5", "h6",
        // Content blocks
        "p", "blockquote", "pre", "ul", "ol", "li", "dl", "dt", "dd",
        // Inline elements with importance
        "a", "button", "label", "input[type=button]", "input[type=submit]"
      ].join(", ");
      
      // Additional elements to observe
      const additionalSelectors = "div, span";

      try {
        // Get semantic elements first
        const semanticElements = rootElement.querySelectorAll(semanticSelectors);
        semanticElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            // Skip elements that are part of the chatbot UI
            if (isPartOfChatbotFn(element)) return;
            
            // Skip already observed elements
            if (element.id && observedElements.has(element.id)) return;
            
            const text = extractMeaningfulTextFn(element);
            if (!text) return;
            
            const id = element.id || `element-${Math.random().toString(36).substr(2, 9)}`;
            if (!element.id) element.id = id;
            
            observedElements.set(id, element);
            observer.observe(element);
          }
        });
        
        // Then get additional elements that might contain content
        const additionalElements = rootElement.querySelectorAll(additionalSelectors);
        additionalElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            // Skip elements that are part of the chatbot UI
            if (isPartOfChatbotFn(element)) return;
            
            // Skip already observed elements
            if (element.id && observedElements.has(element.id)) return;
            
            const text = extractMeaningfulTextFn(element);
            if (!text) return;
            
            const id = element.id || `element-${Math.random().toString(36).substr(2, 9)}`;
            if (!element.id) element.id = id;
            
            // Don't re-observe elements
            if (!observedElements.has(id)) {
              observedElements.set(id, element);
              observer.observe(element);
            }
          }
        });
      } catch (e) {
        console.error("Error scanning for elements:", e);
      } finally {
        isScanningRef.current = false;
      }
    };

    // Initial scan
    scanForNewElements();

    // Debounced scroll handler for lazy-loaded content
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scanForNewElements();
      }, 300); // Debounce scroll events
    };

    // Track user selection with debounce
    let selectionTimeout: NodeJS.Timeout;
    const handleSelection = () => {
      clearTimeout(selectionTimeout);
      selectionTimeout = setTimeout(() => {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim() || null;
        if (selectedText && selectedText !== contextRef.current.selectedText) {
          updateContext({ selectedText: processTextFn(selectedText) });
        }
      }, 300);
    };

    // Track hover events (with debounce)
    let hoverTimeout: NodeJS.Timeout;
    const handleHover = (e: MouseEvent) => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        if (e.target instanceof HTMLElement) {
          // Skip if hovering over chatbot elements
          if (isPartOfChatbotFn(e.target)) return;
          
          const hoveredText = extractMeaningfulTextFn(e.target);
          if (hoveredText && hoveredText !== contextRef.current.hoveredText) {
            updateContext({ hoveredText });
          }
        }
      }, 300); // 300ms debounce
    };

    // Track click events
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        // Skip if clicking on chatbot elements
        if (isPartOfChatbotFn(e.target)) return;
        
        const selector = e.target.id 
          ? `#${e.target.id}` 
          : e.target.className 
            ? `.${e.target.className.split(" ").join(".")}`
            : e.target.tagName.toLowerCase();
        
        const clickedText = extractMeaningfulTextFn(e.target);
        
        // Only update if different from current
        if (selector !== contextRef.current.clickedElement || 
            (clickedText && clickedText !== contextRef.current.selectedText)) {
          updateContext({ 
            clickedElement: selector,
            ...(clickedText && { selectedText: clickedText })
          });
        }
        
        // Scan for new elements after click (might trigger lazy load)
        setTimeout(() => scanForNewElements(), 500);
      }
    };

    // Enhanced mutation observer for lazy-loaded content
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewContent = false;
      const targetNodes: Node[] = [];
      
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hasNewContent = true;
          
          // Collect added nodes for targeted scanning
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              targetNodes.push(node);
            }
          });
        }
      });
      
      if (hasNewContent) {
        // Use a timeout to batch multiple mutations together
        setTimeout(() => {
          // Prioritize scanning new nodes directly
          targetNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              scanForNewElements(node);
            }
          });
          
          // Fallback to full scan if needed
          if (targetNodes.length === 0) {
            scanForNewElements();
          }
        }, 100);
      }
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden']
    });

    // Set up periodic scanning for lazy-loaded content with lower frequency
    const periodicScanInterval = setInterval(() => {
      scanForNewElements();
    }, 5000); // Scan every 5 seconds instead of 3

    // Listen for scroll events to detect lazy-loaded content
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener("selectionchange", handleSelection);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearInterval(periodicScanInterval);
      clearTimeout(scrollTimeout);
      clearTimeout(hoverTimeout);
      clearTimeout(selectionTimeout);
      
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener("selectionchange", handleSelection);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("click", handleClick);
    };
  }, [options.enabled, options.debug]); // Only re-run when enabled or debug changes

  return context;
} 