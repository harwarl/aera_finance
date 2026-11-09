"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mouse tilt wrapper for the hero monument. Pointer position is normalised to
 * -1…1, throttled with requestAnimationFrame, and applied as
 * rotateY(mx·9deg) rotateX(−my·6deg) with a 1.2s follow transition.
 */
export function MonumentTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `rotateY(${(mx * 9).toFixed(2)}deg) rotateX(${(-my * 6).toFixed(2)}deg)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        transformStyle: "preserve-3d",
        transition: "transform 1.2s cubic-bezier(.16,1,.3,1)",
        transform: "rotateY(0deg) rotateX(0deg)",
      }}
    >
      {children}
    </div>
  );
}

// Sample starting height from the design. TODO: subscribe to real Robinhood
// Chain block numbers in production (BUILD.md §4.1).
const START_BLOCK = 18402117;

/** Block number: +1–3 every 1.2s, flashes accent for 260ms, eases back. */
export function BlockNumber() {
  const [block, setBlock] = useState(START_BLOCK);
  const [tickOn, setTickOn] = useState(false);

  useEffect(() => {
    let off: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      setBlock((b) => b + 1 + Math.floor(Math.random() * 3));
      setTickOn(true);
      off = setTimeout(() => setTickOn(false), 260);
    }, 1200);
    return () => {
      clearInterval(id);
      if (off) clearTimeout(off);
    };
  }, []);

  return (
    <span style={{ color: tickOn ? "var(--accent)" : "#AEBBBA", transition: "color .5s" }}>
      {block.toLocaleString("en-US")}
    </span>
  );
}
