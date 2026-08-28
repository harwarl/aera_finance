"use client";

import { useRef } from "react";
import { Container } from "@/components/layout/Container";

// Icon slots are placeholders — a plain initial in a bordered square — until
// real partner/model SVGs are dropped in. Swap each entry's rendered badge
// for an actual <Image>/SVG once those arrive; nothing else about the
// layout needs to change.
const PARTNERS = [
  { name: "Robinhood Chain" },
  { name: "1inch" },
  { name: "0x" },
  { name: "Morpho" },
  { name: "Claude" },
  { name: "Codex" },
];

export function IntegrationStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }

  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto">
      <Container>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 rounded-2xl border border-border-muted bg-background-elevated/60 px-6 py-5 sm:rounded-full sm:px-8 sm:py-4">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Works With
          </span>

          <span className="hidden h-6 w-px shrink-0 bg-border-muted sm:block" />

          <div
            ref={trackRef}
            onPointerMove={handlePointerMove}
            className="group/strip relative min-w-0 flex-1 overflow-hidden"
          >
            {/* Cursor-tracked spotlight — same technique as GlowCard, just
                inlined here since the marquee track isn't a card. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/strip:opacity-100"
              style={{
                background:
                  "radial-gradient(160px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)",
              }}
            />

            <div className="flex w-max animate-marquee gap-8 group-hover/strip:[animation-play-state:paused]">
              {loop.map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background-subtle text-[10px] font-bold uppercase tracking-widest text-foreground-faint">
                    {partner.name.slice(0, 1)}
                  </span>
                  <span className="whitespace-nowrap text-sm text-foreground-muted">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <span className="hidden h-6 w-px shrink-0 bg-border-muted sm:block" />

          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
            Phase 0 · Validation
          </span>
        </div>
      </Container>
    </div>
  );
}
