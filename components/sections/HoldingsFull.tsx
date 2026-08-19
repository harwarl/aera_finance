"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { cn } from "@/lib/utils";
import { holdings } from "@/config/dashboard";
import { TYPE_LABEL, formatCurrency } from "@/lib/holdings";
import type { HoldingType } from "@/types";

type Filter = "all" | HoldingType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "crypto", label: "Crypto" },
  { value: "yield", label: "Yield" },
];

export function HoldingsFull() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: holdings.length,
      crypto: 0,
      yield: 0,
    };
    for (const holding of holdings) base[holding.type] += 1;
    return base;
  }, []);

  const filtered =
    filter === "all"
      ? holdings
      : holdings.filter((holding) => holding.type === filter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
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

      <DashboardCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-140 border-collapse text-left">
            <thead>
              <tr className="border-b border-border-muted">
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Asset
                </th>
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Type
                </th>
                <th className="py-2 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Value
                </th>
                <th className="py-2 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  % Portfolio
                </th>
                <th className="py-2 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  24h
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((holding) => (
                <tr
                  key={holding.id}
                  className="border-b border-border-muted transition-colors last:border-0 hover:bg-background-subtle/40"
                >
                  <td className="py-3 pr-4">
                    <Link
                      href={`/dashboard/holdings/${holding.id}`}
                      className="group block"
                    >
                      <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                        {holding.symbol}
                      </span>
                      <span className="block text-xs text-foreground-faint">
                        {holding.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                      {TYPE_LABEL[holding.type]}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right text-sm text-foreground">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-xs text-foreground-muted">
                    {holding.allocationPct.toFixed(1)}%
                  </td>
                  <td
                    className={cn(
                      "py-3 text-right font-mono text-xs",
                      holding.change24hPct > 0 && "text-accent",
                      holding.change24hPct < 0 && "text-danger",
                      holding.change24hPct === 0 && "text-foreground-faint"
                    )}
                  >
                    {holding.change24hPct > 0 ? "+" : ""}
                    {holding.change24hPct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-center font-mono text-xs uppercase tracking-widest text-foreground-faint">
            No holdings for this filter
          </p>
        ) : null}
      </DashboardCard>
    </div>
  );
}
