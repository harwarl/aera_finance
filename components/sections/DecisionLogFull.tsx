"use client";

import { useMemo, useState } from "react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { Pagination } from "@/components/shared/Pagination";
import { cn } from "@/lib/utils";
import { decisionLog } from "@/config/dashboard";
import {
  STATUS_DOT_CLASS,
  STATUS_LABEL,
  STATUS_TEXT_CLASS,
  formatRelativeTime,
} from "@/lib/decisions";
import type { DecisionStatus } from "@/types";

type Filter = "all" | DecisionStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "executed", label: "Executed" },
  { value: "blocked", label: "Blocked" },
  { value: "review", label: "Held for Review" },
];

const PAGE_SIZE = 10;

export function DecisionLogFull() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: decisionLog.length,
      executed: 0,
      blocked: 0,
      review: 0,
    };
    for (const entry of decisionLog) base[entry.status] += 1;
    return base;
  }, []);

  const filtered =
    filter === "all"
      ? decisionLog
      : decisionLog.filter((entry) => entry.status === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => changeFilter(item.value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
                  active
                    ? "border-accent text-accent"
                    : "border-border-muted text-foreground-faint hover:text-foreground-muted"
                )}
              >
                {item.label} · {counts[item.value]}
              </button>
            );
          })}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <DashboardCard>
        {paginated.length === 0 ? (
          <p className="py-8 text-center font-mono text-xs uppercase tracking-widest text-foreground-faint">
            No entries for this filter
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-border-muted">
            {paginated.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-foreground-faint">
                    {formatRelativeTime(entry.timestamp)}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-foreground-muted">
                    {entry.action}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      STATUS_TEXT_CLASS[entry.status]
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        STATUS_DOT_CLASS[entry.status]
                      )}
                    />
                    {STATUS_LABEL[entry.status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground-muted">
                  {entry.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>
    </div>
  );
}
