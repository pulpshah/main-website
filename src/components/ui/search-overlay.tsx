'use client';

import { useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Validate environment variables
if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
  throw new Error('Missing NEXT_PUBLIC_ALGOLIA_APP_ID environment variable');
}

if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY environment variable');
}

if (!process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME) {
  throw new Error('Missing NEXT_PUBLIC_ALGOLIA_INDEX_NAME environment variable');
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

interface Hit {
  title: string;
  description: string;
}

const Hit = ({ hit }: { hit: Hit }) => (
  <div>
    <h3 className="font-bold text-black">{hit.title}</h3>
    <p className="text-sm text-black">{hit.description}</p>
  </div>
);

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when search is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Create portal content
  const overlayContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="relative h-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Search container */}
            <div className="max-w-3xl mx-auto pt-20 px-4">
              <InstantSearch 
                searchClient={searchClient} 
                indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
              >
                <div className="space-y-8">
                  {/* Search input */}
                  <SearchBox 
                    placeholder="Search anything..."
                    classNames={{
                      root: "w-full",
                      form: "w-full",
                      input: "w-full bg-transparent border-none text-4xl text-white placeholder-zinc-500 focus:outline-none focus:ring-0",
                      submit: "hidden",
                      reset: "hidden"
                    }}
                    ref={inputRef}
                  />

                  {/* Search results */}
                  <div className="mt-8">
                    <Hits 
                      hitComponent={Hit}
                      classNames={{
                        root: "w-full",
                        list: "space-y-2",
                        item: "w-full"
                      }}
                    />
                  </div>
                </div>
              </InstantSearch>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to render at document body level
  if (typeof window !== 'undefined') {
    return createPortal(overlayContent, document.body);
  }

  return null;
}