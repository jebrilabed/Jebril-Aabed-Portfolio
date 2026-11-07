"use client";

import dynamic from "next/dynamic";

const WorldScene = dynamic(
  () => import("@/components/journey/WorldScene"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant animate-pulse">
          Loading world…
        </p>
      </div>
    ),
  }
);

export default function JourneyClient() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <WorldScene />
    </div>
  );
}

