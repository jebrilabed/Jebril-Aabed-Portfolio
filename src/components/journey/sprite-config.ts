// Sprite sheet configurations — derived from actual measured dimensions
// All values are pixel-exact, verified by pixel analysis.

export type AnimationState = "idle" | "walking" | "waving" | "working" | "jumping";

export interface SpriteConfig {
  /** Path relative to /public */
  src: string;
  /** Total sprite sheet width in px */
  sheetWidth: number;
  /** Total sprite sheet height in px */
  sheetHeight: number;
  /** Number of columns */
  cols: number;
  /** Number of rows */
  rows: number;
  /** Computed frame width */
  frameWidth: number;
  /** Computed frame height */
  frameHeight: number;
  /** Total number of frames */
  frameCount: number;
  /** Animation speed in frames-per-second */
  fps: number;
  /** Whether the animation loops */
  loop: boolean;
  /** Target visual height in world pixels to ensure character size consistency */
  visualHeight: number;
}

/**
 * EXACT MEASURED SPRITE SHEET DATA
 *
 *  idle.png     2138 × 736   → 4 cols × 1 row  = 534.5 × 736 per frame (4 frames)  [Transparent]
 *  walking.png  1536 × 1024  → 4 cols × 2 rows = 384   × 512 per frame (8 frames)  [Transparent]
 *  waving.png   2172 × 724   → 6 cols × 1 row  = 362   × 724 per frame (6 frames)  [Transparent]
 *  working.png  2172 × 724   → 6 cols × 1 row  = 362   × 724 per frame (6 frames)  [Transparent]
 *  jumping.png  2109 × 746   → 6 cols × 1 row  = 351.5 × 746 per frame (6 frames)  [Transparent]
 */
export const TARGET_CHARACTER_HEIGHT = 124;

export const SPRITE_CONFIG: Record<AnimationState, SpriteConfig> = {
  idle: {
    src: "/sprites/idle.png",
    sheetWidth: 2138,
    sheetHeight: 736,
    cols: 4,
    rows: 1,
    frameWidth: 2138 / 4, // 534.5
    frameHeight: 736,
    frameCount: 4,
    fps: 5,
    loop: true,
    visualHeight: TARGET_CHARACTER_HEIGHT,
  },
  walking: {
    src: "/sprites/walking.png",
    sheetWidth: 1536,
    sheetHeight: 1024,
    cols: 4,
    rows: 2,
    frameWidth: 1536 / 4, // 384
    frameHeight: 1024 / 2, // 512
    frameCount: 8,
    fps: 9,
    loop: true,
    visualHeight: TARGET_CHARACTER_HEIGHT,
  },
  waving: {
    src: "/sprites/waving.png",
    sheetWidth: 2172,
    sheetHeight: 724,
    cols: 6,
    rows: 1,
    frameWidth: 2172 / 6, // 362
    frameHeight: 724,
    frameCount: 6,
    fps: 7,
    loop: false,
    visualHeight: TARGET_CHARACTER_HEIGHT,
  },
  working: {
    src: "/sprites/working.png",
    sheetWidth: 2172,
    sheetHeight: 724,
    cols: 6,
    rows: 1,
    frameWidth: 2172 / 6, // 362
    frameHeight: 724,
    frameCount: 6,
    fps: 6,
    loop: true,
    visualHeight: TARGET_CHARACTER_HEIGHT,
  },
  jumping: {
    src: "/sprites/jumping.png",
    sheetWidth: 2109,
    sheetHeight: 746,
    cols: 6,
    rows: 1,
    frameWidth: 2109 / 6, // 351.5
    frameHeight: 746,
    frameCount: 6,
    fps: 8,
    loop: false,
    visualHeight: TARGET_CHARACTER_HEIGHT,
  },
};

/** Returns the display scale factor for an animation to match the target visual height */
export function getAnimationScale(state: AnimationState): number {
  const cfg = SPRITE_CONFIG[state];
  return cfg.visualHeight / cfg.frameHeight;
}

/** Returns the CSS animation duration in ms for a full cycle */
export function getAnimationDuration(state: AnimationState): number {
  const cfg = SPRITE_CONFIG[state];
  return (cfg.frameCount / cfg.fps) * 1000;
}
