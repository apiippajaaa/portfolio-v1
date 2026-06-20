import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/layouts/background/Background";
import Navbar from "@/components/layouts/navbar/Navbar";
import ChatWithAi from "@/components/ai/ChatWithAi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Nur Afif Misbahuddin",
  description: "Portfolio of Nur Afif Misbahuddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="overflow-x-hidden">
        <div className="relative min-h-dvh overflow-x-hidden">
          <Background />
          <Navbar />
          <main>{children}</main>
        </div>
        <ChatWithAi />
      </body>
    </html>
  );
}
