import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { cn } from "@/lib/utils";
import { decisionLog } from "@/config/dashboard";
import {
  ACTION_ICON,
  ACTION_LABEL,
  STATUS_LABEL,
  formatRelativeTime,
} from "@/lib/decisions";

const PREVIEW_COUNT = 3;

const STATUS_ICON_CLASS = {
  executed: "border-accent/30 bg-accent/10 text-accent",
  blocked: "border-danger/30 bg-danger/10 text-danger",
  review: "border-border bg-background-subtle text-foreground-faint",
} as const;

export function DashboardAgentActivity() {
  const preview = decisionLog.slice(0, PREVIEW_COUNT);

  return (
    <DashboardCard className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Agent Activity
        </span>
        <Link
          href="/connect"
          className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
        >
          View Full Log
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-5 flex flex-1 flex-col divide-y divide-border-muted">
        {preview.map((entry) => {
          const Icon = ACTION_ICON[entry.action];
          return (
            <div
              key={entry.id}
              className="flex gap-3 py-3.5 first:pt-0 last:pb-0"
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                  STATUS_ICON_CLASS[entry.status],
                )}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-foreground-muted">
                  <span className="font-bold text-foreground">
                    {ACTION_LABEL[entry.action] ?? entry.action}
                  </span>
                  : {entry.detail}
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  {formatRelativeTime(entry.timestamp)} ·{" "}
                  {STATUS_LABEL[entry.status]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
