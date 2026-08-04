import { Button } from "@/components/ui/Button";
import { portfolioRules } from "@/config/dashboard";

export function DashboardRules() {
  return (
    <div className="border border-border-muted bg-background-elevated/50 p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Your Rules
        </span>
        <Button href="/dashboard/rules" variant="secondary" size="sm">
          Edit
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {portfolioRules.map((rule) => (
          <div key={rule.label} className="border border-border-muted p-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {rule.label}
            </span>
            <p className="mt-1.5 text-sm font-bold text-foreground">
              {rule.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-foreground-faint">
        These limits are enforced by the vault contract itself — the
        agent can never exceed them regardless of its own reasoning.
      </p>
    </div>
  );
}
