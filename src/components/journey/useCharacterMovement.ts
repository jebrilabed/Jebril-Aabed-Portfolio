"use client";

import { useEffect, useRef, useCallback } from "react";
import type { AnimationState } from "./sprite-config";
import { retroAudio } from "./retroAudio";

export interface CharacterState {
  x: number;
  y: number;
  facing: "left" | "right";
  animation: AnimationState;
  isJumping: boolean;
  isWaving: boolean;
  isWorking: boolean;
}

interface UseCharacterMovementProps {
  worldWidth: number;
  characterWidth: number;
  groundY: number;
  onStateChange: (state: CharacterState) => void;
  disabled?: boolean;
  reducedMotion?: boolean;
}

const MOVE_SPEED = 4.2;
const JUMP_FORCE = -11.5;
const GRAVITY = 0.68;
const WAVE_DURATION = 900; // ms (6 frames @ 7fps ≈ 857ms)

export function useCharacterMovement({
  worldWidth,
  characterWidth,
  groundY,
  onStateChange,
  disabled = false,
  reducedMotion = false,
}: UseCharacterMovementProps) {
  const keysRef = useRef<Set<string>>(new Set());
  const targetXRef = useRef<number | null>(null);

  const stateRef = useRef<CharacterState>({
    x: 120,
    y: groundY,
    facing: "right",
    animation: "idle",
    isJumping: false,
    isWaving: false,
    isWorking: false,
  });

  const velYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const waveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getState = useCallback(() => stateRef.current, []);

  // Click-to-move handler
  const moveTo = useCallback((targetX: number) => {
    if (stateRef.current.isWaving) return;
    if (stateRef.current.isWorking) {
      stateRef.current.isWorking = false;
    }
    const clamped = Math.max(20, Math.min(worldWidth - characterWidth - 20, targetX));
    targetXRef.current = clamped;
  }, [worldWidth, characterWidth]);

  const startWave = useCallback(() => {
    if (stateRef.current.isWaving || stateRef.current.isJumping || stateRef.current.isWorking) return;
    targetXRef.current = null;
    retroAudio.playWave();

    stateRef.current = { ...stateRef.current, isWaving: true, animation: "waving" };
    onStateChange({ ...stateRef.current });

    if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    waveTimerRef.current = setTimeout(() => {
      if (stateRef.current.isWaving) {
        stateRef.current = { ...stateRef.current, isWaving: false, animation: "idle" };
        onStateChange({ ...stateRef.current });
      }
    }, WAVE_DURATION);
  }, [onStateChange]);

  const triggerJump = useCallback(() => {
    if (stateRef.current.isJumping || stateRef.current.isWaving || stateRef.current.isWorking) return;
    if (reducedMotion) return;
    retroAudio.playJump();

    stateRef.current = { ...stateRef.current, isJumping: true, animation: "jumping" };
    velYRef.current = JUMP_FORCE;
    onStateChange({ ...stateRef.current });
  }, [onStateChange, reducedMotion]);

  const setWorking = useCallback((working: boolean) => {
    targetXRef.current = null;
    stateRef.current = {
      ...stateRef.current,
      isWorking: working,
      animation: working ? "working" : "idle",
    };
    onStateChange({ ...stateRef.current });
  }, [onStateChange]);

  // Keyboard events (Supports English and Arabic keyboard layouts)
  useEffect(() => {
    if (disabled) return;

    const isLeftKey = (code: string, key: string) =>
      code === "ArrowLeft" || key === "arrowleft" || code === "KeyA" || key === "a" || key === "ش";

    const isRightKey = (code: string, key: string) =>
      code === "ArrowRight" || key === "arrowright" || code === "KeyD" || key === "d" || key === "ي";

    const isJumpKey = (code: string, key: string) =>
      code === "Space" ||
      key === " " ||
      key === "spacebar" ||
      code === "ArrowUp" ||
      key === "arrowup" ||
      code === "KeyW" ||
      key === "w" ||
      key === "ص";

    const isWaveKey = (code: string, key: string) =>
      code === "KeyF" || key === "f" || key === "ب";

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const code = e.code || "";
      const key = e.key ? e.key.toLowerCase() : "";

      if (code === "Space" || key === " " || code.startsWith("Arrow") || key.startsWith("arrow")) {
        e.preventDefault();
      }

      const left = isLeftKey(code, key);
      const right = isRightKey(code, key);
      const jump = isJumpKey(code, key);
      const wave = isWaveKey(code, key);

      // Any movement cancels click-to-move target
      if (left) {
        keysRef.current.add("left");
        targetXRef.current = null;
      }
      if (right) {
        keysRef.current.add("right");
        targetXRef.current = null;
      }

      if (stateRef.current.isWorking && (left || right || jump)) {
        setWorking(false);
      }

      if (jump && !stateRef.current.isJumping) {
        triggerJump();
      }

      if (wave) {
        startWave();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const code = e.code || "";
      const key = e.key ? e.key.toLowerCase() : "";

      if (isLeftKey(code, key)) {
        keysRef.current.delete("left");
      }
      if (isRightKey(code, key)) {
        keysRef.current.delete("right");
      }
    };

    const onBlur = () => {
      keysRef.current.clear();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [disabled, triggerJump, startWave, setWorking]);

  // Main game loop (RAF)
  useEffect(() => {
    if (disabled) return;

    const loop = () => {
      const s = stateRef.current;
      const keys = keysRef.current;

      const { isWaving, isWorking } = s;
      let { x, y, facing, animation, isJumping } = s;
      let velY = velYRef.current;
      let moved = false;

      // Handle horizontal movement if not waving and not working
      if (!isWaving && !isWorking) {
        const movingLeft = keys.has("left");
        const movingRight = keys.has("right");

        if (movingLeft) {
          x = Math.max(0, x - MOVE_SPEED);
          facing = "left";
          moved = true;
          targetXRef.current = null;
        } else if (movingRight) {
          x = Math.min(worldWidth - characterWidth, x + MOVE_SPEED);
          facing = "right";
          moved = true;
          targetXRef.current = null;
        } else if (targetXRef.current !== null) {
          // Autonomous movement toward target point
          const diff = targetXRef.current - x;
          if (Math.abs(diff) <= MOVE_SPEED) {
            x = targetXRef.current;
            targetXRef.current = null;
          } else {
            facing = diff > 0 ? "right" : "left";
            x += (diff > 0 ? 1 : -1) * MOVE_SPEED;
            moved = true;
          }
        }
      }

      // Physics: jumping & gravity
      if (isJumping) {
        velY += GRAVITY;
        y = Math.min(groundY, y + velY);

        if (y >= groundY) {
          y = groundY;
          isJumping = false;
          velY = 0;
          animation = moved ? "walking" : "idle";
        } else {
          animation = "jumping";
        }
      } else if (!isWaving && !isWorking) {
        if (moved) {
          animation = "walking";
        } else {
          animation = "idle";
        }
      }

      velYRef.current = velY;

      const changed =
        s.x !== x ||
        s.y !== y ||
        s.facing !== facing ||
        s.animation !== animation ||
        s.isJumping !== isJumping ||
        s.isWorking !== isWorking;

      if (changed) {
        stateRef.current = { x, y, facing, animation, isJumping, isWaving, isWorking };
        onStateChange({ ...stateRef.current });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled, worldWidth, characterWidth, groundY, onStateChange]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, []);

  return { getState, startWave, triggerJump, setWorking, moveTo };
}
