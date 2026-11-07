"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PixelCharacter from "./PixelCharacter";
import { useCharacterMovement, type CharacterState } from "./useCharacterMovement";
import InfoPanel, { type PanelType } from "./InfoPanel";
import MobileControls from "./MobileControls";

// ─── World layout constants ───────────────────────────────────────────────────
const WORLD_WIDTH = 3200; // logical world pixels
const WORLD_HEIGHT = 560; // logical world pixels (viewport height for scene)
const GROUND_Y = 340;     // y-position of ground surface (where feet touch)

// ─── Interactive zones ────────────────────────────────────────────────────────
interface Zone {
  id: PanelType;
  x: number;
  width: number;
  label: string;
  icon: string;
  hint: string;
}

const ZONES: Zone[] = [
  {
    id: "about",
    x: 260,
    width: 200,
    label: "About Me",
    icon: "person",
    hint: "Press E to meet Jebril",
  },
  {
    id: "skills",
    x: 780,
    width: 200,
    label: "Skills",
    icon: "code",
    hint: "Press E to view tech stack",
  },
  {
    id: "workstation",
    x: 1300,
    width: 220,
    label: "Workstation",
    icon: "terminal",
    hint: "Press E to code at desk",
  },
  {
    id: "projects",
    x: 1860,
    width: 220,
    label: "Projects",
    icon: "rocket_launch",
    hint: "Press E to browse projects",
  },
  {
    id: "experience",
    x: 2380,
    width: 200,
    label: "Experience",
    icon: "school",
    hint: "Press E to view credentials",
  },
  {
    id: "contact",
    x: 2860,
    width: 200,
    label: "Contact",
    icon: "mail",
    hint: "Press E to get in touch",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getActiveZone(charX: number, charW: number): Zone | null {
  const charMid = charX + charW / 2;
  return ZONES.find((z) => charMid >= z.x && charMid <= z.x + z.width) ?? null;
}

// ─── Pixel Art Scenery ────────────────────────────────────────────────────────
function PixelTree({ x, style }: { x: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{ position: "absolute", left: x, bottom: 0, ...style }}
      aria-hidden="true"
    >
      {/* Trunk */}
      <div
        style={{
          width: 16,
          height: 52,
          background: "#6e4222",
          margin: "0 auto",
          imageRendering: "pixelated",
          border: "2px solid #4a2a14",
        }}
      />
      {/* Canopy layers */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 80,
          height: 60,
          background: "#1f5f2e",
          border: "3px solid #14401e",
          imageRendering: "pixelated",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 74,
          left: "50%",
          transform: "translateX(-50%)",
          width: 60,
          height: 50,
          background: "#2a7e3d",
          border: "3px solid #1f5f2e",
          imageRendering: "pixelated",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 104,
          left: "50%",
          transform: "translateX(-50%)",
          width: 38,
          height: 40,
          background: "#38a44f",
          border: "3px solid #2a7e3d",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

function PixelDesk({ x, working }: { x: number; working: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 170,
        height: 120,
      }}
      aria-hidden="true"
    >
      {/* Desk surface */}
      <div
        style={{
          width: 160,
          height: 14,
          background: "#7d4a25",
          border: "2px solid #543015",
          position: "absolute",
          bottom: 48,
          left: 5,
          imageRendering: "pixelated",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      />
      {/* Desk legs */}
      <div
        style={{
          width: 10,
          height: 50,
          background: "#543015",
          position: "absolute",
          bottom: 0,
          left: 14,
          imageRendering: "pixelated",
        }}
      />
      <div
        style={{
          width: 10,
          height: 50,
          background: "#543015",
          position: "absolute",
          bottom: 0,
          right: 14,
          imageRendering: "pixelated",
        }}
      />

      {/* Laptop base */}
      <div
        style={{
          width: 66,
          height: 8,
          background: "#3b3b4f",
          border: "2px solid #1f1f2e",
          position: "absolute",
          bottom: 62,
          left: 52,
          imageRendering: "pixelated",
        }}
      />

      {/* Laptop screen */}
      <div
        style={{
          width: 62,
          height: 46,
          background: working ? "#0f172a" : "#1a1a24",
          border: "2px solid #0f0f18",
          position: "absolute",
          bottom: 70,
          left: 54,
          imageRendering: "pixelated",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 4,
          gap: 3,
          boxShadow: working
            ? "0 0 20px 4px rgba(162,231,255,0.5)"
            : "0 0 6px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Animated code lines */}
        <div
          style={{
            width: "70%",
            height: 3,
            background: working ? "#38bdf8" : "#475569",
            borderRadius: 1,
            animation: working ? "screenBlink 1.2s infinite alternate" : "none",
          }}
        />
        <div
          style={{
            width: "90%",
            height: 3,
            background: working ? "#a78bfa" : "#334155",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            width: "55%",
            height: 3,
            background: working ? "#34d399" : "#334155",
            borderRadius: 1,
          }}
        />
      </div>

      {/* Coffee mug */}
      <div
        style={{
          position: "absolute",
          bottom: 62,
          right: 24,
          width: 12,
          height: 14,
          background: "#c4c0ff",
          border: "2px solid #8781ff",
          borderRadius: "1px 1px 3px 3px",
        }}
      >
        {/* Steam */}
        {working && (
          <div
            style={{
              position: "absolute",
              top: -8,
              left: 2,
              width: 3,
              height: 6,
              background: "rgba(255,255,255,0.6)",
              borderRadius: 2,
              animation: "steam 1.5s infinite ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
}

function PixelBookshelf({ x }: { x: number }) {
  const booksRow1 = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
  const booksRow2 = ["#06b6d4", "#ec4899", "#84cc16", "#eab308"];

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 110,
        height: 150,
        background: "#543015",
        border: "3px solid #361e0b",
        imageRendering: "pixelated",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "6px 6px 8px",
        gap: 8,
      }}
      aria-hidden="true"
    >
      {/* Top shelf books */}
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 42 }}>
        {booksRow2.map((c, i) => (
          <div
            key={i}
            style={{
              width: 16 + (i % 2) * 4,
              height: 28 + (i % 3) * 4,
              background: c,
              border: "1px solid rgba(0,0,0,0.3)",
              imageRendering: "pixelated",
              borderRadius: "2px 2px 0 0",
            }}
          />
        ))}
      </div>
      {/* Shelf divider */}
      <div style={{ height: 4, background: "#361e0b", width: "100%" }} />
      {/* Bottom shelf books */}
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 44 }}>
        {booksRow1.map((c, i) => (
          <div
            key={i}
            style={{
              width: 14 + (i % 2) * 5,
              height: 32 + (i % 2) * 4,
              background: c,
              border: "1px solid rgba(0,0,0,0.3)",
              imageRendering: "pixelated",
              borderRadius: "2px 2px 0 0",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PixelMountain({ x, height, color }: { x: number; height: number; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 0,
        height: 0,
        borderLeft: `${height * 0.7}px solid transparent`,
        borderRight: `${height * 0.7}px solid transparent`,
        borderBottom: `${height}px solid ${color}`,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
}

function GroundLayer() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: WORLD_WIDTH,
        height: GROUND_Y + 14,
        background: "linear-gradient(to bottom, #182334 0%, #0d1522 100%)",
        borderTop: "4px solid #335985",
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      {/* Ground grass tufts & pixel details */}
      {Array.from({ length: 64 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: i * 50 + ((i * 7) % 25),
            top: 4,
            width: 4,
            height: 4,
            background: i % 2 === 0 ? "#4f84be" : "#2d4d73",
            imageRendering: "pixelated",
          }}
        />
      ))}
    </div>
  );
}

// Precomputed stars for deterministic, pure rendering without Math.random during render
const STATIC_STARS = Array.from({ length: 65 }, (_, i) => ({
  x: ((i * 49.3 + 17) % 3180),
  y: ((i * 23.7 + 11) % 170),
  size: i % 5 === 0 ? 3 : 2,
  opacity: 0.35 + ((i * 13) % 55) / 100,
  delay: ((i * 17) % 30) / 10,
}));

function Stars() {
  return (
    <>
      {STATIC_STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: i % 4 === 0 ? "#a2e7ff" : "#c4c0ff",
            opacity: s.opacity,
            imageRendering: "pixelated",
            animation: `twinkle 2.8s ${s.delay}s ease-in-out infinite alternate`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function ZoneSignpost({ zone, isActive }: { zone: Zone; isActive: boolean }) {
  const icons: Record<NonNullable<PanelType>, string> = {
    about: "👤",
    skills: "💻",
    workstation: "⚡",
    projects: "🚀",
    experience: "🎓",
    contact: "✉️",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: zone.x + zone.width / 2,
        bottom: GROUND_Y + 12,
        transform: "translateX(-50%)",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 2,
        transition: "all 0.3s ease",
        opacity: isActive ? 1 : 0.65,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          background: isActive ? "rgba(196,192,255,0.18)" : "rgba(22,22,28,0.85)",
          border: isActive ? "2px solid rgba(196,192,255,0.7)" : "2px solid rgba(70,69,85,0.4)",
          borderRadius: 8,
          padding: "5px 12px",
          marginBottom: 2,
          backdropFilter: "blur(6px)",
          boxShadow: isActive ? "0 0 20px rgba(196,192,255,0.35)" : "none",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 13 }}>{zone.id && icons[zone.id]}</span>{" "}
        <span
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: isActive ? "#c4c0ff" : "#c7c4d8",
          }}
        >
          {zone.label}
        </span>
      </div>
      <div
        style={{
          width: 3,
          height: 36,
          background: isActive ? "#c4c0ff" : "#464555",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

function InteractionHint({ zone }: { zone: Zone }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 84,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 35,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(19,19,26,0.9)",
        border: "1px solid rgba(196,192,255,0.4)",
        borderRadius: 100,
        padding: "8px 18px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        animation: "fadeInUp 0.25s ease",
      }}
    >
      <kbd
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: 11,
          fontWeight: 800,
          color: "#0f0f18",
          background: "#c4c0ff",
          borderRadius: 6,
          padding: "2px 8px",
          letterSpacing: "0.08em",
        }}
      >
        E
      </kbd>
      <span
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: 12,
          fontWeight: 600,
          color: "#e4e1e9",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {zone.hint}
      </span>
    </div>
  );
}

function ControlsHUD({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const controls = [
    { key: "← → / A D", desc: "Move" },
    { key: "Space / W", desc: "Jump" },
    { key: "E", desc: "Interact" },
    { key: "F", desc: "Wave" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 68,
        left: 16,
        zIndex: 30,
        background: "rgba(19,19,24,0.85)",
        border: "1px solid rgba(70,69,85,0.3)",
        borderRadius: 14,
        padding: "10px 14px",
        backdropFilter: "blur(12px)",
        minWidth: 150,
      }}
      className="hidden sm:block"
    >
      <p
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: 9,
          color: "#a2e7ff",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Controls
      </p>
      {controls.map((c) => (
        <div
          key={c.key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            marginBottom: 4,
          }}
        >
          <kbd
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 9,
              color: "#c4c0ff",
              background: "rgba(196,192,255,0.1)",
              border: "1px solid rgba(196,192,255,0.25)",
              borderRadius: 4,
              padding: "1px 6px",
            }}
          >
            {c.key}
          </kbd>
          <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 10, color: "#c7c4d8" }}>
            {c.desc}
          </span>
        </div>
      ))}
    </div>
  );
}

function QuickNav({ onSelect }: { onSelect: (panel: PanelType) => void }) {
  const items: Array<{ id: PanelType; label: string; icon: string }> = [
    { id: "about", label: "About", icon: "person" },
    { id: "skills", label: "Skills", icon: "code" },
    { id: "workstation", label: "Workstation", icon: "terminal" },
    { id: "projects", label: "Projects", icon: "rocket_launch" },
    { id: "experience", label: "Education", icon: "school" },
    { id: "contact", label: "Contact", icon: "mail" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: 14,
        transform: "translateY(-50%)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="group flex items-center justify-end gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
          aria-label={`Open ${item.label} panel`}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity bg-surface-low/90 px-2 py-1 rounded-md border border-outline-variant/30 hidden md:inline-block"
            style={{ whiteSpace: "nowrap" }}
          >
            {item.label}
          </span>
          <div
            style={{
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: "rgba(19,19,26,0.85)",
              border: "1px solid rgba(70,69,85,0.35)",
              backdropFilter: "blur(12px)",
              transition: "all 0.2s",
            }}
            className="group-hover:border-primary/60 group-hover:bg-primary/15 group-hover:scale-105"
          >
            <span className="material-symbols-outlined text-base text-primary">{item.icon}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Main WorldScene Component ────────────────────────────────────────────────
export default function WorldScene() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [charState, setCharState] = useState<CharacterState>({
    x: 120,
    y: GROUND_Y,
    facing: "right",
    animation: "idle",
    isJumping: false,
    isWaving: false,
    isWorking: false,
  });
  const [cameraX, setCameraX] = useState(0);
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [showHUD, setShowHUD] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Character width reference for collision
  const charWidthPx = 90;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onStateChange = useCallback((state: CharacterState) => {
    setCharState(state);
  }, []);

  const { startWave, triggerJump, setWorking } = useCharacterMovement({
    worldWidth: WORLD_WIDTH,
    characterWidth: charWidthPx,
    groundY: GROUND_Y,
    onStateChange,
    disabled: activePanel !== null,
    reducedMotion,
  });

  // Camera follow logic
  useEffect(() => {
    if (!viewportRef.current) return;
    const vpW = viewportRef.current.clientWidth;
    const targetCamX = clamp(charState.x - vpW / 2 + charWidthPx / 2, 0, WORLD_WIDTH - vpW);
    if (reducedMotion) {
      setCameraX(targetCamX);
    } else {
      setCameraX((prev) => prev + (targetCamX - prev) * 0.12);
    }
  }, [charState.x, reducedMotion]);

  const activeZone = getActiveZone(charState.x, charWidthPx);

  // Keyboard interaction (E / Escape)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key.toLowerCase() === "e") {
        if (activeZone && activePanel === null) {
          if (activeZone.id === "workstation") {
            setWorking(true);
          }
          setActivePanel(activeZone.id);
        }
      }

      if (e.key === "Escape") {
        setActivePanel(null);
        setWorking(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeZone, activePanel, setWorking]);

  const handleClosePanel = () => {
    setActivePanel(null);
    if (charState.isWorking) {
      setWorking(false);
    }
  };

  const handleSelectPanel = (panel: PanelType) => {
    if (panel === "workstation") {
      setWorking(true);
    }
    setActivePanel(panel);
  };

  // Mobile control helpers
  const handleMobileLeft = (active: boolean) => {
    window.dispatchEvent(
      new KeyboardEvent(active ? "keydown" : "keyup", { key: "ArrowLeft", bubbles: true })
    );
  };

  const handleMobileRight = (active: boolean) => {
    window.dispatchEvent(
      new KeyboardEvent(active ? "keydown" : "keyup", { key: "ArrowRight", bubbles: true })
    );
  };

  const handleMobileInteract = () => {
    if (activeZone && activePanel === null) {
      if (activeZone.id === "workstation") {
        setWorking(true);
      }
      setActivePanel(activeZone.id);
    }
  };

  return (
    <>
      <style>{`
        @keyframes twinkle {
          from { opacity: 0.2; transform: scale(0.9); }
          to { opacity: 0.95; transform: scale(1.1); }
        }
        @keyframes screenBlink {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.7; }
          100% { transform: translateY(-12px) scaleX(1.8); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Top Navbar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: "rgba(19,19,26,0.92)",
          borderBottom: "1px solid rgba(70,69,85,0.3)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-headline font-bold uppercase text-xs sm:text-sm hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg py-1 px-2"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 11,
              color: "#c7c4d8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Jebril&apos;s Pixel Journey
          </span>
        </div>

        <button
          onClick={() => setShowHUD((h) => !h)}
          className="text-on-surface-variant hover:text-foreground transition-colors font-label text-[10px] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2.5 py-1 border border-outline-variant/30 hidden sm:block"
          aria-label="Toggle controls HUD"
        >
          {showHUD ? "Hide Controls" : "Show Controls"}
        </button>
      </header>

      {/* Controls HUD */}
      <ControlsHUD visible={showHUD} />

      {/* Quick navigation sidebar */}
      <QuickNav onSelect={handleSelectPanel} />

      {/* Interaction hint pill */}
      {activeZone && activePanel === null && <InteractionHint zone={activeZone} />}

      {/* Main Viewport */}
      <main
        ref={viewportRef}
        style={{
          position: "fixed",
          inset: 0,
          top: 56,
          bottom: 0,
          overflow: "hidden",
          background: "linear-gradient(to bottom, #05060d 0%, #0d0f1a 50%, #131318 100%)",
          userSelect: "none",
        }}
        aria-label="Interactive pixel art world viewport"
      >
        {/* World container translated by cameraX */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: WORLD_WIDTH,
            height: "100%",
            transform: `translateX(-${cameraX}px)`,
            transition: reducedMotion ? "none" : "transform 0.04s linear",
          }}
        >
          {/* Ambient sky background gradients */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 25% 25%, rgba(135,129,255,0.1), transparent 60%), radial-gradient(ellipse at 75% 20%, rgba(60,215,255,0.08), transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Stars */}
          <Stars />

          {/* Background mountain silhouette */}
          <PixelMountain x={120} height={210} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={420} height={160} color="rgba(20,26,46,0.75)" />
          <PixelMountain x={780} height={230} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={1180} height={170} color="rgba(18,24,42,0.75)" />
          <PixelMountain x={1580} height={220} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={1980} height={150} color="rgba(20,26,46,0.75)" />
          <PixelMountain x={2420} height={200} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={2800} height={180} color="rgba(18,24,42,0.75)" />

          {/* Decorative Trees */}
          <PixelTree x={160} />
          <PixelTree x={520} style={{ transform: "scale(0.85)" }} />
          <PixelTree x={1080} style={{ transform: "scale(0.9)" }} />
          <PixelTree x={1640} />
          <PixelTree x={2180} style={{ transform: "scale(0.85)" }} />
          <PixelTree x={2720} />
          <PixelTree x={3060} style={{ transform: "scale(0.95)" }} />

          {/* Zone Signposts */}
          {ZONES.map((zone) => (
            <ZoneSignpost
              key={zone.id}
              zone={zone}
              isActive={activeZone?.id === zone.id}
            />
          ))}

          {/* Zone 1: About Me area decor */}
          <div
            style={{
              position: "absolute",
              left: 230,
              bottom: GROUND_Y,
              width: 260,
              height: 4,
              background: "rgba(196,192,255,0.2)",
              borderRadius: 2,
            }}
            aria-hidden="true"
          />

          {/* Zone 2: Skills Bookshelf */}
          <PixelBookshelf x={820} />

          {/* Zone 3: Workstation Desk & Laptop */}
          <PixelDesk x={1320} working={charState.isWorking} />

          {/* Zone 4: Projects Launchpad */}
          <div
            style={{
              position: "absolute",
              left: 1910,
              bottom: GROUND_Y,
              width: 120,
              height: 8,
              background: "rgba(162,231,255,0.25)",
              border: "2px solid rgba(162,231,255,0.5)",
              borderRadius: 4,
              boxShadow: "0 0 16px rgba(162,231,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                fontSize: 22,
                animation: "twinkle 2s infinite alternate",
              }}
            >
              🚀
            </div>
          </div>

          {/* Zone 5: Experience Certificate Stand */}
          <div
            style={{
              position: "absolute",
              left: 2420,
              bottom: GROUND_Y,
              width: 70,
              height: 85,
              background: "rgba(22,22,30,0.8)",
              border: "2px solid rgba(196,192,255,0.3)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              boxShadow: "0 0 12px rgba(196,192,255,0.15)",
            }}
            aria-hidden="true"
          >
            🎓
          </div>

          {/* Zone 6: Contact Mailbox */}
          <div
            style={{
              position: "absolute",
              left: 2920,
              bottom: GROUND_Y,
            }}
            aria-hidden="true"
          >
            <div
              style={{
                width: 44,
                height: 48,
                background: "#1e3a5f",
                border: "3px solid #3b82f6",
                imageRendering: "pixelated",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                borderRadius: 4,
                boxShadow: "0 0 14px rgba(59,130,246,0.3)",
              }}
            >
              ✉️
            </div>
            <div
              style={{
                width: 6,
                height: 36,
                background: "#3b82f6",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Ground */}
          <GroundLayer />

          {/* ─── Animated Character ─── */}
          <div
            style={{
              position: "absolute",
              left: charState.x,
              bottom: WORLD_HEIGHT - charState.y - (WORLD_HEIGHT - GROUND_Y),
              zIndex: 10,
              transition: reducedMotion ? "none" : "bottom 0.02s linear",
            }}
          >
            <PixelCharacter
              animation={charState.animation}
              facing={charState.facing}
            />
          </div>

          {/* Zone Highlight Overlays */}
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              style={{
                position: "absolute",
                left: zone.x,
                bottom: 0,
                width: zone.width,
                height: GROUND_Y + 14,
                background:
                  activeZone?.id === zone.id
                    ? "rgba(196,192,255,0.035)"
                    : "transparent",
                borderLeft:
                  activeZone?.id === zone.id
                    ? "1px solid rgba(196,192,255,0.2)"
                    : "none",
                borderRight:
                  activeZone?.id === zone.id
                    ? "1px solid rgba(196,192,255,0.2)"
                    : "none",
                transition: "all 0.3s ease",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </main>

      {/* Mobile Controls */}
      <div className="md:hidden">
        <MobileControls
          onLeft={handleMobileLeft}
          onRight={handleMobileRight}
          onJump={triggerJump}
          onWave={startWave}
          onInteract={handleMobileInteract}
        />
      </div>

      {/* Modal Info Panel */}
      <InfoPanel panel={activePanel} onClose={handleClosePanel} />
    </>
  );
}
