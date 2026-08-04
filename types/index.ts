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

export type HoldingType = "stock" | "crypto" | "yield";

export type Holding = {
  id: string;
  symbol: string;
  name: string;
  type: HoldingType;
  value: number;
  allocationPct: number;
  change24hPct: number;
};

export type AllocationSlice = {
  label: string;
  pct: number;
};

export type PortfolioRule = {
  label: string;
  value: string;
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
