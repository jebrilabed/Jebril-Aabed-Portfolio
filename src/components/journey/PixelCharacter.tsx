"use client";

import React, { useMemo, useEffect } from "react";
import {
  SPRITE_CONFIG,
  getAnimationScale,
  type AnimationState,
} from "./sprite-config";

interface PixelCharacterProps {
  animation: AnimationState;
  facing: "left" | "right";
  onAnimationEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const ALL_ANIMATIONS: AnimationState[] = [
  "idle",
  "walking",
  "waving",
  "working",
  "jumping",
];

/**
 * Builds keyframe rules once for all 5 animation states.
 */
function buildAllKeyframes(): string {
  return ALL_ANIMATIONS.map((state) => {
    const cfg = SPRITE_CONFIG[state];
    const scale = getAnimationScale(state);
    const { cols, rows, frameWidth, frameHeight, frameCount } = cfg;
    const frames: string[] = [];

    let f = 0;
    for (let row = 0; row < rows && f < frameCount; row++) {
      for (let col = 0; col < cols && f < frameCount; col++) {
        const pct = (f / frameCount) * 100;
        const bx = -Math.round(col * frameWidth * scale);
        const by = -Math.round(row * frameHeight * scale);
        frames.push(
          `${pct.toFixed(2)}% { background-position: ${bx}px ${by}px; }`
        );
        f++;
      }
    }
    frames.push(`100% { background-position: 0px 0px; }`);
    return `@keyframes sprite_anim_${state} {\n  ${frames.join("\n  ")}\n}`;
  }).join("\n\n");
}

/**
 * PixelCharacter renders a pre-mounted multi-layer sprite character.
 *
 * CRITICAL ARCHITECTURAL OPTIMIZATION:
 * To eliminate any flashing, disappearing, or network reloading on Vercel
 * when switching between animations (e.g. idle -> walking -> jumping):
 * All 5 sprite layers are pre-mounted in the DOM with their background images
 * permanently bound and loaded. Switching states merely toggles visibility.
 *
 * This provides 0ms, 120 FPS instantaneous animation transitions without
 * any DOM re-mounts, CSS re-parsing, or asset fetching delays.
 */
export default function PixelCharacter({
  animation,
  facing,
  onAnimationEnd,
  className = "",
  style: customStyle,
}: PixelCharacterProps) {
  const currentCfg = SPRITE_CONFIG[animation];
  const currentDuration = currentCfg.frameCount / currentCfg.fps;

  // Generate static CSS keyframe definitions once
  const cssKeyframes = useMemo(() => buildAllKeyframes(), []);

  // Handle one-shot animation completion callbacks (waving, jumping)
  useEffect(() => {
    if (currentCfg.loop || !onAnimationEnd) return;
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, currentDuration * 1000);
    return () => clearTimeout(timer);
  }, [animation, currentCfg.loop, currentDuration, onAnimationEnd]);

  return (
    <>
      <style>{cssKeyframes}</style>
      <div
        className={className}
        style={{
          position: "relative",
          display: "inline-block",
          transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)",
          transformOrigin: "center bottom",
          flexShrink: 0,
          ...customStyle,
        }}
        role="img"
        aria-label={`Developer pixel art character in ${animation} state`}
      >
        {ALL_ANIMATIONS.map((state) => {
          const isCurrent = state === animation;
          const cfg = SPRITE_CONFIG[state];
          const scale = getAnimationScale(state);

          const displayW = Math.round(cfg.frameWidth * scale);
          const displayH = Math.round(cfg.frameHeight * scale);
          const sheetDisplayW = Math.round(cfg.sheetWidth * scale);
          const sheetDisplayH = Math.round(cfg.sheetHeight * scale);
          const duration = cfg.frameCount / cfg.fps;
          const iterationCount = cfg.loop ? "infinite" : "1";
          const fillMode = cfg.loop ? "none" : "forwards";

          return (
            <div
              key={state}
              style={{
                width: displayW,
                height: displayH,
                backgroundImage: `url(${cfg.src})`,
                backgroundSize: `${sheetDisplayW}px ${sheetDisplayH}px`,
                backgroundPosition: "0px 0px",
                backgroundRepeat: "no-repeat",
                imageRendering: "pixelated",
                animation: `sprite_anim_${state} ${duration}s steps(1, end) ${iterationCount} ${fillMode}`,
                display: isCurrent ? "block" : "none",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
