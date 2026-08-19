"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApprovedAsset } from "@/config/contracts";

function AssetBadge({ symbol }: { symbol: string }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-accent/10 font-mono text-[10px] font-bold text-accent">
      {symbol.charAt(0)}
    </span>
  );
}

export function AssetSelect({
  assets,
  value,
  onChange,
}: {
  assets: ApprovedAsset[];
  value: ApprovedAsset;
  onChange: (symbol: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground transition-colors focus:border-accent focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <AssetBadge symbol={value.symbol} />
          {value.symbol}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-foreground-faint transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-border bg-background-elevated shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          {assets.map((asset) => (
            <button
              key={asset.symbol}
              type="button"
              onClick={() => {
                onChange(asset.symbol);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-bold transition-colors hover:bg-background-subtle",
                asset.symbol === value.symbol
                  ? "text-accent"
                  : "text-foreground"
              )}
            >
              <AssetBadge symbol={asset.symbol} />
              {asset.symbol}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
