import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { feeSummary } from "@/config/dashboard";

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function DashboardFees() {
  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
          Fees
        </span>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Assets Under Management
            </span>
            <p className="mt-1.5 text-lg font-bold text-foreground">
              {formatCurrency(feeSummary.aum)}
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Management Fee
            </span>
            <p className="mt-1.5 text-lg font-bold text-foreground">
              {feeSummary.feeRatePct}% / yr
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
              Charged to Date
            </span>
            <p className="mt-1.5 text-lg font-bold text-foreground">
              {formatCurrency(feeSummary.chargedToDate)}
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-foreground-faint">
          {feeSummary.billingCycle}. No performance fee, and no charge on
          idle, unallocated capital.
        </p>
      </div>
    </CornerBrackets>
  );
}
