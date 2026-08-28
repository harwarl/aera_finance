"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

// Real partner logos from /public/logos — swap `src` values if filenames
// change. Height is fixed per logo via `h-*` so mixed aspect ratios
// (wordmarks vs. square marks) still sit on a common baseline.
const PARTNERS = [
  { name: "Robinhood", src: "/logos/Robinhood.svg" },
  { name: "1inch", src: "/logos/1inch.png" },
  { name: "Morpho", src: "/logos/Morpho.svg" },
  { name: "Anthropic", src: "/logos/Anthropic.svg" },
  { name: "OpenZeppelin", src: "/logos/OpenZeppelin.svg" },
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
                  "radial-gradient(10px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in srgb, var(--accent) 2%, transparent), transparent 70%)",
              }}
            />

            <div className="flex w-max animate-marquee items-center gap-10 group-hover/strip:[animation-play-state:paused]">
              {loop.map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex h-6 shrink-0 items-center opacity-70 transition-all duration-200 hover:opacity-100 [&_img]:brightness-0 [&_img]:invert [&_img]:transition-all [&_img]:duration-200 hover:[&_img]:brightness-100 hover:[&_img]:invert-0"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={96}
                    height={24}
                    className="h-6 w-auto object-contain"
                  />
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
