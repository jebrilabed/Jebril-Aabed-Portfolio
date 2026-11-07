"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import PixelCharacter from "./PixelCharacter";
import { useCharacterMovement, type CharacterState } from "./useCharacterMovement";
import InfoPanel, { type PanelType } from "./InfoPanel";
import MobileControls from "./MobileControls";
import { retroAudio } from "./retroAudio";

// ─── World layout constants ───────────────────────────────────────────────────
const WORLD_WIDTH = 3200;  // Total horizontal world width in px
const ROAD_HEIGHT = 150;  // Height of the road/sidewalk from the bottom of viewport
const GROUND_Y = 200;     // Internal physics baseline for character jump calculations

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

function PixelStreetLamp({ x }: { x: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: ROAD_HEIGHT,
        width: 40,
        height: 140,
        zIndex: 7,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* Light cone shining down on the road */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: -40,
          width: 120,
          height: 130,
          background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.06) 55%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      {/* Lamp post pole */}
      <div
        style={{
          position: "absolute",
          left: 18,
          bottom: 0,
          width: 4,
          height: 120,
          background: "#334155",
          border: "1px solid #1e293b",
        }}
      />
      {/* Horizontal lamp arm */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 18,
          width: 20,
          height: 3,
          background: "#475569",
        }}
      />
      {/* Glowing lamp fixture */}
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 19,
          width: 10,
          height: 8,
          background: "#38bdf8",
          boxShadow: "0 0 16px 4px rgba(56,189,248,0.7)",
          borderRadius: "1px 1px 3px 3px",
        }}
      />
    </div>
  );
}

function PixelTree({ x, style }: { x: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: ROAD_HEIGHT,
        zIndex: 6,
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Trunk */}
      <div
        style={{
          width: 16,
          height: 54,
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
          bottom: 42,
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
          bottom: 76,
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
          bottom: 106,
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
        bottom: ROAD_HEIGHT,
        width: 170,
        height: 120,
        zIndex: 14,
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
            ? "0 0 22px 5px rgba(162,231,255,0.6)"
            : "0 0 6px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.4s ease",
        }}
      >
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
        bottom: ROAD_HEIGHT,
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
        zIndex: 6,
      }}
      aria-hidden="true"
    >
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
      <div style={{ height: 4, background: "#361e0b", width: "100%" }} />
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

function PixelMountain({
  x,
  height,
  color,
  peakColor = "rgba(162, 231, 255, 0.3)",
}: {
  x: number;
  height: number;
  color: string;
  peakColor?: string;
}) {
  const halfWidth = Math.round(height * 0.75);
  const peakHeight = Math.round(height * 0.28);
  const peakHalfWidth = Math.round(halfWidth * 0.28);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        width: 0,
        height: 0,
        borderLeft: `${halfWidth}px solid transparent`,
        borderRight: `${halfWidth}px solid transparent`,
        borderBottom: `${height}px solid ${color}`,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -peakHalfWidth,
          width: 0,
          height: 0,
          borderLeft: `${peakHalfWidth}px solid transparent`,
          borderRight: `${peakHalfWidth}px solid transparent`,
          borderBottom: `${peakHeight}px solid ${peakColor}`,
        }}
      />
    </div>
  );
}

/**
 * The Road and Ground Foundation Layer
 */
