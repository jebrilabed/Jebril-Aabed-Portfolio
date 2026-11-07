"use client";

import React from "react";

interface MobileControlsProps {
  onLeft: (active: boolean) => void;
  onRight: (active: boolean) => void;
  onJump: () => void;
  onWave: () => void;
  onInteract: () => void;
}

function ControlBtn({
  onPress,
  onRelease,
  label,
  icon,
  className = "",
}: {
  onPress: () => void;
  onRelease?: () => void;
  label: string;
  icon: string;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`pixel-btn select-none touch-none flex items-center justify-center rounded-xl bg-surface-low/80 border border-outline-variant/40 text-primary active:bg-primary/20 active:scale-95 transition-all duration-100 shadow-lg backdrop-blur-md ${className}`}
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      onPointerUp={() => onRelease?.()}
      onPointerLeave={() => onRelease?.()}
      onPointerCancel={() => onRelease?.()}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </button>
  );
}

export default function MobileControls({
  onLeft,
  onRight,
  onJump,
  onWave,
  onInteract,
}: MobileControlsProps) {
  return (
    <div
      className="fixed bottom-4 inset-x-0 flex items-end justify-between px-4 z-30 pointer-events-none"
      aria-label="Game controls"
    >
      {/* D-pad: Left / Right */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <ControlBtn
          label="Move left"
          icon="chevron_left"
          className="w-14 h-14"
          onPress={() => onLeft(true)}
          onRelease={() => onLeft(false)}
        />
        <ControlBtn
          label="Move right"
          icon="chevron_right"
          className="w-14 h-14"
          onPress={() => onRight(true)}
          onRelease={() => onRight(false)}
        />
      </div>

      {/* Action buttons: Wave / Interact / Jump */}
      <div className="flex items-end gap-2 pointer-events-auto">
        <ControlBtn
          label="Wave"
          icon="waving_hand"
          className="w-12 h-12"
          onPress={onWave}
        />
        <ControlBtn
          label="Interact (E)"
          icon="touch_app"
          className="w-12 h-12"
          onPress={onInteract}
        />
        <ControlBtn
          label="Jump"
          icon="arrow_upward"
          className="w-14 h-14 bg-primary/10 border-primary/40 text-primary"
          onPress={onJump}
        />
      </div>
    </div>
  );
}

