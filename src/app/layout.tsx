import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Mario Bros - Classic Platformer Game",
  description: "Play the classic Super Mario Bros platformer game in your browser. Jump, collect coins, defeat enemies, and save the princess!",
  keywords: "mario, platformer, game, retro, classic, nintendo, browser game",
  authors: [{ name: "Super Mario Game Dev" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#5C94FC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Super Mario Bros" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="Super Mario Bros - Classic Platformer Game" />
        <meta property="og:description" content="Play the classic Super Mario Bros platformer game in your browser" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/mario-og-image.png" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 min-h-screen overflow-hidden`}>
        <div className="relative w-full h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <main className="relative z-10 w-full h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}