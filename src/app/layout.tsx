import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulp",
  description: "Pulp turns intelligence into action. From messaging that persuades to insights that predict, our AI adapts to the way you think, work, and engage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden" style={{ maxWidth: "100vw" }} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden`}
        style={{ maxWidth: "100vw" }}
        suppressHydrationWarning
      >
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
