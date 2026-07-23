import type { RoadmapMonth } from "@/types";

const MILESTONES: Record<string, Pick<RoadmapMonth, "title" | "description">> = {
  "Jul-2026": {
    title: "Strategy Templates",
    description:
      "Configurable target-allocation presets for common goals, replacing manual band configuration.",
  },
  "Nov-2026": {
    title: "Credit & Lending Yield Routes",
    description:
      "The policy engine gains the ability to route idle capital into on-chain lending markets within risk bounds.",
  },
  "Feb-2027": {
    title: "Multi-Portfolio Coordination",
    description:
      "Independent policies across sub-portfolios, coordinated by a single agent under one set of limits.",
  },
  "May-2027": {
    title: "Additional Network Expansion",
    description:
      "Further chains added as liquidity depth and oracle coverage clear Aera's reliability bar.",
  },
  "Aug-2027": {
    title: "Custom Risk Policies",
    description:
      "Per-user risk parameters beyond templates, for allocations that need tighter or looser bounds.",
  },
  "Nov-2027": {
    title: "Cross-Chain Yield Aggregation",
    description:
      "Yield opportunities scored and routed across every connected chain in a single pass.",
  },
  "Jan-2028": {
    title: "Full Autonomous Mode",
    description:
      "An optional mode with no per-action confirmation, still fully bounded by the policy engine.",
  },
};

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CURRENT_KEY = "Jul-2026";

function buildTimeline(startMonth: number, startYear: number, count: number) {
  const months: RoadmapMonth[] = [];
  let reachedCurrent = false;

  for (let i = 0; i < count; i++) {
    const monthIndex = (startMonth + i) % 12;
    const year = startYear + Math.floor((startMonth + i) / 12);
    const month = MONTH_NAMES[monthIndex];
    const key = `${month}-${year}`;
    const milestone = MILESTONES[key];

    const isCurrent = key === CURRENT_KEY;
    if (isCurrent) reachedCurrent = true;

    months.push({
      id: key,
      month,
      year: String(year),
      status: isCurrent ? "current" : reachedCurrent ? "upcoming" : "done",
      title: milestone?.title,
      description: milestone?.description,
    });
  }

  return months;
}

// July 2026 through January 2028, inclusive — 19 monthly ticks.
export const roadmapMonths: RoadmapMonth[] = buildTimeline(6, 2026, 19);
