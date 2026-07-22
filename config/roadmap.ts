import type { RoadmapMilestone } from "@/types";

export const roadmapMilestones: RoadmapMilestone[] = [
  {
    id: "templates",
    quarter: "Q3 2026",
    title: "Strategy Templates",
    description:
      "Configurable target-allocation presets for common goals, replacing manual band configuration.",
    status: "current",
  },
  {
    id: "credit",
    quarter: "Q4 2026",
    title: "Credit & Lending Yield Routes",
    description:
      "The policy engine gains the ability to route idle capital into on-chain lending markets within risk bounds.",
    status: "upcoming",
  },
  {
    id: "multi-portfolio",
    quarter: "Q1 2027",
    title: "Multi-Portfolio Coordination",
    description:
      "Independent policies across sub-portfolios, coordinated by a single agent under one set of limits.",
    status: "upcoming",
  },
  {
    id: "network-expansion",
    quarter: "Q2 2027",
    title: "Additional Network Expansion",
    description:
      "Further chains added as liquidity depth and oracle coverage clear Aera's reliability bar.",
    status: "upcoming",
  },
  {
    id: "custom-risk",
    quarter: "Q3 2027",
    title: "Custom Risk Policies",
    description:
      "Per-user risk parameters beyond templates, for allocations that need tighter or looser bounds.",
    status: "upcoming",
  },
  {
    id: "cross-chain-yield",
    quarter: "Q4 2027",
    title: "Cross-Chain Yield Aggregation",
    description:
      "Yield opportunities scored and routed across every connected chain in a single pass.",
    status: "upcoming",
  },
  {
    id: "autonomous-mode",
    quarter: "Jan 2028",
    title: "Full Autonomous Mode",
    description:
      "An optional mode with no per-action confirmation, still fully bounded by the policy engine.",
    status: "upcoming",
  },
];
