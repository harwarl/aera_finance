import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { cn } from "@/lib/utils";
import { holdings } from "@/config/dashboard";
import { TYPE_LABEL, formatCurrency } from "@/lib/holdings";

export function DashboardHoldings() {
  return (
    <CornerBrackets>
      <div className="border border-border-muted bg-background-elevated/50 p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
            Holdings
          </span>
          <Link
            href="/dashboard/holdings"
            className="group flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
          >
            View Full Breakdown
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-muted">
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Asset
                </th>
                <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Type
                </th>
                <th className="py-2 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  Value
                </th>
                <th className="py-2 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  % Portfolio
                </th>
                <th className="py-2 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                  24h
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr
                  key={holding.id}
                  className="border-b border-border-muted transition-colors last:border-0 hover:bg-background-subtle/40"
                >
                  <td className="py-3 pr-4">
                    <Link
                      href={`/dashboard/holdings/${holding.id}`}
                      className="group block"
                    >
                      <span className="block text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                        {holding.symbol}
                      </span>
                      <span className="block text-xs text-foreground-faint">
                        {holding.name}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs uppercase tracking-widest text-foreground-muted">
                    {TYPE_LABEL[holding.type]}
                  </td>
                  <td className="py-3 pr-4 text-right text-sm text-foreground">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-xs text-foreground-muted">
                    {holding.allocationPct.toFixed(1)}%
                  </td>
                  <td
                    className={cn(
                      "py-3 text-right font-mono text-xs",
                      holding.change24hPct > 0 && "text-accent",
                      holding.change24hPct < 0 && "text-danger",
                      holding.change24hPct === 0 && "text-foreground-faint"
                    )}
                  >
                    {holding.change24hPct > 0 ? "+" : ""}
                    {holding.change24hPct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CornerBrackets>
  );
}
