"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Expand } from "lucide-react";
import { GlowCard } from "@/components/shared/GlowCard";
import {
  reduceMotion,
  type VisualProps,
} from "@/components/shared/PlatformStepVisuals";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type PlatformCarouselItem = {
  index: string;
  title: string;
  statement: string;
  description: string;
  status: "Live" | "Roadmap";
  Visual: (props: VisualProps) => React.ReactElement;
};

// Desktop only: the section pins while scroll drives a discrete "active
// card" index, not a raw scroll-bound translate. Every card's
// position/scale/opacity is re-tweened (eased, ~0.5s) only when that
// index actually changes — never bound frame-by-frame to scroll pixels,
// which is what makes a scrubbed pin feel sticky-linear instead of like a
// real coverflow. ScrollTrigger's own `snap` lands the scroll position
// cleanly on a card once the user stops, so nothing here hand-rolls wheel
// deltas — that's fragile across trackpads and mice in a way the
// library's own scrub/snap already isn't. Below `lg` this becomes a
// plain native horizontal snap-scroll strip: scroll-jacking on touch is a
// bad pattern, so mobile never pins at all.
//
// Card width is measured off the rendered DOM (not a hardcoded px
// constant) so the coverflow spacing scales with the actual viewport
// instead of leaving a small, centered island of cards on a large
// screen — that measured width also drives the stack's step offset.
// Gated on pointer capability, not just width: an iPad Pro in landscape is
// wider than 1024px but is still a touch device, and scroll-jacking on
// touch is exactly the pattern this is meant to avoid. `hover: hover` +
// `pointer: fine` is true for a real mouse/trackpad and false for touch,
// regardless of how big the touch screen is.
const DESKTOP_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const SCROLL_PER_CARD = 650;
const STEP_RATIO = 0.62;
const MAX_VISIBLE_OFFSET = 3;
const FALLBACK_CARD_SIZE = { width: 320, height: 384 };

// Mirrors the `w-[clamp(320px,min(30vw,56vh),620px)]` / `lg:h-[min(46vh,460px)]`
// classes on the card below exactly, computed from window dimensions
// instead of measured off the DOM. A DOM measurement (ResizeObserver) only
// resolves after the first paint, so the stage would render once at a
// fallback size and then visibly jump to the real one a frame later —
// computing the same formula in JS lets the very first paint already be
// correct.
function computeCardSize() {
  if (typeof window === "undefined") return FALLBACK_CARD_SIZE;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(Math.max(320, Math.min(0.3 * vw, 0.56 * vh)), 620);
  const height = Math.min(0.46 * vh, 460);
  return { width, height };
}

function coverflowLayout(offset: number, step: number) {
  const abs = Math.abs(offset);
  return {
    x: offset * step,
    scale: Math.max(1 - abs * 0.16, 0.6),
    opacity: abs > MAX_VISIBLE_OFFSET ? 0 : Math.max(1 - abs * 0.4, 0),
    zIndex: 20 - abs,
  };
}

function StatusBadge({ status }: { status: PlatformCarouselItem["status"] }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
        status === "Live"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-border text-foreground-faint",
      )}
    >
      {status}
    </span>
  );
}

function CardFace({
  item,
  active,
}: {
  item: PlatformCarouselItem;
  active: boolean;
}) {
  const { Visual } = item;
  return (
    // Fixed height + overflow-hidden at every breakpoint, not just mobile:
    // content varies a lot in natural height (a 3-row guardrails list vs.
    // the full autonomy dial), and a content-driven height on desktop meant
    // every card had a different total height — the footer/caption block
    // ended up sitting at a different vertical position on every card
    // instead of lining up. Locking the height means taller content gets
    // centered and cropped inside the visual slot rather than growing the
    // whole card.
    <GlowCard className="flex h-[clamp(340px,76vw,460px)] flex-col overflow-hidden rounded-2xl border border-border-muted bg-background-elevated lg:h-[min(46vh,460px)]">
      <div className="flex items-center justify-between p-4 pb-2 lg:p-6 lg:pb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border-muted bg-background-subtle font-mono text-xs text-foreground-faint lg:h-8 lg:w-8 lg:text-sm">
          {item.index}
        </span>
        <StatusBadge status={item.status} />
      </div>

      <div className="flex flex-1 items-center justify-center overflow-hidden px-5 py-2 lg:px-7 lg:py-6">
        <Visual active={active} />
      </div>

      <div className="shrink-0 border-t border-border-muted bg-background-subtle/60 p-4 lg:p-7">
        <h3 className="text-sm font-bold leading-snug text-foreground lg:text-lg">
          {item.statement}
        </h3>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-foreground-faint lg:mt-2 lg:text-[10px]">
          {item.title}
        </p>
      </div>
    </GlowCard>
  );
}

