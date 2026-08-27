"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { CopyableAddress } from "@/components/shared/CopyableAddress";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/holdings";
import { portfolioSummary } from "@/config/dashboard";
import { useVault } from "@/hooks/useVault";

function StatPill({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background-elevated/60 px-4 py-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
        {label}
      </span>
      <span className="whitespace-nowrap text-sm font-bold text-foreground">
        {value}
      </span>
      {note ? (
        <span className="whitespace-nowrap font-mono text-[10px] text-foreground-faint">
          {note}
        </span>
      ) : null}
    </div>
  );
}

export function DashboardSummary() {
  const { vault } = useVault();
  const isPositive = portfolioSummary.change24hPct >= 0;
  const DeltaIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          {portfolioSummary.vaultName}
        </span>
        {vault ? <CopyableAddress address={vault.address} /> : null}
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <ScrambleText
          value={formatCurrency(portfolioSummary.totalValue)}
          className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl"
        />
        <span
          className={cn(
            "flex items-center gap-1 font-mono text-sm",
            isPositive ? "text-accent" : "text-danger"
          )}
        >
          <DeltaIcon className="h-3.5 w-3.5" />
          {isPositive ? "+" : ""}
          {formatCurrency(portfolioSummary.change24hAbs)} · 24h
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <StatPill label="Base Yield" value={`${portfolioSummary.baseYieldPct}%`} />
        <StatPill
          label="Yield Earned 90D"
          value={formatCurrency(portfolioSummary.yieldEarned90dAbs)}
        />
        <StatPill
          label="Max Drawdown"
          value={`${portfolioSummary.maxDrawdownPct}%`}
          note={`vs BTC ${portfolioSummary.btcMaxDrawdownPct}%`}
        />
      </div>
    </div>
  );
}
