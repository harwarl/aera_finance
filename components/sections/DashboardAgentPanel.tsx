import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { agentScore } from "@/config/dashboard";

function factorToneClass(value: number) {
  if (value >= 60) return "bg-danger";
  if (value >= 35) return "bg-foreground-faint";
  return "bg-accent";
}

export function DashboardAgentPanel() {
  const scorePct = (agentScore.value / agentScore.max) * 100;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background-elevated p-6 lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Agent · Risk Score
        </span>
        <Badge className="border-accent/40 text-accent">Copilot</Badge>
      </div>

      <div>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black tracking-tighter text-foreground">
            {agentScore.value}
          </span>
          <span className="mb-1.5 font-mono text-sm text-foreground-faint">
            / {agentScore.max}
          </span>
        </div>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
          {agentScore.tier}
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-background">
        <div className="absolute inset-y-0 left-0 w-[40%] bg-accent" />
        <div className="absolute inset-y-0 left-[40%] w-[30%] bg-border" />
        <div className="absolute inset-y-0 left-[70%] w-[30%] bg-danger/70" />
        <div
          className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-foreground"
          style={{ left: `${Math.min(Math.max(scorePct, 1), 99)}%` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {agentScore.factors.map((factor) => (
          <div key={factor.label} className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {factor.label}
            </span>
            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-background">
              <span
                className={cn("block h-full", factorToneClass(factor.value))}
                style={{ width: `${factor.value}%` }}
              />
            </span>
          </div>
        ))}
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
