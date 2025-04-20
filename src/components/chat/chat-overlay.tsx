"use client";

import { Suspense } from "react";
import { Chatbot } from "./chatbot";

interface ChatOverlayProps {
  initialMessage?: string;
}

export function ChatOverlay({ initialMessage }: ChatOverlayProps) {
  return (
    <Suspense fallback={null}>
      <Chatbot initialMessage={initialMessage} />
    </Suspense>
  );
} 