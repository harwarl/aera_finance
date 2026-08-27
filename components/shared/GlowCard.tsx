"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

// A card whose border catches a calm, subtle glow on the side nearest the
// cursor — reactive, not ambient, and restrained rather than a bright wash.
// Two layers, both driven off the same cursor-tracked position (CSS custom
// properties, mutated directly on the DOM node since this fires on every
// pointer move and a re-render per pixel would be wasteful):
//   1. A soft halo sitting just outside the card's edge, so it reads as
//      light catching that edge/corner rather than filling the card.
//      Fades out well before the far side, so only the near side lights up.
//   2. A faint interior wash at the same position — just enough to feel
//      connected to the border glow, not a visible colored fill.
export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className="group/glow relative h-full"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 -z-10 opacity-0 blur-lg transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />

      <div className={cn("relative isolate h-full overflow-hidden", className)}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
          style={{
            background:
              "radial-gradient(200px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in srgb, var(--accent) 5%, transparent), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
