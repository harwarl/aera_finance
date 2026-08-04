import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { PortfolioConstraints } from "@/components/sections/PortfolioConstraints";
import { supportedAssets } from "@/config/dashboard";
import { TYPE_LABEL } from "@/lib/holdings";

export const metadata: Metadata = {
  title: "Security & Trust — Aera Finance",
};

export default function SecurityPage() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                Security &amp; Trust
              </span>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-foreground-muted">
                What the agent is allowed to touch, the hard limits it can
                never cross, and where things stand on independent review.
              </p>
            </div>

            <CornerBrackets>
              <div className="border border-border-muted bg-background-elevated/50 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                  Supported Assets
                </span>
                <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-foreground-faint">
                  The full whitelist Aera is permitted to trade. Nothing
                  outside this list can enter your vault, and the agent
                  cannot expand it on its own.
                </p>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[400px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border-muted">
                        <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                          Asset
                        </th>
                        <th className="py-2 text-right font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportedAssets.map((asset) => (
                        <tr
                          key={asset.symbol}
                          className="border-b border-border-muted last:border-0"
                        >
                          <td className="py-3 pr-4">
                            <span className="block text-sm font-bold text-foreground">
                              {asset.symbol}
                            </span>
                            <span className="block text-xs text-foreground-faint">
                              {asset.name}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-xs uppercase tracking-widest text-foreground-muted">
                            {TYPE_LABEL[asset.type]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CornerBrackets>

            <CornerBrackets>
              <div className="border border-border-muted bg-background-elevated/50 p-6">
                <PortfolioConstraints />
              </div>
            </CornerBrackets>

            <CornerBrackets>
              <div className="border border-border-muted bg-background-elevated/50 p-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-danger" />
                  <span className="font-mono text-xs uppercase tracking-widest text-danger">
                    Audit Status · Not Yet Audited
                  </span>
                </div>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-foreground-muted">
                  We have not yet completed an independent smart contract
                  audit. This is a hard requirement before any beta involving
                  funds beyond the founder&apos;s own, and we will publish
                  the full results here once it&apos;s done — including any
                  issues found, not just a summary.
                </p>
              </div>
            </CornerBrackets>
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
