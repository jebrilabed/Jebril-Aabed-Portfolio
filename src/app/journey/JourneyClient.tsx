"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SPRITE_URLS = [
  "/sprites/idle.png",
  "/sprites/walking.png",
  "/sprites/jumping.png",
  "/sprites/waving.png",
  "/sprites/working.png",
];

const WorldScene = dynamic(
  () => import("@/components/journey/WorldScene"),
  {
    ssr: false,
    loading: () => <LoadingScreen message="Initializing World..." />,
  }
);

function LoadingScreen({ progress, message }: { progress?: number; message?: string }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background gap-5 z-50">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="absolute text-xl" role="img" aria-label="Game controller">
          🎮
        </span>
      </div>
      <div className="text-center space-y-2">
        <p className="font-label text-xs uppercase tracking-widest text-primary font-bold animate-pulse">
          {message || "Loading Pixel World…"}
        </p>
        {typeof progress === "number" && (
          <div className="w-48 h-2 bg-surface-high rounded-full overflow-hidden border border-outline-variant/30 mx-auto">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function JourneyClient() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;

        const onDone = () => {
          if (!mounted) return;
          loadedCount++;
          setProgress(Math.round((loadedCount / SPRITE_URLS.length) * 100));
          resolve();
        };

        if (img.complete) {
          if ("decode" in img) {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        } else {
          img.onload = () => {
            if ("decode" in img) {
              img.decode().then(onDone).catch(onDone);
            } else {
              onDone();
            }
          };
          img.onerror = onDone;
        }
      });
    };

    // Preload and decode all 5 sprite sheets into GPU memory
    Promise.all(SPRITE_URLS.map(preloadImage)).then(() => {
      if (mounted) {
        setAssetsLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      {assetsLoaded ? (
        <WorldScene />
      ) : (
        <LoadingScreen progress={progress} message="Loading Character Sprites…" />
      )}
    </div>
  );
}
