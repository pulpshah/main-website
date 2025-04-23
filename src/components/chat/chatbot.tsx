"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Bot, User, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate session IDs
import { getPostHogDistinctId } from "@/components/PostHogProvider";

// Define interfaces for component props
interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface TableProps {
  children?: React.ReactNode;
}

interface ChatbotProps {
  initialMessage?: string;
}

// Interface for storing messages in Neo4j
interface ChatMessageStorage {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  previousMessageId?: string;
  distinctId?: string; // Add PostHog distinctId
}

// Interface for chat message
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
}

export function Chatbot({ initialMessage = "Hi there! How can I help you today?" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [storedMessageIds, setStoredMessageIds] = useState<Set<string>>(new Set());
  
  // Generate a session ID when the component mounts
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    status,
    reload,
    stop
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "initial",
        content: initialMessage,
        role: "assistant",
      }
    ],
    onError: () => {
      setHasError(true);
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Store chat messages in Neo4j when new messages are added
  useEffect(() => {
    const storeMessage = async (message: ChatMessage) => {
      try {
        // Skip storing the initial assistant message, system/data messages, or already stored messages
        if (
          message.id === "initial" || 
          (message.role !== 'user' && message.role !== 'assistant') || 
          storedMessageIds.has(message.id)
        ) return;
        
        // Get PostHog distinctId
        const distinctId = getPostHogDistinctId();
        
        // Prepare message data for storage
        const messageData: ChatMessageStorage = {
          sessionId,
          role: message.role, // Now we know this is either 'user' or 'assistant'
          content: message.content,
          previousMessageId: lastMessageId || undefined,
          distinctId // Add distinctId to the request
        };
        
        // Send message to storage API
        const response = await fetch('/api/chat-storage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Update the last message ID for linking in the chain
          setLastMessageId(result.messageId);
          // Mark this message as stored
          setStoredMessageIds(prev => new Set([...prev, message.id]));
        } else {
          console.error('Failed to store chat message:', result.error);
        }
      } catch (error) {
        console.error('Error storing chat message:', error);
      }
    };
    
    // Get the latest message
    const latestMessage = messages[messages.length - 1];
    
    // Store messages in both "ready" state (after AI response) and when user messages are "submitted"
    if ((status === "ready" || status === "submitted") && latestMessage && sessionId && !storedMessageIds.has(latestMessage.id)) {
      storeMessage(latestMessage);
    }
  }, [status, messages, sessionId, lastMessageId, storedMessageIds]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);
    handleChatSubmit(e);
  };

  const handleRetry = () => {
    setHasError(false);
    reload();
  };
  
  // Store initial assistant message when chat is first opened
  useEffect(() => {
    if (isOpen && sessionId && messages.length === 1 && messages[0].id === "initial" && !lastMessageId && !storedMessageIds.has("initial")) {
      const storeInitialMessage = async () => {
        try {
          // Get PostHog distinctId
          const distinctId = getPostHogDistinctId();
          
          const messageData: ChatMessageStorage = {
            sessionId,
            role: 'assistant',
            content: initialMessage,
            distinctId // Add distinctId to the request
          };
          
          const response = await fetch('/api/chat-storage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
          
          const result = await response.json();
          
          if (result.success) {
            setLastMessageId(result.messageId);
            setStoredMessageIds(prev => new Set([...prev, "initial"]));
          }
        } catch (error) {
          console.error('Error storing initial message:', error);
        }
      };
      
      storeInitialMessage();
    }
  }, [isOpen, sessionId, initialMessage, messages, lastMessageId, storedMessageIds]);
  
  return (
    <>
      {/* Chatbot toggle button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-0 shadow-lg hover:from-purple-700 hover:to-pink-600 z-50 transition-all duration-300 ease-in-out",
          !isOpen && "pulse-animation"
        )}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      
      {/* Chat overlay */}
      <div 
        className={cn(
          "fixed bottom-24 right-6 flex flex-col rounded-lg bg-zinc-900/95 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out z-50 border border-zinc-800",
          "md:h-[500px] md:w-[350px]", // Desktop size
          "h-[70vh] w-[calc(100%-3rem)]", // Mobile size
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-gradient-to-r from-purple-600 to-pink-500 p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-white" />
            <h3 className="font-medium text-white">AI Assistant</h3>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-zinc-100 hover:bg-purple-700/50 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 items-start",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div 
                className={cn(
                  "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                  message.role === "user" 
                    ? "bg-gradient-to-r from-purple-600 to-pink-500" 
                    : "bg-green-700"
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "flex max-w-[80%] flex-col rounded-lg p-3",
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-tr-none"
                    : "bg-zinc-800 text-zinc-100 rounded-tl-none"
                )}
              >
                <div className={cn("text-sm markdown-content", message.role === "user" ? "user-markdown" : "assistant-markdown")}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      a: ({...props}) => <a className="underline" {...props} />,
                      ul: ({...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
                      ol: ({...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                      li: ({...props}) => <li className="mb-1" {...props} />,
                      code: ({inline, className, ...props}: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return inline ? (
                          <code className="px-1 py-0.5 rounded text-xs" {...props} />
                        ) : (
                          <code className={cn(
                            "block p-2 rounded text-xs my-2 overflow-x-auto",
                            match && `language-${match[1]}`
                          )} {...props} />
                        );
                      },
                      pre: ({...props}) => <pre className="p-2 rounded my-2 overflow-x-auto" {...props} />,
                      h1: ({...props}) => <h1 className="text-base font-semibold mt-3 mb-2" {...props} />,
                      h2: ({...props}) => <h2 className="text-base font-semibold mt-3 mb-2" {...props} />,
                      h3: ({...props}) => <h3 className="text-sm font-semibold mt-2 mb-1" {...props} />,
                      blockquote: ({...props}) => <blockquote className="border-l-2 pl-2 italic my-2" {...props} />,
                      table: ({...props}: TableProps) => <table className="w-full text-left border-collapse" {...props} />,
                      thead: ({...props}) => <thead {...props} />,
                      tbody: ({...props}) => <tbody {...props} />,
                      tr: ({...props}) => <tr {...props} />,
                      th: ({...props}) => <th className="p-2" {...props} />,
                      td: ({...props}) => <td className="p-2" {...props} />
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {status === "submitted" && (
            <div className="flex gap-2 items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-700 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex max-w-[80%] flex-col rounded-lg p-3 bg-zinc-800 text-zinc-100 rounded-tl-none">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          {hasError && (
            <div className="flex gap-2 items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col space-y-2 max-w-[80%]">
                <div className="rounded-lg p-3 bg-red-600/20 text-red-300 border border-red-600/30 rounded-tl-none">
                  <p className="text-sm">Sorry, there was an error processing your request.</p>
                </div>
                <Button 
                  className="self-start text-xs bg-red-600/30 hover:bg-red-600/50 text-red-300"
                  size="sm"
                  onClick={handleRetry}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <form onSubmit={onSubmit} className="border-t border-zinc-800 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-zinc-700 resize-none min-h-[40px] max-h-[120px]"
                disabled={status === "streaming"}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim()) {
                      onSubmit(e);
                    }
                  }
                }}
                style={{ overflow: 'auto' }}
              />
              {status === "submitted" ? (
                <Button
                  type="button"
                  size="icon"
                  onClick={() => stop()}
                  className="h-10 w-10 rounded-full bg-red-600 p-0 hover:bg-red-700 transition-all duration-300"
                  aria-label="Stop generating"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon"
                  disabled={status === "streaming" || !input.trim()}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 p-0 hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
} 