import type { Metadata } from "next";
import JourneyClient from "./JourneyClient";

export const metadata: Metadata = {
  title: "Interactive Journey | Jebril Aabed",
  description:
    "Explore Jebril Aabed's developer portfolio through an interactive pixel art world. Meet the character, discover projects, skills, and more.",
  openGraph: {
    title: "Pixel Art Developer Journey | Jebril Aabed",
    description:
      "An interactive pixel art experience showcasing Jebril Aabed's skills, projects, and professional background.",
  },
};

export default function JourneyPage() {
  return (
    <>
      {/* Preload all sprite sheets at maximum network priority */}
      <link rel="preload" as="image" href="/sprites/idle.png" />
      <link rel="preload" as="image" href="/sprites/walking.png" />
      <link rel="preload" as="image" href="/sprites/jumping.png" />
      <link rel="preload" as="image" href="/sprites/waving.png" />
      <link rel="preload" as="image" href="/sprites/working.png" />

      <JourneyClient />
    </>
  );
}
