import type {
  FaqItem,
  IntegrationItem,
  NavLink,
  SecurityBadge,
  StatItem,
  StepItem,
  WhitepaperSection,
} from "@/types";

export const siteConfig = {
  name: "Aera Finance",
  tagline: "Execution. Explained. On-chain.",
  description:
    "Aera is an autonomous portfolio agent that manages your on-chain stock token and yield portfolio — rebalancing, executing trades, and explaining every decision in plain language.",
};

export const navLinks: NavLink[] = [
  { label: "Product", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Whitepaper", href: "/whitepaper" },
  { label: "Waitlist", href: "/waitlist" },
  { label: "Roadmap", href: "/roadmap" },
];

export const integrations: IntegrationItem[] = [
  { name: "Ethereum" },
  { name: "Arbitrum" },
  { name: "Base" },
  { name: "Chainlink" },
  { name: "Uniswap" },
  { name: "Aave" },
];

export const stats: StatItem[] = [
  { value: "24/7", label: "Portfolio monitoring, no downtime" },
  { value: "<400ms", label: "Median decision latency" },
  { value: "0", label: "Manual trades required" },
  { value: "100%", label: "Decisions explained in plain language" },
];

export const steps: StepItem[] = [
  {
    index: "01",
    title: "Analyze",
    description:
      "Aera reads balances, yield rates, and market signals across every wallet you connect, continuously and in real time.",
  },
  {
    index: "02",
    title: "Decide",
    description:
      "A risk-bounded policy engine scores rebalancing and yield-routing opportunities against your target allocation.",
  },
  {
    index: "03",
    title: "Execute",
    description:
      "Approved trades route on-chain automatically, at the best available price, with no manual signing per trade.",
  },
  {
    index: "04",
    title: "Explain",
    description:
      "Every action is logged with a plain-language rationale you can read, question, and override at any time.",
  },
];

export const securityBadges: SecurityBadge[] = [
  {
    title: "Smart contracts audited",
    description:
      "Independently reviewed by a third-party security firm before every mainnet deployment.",
  },
  {
    title: "Non-custodial by design",
    description:
      "Assets stay in your own wallet or smart account — Aera only ever holds scoped trade approvals.",
  },
  {
    title: "Open-source policy engine",
    description:
      "The rebalancing and risk logic that moves your funds is public and independently verifiable.",
  },
  {
    title: "Full on-chain audit trail",
    description:
      "Every rebalance, trade, and yield move settles on-chain with a timestamped explanation attached.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Does Aera ever take custody of my funds?",
    answer:
      "No. Aera is non-custodial — it holds trade approvals within limits you set, but your assets stay in your own wallet or a smart account you control at all times.",
  },
  {
    question: "Which chains and assets does Aera support?",
    answer:
      "Aera currently manages tokenized equities and yield-bearing assets across Ethereum, Arbitrum, and Base, with support for additional chains rolling out as liquidity and oracle coverage allow.",
  },
  {
    question: "How does Aera decide when to rebalance?",
    answer:
      "The policy engine continuously compares your live allocation against your target bands. When drift, yield, or risk signals cross a threshold you've configured, Aera proposes or executes a rebalance and logs the reasoning.",
  },
  {
    question: "Can I override or pause the agent?",
    answer:
      "Yes. You can pause the agent, reject any pending action, or tighten its trading bounds at any time from your dashboard — nothing executes outside the limits you set.",
  },
  {
    question: "What does Aera cost?",
    answer:
      "Aera charges a small annual fee on assets under management, billed in-kind, with no performance fee and no charge on idle capital. Full pricing is shown before you connect a wallet.",
  },
  {
    question: "Is every trade auditable on-chain?",
    answer:
      "Every rebalance, trade, and yield move Aera makes is settled on-chain and paired with a timestamped, plain-language explanation you can verify independently at any time.",
  },
];

export const footerLinks = {
  product: [
    { label: "Rebalancing", href: "#how-it-works" },
    { label: "Yield Routing", href: "#solution" },
    { label: "Decision Log", href: "#solution" },
    { label: "Security", href: "#security" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Risk Disclosures", href: "#" },
  ],
};

export const networkStatus = [
  { name: "Ethereum", status: "Operational" },
  { name: "Arbitrum", status: "Operational" },
  { name: "Base", status: "Operational" },
];

export const whitepaperMeta = {
  version: "v1.0",
  updated: "July 2026",
  readingTime: "12 min read",
};

export const whitepaperSections: WhitepaperSection[] = [
  {
    index: "01",
    id: "abstract",
    label: "Abstract",
    paragraphs: [
      "Aera is an autonomous portfolio agent for on-chain assets. It continuously monitors a user's tokenized equities and yield-bearing positions, executes rebalancing and yield-routing trades within risk bounds the user defines, and produces a plain-language explanation for every action it takes.",
      "This document describes the problem Aera solves, how its decision loop and custody model work, and the guarantees and limits users should understand before delegating execution to it. It is a living document — mechanisms described here evolve as the system does.",
    ],
  },
  {
    index: "02",
    id: "problem",
    label: "The Problem",
    paragraphs: [
      "Tokenized stocks and yield-bearing positions are scattered across chains and protocols. Prices move continuously, but most holders check and rebalance manually — daily at best, sporadically in practice.",
      "The result is drift: allocations that quietly diverge from target, yield left uncollected, and risk exposure that goes unnoticed until it's realized as a loss. Doing this correctly by hand requires financial literacy, constant attention, and a tolerance for repetitive execution work that few people have or want.",
    ],
  },
  {
    index: "03",
    id: "architecture",
    label: "System Architecture",
    paragraphs: [
      "Aera runs a continuous four-stage loop: Analyze, Decide, Execute, Explain.",
      "Analyze — Aera reads balances, yield rates, and market signals across every wallet a user connects, continuously and in real time. Decide — a risk-bounded policy engine scores candidate rebalancing and yield-routing actions against the user's target allocation and configured limits.",
      "Execute — approved actions settle on-chain automatically, at the best available price, without a manual signature per trade. Explain — every action is logged with a timestamped, plain-language rationale the user can read, question, or use to adjust future behavior.",
      "This loop runs independent of user attention, but never outside the boundaries the user sets.",
    ],
  },
  {
    index: "04",
    id: "policy-engine",
    label: "Risk & Policy Engine",
    paragraphs: [
      "Every action Aera can take is bounded by a policy the user configures before the agent runs: target allocation bands, maximum drift before a rebalance is triggered, per-asset and per-protocol exposure caps, an allowlist of approved venues, and a limit on trade frequency.",
      "The policy engine only proposes or executes actions that fall inside these bounds. Users can tighten limits, pause the agent, or revoke its trading permissions entirely at any time — nothing Aera does is irreversible or outside a scope the user didn't explicitly grant.",
    ],
  },
  {
    index: "05",
    id: "custody",
    label: "Custody & Security Model",
    paragraphs: [
      "Aera is non-custodial. Assets remain in the user's own wallet or a smart account they control; Aera only ever holds a scoped trade-approval permission limited to allowlisted contracts and asset classes, revocable at any time.",
      "Smart contracts are independently reviewed by a third-party security firm before every mainnet deployment, and the policy engine that decides when and how to trade is open source and publicly auditable.",
    ],
    callout: {
      variant: "info",
      title: "Revocable at any time",
      text: "Revoking Aera's trade-approval permission at any time does not require withdrawing funds first — your assets never leave your own wallet or smart account.",
    },
  },
  {
    index: "06",
    id: "explainability",
    label: "Explainability Layer",
    paragraphs: [
      "Every decision Aera makes is paired with a plain-language rationale generated at execution time, referencing the specific signal that triggered it — a drift threshold crossed, a yield opportunity identified, a risk limit approached.",
      "This history is timestamped, settled on-chain alongside the trade itself, and independently verifiable — it is not a marketing summary generated after the fact.",
    ],
  },
  {
    index: "07",
    id: "networks",
    label: "Supported Networks & Assets",
    paragraphs: [
      "Aera currently manages tokenized equities and yield-bearing assets across Ethereum, Arbitrum, and Base. Additional chains roll out as liquidity depth and oracle coverage allow — adding a new venue without reliable pricing data would undermine the guarantees in Section 04.",
    ],
  },
  {
    index: "08",
    id: "fees",
    label: "Fees",
    paragraphs: [
      "Aera charges a small annual fee on assets under management, billed in-kind. There is no performance fee and no charge on idle, unallocated capital. Full pricing is shown before a wallet is connected.",
    ],
  },
  {
    index: "09",
    id: "risk-disclosures",
    label: "Risk Disclosures",
    callout: {
      variant: "warning",
      title: "Not financial advice",
      text: "This is not financial advice. Aera cannot eliminate market risk, smart contract risk, or protocol-level failures — only allocate capital you can afford to lose.",
    },
    paragraphs: [
      "Nothing in this document is financial advice. Aera operates within the bounds a user configures, but it cannot eliminate market risk, smart contract risk, or protocol-level failures in the venues it routes through.",
      "Past performance of any strategy or policy configuration is not indicative of future results. Users should only allocate capital they can afford to lose, and should read Section 04 and Section 05 in full before granting the agent trading permissions.",
    ],
  },
  {
    index: "10",
    id: "roadmap",
    label: "Roadmap",
    paragraphs: [
      "Near-term: additional chain support, expanded tokenized-asset coverage, and configurable strategy templates for common allocation goals.",
      "Mid-term: coordination across multiple sub-portfolios with independent policies, and deeper integration with on-chain credit and lending markets for yield routing. This roadmap is directional and subject to change as the system and its audits mature.",
    ],
  },
];
