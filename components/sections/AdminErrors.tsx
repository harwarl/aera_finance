"use client";

import { useMemo, useState } from "react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { Pagination } from "@/components/shared/Pagination";
import { cn } from "@/lib/utils";
import { systemErrors } from "@/config/admin";
import { formatRelativeTime } from "@/lib/decisions";
import type { SystemErrorSource } from "@/types";

const PAGE_SIZE = 10;

type Filter = "all" | SystemErrorSource;

const SOURCES: SystemErrorSource[] = [
  "Reconciliation",
  "Agent",
  "Rebalance",
  "Deposit",
  "Withdrawal",
  "RPC",
];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...SOURCES.map((source) => ({ value: source, label: source })),
];

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function AdminErrors() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const base = { all: systemErrors.length } as Record<Filter, number>;
    for (const source of SOURCES) base[source] = 0;
    for (const err of systemErrors) base[err.source] += 1;
    return base;
  }, []);

  const filtered =
    filter === "all"
      ? systemErrors
      : systemErrors.filter((err) => err.source === filter);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changeFilter(next: Filter) {
    setFilter(next);
    setPage(1);
  }

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          System Errors · {systemErrors.length} Total
        </span>
        <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
          Placeholder data — mirrors the shape of the error-log API this
          will read from once it&apos;s live.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((item) => {
            const active = filter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => changeFilter(item.value)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
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

        <div className="mt-5 flex flex-col divide-y divide-border-muted">
          {paginated.map((err) => (
            <div key={err.id} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-foreground-faint">
                  {formatRelativeTime(err.occurred_at)}
                </span>
                <span className="border border-danger/50 px-2 py-0.5 text-danger">
                  {err.source}
                </span>
                <span className="border border-border px-2 py-0.5 text-foreground-muted">
                  {err.kind}
                </span>
                <span className="text-foreground-faint">
                  {err.account ? truncateAddress(err.account) : "System"}
                </span>
              </div>
              <p className="text-sm font-bold text-foreground">{err.message}</p>
              <p className="text-xs leading-relaxed text-foreground-faint">
                {err.detail}
              </p>
            </div>
          ))}

          {paginated.length === 0 ? (
            <p className="py-8 text-center font-mono text-xs uppercase tracking-widest text-foreground-faint">
              No errors for this filter
            </p>
          ) : null}
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </CornerBrackets>
  );
}
