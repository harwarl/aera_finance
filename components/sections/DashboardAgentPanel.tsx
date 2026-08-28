import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { agentScore, holdings } from "@/config/dashboard";

// Replaces the old abstract "risk score + factor bars" readout with what
// the agent is actually doing right now, per holding — a status word
// people can act on, not a number they have to interpret. Status is
// derived from 24h change as a stand-in for a real per-asset signal
// (nothing in config/dashboard.ts tracks "is the agent trimming this"
// yet); swap for the real field once the agent exposes one.
const TRIM_THRESHOLD_PCT = 1;

function statusFor(change24hPct: number): "holding" | "trimming" {
  return Math.abs(change24hPct) > TRIM_THRESHOLD_PCT ? "trimming" : "holding";
}

const STATUS_CLASS = {
  holding: "text-accent",
  trimming: "text-[#e0a94a]",
};

const DOT_CLASS = {
  holding: "bg-accent",
  trimming: "bg-[#e0a94a]",
};

export function DashboardAgentPanel() {
  const shown = holdings.slice(0, 4);

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background-elevated p-6 lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Agent · Watching
        </span>
        <Badge className="border-accent/40 text-accent">Copilot</Badge>
      </div>

      <div className="flex flex-col divide-y divide-border-muted">
        {shown.map((holding) => {
          const status = statusFor(holding.change24hPct);
          return (
            <div
              key={holding.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn("h-2 w-2 shrink-0 rounded-full", DOT_CLASS[status])}
                />
                <span className="text-sm font-bold text-foreground">
                  {holding.symbol}
                </span>
              </span>
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-widest",
                  STATUS_CLASS[status],
                )}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Next
        </span>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">
          {agentScore.next}
        </p>
      </div>
    </div>
  );
}
