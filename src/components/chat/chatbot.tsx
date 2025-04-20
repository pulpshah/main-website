"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare, Bot, User, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useChat } from '@ai-sdk/react'

interface ChatbotProps {
  initialMessage?: string;
}

export function Chatbot({ initialMessage = "Hi there! How can I help you today?" }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);
    handleChatSubmit(e);
  };

  const handleRetry = () => {
    setHasError(false);
    reload();
  };
  
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
          "fixed bottom-24 right-6 flex h-[500px] w-[350px] flex-col rounded-lg bg-zinc-900/95 backdrop-blur-sm shadow-xl transition-all duration-300 ease-in-out z-50 border border-zinc-800",
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
                <p className="text-sm">{message.content}</p>
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
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 rounded-full bg-zinc-800 px-4 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-zinc-700"
              disabled={status === "streaming"}
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
        </form>
      </div>
    </>
  );
} 