import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DashboardGate } from "@/components/sections/DashboardGate";
import { CornerBrackets } from "@/components/shared/CornerBrackets";
import { TradingViewChart } from "@/components/shared/TradingViewChart";
import { HoldingActions } from "@/components/sections/HoldingActions";
import { holdings } from "@/config/dashboard";
import { TYPE_LABEL, formatCurrency } from "@/lib/holdings";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return holdings.map((holding) => ({ id: holding.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const holding = holdings.find((h) => h.id === id);
  if (!holding) return {};

  return {
    title: `${holding.symbol} — Aera Finance`,
  };
}

export default async function HoldingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const holding = holdings.find((h) => h.id === id);

  if (!holding) notFound();

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <DashboardGate>
          <div className="flex flex-col gap-6">
            <Link
              href="/dashboard/holdings"
              className="group flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-faint transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              Back to Holdings
            </Link>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black tracking-tighter text-foreground sm:text-4xl">
                    {holding.symbol}
                  </h1>
                  <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
                    {TYPE_LABEL[holding.type]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground-faint">
                  {holding.name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
              <CornerBrackets className="lg:col-span-3">
                <div className="w-full h-140 border border-border-muted bg-background-elevated/50 p-2 sm:p-3">
                  {holding.tradingViewSymbol ? (
                    <TradingViewChart symbol={holding.tradingViewSymbol} />
                  ) : (
                    <div className="flex h-140 flex-col items-center justify-center gap-2 px-6 text-center sm:h-200">
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground-faint">
                        No Market Chart
                      </span>
                      <p className="max-w-[36ch] text-sm leading-relaxed text-foreground-muted">
                        {holding.name} is a stablecoin position, not a traded
                        market — there&apos;s no meaningful price chart to show
                        here.
                      </p>
                    </div>
                  )}
                </div>
              </CornerBrackets>

              <div className="flex flex-col gap-6 lg:col-span-1">
                <CornerBrackets>
                  <div className="border border-border-muted bg-background-elevated/50 p-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                      Position Value
                    </span>
                    <p className="mt-1.5 text-2xl font-black tracking-tighter text-foreground">
                      {formatCurrency(holding.value)}
                    </p>
                  </div>
                </CornerBrackets>
                <CornerBrackets>
                  <div className="border border-border-muted bg-background-elevated/50 p-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                      % of Portfolio
                    </span>
                    <p className="mt-1.5 text-2xl font-black tracking-tighter text-foreground">
                      {holding.allocationPct.toFixed(1)}%
                    </p>
                  </div>
                </CornerBrackets>
                <CornerBrackets>
                  <div className="border border-border-muted bg-background-elevated/50 p-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-faint">
                      24h Change
                    </span>
                    <p
                      className={cn(
                        "mt-1.5 text-2xl font-black tracking-tighter",
                        holding.change24hPct > 0 && "text-accent",
                        holding.change24hPct < 0 && "text-danger",
                        holding.change24hPct === 0 && "text-foreground-faint",
                      )}
                    >
                      {holding.change24hPct > 0 ? "+" : ""}
                      {holding.change24hPct}%
                    </p>
                  </div>
                </CornerBrackets>

                <HoldingActions symbol={holding.symbol} />
              </div>
            </div>
          </div>
        </DashboardGate>
      </Container>
    </section>
  );
}
