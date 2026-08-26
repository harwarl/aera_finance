import type {
  AgentScoreConfig,
  AgentStatus,
  AllocationSlice,
  DecisionLogEntry,
  Holding,
  PerformanceCallout,
  PerformancePoint,
  PortfolioConstraint,
  PortfolioRules,
  SupportedAsset,
} from "@/types";

// Everything in this file is placeholder data for building out the
// dashboard UI — there is no live vault or agent yet (see the whitepaper's
// Roadmap: Phase 0). Replace with real on-chain reads once the vault
// contract and agent are live.

// Peak-to-trough max drawdown, expressed as a negative percentage.
function maxDrawdownPct(series: number[]) {
  let peak = series[0];
  let maxDrop = 0;
  for (const value of series) {
    if (value > peak) peak = value;
    const drop = ((value - peak) / peak) * 100;
    if (drop < maxDrop) maxDrop = drop;
  }
  return Number(maxDrop.toFixed(1));
}

function buildDateLabels(days: number, anchor = "2026-08-26") {
  const end = new Date(`${anchor}T00:00:00Z`);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(d.getUTCDate() - (days - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

// Deterministic synthetic series (sums of sine waves, no RNG) so the chart
// renders identically on server and client. Includes a shared "shock" dip
// midway through the range — the vault dips slightly while BTC dips hard,
// which is what the performance callout points at.
const PERFORMANCE_DAYS = 540;
const SHOCK_INDEX = Math.round(PERFORMANCE_DAYS * 0.55);

function buildPerformanceSeries(days: number) {
  const vault: number[] = [];
  const btc: number[] = [];
  for (let i = 0; i < days; i++) {
    const t = i / days;
    const shock = Math.exp(-(((i - SHOCK_INDEX) / 9) ** 2));
    const noiseVault = Math.sin(i * 0.35) * 0.6 + Math.sin(i * 0.09) * 1.1;
    const noiseBtc = Math.sin(i * 0.28) * 1.8 + Math.sin(i * 0.05) * 2.6;
    vault.push(Number((100 + t * 22 + noiseVault - shock * 3).toFixed(2)));
    btc.push(Number((100 + t * 5 + noiseBtc - shock * 16).toFixed(2)));
  }
  return { vault, btc };
}

const dateLabels = buildDateLabels(PERFORMANCE_DAYS);
const { vault: vaultSeries, btc: btcSeries } = buildPerformanceSeries(PERFORMANCE_DAYS);

export const performanceSeries: PerformancePoint[] = dateLabels.map((date, i) => ({
  date,
  vault: vaultSeries[i],
  btc: btcSeries[i],
}));

export const performanceCallout: PerformanceCallout = {
  date: dateLabels[SHOCK_INDEX],
  label: "Flight to Safety",
  vault: vaultSeries[SHOCK_INDEX],
  btc: btcSeries[SHOCK_INDEX],
};

export const performanceTimeframes = [
  { value: "7D", days: 7 },
  { value: "30D", days: 30 },
  { value: "90D", days: 90 },
  { value: "1Y", days: 365 },
  { value: "ALL", days: PERFORMANCE_DAYS },
] as const;

const change24hPct = Number(
  (
    ((vaultSeries.at(-1)! - vaultSeries.at(-2)!) / vaultSeries.at(-2)!) *
    100
  ).toFixed(2),
);

export const portfolioSummary = {
  totalValue: 128_450.32,
  driftPct: 2.4,
  driftToleranceP: 5,
  agentStatus: "active" as AgentStatus,
  vaultName: "Primary Vault",
  change24hPct,
  change24hAbs: Number((128_450.32 * (change24hPct / 100)).toFixed(2)),
  baseYieldPct: 6.8,
  yieldEarned90dAbs: 1_842.65,
  maxDrawdownPct: maxDrawdownPct(vaultSeries),
  btcMaxDrawdownPct: maxDrawdownPct(btcSeries),
};

export const agentScore: AgentScoreConfig = {
  value: 32,
  max: 100,
  tier: "Calm",
  factors: [
    { label: "Volatility", value: 18 },
    { label: "Trend", value: 22 },
    { label: "Drawdown", value: 15 },
    { label: "Leverage", value: 54 },
    { label: "Macro", value: 58 },
  ],
  next: "Nothing to do. Tracking your 30/48/22 crypto/yield/cash target — de-risk only triggers if the score holds above 45 for 12h. Re-check in 15m.",
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
