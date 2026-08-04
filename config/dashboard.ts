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
  { label: "Stock Tokens", pct: 58 },
  { label: "Yield", pct: 27 },
  { label: "Cash", pct: 15 },
];

// "Rules" are the user's own preferences — the agent operates inside them,
// and the user can change them any time. Contrast with `portfolioConstraints`
// below, which the user can see but never edit.
export const portfolioRules: PortfolioRules = {
  riskTolerance: "medium",
  targetStockAllocationPct: 65,
  sectorPreferences: [
    { sector: "Technology", stance: "favor" },
    { sector: "Consumer Discretionary", stance: "favor" },
    { sector: "Healthcare", stance: "neutral" },
    { sector: "Financials", stance: "neutral" },
    { sector: "Energy", stance: "avoid" },
  ],
  rebalanceSensitivity: "balanced",
  notifications: {
    every_rebalance: true,
    held_for_review: true,
    weekly_summary: false,
  },
};

export const supportedAssets: SupportedAsset[] = [
  { symbol: "AAPLx", name: "Apple Stock Token", type: "stock" },
  { symbol: "TSLAx", name: "Tesla Stock Token", type: "stock" },
  { symbol: "MSFTx", name: "Microsoft Stock Token", type: "stock" },
  { symbol: "NVDAx", name: "Nvidia Stock Token", type: "stock" },
  { symbol: "AMZNx", name: "Amazon Stock Token", type: "stock" },
  { symbol: "GOOGLx", name: "Alphabet Stock Token", type: "stock" },
  { symbol: "ETH", name: "Ethereum", type: "crypto" },
  { symbol: "BTC", name: "Bitcoin", type: "crypto" },
  { symbol: "USDC", name: "Morpho Yield Position", type: "yield" },
  { symbol: "DAI", name: "DAI Yield Position", type: "yield" },
];

// "Constraints" are hard, system-enforced limits the agent can never
// exceed, regardless of its own reasoning or the user's rules above. Shown
// read-only — there is deliberately no edit control for any of these.
export const portfolioConstraints: PortfolioConstraint[] = [
  {
    label: "Supported Assets",
    value: `${supportedAssets.length} Whitelisted Tickers`,
    description:
      "Aera only trades a curated whitelist of tokenized stocks and approved yield positions — it can't add new assets on its own.",
  },
  {
    label: "Max Trade Size",
    value: "15% of portfolio per trade",
    description:
      "No single trade can move more than this share of your portfolio, regardless of the agent's confidence.",
  },
  {
    label: "Max Slippage",
    value: "0.5%",
    description:
      "Trades that would cost more than this in slippage are rejected before execution.",
  },
  {
    label: "Max Trade Frequency",
    value: "6 trades / week",
    description:
      "A hard cap on how often the agent can act, independent of opportunity.",
  },
];

export const holdings: Holding[] = [
  {
    id: "aaplx",
    symbol: "AAPLx",
    name: "Apple Stock Token",
    type: "stock",
    value: 33_268.18,
    allocationPct: 25.9,
    change24hPct: 1.4,
    tradingViewSymbol: "NASDAQ:AAPL",
  },
  {
    id: "tslax",
    symbol: "TSLAx",
    name: "Tesla Stock Token",
    type: "stock",
    value: 19_106.24,
    allocationPct: 14.9,
    change24hPct: -2.1,
    tradingViewSymbol: "NASDAQ:TSLA",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    value: 12_797.7,
    allocationPct: 10.0,
    change24hPct: 0.6,
    tradingViewSymbol: "COINBASE:ETHUSD",
  },
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    value: 10_276.03,
    allocationPct: 8.0,
    change24hPct: 1.8,
    tradingViewSymbol: "COINBASE:BTCUSD",
  },
  {
    id: "usdc-yield",
    symbol: "USDC",
    name: "Morpho Yield Position",
    type: "yield",
    value: 30_171.95,
    allocationPct: 23.5,
    change24hPct: 0.01,
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "DAI Yield Position",
    type: "yield",
    value: 6_422.52,
    allocationPct: 5.0,
    change24hPct: 0.02,
  },
  {
    id: "cash",
    symbol: "USDC",
    name: "Idle Cash",
    type: "yield",
    value: 16_407.7,
    allocationPct: 12.7,
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
