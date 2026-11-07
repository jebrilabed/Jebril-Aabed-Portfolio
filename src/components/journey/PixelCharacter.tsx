"use client";

import React, { useMemo, useId, useEffect } from "react";
import { SPRITE_CONFIG, getAnimationScale, type AnimationState } from "./sprite-config";

interface PixelCharacterProps {
  animation: AnimationState;
  facing: "left" | "right";
  onAnimationEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PixelCharacter renders a sprite-sheet animated character using pure CSS.
 * Each animation state has its own independently configured keyframe animation
 * derived from the exact measured sprite-sheet dimensions.
 *
 * Uses `image-rendering: pixelated` to preserve crisp pixel art.
 * Height is normalized across all sprite sheets to ensure visual consistency.
 */
export default function PixelCharacter({
  animation,
  facing,
  onAnimationEnd,
  className = "",
  style: customStyle,
}: PixelCharacterProps) {
  const uid = useId().replace(/[:]/g, "");
  const cfg = SPRITE_CONFIG[animation];
  const scale = getAnimationScale(animation);

  // Computed display dimensions
  const displayW = Math.round(cfg.frameWidth * scale);
  const displayH = Math.round(cfg.frameHeight * scale);
  const sheetDisplayW = Math.round(cfg.sheetWidth * scale);
  const sheetDisplayH = Math.round(cfg.sheetHeight * scale);

  const keyframeName = `sprite_anim_${animation}_${uid}`;
  const duration = cfg.frameCount / cfg.fps;

  // Build the CSS keyframe sequence using exact scaled pixel offsets
  const keyframes = useMemo(() => {
    const { cols, rows, frameWidth, frameHeight, frameCount } = cfg;
    const frames: string[] = [];

    let f = 0;
    for (let row = 0; row < rows && f < frameCount; row++) {
      for (let col = 0; col < cols && f < frameCount; col++) {
        const pct = (f / frameCount) * 100;
        // Offsets scaled to the CSS backgroundSize
        const bx = -Math.round(col * frameWidth * scale);
        const by = -Math.round(row * frameHeight * scale);
        frames.push(`${pct.toFixed(2)}% { background-position: ${bx}px ${by}px; }`);
        f++;
      }
    }
    // Final keyframe (100%)
    frames.push(`100% { background-position: 0px 0px; }`);
    return frames.join("\n");
  }, [cfg, scale]);

  // Handle animation completion callback for one-shot animations
  useEffect(() => {
    if (cfg.loop || !onAnimationEnd) return;
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [animation, cfg.loop, duration, onAnimationEnd]);

  const iterationCount = cfg.loop ? "infinite" : "1";
  const fillMode = cfg.loop ? "none" : "forwards";

  const charStyle: React.CSSProperties = {
    width: displayW,
    height: displayH,
    backgroundImage: `url(${cfg.src})`,
    backgroundSize: `${sheetDisplayW}px ${sheetDisplayH}px`,
    backgroundPosition: "0px 0px",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
    animation: `${keyframeName} ${duration}s steps(1, end) ${iterationCount} ${fillMode}`,
    transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)",
    transformOrigin: "center bottom",
    flexShrink: 0,
    ...customStyle,
  };

  return (
    <>
      <style>{`
        @keyframes ${keyframeName} {
          ${keyframes}
        }
      `}</style>
      <div
        className={className}
        style={charStyle}
        role="img"
        aria-label={`Developer pixel art character in ${animation} state`}
      />
    </>
  );
}
