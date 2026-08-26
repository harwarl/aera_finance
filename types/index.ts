export type NavLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type StepItem = {
  index: string;
  title: string;
  description: string;
};

export type IntegrationItem = {
  name: string;
};

export type SecurityBadge = {
  title: string;
  description: string;
};

export type WhitepaperCallout = {
  variant: "info" | "warning";
  title: string;
  text: string;
};

export type WhitepaperBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type WhitepaperSubsection = {
  id: string;
  title: string;
  blocks: WhitepaperBlock[];
};

export type WhitepaperRoadmapPhase = {
  label: string;
  description: string;
};

export type WhitepaperFaqItem = {
  question: string;
  answer: string;
};

export type WhitepaperGlossaryItem = {
  term: string;
  definition: string;
};

export type DocGroup =
  | "Overview"
  | "Architecture"
  | "Product"
  | "Assets & Fees"
  | "Protocol";

export type DocPage = {
  slug: string;
  group: DocGroup;
  title: string;
  intro?: string;
  blocks?: WhitepaperBlock[];
  subsections?: WhitepaperSubsection[];
  roadmapPhases?: WhitepaperRoadmapPhase[];
  faqs?: WhitepaperFaqItem[];
  glossary?: WhitepaperGlossaryItem[];
  callout?: WhitepaperCallout;
  note?: string;
  closing?: string;
};

export type AgentStatus = "active" | "paused" | "review";

export type DecisionStatus = "executed" | "blocked" | "review";

export type DecisionLogEntry = {
  id: string;
  timestamp: string;
  status: DecisionStatus;
  action: string;
  detail: string;
};

export type HoldingType = "crypto" | "yield";

export type Holding = {
  id: string;
  symbol: string;
  name: string;
  type: HoldingType;
  value: number;
  allocationPct: number;
  change24hPct: number;
  tradingViewSymbol?: string;
};

export type AllocationSlice = {
  label: string;
  pct: number;
};

export type RiskTolerance = "low" | "medium" | "high";

export type RebalanceSensitivity = "conservative" | "balanced" | "responsive";

export type SectorStance = "favor" | "neutral" | "avoid";

export type SectorPreference = {
  sector: string;
  stance: SectorStance;
};

export type NotificationEvent = "every_rebalance" | "held_for_review" | "weekly_summary";

export type PortfolioRules = {
  riskTolerance: RiskTolerance;
  targetCryptoAllocationPct: number;
  sectorPreferences: SectorPreference[];
  rebalanceSensitivity: RebalanceSensitivity;
  notifications: Record<NotificationEvent, boolean>;
};

export type PortfolioConstraint = {
  label: string;
  value: string;
  description: string;
};

export type SupportedAsset = {
  symbol: string;
  name: string;
  type: HoldingType;
};

export type WaitlistStatus = "invited" | "not_invited";

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  status: WaitlistStatus;
};

export type ProtocolFeeSummary = {
  totalAum: number;
  accruedFees: number;
  withdrawnToDate: number;
  treasuryAddress: string;
};

// Matches the shape of the (not-yet-live) error-log API: a paginated list
// of system errors surfaced across every subsystem the vault/agent touches.
export type SystemErrorSource =
  | "Reconciliation"
  | "Agent"
  | "Rebalance"
  | "Deposit"
  | "Withdrawal"
  | "RPC";

export type SystemErrorItem = {
  id: string;
  account: string;
  kind: string;
  message: string;
  detail: string;
  occurred_at: string;
  source: SystemErrorSource;
};

export type PerformancePoint = {
  date: string;
  vault: number;
  btc: number;
};

export type PerformanceCallout = {
  date: string;
  label: string;
  vault: number;
  btc: number;
};

export type AgentScoreFactor = {
  label: string;
  value: number;
};

export type AgentScoreConfig = {
  value: number;
  max: number;
  tier: string;
  factors: AgentScoreFactor[];
  next: string;
};

export type RoadmapStatus = "done" | "current" | "upcoming";

export type RoadmapMonth = {
  id: string;
  month: string;
  year: string;
  status: RoadmapStatus;
  title?: string;
  description?: string;
};
