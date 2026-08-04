import type {
  AgentStatus,
  AllocationSlice,
  DecisionLogEntry,
  Holding,
  PortfolioRule,
} from "@/types";

// Everything in this file is placeholder data for building out the
// dashboard UI — there is no live vault or agent yet (see the whitepaper's
// Roadmap: Phase 0). Replace with real on-chain reads once the vault
// contract and agent are live.

export const portfolioSummary = {
  totalValue: 128_450.32,
  driftPct: 2.4,
  driftToleranceP: 5,
  agentStatus: "active" as AgentStatus,
};

export const allocation: AllocationSlice[] = [
  { label: "Stock Tokens", pct: 58 },
  { label: "Yield", pct: 27 },
  { label: "Cash", pct: 15 },
];

export const portfolioRules: PortfolioRule[] = [
  { label: "Risk Tolerance", value: "Moderate" },
  { label: "Max Sector Exposure", value: "40% per sector" },
  { label: "Max Position Size", value: "25% of portfolio" },
  { label: "Trade Frequency Cap", value: "6 trades / week" },
];

export const holdings: Holding[] = [
  {
    id: "aaplx",
    symbol: "AAPLx",
    name: "Apple Stock Token",
    type: "stock",
    value: 38_240.11,
    allocationPct: 29.8,
    change24hPct: 1.4,
  },
  {
    id: "tslax",
    symbol: "TSLAx",
    name: "Tesla Stock Token",
    type: "stock",
    value: 21_960.5,
    allocationPct: 17.1,
    change24hPct: -2.1,
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    value: 14_710.0,
    allocationPct: 11.5,
    change24hPct: 0.6,
  },
  {
    id: "usdc-yield",
    symbol: "USDC",
    name: "Morpho Yield Position",
    type: "yield",
    value: 34_680.4,
    allocationPct: 27.0,
    change24hPct: 0.01,
  },
  {
    id: "cash",
    symbol: "USDC",
    name: "Idle Cash",
    type: "yield",
    value: 18_859.31,
    allocationPct: 14.6,
    change24hPct: 0,
  },
];

export const decisionLog: DecisionLogEntry[] = [
  {
    id: "dec-1",
    timestamp: "2026-07-28T09:41:02Z",
    status: "executed",
    action: "REBALANCE",
    detail:
      "Trimmed AAPLx from 34% to 30% after it drifted past your target band, and routed the difference into your approved yield position.",
  },
  {
    id: "dec-2",
    timestamp: "2026-07-28T09:41:04Z",
    status: "executed",
    action: "YIELD ROUTE",
    detail:
      "Moved idle USDC balance into a higher-yield Morpho position now that the rate spread cleared your 0.4% threshold.",
  },
  {
    id: "dec-3",
    timestamp: "2026-07-27T14:12:47Z",
    status: "blocked",
    action: "REBALANCE",
    detail:
      "Proposed a 32% TSLAx position — blocked by your 25% max position size constraint before execution. No trade occurred.",
  },
  {
    id: "dec-4",
    timestamp: "2026-07-26T18:03:15Z",
    status: "review",
    action: "REBALANCE",
    detail:
      "Proposed trade size was within limits but 4.8x larger than your recent average — held for manual review by the circuit breaker.",
  },
  {
    id: "dec-5",
    timestamp: "2026-07-25T08:55:30Z",
    status: "executed",
    action: "TRADE",
    detail:
      "Executed via the venue with the best net price after fees — settled on-chain in one transaction.",
  },
  {
    id: "dec-6",
    timestamp: "2026-07-24T11:20:09Z",
    status: "executed",
    action: "YIELD ROUTE",
    detail:
      "Rotated a portion of idle cash into yield after balances sat uninvested past your configured window.",
  },
];

export const feeSummary = {
  aum: portfolioSummary.totalValue,
  feeRatePct: 0.75,
  chargedToDate: 214.36,
  billingCycle: "Monthly, in-kind",
};