function GroundAndRoadLayer() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: WORLD_WIDTH,
        height: ROAD_HEIGHT,
        zIndex: 5,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    >
      {/* Road Surface Curb */}
      <div
        style={{
          width: "100%",
          height: 12,
          background: "#2a3b50",
          borderTop: "4px solid #60a5fa",
          borderBottom: "2px solid #162230",
          boxShadow: "0 -3px 16px rgba(96, 165, 250, 0.45)",
          position: "relative",
        }}
      >
        {Array.from({ length: 90 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 36 + (i % 3) * 6,
              top: 1,
              width: 16,
              height: 4,
              background: i % 2 === 0 ? "rgba(96, 165, 250, 0.4)" : "rgba(162, 231, 255, 0.25)",
              borderRadius: 1,
            }}
          />
        ))}
      </div>

      {/* Street Pavement / Cyber Walkway Bed */}
      <div
        style={{
          width: "100%",
          height: 48,
          background: "linear-gradient(to bottom, #1d2a3a 0%, #131c28 100%)",
          borderBottom: "3px solid #0d141e",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {Array.from({ length: 55 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 60 + 12,
              top: 20,
              width: 28,
              height: 4,
              background: "#38bdf8",
              opacity: 0.75,
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(56, 189, 248, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Underground Foundation Dirt & Tech Layer */}
      <div
        style={{
          width: "100%",
          height: ROAD_HEIGHT - 60,
          background: "linear-gradient(to bottom, #101722 0%, #080c14 100%)",
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {Array.from({ length: 45 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: i * 75 + 20,
              top: 15 + (i % 3) * 22,
              width: 34,
              height: 2,
              background: "rgba(135, 129, 255, 0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Precomputed stars for deterministic, pure rendering
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
        bottom: ROAD_HEIGHT,
        transform: "translateX(-50%)",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 8,
        transition: "all 0.3s ease",
        opacity: isActive ? 1 : 0.7,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          background: isActive ? "rgba(196,192,255,0.22)" : "rgba(22,22,28,0.88)",
          border: isActive ? "2px solid rgba(196,192,255,0.8)" : "2px solid rgba(70,69,85,0.45)",
          borderRadius: 8,
          padding: "5px 12px",
          marginBottom: 2,
          backdropFilter: "blur(6px)",
          boxShadow: isActive ? "0 0 20px rgba(196,192,255,0.4)" : "none",
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
          height: 38,
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
        bottom: ROAD_HEIGHT + 145,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 35,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(19,19,26,0.92)",
        border: "1px solid rgba(196,192,255,0.45)",
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
        E / ث
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

/**
 * World Waypoint Radar in the Header
 * Allows users to track their location and click any waypoint to navigate
 */
function WorldRadarTracker({
  charX,
  onNavigateToX,
}: {
  charX: number;
  onNavigateToX: (x: number) => void;
}) {
  const percent = Math.min(100, Math.max(0, (charX / WORLD_WIDTH) * 100));

  return (
    <div className="hidden lg:flex items-center gap-3 bg-surface-low/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/30">
      <div className="relative w-44 h-1.5 bg-surface-high rounded-full overflow-visible">
        {/* Progress track */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          style={{ width: `${percent}%` }}
        />
        {/* Character Pin */}
        <div
          className="absolute -top-1.5 w-4 h-4 rounded-full bg-secondary border-2 border-background shadow-[0_0_10px_#38bdf8] -translate-x-1/2 transition-all duration-75 flex items-center justify-center text-[8px]"
          style={{ left: `${percent}%` }}
        >
          📍
        </div>
      </div>

      {/* Zone quick jump pills */}
      <div className="flex items-center gap-1.5">
        {ZONES.map((z) => (
          <button
            key={z.id}
            onClick={() => onNavigateToX(z.x + z.width / 2)}
            title={z.label}
            className="text-[10px] font-label text-on-surface-variant hover:text-primary transition-colors uppercase px-1 py-0.5 rounded hover:bg-surface-high"
          >
            {z.label.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

function ControlsHUD({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const controls = [
    { key: "← → / A D (ش ي)", desc: "Move" },
    { key: "Space / W (ص)", desc: "Jump" },
    { key: "E (ث)", desc: "Interact" },
    { key: "F (ب)", desc: "Wave" },
    { key: "Click Road", desc: "Walk There" },
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
        minWidth: 155,
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
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth;
    return 1200;
  });
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  const [showHUD, setShowHUD] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [clickMarker, setClickMarker] = useState<{ x: number } | null>(null);

  const charWidthPx = 90;

  useEffect(() => {
    const updateVp = () => {
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      } else if (typeof window !== "undefined") {
        setViewportWidth(window.innerWidth);
      }
    };
    const rafId = requestAnimationFrame(updateVp);
    window.addEventListener("resize", updateVp);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateVp);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onStateChange = useCallback((state: CharacterState) => {
    setCharState(state);
  }, []);

  const { startWave, triggerJump, setWorking, moveTo } = useCharacterMovement({
    worldWidth: WORLD_WIDTH,
    characterWidth: charWidthPx,
    groundY: GROUND_Y,
    onStateChange,
    disabled: activePanel !== null,
    reducedMotion,
  });

  // Camera X position computed synchronously without cascading setState in useEffect
  const cameraX = clamp(
    charState.x - viewportWidth / 2 + charWidthPx / 2,
    0,
    WORLD_WIDTH - viewportWidth
  );

  const activeZone = getActiveZone(charState.x, charWidthPx);

  // Keyboard interaction (E / Escape - English and Arabic)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const code = e.code || "";
      const key = e.key ? e.key.toLowerCase() : "";

      if (code === "KeyE" || key === "e" || key === "ث") {
        if (activeZone && activePanel === null) {
          if (activeZone.id === "workstation") {
            setWorking(true);
          }
          setActivePanel(activeZone.id);
        }
      }

      if (code === "Escape" || key === "escape") {
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

  // Navigate directly to a specific panel and walk the character there
  const handleNavigateSection = (panel: PanelType) => {
    setActivePanel(panel);
    const targetZone = ZONES.find((z) => z.id === panel);
    if (targetZone) {
      if (panel === "workstation") {
        setWorking(true);
        moveTo(targetZone.x + 25);
      } else {
        setWorking(false);
        moveTo(targetZone.x + targetZone.width / 2 - 40);
      }
    }
  };

  // Click / Tap on the Road to Walk There
  const handleRoadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activePanel !== null) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const clickXOnScreen = e.clientX - bounds.left;
    const worldTargetX = cameraX + clickXOnScreen;

    setClickMarker({ x: worldTargetX });
    moveTo(worldTargetX);

    setTimeout(() => {
      setClickMarker(null);
    }, 900);
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    retroAudio.setEnabled(next);
    if (next) {
      retroAudio.playInteract();
    }
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
        @keyframes targetPulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
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

        {/* World Tracker Radar */}
        <WorldRadarTracker charX={charState.x} onNavigateToX={moveTo} />

        <div className="flex items-center gap-2.5">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-label uppercase tracking-widest border transition-all ${
              audioEnabled
                ? "bg-secondary/20 border-secondary text-secondary shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                : "bg-surface-high/60 border-outline-variant/30 text-on-surface-variant hover:text-foreground"
            }`}
            aria-label="Toggle retro audio"
          >
            <span className="text-xs">{audioEnabled ? "🔊" : "🔇"}</span>
            <span className="hidden sm:inline">{audioEnabled ? "Sound: ON" : "Sound: OFF"}</span>
          </button>

          {/* Controls HUD Toggle */}
          <button
            onClick={() => setShowHUD((h) => !h)}
            className="text-on-surface-variant hover:text-foreground transition-colors font-label text-[10px] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2.5 py-1 border border-outline-variant/30 hidden sm:block"
            aria-label="Toggle controls HUD"
          >
            {showHUD ? "Hide Controls" : "Show Controls"}
          </button>
        </div>
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
        onClick={handleRoadClick}
        style={{
          position: "fixed",
          inset: 0,
          top: 56,
          bottom: 0,
          overflow: "hidden",
          background: "linear-gradient(to bottom, #05060d 0%, #0d0f1a 50%, #131318 100%)",
          userSelect: "none",
          cursor: "crosshair",
        }}
        aria-label="Interactive pixel art world viewport"
      >
        {/* ── PARALLAX LAYER 1: Deep Sky & Stars (Moves slowest: 0.12x) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: WORLD_WIDTH,
            transform: `translateX(-${cameraX * 0.12}px)`,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 25% 25%, rgba(135,129,255,0.1), transparent 60%), radial-gradient(ellipse at 75% 20%, rgba(60,215,255,0.08), transparent 55%)",
            }}
          />
          <Stars />
        </div>

        {/* ── PARALLAX LAYER 2: Distant Mountains (Moves at 0.35x) ── */}
        <div
          style={{
            position: "absolute",
            bottom: ROAD_HEIGHT,
            left: 0,
            width: WORLD_WIDTH,
            transform: `translateX(-${cameraX * 0.35}px)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <PixelMountain x={100} height={230} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={420} height={170} color="rgba(20,26,46,0.75)" />
          <PixelMountain x={800} height={250} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={1220} height={190} color="rgba(18,24,42,0.75)" />
          <PixelMountain x={1640} height={240} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={2060} height={160} color="rgba(20,26,46,0.75)" />
          <PixelMountain x={2480} height={220} color="rgba(24,30,52,0.75)" />
          <PixelMountain x={2880} height={190} color="rgba(18,24,42,0.75)" />
        </div>

        {/* ── PARALLAX LAYER 3: Main World, Road, Trees & Interactive Objects (1.0x) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: WORLD_WIDTH,
            height: "100%",
            transform: `translateX(-${cameraX}px)`,
            transition: reducedMotion ? "none" : "transform 0.04s linear",
            zIndex: 10,
          }}
        >
          {/* Cyber Streetlamps along the road */}
          <PixelStreetLamp x={480} />
          <PixelStreetLamp x={1080} />
          <PixelStreetLamp x={1620} />
          <PixelStreetLamp x={2160} />
          <PixelStreetLamp x={2680} />

          {/* Decorative Trees on the Road */}
          <PixelTree x={160} />
          <PixelTree x={540} style={{ transform: "scale(0.85)", transformOrigin: "bottom center" }} />
          <PixelTree x={1120} style={{ transform: "scale(0.9)", transformOrigin: "bottom center" }} />
          <PixelTree x={1680} />
          <PixelTree x={2220} style={{ transform: "scale(0.85)", transformOrigin: "bottom center" }} />
          <PixelTree x={2740} />
          <PixelTree x={3060} style={{ transform: "scale(0.95)", transformOrigin: "bottom center" }} />

          {/* Zone Signposts on the Road */}
          {ZONES.map((zone) => (
            <ZoneSignpost
              key={zone.id}
              zone={zone}
              isActive={activeZone?.id === zone.id}
            />
          ))}

          {/* Zone 1: About Me area road decor */}
          <div
            style={{
              position: "absolute",
              left: 230,
              bottom: ROAD_HEIGHT,
              width: 260,
              height: 4,
              background: "rgba(196,192,255,0.35)",
              borderRadius: 2,
              boxShadow: "0 0 10px rgba(196,192,255,0.4)",
              zIndex: 7,
            }}
            aria-hidden="true"
          />

          {/* Zone 2: Skills Bookshelf on the Road */}
          <PixelBookshelf x={820} />

          {/* Zone 3: Workstation Desk & Laptop on the Road */}
          <PixelDesk x={1320} working={charState.isWorking} />

          {/* Zone 4: Projects Launchpad on the Road */}
          <div
            style={{
              position: "absolute",
              left: 1910,
              bottom: ROAD_HEIGHT,
              width: 120,
              height: 8,
              background: "rgba(162,231,255,0.3)",
              border: "2px solid rgba(162,231,255,0.6)",
              borderRadius: 4,
              boxShadow: "0 0 16px rgba(162,231,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 7,
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

          {/* Zone 5: Experience Certificate Stand on the Road */}
          <div
            style={{
              position: "absolute",
              left: 2420,
              bottom: ROAD_HEIGHT,
              width: 70,
              height: 85,
              background: "rgba(22,22,30,0.85)",
              border: "2px solid rgba(196,192,255,0.4)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              boxShadow: "0 0 14px rgba(196,192,255,0.25)",
              zIndex: 7,
            }}
            aria-hidden="true"
          >
            🎓
          </div>

          {/* Zone 6: Contact Mailbox on the Road */}
          <div
            style={{
              position: "absolute",
              left: 2920,
              bottom: ROAD_HEIGHT,
              zIndex: 7,
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
                boxShadow: "0 0 14px rgba(59,130,246,0.4)",
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

          {/* Click to move destination ripple marker */}
          {clickMarker && (
            <div
              style={{
                position: "absolute",
                left: clickMarker.x - 12,
                bottom: ROAD_HEIGHT - 6,
                width: 24,
                height: 12,
                border: "2px solid #38bdf8",
                borderRadius: "50%",
                animation: "targetPulse 0.8s ease-out forwards",
                pointerEvents: "none",
                zIndex: 15,
              }}
            />
          )}

          {/* ─── Ground & Road Pathway (Visible Street Surface) ─── */}
          <GroundAndRoadLayer />

          {/* ─── Animated Character Walking Directly ON the Road ─── */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: ROAD_HEIGHT,
              transform: `translate3d(${charState.x}px, -${GROUND_Y - charState.y}px, 0)`,
              zIndex: 12,
              willChange: "transform",
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
                bottom: ROAD_HEIGHT,
                width: zone.width,
                height: 220,
                background:
                  activeZone?.id === zone.id
                    ? "linear-gradient(to top, rgba(196,192,255,0.06), transparent)"
                    : "transparent",
                borderLeft:
                  activeZone?.id === zone.id
                    ? "1px dashed rgba(196,192,255,0.25)"
                    : "none",
                borderRight:
                  activeZone?.id === zone.id
                    ? "1px dashed rgba(196,192,255,0.25)"
                    : "none",
                transition: "all 0.3s ease",
                pointerEvents: "none",
                zIndex: 4,
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

      {/* Modal Info Panel with Inter-Section Navigation */}
      <InfoPanel
        panel={activePanel}
        onClose={handleClosePanel}
        onNavigate={handleNavigateSection}
      />
    </>
  );
}
