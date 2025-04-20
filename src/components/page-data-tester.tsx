"use client";

import { useState, useEffect, useRef } from "react";
import { usePageData } from "@/lib/page-data-collector";
import { Button } from "@/components/ui/button";
import { X, RotateCw, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageDataTester() {
  const [isOpen, setIsOpen] = useState(false);
  const pageData = usePageData({ debug: true });
  const [activeTab, setActiveTab] = useState<'text' | 'links' | 'buttons' | 'images'>('text');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [updateCount, setUpdateCount] = useState(0);
  const previousDataRef = useRef(pageData);

  // Track changes in page data
  useEffect(() => {
    // Check if the data has meaningfully changed
    const hasChanged = JSON.stringify(previousDataRef.current) !== JSON.stringify(pageData);
    
    if (hasChanged) {
      setLastUpdate(new Date());
      setUpdateCount(prev => prev + 1);
      previousDataRef.current = pageData;
    }
  }, [pageData]);

  // Format the timestamp
  const formattedLastUpdate = lastUpdate.toLocaleTimeString();

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 to-green-500 p-0 shadow-lg hover:from-amber-600 hover:to-green-600 z-40"
        aria-label="Open page data tester"
        data-testid="page-data-tester"
      >
        <span className="text-2xl font-bold">PD</span>
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-900/95 backdrop-blur-sm p-4 overflow-hidden z-40 flex flex-col PageDataTester" data-testid="page-data-tester">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Page Data Collector</h2>
        <div className="flex items-center gap-2">
          <div className="text-xs text-zinc-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Last updated: {formattedLastUpdate}</span>
            <span className="ml-1 bg-zinc-800 px-1.5 py-0.5 rounded-full text-[10px]">
              {updateCount} {updateCount === 1 ? 'update' : 'updates'}
            </span>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-zinc-300 hover:bg-zinc-800 hover:text-white"
            aria-label="Close page data tester"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="bg-zinc-800/70 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Page</h3>
            <p className="text-sm text-zinc-400 truncate">{pageData.url}</p>
            <p className="text-sm text-zinc-400">Title: {pageData.title}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-green-400 text-right">Text:</div>
              <div className="text-white">{pageData.structuredText.length}</div>
              <div className="text-amber-400 text-right">Links:</div>
              <div className="text-white">{pageData.links.length}</div>
              <div className="text-purple-400 text-right">Buttons:</div>
              <div className="text-white">{pageData.buttons.length}</div>
              <div className="text-blue-400 text-right">Images:</div>
              <div className="text-white">{pageData.images.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        <Button
          variant={activeTab === 'text' ? 'default' : 'outline'}
          onClick={() => setActiveTab('text')}
          className={cn(
            "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
            activeTab === 'text' && "bg-green-800 hover:bg-green-700"
          )}
        >
          Text ({pageData.structuredText.length})
        </Button>
        <Button
          variant={activeTab === 'links' ? 'default' : 'outline'}
          onClick={() => setActiveTab('links')}
          className={cn(
            "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
            activeTab === 'links' && "bg-amber-800 hover:bg-amber-700"
          )}
        >
          Links ({pageData.links.length})
        </Button>
        <Button
          variant={activeTab === 'buttons' ? 'default' : 'outline'}
          onClick={() => setActiveTab('buttons')}
          className={cn(
            "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
            activeTab === 'buttons' && "bg-purple-800 hover:bg-purple-700"
          )}
        >
          Buttons ({pageData.buttons.length})
        </Button>
        <Button
          variant={activeTab === 'images' ? 'default' : 'outline'}
          onClick={() => setActiveTab('images')}
          className={cn(
            "bg-zinc-800 hover:bg-zinc-700 text-zinc-200",
            activeTab === 'images' && "bg-blue-800 hover:bg-blue-700"
          )}
        >
          Images ({pageData.images.length})
        </Button>
      </div>

      {pageData[activeTab === 'text' ? 'structuredText' : activeTab].length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-zinc-500 text-center">
            <RotateCw className="h-8 w-8 mb-2 mx-auto animate-spin" />
            <p>No {activeTab} found on this page</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          {activeTab === 'text' && (
            <div className="space-y-2">
              {pageData.structuredText.map((item, index) => (
                <div key={index} className="bg-zinc-800 p-3 rounded-lg">
                  <p className="text-zinc-200">{item.text}</p>
                  <p className="text-xs text-zinc-500 truncate mt-1">{item.path}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-2">
              {pageData.links.map((link, index) => (
                <div key={index} className="bg-zinc-800 p-3 rounded-lg">
                  <p className="text-amber-400">{link.text}</p>
                  <p className="text-xs text-zinc-400 break-all">{link.url}</p>
                  <p className="text-xs text-zinc-500 truncate mt-1">{link.path}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'buttons' && (
            <div className="space-y-2">
              {pageData.buttons.map((button, index) => (
                <div key={index} className="bg-zinc-800 p-3 rounded-lg">
                  <p className="text-purple-400">{button.text}</p>
                  <p className="text-xs text-zinc-400">{button.action}</p>
                  <p className="text-xs text-zinc-500 truncate mt-1">{button.path}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-2">
              {pageData.images.map((image, index) => (
                <div key={index} className="bg-zinc-800 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-zinc-700 flex items-center justify-center overflow-hidden rounded">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="max-w-full max-h-full object-contain"
                        width={image.width}
                        height={image.height}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-400">{image.alt}</p>
                      <p className="text-xs text-zinc-400">{image.width}x{image.height}</p>
                      <p className="text-xs text-zinc-500 truncate mt-1">{image.path}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 