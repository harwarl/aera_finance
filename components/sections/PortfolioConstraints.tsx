import { Lock } from "lucide-react";
import { portfolioConstraints } from "@/config/dashboard";

export function PortfolioConstraints() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          System Constraints
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
          <Lock className="h-3 w-3" />
          Not Editable
        </span>
      </div>
      <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
        These are hard limits enforced by the vault contract itself. The
        agent can never exceed them, no matter what it decides — and there
        is no control here to change them.
      </p>

      <div className="mt-5 flex flex-col divide-y divide-border-muted">
        {portfolioConstraints.map((constraint) => (
          <div
            key={constraint.label}
            className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                {constraint.label}
              </span>
              <span className="font-mono text-sm text-foreground-muted">
                {constraint.value}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-foreground-faint">
              {constraint.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
