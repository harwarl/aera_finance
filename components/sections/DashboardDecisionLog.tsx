import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { decisionLog } from "@/config/dashboard";
import {
  STATUS_DOT_CLASS,
  STATUS_LABEL,
  STATUS_TEXT_CLASS,
  formatRelativeTime,
} from "@/lib/decisions";

const PREVIEW_COUNT = 4;

export function DashboardDecisionLog() {
  const preview = decisionLog.slice(0, PREVIEW_COUNT);

  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Decision Log
          </span>
          <Link
            href="/dashboard/decisions"
            className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
          >
            View Full Log
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 flex flex-col divide-y divide-border-muted">
          {preview.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-foreground-faint">
                  {formatRelativeTime(entry.timestamp)}
                </span>
                <span className="border border-border px-2 py-0.5 text-foreground-muted">
                  {entry.action}
                </span>
                <span
                  className={`flex items-center gap-1.5 ${STATUS_TEXT_CLASS[entry.status]}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_CLASS[entry.status]}`}
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
      </div>
    </CornerBrackets>
  );
}
