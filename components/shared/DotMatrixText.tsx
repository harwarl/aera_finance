"use client";

import { useEffect, useState } from "react";
import { buildDotMatrix } from "@/lib/dotMatrixFont";
import { cn } from "@/lib/utils";

const LIT_RATIO = 0.16;
const CYCLE_MS = 5200;

const ACCENT_SHADES = [
  "bg-accent",
  "bg-accent-300",
  "bg-accent-600",
  "bg-accent-100",
];

function randomLitSet(cellCount: number) {
  const lit = new Set<number>();
  const target = Math.round(cellCount * LIT_RATIO);
  while (lit.size < target && lit.size < cellCount) {
    lit.add(Math.floor(Math.random() * cellCount));
  }
  return lit;
}

export function DotMatrixText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const grid = buildDotMatrix(text);

  const litIndexByKey = new Map<string, number>();
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) litIndexByKey.set(`${r}-${c}`, litIndexByKey.size);
    }
  }
  const litCellCount = litIndexByKey.size;

  // Server and first client render show every letter-pixel unlit, so
  // there's nothing to hydrate-mismatch on; randomization starts post-mount.
  const [lit, setLit] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      setLit(randomLitSet(litCellCount));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      interval = setInterval(() => {
        setLit(randomLitSet(litCellCount));
      }, CYCLE_MS);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [litCellCount]);

  return (
    <div
      aria-hidden="true"
      className={cn("grid w-full gap-[0.6%]", className)}
      style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((on, colIndex) => {
          if (!on) {
            return (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square w-full"
              />
            );
          }

          const index = litIndexByKey.get(`${rowIndex}-${colIndex}`) ?? 0;
          const isLit = lit.has(index);

          return (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "aspect-square w-full transition-colors duration-700",
                isLit
                  ? ACCENT_SHADES[index % ACCENT_SHADES.length]
                  : "bg-foreground-faint/25"
              )}
            />
          );
        })
      )}
    </div>
  );
}
