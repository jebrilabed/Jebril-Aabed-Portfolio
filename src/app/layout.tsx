import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jebril-aabed-portfolio.vercel.app"),
  title: {
    default: "Jebril Aabed | Software Developer & AI Integration",
    template: "%s | Jebril Aabed",
  },
  description: "Jebril Aabed - Frontend Developer specializing in React.js, Next.js, and TypeScript, with hands-on experience in RESTful APIs, FastAPI, PostgreSQL, and AI integration (Gemini, LangChain, RAG).",
  keywords: [
    "Software Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "AI Integration",
    "FastAPI",
    "Google Gemini",
    "LangChain",
    "RAG",
    "Tailwind CSS",
    "Web Developer",
    "Portfolio",
    "Jebril Aabed"
  ],
  authors: [{ name: "Jebril Aabed", url: "https://jebril-aabed-portfolio.vercel.app" }],
  creator: "Jebril Aabed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jebril-aabed-portfolio.vercel.app",
    title: "Jebril Aabed | Software Developer & AI Integration",
    description: "Frontend Developer specializing in React.js, Next.js, and TypeScript, with hands-on experience in RESTful APIs, FastAPI, and AI integration (Gemini, LangChain, RAG).",
    siteName: "Jebril Aabed Portfolio",
    images: [
      {
        url: "/projects/protofolio.png",
        width: 1200,
        height: 630,
        alt: "Jebril Aabed - Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jebril Aabed | Software Developer & AI Integration",
    description: "Frontend Developer specializing in React.js, Next.js, and TypeScript, with hands-on experience in RESTful APIs, FastAPI, and AI integration (Gemini, LangChain, RAG).",
    images: ["/projects/protofolio.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jebril-aabed-portfolio.vercel.app",
  },
  verification: {
    google: "google-site-verification-code", // Placeholder for GSC
  },
};

import DevelopmentNotice from "@/components/DevelopmentNotice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased scroll-smooth overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${manrope.variable} ${inter.variable} ${spaceGrotesk.variable} min-h-full flex flex-col bg-background text-foreground overflow-x-hidden`}>
        {/* <DevelopmentNotice /> */}
        {children}
      </body>
    </html>
  );
}
