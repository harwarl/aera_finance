"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageToken = number | "ellipsis";

function getPageTokens(current: number, total: number): PageToken[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "ellipsis", total];
  if (current >= total - 2) return [1, "ellipsis", total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1.5 border border-transparent px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft className="h-3 w-3" />
        Previous
      </button>

      {getPageTokens(page, totalPages).map((token, i) =>
        token === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-1 font-mono text-xs text-foreground-faint"
          >
            ···
          </span>
        ) : (
          <button
            key={token}
            type="button"
            onClick={() => onPageChange(token)}
            aria-current={token === page ? "page" : undefined}
            className={cn(
              "flex h-8 min-w-8 items-center justify-center border px-2 font-mono text-xs transition-colors",
              token === page
                ? "border-accent text-accent"
                : "border-border-muted text-foreground-faint hover:border-border hover:text-foreground"
            )}
          >
            {token}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex items-center gap-1.5 border border-transparent px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
      >
        Next
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}
