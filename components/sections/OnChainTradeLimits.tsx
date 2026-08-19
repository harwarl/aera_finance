"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Radio } from "lucide-react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { TxStatus } from "@/components/shared/TxStatus";
import { Button } from "@/components/ui/Button";
import { useVaultRules, useVaultWrite, vaultWrite } from "@/hooks/useVaultContract";

const SECONDS_PER_DAY = 86_400;
const BPS_PER_PERCENT = 100;

function bpsToPercent(bps: bigint) {
  return Number(bps) / BPS_PER_PERCENT;
}

function percentToBps(pct: number) {
  return BigInt(Math.round(pct * BPS_PER_PERCENT));
}

function secondsToDays(seconds: bigint) {
  return Number(seconds) / SECONDS_PER_DAY;
}

function daysToSeconds(days: number) {
  return BigInt(Math.round(days * SECONDS_PER_DAY));
}

export function OnChainTradeLimits() {
  const { address } = useAccount();
  const { data: rules, isLoading, refetch } = useVaultRules(address);
  const tx = useVaultWrite();

  const [maxTradeSizePct, setMaxTradeSizePct] = useState(15);
  const [maxSlippagePct, setMaxSlippagePct] = useState(0.5);
  const [maxTradesPerPeriod, setMaxTradesPerPeriod] = useState(6);
  const [periodDays, setPeriodDays] = useState(7);

  useEffect(() => {
    if (!rules) return;
    const timeout = setTimeout(() => {
      setMaxTradeSizePct(bpsToPercent(rules.maxTradeSizeBps));
      setMaxSlippagePct(bpsToPercent(rules.maxSlippageBps));
      setMaxTradesPerPeriod(Number(rules.maxTradesPerPeriod));
      setPeriodDays(secondsToDays(rules.periodDuration));
    }, 0);
    return () => clearTimeout(timeout);
  }, [rules]);

  useEffect(() => {
    if (tx.isConfirmed) refetch();
  }, [tx.isConfirmed, refetch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await tx.writeContractAsync(
      vaultWrite.updateRules({
        maxTradeSizeBps: percentToBps(maxTradeSizePct),
        maxSlippageBps: percentToBps(maxSlippagePct),
        maxTradesPerPeriod: BigInt(maxTradesPerPeriod),
        periodDuration: daysToSeconds(periodDays),
      })
    );
  }

  return (
    <DashboardCard>
      <div className="flex items-center gap-2">
        <Radio className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          On-Chain Trade Limits
        </span>
      </div>
      <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
        Unlike the preferences above, these four values live directly on
        the vault contract and are what actually gates every trade the
        agent proposes — read live from{" "}
        <code className="text-foreground-muted">getRules</code> and
        written with{" "}
        <code className="text-foreground-muted">updateRules</code>.
      </p>

      {tx.hash ? (
        <div className="mt-5">
          <TxStatus tx={tx} onClose={() => tx.reset()} confirmedLabel="Trade limits updated on-chain." />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border-muted bg-background/40 p-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Max Trade Size
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={maxTradeSizePct}
                  onChange={(e) => setMaxTradeSizePct(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  % of portfolio
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border-muted bg-background/40 p-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Max Slippage
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={maxSlippagePct}
                  onChange={(e) => setMaxSlippagePct(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  %
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border-muted bg-background/40 p-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Max Trades
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={maxTradesPerPeriod}
                  onChange={(e) => setMaxTradesPerPeriod(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  per period
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-border-muted bg-background/40 p-4">
              <label className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                Period Duration
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={periodDays}
                  onChange={(e) => setPeriodDays(Number(e.target.value))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                />
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  days
                </span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full sm:w-auto" disabled={!address || isLoading}>
            Update Trade Limits
          </Button>
        </form>
      )}
    </DashboardCard>
  );
}
