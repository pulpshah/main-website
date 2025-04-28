import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatOverlay } from "@/components/chat/chat-overlay";
import { PageDataTester } from "@/components/page-data-tester";
import "./force-dark-mode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulp",
  description:
    "Pulp is the AI-powered platform for full-cycle communications and engagement strategy. Unlock deep audience insights, optimize messaging, and drive impact with real-time data, NLP, and interaction design. Elevate your strategy with adaptive AI for personal, commercial, and civic applications.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ maxWidth: "100vw" }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-background text-foreground overflow-x-hidden`}
        style={{ maxWidth: "100vw" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          <PageDataTester />

          <main className="overflow-x-hidden max-w-[1920px]">{children}</main>
          <Footer />
          <ChatOverlay initialMessage="Welcome to Pulp! How can I help you today?" />
        </ThemeProvider>
      </body>
    </html>
  );
}
