import { DashboardCard } from "@/components/shared/DashboardCard";
import { Button } from "@/components/ui/Button";
import { portfolioRules } from "@/config/dashboard";
import type { RebalanceSensitivity, RiskTolerance } from "@/types";

const RISK_LABEL: Record<RiskTolerance, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const SENSITIVITY_LABEL: Record<RebalanceSensitivity, string> = {
  conservative: "Conservative",
  balanced: "Balanced",
  responsive: "Responsive",
};

export function DashboardRules() {
  const previewItems = [
    { label: "Risk Tolerance", value: RISK_LABEL[portfolioRules.riskTolerance] },
    {
      label: "Target Allocation",
      value: `${portfolioRules.targetCryptoAllocationPct}% Crypto / ${100 - portfolioRules.targetCryptoAllocationPct}% Yield`,
    },
    {
      label: "Rebalance Sensitivity",
      value: SENSITIVITY_LABEL[portfolioRules.rebalanceSensitivity],
    },
  ];

  return (
    <DashboardCard>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Your Rules
        </span>
        <Button href="/dashboard/rules" variant="secondary" size="sm">
          Edit
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {previewItems.map((item) => (
          <div key={item.label} className="rounded-xl border border-border-muted bg-background/40 p-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              {item.label}
            </span>
            <p className="mt-1.5 text-sm font-bold text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-foreground-faint">
        These are your preferences — the agent operates inside them, and
        you can change them any time.
      </p>
    </DashboardCard>
  );
}
