import type {
  FaqItem,
  IntegrationItem,
  NavLink,
  SecurityBadge,
  StatItem,
  StepItem,
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
