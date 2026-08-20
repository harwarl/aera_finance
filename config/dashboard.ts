import type {
  AgentStatus,
  AllocationSlice,
  DecisionLogEntry,
  Holding,
  PortfolioConstraint,
  PortfolioRules,
  SupportedAsset,
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
  { label: "Crypto", pct: 30.5 },
  { label: "Yield", pct: 48.0 },
  { label: "Cash", pct: 21.5 },
];

// "Rules" are the user's own preferences — the agent operates inside them,
// and the user can change them any time. Contrast with `portfolioConstraints`
// below, which the user can see but never edit.
export const portfolioRules: PortfolioRules = {
  riskTolerance: "medium",
  targetCryptoAllocationPct: 65,
  sectorPreferences: [
    { sector: "Layer 1", stance: "favor" },
    { sector: "DeFi", stance: "favor" },
    { sector: "Stablecoins & Yield", stance: "neutral" },
    { sector: "Layer 2", stance: "neutral" },
    { sector: "Meme / Speculative", stance: "avoid" },
  ],
  rebalanceSensitivity: "balanced",
  notifications: {
    every_rebalance: true,
    held_for_review: true,
    weekly_summary: false,
  },
};

export const supportedAssets: SupportedAsset[] = [
  { symbol: "ETH", name: "Ethereum", type: "crypto" },
  { symbol: "BTC", name: "Bitcoin", type: "crypto" },
  { symbol: "USDC", name: "Morpho Yield Position", type: "yield" },
  { symbol: "DAI", name: "DAI Yield Position", type: "yield" },
];

// "Constraints" are limits the agent can never exceed and the user can't
// touch — contrast with the on-chain Trade Limits (max trade size, max
// slippage, max trade frequency), which the vault contract actually lets
// each account owner set for themselves via `updateRules` (see
// OnChainTradeLimits). The asset whitelist below has no such setter
// exposed anywhere in the contract, so it's the one constraint that stays
// genuinely read-only.
export const portfolioConstraints: PortfolioConstraint[] = [
  {
    label: "Supported Assets",
    value: `${supportedAssets.length} Whitelisted Tickers`,
    description:
      "Aera only trades a curated whitelist of crypto assets and approved yield positions — it can't add new assets on its own, and there's no user-facing control to expand it.",
  },
];

export const holdings: Holding[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    value: 21_836.55,
    allocationPct: 17.0,
    change24hPct: 0.6,
    tradingViewSymbol: "COINBASE:ETHUSD",
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    value: 17_340.79,
    allocationPct: 13.5,
    change24hPct: 1.8,
    tradingViewSymbol: "COINBASE:BTCUSD",
  },
  {
    id: "usdc-yield",
    symbol: "USDC",
    name: "Morpho Yield Position",
    type: "yield",
    value: 50_737.88,
    allocationPct: 39.5,
    change24hPct: 0.01,
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "DAI Yield Position",
    type: "yield",
    value: 10_918.28,
    allocationPct: 8.5,
    change24hPct: 0.02,
  },
  {
    id: "cash",
    symbol: "USDC",
    name: "Idle Cash",
    type: "yield",
    value: 27_616.82,
    allocationPct: 21.5,
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
      "Trimmed ETH from 21% to 17% after it drifted past your target band, and routed the difference into your approved yield position.",
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
      "Proposed a 22% BTC position — blocked by your 15% max trade size constraint before execution. No trade occurred.",
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
  ...generateFillerDecisions(20),
];

// Additional entries beyond the named batch above, generated to give the
// decision log enough rows to exercise pagination realistically.
function generateFillerDecisions(count: number): DecisionLogEntry[] {
  const templates: { status: DecisionLogEntry["status"]; action: string; detail: string }[] = [
    {
      status: "executed",
      action: "REBALANCE",
      detail:
        "Trimmed a position back toward its target weight after routine drift — settled on-chain in one transaction.",
    },
    {
      status: "executed",
      action: "YIELD ROUTE",
      detail:
        "Rotated idle stablecoin balance into a higher-yield position after the rate spread cleared your threshold.",
    },
    {
      status: "blocked",
      action: "REBALANCE",
      detail:
        "Proposed trade exceeded your max trade size constraint before execution. No trade occurred.",
    },
    {
      status: "review",
      action: "REBALANCE",
      detail:
        "Proposed trade size was well outside your recent average — held for manual review by the circuit breaker.",
    },
    {
      status: "executed",
      action: "TRADE",
      detail:
        "Executed via the venue with the best net price after fees — settled on-chain in one transaction.",
    },
  ];

  const baseTime = new Date("2026-07-24T11:20:09Z").getTime();

  return Array.from({ length: count }, (_, i) => {
    const template = templates[i % templates.length];
    return {
      id: `dec-filler-${i + 1}`,
      timestamp: new Date(baseTime - (i + 1) * 18 * 60 * 60 * 1000).toISOString(),
      ...template,
    };
  });
}

export const feeSummary = {
  aum: portfolioSummary.totalValue,
  feeRatePct: 0.75,
  chargedToDate: 214.36,
  billingCycle: "Monthly, in-kind",
};