export function PlatformCarousel({ items }: { items: PlatformCarouselItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cardSize, setCardSize] = useState(FALLBACK_CARD_SIZE);
  const activeRef = useRef(0);
  const positionedRef = useRef(false);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [enablePin, setEnablePin] = useState(false);

  // Defaults to the safe swipeable experience (matches the server-rendered
  // markup, so there's no hydration mismatch) and only switches on once a
  // real desktop pointer is confirmed client-side. `enablePin` and
  // `cardSize` are set together in the same callback (React batches them
  // into one commit) so the desktop stage's very first render already has
  // its correct size — computing size from a DOM measurement afterward
  // (the previous ResizeObserver approach) meant one frame painted at the
  // fallback size, then visibly jumped once the real size arrived, which
  // read as the whole section shifting the moment it came into view.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    function sync(matches: boolean) {
      setEnablePin(matches);
      if (matches) setCardSize(computeCardSize());
    }
    function onResize() {
      if (mql.matches) setCardSize(computeCardSize());
    }
    const raf = requestAnimationFrame(() => sync(mql.matches));
    const onChange = (e: MediaQueryListEvent) => sync(e.matches);
    mql.addEventListener("change", onChange);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Mobile has no pin/scroll-jack at all — just a native snap-scroll strip
  // — so "which card is centered" is tracked with an IntersectionObserver
  // scoped to that strip instead of ScrollTrigger, driving both the dot
  // progress row and each visual's replay-on-arrival animation.
  useEffect(() => {
    const root = mobileTrackRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = mobileCardRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (idx !== -1) setMobileActiveIndex(idx);
          }
        });
      },
      { root, threshold: 0.6 },
    );
    mobileCardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, [items.length, enablePin]);

  useEffect(() => {
    if (!enablePin) {
      positionedRef.current = false;
      return;
    }
    if (reduceMotion()) return;
    const step = cardSize.width * STEP_RATIO;
    // The very first time cards are placed, snap instantly (gsap.set) —
    // animating in from an unplaced state on mount is itself a visible
    // "jump" the moment the section comes into view. Every index change
    // after that eases as before.
    const instant = !positionedRef.current;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const { x, scale, opacity, zIndex } = coverflowLayout(
        i - activeIndex,
        step,
      );
      if (instant) {
        gsap.set(card, { x, scale, opacity, zIndex });
      } else {
        gsap.to(card, {
          x,
          scale,
          opacity,
          zIndex,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
    positionedRef.current = true;
  }, [activeIndex, cardSize.width, enablePin]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enablePin || reduceMotion()) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      // Pinning from the trigger's own center (not its top) is what keeps
      // the stack vertically centered in the viewport for the whole pin —
      // the section is shorter than the viewport on purpose (no h-screen,
      // see below), and "top top" would pin it flush against the top
      // instead, leaving all the extra room as dead space underneath.
      start: "center center",
      end: () => `+=${(items.length - 1) * SCROLL_PER_CARD}`,
      pin: true,
      scrub: 0.4,
      snap: 1 / (items.length - 1),
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (items.length - 1));
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActiveIndex(idx);
        }
      },
    });

    return () => trigger.kill();
  }, [items.length, enablePin]);

  const active = items[activeIndex];

  return (
    // overflow-x-hidden: the coverflow's side cards (up to MAX_VISIBLE_OFFSET
    // away) are positioned with a translateX past the edge of the stage on
    // purpose, and without this they widen the page's own scrollable area
    // and produce a horizontal scrollbar.
    <div ref={sectionRef} className="relative overflow-x-hidden">
      {/* No h-screen here: the pin only needs to hug its own content — the
          page background is flat everywhere (see globals.css), so a pinned
          box shorter than the viewport never risks the next section
          showing through underneath it. Which experience renders at all is
          driven by `enablePin` (a real mouse/trackpad + >=1024px), not a
          CSS breakpoint alone — see the DESKTOP_QUERY comment above. */}
      {enablePin ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div
            ref={stageRef}
            className="relative mx-auto w-full max-w-7xl"
            style={{ height: `min(${cardSize.height + 80}px, 78vh)` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(42vw circle at 50% 50%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
              }}
            />
            {items.map((item, i) => (
              <div
                key={item.index}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 w-[clamp(320px,min(30vw,56vh),620px)] -translate-x-1/2 -translate-y-1/2"
                style={{ willChange: "transform, opacity" }}
              >
                <CardFace item={item} active={i === activeIndex} />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-lg text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                {String(activeIndex + 1).padStart(2, "0")} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setDetailOpen((v) => !v)}
                aria-expanded={detailOpen}
                aria-label="Toggle full description"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border-muted text-foreground-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                <Expand className="h-3 w-3" />
              </button>
            </div>
            <p
              className={cn(
                "mx-auto mt-3 max-w-[46ch] text-sm leading-relaxed text-foreground-muted transition-all duration-300",
                detailOpen
                  ? "max-h-24 opacity-100"
                  : "max-h-0 overflow-hidden opacity-0",
              )}
            >
              {active.description}
            </p>
          </div>
        </div>
      ) : (
        // Phone through tablet (including a touch tablet wider than
        // 1024px, e.g. an iPad Pro in landscape): one dominant card at a
        // time, native snap-scroll left/right, no pin. The active card
        // (via IntersectionObserver, above) drives both its own visual's
        // entrance animation and the dot row below.
        <div className="py-4">
          <div
            ref={mobileTrackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
          >
            {items.map((item, i) => (
              <div
                key={item.index}
                ref={(el) => {
                  mobileCardRefs.current[i] = el;
                }}
                className="w-[min(82vw,440px)] shrink-0 snap-center"
              >
                <CardFace item={item} active={i === mobileActiveIndex} />
                <p className="mt-3 line-clamp-2 px-1 text-xs leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            {items.map((item, i) => (
              <span
                key={item.index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === mobileActiveIndex ? "w-5 bg-accent" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
